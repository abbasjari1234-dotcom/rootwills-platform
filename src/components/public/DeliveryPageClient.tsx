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
  Zap,
  Phone,
  Radio,
  Camera,
  Navigation
} from 'lucide-react';

interface SLAResult {
  postcode: string;
  depot: string;
  guaranteedSlot: string;
  cutoff: string;
  fleetType: string;
  status: 'covered' | 'express';
}

export function DeliveryPageClient() {
  const [postcodeInput, setPostcodeInput] = useState('');
  const [slaResult, setSlaResult] = useState<SLAResult | null>({
    postcode: 'B2 5BN',
    depot: 'Birmingham Central Fulfilment Hub (Digbeth)',
    guaranteedSlot: '06:00 - 08:30 AM',
    cutoff: '11:00 PM Tonight',
    fleetType: 'Dual-Temp Mercedes Sprinter #04',
    status: 'covered',
  });

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcodeInput.trim()) return;

    const upper = postcodeInput.trim().toUpperCase();
    let depot = 'Birmingham Central Fulfilment Hub (Digbeth)';
    let slot = '06:00 - 08:30 AM';

    if (upper.startsWith('CV')) {
      depot = 'Coventry & Warwickshire Hub (Rowley Road)';
      slot = '06:15 - 08:30 AM';
    } else if (upper.startsWith('LE') || upper.startsWith('NG') || upper.startsWith('DE')) {
      depot = 'East Midlands Logistics Hub (Leicester)';
      slot = '06:30 - 08:45 AM';
    } else if (upper.startsWith('EC') || upper.startsWith('WC') || upper.startsWith('W') || upper.startsWith('SW')) {
      depot = 'Greater London Gateway (Park Royal)';
      slot = '05:30 - 08:00 AM';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase font-bold">
          <Truck className="w-3.5 h-3.5" />
          <span>Cold-Chain Logistics & SLA Standards</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream">
          6-Day Morning Delivery Guarantee
        </h1>
        <p className="text-xs sm:text-base text-cream/70 leading-relaxed">
          Kitchens cannot afford missing or late morning deliveries. Rootwills operates a dedicated temperature-controlled fleet delivering before your prep chefs arrive.
        </p>
      </div>

      {/* Interactive Postcode SLA Lookup Widget */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-champagne/40 shadow-2xl space-y-6">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <div className="text-xs font-mono uppercase text-champagne font-bold">
            Live Kitchen Delivery SLA Checker
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream">
            Check Your Morning Delivery Window
          </h2>
          <p className="text-xs text-cream/60">
            Enter your restaurant or hotel kitchen postcode to verify guaranteed delivery times and assigned hub.
          </p>
        </div>

        {/* Search input form */}
        <form onSubmit={handleLookup} className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <MapPin className="w-4 h-4 text-champagne absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. B2 5BN, CV3 4FL, W1D 3PU..."
              value={postcodeInput}
              onChange={(e) => setPostcodeInput(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-xl pl-10 pr-4 py-3 text-xs uppercase font-mono font-bold focus:outline-none focus:border-champagne"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Verify SLA</span>
          </button>
        </form>

        {/* SLA Result Card */}
        {slaResult && (
          <div className="max-w-3xl mx-auto p-5 bg-zinc-950/90 rounded-2xl border border-emerald-500/30 text-xs animate-fade-in shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <strong className="text-cream text-sm">Postcode {slaResult.postcode} is 100% Covered</strong>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] border border-emerald-500/30">
                Active 6-Day Service
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 text-left">
              <div>
                <span className="text-[10px] font-mono uppercase text-cream/40 block">Guaranteed SLA Drop</span>
                <span className="font-mono text-sm font-bold text-champagne">{slaResult.guaranteedSlot}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-cream/40 block">Evening Cut-off</span>
                <span className="font-mono text-sm font-bold text-cream">{slaResult.cutoff}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-cream/40 block">Assigned Hub</span>
                <span className="text-xs text-cream/80 block line-clamp-1">{slaResult.depot}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-cream/40 block">Vehicle Specification</span>
                <span className="text-xs text-emerald-400 font-mono block">Chilled (+2°C) + Ambient</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fleet & Cold Chain Details */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase text-champagne font-bold">Fleet Telemetry</div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-cream">
            Dual-Temperature Mercedes-Benz Fleet
          </h2>
          <p className="text-xs text-cream/60">
            Engineered for farm-to-kitchen thermal integrity without breaking the cold-chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
              <Thermometer className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">Chamber 1: +2.0°C to +4.0°C</span>
              <h3 className="font-display text-xl font-bold text-cream mt-0.5">Partitioned Chilled Compartment</h3>
            </div>
            <p className="text-xs text-cream/70 leading-relaxed">
              Dedicated high-airflow refrigerated zone for delicate salad microgreens, Cotswold dairy, butchery meats, and cut vegetables. Continuous probe logging.
            </p>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 pt-1">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Real-Time Cellular Probe Logging</span>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Chamber 2: Ambient Dry Goods</span>
              <h3 className="font-display text-xl font-bold text-cream mt-0.5">Humidity-Controlled Dry Storage</h3>
            </div>
            <p className="text-xs text-cream/70 leading-relaxed">
              Protected ambient bay for Valrhona chocolates, flours, cooking oils, vinegars, and dry store goods. Zero moisture condensation transfer.
            </p>
            <div className="text-[10px] font-mono text-cream/50 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-champagne" />
              <span>Moisture Barrier Partitioned</span>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">Security & Access</span>
              <h3 className="font-display text-xl font-bold text-cream mt-0.5">Keyholder & Walk-in Drop</h3>
            </div>
            <p className="text-xs text-cream/70 leading-relaxed">
              Vetted drivers trained in cellar alarm keyholders and walk-in cold room stacking. Drivers photograph the stacked delivery and log sign-on-glass POD.
            </p>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 pt-1">
              <Navigation className="w-3.5 h-3.5" />
              <span>GPS Geofence Sign-off Verification</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overnight Fulfillment Timeline */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-zinc-800 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase text-champagne font-bold">Precision Operations</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream">
            The Overnight Fulfillment Workflow
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-2">
            <div className="font-mono text-champagne font-bold text-base">23:00 PM</div>
            <strong className="text-cream block">Order Cut-off Lock</strong>
            <p className="text-cream/60 leading-relaxed">
              Customer orders lock into our Central Warehouse Management System. Automatic picking manifests generate.
            </p>
          </div>

          <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-2">
            <div className="font-mono text-champagne font-bold text-base">01:00 AM</div>
            <strong className="text-cream block">Depot Batch Picking</strong>
            <p className="text-cream/60 leading-relaxed">
              Depot selectors pick fresh produce and butchery cuts directly from refrigerated intake bays with barcoded verification.
            </p>
          </div>

          <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-2">
            <div className="font-mono text-champagne font-bold text-base">05:00 AM</div>
            <strong className="text-cream block">Driver Route Dispatch</strong>
            <p className="text-cream/60 leading-relaxed">
              Dual-temp Sprinters pre-chill to +2.0°C, crates load by drop order, and drivers begin optimized morning runs.
            </p>
          </div>

          <div className="p-4 bg-zinc-900/60 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
            <div className="font-mono text-emerald-400 font-bold text-base">06:30 AM</div>
            <strong className="text-cream block">Kitchen Delivery & POD</strong>
            <p className="text-cream/60 leading-relaxed">
              Order placed in walk-in cold room, temperature logged, and digital receipt sent before morning chef arrival.
            </p>
          </div>
        </div>
      </div>

      {/* Depots List */}
      <div className="glass-panel-gold p-8 sm:p-12 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-champagne/20 pb-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream">
              Regional Fulfilment Depots
            </h2>
            <p className="text-xs text-cream/60">Strategically located hubs across the UK motorway network</p>
          </div>
          <span className="text-xs font-mono text-champagne bg-champagne/10 px-3 py-1 rounded-full border border-champagne/20">
            4 Midlands & London Hubs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-5 bg-zinc-950/80 rounded-2xl border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-champagne font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Birmingham Central Hub (HQ)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">18 Vans Active</span>
            </div>
            <p className="text-cream/70">
              Digbeth Wholesale Quarter, Birmingham, B5 5JR. Serving Birmingham, Solihull, Black Country, Sutton Coldfield.
            </p>
            <div className="pt-1 text-[11px] text-cream/50 font-mono">Operations Desk: 0121 496 0800 &bull; Ext #1</div>
          </div>

          <div className="p-5 bg-zinc-950/80 rounded-2xl border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-champagne font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Coventry & Warwickshire Hub</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">8 Vans Active</span>
            </div>
            <p className="text-cream/70">
              Rowley Road Distribution Park, Coventry, CV3 4FL. Serving Coventry, Warwick, Leamington, Stratford-upon-Avon.
            </p>
            <div className="pt-1 text-[11px] text-cream/50 font-mono">Operations Desk: 024 7699 0820 &bull; Ext #2</div>
          </div>

          <div className="p-5 bg-zinc-950/80 rounded-2xl border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-champagne font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>East Midlands Logistics Hub</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">10 Vans Active</span>
            </div>
            <p className="text-cream/70">
              Thurmaston Commercial Centre, Leicester, LE4 8JF. Serving Leicester, Nottingham, Derby, Loughborough.
            </p>
            <div className="pt-1 text-[11px] text-cream/50 font-mono">Operations Desk: 0116 496 0910 &bull; Ext #3</div>
          </div>

          <div className="p-5 bg-zinc-950/80 rounded-2xl border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-champagne font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Greater London Gateway</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">14 Vans Active</span>
            </div>
            <p className="text-cream/70">
              Park Royal Logistics Park, London, NW10 7HQ. Serving Central London, West End, City, and M25 corridor.
            </p>
            <div className="pt-1 text-[11px] text-cream/50 font-mono">Operations Desk: 020 7946 0880 &bull; Ext #4</div>
          </div>
        </div>
      </div>
    </div>
  );
}
