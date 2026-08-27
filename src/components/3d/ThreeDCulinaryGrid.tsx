'use client';

import React from 'react';
import Link from 'next/link';
import { 
  UtensilsCrossed, 
  Hotel, 
  HeartHandshake, 
  PartyPopper, 
  Beer, 
  GraduationCap, 
  ArrowRight, 
  Sparkles,
  Layers
} from 'lucide-react';
import { ThreeDTiltCard } from '@/components/public/ThreeDTiltCard';

const SECTOR_CARDS = [
  {
    title: 'Fine Dining & Restaurants',
    icon: UtensilsCrossed,
    color: '#FF2E63',
    glow: '#FF7597',
    href: '/sectors/restaurants',
    tag: 'Michelin & Rosette Standard',
    desc: 'Precision microgreens with roots intact, dry-aged British beef primals, and late 11:00 PM order cut-offs.',
  },
  {
    title: 'Hotels & Banqueting',
    icon: Hotel,
    color: '#00F59B',
    glow: '#70FFC8',
    href: '/sectors/hotels',
    tag: 'High-Volume Breakfast & Events',
    desc: 'Bulk egg outers, multi-outlet consolidating, pastry dairy butter sheets, and consolidated EDI statements.',
  },
  {
    title: 'Care Homes & Healthcare',
    icon: HeartHandshake,
    color: '#FFC837',
    glow: '#FFE17D',
    href: '/sectors/care-homes',
    tag: 'IDDSI & Strict Allergen Lock',
    desc: 'Texture-modified IDDSI ingredients, strict allergen segregation, scheduled standing orders, and dietetic specs.',
  },
  {
    title: 'Caterers & Wedding Venues',
    icon: PartyPopper,
    color: '#38BDF8',
    glow: '#7DD3FC',
    href: '/sectors/caterers',
    tag: 'Pop-Up & Event Logistics',
    desc: 'Bespoke event drop-offs, pre-portioned butchery, wedding weekend delivery flexibility, and mobile account management.',
  },
  {
    title: 'Pubs, Bars & Gastropubs',
    icon: Beer,
    color: '#FF9900',
    glow: '#FFCC00',
    href: '/sectors/pubs-bars',
    tag: 'Sunday Roast & Fresh Citrus',
    desc: 'Hand-cut chip potatoes, fresh bar citrus, burger buns, dry goods, and guaranteed Friday/Sunday morning deliveries.',
  },
  {
    title: 'Schools & Education',
    icon: GraduationCap,
    color: '#A78BFA',
    glow: '#C4B5FD',
    href: '/sectors/schools',
    tag: 'Red Tractor British Provenance',
    desc: 'Seasonal British fruit schemes, budget-controlled portion specs, nut-free guarantees, and term-time standing schedules.',
  },
];

export function ThreeDCulinaryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24 sm:my-32">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold uppercase backdrop-blur-md shadow-lg">
          <Layers className="w-4 h-4 text-champagne" />
          <span>Tailored Industry Supply</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-cream uppercase leading-[1.05]">
          Which Businesses <span className="gold-gradient-text">We Supply</span>
        </h2>

        <p className="text-sm sm:text-base text-cream/80 font-sans leading-relaxed">
          Every hospitality kitchen has unique pack sizes, delivery windows, and invoicing requirements. Explore our tailored sector solutions.
        </p>
      </div>

      {/* 6 3D Spatial Sector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {SECTOR_CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <ThreeDTiltCard key={idx} maxTilt={10} depth={20}>
              <Link
                href={card.href}
                className="p-7 rounded-3xl glass-panel border border-emerald-900/60 hover:border-champagne/60 transition-all group flex flex-col justify-between h-64 w-full shadow-2xl relative overflow-hidden"
              >
                {/* Top Glowing Orb */}
                <div
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-[40px] pointer-events-none transition-opacity opacity-40 group-hover:opacity-80"
                  style={{ backgroundColor: card.glow }}
                />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-lg"
                      style={{ backgroundColor: `${card.color}25`, color: card.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase px-2.5 py-1 rounded-full bg-obsidian-950 border border-emerald-950">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-cream group-hover:text-champagne transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-cream/75 font-sans leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-champagne group-hover:translate-x-1 transition-transform">
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </ThreeDTiltCard>
          );
        })}
      </div>

    </section>
  );
}
