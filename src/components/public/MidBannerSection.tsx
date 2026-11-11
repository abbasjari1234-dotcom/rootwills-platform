'use client';

import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Truck, Snowflake, CheckCircle2 } from 'lucide-react';
import { gsap } from '@/lib/animations/gsap-core';

export function MidBannerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 16, opacity: 0.85 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (ribbonRef.current) {
        gsap.fromTo(
          ribbonRef.current,
          { y: 20, opacity: 0.85, scale: 0.99 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ribbonRef.current,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      title: 'Batch Traceable',
      subtitle: 'Field-to-Pass Provenance',
      icon: ShieldCheck,
      badge: 'KPI 04',
    },
  ];

  return (
    <div ref={sectionRef} id="standards" className="pt-9 sm:pt-24 lg:pt-32 pb-6 sm:pb-16 bg-[#FAF7F2] text-[#2E060D] overflow-hidden relative">
      {/* Seamless Botanical Parchment Texture */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div ref={headerRef}>
          {/* Clean Centered Editorial Hairline Kicker */}
          <div className="inline-flex items-center gap-3 mb-3 sm:mb-5">
            <span className="w-6 sm:w-8 h-[1px] bg-[#8B2635]/40" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8B2635] font-semibold">
              04 — The Rootwills Standard
            </span>
            <span className="w-6 sm:w-8 h-[1px] bg-[#8B2635]/40" />
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-serif font-bold text-[#2E060D] tracking-[-0.025em] leading-[1.08] mb-3 sm:mb-5 max-w-3xl mx-auto [text-wrap:balance]">
            Supporting the Food Industry <br className="hidden sm:inline" />
            Across the <span className="text-[#8B2635] italic font-normal">United Kingdom.</span>
          </h2>

          {/* Narrative Lead Paragraph */}
          <p className="text-xs sm:text-sm lg:text-[15px] text-stone-600 font-sans leading-[1.65] sm:leading-[1.7] mb-6 sm:mb-12 max-w-[58ch] mx-auto">
            From independent Michelin-caliber dining rooms to high-volume hospitality groups, our dawn supply chain powers Britain’s most demanding kitchens with uncompromising freshness, locked wholesale terms, and farm-direct pedigree.
          </p>
        </div>

        {/* ─── Architectural Specification Ledger (Exposed 1px Hairline Grid) ─── */}
        <div 
          ref={ribbonRef}
          className="w-full mx-auto rounded-xl sm:rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] shadow-[0_12px_36px_-12px_rgba(46,6,13,0.07)] overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#DCD2C0]">
            {benchmarks.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.title}
                  className="p-4 sm:p-7 lg:p-8 text-left flex flex-col justify-between group hover:bg-[#FAF7F2]/80 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-6">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#8B2635] font-semibold tabular-nums">
                      {item.badge}
                    </span>
                    <Icon className="w-4 h-4 text-stone-400 group-hover:text-[#8B2635] transition-colors stroke-[1.75]" />
                  </div>

                  <div>
                    <span className="block font-serif text-2xl sm:text-4xl lg:text-[44px] font-bold text-[#2E060D] leading-none mb-1.5 sm:mb-2 tracking-tight tabular-nums">
                      {item.metric}
                    </span>
                    <span className="block font-serif text-xs sm:text-[15px] font-bold text-[#2E060D]">
                      {item.title}
                    </span>
                    <span className="block text-[10.5px] sm:text-xs text-stone-500 font-sans mt-0.5">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimalist Architectural Provenance Footer Line */}
        <div className="hidden sm:flex items-center justify-center gap-6 pt-6 text-[10.5px] font-mono uppercase tracking-[0.18em] text-stone-500">
          <span>Pre-Dawn Fleet Logistics</span>
          <span className="text-[#8B2635]">•</span>
          <span>Guaranteed Cold-Chain</span>
          <span className="text-[#8B2635]">•</span>
          <span>Direct Farm Provenance</span>
        </div>

      </div>
    </div>
  );
}
