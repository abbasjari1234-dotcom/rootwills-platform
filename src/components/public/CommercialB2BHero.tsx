'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function CommercialB2BHero() {
  return (
    <>
      <section 
        id="home" 
        className="relative min-h-[660px] sm:min-h-[740px] lg:h-[94vh] lg:max-h-[900px] flex items-center overflow-hidden bg-[#120305] pt-24 sm:pt-32 lg:pt-36"
      >
        {/* Background Image: High-End Chef Plating & Pass with Warm Cinematic Light */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/commercial/rootwills_hero_chef_plating.jpg"
            alt="Rootwills - Commercial Food Services & Wholesale UK"
            fill
            priority
            unoptimized
            className="object-cover object-[75%_center] lg:object-center brightness-[0.92]"
          />
          {/* Ambient Scrim: Rich Wine/Mahogany gradient that lets fresh produce & warm pass glow through */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#140205]/92 via-[#140205]/70 via-55% to-[#140205]/20 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/50 pointer-events-none" />

          {/* Warm Ambient Golden Backlight Orbs (Theatrical lighting behind text) */}
          <div className="absolute -top-24 -left-20 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,168,106,0.18)_0%,transparent_70%)] pointer-events-none blur-2xl" />
          <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(139,38,53,0.22)_0%,transparent_70%)] pointer-events-none blur-3xl" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="max-w-2xl">
            
            {/* Left Column: Refined Editorial Typography & Layout */}
            <div className="space-y-5 sm:space-y-6">
              
              {/* Regal Editorial Eyebrow with Golden Rule */}
              <div className="flex items-center gap-3 text-[#E8C28A] text-xs font-serif tracking-[0.26em] uppercase font-semibold">
                <span className="w-8 h-[1px] bg-gradient-to-r from-[#BA8E4E] to-transparent" aria-hidden="true" />
                <span>Commercial Food Purveyors &bull; London &amp; Midlands</span>
              </div>

              {/* The Signature 3-Line Punchy Stacked Title with Aristocratic British Cormorant Garamond */}
              <h1 className="font-cormorant text-[52px] xs:text-[62px] sm:text-7xl md:text-8xl lg:text-[112px] font-bold text-white leading-[0.88] tracking-[-0.015em] drop-shadow-[0_14px_50px_rgba(0,0,0,0.95)] select-none">
                <span className="block text-white">
                  Produce<span className="text-[#BA8E4E] drop-shadow-[0_0_12px_rgba(186,142,78,0.6)]">.</span>
                </span>
                <span className="block text-[#FAF7F2]">
                  Dairy<span className="text-[#BA8E4E] drop-shadow-[0_0_12px_rgba(186,142,78,0.6)]">.</span>
                </span>
                <span className="block italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#E8C28A] to-[#D4AF37] drop-shadow-[0_4px_24px_rgba(212,175,55,0.35)]">
                  Butchery<span className="text-[#BA8E4E] not-italic drop-shadow-[0_0_12px_rgba(186,142,78,0.6)]">.</span>
                </span>
              </h1>

              {/* Elegant Warm Ivory Subtitle */}
              <p className="text-sm sm:text-lg text-[#FAF7F2]/90 font-sans max-w-xl leading-relaxed sm:leading-[1.65] font-light tracking-wide text-balance">
                Hand-graded daily British farm produce, artisan dairy, and prime culinary wholesale lines delivered pre-dawn to the UK&apos;s finest kitchens.
              </p>

              {/* Translucent Frosted Glass Accreditation Badges with Specular Light Rim */}
              <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs text-[#FAF7F0]">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-xl border border-white/20 hover:border-[#BA8E4E]/50 transition-all duration-150 shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  <span className="text-[#E8C28A] text-xs font-serif">✦</span>
                  <span className="font-medium tracking-wide">SALSA Accredited</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-xl border border-white/20 hover:border-[#BA8E4E]/50 transition-all duration-150 shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  <span className="text-[#E8C28A] text-xs font-serif">✦</span>
                  <span className="font-medium tracking-wide">Direct British Growers</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-xl border border-white/20 hover:border-[#BA8E4E]/50 transition-all duration-150 shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  <span className="text-[#E8C28A] text-xs font-serif">✦</span>
                  <span className="font-medium tracking-wide font-mono">05:30 – 07:30 Drops</span>
                </div>
              </div>

              {/* Luxury Tactile CTA Row with Nested Button Architecture */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <a
                  href="/#services"
                  className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 sm:pl-7 sm:pr-3 sm:py-3 rounded-full bg-gradient-to-r from-[#C99A45] via-[#E2B96F] to-[#BA8E4E] hover:from-[#D4A86A] hover:to-[#C9A227] text-[#1A0307] text-xs sm:text-[13px] font-sans font-bold tracking-wider uppercase transition-all duration-200 ease-out shadow-[0_8px_24px_rgba(186,142,78,0.4),inset_0_1px_1px_rgba(255,255,255,0.7)] hover:shadow-[0_12px_32px_rgba(186,142,78,0.55)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Explore Wholesale Range</span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1A0307]/15 flex items-center justify-center transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:scale-105">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1A0307]" strokeWidth={2.2} />
                  </div>
                </a>
                <a
                  href="/#contact"
                  className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-[#FAF7F2] text-xs sm:text-[13px] font-sans font-semibold tracking-wider uppercase backdrop-blur-xl border border-white/25 hover:border-[#BA8E4E]/60 transition-all duration-200 ease-out shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] active:scale-[0.98] cursor-pointer"
                >
                  <span>Open Trade Account</span>
                </a>
              </div>

              {/* Social Proof Line: Executive Kitchen Trust */}
              <div className="pt-2 flex items-center gap-3 text-xs text-stone-300/85 font-sans">
                <span className="flex -space-x-1.5 overflow-hidden">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full ring-2 ring-[#120305] bg-[#3D0A12] text-[#E8C28A] text-[9.5px] font-serif font-bold">L</span>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full ring-2 ring-[#120305] bg-[#4E0D17] text-[#E8C28A] text-[9.5px] font-serif font-bold">B</span>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full ring-2 ring-[#120305] bg-[#2E060D] text-[#E8C28A] text-[9.5px] font-serif font-bold">C</span>
                </span>
                <span className="text-[11px] sm:text-xs text-stone-300">
                  Supplying <strong className="text-white font-semibold">500+</strong> executive kitchens across London &amp; Midlands
                </span>
              </div>

            </div>

          </div>
        </div>

      </section>
    </>
  );
}
