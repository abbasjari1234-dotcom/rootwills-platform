'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAppStore } from '@/store/app-store';
import { useCartStore } from '@/store/cart-store';
import { 
  Search, 
  Filter, 
  Star, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ProductCategory } from '@/types/products';

const CATEGORIES: { key: ProductCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All Products' },
  { key: 'fresh_produce', label: 'Fresh Produce' },
  { key: 'dairy_eggs', label: 'Dairy & Eggs' },
  { key: 'dry_goods', label: 'Bakery & Pastry' },
  { key: 'specialty', label: 'Specialty Botanicals & Pantry' },
];

export function PortalCatalogView() {
  const { currentOrgId, organizations, getCustomerProducts, toggleFavorite } = useAppStore();
  const { addItem, openCart } = useCartStore();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0] || {
    id: 'org-default',
    name: 'Commercial Client'
  };
  const products = getCustomerProducts();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFav = !onlyFavorites || product.isFavorite;

    return matchesCategory && matchesSearch && matchesFav;
  });

  const handleAddToCart = (product: any, qty: number) => {
    addItem(product, qty);
    setAddedItemEffect(product.id);
    setTimeout(() => setAddedItemEffect(null), 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ─── Header with Pricing Explanation ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 uppercase font-bold tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Commercial Contract Pricing Active</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
            Wholesale Produce &amp; Goods Catalog
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Showing locked contract rates for <strong className="text-slate-900">{currentOrg.name}</strong>. Cut-off tonight at 11:00 PM for next-morning depot delivery.
          </p>
        </div>

        <button
          onClick={openCart}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>View Basket &amp; Checkout</span>
        </button>
      </div>

      {/* ─── Filter and Search Bar ─── */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center shadow-xs">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat.key
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}

          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              onlyFavorites
                ? 'bg-amber-50 text-amber-900 border border-amber-300 font-bold shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
            <span>Favourites Only</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search produce, SKU, cuts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 transition-all"
          />
        </div>
      </div>

      {/* ─── Products Grid or Empty State ─── */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-xs">
          <Search className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-sans text-lg font-bold text-slate-900">No wholesale items match your search</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or switching category filters to see available fresh produce and kitchen staples.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setOnlyFavorites(false);
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-700 border border-slate-200 transition-all font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between group h-full shadow-xs hover:shadow-md"
            >
              <div>
                {/* Product Image & Badges */}
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-mono text-emerald-800 border border-slate-200 font-bold shadow-2xs">
                      {product.sku}
                    </span>
                  </div>

                  {/* Favorite Star Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/95 backdrop-blur-xs text-slate-400 hover:text-amber-500 transition-colors border border-slate-200 shadow-2xs"
                    aria-label="Toggle favorite"
                  >
                    <Star className={`w-4 h-4 ${product.isFavorite ? 'text-amber-500 fill-amber-500' : ''}`} />
                  </button>

                  {product.origin && (
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[10px] text-slate-700 border border-slate-200 font-mono font-medium shadow-2xs">
                      {product.origin}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 space-y-1.5 text-left">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold">
                    {product.categoryLabel} &bull; {product.packSize}
                  </div>
                  <h3 className="font-sans text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">
                    {product.description}
                  </p>

                  {product.allergens && product.allergens.length > 0 && (
                    <div className="pt-1 text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                      <Info className="w-3 h-3 text-slate-500" />
                      <span>Allergens: {product.allergens.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Add to Basket Footer */}
              <div className="p-4 pt-0 border-t border-slate-100 mt-2 space-y-3">
                <div className="flex justify-between items-baseline pt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Contract Price</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-lg font-bold text-slate-900">
                        £{product.customerPrice.toFixed(2)}
                      </span>
                      {product.savingsPercent && (
                        <span className="text-[10px] text-slate-400 line-through font-mono">
                          £{product.basePrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-xs text-slate-500"> / {product.unit}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-mono block">
                      MOQ: {product.moq} {product.unit}
                    </span>
                    {product.savingsPercent && (
                      <span className="text-[10px] text-emerald-800 font-mono font-bold">
                        Saved {product.savingsPercent}%
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product, product.moq || 1)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-[0.98] ${
                    addedItemEffect === product.id
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {addedItemEffect === product.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add {product.moq || 1} to Basket</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
