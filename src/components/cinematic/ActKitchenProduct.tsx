'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Leaf, 
  Sparkles, 
  Layers, 
  UtensilsCrossed, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  CheckCircle2,
  FileText
} from 'lucide-react';

const productCategories = [
  {
    index: 'DIV 01',
    title: 'Heritage & Prime Produce',
    tag: 'Farm-Gate Class 1 Extra',
    metric: '240+ Seasonal Lines',
    description: 'Direct grower partnerships across Kent, Worcestershire, and the Evesham Vale. Hand-graded for uniform sizing, high Brix density, and zero intermediate wholesale delay.',
    highlights: ['Single-Estate Provenance', 'Refractometer Brix Tested', 'Harvested Pre-Dawn'],
    image: '/images/branded/rootwills_apples_card.jpg',
    icon: Leaf,
    accent: 'emerald',
  },
  {
    index: 'DIV 02',
    title: 'Artisan Farmhouse Dairy',
    tag: 'Single-Herd Provenance',
    metric: '60+ Farmhouse Lines',
    description: 'Small-batch estate dairies across Somerset and Shropshire. High butterfat unhomogenised milk, slow-churned sea-salt butter, and cave-aged farmhouse cheddar wheels.',
    highlights: ['Traditional Churned Butter', 'Heritage Golden Yolk Eggs', 'Unpasteurised Farmhouse Cuts'],
    image: '/images/branded/rootwills_dairy_card.jpg',
    icon: Sparkles,
    accent: 'champagne',
  },
  {
    index: 'DIV 03',
    title: 'Living Herbs & Micro Flora',
    tag: 'Intense Volatile Oils',
    metric: '85+ Micro Varieties',
    description: 'Cultivated under controlled atmospheric conditions for peak aroma and crisp leaf texture. Delivered in live organic compost trays to ensure pristine plating garnish.',
    highlights: ['Cut-to-Order Living Trays', 'Zero Chemical Spray', 'Edible Violas & Petite Shoots'],
    image: '/images/branded/rootwills_microgreens_card.jpg',
    icon: Layers,
    accent: 'emerald',
  },
  {
    index: 'DIV 04',
    title: 'Kitchen-Ready Chef Prep',
    tag: 'Precision Culinary Cuts',
    metric: '120+ Kitchen-Ready SKUs',
    description: 'Peeled, trimmed, precision-diced, and vacuum-sealed in certified clean-room facilities. Formulated to eliminate kitchen prep bottlenecks while guaranteeing consistent yields.',
    highlights: ['Exact Brunoise & Mirepoix', 'Sous-Vide Vacuum Sealed', 'Daily Clean-Room HACCP Pass'],
    image: '/images/branded/rootwills_microgreens_dairy.jpg',
    icon: UtensilsCrossed,
    accent: 'champagne',
  },
];

