'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Sparkles, Layers, UtensilsCrossed, ArrowRight } from 'lucide-react';

const productCategories = [
  {
    title: 'Fresh Produce',
    description: 'Farm-gate fruits, vegetables, and salad leaves from British growers',
    image: '/images/branded/rootwills_apples_card.jpg',
    icon: Leaf,
    accent: 'emerald',
  },
  {
    title: 'Artisan Dairy',
    description: 'Single-origin milk, cultured butter, and farmhouse cheese',
    image: '/images/branded/rootwills_dairy_card.jpg',
    icon: Sparkles,
    accent: 'champagne',
  },
  {
    title: 'Herbs & Microgreens',
    description: 'Living herbs, micro leaves, and edible flowers for fine dining',
    image: '/images/branded/rootwills_microgreens_card.jpg',
    icon: Layers,
    accent: 'emerald',
  },
  {
    title: 'Chef-Prep Essentials',
    description: 'Peeled, diced, and kitchen-ready preparations for fast service',
    image: '/images/branded/rootwills_microgreens_dairy.jpg',
    icon: UtensilsCrossed,
    accent: 'champagne',
  },
];

export function ActKitchenProduct() {
  return (
    <section className="act-kitchen relative w-full overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Background — chef delivery scene */}
      <div className="act-kitchen-bg absolute inset-0">
        <Image
          src="/images/branded/rootwills_hero_chef_delivery.jpg"
          alt="Chef receiving Rootwills daily delivery"
          fill
          className="object-cover opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#021710] via-[#021710]/95 to-[#021710]" />
      </div>

      <div className="act-kitchen-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="act-kitchen-header text-center mb-14 sm:mb-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-champagne/60 mb-3 font-semibold">
            Product Portfolio
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-cream uppercase leading-[0.9]">
            Four Divisions of
            <br />
            <span className="gold-gradient-text">Culinary Excellence</span>
          </h2>
          <p className="mt-5 text-cream/50 text-sm sm:text-base max-w-lg mx-auto font-sans leading-relaxed">
            Curated for Michelin restaurants, boutique hotels, care homes, and premium caterers.
          </p>
        </div>

        {/* Product cards — structured for 3D fan-out animation */}
        <div
          className="act-kitchen-cards grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6"
          style={{ perspective: '800px' }}
        >
          {productCategories.map((cat, i) => (
            <Link
              key={cat.title}
              href="/products"
              className={`act-kitchen-card-${i} group block glass-panel rounded-2xl overflow-hidden will-change-transform border border-emerald-400/25 hover:border-champagne/40 transition-all duration-500`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021710] via-[#021710]/30 to-transparent" />

                {/* Icon badge */}
                <div className="absolute top-3 right-3 w-9 h-9 rounded-lg glass-panel flex items-center justify-center border-0">
                  <cat.icon
                    className={`w-4 h-4 ${
                      cat.accent === 'emerald' ? 'text-emerald-400' : 'text-champagne'
                    }`}
                  />
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 sm:p-6">
                <h3 className="text-base font-display font-bold text-cream uppercase tracking-wide group-hover:text-champagne transition-colors duration-400">
                  {cat.title}
                </h3>
                <p className="mt-1.5 text-xs text-cream/45 font-sans leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400/60 group-hover:text-champagne/70 transition-colors">
                  <span>Explore Range</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Full catalogue CTA */}
        <div className="act-kitchen-cta mt-12 sm:mt-16 text-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-champagne/25 text-champagne/90 font-sans font-semibold text-xs sm:text-sm uppercase tracking-widest rounded-xl hover:bg-champagne/5 hover:border-champagne/50 transition-all duration-400"
          >
            View Full Catalogue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
