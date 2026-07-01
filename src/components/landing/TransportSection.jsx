import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, Wind, UserCheck, Car, Compass } from 'lucide-react';
import { waLink } from '@/lib/whatsapp';
import { useSiteContent } from '@/lib/siteContent';
import manifest from '../../../public/photos/manifest.json';

const FEATURES = [
  { icon: Plane,    title: 'Airport Transfers',       desc: 'Pick-up and drop-off from Cairo Airport — on time, every time.' },
  { icon: Hotel,    title: 'Hotel Pick-up',            desc: 'Collected from any hotel or location across Cairo.' },
  { icon: Wind,     title: 'Air-conditioned Vehicles', desc: 'Modern, comfortable sedans, SUVs and minivans for your group size.' },
  { icon: UserCheck,title: 'Professional Drivers',     desc: 'Experienced, courteous drivers who know every road to Siwa.' },
  { icon: Car,      title: 'Desert 4x4 in Siwa',       desc: 'Local safari excursions in rugged 4x4 vehicles built for the dunes.' },
  { icon: Compass,  title: 'Full Journey Coverage',    desc: 'From Cairo arrival to your last moment in Siwa — we handle it all.' },
];

export default function TransportSection() {
  const content = useSiteContent();
  const brand = content?.brand ?? {};
  const photos = manifest?.transport ?? [];

  return (
    <section id="transport" className="bg-background px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="font-body text-sm uppercase tracking-[0.35em] text-primary">Door to Desert</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-foreground md:mt-5 md:text-5xl lg:text-6xl">
              Comfortable Transportation
            </h2>
          </div>
          <div>
            <p className="font-body text-lg leading-8 text-muted-foreground">
              We take care of every detail of your journey — from your first step off the plane in Cairo to the last dune in Siwa.
            </p>
          </div>
        </div>

        {/* Photo gallery + features */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left: 2×3 photo grid */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-3"
          >
            {photos.map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-panel ${i === 0 ? 'col-span-2 h-56 md:h-64' : 'h-40 md:h-48'}`}
              >
                <picture>
                  {img.webp && <source srcSet={img.webp} type="image/webp" />}
                  <img
                    src={img.jpg}
                    alt={`Transport vehicle ${i + 1} — Siwa with Kelany`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover heat-haze"
                  />
                </picture>
              </div>
            ))}
          </motion.div>

          {/* Right: feature list + CTA */}
          <div>
            <ul className="space-y-5">
              {FEATURES.map((f, i) => (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-heading text-lg text-foreground">{f.title}</p>
                    <p className="mt-0.5 font-body text-sm leading-6 text-muted-foreground">{f.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-10 rounded-card bg-primary p-6 text-primary-foreground md:p-7">
              <p className="font-heading text-xl">Ready to plan your journey?</p>
              <p className="mt-2 font-body text-sm leading-6 text-primary-foreground/75">
                Tell us your group size, travel dates and pick-up location — we'll arrange everything.
              </p>
              <a
                href={waLink('Transport enquiry — Siwa with Kelany')}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 font-body text-sm font-bold uppercase tracking-[0.18em] text-primary transition hover:-translate-y-0.5"
              >
                {brand.bookNow ?? 'Book Transport'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
