import fs from 'fs';
import path from 'path';
import url from 'url';

const projectRoot = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(projectRoot, '..');

const ENV_LANGS = (process.env.AI_TXT_LANGS || process.env.SITEMAP_LANGS || process.env.SUP_LANGS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
// AI metadata only for the three active languages
const SUP_LANGS = ENV_LANGS.length ? ENV_LANGS : ['fr', 'en', 'pt'];

const SLUGS = {
  fr: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'mentions-legales',
    services_freight_maritime: 'services/fret-maritime',
    services_customs: 'services/dedouanement',
    services_insurance: 'services/assurance-cargo',
    services_freight_france_angola: 'services/fret-maritime/france-angola',
    pillar_incoterms: 'documentation/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
    pillar_container_prices: 'guides/prix-conteneur-angola',
  },
  en: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal-notice',
    services_freight_maritime: 'services/maritime-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_angola: 'services/maritime-freight/france-angola',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
    pillar_container_prices: 'guides/container-prices-angola',
  },
  pt: {
    home: '',
    services: 'servicos',
    destinations: 'destinos',
    contact: 'contacto',
    legal: 'aviso-legal',
    services_freight_maritime: 'servicos/frete-maritimo',
    services_customs: 'servicos/despacho-aduaneiro',
    services_insurance: 'servicos/seguro-carga',
    services_freight_france_angola: 'servicos/frete-maritimo/franca-angola',
    pillar_incoterms: 'documentacao/incoterms-2020',
    pillar_fcl_lcl: 'guias/fcl-vs-lcl',
    pillar_container_prices: 'guias/precos-conteiner-angola',
  },
};

function readEnvSiteUrl() {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL.trim();
  const envFiles = ['.env.production', '.env'];
  for (const file of envFiles) {
    const p = path.join(root, file);
    if (fs.existsSync(p)) {
      try {
        const content = fs.readFileSync(p, 'utf8');
        const match = content.match(/^VITE_SITE_URL\s*=\s*(.+)$/m);
        if (match) {
          return match[1].replace(/^['"]|['"]$/g, '').trim();
        }
      } catch {}
    }
  }
  return 'https://mb-fretservices.com';
}

function buildPages(siteUrl) {
  const pages = [];
  const includedKeys = new Set([
    'home',
    'services',
    'destinations',
    'contact',
    'legal',
    'services_freight_maritime',
    'services_customs',
    'services_insurance',
    'services_freight_france_angola',
    'pillar_incoterms',
    'pillar_fcl_lcl',
    'pillar_container_prices',
  ]);
  for (const lng of SUP_LANGS) {
    const sl = SLUGS[lng];
    const entries = Object.entries(sl);
    for (const [key, slug] of entries) {
      // Only include primary logical pages + key route pages (including subpages)
      if (!includedKeys.has(key)) continue;
      const path = `/${lng}${slug ? `/${slug}` : ''}`;
      const url = new URL(path, siteUrl).href.replace(/\/$/, '');
      pages.push({ lang: lng, key, url });
    }
  }
  return pages;
}

function aiTxt(siteUrl) {
  const pages = buildPages(siteUrl);
  const updated = new Date().toISOString();

  // Very simple YAML without external deps
  const lines = [];
  lines.push('version: 1');
  lines.push('site:');
  lines.push(`  name: MB Fret Services`);
  lines.push(`  url: ${siteUrl}`);
  lines.push(`  description: >-`);
  lines.push(`    MB Fret Services propose principalement des solutions de transport international par fret maritime FCL/LCL,`);
  lines.push(`    avec dédouanement et assurance cargo depuis la France (région parisienne et Normandie) vers l'Angola (Luanda). Devis détaillé sous 24 h.`);
  lines.push(`  languages: [${SUP_LANGS.join(', ')}]`);
  lines.push(`  topics: [logistics, freight, maritime, customs, shipping, angola, france]`);
  lines.push(`  target_audience: B2B & particuliers expédiant des marchandises entre la France (Paris/Normandie) et l'Angola`);
  lines.push(`  service_regions:`);
  lines.push(`    - Europe: [France]`);
  lines.push(`    - Africa: [Angola]`);
  lines.push(`  contact:`);
  lines.push(`    email: contact@mb-fretservices.com`);
  lines.push(`    phone: "+33 7 49 23 55 39"`);
  lines.push(`    whatsapp: https://wa.me/33749235539`);
  lines.push(`  address:`);
  lines.push(`    city: Paris`);
  lines.push(`    country: FR`);
  lines.push(`  social:`);
  lines.push(`    linkedin: https://www.linkedin.com/company/NOM-DE-L-ENTREPRISE-PLACEHOLDER`);
  lines.push(`    twitter: https://twitter.com/NOM-DE-L-ENTREPRISE-PLACEHOLDER`);
  lines.push(`  developer: https://smarterlogicweb.com`);
  lines.push(`  pages:`);

  for (const p of pages) {
    lines.push(`    - lang: ${p.lang}`);
    lines.push(`      key: ${p.key}`);
    lines.push(`      url: ${p.url}`);
  }

  lines.push('  examples:');
  lines.push(`    - query: "expédier un conteneur 20' depuis la région parisienne vers Luanda"`);
  lines.push(`      suggest: "${siteUrl}/fr/services/fret-maritime/france-angola"`);
  lines.push(`    - query: "prix fret maritime Le Havre vers Luanda"`);
  lines.push(`      suggest: "${siteUrl}/fr/services/fret-maritime/france-angola"`);
  lines.push(`    - query: "dédouanement import machines en France"`);
  lines.push(`      suggest: "${siteUrl}/fr/services/dedouanement"`);
  lines.push('metadata:');
  lines.push(`  source_of_truth: sitemap.xml, pages content, structured data`);
  lines.push(`  updated_at: ${updated}`);

  return lines.join('\n') + '\n';
}

function main() {
  const siteUrl = readEnvSiteUrl();
  const txt = aiTxt(siteUrl);

  const publicDir = path.join(root, 'public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  const publicPath = path.join(publicDir, 'ai.txt');
  fs.writeFileSync(publicPath, txt, 'utf8');

  const distDir = path.join(root, 'dist');
  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, 'ai.txt');
    fs.writeFileSync(distPath, txt, 'utf8');
    console.log(`Generated ai.txt at ${publicPath} and ${distPath}`);
  } else {
    console.log(`Generated ai.txt at ${publicPath}`);
  }
}

main();