import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { 
  ShieldCheck, 
  Truck, 
  Sprout, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight,
  Phone, 
  Award,
  Layers,
  Thermometer,
  Scale,
  Leaf
} from 'lucide-react';
import { DoodleFlourish } from '@/components/public/DoodleFlourish';

export const metadata: Metadata = {
  title: 'Our Quality Standards & Cold Chain Logistics | Rootwills UK',
  description:
    'Learn how Rootwills maintains quality standards in British foodservice wholesale. Daily 02:00 AM market intake, multi-temperature dual-evaporator delivery fleet, Red Tractor farm assurance, and transparent batch traceability.',
  alternates: {
    canonical: '/approach',
  },
};

const QUALITY_PILLARS = [
  {
    icon: ShieldCheck,
    roman: 'I',
    title: 'Grade-A Produce Standards',
    subtitle: 'Daily 02:00 AM physical inspection, firmness checks, and strict calibration before dispatch.',
    badge: '02:00 AM Walk',
    points: [
      'Reject rate under 0.6% due to direct grower lineage',
      'Daily Class 1 specification across all seasonal produce',
      'Morning harvest tagging with field lot numbers',
    ],
  },
  {
    icon: Truck,
    roman: 'II',
    title: 'Pre-Dawn Refrigerated Fleet',
    subtitle: 'Dual-evaporator Mercedes Sprinter fleet delivering between 04:00 AM and 07:30 AM.',
    badge: '99.4% On-Time',
    points: [
      'Independent chill (1–4°C), butchery (0–2°C) and frozen (-18°C) compartments',
      'Live temperature telemetry logged every 90 seconds',
      'Secure kitchen key-drop access with photo-verified ePOD',
    ],
  },
  {
    icon: Sprout,
    roman: 'III',
    title: 'Direct Farm Provenance',
    subtitle: 'Full batch traceability to vetted generational British farms and coastal day-boats.',
    badge: '100% Traceable',
    points: [
      'Red Tractor assured British livestock and free-range poultry',
      'Full batch provenance printable on delivery advice notes',
      'Transparent fair grower pricing contracts',
    ],
  },
  {
    icon: Leaf,
    roman: 'IV',
    title: 'Sustainable British Sourcing',
    subtitle: 'Prioritising local British farms, Kentish orchards, and reduced food-mile distribution.',
    badge: 'Kent & Evesham',
    points: [
      'Regional farm sourcing within 80 miles of our hubs',
      'Zero single-use plastic in transport crate systems',
      'Seasonal crop booking to eliminate field food waste',
    ],
  },
];

const COMPLIANCE_STANDARDS = [
  {
    name: 'BRCGS Storage & Distribution',
    standard: 'Audited Facility Standards',
    detail: 'Our depots adhere to the global standard for food safety, warehouse sanitation, and cold-chain temperature control.',
  },
  {
    name: 'Red Tractor Assured',
    standard: 'British Farm Origin',
    detail: 'Complete certification that beef, lamb, poultry, and dairy originate from vetted British farms with animal welfare compliance.',
  },
  {
    name: 'SALSA Standard',
    standard: 'Safe & Local Supplier Assurance',
    detail: 'Comprehensive HACCP risk assessments, allergen segregation, and microbiological testing verification.',
  },
  {
    name: 'Lion Quality Code',
    standard: 'Class A British Eggs',
    detail: 'Salmonella vaccination verification, date stamping on shells, and end-to-end flock traceability.',
  },
];

