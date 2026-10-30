'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface SectorItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  logisticsHighlight: string;
  image: string;
  alt: string;
}

const SECTORS: SectorItem[] = [
  {
    number: '01',
    title: 'Restaurants & Bistros',
    tagline: 'Class 1 Daily Drop',
    description: 'Hand-selected morning market produce and split-case flexibility delivered before the prep brigade arrives.',
    logisticsHighlight: 'Pre-Dawn 05:30 AM Drop',
    image: '/images/commercial/10_restaurant.jpg',
    alt: 'Professional restaurant chef at pass inspecting fresh ingredients',
  },
  {
    number: '02',
    title: 'Hotels & Hospitality',
    tagline: 'Multi-Site Consistency',
    description: 'Consolidated kitchen manifests, uniform banquet sizing tolerances, and single-source EOM+30 billing.',
    logisticsHighlight: 'Consolidated Multi-Outlet Drops',
    image: '/images/commercial/11_hotels.jpg',
    alt: 'Luxury hotel dining room and breakfast hospitality setup',
  },
  {
    number: '03',
    title: 'Commercial Caterers',
    tagline: 'Pallet-Scale Volume',
    description: 'Guaranteed volume stock locks, washed & prepared root vegetables, and cold-chain drops for large-scale events.',
    logisticsHighlight: 'Guaranteed 72h Stock Reservation',
    image: '/images/commercial/13_caterers.jpg',
    alt: 'Commercial catering kitchen preparing high-volume food service',
  },
  {
    number: '04',
    title: 'Farm Shops & Delis',
    tagline: 'British Heritage Provenance',
    description: 'Direct grower sourcing with heirloom varietals and orchard fruits presented in rustic, display-ready wooden crates.',
    logisticsHighlight: '100% British Farm Assured',
    image: '/images/commercial/british_apples_crates.jpg',
    alt: 'Harvest fresh British apples in slatted wooden crates',
  },
];

export function WhoWeSupplySection() {
  return (
    <section id="sectors" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-[#FAF7F2] border-b border-[#E8DEC8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── SECTION HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 mb-3 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E]" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#2E060D] font-semibold">
                03 // WHO WE SUPPLY
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#131313] leading-[1.12] tracking-[-0.025em]">
              Specialist Cold-Chain Supply Across 4 Core Sectors
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#605A53] max-w-md font-normal leading-relaxed">
            Tailored delivery schedules, grading tolerances, and commercial trade facilities matched to the exact rhythm of your kitchen.
          </p>
        </div>

        {/* ─── 4 VISUAL SECTOR CARDS ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {SECTORS.map((sector) => (
            <Link
              key={sector.number}
              href="/contact"
              className="group relative flex flex-col justify-end aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.2] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8DEC8] shadow-xs hover:shadow-xl hover:border-[#BA8E4E]/50 transition-all duration-500 bg-stone-100 cursor-pointer"
            >
              {/* Background Photographic Layer with Smooth Ken-Burns Zoom */}
              <div className="absolute inset-0">
                <Image
                  src={sector.image}
                  alt={sector.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />
                {/* Refined gradient scrim for clean, effortless typography legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />
              </div>

              {/* Top Header Row Inside Card */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
                <span className="font-mono text-xs font-bold text-[#FAF7F2]/90 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
                  {sector.number} //
                </span>

                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#BA8E4E] group-hover:text-[#131313] group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-10 p-5 sm:p-6 text-white flex flex-col gap-2">
                {/* Sector Monospace Tagline */}
                <span className="font-mono text-[10px] sm:text-[11px] text-[#BA8E4E] tracking-wider uppercase font-semibold">
                  {sector.tagline}
                </span>

                {/* Sector Title */}
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight leading-snug">
                  {sector.title}
                </h3>

                {/* Concise Description */}
                <p className="text-xs sm:text-[13px] text-[#D8D2CA] line-clamp-2 leading-relaxed font-normal">
                  {sector.description}
                </p>

                {/* Bottom Pill Indicator */}
                <div className="pt-2 mt-1 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-[#FAF7F2]/80">
                  <span className="truncate">{sector.logisticsHighlight}</span>
                  <span className="text-[#BA8E4E] font-bold group-hover:translate-x-1 transition-transform duration-200">
                    Terms →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── BOTTOM TRUST BAR ─── */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#E8DEC8]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#7D756C]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#BA8E4E]" />
            <span>BRCGS Grade AA &amp; Red Tractor Assured Farm Provenance</span>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-[#131313] hover:text-[#BA8E4E] font-semibold transition-colors group cursor-pointer"
          >
            <span>Request customized commercial pricing for your sector</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">↗</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
