# Photo Curation & Slot Mapping — real photos in `Pictures/`

44 source JPGs in `Pictures/`. Most are low-res (WhatsApp-compressed) → upscale with sharp (lanczos3) + mild sharpen.
`#n` = contact-sheet index. Below is the index → original filename map, then content notes, then slot assignments.

## Index → filename
| # | file | content |
|---|---|---|
| 0 | 00000005-PHOTO-2026-06-08-23-57-03.jpg | White Desert night: Milky Way over chalk rock + glowing tent |
| 1 | 00000024-PHOTO-2026-06-09-20-42-38.jpg | **SCREENSHOT (exclude)** teal social graphic |
| 2 | 00000051-PHOTO-2026-06-20-22-13-03.jpg | **SCREENSHOT (exclude)** white card |
| 3 | 00000053-PHOTO-2026-06-20-22-19-08.jpg | smooth sand dunes, daytime |
| 4 | 00000054-PHOTO-2026-06-20-22-19-09.jpg | palm silhouette at sunset over water |
| 5 | 00000055-PHOTO-2026-06-20-22-19-12.jpg | ancient temple ruins / stone columns (Amun/heritage) |
| 6 | 00000056-PHOTO-2026-06-20-22-19-12.jpg | Bedouin campfire dinner at night, warm |
| 7 | 00000057-PHOTO-2026-06-20-22-19-12.jpg | turquoise salt lake with white salt edges + palm |
| 8 | 00000058-PHOTO-2026-06-20-22-19-13.jpg | salt-lake pool, turquoise, green palms |
| 9 | 00000059-PHOTO-2026-06-20-22-19-13.jpg | desert dunes, blue sky |
| 10 | 00000060-PHOTO-2026-06-20-22-19-13.jpg | salt lake, turquoise, desert |
| 11 | 00000061-PHOTO-2026-06-20-22-19-14.jpg | sunset over water, orange sky, silhouette |
| 12 | 00000062-PHOTO-2026-06-20-22-19-14.jpg | vast sand-dune panorama |
| 13 | 00000063-PHOTO-2026-06-20-22-19-15.jpg | small figures on a desert ridge |
| 14 | 00000064-PHOTO-2026-06-20-22-19-15.jpg | sunset dinner table set in the desert (experiential dining) |
| 15 | 00000065-PHOTO-2026-06-20-22-19-15.jpg | market/shop interior, textiles, traditional dress |
| 16 | 00000066-PHOTO-2026-06-20-22-19-15.jpg | palms & greenery, oasis garden |
| 17 | 00000067-PHOTO-2026-06-20-22-19-16.jpg | rocky desert, vehicle, person on ledge |
| 18 | 00000068-PHOTO-2026-06-20-22-19-16.jpg | turquoise salt lake with palms |
| 19 | 00000069-PHOTO-2026-06-20-22-19-17.jpg | salt flat / lake panorama with mountain (calm, wide) |
| 20 | 00000070-PHOTO-2026-06-20-22-19-17.jpg | sunset over dunes with figure |
| 21 | 00000071-PHOTO-2026-06-20-22-19-17.jpg | 4x4 vehicle in desert, person standing (safari) |
| 22 | 00000072-PHOTO-2026-06-20-22-19-18.jpg | sand dunes, small distant figure |
| 23 | 00000073-PHOTO-2026-06-20-22-19-18.jpg | **SCREENSHOT (exclude)** booking/website |
| 24 | 00000074-PHOTO-2026-06-20-22-19-18.jpg | oasis picnic on rug under palms (culture/relax) |
| 25 | 00000075-PHOTO-2026-06-20-22-19-18.jpg | 4x4 vehicles parked, people (safari group) |
| 26 | 00000076-PHOTO-2026-06-20-22-19-18.jpg | people on dune watching sunset, sandboards (golden hour) |
| 27 | 00000077-PHOTO-2026-06-20-22-19-19.jpg | two people on dune ridge at sunset |
| 28 | 00000078-PHOTO-2026-06-20-22-19-19.jpg | turquoise salt lake, people floating, palms |
| 29 | 00000079-PHOTO-2026-06-20-22-19-19.jpg | people walking through palm grove / oasis path |
| 30 | 00000080-PHOTO-2026-06-20-22-19-19.jpg | sunset, warm tones on dune |
| 31 | 00000082-PHOTO-2026-06-20-22-19-19.jpg | minimal salt flat, white ground (calm) |
| 32 | 00000083-PHOTO-2026-06-20-22-19-20.jpg | **dark meditation/night (optional, low priority)** |
| 33 | 00000084-PHOTO-2026-06-20-22-19-20.jpg | **HERO** aerial top-down: person floating in turquoise salt lake |
| 34 | 00000085-PHOTO-2026-06-20-22-19-20.jpg | person standing arms-out in white salt flat |
| 35 | 00000088-PHOTO-2026-06-20-22-51-59.jpg | **SCREENSHOT (exclude)** chat UI |
| 36 | 00000100-PHOTO-2026-06-21-20-04-00.jpg | sunset with person + rock formation, silhouette |
| 37 | 00000101-PHOTO-2026-06-21-20-04-00.jpg | White Desert chalk formations field |
| 38 | 00000102-PHOTO-2026-06-21-20-04-00.jpg | desert camp tents at night with campfire + people |
| 39 | 00000103-PHOTO-2026-06-21-20-04-00.jpg | market stall with crafts + person seated |
| 40 | 00000104-PHOTO-2026-06-21-20-04-00.jpg | White Desert: people + 4x4 among chalk rocks |
| 41 | 00000105-PHOTO-2026-06-21-20-04-00.jpg | White Desert chalk rock formations, dramatic |
| 42 | 00000106-PHOTO-2026-06-21-20-04-01.jpg | warm-lit domed tent / camp interior |
| 43 | 00000107-PHOTO-2026-06-21-20-04-01.jpg | White Desert mushroom rock at twilight |

