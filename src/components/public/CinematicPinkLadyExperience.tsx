'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  PhoneCall,
  MapPin,
  Check,
  UserCheck
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
  accentBg: string;
  accentText: string;
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
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&auto=format&fit=crop&q=90',
    imageCaption: 'Kent & European Sun Orchards — Hand-Harvested Daily',
    badge: 'Class 1 Extra Selection',
    accentBg: 'bg-emerald-950/80',
    accentText: 'text-emerald-300'
  },
  {
    id: 'story-2',
    tag: '02 / Cold-Chain Dual-Temp',
    headline: 'Continuous +2°C Micro-Climate. Zero Thermal Breaks.',
    subheadline: 'Calibrated dual-temperature fleet with real-time GPS telemetry.',
    description: 'Thermal breaks destroy produce cell walls and leaf vibrancy. Rootwills operates a dedicated fleet of dual-temperature refrigerated vehicles. Tender salads arrive with morning dewdrops intact; delicate berries stay firm and mold-free.',
    points: [
      '+2.0°C to +4.0°C chilled produce vault',
      'Continuous calibrated digital telematics',
      'Time-stamped temperature logs on handover',
      'Guaranteed 06:00 AM – 07:30 AM early morning SLA'
    ],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=90',
    imageCaption: 'Continuous Dual-Temp Cold Chain — +2.2°C Calibrated Hold',
    badge: '100% Cold-Locked Chain',
    accentBg: 'bg-emerald-950/80',
    accentText: 'text-emerald-300'
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
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop&q=90',
    imageCaption: 'Living Hydroponic Microgreen Trays — Roots Attached',
    badge: 'Chef-Selected Grade A',
    accentBg: 'bg-emerald-950/80',
    accentText: 'text-emerald-300'
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
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=90',
    imageCaption: 'Digbeth Central Hub — Next-Day Morning UK Distribution',
    badge: 'Open Your Trade Account',
    accentBg: 'bg-emerald-950/80',
    accentText: 'text-emerald-300'
  }
];

export function CinematicPinkLadyExperience() {
  return (
    <div className="w-full bg-obsidian-950 text-cream">
      
      {/* 1. CINEMATIC FULL-SCREEN VIDEO HERO (Exact Pink Lady Style) */}
      <section className="relative h-[90vh] sm:h-[95vh] w-full overflow-hidden flex items-end pb-12 sm:pb-20">
        
        {/* Fullscreen Video Background */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover brightness-[0.72] contrast-[1.08] scale-105"
            poster="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600&auto=format&fit=crop&q=85"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-hands-holding-fresh-picked-apples-41221-large.mp4"
              type="video/mp4"
            />
          </video>
          
          {/* Subtle cinematic gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/35 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/70 via-transparent to-obsidian-950/70" />
        </div>

        {/* Hero Content Overlay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-left space-y-5">
          
          {/* Top Live Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-950/85 border border-emerald-500/40 text-emerald-300 text-xs font-mono backdrop-blur-xl shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold">Fresh Produce &bull; Farm-to-Kitchen Direct Supply &bull; UK & Midlands</span>
            <span className="text-cream/30 hidden sm:inline">&bull;</span>
            <span className="text-champagne hidden sm:inline">11:00 PM Cut-off for 06:00 AM SLA</span>
          </div>

          {/* Huge Iconic Headline (Pink Lady Style) */}
          <div className="max-w-4xl space-y-3">
            <h1 className="font-display text-4xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-cream uppercase leading-[1.02] drop-shadow-2xl">
              WHY ROOTWILLS <br />
              <span className="gold-gradient-text">IS SO SPECIAL</span>
            </h1>

            <p className="text-base sm:text-xl text-cream/90 font-sans max-w-2xl leading-relaxed drop-shadow">
              We supply the finest fresh produce, orchard fruits, heritage vegetables, artisan dairy, and bakery staples directly to hospitality professionals across the UK.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/onboarding"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-sm shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all"
            >
              <span>Open a Trade Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#story-start"
              className="px-6 py-4 rounded-xl bg-obsidian-950/80 border border-emerald-500/40 hover:border-champagne text-cream text-sm font-semibold flex items-center gap-2 backdrop-blur-md transition-all"
            >
              <span>Explore The Story &rarr;</span>
            </Link>
          </div>

        </div>

        {/* Scroll Prompt */}
        <div className="absolute bottom-6 right-8 hidden md:flex items-center gap-2 font-mono text-xs text-cream/60 z-10">
          <span>Scroll to explore</span>
          <div className="w-4 h-7 rounded-full border border-champagne/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-champagne rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. SPLIT-SCREEN FRAMED SCROLLYTELLING JOURNEY (Exact Pink Lady Layout) */}
      <div id="story-start" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 space-y-28 sm:space-y-40">
        
        {STORY_SECTIONS.map((section, index) => {
          const isEven = index % 2 === 0;

          return (
            <div 
              key={section.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                isEven ? '' : 'lg:grid-flow-dense'
              }`}
            >
              
              {/* Image Frame Column (Pink Lady High-Impact Photo Card) */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2 lg:col-start-7'}`}>
                <div className="relative rounded-3xl p-2 bg-gradient-to-br from-emerald-500/30 via-emerald-900/40 to-champagne/20 border border-emerald-500/30 shadow-2xl group overflow-hidden">
                  
                  <div className="relative h-[380px] sm:h-[500px] w-full rounded-2xl overflow-hidden bg-obsidian-900">
                    <Image
                      src={section.image}
                      alt={section.headline}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />

                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 rounded-full bg-obsidian-950/90 backdrop-blur-md border border-champagne/40 text-champagne text-xs font-mono font-bold shadow-lg">
                        {section.badge}
                      </span>
                    </div>

                    {/* Image Caption */}
                    <div className="absolute bottom-4 left-4 right-4 bg-obsidian-950/85 backdrop-blur-md p-3 rounded-xl border border-emerald-900/60 text-xs font-mono text-cream/80">
                      {section.imageCaption}
                    </div>
                  </div>

                </div>
              </div>

              {/* Editorial Copy Column (Bold Typography & Checkpoints) */}
              <div className={`lg:col-span-6 space-y-6 text-left ${isEven ? 'lg:order-2' : 'lg:order-1 lg:col-start-1'}`}>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
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

                {/* Bullet Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {section.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3 rounded-xl bg-obsidian-900/80 border border-emerald-900/50 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-cream/85 font-mono">{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-3">
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center gap-2 font-mono text-sm font-bold text-champagne hover:underline group"
                  >
                    <span>Request Wholesale Account Specs</span>
                    <div className="w-7 h-7 rounded-full bg-champagne text-obsidian-950 flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-md">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}
