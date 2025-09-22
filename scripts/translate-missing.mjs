import fs from 'fs';
import path from 'path';
import url from 'url';

/**
 * Auto-translate missing keys from base language (fr) to targets (en, pt).
 * Provider order:
 *  - LingoDev if (URL is configured OR API key present → default URL) and key is set
 *  - LibreTranslate public endpoint as fallback (best-effort)
 *
 * Usage:
 *   node scripts/translate-missing.mjs
 *
 * Env:
 *   LINGODEV_API_URL (optional; defaults to https://api.lingo.dev/v1/translate if LINGODEV_API_KEY is set)
 *   LINGODEV_API_KEY
 *   LIBRETRANSLATE_URL (optional, default https://libretranslate.com/translate)
 *   LIBRETRANSLATE_API_KEY (optional)
 *   I18N_TARGET_LANGS (optional, e.g. "en,pt,es"; defaults to "en,pt")
 *   I18N_ALLOW_PUBLIC_MT=1 (optional, allow LibreTranslate fallback; defaults to disabled on CI)
 *   I18N_LIBRE_MAX_ATTEMPTS=3 (optional, retries for 429/5xx)
 *   I18N_FILL_WITH_SOURCE=1 (optional; when a translation is unavailable, copy source text to targets; defaults to enabled on CI/Netlify)
 *   DRY_RUN=1 (optional, don't write files)
 */

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const LOCALES_ROOT = path.join(repoRoot, 'public', 'locales');

const BASE_LANG = 'fr';
// Control target languages via env to avoid API rate limits on build.
// Example: I18N_TARGET_LANGS="en,pt,es" (defaults to en,pt)
const TARGET_LANGS = (process.env.I18N_TARGET_LANGS
  ? process.env.I18N_TARGET_LANGS.split(',').map(s => s.trim()).filter(Boolean)
  : ['en', 'pt']);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
function writeJson(p, data) {
  const json = JSON.stringify(data, null, 2) + '\n';
  fs.writeFileSync(p, json, 'utf8');
}

function listNamespaces(lang) {
  const dir = path.join(LOCALES_ROOT, lang);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
}

function ensureDirsForTargets(namespaces) {
  for (const t of TARGET_LANGS) {
    const dir = path.join(LOCALES_ROOT, t);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    // ensure files exist
    for (const ns of namespaces) {
      const p = path.join(dir, ns);
      if (!fs.existsSync(p)) fs.writeFileSync(p, '{}\n', 'utf8');
    }
  }
}

function isObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

function* walkEntries(node, prefix = []) {
  if (typeof node === 'string') {
    yield { key: prefix.join('.'), value: node };
    return;
  }
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      const v = node[i];
      if (typeof v === 'string') {
        yield { key: [...prefix, i].join('.'), value: v };
      } else if (isObject(v) || Array.isArray(v)) {
        yield* walkEntries(v, [...prefix, i]);
      }
    }
    return;
  }
  if (isObject(node)) {
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === 'string') {
        yield { key: [...prefix, k].join('.'), value: v };
      } else if (isObject(v) || Array.isArray(v)) {
        yield* walkEntries(v, [...prefix, k]);
      }
    }
  }
}

function getByPath(obj, pathStr) {
  const parts = pathStr.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

function setByPath(obj, pathStr, value) {
  const parts = pathStr.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const isLast = i === parts.length - 1;
    const isIndex = /^\d+$/.test(p);
    if (isLast) {
      cur[p] = value;
      return;
    }
    if (!(p in cur)) {
      cur[p] = /^\d+$/.test(parts[i + 1]) ? [] : {};
    }
    cur = cur[p];
    // Ensure array shape when next is index
    if (Array.isArray(cur) && !isIndex) {
      // no-op
    }
  }
}

// Provider selection (with sensible defaults)
const RAW_LINGO_URL = process.env.LINGODEV_API_URL || '';
const LINGODEV_API_KEY = process.env.LINGODEV_API_KEY || '';
const DEFAULT_LINGO_URL = 'https://api.lingo.dev/v1/translate';
// If user set an API key but not the URL, try the default Engine endpoint.
// If it fails, we'll fall back to LibreTranslate gracefully.
const LINGODEV_API_URL = RAW_LINGO_URL || (LINGODEV_API_KEY ? DEFAULT_LINGO_URL : '');
const LIBRE_URL = process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com/translate';
const LIBRE_API_KEY = process.env.LIBRETRANSLATE_API_KEY || '';

// Disable public MT on CI unless explicitly allowed
const ALLOW_PUBLIC_MT = (() => {
  const v = String(process.env.I18N_ALLOW_PUBLIC_MT || '').toLowerCase();
  if (v === '1' || v === 'true' || v === 'yes') return true;
  if (process.env.CI || process.env.NETLIFY) return false;
  return true;
})();

// When translations are unavailable, copy source text into targets (defaults to enabled on CI)
const FILL_WITH_SOURCE = (() => {
  const v = String(process.env.I18N_FILL_WITH_SOURCE || '').toLowerCase();
  if (v === '1' || v === 'true' || v === 'yes') return true;
  if (v === '0' || v === 'false' || v === 'no') return false;
  return Boolean(process.env.CI || process.env.NETLIFY);
})();

let loggedSkipLibre = false;

// Normalize language codes for provider
function mapLangForProvider(lang, provider) {
  if (provider === 'lingodev') {
    return lang;
  }
  if (provider === 'libre') {
    return lang;
  }
  return lang;
}

