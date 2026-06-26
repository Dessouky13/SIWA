import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Flame, Award, Compass, Sparkles, Moon, MountainSnow } from 'lucide-react';
import { useSiteContent } from '@/lib/siteContent';
import ProgramModal from './ProgramModal';
import { waLink } from '@/lib/whatsapp';
import manifest from '../../../public/photos/manifest.json';

// Inline WhatsApp glyph so the booking CTAs read clearly as "message on WhatsApp".
const WhatsAppGlyph = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.157 5.335 5.494 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.589-.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

// The 6 real programs, in display order. Highlight + badge icon are presentational.
const PROGRAM_ORDER = ['siwa-1n', 'siwa-2n', 'siwa-4n', 'siwa-5n', 'bahariya-1n', 'white-desert-3n'];

const HIGHLIGHT_ID = 'siwa-2n'; // the "Most loved" card is featured

// Pick an icon for a program's badge (falls back to a generic sparkle).
function badgeIconFor(badge = '') {
  const b = badge.toLowerCase();
  if (b.includes('epic')) return Compass;
  if (b.includes('loved') || b.includes('popular')) return Flame;
  if (b.includes('value')) return Award;
  if (b.includes('retreat') || b.includes('night')) return Moon;
  if (b.includes('desert') || b.includes('white')) return MountainSnow;
  return Sparkles;
}

export default function PackagesSection() {
  const [modalProgram, setModalProgram] = useState(null);
  const content = useSiteContent();
  const brand = content?.brand ?? {};

  const allPrograms = content?.programs ?? [];
  const programs = PROGRAM_ORDER
    .map((id) => allPrograms.find((p) => p.id === id))
    .filter(Boolean);

  const featureStrip = manifest?.featureStrip ?? {};
  // The White Desert program drives the feature strip CTA, when present.
  const featureProgram = allPrograms.find((p) => p.id === 'white-desert-3n');

  return (
    <>
      <section id="packages" className="bg-background px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-body text-sm uppercase tracking-[0.35em] text-primary">{brand.programsKicker}</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.05] text-foreground md:text-6xl">
                {brand.programsTitle}
              </h2>
            </div>
            <div>
              <p className="font-body text-lg leading-8 text-muted-foreground">
                {brand.programsIntro}
              </p>
              <div className="mt-5 flex flex-wrap gap-4">
                <span className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
                  <Star className="h-4 w-4 fill-secondary text-secondary" /> 5.0 Tripadvisor
                </span>
                <span className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" /> {brand.priceOnRequest}
                </span>
              </div>
            </div>
          </div>

          {/* Program cards — the 6 real programs */}
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => {
              const highlight = program.id === HIGHLIGHT_ID;
              const BadgeIcon = badgeIconFor(program.badge);
              const hero = manifest?.programs?.[program.id]?.hero ?? {};
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative flex flex-col overflow-hidden rounded-panel border transition hover:-translate-y-1 hover:shadow-2xl ${highlight ? 'z-10 bg-primary text-primary-foreground border-primary shadow-2xl ring-2 ring-secondary/60 lg:-mt-4 lg:mb-4 lg:scale-[1.04]' : 'bg-card border-border text-foreground'}`}
                >
                  <div className="relative h-52 overflow-hidden rounded-t-panel">
                    <picture>
                      {hero.webp && <source srcSet={hero.webp} type="image/webp" />}
                      <img
                        src={hero.jpg}
                        alt={`${program.name} — Siwa package`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105 heat-haze"
                      />
                    </picture>
                    <div className={`absolute inset-0 bg-gradient-to-t ${highlight ? 'from-primary/70' : 'from-foreground/40'} to-transparent`} />
                    {program.badge && (
                      <span className={`absolute start-5 top-5 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${highlight ? 'bg-secondary text-secondary-foreground' : 'bg-background/90 text-foreground'}`}>
                        <BadgeIcon className="h-3.5 w-3.5" /> {program.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <p className={`font-body text-xs uppercase tracking-[0.2em] ${highlight ? 'text-primary-foreground/85' : 'text-muted-foreground'}`}>{program.durationLabel}</p>
                    <h3 className={`mt-3 font-heading text-3xl ${highlight ? 'text-primary-foreground' : 'text-foreground'}`}>{program.name}</h3>
                    <p className={`mt-2 font-body text-sm leading-6 ${highlight ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>{program.subtitle}</p>

                    {program.summary && (
                      <p className={`mt-5 flex-1 font-body text-sm leading-6 ${highlight ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                        {program.summary}
                      </p>
                    )}

                    <div className={`mt-8 flex flex-col gap-3 rounded-2xl p-5 ${highlight ? 'bg-primary-foreground/15' : 'bg-muted/60'}`}>
                      <p className={`font-body text-sm leading-6 ${highlight ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>{brand.priceOnRequest}</p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setModalProgram(program)}
                          className={`flex-1 rounded-full border py-3 text-sm font-semibold transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${highlight ? 'border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10' : 'border-border text-foreground hover:bg-muted'}`}
                        >
                          {brand.detailsCta ?? 'View itinerary'}
                        </button>
                        <a
                          href={waLink(`${brand.bookCta ?? 'Booking enquiry'} — ${program.name}`)}
                          target="_blank"
                          rel="noreferrer"
                          className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition hover:scale-105 ${highlight ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'}`}
                        >
                          <WhatsAppGlyph className="h-4 w-4" /> {brand.bookCta ?? 'Book'}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* White Desert feature strip (manifest.featureStrip) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 overflow-hidden rounded-panel border border-border"
          >
            <div className="relative">
              <picture>
                {featureStrip.webp && <source srcSet={featureStrip.webp} type="image/webp" />}
                <img
                  src={featureStrip.jpg}
                  alt="White Desert camping under the stars, Egypt"
                  loading="lazy"
                  decoding="async"
                  className="h-64 w-full object-cover md:h-80 heat-haze"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14">
                <p className="font-body text-sm uppercase tracking-[0.3em] text-secondary">{featureProgram?.badge ?? 'Signature add-on'}</p>
                <h3 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-primary-foreground md:text-5xl">
                  {featureProgram?.name ?? 'The White Desert Odyssey'}
                </h3>
                <p className="mt-4 max-w-xl font-body text-base leading-7 text-primary-foreground/80">
                  {featureProgram?.summary ?? featureProgram?.subtitle}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  {featureProgram && (
                    <button
                      type="button"
                      onClick={() => setModalProgram(featureProgram)}
                      className="rounded-full bg-primary-foreground px-6 py-3 text-sm font-bold text-primary transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    >
                      {brand.viewItinerary ?? 'See the full itinerary'}
                    </button>
                  )}
                  <a
                    href={waLink(`${brand.bookCta ?? 'Booking enquiry'} — ${featureProgram?.name ?? 'White Desert'}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
                  >
                    <WhatsAppGlyph className="h-4 w-4" /> {brand.whatsappCta ?? 'Message us on WhatsApp'}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {modalProgram && <ProgramModal program={modalProgram} onClose={() => setModalProgram(null)} />}
    </>
  );
}
