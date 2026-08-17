import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';

export default function OnboardingWelcomePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full glass-panel-gold rounded-3xl p-8 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-emerald-glow">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1 text-[11px] font-mono uppercase text-champagne font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Provisioning Complete</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-cream">
            Welcome to Rootwills
          </h1>
          <p className="text-xs text-cream/70 leading-relaxed">
            Your trade account has been provisioned and linked to our Birmingham Central Fulfilment Hub. Your contract pricing is now active.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-obsidian-950 border border-cream/10 text-xs text-left space-y-1.5 font-mono">
          <div className="flex justify-between text-cream/70">
            <span>Trade Credit Tier:</span>
            <span className="text-champagne font-bold">Standard Trade (30 Days)</span>
          </div>
          <div className="flex justify-between text-cream/70">
            <span>Morning Cut-off:</span>
            <span className="text-cream">11:00 PM Tonight</span>
          </div>
          <div className="flex justify-between text-cream/70">
            <span>Assigned Depot:</span>
            <span className="text-emerald-400">Birmingham (Digbeth)</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="w-full py-3.5 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Enter Customer Ordering Portal</span>
          </Link>
          <Link
            href="/"
            className="text-xs text-cream/50 hover:text-cream"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
