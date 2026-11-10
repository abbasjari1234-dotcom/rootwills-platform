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
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
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

export type { WholesaleCategory, WholesaleCategorySlug, WholesaleProduct };
export { WHOLESALE_CATEGORIES, WHOLESALE_PRODUCTS };

export interface DraftOrderLine {
  product: WholesaleProduct;
  qty: number;
}

export function PublicProductsView() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<WholesaleProduct | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [hubInfoModalOpen, setHubInfoModalOpen] = useState<boolean>(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [customInquiryNotes, setCustomInquiryNotes] = useState<string>('');
  const [mobileCartDrawerOpen, setMobileCartDrawerOpen] = useState<boolean>(false);

  // Security guard: Ensure unauthenticated users cannot browse catalogue
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLogged =
        localStorage.getItem('rootwills_user_logged_in') === 'true' ||
        document.cookie.includes('rootwills_auth=true');

      if (!isLogged) {
        window.location.href = '/direct?redirect=/products&auth_required=1';
      } else {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleSignOut = () => {
    try {
      localStorage.removeItem('rootwills_user_logged_in');
      localStorage.removeItem('rootwills_user_account');
      document.cookie = 'rootwills_auth=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    } catch {}
    window.location.href = '/direct';
  };

  // Initialize draft order list from localStorage if available, or pre-seed initial sample
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

  // Clean Luxury Wholesale Product Tile — High-End B2B Hierarchy
  const renderProductCard = (product: WholesaleProduct, compact = false) => {
    const qty = getQty(product.id);

    return (
      <div
        key={product.id}
        onClick={() => setQuickViewProduct(product)}
        className={`group flex flex-col justify-between bg-white/95 rounded-2xl p-2.5 sm:p-3 border border-[#E8DEC8]/90 hover:border-[#BA8E4E] shadow-[0_2px_8px_rgba(46,6,13,0.03)] hover:shadow-[0_8px_24px_rgba(46,6,13,0.08)] transition-all duration-200 cursor-pointer select-none ${
          compact ? 'w-[146px] sm:w-[160px] shrink-0' : 'w-full'
        }`}
      >
        <div>
          {/* Clean Square Image Container on Crisp White Canvas */}
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white mb-2.5 border border-[#EFE8D8] flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              referrerPolicy="no-referrer"
              sizes="180px"
              className="object-contain p-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
          </div>

          {/* Line 1: Bold Pack Size */}
          <div className="text-[12.5px] sm:text-[13px] font-sans font-bold text-[#2E060D] leading-tight truncate">
            {product.packSize}
          </div>

          {/* Line 2: Product Title */}
          <h4 className="text-[12px] sm:text-[12.5px] font-sans text-stone-700 group-hover:text-[#131313] leading-snug line-clamp-2 mt-0.5">
            {product.name}
          </h4>
        </div>

        {/* Bottom Action: Luxury + Add button or Stepper Pill */}
        <div
          className="mt-3 pt-2 border-t border-[#E8DEC8]/50 flex items-center justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
            {product.origin || 'UK Trade'}
          </span>

          {qty === 0 ? (
            <button
              type="button"
              onClick={() => updateOrderQty(product, 1)}
              aria-label={`Add ${product.name}`}
              className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#2E060D] text-[#2E060D] hover:text-white border border-[#E8DEC8] hover:border-[#2E060D] text-[11px] font-bold flex items-center gap-1 transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs"
            >
              <Plus className="w-3 h-3 stroke-[2.5]" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#BA8E4E]/60 rounded-lg px-1.5 py-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => updateOrderQty(product, -1)}
                aria-label="Decrease quantity"
                className="w-5 h-5 rounded-md hover:bg-black/5 text-[#2E060D] flex items-center justify-center transition-transform duration-150 active:scale-90 cursor-pointer"
              >
                {qty === 1 ? (
                  <Trash2 className="w-3 h-3 text-[#8B2635]" />
                ) : (
                  <Minus className="w-3 h-3 stroke-[2.5]" />
                )}
              </button>
              <span className="font-sans text-xs font-bold text-[#2E060D] tabular-nums min-w-[14px] text-center">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => updateOrderQty(product, 1)}
                aria-label="Increase quantity"
                className="w-5 h-5 rounded-md hover:bg-black/5 text-[#2E060D] flex items-center justify-center transition-transform duration-150 active:scale-90 cursor-pointer"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
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
              Tap + on any item to build your wholesale order for pre-dawn delivery.
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
                  referrerPolicy="no-referrer"
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
                    referrerPolicy="no-referrer"
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

        <button
          type="button"
          onClick={() => {
            if (orderList.length === 0) return;
            setMobileCartDrawerOpen(false);
            setIsCheckoutModalOpen(true);
          }}
          disabled={orderList.length === 0}
          className="w-full py-3.5 px-4 rounded-xl bg-[#2E060D] hover:bg-[#430A14] disabled:opacity-50 text-white font-sans font-semibold text-[13px] transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Review &amp; Place Pre-Dawn Order</span>
          <ArrowRight className="w-4 h-4 text-[#F3D08A]" />
        </button>
      </div>
    </div>
  );

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#4E0D17] border-t-transparent animate-spin mx-auto" />
          <p className="text-xs font-mono uppercase tracking-widest text-[#706C65]">
            Verifying Trade Access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#131313] font-sans pt-[68px] sm:pt-[82px] pb-16">
      {/* Seamless Botanical Parchment Texture Overlay matching Rootwills Theme */}
      <div
        className="fixed inset-0 z-0 bg-repeat pointer-events-none opacity-[0.22] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />

      {/* ─── 3-COLUMN WHOLESALE STOREFRONT ARCHITECTURE ─── */}
      <div className="relative z-10 max-w-[1480px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-start gap-5 lg:gap-6">
          {/* ════════════════════════════════════════════════════════════════
              1. LEFT SIDEBAR: Executive B2B Departments
             ════════════════════════════════════════════════════════════════ */}
          <aside className="hidden lg:block w-[220px] xl:w-[245px] shrink-0 sticky top-[88px] max-h-[calc(100vh-100px)] overflow-y-auto pr-3 border-r border-[#E8DEC8]/80 [scrollbar-width:thin]">
            {/* Store Info Block */}
            <div className="pb-4 border-b border-[#E8DEC8] space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#BA8E4E] font-bold">
                Commercial Logistics
              </span>
              <h1 className="text-[15px] font-bold text-[#2E060D] leading-snug">
                Rootwills Larder
              </h1>
              <p className="text-[11.5px] font-medium text-stone-600">
                Pre-Dawn Wholesale Delivery
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2E060D]/5 border border-[#2E060D]/10 text-[11px] font-mono text-[#2E060D] font-semibold mt-1">
                <span>04:00 – 07:30 AM</span>
              </div>
            </div>

            {/* Verified Trade Account Status */}
            <div className="py-2.5 px-3 bg-emerald-50/90 rounded-xl border border-emerald-200/90 my-3 text-left shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-900 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Trade Verified</span>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-[10px] font-mono text-stone-500 hover:text-red-700 underline cursor-pointer"
                >
                  Sign out
                </button>
              </div>
              <p className="text-[10px] text-stone-600 font-mono mt-1">Tier 1 Direct Wholesale</p>
            </div>

            {/* Categories List */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2 px-1">
                <h2 className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                  Departments
                </h2>
                <span className="text-[11px] font-mono text-stone-400">5,487 lines</span>
              </div>

              <nav className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubcategory('all');
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center justify-between py-2 px-2.5 rounded-xl text-[12.5px] transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#2E060D] text-white font-semibold shadow-xs'
                      : 'text-stone-700 hover:bg-black/[0.04]'
                  }`}
                >
                  <span>All Products</span>
                  <span
                    className={`text-[11px] font-mono ${
                      selectedCategory === 'all' ? 'text-[#F3D08A]' : 'text-stone-400'
                    }`}
                  >
                    5,487
                  </span>
                </button>

                {WHOLESALE_CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat.slug;
                  const catCount = WHOLESALE_PRODUCTS.filter(
                    (p) => p.categorySlug === cat.slug
                  ).length;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        setSelectedSubcategory('all');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center justify-between py-2 px-2.5 rounded-xl text-[12.5px] transition-all cursor-pointer group ${
                        active
                          ? 'bg-[#2E060D] text-white font-semibold shadow-xs'
                          : 'text-stone-700 hover:bg-black/[0.04]'
                      }`}
                    >
                      <span className="truncate">{cat.shortName}</span>
                      <span
                        className={`text-[11px] font-mono ml-2 shrink-0 ${
                          active
                            ? 'text-[#F3D08A]'
                            : 'text-stone-400 group-hover:text-stone-600'
                        }`}
                      >
                        {catCount > 0 ? catCount : ''}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ════════════════════════════════════════════════════════════════
              2. CENTER COLUMN: Direct Search + Wholesale Aisles
             ════════════════════════════════════════════════════════════════ */}
          <main className="flex-1 min-w-0 py-1">
            {/* Rounded Search Bar */}
            <div className="relative mb-6">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 5,487 wholesale lines by name, pack size, or SKU..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/90 focus:bg-white border border-[#E8DEC8] focus:border-[#BA8E4E] text-sm text-[#131313] placeholder:text-stone-400 outline-none shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* ─── PRODUCT SECTIONS ─── */}
            {isBrowsingAll ? (
              <div className="space-y-10">
                {WHOLESALE_CATEGORIES.map((aisle) => {
                  const items = WHOLESALE_PRODUCTS.filter(
                    (p) => p.categorySlug === aisle.slug
                  );
                  if (items.length === 0) return null;

                  return (
                    <section key={aisle.slug} className="pt-2 first:pt-0">
                      <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-[#E8DEC8]">
                        <div className="flex items-baseline gap-2.5">
                          <h2 className="text-base sm:text-lg font-bold text-[#2E060D] tracking-tight">
                            {aisle.name}
                          </h2>
                          <span className="text-xs font-mono text-stone-500">
                            ({items.length} lines)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(aisle.slug)}
                          className="text-xs font-semibold text-[#8B2635] hover:text-[#2E060D] flex items-center gap-1 group cursor-pointer"
                        >
                          <span>View all {items.length}</span>
                          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-3.5">
                        {items.slice(0, 10).map((prod) => renderProductCard(prod, false))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              /* Filtered Category or Search Results Grid */
              <div>
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#E8DEC8]">
                  <div>
                    <h2 className="text-lg font-bold text-[#2E060D]">
                      {WHOLESALE_CATEGORIES.find((c) => c.slug === selectedCategory)?.name ||
                        'Search Results'}
                    </h2>
                    <p className="text-xs font-mono text-stone-500 mt-0.5">
                      {filteredProducts.length} commercial {filteredProducts.length === 1 ? 'line' : 'lines'}
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
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E8DEC8] hover:border-[#BA8E4E] hover:bg-[#FAF7F2] text-xs font-semibold text-[#2E060D] transition-all cursor-pointer shadow-2xs"
                  >
                    ← All Departments
                  </button>
                </div>

                {/* Subcategory Filter Pills when inside a department */}
                {activeCategoryObject && activeCategoryObject.subcategories.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-3 mb-5 border-b border-[#E8DEC8]/60">
                    <button
                      type="button"
                      onClick={() => setSelectedSubcategory('all')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                        selectedSubcategory === 'all'
                          ? 'bg-[#2E060D] text-white shadow-2xs'
                          : 'bg-white/90 border border-[#E8DEC8] text-stone-700 hover:bg-white'
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
                              : 'bg-white/90 border border-[#E8DEC8] text-stone-700 hover:bg-white'
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                )}

                {filteredProducts.length === 0 ? (
                  <div className="rounded-2xl bg-white/95 border border-[#E8DEC8] p-10 text-center space-y-3 shadow-2xs">
                    <p className="text-base font-bold text-[#2E060D]">
                      No commercial lines matched &ldquo;{searchQuery}&rdquo;
                    </p>
                    <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                      Our commercial procurement team sources across 5,487 daily lines in London &amp; the South East. Contact our trade desk to request this specification.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomInquiryNotes(`Commercial product sourcing inquiry: ${searchQuery}`);
                        setIsInquiryOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#2E060D] hover:bg-[#430A14] text-white text-xs font-semibold cursor-pointer transition-all active:scale-95 shadow-sm"
                    >
                      Request Sourcing from Trade Desk
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-3.5">
                    {filteredProducts.map((prod) => renderProductCard(prod, false))}
                  </div>
                )}
              </div>
            )}
          </main>

          {/* ════════════════════════════════════════════════════════════════
              3. RIGHT SIDEBAR: Live Order List + Rootwills Direct CTA
             ════════════════════════════════════════════════════════════════ */}
          <aside className="hidden xl:block w-[305px] 2xl:w-[325px] shrink-0 sticky top-[88px]">
            <div className="rounded-2xl bg-white/95 border border-[#E8DEC8] p-4 shadow-[0_4px_20px_rgba(46,6,13,0.04)] max-h-[calc(100vh-104px)] flex flex-col">
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
              Place Order ↗
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

      {/* ─── LUXURY PRODUCT DETAIL QUICK-VIEW MODAL ─── */}
      {quickViewProduct && (() => {
        const productQty = getQty(quickViewProduct.id);
        const categoryObj = WHOLESALE_CATEGORIES.find((c) => c.slug === quickViewProduct.categorySlug);

        return (
          <div
            onClick={() => setQuickViewProduct(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-5 bg-black/60 backdrop-blur-xs"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 border border-[#E8DEC8] shadow-[0_25px_70px_rgba(46,6,13,0.22)] relative space-y-5 font-sans overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                aria-label="Close product details"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#2E060D] text-stone-600 hover:text-white border border-[#E8DEC8] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-start">
                {/* Left: Product Image on Pure White Canvas */}
                <div className="sm:col-span-5 flex flex-col items-center">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-[#EFE8D8] shadow-inner flex items-center justify-center p-4">
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

                  {/* Quality & Halal / Pork-Free Trust Badges */}
                  <div className="w-full mt-3 flex items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#E8DEC8] text-[10px] font-mono font-semibold text-[#2E060D]">
                      <ShieldCheck className="w-3 h-3 text-[#BA8E4E]" />
                      Trade Assured
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#E8DEC8] text-[10px] font-mono font-semibold text-[#2E060D]">
                      <CheckCircle2 className="w-3 h-3 text-[#2E8540]" />
                      100% Pork-Free
                    </span>
                  </div>
                </div>

                {/* Right: Commercial Specifications & Actions */}
                <div className="sm:col-span-7 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-[#2E060D]/5 border border-[#2E060D]/10 text-[10.5px] font-mono font-bold text-[#2E060D]">
                        SKU: {quickViewProduct.sku}
                      </span>
                      {categoryObj && (
                        <span className="text-[11px] font-sans font-medium text-stone-500">
                          {categoryObj.shortName} {quickViewProduct.subcategory ? `• ${quickViewProduct.subcategory}` : ''}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#131313] leading-snug pt-1">
                      {quickViewProduct.name}
                    </h3>

                    {/* Bold Pack Size */}
                    <div className="inline-block text-sm sm:text-base font-bold text-[#2E060D] bg-[#FAF7F2] px-2.5 py-0.5 rounded-lg border border-[#E8DEC8]">
                      Pack Size: {quickViewProduct.packSize}
                    </div>
                  </div>

                  {/* Commercial Kitchen Description */}
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DEC8]/80 text-xs text-stone-600 leading-relaxed space-y-1.5">
                    <p>{quickViewProduct.description}</p>
                    <div className="pt-1.5 border-t border-[#E8DEC8]/50 flex items-center justify-between text-[11px] font-mono text-stone-500">
                      <span>Dispatch: 04:00 – 07:30 AM</span>
                      <span>Origin: {quickViewProduct.origin}</span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Add Action */}
                  <div className="pt-2 space-y-2.5">
                    <div className="flex items-center gap-3">
                      {productQty === 0 ? (
                        <button
                          type="button"
                          onClick={() => updateOrderQty(quickViewProduct, 1)}
                          className="flex-1 py-3 px-5 rounded-xl bg-[#2E060D] hover:bg-[#430A14] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm cursor-pointer"
                        >
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                          <span>Add to Order</span>
                        </button>
                      ) : (
                        <div className="flex-1 flex items-center justify-between bg-[#FAF7F2] border border-[#BA8E4E] rounded-xl px-3 py-2 shadow-2xs">
                          <span className="text-xs font-semibold text-[#2E060D] flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#2E8540]" />
                            <span>In Order:</span>
                          </span>
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => updateOrderQty(quickViewProduct, -1)}
                              className="w-7 h-7 rounded-lg bg-white border border-[#E8DEC8] hover:bg-stone-100 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
                            >
                              {productQty === 1 ? (
                                <Trash2 className="w-3.5 h-3.5 text-[#8B2635]" />
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
                          setIsCheckoutModalOpen(true);
                        }}
                        className="py-3 px-4 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#2E060D] border border-[#E8DEC8] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                      >
                        <span>Review Order</span>
                        <ArrowRight className="w-4 h-4 text-[#BA8E4E]" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setCustomInquiryNotes(`Special inquiry for ${quickViewProduct.name} (${quickViewProduct.sku}, ${quickViewProduct.packSize}):`);
                        setIsInquiryOpen(true);
                        setQuickViewProduct(null);
                      }}
                      className="w-full text-center text-[11.5px] font-medium text-stone-500 hover:text-[#2E060D] py-1 cursor-pointer transition-colors"
                    >
                      Need custom pallet split or bespoke contract pricing? <span className="underline font-semibold">Contact Trade Desk</span>
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
