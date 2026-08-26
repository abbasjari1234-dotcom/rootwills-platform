'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Truck, 
  ThermometerSnowflake, 
  ChevronRight,
  Leaf,
  CheckCircle2,
  Award,
  Play,
  Volume2,
  VolumeX,
  Flame,
  Utensils
} from 'lucide-react';

interface StorySlide {
  id: string;
  tag: string;
  headline: string;
  subheadline: string;
  description: string;
  details: string[];
  image: string;
  badge: string;
  accent: string;
}

const STORY_SLIDES: StorySlide[] = [
  {
    id: 'harvest',
    tag: 'Orchard & Farm Provenance',
    headline: 'Harvested at Peak Crispness. Direct From Soil to Chef.',
    subheadline: 'Zero intermediate warehousing. Farm gate straight to your kitchen.',
    description: 'Just like the world’s finest single-estate harvests, our produce is selected at optimum sugar refraction and crisp cell turgor. Sourced direct from certified UK growers and sun-drenched European orchards.',
    details: [
      'Daily morning picking schedules',
      'Non-invasive Brix sugar testing (14.5°+)',
      '100% Class 1 Extra-Select specifications',
      'SALSA & BRCGS Global Standard traceability'
    ],
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900&auto=format&fit=crop&q=85',
    badge: '12-Hour Farm-to-Kitchen SLA',
    accent: '#E4C767'
  },
  {
    id: 'coldchain',
    tag: 'Cold-Chain Dual-Temp Integrity',
    headline: 'Continuous +2°C Micro-Climate. Zero Thermal Breaks.',
    subheadline: 'Precision chilled fleet with real-time GPS telemetry.',
    description: 'Most food quality degrades during transit. Rootwills operates a dedicated fleet of dual-temperature refrigerated vehicles with live calibrated sensors. Your leafy salads arrive crisp with dewdrops intact; your meats stay in prime dry-aged condition.',
    details: [
      '+2.0°C to +4.0°C chilled produce hold',
      '-18.0°C blast sub-zero butchery chambers',
      'Real-time temperature logging on delivery notes',
      'Guaranteed 06:00 AM – 07:30 AM early morning drop'
    ],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&auto=format&fit=crop&q=85',
    badge: '100% Cold-Locked Chain',
    accent: '#10B981'
  },
  {
    id: 'chefs',
    tag: 'Built For Culinary Masters',
    headline: 'Tailored Specs for High-Volume & Fine Dining Kitchens.',
    subheadline: 'The Meatopia of wholesale supply — fire, craft & prime ingredients.',
    description: 'Executive chefs don’t have time for poor cuts or inconsistent sizes. We grade every crate by hand. From dry-aged British beef primals to living hydroponic microgreens, every line item is tailored to your menu prep.',
    details: [
      'Late 11:00 PM order cut-off (after dinner service)',
      'Zero-substitution policy without direct chef consent',
      'Bespoke pack sizing & portioned prep cuts',
      'Dedicated commercial key account manager'
    ],
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&auto=format&fit=crop&q=85',
    badge: 'Chef-Approved Grade A',
    accent: '#E4C767'
  },
  {
    id: 'network',
    tag: 'Join The Trade Network',
    headline: 'Join the Rootwills Foodservice Network.',
    subheadline: 'Approved 30-day trade credit and locked commercial rates.',
    description: 'Over 400 fine dining restaurants, boutique hotels, luxury caterers, and healthcare groups trust Rootwills for their daily morning food supply across Birmingham and the UK.',
    details: [
      'Instant 2-minute digital trade application',
      'Up to £30,000 credit facility (30-Day Terms)',
      'Personalised contract price list locked for your venue',
      'Instant 1-click repeat reordering on web & mobile'
    ],
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&auto=format&fit=crop&q=85',
    badge: 'Open Your Account',
    accent: '#34D399'
  }
];

