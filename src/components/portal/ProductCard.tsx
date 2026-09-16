'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Minus, Check, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

interface ProductCardProps {
  id: string;
  sku: string;
  name: string;
  category: string;
  description: string | null;
  unit: string | null;
  unitPrice: number;
  basePrice: number;
  moq: number;
}

// Category fallback imagery map for visual crispness
const categoryImageMap: Record<string, string> = {
  fresh_produce: '/images/branded/rootwills_apples_card.jpg',
  dairy_eggs: '/images/branded/rootwills_dairy_card.jpg',
  living_botanicals: '/images/branded/rootwills_microgreens_card.jpg',
  dry_goods: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
  specialty: '/images/branded/rootwills_microgreens_card.jpg',
};

export function ProductCard({
  id,
  sku,
  name,
  category,
  description,
  unit,
  unitPrice,
  basePrice,
  moq,
}: ProductCardProps) {
  const addLine = useCartStore((s) => s.addLine);
  const [qty, setQty] = useState(moq || 1);
  const [added, setAdded] = useState(false);

  const isDiscounted = unitPrice < basePrice;
  const imageSrc = categoryImageMap[category] || categoryImageMap.fresh_produce;

  const handleAdd = () => {
    addLine({ productId: id, sku, name, unit, unitPrice, moq }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300"
    >
      {/* Visual Image Header */}
      <div className="relative h-36 w-full overflow-hidden border-b border-slate-100 bg-slate-100">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 rounded-full bg-white/95 border border-slate-200 text-slate-800 font-mono text-[10px] uppercase font-bold tracking-wider shadow-2xs backdrop-blur-xs">
            {category.replace('_', ' ')}
          </span>
        </div>

        {/* Live Contract Tag */}
        {isDiscounted && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono text-[9px] font-bold uppercase shadow-2xs">
              Contract Tier
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>SKU: {sku}</span>
            <span>MOQ: {moq}</span>
          </div>

          <h3 className="mt-1 font-sans text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {name}
          </h3>

          {description && (
            <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">
              {description}
            </p>
          )}

          <div className="mt-2 text-[11px] text-emerald-800 font-mono flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>{unit ?? 'per unit'} &bull; In Stock &bull; 06:00 AM Drop</span>
          </div>
        </div>

        {/* Pricing & Interactive Add Stepper */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="font-mono text-xl font-bold text-slate-900">
              £{unitPrice.toFixed(2)}
            </div>
            {isDiscounted ? (
              <span className="text-xs text-slate-400 line-through font-mono">
                £{basePrice.toFixed(2)}
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 font-mono uppercase">Trade Rate</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Quantity Stepper */}
            <div className="flex items-center rounded-xl bg-slate-50 border border-slate-200 p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(moq || 1, q - 1))}
                className="w-6 h-6 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center text-xs transition-colors border border-slate-200"
                aria-label={`Decrease quantity of ${name}`}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-7 text-center font-mono text-xs font-bold text-slate-900">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="w-6 h-6 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center text-xs transition-colors border border-slate-200"
                aria-label={`Increase quantity of ${name}`}
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleAdd}
              aria-label={added ? `Added ${name} to order basket` : `Add ${qty} ${name} to order basket`}
              className={`h-8 px-3.5 rounded-xl font-sans text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-2xs ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
