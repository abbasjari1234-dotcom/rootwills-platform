import React from 'react';
import { FloatingAmbientHero } from '@/components/public/FloatingAmbientHero';
import { CommercialTrustStrip } from '@/components/public/CommercialTrustStrip';
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
      {/* ─── 1. Floating Ambient Motion Hero ─── */}
      <FloatingAmbientHero />

      {/* ─── Continuous British Heritage Cream Canvas (Unified flow from top to bottom) ─── */}
      <div className="relative bg-[#FAF7F2] text-slate-900 overflow-hidden">
        {/* Seamless Botanical Etching Texture running continuously through all body sections */}
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.22] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />

        <div className="relative z-10">
          {/* 1b. Five Commercial Trust Pillars */}
          <CommercialTrustStrip />

          {/* 2. About Rootwills: More Than Just Food Supply */}
          <AboutRootwillsSection />

          {/* 3. Our Services: Tailored Solutions for Every Business */}
          <ServicesSection />

          {/* 4. Our Approach: Built on Trust, Quality & Consistency */}
          <ApproachSection />

          {/* 5. Standards Benchmarks */}
          <MidBannerSection />

          {/* 6. Testimonials */}
          <TestimonialsSection />

          {/* 7. Direct Commercial Enquiries */}
          <GetInTouchBanner />
        </div>
      </div>
    </div>
  );
}
