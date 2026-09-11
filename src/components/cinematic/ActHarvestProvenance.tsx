'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Leaf, 
  ThermometerSnowflake, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Truck,
  Layers,
  Activity,
  ArrowRight
} from 'lucide-react';

const provenanceData = [
  {
    icon: Leaf,
    index: 'PILLAR 01',
    metric: '14.8°',
    unit: 'Brix Peak',
    label: 'Sugar Density & Flavor',
    tag: 'Optimal Brix Peak',
    subheading: 'Kent Heritage Orchards',
    image: '/images/branded/rootwills_apples_card.jpg',
    detail: 'Field refractometer tested at harvest gate for maximum natural fruit sugars, crisp cell structure, and extended kitchen shelf life.',
  },
  {
    icon: MapPin,
    index: 'PILLAR 02',
    metric: 'Kent',
    unit: '& Evesham',
    label: 'Single-Estate Provenance',
    tag: 'Direct Grower Alliances',
    subheading: 'Garden of England',
    image: '/images/branded/rootwills_orchard_harvest.jpg',
    detail: 'Direct multi-generation grower contracts spanning Kent orchards and Evesham Vale. 100% transparent provenance with zero broker markups.',
  },
  {
    icon: Award,
    index: 'PILLAR 03',
    metric: 'Class 1',
    unit: 'Extra Grade',
    label: 'Culinary Pass Standard',
    tag: 'BRCGS Grade AA Certified',
    subheading: 'Executive Inspection',
    image: '/images/branded/rootwills_microgreens_card.jpg',
    detail: 'Rigorous caliper sizing, skin integrity, and blemish-free specs graded specifically for Michelin-starred kitchens and luxury hospitality.',
  },
  {
    icon: ThermometerSnowflake,
    index: 'PILLAR 04',
    metric: '2–4°C',
    unit: 'Active Chain',
    label: 'Unbroken Cold-Chain',
    tag: 'Dual-Zone Telemetry',
    subheading: 'Zero Thermal Break',
    image: '/images/branded/rootwills_fleet_delivery.jpg',
    detail: 'Hydro-cooled at farm packhouses and transported in dual-temperature Mercedes fleet directly into your walk-in fridges before 06:00 AM.',
  },
];

interface SeasonalCategory {
  id: string;
  tabLabel: string;
  batchLot: string;
  title: string;
  subheading: string;
  description: string;
  image: string;
  gradeBadge: string;
  fieldSLA: string;
  packagingSpec: string;
  tempSpec: string;
}

const seasonalCategories: SeasonalCategory[] = [
  {
    id: 'orchard',
    tabLabel: 'Orchard Fruits',
    batchLot: 'RW-KNT-4820',
    title: 'Heritage Pink Lady Apples • Kent Orchards',
    subheading: 'Kent Orchards • High Brix Sugar',
    description: 'Hand-harvested at peak 14.8° Brix. Packed into branded wooden crates for Michelin dining rooms and boutique breakfast passes.',
    image: '/images/branded/rootwills_apples_card.jpg',
    gradeBadge: 'Class 1 Extra • Red Tractor Certified',
    fieldSLA: '< 180 Mins Tree to Hub',
    packagingSpec: '6kg Slatted Wooden Heritage Crate',
    tempSpec: '+2.4°C Dual-Zone Locked',
  },
  {
    id: 'greens',
    tabLabel: 'Microgreens & Herbs',
    batchLot: 'RW-EVH-2190',
    title: 'Living Microgreens & Evesham Culinary Herbs',
    subheading: 'Evesham Vale • Daily Dawn Harvest',
    description: 'Living punnets and cut herbs harvested at 04:00 AM. Unsurpassed aromatic intensity and crisp leaf turgidity for fine dining garnishes.',
    image: '/images/branded/rootwills_microgreens_card.jpg',
    gradeBadge: 'BRCGS AA • Hydroponic Organic',
    fieldSLA: '< 120 Mins Cut to Fleet',
    packagingSpec: '12 x Living Punnet Trays',
    tempSpec: '+3.0°C Chilled Vapor Zone',
  },
  {
    id: 'dairy',
    tabLabel: 'Farmhouse Dairy',
    batchLot: 'RW-WST-9041',
    title: 'West Country Salted Farm Butter & Artisan Cheeses',
    subheading: 'Somerset & Dorset Pastures',
    description: 'Traditional batch-churned double cream butter rolls and aged cloth-bound farmhouse cheddar direct from single-herd West Country makers.',
    image: '/images/branded/rootwills_dairy_card.jpg',
    gradeBadge: 'PDO Certified • Artisan Guild',
    fieldSLA: '< 240 Mins Churn to Depot',
    packagingSpec: '20 x 250g Parchment Wrapped Rolls',
    tempSpec: '+2.2°C Temperature Locked',
  },
  {
    id: 'logistics',
    tabLabel: 'Cold-Chain Depot',
    batchLot: 'RW-DGB-0010',
    title: 'Digbeth Command Centre Dual-Temp Dispatch',
    subheading: 'Digbeth, Birmingham Central Hub',
    description: 'Bespoke urban staging lanes and pre-dawn dual-temp fleet loading. 06:00 AM delivery SLA across London, Birmingham, and the Cotswolds.',
    image: '/images/branded/rootwills_digbeth_hub.jpg',
    gradeBadge: 'SALSA Certified • ISO 9001',
    fieldSLA: '< 15 Mins Cross-Dock Staging',
    packagingSpec: 'Dual-Temp Thermal Van Racks',
    tempSpec: '+2.4°C Chilled / -18.2°C Frozen',
  },
];

