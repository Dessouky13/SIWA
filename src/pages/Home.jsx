import React from 'react';
import FloatingCompass from '@/components/landing/FloatingCompass';
import Hero from '@/components/landing/Hero';
import ExperienceMatrix from '@/components/landing/ExperienceMatrix';
import PackagesSection from '@/components/landing/PackagesSection';
import BlogChronicle from '@/components/landing/BlogChronicle';
import SocialProof from '@/components/landing/SocialProof';
import InquiryPanel from '@/components/landing/InquiryPanel';
import LivingFooter from '@/components/landing/LivingFooter';
import SocialBar from '@/components/landing/SocialBar';
import WhatsAppFAB from '@/components/landing/WhatsAppFAB';

const HERO_IMAGE = 'https://media.base44.com/images/public/6a27d392c56bb9d87f135152/b61974c83_generated_c2a51af2.png';
const TEA_IMAGE  = 'https://media.base44.com/images/public/6a27d392c56bb9d87f135152/b39aa01e5_generated_289509c8.png';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <FloatingCompass />
      <Hero image={HERO_IMAGE} />
      <ExperienceMatrix />
      <PackagesSection />
      <BlogChronicle image={TEA_IMAGE} />
      <SocialBar />
      <SocialProof />
      <InquiryPanel />
      <LivingFooter />
      <WhatsAppFAB />
    </main>
  );
}