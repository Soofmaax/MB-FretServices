import fs from 'fs';
import path from 'path';
import url from 'url';

const projectRoot = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(projectRoot, '..');

// Languages supported in the app
const SUP_LANGS = ['fr', 'en', 'pt'];

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
  // Match any Route with a path="..."; captures nested values like "services"
  const regex = new RegExp('<Route\\s+path\\s*=\\s*\"(.*?)\"', 'g');
  const routes = new Set();
  let m;
  while ((m = regex.exec(content)) !== null) {
    const p = m[1];
    if (!p || p === '*' || p.startsWith(':')) continue;
    // Ignore legacy redirect-only path
    if (p === '/fret-maritime') continue;
    routes.add(p);
  }
  // Ensure root marker exists
  routes.add('/');
  return Array.from(routes);
}

function expandWithLanguages(routes) {
  const out = new Set();
  for (const r of routes) {
    if (r === '/') {
      for (const lng of SUP_LANGS) out.add(`/${lng}`);
      continue;
    }
    // ensure no leading slash for join
    const seg = r.replace(/^\/+/, '');
    for (const lng of SUP_LANGS) {
      out.add(`/${lng}/${seg}`);
    }
  }
  return Array.from(out);
}

function priorityFor(pathname) {
  // Remove language prefix to evaluate logical path
  const parts = pathname.split('/').filter(Boolean);
  const logical = parts.length > 1 ? `/${parts.slice(1).join('/')}` : '/';
  const map = {
    '/': { changefreq: 'weekly', priority: '1.0' },
    '/services': { changefreq: 'weekly', priority: '0.8' },
    '/services/fret-maritime': { changefreq: 'weekly', priority: '0.8' },
    '/destinations': { changefreq: 'weekly', priority: '0.8' },
    '/contact': { changefreq: 'monthly', priority: '0.6' },
    '/legal': { changefreq: 'yearly', priority: '0.3' },
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
  const routes = getRoutesFromApp();
  const expanded = expandWithLanguages(routes);
  const xml = buildSitemap(expanded, siteUrl);

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
    console.log(`Generated sitemap with ${expanded.length} route(s) at ${publicPath} and ${distPath}`);
  } else {
    console.log(`Generated sitemap with ${expanded.length} route(s) at ${publicPath}`);
  }
}

main();