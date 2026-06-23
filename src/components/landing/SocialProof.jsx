import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { waLink } from '@/lib/whatsapp';

export default function SocialProof() {
  const { t } = useLanguage();
  return (
    <section className="border-y border-border/60 bg-muted/40 px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        <div className="rounded-card border border-border bg-card p-8 md:col-span-2">
          <div className="mb-6 flex gap-1 text-secondary">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
          </div>
          <p className="font-heading text-3xl leading-tight text-foreground md:text-4xl">
            {t('reviewQuote')}
          </p>
          <p className="mt-5 font-body text-muted-foreground">{t('reviewSource')}</p>
        </div>
        <div className="rounded-card bg-primary p-8 text-primary-foreground">
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary-foreground/60">{t('trustSignals')}</p>
          <p className="mt-6 font-display text-6xl">5.0</p>
          <p className="mt-3 font-body text-lg leading-7 text-primary-foreground/75">{t('trustDesc')}</p>
          <a
            href={waLink(t('waGreeting'))}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary transition hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" /> {t('whatsappKelany')}
          </a>
        </div>
      </div>
    </section>
  );
}