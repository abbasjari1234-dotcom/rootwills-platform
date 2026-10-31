import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Leaf, 
  Truck, 
  Clock,
  ArrowRight,
  Phone
} from 'lucide-react';
import { DoodleFlourish } from '@/components/public/DoodleFlourish';

export const metadata: Metadata = {
  title: 'About Rootwills | British Farm Provenance & Wholesale Operations',
  description:
    'Learn how Rootwills connects UK generational growers and coastal fisheries directly with professional hospitality kitchens. Daily 2am market grading and guaranteed pre-dawn drops.',
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
    metric: '1,200+',
    badge: 'STAGE 03',
    label: 'Wholesale Commercial Lines',
    desc: 'From field vegetables and salads to artisan dairy, coastal catch, and kitchen larder staples.',
  },
  {
    metric: 'EOM + 30',
    badge: 'STAGE 04',
    label: 'Trade Credit Facility',
    desc: 'Predictable, transparent commercial billing terms designed to support commercial hospitality cash flow.',
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
    title: 'Grower Partnerships & Farm Contracts',
    desc: 'We contract directly with generational growers across Worcestershire, Warwickshire, Kent, and Lincolnshire, securing field-fresh crops at locked commercial rates.',
  },
  {
    step: '02',
    tag: 'GRADING',
    title: 'Daily 02:00 AM Depot Inspection',
    desc: 'Produce arrives at our temperature-controlled Digbeth and London depot hubs where quality controllers inspect every crate for size, firmness, and shelf life.',
  },
  {
    step: '03',
    tag: 'ORDER CLOSE',
    title: 'Evening 11:00 PM Service Cutoff',
    desc: 'Chefs finalize exact daily requirements after their dinner services close. Orders are routed directly into automated pick-and-pack warehouse lines.',
  },
  {
    step: '04',
    tag: 'DISPATCH',
    title: 'Pre-Dawn 05:30 AM Fleet Drops',
    desc: 'Dual-temperature refrigerated vans complete drops between 05:30 and 07:30 AM, placing chilled crates directly into walk-in fridges with photo verification.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-stone-900 overflow-x-hidden">
      
      {/* ─── ACT I: EDITORIAL HERO HEADER (Eggshell Canvas matching Main Page) ─── */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 border-b border-[#E8DEC8]/70 overflow-hidden">
        {/* Soft top gradient feathering */}
        <div 
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FCFCFA] via-[#FCFCFA]/80 to-transparent pointer-events-none z-0" 
          aria-hidden="true" 
        />

        {/* Botanical Parchment Texture Overlay */}
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.16] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-5">
          {/* Monospace Eyebrow Capsule */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#2E060D] font-semibold">
              01 // OUR HERITAGE &amp; OPERATIONS
            </span>
          </div>

          <div className="relative">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#131313] leading-[1.12]">
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

          <p className="text-xs sm:text-sm lg:text-base text-stone-600 font-sans max-w-2xl mx-auto leading-relaxed">
            Founded with a singular standard: connect Britain’s finest generational growers, single-herd dairies, and coastal fisheries directly with professional kitchens, eliminating intermediary brokers, preserving margins, and guaranteeing pre-dawn deliveries.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#131313] hover:bg-[#2A2A2A] text-[#FCFCFA] text-xs sm:text-[13px] font-sans font-semibold tracking-wide transition-all duration-200 active:scale-[0.96] shadow-[0_4px_16px_rgba(19,19,19,0.18)]"
            >
              <span>Partner With Rootwills</span>
              <span className="text-stone-400 group-hover:text-white transition-colors">↗</span>
            </Link>

            <Link
              href="/#services"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-stone-50 text-[#131313] text-xs sm:text-[13px] font-sans font-semibold tracking-wide border border-stone-300 transition-all duration-200 active:scale-[0.96] shadow-sm"
            >
              <span>Explore Wholesale Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ACT II: OPERATIONAL SCALE METRICS (Tactile Glass Cards) ─── */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {OPERATIONAL_METRICS.map((m, idx) => (
            <div
              key={idx}
              className="relative bg-[#FFFDF9]/95 backdrop-blur-md rounded-2xl p-6 border border-[#E8DEC8] hover:border-[#BA8E4E]/80 shadow-[0_4px_20px_rgba(46,6,13,0.03)] hover:shadow-[0_12px_32px_rgba(46,6,13,0.07)] hover:-translate-y-0.5 transition-all duration-200 ease-out flex flex-col justify-between overflow-hidden group"
            >
              {/* Specular top rim */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#BA8E4E] font-semibold">
                    {m.badge}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#BA8E4E]/30 group-hover:bg-[#BA8E4E] transition-colors" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#131313] mb-1 group-hover:text-[#8B2635] transition-colors">
                  {m.metric}
                </div>
                <div className="text-xs font-serif font-bold text-[#BA8E4E] tracking-wide mb-2">
                  {m.label}
                </div>
              </div>
              <p className="text-xs text-stone-600 font-sans leading-relaxed pt-2 border-t border-[#E8DEC8]/60">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ACT III: THE 4-STEP SUPPLY CHAIN STORY ─── */}
      <section className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 border-t border-[#E8DEC8]/70">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          {/* Monospace Eyebrow Capsule */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 mb-1 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#2E060D] font-semibold">
              02 // FROM HARVEST TO KITCHEN BRIGADE
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#131313] tracking-tight">
            How Rootwills Powers Commercial Kitchens
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
            Our lean supply chain reduces transit times, maintains cold-chain integrity, and delivers maximum shelf-life for professional culinary teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SUPPLY_CHAIN_STEPS.map((s, idx) => (
            <div
              key={idx}
              className="relative bg-[#FFFDF9]/95 backdrop-blur-md rounded-2xl p-6 border border-[#E8DEC8] hover:border-[#BA8E4E]/80 shadow-[0_4px_20px_rgba(46,6,13,0.03)] hover:shadow-[0_12px_32px_rgba(46,6,13,0.07)] hover:-translate-y-0.5 transition-all duration-200 ease-out flex flex-col justify-between overflow-hidden group"
            >
              {/* Specular top rim */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[#BA8E4E] tracking-wider">
                    {s.step}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400">
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-[#131313] group-hover:text-[#8B2635] transition-colors leading-snug mb-2">
                  {s.title}
                </h3>
              </div>
              <p className="font-sans text-xs text-stone-600 leading-relaxed pt-3 border-t border-[#E8DEC8]/60 mt-3">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ACT IV: QUALITY ACCREDITATIONS & FOOD SAFETY ─── */}
      <section className="py-14 sm:py-20 bg-[#FAF6EE] border-y border-[#E8DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 mb-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#2E060D] font-semibold">
                03 // COMPLIANCE &amp; TRACEABILITY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#131313] tracking-tight">
              Rigorous Food Safety Standards
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Every facility, vehicle, and supplier within our network is held to the highest audited UK food hygiene standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ACCREDITATIONS.map((acc, idx) => (
              <div
                key={idx}
                className="relative bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8DEC8] hover:border-[#BA8E4E]/80 shadow-xs hover:shadow-md transition-all duration-200 space-y-3 group overflow-hidden"
              >
                {/* Specular top rim */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

                <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] text-[#BA8E4E] ring-1 ring-[#BA8E4E]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#131313] group-hover:text-[#8B2635] transition-colors">
                    {acc.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[#BA8E4E] font-semibold block mt-0.5">
                    {acc.level}
                  </span>
                </div>
                <p className="font-sans text-xs text-stone-600 leading-relaxed pt-2 border-t border-[#E8DEC8]/60">
                  {acc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACT V: BOTTOM DESK CALLOUT ─── */}
      <section className="py-14 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#131313]">
          Ready to review wholesale rates for your kitchen?
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-xl mx-auto">
          Contact our London and Midlands trade desks to request bespoke rate sheets, produce samples, or kitchen delivery logistics.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#131313] hover:bg-[#2A2A2A] text-[#FCFCFA] text-xs sm:text-sm font-sans font-semibold tracking-wide transition-all duration-200 active:scale-[0.96] shadow-[0_4px_16px_rgba(19,19,19,0.18)]"
          >
            <span>Open Commercial Account</span>
            <span className="text-stone-400 group-hover:text-white transition-colors">↗</span>
          </Link>
        </div>
      </section>

    </div>
  );
}