**Exclude:** 1, 2, 23, 35 (screenshots). 32 optional/low-priority.

## Slot assignments (output name → source `#` → original file)
- `hero` → #33 → 00000084 (aerial float)  [primary hero]
- `philosophy` → #19 → 00000069 (calm salt flat)  [About band]
- `exp-salt-lake-cover` → #33 (or #28); gallery: #28 00000078, #7 00000057, #34 00000085, #31 00000082, #10 00000060, #18 00000068
- `exp-springs-cover` → #16 00000066; gallery: #8 00000058, #18 00000068, + 1 AI image (salt-cave interior)
- `exp-safari-cover` → #25 00000075; gallery: #26 00000076, #27 00000077, #13 00000063, #21 00000071, #22 00000072, #20 00000070, #3 00000053
- `exp-temple-cover` → #5 00000055
- `exp-shali-cover` → **AI image** (no real photo); gallery: #15 00000065, #39 00000103
- `exp-white-desert-cover` → #0 00000005; gallery: #37 00000101, #40 00000104, #41 00000105, #43 00000107, #38 00000102, #42 00000106
- `exp-sunset-island-cover` → #14 00000064; gallery: #11 00000061, #4 00000054, #6 00000056, #24 00000074, #30 00000080
- Packages: `pkg-siwa-1n` → #28 00000078 · `pkg-siwa-2n` → #26 00000076 · `pkg-siwa-4n` → #12 00000062 (avoid hero dup) · `pkg-siwa-5n` → #31 00000082 · `pkg-bahariya-1n` → #0 00000005 · `pkg-white-desert-3n` → #41 00000105
- `feature-strip` → #38 00000102 (or #0)
- Blog: `blog-1` #6 00000056 · `blog-2` #16 00000066 · `blog-3` #5 00000055 · `blog-4` #14 00000064 · `blog-5` #24 00000074 · `blog-6` #37 00000101
- `social-accent` → #29 00000079

## Aspect/width targets
hero 2400w (16:9 + portrait-safe focal center) · philosophy/feature 2200w (21:9) · exp cover 1200w (4:3) · gallery 900w (4:3) · pkg card 1100w (16:9) · blog 1000w (16:10). Output `.jpg` (q82) + `.webp`. Manifest → `public/photos/manifest.json`.
