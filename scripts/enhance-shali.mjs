// Enhance the client-supplied Shali Fortress photos (WhatsApp-compressed) and
// wire them into the shali experience. WhatsApp already stripped resolution and
// added blocking, so the goal is honest cleanup — richer colour, gentle contrast,
// artifact-aware sharpening, high-quality re-encode + webp — not fake detail.
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'SHALI');
const OUT = path.join(ROOT, 'public', 'photos');

// Each job: source WhatsApp file → output basename, with per-image tuning.
const jobs = [
  {
    // Blazing golden-hour sunset, landscape, highest-quality landscape → COVER.
    src: 'WhatsApp Image 2026-07-07 at 11.30.28 PM (1).jpeg',
    out: 'exp-shali-cover',
    width: 1600,
    saturation: 1.05,
    brightness: 1.01,
    sharpen: 0.7,
  },
  {
    // Tall sunset over the whole town → feature (first) gallery tile.
    src: 'WhatsApp Image 2026-07-07 at 11.30.28 PM.jpeg',
    out: 'exp-shali-1',
    width: 1200,
    saturation: 1.05,
    brightness: 1.02,
    sharpen: 0.7,
  },
  {
    // Golden drone sunset, square.
    src: 'WhatsApp Image 2026-07-07 at 11.30.28 PM (3).jpeg',
    out: 'exp-shali-2',
    width: 1000,
    saturation: 1.05,
    brightness: 1.01,
    sharpen: 0.8,
  },
  {
    // Daytime blue-sky view — flattest source, needs the most lift.
    src: 'WhatsApp Image 2026-07-07 at 11.30.28 PM (2).jpeg',
    out: 'exp-shali-3',
    width: 1000,
    saturation: 1.11,
    brightness: 1.02,
    sharpen: 0.9,
  },
  {
    // Lifestyle: visitor by the minaret — human element for the tour story.
    src: 'WhatsApp Image 2026-07-07 at 11.30.29 PM.jpeg',
    out: 'exp-shali-4',
    width: 1000,
    saturation: 1.06,
    brightness: 1.02,
    sharpen: 0.8,
  },
];

for (const j of jobs) {
  const inPath = path.join(SRC, j.src);
  const meta = await sharp(inPath).metadata();
  // Only ever upscale modestly; never enlarge a tiny source past ~1.6x.
  const targetW = Math.min(j.width, Math.round(meta.width * 1.6));

  const base = () =>
    sharp(inPath)
      .rotate()
      .resize(targetW, null, { kernel: sharp.kernel.lanczos3, withoutEnlargement: false })
      .modulate({ saturation: j.saturation, brightness: j.brightness })
      .sharpen({ sigma: j.sharpen });

  await base().jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(OUT, `${j.out}.jpg`));
  await base().webp({ quality: 86 }).toFile(path.join(OUT, `${j.out}.webp`));
  console.log(`${j.out}  ${meta.width}x${meta.height} -> ${targetW}w  (sat ${j.saturation})`);
}
