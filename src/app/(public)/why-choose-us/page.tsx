import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  Award, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Zap, 
  Truck, 
  Thermometer,
  Percent,
  Camera,
  Layers,
  Phone,
  Building2,
  FileText
} from 'lucide-react';
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

export const metadata: Metadata = {
  title: 'Why Choose Rootwills Wholesale Foodservice | Rootwills UK',
  description:
    'Discover the Rootwills advantage: 11:00 PM post-service cutoffs, guaranteed 06:00 AM delivery drops, locked contract pricing, and instant photo credits for UK kitchens.',
};

const OPERATIONAL_PILLARS = [
  {
    icon: Clock,
    title: '11:00 PM Post-Service Cutoff',
    desc: 'Input orders after your dinner rush closes. No more guessing covers at 4:00 PM or carrying dead stock in your walk-in fridge.',
  },
  {
    icon: Truck,
    title: 'Guaranteed 06:00 AM Delivery Drop',
    desc: 'Our dual-temperature refrigerated fleet delivers before your prep brigade clocks in, with secure keyholder drop access available.',
  },
  {
    icon: Percent,
    title: 'Locked Contract Pricing',
    desc: 'Transparent wholesale pricing locked on monthly or seasonal terms. Zero surprise distributor margin creep or fuel surcharges.',
  },
  {
    icon: Camera,
    title: '60-Second Photo Credit Note',
    desc: 'If a crate does not meet your standard, snap a photo in the app for an instant digital credit note automatically applied to your statement.',
  },
  {
    icon: Thermometer,
    title: 'Dual-Temp Cold-Chain Integrity',
    desc: 'Every vehicle is real-time telematics tracked (+1°C to +4°C chilled, -18°C frozen) to guarantee HACCP and SALSA compliance on delivery.',
  },
  {
    icon: ShieldCheck,
    title: 'Dedicated Depot Account Desk',
    desc: 'Speak directly to your assigned Birmingham or London account manager who knows your kitchen specs, order cadence, and team.',
  },
];

const COMPARISON_ROWS = [
  {
    feature: 'Daily Order Cut-off',
    legacy: '04:00 - 05:00 PM (Forces guessing dinner covers)',
    rootwills: '11:00 PM Post-Service Night Prior',
    advantage: 'Zero food waste; order on actual prep requirements',
  },
  {
    feature: 'Pricing Stability',
    legacy: 'Volatile weekly market price fluctuations',
    rootwills: 'Locked Monthly & Seasonal Contracts',
    advantage: 'Total cost certainty; protects your food GP margins',
  },
  {
    feature: 'Delivery Arrival Window',
    legacy: 'Vague 08:00 AM to 02:00 PM delivery window',
    rootwills: 'Guaranteed 05:30 - 07:30 AM Drop SLA',
    advantage: 'Stock in walk-in before morning prep brigade starts',
  },
  {
    feature: 'Reordering Workflow',
    legacy: '15-minute phone calls and paper clipboards',
    rootwills: '45-Second Mobile & Web Portal',
    advantage: 'Chefs spend time on prep and cooking, not supplier admin',
  },
  {
    feature: 'Damaged or Rejected Crates',
    legacy: 'Days chasing driver carbon copy credit slips',
    rootwills: '60-Second Photo Credit Note in App',
    advantage: 'Instant automated ledger adjustment on your VAT statement',
  },
  {
    feature: 'Delivery Surcharges',
    legacy: 'Split-drop penalties and fuel levies',
    rootwills: 'Zero Surcharges Ever on Trade Accounts',
    advantage: 'Completely transparent net contracted figures',
  },
];

