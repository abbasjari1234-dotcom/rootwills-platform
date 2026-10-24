'use client';

import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Snowflake, 
  Coins, 
  Sprout, 
  CheckCircle2, 
  UserCheck, 
  CreditCard, 
  Calendar 
} from 'lucide-react';

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
    <section id="services" className="py-10 sm:py-16 lg:py-24 relative overflow-hidden border-b border-[#E8DEC8]/60">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Header Column */}
          <div className="lg:col-span-4 max-w-lg pr-0 lg:pr-4">
            <div className="flex items-center gap-2 mb-2 sm:mb-3.5">
              <span className="text-[#BA8E4E] text-[10px] sm:text-[11px] font-serif tracking-[0.25em] uppercase font-semibold">
                — OUR SERVICES —
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-serif font-bold text-[#2E060D] leading-[1.18] mb-2.5 sm:mb-5">
              Tailored Solutions<br className="hidden sm:inline" />{' '}
              for Every Business
            </h2>

            <p className="text-xs sm:text-[13px] lg:text-sm text-stone-600 leading-relaxed font-sans mb-5 sm:mb-8 max-w-md">
              We provide a complete range of food supply and wholesale services, designed to meet the unique needs of every client — from independent restaurants to large-scale hospitality groups.
            </p>

            {/* Smooth-Scroll Button Linking to Approach Section */}
            <div>
              <a
                href="/#approach"
                className="group inline-flex items-center gap-2.5 sm:gap-3 pl-5 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 rounded-full bg-[#2E060D] hover:bg-[#4E0D17] text-[#FAF7F0] text-xs sm:text-[13px] font-serif font-bold tracking-wider uppercase transition-[transform,background-color,box-shadow] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-md hover:shadow-xl active:scale-[0.97] cursor-pointer"
              >
                <span>Discover More</span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#D4A86A]" />
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Mobile Horizontal Snap Carousel (<md) & Desktop 3-Column Grid (md+) */}
          <div className="lg:col-span-8 w-full min-w-0">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 md:gap-4 lg:gap-5 -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0 scroll-smooth touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Card 1: Food Service Supply */}
              <div className="w-[85vw] max-w-[320px] md:w-auto md:max-w-none shrink-0 md:shrink min-w-0 snap-start bg-[#FFFDF9]/95 rounded-2xl p-5 md:p-5 lg:p-6 border border-[#E8DEC8] hover:border-[#BA8E4E]/60 shadow-[0_4px_20px_rgba(46,6,13,0.03)] hover:shadow-[0_12px_32px_rgba(46,6,13,0.08)] group flex flex-col justify-between h-full transition-[border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <div className="flex flex-col flex-1">
                  <div className="relative p-1 rounded-full bg-gradient-to-br from-[#BA8E4E]/35 via-[#FAF7F0] to-[#BA8E4E]/10 mb-3.5 shadow-[0_2px_10px_rgba(46,6,13,0.06)] group-hover:scale-105 group-hover:shadow-[0_4px_16px_rgba(186,142,78,0.2)] transition-all duration-300 w-fit">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFDF9] ring-1 ring-[#BA8E4E]/40 flex items-center justify-center">
                      <svg className="w-5 h-5 stroke-[#BA8E4E] fill-none" viewBox="0 0 40 40" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="20" cy="11" r="1.5" />
                        <path d="M9 26a11 11 0 0 1 22 0" />
                        <path d="M6 26h28" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-[17px] font-serif font-bold text-[#2E060D] group-hover:text-[#8B2635] transition-colors duration-150 mb-1.5 leading-snug md:min-h-[2.75rem] flex items-start">
                    Food Service Supply
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans mb-3 sm:mb-4 md:min-h-[4rem]">
                    Fresh, high-quality ingredients and essential food products for restaurants, caterers and hospitality businesses.
                  </p>
                </div>
                <ul className="space-y-2 pt-3 border-t border-[#E8DEC8] text-[11px] text-stone-600 font-sans mt-auto">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#BA8E4E]/10 ring-1 ring-[#BA8E4E]/30 flex items-center justify-center shrink-0">
                      <Clock className="w-2.5 h-2.5 text-[#BA8E4E]" strokeWidth={2.2} />
                    </div>
                    <span className="font-medium text-stone-700">4AM Dawn London Drops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#BA8E4E]/10 ring-1 ring-[#BA8E4E]/30 flex items-center justify-center shrink-0">
                      <Sparkles className="w-2.5 h-2.5 text-[#BA8E4E]" strokeWidth={2.2} />
                    </div>
                    <span className="font-medium text-stone-700">Chef-Curated Produce</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#BA8E4E]/10 ring-1 ring-[#BA8E4E]/30 flex items-center justify-center shrink-0">
                      <Snowflake className="w-2.5 h-2.5 text-[#BA8E4E]" strokeWidth={2.2} />
                    </div>
                    <span className="font-medium text-stone-700">Cold-Chain Monitored</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Wholesale Solutions */}
              <div className="w-[85vw] max-w-[320px] md:w-auto md:max-w-none shrink-0 md:shrink min-w-0 snap-start bg-[#FFFDF9]/95 rounded-2xl p-5 md:p-5 lg:p-6 border border-[#E8DEC8] hover:border-[#BA8E4E]/60 shadow-[0_4px_20px_rgba(46,6,13,0.03)] hover:shadow-[0_12px_32px_rgba(46,6,13,0.08)] group flex flex-col justify-between h-full transition-[border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <div className="flex flex-col flex-1">
                  <div className="relative p-1 rounded-full bg-gradient-to-br from-[#BA8E4E]/35 via-[#FAF7F0] to-[#BA8E4E]/10 mb-3.5 shadow-[0_2px_10px_rgba(46,6,13,0.06)] group-hover:scale-105 group-hover:shadow-[0_4px_16px_rgba(186,142,78,0.2)] transition-all duration-300 w-fit">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFDF9] ring-1 ring-[#BA8E4E]/40 flex items-center justify-center">
                      <svg className="w-5 h-5 stroke-[#BA8E4E] fill-none" viewBox="0 0 40 40" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 7l12 7-12 7-12-7 12-7z" />
                        <path d="M8 14v13l12 7 12-7V14" />
                        <path d="M20 21v13" />
                        <path d="M16 9.3l8 4.7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-[17px] font-serif font-bold text-[#2E060D] group-hover:text-[#8B2635] transition-colors duration-150 mb-1.5 leading-snug md:min-h-[2.75rem] flex items-start">
                    Wholesale Solutions
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans mb-3 sm:mb-4 md:min-h-[4rem]">
                    Efficient, reliable wholesale supply for food businesses of all sizes, from independents to large operations.
                  </p>
                </div>
                <ul className="space-y-2 pt-3 border-t border-[#E8DEC8] text-[11px] text-stone-600 font-sans mt-auto">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#BA8E4E]/10 ring-1 ring-[#BA8E4E]/30 flex items-center justify-center shrink-0">
                      <Coins className="w-2.5 h-2.5 text-[#BA8E4E]" strokeWidth={2.2} />
                    </div>
                    <span className="font-medium text-stone-700">Tiered Volume Rates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#BA8E4E]/10 ring-1 ring-[#BA8E4E]/30 flex items-center justify-center shrink-0">
                      <Sprout className="w-2.5 h-2.5 text-[#BA8E4E]" strokeWidth={2.2} />
                    </div>
                    <span className="font-medium text-stone-700">Direct Grower Lineage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#BA8E4E]/10 ring-1 ring-[#BA8E4E]/30 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-2.5 h-2.5 text-[#BA8E4E]" strokeWidth={2.2} />
                    </div>
                    <span className="font-medium text-stone-700">Zero Split Surcharges</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Business Partnerships */}
              <div className="w-[85vw] max-w-[320px] md:w-auto md:max-w-none shrink-0 md:shrink min-w-0 snap-start bg-[#FFFDF9]/95 rounded-2xl p-5 md:p-5 lg:p-6 border border-[#E8DEC8] hover:border-[#BA8E4E]/60 shadow-[0_4px_20px_rgba(46,6,13,0.03)] hover:shadow-[0_12px_32px_rgba(46,6,13,0.08)] group flex flex-col justify-between h-full transition-[border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <div className="flex flex-col flex-1">
                  <div className="relative p-1 rounded-full bg-gradient-to-br from-[#BA8E4E]/35 via-[#FAF7F0] to-[#BA8E4E]/10 mb-3.5 shadow-[0_2px_10px_rgba(46,6,13,0.06)] group-hover:scale-105 group-hover:shadow-[0_4px_16px_rgba(186,142,78,0.2)] transition-all duration-300 w-fit">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFDF9] ring-1 ring-[#BA8E4E]/40 flex items-center justify-center">
                      <svg className="w-5 h-5 stroke-[#BA8E4E] fill-none" viewBox="0 0 40 40" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 22 2 2a1.5 1.5 0 0 0 2.1 0l4-4a2 2 0 0 0 0-2.8l-1.5-1.5a2 2 0 0 0-2.8 0L20 17" />
                        <path d="m8 15 5-5a2 2 0 0 1 2.8 0l1.5 1.5a2 2 0 0 1 0 2.8L15 16" />
                        <path d="M6 18a7 7 0 0 0 10.5 6l1.5-1" />
                        <path d="M34 16a7 7 0 0 0-10.5-6l-1.5 1" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-[17px] font-serif font-bold text-[#2E060D] group-hover:text-[#8B2635] transition-colors mb-1.5 leading-snug md:min-h-[2.75rem] flex items-start">
                    Business Partnerships
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans mb-3 sm:mb-4 md:min-h-[4rem]">
                    We work closely with our clients to understand their needs and create supply solutions that support their growth.
                  </p>
                </div>
                <ul className="space-y-2 pt-3 border-t border-[#E8DEC8] text-[11px] text-stone-600 font-sans mt-auto">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#BA8E4E]/10 ring-1 ring-[#BA8E4E]/30 flex items-center justify-center shrink-0">
                      <UserCheck className="w-2.5 h-2.5 text-[#BA8E4E]" strokeWidth={2.2} />
                    </div>
                    <span className="font-medium text-stone-700">Senior Account Lead</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#BA8E4E]/10 ring-1 ring-[#BA8E4E]/30 flex items-center justify-center shrink-0">
                      <CreditCard className="w-2.5 h-2.5 text-[#BA8E4E]" strokeWidth={2.2} />
                    </div>
                    <span className="font-medium text-stone-700">30-Day B2B Credit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#BA8E4E]/10 ring-1 ring-[#BA8E4E]/30 flex items-center justify-center shrink-0">
                      <Calendar className="w-2.5 h-2.5 text-[#BA8E4E]" strokeWidth={2.2} />
                    </div>
                    <span className="font-medium text-stone-700">Seasonal Menu Forecasts</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile Swipe Pagination Dots & Indicator */}
            <div className="flex md:hidden items-center justify-center gap-3.5 pt-3">
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
                        activeIdx === idx ? 'w-6 bg-[#2E060D]' : 'w-2 bg-[#BA8E4E]/30 hover:bg-[#BA8E4E]/60'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-[9.5px] font-serif uppercase tracking-[0.16em] text-[#BA8E4E] font-medium">
                Swipe to explore →
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
