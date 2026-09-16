'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  ChevronRight, 
  UtensilsCrossed, 
  Building2, 
  HeartHandshake, 
  Sparkles, 
  Wine, 
  GraduationCap 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SectorItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  icon: React.ElementType;
}

const SECTORS: SectorItem[] = [
  {
    id: 'restaurants',
    title: 'Restaurants',
    description: 'Fresh ingredients for professional kitchens',
    image: '/images/commercial/10_restaurant.jpg',
    href: '/sectors/restaurants',
    icon: UtensilsCrossed,
  },
  {
    id: 'hotels',
    title: 'Hotels',
    description: 'Foodservice for hotels, banquets and events',
    image: '/images/commercial/11_hotels.jpg',
    href: '/sectors/hotels',
    icon: Building2,
  },
  {
    id: 'care-homes',
    title: 'Care Homes',
    description: 'Reliable supply for care homes and catering teams',
    image: '/images/commercial/12_care_homes.jpg',
    href: '/sectors/care-homes',
    icon: HeartHandshake,
  },
  {
    id: 'caterers',
    title: 'Caterers',
    description: 'Flexible supply for catering companies and events',
    image: '/images/commercial/13_caterers.jpg',
    href: '/sectors/caterers',
    icon: Sparkles,
  },
  {
    id: 'pubs-bars',
    title: 'Pubs & Bars',
    description: 'Fresh produce and foodservice for hospitality',
    image: '/images/commercial/14_pubs_bars.jpg',
    href: '/sectors/pubs-bars',
    icon: Wine,
  },
  {
    id: 'schools',
    title: 'Schools & Institutions',
    description: 'Reliable food supply for institutional catering',
    image: '/images/commercial/15_schools_institutions.jpg',
    href: '/sectors/schools',
    icon: GraduationCap,
  },
];

export function SectorsGrid() {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12 gap-3 sm:gap-6">
          <div>
            <div className="mb-1.5 sm:mb-2">
              <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-emerald-600">
                WHO WE SUPPLY
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-slate-900 tracking-tight">
              Trusted by Businesses Across Every Sector
            </h2>
          </div>

          <Link
            href="/sectors/restaurants"
            className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-sans font-bold text-xs sm:text-base group shrink-0"
          >
            <span>View All Sectors</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Sector Cards in a Single Row on Large Displays */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SECTORS.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <Link
                  href={sector.href}
                  className="group flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      fill
                      quality={90}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-3 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="w-5 h-5 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                          <Icon className="w-3 h-3" />
                        </div>
                        <h3 className="font-sans font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                          {sector.title}
                        </h3>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-500 leading-snug line-clamp-2 mt-0.5">
                      {sector.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
