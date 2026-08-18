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
  Layers
} from 'lucide-react';
import { ProductCategory } from '@/types/products';

const CATEGORY_TABS: { key: ProductCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All SKUs' },
  { key: 'fresh_produce', label: 'Produce' },
  { key: 'dairy_eggs', label: 'Dairy & Eggs' },
  { key: 'meat_poultry', label: 'Butchery' },
  { key: 'dry_goods', label: 'Dry Goods' },
  { key: 'specialty', label: 'Specialty & Deli' },
];

export default function QuickOrderMatrixPage() {
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

      // Extract number at end of line (e.g. "FP-TOM-01 5" or "Tomatoes: 5" or "FP-POT-06, 2")
      const qtyMatch = clean.match(/(\d+)\s*$/);
      const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 1;
      const term = clean.replace(/[:,\s]+\d+\s*$/, '').trim().toLowerCase();

      // Find matching product
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
      setBulkText('');
    }, 1200);
  };

  const handleAddAllToCart = () => {
    let count = 0;
    Object.entries(quantities).forEach(([productId, qty]) => {
      if (qty > 0) {
        const prod = products.find((p) => p.id === productId);
        if (prod) {
          addItem(prod, qty);
          count++;
        }
      }
    });

    if (count > 0) {
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 1500);
      openCart();
    }
  };

  const activeLineCount = Object.values(quantities).filter((q) => q > 0).length;
  const runningTotal = Object.entries(quantities).reduce((sum, [productId, qty]) => {
    const prod = products.find((p) => p.id === productId);
    return sum + (prod ? prod.customerPrice * qty : 0);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-cream/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-champagne uppercase font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>Chef Speed-Order Grid</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            Rapid Multi-Line Order Sheet
          </h1>
          <p className="text-xs text-cream/60">
            Key in crate and pack counts in seconds or paste your prep list directly.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Paste List Trigger */}
          <button
            type="button"
            onClick={() => setBulkModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-obsidian-900 border border-cream/20 hover:border-champagne text-cream text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-champagne" />
            <span>Paste Prep List</span>
          </button>

          {/* Reset button */}
          {activeLineCount > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="px-3 py-2 rounded-xl text-xs text-cream/60 hover:text-rose-400 hover:bg-rose-950/20 border border-cream/10 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          <div className="text-right hidden sm:block pl-2 border-l border-cream/10">
            <div className="text-[10px] uppercase font-mono text-cream/50">Lines Selected</div>
            <div className="text-sm font-bold font-mono text-champagne">
              {activeLineCount} lines &bull; £{runningTotal.toFixed(2)}
            </div>
          </div>

          <button
            onClick={handleAddAllToCart}
            disabled={activeLineCount === 0}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-gold-glow flex items-center gap-2 transition-all ${
              activeLineCount > 0
                ? 'bg-champagne text-obsidian-950 hover:brightness-110'
                : 'bg-obsidian-800 text-cream/30 border border-cream/10 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Selected ({activeLineCount}) to Basket &rarr;</span>
          </button>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedCategory(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                selectedCategory === tab.key
                  ? 'bg-champagne text-obsidian-950 font-bold border-champagne'
                  : 'bg-obsidian-900/80 text-cream/60 border-cream/10 hover:text-cream hover:border-cream/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search SKU or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-obsidian-900 border border-cream/20 rounded-xl pl-10 pr-4 py-1.5 text-xs text-cream focus:outline-none focus:border-champagne"
          />
        </div>
      </div>

      {/* Dense Table View */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-cream/15 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-obsidian-950/80 text-cream/50 uppercase font-mono text-[10px] border-b border-cream/10">
              <tr>
                <th className="p-3.5 pl-5">SKU</th>
                <th className="p-3.5">Product Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Pack Size</th>
                <th className="p-3.5">Contract Price</th>
                <th className="p-3.5">MOQ</th>
                <th className="p-3.5 pr-5 text-right">Order Quantity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream/5">
              {filteredProducts.map((product) => {
                const qty = quantities[product.id] || 0;
                return (
                  <tr
                    key={product.id}
                    className={`hover:bg-obsidian-900/60 transition-colors ${
                      qty > 0 ? 'bg-champagne/10' : ''
                    }`}
                  >
                    <td className="p-3.5 pl-5 font-mono text-champagne font-bold">{product.sku}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-cream">{product.name}</div>
                      {product.origin && (
                        <div className="text-[10px] text-cream/40">{product.origin}</div>
                      )}
                    </td>
                    <td className="p-3.5 text-cream/60">{product.categoryLabel}</td>
                    <td className="p-3.5 text-cream/70 font-mono">{product.packSize}</td>
                    <td className="p-3.5 font-mono font-bold text-champagne">
                      £{product.customerPrice.toFixed(2)}
                    </td>
                    <td className="p-3.5 font-mono text-cream/50">{product.moq} {product.unit}</td>
                    <td className="p-3.5 pr-5 text-right">
                      <div className="inline-flex items-center border border-cream/20 rounded-lg bg-obsidian-950">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(product.id, Math.max(0, qty - 1))}
                          className="p-1.5 text-cream/60 hover:text-cream"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={qty === 0 ? '' : qty}
                          placeholder="0"
                          onChange={(e) => handleQtyChange(product.id, Number(e.target.value))}
                          className="w-12 bg-transparent text-center font-mono font-bold text-cream focus:outline-none text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleQtyChange(product.id, qty + 1)}
                          className="p-1.5 text-cream/60 hover:text-cream"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paste List Modal */}
      {bulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 border border-cream/20 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center pb-3 border-b border-cream/10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-champagne" />
                <h3 className="font-display text-lg font-bold text-cream">Paste Kitchen Order / SKU List</h3>
              </div>
              <button
                type="button"
                onClick={() => setBulkModalOpen(false)}
                className="p-1 rounded-lg text-cream/50 hover:text-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-cream/70">
              Paste your line items from Excel or message notes. Formats supported: <code className="text-champagne">FP-TOM-01 4</code> or <code className="text-champagne">Maris Piper 2</code>.
            </p>

            <form onSubmit={handleBulkParse} className="space-y-4">
              <textarea
                rows={6}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder={"FP-TOM-01 4\nFP-POT-06 2\nDAI-BUT-01 6"}
                className="w-full bg-obsidian-950 border border-cream/20 rounded-xl p-3 text-xs font-mono text-cream focus:outline-none focus:border-champagne"
              />

              {bulkResultMsg && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{bulkResultMsg}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBulkModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-cream/60 hover:text-cream border border-cream/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110"
                >
                  Parse & Fill Quantities
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
