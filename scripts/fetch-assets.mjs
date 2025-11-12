/**
 * Fetch and prepare local hero/OG images under public/.
 * - Downloads royalty-free Pexels images
 * - Generates responsive variants (800, 1200, 1600) in jpg/webp/avif
 * - Produces an OG default image (1200x630) at /og-default.webp and /og-default.jpg
 *
 * Requires: sharp
 *   npm i -D sharp
 *
 * Build-time performance:
 * - Skips entirely if ASSETS_SKIP=1
 * - Skips per-asset work if target files already exist
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

  // If all variants exist, skip work
  const allExist = ['.jpg', '-800.jpg', '-1200.jpg', '-1600.jpg', '-800.webp', '-1200.webp', '-1600.webp', '-800.avif', '-1200.avif', '-1600.avif']
    .every((suffix) => fs.existsSync(path.join(imagesDir, `${name}${suffix}`)));
  if (allExist) {
    console.log(`[assets] Skip ${name}: already present`);
    return;
  }

  const buffer = await fetchBuffer(srcUrl);

  // Base fallback JPEG without suffix (use 1200px)
  if (!fs.existsSync(path.join(imagesDir, `${name}.jpg`))) {
    await sharp(buffer)
      .resize({ width: 1200 })
      .jpeg({ quality: 82, progressive: true })
      .toFile(path.join(imagesDir, `${name}.jpg`));
  }

  for (const w of sizes) {
    const jpgOut = path.join(imagesDir, `${name}-${w}.jpg`);
    const webpOut = path.join(imagesDir, `${name}-${w}.webp`);
    const avifOut = path.join(imagesDir, `${name}-${w}.avif`);

    if (!fs.existsSync(jpgOut)) {
      await sharp(buffer).resize({ width: w }).jpeg({ quality: 82, progressive: true }).toFile(jpgOut);
    }
    if (!fs.existsSync(webpOut)) {
      await sharp(buffer).resize({ width: w }).webp({ quality: 80 }).toFile(webpOut);
    }
    if (!fs.existsSync(avifOut)) {
      await sharp(buffer).resize({ width: w }).avif({ quality: 50 }).toFile(avifOut);
    }
  }
}

async function buildOgDefault(fromName) {
  const webpOut = path.join(publicDir, 'og-default.webp');
  const jpgOut = path.join(publicDir, 'og-default.jpg');
  if (fs.existsSync(webpOut) && fs.existsSync(jpgOut)) {
    console.log('[assets] Skip og-default: already present');
    return;
  }

  const srcPath = path.join(imagesDir, `${fromName}-1600.jpg`);
  const fallback = path.join(imagesDir, `${fromName}.jpg`);
  const input = fs.existsSync(srcPath) ? srcPath : fallback;

  // 1200x630 cover to match OG recommended size
  const ogW = 1200;
  const ogH = 630;

  if (!fs.existsSync(webpOut)) {
    await sharp(input)
      .resize(ogW, ogH, { fit: 'cover', position: 'centre' })
      .webp({ quality: 80 })
      .toFile(webpOut);
  }

  if (!fs.existsSync(jpgOut)) {
    await sharp(input)
      .resize(ogW, ogH, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 85, progressive: true })
      .toFile(jpgOut);
  }
}

/**
 * Create tinted variants from an existing base image file.
 * Generates name.jpg (1200w) and -800/-1200/-1600 in jpg/webp/avif.
 */
