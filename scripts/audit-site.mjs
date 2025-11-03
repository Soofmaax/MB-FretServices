/**
 * Audit de site (preview ou production)
 * Usage:
 *   BASE_URL="https://example.com" npm run audit:site
 *   npm run audit:site -- "https://example.com"
 *
 * Ce script :
 * - Valide tous les liens présents dans le sitemap (404/5xx)
 * - Vérifie robots.txt et sitemap.xml
 * - Vérifie les métadonnées de la homepage (title, description, OG)
 * - Produit un rapport Markdown dans ./audit-report.md
 */
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const argUrl = process.argv[2];
const BASE_URL = (process.env.BASE_URL || argUrl || '').trim();
if (!BASE_URL) {
  console.error('BASE_URL manquant. Ex: BASE_URL="https://mb-fretservices.com" npm run audit:site');
  process.exit(1);
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

async function main() {
  const lines = [];
  lines.push(`# Audit Site — ${BASE_URL}`);
  lines.push('');

  // robots.txt
  let robotsOk = false;
  try {
    const robots = await fetch(new URL('/robots.txt', BASE_URL));
    robotsOk = robots.ok;
  } catch {}
  lines.push(`robots.txt: ${robotsOk ? '✅' : '❌'}`);

  // sitemap.xml
  let sitemapOk = false;
  let urls = [];
  try {
    const sitemapUrl = new URL('/sitemap.xml', BASE_URL).href;
    const xml = await fetchText(sitemapUrl);
    sitemapOk = true;
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  } catch {}
  lines.push(`sitemap.xml: ${sitemapOk ? '✅' : '❌'}`);
  lines.push('');

  // Validate URLs
  const broken = [];
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'GET' });
      if (!res.ok) broken.push({ url: u, status: res.status });
    } catch {
      broken.push({ url: u, status: 'network_error' });
    }
  }
  if (broken.length === 0) {
    lines.push(`✅ Aucun lien brisé détecté dans le sitemap (${urls.length} URLs)`);
  } else {
    lines.push(`❌ Liens brisés (${broken.length}):`);
    broken.slice(0, 100).forEach((b) => lines.push(`- ${b.url} → ${b.status}`));
  }
  lines.push('');

  // Homepage meta
  try {
    const homeHtml = await fetchText(new URL('/fr', BASE_URL).href);
    const dom = new JSDOM(homeHtml);
    const doc = dom.window.document;
    const title = doc.querySelector('title')?.textContent || '';
    const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
    const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
    const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
    const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';

    lines.push('## Homepage meta (FR)');
    lines.push(`- <title>: ${title ? '✅' : '❌'} "${title}"`);
    lines.push(`- <meta name="description">: ${metaDesc ? '✅' : '❌'} "${metaDesc}"`);
    lines.push(`- Canonical: ${canonical ? '✅' : '❌'} "${canonical}"`);
    lines.push(`- OG: title ${ogTitle ? '✅' : '❌'}, description ${ogDesc ? '✅' : '❌'}, image ${ogImage ? '✅' : '❌'}`);
  } catch (e) {
    lines.push('⚠️ Impossible de lire les metas de la homepage.');
  }

  const outPath = path.join(process.cwd(), 'audit-report.md');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log(`Wrote ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});