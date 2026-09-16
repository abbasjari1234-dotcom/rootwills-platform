'use client';

import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Product } from '@/types/products';
import { useCartStore } from '@/store/cart-store';

interface MarketplaceProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function MarketplaceProductCard({ product, onQuickView }: MarketplaceProductCardProps) {
  const { items, addItem, updateQty, removeItem } = useCartStore();

  const cartItem = items.find((i) => i.productId === product.id);
  const inCartQty = cartItem ? cartItem.qty : 0;

  // Derive trade pricing & discount
  const isOffer = product.featured || product.basePrice > 10;
  const originalPrice = isOffer ? Number((product.basePrice * 1.15).toFixed(2)) : null;
  const discountPercent = isOffer ? 15 : null;

  const handleAddOne = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQty(product.id, inCartQty + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCartQty <= 1) {
      removeItem(product.id);
    } else {
      updateQty(product.id, inCartQty - 1);
    }
  };

  return (
    <div 
      onClick={() => onQuickView && onQuickView(product)}
      className="bg-white rounded-2xl p-3 border border-slate-200/90 hover:border-emerald-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer relative"
    >
      {/* Discount Badge */}
      {discountPercent && (
        <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-50 text-rose-600 border border-rose-200 shadow-xs">
          {discountPercent}% off
        </span>
      )}

      {/* Image Container with Add Button Overlay */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-50 mb-2.5 flex items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Floating Quick Action Button on Image Bottom-Right (Screenshot Style) */}
        <div className="absolute right-2 bottom-2 z-10" onClick={(e) => e.stopPropagation()}>
          {inCartQty === 0 ? (
            <button
              type="button"
              onClick={handleAddOne}
              title={`Add ${product.name} to basket`}
              aria-label={`Add ${product.name} to basket`}
              className="w-8 h-8 rounded-full bg-white hover:bg-emerald-600 text-slate-800 hover:text-white border border-slate-200 shadow-md flex items-center justify-center transition-all transform active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-white border border-emerald-500 rounded-full px-1.5 py-0.5 shadow-md">
              <button
                type="button"
                onClick={handleDecrement}
                aria-label={`Decrease ${product.name} quantity`}
                className="w-6 h-6 rounded-full text-slate-600 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors"
              >
                {inCartQty === 1 ? (
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                ) : (
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
              </button>

              <span className="text-xs font-sans font-bold text-emerald-800 min-w-[16px] text-center">
                {inCartQty}
              </span>

              <button
                type="button"
                onClick={handleIncrement}
                aria-label={`Increase ${product.name} quantity`}
                className="w-6 h-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors"
              >
                <Plus className="w-3 h-3 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Titles (Matching Screenshot Hierarchy) */}
      <div className="space-y-1">
        {/* Price Row */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-sans font-extrabold text-slate-900">
            £{product.basePrice.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-xs font-sans text-slate-400 line-through">
              £{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h4 className="text-xs font-sans font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
          {product.name}
        </h4>

        {/* Pack Size & Origin */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
          <span className="font-mono">{product.packSize}</span>
          {product.origin && (
            <span className="truncate max-w-[90px] text-[10px] text-slate-400">{product.origin}</span>
          )}
        </div>
      </div>
    </div>
  );
}
