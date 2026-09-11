'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { Product } from '@/types/products';
import { Package, Search, Plus, Edit3, Check, Sparkles, Filter } from 'lucide-react';

export function AdminProductsView() {
  const { products } = useAppStore();
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
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase font-bold">
            <Package className="w-3.5 h-3.5" />
            <span>Master Catalog Management</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Master Product Catalog & Pricing
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage standard guide base prices, pack sizes, origins, allergens, and stock availability.
          </p>
        </div>

        <button
          onClick={() => alert('New product creation modal')}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product SKU</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {['all', 'fresh_produce', 'dairy_eggs', 'meat_poultry', 'dry_goods', 'specialty'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All Lines' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search SKU, product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-200">
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
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-5 font-mono text-emerald-800 font-bold text-xs">{p.sku}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{p.description}</div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">{p.categoryLabel}</td>
                  <td className="p-4 font-mono text-slate-700">{p.packSize}</td>
                  <td className="p-4 font-mono font-bold text-slate-900">
                    £{p.basePrice.toFixed(2)} / {p.unit}
                  </td>
                  <td className="p-4 font-mono text-slate-500">{p.moq} {p.unit}</td>
                  <td className="p-4 text-[11px] text-slate-600">
                    <div className="font-medium text-slate-700">{p.origin || 'UK'}</div>
                    {p.allergens && (
                      <div className="text-[10px] text-amber-700 font-mono mt-0.5">{p.allergens.join(', ')}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-semibold">
                      In Stock
                    </span>
                  </td>
                  <td className="p-4 pr-5 text-right">
                    <button
                      onClick={() => alert(`Edit SKU: ${p.sku}`)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm cursor-pointer transition-colors"
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
