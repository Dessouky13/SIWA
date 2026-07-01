import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

import en from '@/content/en.json';

// English ships in the initial bundle as the instant default. Every other
// language is a separate chunk fetched on demand the first time it's selected,
// so a default (English) visitor never downloads the other seven.
const loaders = {
  ko: () => import('@/content/ko.json'),
  fr: () => import('@/content/fr.json'),
  de: () => import('@/content/de.json'),
  es: () => import('@/content/es.json'),
  it: () => import('@/content/it.json'),
  ru: () => import('@/content/ru.json'),
  zh: () => import('@/content/zh.json'),
};

const cache = { en };

/**
 * Return the loaded content object for a language code, falling back to English
 * for any code that is unknown or not yet fetched.
 */
export function getContent(langCode) {
  return cache[langCode] ?? en;
}

/**
 * Hook that reads the active language via useLanguage() and returns the matching
 * content object. Non-English content loads lazily; English is shown until the
 * requested language's chunk resolves, at which point the component re-renders.
 */
export function useSiteContent() {
  const ctx = useLanguage();
  const lang = ctx?.lang ?? 'en';
  const [, forceRender] = useState(0);

  useEffect(() => {
    if (cache[lang] || !loaders[lang]) return;
    let active = true;
    loaders[lang]().then((mod) => {
      cache[lang] = mod.default ?? mod;
      if (active) forceRender((n) => n + 1);
    });
    return () => {
      active = false;
    };
  }, [lang]);

  return cache[lang] ?? en;
}

/** Find an experience by id within a content object. */
export function getExperience(content, id) {
  return content?.experiences?.find((e) => e.id === id);
}

/** Find a program by id within a content object. */
export function getProgram(content, id) {
  return content?.programs?.find((p) => p.id === id);
}
