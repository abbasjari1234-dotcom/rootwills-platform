'use client';

import React, { useState } from 'react';
import { 
  Truck, 
  ShieldCheck, 
  BadgePercent, 
  Headphones, 
  Leaf, 
  Clock, 
  Snowflake, 
  Award,
  Pause,
  Play
} from 'lucide-react';

interface TrustPillar {
  icon: React.ElementType;
  tag: string;
  title: string;
  subtitle: string;
}

const TRUST_PILLARS: TrustPillar[] = [
  {
    icon: Truck,
    tag: 'Pre-Dawn Drops',
    title: 'Reliable Delivery',
    subtitle: 'London & Home Counties on time, every time',
  },
  {
    icon: ShieldCheck,
    tag: 'Chef Inspected',
    title: 'Class 1 Quality',
    subtitle: 'Daily hand-graded British & European produce',
  },
  {
    icon: BadgePercent,
    tag: 'Direct Wholesale',
    title: 'Competitive Rates',
    subtitle: 'Transparent, locked trade contract pricing',
  },
  {
    icon: Headphones,
    tag: 'Personal Desk',
    title: 'Dedicated Support',
    subtitle: 'Assigned depot manager on direct dial',
  },
  {
    icon: Leaf,
    tag: 'Direct Provenance',
    title: 'Sustainable Sourcing',
    subtitle: 'Kentish orchards & British farm partners',
  },
  {
    icon: Snowflake,
    tag: 'Dual-Temp Fleet',
    title: 'Cold-Chain Assured',
    subtitle: 'Continuous GPS temperature telemetry',
  },
  {
    icon: Clock,
    tag: 'Evening & Dawn Desk',
    title: '24/6 Kitchen Support',
    subtitle: 'Night coordination & pre-dawn 05:30 AM drops',
  },
  {
    icon: Award,
    tag: 'Trade Standard',
    title: '99.4% Fulfillment',
    subtitle: 'Zero-tolerance missing crate guarantee',
  },
];

export function CommercialTrustStrip() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless 50% translation loop
  const marqueeItems = [...TRUST_PILLARS, ...TRUST_PILLARS];

  return (
    <section 
      aria-label="Commercial Trust & Wholesale Guarantees"
      className="relative z-20 border-y border-[#E8DEC8]/80 bg-[#FAF7F2] py-3.5 sm:py-4 overflow-hidden select-none"
    >
      {/* Seamless Botanical Parchment Texture */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />
      {/* Top & bottom subtle golden specular hairlines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#BA8E4E]/45 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

      {/* Main Container with Soft Feathered Edge Fade */}
      <div className="relative w-full overflow-hidden">
        {/* Continuous Marquee Track */}
        <div
          className="w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}
        >
          <div 
            className={`animate-marquee-glide items-center gap-4 sm:gap-5 py-1 ${isPaused ? 'is-paused' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {marqueeItems.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                /* Double-Bezel Outer Shell */
                <div
                  key={`${pillar.title}-${idx}`}
                  className="shrink-0 p-1 rounded-full bg-[#EFE8D8]/70 ring-1 ring-[#BA8E4E]/25 hover:ring-[#BA8E4E]/60 transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_2px_10px_rgba(46,6,13,0.04)] hover:shadow-[0_8px_24px_rgba(46,6,13,0.09)] group cursor-default"
                >
                  {/* Inner Core */}
                  <div className="flex items-center gap-3.5 bg-[#FFFDF9] rounded-full pl-2.5 pr-4 sm:pl-3 sm:pr-5 py-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
                    {/* Luxury Burgundy & Gold Seal */}
                    <div className="shrink-0 relative p-0.5 rounded-full bg-gradient-to-br from-[#BA8E4E]/45 via-[#BA8E4E]/15 to-transparent shadow-[0_2px_6px_rgba(46,6,13,0.14)]">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#3D0A12] to-[#1E0307] border border-[#BA8E4E]/45 flex items-center justify-center text-[#F3D08A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
                        <Icon className="w-4 h-4 stroke-[1.75]" />
                      </div>
                    </div>

                    {/* Pillar Text Lockup */}
                    <div className="min-w-0 pr-0.5">
                      <div className="flex items-center gap-1.5 leading-none">
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] font-semibold text-[#BA8E4E] tabular-nums">
                          {pillar.tag}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-xs sm:text-[13.5px] text-[#2E060D] leading-tight whitespace-nowrap mt-0.5 group-hover:text-[#7A202E] transition-colors tabular-nums">
                        {pillar.title}
                      </h4>
                      <p className="font-sans text-[11px] text-stone-600 leading-tight whitespace-nowrap mt-0.5">
                        {pillar.subtitle}
                      </p>
                    </div>

                    {/* Botanical Diamond Separator */}
                    <div className="hidden sm:flex items-center pl-1.5 text-[#BA8E4E]/40 text-[10px] select-none" aria-hidden="true">
                      ✦
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Accessibility Controls (Discreet Pause/Play button) */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hidden lg:block opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Resume automated slider' : 'Pause automated slider'}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2E060D]/90 text-[#E8C28A] hover:bg-[#3D0A12] border border-[#BA8E4E]/40 text-[10px] font-mono tracking-wide shadow-md backdrop-blur-sm transition-all"
          >
            {isPaused ? (
              <>
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Play</span>
              </>
            ) : (
              <>
                <Pause className="w-2.5 h-2.5 fill-current" />
                <span>Pause</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
