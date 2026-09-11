'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Utensils, 
  Hotel, 
  Coffee, 
  Truck, 
  ShieldCheck, 
  Percent,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Sector } from '@/types/onboarding';

interface SectorOption {
  id: Sector;
  name: string;
  savingRate: number;
  icon: React.ComponentType<{ className?: string }>;
  defaultSpend: number;
}

const SECTORS: SectorOption[] = [
  { id: 'fine_dining', name: 'Fine Dining', savingRate: 0.14, icon: Utensils, defaultSpend: 3500 },
  { id: 'boutique_hotel', name: 'Boutique Hotel', savingRate: 0.15, icon: Hotel, defaultSpend: 6500 },
  { id: 'gastropub', name: 'Gastropub', savingRate: 0.12, icon: Building2, defaultSpend: 3000 },
  { id: 'artisan_cafe', name: 'Artisan Cafe', savingRate: 0.11, icon: Coffee, defaultSpend: 1500 },
  { id: 'luxury_catering', name: 'Events & Catering', savingRate: 0.16, icon: TrendingUp, defaultSpend: 8000 },
];

const SPEND_PRESETS = [
  { label: '£1.5k/wk', value: 1500 },
  { label: '£3.5k/wk', value: 3500 },
  { label: '£7.5k/wk', value: 7500 },
  { label: '£12.5k/wk', value: 12500 },
];

