import React from 'react';
import TopBar from '@/components/landing/TopBar';
import Hero from '@/components/landing/Hero';
import PhilosophyBand from '@/components/landing/PhilosophyBand';
import ExperienceMatrix from '@/components/landing/ExperienceMatrix';
import PackagesSection from '@/components/landing/PackagesSection';
import BlogChronicle from '@/components/landing/BlogChronicle';
import SocialProof from '@/components/landing/SocialProof';
import InquiryPanel from '@/components/landing/InquiryPanel';
import LivingFooter from '@/components/landing/LivingFooter';
import SocialBar from '@/components/landing/SocialBar';
import WhatsAppFAB from '@/components/landing/WhatsAppFAB';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <TopBar />
      <Hero />
      <PhilosophyBand />
      <ExperienceMatrix />
      <PackagesSection />
      <BlogChronicle />
      <SocialBar />
      <SocialProof />
      <InquiryPanel />
      <LivingFooter />
      <WhatsAppFAB />
    </main>
  );
}