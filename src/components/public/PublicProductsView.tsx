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
  ChevronDown,
  Award,
  PackageCheck,
  Calendar,
  CheckCircle2,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { useDemoStore } from '@/lib/store/demo-store';
import { useCartStore } from '@/store/cart-store';
import { Product, ProductCategory } from '@/types/products';

const CATEGORIES: { key: ProductCategory | 'all'; label: string; badge?: string }[] = [
  { key: 'all', label: 'All Wholesale Lines' },
  { key: 'fresh_produce', label: 'Fresh Produce', badge: 'Class 1 Select' },
  { key: 'dairy_eggs', label: 'Artisan Dairy & Eggs', badge: 'Red Tractor' },
  { key: 'dry_goods', label: 'Bakery & Pastry', badge: 'Daily Bake' },
  { key: 'specialty', label: 'Specialty Botanicals & Pantry', badge: 'Living Root' },
];

export function PublicProductsView() {
  const { products, getCustomerProduct } = useDemoStore();
  const { addItem, openCart } = useCartStore();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'moq'>('popular');
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [sampleModalProduct, setSampleModalProduct] = useState<Product | null>(null);
  const [sampleSuccess, setSampleSuccess] = useState(false);
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

  const handleRequestSample = (product: Product) => {
    setSampleModalProduct(product);
    setSampleSuccess(false);
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

  // Helper for origin display
  const getOriginInfo = (p: Product) => {
    if (p.origin) return p.origin;
    if (p.category === 'fresh_produce') return 'Kent & Evesham Vale, UK';
    if (p.category === 'dairy_eggs') return 'Somerset & Cotswolds, UK';
    if (p.category === 'dry_goods') return 'Midlands Artisan Bakery, UK';
    return 'Single-Estate European Farms';
  };

  // Helper for sensory quality badge
  const getQualityBadge = (p: Product) => {
    if (p.category === 'fresh_produce') return 'Class 1 Extra-Select';
    if (p.category === 'dairy_eggs') return 'Pasture-Fed Farm Assured';
    if (p.category === 'dry_goods') return 'Stone-Milled Traditional';
    return 'Chef Reserve Selection';
  };

  return (
    <div className="min-h-screen pb-24 space-y-8 bg-obsidian-950 text-cream">
      {/* Editorial Header Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase font-bold shadow-lg">
          <Layers className="w-3.5 h-3.5" />
          <span>Wholesale Commercial Catalogue &bull; 1,200+ Lines</span>
        </div>
        
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-cream uppercase leading-[1.05]">
          Chef-Grade Produce & <span className="gold-gradient-text">Wholesale Foodservice</span>
        </h1>
        
        <p className="text-xs sm:text-sm text-cream/70 max-w-2xl mx-auto leading-relaxed">
          Daily harvest Class 1 fruit, heritage vegetables, pasture-fed dairy, and artisan bakery. Delivered before 06:00 AM across Birmingham, the Midlands, and Greater London corridors.
        </p>

        {/* Sensory Quick Metric Strip */}
        <div className="pt-2 flex flex-wrap justify-center gap-3 sm:gap-6 text-[11px] font-mono text-cream/60">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>0 Thermal Break Cold-Chain</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-champagne" />
            <span>11:00 PM Night Prior Cut-off</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-Substitution Guarantee</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/onboarding"
            className="px-6 py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs sm:text-sm shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all font-mono"
          >
            <span>Open Account for Contract Pricing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setRequestModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-champagne text-cream text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-champagne" />
            <span>Request Full CSV Price Schedule</span>
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.key
                    ? 'bg-champagne text-obsidian-950 font-bold shadow-gold-glow'
                    : 'bg-zinc-900 text-cream/70 hover:text-cream border border-zinc-800'
                }`}
              >
                <span>{cat.label}</span>
                {cat.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded ${
                    selectedCategory === cat.key ? 'bg-obsidian-950/20 text-obsidian-950' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {cat.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search and Sort Dropdown Group */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-cream/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                aria-label="Search wholesale product catalogue"
                placeholder="Search SKU, name, terroir origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-400 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:border-champagne font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear product search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream text-xs p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                aria-label="Sort wholesale products"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-900 border border-zinc-700 text-cream text-xs rounded-xl px-3 py-2 appearance-none pr-8 focus:outline-none focus:border-champagne cursor-pointer font-mono"
              >
                <option value="popular">Sort: Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="moq">Lowest MOQ</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-cream/70 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6 text-xs text-cream/50 font-mono">
          <span className="flex items-center gap-1.5">
            <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Showing {filteredProducts.length} Wholesale Lines &bull; Calibrated +2°C Storage</span>
          </span>
          <span className="text-champagne font-bold">11:00 PM Order Cut-off</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const qty = quantities[p.id] ?? p.moq ?? 1;
            const originInfo = getOriginInfo(p);
            const qualityBadge = getQualityBadge(p);

            return (
              <div
                key={p.id}
                className="glass-panel rounded-2xl overflow-hidden border border-zinc-800 hover:border-champagne/60 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-[0_10px_30px_rgba(2,23,16,0.8)]"
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
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded-full bg-zinc-900/90 text-champagne text-[10px] font-mono border border-zinc-700 shadow-md">
                      {p.sku}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(p);
                      }}
                      aria-label={`View quick specifications for ${p.name}`}
                      className="p-1.5 rounded-lg bg-zinc-900/90 text-cream/90 hover:text-cream hover:bg-zinc-800 border border-zinc-700 transition-colors shadow-md flex items-center gap-1 text-[10px] font-mono"
                      title="Quick Specs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Specs</span>
                    </button>
                  </div>

                  {/* Sensory Origin Tag Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{qualityBadge}</span>
                    </span>

                    <span className="text-[10px] font-mono text-champagne bg-obsidian-950/80 px-2 py-0.5 rounded border border-champagne/30">
                      +2.0°C Hold
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="uppercase text-champagne/90 font-bold">
                        {p.categoryLabel}
                      </span>
                      <span className="text-cream/50">
                        {originInfo}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-cream group-hover:text-champagne transition-colors leading-snug">
                      {p.name}
                    </h3>

                    <p className="text-xs text-cream/80 line-clamp-2 leading-relaxed font-sans">
                      {p.description}
                    </p>

                    {/* Allergens & Certifications */}
                    <div className="pt-1 flex flex-wrap gap-1">
                      {p.allergens && p.allergens.length > 0 ? (
                        p.allergens.map((alg, i) => (
                          <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            {alg}
                          </span>
                        ))
                      ) : (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          100% Allergen Free
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing, MOQ & Order Stepper */}
                  <div className="pt-3 border-t border-zinc-800 space-y-2.5">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="text-[10px] text-cream/60 font-mono block">Guide Base Price</span>
                        <span className="font-mono text-base font-bold text-cream">
                          £{p.basePrice.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-cream/60 font-mono"> / {p.unit}</span>
                      </div>
                      <span className="text-[10px] font-mono text-champagne bg-champagne/10 px-2 py-0.5 rounded border border-champagne/20 font-bold">
                        MOQ: {p.moq} {p.unit}
                      </span>
                    </div>

                    {/* Inline Stepper & Action Buttons */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-zinc-900 rounded-xl border border-zinc-700 p-0.5">
                          <button
                            type="button"
                            onClick={() => handleQtyChange(p.id, -1, p.moq)}
                            aria-label={`Decrease order quantity for ${p.name}`}
                            className="p-1 rounded-lg hover:bg-zinc-800 text-cream/80 hover:text-cream"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold text-cream px-2.5 min-w-[28px] text-center">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(p.id, 1, p.moq)}
                            aria-label={`Increase order quantity for ${p.name}`}
                            className="p-1 rounded-lg hover:bg-zinc-800 text-cream/80 hover:text-cream"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(p)}
                          className="flex-1 py-2 px-2.5 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-1.5 transition-all font-mono"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </button>
                      </div>

                      {/* Request Chef Sample Trial Link */}
                      <button
                        type="button"
                        onClick={() => handleRequestSample(p)}
                        className="w-full py-1 text-center text-[10px] font-mono text-cream/60 hover:text-champagne transition-colors flex items-center justify-center gap-1"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-champagne" />
                        <span>Request Trade Kitchen Trial Box</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick View Specification Drawer / Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative border-zinc-700 animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close product quick specs modal"
              className="absolute top-6 right-6 text-cream/70 hover:text-cream p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 rounded-2xl bg-zinc-950 relative overflow-hidden shrink-0 border border-zinc-800 shadow-md">
                <Image
                  src={quickViewProduct.imageUrl}
                  alt={quickViewProduct.name}
                  fill
                  quality={85}
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-champagne uppercase font-bold">{quickViewProduct.sku}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {getQualityBadge(quickViewProduct)}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-cream">{quickViewProduct.name}</h2>
                <div className="text-xs text-cream/70 font-mono">
                  Origin: <strong>{getOriginInfo(quickViewProduct)}</strong>
                </div>
              </div>
            </div>

            <p className="text-xs text-cream/80 leading-relaxed bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800 font-sans">
              {quickViewProduct.description}
            </p>

            {/* Sensory & Logistics Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-0.5">
                <span className="text-[10px] text-cream/40 uppercase block">Pack Specification</span>
                <span className="font-bold text-cream">{quickViewProduct.packSize}</span>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-0.5">
                <span className="text-[10px] text-cream/40 uppercase block">Minimum Order</span>
                <span className="font-bold text-champagne">{quickViewProduct.moq} {quickViewProduct.unit}</span>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-0.5">
                <span className="text-[10px] text-cream/40 uppercase block">Storage Temperature</span>
                <span className="font-bold text-emerald-300">+2.0°C to +4.0°C Chilled</span>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-0.5">
                <span className="text-[10px] text-cream/40 uppercase block">Delivery Lead Time</span>
                <span className="font-bold text-cream">Next Day (Order by 11pm)</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  handleAddToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="flex-1 py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 font-mono"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {quantities[quickViewProduct.id] ?? quickViewProduct.moq} to Order</span>
              </button>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-cream/70 hover:text-cream text-xs font-mono"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chef Sample Trial Request Modal */}
      {sampleModalProduct && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative border-zinc-700 animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setSampleModalProduct(null)}
              aria-label="Close sample request modal"
              className="absolute top-6 right-6 text-cream/70 hover:text-cream p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-champagne/10 text-champagne text-[10px] font-mono uppercase font-bold">
                <Sparkles className="w-3 h-3" />
                <span>Complimentary Trade Kitchen Trial</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-cream">
                Request Chef Sample Box
              </h2>
              <p className="text-xs text-cream/80">
                Test the quality of <strong>{sampleModalProduct.name}</strong> in your kitchen before placing wholesale volume orders.
              </p>
            </div>

            {sampleSuccess ? (
              <div className="p-6 bg-emerald-950/60 rounded-2xl border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-display text-lg font-bold text-cream">Trial Box Dispatched!</h3>
                <p className="text-xs text-cream/80">
                  Our wholesale concierge will confirm delivery to your kitchen address for tomorrow morning.
                </p>
                <button
                  type="button"
                  onClick={() => setSampleModalProduct(null)}
                  className="px-6 py-2 rounded-xl bg-champagne text-obsidian-950 font-mono text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSampleSuccess(true);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label htmlFor="sample-establishment" className="block text-[11px] font-mono text-cream/80 mb-1">
                    Establishment Name *
                  </label>
                  <input
                    id="sample-establishment"
                    type="text"
                    required
                    placeholder="e.g. The Grand Hotel Kitchen"
                    className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-champagne font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="sample-chef" className="block text-[11px] font-mono text-cream/80 mb-1">
                    Head Chef / Kitchen Manager Name *
                  </label>
                  <input
                    id="sample-chef"
                    type="text"
                    required
                    placeholder="e.g. Marcus Wareing"
                    className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-champagne font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="sample-postcode" className="block text-[11px] font-mono text-cream/80 mb-1">
                    Kitchen Delivery Postcode *
                  </label>
                  <input
                    id="sample-postcode"
                    type="text"
                    required
                    placeholder="e.g. B2 5BN"
                    className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-champagne font-sans"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 font-mono"
                  >
                    Confirm Sample Delivery
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Full Wholesale Price Schedule Modal */}
      {requestModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative border-zinc-700 animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setRequestModalOpen(false)}
              aria-label="Close price schedule modal"
              className="absolute top-6 right-6 text-cream/70 hover:text-cream p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold text-cream">Request Full Wholesale Price Schedule</h2>
              <p className="text-xs text-cream/80 font-sans">Receive our 1,200+ SKU commercial rate card by email.</p>
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
                <label htmlFor="schedule-establishment" className="block text-[11px] font-mono text-cream/80 mb-1">Establishment Name *</label>
                <input
                  id="schedule-establishment"
                  type="text"
                  required
                  aria-label="Establishment Name"
                  placeholder="e.g. San Carlo Temple Street"
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-champagne font-sans"
                />
              </div>

              <div>
                <label htmlFor="schedule-email" className="block text-[11px] font-mono text-cream/80 mb-1">Work Email Address *</label>
                <input
                  id="schedule-email"
                  type="email"
                  required
                  aria-label="Work Email Address"
                  placeholder="headchef@restaurant.co.uk"
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-champagne font-sans"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 font-mono"
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
