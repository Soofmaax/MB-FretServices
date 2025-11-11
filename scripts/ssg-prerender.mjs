/**
 * Simple SSG prerender for selected routes using Puppeteer.
 * - Builds static HTML snapshots for FR/EN/PT pages.
 * - Writes to dist/<route>/index.html
 */
import fs from 'fs';
import path from 'path';
import url from 'url';
import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

const projectRoot = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(projectRoot, '..');
const distDir = path.join(root, 'dist');

const ROUTES = [
  // FR
  '/fr',
  '/fr/services',
  '/fr/destinations',
  '/fr/contact',
  '/fr/services/fret-maritime',
  '/fr/services/fret-aerien',
  '/fr/services/dedouanement',
  '/fr/services/assurance-cargo',
  '/fr/services/fret-maritime/france-chine',
  '/fr/services/fret-maritime/france-chine/fcl-lcl',
  '/fr/services/fret-maritime/france-chine/douane',
  '/fr/services/fret-maritime/france-chine/checklist',
  '/fr/services/fret-maritime/france-congo',
  '/fr/services/fret-maritime/france-congo/fcl-lcl',
  '/fr/services/fret-maritime/france-congo/douane',
  '/fr/services/fret-maritime/france-congo/checklist',
  '/fr/services/fret-maritime/france-turquie',
  '/fr/services/fret-maritime/france-turquie/fcl-lcl',
  '/fr/services/fret-maritime/france-turquie/douane',
  '/fr/services/fret-maritime/france-turquie/checklist',
  '/fr/documentation/incoterms-2020',
  '/fr/guides/fcl-vs-lcl',
  // EN
  '/en',
  '/en/services',
  '/en/destinations',
  '/en/contact',
  '/en/services/maritime-freight',
  '/en/services/air-freight',
  '/en/services/customs-clearance',
  '/en/services/cargo-insurance',
  '/en/services/maritime-freight/france-china',
  '/en/services/maritime-freight/france-china/fcl-lcl',
  '/en/services/maritime-freight/france-china/customs',
  '/en/services/maritime-freight/france-china/checklist',
  '/en/services/maritime-freight/france-congo',
  '/en/services/maritime-freight/france-congo/fcl-lcl',
  '/en/services/maritime-freight/france-congo/customs',
  '/en/services/maritime-freight/france-congo/checklist',
  '/en/services/maritime-freight/france-turkey',
  '/en/services/maritime-freight/france-turkey/fcl-lcl',
  '/en/services/maritime-freight/france-turkey/customs',
  '/en/services/maritime-freight/france-turkey/checklist',
  '/en/resources/incoterms-2020',
  '/en/guides/fcl-vs-lcl',
  // PT
  '/pt',
  '/pt/servicos',
  '/pt/destinos',
  '/pt/contacto',
  '/pt/servicos/frete-maritimo',
  '/pt/servicos/frete-aereo',
  '/pt/servicos/despacho-aduaneiro',
  '/pt/servicos/seguro-carga',
  '/pt/servicos/frete-maritimo/franca-china',
  '/pt/servicos/frete-maritimo/franca-china/fcl-lcl',
  '/pt/servicos/frete-maritimo/franca-china/despacho-aduaneiro',
  '/pt/servicos/frete-maritimo/franca-china/checklist',
  '/pt/servicos/frete-maritimo/franca-congo',
  '/pt/servicos/frete-maritimo/franca-congo/fcl-lcl',
  '/pt/servicos/frete-maritimo/franca-congo/despacho-aduaneiro',
  '/pt/servicos/frete-maritimo/franca-congo/checklist',
  '/pt/servicos/frete-maritimo/franca-turquia',
  '/pt/servicos/frete-maritimo/franca-turquia/fcl-lcl',
  '/pt/servicos/frete-maritimo/franca-turquia/despacho-aduaneiro',
  '/pt/servicos/frete-maritimo/franca-turquia/checklist',
  '/pt/documentacao/incoterms-2020',
  '/pt/guias/fcl-vs-lcl',
  // ES
  '/es',
  '/es/services',
  '/es/contact',
  '/es/services/maritime-freight',
  '/es/services/air-freight',
  '/es/services/customs-clearance',
  '/es/services/cargo-insurance',
  '/es/services/maritime-freight/france-china',
  '/es/services/maritime-freight/france-congo',
  '/es/services/maritime-freight/france-turkey',
  '/es/resources/incoterms-2020',
  '/es/guides/fcl-vs-lcl',
  // TR
  '/tr',
  '/tr/services',
  '/tr/contact',
  '/tr/services/maritime-freight',
  '/tr/services/air-freight',
  '/tr/services/customs-clearance',
  '/tr/services/cargo-insurance',
  '/tr/services/maritime-freight/france-china',
  '/tr/services/maritime-freight/france-congo',
  '/tr/services/maritime-freight/france-turkey',
  '/tr/resources/incoterms-2020',
  '/tr/guides/fcl-vs-lcl',
  // DE
  '/de',
  '/de/services',
  '/de/contact',
  '/de/services/maritime-freight',
  '/de/services/air-freight',
  '/de/services/customs-clearance',
  '/de/services/cargo-insurance',
  '/de/services/maritime-freight/france-china',
  '/de/services/maritime-freight/france-congo',
  '/de/services/maritime-freight/france-turkey',
  '/de/resources/incoterms-2020',
  '/de/guides/fcl-vs-lcl',
  // IT
  '/it',
  '/it/services',
  '/it/contact',
  '/it/services/maritime-freight',
  '/it/services/air-freight',
  '/it/services/customs-clearance',
  '/it/services/cargo-insurance',
  '/it/services/maritime-freight/france-china',
  '/it/services/maritime-freight/france-congo',
  '/it/services/maritime-freight/france-turkey',
  '/it/resources/incoterms-2020',
  '/it/guides/fcl-vs-lcl',
  // SW
  '/sw',
  '/sw/services',
  '/sw/contact',
  '/sw/services/maritime-freight',
  '/sw/services/air-freight',
  '/sw/services/customs-clearance',
  '/sw/services/cargo-insurance',
  '/sw/services/maritime-freight/france-china',
  '/sw/services/maritime-freight/france-congo',
  '/sw/services/maritime-freight/france-turkey',
  '/sw/resources/incoterms-2020',
  '/sw/guides/fcl-vs-lcl',
  // AR
  '/ar',
  '/ar/services',
  '/ar/contact',
  '/ar/services/maritime-freight',
  '/ar/services/air-freight',
  '/ar/services/customs-clearance',
  '/ar/services/cargo-insurance',
  '/ar/services/maritime-freight/france-china',
  '/ar/services/maritime-freight/france-congo',
  '/ar/services/maritime-freight/france-turkey',
  '/ar/resources/incoterms-2020',
  '/ar/guides/fcl-vs-lcl',
];

