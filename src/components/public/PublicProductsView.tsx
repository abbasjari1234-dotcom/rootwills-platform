'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  Check, 
  FileSpreadsheet, 
  ShieldCheck, 
  Info, 
  Layers,
  ShoppingBag,
  Plus,
  Minus,
  Eye,
  X,
  Thermometer,
  ChevronDown
} from 'lucide-react';
import { useDemoStore } from '@/lib/store/demo-store';
import { useCartStore } from '@/store/cart-store';
import { Product, ProductCategory } from '@/types/products';

const CATEGORIES: { key: ProductCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All Products' },
  { key: 'fresh_produce', label: 'Fresh Produce' },
  { key: 'dairy_eggs', label: 'Dairy & Eggs' },
  { key: 'dry_goods', label: 'Bakery & Pastry' },
  { key: 'specialty', label: 'Specialty Botanicals & Pantry' },
];

export function PublicProductsView() {
  const { products, getCustomerProduct } = useDemoStore();
  const { addItem, openCart } = useCartStore();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'moq'>('popular');
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQtyChange = (productId: string, delta: number, minMoq: number) => {
    const current = quantities[productId] ?? minMoq;
    const next = Math.max(minMoq, current + delta);
    setQuantities({ ...quantities, [productId]: next });
  };

  const handleAddToCart = (product: Product) => {
    const custProd = getCustomerProduct(product);
    const qty = quantities[product.id] ?? product.moq ?? 1;
    addItem(custProd, qty);
    openCart();
  };

  // Filter & Sort
  let filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.origin && product.origin.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'price_asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.basePrice - b.basePrice);
  } else if (sortBy === 'price_desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.basePrice - a.basePrice);
  } else if (sortBy === 'moq') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.moq - b.moq);
  }

  return (
    <div className="min-h-screen pb-24 space-y-8">
      {/* Header Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase">
          <Layers className="w-3.5 h-3.5" />
          <span>Wholesale Commercial Catalog</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream">
          Premium Fresh Food & Foodservice Range
        </h1>
        <p className="text-xs sm:text-sm text-cream/70 max-w-2xl mx-auto leading-relaxed">
          Browse our core daily wholesale assortment. Over 1,200 commercial lines available for next-morning delivery across Birmingham and the UK.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link
            href="/onboarding"
            className="px-6 py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs sm:text-sm shadow-gold-glow hover:brightness-110 flex items-center gap-2"
          >
            <span>Open Account for Contract Prices</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setRequestModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-champagne text-cream text-xs sm:text-sm font-semibold flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-champagne" />
            <span>Request Full CSV Price List</span>
          </button>
        </div>
      </div>

      {/* Sticky Unified Filter, Search & Sort Toolbar */}
      <div className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-md border-y border-zinc-800/80 shadow-xl py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-champagne text-obsidian-950 font-bold shadow-gold-glow'
                    : 'bg-zinc-900 text-cream/70 hover:text-cream border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search and Sort Dropdown Group */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-cream/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search SKU, name, origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:border-champagne"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-900 border border-zinc-700 text-cream text-xs rounded-xl px-3 py-2 appearance-none pr-8 focus:outline-none focus:border-champagne cursor-pointer"
              >
                <option value="popular">Sort: Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="moq">Lowest MOQ</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-cream/40 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6 text-xs text-cream/50 font-mono">
          <span>Showing {filteredProducts.length} Wholesale Items</span>
          <span className="text-champagne font-bold">11:00 PM Order Cut-off</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const qty = quantities[p.id] ?? p.moq ?? 1;

            return (
              <div
                key={p.id}
                className="glass-panel rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                {/* Product Image Box with Vignette & Badges */}
                <div 
                  className="relative h-48 w-full bg-zinc-950 overflow-hidden cursor-pointer"
                  onClick={() => setQuickViewProduct(p)}
                >
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded-full bg-zinc-900/90 text-champagne text-[10px] font-mono border border-zinc-700">
                      {p.sku}
                    </span>

                    <button
                      onClick={() => setQuickViewProduct(p)}
                      className="p-1.5 rounded-lg bg-zinc-900/90 text-cream/70 hover:text-cream hover:bg-zinc-800 border border-zinc-700 transition-colors"
                      title="Quick Specs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom Stock Pill */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>In Stock &bull; +2°C Chilled Fleet</span>
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-champagne/80">
                      {p.categoryLabel} &bull; {p.origin || 'UK Farm Origin'}
                    </div>
                    <h3 className="font-display text-lg font-bold text-cream group-hover:text-champagne transition-colors leading-snug">
                      {p.name}
                    </h3>
                    <p className="text-xs text-cream/60 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Allergens */}
                    {p.allergens && p.allergens.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1">
                        {p.allergens.map((alg, i) => (
                          <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            {alg}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pricing & Order Stepper */}
                  <div className="pt-3 border-t border-zinc-800 space-y-2.5">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="text-[10px] text-cream/40 font-mono block">Guide Base Price</span>
                        <span className="font-mono text-base font-bold text-cream">
                          £{p.basePrice.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-cream/50 font-mono"> / {p.unit}</span>
                      </div>
                      <span className="text-[10px] font-mono text-champagne bg-champagne/10 px-2 py-0.5 rounded border border-champagne/20">
                        MOQ: {p.moq} {p.unit}
                      </span>
                    </div>

                    {/* Inline Stepper & Add to Order */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-zinc-900 rounded-xl border border-zinc-700 p-0.5">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(p.id, -1, p.moq)}
                          className="p-1 rounded-lg hover:bg-zinc-800 text-cream/60 hover:text-cream"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-cream px-2.5 min-w-[28px] text-center">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQtyChange(p.id, 1, p.moq)}
                          className="p-1 rounded-lg hover:bg-zinc-800 text-cream/60 hover:text-cream"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleAddToCart(p)}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick View Specification Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative border-zinc-700">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-6 right-6 text-cream/40 hover:text-cream"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 rounded-2xl bg-zinc-950 relative overflow-hidden shrink-0 border border-zinc-800">
                <Image
                  src={quickViewProduct.imageUrl}
                  alt={quickViewProduct.name}
                  fill
                  quality={75}
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-champagne uppercase">{quickViewProduct.sku} &bull; {quickViewProduct.categoryLabel}</span>
                <h2 className="font-display text-xl font-bold text-cream">{quickViewProduct.name}</h2>
                <div className="text-xs text-cream/70">Origin: <strong>{quickViewProduct.origin || 'UK Certified Farm'}</strong></div>
              </div>
            </div>

            <p className="text-xs text-cream/75 leading-relaxed bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800">
              {quickViewProduct.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-cream/40 uppercase block">Pack Specification</span>
                <span className="font-bold text-cream">{quickViewProduct.packSize}</span>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-cream/40 uppercase block">Minimum Order</span>
                <span className="font-bold text-champagne">{quickViewProduct.moq} {quickViewProduct.unit}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  handleAddToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="flex-1 py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {quantities[quickViewProduct.id] ?? quickViewProduct.moq} to Order</span>
              </button>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-cream/70 hover:text-cream text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Price List Request Modal */}
      {requestModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative border-zinc-700">
            <button
              onClick={() => setRequestModalOpen(false)}
              className="absolute top-6 right-6 text-cream/40 hover:text-cream"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold text-cream">Request Full Wholesale Price Schedule</h2>
              <p className="text-xs text-cream/60">Receive our 1,200+ SKU commercial rate card by email.</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Price schedule sent to your email address!');
                setRequestModalOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-[11px] font-mono text-cream/70 mb-1">Establishment Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. San Carlo Temple Street"
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-champagne"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-cream/70 mb-1">Work Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="headchef@restaurant.co.uk"
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-champagne"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110"
                >
                  Send Price List (PDF & CSV)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
