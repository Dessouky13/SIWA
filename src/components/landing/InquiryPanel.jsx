import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { waLink } from '@/lib/whatsapp';

export default function InquiryPanel() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ destination: '', duration: '3', people: '2', mood: 'history, salt lakes, and dunes' });

  const submit = (event) => {
    event.preventDefault();
    const dest = form.destination || t('destOption1');
    const msg = `${t('waInquiry')} ${dest} · ${form.duration} ${t('days')} · ${form.people} ${t('people')} · ${form.mood}`;
    window.open(waLink(msg), '_blank');
  };

  return (
    <section id="inquiry" className="bg-background px-6 py-24 md:px-10">
      <div className="mx-auto max-w-5xl rounded-[3rem] border border-border bg-card p-6 shadow-2xl md:p-12">
        <p className="font-body text-sm uppercase tracking-[0.35em] text-primary">{t('inquiryLabel')}</p>
        <h2 className="mt-5 font-display text-5xl leading-none text-foreground md:text-7xl">{t('inquiryTitle')}</h2>
        <form onSubmit={submit} className="mt-10 grid gap-5 font-body text-lg md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('destination')}</span>
            <select value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} className="w-full rounded-2xl border border-input bg-background px-5 py-4 text-foreground outline-none focus:ring-2 focus:ring-primary">
              <option value="">{t('destOption1')}</option>
              <option value="Siwa + White Desert">{t('destOption2')}</option>
              <option value="Custom Egypt Desert Journey">{t('destOption3')}</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('duration')}</span>
            <select value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full rounded-2xl border border-input bg-background px-5 py-4 text-foreground outline-none focus:ring-2 focus:ring-primary">
              <option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('people')}</span>
            <input value={form.people} onChange={(e) => setForm({ ...form, people: e.target.value })} className="w-full rounded-2xl border border-input bg-background px-5 py-4 text-foreground outline-none focus:ring-2 focus:ring-primary" />
          </label>
          <label className="space-y-2">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('experienceType')}</span>
            <input value={form.mood} onChange={(e) => setForm({ ...form, mood: e.target.value })} className="w-full rounded-2xl border border-input bg-background px-5 py-4 text-foreground outline-none focus:ring-2 focus:ring-primary" />
          </label>
          <button className="salt-crystal md:col-span-2 mt-4 inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-5 text-sm font-bold uppercase tracking-[0.25em] text-white transition hover:-translate-y-1">
            {t('beginConversation')} <MessageCircle className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}