async function translateWithLingoDev(text, source, target) {
  const src = mapLangForProvider(source, 'lingodev');
  const tgt = mapLangForProvider(target, 'lingodev');
  const res = await fetch(LINGODEV_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(LINGODEV_API_KEY ? { Authorization: `Bearer ${LINGODEV_API_KEY}` } : {}),
    },
    body: JSON.stringify({ q: text, source: src, target: tgt }),
  });
  if (!res.ok) {
    throw new Error(`LingoDev HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.translatedText || data.translation || data.result || data.text || '';
}

async function translateWithLibre(text, source, target) {
  const maxAttempts = Number.parseInt(process.env.I18N_LIBRE_MAX_ATTEMPTS || '3', 10) || 3;
  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt++;
    const res = await fetch(LIBRE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        q: text,
        source: mapLangForProvider(source, 'libre'),
        target: mapLangForProvider(target, 'libre'),
        format: 'text',
        ...(LIBRE_API_KEY ? { api_key: LIBRE_API_KEY } : {}),
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.translatedText || '';
    }

    const status = res.status;
    if (status === 400) {
      console.warn('LibreTranslate HTTP 400 (bad request). Skipping this key.');
      return '';
    }

    if (status === 429) {
      const ra = res.headers.get('retry-after');
      let waitMs = 0;
      if (ra) {
        const sec = Number.parseInt(ra, 10);
        if (!Number.isNaN(sec)) waitMs = sec * 1000;
      }
      if (!waitMs) {
        const base = 500 * Math.pow(2, attempt - 1);
        waitMs = base + Math.floor(Math.random() * 250);
      }
      console.warn(`LibreTranslate rate-limited (429). Retrying in ${waitMs}ms (attempt ${attempt}/${maxAttempts}).`);
      await sleep(waitMs);
      continue;
    }

    if (status >= 500 && status < 600) {
      const backoff = 500 * Math.pow(2, attempt - 1) + Math.floor(Math.random() * 250);
      console.warn(`LibreTranslate server error ${status}. Retrying in ${backoff}ms (attempt ${attempt}/${maxAttempts}).`);
      await sleep(backoff);
      continue;
    }

    console.warn(`LibreTranslate HTTP ${status}. Skipping this key.`);
    return '';
  }

  // Give up after retries
  return '';
}

async function translate(text, source, target) {
  if (!text || source === target) return text;

  if (LINGODEV_API_URL) {
    try {
      return await translateWithLingoDev(text, source, target);
    } catch (e) {
      console.warn('LingoDev translation failed, falling back to LibreTranslate:', e.message || e);
    }
  }

  if (!ALLOW_PUBLIC_MT) {
    if (!loggedSkipLibre) {
      console.log('Skipping LibreTranslate fallback (I18N_ALLOW_PUBLIC_MT not enabled; disabled on CI by default).');
      loggedSkipLibre = true;
    }
    return '';
  }

  return await translateWithLibre(text, source, target);
}

async function processNamespace(ns) {
  const basePath = path.join(LOCALES_ROOT, BASE_LANG, ns);
  if (!fs.existsSync(basePath)) return;
  const baseObj = readJson(basePath);

  const entries = Array.from(walkEntries(baseObj));

  for (const target of TARGET_LANGS) {
    const targetPath = path.join(LOCALES_ROOT, target, ns);
    let targetObj = {};
    try {
      if (fs.existsSync(targetPath)) targetObj = readJson(targetPath);
    } catch {
      // keep empty
    }

    let changed = false;
    for (const { key, value: frText } of entries) {
      const existing = getByPath(targetObj, key);
      if (typeof existing === 'string' && existing.trim().length > 0) continue;

      let translated = '';
      try {
        translated = await translate(frText, BASE_LANG, target);
        // Small delay to be friendly with public MT endpoints
        await sleep(120);
      } catch (e) {
        console.warn(`Translation error for key "${key}" (${BASE_LANG}->${target}):`, e.message || e);
        translated = '';
      }

      let valueToWrite = typeof translated === 'string' ? translated.trim() : '';
      if (!valueToWrite && FILL_WITH_SOURCE) {
        valueToWrite = frText;
      }

      if (valueToWrite) {
        setByPath(targetObj, key, valueToWrite);
        changed = true;
      }
    }

    if (changed) {
      if (process.env.DRY_RUN) {
        console.log(`[DRY RUN] Would write ${targetPath}`);
      } else {
        writeJson(targetPath, targetObj);
        console.log(`Updated ${target}/${ns}`);
      }
    } else {
      console.log(`No changes for ${target}/${ns}`);
    }
  }
}

async function main() {
  if (process.env.NETLIFY || process.env.CI) {
    console.log(`[i18n] CI environment detected. Public MT is ${ALLOW_PUBLIC_MT ? 'ENABLED' : 'DISABLED'}. Fill-with-source is ${FILL_WITH_SOURCE ? 'ENABLED' : 'DISABLED'}.`);
  }

  if (!fs.existsSync(path.join(LOCALES_ROOT, BASE_LANG))) {
    console.error(`Base locale folder not found: ${path.join(LOCALES_ROOT, BASE_LANG)}`);
    process.exit(0);
  }
  const namespaces = listNamespaces(BASE_LANG);
  if (namespaces.length === 0) {
    console.log('No namespaces found in base language, nothing to translate.');
    return;
  }
  ensureDirsForTargets(namespaces);

  for (const ns of namespaces) {
    await processNamespace(ns);
  }

  console.log('i18n sync complete.');
}

main().catch((e) => {
  console.error('i18n sync failed:', e);
  process.exit(0); // do not fail CI on translation errors
});