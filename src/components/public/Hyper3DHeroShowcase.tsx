'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Rotate3d, 
  ThermometerSnowflake, 
  Leaf, 
  ShieldCheck, 
  Activity, 
  Layers, 
  ArrowRight,
  Sun,
  Droplets,
  Zap,
  CheckCircle2,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import Link from 'next/link';

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

const FEATURED_PRODUCE: ProduceItem[] = [
  {
    id: 'apple',
    name: 'Class 1 Pink Lady® & Heritage Apples',
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
    name: 'San Marzano D.O.P. Vine Tomatoes',
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
  {
    id: 'micro',
    name: 'Living Hydroponic Micro-Coriander',
    category: 'Chef Living Herbs',
    origin: 'Worcestershire Indoor Agri-Hub',
    flavorProfile: 'Concentrated Essential Oils, Zero Soil Grit',
    brix: '98% Moisture Retention',
    firmness: 'Living Root Integrity',
    tempSla: '+4.0°C Hydro-Preserved',
    meshType: 'leaf',
    primaryColor: '#10B981',
    glowColor: '#34D399',
  },
];

export function Hyper3DHeroShowcase() {
  const [selectedProduce, setSelectedProduce] = useState<ProduceItem>(FEATURED_PRODUCE[0]);
  const [inspectionMode, setInspectionMode] = useState<'360' | 'xray' | 'freeze'>('360');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0.2, y: 0.4 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  // 3D Canvas Mesh Physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let autoRotY = rotation.y;
    let autoRotX = rotation.x;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Dynamic 3D Vertex Generator for Produce
    const generateMesh = () => {
      const pts: Array<[number, number, number]> = [];
      const latBands = inspectionMode === 'xray' ? 16 : 14;
      const lonBands = inspectionMode === 'xray' ? 22 : 18;
      const radius = 105;

      for (let lat = 0; lat <= latBands; lat++) {
        const theta = (lat * Math.PI) / latBands;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);

        // Organic apple top/bottom dimple shape
        const shapeMod = selectedProduce.meshType === 'apple'
          ? 1 - 0.16 * Math.cos(2 * theta)
          : selectedProduce.meshType === 'tomato'
          ? 1 - 0.1 * Math.cos(4 * theta)
          : 1;

        for (let lon = 0; lon <= lonBands; lon++) {
          const phi = (lon * 2 * Math.PI) / lonBands;
          const explodeOffset = inspectionMode === 'xray' ? (Math.sin(lat * 3) * 18 + 10) : 0;
          const r = radius * shapeMod + explodeOffset;

          const x = r * Math.cos(phi) * sinT;
          const y = r * cosT * (selectedProduce.meshType === 'apple' ? 1.08 : 0.95);
          const z = r * Math.sin(phi) * sinT;
          pts.push([x, y, z]);
        }
      }

      // Add Stem
      pts.push([0, -125, 0]);
      pts.push([8, -148, 12]);
      pts.push([28, -142, 22]); // Leaf tip

      return pts;
    };

    // 3D Ambient Dew/Freeze Particles
    const particles: Array<{ x: number; y: number; z: number; r: number; vy: number }> = [];
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 360,
        y: (Math.random() - 0.5) * 360,
        z: (Math.random() - 0.5) * 360,
        r: Math.random() * 2.5 + 1,
        vy: Math.random() * 0.4 + 0.1,
      });
    }

    const vertices = generateMesh();

    const render = () => {
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      if (!isDragging) {
        autoRotY += 0.007;
        autoRotX = Math.sin(autoRotY * 0.4) * 0.14 + 0.15;
      } else {
        autoRotX = rotation.x;
        autoRotY = rotation.y;
      }

      const cosX = Math.cos(autoRotX);
      const sinX = Math.sin(autoRotX);
      const cosY = Math.cos(autoRotY);
      const sinY = Math.sin(autoRotY);

      const fov = 480;

      // 1. Draw 3D Vapor/Particles
      particles.forEach((p) => {
        p.y -= p.vy * (inspectionMode === 'freeze' ? 1.8 : 0.8);
        if (p.y < -180) p.y = 180;

        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const scale = fov / (fov + z2);
        const px = cx + x1 * scale;
        const py = cy + y1 * scale;

        const depthAlpha = Math.max(0.1, Math.min(0.8, (z2 + 180) / 360));
        ctx.fillStyle = inspectionMode === 'freeze' ? `rgba(167, 243, 208, ${depthAlpha})` : `rgba(228, 199, 103, ${depthAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.r * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Project 3D Mesh
      const projected = vertices.map(([vx, vy, vz]) => {
        const x1 = vx * cosY - vz * sinY;
        const z1 = vz * cosY + vx * sinY;
        const y1 = vy * cosX - z1 * sinX;
        const z2 = z1 * cosX + vy * sinX;

        const scale = fov / (fov + z2);
        return {
          x: cx + x1 * scale,
          y: cy + y1 * scale,
          z: z2,
          scale,
        };
      });

      // 3. Draw 3D Structural Mesh Lines
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i += 2) {
        if (i + 1 < projected.length) {
          const p1 = projected[i];
          const p2 = projected[i + 1];
          const depthAlpha = Math.max(0.15, Math.min(0.65, (p1.z + 120) / 240));

          ctx.strokeStyle = inspectionMode === 'freeze'
            ? `rgba(52, 211, 153, ${depthAlpha * 0.45})`
            : `rgba(228, 199, 103, ${depthAlpha * 0.35})`;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // 4. Draw 3D Shaded Glowing Nodes
      const sorted = [...projected].sort((a, b) => b.z - a.z);
      sorted.forEach((pt) => {
        const depthAlpha = Math.max(0.2, Math.min(1, (pt.z + 140) / 280));
        const rad = Math.max(1, 2.8 * pt.scale);

        const nodeGrad = ctx.createRadialGradient(pt.x - 1, pt.y - 1, 0, pt.x, pt.y, rad * 2);
        nodeGrad.addColorStop(0, '#FFFFFF');
        nodeGrad.addColorStop(0.35, selectedProduce.glowColor);
        nodeGrad.addColorStop(1, selectedProduce.primaryColor);

        ctx.fillStyle = nodeGrad;
        ctx.globalAlpha = depthAlpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Ambient Glowing Core
      const core = ctx.createRadialGradient(cx, cy, 10, cx, cy, 210);
      core.addColorStop(0, `${selectedProduce.primaryColor}22`);
      core.addColorStop(1, 'transparent');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, 210, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [selectedProduce, inspectionMode, isDragging, rotation]);

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
    <div className="relative w-full max-w-7xl mx-auto my-10 sm:my-14 px-4 sm:px-6">
      
      {/* Outer Luxury 3D Stage Container */}
      <div className="relative rounded-[32px] p-1 bg-gradient-to-b from-emerald-500/50 via-emerald-800/40 to-emerald-950/90 border border-emerald-500/40 shadow-[0_30px_90px_rgba(2,23,16,0.9),0_0_60px_rgba(16,185,129,0.3)] backdrop-blur-2xl overflow-hidden">
        
        <div className="relative rounded-[28px] bg-gradient-to-b from-obsidian-900/95 via-obsidian-950/98 to-obsidian-950 p-6 sm:p-10 lg:p-12 overflow-hidden">
          
          {/* Top Control Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-emerald-900/60">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
              </span>
              <div className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Awwwards 3D Produce Engine &bull; Live Telemetry
              </div>
            </div>

            {/* 3D Mode Switcher */}
            <div className="flex items-center bg-obsidian-950/90 p-1 rounded-2xl border border-emerald-900/60 gap-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setInspectionMode('360')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  inspectionMode === '360'
                    ? 'bg-champagne text-obsidian-950 shadow-gold-glow'
                    : 'text-cream/70 hover:text-cream'
                }`}
              >
                360° Harvest
              </button>
              <button
                type="button"
                onClick={() => setInspectionMode('xray')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  inspectionMode === 'xray'
                    ? 'bg-champagne text-obsidian-950 shadow-gold-glow'
                    : 'text-cream/70 hover:text-cream'
                }`}
              >
                Exploded Anatomy
              </button>
              <button
                type="button"
                onClick={() => setInspectionMode('freeze')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  inspectionMode === 'freeze'
                    ? 'bg-emerald-400 text-obsidian-950 shadow-emerald-glow'
                    : 'text-cream/70 hover:text-cream'
                }`}
              >
                Sub-Zero Vapor
              </button>
            </div>
          </div>

          {/* Main 3D Display Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8">
            
            {/* Left: Dynamic Horticultural Specs */}
            <div className="lg:col-span-5 space-y-6 text-left order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProduce.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                    <Leaf className="w-3.5 h-3.5 text-champagne" />
                    <span>{selectedProduce.category}</span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-[1.1]">
                    {selectedProduce.name}
                  </h3>

                  <p className="text-sm font-mono text-champagne font-bold">
                    {selectedProduce.flavorProfile}
                  </p>

                  <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
                    Hand-harvested at peak maturity in <strong>{selectedProduce.origin}</strong>. Shipped with zero thermal compromise straight to Birmingham kitchens by 06:00 AM.
                  </p>

                  {/* 3D Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                    <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-emerald-900/60">
                      <span className="text-[10px] text-zinc-400 uppercase flex items-center gap-1">
                        <Sun className="w-3 h-3 text-champagne" /> Brix Refraction
                      </span>
                      <span className="text-base font-bold text-champagne mt-1 block">{selectedProduce.brix}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-emerald-900/60">
                      <span className="text-[10px] text-zinc-400 uppercase flex items-center gap-1">
                        <ThermometerSnowflake className="w-3 h-3 text-emerald-400" /> Cold-Chain
                      </span>
                      <span className="text-base font-bold text-emerald-400 mt-1 block">{selectedProduce.tempSla}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Produce Line Switcher Pills */}
              <div className="pt-2">
                <span className="text-[11px] uppercase font-mono text-cream/60 block mb-2 font-bold">
                  Select Harvested Produce Line:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {FEATURED_PRODUCE.map((p) => {
                    const isSelected = p.id === selectedProduce.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedProduce(p)}
                        className={`p-2.5 rounded-xl text-left border text-xs font-mono font-bold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-champagne text-obsidian-950 border-champagne shadow-gold-glow scale-102'
                            : 'bg-obsidian-950/80 text-cream/70 border-emerald-950 hover:border-emerald-700 hover:text-cream'
                        }`}
                      >
                        <span className="truncate">{p.name.split(' ')[2] || p.name.split(' ')[0]}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <Link
                  href="/onboarding"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all"
                >
                  <span>Order This Grade For Tomorrow</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="px-4 py-3 rounded-xl border border-emerald-900/60 bg-obsidian-950/60 hover:border-champagne text-cream text-xs font-mono flex items-center gap-1.5 transition-all"
                >
                  <span>Catalog</span>
                  <ChevronRight className="w-3.5 h-3.5 text-champagne" />
                </Link>
              </div>
            </div>

            {/* Right: Real Interactive 3D WebGL Canvas */}
            <div
              className="lg:col-span-7 relative h-80 sm:h-[420px] w-full rounded-3xl bg-gradient-to-b from-obsidian-950/80 to-obsidian-950 border border-emerald-900/80 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing order-1 lg:order-2 shadow-2xl"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full block touch-none"
                style={{ width: '100%', height: '100%' }}
              />

              {/* Floating Interaction Pill */}
              <div className="absolute bottom-4 left-4 bg-obsidian-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-900/60 text-[11px] font-mono text-zinc-300 flex items-center gap-2 pointer-events-none shadow-lg">
                <Rotate3d className="w-4 h-4 text-champagne animate-spin" />
                <span>Drag in 360° to inspect {selectedProduce.name.split(' ')[0]}</span>
              </div>

              {/* Live Sensor Badge */}
              <div className="absolute top-4 right-4 bg-obsidian-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 pointer-events-none shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Class 1 Spec Verified</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
