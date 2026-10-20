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
    rootwills: 'Direct Digital & Concierge Ordering',
    advantage: 'Chefs spend time on prep and cooking, not supplier admin',
  },
  {
    feature: 'Damaged or Rejected Crates',
    legacy: 'Days chasing driver carbon copy credit slips',
    rootwills: '60-Second Photo Credit Note in App',
    advantage: 'Instant automated ledger adjustment on your statement',
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
    quote: 'Credit notes used to take two weeks of phone calls with broadliners. With Rootwills, one photo generates an instant credit memo. That is real respect for chefs.',
    author: 'Elena Rostova',
    role: 'Head of Culinary Operations',
    venue: 'Boutique Event Caterers',
  },
];

export default function WhyChooseUsPage() {
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
            <Award className="w-3.5 h-3.5 text-[#D4A86A]" />
            <span>The Rootwills Operational Difference</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Engineered to Solve Wholesale <br className="hidden sm:inline" />
            <span className="text-[#D4A86A]">Frustrations for UK Kitchens</span>
          </h1>

          <p className="text-xs sm:text-base text-[#EDE4D8]/85 font-sans max-w-2xl mx-auto leading-relaxed">
            We consulted Michelin-starred head chefs, hotel F&amp;B directors, and contract caterers across the UK to build the modern wholesale foodservice standard they actually asked for.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 pl-7 pr-2.5 py-2.5 rounded-full bg-[#D4A86A] hover:bg-[#C59958] text-[#2D060D] text-xs sm:text-[13px] font-serif font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-xl active:scale-[0.98]"
            >
              <span>Partner With Rootwills</span>
              <div className="w-7 h-7 rounded-full bg-[#2D060D]/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5 text-[#2D060D]" />
              </div>
            </Link>

            <Link
              href="/delivery"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1A0307]/80 hover:bg-[#2A050D] border border-[#BA8E4E]/40 text-[#EDE4D8] text-xs sm:text-[13px] font-serif font-semibold tracking-wider transition-all"
            >
              <span>Check Delivery Postcode</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-6 grid grid-cols-3 gap-3 max-w-2xl mx-auto border-t border-[#BA8E4E]/25 text-center font-serif">
            <div>
              <span className="block text-[#D4A86A] font-bold text-base sm:text-2xl">11:00 PM</span>
              <span className="text-[11px] text-[#EDE4D8]/75 uppercase tracking-wider">Order Cutoff</span>
            </div>
            <div>
              <span className="block text-[#D4A86A] font-bold text-base sm:text-2xl">06:00 AM</span>
              <span className="text-[11px] text-[#EDE4D8]/75 uppercase tracking-wider">Drop Guarantee</span>
            </div>
            <div>
              <span className="block text-[#D4A86A] font-bold text-base sm:text-2xl">30-Day</span>
              <span className="text-[11px] text-[#EDE4D8]/75 uppercase tracking-wider">Trade Credit Facility</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACT II: COMPARISON MATRIX ─── */}
      <section className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-[0.2em] text-[#BA8E4E] font-semibold">
              <span>Direct Operational Comparison</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E060D] tracking-tight">
              Traditional Food Broadliners vs. Rootwills Platform
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E8DEC8] text-stone-500 font-serif uppercase text-[11px] tracking-wider">
                  <th className="py-3.5 px-4 font-bold text-stone-700">Operational Standard</th>
                  <th className="py-3.5 px-4 font-bold text-stone-500">Legacy Broadliners</th>
                  <th className="py-3.5 px-4 font-bold text-[#2E060D] bg-[#FAF6EE] rounded-t-xl border-t border-x border-[#E8DEC8]">
                    Rootwills Direct Platform
                  </th>
                  <th className="py-3.5 px-4 font-bold text-stone-700">Commercial Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DEC8] font-sans text-stone-700">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-4 px-4 font-serif font-bold text-[#2E060D]">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-stone-500">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{row.legacy}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#2E060D] bg-[#FAF6EE]/80 border-x border-[#E8DEC8]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#BA8E4E] shrink-0" />
                        <span className="font-serif">{row.rootwills}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-stone-600 text-xs">
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
      <section className="py-14 lg:py-20 bg-[#FAF6EE] border-y border-[#E8DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-serif uppercase tracking-[0.25em] text-[#BA8E4E] font-semibold">
              — OPERATIONAL STANDARDS —
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2E060D] tracking-tight">
              Built for the Demands of Real Kitchens
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Every feature of our service was created to eliminate procurement friction, protect margins, and keep kitchens fully stocked before morning service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPERATIONAL_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8DEC8] shadow-xs hover:border-[#BA8E4E] hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2E060D] text-[#D4A86A] border border-[#BA8E4E]/30 flex items-center justify-center shrink-0 shadow-xs">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#2E060D] tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-stone-600 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ACT IV: OPERATOR TESTIMONIALS ─── */}
      <section className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-serif uppercase tracking-[0.25em] text-[#BA8E4E] font-semibold">
            — CLIENT VOICES —
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E060D] tracking-tight">
            Trusted by Head Chefs &amp; Operators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8DEC8] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#BA8E4E]/60 transition-all"
            >
              <p className="text-xs sm:text-sm text-stone-700 font-serif italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-3 border-t border-[#E8DEC8]">
                <div className="font-serif font-bold text-sm text-[#2E060D]">{t.author}</div>
                <div className="text-xs text-stone-500 font-sans">{t.role}</div>
                <div className="text-xs font-serif text-[#BA8E4E] font-semibold mt-0.5">{t.venue}</div>
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
