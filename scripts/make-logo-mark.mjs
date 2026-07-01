// Extract the circular emblem from the stacked logo and give it transparent
// corners, so it can sit on ANY background (the dark hero AND the light nav).
// The wordmark is rendered as live text in the header, so we only need the mark.
// Output: public/logo-mark.png (320×320, transparent outside the navy ring).
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'NEW', 'LOGO SIWA.jpeg'); // 1000×1000, circle in the top ~60%

// 1. Crop a generous box around the circular emblem (above the "SIWA" wordmark),
//    then trim the surrounding white so the navy ring hugs all four edges.
//    NOTE: extract + trim must be SEPARATE sharp passes — combined in one
//    pipeline sharp trims the full image first, breaking the extract bounds.
const cropped = await sharp(SRC)
  .extract({ left: 250, top: 140, width: 500, height: 470 })
  .png()
  .toBuffer();
const trimmed = await sharp(cropped).trim({ threshold: 12 }).png().toBuffer();
const m = await sharp(trimmed).metadata();
const size = Math.min(m.width, m.height);
console.log(`trimmed emblem ${m.width}×${m.height} -> square ${size}`);

// 2. Centre-crop to a perfect square (the circle is symmetric).
const square = await sharp(trimmed)
  .extract({
    left: Math.round((m.width - size) / 2),
    top: Math.round((m.height - size) / 2),
    width: size,
    height: size,
  })
  .toBuffer();

// 3. Circular alpha mask (radius hugs the ring; white corners fall away).
//    Render to EXACTLY size×size — librsvg can rasterise larger than the
//    SVG's declared px, which would exceed the base and break compositing.
const r = size / 2;
const mask = await sharp(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`
  )
)
  .resize(size, size)
  .png()
  .toBuffer();

// Composite the mask at FULL size first — sharp applies resize before
// composite within one pipeline, so masking and downscaling must be
// separate passes or the mask ends up larger than the resized base.
const masked = await sharp(square)
  .ensureAlpha()
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp(masked)
  .resize(320, 320, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: sharp.kernel.lanczos3 })
  .png({ compressionLevel: 9 })
  .toFile(path.join(ROOT, 'public', 'logo-mark.png'));

const kb = Math.round(fs.statSync(path.join(ROOT, 'public', 'logo-mark.png')).size / 1024);
console.log(`OK logo-mark.png  320×320 transparent  ${kb}KB`);
