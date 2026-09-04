'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sun, 
  Droplets, 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  Award, 
  Leaf, 
  ArrowRight, 
  Download, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface CropItem {
  name: string;
  category: string;
  origin: string;
  status: 'Peak Season' | 'Early Arrival' | 'High Demand' | 'Sourcing Alert';
  statusColor: string;
  brixRating?: string;
  culinaryProfile: string;
  chefRecommendation: string;
  image: string;
}

const CROP_REPORTS: CropItem[] = [
  {
    name: 'Kent Heritage Discovery & Gala Apples',
    category: 'Top Fruit & Orchards',
    origin: 'Kent & Single-Estate Southeast Orchards',
    status: 'Peak Season',
    statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    brixRating: '14.8° Brix',
    culinaryProfile: 'Dense cellular crunch with balanced floral acidity and high natural sugar retention.',
    chefRecommendation: 'Ideal for tart tatins, savoury autumn game pairings, and fresh cold-pressed morning juicing.',
    image: '/images/branded/rootwills_orchard_harvest.jpg',
  },
  {
    name: 'Evesham Vale Tenderstem & Heritage Brassicas',
    category: 'Field Vegetables & Greens',
    origin: 'Vale of Evesham, Worcestershire',
    status: 'Peak Season',
    statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    brixRating: '11.2° Brix',
    culinaryProfile: 'Tender shoots with sweet nutty stems and deep chlorophyll leaf structure.',
    chefRecommendation: 'Quick char on the Robata grill, emulsion emulsion glazing, or raw shaved salad prep.',
    image: '/images/branded/rootwills_microgreens_dairy.jpg',
  },
  {
    name: 'Isle of Wight Heritage Vine Tomatoes',
    category: 'Protected Salads',
    origin: 'Arreton Valley, Isle of Wight',
    status: 'High Demand',
    statusColor: 'bg-champagne/20 text-champagne border-champagne/30',
    brixRating: '12.5° Brix',
    culinaryProfile: 'Intense umami concentration with balanced organic acidity and thin edible skins.',
    chefRecommendation: 'Heritage tomato carpaccio with cold-pressed Cotswold oil and fresh British burrata.',
    image: '/images/branded/rootwills_hero_chef_delivery.jpg',
  },
  {
    name: 'Living Hydroponic Micro-Coriander & Pea Shoots',
    category: 'Culinary Living Herbs',
    origin: 'Staffordshire Hydroponic Glasshouses',
    status: 'Peak Season',
    statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    brixRating: 'Living Nutrient Pad',
    culinaryProfile: 'Unbroken living root system ensures zero wilting and pungent volatile essential oils on the pass.',
    chefRecommendation: 'Final plating garnish for Michelin-grade fish courses and contemporary tasting menus.',
    image: '/images/branded/rootwills_microgreens_dairy.jpg',
  },
];

export function WeeklyMarketCropReport() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const categories = ['All', 'Top Fruit & Orchards', 'Field Vegetables & Greens', 'Protected Salads', 'Culinary Living Herbs'];

  const filteredCrops = activeFilter === 'All' 
    ? CROP_REPORTS 
    : CROP_REPORTS.filter(c => c.category === activeFilter);

  return (
    <section className="relative z-10 w-full py-20 bg-obsidian-900/60 border-t border-emerald-900/40 overflow-hidden">
      
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-champagne/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-emerald-950/80">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase backdrop-blur-md">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Weekly Wholesale Market Intelligence &bull; Issue #36</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream uppercase leading-[1.05]">
              Crop Seasonality & <span className="gold-gradient-text">Procurement Guide</span>
            </h2>

            <p className="text-sm sm:text-base text-cream/80 font-sans leading-relaxed">
              Every Monday at 04:00 AM, our buyers publish verified field notes from UK farm gates and European orchards. Helping executive chefs lock in seasonal menu specials at peak Brix sweetness.
            </p>
          </div>

          {/* Download Full Market Report Action */}
          <div className="flex items-center gap-3">
            <Link
              href="/catalog"
              className="px-5 py-3 rounded-xl bg-obsidian-950 border border-emerald-800/80 hover:border-champagne text-cream text-xs font-mono font-bold flex items-center gap-2 shadow-lg transition-all"
            >
              <Download className="w-3.5 h-3.5 text-champagne" />
              <span>Download Weekly PDF Price Guide</span>
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-champagne text-obsidian-950 shadow-gold-glow'
                  : 'bg-obsidian-950/80 border border-emerald-900/60 text-cream/70 hover:text-cream hover:bg-emerald-950/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Crop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredCrops.map((crop, idx) => (
            <div 
              key={idx}
              className="bg-obsidian-950/90 border border-emerald-900/70 rounded-3xl p-6 sm:p-7 space-y-5 hover:border-champagne/50 transition-all duration-300 shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Card Top Row: Category & Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-champagne font-bold uppercase tracking-wider">
                    {crop.category}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${crop.statusColor}`}>
                    {crop.status}
                  </span>
                </div>

                {/* Title & Origin */}
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-cream group-hover:text-champagne transition-colors">
                    {crop.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs font-sans text-cream/65">
                    <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Origin: <strong className="text-cream/90">{crop.origin}</strong></span>
                  </div>
                </div>

                {/* Brix Metric Pill (if applicable) */}
                {crop.brixRating && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                    <Award className="w-3.5 h-3.5 text-champagne" />
                    <span>Quality Spec: <strong>{crop.brixRating}</strong></span>
                  </div>
                )}

                {/* Culinary Profile */}
                <p className="text-xs sm:text-sm text-cream/80 font-sans leading-relaxed">
                  {crop.culinaryProfile}
                </p>

                {/* Chef Recommendation Box */}
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/60 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-champagne font-bold block">
                    Chef Kitchen Application:
                  </span>
                  <p className="text-xs text-cream/90 font-sans italic leading-snug">
                    "{crop.chefRecommendation}"
                  </p>
                </div>

              </div>

              {/* Card Footer Action */}
              <div className="pt-4 border-t border-emerald-950 flex items-center justify-between gap-4">
                <span className="text-[11px] font-mono text-cream/50">
                  Class 1 Extra Select &bull; SALSA Audited
                </span>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-champagne hover:underline"
                >
                  <span>Request Chef Sample Box</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Procurement Assurance Banner */}
        <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono uppercase text-champagne font-bold">100% Quality & Freshness Guarantee</span>
            <p className="text-sm text-cream/90 font-sans">
              Zero-substitution policy. If any produce crate does not meet your head chef's standard, instant credit is issued within 60 minutes.
            </p>
          </div>
          <Link
            href="/apply"
            className="px-6 py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs font-mono shadow-gold-glow hover:brightness-110 shrink-0 transition-all"
          >
            Open 30-Day Trade Account
          </Link>
        </div>

      </div>
    </section>
  );
}
