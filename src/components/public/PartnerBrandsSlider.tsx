'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BrandItem {
  name: string;
  logo: string;
  searchQuery: string;
  width: number;
  height: number;
  customClass?: string;
}

const BRANDS: BrandItem[] = [
  {
    name: "Kellogg's",
    logo: '/images/brands/kelloggs.svg',
    searchQuery: 'Kellogg',
    width: 823,
    height: 302,
    customClass: 'h-8 sm:h-10 md:h-11 max-w-[130px] sm:max-w-[150px]',
  },
  {
    name: 'Funnybones Foodservice',
    logo: '/images/brands/funnybones.png',
    searchQuery: 'Funnybones',
    width: 1024,
    height: 518,
    customClass: 'h-9 sm:h-11 md:h-13 max-w-[130px] sm:max-w-[155px]',
  },
  {
    name: 'Country Range',
    logo: '/images/brands/country-range.svg',
    searchQuery: 'Country Range',
    width: 236,
    height: 107,
    customClass: 'h-9 sm:h-11 md:h-12 max-w-[125px] sm:max-w-[150px]',
  },
  {
    name: 'Radnor',
    logo: '/images/brands/radnor.png',
    searchQuery: 'Radnor',
    width: 1014,
    height: 380,
    customClass: 'h-9 sm:h-11 md:h-12 max-w-[125px] sm:max-w-[145px]',
  },
  {
    name: "Mr Filbert's",
    logo: '/images/brands/mr-filberts.svg',
    searchQuery: 'Filbert',
    width: 494,
    height: 157,
    customClass: 'h-8 sm:h-9 md:h-10 max-w-[135px] sm:max-w-[160px]',
  },
  {
    name: 'Britvic plc',
    logo: '/images/brands/britvic.svg',
    searchQuery: 'Britvic',
    width: 106,
    height: 31,
    customClass: 'h-8 sm:h-9 md:h-10 max-w-[125px] sm:max-w-[145px]',
  },
  {
    name: 'Cakesmiths',
    logo: '/images/brands/cakesmiths.svg',
    searchQuery: 'Cakesmiths',
    width: 320,
    height: 90,
    customClass: 'h-7 sm:h-8 md:h-9 max-w-[125px] sm:max-w-[150px]',
  },
  {
    name: 'Essential Cuisine',
    logo: '/images/brands/essential-cuisine.svg',
    searchQuery: 'Essential Cuisine',
    width: 233,
    height: 98,
    customClass: 'h-8 sm:h-10 md:h-11 max-w-[125px] sm:max-w-[150px]',
  },
];

export function PartnerBrandsSlider() {
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);
  const [manualOffset, setManualOffset] = useState(0);

  // Manual scroll handler when clicking left / right arrows
  const handleScroll = (direction: 'left' | 'right') => {
    const shift = 280;
    setManualOffset((prev) => (direction === 'left' ? prev + shift : prev - shift));
  };

  // Quadruple the brand list to guarantee a perfectly seamless infinite continuous marquee loop
  const marqueeBrands = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section
      aria-label="Partner Foodservice Brands"
      className="relative z-10 w-full pt-8 pb-6 sm:pt-10 sm:pb-7 bg-[#FAF7F2] border-t border-b border-[#E8DEC8]/80 select-none overflow-hidden"
    >
      {/* Subtle Botanical Parchment Texture Overlay */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.15] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle Trust & Supply Kicker */}
        <div className="text-center mb-5 sm:mb-6 space-y-1">
          <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.22em] text-[#8B2635] font-semibold block">
            ESTABLISHED WHOLESALE LINES
          </span>
          <h2 className="font-serif font-bold text-sm sm:text-base text-[#2E060D] tracking-tight">
            Trusted British &amp; International Foodservice Brands We Source &amp; Supply
          </h2>
        </div>

        <div className="relative flex items-center justify-between">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="shrink-0 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-md border border-[#D5C9B3] bg-white/95 text-stone-600 hover:text-[#5A101D] hover:border-[#BA8E4E] hover:bg-white flex items-center justify-center shadow-sm transition-all duration-200 active:scale-95 focus:outline-none cursor-pointer"
            aria-label="Scroll brands left"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Marquee Track with Smooth Edge Fading */}
          <div
            className="relative flex-1 overflow-hidden mx-2 sm:mx-4"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 2.5%, black 97.5%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 2.5%, black 97.5%, transparent 100%)',
            }}
          >
            {/* Manual Offset Wrapper */}
            <div
              className="w-max transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${manualOffset}px)`,
              }}
            >
              {/* Continuous Auto-Gliding Marquee */}
              <div
                className={`flex items-center gap-10 sm:gap-14 md:gap-16 lg:gap-20 py-2 w-max animate-marquee-glide ${
                  isPaused ? 'is-paused' : ''
                }`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
              >
                {marqueeBrands.map((brand, idx) => (
                  <button
                    key={`${brand.name}-${idx}`}
                    type="button"
                    onClick={() =>
                      router.push(`/products?search=${encodeURIComponent(brand.searchQuery.toLowerCase())}`)
                    }
                    className="shrink-0 group flex items-center justify-center focus:outline-none cursor-pointer"
                    title={`Browse ${brand.name} Catering Lines`}
                  >
                    <div className="relative flex items-center justify-center p-1 transition-transform duration-200 group-hover:scale-105">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} Foodservice`}
                        width={brand.width}
                        height={brand.height}
                        className={`w-auto object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.03)] ${
                          brand.customClass || 'h-9 sm:h-11'
                        }`}
                        unoptimized
                        priority={idx < 8}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="shrink-0 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-md border border-[#D5C9B3] bg-white/95 text-stone-600 hover:text-[#5A101D] hover:border-[#BA8E4E] hover:bg-white flex items-center justify-center shadow-sm transition-all duration-200 active:scale-95 focus:outline-none cursor-pointer"
            aria-label="Scroll brands right"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Legal Disclaimer Pill for Trademark Compliance */}
        <div className="mt-4 pt-3 border-t border-[#E8DEC8]/60 text-center">
          <p className="font-sans text-[10px] sm:text-[10.5px] text-stone-600 leading-normal max-w-3xl mx-auto">
            All registered trademarks, brand names, and logos remain the sole intellectual property of their respective manufacturers, referenced herein strictly for wholesale supply and commercial product identification.
          </p>
        </div>
      </div>
    </section>
  );
}
