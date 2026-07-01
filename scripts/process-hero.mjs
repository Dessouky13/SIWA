// Replace the hero image with the high-quality golden-dunes render.
// Source: "ChatGPT Image Jul 1, 2026, 07_12_04 PM.png" (1086×1448 portrait).
//
// Two renditions:
//   1. hero.jpg / hero.webp — near-native PORTRAIT for the on-page hero.
//      Hero.jsx renders it with object-cover, so keeping the tall source
//      lets each device pick its best band: dunes+horizon on desktop,
//      full sky→dunes→foreground drama on mobile. No upscaling = pristine.
//   2. og-image.jpg — landscape 1200×630 crop for social share cards,
//      which expect a wide (~1.91:1) image.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PHOTOS = path.join(ROOT, 'public', 'photos');
const SRC = path.join(ROOT, 'NEW', 'hero-dunes.png');

const meta = await sharp(SRC).metadata();
console.log(`source  ${meta.width}×${meta.height}  ${meta.format}`);

// ── 1. On-page hero (portrait, native resolution, minimal grade) ──────────────
const heroBase = () =>
  sharp(SRC)
    .rotate()
    .modulate({ saturation: 1.03, brightness: 1.01 });

await heroBase().jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(PHOTOS, 'hero.jpg'));
await heroBase().webp({ quality: 86 }).toFile(path.join(PHOTOS, 'hero.webp'));

// ── 2. Social share card (landscape 1200×630, centred on the horizon band) ────
const ogBase = () =>
  sharp(SRC)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: sharp.gravity.centre, kernel: sharp.kernel.lanczos3, withoutEnlargement: false })
    .modulate({ saturation: 1.03, brightness: 1.01 })
    .sharpen({ sigma: 0.6 });

await ogBase().jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(PHOTOS, 'og-image.jpg'));

const kb = (f) => Math.round(fs.statSync(path.join(PHOTOS, f)).size / 1024);
console.log(`OK hero.jpg      ${meta.width}×${meta.height}  ${kb('hero.jpg')}KB`);
console.log(`OK hero.webp     ${meta.width}×${meta.height}  ${kb('hero.webp')}KB`);
console.log(`OK og-image.jpg  1200×630  ${kb('og-image.jpg')}KB`);
console.log('\nAll done.');
