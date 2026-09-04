'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  Zap,
  Activity,
  MapPin
} from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap-core';
import { useGsapContext } from '@/lib/animations/useGsapContext';

interface StorySection {
  id: string;
  tag: string;
  num: string;
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
    num: '01',
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
    num: '02',
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
    num: '03',
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
    num: '04',
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
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const storyPinnedRef = useRef<HTMLDivElement>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  // GSAP Cinematic Motion System
  useGsapContext(containerRef, (ctx) => {
    // 1. HERO OPENING SEQUENCE (Cinematic Timeline)
    const heroTl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 1 },
    });

    heroTl
      .from('.hero-badge', {
        y: -25,
        opacity: 0,
        duration: 0.8,
      })
      .from(
        '.hero-line-reveal',
        {
          yPercent: 100,
          opacity: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: 'power4.out',
        },
        '-=0.5'
      )
      .from(
        '.hero-desc',
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.6'
      )
      .from(
        '.hero-cta-group',
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.5'
      )
      .from(
        '.hero-metric-card',
        {
          y: 25,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
        },
        '-=0.5'
      )
      .from(
        '.hero-media-frame',
        {
          scale: 1.08,
          opacity: 0,
          duration: 1.3,
          ease: 'expo.out',
        },
        '-=1.2'
      )
      .from(
        '.hero-float-badge',
        {
          scale: 0.8,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
        },
        '-=0.7'
      );

    // Floating continuous oscillation on hero badges
    gsap.to('.hero-float-badge-1', {
      y: -8,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.hero-float-badge-2', {
      y: 8,
      duration: 4.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.5,
    });

    // 2. PINNED CAMERA-TRACK SCROLLYTELLING ("WHY ROOTWILLS IS SO SPECIAL")
    // Applies on desktop/tablet viewports (min-width: 1024px)
    try {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        if (!storyPinnedRef.current) return;
        const storyCards = gsap.utils.toArray<HTMLElement>('.story-desktop-slide');
        const imageSlides = gsap.utils.toArray<HTMLElement>('.story-image-slide');

        if (storyCards.length === 0 || imageSlides.length === 0) return;

        // Pinned ScrollTrigger Timeline
        const scrollyTl = gsap.timeline({
          scrollTrigger: {
            trigger: storyPinnedRef.current,
            start: 'top top+=80',
            end: `+=${STORY_SECTIONS.length * 100}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              const index = Math.min(
                Math.floor(self.progress * STORY_SECTIONS.length),
                STORY_SECTIONS.length - 1
              );
              setActiveStoryIndex(index);
            },
          },
        });

        storyCards.forEach((card, i) => {
          if (i === 0) return; // First card is active at start

          if (imageSlides[i]) {
            scrollyTl.to(
              imageSlides[i],
              {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power2.inOut',
              },
              i * 1.5
            );
          }

          if (i > 0 && imageSlides[i - 1]) {
            scrollyTl.to(
              imageSlides[i - 1],
              {
                opacity: 0,
                scale: 0.96,
                duration: 1,
                ease: 'power2.inOut',
              },
              i * 1.5
            );
          }

          // Cross-fade content card
          if (storyCards[i]) {
            scrollyTl.to(
              storyCards[i],
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
              },
              i * 1.5
            );
          }

          if (storyCards[i - 1]) {
            scrollyTl.to(
              storyCards[i - 1],
              {
                opacity: 0,
                y: -30,
                duration: 0.8,
                ease: 'power2.in',
              },
              i * 1.5
            );
          }
        });
      });

      // Mobile Staggered Scroll Triggers (min-width: < 1024px)
      mm.add('(max-width: 1023px)', () => {
        const mobileCards = gsap.utils.toArray<HTMLElement>('.story-mobile-card');
        mobileCards.forEach((card) => {
          if (!card) return;
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
          });
        });
      });
    } catch (e) {
      console.warn('Scrollytelling GSAP fallback:', e);
    }
  });

  return (
    <div ref={containerRef} className="w-full text-cream relative">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO OPENING VIEWPORT */}
      {/* ========================================================================= */}
      <section 
        ref={heroRef}
        className="relative min-h-[92vh] w-full pt-6 sm:pt-12 pb-16 flex items-center overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Line-Revealed Editorial Typography & Interactive CTAs */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Animated Eyebrow Badge with Pulse Glow */}
              <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-cream text-xs font-mono backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-300 font-bold">Farm-to-Kitchen Direct Supply &bull; Birmingham Hub</span>
                <span className="text-cream/30 hidden sm:inline">&bull;</span>
                <span className="text-champagne hidden sm:inline">11:00 PM Cut-off</span>
              </div>

              {/* Main Headline with Masked Overflow Stagger */}
              <div className="space-y-3 overflow-hidden">
                <div className="overflow-hidden">
                  <h1 className="hero-line-reveal font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-cream uppercase leading-[1.02] drop-shadow-2xl">
                    WHY ROOTWILLS
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <span className="hero-line-reveal gold-gradient-text font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight uppercase leading-[1.02] block">
                    IS SO SPECIAL
                  </span>
                </div>

                <p className="hero-desc text-base sm:text-lg text-cream/90 font-sans max-w-xl leading-relaxed pt-2">
                  We supply the finest fresh produce, orchard fruits, heritage vegetables, living herbs, and artisan dairy directly to hospitality professionals across the UK.
                </p>
              </div>

              {/* Interactive CTA Buttons with Magnetic Hover Physics */}
              <div className="hero-cta-group pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/onboarding"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-sm shadow-[0_0_30px_rgba(228,199,103,0.5)] hover:shadow-[0_0_45px_rgba(228,199,103,0.8)] hover:scale-105 active:scale-95 flex items-center gap-2 transition-all duration-300 group min-h-[44px]"
                >
                  <span>Open a Trade Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <a
                  href="#story-scrollytelling"
                  className="px-6 py-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 hover:border-champagne hover:scale-105 active:scale-95 text-cream text-sm font-semibold flex items-center gap-2 backdrop-blur-md transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 min-h-[44px]"
                >
                  <span>Explore The Story &darr;</span>
                </a>
              </div>

              {/* Animated Micro-Metric Badges Grid */}
              <div className="pt-6 border-t border-emerald-950/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                {[
                  { label: '11:00 PM Cut-off', sub: 'Late evening ordering', color: 'text-champagne', border: 'border-champagne/30' },
                  { label: '06:00 AM SLA', sub: 'Early kitchen drop', color: 'text-emerald-400', border: 'border-emerald-500/30' },
                  { label: 'SALSA Certified', sub: 'Full batch provenance', color: 'text-champagne', border: 'border-champagne/30' },
                  { label: '£30,000 Facility', sub: '30-Day trade terms', color: 'text-emerald-400', border: 'border-emerald-500/30' },
                ].map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    className={`hero-metric-card p-3 bg-emerald-950/60 rounded-xl border ${metric.border} font-mono text-xs shadow-md backdrop-blur-md cursor-default hover:-translate-y-1 transition-transform`}
                  >
                    <span className={`${metric.color} font-bold block uppercase`}>{metric.label}</span>
                    <span className="text-cream/80 text-[10px]">{metric.sub}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: High-Definition Branded Commercial Delivery Photo with Floating Badges */}
            <div className="lg:col-span-6 relative">
              <div className="hero-media-frame rounded-3xl p-1.5 bg-gradient-to-br from-emerald-500/40 via-emerald-900/50 to-champagne/30 border border-champagne/40 shadow-[0_25px_90px_rgba(2,23,16,0.95),0_0_60px_rgba(16,185,129,0.35)] overflow-hidden group">
                
                <div className="relative h-[380px] sm:h-[480px] w-full rounded-[22px] overflow-hidden bg-obsidian-900">
                  {/* High-Resolution Branded Handover Photography */}
                  <Image
                    src="/images/branded/rootwills_hero_chef_delivery.jpg"
                    alt="Rootwills Executive Chef Morning Delivery Handover"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover brightness-[0.96] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-transparent to-black/30 pointer-events-none" />

                  {/* Floating Badges with Sinusoidal Float */}
                  <div className="hero-float-badge hero-float-badge-1 absolute top-4 left-4 z-10">
                    <div className="bg-obsidian-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-champagne/50 text-champagne text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_20px_rgba(228,199,103,0.3)]">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>DIRECT HANDOVER &bull; 05:45 AM SLA</span>
                    </div>
                  </div>

                  <div className="hero-float-badge hero-float-badge-2 absolute top-4 right-4 z-10 flex items-center gap-2">
                    <div className="bg-obsidian-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/60 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <ThermometerSnowflake className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>+2.2°C Cold-Locked SLA</span>
                    </div>
                  </div>

                  {/* Floating Chef Review Bottom Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-obsidian-950/95 backdrop-blur-md p-3.5 rounded-xl border border-emerald-900/80 z-10 shadow-2xl">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-ping" />
                      <p className="text-xs text-cream/95 font-sans italic leading-tight">
                        "The crispness and consistency of Rootwills produce in our kitchen is unmatched in the Midlands."
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-champagne font-bold block mt-1">
                      — Executive Chef, Michelin-Recommended Midlands Kitchen
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PINNED CAMERA-TRACK SCROLLYTELLING JOURNEY */}
      {/* ========================================================================= */}
      <div id="story-scrollytelling" className="relative w-full">
        
        {/* DESKTOP PINNED EXPERIENCE (lg and above) */}
        <div 
          ref={storyPinnedRef}
          className="hidden lg:block relative min-h-[85vh] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        >
          {/* Top Progress Tracker Indicator */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-emerald-950">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-champagne font-bold">
                The Rootwills Supply Journey
              </span>
              <span className="text-xs text-cream/40">&bull;</span>
              <span className="text-xs font-mono text-emerald-400">
                Stage {STORY_SECTIONS[activeStoryIndex]?.num} of 04
              </span>
            </div>

            {/* Stage Pills */}
            <div className="flex items-center gap-2">
              {STORY_SECTIONS.map((sec, idx) => (
                <div
                  key={sec.id}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === activeStoryIndex 
                      ? 'w-10 bg-champagne shadow-[0_0_12px_rgba(228,199,103,0.6)]' 
                      : 'w-2 bg-emerald-950 border border-emerald-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-12 items-center min-h-[600px] relative">
            
            {/* Left Narrative Column (Stacked & Cross-faded) */}
            <div className="col-span-6 relative h-[560px]">
              {STORY_SECTIONS.map((section, idx) => {
                const SectionIcon = section.icon;
                return (
                  <div
                    key={section.id}
                    className={`story-desktop-slide absolute inset-0 space-y-6 flex flex-col justify-center ${
                      idx === 0 ? 'opacity-100 z-10' : 'opacity-0 -z-10'
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold shadow-md w-fit">
                      <SectionIcon className="w-3.5 h-3.5 text-champagne" />
                      <span>{section.tag}</span>
                    </div>

                    <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl font-extrabold text-cream leading-[1.08]">
                      {section.headline}
                    </h2>

                    <p className="text-base font-mono text-champagne font-bold">
                      {section.subheadline}
                    </p>

                    <p className="text-sm text-cream/80 leading-relaxed font-sans">
                      {section.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {section.points.map((pt, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/50 flex items-start gap-2.5 hover:border-emerald-500/40 transition-colors shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-cream/90 font-mono">{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-2">
                      <Link
                        href="/onboarding"
                        className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider font-bold text-champagne hover:text-champagne-soft group min-h-[44px]"
                      >
                        <span>Request Wholesale Account Specs</span>
                        <div className="w-8 h-8 rounded-full bg-champagne text-obsidian-950 flex items-center justify-center group-hover:translate-x-1.5 transition-transform shadow-lg shadow-champagne/20">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Link>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Right Visual Image Frame (Stacked & Layered) */}
            <div className="col-span-6 relative h-[560px]">
              <div className="relative w-full h-full rounded-3xl p-2 bg-gradient-to-br from-emerald-500/30 via-emerald-900/40 to-champagne/20 border border-emerald-500/30 shadow-2xl overflow-hidden">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-obsidian-900">
                  
                  {STORY_SECTIONS.map((section, idx) => (
                    <div
                      key={section.id}
                      className={`story-image-slide absolute inset-0 transition-transform duration-700 ${
                        idx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 scale-105'
                      }`}
                    >
                      <Image
                        src={section.image}
                        alt={section.headline}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 1200px) 50vw, 600px"
                        className="object-cover brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/85 via-transparent to-transparent" />

                      {/* Floating Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-3.5 py-1.5 rounded-full bg-obsidian-950/90 backdrop-blur-md border border-champagne/50 text-champagne text-xs font-mono font-bold shadow-lg flex items-center gap-1.5">
                          <Leaf className="w-3.5 h-3.5 text-champagne" />
                          <span>{section.badge}</span>
                        </span>
                      </div>

                      {/* Caption */}
                      <div className="absolute bottom-4 left-4 right-4 bg-obsidian-950/85 backdrop-blur-md p-3 rounded-xl border border-emerald-900/60 text-xs font-mono text-cream/90 z-20">
                        {section.imageCaption}
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* MOBILE RESPONSIVE VERTICAL STAGGER (lg:hidden) */}
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
          {STORY_SECTIONS.map((section) => {
            const SectionIcon = section.icon;
            return (
              <div key={section.id} className="story-mobile-card space-y-6">
                
                {/* Mobile Image Frame */}
                <div className="relative h-[320px] w-full rounded-2xl p-1 bg-gradient-to-br from-emerald-500/30 via-emerald-900/40 to-champagne/20 border border-emerald-500/30 overflow-hidden shadow-xl">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-obsidian-900">
                    <Image
                      src={section.image}
                      alt={section.headline}
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="100vw"
                      className="object-cover brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-obsidian-950/90 border border-champagne/50 text-champagne text-xs font-mono font-bold flex items-center gap-1.5">
                        <SectionIcon className="w-3 h-3 text-champagne" />
                        <span>{section.badge}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 bg-obsidian-950/90 p-2.5 rounded-lg border border-emerald-900/60 text-[11px] font-mono text-cream/90">
                      {section.imageCaption}
                    </div>
                  </div>
                </div>

                {/* Mobile Text Content */}
                <div className="space-y-3 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                    <span>{section.tag}</span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-cream">
                    {section.headline}
                  </h2>

                  <p className="text-sm font-mono text-champagne font-bold">
                    {section.subheadline}
                  </p>

                  <p className="text-xs text-cream/80 leading-relaxed font-sans">
                    {section.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {section.points.map((pt, pIdx) => (
                      <div key={pIdx} className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 flex items-center gap-2 text-xs font-mono text-cream/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/onboarding"
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold text-champagne hover:underline min-h-[44px]"
                    >
                      <span>Request Wholesale Specs &rarr;</span>
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
