'use client';

import React, { useState } from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
import { Sparkles, ArrowRight, CheckCircle2, Building2, Phone, Mail, User } from 'lucide-react';
import { Sector } from '@/types/onboarding';

export function PriceEstimator() {
  const addLead = useDemoStore((state) => state.addLead);
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

  // Calculate estimated monthly savings (typical 8-15% B2B savings)
  const annualSpend = weeklySpend * 52;
  const estimatedAnnualSavings = Math.round(annualSpend * 0.12);
  const monthlySavings = Math.round(estimatedAnnualSavings / 12);

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
      assignedSalesRep: 'Marcus Vance',
      notes: `Instant price quote generated online. Weekly spend: £${weeklySpend.toLocaleString()}. Estimated annual savings: £${estimatedAnnualSavings.toLocaleString()}.`,
    });

    setSubmitted(true);
  };

  return (
    <div id="pricing-calculator" className="glass-panel-gold rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-champagne/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Trade Pricing Calculator</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream">
            Calculate Your Commercial Foodservice Savings
          </h2>
          <p className="text-sm text-cream/75 max-w-lg mx-auto">
            See how much your kitchen could save with Rootwills tiered wholesale pricing, direct farm sourcing, and 0% split-delivery surcharges.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Sector selector */}
              <div>
                <label htmlFor="sector-select" className="block text-xs font-mono uppercase tracking-wider text-cream/80 mb-2">
                  Select Your Business Sector
                </label>
                <select
                  id="sector-select"
                  aria-label="Select Your Business Sector"
                  value={sector}
                  onChange={(e) => setSector(e.target.value as Sector)}
                  className="w-full bg-obsidian-900 border border-cream/20 rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-champagne"
                >
                  <option value="fine_dining">Fine Dining & Chef-Led Restaurant</option>
                  <option value="boutique_hotel">Boutique Hotel & Banqueting</option>
                  <option value="care_homes">Care Home / Healthcare Facility</option>
                  <option value="luxury_catering">Luxury Event Catering</option>
                  <option value="pubs_bars">Gastropub / High Volume Bar</option>
                  <option value="artisan_cafe">Artisan Bakery & Specialty Café</option>
                </select>
              </div>

              {/* Weekly spend slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="spend-range" className="text-xs font-mono uppercase tracking-wider text-cream/80">
                    Est. Weekly Food & Produce Spend
                  </label>
                  <span className="text-sm font-bold text-champagne font-mono">
                    £{weeklySpend.toLocaleString()} / week
                  </span>
                </div>
                <input
                  id="spend-range"
                  aria-label="Estimated Weekly Food & Produce Spend"
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={weeklySpend}
                  onChange={(e) => setWeeklySpend(Number(e.target.value))}
                  className="w-full h-2 bg-obsidian-800 rounded-lg appearance-none cursor-pointer accent-champagne"
                />
                <div className="flex justify-between text-[11px] text-cream/70 mt-1 font-mono">
                  <span>£500</span>
                  <span>£5,000</span>
                  <span>£10,000</span>
                  <span>£15,000+</span>
                </div>
              </div>
            </div>

            {/* Savings preview cards */}
            <div className="grid grid-cols-2 gap-4 bg-obsidian-950/80 border border-cream/10 rounded-xl p-4 sm:p-6 text-center">
              <div>
                <div className="text-xs text-cream/70 uppercase font-mono">Estimated Monthly Savings</div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-champagne mt-1">
                  £{monthlySavings.toLocaleString()}
                </div>
                <div className="text-[11px] text-cream/70 mt-0.5">based on ~12% direct-tier pricing</div>
              </div>
              <div className="border-l border-cream/10">
                <div className="text-xs text-cream/70 uppercase font-mono">Projected Annual Bottom-Line</div>
                <div className="text-2xl sm:text-3xl font-bold font-display emerald-gradient-text mt-1">
                  £{estimatedAnnualSavings.toLocaleString()} / yr
                </div>
                <div className="text-[11px] text-emerald-400/90 mt-0.5">retained gross kitchen profit</div>
              </div>
            </div>

            {/* Contact inputs for instant quote */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <input
                type="text"
                required
                placeholder="Business Name (e.g. San Carlo)"
                aria-label="Business Name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="bg-obsidian-900 border border-cream/20 rounded-lg px-3.5 py-2.5 text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-champagne"
              />
              <input
                type="text"
                placeholder="Contact Name / Role"
                aria-label="Contact Name / Role"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="bg-obsidian-900 border border-cream/20 rounded-lg px-3.5 py-2.5 text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-champagne"
              />
              <input
                type="email"
                required
                placeholder="Work Email Address"
                aria-label="Work Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-obsidian-900 border border-cream/20 rounded-lg px-3.5 py-2.5 text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-champagne"
              />
              <input
                type="tel"
                required
                placeholder="Telephone / Mobile"
                aria-label="Telephone / Mobile"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-obsidian-900 border border-cream/20 rounded-lg px-3.5 py-2.5 text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-champagne"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-2 text-sm sm:text-base transition-all"
            >
              <span>Get My Custom Sector Price List & Open Trade Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-[11px] text-cream/70">
              No obligation. We will assign your dedicated account manager and email your tailored wholesale price matrix within 30 minutes.
            </p>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-cream">
              Thank You! Your Price List Request Has Been Generated
            </h3>
            <p className="text-sm text-cream/75 max-w-md mx-auto">
              We have dispatched your quotation enquiry to our Midlands Commercial Desk. Your dedicated account manager, <strong>Marcus Vance</strong>, is reviewing your custom contract tier.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="/login"
                className="px-6 py-2.5 rounded-lg bg-champagne text-obsidian-950 font-semibold text-xs shadow-gold-glow hover:brightness-110"
              >
                Access Customer Demo Portal
              </a>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-lg border border-cream/20 text-cream/80 text-xs hover:text-cream"
              >
                Calculate Another Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
