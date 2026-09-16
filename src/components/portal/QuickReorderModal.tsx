'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { useCartStore } from '@/store/cart-store';
import { Order } from '@/types/orders';
import { X, Plus, Minus, Repeat, Check, ArrowRight, ShoppingBag } from 'lucide-react';

interface QuickReorderModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickReorderModal({ order, isOpen, onClose }: QuickReorderModalProps) {
  const { getCustomerProducts } = useAppStore();
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-scale-in">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-800 font-mono text-xs uppercase font-bold">
              <Repeat className="w-4 h-4" />
              <span>Quick Reorder</span>
            </div>
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Repeat Order #{order.orderNumber}
            </h3>
            <p className="text-xs text-slate-500">
              Original Order Date: {order.createdAt.split('T')[0]} &bull; {order.locationName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close repeat order modal"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items Quantity Stepper Grid */}
        <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1 custom-scroll">
          {order.items.map((item) => {
            const currentQty = quantities[item.productId] ?? item.qty;
            return (
              <div
                key={item.productId}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900 truncate">{item.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {item.packSize} &bull; £{item.unitPrice.toFixed(2)} / unit
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-slate-300 rounded-lg bg-white shadow-2xs">
                    <button
                      type="button"
                      onClick={() => handleQtyChange(item.productId, currentQty - 1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="p-1 text-slate-500 hover:text-slate-900"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 font-mono font-bold text-slate-900">{currentQty}</span>
                    <button
                      type="button"
                      onClick={() => handleQtyChange(item.productId, currentQty + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="p-1 text-slate-500 hover:text-slate-900"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="w-16 text-right font-mono font-bold text-emerald-800">
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
            className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Load {totalLines} Items Into Basket</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
