'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Clock, ShieldCheck, Building2, PhoneCall } from 'lucide-react';

export default function OnboardingConciergeReviewPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,39,0.12),_transparent_70%)] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full text-center space-y-8 animate-fade-in">
        {/* Glow Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-champagne/10 border border-champagne/40 text-champagne shadow-gold-glow mx-auto">
          <Building2 className="w-10 h-10 text-champagne" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>ENTERPRISE CONCIERGE REVIEW</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-cream">
            Application Received
          </h1>
          <p className="text-sm text-cream/70 max-w-md mx-auto leading-relaxed">
            Due to your high-volume requirements and bespoke credit tier request, your application has been assigned to our Senior Commercial Team for custom rate locking.
          </p>
        </div>

        {/* What Happens Next Card */}
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 text-left space-y-4 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-champagne/10 border border-champagne/30 text-champagne flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-cream text-sm">Dedicated Account Manager</div>
              <p className="text-cream/60 text-xs mt-0.5">
                Our Senior Commercial Account Manager will contact you within 2 business hours to verify your locked contract rates.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-champagne/10 border border-champagne/30 text-champagne flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-cream text-sm">Credit Line Underwriting</div>
              <p className="text-cream/60 text-xs mt-0.5">
                Your trade credit facility will be active as soon as review is completed, and you can log in with your selected password.
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
            <span>Proceed to Login Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-block text-xs font-mono text-cream/50 hover:text-champagne transition-colors"
          >
            &larr; Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
