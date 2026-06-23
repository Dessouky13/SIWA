import React, { useState } from 'react';
import { MessageCircle, ChevronDown, Minus, Plus } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { waLink } from '@/lib/whatsapp';

// Shared field styling so the native controls read as part of the bespoke UI.
const FIELD =
  'w-full rounded-2xl border border-input bg-background px-5 py-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary';
// Native select with the OS chevron hidden (a custom one is overlaid).
const SELECT = `${FIELD} appearance-none pe-12`;

export default function InquiryPanel() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ destination: '', duration: '3', people: '2', mood: 'history, salt lakes, and dunes' });

  const setPeople = (delta) => {
    setForm((f) => {
      const next = Math.min(20, Math.max(1, (parseInt(f.people, 10) || 1) + delta));
      return { ...f, people: String(next) };
    });
  };

  const submit = (event) => {
    event.preventDefault();
    const dest = form.destination || t('destOption1');
    const msg = `${t('waInquiry')} ${dest} · ${form.duration} ${t('days')} · ${form.people} ${t('people')} · ${form.mood}`;
    window.open(waLink(msg), '_blank');
  };

  return (
    <section id="inquiry" className="bg-background px-6 py-24 md:px-10">
      <div className="mx-auto max-w-5xl rounded-panel border border-border bg-card p-6 shadow-2xl md:p-12">
        <p className="font-body text-sm uppercase tracking-[0.35em] text-primary">{t('inquiryLabel')}</p>
        <h2 className="mt-5 font-display text-5xl leading-[1.05] text-foreground md:text-6xl">{t('inquiryTitle')}</h2>
        <form onSubmit={submit} className="mt-10 grid gap-5 font-body text-lg md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('destination')}</span>
            <div className="relative">
              <select value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} className={SELECT}>
                <option value="">{t('destOption1')}</option>
                <option value="Siwa + White Desert">{t('destOption2')}</option>
                <option value="Custom Egypt Desert Journey">{t('destOption3')}</option>
              </select>
              <ChevronDown className="pointer-events-none absolute end-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </label>
          <label className="space-y-2">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('duration')}</span>
            <div className="relative">
              <select value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className={SELECT}>
                <option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option>
              </select>
              <ChevronDown className="pointer-events-none absolute end-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </label>
          <label className="space-y-2">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('people')}</span>
            <div className="flex items-stretch gap-2">
              <button
                type="button"
                onClick={() => setPeople(-1)}
                aria-label="Decrease people"
                className="flex w-14 shrink-0 items-center justify-center rounded-2xl border border-input bg-background text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                inputMode="numeric"
                min="1"
                max="20"
                value={form.people}
                onChange={(e) => setForm({ ...form, people: e.target.value })}
                className={`${FIELD} text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              />
              <button
                type="button"
                onClick={() => setPeople(1)}
                aria-label="Increase people"
                className="flex w-14 shrink-0 items-center justify-center rounded-2xl border border-input bg-background text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </label>
          <label className="space-y-2">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('experienceType')}</span>
            <input value={form.mood} onChange={(e) => setForm({ ...form, mood: e.target.value })} className={FIELD} />
          </label>
          <button type="submit" className="salt-crystal md:col-span-2 mt-4 inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-5 text-sm font-bold uppercase tracking-[0.25em] text-primary-foreground transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            {t('beginConversation')} <MessageCircle className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
