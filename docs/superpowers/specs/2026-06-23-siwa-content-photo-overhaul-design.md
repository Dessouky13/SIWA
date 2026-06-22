# Siwa with Kelany — Real Content + Photo Overhaul (Design)

**Date:** 2026-06-23
**Status:** Awaiting user review

## 1. Goal

Transform the replicated Base44 landing page from AI-generated placeholders into an authentic,
production-ready site for the owner (Mohamed Kelany) by integrating:

1. **Real photos** (44 phone photos in `Pictures/`), curated + cleaned + bundled locally.
2. **Real tour programs** (6 itineraries the owner provided), replacing placeholder packages.
3. **Luxury-healing brand voice** aimed at the European slow-travel / retreat market.
4. All new tour content in **all 8 supported languages** (EN, AR, FR, DE, ES, IT, RU, ZH).

Page framework/layout is **not** redesigned — same sections, real media + real content + new voice.

## 2. Decisions (from brainstorming)

| Decision | Choice |
|---|---|
| Scope | Full overhaul (photos + real programs + luxury tone) |
| Image cleanup | Smart resample + sharpen via `sharp` (lanczos upscale, denoise, sharpen, WebP/JPG) |
| Languages for new content | All 8 languages |
| Hero photo | #33 — aerial float in turquoise salt lake |
| Photo gaps (Shali fortress, salt-cave/hot-spring interior) | Keep a tasteful existing AI image only for those 2–3 slots |
| Tour content storage | New `src/lib/toursData.js` module (data + per-language fields); `LanguageContext` keeps UI chrome only |
| Image hosting | Local `public/photos/` (removes Base44 image dependency) |

## 3. Image pipeline

- Add `sharp` as a devDependency.
- One-time script `scripts/process-photos.mjs` with an explicit manifest mapping
  `source index (Pictures/) → output name + target aspect ratio + width`.
- Per image: auto-rotate (EXIF), smart-crop to slot aspect, lanczos upscale if below target,
  mild denoise + unsharp, export `public/photos/<name>.jpg` (quality ~82) and `.webp`.
- Excluded sources: 1, 2, 23, 35 (screenshots/UI), 32 (too dark/artistic).
- Originals in `Pictures/` are never modified.

### Output slots & widths (approx.)

| Slot | Aspect | Width |
|---|---|---|
| Hero (full-bleed) | object-cover, ~16:9 + portrait safe | 2400 |
| Experience cover | 4:3 | 1200 |
| Package card hero | 16:9 | 1100 |
| Gallery thumbs | 4:3 | 900 |
| White Desert feature strip | 21:9 | 2200 |
| Blog post images | 16:10 | 1000 |
| About / philosophy band | 16:9 | 2000 |

## 4. Curated photo → slot mapping

(`#n` = contact-sheet index; see `.contact/map.txt` for original filenames.)

- **Hero:** #33 (aerial float)
- **About / Philosophy band:** #19 (serene salt flat) or #31 (minimal salt) — calm, wide, negative space
- **Experience Matrix (6 activities):**
  - Salt Lakes & Floating — cover #33; gallery 28, 7, 34, 31, 10, 18
  - Cleopatra Spring / Hot Springs & Salt Cave — cover #16; gallery 8, 18 + **1 AI image** (salt-cave interior)
  - Great Sand Sea Safari — cover #25; gallery 26, 27, 13, 21, 22, 20
  - Temple of the Oracle (Amun) & History — cover #5; gallery 5
  - Shali Fortress & Old Town — **AI image** cover (no real photo); gallery 15, 39 (market/culture)
  - White Desert & Night Camping — cover #0; gallery 37, 40, 41, 43, 38
  - Sunset Island & Tea Ritual — cover #14; gallery 11, 4, 6, 24
- **Packages (6 programs):**
  1. Siwa 1N/2D → #28
  2. Siwa 2N/3D → #26
  3. Siwa 4D/3N → #33 (or #12 to avoid hero dupe)
  4. Siwa 5N/6D retreat → #19 / #31
  5. Bahariya & White Desert 1N/2D → #0
  6. White Desert 3D/2N → #41
