import React, { useEffect, useState } from 'react';
import { Wind, Clock, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { waLink } from '@/lib/whatsapp';

const socials = [
  {
    label: 'WhatsApp',
    href: waLink('Hello Mohamed! I am interested in exploring Siwa Oasis with you.'),
    color: '#25D366',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/siwa_with_kelany',
    color: '#E1306C',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1CFfFpV1H9/',
    color: '#1877F2',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@siwa_with_kelany',
    color: '#010101',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: 'Tripadvisor',
    href: 'https://www.tripadvisor.com/Attraction_Review-g303857-d26610134-Reviews-Mohamed_Kelany-Siwa_Matrouh_Governorate.html',
    color: '#34E0A1',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M23.9 8.6c-.2-.9-.5-1.7-.9-2.5h.9V4.5H16C14.7 3.5 13.4 3 12 3 10.6 3 9.3 3.5 8 4.5H.1V6.1H1c-.4.8-.7 1.6-.9 2.5C0 9.4 0 10.2 0 11c0 3.9 2.1 7.3 5.3 9.2L3.7 22h4l1.3-1.3c1 .2 2 .3 3 .3 1 0 2-.1 3-.3L16.3 22h4l-1.6-1.8C21.9 18.3 24 14.9 24 11c0-.8 0-1.6-.1-2.4z" />
      </svg>
    ),
  },
  {
    label: 'Threads',
    href: 'https://www.threads.com/@siwa_with_kelany',
    color: '#000000',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.012 5.467l.014.196h-3.27l-.006-.17c-.093-1.735-.912-3.073-2.13-3.834-1.04-.646-2.322-.972-3.818-.972-2.199 0-3.883.725-5.007 2.154-1.015 1.29-1.528 3.13-1.528 5.481s.513 4.192 1.528 5.482c1.124 1.429 2.808 2.154 5.007 2.154 1.496 0 2.778-.326 3.818-.972 1.218-.761 2.037-2.099 2.13-3.834l.006-.17h3.27l-.014.196c-.154 2.337-1.335 4.177-3.012 5.467-1.783 1.373-4.08 2.078-6.826 2.098h-.014z" />
      </svg>
    ),
  },
];

export default function LivingFooter() {
  const [time, setTime] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit' }).format(new Date()));
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-primary px-6 py-16 text-primary-foreground md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Top row: brand + tagline */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-5xl">Siwa with Kelany</p>
            <p className="mt-3 max-w-xl font-body text-lg text-primary-foreground/70">{t('footerTagline')}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-secondary" /> {t('siwaTIme')}: {time}</span>
            <span className="flex items-center gap-2"><Wind className="h-4 w-4 text-secondary" /> {t('desertBreeze')}</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" /> Siwa, Matrouh Governorate, Egypt</span>
          </div>
        </div>

        {/* Middle: contact + social grid */}
        <div className="mb-12 grid gap-8 border-t border-primary-foreground/15 pt-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Contact */}
          <div>
            <p className="mb-4 font-body text-xs uppercase tracking-[0.25em] text-secondary">{t('footerContact')}</p>
            <ul className="space-y-3 font-body text-sm">
              <li>
                <a href={waLink(t('waGreeting'))} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary-foreground/80 transition hover:text-primary-foreground">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  </span>
                  +20 106 376 4483
                </a>
              </li>
              <li>
                <a href="tel:+201063764483" className="flex items-center gap-3 text-primary-foreground/80 transition hover:text-primary-foreground">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/10">
                    <Phone className="h-4 w-4" />
                  </span>
                  +20 106 376 4483
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-primary-foreground/60">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/10">
                    <MapPin className="h-4 w-4" />
                  </span>
                  Siwa Oasis, Egypt
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <p className="mb-4 font-body text-xs uppercase tracking-[0.25em] text-secondary">{t('footerFollow')}</p>
            <ul className="space-y-3 font-body text-sm">
              {socials.map(({ label, href, icon, color }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary-foreground/80 transition hover:text-primary-foreground">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/10" style={{ color }}>
                      {icon}
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Rating badge */}
          <div className="flex flex-col justify-between gap-6 sm:col-span-2 lg:col-span-1">
            <div>
              <p className="mb-4 font-body text-xs uppercase tracking-[0.25em] text-secondary">{t('footerReviews')}</p>
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g303857-d26610134-Reviews-Mohamed_Kelany-Siwa_Matrouh_Governorate.html"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex flex-col gap-1 rounded-2xl border border-primary-foreground/15 p-5 transition hover:bg-primary-foreground/5"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className="h-5 w-5 fill-secondary" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="font-display text-3xl">5.0</p>
                <p className="font-body text-xs text-primary-foreground/60">{t('footerRatingDesc')}</p>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-primary-foreground/15 pt-6 text-center font-body text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Siwa with Kelany · Mohamed Kelany · Siwa Oasis, Egypt
        </div>

      </div>
    </footer>
  );
}