'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCategory {
  id: string;
  name: string;
  image: string;
  href: string;
}

const CATEGORIES: ProductCategory[] = [
  {
    id: 'fresh-produce',
    name: 'Fresh Produce',
    image: '/images/commercial/02_fresh_produce.jpg',
    href: '/products?category=fresh_produce',
  },
  {
    id: 'dairy-eggs',
    name: 'Dairy & Eggs',
    image: '/images/commercial/03_dairy_eggs.jpg',
    href: '/products?category=dairy_eggs',
  },
  {
    id: 'meat-poultry',
    name: 'Meat & Poultry',
    image: '/images/commercial/04_meat_poultry.jpg',
    href: '/products?category=meat_poultry',
  },
  {
    id: 'seafood',
    name: 'Seafood',
    image: '/images/commercial/05_seafood.jpg',
    href: '/products?category=seafood',
  },
  {
    id: 'dry-goods',
    name: 'Dry Goods',
    image: '/images/commercial/06_dry_goods.jpg',
    href: '/products?category=dry_goods',
  },
  {
    id: 'sauces-condiments',
    name: 'Sauces & Condiments',
    image: '/images/commercial/07_sauces_condiments.jpg',
    href: '/products?category=sauces_condiments',
  },
  {
    id: 'catering-supplies',
    name: 'Catering Supplies',
    image: '/images/commercial/08_catering_supplies.jpg',
    href: '/products?category=catering_supplies',
  },
  {
    id: 'more-categories',
    name: 'More Categories',
    image: '/images/commercial/09_more_categories.jpg',
    href: '/products',
  },
];

export function ProductCategoryGrid() {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-[#F9FAFB] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Commercial Pitch & CTA */}
          <div className="lg:col-span-4 mb-2 lg:mb-0">
            <div className="mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-emerald-600">
                OUR PRODUCTS
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight mb-2.5 sm:mb-4">
              Wide Range of Fresh &amp; Foodservice Products
            </h2>

            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mb-5 sm:mb-8">
              From fresh produce to premium foodservice essentials, we supply everything your business needs.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-sm shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto text-center"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Column: 8 Category Cards Grid (4 cols x 2 rows) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
              {CATEGORIES.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                >
                  <Link
                    href={cat.href}
                    className="group block bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all duration-300"
                  >
                    {/* 4K Image Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        quality={90}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Bottom Strip */}
                    <div className="p-3 flex items-center justify-between bg-white border-t border-slate-100">
                      <h3 className="font-sans font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                        {cat.name}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
