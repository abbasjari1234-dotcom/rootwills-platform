'use client';

import React from 'react';
import { Truck, ShieldCheck, BadgePercent, Headphones, Leaf } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: Truck,
    title: 'Reliable Delivery',
    subtitle: 'Pre-dawn drops on time, every time',
  },
  {
    icon: ShieldCheck,
    title: 'Class 1 Quality',
    subtitle: 'Hand-graded daily British produce',
  },
  {
    icon: BadgePercent,
    title: 'Competitive Rates',
    subtitle: 'Transparent, locked trade pricing',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    subtitle: 'Assigned depot account desk',
  },
  {
    icon: Leaf,
    title: 'Sustainable Sourcing',
    subtitle: 'Direct farm & coastal provenance',
  },
];

export function CommercialTrustStrip() {
  return (
    <section className="bg-transparent border-b border-[#BA8E4E]/25 py-3.5 sm:py-5 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Smooth Horizontal Snap Rail (<md) / Desktop: Clean Grid (md+) */}
        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 lg:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory touch-pan-x overscroll-x-contain -mx-4 px-4 md:mx-0 md:px-0 py-1 items-center">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx} 
                className="shrink-0 snap-start flex items-center gap-3 bg-[#FFFDF9]/90 md:bg-transparent border border-[#E8DEC8] md:border-0 rounded-xl px-3.5 py-2.5 md:p-0 transition-[box-shadow,border-color] duration-200 ease-out shadow-xs md:shadow-none min-w-[210px] md:min-w-0"
              >
                <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2E060D] border border-[#BA8E4E]/40 flex items-center justify-center text-[#D4A86A] shadow-xs">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif font-bold text-xs sm:text-[13px] text-[#2E060D] leading-tight whitespace-nowrap md:whitespace-normal">
                    {pillar.title}
                  </h4>
                  <p className="font-sans text-[11px] sm:text-xs text-stone-600 mt-0.5 leading-tight whitespace-nowrap md:whitespace-normal">
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
