'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  Calendar,
  UtensilsCrossed,
  Building2,
  ChefHat,
  Landmark
} from 'lucide-react';
import { gsap } from '@/lib/animations/gsap-core';

interface ServiceCardData {
  index: string;
  tag: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
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
    image: '/images/commercial/chef_inspect_produce.jpg',
    imageAlt: 'Head chef inspecting fresh morning harvest produce crate',
    icon: (
      <svg className="w-4 h-4 stroke-[#BA8E4E] fill-none" viewBox="0 0 40 40" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
    tag: 'COMMERCIAL DISTRIBUTION',
    badge: 'VOLUME CONTRACTS',
    title: 'Wholesale Solutions',
    description: 'Reliable, margin-locked wholesale supply for hospitality businesses of all sizes, from independent venues to multi-site groups.',
    image: '/images/commercial/cold_depot_logistics.jpg',
    imageAlt: 'Temperature-controlled wholesale distribution hub',
    icon: (
      <svg className="w-4 h-4 stroke-[#BA8E4E] fill-none" viewBox="0 0 40 40" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
    image: '/images/commercial/rootwills_hero_chef_plating.jpg',
    imageAlt: 'Executive chef plating fine dining dish with fresh micro-herbs',
    icon: (
      <svg className="w-4 h-4 stroke-[#BA8E4E] fill-none" viewBox="0 0 40 40" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 22 2 2a1.5 1.5 0 0 0 2.1 0l4-4a2 2 0 0 0 0-2.8l-1.5-1.5a2 2 0 0 0-2.8 0L20 17" />
        <path d="m8 15 5-5a2 2 0 0 1 2.8 0l1.5 1.5a2 2 0 0 1 0 2.8L15 16" />
        <path d="M6 18a7 7 0 0 0 10.5 6l1.5-1" />
        <path d="M34 16a7 7 0 0 0-10.5-6l-1.5 1" />
      </svg>
    ),
    highlights: [
      { icon: UserCheck, text: 'Assigned Senior Depot Account Lead' },
      { icon: CreditCard, text: '30-Day Commercial Trade Terms' },
      { icon: Calendar, text: 'Seasonal Menu Yield Forecasts' },
    ],
  },
];

const SECTORS_WE_SERVE = [
  {
    title: 'Restaurants & Fine Dining',
    subtitle: 'Hand-graded heritage produce, coastal catch & living microgreens',
    image: '/images/commercial/10_restaurant.jpg',
    icon: UtensilsCrossed,
    tag: 'CULINARY',
  },
  {
    title: 'Hotels & Boutique Resorts',
    subtitle: 'Multi-outlet breakfast dairy, artisan bakery & banqueting supply',
    image: '/images/commercial/11_hotels.jpg',
    icon: Building2,
    tag: 'HOSPITALITY',
  },
  {
    title: 'Event & Contract Caterers',
    subtitle: 'Precision-timed volume drops & bespoke menu spec grading',
    image: '/images/commercial/13_caterers.jpg',
    icon: ChefHat,
    tag: 'CATERING',
  },
  {
    title: 'Gastro Pubs & Institutions',
    subtitle: 'Dependable British farm staples, prime butchery & dry larder',
    image: '/images/commercial/14_pubs_bars.jpg',
    icon: Landmark,
    tag: 'COMMERCIAL',
  },
];

export function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectorsGridRef = useRef<HTMLDivElement>(null);

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

