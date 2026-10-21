'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function PublicHeader() {
  return (
    <header className="absolute top-0 inset-x-0 z-30 w-full bg-transparent pt-4 sm:pt-7 px-4 sm:px-8 pointer-events-none transition-all duration-300">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="w-full flex items-center justify-between relative">
          
          {/* Left: Operational Dispatch Window (Matching 'Come On In: 7am - 3pm' reference) */}
          <div className="flex items-center gap-2 text-white/90 text-xs sm:text-[13px] font-mono tracking-wider shrink-0 pointer-events-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <span className="text-[#D4A86A] text-sm">✦</span>
            <span className="whitespace-nowrap">
              Pre-Dawn Drops: <strong className="text-white font-bold">05:30 – 07:30 AM</strong>
            </span>
          </div>

          {/* Left Dashed Architectural Line */}
          <div className="hidden md:block flex-1 border-t border-dashed border-white/35 mx-4 lg:mx-8" />

          {/* Center: BIG ROOTWILLS LOGO (In Place of 'Sunbeam') */}
          <Link 
            href="/#home" 
            className="flex items-center gap-3 sm:gap-4 px-2 sm:px-5 group focus:outline-none shrink-0 pointer-events-auto"
          >
            {/* Crystal-Clear Heritage Seal Medallion — Large Visible Stature */}
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]">
              <Image
                src="/images/branded/rootwills_logo_seal_retina.png"
                alt="Rootwills Logo Seal"
                fill
                unoptimized
                sizes="(max-width: 640px) 80px, (max-width: 1024px) 112px, 144px"
                className="object-contain"
                priority
              />
            </div>

            {/* Massive Brand Wordmark + Subtitle */}
            <div className="flex flex-col text-left">
              <span className="font-chunky text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-wide transition-colors group-hover:text-[#D4A86A] leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                Rootwills
              </span>
              <span className="block text-[9.5px] sm:text-xs lg:text-[13px] font-sans font-black tracking-[0.32em] uppercase text-[#D4A86A] mt-2 sm:mt-2.5 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                FOOD SERVICES &amp; WHOLESALE CO.
              </span>
            </div>
          </Link>

          {/* Right Dashed Architectural Line */}
          <div className="hidden md:block flex-1 border-t border-dashed border-white/35 mx-4 lg:mx-8" />

          {/* Right: Tagline Location Note (Matching 'Start Your Day Right in Bryan, Tx' reference) */}
          <div className="hidden sm:flex items-center text-right text-white/90 text-xs sm:text-[13px] font-mono tracking-wider shrink-0 pointer-events-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <span>Commercial Purveyors &bull; London &amp; Midlands</span>
          </div>

        </div>
      </div>
    </header>
  );
}
