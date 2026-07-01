// Re-process the 6 transport photos and the hero with a full enhancement pipeline:
// normalize → CLAHE (local adaptive contrast) → median (JPEG artifact removal)
// → strong unsharp mask → high-quality output.
// Overwrites existing public/photos/transport-*.jpg|webp and hero.jpg|webp.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'NEW');
const PHOTOS = path.join(ROOT, 'public', 'photos');

/**
 * Full enhancement pipeline applied to every image:
 *  1. normalize()           — auto-stretch histogram (fix underexposed/flat photos)
 *  2. clahe({ w:4, h:4 })  — adaptive local contrast (adds perceived sharpness)
 *  3. median(3)             — median filter removes JPEG block/ringing artifacts
 *  4. sharpen(…)           — strong unsharp mask to restore crisp edges
 *  5. modulate()            — gentle saturation + brightness lift
 */
function enhance(src, w, h, gravity = sharp.gravity.centre) {
  return sharp(src)
    .rotate()
    .resize(w, h, {
      fit: 'cover',
      position: gravity,
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .normalize()
    .clahe({ width: 4, height: 4, maxSlope: 3 })
    .median(3)
    .sharpen({ sigma: 1.1, m1: 1.5, m2: 3.5, x1: 2, y2: 12, y3: 20 })
    .modulate({ saturation: 1.12, brightness: 1.03 });
}

async function save(pipeline, name) {
  const jpg = path.join(PHOTOS, `${name}.jpg`);
  const webp = path.join(PHOTOS, `${name}.webp`);
  await pipeline().jpeg({ quality: 92, mozjpeg: true }).toFile(jpg);
  await pipeline().webp({ quality: 88 }).toFile(webp);
  const jkb = Math.round(fs.statSync(jpg).size / 1024);
  const wkb = Math.round(fs.statSync(webp).size / 1024);
  console.log(`✓ ${name.padEnd(14)}  jpg ${jkb}KB  webp ${wkb}KB`);
}

// ── Transport photos ─────────────────────────────────────────────────────────
const slots = [
  { name: 'transport-1', file: 'WhatsApp Image 2026-07-01 at 5.21.44 PM (4).jpeg' }, // HiAce near Pyramids
  { name: 'transport-2', file: 'WhatsApp Image 2026-07-01 at 5.21.44 PM (2).jpeg' }, // White HiAce sunset
  { name: 'transport-3', file: 'WhatsApp Image 2026-07-01 at 5.21.44 PM (3).jpeg' }, // Sedan at hotel
  { name: 'transport-4', file: 'WhatsApp Image 2026-07-01 at 5.21.45 PM (1).jpeg' }, // Group + van
  { name: 'transport-5', file: 'WhatsApp Image 2026-07-01 at 5.21.44 PM (1).jpeg' }, // Bronze Hyundai
  { name: 'transport-6', file: 'WhatsApp Image 2026-07-01 at 5.21.45 PM (4).jpeg' }, // Hyundai at dealership
];

for (const slot of slots) {
  const src = path.join(SRC, slot.file);
  const meta = await sharp(src).metadata();
  console.log(`  source ${slot.file.slice(0,38)} ${meta.width}×${meta.height}`);
  await save(() => enhance(src, 1100, 825), slot.name);
}

// ── Hero (landscape dunes) ────────────────────────────────────────────────────
const heroSrc = path.join(SRC, 'landscape.jpeg');
const heroMeta = await sharp(heroSrc).metadata();
console.log(`\n  source landscape.jpeg  ${heroMeta.width}×${heroMeta.height}`);
await save(() => enhance(heroSrc, 2400, 1350, sharp.gravity.centre), 'hero');

console.log('\nAll done.');
