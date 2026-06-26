// One-time image pipeline for "Siwa with Kelany".
// Reads real phone photos from Pictures/, smart-crops + upscales + sharpens,
// outputs public/photos/<name>.jpg (mozjpeg q82) and .webp (q80).
// Originals in Pictures/ are NEVER modified.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'Pictures');
const OUT_DIR = path.join(ROOT, 'public', 'photos');

fs.mkdirSync(OUT_DIR, { recursive: true });

// Index -> original filename (from docs/source/photo-mapping.md)
const idx = {
  0: '00000005-PHOTO-2026-06-08-23-57-03.jpg',
  3: '00000053-PHOTO-2026-06-20-22-19-08.jpg',
  4: '00000054-PHOTO-2026-06-20-22-19-09.jpg',
  5: '00000055-PHOTO-2026-06-20-22-19-12.jpg',
  6: '00000056-PHOTO-2026-06-20-22-19-12.jpg',
  7: '00000057-PHOTO-2026-06-20-22-19-12.jpg',
  8: '00000058-PHOTO-2026-06-20-22-19-13.jpg',
  9: '00000059-PHOTO-2026-06-20-22-19-13.jpg',
  10: '00000060-PHOTO-2026-06-20-22-19-13.jpg',
  11: '00000061-PHOTO-2026-06-20-22-19-14.jpg',
  12: '00000062-PHOTO-2026-06-20-22-19-14.jpg',
  13: '00000063-PHOTO-2026-06-20-22-19-15.jpg',
  14: '00000064-PHOTO-2026-06-20-22-19-15.jpg',
  15: '00000065-PHOTO-2026-06-20-22-19-15.jpg',
  16: '00000066-PHOTO-2026-06-20-22-19-15.jpg',
  17: '00000067-PHOTO-2026-06-20-22-19-16.jpg',
  18: '00000068-PHOTO-2026-06-20-22-19-16.jpg',
  19: '00000069-PHOTO-2026-06-20-22-19-17.jpg',
  20: '00000070-PHOTO-2026-06-20-22-19-17.jpg',
  21: '00000071-PHOTO-2026-06-20-22-19-17.jpg',
  22: '00000072-PHOTO-2026-06-20-22-19-18.jpg',
  24: '00000074-PHOTO-2026-06-20-22-19-18.jpg',
  25: '00000075-PHOTO-2026-06-20-22-19-18.jpg',
  26: '00000076-PHOTO-2026-06-20-22-19-18.jpg',
  27: '00000077-PHOTO-2026-06-20-22-19-19.jpg',
  28: '00000078-PHOTO-2026-06-20-22-19-19.jpg',
  29: '00000079-PHOTO-2026-06-20-22-19-19.jpg',
  30: '00000080-PHOTO-2026-06-20-22-19-19.jpg',
  31: '00000082-PHOTO-2026-06-20-22-19-19.jpg',
  33: '00000084-PHOTO-2026-06-20-22-19-20.jpg',
  34: '00000085-PHOTO-2026-06-20-22-19-20.jpg',
  36: '00000100-PHOTO-2026-06-21-20-04-00.jpg',
  37: '00000101-PHOTO-2026-06-21-20-04-00.jpg',
  38: '00000102-PHOTO-2026-06-21-20-04-00.jpg',
  39: '00000103-PHOTO-2026-06-21-20-04-00.jpg',
  40: '00000104-PHOTO-2026-06-21-20-04-00.jpg',
  41: '00000105-PHOTO-2026-06-21-20-04-00.jpg',
  42: '00000106-PHOTO-2026-06-21-20-04-01.jpg',
  43: '00000107-PHOTO-2026-06-21-20-04-01.jpg',
};

// Aspect/width targets per slot type
const A = {
  hero: { w: 2400, h: Math.round(2400 * 9 / 16) },      // 16:9 (high-res licensed hero source)
  philosophy: { w: 2200, h: Math.round(2200 * 9 / 21) }, // 21:9
  feature: { w: 2200, h: Math.round(2200 * 9 / 21) },    // 21:9
  cover: { w: 1200, h: Math.round(1200 * 3 / 4) },       // 4:3
  gallery: { w: 900, h: Math.round(900 * 3 / 4) },       // 4:3
  pkg: { w: 1100, h: Math.round(1100 * 9 / 16) },        // 16:9
  blog: { w: 1000, h: Math.round(1000 * 10 / 16) },      // 16:10
  social: { w: 1100, h: Math.round(1100 * 9 / 16) },     // 16:9
};

