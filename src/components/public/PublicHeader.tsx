'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Clock, MapPin } from 'lucide-react';

export function PublicHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';

  return (
    <header 
      className={
        isHome
          ? "absolute top-0 inset-x-0 z-30 w-full bg-transparent pt-3 sm:pt-4 md:pt-7 px-3 sm:px-4 md:px-8 pointer-events-none transition-all duration-300"
          : "relative z-30 w-full bg-[#180306]/85 backdrop-blur-2xl backdrop-saturate-180 overflow-hidden border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] pt-3 sm:pt-4 md:pt-6 pb-3 sm:pb-4 md:pb-6 px-3 sm:px-4 md:px-8 transition-all duration-300"
      }
    >
      {!isHome && (
        <>
          {/* Specular top rim where light catches the frosted glass edge */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-40 mix-blend-luminosity"
            style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
          />
        </>
      )}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        {/* Desktop View: Full 3-Column Architectural Bar (md: 768px and above) */}
        <div className="hidden md:flex items-center justify-between relative">
          
          {/* Left: Operational Dispatch Window with High-End Clock Micro-Badge */}
          <div className="flex items-center gap-2 text-white/90 text-xs md:text-[13px] font-mono tracking-wider shrink-0 pointer-events-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <div className="w-5 h-5 rounded-full bg-[#D4A86A]/20 ring-1 ring-[#D4A86A]/40 flex items-center justify-center">
              <Clock className="w-2.5 h-2.5 text-[#D4A86A]" strokeWidth={2.2} />
            </div>
            <span className="whitespace-nowrap">
              Pre-Dawn Drops: <strong className="text-white font-bold">05:30 – 07:30 AM</strong>
            </span>
          </div>

          {/* Left Dashed Architectural Line */}
          <div className="hidden lg:block flex-1 border-t border-dashed border-white/35 mx-3 lg:mx-8" />

          {/* Center: BIG ROOTWILLS LOGO with Apple Tactile Response */}
          <Link 
            href="/#home" 
            className="flex items-center gap-3 md:gap-4 px-2 md:px-5 group focus:outline-none shrink-0 pointer-events-auto apple-tactile transition-transform duration-100 ease-out active:scale-[0.97]"
          >
            {/* Crystal-Clear Heritage Seal Medallion — Large Visible Stature */}
            <div className={`relative shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)] ${
              isHome 
                ? "w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32" 
                : "w-14 h-14 md:w-18 md:h-18 lg:w-22 lg:h-22"
            }`}>
              <Image
                src="/images/branded/rootwills_logo_master.png"
                alt="Rootwills Logo Seal"
                fill
                unoptimized
                sizes="(max-width: 768px) 64px, (max-width: 1024px) 96px, 128px"
                className="object-contain"
                priority
              />
            </div>

            {/* Massive Brand Wordmark + Subtitle with Optical Sizing */}
            <div className="flex flex-col text-left">
              <span className={`font-chunky font-black text-white tracking-[-0.02em] transition-colors group-hover:text-[#D4A86A] leading-[0.95] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] ${
                isHome
                  ? "text-3xl md:text-5xl lg:text-6xl"
                  : "text-2xl md:text-4xl lg:text-5xl"
              }`}>
                Rootwills
              </span>
              <span className={`block font-sans font-black tracking-[0.28em] md:tracking-[0.32em] uppercase text-[#D4A86A] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
                isHome
                  ? "text-[8.5px] md:text-xs lg:text-[13px] mt-1.5 md:mt-2.5"
                  : "text-[7.5px] md:text-[10px] lg:text-[11.5px] mt-1 md:mt-2"
              }`}>
                FOOD SERVICES &amp; WHOLESALE CO.
              </span>
            </div>
          </Link>

          {/* Right Dashed Architectural Line */}
          <div className="hidden lg:block flex-1 border-t border-dashed border-white/35 mx-3 lg:mx-8" />

          {/* Right: Tagline Location Note with MapPin Micro-Badge */}
          <div className="hidden md:flex items-center gap-2 text-right text-white/90 text-xs md:text-[13px] font-mono tracking-wider shrink-0 pointer-events-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <div className="w-5 h-5 rounded-full bg-[#D4A86A]/20 ring-1 ring-[#D4A86A]/40 flex items-center justify-center">
              <MapPin className="w-2.5 h-2.5 text-[#D4A86A]" strokeWidth={2.2} />
            </div>
            <span>Commercial Purveyors &bull; London &amp; Midlands</span>
          </div>

        </div>

        {/* Mobile View: Sunbeam Mobile Header Architecture (< md: 768px) */}
        <div className="flex md:hidden flex-col items-center w-full">
          {/* Row 1: Left Dashed Line ---- Centered Logo ---- Right Dashed Line */}
          <div className="flex items-center justify-between w-full">
            <div className="flex-1 border-t border-dashed border-white/35 mr-2" />
            
            <Link 
              href="/#home" 
              className="flex items-center gap-2 px-1 group focus:outline-none shrink-0 pointer-events-auto apple-tactile transition-transform duration-100 ease-out active:scale-[0.97]"
            >
              {/* High-Res Master Seal */}
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)]">
                <Image
                  src="/images/branded/rootwills_logo_master.png"
                  alt="Rootwills Logo Seal"
                  fill
                  unoptimized
                  sizes="44px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Wordmark & Subtitle */}
              <div className="flex flex-col text-left">
                <span className="font-chunky text-2xl sm:text-3xl font-black text-white tracking-[-0.02em] transition-colors group-hover:text-[#D4A86A] leading-[0.95] drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">
                  Rootwills
                </span>
                <span className="block text-[7px] sm:text-[7.5px] font-sans font-black tracking-[0.24em] uppercase text-[#D4A86A] mt-1 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  FOOD SERVICES &amp; WHOLESALE CO.
                </span>
              </div>
            </Link>

            <div className="flex-1 border-t border-dashed border-white/35 ml-2" />
          </div>

          {/* Row 2: Centered Operational Dispatch Window with Clock Micro-Badge */}
          <div className="flex items-center justify-center gap-1.5 text-white/90 text-[10px] sm:text-[11px] font-mono tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mt-1.5 sm:mt-2 pointer-events-auto">
            <div className="w-3.5 h-3.5 rounded-full bg-[#D4A86A]/20 ring-1 ring-[#D4A86A]/40 flex items-center justify-center">
              <Clock className="w-2 h-2 text-[#D4A86A]" strokeWidth={2.2} />
            </div>
            <span>
              Pre-Dawn Drops: <strong className="text-white font-bold">05:30 – 07:30 AM</strong>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
