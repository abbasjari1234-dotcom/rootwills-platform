'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Minus, Check, Sparkles, ShoppingBag } from 'lucide-react';
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
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative flex flex-col justify-between rounded-2xl border border-emerald-900/40 bg-gradient-to-b from-obsidian-900/90 to-obsidian-950/95 overflow-hidden backdrop-blur-md shadow-lg hover:shadow-emerald-glow hover:border-champagne/40 transition-all duration-300 [perspective:1000px]"
    >
      {/* 3D Visual Image Header with Ambient Gradient */}
      <div className="relative h-36 w-full overflow-hidden border-b border-emerald-950/80">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 rounded-full bg-obsidian-950/85 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider backdrop-blur-md shadow-md">
            {category.replace('_', ' ')}
          </span>
        </div>

        {/* Live Contract Tag */}
        {isDiscounted && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 rounded-full bg-champagne/90 text-obsidian-950 font-mono text-[9px] font-extrabold uppercase shadow-sm">
              Contract Tier
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>SKU: {sku}</span>
            <span>MOQ: {moq}</span>
          </div>

          <h3 className="mt-1 font-display text-lg font-bold text-cream group-hover:text-champagne transition-colors line-clamp-1">
            {name}
          </h3>

          {description && (
            <p className="mt-1 text-xs text-cream/65 line-clamp-2 leading-relaxed font-sans">
              {description}
            </p>
          )}

          <div className="mt-2 text-[11px] text-emerald-400/90 font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{unit ?? 'per unit'} &bull; In Stock &bull; 06:00 AM Delivery</span>
          </div>
        </div>

        {/* Pricing & 3D Interactive Add Stepper */}
        <div className="pt-3 border-t border-emerald-950/80 flex items-center justify-between gap-3">
          <div>
            <div className="font-mono text-xl font-bold text-cream">
              £{unitPrice.toFixed(2)}
            </div>
            {isDiscounted ? (
              <span className="text-xs text-zinc-500 line-through font-mono">
                £{basePrice.toFixed(2)}
              </span>
            ) : (
              <span className="text-[10px] text-zinc-400 font-mono uppercase">Trade Price</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Quantity Stepper */}
            <div className="flex items-center rounded-xl bg-obsidian-950 border border-emerald-900/60 p-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(moq || 1, q - 1))}
                className="w-6 h-6 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-cream flex items-center justify-center text-xs transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-7 text-center font-mono text-xs font-bold text-champagne">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="w-6 h-6 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-cream flex items-center justify-center text-xs transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleAdd}
              className={`h-8 px-3 rounded-xl font-mono text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-md ${
                added
                  ? 'bg-emerald-500 text-obsidian-950 shadow-emerald-glow'
                  : 'bg-gradient-to-r from-champagne-soft to-champagne text-obsidian-950 hover:brightness-110 shadow-gold-glow'
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
