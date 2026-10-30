'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  UtensilsCrossed, 
  Building, 
  Users, 
  Store, 
  Clock, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  BadgePercent,
  Sparkles
} from 'lucide-react';
import { DoodleFlourish } from './DoodleFlourish';

interface SectorSpec {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  shortTag: string;
  icon: React.ElementType;
  image: string;
  imageAlt: string;
  deliveryWindow: string;
  tempProfile: string;
  leadTime: string;
  billingTerm: string;
  headline: string;
  description: string;
  keyFeatures: {
    title: string;
    description: string;
  }[];
  stat: {
    value: string;
    label: string;
    detail: string;
  };
}

const SECTORS_DATA: SectorSpec[] = [
  {
    id: 'restaurants',
    number: '01',
    title: 'Restaurants & Gastropubs',
    subtitle: 'Independent bistros, Michelin kitchens, and gastropub groups',
    shortTag: 'CHEF-DRIVEN PRODUCE',
    icon: UtensilsCrossed,
    image: '/images/commercial/10_restaurant.jpg',
    imageAlt: 'Professional restaurant chef inspecting farm produce at the kitchen pass',
    deliveryWindow: '04:00 AM – 06:00 AM (Pre-Dawn)',
    tempProfile: '2°C – 4°C Monitored',
    leadTime: 'Order by 23:00 for morning drop',
    billingTerm: 'Weekly or 30-Day Trade Account',
    headline: 'Zero Kitchen Prep Downtime on Morning Brigade Service',
    description:
      'We understand that for high-performing culinary kitchens, a missing herb or bruised heirloom tomato can disrupt an entire lunch service. Rootwills offers hand-graded Class 1 British produce, split-case ordering, and bespoke prep specs delivered before your morning prep team clocks in.',
    keyFeatures: [
      {
        title: 'Split-Case & Exact Yield Ordering',
        description: 'Order precisely what your menu needs by weight, bunch, or count to minimize storage footprint and eliminate food waste.',
      },
      {
        title: 'Daily 02:00 AM Wholesale Market Grading',
        description: 'Our senior buyers hand-inspect and curate fruit, vegetables, and wild seasonal forage specifically to chef specifications.',
      },
      {
        title: 'Emergency Mid-Day Dispatch Available',
        description: 'Unexpected busy weekend service? Our central London and Birmingham logistics depots provide same-day afternoon replenishment.',
      },
      {
        title: 'Direct British Farm Provenance',
        description: '100% traceable grower sourcing across Kent, Worcestershire, and Lincolnshire with seasonal farm story notes for your menu.',
      },
    ],
    stat: {
      value: '99.4%',
      label: 'On-Time Kitchen Drop Rate',
      detail: 'Measured across 250+ independent UK restaurant accounts daily',
    },
  },
  {
    id: 'hotels',
    number: '02',
    title: 'Hotels & Hospitality Groups',
    subtitle: 'Boutique properties, multi-outlet resorts, and urban luxury hotels',
    shortTag: 'MULTI-OUTLET CONSISTENCY',
    icon: Building,
    image: '/images/commercial/11_hotels.jpg',
    imageAlt: 'Luxury hotel culinary team prepping breakfast and banquet produce',
    deliveryWindow: '05:00 AM – 07:00 AM Staggered',
    tempProfile: 'Dual-Zone Refrigerated Fleet',
    leadTime: 'Automated Standing EDI Orders',
    billingTerm: 'Centralized EOM + 30 Days',
    headline: 'Uniform Volume Quality Across Breakfast, Banquets & Fine Dining',
    description:
      'Operating multiple F&B outlets under one roof requires unwavering consistency. Rootwills supplies hotel operations with consolidated deliveries—combining fresh market produce, dairy crates, and bakery essentials into single-manifest pre-dawn drops with centralized corporate accounting.',
    keyFeatures: [
      {
        title: 'Multi-Department Consolidated Drops',
        description: 'Separate packing and labeling by kitchen section (Breakfast, Main Restaurant, Banqueting, Room Service) for swift distribution.',
      },
      {
        title: 'Dedicated Senior Account Executive',
        description: 'A single point of commercial contact who understands your kitchen operations, standing orders, and bespoke pricing matrices.',
      },
      {
        title: 'Standardized Portions & Uniform Sizing',
        description: 'Strict specification tolerances for breakfast buffet lines and large-scale banquet plating, ensuring cost predictability.',
      },
      {
        title: 'Full Allergen & BRCGS Audit Compliance',
        description: 'Complete digital lot-tracking, batch certificates, and temperature logs delivered automatically with every monthly statement.',
      },
    ],
    stat: {
      value: '1 Manifest',
      label: 'Consolidated Daily Invoicing',
      detail: 'Streamlined purchasing across all internal hotel F&B departments',
    },
  },
  {
    id: 'caterers',
    number: '03',
    title: 'Commercial Caterers & Events',
    subtitle: 'Large-scale banqueting, corporate catering, and outdoor event venues',
    shortTag: 'PALLET-SCALE LOGISTICS',
    icon: Users,
    image: '/images/commercial/13_caterers.jpg',
    imageAlt: 'Commercial catering kitchen handling high-volume seasonal ingredients',
    deliveryWindow: 'Scheduled 1-Hour Time Slots',
    tempProfile: 'Continuous Cold-Chain GPS',
    leadTime: 'Guaranteed 72h Volume Reservation',
    billingTerm: 'Event Terms / Project Credit',
    headline: 'High-Volume Cold-Chain Supply with Guaranteed Stock Lock-In',
    description:
      'When catering a 1,000-cover banquet or multi-day corporate summit, volume availability cannot be left to chance. Rootwills partners with commercial event caterers to forward-lock volume pricing and guarantee delivery to remote venues with cold-chain precision.',
    keyFeatures: [
      {
        title: 'Forward Volume Price & Supply Lock',
        description: 'Reserve hundreds of crates of seasonal berries, root crops, or butchery cuts up to 3 weeks in advance with guaranteed pricing.',
      },
      {
        title: 'Pre-Prepped Root Veg & Salad Blends',
        description: 'Save hundreds of brigade prep hours with peeled, diced, or washed vacuum-packed vegetable lines certified for 5-day shelf life.',
      },
      {
        title: 'Direct-to-Venue Logistics Deployment',
        description: 'Delivery directly into event spaces, exhibition halls, and pop-up event locations with temperature-verified refrigerated vans.',
      },
      {
        title: 'Comprehensive Traceability Manifests',
        description: 'Red Tractor and SALSA-compliant documentation provided for event organizers and corporate client environmental audits.',
      },
    ],
    stat: {
      value: '1,000+',
      label: 'Max Covers Per Event Supply',
      detail: 'Proven capacity for large-scale corporate galas and sports events',
    },
  },
  {
    id: 'retailers',
    number: '04',
    title: 'Farm Shops & Artisan Delis',
    subtitle: 'Independent grocers, specialty food halls, and premium farm shops',
    shortTag: 'AUTHENTIC BRITISH HERITAGE',
    icon: Store,
    image: '/images/commercial/british_apples_crates.jpg',
    imageAlt: 'Authentic British heritage orchard apples in wooden harvest crates',
    deliveryWindow: '06:30 AM – 08:30 AM (Pre-Opening)',
    tempProfile: 'Ambient & Chilled Dual Fleet',
    leadTime: 'Order by 21:00 for Next-Morning',
    billingTerm: '14-Day or 30-Day Direct Facility',
    headline: 'Showcase Authentic Provenance with Premium Display-Ready Crates',
    description:
      'Specialty retailers and artisan farm shops need ingredients that tell a story. Rootwills connects you directly with multi-generational British growers, providing heirloom varietals, seasonal orchard fruits, and regional cheeses presented in display-ready rustic wooden crates.',
    keyFeatures: [
      {
        title: 'Heirloom & Heritage Varietals',
        description: 'Rare heritage apples (Cox, Russet, Bramley), multi-colored Chantenay carrots, and heritage tomatoes that stand out on retail shelves.',
      },
      {
        title: 'Display-Ready Wooden Harvest Packaging',
        description: 'Produce delivered in clean, unbranded wooden slatted crates designed for immediate, aesthetically pleasing counter placement.',
      },
      {
        title: 'Grower Provenance Story Cards',
        description: 'Complimentary printable farm provenance cards detailing the grower’s family history, county origin, and harvest date.',
      },
      {
        title: 'Low Minimum Order Requirements',
        description: 'Accessible minimum basket thresholds designed specifically for independent food businesses and specialty artisan counters.',
      },
    ],
    stat: {
      value: '100%',
      label: 'British Farm Assured Provenance',
      detail: 'Direct grower partnerships supporting generational British agriculture',
    },
  },
];

