import React, { useState } from 'react';
import { ArrowUpRight, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { experiences } from './experiencesData';
import ExperienceModal from './ExperienceModal';
import { useLanguage } from '@/lib/LanguageContext';

export default function ExperienceMatrix() {
  const [active, setActive] = useState(null);
  const { t } = useLanguage();

  return (
    <>
      <section id="experiences" className="overflow-hidden bg-background px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="font-body text-sm uppercase tracking-[0.35em] text-primary">{t('expLabel')}</p>
              <h2 className="mt-5 font-display text-5xl leading-none text-foreground md:text-7xl">{t('expTitle')}</h2>
            </div>
            <p className="max-w-2xl font-body text-lg leading-8 text-muted-foreground">
              {t('expDesc')}
            </p>
          </div>

          <div className="no-scrollbar mt-14 flex gap-6 overflow-x-auto pb-8">
            {experiences.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setActive(item)}
                className="group min-w-[82vw] cursor-pointer overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-sm transition hover:-translate-y-2 hover:shadow-2xl md:min-w-[430px]"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={t(item.titleKey)}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105 heat-haze"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="absolute left-5 top-5 rounded-full bg-background/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur">
                    {t(item.tagKey)}
                  </div>
                  <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-heading text-3xl text-foreground">{t(item.titleKey)}</h3>
                    <ArrowUpRight className="mt-2 h-6 w-6 flex-shrink-0 text-primary transition group-hover:rotate-45" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary" />{item.duration}</span>
                    <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-primary" />{item.groupSize}</span>
                  </div>
                  <p className="mt-4 font-body text-base leading-7 text-muted-foreground line-clamp-2">{t(item.descKey)}</p>
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