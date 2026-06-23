import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import FloatingCompass from './FloatingCompass';

/**
 * Minimal transparent top bar that lives above the fold and consolidates the
 * persistent floating chrome into one aligned cluster:
 *   - the wordmark (left) gives the page a brand/identity anchor over the hero
 *   - the language switcher + menu trigger (right) read as one intentional group
 *
 * `variant="dark"` is for placement over a dark hero (cream text); `light` is
 * for placement over a light surface (e.g. the Blog header already has its own
 * dark band, so it passes `dark`).
 */
export default function TopBar({ variant = 'dark', wordmark = 'Siwa with Kelany', homeHref = '#arrival' }) {
  const [open, setOpen] = useState(false);
  const isDark = variant === 'dark';

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a
            href={homeHref}
            className={`font-body text-sm font-semibold uppercase tracking-[0.3em] transition hover:opacity-80 ${
              isDark ? 'text-primary-foreground' : 'text-foreground'
            }`}
          >
            {wordmark}
          </a>

          <div className="flex items-center gap-3">
            <LanguageSwitcher variant={isDark ? 'dark' : 'light'} />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              aria-haspopup="dialog"
              aria-expanded={open}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isDark
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
