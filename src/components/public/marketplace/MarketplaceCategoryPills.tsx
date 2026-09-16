'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '@/types/products';

interface PillCategory {
  key: ProductCategory | 'all' | 'offers';
  label: string;
  imageUrl: string;
  isOffer?: boolean;
}

const PILL_CATEGORIES: PillCategory[] = [
  { 
    key: 'offers', 
    label: 'Trade Offers', 
    imageUrl: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=300&auto=format&fit=crop&q=80',
    isOffer: true 
  },
  { 
    key: 'all', 
    label: 'All Lines', 
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&auto=format&fit=crop&q=80' 
  },
  { 
    key: 'fresh_produce', 
    label: 'Fresh Veg', 
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&auto=format&fit=crop&q=80' 
  },
  { 
    key: 'dairy_eggs', 
    label: 'Dairy & Milk', 
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80' 
  },
  { 
    key: 'specialty', 
    label: 'Farm Eggs', 
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&auto=format&fit=crop&q=80' 
  },
  { 
    key: 'meat_poultry', 
    label: 'Butchery', 
    imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=300&auto=format&fit=crop&q=80' 
  },
  { 
    key: 'foodservice', 
    label: 'Seafood', 
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&auto=format&fit=crop&q=80' 
  },
  { 
    key: 'dry_goods', 
    label: 'Bakery', 
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80' 
  },
];

interface MarketplaceCategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (categoryKey: any) => void;
}

export function MarketplaceCategoryPills({
  selectedCategory,
  onSelectCategory,
}: MarketplaceCategoryPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mb-6">
      {/* Left Scroll Button */}
      <button
        type="button"
        onClick={() => scroll('left')}
        aria-label="Scroll categories left"
        className="absolute -left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 flex items-center justify-center transition-all hidden sm:flex"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
      >
        {PILL_CATEGORIES.map((item) => {
          const isActive = selectedCategory === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectCategory(item.key)}
              className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-2xl min-w-[92px] sm:min-w-[100px] transition-all shrink-0 border group relative ${
                isActive
                  ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-white border-slate-200/90 hover:border-emerald-300 hover:bg-slate-50/80 hover:shadow-xs'
              }`}
            >
              {/* Colorful Product Photo Thumbnail */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden mb-1.5 bg-slate-100 border border-slate-200/80 flex items-center justify-center">
                <img
                  src={item.imageUrl}
                  alt={item.label}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />

                {item.isOffer && (
                  <div className="absolute top-1 right-1 bg-rose-500 text-white p-0.5 rounded-full shadow-xs">
                    <Sparkles className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-xs font-sans text-center truncate max-w-[88px] leading-tight ${
                  isActive ? 'font-bold text-emerald-900' : 'font-semibold text-slate-700 group-hover:text-emerald-700'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right Scroll Button */}
      <button
        type="button"
        onClick={() => scroll('right')}
        aria-label="Scroll categories right"
        className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 flex items-center justify-center transition-all hidden sm:flex"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
