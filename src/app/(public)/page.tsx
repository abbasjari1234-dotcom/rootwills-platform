import React from 'react';
import { CommercialB2BHero } from '@/components/public/CommercialB2BHero';
import { AboutRootwillsSection } from '@/components/public/AboutRootwillsSection';
import { ServicesSection } from '@/components/public/ServicesSection';
import { ApproachSection } from '@/components/public/ApproachSection';
import { MidBannerSection } from '@/components/public/MidBannerSection';
import { TestimonialsSection } from '@/components/public/TestimonialsSection';

export const metadata = {
  title: 'Rootwills | A Trusted Partner in Food Services & Wholesale UK',
  description:
    'Reliable supply solutions for restaurants, caterers, hospitality businesses and food professionals across the UK. Quality. Consistency. Partnership.',
};

export default function PublicHomePage() {
  return (
    <div className="w-full bg-[#FAF7F2] text-slate-900 overflow-x-hidden">
      {/* ─── 1. Hero Section ─── */}
      <CommercialB2BHero />

      {/* ─── 2. About Rootwills: More Than Just Food Supply ─── */}
      <AboutRootwillsSection />

      {/* ─── 3. Our Services: Tailored Solutions for Every Business ─── */}
      <ServicesSection />

      {/* ─── 4. Our Approach: Built on Trust, Quality & Consistency ─── */}
      <ApproachSection />

      {/* ─── 5. Mid Banner: Supporting the Food Industry Across the UK ─── */}
      <MidBannerSection />

      {/* ─── 6. Testimonials: Trusted by Food Businesses ─── */}
      <TestimonialsSection />
    </div>
  );
}
