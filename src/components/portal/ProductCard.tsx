'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
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
  const isDiscounted = unitPrice < basePrice;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="flex flex-col justify-between rounded-lg border border-white/10 bg-obsidian-800/40 p-5 backdrop-blur-sm"
    >
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-champagne">{category}</p>
        <h3 className="mt-2 font-display text-lg text-cream">{name}</h3>
        {description && <p className="mt-1 text-xs font-light text-cream/45">{description}</p>}
        <p className="mt-2 text-[11px] font-light text-cream/30">
          {unit ?? 'per unit'} · SKU {sku} · MOQ {moq}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <span className="font-display text-xl text-cream">£{unitPrice.toFixed(2)}</span>
          {isDiscounted && (
            <span className="ml-2 text-xs font-light text-cream/30 line-through">£{basePrice.toFixed(2)}</span>
          )}
        </div>
        <button
          onClick={() =>
            addLine({ productId: id, sku, name, unit, unitPrice, moq }, moq)
          }
          className="flex items-center gap-1.5 rounded-full border border-champagne/50 px-3 py-1.5 text-[11px] uppercase tracking-[0.08em] text-cream transition-colors hover:bg-champagne hover:text-obsidian-950"
        >
          <Plus className="h-3 w-3" strokeWidth={2} />
          Add
        </button>
      </div>
    </motion.div>
  );
}
