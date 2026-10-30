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
import { DoodleFlourish } from './DoodleFlourish';

interface ServiceCardData {
  index: string;
  tag: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlights: {
    icon: React.ElementType;
    text: string;
  }[];
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    index: '01',
    tag: 'LOGISTICS & FRESH PRODUCE',
    badge: 'MICHELIN & BISTRO',
    title: 'Food Service Supply',
    description: 'Fresh, hand-graded ingredients and chef-specified kitchen essentials delivered pre-dawn across London and the Midlands.',
    icon: (
      <svg className="w-5 h-5 stroke-[#BA8E4E] fill-none" viewBox="0 0 40 40" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="11" r="1.5" />
        <path d="M9 26a11 11 0 0 1 22 0" />
        <path d="M6 26h28" />
      </svg>
    ),
    highlights: [
      { icon: Clock, text: '04:00 AM Dawn London Drops' },
      { icon: Sparkles, text: 'Chef-Curated Farm Produce' },
      { icon: Snowflake, text: 'Continuous Cold-Chain Telemetry' },
    ],
  },
  {
    index: '02',
    tag: 'COMMERCIAL COMMERCE',
    badge: 'VOLUME CONTRACTS',
    title: 'Wholesale Solutions',
    description: 'Reliable, margin-locked wholesale supply for hospitality businesses of all sizes, from single venues to multi-site groups.',
    icon: (
      <svg className="w-5 h-5 stroke-[#BA8E4E] fill-none" viewBox="0 0 40 40" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7l12 7-12 7-12-7 12-7z" />
        <path d="M8 14v13l12 7 12-7V14" />
        <path d="M20 21v13" />
        <path d="M16 9.3l8 4.7" />
      </svg>
    ),
    highlights: [
      { icon: Coins, text: 'Tiered Volume Rates & Locked Terms' },
      { icon: Sprout, text: 'Direct Grower & Farm Lineage' },
      { icon: CheckCircle2, text: 'Zero Split-Case Surcharges' },
    ],
  },
  {
    index: '03',
    tag: 'STRATEGIC ACCOUNTS',
    badge: 'DEDICATED DESK',
    title: 'Business Partnerships',
    description: 'We collaborate directly with head chefs and culinary directors to engineer bespoke supply schedules and seasonal menu forecasts.',
    icon: (
      <svg className="w-5 h-5 stroke-[#BA8E4E] fill-none" viewBox="0 0 40 40" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 22 2 2a1.5 1.5 0 0 0 2.1 0l4-4a2 2 0 0 0 0-2.8l-1.5-1.5a2 2 0 0 0-2.8 0L20 17" />
        <path d="m8 15 5-5a2 2 0 0 1 2.8 0l1.5 1.5a2 2 0 0 1 0 2.8L15 16" />
        <path d="M6 18a7 7 0 0 0 10.5 6l1.5-1" />
        <path d="M34 16a7 7 0 0 0-10.5-6l-1.5 1" />
      </svg>
    ),
    highlights: [
      { icon: UserCheck, text: 'Assigned Senior Depot Account Lead' },
      { icon: CreditCard, text: '30-Day Commercial B2B Credit' },
      { icon: Calendar, text: 'Seasonal Menu Yield Forecasts' },
    ],
  },
];

