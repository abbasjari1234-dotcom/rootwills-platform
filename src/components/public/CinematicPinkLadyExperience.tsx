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
  UserCheck,
  Rotate3d,
  Activity,
  Layers,
  Zap
} from 'lucide-react';

interface ProduceItem {
  id: string;
  name: string;
  category: string;
  origin: string;
  flavorProfile: string;
  brix: string;
  firmness: string;
  tempSla: string;
  meshType: 'apple' | 'citrus' | 'tomato' | 'leaf';
  primaryColor: string;
  glowColor: string;
}

const HERO_PRODUCE: ProduceItem[] = [
  {
    id: 'apple',
    name: 'Class 1 Pink Lady® Apples',
    category: 'Orchard Fresh Produce',
    origin: 'Kent & European Sun Orchards',
    flavorProfile: 'Intense Crisp Sweetness, Effervescent Acidity',
    brix: '14.8° Brix (Max Sugar)',
    firmness: '8.8 kg/cm² Extra Crisp',
    tempSla: '+2.2°C Cold-Locked',
    meshType: 'apple',
    primaryColor: '#E11D48',
    glowColor: '#FB7185',
  },
  {
    id: 'citrus',
    name: 'Sicilian Tarocco Blood Oranges',
    category: 'Heritage Citrus Selection',
    origin: 'Mount Etna Volcanic Groves',
    flavorProfile: 'High Anthocyanin, Rich Crimson Juice',
    brix: '13.6° Brix',
    firmness: '9.2 kg/cm²',
    tempSla: '+3.5°C Chilled',
    meshType: 'citrus',
    primaryColor: '#EA580C',
    glowColor: '#FDBA74',
  },
  {
    id: 'tomato',
    name: 'San Marzano Vine Tomatoes',
    category: 'Gastronomy Vine Produce',
    origin: 'Campania Volcanic Soils',
    flavorProfile: 'Dense Flesh, Low Seed Cavity, Umami-Rich',
    brix: '11.4° Brix',
    firmness: '7.9 kg/cm²',
    tempSla: '+8.0°C Ambient Cell',
    meshType: 'tomato',
    primaryColor: '#DC2626',
    glowColor: '#F87171',
  },
];

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
  }
];

