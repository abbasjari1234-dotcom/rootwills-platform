'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Sprout, Clock, ArrowRight } from 'lucide-react';

export function CommercialB2BHero() {
  return (
    <>
      <section 
        id="home" 
        className="relative min-h-[640px] sm:min-h-[720px] lg:h-[92vh] lg:max-h-[880px] flex items-center overflow-hidden bg-[#120305] pt-24 sm:pt-32 lg:pt-36"
      >
        {/* Background Image: High-End Chef Plating & Pass with Warm Cinematic Light */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/commercial/rootwills_hero_chef_plating.jpg"
            alt="Rootwills - Commercial Food Services & Wholesale UK"
            fill
            priority
            unoptimized
            className="object-cover object-[75%_center] lg:object-center brightness-90"
          />
          {/* Ambient Scrim: Deep dark gradient on left side for maximum text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#120305]/95 via-[#120305]/75 via-45% to-[#120305]/25 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="max-w-2xl">
            
            {/* Left Column: Massive Stacked Headline (Direct Sunbeam Style) */}
            <div className="space-y-4 sm:space-y-6">
              
              <div className="flex items-center gap-2">
                <span className="text-[#D4A86A] text-xs font-serif uppercase tracking-[0.25em] font-semibold">
                  — COMMERCIAL PURVEYORS UK —
                </span>
              </div>

              {/* The Signature 3-Line Punchy Stacked Title with Apple Optical Sizing */}
              <h1 className="font-chunky text-[48px] xs:text-6xl sm:text-7xl md:text-8xl lg:text-[108px] font-black text-white leading-[0.92] tracking-[-0.035em] drop-shadow-[0_8px_32px_rgba(0,0,0,0.7)] select-none break-words max-w-full">
                Produce.<br />
                Dairy.<br />
                Butchery.
              </h1>

              <p className="text-xs sm:text-base text-[#EDE4D8]/95 font-sans max-w-md leading-relaxed">
                Hand-graded daily British farm produce, artisan dairy, and prime culinary wholesale lines delivered pre-dawn to the UK&apos;s finest kitchens.
              </p>

              {/* Luxury Commercial Accreditation & Feature Micro-Badges with Specular Light Rim */}
              <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs text-[#FAF7F0]/90">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.12] backdrop-blur-xl border-t border-white/40 border-b border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)] apple-tactile transition-transform duration-100 ease-out active:scale-95">
                  <div className="w-4 h-4 rounded-full bg-[#D4A86A]/20 flex items-center justify-center">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#D4A86A]" strokeWidth={2.2} />
                  </div>
                  <span className="font-medium tracking-wide">SALSA Accredited</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.12] backdrop-blur-xl border-t border-white/40 border-b border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)] apple-tactile transition-transform duration-100 ease-out active:scale-95">
                  <div className="w-4 h-4 rounded-full bg-[#D4A86A]/20 flex items-center justify-center">
                    <Sprout className="w-2.5 h-2.5 text-[#D4A86A]" strokeWidth={2.2} />
                  </div>
                  <span className="font-medium tracking-wide">Direct British Growers</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.12] backdrop-blur-xl border-t border-white/40 border-b border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)] apple-tactile transition-transform duration-100 ease-out active:scale-95">
                  <div className="w-4 h-4 rounded-full bg-[#D4A86A]/20 flex items-center justify-center">
                    <Clock className="w-2.5 h-2.5 text-[#D4A86A]" strokeWidth={2.2} />
                  </div>
                  <span className="font-medium tracking-wide">05:30 – 07:30 AM Drops</span>
                </div>
              </div>

              {/* Apple-Style Fluid Action Row */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="/#services"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#BA8E4E] hover:bg-[#D4A86A] text-[#120305] text-xs sm:text-[13px] font-sans font-bold tracking-wider uppercase transition-[transform,background-color,box-shadow] duration-100 ease-out active:scale-[0.97] shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-white/[0.12] hover:bg-white/[0.18] text-white text-xs sm:text-[13px] font-sans font-semibold tracking-wide backdrop-blur-xl border-t border-white/35 border-b border-white/10 transition-[transform,background-color] duration-100 ease-out active:scale-[0.97] shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] cursor-pointer"
                >
                  <span>Trade Desk</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Left: Playful Hand-Drawn Annotation (Matching 'Drop a Bagel. Or 20 ⤶' reference) */}
        <div className="absolute bottom-16 sm:bottom-10 left-4 sm:left-12 z-20 flex items-center gap-2 sm:gap-3 pointer-events-none max-w-[calc(100vw-2rem)]">
          <div className="flex flex-col">
            <span className="font-script text-xl sm:text-3xl text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] -rotate-3">
              Drop a Crate. Or 200
            </span>
            <div className="w-full h-[2px] bg-[linear-gradient(90deg,#F13624,#FA7E3D,transparent)] rounded-full -mt-0.5" />
          </div>
          
          {/* Hand-Drawn Doodle Arrow SVG with Organic Float Motion */}
          <svg 
            className="w-9 h-9 sm:w-11 sm:h-11 text-white/85 stroke-current fill-none drop-shadow-sm doodle-float" 
            viewBox="0 0 40 40"
          >
            <path 
              d="M 6 24 C 16 26, 26 22, 28 8 M 19 12 L 28 8 L 30 17" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>

      </section>
    </>
  );
}
