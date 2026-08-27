'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  ThermometerSnowflake, 
  Sun, 
  Truck, 
  ShieldCheck, 
  Rotate3d, 
  Activity, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Flame,
  Scale
} from 'lucide-react';
import Link from 'next/link';

interface ServiceDimension {
  id: string;
  step: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  stats: { label: string; value: string; color: string }[];
  deliverables: string[];
  ctaText: string;
  ctaHref: string;
  meshType: 'source' | 'coldchain' | 'butchery' | 'logistics' | 'finance';
  color: string;
  accentColor: string;
}

const SERVICE_DIMENSIONS: ServiceDimension[] = [
  {
    id: 'sourcing',
    step: '01',
    tag: 'Dimension 01: Precision Sourcing',
    title: 'Single-Estate Harvest & Farm-Gate Provenance',
    subtitle: 'Selected at optimum sugar refraction. Zero intermediate warehousing.',
    description: 'We partner directly with certified British growers and European single-estate orchards. Every crate of Pink Lady® apples, heirloom tomatoes, and living microgreens is harvested to order at peak cell turgor and flavor density.',
    stats: [
      { label: 'Sugar Refraction', value: '14.8° Brix', color: '#E4C767' },
      { label: 'Farm-to-Kitchen', value: '< 12 Hours', color: '#10B981' },
      { label: 'Grade Standard', value: 'Class 1 Extra', color: '#34D399' },
    ],
    deliverables: [
      'Daily morning harvest schedules',
      'Non-invasive infrared Brix testing',
      'Direct farm-gate cold loading',
      'Full BRCGS & Red Tractor batch traceability'
    ],
    ctaText: 'Explore Fresh Produce Directory',
    ctaHref: '/products?category=fresh_produce',
    meshType: 'source',
    color: '#E4C767',
    accentColor: '#FFF4D0',
  },
  {
    id: 'coldchain',
    step: '02',
    tag: 'Dimension 02: Cold-Chain Integrity',
    title: 'Continuous +2°C / -18°C Dual-Temp Control',
    subtitle: 'Precision refrigerated vehicle fleet with live GPS telemetry.',
    description: 'Thermal breaks destroy produce quality and meat yield. Our purpose-built logistics infrastructure maintains uninterrupted dual-temperature chambers from the depot loading dock to your kitchen coldroom.',
    stats: [
      { label: 'Chilled Vault Hold', value: '+2.2°C Stabilized', color: '#10B981' },
      { label: 'Sub-Zero Cell', value: '-18.5°C Frozen', color: '#38BDF8' },
      { label: 'Thermal Breaks', value: '0.00% Zero Defect', color: '#E4C767' },
    ],
    deliverables: [
      'Dual-inverter refrigerated vehicle fleet',
      'Continuous digital probe telematics',
      'Time-stamped temperature logs on delivery',
      'Strict allergen & HACCP segregation'
    ],
    ctaText: 'View Delivery Coverage & SLAs',
    ctaHref: '/delivery',
    meshType: 'coldchain',
    color: '#10B981',
    accentColor: '#34D399',
  },
  {
    id: 'dairy_botanicals',
    step: '03',
    tag: 'Dimension 03: Culinary Botanicals & Dairy',
    title: 'Living Hydroponic Microgreens & Farmhouse Dairy',
    subtitle: 'Nutrient-pad living herbs, French cultured butter sheets, and Lion-code farm eggs.',
    description: 'We supply the finest ingredients to professional commercial kitchens. Living microgreens and edible flowers delivered with root pads for peak aroma and 10-day longevity, alongside cultured pastry butter sheets and unpasteurised farmhouse dairy.',
    stats: [
      { label: 'Living Shelf Life', value: '10+ Days Active', color: '#10B981' },
      { label: 'Butterfat Purity', value: '84% Churned', color: '#E4C767' },
      { label: 'Substitutions', value: '0% Without Consent', color: '#34D399' },
    ],
    deliverables: [
      'Living root microgreens with zero soil grit',
      '84% butterfat French pastry laminating sheets',
      'Lion-code graded British free-range eggs',
      'Direct commercial account desk support'
    ],
    ctaText: 'Browse Living Botanicals & Dairy',
    ctaHref: '/products?category=dairy_eggs',
    meshType: 'source',
    color: '#E4C767',
    accentColor: '#F5E498',
  },
  {
    id: 'logistics',
    step: '04',
    tag: 'Dimension 04: Depot Fulfilment',
    title: 'Digbeth Central Hub & 06:00 AM Delivery SLA',
    subtitle: 'Late 11:00 PM order cut-off. In your kitchen before breakfast prep.',
    description: 'Order late after evening dinner service finishes. Our automated Digbeth fulfillment center consolidates, quality-checks, and routes your consignment for early morning keyholder delivery.',
    stats: [
      { label: 'Order Cut-off', value: '11:00 PM Nightly', color: '#E4C767' },
      { label: 'Early Delivery Drop', value: '06:00 AM – 07:30 AM', color: '#10B981' },
      { label: 'On-Time Accuracy', value: '99.8% Matrix', color: '#34D399' },
    ],
    deliverables: [
      'Late-night mobile & portal ordering',
      'Dedicated keyholder coldroom drop access',
      'Automated dispatch SMS & driver telemetry',
      '6-day morning delivery schedule'
    ],
    ctaText: 'Find Your Postcode Window',
    ctaHref: '/delivery',
    meshType: 'logistics',
    color: '#34D399',
    accentColor: '#10B981',
  },
  {
    id: 'finance',
    step: '05',
    tag: 'Dimension 05: Financial Technology',
    title: 'Enterprise 30-Day Trade Credit & Statement Engine',
    subtitle: 'Up to £30,000 credit facility with consolidated EDI invoicing.',
    description: 'Eliminate petty cash and pro-forma delays. Approved hospitality operators receive an instant 30-day paperless credit facility with itemized digital statements and 1-click repeat reordering.',
    stats: [
      { label: 'Approved Facility', value: 'Up to £30,000', color: '#10B981' },
      { label: 'Standard Terms', value: '30-Day Net', color: '#E4C767' },
      { label: 'Application Time', value: '2 Minutes Online', color: '#34D399' },
    ],
    deliverables: [
      'Instant digital underwriting & approval',
      'Locked contract trade pricing for core lines',
      'Consolidated multi-venue invoicing',
      'Automated PDF statements & VAT receipts'
    ],
    ctaText: 'Open Trade Account in 2 Mins',
    ctaHref: '/onboarding',
    meshType: 'finance',
    color: '#E4C767',
    accentColor: '#FFF4D0',
  },
];

