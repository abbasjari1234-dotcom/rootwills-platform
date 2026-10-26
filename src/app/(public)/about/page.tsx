import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Leaf, 
  Truck, 
  Layers, 
  Clock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Rootwills | British Farm Provenance & Wholesale Operations',
  description:
    'Learn how Rootwills connects UK generational growers and coastal fisheries directly with professional hospitality kitchens. Daily 2am market grading and guaranteed pre-dawn drops.',
};

const OPERATIONAL_METRICS = [
  {
    metric: '02:00 AM',
    label: 'Daily Market Grading',
    desc: 'Senior buyers inspect and hand-select Class 1 produce at wholesale markets every morning.',
  },
  {
    metric: '99.4%',
    label: 'On-Time Drop Rate',
    desc: 'Pre-dawn logistics ensuring kitchen ingredients arrive before morning prep brigades clock in.',
  },
  {
    metric: '1,200+',
    label: 'Wholesale Commercial Lines',
    desc: 'From daily vegetables and salads to butchery, artisan dairy, and kitchen dry goods.',
  },
  {
    metric: 'EOM + 30',
    label: 'Trade Credit Facility',
    desc: 'Transparent 30-day billing terms designed for commercial hospitality cash flow.',
  },
];

const ACCREDITATIONS = [
  {
    name: 'BRCGS Storage & Distribution',
    level: 'Grade AA Audited',
    desc: 'Global benchmark for food safety, warehouse hygiene, and cold-chain traceability.',
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
    title: 'Grower Partnerships & Farm Contracts',
    desc: 'We contract directly with generational growers across Worcestershire, Warwickshire, Lincolnshire, and Kent, securing field-fresh crops at locked commercial rates.',
  },
  {
    step: '02',
    title: 'Daily 02:00 AM Depot Grading',
    desc: 'Produce arrives at our temperature-controlled Digbeth and London depot hubs where quality controllers inspect every crate for size, firmness, and shelf life.',
  },
  {
    step: '03',
    title: 'Evening 11:00 PM Service Cutoff',
    desc: 'Chefs finalize exact daily requirements after their dinner services close. Orders are routed directly into automated pick-and-pack warehouse lines.',
  },
  {
    step: '04',
    title: 'Pre-Dawn 06:00 AM Delivery Drop',
    desc: 'Dual-temperature refrigerated vans complete drops between 05:30 and 07:30 AM, placing chilled crates directly into walk-in fridges with photo verification.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-stone-900">
      
      {/* ─── ACT I: HERO HEADER ─── */}
      <section className="bg-[#2E060D] text-white relative overflow-hidden border-b border-[#BA8E4E]/25 pt-16 sm:pt-24 pb-16">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-25 mix-blend-overlay"
          style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#380710] via-[#2E060D] to-[#1E0307] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BA8E4E]/15 border border-[#BA8E4E]/40 text-[#D4A86A] text-xs font-serif uppercase tracking-[0.2em] font-semibold">
            <Building2 className="w-3.5 h-3.5 text-[#D4A86A]" />
            <span>British Farm Provenance &bull; London &amp; Midlands Hubs</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Connecting British Growers to <br className="hidden sm:inline" />
            <span className="text-[#D4A86A]">The UK’s Premier Kitchens</span>
          </h1>

          <p className="text-xs sm:text-base text-[#EDE4D8]/85 font-sans max-w-2xl mx-auto leading-relaxed">
            Founded with a singular standard: connect Britain’s finest generational growers, single-herd dairies, and coastal fisheries directly with professional kitchens, eliminating intermediary brokers, preserving margins, and guaranteeing pre-dawn deliveries.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#BA8E4E] hover:bg-[#D4A86A] text-[#120305] text-xs sm:text-[13px] font-sans font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Partner With Rootwills</span>
              <div className="w-7 h-7 rounded-full bg-[#2D060D]/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5 text-[#2D060D]" />
              </div>
            </Link>

            <Link
              href="/#services"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1A0307]/80 hover:bg-[#2A050D] border border-[#BA8E4E]/40 text-[#EDE4D8] text-xs sm:text-[13px] font-serif font-semibold tracking-wider transition-all"
            >
              <span>Our Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ACT II: OPERATIONAL SCALE METRICS ─── */}
      <section className="py-12 -mt-6 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {OPERATIONAL_METRICS.map((m, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8DEC8] shadow-sm space-y-2 text-center"
            >
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2E060D]">
                {m.metric}
              </div>
              <div className="text-xs font-serif font-bold text-[#BA8E4E] uppercase tracking-wide">
                {m.label}
              </div>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ACT III: THE 4-STEP SUPPLY CHAIN STORY ─── */}
      <section className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-serif uppercase tracking-[0.25em] text-[#BA8E4E] font-semibold">
            — FARM TO PREP BRIGADE —
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2E060D] tracking-tight">
            How Rootwills Powers Commercial Kitchens
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
            Our lean supply chain reduces transit times, maintains cold-chain integrity, and delivers maximum shelf-life for professional culinary teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUPPLY_CHAIN_STEPS.map((s, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8DEC8] space-y-3 relative shadow-xs hover:border-[#BA8E4E] transition-all"
            >
              <span className="text-3xl font-serif font-bold text-[#BA8E4E]/30 block">
                {s.step}
              </span>
              <h3 className="font-serif font-bold text-base text-[#2E060D] leading-snug">
                {s.title}
              </h3>
              <p className="font-sans text-xs text-stone-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ACT IV: QUALITY ACCREDITATIONS ─── */}
      <section className="py-14 bg-[#FAF6EE] border-y border-[#E8DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-serif uppercase tracking-[0.25em] text-[#BA8E4E] font-semibold">
              — COMPLIANCE &amp; TRACEABILITY —
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E060D] tracking-tight">
              Rigorous Food Safety Certifications
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Every facility, vehicle, and supplier within our network is held to the highest audited UK food hygiene standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ACCREDITATIONS.map((acc, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8DEC8] shadow-xs space-y-2.5 hover:border-[#BA8E4E] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2E060D] text-[#D4A86A] flex items-center justify-center border border-[#BA8E4E]/30">
                  <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#2E060D]">
                    {acc.name}
                  </h3>
                  <span className="text-[11px] font-serif text-[#BA8E4E] font-semibold block mt-0.5">
                    {acc.level}
                  </span>
                </div>
                <p className="font-sans text-xs text-stone-600 leading-relaxed">
                  {acc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
