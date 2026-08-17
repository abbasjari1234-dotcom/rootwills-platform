'use client';

import React, { useState } from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
import { Product } from '@/types/products';
import { Package, Search, Plus, Edit3, Check, Sparkles, Filter } from 'lucide-react';

export default function AdminProductsEditorPage() {
  const { products } = useDemoStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-cream/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 uppercase font-bold">
            <Package className="w-3.5 h-3.5" />
            <span>Master Catalog Management</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            Wholesale Products & Inventory
          </h1>
          <p className="text-xs text-cream/60">
            Manage standard guide base prices, pack sizes, origins, allergens, and stock availability.
          </p>
        </div>

        <button
          onClick={() => alert('New product creation modal')}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 text-obsidian-950 font-bold text-xs shadow-emerald-glow hover:brightness-110 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product SKU</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {['all', 'fresh_produce', 'dairy_eggs', 'meat_poultry', 'dry_goods', 'specialty'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-obsidian-950 font-bold shadow-emerald-glow'
                  : 'bg-obsidian-900 text-cream/70 hover:text-cream border border-cream/10'
              }`}
            >
              {cat === 'all' ? 'All Lines' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search SKU, product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-obsidian-900 border border-cream/20 rounded-xl pl-10 pr-4 py-2 text-xs text-cream focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-cream/15">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-obsidian-950 text-cream/50 uppercase font-mono text-[10px] border-b border-cream/10">
              <tr>
                <th className="p-4 pl-5">SKU</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Pack Spec</th>
                <th className="p-4">Base Price</th>
                <th className="p-4">MOQ</th>
                <th className="p-4">Origin / Allergens</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream/5">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-obsidian-900/60 transition-colors">
                  <td className="p-4 pl-5 font-mono text-champagne font-bold">{p.sku}</td>
                  <td className="p-4">
                    <div className="font-bold text-cream text-sm">{p.name}</div>
                    <div className="text-[11px] text-cream/50 line-clamp-1">{p.description}</div>
                  </td>
                  <td className="p-4 text-cream/70">{p.categoryLabel}</td>
                  <td className="p-4 font-mono text-cream/80">{p.packSize}</td>
                  <td className="p-4 font-mono font-bold text-cream">
                    £{p.basePrice.toFixed(2)} / {p.unit}
                  </td>
                  <td className="p-4 font-mono text-cream/60">{p.moq} {p.unit}</td>
                  <td className="p-4 text-[11px] text-cream/60">
                    <div>{p.origin || 'UK'}</div>
                    {p.allergens && (
                      <div className="text-[10px] text-amber-400/80">{p.allergens.join(', ')}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                      In Stock
                    </span>
                  </td>
                  <td className="p-4 pr-5 text-right">
                    <button
                      onClick={() => alert(`Edit SKU: ${p.sku}`)}
                      className="p-1.5 rounded-lg bg-obsidian-900 border border-cream/15 text-cream/70 hover:text-cream"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
