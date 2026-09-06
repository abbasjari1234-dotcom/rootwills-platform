'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, PhoneCall, ShieldCheck, CheckCircle2, Award, Sparkles } from 'lucide-react';

export function ActFinalCTA() {
  return (
    <section className="act-cta relative w-full overflow-hidden py-14 sm:py-20 lg:py-24 bg-[#02140e] flex items-center justify-center">
      {/* Ambient background lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(228,199,103,0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 25% 60%, rgba(16,185,129,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 40%, rgba(228,199,103,0.06) 0%, transparent 50%),
            linear-gradient(180deg, #02140e 0%, #032017 50%, #02140e 100%)
          `,
        }}
      />

      {/* High-tech fine grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4c76708_1px,transparent_1px),linear-gradient(to_bottom,#e4c76708_1px,transparent_1px)] bg-[size:36px_36px] opacity-35 pointer-events-none" />

      {/* Seamless top blend from Act V */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#02140e] to-transparent pointer-events-none z-[5]" />

      <div className="act-cta-content relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full">
        {/* Executive Provenance & Commercial Badge */}
        <div className="act-cta-ornament inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-900/90 border border-champagne/35 text-champagne text-[11px] font-mono uppercase tracking-[0.25em] font-semibold mb-6 shadow-[0_0_25px_rgba(228,199,103,0.18)]">
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span>Commercial Onboarding &bull; Instant 30-Day Credit Pass</span>
        </div>

        {/* Main headline */}
        <h2 className="act-cta-title font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.92] tracking-tight text-cream">
          Ready to Elevate
          <br />
          <span className="gold-gradient-text">Your Kitchen?</span>
        </h2>

        {/* Subtitle */}
        <p className="act-cta-subtitle mt-5 text-cream/80 text-sm sm:text-base lg:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
          Join over 500 Michelin restaurants, luxury hotels, and premier culinary groups who rely on Rootwills for daily fresh produce delivered before 06:00 AM.
        </p>

        {/* CTA Buttons */}
        <div className="act-cta-buttons mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/apply"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-champagne via-[#F5E498] to-[#D4AF37] text-obsidian-950 font-sans font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_0_35px_rgba(228,199,103,0.5)] hover:scale-[1.02] transition-all duration-300 shadow-royal-depth"
          >
            <span>Open 30-Day Trade Account</span>
            <ArrowRight className="w-4 h-4 text-obsidian-950 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-obsidian-900/80 border border-champagne/35 text-champagne font-mono text-xs uppercase tracking-wider font-semibold hover:border-champagne hover:bg-obsidian-900 transition-all"
          >
            <PhoneCall className="w-4 h-4 text-champagne" />
            <span>Speak with Wholesale Team</span>
          </Link>
        </div>

        {/* High-Contrast Trust stats */}
        <div className="act-cta-stats mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
          <div className="glass-panel rounded-xl p-4 border border-champagne/20 text-center">
            <div className="text-2xl sm:text-3xl font-display font-black text-cream">500+</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold mt-0.5">
              Active Trade Clients
            </div>
            <div className="text-[9px] font-sans text-cream/50 mt-1">Michelin &amp; Luxury Estates</div>
          </div>
          <div className="glass-panel rounded-xl p-4 border border-champagne/20 text-center">
            <div className="text-2xl sm:text-3xl font-display font-black text-champagne">06:00 AM</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-champagne font-bold mt-0.5">
              Daily Delivery SLA
            </div>
            <div className="text-[9px] font-sans text-cream/50 mt-1">Pre-Service Kitchen Pass</div>
          </div>
          <div className="glass-panel rounded-xl p-4 border border-champagne/20 text-center">
            <div className="text-2xl sm:text-3xl font-display font-black text-emerald-400">99.8%</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold mt-0.5">
              Order Fill Rate
            </div>
            <div className="text-[9px] font-sans text-cream/50 mt-1">Zero Incomplete Drops</div>
          </div>
        </div>

        {/* Commercial Trust Guarantees */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-cream/60">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Direct Farm Invoicing
          </span>
          <span className="text-champagne/40 hidden sm:inline">&bull;</span>
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            Dedicated Account Director
          </span>
          <span className="text-champagne/40 hidden sm:inline">&bull;</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            No Contract Lock-in
          </span>
        </div>

      </div>
    </section>
  );
}
