'use client';

import React from 'react';
import { Eye, Info, Sparkles } from 'lucide-react';
import { Product } from '@/types/products';

interface MarketplaceProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function MarketplaceProductCard({ product, onQuickView }: MarketplaceProductCardProps) {
  const isFeatured = product.featured || product.basePrice > 10;

  return (
    <div 
      onClick={() => onQuickView && onQuickView(product)}
      className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200/90 hover:border-[#BA8E4E] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
    >
      {/* Featured / Special Line Badge */}
      {isFeatured && (
        <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md text-[10px] font-serif font-bold bg-[#FAF6EE] text-[#16201B] border border-[#BA8E4E]/40 shadow-2xs flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-[#BA8E4E]" />
          <span>Prime Line</span>
        </span>
      )}

      {/* Image Container with Hover Quick-View Indicator */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-stone-100 mb-2.5 flex items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Hover / Tap Quick Spec Pill */}
        <div className="absolute inset-0 bg-[#0B110E]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#0E1512] text-[11px] font-serif font-bold tracking-wider uppercase shadow-md transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5 text-[#BA8E4E]" />
            <span>View Spec</span>
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-1.5">
        {/* Product Title */}
        <h4 className="text-xs sm:text-[13px] font-serif font-bold text-slate-900 group-hover:text-[#BA8E4E] transition-colors line-clamp-2 leading-snug">
          {product.name}
        </h4>

        {/* Category & Origin Line */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5 border-t border-slate-100">
          <span className="font-mono text-slate-600 font-medium">{product.packSize}</span>
          {product.origin && (
            <span className="truncate max-w-[100px] text-[10px] text-[#BA8E4E] font-medium tracking-wide">
              {product.origin}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