export function CinematicPinkLadyExperience() {
  const [selectedProduce, setSelectedProduce] = useState<ProduceItem>(HERO_PRODUCE[0]);
  const [mode, setMode] = useState<'360' | 'explode' | 'chill'>('360');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0.2, y: 0.4 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  // 3D Canvas Mesh Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let autoY = rotation.y;
    let autoX = rotation.x;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Generate 3D Organic Fruit Mesh
    const generateMesh = () => {
      const vertices: Array<[number, number, number]> = [];
      const rings = 14;
      const sectors = 18;
      const radius = 95;

      for (let r = 0; r <= rings; r++) {
        const theta = (r * Math.PI) / rings;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);

        for (let s = 0; s <= sectors; s++) {
          const phi = (s * 2 * Math.PI) / sectors;

          let fruitR = radius;
          if (selectedProduce.meshType === 'apple') {
            fruitR = radius * (1 - 0.16 * Math.cos(2 * theta));
          } else if (selectedProduce.meshType === 'citrus') {
            fruitR = radius * (1 + 0.04 * Math.sin(phi * 3));
          } else {
            fruitR = radius * (1 - 0.22 * Math.sin(theta));
          }

          const explodeOffset = mode === 'explode' ? (1 + 0.35 * Math.sin(phi * 2)) : 1;
          const finalR = fruitR * explodeOffset;

          const x = finalR * Math.cos(phi) * sinT;
          const y = finalR * cosT * 1.08;
          const z = finalR * Math.sin(phi) * sinT;

          vertices.push([x, y, z]);
        }
      }
      return vertices;
    };

    const vertices = generateMesh();

    // 3D Vapor / Dew Particles
    const vaporParticles: Array<{ x: number; y: number; z: number; vx: number; vy: number; vz: number; size: number }> = [];
    for (let i = 0; i < 40; i++) {
      vaporParticles.push({
        x: (Math.random() - 0.5) * 220,
        y: (Math.random() - 0.5) * 220,
        z: (Math.random() - 0.5) * 220,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.1,
        vz: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 1,
      });
    }

    const render = () => {
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      if (!isDragging) {
        autoY += 0.007;
        autoX = Math.sin(autoY * 0.4) * 0.12 + 0.15;
      } else {
        autoX = rotation.x;
        autoY = rotation.y;
      }

      const cosX = Math.cos(autoX);
      const sinX = Math.sin(autoX);
      const cosY = Math.cos(autoY);
      const sinY = Math.sin(autoY);
      const fov = 420;

      const project = (x: number, y: number, z: number) => {
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;
        const scale = fov / (fov + z2);
        return {
          x: cx + x1 * scale,
          y: cy + y1 * scale,
          z: z2,
          scale,
        };
      };

      // 1. Draw 3D Radial Glow
      const halo = ctx.createRadialGradient(cx, cy, 10, cx, cy, 170);
      halo.addColorStop(0, `${selectedProduce.glowColor}30`);
      halo.addColorStop(0.5, 'rgba(228, 199, 103, 0.1)');
      halo.addColorStop(1, 'transparent');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, 170, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw 3D Vapor Particles (Sub-Zero Mode)
      if (mode === 'chill') {
        vaporParticles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          if (p.y < -120) p.y = 120;

          const pt = project(p.x, p.y, p.z);
          if (pt.scale > 0) {
            ctx.fillStyle = '#00F59B';
            ctx.globalAlpha = 0.5 * pt.scale;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, p.size * pt.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        ctx.globalAlpha = 1;
      }

      // 3. Project 3D Mesh
      const proj = vertices.map(([x, y, z]) => project(x, y, z));

      // Draw Wireframe Ribs
      ctx.strokeStyle = `${selectedProduce.primaryColor}55`;
      ctx.lineWidth = 1.2;
      for (let i = 0; i < proj.length; i += 2) {
        if (i + 1 < proj.length) {
          ctx.beginPath();
          ctx.moveTo(proj[i].x, proj[i].y);
          ctx.lineTo(proj[i + 1].x, proj[i + 1].y);
          ctx.stroke();
        }
      }

      // 4. Draw Shaded Surface Nodes
      const sorted = [...proj].sort((a, b) => b.z - a.z);
      sorted.forEach((pt) => {
        if (pt.scale > 0) {
          const depthAlpha = Math.max(0.2, Math.min(1, (pt.z + 140) / 280));
          const rad = Math.max(1, 3.2 * pt.scale);

          const grad = ctx.createRadialGradient(pt.x - 1, pt.y - 1, 0, pt.x, pt.y, rad * 2);
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.35, selectedProduce.glowColor);
          grad.addColorStop(0.8, selectedProduce.primaryColor);
          grad.addColorStop(1, '#041A13');

          ctx.fillStyle = grad;
          ctx.globalAlpha = depthAlpha;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [selectedProduce, mode, isDragging, rotation]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    setRotation((r) => ({
      x: Math.max(-1.1, Math.min(1.1, r.x + dy * 0.01)),
      y: r.y + dx * 0.01,
    }));
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="w-full bg-obsidian-950 text-cream">
      
      {/* 1. MASTERPIECE 2-COLUMN HERO WITH INTERACTIVE 3D PRODUCE STAGE */}
      <section className="relative min-h-[92vh] w-full pt-10 sm:pt-16 pb-16 flex items-center overflow-hidden">
        
        {/* Ambient Radial Lights */}
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[500px] bg-emerald-500/15 rounded-full blur-[160px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[450px] bg-champagne/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Bold Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-900/90 border border-emerald-500/40 text-cream text-xs font-mono backdrop-blur-xl shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-300 font-bold">Farm-to-Kitchen Direct Supply &bull; Birmingham Hub</span>
                <span className="text-cream/30 hidden sm:inline">&bull;</span>
                <span className="text-champagne hidden sm:inline">11:00 PM Cut-off</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-cream uppercase leading-[1.02] drop-shadow-2xl">
                  WHY ROOTWILLS <br />
                  <span className="gold-gradient-text">IS SO SPECIAL</span>
                </h1>

                <p className="text-base sm:text-xl text-cream/85 font-sans max-w-2xl leading-relaxed">
                  We supply the finest fresh produce, orchard fruits, heritage vegetables, living herbs, and artisan dairy directly to hospitality professionals across the UK.
                </p>
              </div>

              {/* CTA Group */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/onboarding"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-sm shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all group"
                >
                  <span>Open a Trade Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="#story-start"
                  className="px-6 py-4 rounded-xl bg-obsidian-900/90 border border-emerald-500/40 hover:border-champagne text-cream text-sm font-semibold flex items-center gap-2 backdrop-blur-md transition-all"
                >
                  <span>Explore The Story &rarr;</span>
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-emerald-950/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="p-3 bg-obsidian-900/60 rounded-xl border border-emerald-950 font-mono text-xs">
                  <span className="text-champagne font-bold block uppercase">11:00 PM Cut-off</span>
                  <span className="text-cream/60 text-[10px]">Late evening ordering</span>
                </div>
                <div className="p-3 bg-obsidian-900/60 rounded-xl border border-emerald-950 font-mono text-xs">
                  <span className="text-emerald-400 font-bold block uppercase">06:00 AM SLA</span>
                  <span className="text-cream/60 text-[10px]">Early kitchen drop</span>
                </div>
                <div className="p-3 bg-obsidian-900/60 rounded-xl border border-emerald-950 font-mono text-xs">
                  <span className="text-champagne font-bold block uppercase">SALSA Certified</span>
                  <span className="text-cream/60 text-[10px]">Full batch provenance</span>
                </div>
                <div className="p-3 bg-obsidian-900/60 rounded-xl border border-emerald-950 font-mono text-xs">
                  <span className="text-emerald-400 font-bold block uppercase">£30,000 Facility</span>
                  <span className="text-cream/60 text-[10px]">30-Day trade terms</span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive 3D Produce Quality Stage */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl p-1 bg-gradient-to-b from-emerald-500/40 via-emerald-900/50 to-obsidian-950 border border-champagne/40 shadow-[0_20px_70px_rgba(2,23,16,0.9),0_0_40px_rgba(16,185,129,0.25)] overflow-hidden backdrop-blur-2xl">
                
                <div className="rounded-[22px] bg-obsidian-900/95 p-5 sm:p-6 space-y-4">
                  
                  {/* Produce Selector Tabs */}
                  <div className="flex gap-2">
                    {HERO_PRODUCE.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedProduce(p)}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-mono font-bold transition-all truncate ${
                          selectedProduce.id === p.id
                            ? 'bg-champagne text-obsidian-950 shadow-md'
                            : 'bg-obsidian-950 text-cream/70 hover:text-cream border border-emerald-950'
                        }`}
                      >
                        {p.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* 3D Canvas Box */}
                  <div
                    className="relative h-[280px] sm:h-[320px] w-full rounded-2xl bg-gradient-to-b from-obsidian-950 to-obsidian-900 border border-emerald-900/70 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing shadow-inner"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    <canvas ref={canvasRef} className="w-full h-full block touch-none" />

                    {/* Top Telemetry Overlay */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                      <div className="bg-obsidian-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-champagne/40 text-[11px] font-mono text-champagne font-bold flex items-center gap-1">
                        <Sun className="w-3.5 h-3.5 text-champagne" />
                        <span>{selectedProduce.brix}</span>
                      </div>

                      <div className="bg-obsidian-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-400/50 text-[11px] font-mono text-emerald-300 font-bold flex items-center gap-1">
                        <ThermometerSnowflake className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{selectedProduce.tempSla}</span>
                      </div>
                    </div>

                    {/* Bottom Rotation Instruction */}
                    <div className="absolute bottom-3 left-3 bg-obsidian-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-900/60 text-[10px] font-mono text-zinc-300 flex items-center gap-1.5 pointer-events-none">
                      <Rotate3d className="w-3.5 h-3.5 text-champagne animate-spin" />
                      <span>Drag to rotate in 360°</span>
                    </div>
                  </div>

                  {/* Inspection Mode Toggles */}
                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                    <button
                      type="button"
                      onClick={() => setMode('360')}
                      className={`p-2 rounded-xl border transition-all ${
                        mode === '360'
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold'
                          : 'bg-obsidian-950 border-emerald-950 text-cream/60 hover:text-cream'
                      }`}
                    >
                      360° Inspection
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('explode')}
                      className={`p-2 rounded-xl border transition-all ${
                        mode === 'explode'
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold'
                          : 'bg-obsidian-950 border-emerald-950 text-cream/60 hover:text-cream'
                      }`}
                    >
                      Cell Anatomy
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('chill')}
                      className={`p-2 rounded-xl border transition-all ${
                        mode === 'chill'
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold'
                          : 'bg-obsidian-950 border-emerald-950 text-cream/60 hover:text-cream'
                      }`}
                    >
                      Sub-Zero Mist
                    </button>
                  </div>

                </div>

              </div>
            </div>

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
