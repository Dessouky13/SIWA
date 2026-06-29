import React, { useState } from 'react';
import { ArrowUpRight, Users, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { useSiteContent } from '@/lib/siteContent';
import { resolveExperiences } from './experiencesData';
import ExperienceModal from './ExperienceModal';

export default function ExperienceMatrix() {
  const [active, setActive] = useState(null);
  const { t } = useLanguage();
  const content = useSiteContent();
  // White Desert is already covered as a full package — remove it from the
  // experiences grid to avoid the duplicate that confused visitors.
  const experiences = resolveExperiences(content).filter(e => e.id !== 'white-desert');

  return (
    <>
      <section id="experiences" className="border-y border-border/60 bg-muted/40 px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">

          {/* Header — same pattern as the Packages section */}
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-body text-sm uppercase tracking-[0.35em] text-primary">{t('expLabel')}</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] text-foreground md:mt-5 md:text-5xl lg:text-6xl">{t('expTitle')}</h2>
            </div>
            <div>
              <p className="font-body text-lg leading-8 text-muted-foreground">{t('expDesc')}</p>
              <div className="mt-5 flex flex-wrap gap-4">
                <span className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
                  <Star className="h-4 w-4 fill-secondary text-secondary" /> 5.0 Tripadvisor
                </span>
                <span className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" /> Private &amp; small group
                </span>
              </div>
            </div>
          </div>

          {/* Cards grid — 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-panel border border-border bg-card transition hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Cover image */}
                <div className="relative h-52 overflow-hidden rounded-t-panel">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                  <span className="absolute start-5 top-5 rounded-full bg-background/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-foreground backdrop-blur">
                    {item.tag}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-7">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.duration}</p>
                  <h3 className="mt-3 font-heading text-2xl text-foreground">{item.title}</h3>
                  <p className="mt-1 font-body text-sm text-muted-foreground">
                    <Users className="mr-1 inline h-3.5 w-3.5 text-primary" />{item.groupSize}
                  </p>
                  <p className="mt-4 flex-1 font-body text-sm leading-6 text-muted-foreground line-clamp-3">{item.desc}</p>

                  {/* CTA */}
                  <div className="mt-8 rounded-2xl bg-muted/60 p-5">
                    <button
                      type="button"
                      onClick={() => setActive(item)}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <ArrowUpRight className="h-4 w-4" /> {t('explore')}
                    </button>
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
