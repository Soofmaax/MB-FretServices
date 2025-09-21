import fs from 'fs';
import path from 'path';
import url from 'url';

const projectRoot = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(projectRoot, '..');

function readEnvSiteUrl() {
  const defaults = 'https://mb-fretservices.com';
  // Prefer process env if provided by CI
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

function getRoutesFromApp() {
  const appPath = path.join(root, 'src', 'App.tsx');
  const content = fs.readFileSync(appPath, 'utf8');
  // Simpler pattern: match path="..."; double quotes are not escaped in a single-quoted string
  const regex = new RegExp('<Route\\s+path\\s*=\\s*"(.*?)"', 'g');
  const routes = new Set();
  let m;
  while ((m = regex.exec(content)) !== null) {
    const p = m[1];
    if (!p || p === '*' || p.startsWith(':')) continue;
    routes.add(p);
  }
  // Ensure root route exists
  if (!routes.has('/')) routes.add('/');
  return Array.from(routes);
}

function priorityFor(pathname) {
  const map = {
    '/': { changefreq: 'weekly', priority: '1.0' },
    '/services': { changefreq: 'weekly', priority: '0.8' },
    '/services/fret-maritime': { changefreq: 'weekly', priority: '0.8' },
    '/destinations': { changefreq: 'weekly', priority: '0.8' },
    '/contact': { changefreq: 'monthly', priority: '0.6' },
    '/legal': { changefreq: 'yearly', priority: '0.3' },
  };
  return map[pathname] || { changefreq: 'monthly', priority: '0.5' };
}

function buildSitemap(urls, siteUrl) {
  const today = new Date().toISOString().split('T')[0];
  const urlset = urls
    .map((pathname) => {
      const { changefreq, priority } = priorityFor(pathname);
      const loc =
        pathname === '/'
          ? new URL('/', siteUrl).href
          : new URL(pathname.startsWith('/') ? pathname : `/${pathname}`, siteUrl).href;

      // Normalize trailing slash: keep it only for root
      let finalLoc = loc;
      if (pathname === '/') {
        if (!finalLoc.endsWith('/')) finalLoc += '/';
      } else {
        if (finalLoc.endsWith('/')) finalLoc = finalLoc.slice(0, -1);
      }

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
  const routes = getRoutesFromApp();
  const xml = buildSitemap(routes, siteUrl);

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
    console.log(`Generated sitemap with ${routes.length} route(s) at ${publicPath} and ${distPath}`);
  } else {
    console.log(`Generated sitemap with ${routes.length} route(s) at ${publicPath}`);
  }
}

main();