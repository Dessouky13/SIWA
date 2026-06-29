import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, MapPin, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { waLink } from '@/lib/whatsapp';

export default function ExperienceModal({ experience, onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  if (!experience) return null;

  const {
    title,
    tag,
    duration,
    groupSize,
    location,
    desc,
    highlights = [],
    coverImage,
    gallery = [],
  } = experience;

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
          {/* Hero image */}
          <div className="relative h-48 overflow-hidden rounded-t-panel md:h-80">
            <picture>
              {coverImage?.webp && <source srcSet={coverImage.webp} type="image/webp" />}
              <img src={coverImage?.jpg} alt={`${title} — Siwa experience cover photo`} loading="lazy" decoding="async" className="h-full w-full object-cover heat-haze" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <div className="absolute bottom-4 start-5 end-14 md:bottom-6">
              <span className="rounded-full bg-secondary px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-secondary-foreground">
                {tag}
              </span>
              <h2 className="mt-2 font-display text-2xl leading-tight text-primary-foreground md:mt-3 md:text-5xl">{title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('closeModal')}
              className="absolute end-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:end-5 md:top-5 md:h-11 md:w-11"
            >
              <X className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>

          <div className="p-5 md:p-10">
            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 text-xs md:gap-4 md:text-sm">
              <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 md:px-4 md:py-2">
                <Clock className="h-3.5 w-3.5 text-primary" /> {duration}
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 md:px-4 md:py-2">
                <Users className="h-3.5 w-3.5 text-primary" /> {groupSize}
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 md:px-4 md:py-2">
                <MapPin className="h-3.5 w-3.5 text-primary" /> {location}
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 md:px-4 md:py-2">
                <Star className="h-3.5 w-3.5 fill-secondary text-secondary" /> 5.0 · Tripadvisor
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 font-body text-base leading-7 text-muted-foreground md:mt-8 md:text-lg md:leading-8">{desc}</p>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="mt-7 md:mt-8">
                <h3 className="font-heading text-2xl text-foreground md:text-3xl">{t('whatYouExperience')}</h3>
                <ul className="mt-4 grid gap-2.5 md:mt-5 md:grid-cols-2 md:gap-3">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3.5 md:p-4">
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary md:mt-1 md:h-4 md:w-4" />
                      <span className="font-body text-sm leading-6 text-foreground">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <div className="mt-8 md:mt-10">
                <h3 className="font-heading text-2xl text-foreground md:text-3xl">{t('throughTheLens')}</h3>
                <div className="mt-4 grid grid-cols-2 gap-2.5 md:mt-5 md:grid-cols-3 md:gap-3">
                  {gallery.map((img, i) => (
                    <div key={i} className={`overflow-hidden rounded-xl md:rounded-2xl ${i === 0 ? 'col-span-2 md:col-span-1 row-span-2' : ''}`}>
                      <picture>
                        {img?.webp && <source srcSet={img.webp} type="image/webp" />}
                        <img
                          src={img?.jpg}
                          alt={`${title} — Siwa gallery photo ${i + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover heat-haze transition duration-500 hover:scale-105"
                          style={{ minHeight: i === 0 ? '200px' : '110px' }}
                        />
                      </picture>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-4 rounded-card bg-primary p-5 text-primary-foreground md:mt-10 md:flex-row md:items-center md:justify-between md:p-7">
              <div>
                <p className="font-heading text-xl md:text-2xl">{t('customPricingTitle')}</p>
                <p className="mt-1 font-body text-sm text-primary-foreground/70">{t('customPricingDesc')}</p>
              </div>
              <a
                href={waLink(`${t('waBooking')} ${title}`)}
                target="_blank"
                rel="noreferrer"
                className="salt-crystal inline-flex items-center justify-center gap-3 rounded-full bg-primary-foreground px-6 py-3.5 font-body text-sm font-bold uppercase tracking-[0.2em] text-primary transition hover:-translate-y-1 md:px-7 md:py-4"
              >
                {t('bookThisJourney')} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
