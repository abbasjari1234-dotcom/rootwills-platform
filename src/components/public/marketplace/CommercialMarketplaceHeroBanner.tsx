'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BannerItem {
  id: number;
  categoryKey: string;
  title: string;
  subtitle: string;
  desc: string;
  bgGradient: string;
  imageUrl: string;
}

const BANNERS: BannerItem[] = [
  {
    id: 1,
    categoryKey: 'fresh_produce',
    title: 'Up to 15% Off',
    subtitle: 'Seasonal British Farm Harvest',
    desc: 'Contract-locked rates on Class 1 vine tomatoes, salads, and heritage roots.',
    bgGradient: 'from-[#052e16] via-[#064e3b] to-[#042f2e]',
    imageUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    categoryKey: 'dairy_eggs',
    title: 'Dairy & Farm Eggs',
    subtitle: 'Red Tractor & Lion Certified',
    desc: 'Pure whole milks, double cream, artisan churned butter and free-range eggs.',
    bgGradient: 'from-[#0c2d48] via-[#145374] to-[#052e16]',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=900&auto=format&fit=crop&q=80',
  },
];

interface CommercialMarketplaceHeroBannerProps {
  onSelectCategory?: (categoryKey: string) => void;
}

export function CommercialMarketplaceHeroBanner({
  onSelectCategory,
}: CommercialMarketplaceHeroBannerProps) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 mb-6 bg-slate-100 group">
      {/* 2-Banner Side-by-Side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
        {BANNERS.map((banner) => (
          <div
            key={banner.id}
            className={`relative rounded-xl overflow-hidden min-h-[160px] sm:min-h-[175px] flex items-center p-5 sm:p-6 bg-gradient-to-r ${banner.bgGradient} text-white shadow-sm`}
          >
            {/* Background Image on Right */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent z-10" />
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Left Content */}
            <div className="relative z-20 max-w-[65%] space-y-1">
              <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-white tracking-tight leading-tight">
                {banner.title}
              </h3>
              
              <p className="text-xs sm:text-sm font-semibold text-emerald-300 font-sans">
                {banner.subtitle}
              </p>

              <p className="text-[11px] text-slate-300/90 line-clamp-1">
                {banner.desc}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectCategory?.(banner.categoryKey)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-slate-900 hover:bg-emerald-50 text-xs font-sans font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  <span>Explore Lines</span>
                  <ArrowRight className="w-3 h-3 text-emerald-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

