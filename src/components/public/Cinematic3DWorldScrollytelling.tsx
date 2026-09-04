'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Truck, 
  MapPin, 
  Sun, 
  Sparkles, 
  CreditCard,
  Building2,
  ChevronDown
} from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap-core';
import { useGsapContext } from '@/lib/animations/useGsapContext';

interface SceneAct {
  id: string;
  actNumber: string;
  actTitle: string;
  headline: string;
  subheadline: string;
  description: string;
  metrics: { label: string; value: string }[];
  image: string;
  imageAlt: string;
  telemetry: string;
  location: string;
}

const SCENE_ACTS: SceneAct[] = [
  {
    id: 'act-1',
    actNumber: 'ACT I',
    actTitle: 'THE TERROIR & PROVENANCE',
    headline: 'Harvested at Peak Density. Direct from Soil to Chef.',
    subheadline: 'Zero intermediate cold storage. 100% Class 1 Extra-Select harvest.',
    description: 'Sourced directly from heritage single-estate Kent orchards and European grower cooperatives. Every batch is harvested at peak natural Brix sugar density and transferred to our Birmingham hub within 8 hours of sunrise picking.',
    metrics: [
      { label: 'Sugar Refraction', value: '14.8° Brix' },
      { label: 'Farm-to-Hub', value: '< 8 Hours' },
      { label: 'Quality Grade', value: 'Class 1 Select' },
    ],
    image: '/images/branded/rootwills_orchard_harvest.jpg',
    imageAlt: 'Heritage Kent Orchard Sunrise Harvest for Rootwills',
    telemetry: 'SOIL PROVENANCE &bull; SALSA AUDITED',
    location: 'Kent Farm Estates & European Orchards',
  },
  {
    id: 'act-2',
    actNumber: 'ACT II',
    actTitle: 'THE COLD-LOCK VAULT',
    headline: 'Continuous +2.0°C Microclimate. Zero Thermal Breaks.',
    subheadline: 'Dual-temperature Mercedes-Benz fleet with live GPS telemetry.',
    description: 'Thermal breaks destroy cellular integrity and herb aroma. Rootwills operates an unbroken refrigerated logistics corridor from our Digbeth Central Hub directly into your kitchen walk-in cold rooms before morning prep begins.',
    metrics: [
      { label: 'Chill Vault Hold', value: '+2.0°C / +4.0°C' },
      { label: 'Delivery SLA', value: '06:00 AM Guaranteed' },
      { label: 'Thermal Auditing', value: '100% Calibrated' },
    ],
    image: '/images/branded/rootwills_fleet_delivery.jpg',
    imageAlt: 'Rootwills Dual-Temp Mercedes-Benz Fleet Dispatch in Digbeth',
    telemetry: 'FLEET TELEMATICS &bull; DUAL-ZONE REFRIGERATION',
    location: 'Digbeth Wholesale Hub, Birmingham B5 5JR',
  },
  {
    id: 'act-3',
    actNumber: 'ACT III',
    actTitle: 'THE MICHELIN PASS',
    headline: 'Executive Kitchen Handover. Zero-Substitution Policy.',
    subheadline: 'Pristine crates placed inside your fridge before prep chefs arrive.',
    description: 'Trusted by over 400 fine-dining establishments, boutique hotels, and luxury catering venues across the UK. We speak the language of executive head chefs: uncompromising visual consistency, pristine packaging, and late 11:00 PM ordering cut-offs.',
    metrics: [
      { label: 'Order Cut-off', value: '11:00 PM Tonight' },
      { label: 'Substitutions', value: '0% Without Consent' },
      { label: 'Crate Usability', value: '+14% Usable Yield' },
    ],
    image: '/images/branded/rootwills_hero_chef_delivery.jpg',
    imageAlt: 'Executive Kitchen Produce Handover with Branded Crate',
    telemetry: 'CHEF HANDOVER &bull; 06:00 AM SLA',
    location: 'Michelin-Recommended Restaurant Kitchen',
  },
  {
    id: 'act-4',
    actNumber: 'ACT IV',
    actTitle: 'THE TRADE FACILITY',
    headline: 'Up to £50,000 Trade Credit. 30-Day Institutional Terms.',
    subheadline: 'Instant digital onboarding with locked contract rates for your venue.',
    description: 'Empowering British hospitality groups with institutional buying power. Consolidate your produce, dairy, bakery, and dry store accounts into a single automated monthly billing statement underwritten by Rootwills Commercial Credit.',
    metrics: [
      { label: 'Credit Limit', value: 'Up to £50,000' },
      { label: 'Payment Terms', value: '30-Day Net Facility' },
      { label: 'Onboarding Speed', value: '< 2 Minutes Online' },
    ],
    image: '/images/branded/rootwills_digbeth_hub.jpg',
    imageAlt: 'Rootwills Central Fulfilment Hub and Distribution Center',
    telemetry: 'COMMERCIAL FACILITY &bull; 30-DAY TERMS',
    location: 'National Wholesale Distribution Gateway',
  },
];

