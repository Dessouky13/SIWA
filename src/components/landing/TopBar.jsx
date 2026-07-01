import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import FloatingCompass from './FloatingCompass';

/**
 * Fixed, scroll-aware top bar. It stays pinned to the viewport so the language
 * switcher and navigation menu are ALWAYS reachable (previously it was
 * `position: absolute` and scrolled away with the hero, leaving no nav on the
 * rest of the page). Over the hero it is transparent with cream text; once the
 * user scrolls past the hero it fades to a solid, blurred surface with dark text.
 */
export default function TopBar({ wordmark = 'Siwa with Kelany', homeHref = '#arrival' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll(); // honor initial scroll position (e.g. deep links / reloads)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // "dark" variant = cream controls for placement over the dark hero image.
  const dark = !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled ? 'border-b border-border bg-background/90 shadow-sm backdrop-blur' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a href={homeHref} className="flex items-center transition hover:opacity-80">
            {dark ? (
              <span className="font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground">
                {wordmark}
              </span>
            ) : (
              <img src="/logo.png" alt="Siwa with Kelany" className="h-9 w-auto" />
            )}
          </a>

          <div className="flex items-center gap-3">
            <LanguageSwitcher variant={dark ? 'dark' : 'light'} />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              aria-haspopup="dialog"
              aria-expanded={open}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                dark
                  ? 'border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 focus-visible:ring-primary-foreground'
                  : 'border-border bg-background/80 text-primary backdrop-blur hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary'
              }`}
            >
              <Compass className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <FloatingCompass open={open} onClose={() => setOpen(false)} />
    </>
  );
}
