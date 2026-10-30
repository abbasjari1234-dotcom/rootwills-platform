'use client';

import React from 'react';
import { ShieldCheck, Truck, Snowflake, CheckCircle2 } from 'lucide-react';
import { DoodleFlourish } from './DoodleFlourish';

export function MidBannerSection() {
  const benchmarks = [
    {
      metric: '99.4%',
      title: 'Order Fulfillment',
      subtitle: 'Zero Missing Crate Policy',
      icon: CheckCircle2,
      badge: 'KPI 01',
    },
    {
      metric: '< 4°C',
      title: 'Cold-Chain Verified',
      subtitle: 'Monitored Farm to Kitchen',
      icon: Snowflake,
      badge: 'KPI 02',
    },
    {
      metric: '6 Days',
      title: 'Dawn Delivery',
      subtitle: '04:00 – 07:30 Fleet Drops',
      icon: Truck,
      badge: 'KPI 03',
    },
    {
      metric: '100%',
      title: 'SALSA Assured',
      subtitle: 'Full Batch Traceability',
      icon: ShieldCheck,
      badge: 'KPI 04',
    },
  ];

  return (
    <div id="standards" className="pt-16 sm:pt-24 lg:pt-28 pb-10 sm:pb-16 text-slate-900 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Monospace Eyebrow Capsule */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 mb-3 sm:mb-4 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#2E060D] font-semibold">
            04 // THE ROOTWILLS STANDARD
          </span>
        </div>

        {/* Editorial Headline with Hand-Drawn Flourish */}
        <div className="relative inline-block max-w-3xl">
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#2E060D] tracking-[-0.025em] leading-[1.14] mb-1 sm:mb-2">
            Supporting the Food Industry <br className="hidden sm:inline" />
            Across the <span className="text-[#8B2635] italic font-normal">United Kingdom</span>
          </h2>
          <div className="flex justify-center">
            <DoodleFlourish 
              variant="underline-wave" 
              color="#BA8E4E" 
              strokeWidth={3} 
              className="w-48 sm:w-64 -mt-1 sm:-mt-1.5 mb-3 text-[#BA8E4E]" 
              delay={200}
            />
          </div>
        </div>

        {/* Narrative Lead Paragraph */}
        <p className="text-xs sm:text-sm lg:text-[15px] text-stone-600 font-sans leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto">
          From independent Michelin-caliber dining rooms to high-volume hospitality groups, our dawn supply chain powers Britain’s most demanding kitchens with uncompromising freshness, locked wholesale margins, and pedigree.
        </p>

        {/* ─── Architectural Credential Ribbon: Apple Heritage Glass Board ─── */}
        <div className="w-full mx-auto p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl apple-glass-card shadow-[0_20px_50px_rgba(78,13,23,0.08)] mb-6 sm:mb-8 relative overflow-hidden">
          {/* Specular Top Rim */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

          <div className="rounded-[calc(1rem-0.125rem)] sm:rounded-[calc(1.5rem-0.25rem)] bg-[#FAF7F0]/90 px-4 py-6 sm:px-6 sm:py-9 border border-white/70">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-[#BA8E4E]/25">
              
              {benchmarks.map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.title}
                    className="px-3 sm:px-6 text-center flex flex-col items-center justify-center group apple-tactile transition-all duration-200 ease-out active:scale-95 cursor-default hover:-translate-y-1"
                  >
                    {/* Double-Bezel Concentric Jewel Badge */}
                    <div className="relative p-1 rounded-full bg-gradient-to-br from-[#BA8E4E]/30 via-white to-[#BA8E4E]/10 mb-2.5 shadow-[0_2px_8px_rgba(46,6,13,0.06)] group-hover:scale-110 group-hover:shadow-[0_4px_14px_rgba(186,142,78,0.25)] transition-all duration-300">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFFDF9] ring-1 ring-[#BA8E4E]/40 flex items-center justify-center text-[#BA8E4E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                        <Icon className="w-4 h-4 stroke-[1.8]" />
                      </div>
                    </div>

                    <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#BA8E4E] font-semibold mb-1">
                      {item.badge}
                    </span>

                    {/* Metric Numeral */}
                    <span className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#4E0D17] leading-none mb-1.5 tracking-tight group-hover:text-[#2E060D] transition-colors">
                      {item.metric}
                    </span>

                    {/* Title */}
                    <span className="font-serif text-xs sm:text-[14px] font-semibold text-[#2E060D] tracking-wide">
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

        {/* Lower Assurance Pill with Apple Tactile Response */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2 rounded-2xl sm:rounded-full bg-white/85 backdrop-blur-sm border border-[#BA8E4E]/30 text-[10px] sm:text-[11px] font-sans tracking-[0.1em] sm:tracking-[0.14em] uppercase text-[#4E0D17] font-semibold shadow-xs max-w-full text-center apple-tactile active:scale-95 transition-transform duration-100 ease-out">
          <div className="inline-flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#BA8E4E]" strokeWidth={2} />
            <span>Pre-Dawn Fleet Logistics</span>
          </div>
          <span className="text-[#BA8E4E]/40 hidden xs:inline">•</span>
          <div className="inline-flex items-center gap-1.5">
            <Snowflake className="w-3.5 h-3.5 text-[#BA8E4E]" strokeWidth={2} />
            <span>Guaranteed Cold-Chain</span>
          </div>
          <span className="text-[#BA8E4E]/40 hidden xs:inline">•</span>
          <div className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#BA8E4E]" strokeWidth={2} />
            <span>Locked Trade Margins</span>
          </div>
        </div>

        {/* Elegant Hairline Transition */}
        <div className="w-full max-w-xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#BA8E4E]/25 to-transparent mt-12 sm:mt-16" />

      </div>
    </div>
  );
}
