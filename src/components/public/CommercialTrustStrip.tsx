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
    <section className="bg-white border-y border-slate-200 py-6 sm:py-7 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center gap-3.5 group"
              >
                <div className="shrink-0 text-emerald-600">
                  <Icon className="w-8 h-8 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-sans font-bold text-sm text-slate-900 leading-tight">
                    {pillar.title}
                  </h4>
                  <p className="font-sans text-xs text-slate-500 mt-0.5 leading-tight">
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
