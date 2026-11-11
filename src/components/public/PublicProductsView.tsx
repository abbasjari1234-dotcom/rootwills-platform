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
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  SlidersHorizontal,
  PackageCheck,
  ArrowUpRight,
} from 'lucide-react';
import { InquiryModal } from '@/components/public/InquiryModal';
import { WholesaleCheckoutModal } from '@/components/public/WholesaleCheckoutModal';
import {
  WHOLESALE_CATEGORIES,
  WHOLESALE_PRODUCTS,
  type WholesaleCategory,
  type WholesaleCategorySlug,
  type WholesaleProduct,
} from '@/data/wholesaleProducts';
import {
  getProductPricing,
  calculateOrderSummary,
  type ProductPricing,
  type OrderPricingSummary,
} from '@/lib/pricing';

export type { WholesaleCategory, WholesaleCategorySlug, WholesaleProduct };
export { WHOLESALE_CATEGORIES, WHOLESALE_PRODUCTS };

export interface DraftOrderLine {
  product: WholesaleProduct;
  qty: number;
}

export function PublicProductsView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedTempFilter, setSelectedTempFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<WholesaleProduct | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [customInquiryNotes, setCustomInquiryNotes] = useState<string>('');
  const [mobileCartDrawerOpen, setMobileCartDrawerOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [tradeAccount, setTradeAccount] = useState<{ id?: string; company?: string; email?: string; tier?: string } | null>(null);

  // Dynamic category URL router helper
  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    setSelectedSubcategory('all');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (slug === 'all') {
        url.searchParams.delete('dept');
      } else {
        url.searchParams.set('dept', slug);
      }
      window.history.pushState({}, '', url.pathname + url.search);
    }
  };

  // Sync selectedCategory and search query from URL search parameters on mount & popstate
  useEffect(() => {
    const syncFromURL = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const queryParam = params.get('q') || params.get('search');
      if (queryParam) {
        setSearchQuery(queryParam);
      }
      const dept = params.get('dept') || params.get('category');
      if (dept) {
        if (dept === 'repeat-pad') {
          setSelectedCategory('repeat-pad');
        } else {
          const matched = WHOLESALE_CATEGORIES.find(
            (c) =>
              c.slug === dept ||
              c.shortName.toLowerCase().replace(/[^a-z0-9]+/g, '-') === dept ||
              c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === dept
          );
          if (matched) {
            setSelectedCategory(matched.slug);
          }
        }
      } else if (!queryParam) {
        setSelectedCategory('all');
      }
    };

    syncFromURL();
    window.addEventListener('popstate', syncFromURL);
    return () => window.removeEventListener('popstate', syncFromURL);
  }, []);

  // Check trade auth state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasCookie = document.cookie.split(';').some((c) => c.trim().startsWith('rootwills_auth=true'));
      const hasLocal = localStorage.getItem('rootwills_user_logged_in') === 'true';
      if (hasCookie || hasLocal) {
        setIsAuthenticated(true);
        try {
          const stored = localStorage.getItem('rootwills_user_account');
          if (stored && stored !== 'null' && stored !== 'undefined') {
            const parsed = JSON.parse(stored);
            if (parsed && typeof parsed === 'object') {
              setTradeAccount(parsed);
            }
          }
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    document.cookie = 'rootwills_auth=; path=/; max-age=0';
    try {
      localStorage.removeItem('rootwills_user_logged_in');
      localStorage.removeItem('rootwills_user_account');
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setTradeAccount(null);
    window.location.href = '/direct';
  };

  // Initialize draft order list from localStorage if available, or pre-seed sample
  const [orderList, setOrderList] = useState<DraftOrderLine[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('rootwills_direct_draft_order');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed
              .map((item: any) => {
                const found = WHOLESALE_PRODUCTS.find((p) => p.id === item.id);
                if (found) {
                  return { product: found, qty: item.qty || 1 };
                }
                const fallback: WholesaleProduct = {
                  id: item.id,
                  sku: item.sku || 'RW-ITEM',
                  name: item.name || 'Wholesale Line',
                  packSize: item.packSize || 'Case',
                  categorySlug: 'chilled-dairy',
                  image: item.image || '/images/products/placeholder.webp',
                  origin: 'UK',
                  tempZone: 'Ambient',
                  description: item.name || 'Wholesale Catering Item',
                };
                return { product: fallback, qty: item.qty || 1 };
              })
              .filter(Boolean) as DraftOrderLine[];
          }
        }
      } catch {
        // ignore
      }
    }
    return [
      { product: WHOLESALE_PRODUCTS[0], qty: 2 },
      { product: WHOLESALE_PRODUCTS[2], qty: 1 },
      { product: WHOLESALE_PRODUCTS[18], qty: 2 },
    ];
  });

  const popularAddonRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync draft order list to localStorage
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
      // ignore
    }
  }, [orderList]);

  // Direct visitor to Rootwills Direct ordering portal
  const directToRootwillsDirect = () => {
    if (orderList.length === 0) return;
    setMobileCartDrawerOpen(false);

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
      // ignore
    }

    const isProd = typeof window !== 'undefined' && !window.location.hostname.includes('localhost');
    if (isProd && !window.location.hostname.includes('rootwillsdirect')) {
      window.location.href = 'https://rootwillsdirect.co.uk';
    } else {
      window.location.href = '/direct';
    }
  };

  const handlePrimaryCartAction = () => {
    if (orderList.length === 0) return;
    setMobileCartDrawerOpen(false);

    if (isAuthenticated) {
      setIsCheckoutModalOpen(true);
    } else {
      directToRootwillsDirect();
    }
  };

  const scrollContainer = (
    ref: React.RefObject<HTMLDivElement>,
    direction: 'left' | 'right',
    distance = 260
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

  const clearEntireOrder = () => {
    setOrderList([]);
    try {
      localStorage.removeItem('rootwills_direct_draft_order');
    } catch {
      // ignore
    }
  };

  const totalCases = useMemo(
    () => orderList.reduce((sum, item) => sum + item.qty, 0),
    [orderList]
  );

  const orderSummary = useMemo<OrderPricingSummary>(
    () => calculateOrderSummary(orderList, tradeAccount?.tier),
    [orderList, tradeAccount?.tier]
  );

  // Exact SKU counts per category slug
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: WHOLESALE_PRODUCTS.length };
    WHOLESALE_CATEGORIES.forEach((cat) => {
      counts[cat.slug] = 0;
    });
    WHOLESALE_PRODUCTS.forEach((prod) => {
      if (counts[prod.categorySlug] !== undefined) {
        counts[prod.categorySlug]++;
      }
    });
    return counts;
  }, []);

  const popularAddons = useMemo(
    () => WHOLESALE_PRODUCTS.filter((p) => p.popularAddon),
    []
  );

  const activeCategoryObject = useMemo(() => {
    return WHOLESALE_CATEGORIES.find((c) => c.slug === selectedCategory);
  }, [selectedCategory]);

  // Core items for standing repeat reorders
  const standingSKUs = useMemo(
    () => ['RW-796010', 'RW-858770', 'RW-724530', 'RW-350500', 'RW-603620', 'RW-795661', 'RW-240250', 'RW-826070'],
    []
  );

  const handleLoadStandingOrder = () => {
    const defaultDrop = ['RW-796010', 'RW-858770', 'RW-724530', 'RW-350500'];
    const items = defaultDrop
      .map((sku) => WHOLESALE_PRODUCTS.find((p) => p.sku === sku))
      .filter(Boolean)
      .map((p) => ({ product: p!, qty: 2 }));
    if (items.length > 0) {
      setOrderList(items);
    }
  };

  // Filter products based on search, category, subcategory, and temperature zone
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

      if (selectedCategory === 'repeat-pad') {
        const isStanding = standingSKUs.includes(p.sku) || Boolean(p.featuredCore || p.popularAddon);
        return isStanding;
      }

      if (selectedCategory !== 'all') {
        if (p.categorySlug !== selectedCategory) return false;
        if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) {
          return false;
        }
      }

      if (selectedTempFilter !== 'all') {
        if (selectedTempFilter === 'chilled' && !p.tempZone.includes('Chilled')) return false;
        if (selectedTempFilter === 'butchery' && !p.tempZone.includes('Butchery')) return false;
        if (selectedTempFilter === 'frozen' && !p.tempZone.includes('Frozen')) return false;
        if (selectedTempFilter === 'ambient' && !p.tempZone.includes('Ambient')) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedSubcategory, searchQuery, selectedTempFilter, standingSKUs]);

  const isBrowsingAll =
    selectedCategory === 'all' &&
    searchQuery.trim() === '' &&
    selectedTempFilter === 'all';

  // ════════════════════════════════════════════════════════════════
  // ELEVATED PRODUCT CARD — Clean, Spacious, Refined B2B Hierarchy
  // ════════════════════════════════════════════════════════════════
  const renderProductCard = (product: WholesaleProduct, compact = false) => {
    const qty = getQty(product.id);
    const pricing = getProductPricing(product, tradeAccount?.tier);

    return (
      <div
        key={product.id}
        onClick={() => setQuickViewProduct(product)}
        className={`group relative flex flex-col justify-between bg-white rounded-2xl p-3.5 sm:p-4 border transition-all duration-200 cursor-pointer select-none ${
          qty > 0
            ? 'border-[#BA8E4E] ring-1 ring-[#BA8E4E]/50 shadow-[0_4px_16px_rgba(186,142,78,0.12)]'
            : 'border-[#E8DEC8]/90 hover:border-[#BA8E4E]/80 hover:shadow-[0_8px_24px_rgba(46,6,13,0.07)] shadow-[0_1px_3px_rgba(46,6,13,0.02)]'
        } ${compact ? 'w-[160px] sm:w-[175px] shrink-0' : 'w-full'}`}
      >
        <div>
          {/* Balanced Image Stage: Compact, Clean & Centered */}
          <div className="relative w-full h-[142px] sm:h-[154px] rounded-xl overflow-hidden bg-white border border-[#F2ECE1] flex items-center justify-center p-2.5 mb-2.5">
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              referrerPolicy="no-referrer"
              sizes="240px"
              className="object-contain p-1.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
          </div>

          {/* Line 1: Clear, High-Contrast Commercial Pack Size */}
          <div className="mb-0.5">
            <span className="text-[11.5px] font-bold text-[#8B2635] tracking-tight">
              {product.packSize}
            </span>
          </div>

          {/* Line 2: Product Name with Clean Readability */}
          <h4
            title={product.name}
            className="text-[13px] sm:text-[13.5px] font-semibold text-stone-900 group-hover:text-[#2E060D] leading-[1.3] line-clamp-2 min-h-[34px] transition-colors"
          >
            {product.name}
          </h4>

          {/* Line 3: B2B Wholesale Pricing Bar (Bidfood / Brakes benchmark) */}
          <div className="mt-1.5 pt-1 border-t border-[#F2ECE1]/70 flex items-baseline justify-between">
            {isAuthenticated ? (
              <div className="flex items-baseline gap-1">
                <span className="text-[13px] font-bold font-mono text-[#2E060D] tracking-tight">
                  {pricing.formattedPrice}
                </span>
                <span className="text-[10px] text-stone-500 font-sans">
                  /cs
                </span>
                {pricing.unitPrice && (
                  <span className="text-[9.5px] text-stone-400 font-mono hidden sm:inline ml-0.5">
                    ({pricing.unitPrice})
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-stone-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E]" />
                <span>Trade Quote</span>
              </div>
            )}
            <span className="text-[9.5px] font-mono text-stone-400">
              {pricing.vatRate === 0 ? '0% VAT' : '+20% VAT'}
            </span>
          </div>

          {/* Line 4: Subtle Secondary Metadata (Clean SKU & Zone) */}
          <div className="text-[10.5px] font-mono text-stone-400 mt-0.5 flex items-center justify-between">
            <span>{product.sku}</span>
            <span className="text-stone-500 font-sans text-[11px]">
              {product.tempZone.replace(' 1–4°C', '').replace(' 0–2°C', '').replace(' -18°C', '')}
            </span>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div
          className="mt-3 pt-2.5 border-t border-[#F2ECE1] flex items-center justify-between gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {qty === 0 ? (
            <button
              type="button"
              onClick={() => updateOrderQty(product, 1)}
              aria-label={`Add ${product.name}`}
              className="w-full py-1.5 px-3 rounded-lg bg-[#FAF8F5] hover:bg-[#2E060D] text-[#2E060D] hover:text-white border border-[#E8DEC8] hover:border-[#2E060D] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs group/btn"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5] text-[#BA8E4E] group-hover/btn:text-white transition-colors" />
              <span>Add to Order</span>
            </button>
          ) : (
            <div className="w-full flex items-center justify-between bg-[#2E060D] text-white rounded-lg px-2 py-1 shadow-xs">
              <button
                type="button"
                onClick={() => updateOrderQty(product, -1)}
                aria-label="Decrease quantity"
                className="w-6 h-6 rounded hover:bg-white/10 text-white/90 hover:text-white flex items-center justify-center transition-transform duration-150 active:scale-90 cursor-pointer"
              >
                {qty === 1 ? (
                  <Trash2 className="w-3.5 h-3.5 text-rose-300" />
                ) : (
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
              </button>
              <div className="flex items-center gap-1">
                <span className="font-mono text-xs font-bold text-white tabular-nums">
                  {qty}
                </span>
                <span className="text-[10px] text-[#F3D08A] uppercase font-mono">
                  {qty === 1 ? 'case' : 'cases'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateOrderQty(product, 1)}
                aria-label="Increase quantity"
                className="w-6 h-6 rounded hover:bg-white/10 text-white/90 hover:text-white flex items-center justify-center transition-transform duration-150 active:scale-90 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════
  // RIGHT ORDER PANEL: Wholesale Manifest & Direct Routing
  // ════════════════════════════════════════════════════════════════
  const renderRightOrderPanel = () => (
    <div className="flex flex-col h-full font-sans">
      {/* Delivery Guarantee Header */}
      <div className="text-center pb-3 border-b border-[#E8DEC8]">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF5EB] text-[#2E060D] border border-[#E8DEC8] mb-1.5">
          <Truck className="w-4 h-4 text-[#BA8E4E]" />
        </div>
        <div className="text-[11px] font-mono text-emerald-800 font-semibold mb-0.5">
          Pre-Dawn Dispatch (04:00 – 07:30 AM)
        </div>
        <h3 className="text-sm font-bold text-[#2E060D]">
          Commercial Order Manifest
        </h3>
        <p className="text-[11px] text-stone-500">
          Temperature-Controlled Multi-Drop
        </p>
      </div>

      {/* Selected Items Scroll Area */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#F2ECE1] py-2 max-h-[320px] pr-1 [scrollbar-width:thin]">
        {orderList.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-center mx-auto text-stone-400">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            </div>
            <p className="text-xs font-bold text-[#131313]">Order list is currently empty</p>
            <p className="text-[11px] text-stone-500 max-w-[210px] mx-auto leading-relaxed">
              Tap &ldquo;Add to Order&rdquo; on any line to prepare your morning kitchen drop.
            </p>
          </div>
        ) : (
          orderList.map(({ product, qty }) => {
            const pricing = getProductPricing(product, tradeAccount?.tier);
            const lineTotal = pricing.contractPrice * qty;
            return (
              <div key={product.id} className="py-2.5 flex items-center justify-between gap-2.5 group">
                {/* Product Thumbnail */}
                <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-white border border-[#E8DEC8] shrink-0 p-1">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    referrerPolicy="no-referrer"
                    sizes="44px"
                    className="object-contain p-0.5"
                  />
                </div>

                {/* Title & Pack Size & Financials */}
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-medium text-stone-900 leading-snug line-clamp-1 group-hover:text-[#2E060D] transition-colors">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-semibold text-[#8B2635]">
                      {product.packSize}
                    </span>
                    {isAuthenticated ? (
                      <span className="text-[11px] font-mono font-bold text-[#2E060D]">
                        £{lineTotal.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-[10px] text-stone-400 font-medium">
                        Quote Line
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-stone-400 truncate">
                      {product.sku}
                    </span>
                  </div>
                </div>

                {/* Compact Stepper */}
                <div className="shrink-0">
                  <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E8DEC8] rounded-lg px-1.5 py-0.5 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => updateOrderQty(product, -1)}
                      aria-label="Decrease item"
                      className="w-5 h-5 rounded hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
                    >
                      {qty === 1 ? (
                        <Trash2 className="w-3.5 h-3.5 text-rose-700" />
                      ) : (
                        <Minus className="w-3.5 h-3.5 stroke-[2.25]" />
                      )}
                    </button>
                    <span className="text-xs font-mono font-bold text-[#2E060D] tabular-nums min-w-[14px] text-center">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateOrderQty(product, 1)}
                      aria-label="Increase item"
                      className="w-5 h-5 rounded hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.25]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Frequently Paired Lines Mini Carousel */}
      <div className="pt-3 pb-2.5 border-t border-[#E8DEC8]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#BA8E4E]" />
            <h4 className="text-[11px] font-semibold text-[#2E060D]">
              Frequently Paired
            </h4>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollContainer(popularAddonRef, 'left', 160)}
              aria-label="Scroll left"
              className="w-5 h-5 rounded-md bg-[#FAF8F5] border border-[#E8DEC8] flex items-center justify-center text-stone-600 hover:text-[#2E060D] cursor-pointer"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => scrollContainer(popularAddonRef, 'right', 160)}
              aria-label="Scroll right"
              className="w-5 h-5 rounded-md bg-[#FAF8F5] border border-[#E8DEC8] flex items-center justify-center text-stone-600 hover:text-[#2E060D] cursor-pointer"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div
          ref={popularAddonRef}
          className="flex items-start gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1"
        >
          {popularAddons.map((addon) => {
            const addonQty = getQty(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => setQuickViewProduct(addon)}
                className="w-[92px] shrink-0 flex flex-col cursor-pointer group"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white mb-1 border border-[#E8DEC8] p-1">
                  <Image
                    src={addon.image}
                    alt={addon.name}
                    fill
                    unoptimized
                    referrerPolicy="no-referrer"
                    sizes="92px"
                    className="object-contain p-1 group-hover:scale-105 transition-transform"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateOrderQty(addon, 1);
                    }}
                    aria-label={`Add ${addon.name}`}
                    className="absolute bottom-1 right-1 w-5 h-5 rounded-md bg-[#2E060D] hover:bg-[#430A14] text-white shadow-xs flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
                  >
                    {addonQty > 0 ? (
                      <span className="text-[9.5px] font-mono font-bold">{addonQty}</span>
                    ) : (
                      <Plus className="w-3 h-3 stroke-[2.5]" />
                    )}
                  </button>
                </div>
                <div className="text-[10px] font-semibold text-[#8B2635] truncate">
                  {addon.packSize}
                </div>
                <p className="text-[10.5px] text-stone-600 line-clamp-1 leading-tight">
                  {addon.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Breakdown & Primary CTA (Bidfood wholesale invoice estimation) */}
      <div className="pt-3 border-t border-[#E8DEC8] space-y-2">
        <div className="space-y-1.5 text-xs">
          <div className="flex items-baseline justify-between text-stone-600">
            <span>Lines & Cases:</span>
            <span className="font-semibold text-stone-900">
              {orderList.length} {orderList.length === 1 ? 'SKU' : 'SKUs'} · {totalCases} {totalCases === 1 ? 'Case' : 'Cases'}
            </span>
          </div>

          <div className="flex items-baseline justify-between text-[11.5px] text-stone-500">
            <span>Goods Net:</span>
            <span className="font-mono font-medium text-stone-800">
              {isAuthenticated ? orderSummary.formattedSubtotal : 'Trade Contract'}
            </span>
          </div>

          <div className="flex items-baseline justify-between text-[11px] text-stone-500">
            <span>Est. VAT (0% Food):</span>
            <span className="font-mono text-stone-700">
              {isAuthenticated ? (
                orderSummary.vatTotal === 0 ? '£0.00 (Zero-Rated)' : orderSummary.formattedVat
              ) : (
                '0% Zero-Rated'
              )}
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1 border-t border-[#E8DEC8]/70">
            <span className="font-bold text-[#2E060D]">Est. Total Value:</span>
            <span className="text-base font-bold text-[#2E060D] tabular-nums font-mono">
              {isAuthenticated ? orderSummary.formattedGrandTotal : 'Contract Quote'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrimaryCartAction}
          disabled={orderList.length === 0}
          className="w-full py-3.5 px-4 rounded-xl bg-[#2E060D] hover:bg-[#430A14] disabled:opacity-40 disabled:cursor-not-allowed text-white font-sans font-semibold text-[13px] transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-sm"
        >
          {isAuthenticated ? (
            <>
              <span>Place Pre-Dawn Order · {orderSummary.formattedGrandTotal}</span>
              <ArrowRight className="w-4 h-4 text-[#F3D08A]" />
            </>
          ) : (
            <>
              <span>Order on Rootwills Direct</span>
              <ArrowRight className="w-4 h-4 text-[#F3D08A]" />
            </>
          )}
        </button>

        {orderList.length > 0 && (
          <button
            type="button"
            onClick={clearEntireOrder}
            className="w-full text-center text-[10.5px] text-stone-400 hover:text-rose-700 transition-colors cursor-pointer py-0.5"
          >
            Clear Current Draft
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#131313] font-sans pt-[72px] sm:pt-[86px] pb-20">
      {/* Seamless Botanical Parchment Texture Overlay matching Rootwills Theme */}
      <div
        className="fixed inset-0 z-0 bg-repeat pointer-events-none opacity-[0.22] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />

      {/* ─── 3-COLUMN WHOLESALE PLATFORM ARCHITECTURE ─── */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-start gap-5 lg:gap-6">
          {/* ════════════════════════════════════════════════════════════════
              1. LEFT SIDEBAR: Executive B2B Department Navigation
             ════════════════════════════════════════════════════════════════ */}
          <aside className="hidden lg:block w-[235px] xl:w-[255px] shrink-0 sticky top-[92px] max-h-[calc(100vh-104px)] overflow-y-auto pr-3.5 border-r border-[#E8DEC8]/80 [scrollbar-width:thin]">
            {/* Store Identity & Dispatch Information */}
            <div className="pb-3.5 border-b border-[#E8DEC8] space-y-1.5">
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-[#BA8E4E]/80 shadow-2xs shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Rootwills Master Seal"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-[14.5px] font-bold text-[#2E060D] leading-none">
                    Rootwills Larder
                  </h1>
                  <span className="text-[11px] text-stone-500 block mt-0.5">
                    UK Hospitality Purveyor
                  </span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-stone-600">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#BA8E4E]" />
                  <span>Fleet 04:00–07:30</span>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#FAF5EB] border border-[#E8DEC8] text-[10px] font-semibold text-[#8C6E12]">
                  Daily
                </span>
              </div>
            </div>

            {/* Authenticated Trade Account Status */}
            {isAuthenticated ? (
              <div className="mt-3 p-2.5 rounded-xl bg-white border border-[#BA8E4E]/40 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-800 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Partner
                  </span>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="text-[10.5px] text-stone-500 hover:text-rose-700 underline font-medium cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
                <div className="text-xs font-bold text-[#2E060D] truncate">
                  {tradeAccount?.company || 'Commercial Partner'}
                </div>
                <div className="text-[10px] font-mono text-stone-500">
                  {tradeAccount?.id || 'RW-TRADE'}
                </div>
              </div>
            ) : (
              <div className="mt-3 p-2.5 rounded-xl bg-white/70 border border-[#E8DEC8] text-[11px] text-stone-600 flex items-center justify-between">
                <span>Guest Catalog View</span>
                <a
                  href="/direct"
                  className="text-[10.5px] font-semibold text-[#8B2635] hover:underline flex items-center gap-0.5"
                >
                  Trade Login <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Standing Repeat Order Pad Filter */}
            <div className="mt-3 pb-3 border-b border-[#E8DEC8]">
              <button
                type="button"
                onClick={() => {
                  handleSelectCategory('repeat-pad');
                  setSearchQuery('');
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                  selectedCategory === 'repeat-pad'
                    ? 'bg-[#2E060D] text-white font-bold shadow-xs'
                    : 'bg-[#FAF5EB] text-[#2E060D] border border-[#E8DEC8] hover:bg-[#F3E8D3]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#BA8E4E]" />
                  <span className="font-semibold">Standing Order Pad</span>
                </div>
                <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-[#BA8E4E]/20 text-[#8C6E12] font-bold">
                  Fast
                </span>
              </button>
            </div>

            {/* Departments Navigation List */}
            <div className="pt-3">
              <div className="mb-2 px-1 flex items-center justify-between">
                <h2 className="text-[11px] font-mono text-stone-500 font-semibold uppercase tracking-wider">
                  Departments
                </h2>
                <span className="text-[10.5px] font-mono text-stone-400">
                  {WHOLESALE_PRODUCTS.length} Lines
                </span>
              </div>

              <nav className="space-y-1">
                {/* All Products Option */}
                <button
                  type="button"
                  onClick={() => {
                    handleSelectCategory('all');
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-[13px] transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#2E060D] text-white font-medium shadow-xs border-l-4 border-[#BA8E4E]'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-black/[0.03]'
                  }`}
                >
                  <span>All Departments</span>
                  <span
                    className={`text-[10.5px] font-mono px-1.5 py-0.2 rounded-md ${
                      selectedCategory === 'all'
                        ? 'bg-white/20 text-white font-semibold'
                        : 'text-stone-500'
                    }`}
                  >
                    {WHOLESALE_PRODUCTS.length}
                  </span>
                </button>

                {/* Category Slugs with Dynamic SKU Counts */}
                {WHOLESALE_CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat.slug;
                  const count = categoryCounts[cat.slug] || 0;

                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => {
                        handleSelectCategory(cat.slug);
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-[13px] transition-all cursor-pointer group ${
                        active
                          ? 'bg-[#2E060D] text-white font-medium shadow-xs border-l-4 border-[#BA8E4E]'
                          : 'text-stone-700 hover:text-stone-900 hover:bg-black/[0.03]'
                      }`}
                    >
                      <span className="truncate">{cat.shortName}</span>
                      <span
                        className={`text-[10.5px] font-mono px-1.5 py-0.2 rounded-md shrink-0 ml-1.5 ${
                          active
                            ? 'bg-white/20 text-[#F3D08A] font-bold'
                            : 'text-stone-500'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ════════════════════════════════════════════════════════════════
              2. CENTER COLUMN: Search Command Strip + Catalog Aisles
             ════════════════════════════════════════════════════════════════ */}
          <main className="flex-1 min-w-0 py-0.5">
            {/* MOBILE ONLY: Horizontal Department Rail (< lg) */}
            <div className="lg:hidden mb-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex items-center gap-1.5 pb-1">
              <button
                type="button"
                onClick={() => {
                  handleSelectCategory('all');
                  setSearchQuery('');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[#2E060D] text-white shadow-2xs'
                    : 'bg-white/90 border border-[#E8DEC8] text-stone-700'
                }`}
              >
                All ({WHOLESALE_PRODUCTS.length})
              </button>
              {WHOLESALE_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => {
                      handleSelectCategory(cat.slug);
                      setSearchQuery('');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                      active
                        ? 'bg-[#2E060D] text-white shadow-2xs'
                        : 'bg-white/90 border border-[#E8DEC8] text-stone-700'
                    }`}
                  >
                    {cat.shortName}
                  </button>
                );
              })}
            </div>

            {/* Elevated Search Command Bar */}
            <div className="relative mb-4">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#BA8E4E] absolute left-4 pointer-events-none stroke-[2.25]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 5,480+ lines by name, pack size, cut, or SKU (e.g. RW-796010)..."
                  className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-white focus:bg-white border border-[#E8DEC8] focus:border-[#BA8E4E] focus:ring-2 focus:ring-[#BA8E4E]/20 text-sm text-stone-900 placeholder:text-stone-400 outline-none shadow-[0_2px_12px_rgba(46,6,13,0.03)] transition-all font-sans"
                />
                <div className="absolute right-3 flex items-center gap-1.5">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="w-6 h-6 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-[#FAF5EB] border border-[#E8DEC8] text-[10px] font-mono text-stone-500">
                    5,480+ Lines
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Storage Zone Filter Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-5 pb-1">
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-[#BA8E4E]" />
                Zone:
              </span>
              {[
                { id: 'all', label: 'All Storage Zones' },
                { id: 'chilled', label: 'Chilled' },
                { id: 'butchery', label: 'Butchery' },
                { id: 'frozen', label: 'Frozen' },
                { id: 'ambient', label: 'Ambient' },
              ].map((filter) => {
                const active = selectedTempFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setSelectedTempFilter(filter.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
                      active
                        ? 'bg-[#2E060D] text-white shadow-2xs font-semibold'
                        : 'bg-white hover:bg-stone-50 text-stone-700 border border-[#E8DEC8]'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* Compact Standing Order Pad Banner */}
            {selectedCategory === 'repeat-pad' && (
              <div className="mb-5 p-3 sm:py-3 sm:px-4 rounded-xl bg-white border border-[#BA8E4E]/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF5EB] border border-[#E8DEC8] flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#BA8E4E]" />
                  </div>
                  <div>
                    <h2 className="text-[13.5px] font-bold text-[#2E060D] leading-none">
                      Standing Order Pad
                    </h2>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      8 essential daily kitchen lines for pre-dawn drop (04:00 – 07:30 AM).
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLoadStandingOrder}
                  className="py-1.5 px-3.5 rounded-lg bg-[#2E060D] hover:bg-[#430A14] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0"
                >
                  <PackageCheck className="w-3.5 h-3.5 text-[#F3D08A]" />
                  <span>Load Standard Drop (8 Cases)</span>
                </button>
              </div>
            )}

            {/* ─── PRODUCT CATALOG CONTENT (SPACIOUS 3-4 COLUMN GRID) ─── */}
            {isBrowsingAll ? (
              <div className="space-y-10">
                {WHOLESALE_CATEGORIES.map((aisle) => {
                  const items = WHOLESALE_PRODUCTS.filter(
                    (p) => p.categorySlug === aisle.slug
                  );
                  if (items.length === 0) return null;

                  return (
                    <section key={aisle.slug} className="pt-2 first:pt-0">
                      {/* Department Heading with SKU count & View All */}
                      <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#E8DEC8]">
                        <div className="flex items-center gap-2">
                          <h2 className="text-base sm:text-lg font-bold text-[#2E060D] tracking-tight">
                            {aisle.name}
                          </h2>
                          <span className="text-[11px] font-mono px-2 py-0.2 rounded-md bg-[#FAF5EB] text-stone-600 border border-[#E8DEC8]">
                            {items.length} Lines
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            handleSelectCategory(aisle.slug);
                            window.scrollTo({ top: 120, behavior: 'smooth' });
                          }}
                          className="text-xs font-semibold text-[#8B2635] hover:text-[#2E060D] flex items-center gap-1 group cursor-pointer"
                        >
                          <span>View all {items.length} lines</span>
                          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                        </button>
                      </div>

                      {/* Spacious 3-4 Column Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-4.5">
                        {items.slice(0, 8).map((prod) => renderProductCard(prod, false))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              /* Filtered Department or Search Results View */
              <div>
                {/* Active View Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8DEC8]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-[#2E060D]">
                        {WHOLESALE_CATEGORIES.find((c) => c.slug === selectedCategory)?.name ||
                          (selectedCategory === 'repeat-pad' ? 'Standing Order Pad' : 'Product Search')}
                      </h2>
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-[#FAF5EB] border border-[#E8DEC8] text-stone-700">
                        {filteredProducts.length} Matching
                      </span>
                    </div>
                    {searchQuery && (
                      <p className="text-xs font-mono text-stone-500 mt-1">
                        Searching across 5,480+ lines for &ldquo;{searchQuery}&rdquo;
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleSelectCategory('all');
                      setSelectedTempFilter('all');
                      setSearchQuery('');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E8DEC8] hover:border-[#BA8E4E] hover:bg-[#FAF7F2] text-xs font-semibold text-[#2E060D] transition-all cursor-pointer shadow-2xs"
                  >
                    ← All Departments
                  </button>
                </div>

                {/* Subcategory Pills when browsing inside a category */}
                {activeCategoryObject && activeCategoryObject.subcategories.length > 0 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2.5 mb-5 border-b border-[#E8DEC8]/60">
                    <button
                      type="button"
                      onClick={() => setSelectedSubcategory('all')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                        selectedSubcategory === 'all'
                          ? 'bg-[#2E060D] text-white shadow-2xs'
                          : 'bg-white border border-[#E8DEC8] text-stone-700 hover:bg-[#FAF7F2]'
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
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                            active
                              ? 'bg-[#2E060D] text-white shadow-2xs'
                              : 'bg-white border border-[#E8DEC8] text-stone-700 hover:bg-[#FAF7F2]'
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Empty State / Custom Sourcing Fallback */}
                {filteredProducts.length === 0 ? (
                  <div className="rounded-2xl bg-white border border-[#E8DEC8] p-10 text-center space-y-3.5 shadow-2xs">
                    <div className="w-12 h-12 rounded-full bg-[#FAF5EB] border border-[#E8DEC8] flex items-center justify-center mx-auto text-[#BA8E4E]">
                      <Search className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <p className="text-base font-bold text-[#2E060D]">
                      No commercial lines matching &ldquo;{searchQuery}&rdquo;
                    </p>
                    <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                      Our commercial procurement team sources daily fresh wholesale lines directly across UK wholesale markets. Contact our Birmingham trade desk for instant sourcing of this cut or brand.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomInquiryNotes(`Commercial product sourcing request: ${searchQuery}`);
                        setIsInquiryOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#2E060D] hover:bg-[#430A14] text-white text-xs font-semibold cursor-pointer transition-all active:scale-95 shadow-sm"
                    >
                      Request Sourcing from Trade Desk
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-4.5">
                    {filteredProducts.map((prod) => renderProductCard(prod, false))}
                  </div>
                )}
              </div>
            )}
          </main>

          {/* ════════════════════════════════════════════════════════════════
              3. RIGHT SIDEBAR: Live Order Manifest + Direct Portal Action
             ════════════════════════════════════════════════════════════════ */}
          <aside className="hidden xl:block w-[310px] 2xl:w-[335px] shrink-0 sticky top-[92px]">
            <div className="rounded-2xl bg-white border border-[#E8DEC8] p-4 shadow-[0_4px_24px_rgba(46,6,13,0.05)] max-h-[calc(100vh-108px)] flex flex-col">
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
            className="w-full py-3.5 px-4 rounded-2xl bg-[#2E060D] text-white shadow-xl flex items-center justify-between cursor-pointer border border-[#BA8E4E]/40"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#BA8E4E] text-[#2E060D] text-xs font-bold flex items-center justify-center tabular-nums font-mono">
                {totalCases}
              </span>
              <span className="text-xs sm:text-sm font-semibold">
                Kitchen Order ({orderList.length} SKUs)
              </span>
            </div>
            <span className="text-xs font-semibold text-[#F3D08A] flex items-center gap-1">
              <span>View Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      )}

      {/* ─── MOBILE / TABLET ORDER DRAWER (< xl) ─── */}
      {mobileCartDrawerOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full p-4 sm:p-5 flex flex-col relative shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileCartDrawerOpen(false)}
              aria-label="Close order drawer"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF5EB] border border-[#E8DEC8] flex items-center justify-center text-[#2E060D]"
            >
              <X className="w-4 h-4" />
            </button>
            {renderRightOrderPanel()}
          </div>
        </div>
      )}

      {/* ─── B2B QUICK VIEW MODAL ─── */}
      {quickViewProduct && (() => {
        const productQty = getQty(quickViewProduct.id);
        const categoryObj = WHOLESALE_CATEGORIES.find((c) => c.slug === quickViewProduct.categorySlug);

        return (
          <div
            onClick={() => setQuickViewProduct(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 border border-[#E8DEC8] shadow-[0_25px_70px_rgba(46,6,13,0.25)] relative space-y-5 font-sans overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                aria-label="Close product details"
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#2E060D] text-stone-600 hover:text-white border border-[#E8DEC8] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-start">
                {/* Left: Product Image Stage */}
                <div className="sm:col-span-5 flex flex-col items-center">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-[#EFE8D8] flex items-center justify-center p-4">
                    <Image
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      fill
                      unoptimized
                      referrerPolicy="no-referrer"
                      sizes="280px"
                      className="object-contain p-3"
                    />
                  </div>

                  {/* Quality Assurance Badges */}
                  <div className="w-full mt-3 flex items-center justify-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF5EB] border border-[#E8DEC8] text-[10px] font-mono font-semibold text-[#2E060D]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#BA8E4E]" />
                      Trade Assured
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF5EB] border border-[#E8DEC8] text-[10px] font-mono font-semibold text-[#2E060D]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      100% Pork-Free
                    </span>
                  </div>
                </div>

                {/* Right: Commercial Specifications & Actions */}
                <div className="sm:col-span-7 space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-[#2E060D]/5 border border-[#2E060D]/10 text-[10.5px] font-mono font-bold text-[#2E060D]">
                        SKU: {quickViewProduct.sku}
                      </span>
                      <span className="text-[11px] font-mono text-stone-500">
                        {quickViewProduct.tempZone}
                      </span>
                      {categoryObj && (
                        <span className="text-[11px] font-sans font-medium text-stone-500">
                          {categoryObj.shortName}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#131313] leading-snug pt-0.5">
                      {quickViewProduct.name}
                    </h3>

                    <div className="inline-block text-sm font-semibold text-[#8B2635]">
                      Pack Size: {quickViewProduct.packSize}
                    </div>
                  </div>

                  {/* B2B Wholesale Pricing Card (Bidfood Direct spec) */}
                  {(() => {
                    const pricing = getProductPricing(quickViewProduct, tradeAccount?.tier);
                    return (
                      <div className="p-3.5 rounded-xl bg-[#FAF5EB] border border-[#BA8E4E]/40 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-mono font-bold text-[#8B2635] uppercase tracking-wider">
                            Wholesale Contract Pricing
                          </div>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="text-xl font-bold font-mono text-[#2E060D]">
                              {isAuthenticated ? pricing.formattedPrice : 'Trade Account Rate'}
                            </span>
                            <span className="text-xs text-stone-600 font-sans">/ case</span>
                            {pricing.unitPrice && isAuthenticated && (
                              <span className="text-xs font-mono text-stone-500">({pricing.unitPrice})</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-0.5 rounded bg-white border border-[#E8DEC8] text-[10px] font-mono font-bold text-stone-700">
                            {pricing.vatRate === 0 ? '0% Zero-Rated Food' : '+20% Standard VAT'}
                          </span>
                          <div className="text-[10px] text-stone-500 mt-1">
                            {isAuthenticated ? pricing.tierLabel : 'Login to view contract rate'}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Description Box */}
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DEC8] text-xs text-stone-600 leading-relaxed space-y-2">
                    <p>{quickViewProduct.description}</p>
                    <div className="pt-2 border-t border-[#E8DEC8]/60 flex items-center justify-between text-[10.5px] font-mono text-stone-500">
                      <span>Dispatch: Pre-Dawn 04:00 – 07:30</span>
                      <span>Origin: {quickViewProduct.origin}</span>
                    </div>
                  </div>

                  {/* Actions & Quantity */}
                  <div className="pt-2 space-y-2.5">
                    <div className="flex items-center gap-3">
                      {productQty === 0 ? (
                        <button
                          type="button"
                          onClick={() => updateOrderQty(quickViewProduct, 1)}
                          className="flex-1 py-3 px-4 rounded-xl bg-[#2E060D] hover:bg-[#430A14] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm cursor-pointer"
                        >
                          <Plus className="w-4 h-4 stroke-[2.5] text-[#F3D08A]" />
                          <span>Add to Order</span>
                        </button>
                      ) : (
                        <div className="flex-1 flex items-center justify-between bg-[#FAF5EB] border border-[#BA8E4E] rounded-xl px-3 py-2 shadow-2xs">
                          <span className="text-xs font-semibold text-[#2E060D] flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>In Order:</span>
                          </span>
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => updateOrderQty(quickViewProduct, -1)}
                              className="w-7 h-7 rounded-lg bg-white border border-[#E8DEC8] hover:bg-stone-100 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
                            >
                              {productQty === 1 ? (
                                <Trash2 className="w-3.5 h-3.5 text-rose-700" />
                              ) : (
                                <Minus className="w-3.5 h-3.5 text-[#2E060D]" />
                              )}
                            </button>
                            <span className="font-mono text-sm font-bold text-[#2E060D] tabular-nums min-w-[20px] text-center">
                              {productQty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateOrderQty(quickViewProduct, 1)}
                              className="w-7 h-7 rounded-lg bg-white border border-[#E8DEC8] hover:bg-stone-100 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5 text-[#2E060D]" />
                            </button>
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setQuickViewProduct(null);
                          handlePrimaryCartAction();
                        }}
                        className="py-3 px-4 rounded-xl bg-[#2E060D] hover:bg-[#430A14] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                      >
                        <span>Checkout</span>
                        <ArrowRight className="w-4 h-4 text-[#F3D08A]" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setCustomInquiryNotes(`Special inquiry for ${quickViewProduct.name} (${quickViewProduct.sku}, ${quickViewProduct.packSize}):`);
                        setIsInquiryOpen(true);
                        setQuickViewProduct(null);
                      }}
                      className="w-full text-center text-[11px] font-medium text-stone-500 hover:text-[#2E060D] py-1 cursor-pointer transition-colors"
                    >
                      Need pallet split or contract pricing? <span className="underline font-semibold">Contact Trade Desk</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Custom Sourcing Enquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialNotes={customInquiryNotes}
      />

      {/* Pre-Dawn Wholesale Order Checkout Modal */}
      <WholesaleCheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        orderItems={orderList}
        accountTier={tradeAccount?.tier}
        onOrderSuccess={() => {
          setOrderList([]);
          try {
            localStorage.removeItem('rootwills_direct_draft_order');
          } catch {
            // ignore
          }
        }}
      />
    </div>
  );
}
