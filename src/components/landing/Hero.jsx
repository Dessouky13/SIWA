import React from 'react';
import { ArrowDown, ArrowRight, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useSiteContent } from '@/lib/siteContent';
import { waLink } from '@/lib/whatsapp';
import manifest from '../../../public/photos/manifest.json';

export default function Hero() {
  const content = useSiteContent();
  const brand = content?.brand ?? {};
  const hero = manifest?.hero ?? {};
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="arrival" className="relative min-h-screen overflow-hidden bg-background">
      {/* Hero image */}
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width: 768px)" srcSet={hero.webpMobile} type="image/webp" />
          <source media="(max-width: 768px)" srcSet={hero.jpgMobile} />
          <source srcSet={hero.webp} type="image/webp" />
          <img
            src={hero.jpg}
            alt="Golden sand dunes of the Great Sand Sea stretching to the horizon at Siwa Oasis, Egypt"
            className="h-full w-full object-cover heat-haze"
            loading="eager"
            fetchpriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-[#241608]/80 via-[#241608]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#241608]/50 via-transparent to-transparent" />
      </div>

      {/* Content anchored to lower third */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-20 pt-28 text-primary-foreground md:px-10 md:pb-28 md:pt-32">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary-foreground/30 bg-foreground/20 px-4 py-2.5 text-xs backdrop-blur md:mb-7 md:px-5 md:py-3 md:text-sm">
            <Star className="h-3.5 w-3.5 flex-shrink-0 fill-secondary text-secondary md:h-4 md:w-4" />
            {brand.heroKicker}
          </div>
          <h1 className="font-display text-4xl leading-[1] tracking-tight md:text-5xl lg:text-7xl">
            {brand.heroHeadline}
          </h1>
          <p className="mt-5 max-w-xl font-body text-base leading-7 text-primary-foreground/90 md:mt-7 md:text-xl md:leading-8">
            {brand.heroSub}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-9 md:gap-4">
            <a
              href={waLink(brand.heroKicker)}
              target="_blank"
              rel="noreferrer"
              className="salt-crystal inline-flex items-center gap-2 rounded-full bg-primary-foreground px-5 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.18em] text-primary shadow-2xl transition hover:-translate-y-1 md:gap-3 md:px-7 md:py-4 md:tracking-[0.2em]"
            >
              {brand.heroCtaPrimary} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#experiences"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 bg-foreground/10 px-5 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground backdrop-blur transition hover:bg-primary-foreground/10 md:gap-3 md:px-7 md:py-4 md:tracking-[0.2em]"
            >
              {brand.heroCtaSecondary}
            </a>
          </div>
        </motion.div>
      </div>

      <a
        href="#experiences"
        aria-label="Scroll to experiences"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-primary-foreground/70 transition hover:text-primary-foreground md:block"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}
