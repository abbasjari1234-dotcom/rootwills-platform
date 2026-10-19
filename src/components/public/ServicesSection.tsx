'use client';

import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const cardWidth = el.scrollWidth / 3;
    if (cardWidth > 0) {
      const newIdx = Math.min(2, Math.max(0, Math.round(el.scrollLeft / cardWidth)));
      if (newIdx !== activeIdx) {
        setActiveIdx(newIdx);
      }
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      const cardWidth = el.scrollWidth / 3;
      el.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
      setActiveIdx(index);
    }
  };

  return (
    <section id="services" className="py-8 sm:py-16 lg:py-28 bg-[#2A060D] text-white relative overflow-hidden border-b border-[#BA8E4E]/25">
      {/* ─── 1. Subtle Ornate Damask Engraving Watermark ─── */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20 mix-blend-overlay"
        style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
      />

      {/* ─── 2. Warm Ambient Radial Gold Glow & Vignette ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(212,168,106,0.12),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A060D] via-[#24050B] to-[#1F0409] pointer-events-none z-0 opacity-75" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-start">
          
          {/* Left Header Column */}
          <div className="lg:col-span-5 max-w-lg pr-0 lg:pr-6">
            <div className="flex items-center gap-2 mb-2 sm:mb-3.5">
              <span className="text-[#D4A86A] text-[10px] sm:text-[11px] font-serif tracking-[0.25em] uppercase font-semibold">
                — OUR SERVICES —
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-serif font-bold text-white leading-[1.18] mb-2.5 sm:mb-5">
              Tailored Solutions<br className="hidden sm:inline" />{' '}
              for Every Business
            </h2>

            <p className="text-xs sm:text-[13px] lg:text-sm text-cream-100/80 leading-relaxed font-sans mb-4 sm:mb-8 max-w-md">
              We provide a complete range of food supply and wholesale services, designed to meet the unique needs of every client — from independent restaurants to large-scale hospitality groups.
            </p>

            {/* Smooth-Scroll Button Linking to Approach Section */}
            <div className="mb-5 lg:mb-0">
              <a
                href="/#approach"
                className="group inline-flex items-center gap-2.5 sm:gap-3 pl-4 pr-1.5 py-1.5 sm:pl-7 sm:pr-3 sm:py-3 rounded-full bg-[#D4A86A] hover:bg-[#C59958] text-[#2D060D] text-xs sm:text-[13px] font-serif font-bold tracking-wider uppercase transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-md hover:shadow-xl active:scale-[0.98] active:translate-y-[1px] cursor-pointer"
              >
                <span>Discover More</span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#2D060D]/10 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#2D060D]" />
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Mobile Horizontal Snap Carousel (<sm) & Desktop 3-Column Grid (sm+) */}
          <div className="lg:col-span-7 pt-1 sm:pt-4 w-full min-w-0">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-3 gap-3.5 sm:gap-0 -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0 scroll-smooth touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Column 1: Food Service Supply */}
              <div className="w-[85vw] max-w-[320px] sm:w-auto sm:max-w-none shrink-0 sm:shrink min-w-0 snap-start bg-[#380912]/80 sm:bg-transparent ring-1 ring-[#BA8E4E]/30 sm:ring-0 rounded-2xl sm:rounded-none p-4.5 sm:p-0 sm:pr-5 lg:pr-7 group flex flex-col justify-between h-full hover:bg-white/[0.03] transition-all duration-300">
                <div className="flex flex-col flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-start mb-3 sm:mb-4">
                    <div className="p-2 rounded-full bg-white/5 ring-1 ring-[#BA8E4E]/30 sm:ring-white/10 group-hover:ring-[#D4A86A]/50 transition-colors">
                      <svg className="w-5 h-5 sm:w-7 sm:h-7 stroke-[#D4A86A] fill-none" viewBox="0 0 40 40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="20" cy="11" r="1.5" />
                        <path d="M9 26a11 11 0 0 1 22 0" />
                        <path d="M6 26h28" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-1.5 sm:mb-2 leading-snug sm:min-h-[3.25rem] flex items-start">
                    Food Service Supply
                  </h3>
                  <p className="text-xs text-cream-100/75 leading-relaxed font-sans mb-3 sm:mb-4 sm:min-h-[4.75rem]">
                    Fresh, high-quality ingredients and essential food products for restaurants, caterers and hospitality businesses.
                  </p>
                </div>
                <ul className="space-y-1 sm:space-y-1.5 pt-2 sm:pt-3 border-t border-white/10 text-[11px] text-cream-100/70 font-sans mt-auto">
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#D4A86A]">✦</span> 4AM Dawn London Drops
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#D4A86A]">✦</span> Chef-Curated Produce
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#D4A86A]">✦</span> Cold-Chain Monitored
                  </li>
                </ul>
              </div>

              {/* Column 2: Wholesale Solutions */}
              <div className="w-[85vw] max-w-[320px] sm:w-auto sm:max-w-none shrink-0 sm:shrink min-w-0 snap-start bg-[#380912]/80 sm:bg-transparent ring-1 ring-[#BA8E4E]/30 sm:ring-0 rounded-2xl sm:rounded-none p-4.5 sm:p-0 sm:px-5 lg:px-7 sm:border-l sm:border-white/10 group flex flex-col justify-between h-full hover:bg-white/[0.03] transition-all duration-300">
                <div className="flex flex-col flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-start mb-3 sm:mb-4">
                    <div className="p-2 rounded-full bg-white/5 ring-1 ring-[#BA8E4E]/30 sm:ring-white/10 group-hover:ring-[#D4A86A]/50 transition-colors">
                      <svg className="w-5 h-5 sm:w-7 sm:h-7 stroke-[#D4A86A] fill-none" viewBox="0 0 40 40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 7l12 7-12 7-12-7 12-7z" />
                        <path d="M8 14v13l12 7 12-7V14" />
                        <path d="M20 21v13" />
                        <path d="M16 9.3l8 4.7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-1.5 sm:mb-2 leading-snug sm:min-h-[3.25rem] flex items-start">
                    Wholesale Solutions
                  </h3>
                  <p className="text-xs text-cream-100/75 leading-relaxed font-sans mb-3 sm:mb-4 sm:min-h-[4.75rem]">
                    Efficient, reliable wholesale supply for food businesses of all sizes, from independents to large operations.
                  </p>
                </div>
                <ul className="space-y-1 sm:space-y-1.5 pt-2 sm:pt-3 border-t border-white/10 text-[11px] text-cream-100/70 font-sans mt-auto">
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#D4A86A]">✦</span> Tiered Volume Rates
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#D4A86A]">✦</span> Direct Grower Lineage
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#D4A86A]">✦</span> Zero Split Surcharges
                  </li>
                </ul>
              </div>

              {/* Column 3: Business Partnerships */}
              <div className="w-[85vw] max-w-[320px] sm:w-auto sm:max-w-none shrink-0 sm:shrink min-w-0 snap-start bg-[#380912]/80 sm:bg-transparent ring-1 ring-[#BA8E4E]/30 sm:ring-0 rounded-2xl sm:rounded-none p-4.5 sm:p-0 sm:pl-5 lg:pl-7 sm:border-l sm:border-white/10 group flex flex-col justify-between h-full hover:bg-white/[0.03] transition-all duration-300">
                <div className="flex flex-col flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-start mb-3 sm:mb-4">
                    <div className="p-2 rounded-full bg-white/5 ring-1 ring-[#BA8E4E]/30 sm:ring-white/10 group-hover:ring-[#D4A86A]/50 transition-colors">
                      <svg className="w-5 h-5 sm:w-7 sm:h-7 stroke-[#D4A86A] fill-none" viewBox="0 0 40 40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 22 2 2a1.5 1.5 0 0 0 2.1 0l4-4a2 2 0 0 0 0-2.8l-1.5-1.5a2 2 0 0 0-2.8 0L20 17" />
                        <path d="m8 15 5-5a2 2 0 0 1 2.8 0l1.5 1.5a2 2 0 0 1 0 2.8L15 16" />
                        <path d="M6 18a7 7 0 0 0 10.5 6l1.5-1" />
                        <path d="M34 16a7 7 0 0 0-10.5-6l-1.5 1" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-1.5 sm:mb-2 leading-snug sm:min-h-[3.25rem] flex items-start">
                    Business Partnerships
                  </h3>
                  <p className="text-xs text-cream-100/75 leading-relaxed font-sans mb-3 sm:mb-4 sm:min-h-[4.75rem]">
                    We work closely with our clients to understand their needs and create supply solutions that support their growth.
                  </p>
                </div>
                <ul className="space-y-1 sm:space-y-1.5 pt-2 sm:pt-3 border-t border-white/10 text-[11px] text-cream-100/70 font-sans mt-auto">
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#D4A86A]">✦</span> Senior Account Lead
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#D4A86A]">✦</span> 30-Day B2B Credit
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#D4A86A]">✦</span> Seasonal Menu Forecasts
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile Swipe Pagination Dots & Indicator */}
            <div className="flex sm:hidden items-center justify-center gap-3.5 pt-3">
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToCard(idx)}
                    aria-label={`Go to service ${idx + 1}`}
                    className="p-1 -m-1 flex items-center justify-center cursor-pointer bg-transparent border-0 outline-none"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        activeIdx === idx ? 'w-6 bg-[#D4A86A]' : 'w-2 bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-[9.5px] font-serif uppercase tracking-[0.16em] text-[#D4A86A]/85 font-medium">
                Swipe to explore →
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
