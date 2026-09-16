'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Check, 
  ShieldCheck, 
  Thermometer, 
  Truck, 
  Layers, 
  Globe, 
  Clock 
} from 'lucide-react';
import { Product } from '@/types/products';
import { useCartStore } from '@/store/cart-store';

interface MarketplaceProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function MarketplaceProductQuickViewModal({
  product,
  onClose,
}: MarketplaceProductQuickViewModalProps) {
  const { items, addItem, updateQty } = useCartStore();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const existingCartItem = items.find((i) => i.productId === product.id);
  const [selectedQty, setSelectedQty] = useState<number>(
    existingCartItem ? existingCartItem.qty : product.moq || 1
  );
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Volume Tier Pricing calculations
  const tier1Price = product.basePrice;
  const tier2Price = product.basePrice * 0.92; // 8% off for 5-19 units
  const tier3Price = product.basePrice * 0.85; // 15% off for 20+ units

  const activeUnitPrice =
    selectedQty >= 20 ? tier3Price : selectedQty >= 5 ? tier2Price : tier1Price;

  const activeLineTotal = activeUnitPrice * selectedQty;

  // Temperature classification helper
  const getStorageTemp = (category: string) => {
    switch (category) {
      case 'fresh_produce':
        return 'Chilled (+3°C to +6°C)';
      case 'dairy_eggs':
      case 'meat_poultry':
        return 'Refrigerated (+1°C to +4°C)';
      case 'foodservice':
        return 'Wet-Fish Chilled (+0°C to +2°C)';
      default:
        return 'Ambient Dry Store (+12°C to +18°C)';
    }
  };

  const handleAddOrUpdate = () => {
    if (existingCartItem) {
      updateQty(product.id, selectedQty);
    } else {
      addItem(product, selectedQty, false);
    }
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full shadow-2xl border border-slate-200 relative overflow-hidden max-h-[92vh] overflow-y-auto custom-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Category Pill */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
            {product.categoryLabel || product.category.replace('_', ' ')}
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            SKU: {product.sku}
          </span>
        </div>

        {/* Main Grid: Image + Details */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-start pb-5 border-b border-slate-100">
          
          {/* Left Visual Column */}
          <div className="sm:col-span-5 space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 relative shadow-inner">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.featured && (
                <div className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-sans font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                  Trade Deal
                </div>
              )}
            </div>

            {/* Storage & Quality Badges */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5 text-[11px] font-sans text-slate-600">
              <div className="flex items-center gap-2">
                <Thermometer className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{getStorageTemp(product.category)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>BRCGS &amp; Red Tractor Audited</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Guaranteed 5+ Days Chilled Life</span>
              </div>
            </div>
          </div>

          {/* Right Product Specs Column */}
          <div className="sm:col-span-7 space-y-3.5">
            <div>
              <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-slate-900 tracking-tight leading-snug">
                {product.name}
              </h2>
              <p className="text-xs font-mono font-semibold text-emerald-700 mt-1">
                Pack Size: {product.packSize} &bull; Sold by the {product.unit}
              </p>
            </div>

            <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed">
              {product.description}
            </p>

            {/* Origin & Traceability */}
            {product.origin && (
              <div className="flex items-center gap-2 text-xs font-sans text-slate-700">
                <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Origin: <strong className="font-semibold text-slate-900">{product.origin}</strong></span>
              </div>
            )}

            {/* Dietary & Allergen Badges */}
            {product.dietary && product.dietary.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.dietary.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Base Price Display */}
            <div className="pt-2 flex items-baseline gap-2">
              <span className="text-2xl font-sans font-black text-slate-900">
                £{activeUnitPrice.toFixed(2)}
              </span>
              <span className="text-xs font-sans text-slate-500">
                per {product.unit} (ex. VAT)
              </span>
            </div>
          </div>

        </div>

        {/* Wholesale Volume Tier Pricing Table */}
        <div className="py-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-slate-800">
              Commercial Volume Pricing
            </span>
            <span className="text-[11px] font-mono text-emerald-700 font-medium">
              Tier discounts apply automatically
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Tier 1 */}
            <div
              className={`p-2.5 rounded-xl border text-center transition-all ${
                selectedQty < 5
                  ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="text-[11px] font-mono text-slate-500">1 to 4 {product.unit}s</div>
              <div className="text-sm font-sans font-black text-slate-900 mt-0.5">
                £{tier1Price.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-400 font-sans">Standard Wholesale</div>
            </div>

            {/* Tier 2 */}
            <div
              className={`p-2.5 rounded-xl border text-center transition-all ${
                selectedQty >= 5 && selectedQty < 20
                  ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="text-[11px] font-mono text-slate-500">5 to 19 {product.unit}s</div>
              <div className="text-sm font-sans font-black text-emerald-700 mt-0.5">
                £{tier2Price.toFixed(2)}
              </div>
              <div className="text-[10px] text-emerald-700 font-sans font-bold">Save 8% Kitchen Tier</div>
            </div>

            {/* Tier 3 */}
            <div
              className={`p-2.5 rounded-xl border text-center transition-all ${
                selectedQty >= 20
                  ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="text-[11px] font-mono text-slate-500">20+ {product.unit}s</div>
              <div className="text-sm font-sans font-black text-emerald-800 mt-0.5">
                £{tier3Price.toFixed(2)}
              </div>
              <div className="text-[10px] text-emerald-800 font-sans font-bold">Save 15% Pallet Contract</div>
            </div>
          </div>
        </div>

        {/* Direct Add to Basket Footer Section */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs font-sans font-semibold text-slate-600">
              Order Quantity:
            </span>

            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedQty((prev) => Math.max(product.moq || 1, prev - 1))}
                className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200/80 flex items-center justify-center transition-colors shadow-xs"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <span className="text-sm font-sans font-black text-slate-900 min-w-[32px] text-center font-mono">
                {selectedQty}
              </span>

              <button
                type="button"
                onClick={() => setSelectedQty((prev) => prev + 1)}
                className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200/80 flex items-center justify-center transition-colors shadow-xs"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="w-full sm:flex-1 sm:max-w-xs">
            <button
              type="button"
              onClick={handleAddOrUpdate}
              className={`w-full py-3 px-5 rounded-2xl font-sans font-bold text-xs sm:text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                addedFeedback
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Basket Updated!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {existingCartItem ? 'Update Basket' : 'Add to Basket'} &bull; £{activeLineTotal.toFixed(2)}
                  </span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
