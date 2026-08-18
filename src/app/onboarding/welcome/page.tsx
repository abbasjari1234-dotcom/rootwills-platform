'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Truck, Lock, Building2 } from 'lucide-react';

export default function OnboardingWelcomePage() {
  return (
    <div className="min-h-screen bg-obsidian-950 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,39,0.12),_transparent_70%)] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full text-center space-y-8 animate-fade-in">
        {/* Glow Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-champagne/10 border border-champagne/40 text-champagne shadow-gold-glow mx-auto">
          <CheckCircle2 className="w-10 h-10 text-champagne" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRADE ACCOUNT APPROVED & PROVISIONED</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-cream">
            Welcome to Rootwills Foodservice
          </h1>
          <p className="text-sm text-cream/70 max-w-md mx-auto leading-relaxed">
            Your commercial trade account has been provisioned with 30-day invoicing terms and early morning kitchen delivery access.
          </p>
        </div>

        {/* Feature Highlights Card */}
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 text-left space-y-4 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-champagne/10 border border-champagne/30 text-champagne flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-cream text-sm">Instant Ordering Access</div>
              <p className="text-cream/60 text-xs mt-0.5">
                Your credentials are ready. You can now log into your Chef & Purchasing portal with the email and password you just created.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-champagne/10 border border-champagne/30 text-champagne flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-cream text-sm">Direct Depot Routing</div>
              <p className="text-cream/60 text-xs mt-0.5">
                Your kitchen postcode has been assigned to your regional Rootwills refrigerated hub for 06:00 AM delivery slots.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="space-y-3 pt-2">
          <Link
            href="/login"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold shadow-gold-glow hover:brightness-110 text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to Your Customer Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/products"
            className="inline-block text-xs font-mono text-cream/50 hover:text-champagne transition-colors"
          >
            &larr; Preview Public Wholesale Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
