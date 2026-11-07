import React from 'react';
import { FloatingAmbientHero } from '@/components/public/FloatingAmbientHero';
import { CommercialTrustStrip } from '@/components/public/CommercialTrustStrip';
import { AboutRootwillsSection } from '@/components/public/AboutRootwillsSection';
import { ServicesSection } from '@/components/public/ServicesSection';
import { ApproachSection } from '@/components/public/ApproachSection';
import { MidBannerSection } from '@/components/public/MidBannerSection';
import { TestimonialsSection } from '@/components/public/TestimonialsSection';

export const metadata = {
  title: 'Rootwills | UK Food Services, Fresh Produce & Hospitality Wholesale Supplier',
  description:
    'Rootwills supplies restaurants, hotels, caterers, and hospitality kitchens across Birmingham, the Midlands, and London with hand-graded British farm produce, artisan dairy, prime butchery, and pre-dawn wholesale delivery.',
  alternates: {
    canonical: '/',
  },
};

export default function PublicHomePage() {
  return (
    <div className="w-full bg-[#FAF7F2] text-[#131313] overflow-x-hidden">
      {/* ─── 1. Floating Ambient Motion Hero (Anubi-style Kinetic Eggshell Canvas) ─── */}
      <FloatingAmbientHero />

      {/* ─── 2. Continuous British Heritage Canvas ─── */}
      <div className="relative bg-[#FAF7F2] text-[#131313] overflow-hidden">
        <div className="relative z-10">
          {/* 1b. Commercial Trust & Wholesale Guarantees Marquee */}
          <CommercialTrustStrip />

          {/* 2. About Rootwills: More Than Just Food Supply */}
          <AboutRootwillsSection />

          {/* 3. Our Services: Tailored Solutions for Every Business */}
          <ServicesSection />

          {/* 4. Our Approach: Built on Trust, Quality & Consistency */}
          <ApproachSection />

          {/* 5. Standards & Industry Benchmarks */}
          <MidBannerSection />

          {/* 6. Client Testimonials */}
          <TestimonialsSection />
        </div>
      </div>
    </div>
  );
}