export function WhoWeSupplySection() {
  const [activeTab, setActiveTab] = useState<string>('restaurants');

  const activeSector = SECTORS_DATA.find((s) => s.id === activeTab) || SECTORS_DATA[0];

  return (
    <section id="sectors" className="py-14 sm:py-20 lg:py-28 relative overflow-hidden border-b border-[#E8DEC8]/60 bg-[#FAF7F2]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── SECTION HEADER ─── */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          {/* Monospace Eyebrow Capsule */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 mb-3 sm:mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#2E060D] font-semibold">
              03 // SECTOR SPECIFICATIONS
            </span>
          </div>

          <div className="relative">
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#131313] leading-[1.12] tracking-[-0.025em] mb-3">
              Who We Supply Across the UK
            </h2>
            <div className="hidden sm:block absolute -top-4 right-12 transform translate-x-12 -translate-y-2 pointer-events-none">
              <DoodleFlourish variant="sketch-star" color="#BA8E4E" className="w-7 h-7" />
            </div>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-[#554D47] font-normal leading-relaxed">
            Every professional hospitality sector operates under unique operational demands. We engineer tailored delivery schedules, grading tolerances, and commercial terms to match your exact kitchen workflow.
          </p>
        </div>

        {/* ─── INTERACTIVE SECTOR SELECTOR TABS ─── */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar scroll-smooth">
          {SECTORS_DATA.map((sector) => {
            const Icon = sector.icon;
            const isActive = sector.id === activeTab;

            return (
              <button
                key={sector.id}
                onClick={() => setActiveTab(sector.id)}
                className={`group relative flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl text-left transition-all duration-200 whitespace-nowrap cursor-pointer select-none border shrink-0 ${
                  isActive
                    ? 'bg-[#131313] text-[#FAF7F2] border-[#131313] shadow-md shadow-[#131313]/10'
                    : 'bg-[#F4EEE5] text-[#2E060D] border-[#E8DEC8]/80 hover:bg-[#EFE7DC] hover:border-[#BA8E4E]/40'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-[#BA8E4E] text-[#131313]'
                      : 'bg-white/80 text-[#2E060D] group-hover:text-[#BA8E4E]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-mono text-[10px] tracking-widest ${isActive ? 'text-[#BA8E4E]' : 'text-[#8C827A]'}`}>
                      {sector.number} //
                    </span>
                    <span className="text-xs sm:text-sm font-semibold tracking-tight">
                      {sector.title}
                    </span>
                  </div>
                  <span className={`block text-[10px] sm:text-[11px] font-mono tracking-wider ${isActive ? 'text-[#D0C7BD]' : 'text-[#8C827A]'}`}>
                    {sector.shortTag}
                  </span>
                </div>

                {/* Subtle active indicator dot */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] ml-1 shadow-xs" />
                )}
              </button>
            );
          })}
        </div>

        {/* ─── ACTIVE SECTOR DETAIL PANEL ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E8DEC8] shadow-xs">
          
          {/* Left Column: Visual Showcase & Operational Badges */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Sector Visual Container */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E8DEC8] shadow-md bg-stone-100 group">
              <Image
                src={activeSector.image}
                alt={activeSector.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Top Operational Pill */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-white border border-white/20">
                  <Clock className="w-3 h-3 text-[#BA8E4E]" />
                  {activeSector.deliveryWindow}
                </span>

                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#BA8E4E] text-[#131313] text-[10px] font-mono font-bold tracking-wider">
                  CLASS 1
                </span>
              </div>

              {/* Bottom Image Headline */}
              <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                <p className="text-xs font-mono text-[#BA8E4E] tracking-wider uppercase mb-0.5">
                  COMMERCIAL PROTOCOL // {activeSector.number}
                </p>
                <p className="text-sm sm:text-base font-serif font-bold text-white line-clamp-1">
                  {activeSector.title}
                </p>
              </div>
            </div>

            {/* Quick Logistics Specs Matrix */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C827A] block mb-1">
                  Temperature
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#131313] block">
                  {activeSector.tempProfile}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C827A] block mb-1">
                  Ordering Cutoff
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#131313] block">
                  {activeSector.leadTime}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C827A] block mb-1">
                  Trade Credit
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#131313] block">
                  {activeSector.billingTerm}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C827A] block mb-1">
                  Fleet Guarantee
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#131313] block">
                  Direct Pre-Dawn Drops
                </span>
              </div>
            </div>

            {/* Highlight Metric Pill */}
            <div className="p-4 rounded-xl bg-[#2E060D] text-[#FAF7F2] flex items-center justify-between gap-4 border border-[#4E0D17]">
              <div>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#BA8E4E] block">
                  {activeSector.stat.value}
                </span>
                <span className="text-xs font-semibold text-white block">
                  {activeSector.stat.label}
                </span>
                <span className="text-[11px] text-[#D0C7BD] block mt-0.5">
                  {activeSector.stat.detail}
                </span>
              </div>
              <Sparkles className="w-6 h-6 text-[#BA8E4E] shrink-0" />
            </div>

          </div>

          {/* Right Column: Narrative & Technical Specifications */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              {/* Monospace Sub-Tag */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#BA8E4E]" />
                <span className="font-mono text-xs text-[#BA8E4E] font-semibold tracking-wider uppercase">
                  {activeSector.subtitle}
                </span>
              </div>

              {/* Sector Title Headline */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#131313] tracking-tight leading-snug mb-3 sm:mb-4">
                {activeSector.headline}
              </h3>

              {/* Editorial Description */}
              <p className="text-sm sm:text-base text-[#554D47] leading-relaxed mb-6 sm:mb-8">
                {activeSector.description}
              </p>

              {/* 4 Technical Capabilities Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
                {activeSector.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]/80 hover:border-[#BA8E4E]/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#BA8E4E] shrink-0" />
                      <h4 className="text-xs sm:text-sm font-bold text-[#131313]">
                        {feat.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#554D47] leading-relaxed pl-6">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Sector Actions */}
            <div className="pt-6 border-t border-[#E8DEC8]/60 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8C827A]">
                <ShieldCheck className="w-4 h-4 text-[#BA8E4E]" />
                <span>BRCGS Grade AA & Red Tractor Assured Quality</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#131313] hover:bg-[#2E060D] text-[#FAF7F2] text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
                >
                  <span>Discuss Supply Terms</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#BA8E4E]" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-transparent hover:bg-[#F4EEE5] text-[#2E060D] border border-[#E8DEC8] text-xs sm:text-sm font-semibold tracking-tight transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#8C827A]" />
                  <span>Our Standards</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
