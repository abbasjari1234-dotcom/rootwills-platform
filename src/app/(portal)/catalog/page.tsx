'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDemoStore } from '@/lib/store/demo-store';
import { useCartStore } from '@/store/cart-store';
import { 
  Search, 
  Filter, 
  Star, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Sparkles, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ProductCategory } from '@/types/products';
import { ThreeDTiltCard } from '@/components/public/ThreeDTiltCard';

const CATEGORIES: { key: ProductCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All Products' },
  { key: 'fresh_produce', label: 'Fresh Produce' },
  { key: 'dairy_eggs', label: 'Dairy & Eggs' },
  { key: 'meat_poultry', label: 'Meat & Poultry' },
  { key: 'dry_goods', label: 'Dry Goods & Pastry' },
  { key: 'specialty', label: 'Specialty & Delicatessen' },
];

export default function CustomerCatalogPage() {
  const { currentOrgId, organizations, getCustomerProducts, toggleFavorite } = useDemoStore();
  const { addItem, openCart } = useCartStore();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];
  const products = getCustomerProducts();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFav = !onlyFavorites || product.isFavorite;

    return matchesCategory && matchesSearch && matchesFav;
  });

  const handleAddToCart = (product: any, qty: number) => {
    addItem(product, qty);
    setAddedItemEffect(product.id);
    setTimeout(() => setAddedItemEffect(null), 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Pricing Explanation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-6 border-b border-emerald-950">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span>Personalised Commercial Contract Pricing Active</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            Wholesale Order Catalogue &bull; <span className="gold-gradient-text">{currentOrg.name}</span>
          </h1>
          <p className="text-xs text-cream/60 mt-0.5">
            Showing locked contract prices for your account. Cut-off tonight at 11:00 PM for next-morning depot delivery.
          </p>
        </div>

        <button
          onClick={openCart}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>View Basket & Checkout</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center border border-emerald-950">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat.key
                  ? 'bg-champagne text-obsidian-950 font-bold shadow-gold-glow'
                  : 'bg-obsidian-900/90 text-cream/70 hover:text-cream border border-emerald-900/50'
              }`}
            >
              {cat.label}
            </button>
          ))}

          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${
              onlyFavorites
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                : 'bg-obsidian-900/90 text-cream/60 hover:text-cream border border-emerald-900/50'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>Favourites Only</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-emerald-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search produce, SKU, cuts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-obsidian-900 border border-emerald-900/60 rounded-xl pl-10 pr-4 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
          />
        </div>
      </div>

      {/* 3D Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ThreeDTiltCard key={product.id} maxTilt={8} depth={15}>
            <div className="glass-panel rounded-2xl overflow-hidden hover:border-champagne/40 border border-emerald-950/80 transition-all flex flex-col justify-between group h-full shadow-lg">
              <div>
                {/* Product Image & Badges */}
                <div className="aspect-[4/3] bg-obsidian-900 relative overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-obsidian-950/85 backdrop-blur-md text-[10px] font-mono text-champagne border border-champagne/30">
                      {product.sku}
                    </span>
                  </div>

                  {/* Favorite Star Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-obsidian-950/85 backdrop-blur-md text-cream/60 hover:text-amber-400 transition-colors border border-zinc-800"
                    aria-label="Toggle favorite"
                  >
                    <Star className={`w-4 h-4 ${product.isFavorite ? 'text-amber-400 fill-amber-400' : ''}`} />
                  </button>

                  {product.origin && (
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-obsidian-950/85 backdrop-blur-md text-[10px] text-emerald-400 border border-emerald-500/30 font-mono">
                      {product.origin}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 space-y-1.5 text-left">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-champagne">
                    {product.categoryLabel} &bull; {product.packSize}
                  </div>
                  <h3 className="font-display text-base font-bold text-cream group-hover:text-champagne transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-cream/60 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {product.allergens && product.allergens.length > 0 && (
                    <div className="pt-1 text-[10px] text-cream/40 flex items-center gap-1 font-mono">
                      <Info className="w-3 h-3 text-champagne/70" />
                      <span>Allergens: {product.allergens.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Add to Basket Footer */}
              <div className="p-4 pt-0 border-t border-emerald-950/80 mt-2 space-y-3">
                <div className="flex justify-between items-baseline pt-2">
                  <div>
                    <span className="text-[10px] text-cream/40 uppercase font-mono block">Your Contract Price</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-lg font-bold text-champagne">
                        £{product.customerPrice.toFixed(2)}
                      </span>
                      {product.savingsPercent && (
                        <span className="text-[10px] text-cream/40 line-through font-mono">
                          £{product.basePrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-xs text-cream/40"> / {product.unit}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 font-mono block">
                      MOQ: {product.moq} {product.unit}
                    </span>
                    {product.savingsPercent && (
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">
                        Saved {product.savingsPercent}%
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product, product.moq || 1)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-gold-glow transition-all ${
                    addedItemEffect === product.id
                      ? 'bg-emerald-500 text-obsidian-950'
                      : 'bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 hover:brightness-110'
                  }`}
                >
                  {addedItemEffect === product.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add {product.moq || 1} to Basket</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </ThreeDTiltCard>
        ))}
      </div>
    </div>
  );
}
