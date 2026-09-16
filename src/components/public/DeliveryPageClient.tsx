'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Truck, 
  Clock, 
  ShieldCheck, 
  Thermometer, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Search,
  Phone,
  Navigation,
  Check
} from 'lucide-react';
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

interface SLAResult {
  postcode: string;
  depot: string;
  guaranteedSlot: string;
  cutoff: string;
  fleetType: string;
  status: 'covered' | 'express';
}

const DELIVERY_SCHEDULE = [
  { day: 'Monday', window: '05:30 - 07:30 AM', cutoff: '11:00 PM Sun', status: 'Active 6am Run' },
  { day: 'Tuesday', window: '05:30 - 07:30 AM', cutoff: '11:00 PM Mon', status: 'Active 6am Run' },
  { day: 'Wednesday', window: '05:30 - 07:30 AM', cutoff: '11:00 PM Tue', status: 'Active 6am Run' },
  { day: 'Thursday', window: '05:30 - 07:30 AM', cutoff: '11:00 PM Wed', status: 'Active 6am Run' },
  { day: 'Friday', window: '05:30 - 07:30 AM', cutoff: '11:00 PM Thu', status: 'Active 6am Run' },
  { day: 'Saturday', window: '05:30 - 07:30 AM', cutoff: '11:00 PM Fri', status: 'Weekend Service' },
  { day: 'Sunday', window: 'Depot Fleet Rest', cutoff: 'Order for Mon', status: 'Depot Maintenance' },
];

const COLD_CHAIN_PILLARS = [
  {
    icon: Thermometer,
    title: 'Dual-Temp Active Refrigeration',
    desc: 'Mercedes-Benz fleet equipped with dual-zone Carrier refrigeration units holding +1°C to +4°C chilled produce and -18°C frozen lines.',
  },
  {
    icon: Clock,
    title: 'Pre-Dawn Kitchen Drop Guarantee',
    desc: 'Drivers complete drops between 05:30 and 07:30 AM so your breakfast and prep brigade never wait on produce deliveries.',
  },
  {
    icon: Navigation,
    title: 'Keyholder & Walk-in Drop Service',
    desc: 'Vetted drivers can access your prep area or walk-in fridge via secure lockbox or night key codes, with photo drop receipts logged.',
  },
  {
    icon: ShieldCheck,
    title: 'Real-Time Temperature Telematics',
    desc: 'Continuous temperature logging on every crate. Full digital proof of cold-chain compliance delivered with your morning manifest.',
  },
];

