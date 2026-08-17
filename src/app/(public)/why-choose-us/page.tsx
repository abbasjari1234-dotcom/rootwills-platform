import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Repeat, TrendingUp, Clock, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

export const metadata = {
  title: 'Why Choose Rootwills | Technology-Driven Foodservice Wholesaler',
  description: 'Discover why leading Michelin kitchens, luxury hotel groups, and care operators choose Rootwills as their primary UK fresh produce and foodservice partner.',
};

export default function WhyChooseUsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase">
          <Award className="w-3.5 h-3.5" />
          <span>The Rootwills Difference</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream">
          Built to Solve the 5 Biggest Frustrations with Food Suppliers
        </h1>
        <p className="text-sm sm:text-base text-cream/70 leading-relaxed">
          We analyzed what chefs, catering directors, and finance teams dislike most about legacy foodservice suppliers — and engineered a modern platform to fix it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-2xl space-y-4">
          <div className="w-10 h-10 rounded-lg bg-champagne/10 text-champagne font-bold font-display text-lg flex items-center justify-center">
            01
          </div>
          <h3 className="font-display text-xl font-bold text-cream">No Volatile "Market Price" Surprises</h3>
          <p className="text-xs text-cream/65 leading-relaxed">
            Legacy wholesalers fluctuate daily prices without warning. With Rootwills, your trade account is locked to fixed weekly or monthly contract rates, preserving your kitchen gross profit margins.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl space-y-4">
          <div className="w-10 h-10 rounded-lg bg-champagne/10 text-champagne font-bold font-display text-lg flex items-center justify-center">
            02
          </div>
          <h3 className="font-display text-xl font-bold text-cream">Late 11:00 PM Order Cut-off</h3>
          <p className="text-xs text-cream/65 leading-relaxed">
            Most broadliners cut off orders at 5:00 PM when lunch service is barely finished. Our modern automated picking system lets you submit your daily orders via portal right after dinner service closes.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl space-y-4">
          <div className="w-10 h-10 rounded-lg bg-champagne/10 text-champagne font-bold font-display text-lg flex items-center justify-center">
            03
          </div>
          <h3 className="font-display text-xl font-bold text-cream">1-Click "Repeat Last Order" Workflow</h3>
          <p className="text-xs text-cream/65 leading-relaxed">
            No more scribbling lists on clipboards or leaving 15-minute midnight voicemails. Pull up yesterday's order on your phone, change a couple of crate counts, and confirm in under 45 seconds.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl space-y-4">
          <div className="w-10 h-10 rounded-lg bg-champagne/10 text-champagne font-bold font-display text-lg flex items-center justify-center">
            04
          </div>
          <h3 className="font-display text-xl font-bold text-cream">Zero Split-Delivery Fees or Fuel Surcharges</h3>
          <p className="text-xs text-cream/65 leading-relaxed">
            Transparent pricing with no unexpected line-item delivery surcharges or hidden environmental levies on your monthly invoices.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="glass-panel-gold p-8 sm:p-12 rounded-3xl text-center space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream">
          Experience the Modern Way to Buy Wholesale Food
        </h2>
        <p className="text-xs sm:text-sm text-cream/70 max-w-xl mx-auto">
          Join hundreds of professional culinary kitchens across Birmingham and the UK who have streamlined their supply chain with Rootwills.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/onboarding"
            className="px-8 py-3.5 rounded-xl font-bold text-obsidian-950 bg-champagne shadow-gold-glow hover:brightness-110 text-sm flex items-center gap-2"
          >
            <span>Open Business Account Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
