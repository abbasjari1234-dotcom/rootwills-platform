'use client';

import React, { useState } from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
import { useCartStore } from '@/store/cart-store';
import { Order } from '@/types/orders';
import { X, Plus, Minus, Repeat, Check, ArrowRight, ShoppingBag } from 'lucide-react';

interface QuickReorderModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickReorderModal({ order, isOpen, onClose }: QuickReorderModalProps) {
  const { getCustomerProducts } = useDemoStore();
  const { addItem, openCart } = useCartStore();

  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    order.items.forEach((item) => {
      map[item.productId] = item.qty;
    });
    return map;
  });

  if (!isOpen) return null;

  const handleQtyChange = (productId: string, newQty: number) => {
    if (newQty < 0) return;
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQty,
    }));
  };

  const handlePopulateCart = () => {
    const liveProducts = getCustomerProducts();

    order.items.forEach((item) => {
      const qty = quantities[item.productId];
      if (qty && qty > 0) {
        const prod = liveProducts.find((p) => p.id === item.productId);
        if (prod) {
          addItem(prod, qty);
        }
      }
    });

    onClose();
    openCart();
  };

  const totalLines = Object.values(quantities).filter((q) => q > 0).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-obsidian-900 border border-champagne/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-scale-in">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-champagne font-mono text-xs uppercase font-bold">
              <Repeat className="w-4 h-4" />
              <span>1-Click Quick Reorder</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-cream mt-1">
              Repeat Order #{order.orderNumber}
            </h3>
            <p className="text-xs text-cream/60">
              Original Order Date: {order.createdAt.split('T')[0]} &bull; {order.locationName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close repeat order modal"
            className="p-1 rounded-lg text-cream/70 hover:text-cream"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items Quantity Stepper Grid */}
        <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
          {order.items.map((item) => {
            const currentQty = quantities[item.productId] ?? item.qty;
            return (
              <div
                key={item.productId}
                className="p-3 bg-obsidian-950 rounded-xl border border-cream/10 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-cream truncate">{item.name}</div>
                  <div className="text-[11px] text-cream/70">
                    {item.packSize} &bull; £{item.unitPrice.toFixed(2)} / unit
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-cream/20 rounded-lg bg-obsidian-900">
                    <button
                      type="button"
                      onClick={() => handleQtyChange(item.productId, currentQty - 1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="p-1 text-cream/70 hover:text-cream"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 font-mono font-bold text-cream">{currentQty}</span>
                    <button
                      type="button"
                      onClick={() => handleQtyChange(item.productId, currentQty + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="p-1 text-cream/70 hover:text-cream"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="w-16 text-right font-mono font-bold text-champagne">
                    £{(item.unitPrice * currentQty).toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={handlePopulateCart}
            className="flex-1 py-3.5 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs sm:text-sm shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Load {totalLines} Items Into Basket & Check Out</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3.5 rounded-xl border border-cream/20 text-cream/70 text-xs hover:text-cream"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
