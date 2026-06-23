import React from 'react';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/lib/siteContent';
import manifest from '../../../public/photos/manifest.json';

export default function PhilosophyBand() {
  const content = useSiteContent();
  const brand = content?.brand ?? {};
  const photo = manifest?.philosophy ?? {};

  const paragraphs = (brand.philosophyBody ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section id="philosophy" className="relative overflow-hidden bg-background px-6 py-28 text-foreground md:px-10">
      {/* Soft side image as a calm, editorial backdrop on large screens */}
      <div className="pointer-events-none absolute inset-y-0 end-0 hidden w-[42%] lg:block">
        <picture>
          <source srcSet={photo.webp} type="image/webp" />
          <img
            src={photo.jpg}
            alt="Stillness over the salt lakes of Siwa Oasis"
            className="h-full w-full object-cover opacity-25"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-sm uppercase tracking-[0.35em] text-secondary">
            {brand.philosophyKicker}
          </p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
            {brand.philosophyTitle}
          </h2>

          <div className="mt-10 space-y-6">
            {paragraphs.map((para, i) => (
              <p key={i} className="font-body text-lg leading-9 text-foreground/80 md:text-xl">
                {para}
              </p>
            ))}
          </div>

          {brand.philosophyClosing && (
            <blockquote className="mt-12 border-s-2 border-secondary ps-6 font-heading text-2xl italic leading-snug text-foreground/90 md:text-3xl">
              {brand.philosophyClosing}
            </blockquote>
          )}
        </motion.div>
      </div>
    </section>
  );
}
