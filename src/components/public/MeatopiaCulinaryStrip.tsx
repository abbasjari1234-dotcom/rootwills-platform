'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Award, ShieldCheck, Clock, ArrowRight, Sparkles, Utensils } from 'lucide-react';

const CULINARY_HIGHLIGHTS = [
  {
    title: 'Dry-Aged British Beef Primals',
    spec: '28–45 Day Himalayan Salt Vault',
    desc: 'Hand-cut by master butchers. Marbled ribeyes, bone-in sirloins, and bespoke portion cuts delivered ready for the charcoal grill.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=85',
    badge: '100% British Farm Assured',
  },
  {
    title: 'Living Hydroponic Microgreens',
    spec: 'Harvested with Roots Attached',
    desc: 'Red vein sorrel, pea shoots, and edible violas delivered alive in nutrient pads. Zero soil grit, maximum crunch and vibrant color.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=85',
    badge: 'Zero Intermediate Storage',
  },
  {
    title: 'Artisan French & British Dairy',
    spec: 'Cultured Butters & Farmhouse Cheese',
    desc: 'Unpasteurised farmhouse cheddar, Lescure pastry butter sheets (84% butterfat), and fresh cream for Michelin-starred pastry sections.',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&auto=format&fit=crop&q=85',
    badge: 'Continuous +2°C Hold',
  },
];

export function MeatopiaCulinaryStrip() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-obsidian-950 via-emerald-950/40 to-obsidian-950 border-y border-champagne/30 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header with Meatopia Fire & Craft energy */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold uppercase backdrop-blur-md shadow-lg">
            <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Fire, Craft & Culinary Obsession</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-cream uppercase leading-[1.05]">
            The Meatopia <span className="gold-gradient-text">Standard</span>
          </h2>

          <p className="text-sm sm:text-base text-cream/80 font-sans leading-relaxed">
            For executive chefs and culinary visionaries who cook with fire, woodsmoke, and uncompromising standards. Every primal cut and heirloom harvest is inspected by hand.
          </p>
        </div>

        {/* 3 Sensory Culinary Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CULINARY_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-1 bg-gradient-to-b from-emerald-500/30 via-emerald-900/40 to-obsidian-950 border border-champagne/30 shadow-2xl overflow-hidden group hover:border-champagne transition-all duration-500"
            >
              <div className="rounded-[22px] bg-obsidian-900/95 p-5 sm:p-6 space-y-4 flex flex-col justify-between h-full">
                
                <div className="space-y-4">
                  {/* Photo Frame */}
                  <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-obsidian-950">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-obsidian-950/85 backdrop-blur-md border border-champagne/40 text-champagne text-[11px] font-mono font-bold shadow-md">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase block tracking-wider">
                      {item.spec}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-cream mt-1 group-hover:text-champagne transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-cream/70 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-emerald-950/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-cream/50">Next-Day 06:00 AM Delivery</span>
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-champagne hover:underline"
                  >
                    <span>Request Spec</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Operational Guarantee Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-4">
          <div className="p-4 rounded-2xl bg-obsidian-900/80 border border-emerald-900/60 text-center font-mono">
            <div className="text-2xl font-bold text-champagne">11:00 PM</div>
            <div className="text-[10px] text-zinc-400 uppercase mt-1">Evening Order Cut-off</div>
          </div>
          <div className="p-4 rounded-2xl bg-obsidian-900/80 border border-emerald-900/60 text-center font-mono">
            <div className="text-2xl font-bold text-emerald-400">06:00 AM</div>
            <div className="text-[10px] text-zinc-400 uppercase mt-1">Kitchen Delivery SLA</div>
          </div>
          <div className="p-4 rounded-2xl bg-obsidian-900/80 border border-emerald-900/60 text-center font-mono">
            <div className="text-2xl font-bold text-champagne">100%</div>
            <div className="text-[10px] text-zinc-400 uppercase mt-1">Zero Substitutions</div>
          </div>
          <div className="p-4 rounded-2xl bg-obsidian-900/80 border border-emerald-900/60 text-center font-mono">
            <div className="text-2xl font-bold text-emerald-400">£30,000</div>
            <div className="text-[10px] text-zinc-400 uppercase mt-1">30-Day Trade Credit</div>
          </div>
        </div>

      </div>
    </section>
  );
}