- **White Desert feature strip:** #0 or #38
- **Blog (6 posts):** 6, 16, 5, 14, 24, 37
- **Social/Footer accent:** #29 or #12

> Final per-slot picks may shift slightly during processing for crop/quality; user can veto any.

## 5. Tour programs (real content — source of truth)

Stored in `src/lib/toursData.js`. English written in luxury-healing voice; Arabic from owner;
FR/DE/ES/IT/RU/ZH translated. Each program: id, durationLabel, heroImage, summary, inclusions
(where given), and `days[]` with `{ title, items[] }`.

### P1 — Siwa, 1 Night / 2 Days ("Discover the Magic of Siwa")
Transfer from Cairo (evening) — private car or coach (client's choice).
- **Day 1:** Arrival & hotel check-in, rest. Temple of the Oracle (Amun) + oasis panorama. Cleopatra Spring. 4x4 desert safari — Siwa nature reserve, dunes & sandboarding, photos; Bedouin tea with locals; desert sunset; Bedouin dinner under open sky; stargazing. Return to hotel.
- **Day 2:** Salt lakes (floating). Natural hot springs. Salt-cave relaxation. Siwa museum. Shali fortress & old alleys. Sunset on a Siwa island. Return to Cairo (evening).

### P2 — Siwa, 2 Nights / 3 Days
Transfer from Cairo (morning or evening). Itinerary adjustable to client.
- **Day 1:** Arrival, check-in, rest. Temple of Amun; Cleopatra Spring; a Siwa island; sunset. Candlelit dinner at a restaurant. Hotel.
- **Day 2:** Salt lakes; hot springs; salt-cave relaxation. 4x4 safari with Siwan lunch in the desert; nature reserve; dunes, gravel fields & mountains; photos; Bedouin tea with locals; sandboarding; desert sunset; Bedouin dinner; stargazing. Hotel.
- **Day 3:** Breakfast on a Siwa island; Shali fortress & old alleys. Depart 10:30pm back to Cairo.

### P3 — Siwa, 4 Days / 3 Nights ("Live the Legend")
- **Day 1 — Arrival & first sunset:** Check-in/rest. Temple of the Oracle (Amun; Alexander the Great) + full panorama. Cleopatra Spring. Sunset sail to a Siwa island. Warm Siwan dinner. Hotel.
- **Day 2 — The Great Safari:** Breakfast on a Siwa island. 10:30am 4x4 into the Great Sand Sea (full day). Special Bedouin charcoal lunch. Sandboarding. Desert sunset. Campfire Bedouin dinner + Siwan mint tea under the stars. Hotel.
- **Day 3 — White healing, history, luminous Shali:** Salt lakes (floating). Hot springs + deep relaxation in salt cave (candles). Mountain of the Dead (pharaonic & Greek tombs). Shali fortress & kershef story; sunset from the top. Old market (dates, olives, crafts). Candlelit dinner on Shali rooftop. Hotel.
- **Day 4 — Farewell:** Breakfast, last look, check-out, return.

### P4 — Siwa, 5 Nights / 6 Days ("Nature, Relaxation & Meditation Retreat")
- **Day 1 — Arrival & relaxation:** Check-in, rest; a natural hot spring; relax & meditate; healthy dinner; overnight.
- **Day 2 — Salt lakes & Shali:** Traditional Siwan breakfast on a natural island; salt-lake floating; hot spring; Shali fortress & historic alleys; sunset from the castle; special heritage candlelit dinner. Hotel.
- **Day 3 — Great Sand Sea safari:** Full-day safari; golden dunes; quiet/meditation in nature; healthy Siwan lunch; desert sunset; Bedouin dinner under open sky; stargazing. Hotel.
- **Day 4 — Relaxation & nature:** Salt lakes; natural-oil care session; hot springs; rest; quiet boat trip to a natural island; sunset. Hotel.
- **Day 5 — Cleopatra Spring & Temple of Amun:** Cleopatra Spring; salt-cave relaxation; free time; Temple of Amun; natural-mountain panorama; sunset; dinner. Hotel.
- **Day 6 — Departure:** Breakfast, check-out, return to Cairo.

### P5 — Bahariya & White Desert, 1 Night / 2 Days
- **Day 1:** 07:00 depart Cairo; 11:00 arrive Bahariya Oasis; lunch. 4x4 safari: Black Desert, Bedouin village, Crystal Mountain, Agabat Valley, Mushroom Rock, Old White Desert, New White Desert formations; sunset in the White Desert; arrive camp; Bedouin dinner (grilled chicken), tea, campfire, stargazing; overnight in tent (one tent per two).
- **Day 2:** Sunrise; breakfast at camp; morning exploration of formations; return to Bahariya; 10:00 depart to Cairo.

### P6 — White Desert, 3 Days / 2 Nights
- **Day 1:** Depart to the desert; Black Desert; Cold Sulfur Spring; Bedouin Village; Crystal Mountain; return to Bahariya; dinner; overnight hotel in Bahariya.
- **Day 2:** Full-day safari: El Agabat, sandboarding, Moon Cave, Valley of the Palm, Valley Camps, New White Desert, Old White Desert; Bedouin dinner; overnight camping in New White Desert; stars.
- **Day 3:** Sunrise; breakfast; explore more formations; return to Bahariya; departure.
- **Included:** 4x4 jeep, breakfast, lunch, dinner, mineral water, fruits, hot & soft drinks, camping equipment (tent, mattresses, blankets, sleeping bags), English-speaking guide, 1 night hotel in Bahariya, 1 night camping in White Desert, all meals.

## 6. Brand voice (luxury healing)

- **Hero:** evocative, stillness-led headline + subcopy; primary CTA → WhatsApp.
- **New "Philosophy / About Siwa" band** after Hero, using the owner's brand-story copy:
  *"Hidden between the endless golden dunes… a place where time slows down, and something within you begins to realign. Siwa is not a destination you simply visit — it is a space you enter to reconnect with silence, nature, and yourself."*
  Closing signature: *"Leave Siwa not as a visitor… but as someone who has remembered something they had forgotten."*
- Experience descriptions & package subtitles rewritten: meaning, transformation, silence, healing, slow luxury — not "tours & safari" bullet-speak.
- All booking CTAs remain WhatsApp (+201063764483) with pre-filled, trip-specific messages.

## 7. Section-by-section changes

| Section | Change |
|---|---|
| Hero | Real photo #33; luxury headline/subcopy (8 langs) |
| **Philosophy/About (new)** | New band with brand-story copy + calm photo (8 langs) |
| Experience Matrix | 6 real activities, real photos (+AI for Shali/salt-cave), luxury copy |
| Packages | 6 real programs; modal shows day-by-day itinerary; real photos |
| White Desert strip | Real night photo |
| Blog | Swap post images to real photos; keep posts (light tone pass optional) |
| SocialBar / SocialProof / Footer | Real photo accents where applicable; links unchanged |
| `toursData.js` (new) | Structured 6 programs + experiences content in 8 languages |
| `LanguageContext` | Add only UI keys for new sections (e.g. About band labels) |

## 8. Phasing

- **Phase 1 — Photos:** add `sharp`, write `process-photos.mjs`, generate `public/photos/`, swap all image URLs to local real photos (AI kept only for gap slots).
- **Phase 2 — Content + voice:** create `toursData.js`, rebuild Packages + Experience Matrix from it, add Philosophy/About band, apply luxury copy, wire 8-language content, update `LanguageContext` UI keys.

Each phase ends with `npm run dev` visual verification.

## 9. Risks / constraints

- **Upscaling adds clarity, not detail** — lanczos+sharpen improves low-res phone photos for web but cannot invent missing detail; the very softest shots get smaller display slots.
- **Translation quality** — FR/DE/ES/IT/RU/ZH itinerary text is model-translated; owner should proof Arabic/native copy before going live.
- **AI-image slots** — Shali fortress + salt-cave interior remain AI until real photos are supplied.
- **Content length** — `toursData.js` will be large (6 programs × 8 languages); isolated in its own module to keep it maintainable.

## 10. Out of scope

- Decoupling the Base44 SDK / removing auth pages (separate task).
- New page-layout/framework redesign.
- Backend, booking system, or CMS (content stays in code).
- Deployment.