export function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const cardWidth = el.scrollWidth / SERVICES_DATA.length;
    if (cardWidth > 0) {
      const newIdx = Math.min(SERVICES_DATA.length - 1, Math.max(0, Math.round(el.scrollLeft / cardWidth)));
      if (newIdx !== activeIdx) {
        setActiveIdx(newIdx);
      }
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      const cardWidth = el.scrollWidth / SERVICES_DATA.length;
      el.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
      setActiveIdx(index);
    }
  };

  return (
    <section id="services" className="py-12 sm:py-20 lg:py-28 relative overflow-hidden border-b border-[#E8DEC8]/60">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Header Column */}
          <div className="lg:col-span-4 max-w-lg pr-0 lg:pr-4">
            {/* Monospace Anubi-style Eyebrow Capsule */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 mb-3 sm:mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#2E060D] font-semibold">
                02 // SERVICE ARCHITECTURE
              </span>
            </div>

            <div className="relative">
              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#2E060D] leading-[1.12] tracking-[-0.025em] mb-1 sm:mb-1.5">
                Tailored Solutions<br className="hidden sm:inline" />{' '}
                for Every Business
              </h2>
              {/* Hand-Drawn Doodle Underline echoing Hero Aesthetic */}
              <DoodleFlourish 
                variant="underline-loop" 
                color="#BA8E4E" 
                strokeWidth={3.2} 
                className="w-56 sm:w-68 -mt-1 sm:-mt-1.5 mb-3 text-[#BA8E4E]" 
                delay={180}
              />
            </div>

            <p className="text-xs sm:text-[13px] lg:text-sm text-stone-600 leading-relaxed font-sans mb-6 sm:mb-8 max-w-md">
              We provide a complete range of food supply and wholesale services, engineered to meet the exact operational demands of independent restaurants, fine dining rooms, and large-scale hospitality groups.
            </p>

            {/* Tactile Action Button */}
            <div>
              <a
                href="#approach"
                className="group inline-flex items-center gap-2.5 sm:gap-3 pl-5 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 rounded-full bg-[#131313] hover:bg-[#2A2A2A] text-[#FAF7F0] text-xs sm:text-[13px] font-sans font-semibold tracking-wider uppercase transition-all duration-200 ease-out shadow-md hover:shadow-xl apple-tactile active:scale-[0.97] cursor-pointer"
              >
                <span>Discover Our Approach</span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#BA8E4E]" />
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Apple Tactile Cards with Cursor Spotlight */}
          <div className="lg:col-span-8 w-full min-w-0">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 md:gap-4 lg:gap-5 -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0 scroll-smooth touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {SERVICES_DATA.map((service, idx) => (
                <div
                  key={service.index}
                  onMouseMove={handleMouseMove}
                  className="relative w-[85vw] max-w-[320px] md:w-auto md:max-w-none shrink-0 md:shrink min-w-0 snap-start bg-[#FFFDF9]/90 backdrop-blur-md rounded-2xl p-5 md:p-5 lg:p-6 border border-[#E8DEC8] hover:border-[#BA8E4E]/80 shadow-[0_4px_20px_rgba(46,6,13,0.03)] hover:shadow-[0_16px_40px_rgba(46,6,13,0.09)] group flex flex-col justify-between h-full transition-all duration-200 ease-out apple-card-interactive active:scale-[0.985] overflow-hidden"
                >
                  {/* Desktop Interactive Mouse Spotlight */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
                    style={{
                      background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(186, 142, 78, 0.12), transparent 45%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Specular Top Rim Highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

                  <div className="flex flex-col flex-1 relative z-10">
                    {/* Header Row: Index + Icon Medallion */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="relative p-1 rounded-full bg-gradient-to-br from-[#BA8E4E]/35 via-[#FAF7F0] to-[#BA8E4E]/10 shadow-[0_2px_10px_rgba(46,6,13,0.06)] group-hover:scale-105 group-hover:shadow-[0_4px_16px_rgba(186,142,78,0.25)] transition-all duration-300 w-fit">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFDF9] ring-1 ring-[#BA8E4E]/40 flex items-center justify-center">
                          {service.icon}
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="font-mono text-xs font-bold text-[#BA8E4E] tracking-wider">
                          {service.index}
                        </span>
                        <span className="text-[9px] font-mono tracking-widest text-stone-500 uppercase">
                          {service.badge}
                        </span>
                      </div>
                    </div>

                    {/* Micro-label */}
                    <span className="font-mono text-[9px] font-semibold text-[#BA8E4E] tracking-wider uppercase mb-1">
                      {service.tag}
                    </span>

                    <h3 className="text-base sm:text-[18px] font-serif font-bold text-[#2E060D] group-hover:text-[#8B2635] transition-colors duration-150 mb-1.5 leading-snug md:min-h-[2.75rem] flex items-start">
                      {service.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed font-sans mb-3 sm:mb-4 md:min-h-[4.5rem]">
                      {service.description}
                    </p>
                  </div>

                  {/* Operational Highlights with Apple Tactile Rings */}
                  <ul className="space-y-2 pt-3 border-t border-[#E8DEC8]/80 text-[11px] text-stone-600 font-sans mt-auto relative z-10">
                    {service.highlights.map((item, hIdx) => {
                      const Icon = item.icon;
                      return (
                        <li key={hIdx} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-[#BA8E4E]/10 ring-1 ring-[#BA8E4E]/30 flex items-center justify-center shrink-0">
                            <Icon className="w-2.5 h-2.5 text-[#BA8E4E]" strokeWidth={2.2} />
                          </div>
                          <span className="font-medium text-stone-700">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile Swipe Pagination Dots with Apple Springs */}
            <div className="flex md:hidden items-center justify-center gap-3.5 pt-3">
              <div className="flex items-center gap-2">
                {SERVICES_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToCard(idx)}
                    aria-label={`Go to service ${idx + 1}`}
                    className="p-1 -m-1 flex items-center justify-center cursor-pointer bg-transparent border-0 outline-none apple-tactile active:scale-90"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        activeIdx === idx ? 'w-6 bg-[#2E060D]' : 'w-2 bg-[#BA8E4E]/30 hover:bg-[#BA8E4E]/60'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-[9.5px] font-mono uppercase tracking-[0.16em] text-[#BA8E4E] font-medium">
                Swipe to explore →
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
