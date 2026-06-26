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
      {/* Local hero image: webp source + jpg fallback */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet={hero.webp} type="image/webp" />
          <img
            src={hero.jpg}
            alt="Two glasses of Bedouin mint tea on the dunes at sunset in the Siwa desert"
            className="h-full w-full object-cover heat-haze"
            loading="eager"
            fetchpriority="high"
          />
        </picture>
        {/* Warm directional scrim: dark behind the text (bottom/left), clear over
            the golden-hour sky so the photo keeps its warmth and the text stays legible. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#241608]/80 via-[#241608]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#241608]/50 via-transparent to-transparent" />
      </div>

      {/* Single anchored content column in the lower third */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-28 pt-32 text-primary-foreground md:px-10">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl"
        >
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-primary-foreground/30 bg-foreground/20 px-5 py-3 text-sm backdrop-blur">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            {brand.heroKicker}
          </div>
          <h1 className="font-display text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
            {brand.heroHeadline}
          </h1>
          <p className="mt-7 max-w-xl font-body text-lg leading-8 text-primary-foreground/90 md:text-xl">
            {brand.heroSub}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={waLink(brand.heroKicker)}
              target="_blank"
              rel="noreferrer"
              className="salt-crystal inline-flex items-center gap-3 rounded-full bg-primary-foreground px-7 py-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary shadow-2xl transition hover:-translate-y-1"
            >
              {brand.heroCtaPrimary} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#experiences"
              className="inline-flex items-center gap-3 rounded-full border border-primary-foreground/40 bg-foreground/10 px-7 py-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground backdrop-blur transition hover:bg-primary-foreground/10"
            >
              {brand.heroCtaSecondary}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue — a genuine downward affordance */}
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
