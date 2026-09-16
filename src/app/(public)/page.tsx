import React from 'react';
import dynamic from 'next/dynamic';
import { CommercialB2BHero } from '@/components/public/CommercialB2BHero';
import { CommercialTrustStrip } from '@/components/public/CommercialTrustStrip';
import { ProductCategoryGrid } from '@/components/public/ProductCategoryGrid';
import { SectorsGrid } from '@/components/public/SectorsGrid';
import { WhyChooseUsBanner } from '@/components/public/WhyChooseUsBanner';
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

export const metadata = {
  title: 'Rootwills | B2B Wholesale Food & Fresh Produce Supplier UK',
  description:
    'Premier B2B foodservice supplier delivering fresh produce, dairy, meats, seafood and kitchen staples across the UK. Guaranteed 06:00 AM delivery, direct farm contracts, and 30-day trade credit accounts.',
};

export default function PublicHomePage() {
  return (
    <div className="w-full bg-white text-slate-900">
      {/* ─── 1. Commercial B2B Hero ─── */}
      <CommercialB2BHero />

      {/* ─── 2. Emerald Value & Trust Strip ─── */}
      <CommercialTrustStrip />

      {/* ─── 3. Our Products: 8-Category Responsive Grid ─── */}
      <ProductCategoryGrid />

      {/* ─── 4. Who We Supply: 6 Commercial Hospitality Sectors ─── */}
      <SectorsGrid />

      {/* ─── 5. Why Choose Us: Feature Showcase ─── */}
      <WhyChooseUsBanner />

      {/* ─── 6. Bottom Conversion Strip: Split CTA ─── */}
      <CommercialBottomCTA />
    </div>
  );
}