const TESTIMONIALS = [
  {
    quote: 'The 11:00 PM cutoff changed how our kitchen operates. We place orders after last orders are plated and arrive to find fresh produce already in the walk-in fridge at 6:30 AM.',
    author: 'Marcus Vance',
    role: 'Executive Head Chef',
    venue: 'The Grand Gastro Collection (Birmingham)',
  },
  {
    quote: 'Rootwills gave us locked quarterly pricing on our high-volume lines. That consistency gave us absolute certainty on our food cost margins across our hotel restaurants.',
    author: 'David Chen',
    role: 'Procurement Director',
    venue: 'Midlands Boutique Hotel Group',
  },
  {
    quote: 'Credit notes used to take two weeks of phone calls with broadliners. With Rootwills, one photo in the portal generates an instant credit memo. That is real respect for chefs.',
    author: 'Elena Rostova',
    role: 'Head of Culinary Operations',
    venue: 'Boutique Event Caterers',
  },
];

export default function WhyChooseUsPage() {
  return (
    <div className="bg-white min-h-screen text-slate-900">
      
      {/* ─── ACT I: HERO HEADER ─── */}
      <section className="relative py-16 lg:py-24 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-t from-emerald-950/40 via-slate-950/90 to-slate-950 pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>The Rootwills Operational Difference</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight text-white leading-tight">
            Engineered to Solve Wholesale <br className="hidden sm:inline" />
            <span className="text-emerald-400">Frustrations for UK Kitchens</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
            We interviewed Michelin-starred head chefs, hotel F&amp;B directors, and contract caterers across the UK. Then we built the modern wholesale foodservice platform they actually asked for.
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
              href="/delivery"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-sans font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 text-sm transition-all"
            >
              <span>Check Delivery Postcode</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-6 grid grid-cols-3 gap-3 max-w-2xl mx-auto border-t border-slate-800/80 text-center font-mono">
            <div>
              <span className="block text-emerald-400 font-black text-base sm:text-xl">11:00 PM</span>
              <span className="text-[11px] text-slate-400">Order Cutoff</span>
            </div>
            <div>
              <span className="block text-emerald-400 font-black text-base sm:text-xl">06:00 AM</span>
              <span className="text-[11px] text-slate-400">Drop Guarantee</span>
            </div>
            <div>
              <span className="block text-emerald-400 font-black text-base sm:text-xl">30-Day</span>
              <span className="text-[11px] text-slate-400">Trade Credit Facility</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACT II: COMPARISON MATRIX ─── */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
              <span>Direct Operational Comparison</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
              Traditional Food Broadliners vs. Rootwills Platform
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono uppercase text-xs tracking-wider">
                  <th className="py-3.5 px-4 font-bold">Operational Standard</th>
                  <th className="py-3.5 px-4 font-bold text-rose-600">Legacy Broadliners</th>
                  <th className="py-3.5 px-4 font-bold text-emerald-700 bg-emerald-50/60 rounded-t-xl">
                    Rootwills Direct Platform
                  </th>
                  <th className="py-3.5 px-4 font-bold text-slate-700">Commercial Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-slate-700">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 font-sans">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-rose-700">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{row.legacy}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-emerald-900 bg-emerald-50/40">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{row.rootwills}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 text-xs">
                      {row.advantage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── ACT III: THE 6 OPERATIONAL PILLARS ─── */}
      <section className="py-16 lg:py-20 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
              Operational Standards
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-slate-900 tracking-tight">
              Built for the Demands of Real Kitchens
            </h2>
            <p className="text-sm text-slate-600 font-sans leading-relaxed">
              Every feature of our service was created to eliminate procurement friction, protect margins, and keep kitchens fully stocked before morning service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPERATIONAL_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-sans font-bold text-slate-900 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ACT IV: OPERATOR TESTIMONIALS ─── */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
            Client Voices
          </span>
          <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
            Trusted by Head Chefs &amp; Operators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4"
            >
              <p className="text-xs sm:text-sm text-slate-700 font-sans italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-100">
                <div className="font-sans font-bold text-sm text-slate-900">{t.author}</div>
                <div className="text-xs text-slate-500">{t.role}</div>
                <div className="text-xs font-mono text-emerald-700 font-medium mt-0.5">{t.venue}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ACT V: BOTTOM CONVERSION SPLIT CTA ─── */}
      <CommercialBottomCTA />

    </div>
  );
}
