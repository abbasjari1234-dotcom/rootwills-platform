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
            {/* Prominent Heritage Seal Medallion with Gold-Leaf Halo */}
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 shrink-0 rounded-full p-[2px] bg-gradient-to-b from-[#E4C767] via-[#C9A227] to-[#4A101A] shadow-[0_6px_28px_rgba(0,0,0,0.7),0_0_20px_rgba(228,199,103,0.35)] transition-transform duration-300 group-hover:scale-105">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#24050A]">
                <Image
                  src="/images/branded/rootwills_logo_seal.png"
                  alt="Rootwills Logo Seal"
                  fill
                  sizes="(max-width: 640px) 48px, 80px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Massive Brand Wordmark + Subtitle (Matching 'Sunbeam' typography) */}
            <div className="flex flex-col text-left">
              <span className="font-chunky text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide transition-colors group-hover:text-[#D4A86A] leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                Rootwills
              </span>
              <span className="block text-[8px] sm:text-[10px] lg:text-[11px] font-sans font-black tracking-[0.3em] uppercase text-[#D4A86A] mt-1 sm:mt-1.5 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
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
