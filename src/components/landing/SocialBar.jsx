import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/siwa_with_kelany?utm_source=qr&igsh=MW1zdDdtNDc0ZW90dQ==',
    color: 'hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:via-[#dc2743] hover:via-[#cc2366] hover:to-[#bc1888]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1CFfFpV1H9/',
    color: 'hover:bg-[#1877F2]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@siwa_with_kelany?_r=1&_t=ZS-95g03jc6f4R',
    color: 'hover:bg-black',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: 'Threads',
    href: 'https://www.threads.com/@siwa_with_kelany?invite=0',
    color: 'hover:bg-black',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.012 5.467l.014.196h-3.27l-.006-.17c-.093-1.735-.912-3.073-2.13-3.834-1.04-.646-2.322-.972-3.818-.972-2.199 0-3.883.725-5.007 2.154-1.015 1.29-1.528 3.13-1.528 5.481s.513 4.192 1.528 5.482c1.124 1.429 2.808 2.154 5.007 2.154 1.496 0 2.778-.326 3.818-.972 1.218-.761 2.037-2.099 2.13-3.834l.006-.17h3.27l-.014.196c-.154 2.337-1.335 4.177-3.012 5.467-1.783 1.373-4.08 2.078-6.826 2.098h-.014z" />
      </svg>
    ),
  },
  {
    label: 'Tripadvisor',
    href: 'https://www.tripadvisor.com/Attraction_Review-g303857-d26610134-Reviews-Mohamed_Kelany-Siwa_Matrouh_Governorate.html',
    color: 'hover:bg-[#34E0A1]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M23.9 8.6c-.2-.9-.5-1.7-.9-2.5h.9V4.5H16C14.7 3.5 13.4 3 12 3 10.6 3 9.3 3.5 8 4.5H.1V6.1H1c-.4.8-.7 1.6-.9 2.5C0 9.4 0 10.2 0 11c0 3.9 2.1 7.3 5.3 9.2L3.7 22h4l1.3-1.3c1 .2 2 .3 3 .3 1 0 2-.1 3-.3L16.3 22h4l-1.6-1.8C21.9 18.3 24 14.9 24 11c0-.8 0-1.6-.1-2.4zM12 5c.7 0 1.4.1 2.1.3H9.9C10.6 5.1 11.3 5 12 5zM5.8 16.7l-1.9 2H2.7l.9-1c-2.1-1.5-3.6-3.9-3.6-6.7 0-.6.1-1.3.2-1.9.4-1.8 1.5-3.4 2.9-4.4.8-.5 1.6-.9 2.5-1C6.5 3.6 7.4 3.5 8.3 3.5c-2.5 1-4.3 3.5-4.3 6.5 0 1.7.6 3.2 1.6 4.4l-1 1.1 1.2 1.2zM12 21c-1.1 0-2.2-.2-3.2-.5l3.2-3.2 3.2 3.2c-1 .3-2.1.5-3.2.5zm0-6c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm5.5 1.7l1.2-1.2-1-1.1c1-1.2 1.6-2.7 1.6-4.4 0-3-1.8-5.5-4.3-6.5.9 0 1.8.1 2.7.2.9.1 1.7.5 2.5 1 1.4 1 2.5 2.6 2.9 4.4.1.6.2 1.3.2 1.9 0 2.8-1.5 5.2-3.6 6.7l.9 1H20.1l-1.9-2z" />
      </svg>
    ),
  },
];

export default function SocialBar() {
  const { t } = useLanguage();
  return (
    <section className="bg-background px-6 py-14 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="font-body text-sm uppercase tracking-[0.35em] text-primary">{t('socialBarLabel')}</p>
          <h2 className="font-display text-4xl text-foreground md:text-5xl">{t('socialBarTitle')}</h2>
          <p className="max-w-xl font-body text-base text-muted-foreground">{t('socialBarDesc')}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            {socials.map(({ label, href, icon, color }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-1 hover:text-white hover:shadow-lg ${color}`}
              >
                {icon}
                {label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}