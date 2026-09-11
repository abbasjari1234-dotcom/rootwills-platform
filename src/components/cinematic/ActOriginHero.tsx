'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ShieldCheck, Award, Truck, Clock } from 'lucide-react';

export function ActOriginHero() {
  return (
    <section
      id="act-origin"
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

      {/* === ATMOSPHERIC DEPTH GRADIENT & LUXURY LIGHTING === */}
      <div
        className="act-origin-atmosphere absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg,
              rgba(2,23,16,0.72) 0%,
              rgba(2,23,16,0.20) 25%,
              rgba(2,23,16,0.10) 45%,
              rgba(2,23,16,0.65) 75%,
              rgba(2,23,16,0.98) 100%
            ),
            radial-gradient(ellipse at 50% 42%, rgba(228,199,103,0.14) 0%, rgba(16,185,129,0.08) 38%, transparent 72%)
          `,
        }}
      />

      {/* === CINEMATIC VIGNETTE === */}
      <div className="cinematic-vignette" />

      {/* === DOT GRID TEXTURE (adds depth) === */}
      <div className="absolute inset-0 dot-grid-texture opacity-25 pointer-events-none" />

      {/* === FOREGROUND CONTENT === */}
      <div className="act-origin-content relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Establishment Capsule Label */}
        <div className="act-origin-label inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-obsidian-950/70 backdrop-blur-md border border-champagne/25 shadow-sm text-champagne font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.32em] mb-4 sm:mb-6 font-semibold max-w-[92vw]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)] shrink-0" />
          <span className="truncate">Digbeth, Birmingham &bull; Wholesale Foodservice</span>
        </div>

        {/* Main Title — Sculpted Royal British Gold Typography */}
        <h1 className="act-origin-title font-display font-black uppercase leading-[0.84] tracking-[0.02em] select-none">
          <span className="block text-[44px] xs:text-[52px] sm:text-[84px] md:text-[116px] lg:text-[144px] xl:text-[164px] bg-gradient-to-b from-[#FFFFFF] via-[#F6E199] to-[#C59B27] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(228,199,103,0.35)] drop-shadow-[0_12px_45px_rgba(0,0,0,0.9)]">
            ROOTWILLS
          </span>
        </h1>

        {/* Decorative Divider — Gold Monogram Lozenge */}
        <div className="act-origin-divider flex items-center justify-center gap-3 my-4 sm:my-6">
          <div className="w-16 sm:w-28 h-px bg-gradient-to-r from-transparent via-champagne/50 to-champagne/80" />
          <div className="w-2 h-2 rotate-45 border border-champagne bg-champagne/50 shadow-[0_0_10px_rgba(228,199,103,0.7)]" />
          <div className="w-16 sm:w-28 h-px bg-gradient-to-l from-transparent via-champagne/50 to-champagne/80" />
        </div>

        {/* Subtitle */}
        <p className="act-origin-subtitle text-cream/90 text-sm sm:text-base lg:text-lg font-sans max-w-xl leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Premier UK commercial fresh produce &amp; cold-chain distribution
          <br className="hidden sm:block" />
          engineered for Michelin kitchens, luxury hotels &amp; volume brigades.
        </p>

        {/* CTA Buttons */}
        <div className="act-origin-cta mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            href="/apply"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#FFF4D0] via-[#E4C767] to-[#C9A227] text-obsidian-950 font-sans font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-[0_8px_30px_rgba(228,199,103,0.4)] hover:shadow-[0_0_45px_rgba(228,199,103,0.7)] hover:brightness-105 transition-all duration-300 hover:scale-[1.03] w-full sm:w-auto"
          >
            <span>Open Trade Account</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 bg-obsidian-950/70 backdrop-blur-md border border-champagne/30 text-cream hover:text-champagne hover:border-champagne hover:bg-emerald-950/50 font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
          >
            <span>View Catalogue</span>
          </Link>
        </div>

        {/* Trust Badges — Sleek High-Legibility Micro-Strip */}
        <div className="act-origin-badges mt-8 sm:mt-12 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-5 py-2.5 rounded-2xl bg-obsidian-950/75 backdrop-blur-md border border-champagne/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-cream font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-medium">
          <span className="flex items-center gap-1.5 text-champagne font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>BRCGS Grade AA</span>
          </span>
          <span className="text-champagne/40">&bull;</span>
          <span className="flex items-center gap-1.5 text-cream/90 font-semibold">
            <Award className="w-3.5 h-3.5 text-champagne shrink-0" />
            <span>SALSA Certified</span>
          </span>
          <span className="text-champagne/40 hidden sm:inline">&bull;</span>
          <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
            <Truck className="w-3.5 h-3.5 shrink-0" />
            <span>06:00 AM SLA</span>
          </span>
          <span className="text-champagne/40 hidden md:inline">&bull;</span>
          <span className="flex items-center gap-1.5 text-champagne/90 hidden md:inline-flex font-semibold">
            <Clock className="w-3.5 h-3.5 shrink-0 text-champagne" />
            <span>11:00 PM Cut-off</span>
          </span>
        </div>
      </div>

      {/* === SCROLL INDICATOR === */}
      <div className="act-origin-scroll absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
        <div className="px-4 py-1.5 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-champagne/25 text-champagne font-mono text-[9px] uppercase tracking-[0.28em] font-bold flex items-center gap-2 shadow-lg">
          <span>Scroll to Journey</span>
          <ChevronDown className="w-3.5 h-3.5 text-champagne animate-bounce" />
        </div>
      </div>

      {/* === TRANSITION EXIT OVERLAY (GSAP animates opacity 0→1) === */}
      <div className="act-origin-exit absolute inset-0 bg-[#021710] opacity-0 z-20 pointer-events-none will-change-[opacity]" />
    </section>
  );
}
