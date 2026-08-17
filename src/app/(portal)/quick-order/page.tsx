'use client';

import React, { useState } from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
import { useCartStore } from '@/store/cart-store';
import { Clock, Plus, Minus, ShoppingBag, Check, Search, ArrowRight } from 'lucide-react';

export default function QuickOrderMatrixPage() {
  const { currentOrgId, organizations, getCustomerProducts } = useDemoStore();
  const { addItem, openCart } = useCartStore();

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [search, setSearch] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];
  const products = getCustomerProducts();

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(search.toLowerCase())
  );

  const handleQtyChange = (productId: string, qty: number) => {
    if (qty < 0) return;
    setQuantities((prev) => ({
      ...prev,
      [productId]: qty,
    }));
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
            Quickly key in required crate and pack counts across all lines in seconds.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
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

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter sheet by SKU, product name, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-obsidian-900 border border-cream/20 rounded-xl pl-10 pr-4 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
        />
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
                <th className="p-3.5">Your Price</th>
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
                      qty > 0 ? 'bg-champagne/5' : ''
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
    </div>
  );
}
