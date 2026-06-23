import React, { useState } from 'react';
import { ArrowUpRight, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { useSiteContent } from '@/lib/siteContent';
import { resolveExperiences } from './experiencesData';
import ExperienceModal from './ExperienceModal';

export default function ExperienceMatrix() {
  const [active, setActive] = useState(null);
  const { t } = useLanguage();
  const content = useSiteContent();
  const experiences = resolveExperiences(content);

  return (
    <>
      <section id="experiences" className="overflow-hidden border-y border-border/60 bg-muted/40 px-6 py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Centered header — a deliberate variation from the other sections'
              left-aligned eyebrow + huge title pattern. */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-sm uppercase tracking-[0.35em] text-primary">{t('expLabel')}</p>
            <h2 className="mt-5 font-display text-5xl leading-[1.05] text-foreground md:text-6xl">{t('expTitle')}</h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-8 text-muted-foreground">
              {t('expDesc')}
            </p>
          </div>

          {/* Mobile: horizontal snap scroller with a peeking next card.
              md+: a multi-column grid so every experience is discoverable. */}
          <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
            {experiences.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setActive(item)}
                className="group min-w-[78vw] shrink-0 snap-start cursor-pointer overflow-hidden rounded-panel border border-border bg-card shadow-sm transition hover:-translate-y-2 hover:shadow-2xl md:min-w-0 md:shrink"
              >
                <div className="relative h-80 overflow-hidden">
                  <picture>
                    {item.coverImage?.webp && (
                      <source srcSet={item.coverImage.webp} type="image/webp" />
                    )}
                    <img
                      src={item.coverImage?.jpg}
                      alt={`${item.title} — Siwa experience`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105 heat-haze"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="absolute start-5 top-5 rounded-full bg-background/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur">
                    {item.tag}
                  </div>
                  <div className="absolute bottom-5 end-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-heading text-3xl text-foreground">{item.title}</h3>
                    <ArrowUpRight className="mt-2 h-6 w-6 flex-shrink-0 text-primary transition group-hover:rotate-45" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary" />{item.duration}</span>
                    <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-primary" />{item.groupSize}</span>
                  </div>
                  <p className="mt-4 font-body text-base leading-7 text-muted-foreground line-clamp-2">{item.desc}</p>
                  <div className="mt-6 flex justify-end">
                    <span className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                      {t('explore')}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {active && <ExperienceModal experience={active} onClose={() => setActive(null)} />}
    </>
  );
}
