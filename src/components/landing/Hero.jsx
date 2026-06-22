import React from 'react';
import { ArrowDown, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { waLink } from '@/lib/whatsapp';

export default function Hero({ image }) {
  const { t } = useLanguage();

  return (
    <section id="arrival" className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img src={image} alt="Local Siwa guide at the edge of the Great Sand Sea during golden hour" className="h-full w-full object-cover heat-haze" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/10 to-background" />
      </div>

      {/* Language switcher fixed top-left */}
      <div className="absolute left-5 top-5 z-20">
        <LanguageSwitcher variant="dark" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 py-24 text-primary-foreground md:px-10">
        <motion.div initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary-foreground/30 bg-primary/20 px-5 py-3 text-sm backdrop-blur">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            {t('badge')}
          </div>
          <h1 className="font-display text-6xl leading-[0.9] tracking-tight md:text-8xl lg:text-9xl">{t('hero1')}</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="ml-auto max-w-3xl text-right">
          <h2 className="font-display text-6xl leading-[0.9] tracking-tight md:text-8xl lg:text-9xl">{t('hero2')}</h2>
          <p className="ml-auto mt-8 max-w-xl font-body text-lg leading-8 text-primary-foreground/90 md:text-xl">
            {t('heroDesc')}
          </p>
          <a href={waLink(t('waGreeting'))} target="_blank" rel="noreferrer" className="salt-crystal mt-8 inline-flex items-center gap-3 rounded-full bg-primary-foreground px-7 py-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary shadow-2xl transition hover:-translate-y-1">
            {t('heroCta')} <ArrowDown className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}