'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { 
  Truck, 
  Package, 
  CheckCircle2, 
  ArrowRight, 
  ThermometerSnowflake, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Activity,
  Layers,
  Zap,
  RotateCcw
} from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap-core';
import { useGsapContext } from '@/lib/animations/useGsapContext';

interface CargoItem {
  id: string;
  name: string;
  category: string;
  temp: string;
  weight: string;
  origin: string;
  color: string;
}

const CARGO_CRATES: CargoItem[] = [
  {
    id: 'crate-1',
    name: 'Kent Pink Lady® Apples (Class 1)',
    category: 'Heritage Orchard',
    temp: '+2.2°C',
    weight: '180 kg',
    origin: 'Kent Sun Orchards',
    color: '#FF4D6D',
  },
  {
    id: 'crate-2',
    name: 'Living Hydroponic Microgreens',
    category: 'Culinary Trays',
    temp: '+3.5°C',
    weight: '45 kg',
    origin: 'Midlands Vertical Hydro',
    color: '#10B981',
  },
  {
    id: 'crate-3',
    name: 'Farmhouse Cultured Pastry Butter',
    category: 'Artisan Dairy',
    temp: '+2.0°C',
    weight: '120 kg',
    origin: 'West Country Creamery',
    color: '#E4C767',
  },
];

