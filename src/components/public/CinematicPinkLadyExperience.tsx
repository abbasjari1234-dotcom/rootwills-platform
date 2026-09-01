'use client';

import React, { useState, useRef } from 'react';
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
  Sun,
  Droplets,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Zap,
  TrendingUp,
  Activity
} from 'lucide-react';

interface StorySection {
  id: string;
  tag: string;
  headline: string;
  subheadline: string;
  description: string;
  points: string[];
  image: string;
  imageCaption: string;
  badge: string;
  icon: any;
}

const STORY_SECTIONS: StorySection[] = [
  {
    id: 'story-1',
    tag: '01 / Provenance & Soil',
    headline: 'Harvested at Peak Crispness. Direct from Soil to Chef.',
    subheadline: 'Zero intermediate cold storage. Hand-picked at optimum Brix sweetness.',
    description: 'Just like the world’s finest single-estate fruit and heritage vegetables, our produce is selected for intense flavor density and cell crispness. Sourced directly from certified UK farm estates and sun-drenched European orchards.',
    points: [
      'Daily morning picking schedules',
      'Non-invasive Brix sugar testing (14.5°+)',
      '100% Class 1 Extra-Select specifications',
      'Full farm-to-fork batch traceability'
    ],
    image: '/images/branded/rootwills_orchard_harvest.jpg',
    imageCaption: 'Kent & European Sun Orchards — Hand-Harvested Daily into Rootwills Crates',
    badge: 'Class 1 Extra Selection',
    icon: Sun,
  },
  {
    id: 'story-2',
    tag: '02 / Cold-Chain Dual-Temp',
    headline: 'Continuous +2°C Micro-Climate. Zero Thermal Breaks.',
    subheadline: 'Calibrated dual-temperature fleet with real-time GPS telemetry.',
    description: 'Thermal breaks destroy produce cell walls and leaf vibrancy. Rootwills operates a dedicated fleet of dual-temperature refrigerated Mercedes-Benz Sprinters. Tender salads arrive with morning dewdrops intact; delicate berries stay firm and mold-free.',
    points: [
      '+2.0°C to +4.0°C chilled produce vault',
      'Continuous calibrated digital telematics',
      'Time-stamped temperature logs on handover',
      'Guaranteed 06:00 AM – 07:30 AM early morning SLA'
    ],
    image: '/images/branded/rootwills_fleet_delivery.jpg',
    imageCaption: 'Continuous Dual-Temp Cold Chain — +2.2°C Calibrated Hold Fleet',
    badge: '100% Cold-Locked Chain',
    icon: ThermometerSnowflake,
  },
  {
    id: 'story-3',
    tag: '03 / Living Herbs & Farmhouse Dairy',
    headline: 'Hydroponic Microgreens & Farmhouse Dairy.',
    subheadline: 'Living herbs with roots intact, artisan butter, and Lion-code eggs.',
    description: 'We speak the language of professional executive kitchens. Hand-harvested living herbs delivered in nutrient pads for 10-day shelf life, French cultured pastry butter (84% butterfat), and farmhouse cheeses tailored to your menu.',
    points: [
      'Late 11:00 PM order cut-off (after dinner service)',
      'Zero-substitution policy without chef consent',
      'Living root microgreens with zero soil grit',
      'Dedicated commercial key account desk'
    ],
    image: '/images/branded/rootwills_microgreens_dairy.jpg',
    imageCaption: 'Living Hydroponic Microgreen Trays & Rootwills Artisan Dairy',
    badge: 'Chef-Selected Grade A',
    icon: Leaf,
  },
  {
    id: 'story-4',
    tag: '04 / The Trade Network',
    headline: 'Join the Rootwills Foodservice Network.',
    subheadline: 'Approved 30-day trade credit and locked contract pricing.',
    description: 'Over 400 fine dining restaurants, boutique hotels, luxury caterers, and healthcare groups trust Rootwills for their daily morning fresh food supply across Birmingham and the UK.',
    points: [
      'Instant 2-minute digital trade application',
      'Up to £30,000 credit facility (30-Day Terms)',
      'Personalised contract price list locked for your venue',
      'Instant 1-click repeat reordering on web & mobile'
    ],
    image: '/images/branded/rootwills_digbeth_hub.jpg',
    imageCaption: 'Digbeth Central Hub — Next-Day Morning UK Distribution Depot',
    badge: 'Open Your Trade Account',
    icon: ShieldCheck,
  }
];

