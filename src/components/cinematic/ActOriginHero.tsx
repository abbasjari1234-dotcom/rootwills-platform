'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function ActOriginHero() {
  return (
    <section
      className="act-origin relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      {/* === DEEP BACKGROUND LAYER (GSAP parallax target) === */}
      <div className="act-origin-bg absolute inset-[-10%] will-change-transform">
        <Image
          src="/images/branded/rootwills_hero_panoramic.jpg"
          alt="Rootwills premium fresh produce warehouse"
          fill
          className="object-cover"
          priority
          sizes="120vw"
          quality={90}
        />
      </div>

      {/* === ATMOSPHERIC DEPTH GRADIENT === */}
      <div
        className="act-origin-atmosphere absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg,
              rgba(2,23,16,0.65) 0%,
              rgba(2,23,16,0.15) 25%,
              rgba(2,23,16,0.05) 45%,
              rgba(2,23,16,0.55) 75%,
              rgba(2,23,16,0.95) 100%
            ),
            radial-gradient(ellipse at 50% 35%, rgba(16,185,129,0.07) 0%, transparent 65%)
          `,
        }}
      />

      {/* === CINEMATIC VIGNETTE === */}
      <div className="cinematic-vignette" />

      {/* === DOT GRID TEXTURE (adds depth) === */}
      <div className="absolute inset-0 dot-grid-texture opacity-30 pointer-events-none" />

      {/* === FLOATING AMBIENT GLOW ORBS === */}
      <div
        className="ambient-orb ambient-orb-emerald"
        style={{ width: '400px', height: '400px', top: '10%', left: '-5%', animationDelay: '0s' }}
      />
      <div
        className="ambient-orb ambient-orb-gold"
        style={{ width: '300px', height: '300px', top: '60%', right: '-3%', animationDelay: '4s' }}
      />
      <div
        className="ambient-orb ambient-orb-emerald"
        style={{ width: '250px', height: '250px', bottom: '5%', left: '40%', animationDelay: '8s', opacity: 0.2 }}
      />

      {/* === FOREGROUND CONTENT === */}
      <div className="act-origin-content relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        {/* Animated pulse ring behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] pulse-ring pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[520px] sm:h-[520px] lg:w-[700px] lg:h-[700px] pulse-ring pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* Establishment Label */}
        <div className="act-origin-label font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.35em] text-champagne/70 mb-4 sm:mb-6 font-semibold">
          Digbeth, Birmingham &bull; Premium Foodservice Distribution
        </div>

        {/* Main Title — Large cinematic typography with shimmer */}
        <h1 className="act-origin-title font-display font-black uppercase leading-[0.82] tracking-[-0.02em]">
          <span className="block text-[52px] sm:text-[80px] md:text-[110px] lg:text-[140px] xl:text-[160px] gold-shimmer-text drop-shadow-[0_4px_30px_rgba(228,199,103,0.3)]">
            ROOTWILLS
          </span>
        </h1>

        {/* Decorative Divider — Enhanced with glow */}
        <div className="act-origin-divider flex items-center gap-3 my-5 sm:my-7">
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-champagne/40 to-champagne/60" />
          <div className="w-2 h-2 rounded-full bg-champagne/80 shadow-[0_0_12px_rgba(228,199,103,0.6)]" />
          <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent via-champagne/40 to-champagne/60" />
        </div>

        {/* Subtitle */}
        <p className="act-origin-subtitle text-cream/75 text-sm sm:text-base lg:text-lg font-sans max-w-lg leading-relaxed font-light">
          Premier UK fresh food distribution &amp; cold-chain logistics
          <br className="hidden sm:block" />
          for professional kitchens.
        </p>

        {/* CTA Buttons — Enhanced with glow */}
        <div className="act-origin-cta mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href="/apply"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-champagne to-champagne-soft text-obsidian-950 font-sans font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl shadow-gold-glow hover:shadow-[0_0_60px_rgba(228,199,103,0.7)] transition-all duration-500 hover:scale-[1.04]"
          >
            Open Trade Account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-cream/25 text-cream/85 font-sans font-semibold text-xs sm:text-sm uppercase tracking-widest rounded-xl hover:border-champagne/60 hover:text-champagne hover:bg-champagne/5 hover:shadow-[0_0_25px_rgba(228,199,103,0.15)] transition-all duration-500"
          >
            View Catalogue
          </Link>
        </div>

        {/* Trust micro-badges */}
        <div className="act-origin-badges mt-10 sm:mt-14 flex items-center gap-4 sm:gap-6 text-cream/40 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em]">
          <span>BRCGS Grade AA</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500/60 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
          <span>SALSA Certified</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500/60 shadow-[0_0_6px_rgba(16,185,129,0.4)] hidden sm:block" />
          <span className="hidden sm:inline">6AM Delivery</span>
        </div>
      </div>

      {/* === SCROLL INDICATOR === */}
      <div className="act-origin-scroll absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-cream/40">Scroll</span>
        <ChevronDown className="w-4 h-4 text-cream/40 animate-bounce" />
      </div>

      {/* === TRANSITION EXIT OVERLAY (GSAP animates opacity 0→1) === */}
      <div className="act-origin-exit absolute inset-0 bg-[#021710] opacity-0 z-20 pointer-events-none will-change-[opacity]" />
    </section>
  );
}
