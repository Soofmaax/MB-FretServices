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
  '/fr',
  '/fr/services',
  '/fr/destinations',
  '/fr/contact',
  '/fr/services/fret-maritime',
  '/fr/services/fret-maritime/france-chine',
  '/fr/services/fret-maritime/france-congo',
  '/fr/services/fret-maritime/france-turquie',
  '/en',
  '/en/services',
  '/en/destinations',
  '/en/contact',
  '/en/services/maritime-freight',
  '/en/services/maritime-freight/france-china',
  '/en/services/maritime-freight/france-congo',
  '/en/services/maritime-freight/france-turkey',
  '/pt',
  '/pt/servicos',
  '/pt/destinos',
  '/pt/contacto',
  '/pt/servicos/frete-maritimo',
  '/pt/servicos/frete-maritimo/franca-china',
  '/pt/servicos/frete-maritimo/franca-congo',
  '/pt/servicos/frete-maritimo/franca-turquia',
];

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
    for (const route of ROUTES) {
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