export function CinematicPinkLadyExperience() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="w-full text-cream relative">
      
      {/* 1. MASTERPIECE 2-COLUMN HERO WITH FRAMED CINEMA VIDEO REEL */}
      <section className="relative min-h-[92vh] w-full pt-8 sm:pt-14 pb-16 flex items-center overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Animated Bold Typography & Interactive CTAs */}
            <motion.div 
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              
              {/* Animated Eyebrow Badge with Pulse Glow */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-cream text-xs font-mono backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-300 font-bold">Farm-to-Kitchen Direct Supply &bull; Birmingham Hub</span>
                <span className="text-cream/30 hidden sm:inline">&bull;</span>
                <span className="text-champagne hidden sm:inline">11:00 PM Cut-off</span>
              </motion.div>

              {/* Main Headline with Shimmer Effect */}
              <div className="space-y-3">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-cream uppercase leading-[1.02] drop-shadow-2xl"
                >
                  WHY ROOTWILLS <br />
                  <span className="gold-gradient-text animate-pulse" style={{ animationDuration: '4s' }}>
                    IS SO SPECIAL
                  </span>
                </motion.h1>

                <p className="text-base sm:text-xl text-cream/85 font-sans max-w-xl leading-relaxed">
                  We supply the finest fresh produce, orchard fruits, heritage vegetables, living herbs, and artisan dairy directly to hospitality professionals across the UK.
                </p>
              </div>

              {/* Interactive CTA Buttons with Magnetic Spring Hover */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/onboarding"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-sm shadow-[0_0_30px_rgba(228,199,103,0.5)] hover:shadow-[0_0_45px_rgba(228,199,103,0.8)] flex items-center gap-2 transition-all group"
                  >
                    <span>Open a Trade Account</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="#story-start"
                    className="px-6 py-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 hover:border-champagne text-cream text-sm font-semibold flex items-center gap-2 backdrop-blur-md transition-all shadow-lg hover:shadow-emerald-500/20"
                  >
                    <span>Explore The Story &rarr;</span>
                  </Link>
                </motion.div>
              </div>

              {/* Animated Micro-Metric Badges Grid */}
              <div className="pt-6 border-t border-emerald-950/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                {[
                  { label: '11:00 PM Cut-off', sub: 'Late evening ordering', color: 'text-champagne', border: 'border-champagne/30' },
                  { label: '06:00 AM SLA', sub: 'Early kitchen drop', color: 'text-emerald-400', border: 'border-emerald-500/30' },
                  { label: 'SALSA Certified', sub: 'Full batch provenance', color: 'text-champagne', border: 'border-champagne/30' },
                  { label: '£30,000 Facility', sub: '30-Day trade terms', color: 'text-emerald-400', border: 'border-emerald-500/30' },
                ].map((metric, mIdx) => (
                  <motion.div
                    key={mIdx}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`p-3 bg-emerald-950/60 rounded-xl border ${metric.border} font-mono text-xs shadow-md transition-all backdrop-blur-md cursor-default`}
                  >
                    <span className={`${metric.color} font-bold block uppercase`}>{metric.label}</span>
                    <span className="text-cream/60 text-[10px]">{metric.sub}</span>
                  </motion.div>
                ))}
              </div>

            </motion.div>

            {/* Right Column: High-Definition Branded Commercial Delivery Photo with Floating Parallax Badges */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, x: 35 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="rounded-3xl p-1.5 bg-gradient-to-br from-emerald-500/40 via-emerald-900/50 to-champagne/30 border border-champagne/40 shadow-[0_25px_90px_rgba(2,23,16,0.95),0_0_60px_rgba(16,185,129,0.35)] overflow-hidden group">
                
                <div className="relative h-[380px] sm:h-[480px] w-full rounded-[22px] overflow-hidden bg-obsidian-900">
                  
                  {/* High-Resolution Branded Commercial Kitchen Image */}
                  <Image
                    src="/images/branded/rootwills_hero_chef_delivery.jpg"
                    alt="Rootwills Commercial Kitchen Delivery with Branded Produce Crate"
                    fill
                    priority
                    className="w-full h-full object-cover brightness-[0.96] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-transparent to-black/30 pointer-events-none" />

                  {/* Floating Animated Badges (Parallax Floating Oscillation) */}
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="absolute top-4 left-4 z-10"
                  >
                    <div className="bg-obsidian-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-champagne/50 text-champagne text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_20px_rgba(228,199,103,0.3)]">
                      <Sun className="w-3.5 h-3.5 text-champagne animate-spin" style={{ animationDuration: '10s' }} />
                      <span>Direct Farm-to-Chef &bull; Daily Handover</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                    className="absolute top-4 right-4 z-10"
                  >
                    <div className="bg-obsidian-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/60 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <ThermometerSnowflake className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>+2.2°C Cold-Locked SLA</span>
                    </div>
                  </motion.div>

                  {/* Floating Chef Review Bottom Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-4 left-4 right-4 bg-obsidian-950/95 backdrop-blur-md p-3.5 rounded-xl border border-emerald-900/80 z-10 shadow-2xl"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-ping" />
                      <p className="text-xs text-cream/95 font-sans italic leading-tight">
                        "The crispness and consistency of Rootwills produce in our kitchen is unmatched in the Midlands."
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-champagne font-bold block mt-1">
                      — Executive Chef, Michelin-Recommended Midlands Kitchen
                    </span>
                  </motion.div>

                </div>

              </div>
            </motion.div>

          </div>
        </div>

      </section>

      {/* 2. SPLIT-SCREEN FRAMED SCROLLYTELLING JOURNEY WITH SMOOTH MOTION SPRINGS */}
      <div id="story-start" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 space-y-28 sm:space-y-40 relative z-10">
        
        {STORY_SECTIONS.map((section, index) => {
          const isEven = index % 2 === 0;
          const SectionIcon = section.icon;

          return (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                isEven ? '' : 'lg:grid-flow-dense'
              }`}
            >
              
              {/* Image Frame Column with Interactive Hover Zoom */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2 lg:col-start-7'}`}>
                <motion.div 
                  whileHover={{ scale: 1.02, rotate: isEven ? 0.5 : -0.5 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-3xl p-2 bg-gradient-to-br from-emerald-500/30 via-emerald-900/40 to-champagne/20 border border-emerald-500/30 shadow-2xl group overflow-hidden"
                >
                  
                  <div className="relative h-[380px] sm:h-[500px] w-full rounded-2xl overflow-hidden bg-obsidian-900">
                    <Image
                      src={section.image}
                      alt={section.headline}
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />

                    {/* Floating Animated Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 rounded-full bg-obsidian-950/90 backdrop-blur-md border border-champagne/50 text-champagne text-xs font-mono font-bold shadow-lg flex items-center gap-1.5">
                        <SectionIcon className="w-3.5 h-3.5 text-champagne" />
                        <span>{section.badge}</span>
                      </span>
                    </div>

                    {/* Image Caption */}
                    <div className="absolute bottom-4 left-4 right-4 bg-obsidian-950/85 backdrop-blur-md p-3 rounded-xl border border-emerald-900/60 text-xs font-mono text-cream/80">
                      {section.imageCaption}
                    </div>
                  </div>

                </motion.div>
              </div>

              {/* Editorial Copy Column */}
              <div className={`lg:col-span-6 space-y-6 text-left ${isEven ? 'lg:order-2' : 'lg:order-1 lg:col-start-1'}`}>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold shadow-md">
                  <Leaf className="w-3.5 h-3.5 text-champagne" />
                  <span>{section.tag}</span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream leading-[1.08]">
                  {section.headline}
                </h2>

                <p className="text-base sm:text-lg font-mono text-champagne font-bold">
                  {section.subheadline}
                </p>

                <p className="text-sm sm:text-base text-cream/75 leading-relaxed font-sans">
                  {section.description}
                </p>

                {/* Bullet Points with Interactive Hover */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {section.points.map((pt, pIdx) => (
                    <motion.div
                      key={pIdx}
                      whileHover={{ x: 4, scale: 1.02 }}
                      className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/50 flex items-start gap-2.5 hover:border-emerald-500/40 transition-colors shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-cream/85 font-mono">{pt}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Action CTA with Hover Arrow Animation */}
                <div className="pt-3">
                  <motion.div whileHover={{ scale: 1.03 }} className="inline-block">
                    <Link
                      href="/onboarding"
                      className="inline-flex items-center gap-2.5 font-mono text-sm font-bold text-champagne hover:text-champagne-soft group"
                    >
                      <span>Request Wholesale Account Specs</span>
                      <div className="w-8 h-8 rounded-full bg-champagne text-obsidian-950 flex items-center justify-center group-hover:translate-x-1.5 transition-transform shadow-lg shadow-champagne/20">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </motion.div>
                </div>

              </div>

            </motion.div>
          );
        })}

      </div>

    </div>
  );
}
