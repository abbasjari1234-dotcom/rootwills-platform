'use client';

import React, { useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Thermometer, 
  Globe, 
  Clock, 
  Mail, 
  Phone,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { Product } from '@/types/products';

interface MarketplaceProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function MarketplaceProductQuickViewModal({
  product,
  onClose,
}: MarketplaceProductQuickViewModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

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

  const handleEnquire = () => {
    onClose();
    const mailto = `mailto:info@rootwills.co.uk?subject=Wholesale%20Supply%20Enquiry%20-%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.sku)})&body=Hello%20Rootwills%20Commercial%20Desk,%0A%0AWe%20would%20like%20to%20enquire%20about%20supply%20availability%20and%20contract%20terms%20for:%0A-%20Product:%20${encodeURIComponent(product.name)}%0A-%20SKU:%20${encodeURIComponent(product.sku)}%0A-%20Pack%20Size:%20${encodeURIComponent(product.packSize)}%0A%0AThank%20you.`;
    window.location.href = mailto;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full shadow-2xl border border-[#BA8E4E]/30 relative overflow-hidden max-h-[92vh] overflow-y-auto custom-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Category Pill */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-serif font-bold uppercase tracking-wider text-[#4E0D17] bg-[#FAF6EE] border border-[#BA8E4E]/40 px-2.5 py-0.5 rounded-full">
            {product.categoryLabel || product.category.replace('_', ' ')}
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Line Spec: {product.sku}
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
            </div>

            {/* Storage & Quality Badges */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2 text-[11px] font-sans text-stone-700">
              <div className="flex items-center gap-2">
                <Thermometer className="w-3.5 h-3.5 text-[#BA8E4E] shrink-0" />
                <span>{getStorageTemp(product.category)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#BA8E4E] shrink-0" />
                <span>SALSA &amp; Cold-Chain Assured</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#BA8E4E] shrink-0" />
                <span>Guaranteed Fresh Shelf Vitality</span>
              </div>
            </div>
          </div>

          {/* Right Product Specs Column */}
          <div className="sm:col-span-7 space-y-3.5">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#4E0D17] tracking-tight leading-snug">
                {product.name}
              </h2>
              <p className="text-xs font-mono font-semibold text-[#BA8E4E] mt-1">
                Standard Pack Spec: {product.packSize} &bull; Sold by {product.unit}
              </p>
            </div>

            <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed">
              {product.description}
            </p>

            {/* Origin & Traceability */}
            {product.origin && (
              <div className="flex items-center gap-2 text-xs font-sans text-slate-700">
                <Globe className="w-3.5 h-3.5 text-[#BA8E4E] shrink-0" />
                <span>Lineage: <strong className="font-semibold text-slate-900">{product.origin}</strong></span>
              </div>
            )}

            {/* Dietary & Specification Badges */}
            {product.dietary && product.dietary.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.dietary.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono font-semibold text-[#4E0D17] bg-[#FAF6EE] border border-[#BA8E4E]/30 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Supply Guarantee Notice */}
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DEC8] space-y-1 mt-2">
              <span className="text-[11px] font-serif font-bold text-[#4E0D17] uppercase tracking-wider block">
                Wholesale Supply Terms
              </span>
              <p className="text-[11px] text-stone-600 leading-normal font-sans">
                Supplied on standing delivery schedules across London and UK hospitality hubs with verified cold-chain logistics.
              </p>
            </div>
          </div>

        </div>

        {/* Enquiry Actions (Pure B2B Intro Sourcing) */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-sans text-center sm:text-left">
            <span>Speak directly with our trade desk for pricing schedules:</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleEnquire}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#D4A86A] hover:bg-[#C59958] text-[#2D060D] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#2D060D]" />
              <span>Enquire for Supply</span>
            </button>

            <a
              href="tel:+442012345678"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-serif font-bold tracking-wider uppercase transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#BA8E4E]" />
              <span className="hidden sm:inline">Call Desk</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
