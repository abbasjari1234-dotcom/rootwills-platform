'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Filter,
  ArrowUpRight,
  Download,
  Clock,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  X,
  RefreshCw,
  Eye,
  SlidersHorizontal
} from 'lucide-react';

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  packSize: string;
  categorySlug: string;
  subcategory?: string;
  image: string;
  origin: string;
  tempZone: string;
  description: string;
  price?: number | string;
  costPrice?: number | string;
  featuredCore?: boolean;
}

const CATEGORIES = [
  { slug: '', label: 'All Catalog' },
  { slug: 'meat-poultry', label: 'Butchery & Poultry' },
  { slug: 'chilled-dairy', label: 'Chilled Dairy & Eggs' },
  { slug: 'bakery-breakfast', label: 'Bakery & Bread' },
  { slug: 'fresh-produce', label: 'Fresh Produce' },
  { slug: 'seafood-fish', label: 'Seafood & Fish' },
  { slug: 'frozen-chips', label: 'Frozen & Chips' },
  { slug: 'tea-coffee', label: 'Drinks & Beverages' },
  { slug: 'oil-fats', label: 'Oils & Fats' },
  { slug: 'spices-sauces', label: 'Spices & Condiments' },
  { slug: 'everyday-grocery', label: 'Grocery & Dry' },
];