export function PinkLadyCinematicScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="w-full space-y-0 relative">
      
      {/* 1. PINK LADY STYLE FULL-BLEED CINEMATIC HERO VIDEO HEADER */}
      <section className="relative h-[85vh] sm:h-[92vh] w-full overflow-hidden flex items-end pb-12 sm:pb-20">
        
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover brightness-[0.75] contrast-[1.08] scale-105 transition-transform duration-1000"
            poster="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600&auto=format&fit=crop&q=85"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-hands-holding-fresh-picked-apples-41221-large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Rich Emerald & Gold Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-obsidian-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/80 via-transparent to-obsidian-950/80" />
        </div>

        {/* Floating Top Brand Eyebrow */}
        <div className="absolute top-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-950/80 border border-emerald-500/40 backdrop-blur-md text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Farm-to-Kitchen Direct Supply &bull; UK & Midlands</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cream/70 bg-obsidian-950/60 px-3 py-1.5 rounded-full border border-champagne/30 backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-champagne" />
            <span>11:00 PM Order Cut-off for 06:00 AM Delivery</span>
          </div>
        </div>

        {/* Hero Title Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-left">
          <div className="max-w-4xl space-y-4">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-champagne font-extrabold block">
              The British Foodservice Standard
            </span>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-cream uppercase leading-[1.02] drop-shadow-2xl">
              WHY ROOTWILLS <br />
              <span className="gold-gradient-text">IS SO SPECIAL</span>
            </h1>

            <p className="text-base sm:text-xl text-cream/90 font-sans max-w-2xl leading-relaxed drop-shadow">
              We supply the finest fresh produce, dry-aged meats, artisan dairy, and dry goods to hospitality professionals who refuse to compromise on quality.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/onboarding"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-sm shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all"
              >
                <span>Open a Trade Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#story-experience"
                className="px-6 py-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 hover:border-champagne text-cream text-sm font-semibold flex items-center gap-2 backdrop-blur-md transition-all"
              >
                <span>Explore The Story &rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="absolute bottom-4 right-8 hidden md:flex items-center gap-2 font-mono text-xs text-cream/60 z-10">
          <span>Scroll to explore</span>
          <div className="w-4 h-7 rounded-full border border-champagne/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-champagne rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. PINK LADY STYLE SPLIT-SCREEN SCROLLYTELLING JOURNEY */}
      <section id="story-experience" className="relative bg-obsidian-950 py-20 border-t border-emerald-950" ref={containerRef}>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-36">
          {STORY_SLIDES.map((slide, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={slide.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
              >
                {/* Visual Media Column (Pink Lady Framed Photo/Video style) */}
                <div className={`lg:col-span-6 relative ${isEven ? 'lg:order-1' : 'lg:order-2 lg:col-start-7'}`}>
                  
                  {/* Outer Layer with Emerald/Gold border & subtle shadow */}
                  <div className="relative rounded-[28px] p-1.5 bg-gradient-to-br from-emerald-500/40 via-emerald-900/60 to-champagne/30 shadow-2xl overflow-hidden group">
                    
                    <div className="relative h-[380px] sm:h-[480px] w-full rounded-[22px] overflow-hidden bg-obsidian-900">
                      <Image
                        src={slide.image}
                        alt={slide.headline}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                      />
                      
                      {/* Atmospheric Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />

                      {/* Floating Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1 rounded-full bg-obsidian-950/85 backdrop-blur-md border border-champagne/40 text-champagne text-xs font-mono font-bold shadow-lg">
                          {slide.badge}
                        </span>
                      </div>

                      {/* Slide Indicator */}
                      <div className="absolute bottom-4 right-4 bg-obsidian-950/80 backdrop-blur-md px-3 py-1 rounded-xl border border-emerald-900/50 text-[11px] font-mono text-emerald-400">
                        0{index + 1} / 04
                      </div>
                    </div>

                  </div>
                </div>

                {/* Editorial Copy Column (Bold Pink Lady Typography on Royal Emerald Canvas) */}
                <div className={`lg:col-span-6 space-y-6 text-left ${isEven ? 'lg:order-2' : 'lg:order-1 lg:col-start-1'}`}>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                    <Leaf className="w-3.5 h-3.5 text-champagne" />
                    <span>{slide.tag}</span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-[1.08]">
                    {slide.headline}
                  </h2>

                  <p className="text-base sm:text-lg font-mono text-champagne font-semibold">
                    {slide.subheadline}
                  </p>

                  <p className="text-sm sm:text-base text-cream/75 leading-relaxed font-sans">
                    {slide.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {slide.details.map((detail, dIdx) => (
                      <div 
                        key={dIdx}
                        className="p-3 rounded-xl bg-obsidian-900/80 border border-emerald-900/50 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-cream/80 font-mono">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-2">
                    <Link
                      href="/onboarding"
                      className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-champagne hover:underline group"
                    >
                      <span>Join The Wholesale Supply Network</span>
                      <div className="w-6 h-6 rounded-full bg-champagne text-obsidian-950 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 3. MEATOPIA VIBE: ARTISAN CULINARY SHOWCASE STRIP */}
      <section className="relative py-16 bg-gradient-to-r from-emerald-950 via-obsidian-900 to-emerald-950 border-y border-champagne/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-champagne font-bold uppercase">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>Culinary Craft & Pure Passion</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
                The Meatopia Standard
              </h3>
              <p className="text-xs text-cream/70 leading-relaxed font-sans">
                For chefs who cook with fire, craft, and zero shortcuts. Dry-aged prime British beef, heritage orchard produce, and living microgreens delivered before sunrise.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
              <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-emerald-900/60">
                <div className="text-2xl sm:text-3xl font-bold text-champagne">11:00 PM</div>
                <div className="text-[10px] text-zinc-400 uppercase mt-1">Order Cut-off</div>
              </div>
              <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-emerald-900/60">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400">06:00 AM</div>
                <div className="text-[10px] text-zinc-400 uppercase mt-1">Delivery SLA</div>
              </div>
              <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-emerald-900/60">
                <div className="text-2xl sm:text-3xl font-bold text-champagne">100%</div>
                <div className="text-[10px] text-zinc-400 uppercase mt-1">Zero Substitutions</div>
              </div>
              <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-emerald-900/60">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400">£30,000</div>
                <div className="text-[10px] text-zinc-400 uppercase mt-1">Trade Credit</div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
