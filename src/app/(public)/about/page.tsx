import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Leaf, 
  Truck, 
  Layers, 
  Clock,
  Check
} from 'lucide-react';
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

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
    <div className="bg-white min-h-screen text-slate-900">
      
      {/* ─── ACT I: HERO HEADER ─── */}
      <section className="relative py-16 lg:py-24 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-t from-emerald-950/40 via-slate-950/90 to-slate-950 pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            <span>British Farm Provenance &bull; Digbeth Wholesale Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight text-white leading-tight">
            Connecting British Growers to <br className="hidden sm:inline" />
            <span className="text-emerald-400">The UK’s Premier Kitchens</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Founded with a singular standard: connect Britain’s finest generational growers, single-herd dairies, and coastal fisheries directly with professional kitchens, eliminating intermediary brokers, preserving margins, and guaranteeing pre-dawn deliveries.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-sans font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/60 transition-all"
            >
              <span>Open Business Trade Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-sans font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 text-sm transition-all"
            >
              <span>Explore 1,200+ Wholesale Lines</span>
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
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2 text-center"
            >
              <div className="font-mono text-2xl sm:text-3xl font-black text-emerald-700">
                {m.metric}
              </div>
              <div className="text-xs font-bold text-slate-900 uppercase font-sans tracking-wide">
                {m.label}
              </div>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ACT III: THE 4-STEP SUPPLY CHAIN STORY ─── */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
            Farm to Prep Brigade
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-slate-900 tracking-tight">
            How Rootwills Powers Commercial Kitchens
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            Our lean supply chain reduces transit times, maintains cold-chain integrity, and delivers maximum shelf-life for professional culinary teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUPPLY_CHAIN_STEPS.map((s, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 space-y-3 relative"
            >
              <span className="text-3xl font-mono font-black text-emerald-600/30 block">
                {s.step}
              </span>
              <h3 className="font-sans font-bold text-base text-slate-900 leading-snug">
                {s.title}
              </h3>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ACT IV: QUALITY ACCREDITATIONS ─── */}
      <section className="py-16 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
              Compliance &amp; Traceability
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
              Rigorous Food Safety Certifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Every facility, vehicle, and supplier within our network is held to the highest audited UK food hygiene standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ACCREDITATIONS.map((acc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-slate-900">
                    {acc.name}
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold block mt-0.5">
                    {acc.level}
                  </span>
                </div>
                <p className="font-sans text-xs text-slate-600 leading-relaxed">
                  {acc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACT V: BOTTOM SPLIT CTA ─── */}
      <CommercialBottomCTA />

    </div>
  );
}
