import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import { SectorsGrid } from '@/components/public/SectorsGrid';
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

export const metadata: Metadata = {
  title: 'Hospitality & Foodservice Sectors We Supply | Rootwills UK',
  description:
    'Explore wholesale produce and food supply tailored for UK restaurants, boutique hotels, care homes, luxury caterers, gastropubs, and schools. Pre-dawn 06:00 AM delivery.',
};

export default function SectorsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Sectors Hero Header */}
      <section className="relative py-16 lg:py-20 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-t from-emerald-900/30 via-slate-950/80 to-slate-950 pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest">
            <span>Specialised Foodservice Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tight text-white leading-tight">
            Tailored Wholesale Supply for <br className="hidden sm:inline" />
            <span className="text-emerald-400">Every Professional Kitchen</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
            From Michelin-starred dining rooms to multi-site hotel banqueting and high-volume catering, we deliver bespoke pack sizes, volume tier discounts, and guaranteed pre-dawn drops.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Truck className="w-4 h-4" />
              <span>Guaranteed 06:00 AM Delivery</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Clock className="w-4 h-4" />
              <span>11:00 PM Order Cutoff</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>30-Day B2B Trade Terms</span>
            </span>
          </div>
        </div>
      </section>

      {/* Sectors 6-Card Showcase Grid */}
      <section className="py-12 lg:py-16">
        <SectorsGrid />
      </section>

      {/* Conversion Banner */}
      <CommercialBottomCTA />
    </div>
  );
}
