import React from 'react';
import { FloatingAmbientHero } from '@/components/public/FloatingAmbientHero';
import { CommercialTrustStrip } from '@/components/public/CommercialTrustStrip';
import { AboutRootwillsSection } from '@/components/public/AboutRootwillsSection';
import { ServicesSection } from '@/components/public/ServicesSection';
import { WhoWeSupplySection } from '@/components/public/WhoWeSupplySection';
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
      {/* ─── 1. Floating Ambient Motion Hero (Anubi-style Kinetic Eggshell Canvas) ─── */}
      <FloatingAmbientHero />

      {/* ─── 2. Continuous British Heritage Canvas with Soft Feathering into Hero ─── */}
      <div className="relative bg-[#FAF7F2] text-slate-900 overflow-hidden">
        {/* Top organic gradient feathering bridging the crisp #FCFCFA hero into the warm cream canvas */}
        <div 
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FCFCFA] via-[#FCFCFA]/75 to-transparent pointer-events-none z-1" 
          aria-hidden="true" 
        />

        {/* Seamless Botanical Etching Texture running continuously with soft entry fade */}
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 140px, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 140px, black 92%, transparent 100%)',
          }}
        />

        <div className="relative z-10">
          {/* 1b. Commercial Trust & Wholesale Guarantees Marquee */}
          <CommercialTrustStrip />

          {/* 2. About Rootwills: More Than Just Food Supply */}
          <AboutRootwillsSection />

          {/* 3. Our Services: Tailored Solutions for Every Business */}
          <ServicesSection />

          {/* 3b. Who We Supply: Tailored Sector Logistics & Specifications */}
          <WhoWeSupplySection />

          {/* 4. Our Approach: Built on Trust, Quality & Consistency */}
          <ApproachSection />

          {/* 5. Standards & Industry Benchmarks */}
          <MidBannerSection />

          {/* 6. Client Testimonials */}
          <TestimonialsSection />

          {/* 7. Direct Commercial Enquiries */}
          <GetInTouchBanner />
        </div>
      </div>
    </div>
  );
}