export function ThreeDServiceEcosystem() {
  const [activeDim, setActiveDim] = useState<ServiceDimension>(SERVICE_DIMENSIONS[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0.25, y: 0.45 });
  const lastMouse = useRef({ x: 0, y: 0 });

  // 3D Scene Rendering Loop (Morphs per active dimension)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let autoY = rotation.y;
    let autoX = rotation.x;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Generate Dynamic 3D Geometric Mesh based on active dimension
    const generate3DMesh = () => {
      const vertices: Array<[number, number, number]> = [];

      if (activeDim.meshType === 'source') {
        // 3D Geodesic Orchard Fruit & Sun Energy Field
        const bands = 14;
        const radius = 100;
        for (let b = 0; b <= bands; b++) {
          const theta = (b * Math.PI) / bands;
          const sinT = Math.sin(theta);
          const cosT = Math.cos(theta);
          for (let s = 0; s <= 18; s++) {
            const phi = (s * 2 * Math.PI) / 18;
            const r = radius * (1 - 0.15 * Math.cos(2 * theta));
            vertices.push([
              r * Math.cos(phi) * sinT,
              r * cosT * 1.05,
              r * Math.sin(phi) * sinT
            ]);
          }
        }
      } else if (activeDim.meshType === 'coldchain') {
        // 3D Dual-Temp Refrigerated Chamber Cube & Thermal Shield
        const sz = 85;
        const corners = [
          [-sz, -sz, -sz], [sz, -sz, -sz], [sz, sz, -sz], [-sz, sz, -sz],
          [-sz, -sz, sz], [sz, -sz, sz], [sz, sz, sz], [-sz, sz, sz]
        ];
        corners.forEach((c) => vertices.push(c as [number, number, number]));
        // Inner divider
        vertices.push([0, -sz, -sz]);
        vertices.push([0, sz, -sz]);
        vertices.push([0, sz, sz]);
        vertices.push([0, -sz, sz]);
      } else if (activeDim.meshType === 'butchery') {
        // 3D Octagonal Primal Vault & Knife Angles
        const sz = 90;
        for (let i = 0; i < 8; i++) {
          const a = (i * Math.PI * 2) / 8;
          vertices.push([Math.cos(a) * sz, -sz * 0.6, Math.sin(a) * sz]);
          vertices.push([Math.cos(a) * (sz * 0.7), sz * 0.6, Math.sin(a) * (sz * 0.7)]);
        }
      } else if (activeDim.meshType === 'logistics') {
        // 3D Isometric Depot Fleet Route Matrix
        const sz = 95;
        for (let i = 0; i < 12; i++) {
          const a = (i * Math.PI * 2) / 12;
          vertices.push([Math.cos(a) * sz, Math.sin(i) * 30, Math.sin(a) * sz]);
        }
        vertices.push([0, -sz * 0.8, 0]); // Hub tower top
        vertices.push([0, sz * 0.8, 0]);  // Hub tower bottom
      } else {
        // 3D Digital Trade Facility Core (Diamond Crystal)
        const sz = 95;
        vertices.push([0, -sz * 1.1, 0]); // Top apex
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI * 2) / 6;
          vertices.push([Math.cos(a) * sz, 0, Math.sin(a) * sz]);
        }
        vertices.push([0, sz * 1.1, 0]); // Bottom apex
      }

      return vertices;
    };

    // 3D Ambient Particles
    const particles: Array<{ x: number; y: number; z: number; size: number }> = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 350,
        y: (Math.random() - 0.5) * 350,
        z: (Math.random() - 0.5) * 350,
        size: Math.random() * 2 + 1,
      });
    }

    const vertices = generate3DMesh();

    const render = () => {
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      if (!isDragging) {
        autoY += 0.007;
        autoX = Math.sin(autoY * 0.4) * 0.12 + 0.2;
      } else {
        autoX = rotation.x;
        autoY = rotation.y;
      }

      const cosX = Math.cos(autoX);
      const sinX = Math.sin(autoX);
      const cosY = Math.cos(autoY);
      const sinY = Math.sin(autoY);

      const fov = 450;

      // Project function
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

      // 1. Draw 3D Ambient Particles
      particles.forEach((p) => {
        const pt = project(p.x, p.y, p.z);
        if (pt.scale > 0) {
          const depthAlpha = Math.max(0.1, Math.min(0.8, (pt.z + 180) / 360));
          ctx.fillStyle = activeDim.color;
          ctx.globalAlpha = depthAlpha * 0.5;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * pt.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // 2. Project Vertices
      const projected = vertices.map(([x, y, z]) => project(x, y, z));

      // 3. Connect Lines
      ctx.strokeStyle = `${activeDim.color}55`;
      ctx.lineWidth = 1.2;
      for (let i = 0; i < projected.length; i += 2) {
        if (i + 1 < projected.length) {
          const p1 = projected[i];
          const p2 = projected[i + 1];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // 4. Draw Shaded Nodes
      const sorted = [...projected].sort((a, b) => b.z - a.z);
      sorted.forEach((pt) => {
        const depthAlpha = Math.max(0.2, Math.min(1, (pt.z + 140) / 280));
        const rad = Math.max(1, 3 * pt.scale);

        const grad = ctx.createRadialGradient(pt.x - 1, pt.y - 1, 0, pt.x, pt.y, rad * 2);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.4, activeDim.accentColor);
        grad.addColorStop(1, activeDim.color);

        ctx.fillStyle = grad;
        ctx.globalAlpha = depthAlpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Core illumination
      const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 200);
      glow.addColorStop(0, `${activeDim.color}20`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 200, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeDim, isDragging, rotation]);

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
    <section id="service-ecosystem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24 sm:my-32">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase">
          <Layers className="w-3.5 h-3.5 text-champagne" />
          <span>The Connected 3D Service Ecosystem</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-cream uppercase leading-[1.05]">
          What We Do &bull; <span className="gold-gradient-text">Five Dimensions</span>
        </h2>
        <p className="text-sm sm:text-base text-cream/75 leading-relaxed font-sans">
          Step into our integrated cold-chain wholesale ecosystem. Every dimension is engineered to deliver unmatched consistency, speed, and profitability to UK kitchens.
        </p>
      </div>

      {/* 5-Dimension Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {SERVICE_DIMENSIONS.map((dim) => {
          const isSelected = dim.id === activeDim.id;
          return (
            <button
              key={dim.id}
              type="button"
              onClick={() => setActiveDim(dim)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 shadow-gold-glow scale-105'
                  : 'bg-obsidian-900/90 text-cream/70 border border-emerald-900/60 hover:text-cream hover:border-emerald-700'
              }`}
            >
              <span className="opacity-60">{dim.step}</span>
              <span>{dim.title.split(' ')[0]}</span>
              {isSelected && <Sparkles className="w-3.5 h-3.5" />}
            </button>
          );
        })}
      </div>

      {/* Main 3D Spatial Storytelling Stage */}
      <div className="relative rounded-[32px] p-1 bg-gradient-to-b from-emerald-500/40 via-emerald-900/60 to-obsidian-950 border border-emerald-500/30 shadow-[0_30px_90px_rgba(2,23,16,0.9),0_0_50px_rgba(16,185,129,0.25)] overflow-hidden backdrop-blur-2xl">
        
        <div className="relative rounded-[28px] bg-gradient-to-b from-obsidian-900/95 via-obsidian-950 to-obsidian-950 p-6 sm:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Dynamic 3D Spatial Description */}
            <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDim.id}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 25 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                      {activeDim.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-cream leading-[1.08]">
                    {activeDim.title}
                  </h3>

                  <p className="text-sm sm:text-base font-mono text-champagne font-bold">
                    {activeDim.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-cream/75 font-sans leading-relaxed">
                    {activeDim.description}
                  </p>

                  {/* 3 Live Telemetry Stat Badges */}
                  <div className="grid grid-cols-3 gap-2.5 pt-2">
                    {activeDim.stats.map((stat, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-2xl bg-obsidian-950/90 border border-emerald-900/60 text-center"
                      >
                        <span className="text-[10px] uppercase font-mono text-zinc-400 block">{stat.label}</span>
                        <span className="font-mono font-bold text-sm sm:text-base mt-1 block" style={{ color: stat.color }}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Feature Checkpoints */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {activeDim.deliverables.map((del, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-2.5 rounded-xl bg-obsidian-950/80 border border-emerald-950 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-xs text-cream/80 font-mono truncate">{del}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Action */}
                  <div className="pt-3">
                    <Link
                      href={activeDim.ctaHref}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all"
                    >
                      <span>{activeDim.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Live Interactive 3D Spatial Canvas */}
            <div
              className="lg:col-span-6 relative h-80 sm:h-[440px] w-full rounded-3xl bg-gradient-to-b from-obsidian-950/90 to-obsidian-950 border border-emerald-900/80 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing order-1 lg:order-2 shadow-2xl"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <canvas ref={canvasRef} className="w-full h-full block touch-none" />

              {/* 3D Drag HUD */}
              <div className="absolute bottom-4 left-4 bg-obsidian-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-900/60 text-[11px] font-mono text-zinc-300 flex items-center gap-2 pointer-events-none shadow-lg">
                <Rotate3d className="w-4 h-4 text-champagne animate-spin" />
                <span>Drag to rotate {activeDim.title.split(' ')[0]} geometry</span>
              </div>

              {/* Dimension Number Badge */}
              <div className="absolute top-4 right-4 bg-obsidian-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 text-[11px] font-mono text-emerald-400 font-bold pointer-events-none shadow-lg">
                DIMENSION {activeDim.step} / 05
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
