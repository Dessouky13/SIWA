import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { waLink } from '@/lib/whatsapp';
import manifest from '../../../public/photos/manifest.json';

const postKeys = [
  { titleKey: 'blog1Title', quoteKey: 'blog1Quote' },
  { titleKey: 'blog2Title', quoteKey: 'blog2Quote' },
  { titleKey: 'blog3Title', quoteKey: 'blog3Quote' },
];

export default function BlogChronicle() {
  const { t } = useLanguage();
  const blog = manifest?.blog ?? [];

  return (
    <section id="chronicle" className="bg-primary px-6 py-24 text-primary-foreground md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-body text-sm uppercase tracking-[0.35em] text-secondary">{t('chronicleLabel')}</p>
          <h2 className="mt-5 font-display text-5xl leading-none md:text-6xl">{t('chronicleTitle')}</h2>
          <p className="mt-7 font-body text-lg leading-8 text-primary-foreground/75">
            {t('chronicleDesc')}
          </p>
          <Link
            to="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground hover:text-primary"
          >
            {t('viewAllPosts')} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-6">
          {postKeys.map((post, i) => {
            const img = blog[i] ?? {};
            return (
              <Link
                key={post.titleKey}
                to="/blog"
                className="group grid overflow-hidden rounded-card border border-primary-foreground/15 bg-primary-foreground/5 transition hover:bg-primary-foreground/10 sm:grid-cols-[38%_1fr]"
              >
                <div className="relative h-48 overflow-hidden sm:h-full">
                  <picture>
                    {img.webp && <source srcSet={img.webp} type="image/webp" />}
                    <img
                      src={img.jpg}
                      alt={t(post.titleKey)}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </picture>
                </div>
                <div className="flex flex-col justify-center p-7">
                  <h3 className="font-heading text-2xl leading-tight md:text-3xl">{t(post.titleKey)}</h3>
                  <blockquote className="mt-4 border-s-2 border-secondary ps-4 font-body italic leading-7 text-primary-foreground/80">
                    “{t(post.quoteKey)}”
                  </blockquote>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-secondary transition group-hover:gap-3">
                    {t('readMore')} <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
