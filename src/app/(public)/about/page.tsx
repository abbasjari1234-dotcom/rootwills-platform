import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { 
  ShieldCheck, 
  Sprout, 
  Truck, 
  Clock,
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  Sparkles
} from 'lucide-react';
import { DoodleFlourish } from '@/components/public/DoodleFlourish';

export const metadata: Metadata = {
  title: 'About Rootwills | British Farm Provenance & Hospitality Wholesale UK',
  description:
    'Learn how Rootwills connects UK generational growers and coastal fisheries directly with professional hospitality kitchens. Daily 2am market grading and guaranteed pre-dawn drops across Birmingham and London.',
  alternates: {
    canonical: '/about',
  },
};

const OPERATIONAL_METRICS = [
  {
    metric: '02:00 AM',
    badge: 'STAGE 01',
    label: 'Daily Market Grading',
    desc: 'Senior produce buyers hand-select Class 1 harvests across UK wholesale markets every morning.',
  },
  {
    metric: '99.4%',
    badge: 'STAGE 02',
    label: 'On-Time Drop Rate',
    desc: 'Pre-dawn refrigerated fleet ensuring kitchen ingredients arrive before morning prep brigades clock in.',
  },
  {
    metric: '100%',
    badge: 'STAGE 03',
    label: 'Batch Traceability',
    desc: 'Every crate is traceable back to its originating British orchard, dairy herd, or coastal day-boat.',
  },
  {
    metric: '6 Days',
    badge: 'STAGE 04',
    label: 'Pre-Dawn Fleet Service',
    desc: 'Consistent morning deliveries across London and the Midlands tailored to your kitchen schedule.',
  },
];

const ACCREDITATIONS = [
  {
    name: 'BRCGS Storage & Distribution',
    level: 'Grade AA Audited',
    desc: 'Global benchmark for food safety, warehouse hygiene, and cold-chain temperature telemetry.',
  },
  {
    name: 'Red Tractor Farm Assured',
    level: '100% British Traceability',
    desc: 'Ensuring poultry, meats, and produce are sourced from vetted British family farms.',
  },
  {
    name: 'SALSA Certification',
    level: 'Approved Supplier Standard',
    desc: 'Rigorous food safety compliance certification for professional commercial catering.',
  },
  {
    name: 'Lion Quality Code of Practice',
    level: 'Class A British Eggs',
    desc: 'Complete flock vaccination and full eggshell stamping for food safety assurance.',
  },
];

const SUPPLY_CHAIN_STEPS = [
  {
    step: '01',
    tag: 'ORIGIN',
    title: 'Grower Partnerships & Farm Lineage',
    desc: 'We partner directly with generational growers across Worcestershire, Warwickshire, Kent, and Lincolnshire, securing field-fresh harvests at peak vitality.',
    image: '/images/commercial/british_apples_crates.jpg',
  },
  {
    step: '02',
    tag: 'GRADING',
    title: 'Daily 02:00 AM Depot Inspection',
    desc: 'Produce arrives at our temperature-controlled Midlands and London hubs where specialists inspect every crate for calibration, firmness, and shelf life.',
    image: '/images/commercial/chef_inspect_produce.jpg',
  },
  {
    step: '03',
    tag: 'CURATION',
    title: 'Bespoke Brigade Preparation',
    desc: 'Consignments are assembled in multi-zone chilled environments, separating delicate living micro-herbs from dense root crops and dairy.',
    image: '/images/commercial/cold_depot_logistics.jpg',
  },
  {
    step: '04',
    tag: 'DISPATCH',
    title: 'Pre-Dawn 05:30 AM Fleet Drops',
    desc: 'Dual-temperature refrigerated vans complete drops between 05:30 and 07:30 AM, placing chilled crates directly into walk-in fridges.',
    image: '/images/commercial/van_dawn_delivery.jpg',
  },
];

