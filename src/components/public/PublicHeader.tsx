'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Crown } from 'lucide-react';

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#180306]/90 backdrop-blur-md border-b border-white/10 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex items-center justify-between h-14 sm:h-16 relative">
          
          {/* Top Left: Operational Dispatch Window (Matching 'Come On In: 7am - 3pm' reference) */}
          <div className="flex items-center gap-2 text-white/85 text-[11px] sm:text-xs font-mono tracking-wider">
            <span className="text-[#D4A86A] text-xs">✦</span>
            <span className="font-medium whitespace-nowrap">
              Pre-Dawn Drops: <strong className="text-white font-bold">05:30 – 07:30 AM</strong>
            </span>
          </div>

          {/* Symmetrical Center: Brand Logo flanked by dashed architectural lines */}
          <div className="flex items-center justify-center flex-1 max-w-xs sm:max-w-md lg:max-w-lg mx-3 sm:mx-6">
            <div className="hidden sm:block flex-1 border-t border-dashed border-white/25" />
            
            <Link 
              href="/#home" 
              className="px-3 sm:px-5 flex flex-col items-center text-center group focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/images/branded/rootwills_logo_seal.png"
                    alt="Rootwills Logo"
                    fill
                    sizes="24px"
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="font-chunky text-lg sm:text-2xl font-black text-white tracking-wide transition-colors group-hover:text-[#D4A86A]">
                  Rootwills
                </span>
              </div>
              <span className="block text-[7.5px] sm:text-[9px] font-sans font-bold tracking-[0.28em] uppercase text-[#D4A86A] -mt-0.5">
                FOOD SERVICES &amp; WHOLESALE CO.
              </span>
            </Link>

            <div className="hidden sm:block flex-1 border-t border-dashed border-white/25" />
          </div>

          {/* Top Right: Tagline Location Note (Matching 'Start Your Day Right in Bryan, Tx' reference) */}
          <div className="hidden md:flex items-center text-right text-white/80 text-[11px] sm:text-xs font-mono tracking-wider">
            <span>Commercial Purveyors &bull; London &amp; Midlands</span>
          </div>

        </div>
      </div>
    </header>
  );
}