// slot list: { name, src(index), type }
const slots = [
  { name: 'hero', file: 'hero-oasis-unsplash.jpg', type: 'hero' }, // premium Siwa salt-lakes hero (Unsplash, free commercial license)
  { name: 'philosophy', src: 19, type: 'philosophy' },
  { name: 'feature-strip', src: 38, type: 'feature' },
  { name: 'social-accent', src: 29, type: 'social' },

  // experience covers
  { name: 'exp-salt-lake-cover', src: 33, type: 'cover' },
  { name: 'exp-springs-cover', src: 16, type: 'cover' },
  { name: 'exp-safari-cover', src: 25, type: 'cover' },
  { name: 'exp-temple-cover', src: 5, type: 'cover' },
  { name: 'exp-white-desert-cover', src: 43, type: 'cover' }, // was QR (#0); now iconic White Desert rock
  { name: 'exp-sunset-island-cover', src: 14, type: 'cover' },

  // experience galleries (<id>-N)
  { name: 'exp-salt-lake-1', src: 28, type: 'gallery' },
  { name: 'exp-salt-lake-2', src: 7, type: 'gallery' },
  { name: 'exp-salt-lake-3', src: 34, type: 'gallery' },
  { name: 'exp-salt-lake-4', src: 13, type: 'gallery' }, // was 31 (now hero); salt-lake reflection walk
  { name: 'exp-salt-lake-5', src: 10, type: 'gallery' },
  { name: 'exp-salt-lake-6', src: 18, type: 'gallery' },

  { name: 'exp-springs-1', src: 8, type: 'gallery' },
  { name: 'exp-springs-2', src: 18, type: 'gallery' },

  { name: 'exp-safari-1', src: 26, type: 'gallery' },
  { name: 'exp-safari-2', src: 27, type: 'gallery' },
  { name: 'exp-safari-3', src: 13, type: 'gallery' },
  { name: 'exp-safari-4', src: 21, type: 'gallery' },
  { name: 'exp-safari-5', src: 22, type: 'gallery' },
  { name: 'exp-safari-6', src: 20, type: 'gallery' },
  { name: 'exp-safari-7', src: 3, type: 'gallery' },

  { name: 'exp-shali-1', src: 15, type: 'gallery' },
  { name: 'exp-shali-2', src: 39, type: 'gallery' },

  { name: 'exp-white-desert-1', src: 37, type: 'gallery' },
  { name: 'exp-white-desert-2', src: 40, type: 'gallery' },
  { name: 'exp-white-desert-3', src: 41, type: 'gallery' },
  { name: 'exp-white-desert-4', src: 43, type: 'gallery' },
  { name: 'exp-white-desert-5', src: 38, type: 'gallery' },
  { name: 'exp-white-desert-6', src: 42, type: 'gallery' },

  { name: 'exp-sunset-island-1', src: 11, type: 'gallery' },
  { name: 'exp-sunset-island-2', src: 4, type: 'gallery' },
  { name: 'exp-sunset-island-3', src: 6, type: 'gallery' },
  { name: 'exp-sunset-island-4', src: 24, type: 'gallery' },
  { name: 'exp-sunset-island-5', src: 30, type: 'gallery' },

  // packages
  { name: 'pkg-siwa-1n', src: 28, type: 'pkg' },
  { name: 'pkg-siwa-2n', src: 26, type: 'pkg' },
  { name: 'pkg-siwa-4n', src: 12, type: 'pkg' },
  { name: 'pkg-siwa-5n', src: 18, type: 'pkg' }, // was 31 (now hero); serene salt lake for the retreat
  { name: 'pkg-bahariya-1n', src: 40, type: 'pkg' }, // was QR (#0); now White Desert 4x4
  { name: 'pkg-white-desert-3n', src: 41, type: 'pkg' },

  // blog
  { name: 'blog-1', src: 6, type: 'blog' },
  { name: 'blog-2', src: 16, type: 'blog' },
  { name: 'blog-3', src: 5, type: 'blog' },
  { name: 'blog-4', src: 14, type: 'blog' },
  { name: 'blog-5', src: 24, type: 'blog' },
  { name: 'blog-6', src: 37, type: 'blog' },
];

async function processSlot(slot) {
  const file = slot.file ?? idx[slot.src];
  if (!file) throw new Error(`No source mapped for ${slot.name}`);
  const srcPath = path.join(SRC_DIR, file);
  if (!fs.existsSync(srcPath)) throw new Error(`Missing source ${srcPath}`);

  const { w, h } = A[slot.type];

  // base pipeline: rotate by EXIF, resize+smart-crop to slot aspect (cover, attention),
  // mild sharpen, gentle saturation/brightness lift.
  const base = () =>
    sharp(srcPath)
      .rotate() // auto-orient by EXIF
      .resize(w, h, {
        fit: 'cover',
        // Center crop is predictable for these phone photos (the subject is almost
        // always centered); the old `attention` strategy occasionally zoomed onto a
        // bright/high-entropy patch and cropped the subject out. Small gallery thumbs
        // still use attention (subject-finding helps there). Per-slot `g` overrides.
        position: slot.g ?? (slot.type === 'gallery' ? sharp.strategy.attention : sharp.gravity.centre),
        kernel: sharp.kernel.lanczos3,
        withoutEnlargement: false, // UPSCALE small images
      })
      .modulate({ saturation: 1.08, brightness: 1.04 }) // gentle lift
      .sharpen({ sigma: 0.8 }); // mild unsharp

  const jpgPath = path.join(OUT_DIR, `${slot.name}.jpg`);
  const webpPath = path.join(OUT_DIR, `${slot.name}.webp`);

  await base().jpeg({ quality: 82, mozjpeg: true }).toFile(jpgPath);
  await base().webp({ quality: 80 }).toFile(webpPath);

  const jb = fs.statSync(jpgPath).size;
  const wb = fs.statSync(webpPath).size;
  console.log(`OK ${slot.name.padEnd(24)} ${w}x${h}  jpg ${(jb / 1024).toFixed(0)}KB  webp ${(wb / 1024).toFixed(0)}KB`);
  return { name: slot.name, jpg: jb, webp: wb };
}

(async () => {
  let ok = 0;
  const failures = [];
  for (const slot of slots) {
    try {
      await processSlot(slot);
      ok++;
    } catch (e) {
      failures.push(`${slot.name}: ${e.message}`);
      console.error(`FAIL ${slot.name}: ${e.message}`);
    }
  }
  console.log(`\nDone. ${ok}/${slots.length} slots generated. Failures: ${failures.length}`);
  if (failures.length) process.exitCode = 1;
})();
