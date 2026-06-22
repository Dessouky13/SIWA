import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, BookOpen, MessageCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { waLink } from '@/lib/whatsapp';
import FloatingCompass from '@/components/landing/FloatingCompass';
import WhatsAppFAB from '@/components/landing/WhatsAppFAB';
import LivingFooter from '@/components/landing/LivingFooter';

const POSTS = [
  {
    id: 1,
    titleKey: 'blog1Title',
    timeKey: 'blog1Time',
    intentKey: 'blog1Intent',
    quoteKey: 'blog1Quote',
    excerptKey: 'blog1Excerpt',
    bodyKey: 'blog1Body',
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=900&q=80',
    tag: 'Travel Guide',
    tagKey: 'blogTagGuide',
    color: 'from-amber-900/60',
  },
  {
    id: 2,
    titleKey: 'blog2Title',
    timeKey: 'blog2Time',
    intentKey: 'blog2Intent',
    quoteKey: 'blog2Quote',
    excerptKey: 'blog2Excerpt',
    bodyKey: 'blog2Body',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80',
    tag: 'Story',
    tagKey: 'blogTagStory',
    color: 'from-teal-900/60',
  },
  {
    id: 3,
    titleKey: 'blog3Title',
    timeKey: 'blog3Time',
    intentKey: 'blog3Intent',
    quoteKey: 'blog3Quote',
    excerptKey: 'blog3Excerpt',
    bodyKey: 'blog3Body',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80',
    tag: 'Itinerary',
    tagKey: 'blogTagItinerary',
    color: 'from-orange-900/60',
  },
  {
    id: 4,
    titleKey: 'blog4Title',
    timeKey: 'blog4Time',
    intentKey: 'blog4Intent',
    quoteKey: 'blog4Quote',
    excerptKey: 'blog4Excerpt',
    bodyKey: 'blog4Body',
    image: 'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=900&q=80',
    tag: 'Travel Tips',
    tagKey: 'blogTagTips',
    color: 'from-rose-900/60',
  },
  {
    id: 5,
    titleKey: 'blog5Title',
    timeKey: 'blog5Time',
    intentKey: 'blog5Intent',
    quoteKey: 'blog5Quote',
    excerptKey: 'blog5Excerpt',
    bodyKey: 'blog5Body',
    image: 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=900&q=80',
    tag: 'Story',
    tagKey: 'blogTagStory',
    color: 'from-sky-900/60',
  },
  {
    id: 6,
    titleKey: 'blog6Title',
    timeKey: 'blog6Time',
    intentKey: 'blog6Intent',
    quoteKey: 'blog6Quote',
    excerptKey: 'blog6Excerpt',
    bodyKey: 'blog6Body',
    image: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=900&q=80',
    tag: 'Culture',
    tagKey: 'blogTagCulture',
    color: 'from-purple-900/60',
  },
];

function PostModal({ post, onClose }) {
  const { t } = useLanguage();

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler); };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-background/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-3xl px-6 py-12">
        <button onClick={onClose} className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {t('backToBlog')}
        </button>

        <div className="relative mb-8 h-72 overflow-hidden rounded-[2rem] md:h-96">
          <img src={post.image} alt={t(post.titleKey)} className="h-full w-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-t ${post.color} to-transparent`} />
          <div className="absolute bottom-6 left-6">
            <span className="rounded-full bg-background/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur">
              {t(post.tagKey)}
            </span>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary" />{t(post.timeKey)}</span>
          <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" />{t(post.intentKey)}</span>
        </div>

        <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl">{t(post.titleKey)}</h1>

        <blockquote className="my-8 border-l-4 border-primary pl-5 font-heading text-2xl italic leading-relaxed text-muted-foreground">
          {t(post.quoteKey)}
        </blockquote>

        <div className="prose prose-lg max-w-none font-body text-foreground/80 leading-8">
          {t(post.bodyKey).split('\n\n').map((para, i) => (
            <p key={i} className="mb-5">{para}</p>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] bg-primary p-8 text-primary-foreground">
          <p className="font-heading text-2xl">{t('blogCtaTitle')}</p>
          <p className="mt-2 font-body text-sm text-primary-foreground/75">{t('blogCtaDesc')}</p>
          <a
            href={waLink(t('waGreeting'))}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" /> {t('whatsappKelany')}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function PostCard({ post, onClick, index }) {
  const { t } = useLanguage();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-[2rem] border border-border bg-card transition hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative h-52 overflow-hidden">
        <img src={post.image} alt={t(post.titleKey)} className="h-full w-full object-cover transition duration-700 group-hover:scale-105 heat-haze" />
        <div className={`absolute inset-0 bg-gradient-to-t ${post.color} to-transparent opacity-60`} />
        <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-foreground backdrop-blur">
          {t(post.tagKey)}
        </span>
      </div>
      <div className="p-6">
        <div className="mb-3 flex flex-wrap gap-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-primary" />{t(post.timeKey)}</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-primary" />{t(post.intentKey)}</span>
        </div>
        <h2 className="font-heading text-2xl leading-tight text-foreground">{t(post.titleKey)}</h2>
        <p className="mt-3 font-body text-sm leading-6 text-muted-foreground line-clamp-2">{t(post.excerptKey)}</p>
        <span className="mt-5 inline-block rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
          {t('readMore')} →
        </span>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  const { t } = useLanguage();
  const [activePost, setActivePost] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = POSTS.filter((p) => {
    const q = search.toLowerCase();
    return !q || t(p.titleKey).toLowerCase().includes(q) || t(p.excerptKey).toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-background">
      <FloatingCompass />
      <WhatsAppFAB />

      {/* Header */}
      <div className="bg-primary px-6 py-20 text-primary-foreground md:px-10">
        <div className="mx-auto max-w-7xl">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-primary-foreground/60 transition hover:text-primary-foreground">
            <ArrowLeft className="h-4 w-4" /> {t('backToHome')}
          </Link>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-body text-sm uppercase tracking-[0.35em] text-secondary">{t('blogPageLabel')}</p>
              <h1 className="mt-4 font-display text-5xl leading-none md:text-7xl">{t('blogPageTitle')}</h1>
              <p className="mt-5 max-w-xl font-body text-lg text-primary-foreground/70">{t('blogPageDesc')}</p>
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/50" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('blogSearch')}
                className="w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 py-3 pl-10 pr-5 text-sm text-primary-foreground placeholder-primary-foreground/50 outline-none focus:border-primary-foreground/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <p className="py-20 text-center font-body text-muted-foreground">{t('blogNoResults')}</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} onClick={() => setActivePost(post)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-primary px-8 py-12 text-primary-foreground md:px-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-3xl md:text-4xl">{t('blogBannerTitle')}</p>
              <p className="mt-2 font-body text-primary-foreground/70">{t('blogBannerDesc')}</p>
            </div>
            <a
              href={waLink(t('waGreeting'))}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white transition hover:scale-105 whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" /> {t('whatsappKelany')}
            </a>
          </div>
        </div>
      </section>

      <LivingFooter />

      {activePost && <PostModal post={activePost} onClose={() => setActivePost(null)} />}
    </div>
  );
}