export default function AboutPage() {
  return (
    <div className="relative bg-[#FAF7F2] min-h-screen text-[#131313] overflow-x-hidden">
      
      {/* ─── ACT I: EDITORIAL HERO HEADER (Eggshell Canvas matching Main Page) ─── */}
      <section className="relative z-10 pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-[#E8DEC8]/70 overflow-hidden">
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
              01 // OUR HERITAGE &amp; OPERATIONS
            </span>
          </div>

          <div className="relative">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-[-0.025em] text-[#2E060D] leading-[1.08] [text-wrap:balance]">
              Connecting British Growers to <br className="hidden sm:inline" />
              <span className="text-[#8B2635] italic font-normal">The UK’s Premier Kitchens</span>
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

          <p className="text-xs sm:text-sm lg:text-[15.5px] text-stone-600 font-sans max-w-[60ch] mx-auto leading-[1.68]">
            Founded with a singular standard: connect Britain’s finest generational growers, single-herd dairies, and coastal fisheries directly with professional kitchens—eliminating intermediary brokers and guaranteeing pre-dawn deliveries.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-[#131313] hover:bg-[#260309] text-[#FCFCFA] text-xs sm:text-[13px] font-sans font-semibold tracking-wider uppercase transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] shadow-[0_8px_24px_rgba(19,19,19,0.18)]"
            >
              <span>Partner With Rootwills</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/12 ring-1 ring-white/20 flex items-center justify-center text-[#F3D08A] group-hover:bg-[#F3D08A] group-hover:text-[#131313] transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFFDF9] hover:bg-[#EFE8D8]/70 text-[#2E060D] text-xs sm:text-[13px] font-sans font-semibold tracking-wide border border-[#E8DEC8] hover:border-[#BA8E4E]/60 transition-all duration-200 active:scale-[0.96] shadow-2xs"
            >
              <span>Explore Our Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ACT II: OPERATIONAL SCALE METRICS (Double-Bezel Tactile Glass Cards) ─── */}
      <section className="relative z-10 py-8 sm:py-20 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {OPERATIONAL_METRICS.map((m, idx) => (
            <div
              key={idx}
              className="p-1 sm:p-1.5 rounded-2xl sm:rounded-[1.75rem] bg-[#EFE8D8]/80 ring-1 ring-[#BA8E4E]/30 hover:ring-[#BA8E4E]/75 shadow-[0_6px_24px_rgba(46,6,13,0.04)] hover:shadow-[0_16px_36px_rgba(46,6,13,0.09)] hover:-translate-y-1 transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group"
            >
              <div className="relative h-full bg-[#FFFDF9] rounded-[calc(1rem-0.25rem)] sm:rounded-[calc(1.75rem-0.375rem)] p-3.5 sm:p-6 border border-white/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.95)] flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2.5">
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#BA8E4E] font-semibold tabular-nums">
                      {m.badge}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#BA8E4E]/35 group-hover:bg-[#BA8E4E] transition-colors" />
                  </div>
                  <div className="font-serif text-xl sm:text-4xl font-bold text-[#2E060D] mb-0.5 sm:mb-1 group-hover:text-[#8B2635] transition-colors tabular-nums">
                    {m.metric}
                  </div>
                  <div className="text-[11px] sm:text-xs font-serif font-bold text-[#BA8E4E] tracking-wide mb-1 sm:mb-2.5">
                    {m.label}
                  </div>
                </div>
                <p className="hidden sm:block text-xs text-stone-600 font-sans leading-relaxed pt-3 border-t border-[#E8DEC8]/70">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ACT III: EDITORIAL PROVENANCE DIPTYCH (Who We Are & Our Hubs) ─── */}
      <section className="relative z-10 py-8 sm:py-20 border-t border-[#E8DEC8]/70 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#2E060D] font-semibold">
                02 // PURVEYOR PHILOSOPHY
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2E060D] leading-[1.1] tracking-[-0.022em] [text-wrap:balance]">
              Built for Chefs Who Refuse to <span className="text-[#8B2635] italic font-normal">Compromise</span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-[1.65] sm:leading-[1.7] max-w-[54ch]">
              Great menus begin long before the pass opens—they start in the soil of Kentish orchards, Evesham market gardens, and West Country pastures. Rootwills was established to bridge the distance between dedicated British producers and high-pressure commercial kitchens.
            </p>

            <p className="hidden sm:block text-xs sm:text-sm text-stone-600 font-sans leading-[1.7] max-w-[54ch]">
              Operating out of our central Birmingham hub and London distribution network, our buyers grade incoming harvests at 02:00 AM daily so every crate arriving at your back door meets exacting culinary specifications.
            </p>

            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-sans">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-[#FFFDF9] border border-[#BA8E4E]/35 text-[#2E060D] font-medium shadow-2xs">
                <Sprout className="w-3.5 h-3.5 text-[#BA8E4E]" />
                Direct Grower Contracts
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-[#FFFDF9] border border-[#BA8E4E]/35 text-[#2E060D] font-medium shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#BA8E4E]" />
                Bespoke Menu Sourcing
              </span>
            </div>
          </div>

          {/* Right Asymmetrical Bento Photo Showcase */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-12 gap-3 sm:gap-5 items-stretch">
            {/* Primary Orchard Card */}
            <div className="col-span-1 sm:col-span-7 rounded-xl sm:rounded-2xl border border-[#DCD2C0] bg-[#FFFDF9] p-1.5 shadow-[0_14px_36px_rgba(46,6,13,0.08)] group">
              <div className="relative h-40 sm:h-full sm:min-h-[290px] rounded-lg sm:rounded-xl overflow-hidden bg-[#2E060D]">
                <Image
                  src="/images/commercial/british_apples_crates.jpg"
                  alt="British orchard harvest and field provenance"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 50vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#2E060D]/[0.06] mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180205]/80 via-[#180205]/15 to-transparent" />
                <div className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF7F2]/95 ring-1 ring-[#BA8E4E]/70 shadow-md overflow-hidden pointer-events-none">
                  <Image
                    src="/images/logo.png"
                    alt="Rootwills Seal"
                    fill
                    unoptimized
                    sizes="32px"
                    className="object-contain p-0.5 rounded-full"
                  />
                </div>
                <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-4 sm:inset-x-4 text-white">
                  <span className="font-mono text-[8px] sm:text-[9.5px] uppercase tracking-[0.18em] text-[#F3D08A] font-semibold block">
                    FIELD PROVENANCE
                  </span>
                  <p className="font-serif font-bold text-xs sm:text-lg mt-0.5 leading-tight">
                    Generational Orchards &amp; Gardens
                  </p>
                </div>
              </div>
            </div>

            {/* Stacked Secondary Hub & Engraving Cards */}
            <div className="col-span-1 sm:col-span-5 flex flex-col gap-3 sm:gap-5">
              <div className="rounded-xl sm:rounded-2xl border border-[#DCD2C0] bg-[#FFFDF9] p-1.5 shadow-[0_12px_28px_rgba(46,6,13,0.06)] flex-1 group">
                <div className="relative h-40 sm:h-full sm:min-h-[160px] rounded-lg sm:rounded-xl overflow-hidden bg-[#2E060D]">
                  <Image
                    src="/images/commercial/cold_depot_logistics.jpg"
                    alt="Rootwills Midlands and London Distribution Hub"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#2E060D]/[0.06] mix-blend-multiply pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180205]/80 via-transparent to-transparent" />
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAF7F2]/95 ring-1 ring-[#BA8E4E]/70 shadow-md overflow-hidden pointer-events-none">
                    <Image
                      src="/images/logo.png"
                      alt="Rootwills Seal"
                      fill
                      unoptimized
                      sizes="28px"
                      className="object-contain p-0.5 rounded-full"
                    />
                  </div>
                  <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3.5 sm:inset-x-3.5 text-white">
                    <span className="font-mono text-[8px] sm:text-[8.5px] uppercase tracking-[0.18em] text-[#F3D08A] font-semibold block">
                      CENTRAL LOGISTICS
                    </span>
                    <p className="font-serif font-bold text-xs sm:text-sm mt-0.5 leading-tight">
                      Birmingham &amp; London Hubs
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block p-1.5 rounded-[1.75rem] bg-[#EFE8D8]/80 ring-1 ring-[#BA8E4E]/30 shadow-xs">
                <div className="rounded-[calc(1.75rem-0.375rem)] bg-[#FFFDF9] p-4 border border-white/80 flex items-center gap-3.5">
                  <div className="relative w-16 h-12 rounded-xl bg-[#FAF6EC] ring-1 ring-[#BA8E4E]/25 p-1.5 shrink-0 flex items-center justify-center">
                    <Image
                      src="/images/commercial/rootwills_harvest_figures_clean.png"
                      alt="Rootwills Classical Crest"
                      width={80}
                      height={48}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-script text-xl text-[#BA8E4E] block leading-tight">
                      Quality. Consistency.
                    </span>
                    <span className="text-[11px] font-sans text-stone-600 block">
                      Every morning across the UK.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACT IV: THE 4-STEP SUPPLY CHAIN STORY (Double-Bezel Photographic Cards) ─── */}
      <section className="relative z-10 py-8 sm:py-16 lg:py-24 border-t border-[#E8DEC8]/70 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
          {/* Monospace Eyebrow Capsule */}
          <div className="inline-flex items-center gap-2 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 mb-0.5 sm:mb-1 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#2E060D] font-semibold">
              03 // FROM HARVEST TO KITCHEN BRIGADE
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2E060D] tracking-[-0.022em] leading-[1.1]">
            How Rootwills Powers <span className="text-[#8B2635] italic font-normal">Commercial Kitchens</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
            Our lean supply chain reduces transit times, preserves cold-chain integrity, and delivers maximum shelf-life for professional culinary teams.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {SUPPLY_CHAIN_STEPS.map((s, idx) => (
            <div
              key={idx}
              className="p-1 sm:p-1.5 rounded-2xl sm:rounded-[1.85rem] bg-[#EFE8D8]/80 ring-1 ring-[#BA8E4E]/30 hover:ring-[#BA8E4E]/75 shadow-[0_6px_24px_rgba(46,6,13,0.04)] hover:shadow-[0_18px_40px_rgba(46,6,13,0.10)] hover:-translate-y-1 transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group"
            >
              <div className="relative h-full bg-[#FFFDF9] rounded-[calc(1rem-0.25rem)] sm:rounded-[calc(1.85rem-0.375rem)] p-3 sm:p-5 border border-white/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.95)] flex flex-col justify-between overflow-hidden">
                <div>
                  {/* Photographic Stage Header */}
                  <div className="relative w-full h-24 sm:h-36 rounded-xl sm:rounded-2xl overflow-hidden mb-2.5 sm:mb-4 bg-[#2E060D]">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#180205]/70 via-transparent to-transparent" />
                    <div className="absolute top-1.5 inset-x-1.5 sm:top-2.5 sm:inset-x-2.5 flex items-center justify-between">
                      <span className="px-2 py-0.5 sm:px-2.5 rounded-full bg-[#180205]/80 backdrop-blur-md border border-[#F3D08A]/45 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[#F3D08A] font-bold truncate">
                        {s.tag}
                      </span>
                      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FFFDF9]/95 ring-1 ring-[#BA8E4E]/40 flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold text-[#2E060D] tabular-nums shrink-0">
                        {s.step}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-xs sm:text-[17px] text-[#2E060D] group-hover:text-[#8B2635] transition-colors leading-snug mb-1 sm:mb-2">
                    {s.title}
                  </h3>
                </div>
                <p className="hidden sm:block font-sans text-xs text-stone-600 leading-relaxed pt-3 border-t border-[#E8DEC8]/70 mt-2">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ─── ACT V: QUALITY ACCREDITATIONS & FOOD SAFETY ─── */}
      <section className="relative z-10 py-8 sm:py-24 border-y border-[#E8DEC8]/70 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 mb-0.5 sm:mb-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#2E060D] font-semibold">
                04 // COMPLIANCE &amp; TRACEABILITY
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2E060D] tracking-[-0.022em]">
              Rigorous Food Safety Standards
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Every facility, vehicle, and grower within our network is held to the highest audited UK food hygiene standards.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
            {ACCREDITITATIONS_RENDER(ACCREDITATIONS)}
          </div>
        </div>
      </section>

    </div>
  );
}

function ACCREDITITATIONS_RENDER(items: typeof ACCREDITATIONS) {
  return items.map((acc, idx) => (
    <div
      key={idx}
      className="p-1 sm:p-1.5 rounded-2xl sm:rounded-[1.75rem] bg-[#EFE8D8]/80 ring-1 ring-[#BA8E4E]/30 hover:ring-[#BA8E4E]/75 shadow-[0_4px_16px_rgba(46,6,13,0.04)] hover:shadow-[0_14px_32px_rgba(46,6,13,0.08)] transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 group"
    >
      <div className="relative h-full bg-[#FFFDF9] rounded-[calc(1rem-0.25rem)] sm:rounded-[calc(1.75rem-0.375rem)] p-3.5 sm:p-6 border border-white/80 space-y-2 sm:space-y-3 overflow-hidden">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#FAF7F0] text-[#BA8E4E] ring-1 ring-[#BA8E4E]/35 flex items-center justify-center group-hover:scale-105 transition-transform">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-xs sm:text-base text-[#2E060D] group-hover:text-[#8B2635] transition-colors">
            {acc.name}
          </h3>
          <span className="text-[9.5px] sm:text-[10.5px] font-mono text-[#BA8E4E] font-semibold block mt-0.5 uppercase tracking-wider">
            {acc.level}
          </span>
        </div>
        <p className="hidden sm:block font-sans text-xs text-stone-600 leading-relaxed pt-2.5 border-t border-[#E8DEC8]/70">
          {acc.desc}
        </p>
      </div>
    </div>
  ));
}

