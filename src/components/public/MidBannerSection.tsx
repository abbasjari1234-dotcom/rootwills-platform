'use client';

import React from 'react';
import { ShieldCheck, Truck, Snowflake, CheckCircle2 } from 'lucide-react';

export function MidBannerSection() {
  const benchmarks = [
    {
      metric: '99.4%',
      title: 'Order Fulfillment',
      subtitle: 'Direct Grower Lineage',
      icon: CheckCircle2,
    },
    {
      metric: '< 4°C',
      title: 'Cold-Chain Verified',
      subtitle: 'Monitored Farm to Kitchen',
      icon: Snowflake,
    },
    {
      metric: '6 Days',
      title: 'Dawn Delivery',
      subtitle: '04:00 – 07:30 Fleet Drops',
      icon: Truck,
    },
    {
      metric: '100%',
      title: 'SALSA Assured',
      subtitle: 'Full Batch Traceability',
      icon: ShieldCheck,
    },
  ];

  return (
    <div id="standards" className="pt-14 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 text-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Single Refined Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-[1px] w-6 bg-[#BA8E4E]/40" />
          <span className="text-[10px] sm:text-xs font-serif tracking-[0.28em] uppercase text-[#BA8E4E] font-semibold">
            THE ROOTWILLS STANDARD
          </span>
          <span className="h-[1px] w-6 bg-[#BA8E4E]/40" />
        </div>

        {/* Editorial Headline */}
        <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#2E060D] tracking-tight leading-[1.18] mb-3 sm:mb-4">
          Supporting the Food Industry <br className="hidden sm:inline" />
          Across the <span className="text-[#8B2635] italic font-normal">United Kingdom</span>
        </h2>

        {/* Narrative Lead Paragraph */}
        <p className="text-xs sm:text-sm lg:text-[15px] text-stone-600 font-sans leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
          From independent Michelin-caliber dining rooms to high-volume hospitality groups, our dawn supply chain powers Britain’s most demanding kitchens with uncompromising freshness, locked wholesale margins, and pedigree.
        </p>

        {/* ─── Architectural Credential Ribbon: Prestige Heritage Glass Board ─── */}
        <div className="w-full mx-auto p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl bg-white/70 ring-1 ring-[#BA8E4E]/30 shadow-[0_16px_40px_rgba(78,13,23,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md mb-6 sm:mb-8">
          <div className="rounded-[calc(1rem-0.125rem)] sm:rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-b from-[#FAF7F0] to-[#FAF6EE] px-4 py-6 sm:px-6 sm:py-8 border border-white/60">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-[#BA8E4E]/25">
              
              {benchmarks.map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.title}
                    className="px-3 sm:px-6 text-center flex flex-col items-center justify-center group"
                  >
                    {/* Micro Gold Circular Badge */}
                    <div className="w-8 h-8 rounded-full bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/35 flex items-center justify-center text-[#BA8E4E] mb-2.5 shadow-xs group-hover:scale-110 group-hover:ring-[#BA8E4E]/70 transition-all duration-300">
                      <Icon className="w-4 h-4 stroke-[1.75]" />
                    </div>

                    {/* Metric Numeral */}
                    <span className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#4E0D17] leading-none mb-1.5 tracking-tight group-hover:text-[#2E060D] transition-colors">
                      {item.metric}
                    </span>

                    {/* Title */}
                    <span className="font-serif text-xs sm:text-[13.5px] font-semibold text-[#2E060D] tracking-wide">
                      {item.title}
                    </span>

                    {/* Subtitle */}
                    <span className="text-[10.5px] sm:text-[11.5px] text-stone-500 font-sans mt-0.5">
                      {item.subtitle}
                    </span>
                  </div>
                );
              })}

            </div>
          </div>
        </div>

        {/* Lower Assurance Pill — Responsive & Wrap-Safe */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-2xl sm:rounded-full bg-white/70 border border-[#BA8E4E]/30 text-[9.5px] sm:text-[11px] font-sans tracking-[0.12em] sm:tracking-[0.16em] uppercase text-[#4E0D17] font-semibold shadow-xs max-w-full text-center">
          <span className="text-[#BA8E4E]">✦</span>
          <span>Pre-Dawn Fleet Logistics</span>
          <span className="text-[#BA8E4E]/40 hidden xs:inline">•</span>
          <span>Guaranteed Temperatures</span>
          <span className="text-[#BA8E4E]/40 hidden xs:inline">•</span>
          <span>Locked Trade Margins</span>
          <span className="text-[#BA8E4E]">✦</span>
        </div>

        {/* Elegant Hairline Transition to Testimonials */}
        <div className="w-full max-w-xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#BA8E4E]/25 to-transparent mt-12 sm:mt-16" />

      </div>
    </div>
  );
}
