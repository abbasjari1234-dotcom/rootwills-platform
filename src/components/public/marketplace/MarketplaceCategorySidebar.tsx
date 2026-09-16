'use client';

import React from 'react';
import { 
  Percent, 
  ChevronRight, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Info,
  Carrot,
  Apple,
  Milk,
  Egg,
  Beef,
  Fish,
  Croissant,
  Wheat,
  CookingPot,
  Coffee,
  Package
} from 'lucide-react';
import { ProductCategory } from '@/types/products';

export interface CategoryItem {
  key: ProductCategory | 'all' | 'offers';
  label: string;
  badge?: string;
  isOffer?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export const MARKETPLACE_CATEGORIES: CategoryItem[] = [
  { key: 'offers', label: 'Trade Offers & Deals', badge: '15% Off', isOffer: true, icon: Percent },
  { key: 'all', label: 'All 1,200+ Lines', icon: Package },
  { key: 'fresh_produce', label: 'Fresh Vegetables & Salads', icon: Carrot },
  { key: 'dairy_eggs', label: 'Artisan Dairy & Creams', icon: Milk },
  { key: 'specialty', label: 'Lion Free-Range Eggs', icon: Egg },
  { key: 'meat_poultry', label: 'Wholesale Meat & Poultry', icon: Beef },
  { key: 'foodservice', label: 'Fresh Seafood & Fish', icon: Fish },
  { key: 'dry_goods', label: 'Artisan Bakery & Breads', icon: Croissant },
];

interface MarketplaceCategorySidebarProps {
  selectedCategory: string;
  onSelectCategory: (categoryKey: any) => void;
}

export function MarketplaceCategorySidebar({
  selectedCategory,
  onSelectCategory,
}: MarketplaceCategorySidebarProps) {
  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-28 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scroll">
        
        {/* Top Depot Information Box (Matching Reference) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-2.5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct Depot Hub</span>
            </div>
            <h2 className="text-sm font-sans font-bold text-slate-900 mt-0.5">
              Rootwills Midlands &amp; London
            </h2>
          </div>

          <div className="space-y-1 text-xs">
            <p className="text-emerald-700 font-semibold flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 shrink-0" />
              <span>Free delivery on orders £150+</span>
            </p>
            <p className="text-slate-500 flex items-center gap-1.5 text-[11px]">
              <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>Next-Day Cutoff: 11:00 PM</span>
            </p>
            <p className="text-slate-500 flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>Guaranteed 05:30 - 07:30 AM drop</span>
            </p>
          </div>

          <button
            type="button"
            className="w-full py-1.5 px-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/60 text-slate-700 hover:text-emerald-800 text-xs font-sans font-semibold transition-all text-center flex items-center justify-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Delivery &amp; Fee Information</span>
          </button>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-2xl p-2.5 border border-slate-200/90 shadow-xs">
          <div className="px-3 pt-2 pb-2 text-xs font-sans font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 mb-1">
            Categories
          </div>

          <nav className="space-y-0.5">
            {MARKETPLACE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.key;

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => onSelectCategory(cat.key)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-sans transition-all text-left group ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold border-l-4 border-emerald-600 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        cat.isOffer
                          ? 'bg-rose-100 text-rose-600'
                          : isActive
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{cat.label}</span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {cat.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold bg-rose-50 text-rose-600 border border-rose-200">
                        {cat.badge}
                      </span>
                    )}
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isActive ? 'text-emerald-700 translate-x-0.5' : 'text-slate-400 group-hover:translate-x-0.5'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

      </div>
    </aside>
  );
}
