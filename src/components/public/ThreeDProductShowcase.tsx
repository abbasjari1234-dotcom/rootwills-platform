'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Check, ShoppingBag, Eye } from 'lucide-react';
import { ThreeDTiltCard } from './ThreeDTiltCard';

interface ProductCategory {
  id: string;
  name: string;
  badge: string;
  headline: string;
  description: string;
  image: string;
  sampleItems: Array<{ name: string; grade: string; pack: string }>;
}

const categories: ProductCategory[] = [
  {
    id: 'orchard',
    name: 'Orchard & Soft Fruits',
    badge: 'Class 1 Selected',
    headline: 'Crisp Pink Lady, Braeburn, Heirloom Citrus & Berries',
    description: 'Direct grower partnerships delivering sweet, blemish-free fruit graded to the highest UK food-service standards for desserts, bars, and breakfast passes.',
    image: '/images/pink_lady_apples_showcase.jpg',
    sampleItems: [
      { name: 'Pink Lady® Apples (Class 1)', grade: 'Extra Firm', pack: '13kg Box / 80 Count' },
      { name: 'Heritage Blood Oranges (Sicilian)', grade: 'High Sugar Brix', pack: '10kg Crate' },
      { name: 'English Driscoll Strawberries', grade: 'Pristine Class 1', pack: '12 x 250g Punnets' },
    ],
  },
  {
    id: 'vegetables',
    name: 'Farm Fresh Vegetables',
    badge: 'Daily Field Harvest',
    headline: 'Evesham Vale Greens, Heirloom Roots & Brassicas',
    description: 'Crisp English brassicas, washed root vegetables, and specialized microgreens harvested daily from regional grower networks.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    sampleItems: [
      { name: 'Evesham Cavolo Nero & Kale', grade: 'Crisp Leaf', pack: '5kg Crate' },
      { name: 'Heirloom Multi-Color Carrots', grade: 'Washed Class 1', pack: '10kg Sack' },
      { name: 'Fine French Beans & Asparagus', grade: 'Tender Spear', pack: '2kg Box' },
    ],
  },
  {
    id: 'dairy',
    name: 'Chilled Dairy & Cheeses',
    badge: '+2°C Cold-Chain',
    headline: 'British Farmhouse Cheddar, Salted Butter & Creams',
    description: 'Award-winning UK dairies providing double cream, block butter, mozzarella, and artisan cheese boards with zero cold-chain disruption.',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
    sampleItems: [
      { name: 'West Country Mature Cheddar (9mo)', grade: 'Block Trade', pack: '5kg Block' },
      { name: 'British Fresh Double Cream (48%)', grade: 'High Fat', pack: '2L Bottle' },
      { name: 'Farmhouse Salted Butter Rolls', grade: 'Culinary Grade', pack: '20 x 250g' },
    ],
  },
  {
    id: 'ambient',
    name: 'Bakery & Ambient Essentials',
    badge: 'Chef Pantry',
    headline: 'French Sourdough, Extra Virgin Oils & Essentials',
    description: 'Pre-baked artisan bakery loaves, high-grade olive oils, rice, pasta, and dry store staples at volume commercial pricing.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    sampleItems: [
      { name: 'Artisan Par-Baked Sourdough Boules', grade: 'Stonebaked', pack: '15 x 400g' },
      { name: 'Cold-Pressed Extra Virgin Olive Oil', grade: '0.2% Acidity', pack: '5L Tin' },
      { name: 'San Marzano Italian Plum Tomatoes', grade: 'D.O.P Certified', pack: '6 x 2.5kg' },
    ],
  },
];

export function ThreeDProductShowcase() {
  const [activeCategoryId, setActiveCategoryId] = useState('orchard');
  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];

  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Wholesale Produce Catalog</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream">
              Explore Our <span className="gold-gradient-text">Wholesale Ranges</span>.
            </h2>
          </div>

          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 text-sm font-bold text-champagne hover:text-champagne-soft transition-colors font-mono"
          >
            <span>Apply for Trade Wholesale Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Nav Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const isSelected = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                  isSelected
                    ? 'bg-champagne text-obsidian-950 font-bold border-champagne shadow-gold-glow'
                    : 'bg-zinc-900/80 text-cream/70 border-zinc-800 hover:border-zinc-700 hover:text-cream'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Interactive 3D Showcase Card */}
        <ThreeDTiltCard maxTilt={6} depth={20} className="w-full">
          <div className="relative rounded-3xl overflow-hidden bg-obsidian-950/90 border border-zinc-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Description & Sample Items */}
                <div className="lg:col-span-6 space-y-6 text-left">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-champagne bg-champagne/10 px-2.5 py-1 rounded-md border border-champagne/30">
                      {activeCategory.badge}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-3">
                      {activeCategory.headline}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-cream/70 leading-relaxed font-sans">
                      {activeCategory.description}
                    </p>
                  </div>

                  {/* Sample Items List */}
                  <div className="space-y-2.5 pt-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                      Featured Trade Lines:
                    </div>
                    {activeCategory.sampleItems.map((item, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-bold text-cream">{item.name}</div>
                          <div className="text-xs text-zinc-400 font-mono">{item.pack}</div>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                          {item.grade}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-4">
                    <Link
                      href="/onboarding"
                      className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-obsidian-950 bg-champagne hover:brightness-110 shadow-gold-glow transition-all flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Order This Range for Kitchen</span>
                    </Link>
                  </div>
                </div>

                {/* Right Image Frame */}
                <div className="lg:col-span-6 relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-zinc-700/60 shadow-2xl">
                  <Image
                    src={activeCategory.image}
                    alt={activeCategory.headline}
                    fill
                    className="object-cover brightness-95 contrast-105 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ThreeDTiltCard>

      </div>
    </section>
  );
}
