'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface BrandItem {
  name: string;
  category: string;
  logo: string;
  searchQuery: string;
}

const BRANDS: BrandItem[] = [
  {
    name: "Kellogg's",
    category: 'Breakfast Cereals & Morning Goods',
    logo: '/images/brands/kelloggs.png',
    searchQuery: 'Kellogg',
  },
  {
    name: 'Country Range',
    category: 'Commercial Catering Essentials',
    logo: '/images/brands/country-range.png',
    searchQuery: 'Country Range',
  },
  {
    name: 'Funnybones Foodservice',
    category: 'American & World Food Specialists',
    logo: '/images/brands/funnybones.png',
    searchQuery: 'Funnybones',
  },
  {
    name: 'Radnor Hills',
    category: 'Spring Waters & Infused Drinks',
    logo: '/images/brands/radnor.png',
    searchQuery: 'Radnor',
  },
  {
    name: "Mr Filbert's",
    category: 'Artisan Gourmet Nuts & Bar Snacks',
    logo: '/images/brands/mr-filberts.png',
    searchQuery: 'Filbert',
  },
  {
    name: 'Britvic plc',
    category: 'Hospitality Soft Drinks & Mixers',
    logo: '/images/brands/britvic.png',
    searchQuery: 'Britvic',
  },
  {
    name: 'Cakesmiths',
    category: 'Artisan Coffee Shop Traybakes',
    logo: '/images/brands/cakesmiths.png',
    searchQuery: 'Cakesmiths',
  },
  {
    name: 'Essential Cuisine',
    category: 'Chef Stocks, Jus & Premier Glazes',
    logo: '/images/brands/essential-cuisine.png',
    searchQuery: 'Essential Cuisine',
  },
];

export function PartnerBrandsSlider() {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Smooth scroll handler for manual arrow clicks
  const handleManualScroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = 300;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Duplicate 4 times to ensure seamless infinite continuous marquee loop
  const marqueeBrands = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section 
      aria-label="Foodservice Brands We Supply"
      className="relative z-10 py-14 sm:py-20 bg-[#FAF7F2] border-t border-[#E8DEC8]/90 overflow-hidden select-none"
    >
      {/* Seamless Botanical Parchment Texture matching Rootwills Theme */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />

      {/* Top golden hairline accent */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#BA8E4E]/40 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8D8] border border-[#BA8E4E]/30 text-[#BA8E4E] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commercial Foodservice Brands</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2E060D] tracking-tight">
              Leading Brands We Supply
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1.5 max-w-2xl leading-relaxed">
              We distribute authentic products from the UK&apos;s most reputable foodservice manufacturers directly to restaurants, hotels, and commercial kitchens.
            </p>
          </div>

          {/* Left / Right Arrow Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => handleManualScroll('left')}
              className="w-10 h-10 rounded-full border border-[#E8DEC8] bg-[#FFFDF9] text-[#2E060D] hover:bg-[#5A101D] hover:text-white hover:border-[#5A101D] flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
              aria-label="Scroll brands left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="w-10 h-10 rounded-full border border-[#E8DEC8] bg-[#FFFDF9] text-[#2E060D] hover:bg-[#5A101D] hover:text-white hover:border-[#5A101D] flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
              aria-label="Scroll brands right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Continuous Active Marquee Ribbon with Feathered Edge Fade */}
        <div
          ref={trackRef}
          className="relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}
        >
          <div
            className={`animate-marquee-glide items-center gap-5 sm:gap-6 py-2 ${isPaused ? 'is-paused' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {marqueeBrands.map((brand, idx) => (
              <Link
                key={`${brand.name}-${idx}`}
                href={`/products?search=${encodeURIComponent(brand.searchQuery)}`}
                className="shrink-0 group block"
              >
                {/* Brand Tile matching Rootwills Theme */}
                <div className="w-48 sm:w-56 h-24 sm:h-28 rounded-2xl bg-[#FFFDF9] border border-[#E8DEC8] hover:border-[#BA8E4E] p-4 flex flex-col items-center justify-center transition-all duration-300 shadow-[0_2px_12px_rgba(46,6,13,0.04)] hover:shadow-[0_8px_24px_rgba(46,6,13,0.09)] group-hover:-translate-y-1">
                  {/* Full Vibrant Color Logo (NO grayscale) */}
                  <div className="relative w-36 sm:w-44 h-12 sm:h-14 flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} Wholesale Products`}
                      fill
                      sizes="180px"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  {/* Category Subtext */}
                  <span className="text-[10px] text-stone-500 group-hover:text-[#5A101D] font-medium tracking-tight mt-1 truncate max-w-[190px] transition-colors">
                    {brand.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Catalog Discovery Banner */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 pt-5 border-t border-[#E8DEC8]/80 font-sans">
          <span>Supplying 5,480+ wholesale catering lines with daily pre-dawn drops.</span>
          <Link
            href="/products"
            className="font-bold text-[#5A101D] hover:text-[#BA8E4E] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Explore All Wholesale Lines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
