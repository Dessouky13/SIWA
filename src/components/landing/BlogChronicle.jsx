import React from 'react';
import { BookOpen, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { waLink } from '@/lib/whatsapp';

const postKeys = [
  { titleKey: 'blog1Title', timeKey: 'blog1Time', intentKey: 'blog1Intent', quoteKey: 'blog1Quote' },
  { titleKey: 'blog2Title', timeKey: 'blog2Time', intentKey: 'blog2Intent', quoteKey: 'blog2Quote' },
  { titleKey: 'blog3Title', timeKey: 'blog3Time', intentKey: 'blog3Intent', quoteKey: 'blog3Quote' },
];

export default function BlogChronicle({ image }) {
  const { t } = useLanguage();

  return (
    <section id="chronicle" className="bg-primary px-6 py-24 text-primary-foreground md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-16 lg:self-start">
          <p className="font-body text-sm uppercase tracking-[0.35em] text-secondary">{t('chronicleLabel')}</p>
          <h2 className="mt-5 font-display text-5xl leading-none md:text-7xl">{t('chronicleTitle')}</h2>
          <p className="mt-7 font-body text-lg leading-8 text-primary-foreground/75">
            {t('chronicleDesc')}
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground hover:text-primary"
          >
            {t('viewAllPosts')} <ArrowUpRight className="h-4 w-4" />
          </Link>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-primary-foreground/15">
            <img src={image} alt="Traditional Siwan tea ceremony in the desert" className="h-72 w-full object-cover heat-haze" />
          </div>
        </div>

        <div className="space-y-5">
          {postKeys.map((post) => (
            <article key={post.titleKey} className="rounded-[2rem] border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur transition hover:bg-primary-foreground/10">
              <div className="mb-5 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-primary-foreground/65">
                <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-secondary" /> {t('seoArticle')}</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-secondary" /> {t(post.timeKey)}</span>
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" /> {t(post.intentKey)}</span>
              </div>
              <h3 className="font-heading text-3xl leading-tight md:text-4xl">{t(post.titleKey)}</h3>
              <blockquote className="mt-6 border-l-2 border-secondary pl-5 font-body text-lg italic leading-8 text-primary-foreground/80">"{t(post.quoteKey)}"</blockquote>
              <a href={waLink(t('waGreeting'))} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-secondary px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-secondary-foreground transition hover:scale-105">
                {t('planChapter')}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}