/**
 * PR Audit Script
 * - Link validation (404 detection)
 * - Security headers check
 * - SEO technical validation (robots, sitemap, meta/OG tags)
 * - Collect Lighthouse & pa11y results if available
 *
 * Outputs audit-report.md to workspace.
 */
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

// Pages to crawl within same origin (limit depth to avoid infinite loops)
const START_PATHS = [
  '/fr',
  '/fr/services',
  '/fr/contact',
  '/fr/destinations',
  '/fr/services/fret-maritime',
];
const MAX_PAGES = 50;

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${res.status} for ${url}`);
  return await res.text();
}

async function fetchHead(url) {
  const res = await fetch(url, { method: 'GET' });
  return res;
}

function normalizeUrl(href) {
  try {
    // Support relative anchors
    const u = new URL(href, BASE_URL);
    return u.href;
  } catch {
    return null;
  }
}

function isSameOrigin(url) {
  try {
    const u = new URL(url);
    const b = new URL(BASE_URL);
    return u.origin === b.origin;
  } catch {
    return false;
  }
}

async function crawlLinks() {
  const visited = new Set();
  const queue = [...START_PATHS.map((p) => new URL(p, BASE_URL).href)];
  const broken = [];
  while (queue.length && visited.size < MAX_PAGES) {
    const url = queue.shift();
    if (!url || visited.has(url)) continue;
    visited.add(url);
    let html = '';
    try {
      const res = await fetch(url);
      if (!res.ok) {
        broken.push({ url, status: res.status });
        continue;
      }
      html = await res.text();
    } catch (e) {
      broken.push({ url, status: 'network_error' });
      continue;
    }
    try {
      const dom = new JSDOM(html);
      const anchors = [...dom.window.document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href') || '');
      for (const href of anchors) {
        const next = normalizeUrl(href);
        if (!next) continue;
        // Same origin only
        if (!isSameOrigin(next)) continue;
        // Skip mailto:, tel:, hash links
        if (next.startsWith('mailto:') || next.startsWith('tel:') || next.includes('#')) continue;
        if (!visited.has(next)) queue.push(next);
      }
    } catch {
      // ignore parse errors
    }
  }

  // Validate all collected pages with HEAD/GET
  const all = [...visited];
  for (const u of all) {
    try {
      const res = await fetch(u, { method: 'GET' });
      if (!res.ok) broken.push({ url: u, status: res.status });
    } catch {
      broken.push({ url: u, status: 'network_error' });
    }
  }
  return { visitedCount: visited.size, broken };
}

async function securityHeadersCheck() {
  const res = await fetchHead(new URL('/fr', BASE_URL).href);
  const hdr = Object.fromEntries([...res.headers.entries()].map(([k, v]) => [k.toLowerCase(), v]));
  const hsts = hdr['strict-transport-security'] || '';
  const xfo = hdr['x-frame-options'] || '';
  const xcto = hdr['x-content-type-options'] || '';
  const csp = hdr['content-security-policy'] || '';
  const referrer = hdr['referrer-policy'] || '';
  return { hsts, xfo, xcto, csp, referrer, present: { hsts: !!hsts, xfo: !!xfo, xcto: !!xcto } };
}

async function seoChecks() {
  const homeUrl = new URL('/fr', BASE_URL).href;
  let html = '';
  try {
    html = await fetchText(homeUrl);
  } catch (e) {
    return { robotsOk: false, sitemapOk: false, meta: {} };
  }
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const title = doc.querySelector('title')?.textContent || '';
  const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';

  // robots.txt and sitemap.xml
  const robotsUrl = new URL('/robots.txt', BASE_URL).href;
  const sitemapUrl = new URL('/sitemap.xml', BASE_URL).href;
  let robotsOk = false;
  let sitemapOk = false;
  try {
    const r = await fetch(robotsUrl);
    robotsOk = r.ok;
  } catch {}
  try {
    const s = await fetch(sitemapUrl);
    sitemapOk = s.ok;
  } catch {}
  return {
    robotsOk,
    sitemapOk,
    meta: { title, metaDesc, ogTitle, ogDesc, ogImage },
  };
}

function readPa11yCsv() {
  // pa11y/action writes pa11y.csv in workspace
  const p = path.join(process.cwd(), 'pa11y.csv');
  if (!fs.existsSync(p)) return null;
  try {
    const csv = fs.readFileSync(p, 'utf8');
    // Very simple parse: group by "type" severity and URL
    const lines = csv.trim().split('\n').slice(1); // drop header
    const issues = lines.map((l) => {
      const cols = l.split(',');
      return {
        url: cols[0],
        type: cols[1],
        code: cols[2],
        message: cols.slice(3).join(','),
      };
    });
    return issues;
  } catch {
    return null;
  }
}

function readLighthouseSummary() {
  // treosh action uploads artifacts; also prints summary.json
  const jsonPath = path.join(process.cwd(), '.lighthouseci', 'lhr-0.json');
  if (!fs.existsSync(jsonPath)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const categories = data.categories || {};
    const perf = Math.round((categories.performance?.score || 0) * 100);
    const a11y = Math.round((categories.accessibility?.score || 0) * 100);
    const bp = Math.round((categories['best-practices']?.score || 0) * 100);
    const seo = Math.round((categories.seo?.score || 0) * 100);
    // Opportunities:
    const opp = (data.audits || {});
    const opportunities = Object.values(opp)
      .filter((a) => a.details && a.details.type === 'opportunity' && a.score < 1)
      .slice(0, 3)
      .map((a) => `- ${a.title}: ${a.details.overallSavingsMs ? Math.round(a.details.overallSavingsMs) + 'ms' : ''}`);
    return { perf, a11y, bp, seo, opportunities };
  } catch {
    return null;
  }
}

async function main() {
  const linkRes = await crawlLinks();
  const sec = await securityHeadersCheck();
  const seo = await seoChecks();
  const pa11y = readPa11yCsv();
  const lh = readLighthouseSummary();

  const lines = [];
  lines.push(`# Audit Qualité — Preview ${BASE_URL}`);
  lines.push('');
  lines.push(`## 1) Validation des liens`);
  lines.push(`Pages explorées: ${linkRes.visitedCount}`);
  if (linkRes.broken.length === 0) {
    lines.push(`✅ Aucun lien brisé détecté.`);
  } else {
    lines.push(`❌ Liens brisés (${linkRes.broken.length}):`);
    for (const b of linkRes.broken.slice(0, 50)) {
      lines.push(`- ${b.url} → ${b.status}`);
    }
  }

  lines.push('');
  lines.push(`## 2) Audit de Performance (Lighthouse)`);
  if (lh) {
    lines.push(`Scores: Performance ${lh.perf}, Accessibilité ${lh.a11y}, Bonnes Pratiques ${lh.bp}, SEO ${lh.seo}`);
    if (lh.perf < 90 && lh.opportunities?.length) {
      lines.push(`⚠️ Opportunités principales:`);
      lh.opportunities.forEach((o) => lines.push(o));
    } else {
      lines.push(`✅ Performance ≥ 90 ou aucune opportunité majeure.`);
    }
  } else {
    lines.push(`⚠️ Résumé Lighthouse indisponible (action a peut-être échoué).`);
  }

  lines.push('');
  lines.push(`## 3) Audit d’Accessibilité (pa11y)`);
  if (pa11y && pa11y.length) {
    const serious = pa11y.filter((i) => ['error', 'warning'].includes(i.type));
    if (serious.length) {
      lines.push(`❌ Violations détectées (${serious.length}) sur 3 pages clés:`);
      serious.slice(0, 30).forEach((i) => lines.push(`- [${i.type}] ${i.url} — ${i.code} — ${i.message}`));
    } else {
      lines.push(`✅ Aucune violation critique/majeure détectée.`);
    }
  } else {
    lines.push(`⚠️ Résultats pa11y indisponibles.`);
  }

  lines.push('');
  lines.push(`## 4) Audit de Sécurité (En-têtes HTTP)`);
  lines.push(`HSTS: ${sec.present.hsts ? '✅' : '❌'} ${sec.hsts || '(absent)'}`);
  lines.push(`X-Frame-Options: ${sec.present.xfo ? '✅' : '❌'} ${sec.xfo || '(absent)'}`);
  lines.push(`X-Content-Type-Options: ${sec.present.xcto ? '✅' : '❌'} ${sec.xcto || '(absent)'}`);
  lines.push(`CSP: ${sec.csp ? '✅' : '❌'} ${sec.csp ? '(présent)' : '(absent)'} `);
  lines.push(`Referrer-Policy: ${sec.referrer ? '✅' : '❌'} ${sec.referrer || '(absent)'}`);

  lines.push('');
  lines.push(`## 5) Validation SEO Technique`);
  lines.push(`robots.txt: ${seo.robotsOk ? '✅' : '❌'}`);
  lines.push(`sitemap.xml: ${seo.sitemapOk ? '✅' : '❌'}`);
  const m = seo.meta;
  lines.push(`Homepage meta:`);
  lines.push(`- <title>: ${m.title ? '✅' : '❌'} "${m.title || ''}"`);
  lines.push(`- <meta name="description">: ${m.metaDesc ? '✅' : '❌'} "${m.metaDesc || ''}"`);
  lines.push(`- OG: title ${m.ogTitle ? '✅' : '❌'}, description ${m.ogDesc ? '✅' : '❌'}, image ${m.ogImage ? '✅' : '❌'}`);

  const outPath = path.join(process.cwd(), 'audit-report.md');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log(`Wrote ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});