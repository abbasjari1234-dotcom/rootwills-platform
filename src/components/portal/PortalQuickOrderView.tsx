'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { useCartStore } from '@/store/cart-store';
import { 
  Clock, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Search, 
  ArrowRight, 
  FileText, 
  RotateCcw, 
  Sparkles,
  X,
  Layers,
  Leaf
} from 'lucide-react';
import { ProductCategory } from '@/types/products';

const CATEGORY_TABS: { key: ProductCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All SKUs' },
  { key: 'fresh_produce', label: 'Fresh Produce' },
  { key: 'dairy_eggs', label: 'Dairy & Eggs' },
  { key: 'dry_goods', label: 'Bakery & Pantry' },
  { key: 'specialty', label: 'Specialty Botanicals' },
];

export function PortalQuickOrderView() {
  const { currentOrgId, organizations, getCustomerProducts } = useAppStore();
  const { addItem, openCart } = useCartStore();

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [bulkResultMsg, setBulkResultMsg] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0] || {
    id: 'org-default',
    name: 'Commercial Client'
  };
  const products = getCustomerProducts();

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQtyChange = (productId: string, qty: number) => {
    if (qty < 0) return;
    setQuantities((prev) => ({
      ...prev,
      [productId]: qty,
    }));
  };

  const handleClearAll = () => {
    setQuantities({});
  };

  const handleBulkParse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkText.trim()) return;

    const lines = bulkText.split('\n');
    let matchedCount = 0;
    const newQtyMap = { ...quantities };

    lines.forEach((line) => {
      const clean = line.trim();
      if (!clean) return;

      const qtyMatch = clean.match(/(\d+)\s*$/);
      const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 1;
      const term = clean.replace(/[:,\s]+\d+\s*$/, '').trim().toLowerCase();

      const found = products.find(
        (p) =>
          p.sku.toLowerCase() === term ||
          p.name.toLowerCase().includes(term) ||
          term.includes(p.sku.toLowerCase())
      );

      if (found) {
        newQtyMap[found.id] = (newQtyMap[found.id] || 0) + qty;
        matchedCount++;
      }
    });

    setQuantities(newQtyMap);
    setBulkResultMsg(`Successfully matched & populated ${matchedCount} lines!`);
    setTimeout(() => {
      setBulkResultMsg(null);
      setBulkModalOpen(false);
    }, 1500);
  };

  const handleAddAllToCart = () => {
    const activeEntries = Object.entries(quantities).filter(([_, qty]) => qty > 0);
    if (activeEntries.length === 0) return;

    activeEntries.forEach(([productId, qty]) => {
      const prod = products.find((p) => p.id === productId);
      if (prod) {
        addItem(prod, qty);
      }
    });

    setAddedSuccess(true);
    setQuantities({});
    setTimeout(() => {
      setAddedSuccess(false);
      openCart();
    }, 800);
  };

  const totalLines = Object.values(quantities).filter((q) => q > 0).length;
  const estimatedSubtotal = Object.entries(quantities).reduce((sum, [pId, qty]) => {
    const prod = products.find((p) => p.id === pId);
    return sum + (prod ? prod.customerPrice * qty : 0);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* ─── Header Bar ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>High-Speed Ordering Grid</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900">
            Kitchen Quick Order Pad
          </h1>
          <p className="text-xs text-slate-500 font-sans">
            {currentOrg.name} &bull; Rapid multi-line crate entry with your agreed locked contract rates.
          </p>
        </div>

        {/* Quick Bulk Paste Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setBulkModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-2xs"
          >
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>Paste Prep List / CSV</span>
          </button>
        </div>
      </div>

      {/* ─── Filter and Search Bar ─── */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedCategory === tab.key
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            aria-label="Search SKU or product in quick order matrix"
            placeholder="Search SKU or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* ─── Matrix Table ─── */}
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-mono text-slate-700 uppercase font-bold tracking-wider">
                <th className="p-4">SKU</th>
                <th className="p-4">Product Name &amp; Grade</th>
                <th className="p-4">Pack Size</th>
                <th className="p-4">Agreed Rate</th>
                <th className="p-4 text-center w-36">Quantity</th>
                <th className="p-4 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const qty = quantities[p.id] || 0;
                const lineTotal = p.customerPrice * qty;

                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-slate-50/80 transition-colors ${qty > 0 ? 'bg-emerald-50/40' : ''}`}
                  >
                    <td className="p-4 font-mono text-emerald-800 font-bold">{p.sku}</td>
                    <td className="p-4 font-medium text-slate-900">
                      <div className="font-bold">{p.name}</div>
                      <div className="text-[10px] text-slate-500">{p.categoryLabel}</div>
                    </td>
                    <td className="p-4 text-slate-600 font-mono">{p.packSize}</td>
                    <td className="p-4 font-mono font-bold text-slate-900">
                      £{p.customerPrice.toFixed(2)}
                      {p.customerPrice < p.basePrice && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] uppercase font-bold">
                          Contract
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(p.id, qty - 1)}
                          className="p-1 rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={qty === 0 ? '' : qty}
                          placeholder="0"
                          onChange={(e) => handleQtyChange(p.id, parseInt(e.target.value, 10) || 0)}
                          className="w-12 text-center bg-transparent text-xs font-mono font-bold text-slate-900 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleQtyChange(p.id, qty + 1)}
                          className="p-1 rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-slate-900">
                      £{lineTotal.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Floating Bottom Action Bar ─── */}
      {totalLines > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-3xl bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-wrap items-center justify-between gap-4 animate-slide-up">
          <div className="flex items-center gap-4 text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-mono font-bold">
              {totalLines} Items Staged
            </span>
            <div className="text-slate-200">
              Estimated Total: <strong className="text-emerald-400 font-mono text-base font-bold ml-1">£{estimatedSubtotal.toFixed(2)}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearAll}
              className="px-3 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleAddAllToCart}
              disabled={addedSuccess}
              aria-label={addedSuccess ? "Items added to order basket" : "Review and submit order basket"}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all active:scale-95"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Order Basket!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Review &amp; Submit Order &rarr;</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ─── Bulk Paste Modal ─── */}
      {bulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-slate-900">
            <div className="flex justify-between items-center">
              <h3 className="font-sans text-lg font-bold text-slate-900">Paste Kitchen Prep List</h3>
              <button
                type="button"
                onClick={() => setBulkModalOpen(false)}
                aria-label="Close paste kitchen prep list modal"
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-sans">
              Paste your line entries (e.g. <code className="text-emerald-800 font-bold bg-slate-100 px-1 py-0.5 rounded">FP-TOM-01 5</code> or <code className="text-emerald-800 font-bold bg-slate-100 px-1 py-0.5 rounded">San Marzano Tomatoes: 3</code>). Our system will automatically parse and stage the quantities.
            </p>

            <div>
              <label htmlFor="bulk-prep-text" className="sr-only">Kitchen Prep List Entries</label>
              <textarea
                id="bulk-prep-text"
                aria-label="Kitchen prep list entries"
                rows={6}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder={`FP-TOM-01 4\nFP-APP-03 2\nDY-BUT-01 6`}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            {bulkResultMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-mono font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{bulkResultMsg}</span>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBulkModalOpen(false)}
                className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkParse}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
              >
                Parse &amp; Populate Matrix
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
