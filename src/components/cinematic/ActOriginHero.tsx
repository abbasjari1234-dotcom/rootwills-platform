'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronDown, 
  ShieldCheck, 
  Award, 
  Truck, 
  Clock 
} from 'lucide-react';

export function ActOriginHero() {
  return (
    <section
      className="act-origin relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '640px' }}
    >
      {/* === DEEP BACKGROUND LAYER (GSAP parallax target) === */}
      <div className="act-origin-bg absolute inset-[-10%] will-change-transform">
        <Image
          src="/images/branded/rootwills_hero_panoramic.jpg"
          alt="Rootwills premium fresh produce harvest and panoramic countryside"
          fill
          className="object-cover"
          priority
          sizes="120vw"
          quality={95}
        />
      </div>

      {/* === ATMOSPHERIC DEPTH GRADIENT & HIGH-CONTRAST LIGHTING === */}
      <div
        className="act-origin-atmosphere absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 75% 60% at 50% 44%, rgba(2,23,16,0.72) 0%, rgba(2,23,16,0.48) 55%, transparent 100%),
            linear-gradient(180deg,
              rgba(2,23,16,0.85) 0%,
              rgba(2,23,16,0.35) 18%,
              rgba(2,23,16,0.2) 35%,
              rgba(2,23,16,0.45) 65%,
              rgba(2,23,16,0.94) 100%
            )
          `,
        }}
      />

      {/* === CINEMATIC VIGNETTE === */}
      <div className="cinematic-vignette" />

      {/* === DOT GRID TEXTURE (subtle depth) === */}
      <div className="absolute inset-0 dot-grid-texture opacity-25 pointer-events-none" />

      {/* === FOREGROUND CONTENT === */}
      <div className="act-origin-content relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        
        {/* Establishment Label Capsule */}
        <div className="act-origin-label inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-champagne/40 text-champagne text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] font-bold shadow-[0_4px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(228,199,103,0.18)] mb-4 sm:mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
          <span>Digbeth, Birmingham &bull; Premium Foodservice Distribution</span>
        </div>

        {/* Main Title — Sculpted Royal British Gold Typography */}
        <h1 className="act-origin-title font-display font-black uppercase leading-[0.84] tracking-[0.06em] sm:tracking-[0.08em] select-none">
          <span className="block text-[56px] sm:text-[88px] md:text-[118px] lg:text-[148px] xl:text-[168px] bg-gradient-to-b from-[#FFFFFF] via-[#FCE8A2] to-[#C9A227] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_12px_45px_rgba(0,0,0,0.9)] drop-shadow-[0_0_35px_rgba(228,199,103,0.3)]">
            ROOTWILLS
          </span>
        </h1>

        {/* Decorative Divider — Gold Monogram Lozenge */}
        <div className="act-origin-divider flex items-center justify-center gap-3 my-4 sm:my-6">
          <div className="w-16 sm:w-28 h-px bg-gradient-to-r from-transparent via-champagne/60 to-champagne" />
          <div className="w-2.5 h-2.5 rotate-45 border border-champagne bg-champagne/40 shadow-[0_0_15px_rgba(228,199,103,0.8)]" />
          <div className="w-16 sm:w-28 h-px bg-gradient-to-l from-transparent via-champagne/60 to-champagne" />
        </div>

        {/* Subtitle */}
        <p className="act-origin-subtitle text-cream text-sm sm:text-base lg:text-lg font-sans max-w-xl leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          Premier UK fresh food distribution &amp; cold-chain logistics
          <br className="hidden sm:block" />
          for professional hospitality kitchens.
        </p>

        {/* CTA Buttons */}
        <div className="act-origin-cta mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/apply"
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#FFF4D0] via-[#E4C767] to-[#C9A227] text-obsidian-950 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-[0_10px_35px_rgba(228,199,103,0.4),0_0_20px_rgba(228,199,103,0.25)] hover:shadow-[0_15px_50px_rgba(228,199,103,0.65)] hover:brightness-110 transition-all duration-300 hover:scale-[1.03]"
          >
            <span>Open Trade Account</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 sm:py-4 bg-obsidian-950/75 backdrop-blur-xl border border-champagne/40 text-cream hover:text-champagne hover:border-champagne hover:bg-emerald-950/60 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02]"
          >
            <span>View Catalogue</span>
          </Link>
        </div>

        {/* Trust Badges Strip — High-Legibility Floating Glass Pill */}
        <div className="act-origin-badges mt-8 sm:mt-12 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-5 sm:px-7 py-2.5 sm:py-3 rounded-2xl bg-obsidian-950/80 backdrop-blur-xl border border-emerald-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.7)] text-cream font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-bold">
          <span className="flex items-center gap-1.5 text-champagne">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>BRCGS Grade AA</span>
          </span>
          <span className="text-emerald-500/50">&bull;</span>
          <span className="flex items-center gap-1.5 text-cream/95">
            <Award className="w-3.5 h-3.5 text-champagne shrink-0" />
            <span>SALSA Certified</span>
          </span>
          <span className="text-emerald-500/50 hidden sm:inline">&bull;</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Truck className="w-3.5 h-3.5 shrink-0" />
            <span>06:00 AM Delivery SLA</span>
          </span>
          <span className="text-emerald-500/50 hidden md:inline">&bull;</span>
          <span className="flex items-center gap-1.5 text-champagne hidden md:inline-flex">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>11:00 PM Cut-off</span>
          </span>
        </div>

      </div>

      {/* === SCROLL INDICATOR === */}
      <div className="act-origin-scroll absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
        <div className="px-3.5 py-1.5 rounded-full bg-obsidian-950/85 backdrop-blur-md border border-champagne/30 text-champagne font-mono text-[9px] uppercase tracking-[0.25em] font-bold flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-champagne transition-colors">
          <span>Scroll to Explore</span>
          <ChevronDown className="w-3.5 h-3.5 text-champagne animate-bounce" />
        </div>
      </div>

      {/* === TRANSITION EXIT OVERLAY (GSAP animates opacity 0→1) === */}
      <div className="act-origin-exit absolute inset-0 bg-[#021710] opacity-0 z-20 pointer-events-none will-change-[opacity]" />
    </section>
  );
}