export function Cinematic3DWorldScrollytelling() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const stage3DRef = useRef<HTMLDivElement>(null);
  const crate3DRef = useRef<HTMLDivElement>(null);
  const [activeActIndex, setActiveActIndex] = useState(0);

  // GSAP 3D Camera Scrollytelling Engine
  useGsapContext(pinSectionRef, (ctx) => {
    if (!pinSectionRef.current || !stage3DRef.current) return;

    try {
      const acts = gsap.utils.toArray<HTMLElement>('.cinematic-act-scene');
      const totalActs = acts.length;

      // Master Timeline Pinned Across 400vh of smooth scroll
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              totalActs - 1,
              Math.floor(self.progress * totalActs)
            );
            setActiveActIndex(index);
          },
        },
      });

      // 3D Object Rotation (Produce Crate continuous spatial rotation)
      if (crate3DRef.current) {
        masterTl.to(
          crate3DRef.current,
          {
            rotateY: 720,
            rotateX: 30,
            translateZ: 150,
            ease: 'none',
            duration: totalActs * 2,
          },
          0
        );
      }

      // Transition between acts with 3D Z-plane camera dolly and iris dissolve
      acts.forEach((act, i) => {
        if (i === 0) {
          // Act 1 starts fully visible
          gsap.set(act, { opacity: 1, zIndex: 10, scale: 1, filter: 'blur(0px)' });
          return;
        }

        const prevAct = acts[i - 1];

        // Dolly camera forward: previous act scales up and dissolves in 3D
        masterTl
          .to(
            prevAct,
            {
              scale: 1.35,
              opacity: 0,
              filter: 'blur(10px)',
              duration: 1.5,
              ease: 'power2.inOut',
            },
            `act-step-${i}`
          )
          // New act swoops in from deep Z-space
          .fromTo(
            act,
            {
              scale: 0.75,
              opacity: 0,
              filter: 'blur(14px)',
              zIndex: 20 + i,
            },
            {
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1.5,
              ease: 'power2.out',
            },
            `act-step-${i}+=0.3`
          );
      });

    } catch (e) {
      console.warn('Cinematic 3D Scrollytelling fallback:', e);
    }
  });

  return (
    <section 
      ref={pinSectionRef} 
      className="relative w-full h-screen bg-obsidian-950 overflow-hidden select-none border-y border-emerald-950/80"
    >
      {/* Volumetric Radial Cinema Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,45,33,0.45)_0%,rgba(2,12,8,0.95)_75%)] pointer-events-none z-0" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-champagne/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Fixed Telemetry & Cinema HUD */}
      <div className="absolute top-6 inset-x-6 sm:inset-x-12 z-40 flex items-center justify-between text-xs font-mono text-cream/70 pointer-events-none">
        <div className="flex items-center gap-3 bg-obsidian-950/85 backdrop-blur-xl px-4 py-2 rounded-full border border-emerald-900/60 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-champagne font-bold tracking-wider">ROOTWILLS COLD-CHAIN &bull; 3D CAMERA REEL</span>
        </div>

        {/* Scene Act Progress Tabs */}
        <div className="hidden md:flex items-center gap-2 bg-obsidian-950/85 backdrop-blur-xl p-1.5 rounded-full border border-emerald-900/60 shadow-xl pointer-events-auto">
          {SCENE_ACTS.map((act, idx) => (
            <div
              key={act.id}
              className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-500 flex items-center gap-1.5 ${
                idx === activeActIndex
                  ? 'bg-champagne text-obsidian-950 font-bold shadow-gold-glow'
                  : 'text-cream/50 hover:text-cream'
              }`}
            >
              <span>{act.actNumber}</span>
              <span className="hidden lg:inline">&bull; {act.actTitle}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-obsidian-950/85 backdrop-blur-xl px-4 py-2 rounded-full border border-emerald-900/60 text-cream/80">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-bold">SCENE 0{activeActIndex + 1} / 04</span>
        </div>
      </div>

      {/* 3D Perspective Stage Container (perspective: 1400px) */}
      <div
        ref={stage3DRef}
        style={{
          perspective: '1400px',
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* ========================================================================= */}
        {/* SCENE ACTS STACKED IN 3D SPACE */}
        {/* ========================================================================= */}
        {SCENE_ACTS.map((act, idx) => {
          return (
            <div
              key={act.id}
              className="cinematic-act-scene absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-12 lg:p-16 opacity-0"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Monumental Editorial Typography & Telemetry */}
                <div className="lg:col-span-6 space-y-6 text-left z-20">
                  
                  {/* Eyebrow Label with Hairline Rule */}
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-champagne font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                      <span>{act.actNumber} &bull; {act.actTitle}</span>
                    </div>
                    <div className="h-0.5 w-16 bg-gradient-to-r from-champagne to-transparent" />
                  </div>

                  {/* Monumental Headline */}
                  <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-cream uppercase leading-[1.05] tracking-tight">
                    {act.headline}
                  </h2>

                  {/* Subheadline & Narrative */}
                  <p className="font-sans text-sm sm:text-base text-cream/80 leading-relaxed max-w-xl">
                    {act.description}
                  </p>

                  {/* Institutional Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-emerald-950">
                    {act.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="space-y-0.5 font-mono">
                        <span className="text-[10px] uppercase text-cream/50 block">{m.label}</span>
                        <span className="text-sm sm:text-base font-bold text-champagne block">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Action Trigger for Act 4 */}
                  {idx === 3 && (
                    <div className="pt-4 flex flex-wrap gap-4">
                      <Link
                        href="/apply"
                        className="px-8 py-4 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs font-mono shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all"
                      >
                        <span>Apply for Trade Facility</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/products"
                        className="px-6 py-4 rounded-xl bg-obsidian-900 border border-emerald-800 text-cream font-mono text-xs hover:border-champagne flex items-center gap-2 transition-all"
                      >
                        <span>View Commercial Catalogue</span>
                      </Link>
                    </div>
                  )}

                  {/* Telemetry Badge */}
                  <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-cream/60">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{act.location}</span>
                  </div>

                </div>

                {/* Right Column: 3D Camera Floating Frame with Anamorphic Widescreen */}
                <div className="lg:col-span-6 relative z-10 flex items-center justify-center">
                  
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl p-2 bg-gradient-to-br from-emerald-500/30 via-emerald-950/60 to-champagne/30 border border-champagne/40 shadow-[0_30px_100px_rgba(2,12,8,0.95)] overflow-hidden group">
                    
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-obsidian-900">
                      
                      {/* High-Resolution Scene Photography */}
                      <Image
                        src={act.image}
                        alt={act.imageAlt}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover brightness-95 contrast-[1.08] transition-transform duration-1000 group-hover:scale-105"
                      />

                      {/* Cinematic Film Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/95 via-transparent to-black/30 pointer-events-none" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,12,8,0.85)_100%)] pointer-events-none" />

                      {/* Top Overlay Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <div className="bg-obsidian-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-champagne/40 text-champagne text-[11px] font-mono font-bold shadow-lg flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{act.telemetry}</span>
                        </div>
                      </div>

                      {/* Interactive 3D Spatial Crate (Only on Act 2) */}
                      {idx === 1 && (
                        <div 
                          ref={crate3DRef}
                          className="absolute bottom-6 right-6 z-30 pointer-events-none hidden sm:block"
                          style={{
                            transformStyle: 'preserve-3d',
                          }}
                        >
                          <div className="bg-obsidian-950/90 backdrop-blur-xl p-4 rounded-2xl border border-champagne/60 shadow-2xl text-center space-y-1">
                            <span className="text-[10px] font-mono uppercase text-champagne font-bold block">
                              3D SPATIAL PROBE
                            </span>
                            <div className="font-mono text-xl font-extrabold text-emerald-400">
                              +2.2°C
                            </div>
                            <span className="text-[9px] font-mono text-cream/60 block">
                              Calibrated Digbeth Vault
                            </span>
                          </div>
                        </div>
                      )}

                      {/* 3D Floating Corporate Titanium Card (Only on Act 4) */}
                      {idx === 3 && (
                        <div className="absolute bottom-6 right-6 z-30 pointer-events-none hidden sm:block">
                          <div className="bg-gradient-to-br from-champagne/20 via-obsidian-950/95 to-emerald-950/90 backdrop-blur-xl p-5 rounded-2xl border border-champagne/80 shadow-2xl w-60 space-y-3">
                            <div className="flex justify-between items-center text-xs font-mono text-champagne">
                              <span className="font-bold">ROOTWILLS B2B</span>
                              <CreditCard className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[9px] font-mono text-cream/50 uppercase block">Approved Facility</span>
                              <div className="font-mono text-xl font-bold text-cream">£50,000.00</div>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-mono text-emerald-400 pt-1 border-t border-cream/10">
                              <span>30-DAY NET</span>
                              <span>06:00 AM SLA</span>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Scroll Prompt Bar */}
      <div className="absolute bottom-4 inset-x-6 sm:inset-x-12 z-40 flex items-center justify-between text-[11px] font-mono text-cream/50 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="text-champagne font-bold">SCROLL DOWN</span>
          <span>&bull; Camera moves in 3D space through 4 operational acts</span>
        </div>
        
        <div className="flex items-center gap-1.5 animate-bounce text-champagne">
          <span>Down to Continue</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>

    </section>
  );
}
