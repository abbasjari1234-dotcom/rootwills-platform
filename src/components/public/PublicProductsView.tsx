'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  ArrowRight, 
  ShoppingBag, 
  SlidersHorizontal,
  Package,
  Layers,
  CheckCircle2,
  ChevronRight,
  Eye
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { useCartStore } from '@/store/cart-store';
import { Product, ProductCategory } from '@/types/products';
import { CommercialMarketplaceHeroBanner } from './marketplace/CommercialMarketplaceHeroBanner';
import { MarketplaceCategorySidebar } from './marketplace/MarketplaceCategorySidebar';
import { MarketplaceCategoryPills } from './marketplace/MarketplaceCategoryPills';
import { MarketplaceProductCard } from './marketplace/MarketplaceProductCard';
import { MarketplaceCartSidebar } from './marketplace/MarketplaceCartSidebar';
import { MarketplaceProductQuickViewModal } from './marketplace/MarketplaceProductQuickViewModal';

export function PublicProductsView() {
  const { products } = useAppStore();
  const { items, openCart } = useCartStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart totals for mobile summary bar
  const totalCartQty = items.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = items.reduce((sum, item) => sum + item.customerPrice * item.qty, 0);

  // Filtered products based on search & category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.origin && product.origin.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'offers') return product.featured || product.basePrice > 10;
      return product.category === selectedCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // Section Grouping for Default Multi-Carousel View
  const offersProducts = useMemo(
    () => products.filter((p) => p.featured || p.basePrice > 10).slice(0, 8),
    [products]
  );
  const produceProducts = useMemo(
    () => products.filter((p) => p.category === 'fresh_produce'),
    [products]
  );
  const dairyProducts = useMemo(
    () => products.filter((p) => p.category === 'dairy_eggs'),
    [products]
  );
  const dryGoodsProducts = useMemo(
    () => products.filter((p) => p.category === 'dry_goods' || p.category === 'specialty'),
    [products]
  );

  const isBrowsingAll = selectedCategory === 'all' && searchQuery.trim() === '';

  return (
    <div className="bg-slate-50/70 min-h-screen pb-20 pt-6">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── 3-COLUMN MODERN MARKETPLACE LAYOUT ─── */}
        <div className="flex items-start gap-6">
          
          {/* 1. LEFT SIDEBAR: Categories & Depot SLA (260px) */}
          <MarketplaceCategorySidebar
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setSearchQuery('');
            }}
          />

          {/* 2. CENTER COLUMN: Main Marketplace (Flexible) */}
          <main className="flex-1 min-w-0">
            
            {/* Top Search Bar (Matching Reference Screenshot) */}
            <div className="relative mb-5">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search over 1,200+ wholesale fresh produce, dairy, bakery &amp; pantry items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200/90 rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm font-sans text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 shadow-xs transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Promotional Banners (Persistent across all categories) */}
            <CommercialMarketplaceHeroBanner
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setSearchQuery('');
              }}
            />

            {/* Horizontal Category Icon Cards (Pills) */}
            <MarketplaceCategoryPills
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setSearchQuery('');
              }}
            />

            {/* ─── SECTION BY SECTION PRODUCT SHOWCASES ─── */}
            {isBrowsingAll ? (
              <div className="space-y-9">
                
                {/* Section 1: Offers / Specials (Screenshot Style) */}
                <section>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                      <h2 className="text-base sm:text-lg font-sans font-extrabold text-slate-900 tracking-tight">
                        Trade Specials &amp; Flash Offers
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('offers')}
                      className="text-xs font-sans font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
                    >
                      <span>View All ({offersProducts.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {offersProducts.map((prod) => (
                      <MarketplaceProductCard
                        key={prod.id}
                        product={prod}
                        onQuickView={setQuickViewProduct}
                      />
                    ))}
                  </div>
                </section>

                {/* Section 2: Farm-Fresh Produce & Greens */}
                <section>
                  <div className="flex items-center justify-between mb-3.5">
                    <h2 className="text-base sm:text-lg font-sans font-extrabold text-slate-900 tracking-tight">
                      Farm-Fresh Vegetables &amp; Seasonal Salads
                    </h2>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('fresh_produce')}
                      className="text-xs font-sans font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
                    >
                      <span>View All ({produceProducts.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {produceProducts.map((prod) => (
                      <MarketplaceProductCard
                        key={prod.id}
                        product={prod}
                        onQuickView={setQuickViewProduct}
                      />
                    ))}
                  </div>
                </section>

                {/* Section 3: Artisan Dairy & Eggs */}
                {dairyProducts.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-3.5">
                      <h2 className="text-base sm:text-lg font-sans font-extrabold text-slate-900 tracking-tight">
                        Artisan Dairy, Creams &amp; Lion Eggs
                      </h2>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory('dairy_eggs')}
                        className="text-xs font-sans font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
                      >
                        <span>View All ({dairyProducts.length})</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {dairyProducts.map((prod) => (
                        <MarketplaceProductCard
                          key={prod.id}
                          product={prod}
                          onQuickView={setQuickViewProduct}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Section 4: Dry Goods & Bakery */}
                {dryGoodsProducts.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-3.5">
                      <h2 className="text-base sm:text-lg font-sans font-extrabold text-slate-900 tracking-tight">
                        Bakery, Grains &amp; Culinary Essentials
                      </h2>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory('dry_goods')}
                        className="text-xs font-sans font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
                      >
                        <span>View All ({dryGoodsProducts.length})</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {dryGoodsProducts.map((prod) => (
                        <MarketplaceProductCard
                          key={prod.id}
                          product={prod}
                          onQuickView={setQuickViewProduct}
                        />
                      ))}
                    </div>
                  </section>
                )}

              </div>
            ) : (
              /* Filtered / Search Results Grid */
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                  <span className="text-xs font-sans text-slate-500 font-medium">
                    Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items in{' '}
                    <span className="text-emerald-700 font-bold capitalize">
                      {selectedCategory.replace('_', ' ')}
                    </span>
                    {searchQuery && ` matching "${searchQuery}"`}
                  </span>

                  {(selectedCategory !== 'all' || searchQuery) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="text-xs font-sans font-bold text-emerald-700 hover:underline"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                      <Package className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-sans font-bold text-slate-800">
                      No matching wholesale products found
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Try searching by different terms like &ldquo;tomatoes&rdquo;, &ldquo;spinach&rdquo;, or reset your category filters.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-sans font-bold transition-all shadow-xs"
                    >
                      View All Products
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {filteredProducts.map((prod) => (
                      <MarketplaceProductCard
                        key={prod.id}
                        product={prod}
                        onQuickView={setQuickViewProduct}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

          </main>

          {/* 3. RIGHT SIDEBAR: Sticky Persistent Live Cart (320px) */}
          <MarketplaceCartSidebar />

        </div>

      </div>

      {/* Mobile Sticky Bottom Floating Cart Trigger (< xl viewports) */}
      {totalCartQty > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 xl:hidden animate-slide-up">
          <button
            type="button"
            onClick={openCart}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-sans font-bold text-xs sm:text-sm shadow-xl flex items-center justify-between border border-emerald-500/40"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-white text-emerald-700 flex items-center justify-center text-xs font-black">
                {totalCartQty}
              </div>
              <span>View Wholesale Basket</span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-emerald-100">
              <span>£{cartSubtotal.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      )}

      {/* Elevated Commercial Quick View & Volume Spec Modal */}
      <MarketplaceProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

    </div>
  );
}
