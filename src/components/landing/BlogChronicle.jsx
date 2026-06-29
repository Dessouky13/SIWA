import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
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
    <section id="chronicle" className="bg-primary px-6 py-20 text-primary-foreground md:py-24 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">

        {/* Sticky sidebar — stacks above on mobile */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-secondary md:text-sm">{t('chronicleLabel')}</p>
          <h2 className="mt-4 font-display text-4xl leading-none md:mt-5 md:text-5xl lg:text-6xl">{t('chronicleTitle')}</h2>
          <p className="mt-5 font-body text-base leading-7 text-primary-foreground/75 md:mt-7 md:text-lg md:leading-8">
            {t('chronicleDesc')}
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground hover:text-primary md:mt-7"
          >
            {t('viewAllPosts')} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Blog cards */}
        <div className="space-y-5 md:space-y-6">
          {postKeys.map((post, i) => {
            const img = blog[i] ?? {};
            return (
              <Link
                key={post.titleKey}
                to="/blog"
                className="group grid overflow-hidden rounded-card border border-primary-foreground/15 bg-primary-foreground/5 transition hover:bg-primary-foreground/10 sm:grid-cols-[38%_1fr]"
              >
                {/* Image — full width stacked on mobile, 38% column on sm+ */}
                <div className="relative h-44 overflow-hidden sm:h-full">
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
                <div className="flex flex-col justify-center p-5 md:p-7">
                  <h3 className="font-heading text-xl leading-tight md:text-2xl lg:text-3xl">{t(post.titleKey)}</h3>
                  <blockquote className="mt-3 border-s-2 border-secondary ps-4 font-body text-sm italic leading-6 text-primary-foreground/80 md:mt-4 md:text-base md:leading-7">
                    "{t(post.quoteKey)}"
                  </blockquote>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-secondary transition group-hover:gap-3 md:mt-5">
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
