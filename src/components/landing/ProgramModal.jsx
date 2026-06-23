import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Star, ArrowRight, Check, MapPin } from 'lucide-react';
import { useSiteContent } from '@/lib/siteContent';
import { useLanguage } from '@/lib/LanguageContext';
import { waLink } from '@/lib/whatsapp';
import manifest from '../../../public/photos/manifest.json';

/**
 * Full-screen modal showing a single program: day-by-day itinerary
 * (days[].title + items[]) and inclusions[] when present, plus a
 * WhatsApp booking CTA pre-filled with the program name.
 */
export default function ProgramModal({ program, onClose }) {
  const content = useSiteContent();
  const { t } = useLanguage();
  const brand = content?.brand ?? {};

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  if (!program) return null;

  const {
    id,
    name,
    subtitle,
    durationLabel,
    badge,
    summary,
    days = [],
    inclusions = [],
  } = program;

  const hero = manifest?.programs?.[id]?.hero ?? {};

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end justify-center bg-primary/80 backdrop-blur-sm md:items-center md:p-6"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-h-[95vh] overflow-y-auto rounded-t-panel bg-background md:max-w-5xl md:rounded-panel"
        >
          {/* Hero image (program hero from manifest) */}
          <div className="relative h-64 overflow-hidden rounded-t-panel md:h-80">
            <picture>
              {hero.webp && <source srcSet={hero.webp} type="image/webp" />}
              <img src={hero.jpg} alt={`${name} — Siwa journey cover photo`} loading="lazy" decoding="async" className="h-full w-full object-cover heat-haze" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <div className="absolute bottom-6 start-6 end-16">
              {badge && (
                <span className="rounded-full bg-secondary px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary-foreground">
                  {badge}
                </span>
              )}
              <h2 className="mt-3 font-display text-4xl leading-tight text-primary-foreground md:text-5xl">{name}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('closeModal')}
              className="absolute end-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 md:p-10">
            {/* Meta row */}
            <div className="flex flex-wrap gap-4 text-sm">
              {durationLabel && (
                <span className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
                  <Clock className="h-4 w-4 text-primary" /> {durationLabel}
                </span>
              )}
              <span className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
                <MapPin className="h-4 w-4 text-primary" /> Siwa Oasis, Egypt
              </span>
              <span className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
                <Star className="h-4 w-4 fill-secondary text-secondary" /> 5.0 · Tripadvisor
              </span>
            </div>

            {/* Summary */}
            {summary && (
              <p className="mt-8 font-body text-lg leading-8 text-muted-foreground">{summary}</p>
            )}

            {/* Day-by-day itinerary */}
            {days.length > 0 && (
              <div className="mt-10">
                <h3 className="font-heading text-3xl text-foreground">{brand.viewItinerary ?? 'The itinerary'}</h3>
                <div className="mt-6 space-y-5">
                  {days.map((day, di) => (
                    <div key={di} className="rounded-card border border-border bg-card p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          {di + 1}
                        </span>
                        <h4 className="font-heading text-xl text-foreground">{day.title}</h4>
                      </div>
                      <ul className="mt-4 space-y-3 md:ps-11">
                        {(day.items ?? []).map((item, ii) => (
                          <li key={ii} className="flex items-start gap-3">
                            <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                            <span className="font-body text-sm leading-6 text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions (when present) */}
            {inclusions.length > 0 && (
              <div className="mt-10">
                <h3 className="font-heading text-3xl text-foreground">What's included</h3>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                      <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="font-body text-sm leading-6 text-foreground">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA — WhatsApp booking pre-filled with the program name */}
            <div className="mt-10 flex flex-col gap-4 rounded-card bg-primary p-7 text-primary-foreground md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-heading text-2xl">{name}</p>
                <p className="mt-1 font-body text-sm text-primary-foreground/70">{brand.priceOnRequest}</p>
              </div>
              <a
                href={waLink(`${brand.bookCta ?? 'Booking enquiry'} — ${name}`)}
                target="_blank"
                rel="noreferrer"
                className="salt-crystal inline-flex items-center gap-3 rounded-full bg-primary-foreground px-7 py-4 font-body text-sm font-bold uppercase tracking-[0.2em] text-primary transition hover:-translate-y-1"
              >
                {brand.bookCta ?? 'Reserve via WhatsApp'} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