export function PriceEstimator() {
  const addLead = useAppStore((state) => state.addLead);
  const [sector, setSector] = useState<Sector>('fine_dining');
  const [weeklySpend, setWeeklySpend] = useState<number>(3500);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    postcode: '',
  });

  // Determine active sector rate
  const activeSector = SECTORS.find((s) => s.id === sector) || SECTORS[0];
  const savingRate = activeSector.savingRate;

  // Calculate savings metrics
  const annualSpend = weeklySpend * 52;
  const estimatedAnnualSavings = Math.round(annualSpend * savingRate);
  const monthlySavings = Math.round(estimatedAnnualSavings / 12);
  const splitSurchargeSavings = Math.round(52 * 3 * 18); // 3 drops/week @ £18 saved surcharge = £2,808/yr

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.phone) return;

    addLead({
      companyName: formData.companyName,
      contactName: formData.contactName || 'Enquiry Contact',
      email: formData.email,
      phone: formData.phone,
      sector: sector,
      postcode: formData.postcode || 'B1 1AA',
      city: 'Birmingham / Midlands',
      estimatedWeeklySpend: weeklySpend,
      source: 'quote_request',
      assignedSalesRep: 'Commercial Sales Desk',
      notes: `Instant price quote generated online. Weekly spend: £${weeklySpend.toLocaleString()}. Estimated annual savings: £${estimatedAnnualSavings.toLocaleString()} at ${(savingRate * 100).toFixed(0)}% tier rate.`,
    });

    setSubmitted(true);
  };

  const handleSectorChange = (newSector: SectorOption) => {
    setSector(newSector.id);
  };

  return (
    <div className="pricing-calculator glass-panel-gold rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden border border-champagne/25">
      {/* Ambient background glows */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-champagne/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Wholesale Commercial Calculator</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-cream">
            Calculate Your Kitchen&apos;s Direct Wholesale Savings
          </h2>
          <p className="text-sm sm:text-base text-cream/75 max-w-xl mx-auto font-sans">
            Compare Rootwills single-estate direct sourcing, locked tier contracts, and 0% split-delivery surcharges against standard foodservice distributors.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Sector Selection Chips */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-champagne mb-3">
                1. Select Kitchen Sector &amp; Operational Model
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {SECTORS.map((s, idx) => {
                  const Icon = s.icon;
                  const isSelected = s.id === sector;
                  const isLastOdd = idx === 4;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSectorChange(s)}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        isLastOdd ? 'col-span-2 sm:col-span-1' : ''
                      } ${
                        isSelected
                          ? 'bg-champagne/15 border-champagne shadow-[0_0_20px_rgba(228,199,103,0.3)] text-cream'
                          : 'bg-obsidian-900/60 border-champagne/15 hover:border-champagne/40 text-cream/70 hover:text-cream'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-champagne' : 'text-cream/50'}`} />
                      <span className="text-xs font-bold font-sans">{s.name}</span>
                      <span className="text-[10px] font-mono text-emerald-400">~{(s.savingRate * 100).toFixed(0)}% avg save</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Interactive Spend Range */}
            <div className="bg-obsidian-950/70 border border-champagne/20 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label htmlFor="spend-range" className="text-xs font-mono uppercase tracking-wider text-cream/90 block">
                    2. Estimated Weekly Food &amp; Fresh Produce Spend
                  </label>
                  <span className="text-[11px] text-cream/60">Includes fresh produce, dairy, bakery &amp; chef essentials</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold font-display text-champagne">
                    £{weeklySpend.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-cream/60 uppercase">/ week</span>
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-2">
                <input
                  id="spend-range"
                  aria-label="Estimated Weekly Food and Fresh Produce Spend"
                  type="range"
                  min="500"
                  max="20000"
                  step="250"
                  value={weeklySpend}
                  onChange={(e) => setWeeklySpend(Number(e.target.value))}
                  className="w-full h-2.5 bg-obsidian-800 rounded-lg appearance-none cursor-pointer accent-champagne"
                />
                <div className="flex justify-between text-[11px] text-cream/50 font-mono">
                  <span>£500</span>
                  <span>£5,000</span>
                  <span>£10,000</span>
                  <span>£15,000</span>
                  <span>£20,000+</span>
                </div>
              </div>

              {/* Quick spend shortcut chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-mono uppercase text-cream/50">Quick Pick:</span>
                {SPEND_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setWeeklySpend(preset.value)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      weeklySpend === preset.value
                        ? 'bg-champagne text-obsidian-950 font-bold'
                        : 'bg-obsidian-900 border border-champagne/20 text-cream/70 hover:text-cream hover:border-champagne/40'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Live ROI & Value Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="rounded-2xl p-4 bg-obsidian-900/80 border border-champagne/20 text-center relative overflow-hidden">
                <div className="text-[11px] text-cream/70 uppercase font-mono tracking-wider">Estimated Monthly Savings</div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-champagne mt-1.5">
                  £{monthlySavings.toLocaleString()}
                </div>
                <div className="text-[11px] text-cream/60 mt-1 flex items-center justify-center gap-1">
                  <Percent className="w-3 h-3 text-champagne" />
                  <span>Direct grower pricing tier</span>
                </div>
              </div>

              <div className="rounded-2xl p-4 bg-emerald-950/40 border border-emerald-500/30 text-center relative overflow-hidden">
                <div className="text-[11px] text-emerald-300 uppercase font-mono tracking-wider">Projected Annual Retained Profit</div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-emerald-400 mt-1.5">
                  £{estimatedAnnualSavings.toLocaleString()} / yr
                </div>
                <div className="text-[11px] text-emerald-400/80 mt-1 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Retained kitchen margin</span>
                </div>
              </div>

              <div className="rounded-2xl p-4 bg-obsidian-900/80 border border-champagne/20 text-center relative overflow-hidden">
                <div className="text-[11px] text-cream/70 uppercase font-mono tracking-wider">Zero Surcharge Advantage</div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-champagne-soft mt-1.5">
                  +£{splitSurchargeSavings.toLocaleString()} / yr
                </div>
                <div className="text-[11px] text-cream/60 mt-1 flex items-center justify-center gap-1">
                  <Truck className="w-3 h-3 text-champagne" />
                  <span>0% split delivery fee</span>
                </div>
              </div>
            </div>

            {/* 4. Instant Quote Request Form */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-champagne">
                3. Dispatch Tailored Price Matrix to Your Brigade
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Business / Venue Name"
                  aria-label="Business / Venue Name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="glass-input rounded-xl px-3.5 py-3 text-xs text-cream placeholder:text-cream/40"
                />
                <input
                  type="text"
                  placeholder="Head Chef / GM Name"
                  aria-label="Head Chef / GM Name"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="glass-input rounded-xl px-3.5 py-3 text-xs text-cream placeholder:text-cream/40"
                />
                <input
                  type="email"
                  required
                  placeholder="Work Email Address"
                  aria-label="Work Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="glass-input rounded-xl px-3.5 py-3 text-xs text-cream placeholder:text-cream/40"
                />
                <input
                  type="tel"
                  required
                  placeholder="Direct Mobile / Kitchen Phone"
                  aria-label="Direct Mobile / Kitchen Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="glass-input rounded-xl px-3.5 py-3 text-xs text-cream placeholder:text-cream/40"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-obsidian-950 bg-gradient-to-r from-[#FFF4D0] via-[#E4C767] to-[#C9A227] hover:brightness-105 shadow-[0_8px_30px_rgba(228,199,103,0.35)] flex items-center justify-center gap-2.5 text-sm sm:text-base uppercase tracking-wider transition-all"
              >
                <span>Generate Tailored Sector Price Matrix &amp; Open Account</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-cream/60 pt-1 font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> No-commitment quote
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 text-champagne">
                  <Clock className="w-3.5 h-3.5" /> 30-min Account Desk SLA
                </span>
                <span>&bull;</span>
                <span>Includes dedicated account manager</span>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center py-10 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
              Your Customized Price List Has Been Prepared
            </h3>
            <p className="text-sm sm:text-base text-cream/75 max-w-lg mx-auto leading-relaxed">
              We have assigned your enquiry to our Digbeth Commercial Desk. Your dedicated account manager will transmit your tailored wholesale pricing schedule for <span className="text-champagne font-semibold">{formData.companyName}</span> within 30 minutes.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="/login"
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-champagne to-champagne-soft text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110"
              >
                Sign In to Customer Portal
              </a>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-xl border border-champagne/30 text-cream/80 text-xs font-semibold hover:text-champagne hover:border-champagne"
              >
                Calculate Another Kitchen Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