// Optional filter by languages to speed up prerender
const PRERENDER_LANGS = (process.env.PRERENDER_LANGS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const ROUTES_TO_RENDER = PRERENDER_LANGS.length
  ? ROUTES.filter((r) => {
      const m = r.match(/^\/([a-z]{2})\b/);
      return m && PRERENDER_LANGS.includes(m[1]);
    })
  : ROUTES;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function startServer(port) {
  return new Promise((resolve) => {
    const proc = spawn('npx', ['http-server', 'dist', '-p', String(port), '--silent'], {
      cwd: root,
      stdio: 'ignore',
    });
    // Give server a moment to start
    setTimeout(() => resolve(proc), 2000);
  });
}

async function main() {
  const port = process.env.PORT || 4173;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Prerender: starting static server at ${baseUrl}`);
  const server = await startServer(port);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    const targets = ROUTES_TO_RENDER;
    console.log(`Prerender routes count: ${targets.length}${PRERENDER_LANGS.length ? ` (langs: ${PRERENDER_LANGS.join(',')})` : ''}`);
    for (const route of targets) {
      const url = baseUrl + route;
      console.log(`Prerendering ${url}`);
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
        const html = await page.content();
        const outDir = path.join(distDir, route);
        ensureDir(outDir);
        const outPath = path.join(outDir, 'index.html');
        fs.writeFileSync(outPath, html, 'utf8');
        console.log(`Saved ${outPath}`);
      } catch (e) {
        console.warn(`Failed prerender ${url}: ${e?.message || e}`);
      }
    }
  } finally {
    await browser.close();
    // Stop server
    try { server.kill(); } catch {}
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});