// Process new assets from NEW/ folder:
// 1. Logo → public/logo.png (512px) + favicon sizes
// 2. landscape.jpeg → public/photos/hero.jpg + hero.webp (replaces Unsplash)
// 3. 6 best car photos → public/photos/transport-1..6.jpg + .webp
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'NEW');
const PHOTOS = path.join(ROOT, 'public', 'photos');
const PUBLIC = path.join(ROOT, 'public');

fs.mkdirSync(PHOTOS, { recursive: true });

// ── 1. LOGO ─────────────────────────────────────────────────────────────────
const logoSrc = path.join(SRC, 'LOGO SIWA.jpeg');

// Main logo for TopBar (height 64px equivalent, keep aspect)
await sharp(logoSrc)
  .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .png()
  .toFile(path.join(PUBLIC, 'logo.png'));
console.log('OK logo.png (512×512)');

// Favicon 32×32
await sharp(logoSrc)
  .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .png()
  .toFile(path.join(PUBLIC, 'favicon-32x32.png'));
console.log('OK favicon-32x32.png');

// Favicon 192×192 (PWA)
await sharp(logoSrc)
  .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .png()
  .toFile(path.join(PUBLIC, 'favicon-192x192.png'));
console.log('OK favicon-192x192.png');

// Apple touch icon 180×180
await sharp(logoSrc)
  .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .png()
  .toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
console.log('OK apple-touch-icon.png');

// ── 2. HERO (landscape dunes) ────────────────────────────────────────────────
const landscapeSrc = path.join(SRC, 'landscape.jpeg');
const heroBase = () =>
  sharp(landscapeSrc)
    .rotate()
    .resize(2400, 1350, { fit: 'cover', position: sharp.gravity.centre, kernel: sharp.kernel.lanczos3, withoutEnlargement: false })
    .modulate({ saturation: 1.05, brightness: 1.02 })
    .sharpen({ sigma: 0.7 });

await heroBase().jpeg({ quality: 85, mozjpeg: true }).toFile(path.join(PHOTOS, 'hero.jpg'));
await heroBase().webp({ quality: 82 }).toFile(path.join(PHOTOS, 'hero.webp'));
console.log('OK hero (landscape dunes, 2400×1350)');

// ── 3. TRANSPORT PHOTOS ──────────────────────────────────────────────────────
// Curated selection: best 6 vehicle photos
const transportSlots = [
  { name: 'transport-1', file: 'WhatsApp Image 2026-07-01 at 5.21.44 PM (4).jpeg' }, // Toyota HiAce near Pyramids
  { name: 'transport-2', file: 'WhatsApp Image 2026-07-01 at 5.21.44 PM (2).jpeg' }, // White HiAce at sunset
  { name: 'transport-3', file: 'WhatsApp Image 2026-07-01 at 5.21.44 PM (3).jpeg' }, // Sedan at hotel
  { name: 'transport-4', file: 'WhatsApp Image 2026-07-01 at 5.21.45 PM (1).jpeg' }, // Group + white van
  { name: 'transport-5', file: 'WhatsApp Image 2026-07-01 at 5.21.44 PM (1).jpeg' }, // Bronze Hyundai sedan
  { name: 'transport-6', file: 'WhatsApp Image 2026-07-01 at 5.21.45 PM (4).jpeg' }, // Hyundai at dealership
];

for (const slot of transportSlots) {
  const src = path.join(SRC, slot.file);
  const base = () =>
    sharp(src)
      .rotate()
      .resize(1100, 825, { fit: 'cover', position: sharp.gravity.centre, kernel: sharp.kernel.lanczos3, withoutEnlargement: false })
      .modulate({ saturation: 1.06, brightness: 1.03 })
      .sharpen({ sigma: 0.7 });

  await base().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(PHOTOS, `${slot.name}.jpg`));
  await base().webp({ quality: 80 }).toFile(path.join(PHOTOS, `${slot.name}.webp`));
  const kb = Math.round(fs.statSync(path.join(PHOTOS, `${slot.name}.jpg`)).size / 1024);
  console.log(`OK ${slot.name.padEnd(14)} 1100×825  ${kb}KB`);
}

console.log('\nAll done.');
