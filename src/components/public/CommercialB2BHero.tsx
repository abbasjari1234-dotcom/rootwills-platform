'use client';

import React from 'react';
import Image from 'next/image';

export function CommercialB2BHero() {
  return (
    <>
      <section 
        id="home" 
        className="relative h-screen min-h-[720px] flex items-center overflow-hidden bg-[#120305] pt-28 sm:pt-36 lg:pt-40"
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

              {/* The Signature 3-Line Punchy Stacked Title */}
              <h1 className="font-chunky text-6xl sm:text-8xl lg:text-[108px] font-black text-white leading-[0.92] tracking-tight drop-shadow-[0_8px_32px_rgba(0,0,0,0.7)] select-none">
                Produce.<br />
                Dairy.<br />
                Butchery.
              </h1>

              <p className="text-xs sm:text-base text-[#EDE4D8]/90 font-sans max-w-md leading-relaxed">
                Hand-graded daily British farm produce, artisan dairy, and prime culinary wholesale lines delivered pre-dawn to the UK&apos;s finest kitchens.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Left: Playful Hand-Drawn Annotation (Matching 'Drop a Bagel. Or 20 ⤶' reference) */}
        <div className="absolute bottom-16 sm:bottom-10 left-5 sm:left-12 z-20 flex items-center gap-2.5 sm:gap-3 pointer-events-none">
          <div className="flex flex-col">
            <span className="font-script text-2xl sm:text-3xl text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] -rotate-3">
              Drop a Crate. Or 200
            </span>
            <div className="w-full h-[2px] bg-[linear-gradient(90deg,#F13624,#FA7E3D,transparent)] rounded-full -mt-0.5" />
          </div>
          
          {/* Hand-Drawn Doodle Arrow SVG */}
          <svg 
            className="w-9 h-9 sm:w-11 sm:h-11 text-white/85 -rotate-12 stroke-current fill-none drop-shadow-sm" 
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
