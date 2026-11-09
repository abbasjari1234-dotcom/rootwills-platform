'use client';

import React, { useRef, useState, useEffect } from 'react';
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
    category: 'Catering Breakfast & Cereals',
    logo: '/images/brands/kelloggs.png',
    searchQuery: 'Kellogg',
  },
  {
    name: 'Country Range',
    category: 'Commercial Foodservice Essentials',
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth scroll handler
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const distance = 320;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  // Continuous auto-sliding effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Loop back to start if reached the end
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 180, behavior: 'smooth' });
        }
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Duplicate list to give seamless infinite feel
  const displayBrands = [...BRANDS, ...BRANDS];

  return (
    <section className="relative py-12 sm:py-16 bg-white border-y border-[#EAE0CE]/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title & Left/Right Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#BA8E4E] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Leading Wholesale Manufacturers</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#2E060D] tracking-tight">
              Foodservice Brands We Supply
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-sans mt-1">
              Direct commercial distribution lines available for restaurants, hotels, schools, and caterers.
            </p>
          </div>

          {/* Left / Right Navigation Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-xl border border-stone-200 bg-white text-stone-600 hover:text-[#5A101D] hover:border-[#5A101D] flex items-center justify-center transition-all shadow-sm active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-xl border border-stone-200 bg-white text-stone-600 hover:text-[#5A101D] hover:border-[#5A101D] flex items-center justify-center transition-all shadow-sm active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex items-center gap-6 overflow-x-auto scrollbar-none py-3 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayBrands.map((brand, idx) => (
            <Link
              key={`${brand.name}-${idx}`}
              href={`/products?search=${encodeURIComponent(brand.searchQuery)}`}
              className="flex-shrink-0 w-44 sm:w-52 h-24 sm:h-28 rounded-2xl bg-stone-50/70 hover:bg-white border border-stone-200/80 hover:border-[#BA8E4E]/60 p-4 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50 hover:-translate-y-0.5 group"
            >
              <div className="relative w-32 sm:w-36 h-12 sm:h-14 flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} Wholesale Products`}
                  fill
                  sizes="150px"
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
                />
              </div>
              <span className="text-[10px] text-stone-400 group-hover:text-[#5A101D] font-medium tracking-tight mt-1 truncate max-w-[170px] transition-colors">
                {brand.category}
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom Explorer Link */}
        <div className="mt-6 flex items-center justify-between text-xs text-stone-500 pt-4 border-t border-stone-100">
          <span>Explore all 5,480+ wholesale catalog lines</span>
          <Link
            href="/products"
            className="font-bold text-[#5A101D] hover:text-[#BA8E4E] inline-flex items-center gap-1 transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
