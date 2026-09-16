'use client';

import React from 'react';
import { Truck, ShieldCheck, BadgePercent, Headphones, Leaf } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: Truck,
    title: 'Reliable Delivery',
    subtitle: 'On time, every time',
  },
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    subtitle: 'Sourced with care',
  },
  {
    icon: BadgePercent,
    title: 'Competitive Pricing',
    subtitle: 'Great value for your business',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    subtitle: 'Your success is our priority',
  },
  {
    icon: Leaf,
    title: 'Sustainable Sourcing',
    subtitle: 'A healthier future',
  },
];

export function CommercialTrustStrip() {
  return (
    <section className="bg-white border-y border-slate-200 py-3 sm:py-7 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Smooth Horizontal Snap Rail / Desktop: Clean 5-col Grid */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory touch-pan-x overscroll-x-contain -mx-4 px-4 sm:mx-0 sm:px-0 py-1">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx} 
                className="shrink-0 snap-start flex items-center gap-3 bg-slate-50/90 sm:bg-transparent border border-slate-200/80 sm:border-0 rounded-xl px-3.5 py-2.5 sm:p-0 transition-all shadow-xs sm:shadow-none min-w-[210px] sm:min-w-0 active:scale-[0.98]"
              >
                <div className="shrink-0 text-emerald-600 bg-emerald-100/60 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none">
                  <Icon className="w-5 h-5 sm:w-8 sm:h-8 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-900 leading-tight whitespace-nowrap sm:whitespace-normal">
                    {pillar.title}
                  </h4>
                  <p className="font-sans text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight whitespace-nowrap sm:whitespace-normal">
                    {pillar.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
