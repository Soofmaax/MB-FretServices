import fs from 'fs';
import path from 'path';
import url from 'url';

const projectRoot = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(projectRoot, '..');

const ENV_LANGS = (process.env.AI_TXT_LANGS || process.env.SITEMAP_LANGS || process.env.SUP_LANGS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const SUP_LANGS = ENV_LANGS.length ? ENV_LANGS : ['fr', 'en', 'pt', 'ar', 'es', 'tr', 'sw', 'de', 'it'];

const SLUGS = {
  fr: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'mentions-legales',
    services_freight_maritime: 'services/fret-maritime',
    services_air_freight: 'services/fret-aerien',
    services_customs: 'services/dedouanement',
    services_insurance: 'services/assurance-cargo',
    services_freight_france_china: 'services/fret-maritime/france-chine',
    services_freight_france_congo: 'services/fret-maritime/france-congo',
    services_freight_france_turkey: 'services/fret-maritime/france-turquie',
    services_freight_france_china_fcl_lcl: 'services/fret-maritime/france-chine/fcl-lcl',
    services_freight_france_china_customs: 'services/fret-maritime/france-chine/douane',
    services_freight_france_china_checklist: 'services/fret-maritime/france-chine/checklist',
    services_freight_france_congo_fcl_lcl: 'services/fret-maritime/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/fret-maritime/france-congo/douane',
    services_freight_france_congo_checklist: 'services/fret-maritime/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/fret-maritime/france-turquie/fcl-lcl',
    services_freight_france_turkey_customs: 'services/fret-maritime/france-turquie/douane',
    services_freight_france_turkey_checklist: 'services/fret-maritime/france-turquie/checklist',
    pillar_incoterms: 'documentation/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  en: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal-notice',
    services_freight_maritime: 'services/maritime-freight',
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  pt: {
    home: '',
    services: 'servicos',
    destinations: 'destinos',
    contact: 'contacto',
    legal: 'aviso-legal',
    services_freight_maritime: 'servicos/frete-maritimo',
    services_air_freight: 'servicos/frete-aereo',
    services_customs: 'servicos/despacho-aduaneiro',
    services_insurance: 'servicos/seguro-carga',
    services_freight_france_china: 'servicos/frete-maritimo/franca-china',
    services_freight_france_congo: 'servicos/frete-maritimo/franca-congo',
    services_freight_france_turkey: 'servicos/frete-maritimo/franca-turquia',
    services_freight_france_china_fcl_lcl: 'servicos/frete-maritimo/franca-china/fcl-lcl',
    services_freight_france_china_customs: 'servicos/frete-maritimo/franca-china/despacho-aduaneiro',
    services_freight_france_china_checklist: 'servicos/frete-maritimo/franca-china/checklist',
    services_freight_france_congo_fcl_lcl: 'servicos/frete-maritimo/franca-congo/fcl-lcl',
    services_freight_france_congo_customs: 'servicos/frete-maritimo/franca-congo/despacho-aduaneiro',
    services_freight_france_congo_checklist: 'servicos/frete-maritimo/franca-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'servicos/frete-maritimo/franca-turquia/fcl-lcl',
    services_freight_france_turkey_customs: 'servicos/frete-maritimo/franca-turquia/despacho-aduaneiro',
    services_freight_france_turkey_checklist: 'servicos/frete-maritimo/franca-turquia/checklist',
    pillar_incoterms: 'documentacao/incoterms-2020',
    pillar_fcl_lcl: 'guias/fcl-vs-lcl',
  },
  ar: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal',
    services_freight_maritime: 'services/maritime-freight',
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  es: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal',
    services_freight_maritime: 'services/maritime-freight',
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  tr: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal',
    services_freight_maritime: 'services/maritime-freight',
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  sw: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal',
    services_freight_maritime: 'services/maritime-freight',
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  de: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal',
    services_freight_maritime: 'services/maritime-freight',
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  it: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal',
    services_freight_maritime: 'services/maritime-freight',
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
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
  for (const lng of SUP_LANGS) {
    const sl = SLUGS[lng];
    const entries = Object.entries(sl);
    for (const [key, slug] of entries) {
      // Only include primary logical pages + key route pages (including subpages)
      if (![
        'home','services','destinations','contact','legal',
        'services_freight_maritime','services_air_freight','services_customs','services_insurance',
        'services_freight_france_china','services_freight_france_china_fcl_lcl','services_freight_france_china_customs','services_freight_france_china_checklist',
        'services_freight_france_congo','services_freight_france_congo_fcl_lcl','services_freight_france_congo_customs','services_freight_france_congo_checklist',
        'services_freight_france_turkey','services_freight_france_turkey_fcl_lcl','services_freight_france_turkey_customs','services_freight_france_turkey_checklist',
        'pillar_incoterms','pillar_fcl_lcl'
      ].includes(key)) continue;
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
  lines.push(`    MB Fret Services propose des solutions de transport international (fret maritime FCL/LCL, fret aérien),`);
  lines.push(`    dédouanement et assurance cargo depuis l'Europe vers l'Afrique et l'Asie. Devis sous 24 h.`);
  lines.push(`  languages: [${SUP_LANGS.join(', ')}]`);
  lines.push(`  topics: [logistics, freight, maritime, air, customs, shipping, africa, asia, europe]`);
  lines.push(`  target_audience: B2B & particuliers expédiant des marchandises vers l'Afrique et l'Asie depuis l'Europe`);
  lines.push(`  service_regions:`);
  lines.push(`    - Africa: [Congo, Angola, Côte d'Ivoire, Cameroun]`);
  lines.push(`    - Asia: [China, Turkey]`);
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
  lines.push(`    - query: "expédier un conteneur 20' vers Pointe-Noire"`);
  lines.push(`      suggest: "${siteUrl}/fr/services/fret-maritime"`);
  lines.push(`    - query: "prix fret aérien Paris vers Luanda"`);
  lines.push(`      suggest: "${siteUrl}/fr/services"`);
  lines.push(`    - query: "dédouanement import machines en France"`);
  lines.push(`      suggest: "${siteUrl}/fr/services"`);
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