export default function ApproachPage() {
  const approachJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Rootwills Operational Approach & Quality Standards',
    description: 'Detailed explanation of Rootwills supply chain, cold-chain logistics, and farm provenance standards.',
    publisher: {
      '@type': 'WholesaleStore',
      name: 'Rootwills Food Services & Wholesale',
      url: 'https://www.rootwills.co.uk',
      telephone: '+44 16164 12803',
    },
  };

  return (
    <div className="relative bg-[#FAF7F2] min-h-screen text-[#131313] overflow-x-hidden">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(approachJsonLd) }}
      />

      {/* ─── ACT I: EDITORIAL HERO HEADER (Rootwills Parchment & Burgundy Identity) ─── */}
      <section className="relative z-10 pt-28 sm:pt-36 pb-14 sm:pb-20 border-b border-[#E8DEC8]/70 overflow-hidden">
        {/* Seamless Unified Parchment Texture */}
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          {/* Monospace Eyebrow Capsule */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#2E060D] font-semibold">
              03 // OPERATIONAL RIGOR &amp; LOGISTICS
            </span>
          </div>

          <div className="relative">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-[-0.025em] text-[#2E060D] leading-[1.08] [text-wrap:balance]">
              Built on Trust, <br className="hidden sm:inline" />
              <span className="text-[#8B2635] italic font-normal">Quality &amp; Consistency.</span>
            </h1>
            <div className="flex justify-center">
              <DoodleFlourish 
                variant="underline-loop" 
                color="#BA8E4E" 
                strokeWidth={3} 
                className="w-52 sm:w-72 -mt-1 sm:-mt-1.5 mb-2 text-[#BA8E4E]" 
                delay={150}
              />
            </div>
          </div>

          <p className="text-xs sm:text-sm lg:text-[15.5px] text-stone-600 font-sans max-w-[62ch] mx-auto leading-[1.68]">
            Every crate delivered to your kitchen is backed by strict 02:00 AM depot intake grading, continuous refrigeration telemetry, and genuine British farm provenance.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-[#2E060D] hover:bg-[#131313] text-[#FAF7F2] text-xs sm:text-[13px] font-sans font-semibold tracking-wider uppercase transition-all duration-200 active:scale-[0.96] shadow-[0_8px_24px_rgba(46,6,13,0.18)] cursor-pointer"
            >
              <span>Browse Catalog</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/12 ring-1 ring-white/20 flex items-center justify-center text-[#F3D08A] group-hover:bg-[#F3D08A] group-hover:text-[#131313] transition-all duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFFDF9] hover:bg-[#EFE8D8]/70 text-[#2E060D] text-xs sm:text-[13px] font-sans font-semibold tracking-wide border border-[#E8DEC8] hover:border-[#BA8E4E]/60 transition-all duration-200 active:scale-[0.96] shadow-2xs cursor-pointer"
            >
              <span>Explore Supply Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ACT II: THE 4 OPERATIONAL PILLARS (Clean Provenance Diptych + Architectural Narrative) ─── */}
      <section className="relative z-10 py-12 sm:py-20 border-b border-[#E8DEC8]/70 overflow-hidden">
        {/* Seamless Unified Parchment Texture */}
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Clean Unobstructed Provenance Diptych */}
            <div className="lg:col-span-4 relative flex flex-col items-center justify-center">
              <div className="relative w-full sm:max-w-[360px]">
                {/* Clean Gallery Frame with Rootwills Seal */}
                <div className="group relative w-full h-[220px] sm:h-[320px] lg:h-[380px] rounded-2xl overflow-hidden border border-[#DCD2C0] bg-[#2E060D] shadow-[0_16px_40px_-12px_rgba(46,6,13,0.12)]">
                  <Image
                    src="/images/commercial/rootwills_spices.jpg"
                    alt="Rootwills Direct Farm Lineage Sourcing"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#2E060D]/[0.06] mix-blend-multiply pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180205]/65 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FAF7F2]/95 ring-1 ring-[#BA8E4E]/70 shadow-md overflow-hidden pointer-events-none">
                    <Image
                      src="/images/logo.png"
                      alt="Rootwills Seal"
                      fill
                      unoptimized
                      sizes="32px"
                      className="object-contain p-0.5 rounded-full"
                    />
                  </div>
                  <div className="absolute bottom-3 left-3.5 flex items-center gap-2 text-[#FAF7F2]">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#F3D08A]">
                      Direct Farm Lineage
                    </span>
                  </div>
                </div>

                {/* Clean Architectural Telemetry Note */}
                <div className="absolute -bottom-3 right-3 sm:-bottom-4 sm:-right-3 bg-[#FFFDF9] border border-[#DCD2C0] rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 flex items-center gap-2.5 shadow-[0_12px_28px_rgba(46,6,13,0.09)] z-20">
                  <div className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-lg overflow-hidden shrink-0 border border-[#E2D8C3]">
                    <Image
                      src="/images/commercial/van_dawn_delivery.jpg"
                      alt="Pre-dawn refrigerated delivery van"
                      fill
                      unoptimized
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-[#8B2635] font-semibold">
                      Cold-Chain Telemetry
                    </span>
                    <span className="block font-serif font-bold text-[11px] sm:text-xs text-[#2E060D] tabular-nums">
                      0.5°C – 3.8°C Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Strategic Pillars */}
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {QUALITY_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.roman}
                      className="group p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] hover:border-[#BA8E4E] shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="w-9 h-9 rounded-xl bg-[#FAF5EB] border border-[#BA8E4E]/30 flex items-center justify-center text-[#2E060D]">
                            <Icon className="w-4 h-4 stroke-[2]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E8DEC8] text-[9.5px] font-mono font-bold text-[#8B2635]">
                              {pillar.badge}
                            </span>
                            <span className="text-xs font-serif font-bold text-stone-400">
                              {pillar.roman}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-base sm:text-lg font-serif font-bold text-[#2E060D] group-hover:text-[#8B2635] transition-colors">
                          {pillar.title}
                        </h3>

                        <p className="text-xs text-stone-600 font-sans leading-relaxed">
                          {pillar.subtitle}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#F2ECE1] space-y-1.5">
                        {pillar.points.map((pt, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] text-stone-700 font-sans">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── ACT III: THIRD-PARTY AUDITED QUALITY FRAMEWORKS ─── */}
      <section className="relative z-10 py-12 sm:py-20 border-b border-[#E8DEC8]/70 overflow-hidden">
        {/* Seamless Unified Parchment Texture */}
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#8B2635] font-bold">
              FOOD SAFETY STANDARDS
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2E060D] tracking-tight">
              Third-Party Audited Quality Accreditations
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Complete regulatory compliance and cold-chain traceability for peace of mind in high-volume catering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMPLIANCE_STANDARDS.map((std, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] shadow-2xs space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF5EB] border border-[#BA8E4E]/30 flex items-center justify-center text-[#2E060D]">
                  <Award className="w-4 h-4 text-[#BA8E4E]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#2E060D] leading-snug font-serif">
                    {std.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[#8B2635] font-semibold block mt-0.5">
                    {std.standard}
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-sans leading-relaxed pt-1 border-t border-stone-100">
                  {std.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACT IV: BOTTOM CTA BANNER (Royal Burgundy Velvet with Gold Accents) ─── */}
      <section className="relative z-10 py-14 sm:py-20 bg-gradient-to-br from-[#430A13] via-[#2E060D] to-[#150205] text-[#FAF7F2] overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/textures/burgundy_damask_texture.jpg')" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10.5px] font-mono uppercase tracking-[0.2em] text-[#F3D08A]">
            <span>Experience the Standard</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-bold text-white tracking-tight">
            Arrange a Trial Kitchen Delivery
          </h2>

          <p className="text-xs sm:text-sm text-white/80 font-sans max-w-2xl mx-auto leading-relaxed">
            Experience our 04:00 AM pre-dawn arrival and hand-graded produce quality firsthand with a scheduled trial crate drop for your brigade.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full bg-[#FAF7F2] hover:bg-white text-[#2E060D] text-xs sm:text-[13px] font-sans font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Request a Trial Drop
            </Link>

            <Link
              href="/products"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-[13px] font-sans font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore 5,480+ Products</span>
              <ArrowRight className="w-4 h-4 text-[#F3D08A]" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
