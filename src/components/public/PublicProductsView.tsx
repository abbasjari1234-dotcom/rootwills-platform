'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Search,
  X,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Truck,
  ShoppingBag,
  Phone,
  ArrowUpRight,
} from 'lucide-react';
import { InquiryModal } from '@/components/public/InquiryModal';
import {
  WHOLESALE_CATEGORIES,
  WHOLESALE_PRODUCTS,
  type WholesaleCategory,
  type WholesaleCategorySlug,
  type WholesaleProduct,
} from '@/data/wholesaleProducts';

export type { WholesaleCategory, WholesaleCategorySlug, WholesaleProduct };
export { WHOLESALE_CATEGORIES, WHOLESALE_PRODUCTS };

export interface DraftOrderLine {
  product: WholesaleProduct;
  qty: number;
}

export function PublicProductsView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<WholesaleProduct | null>(null);
  const [hubInfoModalOpen, setHubInfoModalOpen] = useState<boolean>(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [customInquiryNotes, setCustomInquiryNotes] = useState<string>('');
  const [mobileCartDrawerOpen, setMobileCartDrawerOpen] = useState<boolean>(false);

  // Pre-seeded with 3 core wholesale lines so the right sidebar is immediately populated
  const [orderList, setOrderList] = useState<DraftOrderLine[]>([
    { product: WHOLESALE_PRODUCTS[0], qty: 2 },
    { product: WHOLESALE_PRODUCTS[2], qty: 1 },
    { product: WHOLESALE_PRODUCTS[18], qty: 2 },
  ]);

  const categoryRailRef = useRef<HTMLDivElement>(null);
  const featuredRowRef = useRef<HTMLDivElement>(null);
  const popularAddonRef = useRef<HTMLDivElement>(null);

  // Sync draft order list to localStorage so the new tab (/direct) reads the exact items selected
  useEffect(() => {
    try {
      const payload = orderList.map((item) => ({
        id: item.product.id,
        sku: item.product.sku,
        name: item.product.name,
        packSize: item.product.packSize,
        tempZone: item.product.tempZone,
        image: item.product.image,
        qty: item.qty,
      }));
      localStorage.setItem('rootwills_direct_draft_order', JSON.stringify(payload));
    } catch {
      // ignore storage errors
    }
  }, [orderList]);

  const scrollContainer = (
    ref: React.RefObject<HTMLDivElement>,
    direction: 'left' | 'right',
    distance = 340
  ) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -distance : distance,
        behavior: 'smooth',
      });
    }
  };

  const getQty = (productId: string) => {
    const found = orderList.find((c) => c.product.id === productId);
    return found ? found.qty : 0;
  };

  const updateOrderQty = (product: WholesaleProduct, delta = 1) => {
    setOrderList((prev) => {
      const existing = prev.find((c) => c.product.id === product.id);
      if (existing) {
        const nextQty = existing.qty + delta;
        if (nextQty <= 0) {
          return prev.filter((c) => c.product.id !== product.id);
        }
        return prev.map((c) => (c.product.id === product.id ? { ...c, qty: nextQty } : c));
      }
      return delta > 0 ? [...prev, { product, qty: delta }] : prev;
    });
  };

  const totalCases = useMemo(
    () => orderList.reduce((sum, item) => sum + item.qty, 0),
    [orderList]
  );

  const coreFeaturedProducts = useMemo(
    () => WHOLESALE_PRODUCTS.filter((p) => p.featuredCore),
    []
  );

  const popularAddons = useMemo(
    () => WHOLESALE_PRODUCTS.filter((p) => p.popularAddon),
    []
  );

  const activeCategoryObject = useMemo(() => {
    return WHOLESALE_CATEGORIES.find((c) => c.slug === selectedCategory);
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return WHOLESALE_PRODUCTS.filter((p) => {
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.packSize.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q));
        if (!match) return false;
      }

      if (selectedCategory !== 'all') {
        if (p.categorySlug !== selectedCategory) return false;
        if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedSubcategory, searchQuery]);

  const isBrowsingAll = selectedCategory === 'all' && searchQuery.trim() === '';

  // Clean Pandamart Product Tile — Zero Badge Clutter, Zero Public Prices, Crisp 2-Line Hierarchy
  const renderProductCard = (product: WholesaleProduct, compact = false) => {
    const qty = getQty(product.id);

    return (
      <div
        key={product.id}
        onClick={() => setQuickViewProduct(product)}
        className={`group flex flex-col cursor-pointer select-none ${
          compact ? 'w-[142px] sm:w-[154px] shrink-0' : 'w-full'
        }`}
      >
        {/* Clean Square Image Container */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F3F0EA] mb-2 border border-black/[0.06]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            sizes="180px"
            className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />

          {/* Bottom-Right Floating + Button or [ 🗑 1 + ] Pill */}
          <div
            className="absolute bottom-2 right-2 left-2 flex justify-end z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {qty === 0 ? (
              <button
                type="button"
                onClick={() => updateOrderQty(product, 1)}
                aria-label={`Add ${product.name}`}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#2E060D] text-[#131313] hover:text-white border border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center transition-[transform,background-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.92] cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.25]" />
              </button>
            ) : (
              <div className="w-full flex items-center justify-between bg-white border border-black/12 rounded-full px-2 py-1 shadow-[0_4px_12px_rgba(0,0,0,0.14)]">
                <button
                  type="button"
                  onClick={() => updateOrderQty(product, -1)}
                  aria-label="Decrease quantity"
                  className="w-6 h-6 rounded-full hover:bg-black/5 text-[#131313] flex items-center justify-center transition-transform duration-150 active:scale-[0.9] cursor-pointer"
                >
                  {qty === 1 ? (
                    <Trash2 className="w-3.5 h-3.5 text-stone-600" />
                  ) : (
                    <Minus className="w-3.5 h-3.5 stroke-[2.25]" />
                  )}
                </button>
                <span className="font-sans text-xs font-bold text-[#131313] tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => updateOrderQty(product, 1)}
                  aria-label="Increase quantity"
                  className="w-6 h-6 rounded-full hover:bg-black/5 text-[#131313] flex items-center justify-center transition-transform duration-150 active:scale-[0.9] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.25]" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Line 1: Bold Pack Size (Replaces Price Position Cleanly) */}
        <div className="text-[13px] font-sans font-bold text-[#2E060D] leading-tight truncate">
          {product.packSize}
        </div>

        {/* Line 2: Clean Product Name */}
        <h4 className="text-[12.5px] font-sans font-normal text-stone-700 group-hover:text-[#131313] leading-snug line-clamp-2 mt-0.5">
          {product.name}
        </h4>
      </div>
    );
  };

  // Right-Hand Order Sidebar (Pandamart Layout — Routes to Rootwills Direct in New Tab)
  const renderRightOrderPanel = () => (
    <div className="flex flex-col h-full font-sans">
      {/* Top Delivery Standard Header */}
      <div className="text-center pb-3.5 border-b border-black/[0.07]">
        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F5F3EE] text-[#2E060D] mb-1">
          <Truck className="w-3.5 h-3.5" />
        </div>
        <div className="text-[11.5px] text-stone-500 font-medium">
          Pre-Dawn Delivery (04:00 – 07:30 AM)
        </div>
        <h3 className="text-[14px] font-bold text-[#131313] mt-0.5 leading-snug">
          Your order from Rootwills – Wholesale Hub
        </h3>
      </div>

      {/* Selected Product Lines List */}
      <div className="flex-1 overflow-y-auto divide-y divide-black/[0.06] py-1.5 max-h-[300px] pr-1">
        {orderList.length === 0 ? (
          <div className="py-10 text-center space-y-1.5">
            <ShoppingBag className="w-6 h-6 text-stone-400 mx-auto stroke-[1.5]" />
            <p className="text-xs font-semibold text-[#131313]">Your order list is empty</p>
            <p className="text-[11.5px] text-stone-500 max-w-[200px] mx-auto">
              Tap + on any item to build your wholesale order for Rootwills Direct.
            </p>
          </div>
        ) : (
          orderList.map(({ product, qty }) => (
            <div key={product.id} className="py-3 flex items-center justify-between gap-2.5">
              {/* Left Thumbnail */}
              <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-[#F5F3EE] border border-black/[0.06] shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  unoptimized
                  sizes="44px"
                  className="object-cover"
                />
              </div>

              {/* Middle Name & Pack Size */}
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-medium text-[#131313] leading-snug line-clamp-2">
                  {product.name}
                </p>
                <p className="text-[11px] font-semibold text-[#2E060D] mt-0.5 truncate">
                  {product.packSize}
                </p>
              </div>

              {/* Right Quantity Pill Stepper */}
              <div className="shrink-0">
                <div className="flex items-center gap-2.5 bg-white border border-black/12 rounded-full px-2.5 py-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => updateOrderQty(product, -1)}
                    aria-label="Decrease item"
                    className="text-stone-600 hover:text-[#131313] transition-transform duration-150 active:scale-[0.9] cursor-pointer"
                  >
                    {qty === 1 ? (
                      <Trash2 className="w-3.5 h-3.5 text-stone-500" />
                    ) : (
                      <Minus className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <span className="text-xs font-bold text-[#131313] tabular-nums min-w-[14px] text-center">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateOrderQty(product, 1)}
                    aria-label="Increase item"
                    className="text-stone-600 hover:text-[#131313] transition-transform duration-150 active:scale-[0.9] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* "Popular with your order" Mini-Carousel */}
      <div className="pt-3 pb-3 border-t border-black/[0.07]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[12.5px] font-bold text-[#131313]">Popular with your order</h4>
          <button
            type="button"
            onClick={() => scrollContainer(popularAddonRef, 'right', 180)}
            aria-label="Scroll popular items"
            className="w-6 h-6 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#131313] hover:bg-[#F5F3EE] cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          ref={popularAddonRef}
          className="flex items-start gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1"
        >
          {popularAddons.map((addon) => {
            const addonQty = getQty(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => setQuickViewProduct(addon)}
                className="w-[96px] shrink-0 flex flex-col cursor-pointer group"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F5F3EE] mb-1.5 border border-black/[0.06]">
                  <Image
                    src={addon.image}
                    alt={addon.name}
                    fill
                    unoptimized
                    sizes="96px"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateOrderQty(addon, 1);
                    }}
                    aria-label={`Add ${addon.name}`}
                    className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-white hover:bg-[#2E060D] text-[#131313] hover:text-white border border-black/10 shadow-xs flex items-center justify-center transition-transform duration-150 active:scale-[0.9] cursor-pointer"
                  >
                    {addonQty > 0 ? (
                      <span className="text-[10px] font-bold tabular-nums">{addonQty}</span>
                    ) : (
                      <Plus className="w-3.5 h-3.5 stroke-[2.25]" />
                    )}
                  </button>
                </div>

                <div className="text-[11px] font-bold text-[#2E060D] truncate">
                  {addon.packSize}
                </div>
                <p className="text-[11px] text-stone-600 line-clamp-2 leading-tight mt-0.5">
                  {addon.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Total & Single-Line Rootwills Direct CTA (Opens New Tab) */}
      <div className="pt-3 border-t border-black/[0.07] space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-sm font-bold text-[#131313]">Total</span>
            <span className="text-[11px] text-stone-500 ml-1.5">
              ({orderList.length} {orderList.length === 1 ? 'SKU' : 'SKUs'})
            </span>
          </div>
          <span className="text-sm font-bold text-[#2E060D] tabular-nums">
            {totalCases} {totalCases === 1 ? 'Case' : 'Cases'}
          </span>
        </div>

        <a
          href="/direct"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-[#2E060D] hover:bg-[#430A14] text-white font-sans font-semibold text-[13px] transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Continue to Rootwills Direct</span>
          <ArrowUpRight className="w-4 h-4 text-[#F3D08A]" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#131313] font-sans pt-[68px] sm:pt-[82px] pb-16">
      {/* ─── 3-COLUMN PANDAMART STOREFRONT ARCHITECTURE ─── */}
      <div className="max-w-[1480px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-start gap-5 lg:gap-6">
          {/* ════════════════════════════════════════════════════════════════
              1. LEFT SIDEBAR: Store Info & Categories
             ════════════════════════════════════════════════════════════════ */}
          <aside className="hidden lg:block w-[215px] xl:w-[235px] shrink-0 sticky top-[82px] max-h-[calc(100vh-92px)] overflow-y-auto pr-3 border-r border-black/[0.07] [scrollbar-width:thin]">
            {/* Store Info Block */}
            <div className="pb-4 border-b border-black/[0.07] space-y-1">
              <h1 className="text-[15px] font-bold text-[#131313] leading-snug">
                Rootwills – Wholesale Hub
              </h1>
              <p className="text-[12px] font-semibold text-[#2E060D]">
                Next-day pre-dawn delivery
              </p>
              <p className="text-[12px] text-stone-600">Window: 04:00 – 07:30 AM</p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setHubInfoModalOpen(true)}
                  className="w-full py-1.5 px-3 rounded-lg bg-white hover:bg-[#F3F0EA] text-[#131313] border border-black/20 text-[12px] font-semibold transition-colors cursor-pointer"
                >
                  Shop and delivery info
                </button>
              </div>
            </div>

            {/* Categories List */}
            <div className="pt-3.5">
              <h2 className="text-[13px] font-bold text-[#131313] mb-2">Categories</h2>

              <nav className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubcategory('all');
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center justify-between py-2 px-2 rounded-lg text-[12.5px] transition-colors cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#2E060D]/[0.08] text-[#2E060D] font-semibold'
                      : 'text-stone-700 hover:bg-black/[0.04]'
                  }`}
                >
                  <span>All Products</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {WHOLESALE_CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        setSelectedSubcategory('all');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center justify-between py-2 px-2 rounded-lg text-[12.5px] transition-colors cursor-pointer group ${
                        active
                          ? 'bg-[#2E060D]/[0.08] text-[#2E060D] font-semibold'
                          : 'text-stone-700 hover:bg-black/[0.04]'
                      }`}
                    >
                      <span className="truncate">{cat.shortName}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${
                          active
                            ? 'text-[#2E060D] translate-x-0.5'
                            : 'text-stone-400 group-hover:translate-x-0.5'
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ════════════════════════════════════════════════════════════════
              2. CENTER COLUMN: Search + Dual Banners + Category Rail + Aisles
             ════════════════════════════════════════════════════════════════ */}
          <main className="flex-1 min-w-0 py-1">
            {/* Rounded Pill Search Bar */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products"
                className="w-full pl-11 pr-10 py-2.5 sm:py-3 rounded-full bg-[#EFECE6] focus:bg-white border border-transparent focus:border-black/15 text-sm text-[#131313] placeholder:text-stone-500 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-300 hover:bg-stone-400 text-stone-800 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Dual Promotional Hero Banners (Pandamart Proportion) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-5">
              {/* Left Banner */}
              <div
                onClick={() => setSelectedCategory('fresh-produce')}
                className="relative rounded-2xl overflow-hidden min-h-[168px] sm:min-h-[188px] p-5 sm:p-6 flex items-center bg-[#2E060D] text-white cursor-pointer group"
              >
                <div className="absolute right-0 inset-y-0 w-[54%] overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2E060D] via-[#2E060D]/40 to-transparent z-10" />
                  <Image
                    src="https://images.unsplash.com/photo-1518843875459-f738682238a6?w=800&auto=format&fit=crop&q=80"
                    alt="Fresh Produce & Prime Butchery"
                    fill
                    unoptimized
                    sizes="400px"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>

                <div className="relative z-20 max-w-[62%] space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
                    Fresh Produce &amp; Prime Butchery
                  </h2>
                  <p className="text-xs text-stone-200 leading-snug">
                    Daily market harvests &amp; prime British butchery cuts
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-white text-[#2E060D] text-[11px] font-bold">
                    Explore Fresh
                  </span>
                </div>
              </div>

              {/* Right Banner */}
              <div
                onClick={() => setSelectedCategory('everyday-grocery')}
                className="relative rounded-2xl overflow-hidden min-h-[168px] sm:min-h-[188px] p-5 sm:p-6 flex items-center bg-[#1B2E22] text-white cursor-pointer group"
              >
                <div className="absolute right-0 inset-y-0 w-[54%] overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1B2E22] via-[#1B2E22]/40 to-transparent z-10" />
                  <Image
                    src="https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=800&auto=format&fit=crop&q=80"
                    alt="Chilled, Frozen & Ambient Larder"
                    fill
                    unoptimized
                    sizes="400px"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>

                <div className="relative z-20 max-w-[62%] space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
                    Chilled, Frozen &amp; Kitchen Larder
                  </h2>
                  <p className="text-xs text-stone-200 leading-snug">
                    Single-vehicle delivery across 13 wholesale ranges
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#F3D08A] text-[#131313] text-[11px] font-bold">
                    Browse Larder
                  </span>
                </div>
              </div>
            </div>

            {/* Horizontal Square Category Tile Strip */}
            <div className="relative mb-7">
              <button
                type="button"
                onClick={() => scrollContainer(categoryRailRef, 'left', 280)}
                aria-label="Scroll categories left"
                className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-black/10 shadow-sm items-center justify-center text-[#131313] hover:bg-[#F5F3EE] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div
                ref={categoryRailRef}
                className="flex items-start gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1 px-0.5"
              >
                {WHOLESALE_CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(active ? 'all' : cat.slug);
                        setSelectedSubcategory('all');
                      }}
                      className="group w-[76px] sm:w-[82px] shrink-0 flex flex-col items-center text-center cursor-pointer"
                    >
                      <div
                        className={`relative w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] rounded-xl overflow-hidden mb-1.5 border transition-colors ${
                          active
                            ? 'border-[#2E060D] ring-2 ring-[#2E060D]/15'
                            : 'bg-[#F3F0EA] border-black/[0.06] group-hover:border-black/20'
                        }`}
                      >
                        <Image
                          src={cat.image}
                          alt={cat.shortName}
                          fill
                          unoptimized
                          sizes="76px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span
                        className={`text-[11px] leading-tight line-clamp-2 ${
                          active
                            ? 'font-bold text-[#2E060D]'
                            : 'font-medium text-stone-700 group-hover:text-[#131313]'
                        }`}
                      >
                        {cat.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollContainer(categoryRailRef, 'right', 280)}
                aria-label="Scroll categories right"
                className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-black/10 shadow-sm items-center justify-center text-[#131313] hover:bg-[#F5F3EE] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* ─── PRODUCT SECTIONS ─── */}
            {isBrowsingAll ? (
              <div className="space-y-8">
                {/* 1. Horizontal Featured Row (Matches Pandamart "SALE" Row) */}
                <section className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-extrabold text-[#131313] tracking-tight uppercase">
                      Popular Wholesale Lines
                    </h2>
                    <button
                      type="button"
                      onClick={() => scrollContainer(featuredRowRef, 'right', 360)}
                      className="text-xs font-semibold text-stone-700 hover:text-[#131313] cursor-pointer"
                    >
                      View All
                    </button>
                  </div>

                  <div className="relative">
                    <div
                      ref={featuredRowRef}
                      className="flex items-start gap-3.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1"
                    >
                      {coreFeaturedProducts.map((prod) => renderProductCard(prod, true))}
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollContainer(featuredRowRef, 'right', 360)}
                      aria-label="Scroll featured products right"
                      className="hidden sm:flex absolute -right-3 top-1/3 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-black/10 shadow-md items-center justify-center text-[#131313] hover:bg-[#F5F3EE] cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </section>

                {/* 2. Category Aisle Sections */}
                {WHOLESALE_CATEGORIES.map((aisle) => {
                  const items = WHOLESALE_PRODUCTS.filter(
                    (p) => p.categorySlug === aisle.slug
                  );
                  if (items.length === 0) return null;

                  return (
                    <section key={aisle.slug} className="pt-4 border-t border-black/[0.06]">
                      <div className="flex items-center justify-between mb-3.5">
                        <h2 className="text-base sm:text-lg font-bold text-[#131313] tracking-tight">
                          {aisle.name}
                        </h2>
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(aisle.slug)}
                          className="text-xs font-semibold text-stone-600 hover:text-[#131313] cursor-pointer"
                        >
                          View All
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5">
                        {items.map((prod) => renderProductCard(prod, false))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              /* Filtered Category or Search Results Grid */
              <div>
                <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-black/[0.07]">
                  <div>
                    <h2 className="text-lg font-bold text-[#131313]">
                      {WHOLESALE_CATEGORIES.find((c) => c.slug === selectedCategory)?.name ||
                        'Search Results'}
                    </h2>
                    <p className="text-xs text-stone-500">
                      {filteredProducts.length} items
                      {searchQuery ? ` matching "${searchQuery}"` : ''}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubcategory('all');
                      setSearchQuery('');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-black/12 hover:bg-[#F5F3EE] text-xs font-semibold text-[#131313] cursor-pointer"
                  >
                    ← All Categories
                  </button>
                </div>

                {/* Subcategory Filter Pills when inside a department */}
                {activeCategoryObject && activeCategoryObject.subcategories.length > 0 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-3 mb-3 border-b border-black/[0.05]">
                    <button
                      type="button"
                      onClick={() => setSelectedSubcategory('all')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                        selectedSubcategory === 'all'
                          ? 'bg-[#2E060D] text-white'
                          : 'bg-white border border-black/10 text-stone-700 hover:bg-[#F5F3EE]'
                      }`}
                    >
                      All {activeCategoryObject.shortName}
                    </button>
                    {activeCategoryObject.subcategories.map((sub) => {
                      const active = selectedSubcategory === sub;
                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => setSelectedSubcategory(sub)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#2E060D] text-white'
                              : 'bg-white border border-black/10 text-stone-700 hover:bg-[#F5F3EE]'
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                )}

                {filteredProducts.length === 0 ? (
                  <div className="rounded-2xl bg-white border border-black/[0.07] p-10 text-center space-y-3">
                    <p className="text-base font-bold text-[#131313]">
                      No products matched &ldquo;{searchQuery}&rdquo;
                    </p>
                    <p className="text-xs text-stone-500 max-w-md mx-auto">
                      Our procurement team sources 1,200+ commercial lines daily. Ask our trade desk to source this item for your kitchen.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomInquiryNotes(`Custom product sourcing enquiry: ${searchQuery}`);
                        setIsInquiryOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#2E060D] text-white text-xs font-semibold cursor-pointer"
                    >
                      Ask Trade Desk to Source
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5">
                    {filteredProducts.map((prod) => renderProductCard(prod, false))}
                  </div>
                )}
              </div>
            )}
          </main>

          {/* ════════════════════════════════════════════════════════════════
              3. RIGHT SIDEBAR: Live Order List + Rootwills Direct CTA
             ════════════════════════════════════════════════════════════════ */}
          <aside className="hidden xl:block w-[305px] 2xl:w-[325px] shrink-0 sticky top-[82px]">
            <div className="rounded-2xl bg-white border border-black/[0.08] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] max-h-[calc(100vh-96px)] flex flex-col">
              {renderRightOrderPanel()}
            </div>
          </aside>
        </div>
      </div>

      {/* ─── MOBILE / TABLET FLOATING ORDER BAR (< xl) ─── */}
      {totalCases > 0 && (
        <div className="fixed bottom-4 inset-x-3.5 z-40 xl:hidden">
          <button
            type="button"
            onClick={() => setMobileCartDrawerOpen(true)}
            className="w-full py-3 px-4 rounded-xl bg-[#2E060D] text-white shadow-lg flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-white text-[#2E060D] text-xs font-bold flex items-center justify-center tabular-nums">
                {totalCases}
              </span>
              <span className="text-xs sm:text-sm font-semibold">
                View Order ({orderList.length} SKUs)
              </span>
            </div>
            <span className="text-xs font-semibold text-[#F3D08A]">
              Rootwills Direct ↗
            </span>
          </button>
        </div>
      )}

      {/* ─── MOBILE / TABLET ORDER DRAWER (< xl) ─── */}
      {mobileCartDrawerOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex justify-end bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full p-4 sm:p-5 flex flex-col relative shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileCartDrawerOpen(false)}
              aria-label="Close order list"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F3EE] flex items-center justify-center text-[#131313]"
            >
              <X className="w-4 h-4" />
            </button>
            {renderRightOrderPanel()}
          </div>
        </div>
      )}

      {/* ─── PRODUCT DETAIL MODAL (CLEAN, NO PUBLIC PRICES) ─── */}
      {quickViewProduct && (
        <div
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 border border-black/10 shadow-xl relative space-y-4 font-sans"
          >
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close product details"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F3EE] flex items-center justify-center text-[#131313] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4 items-start">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#F5F3EE] border border-black/[0.06] shrink-0">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  unoptimized
                  sizes="112px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-1 pr-6">
                <span className="text-[11px] font-semibold text-stone-500">
                  {quickViewProduct.sku} • {quickViewProduct.tempZone}
                </span>
                <h3 className="text-base font-bold text-[#131313] leading-snug">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs font-bold text-[#2E060D]">
                  {quickViewProduct.packSize}
                </p>
                <p className="text-[11px] text-stone-500">
                  Origin: {quickViewProduct.origin}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-black/[0.06]">
              {quickViewProduct.description}
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  updateOrderQty(quickViewProduct, 1);
                  setQuickViewProduct(null);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#2E060D] hover:bg-[#430A14] text-white text-xs font-semibold cursor-pointer transition-transform active:scale-[0.98]"
              >
                Add to Order
              </button>
              <a
                href="/direct"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-[#F5F3EE] hover:bg-[#EAE5DC] text-[#131313] text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Rootwills Direct</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── SHOP & DELIVERY INFO MODAL ─── */}
      {hubInfoModalOpen && (
        <div
          onClick={() => setHubInfoModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 border border-black/10 shadow-xl relative space-y-4 font-sans"
          >
            <button
              type="button"
              onClick={() => setHubInfoModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F3EE] flex items-center justify-center text-[#131313] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#131313]">
              Hub &amp; Delivery Information
            </h3>

            <div className="space-y-2.5 text-xs text-stone-600">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-black/[0.06]">
                <strong className="text-[#131313] block mb-0.5">Distribution Hub</strong>
                The Hub, Nobel Way, Birmingham, B6 7EU &amp; Greater London Trunk Network.
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-black/[0.06]">
                <strong className="text-[#131313] block mb-0.5">Delivery Window &amp; Cutoff</strong>
                11:00 PM night cutoff for 04:00 AM – 07:30 AM pre-dawn kitchen drops.
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-black/[0.06]">
                <strong className="text-[#131313] block mb-0.5">Multi-Temperature Fleet</strong>
                Chilled (1–4°C), prime butchery (0–2°C), frozen (-18°C), and ambient grocery lines delivered in dedicated multi-temperature logistics.
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs font-semibold text-[#131313]">
              <a href="tel:+441616412803" className="flex items-center gap-1.5 hover:underline">
                <Phone className="w-3.5 h-3.5 text-[#2E060D]" /> +44 16164 12803
              </a>
              <button
                type="button"
                onClick={() => setHubInfoModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#2E060D] text-white font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Sourcing Enquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialNotes={customInquiryNotes}
      />
    </div>
  );
}
