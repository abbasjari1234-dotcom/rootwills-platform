'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Leaf, 
  ThermometerSnowflake, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Truck,
  Layers,
  Activity
} from 'lucide-react';

const provenanceData = [
  {
    icon: Leaf,
    index: 'SPEC 01',
    metric: '14.8°',
    unit: 'Brix',
    label: 'Sugar Density & Dry Matter',
    tag: 'Optimal Brix Peak',
    meterPercent: 96,
    detail: 'Refractometer verified at harvest gate for maximum natural flavor and shelf life in service.',
  },
  {
    icon: MapPin,
    index: 'ESTATE 02',
    metric: 'Kent',
    unit: 'Orchards',
    label: 'Single-Estate Provenance',
    tag: '51.27° N, 0.52° E',
    detail: 'Direct grower partnerships in the Garden of England. Zero intermediate wholesale brokers.',
  },
  {
    icon: Award,
    index: 'GRADE 03',
    metric: 'Class 1',
    unit: 'Extra',
    label: 'Culinary Receiving Standard',
    tag: 'BRCGS Grade A &bull; Red Tractor',
    detail: 'Strict diameter, skin integrity, and blemish-free specs selected specifically for high-end kitchens.',
  },
  {
    icon: ThermometerSnowflake,
    index: 'CHAIN 04',
    metric: '2–4°C',
    unit: 'Chain',
    label: 'Unbroken Cold-Chain',
    tag: 'Dual-Zone Telemetry',
    meterPercent: 100,
    detail: 'Pre-cooled at orchard packing station and maintained in dual-temp fleet directly to kitchen door.',
  },
];

