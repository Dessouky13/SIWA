// Thin integration layer for Experiences.
//
// The source of truth for experience CONTENT (title, tag, duration, group size,
// location, description, highlights) is the localized site content returned by
// useSiteContent() — see src/content/*.json and src/lib/siteContent.js.
//
// The source of truth for experience IMAGERY (cover + gallery) is the photo
// manifest at public/photos/manifest.json, keyed by experience id. A couple of
// slots fall back to AI-generated imagery (manifest.aiFallback).
//
// This module resolves both into a single normalized shape consumed by
// <ExperienceMatrix /> and <ExperienceModal />:
//
//   {
//     id, title, tag, duration, groupSize, location, desc,
//     highlights: string[],
//     coverImage: { webp, jpg },   // <picture> sources
//     gallery: { webp, jpg }[],    // <picture> sources
//   }

import manifest from '../../../public/photos/manifest.json';

/** Normalize a manifest image entry (or a bare string URL) to { webp, jpg }. */
function toPicture(entry) {
  if (!entry) return null;
  if (typeof entry === 'string') return { webp: entry, jpg: entry };
  return { webp: entry.webp ?? entry.jpg, jpg: entry.jpg ?? entry.webp };
}

const aiFallback = manifest?.aiFallback ?? {};

/**
 * Per-experience image overrides. The brief requires:
 *  - shali cover  -> manifest.aiFallback.shali
 *  - the salt-cave gallery image (springs) -> manifest.aiFallback.saltCave
 * The springs gallery already references the salt-cave AI image directly in the
 * manifest, but we also guarantee it here so the slot is always present.
 */
const coverOverrides = {
  shali: aiFallback.shali,
};

/**
 * Resolve the cover + gallery <picture> sources for an experience id from the
 * manifest, applying AI fallbacks where required.
 */
export function resolveExperienceMedia(id) {
  const entry = manifest?.experiences?.[id] ?? {};

  const coverOverride = coverOverrides[id];
  const coverImage = coverOverride
    ? toPicture(coverOverride)
    : toPicture(entry.cover);

  const gallery = (entry.gallery ?? []).map(toPicture).filter(Boolean);

  // Guarantee the salt-cave AI image appears in the springs gallery.
  if (id === 'springs' && aiFallback.saltCave) {
    const saltCave = toPicture(aiFallback.saltCave);
    const present = gallery.some(
      (g) => g.jpg === saltCave.jpg || g.webp === saltCave.webp,
    );
    if (!present) gallery.push(saltCave);
  }

  return { coverImage, gallery };
}

/**
 * Merge a single localized experience content object with its resolved imagery
 * into the normalized shape consumed by the matrix card and modal.
 */
export function resolveExperience(content) {
  if (!content) return null;
  const { coverImage, gallery } = resolveExperienceMedia(content.id);
  return {
    id: content.id,
    title: content.title,
    tag: content.tag,
    duration: content.duration,
    groupSize: content.groupSize,
    location: content.location,
    desc: content.desc,
    highlights: Array.isArray(content.highlights) ? content.highlights : [],
    coverImage,
    gallery,
  };
}

/**
 * Resolve every experience from a localized site-content object into the
 * normalized shape, in manifest/content order.
 */
export function resolveExperiences(content) {
  return (content?.experiences ?? []).map(resolveExperience).filter(Boolean);
}
