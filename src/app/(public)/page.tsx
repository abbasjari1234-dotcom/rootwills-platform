import React from 'react';
import { CommercialB2BHero } from '@/components/public/CommercialB2BHero';
import { AboutRootwillsSection } from '@/components/public/AboutRootwillsSection';
import { ServicesSection } from '@/components/public/ServicesSection';
import { ApproachSection } from '@/components/public/ApproachSection';
import { MidBannerSection } from '@/components/public/MidBannerSection';
import { TestimonialsSection } from '@/components/public/TestimonialsSection';
import { GetInTouchBanner } from '@/components/public/GetInTouchBanner';

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

      {/* ─── 6 & 7. Testimonials & Direct Trade Enquiries (Unified Seamless Flow on Single Crest Canvas) ─── */}
      <section className="bg-[#FAF6EE] text-slate-900 relative overflow-hidden border-b border-[#E8DEC8]">
        {/* Continuous Neoclassical Laurel Wreaths & Architectural Crest Watermark Texture */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-45 mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/texture_testimonials_crest.jpg')`,
          }}
        />

        <div className="relative z-10">
          <TestimonialsSection />
          <GetInTouchBanner />
        </div>
      </section>
    </div>
  );
}
