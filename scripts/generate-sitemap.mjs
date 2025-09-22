import fs from 'fs';
import path from 'path';
import url from 'url';

const projectRoot = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(projectRoot, '..');

// Languages supported in the app
const SUP_LANGS = ['fr', 'en', 'pt'];

// Logical keys -> localized slugs
const SLUGS = {
  fr: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'mentions-legales',
    services_freight_maritime: 'services/fret-maritime',
  },
  en: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal-notice',
    services_freight_maritime: 'services/maritime-freight',
  },
  pt: {
    home: '',
    services: 'servicos',
    destinations: 'destinos',
    contact: 'contacto',
    legal: 'aviso-legal',
    services_freight_maritime: 'servicos/frete-maritimo',
  },
};

const PATH_KEYS = [
  'home',
  'services',
  'services_freight_maritime',
  'destinations',
  'contact',
  'legal',
];

function readEnvSiteUrl() {
  const defaults = 'https://mb-fretservices.com';
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL;

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
      } catch {
        // ignore
      }
    }
  }
  return defaults;
}

function buildPaths() {
  const paths = [];
  for (const lng of SUP_LANGS) {
    for (const key of PATH_KEYS) {
      const slug = SLUGS[lng][key];
      const p = `/${lng}${slug ? `/${slug}` : ''}`;
      paths.push(p);
    }
  }
  return paths;
}

function priorityFor(pathname) {
  // Remove language prefix to evaluate logical path
  const parts = pathname.split('/').filter(Boolean);
  const logical = parts.length > 1 ? `/${parts.slice(1).join('/')}` : '/';
  const map = {
    '/': { changefreq: 'weekly', priority: '1.0' },
    '/services': { changefreq: 'weekly', priority: '0.8' },
    '/services/fret-maritime': { changefreq: 'weekly', priority: '0.8' },
    '/services/maritime-freight': { changefreq: 'weekly', priority: '0.8' },
    '/destinations': { changefreq: 'weekly', priority: '0.8' },
    '/contact': { changefreq: 'monthly', priority: '0.6' },
    '/legal': { changefreq: 'yearly', priority: '0.3' },
    '/mentions-legales': { changefreq: 'yearly', priority: '0.3' },
    '/legal-notice': { changefreq: 'yearly', priority: '0.3' },
    '/aviso-legal': { changefreq: 'yearly', priority: '0.3' },
    '/servicos': { changefreq: 'weekly', priority: '0.8' },
    '/servicos/frete-maritimo': { changefreq: 'weekly', priority: '0.8' },
    '/destinos': { changefreq: 'weekly', priority: '0.8' },
    '/contacto': { changefreq: 'monthly', priority: '0.6' },
  };
  return map[logical] || { changefreq: 'monthly', priority: '0.5' };
}

function buildSitemap(urls, siteUrl) {
  const today = new Date().toISOString().split('T')[0];
  const urlset = urls
    .map((pathname) => {
      const { changefreq, priority } = priorityFor(pathname);
      const loc = new URL(pathname, siteUrl).href;

      // Normalize trailing slash: keep it only for pure language roots like /fr
      let finalLoc = loc;
      const parts = pathname.split('/').filter(Boolean);
      const isLangRoot = parts.length === 1 && SUP_LANGS.includes(parts[0]);
      if (!isLangRoot && finalLoc.endsWith('/')) finalLoc = finalLoc.slice(0, -1);

      return `  <url>
    <loc>${finalLoc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${today}</lastmod>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urlset}
</urlset>
`;
}

function main() {
  const siteUrl = readEnvSiteUrl();
  const paths = buildPaths();
  const xml = buildSitemap(paths, siteUrl);

  // Write to public/ for Vite to copy during build
  const publicDir = path.join(root, 'public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  const publicPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf8');

  // If dist/ exists (postbuild), also write the sitemap directly there
  const distDir = path.join(root, 'dist');
  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distPath, xml, 'utf8');
    console.log(`Generated sitemap with ${paths.length} route(s) at ${publicPath} and ${distPath}`);
  } else {
    console.log(`Generated sitemap with ${paths.length} route(s) at ${publicPath}`);
  }
}

main();