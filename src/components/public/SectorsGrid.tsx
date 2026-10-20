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
    title: 'Institutions',
    description: 'Reliable food supply for institutional catering',
    image: '/images/commercial/15_schools_institutions.jpg',
    href: '/sectors/schools',
    icon: GraduationCap,
  },
];

export function SectorsGrid() {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-[#BA8E4E] text-xs font-serif tracking-[0.25em] uppercase font-semibold">
                — WHO WE SUPPLY —
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2E060D] tracking-tight">
              Trusted by Businesses Across Every Sector
            </h2>
          </div>

          <Link
            href="/sectors/restaurants"
            className="inline-flex items-center gap-2 text-[#BA8E4E] hover:text-[#9A7338] font-serif font-semibold text-xs sm:text-sm group shrink-0 transition-colors"
          >
            <span>Explore All Sectors</span>
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
                  className="group flex flex-col h-full bg-[#FFFDF9] rounded-xl border border-[#E8DEC8] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#BA8E4E] transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-stone-100">
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
                  <div className="p-3.5 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-md bg-[#2E060D] text-[#D4A86A] border border-[#BA8E4E]/30 flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h3 className="font-serif font-bold text-xs sm:text-sm text-[#2E060D] group-hover:text-[#BA8E4E] transition-colors truncate">
                          {sector.title}
                        </h3>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#BA8E4E] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </div>

                    <p className="text-[11px] sm:text-xs text-stone-600 leading-snug line-clamp-2 mt-1">
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