export function DeliveryPageClient() {
  const [postcodeInput, setPostcodeInput] = useState('');
  const [slaResult, setSlaResult] = useState<SLAResult | null>({
    postcode: 'B2 5BN',
    depot: 'Birmingham Central Fulfilment Hub (Digbeth)',
    guaranteedSlot: '05:30 - 07:30 AM',
    cutoff: '11:00 PM Tonight',
    fleetType: 'Dual-Temp Mercedes-Benz Sprinter Fleet',
    status: 'covered',
  });

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcodeInput.trim()) return;

    const upper = postcodeInput.trim().toUpperCase();
    let depot = 'Birmingham Central Fulfilment Hub (Digbeth)';
    let slot = '05:30 - 07:30 AM';

    if (upper.startsWith('CV')) {
      depot = 'Coventry & Warwickshire Depot';
      slot = '05:45 - 07:30 AM';
    } else if (upper.startsWith('LE') || upper.startsWith('NG') || upper.startsWith('DE')) {
      depot = 'East Midlands Logistics Hub (Leicester)';
      slot = '06:00 - 08:00 AM';
    } else if (upper.startsWith('EC') || upper.startsWith('WC') || upper.startsWith('W') || upper.startsWith('SW') || upper.startsWith('E')) {
      depot = 'Greater London Gateway (Park Royal)';
      slot = '05:30 - 07:30 AM';
    }

    setSlaResult({
      postcode: upper,
      depot,
      guaranteedSlot: slot,
      cutoff: '11:00 PM Night Prior',
      fleetType: 'Dual-Temp Mercedes-Benz Fleet',
      status: 'covered',
    });
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      
      {/* ─── ACT I: HERO HEADER ─── */}
      <section className="relative py-16 lg:py-20 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-t from-emerald-950/40 via-slate-950/90 to-slate-950 pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Truck className="w-3.5 h-3.5" />
            <span>Cold-Chain Logistics &amp; SLA Standards</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white leading-tight">
            6-Day Morning Delivery Guarantee
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Kitchens cannot afford missing or delayed morning produce. Rootwills operates a dedicated temperature-controlled fleet delivering before your prep brigade arrives.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Clock className="w-4 h-4" />
              <span>11:00 PM Order Cut-off</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Truck className="w-4 h-4" />
              <span>05:30 - 07:30 AM Drop Window</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% On-Time SLA Guarantee</span>
            </span>
          </div>
        </div>
      </section>

      {/* ─── ACT II: INTERACTIVE POSTCODE SLA CHECKER ─── */}
      <section className="py-12 lg:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="text-center space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
              Live Kitchen Coverage Checker
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
              Check Your Postcode Delivery Window
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-sans max-w-lg mx-auto">
              Enter your restaurant, hotel, or catering kitchen postcode to verify morning drop times and assigned depot fleet.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLookup} className="max-w-md mx-auto flex gap-2">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="e.g. B2 5BN, CV3 4FL, W1D 3PU..."
                value={postcodeInput}
                onChange={(e) => setPostcodeInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl pl-10 pr-4 py-3 text-xs uppercase font-mono font-bold focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all shrink-0 cursor-pointer active:scale-95"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Verify SLA</span>
            </button>
          </form>

          {/* SLA Result Card */}
          {slaResult && (
            <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs animate-fade-in space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-emerald-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <strong className="text-slate-900 text-sm font-sans">
                    Postcode {slaResult.postcode} is Fully Covered
                  </strong>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold">
                  Active 6-Day Morning Service
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Delivery Window</span>
                  <span className="font-mono text-sm font-bold text-emerald-900">{slaResult.guaranteedSlot}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Evening Cutoff</span>
                  <span className="font-mono text-sm font-bold text-slate-800">{slaResult.cutoff}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Assigned Depot</span>
                  <span className="font-sans text-xs font-semibold text-slate-800 block truncate">{slaResult.depot}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Fleet Spec</span>
                  <span className="font-sans text-xs font-semibold text-slate-800 block truncate">{slaResult.fleetType}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-emerald-200/80">
                <span className="text-[11px] text-emerald-800 font-sans">
                  Free refrigerated delivery on all trade orders £150+
                </span>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-1 text-xs font-sans font-bold text-emerald-800 hover:text-emerald-900 hover:underline"
                >
                  <span>Open Account for {slaResult.postcode}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── ACT III: 6-DAY WEEKLY SCHEDULE TABLE ─── */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-sans font-extrabold text-slate-900">
                Standard Weekly Delivery Schedule
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Operating 6 mornings a week across the Midlands and Greater London.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Cut-off: 11:00 PM Night Prior
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono uppercase text-xs">
                  <th className="py-3 px-4 font-bold">Delivery Day</th>
                  <th className="py-3 px-4 font-bold">Kitchen Arrival Slot</th>
                  <th className="py-3 px-4 font-bold">Order Cut-off</th>
                  <th className="py-3 px-4 font-bold">Fleet Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {DELIVERY_SCHEDULE.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{s.day}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-emerald-800">{s.window}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{s.cutoff}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${
                        s.status.includes('Active')
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : s.status.includes('Weekend')
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── ACT IV: COLD-CHAIN PILLARS ─── */}
      <section className="py-16 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
              Logistics Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
              Uncompromised Cold-Chain Quality
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              From warehouse dispatch to your prep counter, our temperature controls protect every leaf, cut, and dairy carton.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COLD_CHAIN_PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-bold text-sm text-slate-900 leading-snug">
                    {p.title}
                  </h3>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ACT V: BOTTOM SPLIT CTA ─── */}
      <CommercialBottomCTA />

    </div>
  );
}
