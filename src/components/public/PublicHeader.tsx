'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function PublicHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';

  return (
    <header 
      className={
        isHome
          ? "absolute top-0 inset-x-0 z-30 w-full bg-transparent pt-4 sm:pt-7 px-4 sm:px-8 pointer-events-none transition-all duration-300"
          : "relative z-30 w-full bg-[#180306] border-b border-[#BA8E4E]/25 shadow-[0_4px_24px_rgba(0,0,0,0.5)] pt-4 sm:pt-6 pb-4 sm:pb-6 px-4 sm:px-8 transition-all duration-300"
      }
    >
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
            <div className={`relative shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)] ${
              isHome 
                ? "w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36" 
                : "w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
            }`}>
              <Image
                src="/images/branded/rootwills_logo_master.png"
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
              <span className={`font-chunky font-black text-white tracking-wide transition-colors group-hover:text-[#D4A86A] leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] ${
                isHome
                  ? "text-4xl sm:text-5xl lg:text-6xl"
                  : "text-3xl sm:text-4xl lg:text-5xl"
              }`}>
                Rootwills
              </span>
              <span className={`block font-sans font-black tracking-[0.32em] uppercase text-[#D4A86A] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
                isHome
                  ? "text-[9.5px] sm:text-xs lg:text-[13px] mt-2 sm:mt-2.5"
                  : "text-[8.5px] sm:text-[10px] lg:text-[11.5px] mt-1.5 sm:mt-2"
              }`}>
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