export function ActHarvestProvenance() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const currentCategory = seasonalCategories[activeCategoryIndex];

  return (
    <section 
      id="act-harvest" 
      className="act-harvest relative w-full overflow-hidden pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 lg:pb-28 bg-[#021710]"
    >
      {/* Background Ambience — Luxurious Dark Obsidian with Warm Champagne Lighting */}
      <div className="act-harvest-bg absolute inset-0 will-change-transform pointer-events-none overflow-hidden">
        {/* Soft high-res orchard texture with luxury gradient masking */}
        <div className="absolute inset-0 opacity-15 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]">
          <Image
            src="/images/branded/rootwills_orchard_harvest.jpg"
            alt="Rootwills partner orchard harvest"
            fill
            className="object-cover scale-105"
            sizes="100vw"
          />
        </div>

        {/* Ambient Warm Champagne & Botanical Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-champagne/15 via-emerald-500/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[350px] bg-champagne/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 dot-grid-texture opacity-20 pointer-events-none" />
      </div>

      {/* Content container */}
      <div className="act-harvest-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="act-harvest-header text-center mb-14 sm:mb-18">
          {/* Executive Capsule Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-champagne/30 text-champagne text-[11px] font-mono uppercase tracking-[0.28em] font-semibold mb-5 shadow-[0_0_25px_rgba(228,199,103,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span>Single-Estate Provenance &bull; Class 1 Standards</span>
          </div>

          {/* Sculpted Metallic Gold Headline */}
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.95] tracking-tight text-cream">
            From British Fields to
            <br />
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F6E199] to-[#C59B27] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(228,199,103,0.3)]">
              Your Kitchen Pass
            </span>
          </h2>

          <p className="mt-4 text-cream/85 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Every crate traced to its grower &bull; Every specification verified at receiving &bull; Full cold-chain integrity on every morning delivery.
          </p>
        </div>

        {/* Provenance Data Cards — With Produce Photography Insets */}
        <div className="act-harvest-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {provenanceData.map((item, i) => (
            <div
              key={item.label}
              className={`act-harvest-card-${i} rounded-2xl p-5 sm:p-6 will-change-transform bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 hover:border-champagne hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(228,199,103,0.22)] transition-all duration-500 group flex flex-col justify-between relative overflow-hidden`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Gold Top Hairline Shimmer */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Photo Header Thumbnail */}
                <div className="relative h-32 w-full rounded-xl overflow-hidden mb-4 border border-champagne/20 group-hover:border-champagne/50 transition-colors">
                  <Image
                    src={item.image}
                    alt={item.subheading}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/20 to-transparent" />
                  
                  {/* Floating Pillar Tag & Icon */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-obsidian-950/85 border border-champagne/40 flex items-center justify-center shadow-md">
                      <item.icon className="w-4 h-4 text-champagne" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-obsidian-950/90 border border-champagne/30 font-mono text-[9px] text-champagne font-bold tracking-wider shadow">
                      {item.index}
                    </span>
                  </div>

                  {/* Micro label overlay */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 text-[11px] font-sans font-semibold text-cream/90 truncate drop-shadow">
                    {item.subheading}
                  </div>
                </div>

                {/* Big Metric Display */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-4xl font-display font-black text-cream tracking-tight leading-none group-hover:text-champagne transition-colors">
                    {item.metric}
                  </span>
                  <span className="text-xs sm:text-sm font-sans font-bold text-champagne uppercase tracking-wider">
                    {item.unit}
                  </span>
                </div>

                {/* Specification Category Label */}
                <div className="text-[11px] font-mono uppercase tracking-wider text-champagne font-semibold mb-2">
                  {item.label}
                </div>

                {/* Micro visual gauge or tag */}
                <div className="mb-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-obsidian-900/85 border border-champagne/20 text-[10px] font-mono text-champagne">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{item.tag}</span>
                </div>
              </div>

              <p className="text-cream/80 text-xs sm:text-[13px] font-sans leading-relaxed pt-3 border-t border-champagne/15">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Seasonal Produce Showcase — With Interactive Category Switcher */}
        <div
          className="act-harvest-featured mt-16 sm:mt-20 relative mx-auto max-w-5xl"
          style={{ perspective: '800px' }}
        >
          {/* Interactive Category Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {seasonalCategories.map((cat, idx) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeCategoryIndex === idx
                    ? 'bg-gradient-to-r from-champagne via-[#E4C767] to-[#C9A227] text-obsidian-950 font-bold shadow-[0_0_20px_rgba(228,199,103,0.4)] scale-105'
                    : 'bg-obsidian-950/80 border border-champagne/20 text-cream/70 hover:text-cream hover:border-champagne/40'
                }`}
              >
                {cat.tabLabel}
              </button>
            ))}
          </div>

          {/* Soft ambient backlight halo */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-champagne/20 via-emerald-500/15 to-champagne/20 rounded-3xl blur-2xl opacity-50 pointer-events-none" />

          <div className="act-harvest-featured-img relative rounded-2xl overflow-hidden bg-obsidian-950 border border-champagne/35 shadow-[0_30px_80px_rgba(0,0,0,0.95)] will-change-transform">
            
            {/* Executive Brass Inspection Bar */}
            <div className="px-5 py-3.5 bg-obsidian-950/95 border-b border-champagne/25 flex flex-wrap justify-between items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-champagne font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span>[BATCH LOT #{currentCategory.batchLot}]</span>
                <span className="text-cream/60 font-normal hidden sm:inline">&bull; {currentCategory.subheading.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-4 text-cream/80 text-[11px]">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>QC Passed at Gate</span>
                </span>
                <span className="hidden md:inline text-champagne/40">&bull;</span>
                <span className="hidden md:inline text-champagne font-bold">Cold-Chilled within 120 Mins</span>
              </div>
            </div>

            {/* Visual Photo Area */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-obsidian-950 group">
              <Image
                key={currentCategory.image}
                src={currentCategory.image}
                alt={currentCategory.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 contrast-105"
                sizes="(max-width: 1280px) 100vw, 1200px"
                priority
              />
              
              {/* Radial gradient vignette for contrast and legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/80 via-transparent to-transparent hidden sm:block" />

              {/* Floating Badge (Top Right) */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
                <div className="rounded-xl px-3.5 py-1.5 bg-obsidian-950/85 border border-champagne/40 backdrop-blur-md shadow-lg flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-champagne" />
                  <span className="font-mono text-[10px] sm:text-[11px] text-champagne uppercase tracking-wider font-bold">
                    {currentCategory.gradeBadge}
                  </span>
                </div>
              </div>

              {/* Bottom Information Overlay */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-obsidian-950/90 border border-champagne/40 text-[10px] font-mono text-champagne uppercase tracking-widest font-bold">
                    <span>Featured Seasonal Harvest</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-cream tracking-tight drop-shadow-lg">
                    {currentCategory.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream/90 max-w-lg drop-shadow font-sans">
                    {currentCategory.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <Link
                    href="/apply"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFF4D0] via-[#E4C767] to-[#C9A227] text-obsidian-950 font-sans font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(228,199,103,0.4)] hover:brightness-105 transition-all flex items-center gap-2"
                  >
                    <span>Order Tasting Crate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom 3-Column Verification Ledger */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-champagne/15 bg-obsidian-950 border-t border-champagne/25 p-4 text-xs font-mono">
              <div className="flex items-center gap-3.5 px-4 py-2 sm:py-1">
                <div className="w-8 h-8 rounded-lg bg-champagne/10 border border-champagne/25 flex items-center justify-center text-champagne shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-cream/50">Field-to-Depot SLA</div>
                  <div className="font-bold text-cream">{currentCategory.fieldSLA}</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 px-4 py-2 sm:py-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-cream/50">Packaging Specification</div>
                  <div className="font-bold text-cream">{currentCategory.packagingSpec}</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 px-4 py-2 sm:py-1">
                <div className="w-8 h-8 rounded-lg bg-champagne/10 border border-champagne/25 flex items-center justify-center text-champagne shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-cream/50">Cold Transit Temperature</div>
                  <div className="font-bold text-emerald-400">{currentCategory.tempSpec}</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
