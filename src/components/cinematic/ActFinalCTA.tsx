'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, PhoneCall } from 'lucide-react';

export function ActFinalCTA() {
  return (
    <section
      className="act-cta relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: '100vh', perspective: '800px' }}
    >
      {/* Ambient background — enhanced */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 40%, rgba(228,199,103,0.08) 0%, transparent 55%),
            radial-gradient(ellipse at 30% 70%, rgba(16,185,129,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 30%, rgba(228,199,103,0.04) 0%, transparent 40%),
            linear-gradient(180deg, #021710 0%, #041E16 50%, #021710 100%)
          `,
        }}
      />

      {/* Cinematic vignette */}
      <div className="cinematic-vignette" />

      {/* Section fade-in */}
      <div className="section-fade-in" />

      {/* Floating ambient orbs */}
      <div className="ambient-orb ambient-orb-gold" style={{ width: '400px', height: '400px', top: '25%', left: '10%', animationDelay: '0s' }} />
      <div className="ambient-orb ambient-orb-emerald" style={{ width: '300px', height: '300px', bottom: '20%', right: '5%', animationDelay: '5s' }} />

      <div className="act-cta-content relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto py-20">
        {/* Pulse rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] pulse-ring pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] pulse-ring pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* Decorative ornament */}
        <div className="act-cta-ornament mb-8 flex justify-center">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-champagne/40 to-champagne/15" />
        </div>

        {/* Main headline */}
        <h2 className="act-cta-title font-display text-3xl sm:text-5xl lg:text-7xl font-black uppercase leading-[0.88] tracking-tight">
          <span className="block text-cream">Ready to Elevate</span>
          <span className="block gold-shimmer-text mt-2 sm:mt-3">Your Kitchen?</span>
        </h2>

        {/* Subtitle */}
        <p className="act-cta-subtitle mt-6 sm:mt-8 text-cream/45 text-sm sm:text-base lg:text-lg font-sans max-w-xl mx-auto leading-relaxed">
          Join over 500 professional kitchens across the UK who trust Rootwills
          for daily fresh produce delivery before 6:00 AM.
        </p>

        {/* CTA Buttons */}
        <div className="act-cta-buttons mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/apply"
            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-champagne to-champagne-soft text-obsidian-950 font-sans font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl shadow-gold-glow hover:shadow-[0_0_60px_rgba(228,199,103,0.7)] transition-all duration-500 hover:scale-[1.04]"
          >
            Open Your 30-Day Trade Account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 border border-cream/20 text-cream/75 font-sans font-semibold text-xs sm:text-sm uppercase tracking-widest rounded-xl hover:border-champagne/50 hover:text-champagne hover:bg-champagne/5 transition-all duration-400"
          >
            <PhoneCall className="w-4 h-4" />
            Speak to Our Team
          </Link>
        </div>

        {/* Trust stats */}
        <div className="act-cta-stats mt-14 sm:mt-16 grid grid-cols-3 gap-6 sm:gap-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-display font-black text-cream stat-glow-gold">500+</div>
            <div className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.2em] text-cream/30 mt-1">
              Trade Clients
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-display font-black text-champagne stat-glow-gold">6 AM</div>
            <div className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.2em] text-cream/30 mt-1">
              Daily Delivery
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-display font-black text-emerald-400 stat-glow">99.2%</div>
            <div className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.2em] text-cream/30 mt-1">
              Fill Rate
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-14 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-champagne/30" />
            <div className="w-1 h-1 rounded-full bg-champagne/40" />
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-champagne/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