export function ActHarvestProvenance() {
  return (
    <section
      className="act-harvest relative w-full overflow-hidden pt-20 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 bg-[#021710]"
      style={{ perspective: '1000px' }}
    >
      {/* Background image — Cinematic Orchard Harvest Overlay with Golden Sun Rim */}
      <div className="act-harvest-bg absolute inset-0 will-change-transform pointer-events-none">
        <Image
          src="/images/branded/rootwills_orchard_harvest.jpg"
          alt="Rootwills partner orchard harvest"
          fill
          className="object-cover opacity-30 scale-105"
          sizes="100vw"
          priority
        />
        {/* Multilayered radial lighting to eliminate the flat dark void */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#021710] via-[#021710]/75 to-[#02140e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(228,199,103,0.15),_transparent_60%)]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        {/* Seamless bottom fade into Act III to eliminate any image seams or gaps */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#02140e] via-[#02140e]/95 to-transparent pointer-events-none z-[2]" />
      </div>

      {/* Content container */}
      <div className="act-harvest-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="act-harvest-header text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-900/90 border border-champagne/30 text-champagne text-[11px] font-mono uppercase tracking-[0.25em] font-semibold mb-5 shadow-[0_0_20px_rgba(228,199,103,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span>Single-Estate Provenance &bull; Class 1 Standards</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-cream uppercase leading-[0.95] tracking-tight">
            From Field to
            <br />
            <span className="gold-gradient-text">Professional Kitchen</span>
          </h2>

          <p className="mt-5 text-cream/80 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            Every crate traced to its grower &bull; Every specification verified at receiving &bull; Full cold-chain integrity on every morning delivery.
          </p>
        </div>

        {/* Provenance data cards — High-Contrast B2B Specification Panels */}
        <div className="act-harvest-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {provenanceData.map((item, i) => (
            <div
              key={item.label}
              className={`act-harvest-card-${i} glass-panel rounded-2xl p-6 sm:p-7 will-change-transform border border-champagne/20 hover:border-champagne/60 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(228,199,103,0.12)] transition-all duration-500 group flex flex-col justify-between relative overflow-hidden`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Subtle metallic top highlight shimmer */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Top bar with metallic icon and spec index */}
                <div className="flex justify-between items-start mb-5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-champagne/15 to-emerald-950/70 border border-champagne/30 flex items-center justify-center group-hover:border-champagne group-hover:scale-105 transition-all shadow-sm">
                    <item.icon className="w-5 h-5 text-champagne transition-colors duration-500" />
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/80 border border-emerald-900/60 font-mono text-[10px] text-champagne/90 font-bold tracking-wider">
                    {item.index}
                  </span>
                </div>

                {/* Big Metric Display */}
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="text-3xl sm:text-4xl lg:text-[42px] font-display font-black text-cream tracking-tight leading-none group-hover:text-champagne transition-colors">
                    {item.metric}
                  </span>
                  <span className="text-sm sm:text-base font-sans font-bold text-champagne">
                    {item.unit}
                  </span>
                </div>

                {/* Specification Category Label */}
                <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
                  {item.label}
                </div>

                {/* Micro visual gauge or tag */}
                {item.meterPercent ? (
                  <div className="mb-3.5 space-y-1">
                    <div className="w-full h-1.5 bg-obsidian-950 rounded-full overflow-hidden border border-emerald-900/40">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-champagne rounded-full" 
                        style={{ width: `${item.meterPercent}%` }} 
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-cream/50">
                      <span>{item.tag}</span>
                      <span className="text-champagne font-bold">{item.metric}</span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-3.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-obsidian-950/80 border border-emerald-800/40 text-[10px] font-mono text-champagne/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{item.tag}</span>
                  </div>
                )}
              </div>

              <p className="text-cream/70 text-xs font-sans leading-relaxed pt-3 border-t border-emerald-950/80">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Product Hero Showcase — Grand Inspection Frame */}
        <div
          className="act-harvest-featured mt-16 sm:mt-20 relative mx-auto max-w-5xl"
          style={{ perspective: '800px' }}
        >
          {/* Ambient rim glow behind the card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-champagne/20 via-emerald-500/20 to-champagne/20 rounded-3xl blur-xl opacity-60 pointer-events-none" />

          <div className="act-harvest-featured-img relative rounded-2xl overflow-hidden glass-panel-gold border border-champagne/40 shadow-[0_25px_70px_rgba(0,0,0,0.95)] will-change-transform">
            
            {/* Executive Brass Inspection Bar */}
            <div className="px-5 py-3 bg-obsidian-950/90 border-b border-champagne/25 flex flex-wrap justify-between items-center gap-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-champagne font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>[BATCH LOT #RW-KNT-4820]</span>
                <span className="text-cream/50 font-normal hidden sm:inline">&bull; SINGLE-ESTATE SELECTION</span>
              </div>
              <div className="flex items-center gap-3 text-cream/70 text-[11px]">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>QC Verified at Gate</span>
                </span>
                <span className="hidden md:inline text-cream/40">&bull;</span>
                <span className="hidden md:inline text-champagne font-bold">Cold-Chilled in 120 Mins</span>
              </div>
            </div>

            {/* Visual Photo Area */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-obsidian-950 group">
              <Image
                src="/images/branded/rootwills_apples_card.jpg"
                alt="Premium Rootwills Pink Lady apples harvested in Kent Orchards"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1280px) 100vw, 1200px"
                priority
              />
              
              {/* Radial gradient vignette for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#021710] via-[#021710]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#021710]/70 via-transparent to-transparent hidden sm:block" />

              {/* Floating Badge (Top Right) */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
                <div className="glass-panel-gold rounded-xl px-3 py-1.5 border border-champagne/40 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
                  <span className="font-mono text-[10px] text-champagne uppercase tracking-wider font-bold">
                    Class 1 Extra &bull; Red Tractor
                  </span>
                </div>
              </div>

              {/* Bottom Information Overlay */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-obsidian-950/90 border border-champagne/30 text-[10px] font-mono text-champagne uppercase tracking-widest font-bold">
                    <span>Featured Seasonal Produce</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream tracking-tight drop-shadow-md">
                    Pink Lady Apples &bull; Kent Orchards
                  </h3>
                  <p className="text-xs sm:text-sm text-cream/80 max-w-md drop-shadow">
                    Heritage orchard hand-picked at 14.8° Brix. Packed into branded wooden crates for Michelin and boutique dining kitchens.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-mono text-xs font-bold shadow-gold-glow flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-obsidian-950 animate-ping inline-block" />
                    <span>In Season Now</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom 3-Column Verification Ledger */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-emerald-950/80 bg-obsidian-950/95 border-t border-champagne/25 p-4 text-xs font-mono">
              <div className="flex items-center gap-3 px-3 py-2 sm:py-1">
                <Truck className="w-4 h-4 text-champagne shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-cream/50">Field-to-Depot SLA</div>
                  <div className="font-bold text-cream">&lt; 180 Mins Orchard to Hub</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 sm:py-1">
                <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-cream/50">Packaging Specification</div>
                  <div className="font-bold text-cream">6kg Slatted Wooden Heritage Crate</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 sm:py-1">
                <Activity className="w-4 h-4 text-champagne shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-cream/50">Cold Transit Temperature</div>
                  <div className="font-bold text-emerald-400">+2.4°C Calibrated Average</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