export function ActKitchenProduct() {
  return (
    <section id="act-kitchen" className="act-kitchen relative w-full overflow-hidden pt-6 sm:pt-10 lg:pt-12 pb-8 sm:pb-12 lg:pb-14 bg-[#021710]">
      {/* Background — Chef receiving delivery with warm culinary pass lighting */}
      <div className="act-kitchen-bg absolute inset-0 pointer-events-none will-change-transform">
        <Image
          src="/images/branded/rootwills_hero_chef_delivery.jpg"
          alt="Chef receiving Rootwills daily delivery at kitchen pass"
          fill
          className="object-cover opacity-20 scale-105"
          sizes="100vw"
        />
        {/* Dynamic layered atmospheric lighting eliminating the dark green void */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#021710] via-[#021710]/80 to-[#021710]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(228,199,103,0.14),_transparent_65%)]" />
        <div className="absolute top-1/3 left-1/4 w-[650px] h-[380px] bg-champagne/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[360px] bg-emerald-500/8 rounded-full blur-[130px] pointer-events-none" />
        
        {/* Subtle architectural grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4c76706_1px,transparent_1px),linear-gradient(to_bottom,#e4c76706_1px,transparent_1px)] bg-[size:36px_36px] opacity-40" />
      </div>

      {/* Seamless top blend from Act III */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#021710] to-transparent pointer-events-none z-[5]" />

      {/* Seamless bottom fade into Act V to eliminate gaps and image seams */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#021710] via-[#021710]/95 to-transparent pointer-events-none z-[5]" />

      <div className="act-kitchen-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="act-kitchen-header text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-champagne/30 text-champagne text-[11px] font-mono uppercase tracking-[0.25em] font-semibold mb-5 shadow-[0_0_25px_rgba(228,199,103,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span>Commercial Portfolio &bull; Michelin &amp; Fine Dining Grade</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-cream uppercase leading-[0.92] tracking-tight">
            Four Divisions of
            <br />
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F6E199] to-[#C59B27] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(228,199,103,0.3)]">
              Culinary Excellence
            </span>
          </h2>

          <p className="mt-5 text-cream/85 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            Curated specifications for Michelin-starred kitchens, luxury boutique hotels, executive estates, and bespoke catering teams across the UK.
          </p>
        </div>

        {/* Product cards — structured for 3D fan-out animation */}
        <div
          className="act-kitchen-cards grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
          style={{ perspective: '800px' }}
        >
          {productCategories.map((cat, i) => (
            <Link
              key={cat.title}
              href="/products"
              className={`act-kitchen-card-${i} group block rounded-2xl overflow-hidden will-change-transform transition-all duration-500 relative border border-champagne/25 hover:border-champagne/70 hover:shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(228,199,103,0.16)] flex flex-col justify-between`}
              style={{
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(135deg, rgba(3, 30, 22, 0.88) 0%, rgba(1, 18, 12, 0.96) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              {/* Subtle top metallic shimmer */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity z-20" />

              <div>
                {/* Card image container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#01140e] via-[#01140e]/40 to-transparent opacity-90" />

                  {/* Top Left: Division index badge */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-obsidian-950/85 backdrop-blur-md border border-champagne/30 text-champagne font-mono text-[10px] font-bold tracking-wider">
                    {cat.index}
                  </div>

                  {/* Top Right: Metallic Gem Icon */}
                  <div className="absolute top-3.5 right-3.5 w-10 h-10 rounded-xl flex items-center justify-center border border-champagne/30 bg-obsidian-950/85 backdrop-blur-md group-hover:scale-105 group-hover:border-champagne transition-all shadow-md">
                    <cat.icon
                      className={`w-5 h-5 ${
                        cat.accent === 'emerald' ? 'text-emerald-400' : 'text-champagne'
                      } transition-colors`}
                    />
                  </div>

                  {/* Bottom Image Strip: SKU / Line Count */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-obsidian-950/90 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {cat.metric}
                    </span>
                    <span className="text-[10px] font-mono text-cream/70 uppercase tracking-widest hidden sm:inline">
                      Direct Wholesale
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6 sm:p-7">
                  {/* Category Tag */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-champagne font-bold">
                      {cat.tag}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-cream uppercase tracking-wide group-hover:text-champagne transition-colors duration-400 mb-3">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-cream/75 font-sans leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  {/* 3 Highlight Specification Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cat.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-obsidian-950/80 border border-emerald-900/50 text-[10px] font-mono text-cream/80"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
                        <span>{highlight}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Interactive CTA Bar */}
              <div className="px-6 sm:px-7 py-4 bg-obsidian-950/70 border-t border-champagne/15 flex items-center justify-between group-hover:border-champagne/40 transition-colors">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-champagne/90 font-bold group-hover:text-champagne transition-colors">
                  Explore Division Portfolio
                </span>
                <div className="w-8 h-8 rounded-lg bg-champagne/10 border border-champagne/25 flex items-center justify-center group-hover:bg-champagne/20 group-hover:border-champagne/60 transition-all">
                  <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Executive Wholesale Callout & CTA */}
        <div className="act-kitchen-cta mt-10 sm:mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto w-full">
            <Link
              href="/products"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-champagne via-[#F5E498] to-[#D4AF37] text-obsidian-950 font-sans font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_0_35px_rgba(228,199,103,0.45)] hover:scale-[1.02] transition-all duration-300 shadow-royal-depth"
            >
              <span>View Full 800+ Line Wholesale Catalogue</span>
              <ArrowRight className="w-4 h-4 text-obsidian-950 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-obsidian-900/80 border border-champagne/35 text-champagne font-mono text-xs uppercase tracking-wider font-semibold hover:border-champagne hover:bg-obsidian-900 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-champagne" />
              <span>Apply for Trade Account</span>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-cream/60">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Direct Farm Invoicing
            </span>
            <span className="text-champagne/40">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              Zero Minimum Delivery Surcharge on Standing Orders
            </span>
            <span className="text-champagne/40">&bull;</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              6-Day Pre-6 AM Logistics Pass
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
