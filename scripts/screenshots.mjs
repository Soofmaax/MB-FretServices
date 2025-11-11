/**
 * Génère des captures d'écran des pages clés (FR/EN/PT)
 * Usage:
 *   BASE_URL="https://mb-fretservices.com" npm run screenshots
 *   (ou lancer `npm run preview` puis BASE_URL="http://localhost:4173" npm run screenshots)
 */
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const BASE_URL = (process.env.BASE_URL || 'http://localhost:4173').replace(/\/$/, '');

const PAGES = [
  { route: '/fr', name: 'home-fr' },
  { route: '/fr/services', name: 'services-fr' },
  { route: '/fr/contact', name: 'contact-fr' },
  { route: '/en', name: 'home-en' },
  { route: '/pt', name: 'home-pt' },
];

const outDir = path.join(process.cwd(), 'public', 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    const page = await browser.newPage();
    page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
    for (const p of PAGES) {
      const url = BASE_URL + p.route;
      console.log('Capture:', url);
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
        const file = path.join(outDir, `${p.name}.png`);
        await page.screenshot({ path: file, fullPage: true });
        console.log('Saved:', file);
      } catch (e) {
        console.warn('Failed:', url, e?.message || e);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});