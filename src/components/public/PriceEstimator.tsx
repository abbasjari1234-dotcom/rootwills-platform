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
    <div className="pricing-calculator bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Wholesale Commercial Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your Kitchen&apos;s Direct Wholesale Savings
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Compare Rootwills single-estate direct sourcing, locked tier contracts, and 0% split-delivery surcharges against standard foodservice distributors.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Sector Selection Chips */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-bold mb-3">
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
                      className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                        isLastOdd ? 'col-span-2 sm:col-span-1' : ''
                      } ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                      <span className="text-xs font-bold">{s.name}</span>
                      <span className={`text-[10px] font-mono font-semibold ${isSelected ? 'text-emerald-100' : 'text-emerald-600'}`}>
                        ~{(s.savingRate * 100).toFixed(0)}% avg save
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Interactive Spend Range */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label htmlFor="spend-range" className="text-xs font-mono uppercase tracking-wider text-slate-800 font-bold block">
                    2. Estimated Weekly Food &amp; Fresh Produce Spend
                  </label>
                  <span className="text-[11px] text-slate-500">Includes fresh produce, butchery, dairy, bakery &amp; dry goods</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    £{weeklySpend.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-slate-500 uppercase">/ week</span>
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
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>£500</span>
                  <span>£5,000</span>
                  <span>£10,000</span>
                  <span>£15,000</span>
                  <span>£20,000+</span>
                </div>
              </div>

              {/* Quick spend shortcut chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-mono uppercase text-slate-500 font-semibold">Quick Pick:</span>
                {SPEND_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setWeeklySpend(preset.value)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                      weeklySpend === preset.value
                        ? 'bg-slate-900 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Live ROI & Value Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-sm text-center relative overflow-hidden">
                <div className="text-[11px] text-slate-500 uppercase font-mono tracking-wider font-semibold">Estimated Monthly Savings</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5">
                  £{monthlySavings.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-center gap-1">
                  <Percent className="w-3 h-3 text-emerald-600" />
                  <span>Direct grower pricing tier</span>
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-emerald-50 border border-emerald-200 text-center relative overflow-hidden">
                <div className="text-[11px] text-emerald-800 uppercase font-mono tracking-wider font-bold">Projected Annual Retained Profit</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1.5">
                  £{estimatedAnnualSavings.toLocaleString()} / yr
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Retained kitchen margin</span>
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-sm text-center relative overflow-hidden">
                <div className="text-[11px] text-slate-500 uppercase font-mono tracking-wider font-semibold">Zero Surcharge Advantage</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5">
                  +£{splitSurchargeSavings.toLocaleString()} / yr
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-center gap-1">
                  <Truck className="w-3 h-3 text-emerald-600" />
                  <span>0% split delivery fee</span>
                </div>
              </div>
            </div>

            {/* 4. Instant Quote Request Form */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
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
                  className="rounded-xl px-3.5 py-3 text-sm bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <input
                  type="text"
                  placeholder="Head Chef / GM Name"
                  aria-label="Head Chef / GM Name"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="rounded-xl px-3.5 py-3 text-sm bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <input
                  type="email"
                  required
                  placeholder="Work Email Address"
                  aria-label="Work Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl px-3.5 py-3 text-sm bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <input
                  type="tel"
                  required
                  placeholder="Direct Phone Number"
                  aria-label="Direct Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="rounded-xl px-3.5 py-3 text-sm bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center justify-center gap-2.5 text-sm sm:text-base uppercase tracking-wider transition-all"
              >
                <span>Generate Tailored Sector Price Matrix &amp; Open Account</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> No-commitment quote
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Clock className="w-4 h-4 text-emerald-600" /> 30-min Account Desk SLA
                </span>
                <span>&bull;</span>
                <span className="font-medium text-slate-700">Includes dedicated account manager</span>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center py-10 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Your Customized Price List Has Been Prepared
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              We have assigned your enquiry to our Digbeth Commercial Desk. Your dedicated account manager will transmit your tailored wholesale pricing schedule for <span className="font-bold text-slate-900">{formData.companyName}</span> within 30 minutes.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="/login"
                className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Sign In to Customer Portal
              </a>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-3.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
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
