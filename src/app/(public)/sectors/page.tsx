import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Truck, Clock } from 'lucide-react';
import { SectorsGrid } from '@/components/public/SectorsGrid';
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

export const metadata: Metadata = {
  title: 'Hospitality & Foodservice Sectors We Supply | Rootwills UK',
  description:
    'Explore wholesale produce and food supply tailored for UK restaurants, boutique hotels, care homes, luxury caterers, gastropubs, and schools. Pre-dawn 06:00 AM delivery.',
};

export default function SectorsPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-stone-900">
      {/* ─── Hero Header: Royal Burgundy Damask ─── */}
      <section className="bg-[#180306] text-white relative overflow-hidden border-b border-[#BA8E4E]/25 pt-16 sm:pt-24 pb-16">
        {/* Authentic Rich Damask Texture */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-85"
          style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
        />
        {/* Atmospheric Vignette & Contrast Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(16,2,4,0.45)_75%,rgba(8,1,2,0.85)_100%)] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#180306]/70 via-transparent to-[#100204]/85 pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BA8E4E]/15 border border-[#BA8E4E]/40 text-[#D4A86A] text-xs font-serif uppercase tracking-[0.2em] font-semibold">
            <span>Specialised Foodservice Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            Tailored Wholesale Supply for <br className="hidden sm:inline" />
            <span className="text-[#D4A86A]">Professional Kitchens</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#EDE4D8]/85 font-sans max-w-2xl mx-auto leading-relaxed">
            From Michelin-starred dining rooms to multi-site hotel banqueting and high-volume catering, we deliver bespoke pack sizes, volume tier discounts, and guaranteed pre-dawn drops.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-6 text-xs font-serif text-[#D4A86A]">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#BA8E4E]" />
              <span>Guaranteed 06:00 AM Delivery</span>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#BA8E4E]" />
              <span>11:00 PM Order Cutoff</span>
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#BA8E4E]" />
              <span>30-Day B2B Trade Terms</span>
            </span>
          </div>
        </div>
      </section>

      {/* Sectors 6-Card Showcase Grid */}
      <SectorsGrid />

      {/* Conversion Banner */}
      <CommercialBottomCTA />
    </div>
  );
}
