'use client';

import React, { useState } from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
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
  const { currentOrgId, organizations, getCustomerProducts } = useDemoStore();
  const { addItem, openCart } = useCartStore();

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [bulkResultMsg, setBulkResultMsg] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];
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
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-obsidian-900/90 border border-emerald-900/60 p-6 rounded-3xl backdrop-blur-xl shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-champagne/40 text-champagne text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>High-Speed Ordering Grid</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-cream">
            Kitchen Quick Order Pad
          </h1>
          <p className="text-xs text-cream/70 font-sans">
            {currentOrg.name} &bull; Rapid multi-line crate entry with your agreed locked contract rates.
          </p>
        </div>

        {/* Quick Bulk Paste Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setBulkModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-obsidian-950 border border-emerald-800/80 hover:border-champagne text-cream text-xs font-mono font-bold flex items-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4 text-champagne" />
            <span>Paste Prep List / CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-obsidian-950/80 border border-emerald-950 p-4 rounded-2xl">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors ${
                selectedCategory === tab.key
                  ? 'bg-champagne text-obsidian-950 shadow-md'
                  : 'bg-obsidian-900 text-cream/60 hover:text-cream border border-emerald-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
          <input
            type="text"
            placeholder="Search SKU or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-obsidian-900 border border-emerald-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
          />
        </div>
      </div>

      {/* Matrix Table */}
      <div className="rounded-3xl border border-emerald-900/60 bg-obsidian-900/80 overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-emerald-950 bg-obsidian-950/90 text-[11px] font-mono text-champagne uppercase font-bold tracking-wider">
                <th className="p-4">SKU</th>
                <th className="p-4">Product Name & Grade</th>
                <th className="p-4">Pack Size</th>
                <th className="p-4">Agreed Rate</th>
                <th className="p-4 text-center w-36">Quantity</th>
                <th className="p-4 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/60">
              {filteredProducts.map((p) => {
                const qty = quantities[p.id] || 0;
                const lineTotal = p.customerPrice * qty;

                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-emerald-950/40 transition-colors ${qty > 0 ? 'bg-emerald-950/30' : ''}`}
                  >
                    <td className="p-4 font-mono text-champagne/80 font-bold">{p.sku}</td>
                    <td className="p-4 font-medium text-cream">
                      <div className="font-bold">{p.name}</div>
                      <div className="text-[10px] text-cream/50">{p.categoryLabel}</div>
                    </td>
                    <td className="p-4 text-cream/70 font-mono">{p.packSize}</td>
                    <td className="p-4 font-mono font-bold text-cream">
                      £{p.customerPrice.toFixed(2)}
                      {p.customerPrice < p.basePrice && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] uppercase font-bold">
                          Contract
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center border border-emerald-900/80 rounded-xl bg-obsidian-950 p-1">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(p.id, qty - 1)}
                          className="p-1 rounded-lg hover:bg-emerald-950 text-cream/60 hover:text-cream"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={qty === 0 ? '' : qty}
                          placeholder="0"
                          onChange={(e) => handleQtyChange(p.id, parseInt(e.target.value, 10) || 0)}
                          className="w-12 text-center bg-transparent text-xs font-mono font-bold text-champagne focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleQtyChange(p.id, qty + 1)}
                          className="p-1 rounded-lg hover:bg-emerald-950 text-cream/60 hover:text-cream"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-cream">
                      £{lineTotal.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Bottom Action Bar */}
      {totalLines > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-3xl bg-obsidian-900/95 border border-champagne/60 rounded-2xl p-4 shadow-[0_10px_40px_rgba(228,199,103,0.35)] backdrop-blur-2xl flex flex-wrap items-center justify-between gap-4 animate-slide-up">
          <div className="flex items-center gap-4 text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 font-mono font-bold border border-emerald-800">
              {totalLines} Items Staged
            </span>
            <div className="text-cream">
              Estimated Total: <strong className="text-champagne font-mono text-base font-bold ml-1">£{estimatedSubtotal.toFixed(2)}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearAll}
              className="px-3 py-2 text-xs font-mono text-cream/60 hover:text-cream"
            >
              Clear
            </button>

            <button
              onClick={handleAddAllToCart}
              disabled={addedSuccess}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Order Basket!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Review & Submit Order &rarr;</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Bulk Paste Modal */}
      {bulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-obsidian-900 border border-emerald-900/80 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-display text-lg font-bold text-cream">Paste Kitchen Prep List</h3>
              <button onClick={() => setBulkModalOpen(false)} className="text-cream/50 hover:text-cream">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-cream/70 font-sans">
              Paste your line entries (e.g. <code className="text-champagne">FP-TOM-01 5</code> or <code className="text-champagne">San Marzano Tomatoes: 3</code>). Our system will automatically parse and stage the quantities.
            </p>

            <textarea
              rows={6}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`FP-TOM-01 4\nFP-APP-03 2\nDY-BUT-01 6`}
              className="w-full bg-obsidian-950 border border-emerald-900/60 rounded-xl p-3 text-xs font-mono text-cream focus:outline-none focus:border-champagne"
            />

            {bulkResultMsg && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl flex items-center gap-2 font-mono">
                <Check className="w-4 h-4" />
                <span>{bulkResultMsg}</span>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBulkModalOpen(false)}
                className="px-4 py-2 text-xs text-cream/60 hover:text-cream"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkParse}
                className="px-5 py-2 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110"
              >
                Parse & Populate Matrix
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