async function buildTintedFromPath(name, basePath, tintColor) {
  const sizes = [800, 1200, 1600];
  if (!fs.existsSync(basePath)) {
    throw new Error(`Base image not found: ${basePath}`);
  }

  // Skip if variants already exist
  const allExist = ['.jpg', '-800.jpg', '-1200.jpg', '-1600.jpg', '-800.webp', '-1200.webp', '-1600.webp', '-800.avif', '-1200.avif', '-1600.avif']
    .every((suffix) => fs.existsSync(path.join(imagesDir, `${name}${suffix}`)));
  if (allExist) {
    console.log(`[assets] Skip tinted ${name}: already present`);
    return;
  }

  // Base fallback 1200 jpg
  if (!fs.existsSync(path.join(imagesDir, `${name}.jpg`))) {
    await sharp(basePath).resize({ width: 1200 }).tint(tintColor).jpeg({ quality: 82, progressive: true }).toFile(path.join(imagesDir, `${name}.jpg`));
  }

  for (const w of sizes) {
    const jpgOut = path.join(imagesDir, `${name}-${w}.jpg`);
    const webpOut = path.join(imagesDir, `${name}-${w}.webp`);
    const avifOut = path.join(imagesDir, `${name}-${w}.avif`);

    if (!fs.existsSync(jpgOut)) {
      await sharp(basePath).resize({ width: w }).tint(tintColor).jpeg({ quality: 82, progressive: true }).toFile(jpgOut);
    }
    if (!fs.existsSync(webpOut)) {
      await sharp(basePath).resize({ width: w }).tint(tintColor).webp({ quality: 80 }).toFile(webpOut);
    }
    if (!fs.existsSync(avifOut)) {
      await sharp(basePath).resize({ width: w }).tint(tintColor).avif({ quality: 50 }).toFile(avifOut);
    }
  }
}

async function main() {
  if (process.env.ASSETS_SKIP && !['0', 'false', 'False', 'FALSE'].includes(String(process.env.ASSETS_SKIP))) {
    console.log('[assets] Skip enabled via ASSETS_SKIP. Skipping asset generation.');
    return;
  }

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

  // Build route-specific tinted variants from hero-maritime (to ensure visual distinction)
  try {
    const base1600 = path.join(imagesDir, 'hero-maritime-1600.jpg');
    const fallback1200 = path.join(imagesDir, 'hero-maritime.jpg');
    const basePath = fs.existsSync(base1600) ? base1600 : fallback1200;

    // China: red vif
    await buildTintedFromPath('hero-china', basePath, { r: 220, g: 38, b: 38 }); // #dc2626

    // Congo: vert forêt
    await buildTintedFromPath('hero-congo', basePath, { r: 22, g: 101, b: 52 }); // #166534

    // Turkey: rouge profond (différent de Chine)
    await buildTintedFromPath('hero-turkey', basePath, { r: 190, g: 18, b: 60 }); // #be123c
  } catch (e) {
    console.warn('Failed to build tinted route variants:', e?.message || e);
  }

  // Build route-specific OG images (1200x630) from the tinted variants
  try {
    const ogOut = (name) => ({
      webp: path.join(publicDir, 'images', `og-${name}.webp`),
      jpg: path.join(publicDir, 'images', `og-${name}.jpg`),
    });
    ensureDir(path.join(publicDir, 'images'));

    const chinaBase = fs.existsSync(path.join(imagesDir, 'hero-china-1600.jpg'))
      ? path.join(imagesDir, 'hero-china-1600.jpg')
      : path.join(imagesDir, 'hero-china.jpg');
    const congoBase = fs.existsSync(path.join(imagesDir, 'hero-congo-1600.jpg'))
      ? path.join(imagesDir, 'hero-congo-1600.jpg')
      : path.join(imagesDir, 'hero-congo.jpg');
    const turkeyBase = fs.existsSync(path.join(imagesDir, 'hero-turkey-1600.jpg'))
      ? path.join(imagesDir, 'hero-turkey-1600.jpg')
      : path.join(imagesDir, 'hero-turkey.jpg');

    // Helper: create OG from a base image path
    async function buildOg(name, base) {
      const wOut = ogOut(name).webp;
      const jOut = ogOut(name).jpg;
      if (!fs.existsSync(wOut)) {
        await sharp(base).resize(1200, 630, { fit: 'cover', position: 'centre' }).webp({ quality: 80 }).toFile(wOut);
      }
      if (!fs.existsSync(jOut)) {
        await sharp(base).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 85, progressive: true }).toFile(jOut);
      }
    }

    await buildOg('china', chinaBase);
    await buildOg('congo', congoBase);
    await buildOg('turkey', turkeyBase);
  } catch (e) {
    console.warn('Failed to build OG route images:', e?.message || e);
  }

  console.log('Assets prepared under public/images and og-default.* at public/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});