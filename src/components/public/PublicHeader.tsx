'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#140306]/95 backdrop-blur-xl border-b border-[#BA8E4E]/25 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex items-center justify-between h-20 sm:h-24 relative py-2">
          
          {/* Left: Prominent Royal Seal Medallion + Typography */}
          <Link 
            href="/#home" 
            className="flex items-center gap-3.5 sm:gap-5 group focus:outline-none"
          >
            {/* High-Resolution Illustrated Heritage Seal with Gold Halo Rim */}
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 lg:w-22 lg:h-22 shrink-0 rounded-full p-[2px] bg-gradient-to-b from-[#E4C767] via-[#C9A227] to-[#4A101A] shadow-[0_6px_28px_rgba(0,0,0,0.6),0_0_22px_rgba(228,199,103,0.35)] transition-transform duration-300 group-hover:scale-105">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#24050A]">
                <Image
                  src="/images/branded/rootwills_logo_seal.png"
                  alt="Rootwills Logo Seal"
                  fill
                  sizes="(max-width: 640px) 56px, 88px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Brand Wordmark & Subtitle */}
            <div className="flex flex-col justify-center">
              <span className="font-chunky text-2xl sm:text-3xl lg:text-[34px] font-black text-white tracking-wide transition-colors group-hover:text-[#D4A86A] leading-none">
                Rootwills
              </span>
              <span className="block text-[8px] sm:text-[10px] lg:text-[11px] font-sans font-bold tracking-[0.28em] uppercase text-[#D4A86A] mt-1 sm:mt-1.5 leading-none">
                FOOD SERVICES &amp; WHOLESALE CO.
              </span>
            </div>
          </Link>

          {/* Right: Operational Dispatch Window & London / Midlands Region */}
          <div className="hidden sm:flex flex-col items-end text-right font-mono space-y-1">
            <div className="flex items-center gap-2 text-white/90 text-xs tracking-wider">
              <span className="text-[#D4A86A] text-xs">✦</span>
              <span>
                Pre-Dawn Drops: <strong className="text-white font-bold">05:30 – 07:30 AM</strong>
              </span>
            </div>
            <span className="text-[11px] text-[#D4A86A] tracking-wider font-sans uppercase font-semibold">
              Commercial Purveyors &bull; London &amp; Midlands
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}