export default function ProductManagementHub() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Selected category for the top Demand chart
  const [demandCategory, setDemandCategory] = useState('Butchery');

  // Edit / Create Modals
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // New product initial state
  const [newProductForm, setNewProductForm] = useState<Partial<ProductItem>>({
    sku: '',
    name: '',
    packSize: '1 Case',
    categorySlug: 'meat-poultry',
    subcategory: 'Prime British Beef',
    origin: 'UK Assured',
    tempZone: 'Butchery 0–2°C',
    description: '',
    price: 18.50,
    costPrice: 14.20,
    image: '',
  });

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '15',
        search,
        category: selectedCategory,
      });
      const res = await fetch(`/api/admin/products?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setProducts(data.items || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handleImageUpload = async (file: File, isEdit: boolean) => {
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const sku = isEdit ? editingProduct?.sku || 'sku' : newProductForm.sku || 'new_sku';
      fd.append('sku', sku);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (isEdit && editingProduct) {
          setEditingProduct({ ...editingProduct, image: data.url });
        } else {
          setNewProductForm({ ...newProductForm, image: data.url });
        }
        showNotification('Image uploaded to Supabase Storage!', 'success');
      } else {
        showNotification(data.error || 'Failed to upload image', 'error');
      }
    } catch (err: any) {
      showNotification(err.message, 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', product: editingProduct }),
      });
      const data = await res.json();
      if (res.ok) {
        showNotification(`Product ${editingProduct.sku} updated successfully!`);
        setEditingProduct(null);
        fetchProducts();
      } else {
        showNotification(data.error || 'Failed to update', 'error');
      }
    } catch (e: any) {
      showNotification(e.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateProduct = async () => {
    if (!newProductForm.sku || !newProductForm.name) {
      showNotification('SKU and Product Name are required', 'error');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', product: newProductForm }),
      });
      const data = await res.json();
      if (res.ok) {
        showNotification(`Product ${newProductForm.sku} added to catalog!`);
        setIsCreating(false);
        fetchProducts();
      } else {
        showNotification(data.error || 'Failed to create product', 'error');
      }
    } catch (e: any) {
      showNotification(e.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (product: ProductItem) => {
    if (!confirm(`Are you sure you want to remove SKU ${product.sku} (${product.name})?`)) return;
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', product }),
      });
      if (res.ok) {
        showNotification(`Product SKU ${product.sku} removed.`);
        fetchProducts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold transition-all ${
            notification.type === 'success'
              ? 'bg-slate-900 text-white border border-emerald-500/30'
              : 'bg-rose-600 text-white'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-white" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TOP SECTION: BENTO DASHBOARD (Matching Image 1 Reference)
          ══════════════════════════════════════════════════════════════ */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Product Management Hub</h1>
            <p className="text-xs text-slate-500">Live wholesale catalog intelligence, pricing controls, and stock analytics.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Custom Product
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Bento Card 1: Sales Revenue */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sales Revenue</div>
            <div className="my-4">
              <div className="text-4xl font-black text-slate-900 tracking-tight">£58.4k</div>
              <div className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% vs last month
              </div>
            </div>
            <button className="self-start px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              See Details
            </button>
          </div>

          {/* Bento Card 2: Today Received (Dark Accent Card from Image 1) */}
          <div className="lg:col-span-3 bg-[#17212F] text-white rounded-3xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Download className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-300 font-medium">Today</div>
                <div className="text-xs text-slate-400">Received Orders</div>
              </div>
            </div>
            <div className="my-4">
              <div className="text-3xl font-black tracking-tight text-white">£234,859</div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> 12% increase
              </div>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>94 Deliveries Scheduled</span>
              <span>All Zones</span>
            </div>
          </div>

          {/* Bento Card 3: Sales Total / Activity Equalizer */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sales Total</span>
              <button className="px-3 py-1 rounded-full border border-slate-200 text-[11px] font-semibold text-slate-600 hover:bg-slate-50">
                See Details
              </button>
            </div>

            {/* Soundwave / Frequency Equalizer Bars from Image 1 */}
            <div className="my-5 flex items-center justify-center gap-1.5 h-16">
              {[20, 35, 60, 95, 45, 25, 40, 75, 30, 20, 50, 85, 35, 20].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    i === 3 || i === 4 ? 'bg-rose-500 shadow-sm shadow-rose-500/30' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>

            <div className="text-xs font-semibold text-slate-500 text-center">
              <span className="font-bold text-slate-900">23k</span> total wholesale lines in a week
            </div>
          </div>

          {/* Bento Card 4: Top Product Scatter Dumbbell */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Top Product</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                ▲ 34%
              </span>
            </div>

            {/* Dumbbell / Scatter bars */}
            <div className="my-3 flex items-center justify-around h-14 px-2">
              {[
                { top: 'bg-slate-300', bar: 'bg-slate-200', bot: 'bg-slate-300' },
                { top: 'bg-slate-300', bar: 'bg-slate-200', bot: 'bg-slate-300' },
                { top: 'bg-rose-500', bar: 'bg-rose-400', bot: 'bg-rose-500' },
                { top: 'bg-rose-500', bar: 'bg-rose-400', bot: 'bg-rose-500' },
                { top: 'bg-slate-300', bar: 'bg-slate-200', bot: 'bg-slate-300' },
                { top: 'bg-slate-300', bar: 'bg-slate-200', bot: 'bg-slate-300' },
              ].map((c, idx) => (
                <div key={idx} className="flex flex-col items-center justify-between h-full">
                  <div className={`w-2 h-2 rounded-full ${c.top}`} />
                  <div className={`w-0.5 h-6 ${c.bar}`} />
                  <div className={`w-2 h-2 rounded-full ${c.bot}`} />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Butchery
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-300" /> Other
                </span>
              </div>
              <span className="text-lg font-black text-slate-900">64</span>
            </div>
          </div>

          {/* Bento Card 5: Number of Sales */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                📦
              </div>
              <span>Number of Orders</span>
            </div>
            <div className="my-4">
              <div className="text-4xl font-black text-slate-900 tracking-tight">1,304</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                View All
              </button>
              <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
                <Clock className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bento Card 6: Cost Breakdown / Margin Semi-Circle Gauge */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Margin</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                ▲ 48%
              </span>
            </div>

            {/* Semi circle arc gauge */}
            <div className="relative flex items-center justify-center my-3">
              <div className="w-32 h-16 border-[12px] border-b-0 border-slate-100 rounded-t-full relative overflow-hidden">
                <div
                  className="absolute inset-0 border-[12px] border-b-0 border-rose-500 rounded-t-full"
                  style={{ clipPath: 'polygon(0 0, 80% 0, 80% 100%, 0 100%)' }}
                />
              </div>
              <div className="absolute top-7 text-center">
                <div className="text-sm font-black text-slate-900">£512</div>
                <div className="text-[9px] text-slate-400">Target Margin / Order</div>
              </div>
            </div>

            <div className="text-center text-[11px] text-slate-500">
              Optimal commercial hospitality tiering
            </div>
          </div>

          {/* Bento Card 7: Top Market Demand (Spanning 6 Columns) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-extrabold text-slate-900">Top Market Demand</span>
              <button className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                View All
              </button>
            </div>

            {/* Customer Pill & Category Selector Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  JT
                </div>
                <div>
                  <div className="text-[10px] text-rose-500 font-bold uppercase leading-none">Top Customer</div>
                  <div className="text-xs font-bold text-slate-800 leading-tight">Jack Thompson (The Savoy)</div>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1 text-xs">
                {['Produce', 'Butchery', 'Dairy', 'Seafood', 'Bakery'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setDemandCategory(c)}
                    className={`px-3 py-1 rounded-full font-semibold transition-all ${
                      demandCategory === c
                        ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Demand Chart Section with Highlight Card */}
            <div className="flex items-end gap-6 pt-2">
              {/* Highlight Card */}
              <div className="w-40 bg-[#17212F] text-white rounded-2xl p-4 shadow-md">
                <div className="text-xs text-slate-300">{demandCategory} Demand</div>
                <div className="text-xs text-slate-400">Monthly Run</div>
                <div className="text-2xl font-black mt-2">23%</div>
                <div className="text-[10px] text-emerald-400 font-bold mt-0.5">▲ Active Growth</div>
              </div>

              {/* Monthly Bar Chart */}
              <div className="flex-1 flex items-end justify-between gap-2 h-24 pb-1">
                {[
                  { month: 'Jan', h: 40, active: false },
                  { month: 'Feb', h: 65, active: false },
                  { month: 'Mar', h: 50, active: false },
                  { month: 'May', h: 100, active: true },
                  { month: 'Jun', h: 60, active: false },
                  { month: 'Jul', h: 80, active: false },
                ].map((col, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div
                      style={{ height: `${col.h}%` }}
                      className={`w-full rounded-t-xl transition-all ${
                        col.active
                          ? 'bg-rose-500 shadow-md shadow-rose-500/30'
                          : 'bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                    <span className="text-[10px] font-semibold text-slate-400">{col.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM SECTION: ENTERPRISE PRODUCT CATALOG TABLE & CONTROLS
          ══════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 space-y-6">
        {/* Table Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>All Products</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                {total.toLocaleString()} lines
              </span>
            </h2>
            <p className="text-xs text-slate-500">Edit product photos, descriptions, pricing, and pack sizes.</p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search SKU, item name, pack size..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-100 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </form>

            <button
              onClick={() => fetchProducts()}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setSelectedCategory(cat.slug);
                setPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Product</th>
                <th className="pb-3">SKU</th>
                <th className="pb-3">Pack Size</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Temp Zone</th>
                <th className="pb-3">Origin</th>
                <th className="pb-3 text-right">Wholesale Price</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-500" />
                    Loading wholesale products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                products.map((item) => (
                  <tr key={item.id || item.sku} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Image & Title */}
                    <td className="py-3.5 pl-2 max-w-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200/50">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              📷
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">
                            {item.subcategory || 'General'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="py-3.5 font-mono text-[11px] font-semibold text-slate-600">
                      {item.sku}
                    </td>

                    {/* Pack Size */}
                    <td className="py-3.5 font-semibold text-slate-800">
                      {item.packSize || '1 Unit'}
                    </td>

                    {/* Category */}
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {item.categorySlug}
                      </span>
                    </td>

                    {/* Temp Zone */}
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.tempZone?.includes('Frozen')
                            ? 'bg-sky-50 text-sky-700 border border-sky-200/50'
                            : item.tempZone?.includes('Chilled') || item.tempZone?.includes('Butchery')
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                            : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                        }`}
                      >
                        {item.tempZone || 'Ambient'}
                      </span>
                    </td>

                    {/* Origin */}
                    <td className="py-3.5 text-slate-600 text-[11px]">
                      {item.origin || 'UK Assured'}
                    </td>

                    {/* Wholesale Price */}
                    <td className="py-3.5 text-right font-black text-slate-900">
                      {item.price ? `£${parseFloat(item.price.toString()).toFixed(2)}` : 'Trade Quote'}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 pr-2 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingProduct(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Showing Page <span className="font-bold text-slate-900">{page}</span> of{' '}
            <span className="font-bold text-slate-900">{totalPages}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          DRAWER / MODAL: EDIT PRODUCT DETAILS & IMAGE UPLOADER
          ══════════════════════════════════════════════════════════════ */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-y-auto p-6 lg:p-8 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">Edit Wholesale Product</h3>
                <p className="text-xs text-slate-500">SKU: {editingProduct.sku}</p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex-1 py-6 space-y-5">
              {/* Image Manager Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Product Image (Supabase Storage)
                </label>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="relative w-20 h-20 rounded-xl bg-white overflow-hidden border border-slate-200 flex-shrink-0">
                    {editingProduct.image ? (
                      <Image
                        src={editingProduct.image}
                        alt={editingProduct.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        📷
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, true);
                      }}
                    />
                    <button
                      type="button"
                      disabled={uploadingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
                    >
                      <UploadCloud className="w-4 h-4" />
                      {uploadingImage ? 'Uploading & Compressing...' : 'Upload New Image'}
                    </button>
                    <p className="text-[10px] text-slate-500 mt-1.5">
                      Automatically converts to WebP and stores in Supabase bucket.
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              {/* Pack Size & Origin */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pack Size</label>
                  <input
                    type="text"
                    value={editingProduct.packSize}
                    onChange={(e) => setEditingProduct({ ...editingProduct, packSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Country / Farm Origin</label>
                  <input
                    type="text"
                    value={editingProduct.origin}
                    onChange={(e) => setEditingProduct({ ...editingProduct, origin: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Pricing: Wholesale Sell Price vs Cost Price */}
              <div className="grid grid-cols-2 gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                <div>
                  <label className="block text-xs font-bold text-emerald-900 mb-1">
                    Base Wholesale Price (£)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.price || ''}
                    placeholder="e.g. 24.50"
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Supplier Cost (£)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.costPrice || ''}
                    placeholder="e.g. 18.00"
                    onChange={(e) => setEditingProduct({ ...editingProduct, costPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Category & Temp Zone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingProduct.categorySlug}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categorySlug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    {CATEGORIES.filter((c) => c.slug).map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Temperature Zone</label>
                  <select
                    value={editingProduct.tempZone}
                    onChange={(e) => setEditingProduct({ ...editingProduct, tempZone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="Chilled 1–4°C">Chilled 1–4°C</option>
                    <option value="Butchery 0–2°C">Butchery 0–2°C</option>
                    <option value="Frozen -18°C">Frozen -18°C</option>
                    <option value="Ambient">Ambient</option>
                    <option value="Non-Food">Non-Food</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chef Description</label>
                <textarea
                  rows={4}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={handleSaveEdit}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MODAL: ADD NEW CUSTOM WHOLESALE PRODUCT
          ══════════════════════════════════════════════════════════════ */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Add New Wholesale Product</h3>
                <p className="text-xs text-slate-500">Create a new SKU to list immediately across the catalog.</p>
              </div>
              <button
                onClick={() => setIsCreating(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">SKU Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. RW-MB-109"
                    value={newProductForm.sku}
                    onChange={(e) => setNewProductForm({ ...newProductForm, sku: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pack Size *</label>
                  <input
                    type="text"
                    placeholder="e.g. 5kg Tub or 12x1L Case"
                    value={newProductForm.packSize}
                    onChange={(e) => setNewProductForm({ ...newProductForm, packSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Red Tractor British Diced Chicken Breast"
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProductForm.categorySlug}
                    onChange={(e) => setNewProductForm({ ...newProductForm, categorySlug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    {CATEGORIES.filter((c) => c.slug).map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Temperature Zone</label>
                  <select
                    value={newProductForm.tempZone}
                    onChange={(e) => setNewProductForm({ ...newProductForm, tempZone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="Chilled 1–4°C">Chilled 1–4°C</option>
                    <option value="Butchery 0–2°C">Butchery 0–2°C</option>
                    <option value="Frozen -18°C">Frozen -18°C</option>
                    <option value="Ambient">Ambient</option>
                    <option value="Non-Food">Non-Food</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Base Price (£)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="24.99"
                    value={newProductForm.price || ''}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Image URL / Upload</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Paste URL or upload"
                      value={newProductForm.image || ''}
                      onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  placeholder="Full specifications, provenance, catering yield, allergens..."
                  value={newProductForm.description || ''}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={handleCreateProduct}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                {saving ? 'Creating...' : 'Create & Publish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

