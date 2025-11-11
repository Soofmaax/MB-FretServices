/**
 * Fetch and prepare local hero/OG images under public/.
 * - Downloads royalty-free Pexels images
 * - Generates responsive variants (800, 1200, 1600) in jpg/webp/avif
 * - Produces an OG default image (1200x630) at /og-default.webp and /og-default.jpg
 *
 * Requires: sharp
 *   npm i -D sharp
 */
import fs from 'fs';
import path from 'path';
import url from 'url';
import https from 'https';
import sharp from 'sharp';

const projectRoot = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(projectRoot, '..');
const publicDir = path.join(root, 'public');
const imagesDir = path.join(publicDir, 'images');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function fetchBuffer(srcUrl) {
  return new Promise((resolve, reject) => {
    https.get(srcUrl, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        https.get(res.headers.location, (res2) => {
          const chunks = [];
          res2.on('data', (d) => chunks.push(d));
          res2.on('end', () => resolve(Buffer.concat(chunks)));
          res2.on('error', reject);
        }).on('error', reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${srcUrl}`));
        return;
      }
      const chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function buildVariants(name, srcUrl) {
  const sizes = [800, 1200, 1600];
  const buffer = await fetchBuffer(srcUrl);

  // Base fallback JPEG without suffix (use 1200px)
  await sharp(buffer)
    .resize({ width: 1200 })
    .jpeg({ quality: 82, progressive: true })
    .toFile(path.join(imagesDir, `${name}.jpg`));

  for (const w of sizes) {
    await sharp(buffer)
      .resize({ width: w })
      .jpeg({ quality: 82, progressive: true })
      .toFile(path.join(imagesDir, `${name}-${w}.jpg`));

    await sharp(buffer)
      .resize({ width: w })
      .webp({ quality: 80 })
      .toFile(path.join(imagesDir, `${name}-${w}.webp`));

    await sharp(buffer)
      .resize({ width: w })
      .avif({ quality: 50 })
      .toFile(path.join(imagesDir, `${name}-${w}.avif`));
  }
}

async function buildOgDefault(fromName) {
  const srcPath = path.join(imagesDir, `${fromName}-1600.jpg`);
  const fallback = path.join(imagesDir, `${fromName}.jpg`);
  const input = fs.existsSync(srcPath) ? srcPath : fallback;

  // 1200x630 cover to match OG recommended size
  const ogW = 1200;
  const ogH = 630;

  await sharp(input)
    .resize(ogW, ogH, { fit: 'cover', position: 'centre' })
    .webp({ quality: 80 })
    .toFile(path.join(publicDir, 'og-default.webp'));

  await sharp(input)
    .resize(ogW, ogH, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85, progressive: true })
    .toFile(path.join(publicDir, 'og-default.jpg'));
}

async function main() {
  ensureDir(publicDir);
  ensureDir(imagesDir);

  const assets = [
    {
      name: 'hero-maritime',
      src: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=2400',
    },
    {
      name: 'hero-air',
      src: 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=2400',
    },
    {
      name: 'hero-insurance',
      src: 'https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=2400',
    },
    {
      name: 'hero-customs',
      // We reuse the maritime scene which works well for documentation/douane theming
      src: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=2400',
    },
  ];

  for (const a of assets) {
    try {
      console.log(`Fetching ${a.name} from ${a.src}`);
      await buildVariants(a.name, a.src);
    } catch (e) {
      console.warn(`Failed to build ${a.name}:`, e?.message || e);
    }
  }

  try {
    await buildOgDefault('hero-maritime');
  } catch (e) {
    console.warn('Failed to build OG default:', e?.message || e);
  }

  console.log('Assets prepared under public/images and og-default.* at public/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});