import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight, Flame, Award, Compass } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { experiences } from './experiencesData';
import ExperienceModal from './ExperienceModal';
import { waLink } from '@/lib/whatsapp';

const packageDefs = [
  {
    id: 'day-oasis',
    badgeKey: 'mostPopular',
    badgeIcon: Flame,
    nameKey: 'pkg1Name',
    subtitleKey: 'pkg1Subtitle',
    durationKey: 'pkg1Duration',
    color: 'bg-background border-border',
    highlight: false,
    includeKeys: ['pkg1i1','pkg1i2','pkg1i3','pkg1i4','pkg1i5','pkg1i6'],
    heroImage: 'https://media.base44.com/images/public/6a27d392c56bb9d87f135152/f43212e77_generated_image.png',
    linkedExperienceId: 'salt-lake',
  },
  {
    id: 'siwa-full',
    badgeKey: 'bestValue',
    badgeIcon: Award,
    nameKey: 'pkg2Name',
    subtitleKey: 'pkg2Subtitle',
    durationKey: 'pkg2Duration',
    color: 'bg-primary text-primary-foreground',
    highlight: true,
    includeKeys: ['pkg2i1','pkg2i2','pkg2i3','pkg2i4','pkg2i5','pkg2i6','pkg2i7','pkg2i8'],
    heroImage: 'https://media.base44.com/images/public/6a27d392c56bb9d87f135152/34ba56a15_generated_image.png',
    linkedExperienceId: 'sand-sea',
  },
  {
    id: 'white-desert-pkg',
    badgeKey: 'epicJourney',
    badgeIcon: Compass,
    nameKey: 'pkg3Name',
    subtitleKey: 'pkg3Subtitle',
    durationKey: 'pkg3Duration',
    color: 'bg-background border-border',
    highlight: false,
    includeKeys: ['pkg3i1','pkg3i2','pkg3i3','pkg3i4','pkg3i5','pkg3i6','pkg3i7','pkg3i8'],
    heroImage: 'https://media.base44.com/images/public/6a27d392c56bb9d87f135152/02e87b357_generated_image.png',
    linkedExperienceId: 'white-desert',
  },
];

export default function PackagesSection() {
  const [modalExp, setModalExp] = useState(null);
  const { t } = useLanguage();

  const openLinked = (pkg) => {
    const exp = experiences.find((e) => e.id === pkg.linkedExperienceId);
    if (exp) setModalExp(exp);
  };

  return (
    <>
      <section id="packages" className="bg-muted/40 px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-body text-sm uppercase tracking-[0.35em] text-primary">{t('pkgLabel')}</p>
              <h2 className="mt-5 font-display text-5xl leading-none text-foreground md:text-7xl">
                {t('pkgTitle')}
              </h2>
            </div>
            <div>
              <p className="font-body text-lg leading-8 text-muted-foreground">
                {t('pkgDesc')}
              </p>
              <div className="mt-5 flex flex-wrap gap-4">
                <span className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
                  <Star className="h-4 w-4 fill-secondary text-secondary" /> 5.0 Tripadvisor
                </span>
                <span className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
                  <Check className="h-4 w-4 text-primary" /> {t('freeCancellation')}
                </span>
                <span className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
                  <Check className="h-4 w-4 text-primary" /> {t('private')}
                </span>
              </div>
            </div>
          </div>

          {/* Package cards */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {packageDefs.map((pkg, index) => {
              const BadgeIcon = pkg.badgeIcon;
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative flex flex-col overflow-hidden rounded-[2.5rem] border ${pkg.highlight ? 'bg-primary text-primary-foreground' : 'bg-card border-border text-foreground'} transition hover:-translate-y-1 hover:shadow-2xl`}
                >
                  <div className="relative h-52 overflow-hidden rounded-t-[2.5rem]">
                    <img src={pkg.heroImage} alt={t(pkg.nameKey)} className="h-full w-full object-cover transition duration-700 group-hover:scale-105 heat-haze" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${pkg.highlight ? 'from-primary/70' : 'from-foreground/40'} to-transparent`} />
                    <span className={`absolute left-5 top-5 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${pkg.highlight ? 'bg-secondary text-secondary-foreground' : 'bg-background/90 text-foreground'}`}>
                      <BadgeIcon className="h-3.5 w-3.5" /> {t(pkg.badgeKey)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <p className={`font-body text-xs uppercase tracking-[0.2em] ${pkg.highlight ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{t(pkg.durationKey)}</p>
                    <h3 className={`mt-3 font-heading text-3xl ${pkg.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>{t(pkg.nameKey)}</h3>
                    <p className={`mt-2 font-body text-sm leading-6 ${pkg.highlight ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>{t(pkg.subtitleKey)}</p>

                    <ul className="mt-6 flex-1 space-y-3">
                      {pkg.includeKeys.map((key, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className={`mt-1 h-4 w-4 flex-shrink-0 ${pkg.highlight ? 'text-secondary' : 'text-primary'}`} />
                          <span className={`font-body text-sm leading-6 ${pkg.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{t(key)}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`mt-8 flex flex-col gap-3 rounded-2xl p-5 ${pkg.highlight ? 'bg-primary-foreground/10' : 'bg-muted/60'}`}>
                      <p className={`font-body text-sm leading-6 ${pkg.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{t('customPricingShort')}</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => openLinked(pkg)}
                          className={`flex-1 rounded-full border py-3 text-sm font-semibold transition hover:scale-105 ${pkg.highlight ? 'border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10' : 'border-border text-foreground hover:bg-muted'}`}
                        >
                          {t('seeDetails')}
                        </button>
                        <a
                          href={waLink(`${t('waBooking')} ${t(pkg.nameKey)}`)}
                          target="_blank"
                          rel="noreferrer"
                          className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition hover:scale-105 ${pkg.highlight ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'}`}
                        >
                          {t('book')} <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* White Desert feature strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 overflow-hidden rounded-[2.5rem] border border-border"
          >
            <div className="relative">
              <img
                src="https://media.base44.com/images/public/6a27d392c56bb9d87f135152/cca6f9510_generated_image.png"
                alt="White Desert camping under stars Egypt"
                className="h-64 w-full object-cover md:h-80 heat-haze"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14">
                <p className="font-body text-sm uppercase tracking-[0.3em] text-secondary">{t('signatureAddOn')}</p>
                <h3 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-primary-foreground md:text-5xl">
                  {t('whiteDesertTitle')}
                </h3>
                <p className="mt-4 max-w-xl font-body text-base leading-7 text-primary-foreground/80">
                  {t('whiteDesertDesc')}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    onClick={() => setModalExp(experiences.find((e) => e.id === 'white-desert'))}
                    className="rounded-full bg-primary-foreground px-6 py-3 text-sm font-bold text-primary transition hover:-translate-y-1"
                  >
                    {t('exploreOdyssey')}
                  </button>
                  <a href={waLink(t('waWhiteDesert'))} target="_blank" rel="noreferrer" className="rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10">
                    {t('contactKelany')}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {modalExp && <ExperienceModal experience={modalExp} onClose={() => setModalExp(null)} />}
    </>
  );
}