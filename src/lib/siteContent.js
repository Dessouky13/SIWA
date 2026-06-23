import { useLanguage } from '@/lib/LanguageContext';

import en from '@/content/en.json';
import ar from '@/content/ar.json';
import fr from '@/content/fr.json';
import de from '@/content/de.json';
import es from '@/content/es.json';
import it from '@/content/it.json';
import ru from '@/content/ru.json';
import zh from '@/content/zh.json';

const content = { en, ar, fr, de, es, it, ru, zh };

/**
 * Return the content object for a language code, falling back to English
 * for any unknown / missing code.
 */
export function getContent(langCode) {
  return content[langCode] ?? content.en;
}

/**
 * Hook that reads the active language via useLanguage() and returns the
 * matching content object (English fallback).
 */
export function useSiteContent() {
  const ctx = useLanguage();
  return getContent(ctx?.lang);
}

/** Find an experience by id within a content object. */
export function getExperience(content, id) {
  return content?.experiences?.find((e) => e.id === id);
}

/** Find a program by id within a content object. */
export function getProgram(content, id) {
  return content?.programs?.find((p) => p.id === id);
}
