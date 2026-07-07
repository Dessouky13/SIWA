// Replace the hero image with the high-quality landscape golden-dunes render.
// Source: "ChatGPT Image Jul 8, 2026, 01_31_00 AM.png" (1672×941 landscape).
//
// The client asked to dial the warmth back a little, so beyond the minimal grade
// we apply a gentle cool white-balance shift (trim the red channel, lift blue a
// touch) via .linear() — this reduces the golden cast without desaturating.
//
// Renditions:
//   1. hero.jpg / hero.webp        — near-native landscape for the on-page hero.
//   2. hero-mobile.jpg / .webp     — ~1080px wide, fewer LCP bytes on phones.
//   3. og-image.jpg                — landscape 1200×630 crop for social cards.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PHOTOS = path.join(ROOT, 'public', 'photos');
const SRC = path.join(ROOT, 'NEW', 'hero-dunes-landscape.png');

const meta = await sharp(SRC).metadata();
console.log(`source  ${meta.width}×${meta.height}  ${meta.format}`);

// Shared grade: flatten any alpha (guarantees 3 channels for .linear), a hair
// less saturation, then the cool shift — R×0.93, G×0.99, B×1.04.
const grade = (pipe) =>
  pipe
    .rotate()
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .modulate({ saturation: 0.98, brightness: 1.0 })
    .linear([0.93, 0.99, 1.04], [0, 0, 0]);

// ── 1. On-page hero (native landscape, pristine) ──────────────────────────────
await grade(sharp(SRC)).jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(PHOTOS, 'hero.jpg'));
await grade(sharp(SRC)).webp({ quality: 86 }).toFile(path.join(PHOTOS, 'hero.webp'));

// ── 2. Mobile variant (~1080px wide) ──────────────────────────────────────────
const heroMobile = () =>
  grade(sharp(SRC).resize(1080, null, { kernel: sharp.kernel.lanczos3 })).sharpen({ sigma: 0.5 });

await heroMobile().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(PHOTOS, 'hero-mobile.jpg'));
await heroMobile().webp({ quality: 80 }).toFile(path.join(PHOTOS, 'hero-mobile.webp'));

// ── 3. Social share card (landscape 1200×630, centred) ────────────────────────
const ogBase = () =>
  grade(
    sharp(SRC).resize(1200, 630, {
      fit: 'cover',
      position: sharp.gravity.centre,
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    }),
  ).sharpen({ sigma: 0.6 });

await ogBase().jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(PHOTOS, 'og-image.jpg'));

const kb = (f) => Math.round(fs.statSync(path.join(PHOTOS, f)).size / 1024);
console.log(`OK hero.jpg         ${meta.width}×${meta.height}  ${kb('hero.jpg')}KB`);
console.log(`OK hero.webp        ${meta.width}×${meta.height}  ${kb('hero.webp')}KB`);
console.log(`OK hero-mobile.jpg  1080w     ${kb('hero-mobile.jpg')}KB`);
console.log(`OK hero-mobile.webp 1080w     ${kb('hero-mobile.webp')}KB`);
console.log(`OK og-image.jpg     1200×630  ${kb('og-image.jpg')}KB`);
console.log('\nAll done.');
