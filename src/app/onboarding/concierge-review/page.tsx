import React from 'react';
import Link from 'next/link';
import { Clock, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function OnboardingConciergeReviewPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full glass-panel rounded-3xl p-8 text-center space-y-6 shadow-2xl border border-cream/20">
        <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne/30 text-champagne flex items-center justify-center mx-auto shadow-gold-glow">
          <Clock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1 text-[11px] font-mono uppercase text-champagne font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Commercial Concierge Review</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-cream">
            Application Received
          </h1>
          <p className="text-xs text-cream/70 leading-relaxed">
            Due to your estimated spend volume and multi-site requirements, our Senior Commercial Account Manager is reviewing your bespoke contract pricing and credit facility.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-obsidian-950 border border-cream/10 text-xs text-left space-y-2">
          <div className="text-champagne font-bold">What happens next?</div>
          <p className="text-[11px] text-cream/70 leading-relaxed">
            1. Your dedicated account lead (<strong>Marcus Vance</strong>) will contact you within 30 minutes to confirm your morning delivery requirements.<br />
            2. Your customized price list will be activated.<br />
            3. You will receive direct portal login credentials by SMS/Email.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full py-3.5 rounded-xl bg-obsidian-900 border border-champagne/40 text-champagne font-bold text-xs hover:bg-champagne hover:text-obsidian-950 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Demo Customer Portal &rarr;</span>
          </Link>
          <Link
            href="/"
            className="text-xs text-cream/50 hover:text-cream"
          >
            Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
