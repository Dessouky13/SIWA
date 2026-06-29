import React, { useState } from 'react';
import { ArrowUpRight, Clock, Users, ChevronRight } from 'lucide-react';
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
      <section id="experiences" className="overflow-hidden border-y border-border/60 bg-muted/40 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-xs uppercase tracking-[0.35em] text-primary md:text-sm">{t('expLabel')}</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-foreground md:mt-5 md:text-5xl lg:text-6xl">{t('expTitle')}</h2>
            <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-7 text-muted-foreground md:mt-6 md:text-lg md:leading-8">
              {t('expDesc')}
            </p>
          </div>

          {/* Cards — full-bleed snap scroll on mobile, grid on md+ */}
          <div className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 no-scrollbar md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-8 lg:grid-cols-4">
            {experiences.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setActive(item)}
                className="group min-w-[80vw] shrink-0 snap-start cursor-pointer overflow-hidden rounded-panel border border-border bg-card shadow-sm transition hover:-translate-y-2 hover:shadow-2xl md:min-w-0 md:shrink"
              >
                {/* Cover image */}
                <div className="relative h-48 overflow-hidden md:h-72">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                  {/* Tag badge */}
                  <div className="absolute start-4 top-4 rounded-full bg-background/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground backdrop-blur">
                    {item.tag}
                  </div>
                  {/* Tap affordance — always shown on mobile, hover-only on desktop */}
                  <div className="absolute bottom-4 end-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition duration-300 md:h-12 md:w-12 md:opacity-0 md:group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 md:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-xl leading-snug text-foreground md:text-3xl">{item.title}</h3>
                    <ArrowUpRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary transition group-hover:rotate-45 md:h-6 md:w-6" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-primary" />{item.duration}</span>
                    <span className="flex items-center gap-1.5"><Users className="h-3 w-3 text-primary" />{item.groupSize}</span>
                  </div>
                  <p className="mt-3 font-body text-sm leading-6 text-muted-foreground line-clamp-2 md:mt-4 md:text-base md:leading-7">{item.desc}</p>
                  <div className="mt-4 flex items-center justify-between md:mt-6">
                    <span className="font-body text-xs text-muted-foreground/60">Tap to explore</span>
                    <span className="rounded-full border border-primary px-3 py-1.5 text-xs font-semibold text-primary transition group-hover:bg-primary group-hover:text-primary-foreground md:px-4 md:py-2">
                      {t('explore')}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
            {/* Trailing spacer so the last card isn't flush against the viewport edge */}
            <div className="w-2 shrink-0 md:hidden" aria-hidden="true" />
          </div>

          {/* Swipe hint — mobile only */}
          <div className="mt-4 flex items-center justify-center gap-1.5 md:hidden">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span className="font-body text-xs text-muted-foreground/60">
              Swipe to see all {experiences.length} experiences
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
          </div>
        </div>
      </section>

      {active && <ExperienceModal experience={active} onClose={() => setActive(null)} />}
    </>
  );
}