      if (scrollContainerRef.current) {
        gsap.fromTo(
          scrollContainerRef.current.children,
          { y: 20, opacity: 0.85 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (sectorsGridRef.current) {
        gsap.fromTo(
          sectorsGridRef.current.children,
          { y: 16, opacity: 0.85 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectorsGridRef.current,
              start: 'top 96%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const firstChild = el.firstElementChild as HTMLElement | null;
    const itemWidth = firstChild ? firstChild.offsetWidth + 14 : el.clientWidth * 0.8;
    if (itemWidth > 0) {
      const newIdx = Math.min(SERVICES_DATA.length - 1, Math.max(0, Math.round(el.scrollLeft / itemWidth)));
      if (newIdx !== activeIdx) {
        setActiveIdx(newIdx);
      }
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      const firstChild = el.firstElementChild as HTMLElement | null;
      const itemWidth = firstChild ? firstChild.offsetWidth + 14 : el.clientWidth * 0.8;
      el.scrollTo({ left: itemWidth * index, behavior: 'smooth' });
      setActiveIdx(index);
    }
  };

  return (
    <section ref={sectionRef} id="services" className="py-9 sm:py-24 lg:py-32 bg-[#FAF7F2] relative overflow-hidden border-b border-[#E8DEC8]/70">
      {/* Seamless Botanical Parchment Texture */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-20">
        
        {/* ─── PART 1: CORE SERVICE PILLARS (EDITORIAL SPLIT + UNOBSTRUCTED PHOTOGRAPHY) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-start">
          
          {/* Left Header Column */}
          <div ref={headerRef} className="lg:col-span-4 max-w-lg pr-0 lg:pr-4 lg:sticky lg:top-28">
            {/* Clean Editorial Hairline Kicker */}
            <div className="flex items-center gap-3 mb-3 sm:mb-5">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8B2635] font-semibold">
                02
              </span>
              <span className="w-6 sm:w-8 h-[1px] bg-[#8B2635]/40" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-stone-500 font-medium">
                Service Architecture
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#2E060D] leading-[1.08] tracking-[-0.025em] mb-3 sm:mb-5 [text-wrap:balance]">
              Tailored Solutions<br className="hidden sm:inline" />{' '}
              for <span className="text-[#8B2635] italic font-normal">Every Kitchen.</span>
            </h2>

            <p className="text-xs sm:text-[14px] lg:text-[15px] text-stone-600 leading-[1.65] sm:leading-[1.7] font-sans mb-4 sm:mb-8 max-w-[48ch]">
              We provide an end-to-end range of foodservice supply and wholesale capabilities, engineered around the daily operational rhythm of independent restaurants, fine dining rooms, and multi-site hospitality groups.
            </p>

            {/* Clean Editorial CTA Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2.5 sm:gap-3 pl-5 pr-1.5 py-2 sm:pl-6 sm:pr-2 sm:py-2.5 rounded-full bg-[#2E060D] hover:bg-[#131313] text-[#FAF7F0] text-[11px] sm:text-xs font-sans font-medium tracking-wider uppercase transition-all duration-200 active:scale-[0.97] cursor-pointer touch-manipulation shadow-[0_6px_18px_rgba(46,6,13,0.18)]"
              >
                <span>Browse Product Catalog</span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/12 flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-[#F3D08A]">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F3D08A] group-hover:text-[#131313] transition-colors" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Editorial Service Cards with Edge-to-Edge Unobstructed Photography */}
          <div className="lg:col-span-8 w-full min-w-0">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-3.5 md:gap-5 -mx-4 px-4 md:mx-0 md:px-0 pb-1.5 md:pb-0 scroll-smooth touch-pan-x touch-pan-y overscroll-x-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {SERVICES_DATA.map((service) => (
                <div
                  key={service.index}
                  onMouseMove={handleMouseMove}
                  className="group relative w-[78vw] max-w-[295px] md:w-auto md:max-w-none shrink-0 md:shrink min-w-0 snap-start rounded-xl sm:rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] hover:border-[#BA8E4E] shadow-[0_6px_24px_rgba(46,6,13,0.04)] hover:shadow-[0_16px_36px_rgba(46,6,13,0.09)] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Edge-to-Edge Unobstructed Editorial Photograph with Rootwills Seal */}
                  <div className="relative w-full h-36 sm:h-48 overflow-hidden bg-[#2E060D] border-b border-[#E8DEC8]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 80vw, 28vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#2E060D]/[0.05] mix-blend-multiply pointer-events-none" />
                    <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#FAF7F2]/95 ring-1 ring-[#BA8E4E]/65 shadow-sm overflow-hidden pointer-events-none">
                      <Image
                        src="/images/logo.png"
                        alt="Rootwills Seal"
                        fill
                        unoptimized
                        sizes="28px"
                        className="object-contain p-0.5 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Editorial Content Body */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Clean Index & Category Kicker */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#8B2635] font-semibold">
                          {service.badge}
                        </span>
                        <span className="font-mono text-[10px] text-stone-400 tabular-nums">
                          /{service.index}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-[19px] font-serif font-bold text-[#2E060D] group-hover:text-[#8B2635] transition-colors duration-150 mb-1.5 leading-snug">
                        {service.title}
                      </h3>

                      <p className="text-[11.5px] sm:text-xs text-stone-600 leading-relaxed font-sans mb-3.5 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                        {service.description}
                      </p>
                    </div>

                    {/* Clean Hairline Spec List */}
                    <ul className="space-y-1.5 pt-3 border-t border-[#E8DEC8] text-[10.5px] sm:text-[11px] text-stone-700 font-sans mt-auto">
                      {service.highlights.map((item, hIdx) => {
                        const Icon = item.icon;
                        return (
                          <li key={hIdx} className="flex items-center gap-2">
                            <Icon className="w-3 h-3 text-[#8B2635] shrink-0" strokeWidth={2} />
                            <span className="font-medium truncate">{item.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Swipe Pagination Dots */}
            <div className="flex md:hidden items-center justify-center gap-3 pt-2.5">
              <div className="flex items-center gap-2">
                {SERVICES_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToCard(idx)}
                    aria-label={`Go to service ${idx + 1}`}
                    className="p-1 -m-1 flex items-center justify-center cursor-pointer bg-transparent border-0 outline-none"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        activeIdx === idx ? 'w-6 bg-[#2E060D]' : 'w-2 bg-[#BA8E4E]/35'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-[9.5px] font-mono uppercase tracking-[0.16em] text-stone-500 font-medium">
                Swipe →
              </span>
            </div>
          </div>

        </div>

        {/* ─── PART 2: HOSPITALITY SECTORS WE SUPPLY (MAGAZINE-GRADE PHOTOGRAPHIC GRID) ─── */}
        <div className="pt-6 sm:pt-14 border-t border-[#DCD2C0]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-4 mb-4 sm:mb-8">
            <div>
              <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.22em] text-[#8B2635] font-semibold block mb-1">
                HOSPITALITY SECTORS WE SUPPLY
              </span>
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-[#2E060D] tracking-tight">
                Engineered for Britain&apos;s Culinary Leaders
              </h3>
            </div>
            <p className="hidden sm:block text-xs text-stone-600 font-sans max-w-md">
              Every sector has distinct prep hours, menu tolerances, and volume rhythms. Our supply lines adapt to your brigade.
            </p>
          </div>

          <div ref={sectorsGridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {SECTORS_WE_SERVE.map((sector) => (
              <div
                key={sector.title}
                className="group rounded-xl sm:rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] hover:border-[#BA8E4E] overflow-hidden shadow-[0_4px_16px_rgba(46,6,13,0.03)] hover:shadow-[0_14px_30px_rgba(46,6,13,0.08)] transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
              >
                {/* Uncropped Editorial Sector Image */}
                <div className="relative w-full h-24 sm:h-40 overflow-hidden bg-[#2E060D] border-b border-[#E8DEC8]">
                  <Image
                    src={sector.image}
                    alt={sector.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 48vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Clean Typography Below Photo */}
                <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="block font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.18em] text-[#8B2635] font-semibold mb-1">
                      {sector.tag}
                    </span>
                    <h4 className="font-serif font-bold text-xs sm:text-[15px] text-[#2E060D] group-hover:text-[#8B2635] transition-colors leading-snug">
                      {sector.title}
                    </h4>
                  </div>
                  <p className="hidden sm:block text-[11.5px] text-stone-600 font-sans leading-relaxed mt-2 pt-2 border-t border-[#E8DEC8]/70">
                    {sector.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
