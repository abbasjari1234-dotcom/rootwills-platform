'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Leaf, 
  Droplets, 
  Package, 
  Sparkles, 
  CheckCircle2,
  Apple,
  Milk,
  UtensilsCrossed,
  Layers
} from 'lucide-react';

interface WholesaleCategory {
  id: string;
  title: string;
  subtitle: string;
  packUnits: string;
  provenance: string;
  leadTime: string;
  image: string;
  highlights: string[];
}

const WHOLESALE_CATEGORIES: WholesaleCategory[] = [
  {
    id: 'fresh-produce',
    title: 'Farm-Direct Fresh Produce & Heritage Orchards',
    subtitle: 'Class 1 Extra Select vegetables, heirloom salads, wild mushrooms, and orchard fruit.',
    packUnits: '5kg Wooden Crates / 10kg Sacks / Custom Counts',
    provenance: 'Kent, Worcestershire (Evesham) & Single-Estate European Orchards',
    leadTime: 'Order by 11:00 PM &bull; Next-Day 06:00 AM Delivery',
    image: '/images/branded/rootwills_orchard_harvest.jpg',
    highlights: [
      'Daily morning harvest with zero intermediate warehouse delay',
      'Refractometer Brix sweetness testing for high-flavour fruit lines',
      'Full farm-to-fork batch traceability on every outer case'
    ]
  },
  {
    id: 'artisan-dairy',
    title: 'Artisan British Dairy & Farmhouse Cheeses',
    subtitle: 'Organic farm milk, double creams, rolled farmhouse butters, and regional British cheeses.',
    packUnits: '12 x 250g Butter Rolls / 2L & 4L Milk Barrels / Wheels',
    provenance: 'Somerset, Gloucestershire & West Midlands Organic Dairies',
    leadTime: 'Continuous +2.0°C Chilled Dual-Temp Transport',
    image: '/images/branded/rootwills_microgreens_dairy.jpg',
    highlights: [
      'Single-herd pasture-grazed cow and goat milk selections',
      'High-fat double cream formulated specifically for pastry chefs',
      'Weekly rotating specialist British farmhouse cheese boards'
    ]
  },
  {
    id: 'living-herbs',
    title: 'Living Root Herbs & Hydroponic Microgreens',
    subtitle: 'Hydroponically grown microgreens, micro-herbs, and edible blossoms delivered alive in nutrient pads.',
    packUnits: '6-Tray & 12-Tray Living Crates / Punnet Selections',
    provenance: 'Midlands Hydroponic Glasshouses & Vertical Farms',
    leadTime: 'Living Root Retention &bull; Zero Wilt on the Pass',
    image: '/images/branded/rootwills_microgreens_dairy.jpg',
    highlights: [
      'Delivered with living roots intact in organic nutrient beds',
      'Up to 10 days extended shelf life in commercial kitchens',
      'Over 28 varieties of micro-herbs, pea shoots, and culinary blossoms'
    ]
  },
  {
    id: 'chef-prep',
    title: 'Chef-Prepared & Pre-Cut Kitchen Essentials',
    subtitle: 'Freshly washed, peeled, batoned, turned, and vacuum-packed produce prepared nightly.',
    packUnits: '2.5kg & 5kg Gas-Flushed Vacuum Pouches',
    provenance: 'Digbeth Central Preparation Facility (Cleanroom BRCGS)',
    leadTime: 'Nightly Prep &bull; Delivers Pre-6:00 AM for Morning Service',
    image: '/images/branded/rootwills_hero_chef_delivery.jpg',
    highlights: [
      'Saves executive kitchens 15+ prep hours weekly on core staples',
      'Chipped, peeled, turned carrots, fondant potatoes, and shredded slaw',
      'Zero preservatives — 100% natural, nitrogen-flushed for crispness'
    ]
  },
  {
    id: 'pantry-staples',
    title: 'Store Cupboard, Heritage Grains & Cold-Pressed Oils',
    subtitle: 'Extra-virgin cold-pressed British rapeseed oils, stoneground flours, vinegar barrels, and artisan pulses.',
    packUnits: '5L Drums / 16kg Sacks / Catering Pails',
    provenance: 'Cotswolds Press & Traditional British Mills',
    leadTime: 'Standing Stock &bull; 1-Click Repeat Replenishment',
    image: '/images/branded/rootwills_fleet_delivery.jpg',
    highlights: [
      'Single-estate cold-pressed Cotswold rapeseed cooking & finishing oils',
      'Direct mill heritage stoneground flours for artisan bakeries and pizza',
      'Locked wholesale contract prices for high-volume kitchen staples'
    ]
  }
];

export function CommercialWholesaleCategories() {
  return (
    <section className="relative z-10 w-full py-20 bg-obsidian-950 border-t border-emerald-900/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-emerald-950/80">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase backdrop-blur-md">
              <Package className="w-3.5 h-3.5 text-emerald-400" />
              <span>Commercial Foodservice Wholesale Lines</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream uppercase leading-[1.05]">
              Core Supply <span className="gold-gradient-text">Categories</span>
            </h2>

            <p className="text-sm sm:text-base text-cream/80 font-sans leading-relaxed">
              Consolidate your daily kitchen procurement with Rootwills. Five comprehensive commercial divisions delivered in a single morning drop before 06:00 AM.
            </p>
          </div>

          <Link
            href="/catalog"
            className="px-6 py-3.5 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs font-mono shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all self-start md:self-auto"
          >
            <span>View Full Product Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Categories Grid (2 Large on top, 3 below) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHOLESALE_CATEGORIES.map((cat, idx) => (
            <div 
              key={cat.id}
              className={`bg-obsidian-900/80 border border-emerald-900/70 rounded-3xl overflow-hidden hover:border-champagne/50 transition-all duration-300 shadow-xl group flex flex-col justify-between ${
                idx === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div>
                {/* Category Image Header */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-obsidian-950">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover brightness-90 contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />
                  
                  {/* Lead Time Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-obsidian-950/85 backdrop-blur-md text-champagne text-[11px] font-mono font-bold border border-champagne/40 shadow-lg">
                      {cat.leadTime.includes('&bull;') ? cat.leadTime.split('&bull;')[0] : cat.leadTime}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-7 space-y-4">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-cream group-hover:text-champagne transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-cream/75 font-sans leading-relaxed">
                    {cat.subtitle}
                  </p>

                  {/* Packaging & Provenance Pills */}
                  <div className="space-y-1.5 pt-1 text-xs font-mono">
                    <div className="text-emerald-400">
                      <span className="text-cream/50">Packaging:</span> {cat.packUnits}
                    </div>
                    <div className="text-cream/70">
                      <span className="text-cream/50">Origin:</span> {cat.provenance}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-2 pt-2 border-t border-emerald-950">
                    {cat.highlights.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs font-sans text-cream/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 sm:p-7 pt-0 border-t border-emerald-950/80 mt-4 flex items-center justify-between">
                <Link
                  href="/catalog"
                  className="text-xs font-mono text-champagne font-bold hover:underline flex items-center gap-1.5"
                >
                  <span>Explore Line & Pricing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/apply"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-950 border border-emerald-800/80 text-emerald-300 text-xs font-mono hover:bg-emerald-900 transition-colors"
                >
                  Request Sample
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
