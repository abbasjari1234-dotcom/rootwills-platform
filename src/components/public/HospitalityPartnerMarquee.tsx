'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Sparkles, Star, Utensils } from 'lucide-react';

const PARTNERS = [
  'Michelin-Starred Kitchens',
  '5-Star Boutique Hotels & Resorts',
  'Luxury Event Caterers',
  'Executive Gastro Collectives',
  'Private Healthcare & Care Groups',
  'Artisan Sourdough & Pastry Bakeries',
  'Digbeth Independent Food Hubs',
];

export function HospitalityPartnerMarquee() {
  return (
    <div className="w-full py-8 border-y border-emerald-900/50 bg-obsidian-950/80 backdrop-blur-md overflow-hidden relative z-10">
      
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-champagne/80 font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span>Supplying Premier Commercial Kitchens Across the Midlands & UK</span>
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
        </span>
      </div>

      <div className="flex select-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="flex shrink-0 items-center gap-12 whitespace-nowrap"
        >
          {[...PARTNERS, ...PARTNERS].map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-cream/75 hover:text-champagne transition-colors font-display text-lg sm:text-xl font-bold tracking-wide"
            >
              <div className="w-2 h-2 rounded-full bg-champagne/60 shrink-0" />
              <span>{partner}</span>
            </div>
          ))}
        </motion.div>
      </div>

    </div>
  );
}