export function InteractiveLogisticsHub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState<'dispatch' | 'loading' | 'departure'>('dispatch');

  useGsapContext(containerRef, (ctx) => {
    if (!triggerRef.current) return;

    try {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top+=60',
          end: '+=250%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(Math.round(p * 100));
            if (p < 0.35) {
              setActiveStage('dispatch');
            } else if (p < 0.75) {
              setActiveStage('loading');
            } else {
              setActiveStage('departure');
            }
          },
        },
      });

      // =========================================================================
      // STAGE 1: TRUCK DRIVES FROM LEFT INTO WAREHOUSE DISPATCH BAY
      // =========================================================================
      tl.fromTo(
        '.logistics-truck-group',
        { xPercent: -120, opacity: 0.6 },
        { xPercent: 0, opacity: 1, duration: 2, ease: 'power2.out' },
        0
      );

      // Rotating Wheels
      tl.to(
        '.truck-wheel',
        { rotation: 720, transformOrigin: 'center center', duration: 2, ease: 'none' },
        0
      );

      // Warehouse Headlight beam fade-in
      tl.fromTo(
        '.truck-headlight-beam',
        { opacity: 0, scaleX: 0.3 },
        { opacity: 0.8, scaleX: 1, duration: 1.2, ease: 'power1.inOut' },
        1
      );

      // =========================================================================
      // STAGE 2: CRANE GANTRY LOWERS FROM OVERHEAD
      // =========================================================================
      // Crane horizontal positioning over truck bed
      tl.fromTo(
        '.crane-gantry-system',
        { yPercent: -80, opacity: 0.4 },
        { yPercent: 0, opacity: 1, duration: 1.5, ease: 'power2.inOut' },
        1.5
      );

      // Hydraulic Crane Cable extending down
      tl.fromTo(
        '.crane-cables',
        { scaleY: 0.2, transformOrigin: 'top center' },
        { scaleY: 1, duration: 1.2, ease: 'power1.out' },
        2.2
      );

      // Crane Clamps activating / glowing
      tl.fromTo(
        '.crane-gripper',
        { y: -30, opacity: 0.5 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
        2.2
      );

      // =========================================================================
      // STAGE 3: FOOD CRATES DROP & STACK INTO TRUCK CARGO BED
      // =========================================================================
      // Crate 1 (Pink Lady Apples)
      tl.fromTo(
        '#crate-item-1',
        { y: -120, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'bounce.out' },
        3
      );

      // Crate 2 (Microgreens)
      tl.fromTo(
        '#crate-item-2',
        { y: -140, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'bounce.out' },
        3.6
      );

      // Crate 3 (Artisan Dairy)
      tl.fromTo(
        '#crate-item-3',
        { y: -160, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'bounce.out' },
        4.2
      );

      // Retract Crane Gantry after loading
      tl.to(
        '.crane-gripper, .crane-cables',
        { y: -60, opacity: 0.3, duration: 1, ease: 'power2.in' },
        5
      );

      // Telemetry badge lock-in
      tl.fromTo(
        '.cargo-locked-badge',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' },
        5.2
      );

      // =========================================================================
      // STAGE 4: LOADED VEHICLE DEPARTS TOWARDS UK DESTINATIONS
      // =========================================================================
      tl.to(
        '.logistics-truck-group',
        { xPercent: 125, opacity: 0.8, duration: 2, ease: 'power2.in' },
        6
      );

      tl.to(
        '.truck-wheel',
        { rotation: '+=720', transformOrigin: 'center center', duration: 2, ease: 'none' },
        6
      );

      // Background Depot Lights pulse
      tl.fromTo(
        '.depot-exit-light',
        { opacity: 0.3 },
        { opacity: 1, repeat: 3, yoyo: true, duration: 0.4 },
        6.2
      );

    } catch (e) {
      console.warn('Logistics Hub ScrollTrigger init fallback:', e);
    }
  });

  return (
    <section ref={containerRef} className="relative w-full py-16 bg-obsidian-950 border-t border-emerald-900/50 overflow-hidden z-10">
      
      {/* Background Volumetric Lighting & Laser Guides */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08)_0%,rgba(2,23,16,0)_70%)] pointer-events-none -z-10" />

      {/* Main Pinned Animation Viewport */}
      <div ref={triggerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Live Operational Telemetry Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-6 border-b border-emerald-950/80">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Birmingham Digbeth Central Hub &bull; Automated Cold-Chain Loading</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-cream uppercase leading-tight">
              Direct-to-Kitchen <span className="gold-gradient-text">Logistics Engine</span>
            </h2>
            <p className="text-xs sm:text-sm text-cream/75 font-sans leading-relaxed">
              Scroll down to watch our automated depot sequence: precision crane loading of dual-temp fresh crates into the morning 06:00 AM delivery fleet.
            </p>
          </div>

          {/* Real-Time Telemetry HUD */}
          <div className="bg-obsidian-900/90 p-3.5 rounded-2xl border border-emerald-900/80 font-mono text-xs space-y-2 min-w-[260px] shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between text-[11px] text-cream/60">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-champagne" />
                <span>Simulated Loading Telemetry</span>
              </span>
              <span className="text-champagne font-bold">{scrollProgress}%</span>
            </div>

            <div className="w-full bg-emerald-950 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-400 via-champagne to-champagne-light h-full rounded-full transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] pt-1 text-cream/80">
              <span className={`px-2 py-0.5 rounded-md ${activeStage === 'dispatch' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-cream/40'}`}>
                1. Dock In
              </span>
              <span className={`px-2 py-0.5 rounded-md ${activeStage === 'loading' ? 'bg-champagne/20 text-champagne border border-champagne/40' : 'text-cream/40'}`}>
                2. Crane Load
              </span>
              <span className={`px-2 py-0.5 rounded-md ${activeStage === 'departure' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-cream/40'}`}>
                3. Dispatch
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE VECTOR SIMULATION STAGE */}
        {/* ========================================================================= */}
        <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[500px] rounded-3xl bg-gradient-to-b from-[#021d15] via-obsidian-950 to-[#01140e] border border-emerald-800/40 shadow-2xl overflow-hidden p-4 sm:p-8 flex flex-col justify-between">
          
          {/* Warehouse Overhead Gantry & Track Grid */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Structural Ceiling Girders */}
            <div className="absolute top-0 inset-x-0 h-10 bg-repeat-x opacity-40 border-b border-emerald-900/60" 
                 style={{ backgroundImage: 'linear-gradient(90deg, #0b3d2e 1px, transparent 1px), linear-gradient(0deg, #0b3d2e 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            {/* Overhead Laser Alignment Guide Lines */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-full border-x border-dashed border-emerald-500/20 pointer-events-none" />
          </div>

          {/* Overhead Crane Gantry Structure (GSAP Animated) */}
          <div className="crane-gantry-system absolute top-4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[380px] z-20 flex flex-col items-center pointer-events-none">
            {/* Motorized Gantry Carriage */}
            <div className="w-full h-8 bg-zinc-900 border border-champagne/40 rounded-lg flex items-center justify-between px-3 shadow-lg">
              <span className="text-[9px] font-mono uppercase text-champagne font-bold tracking-widest flex items-center gap-1">
                <Zap className="w-3 h-3 text-champagne" />
                <span>Automated Gantry Clamp A-04</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Telescopic Hydraulic Cables */}
            <div className="crane-cables w-12 h-28 sm:h-36 flex justify-between px-2">
              <div className="w-1 h-full bg-gradient-to-b from-champagne via-emerald-400 to-zinc-400" />
              <div className="w-1 h-full bg-gradient-to-b from-champagne via-emerald-400 to-zinc-400" />
            </div>

            {/* Precision Hydraulic Gripper / Pallet Fork */}
            <div className="crane-gripper w-48 sm:w-56 h-7 bg-emerald-950/95 border-2 border-champagne rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(228,199,103,0.4)]">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-champagne animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-champagne uppercase tracking-wider">
                Precision Cold-Locked Gripper
              </span>
            </div>
          </div>

          {/* Status Indicator Badges Floating Above Truck */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-obsidian-900/90 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 shadow-md flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>Dock 04 &bull; Digbeth Hub B5 5JR</span>
              </span>
            </div>

            <div className="cargo-locked-badge opacity-0 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Payload Locked: +2.2°C Cold-Chain SLA</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* VEHICLE & CRATE ASSEMBLY CONTAINER (GSAP DRIVEN) */}
          {/* ========================================================================= */}
          <div className="relative w-full h-[220px] sm:h-[260px] flex items-end justify-center">
            
            {/* The Rootwills Mercedes Sprinter Vehicle Group */}
            <div className="logistics-truck-group relative w-[320px] sm:w-[460px] lg:w-[540px] h-[180px] sm:h-[220px] flex items-end">
              
              {/* SVG High-Precision Refrigerated Delivery Vehicle */}
              <svg viewBox="0 0 540 220" className="w-full h-full drop-shadow-2xl">
                <defs>
                  {/* Truck Body Luxury Emerald Gradient */}
                  <linearGradient id="truckBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#062D21" />
                    <stop offset="60%" stopColor="#021710" />
                    <stop offset="100%" stopColor="#010d09" />
                  </linearGradient>

                  {/* Gold Trim Gradient */}
                  <linearGradient id="goldTrimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E4C767" />
                    <stop offset="50%" stopColor="#FFF4D0" />
                    <stop offset="100%" stopColor="#C9A227" />
                  </linearGradient>

                  {/* Headlight Cone Gradient */}
                  <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 244, 208, 0.8)" />
                    <stop offset="60%" stopColor="rgba(228, 199, 103, 0.2)" />
                    <stop offset="100%" stopColor="rgba(228, 199, 103, 0)" />
                  </linearGradient>
                </defs>

                {/* Headlight Forward Illumination Beam */}
                <polygon 
                  points="510,135 680,90 680,180 510,150" 
                  fill="url(#headlightBeam)" 
                  className="truck-headlight-beam opacity-0"
                />

                {/* Main Refrigerated Cargo Box (Rear) */}
                <rect x="20" y="25" width="310" height="135" rx="12" fill="url(#truckBodyGrad)" stroke="#0E4A37" strokeWidth="2.5" />
                
                {/* Cold-Chain Vault Door Seams & Temperature Telematics Badge */}
                <line x1="20" y1="92" x2="330" y2="92" stroke="#0E4A37" strokeWidth="1.5" strokeDasharray="4 4" />
                <rect x="35" y="38" width="130" height="42" rx="6" fill="#01130D" stroke="#E4C767" strokeWidth="1" />
                <text x="45" y="55" fill="#E4C767" fontSize="10" fontFamily="monospace" fontWeight="bold">ROOTWILLS COLD-CHAIN</text>
                <text x="45" y="70" fill="#10B981" fontSize="9" fontFamily="monospace">+2.2°C CALIBRATED HOLD</text>

                {/* Gold Crest Accent Stripe */}
                <rect x="20" y="145" width="310" height="6" fill="url(#goldTrimGrad)" />

                {/* Driver Cabin (Front) */}
                <path d="M330,55 L420,55 L475,105 L510,125 L510,160 L330,160 Z" fill="url(#truckBodyGrad)" stroke="#0E4A37" strokeWidth="2" />
                
                {/* Cabin Windshield */}
                <path d="M420,62 L468,105 L415,105 L415,62 Z" fill="#0F3D2E" stroke="#10B981" strokeWidth="1" opacity="0.8" />
                
                {/* Driver Side Window */}
                <rect x="345" y="62" width="60" height="43" rx="4" fill="#0F3D2E" stroke="#10B981" strokeWidth="1" opacity="0.8" />

                {/* Headlight Lamp */}
                <circle cx="505" cy="140" r="7" fill="#FFF4D0" />
                <circle cx="505" cy="140" r="4" fill="#E4C767" />

                {/* Mercedes/Rootwills Front Grille */}
                <rect x="495" y="148" width="15" height="12" rx="2" fill="#010e09" stroke="#E4C767" strokeWidth="1" />

                {/* Undercarriage Chassis Bar */}
                <rect x="10" y="160" width="500" height="10" fill="#0a0a0c" />

                {/* Front Wheel Assembly (GSAP Rotation) */}
                <g className="truck-wheel" transform="translate(440, 175)">
                  <circle cx="0" cy="0" r="26" fill="#18181b" stroke="#3f3f46" strokeWidth="3" />
                  <circle cx="0" cy="0" r="16" fill="#27272a" />
                  <circle cx="0" cy="0" r="7" fill="url(#goldTrimGrad)" />
                  <line x1="-16" y1="0" x2="16" y2="0" stroke="#71717a" strokeWidth="2" />
                  <line x1="0" y1="-16" x2="0" y2="16" stroke="#71717a" strokeWidth="2" />
                </g>

                {/* Rear Tandem Wheels (GSAP Rotation) */}
                <g className="truck-wheel" transform="translate(80, 175)">
                  <circle cx="0" cy="0" r="26" fill="#18181b" stroke="#3f3f46" strokeWidth="3" />
                  <circle cx="0" cy="0" r="16" fill="#27272a" />
                  <circle cx="0" cy="0" r="7" fill="url(#goldTrimGrad)" />
                  <line x1="-16" y1="0" x2="16" y2="0" stroke="#71717a" strokeWidth="2" />
                  <line x1="0" y1="-16" x2="0" y2="16" stroke="#71717a" strokeWidth="2" />
                </g>

                <g className="truck-wheel" transform="translate(145, 175)">
                  <circle cx="0" cy="0" r="26" fill="#18181b" stroke="#3f3f46" strokeWidth="3" />
                  <circle cx="0" cy="0" r="16" fill="#27272a" />
                  <circle cx="0" cy="0" r="7" fill="url(#goldTrimGrad)" />
                  <line x1="-16" y1="0" x2="16" y2="0" stroke="#71717a" strokeWidth="2" />
                  <line x1="0" y1="-16" x2="0" y2="16" stroke="#71717a" strokeWidth="2" />
                </g>
              </svg>

              {/* Dynamic Dropping Cargo Crates (Stacked in Truck Bed) */}
              <div className="absolute top-[28px] left-[32px] sm:left-[45px] w-[180px] sm:w-[220px] h-[95px] flex flex-col justify-end gap-1.5 z-10 pointer-events-none">
                
                {/* Crate 3 (Top): Artisan Dairy */}
                <div 
                  id="crate-item-3" 
                  className="w-full p-1.5 rounded-lg bg-obsidian-900/90 border border-champagne/60 shadow-lg flex items-center justify-between text-[10px] font-mono text-champagne"
                >
                  <span className="font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                    <span>03 &bull; Pastry Butter</span>
                  </span>
                  <span className="text-[9px] text-cream/70">+2.0°C</span>
                </div>

                {/* Crate 2 (Middle): Microgreens */}
                <div 
                  id="crate-item-2" 
                  className="w-full p-1.5 rounded-lg bg-obsidian-900/90 border border-emerald-500/60 shadow-lg flex items-center justify-between text-[10px] font-mono text-emerald-300"
                >
                  <span className="font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>02 &bull; Living Microgreens</span>
                  </span>
                  <span className="text-[9px] text-cream/70">+3.5°C</span>
                </div>

                {/* Crate 1 (Bottom): Pink Lady Apples */}
                <div 
                  id="crate-item-1" 
                  className="w-full p-1.5 rounded-lg bg-obsidian-900/90 border border-rose-500/60 shadow-lg flex items-center justify-between text-[10px] font-mono text-rose-300"
                >
                  <span className="font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>01 &bull; Pink Lady® Apples</span>
                  </span>
                  <span className="text-[9px] text-cream/70">+2.2°C</span>
                </div>

              </div>

            </div>

          </div>

          {/* Warehouse Floor Tarmac & Markings */}
          <div className="relative w-full pt-2 border-t-2 border-emerald-800/80 flex items-center justify-between text-[10px] font-mono text-cream/60">
            <div className="flex items-center gap-2">
              <span className="depot-exit-light w-2 h-2 rounded-full bg-emerald-400" />
              <span>Bay 04 Cold-Chain Staging Line</span>
            </div>
            <span>UK Logistics SLA &bull; 06:00 AM Guaranteed Kitchen Drops</span>
          </div>

        </div>

        {/* Dynamic Crate Breakdown Grid Underneath */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          {CARGO_CRATES.map((crate, idx) => (
            <div 
              key={crate.id}
              className="p-4 rounded-2xl bg-obsidian-900/80 border border-emerald-900/60 hover:border-champagne/40 transition-all shadow-md space-y-2 font-mono"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-cream/50">Pallet 0{idx + 1}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  {crate.temp} SLA
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-cream font-sans">
                {crate.name}
              </h3>
              <div className="flex items-center justify-between text-[11px] text-cream/70 pt-1 border-t border-emerald-950">
                <span>Origin: {crate.origin}</span>
                <span className="text-champagne font-bold">{crate.weight}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
