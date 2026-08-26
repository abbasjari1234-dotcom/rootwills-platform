'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Rotate3d, 
  ThermometerSnowflake, 
  Leaf, 
  Award, 
  Layers, 
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface ProduceItem {
  id: 'apple' | 'citrus' | 'crate';
  name: string;
  subname: string;
  tag: string;
  color: string;
  accentColor: string;
  brix: string;
  firmness: string;
  temp: string;
  origin: string;
}

const PRODUCE_ITEMS: ProduceItem[] = [
  {
    id: 'apple',
    name: 'Class 1 Pink Lady® Apple',
    subname: 'Crisp, High-Sugar Orchard Harvest',
    tag: 'BRCGS Grade A • Orchard Selected',
    color: '#E11D48',
    accentColor: '#FB7185',
    brix: '14.5° Brix',
    firmness: '8.6 kg/cm²',
    temp: '+2.4°C Chilled',
    origin: 'Kent & European Orchards',
  },
  {
    id: 'citrus',
    name: 'Sicilian Blood Orange',
    subname: 'Anthocyanin-Rich Heritage Citrus',
    tag: 'Class 1 • High Juice Yield',
    color: '#EA580C',
    accentColor: '#FDBA74',
    brix: '13.2° Brix',
    firmness: '9.1 kg/cm²',
    temp: '+3.1°C Chilled',
    origin: 'Mount Etna Volcanic Groves',
  },
  {
    id: 'crate',
    name: 'Dual-Temp Wholesale Crate',
    subname: 'Zero Thermal Break Delivery Unit',
    tag: 'GPS Telematics • Keyholder Safe',
    color: '#10B981',
    accentColor: '#E4C767',
    brix: 'N/A Logistics',
    firmness: '100% Crate Lock',
    temp: '+2.0°C / -18.0°C',
    origin: 'Birmingham Digbeth Depot',
  },
];

export function WebGLProduceExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedProduce, setSelectedProduce] = useState<ProduceItem>(PRODUCE_ITEMS[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0.2, y: 0.4 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  // 3D Geometry Points Generator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let autoRotY = rotation.y;
    let autoRotX = rotation.x;

    // Handle HiDPI screens
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Generate 3D Vertices based on selected produce type
    const generateMesh = (type: string) => {
      const vertices: Array<[number, number, number]> = [];
      const edges: Array<[number, number]> = [];

      if (type === 'apple' || type === 'citrus') {
        // 3D Geodesic Latitude/Longitude Sphere for Fruit
        const latBands = 14;
        const lonBands = 18;
        const radius = 95;

        for (let lat = 0; lat <= latBands; lat++) {
          const theta = (lat * Math.PI) / latBands;
          const sinTheta = Math.sin(theta);
          const cosTheta = Math.cos(theta);

          // Organic fruit dimple shape distortion
          const dimple = type === 'apple' ? 1 - 0.15 * Math.cos(2 * theta) : 1;

          for (let lon = 0; lon <= lonBands; lon++) {
            const phi = (lon * 2 * Math.PI) / lonBands;
            const x = radius * dimple * Math.cos(phi) * sinTheta;
            const y = radius * dimple * cosTheta * (type === 'apple' ? 1.08 : 1);
            const z = radius * dimple * Math.sin(phi) * sinTheta;
            vertices.push([x, y, z]);
          }
        }

        // Stem & Leaf vertices
        if (type === 'apple') {
          vertices.push([0, -115, 0]); // Stem base
          vertices.push([6, -135, 10]); // Stem tip
          vertices.push([25, -130, 20]); // Leaf tip
          vertices.push([12, -122, 12]); // Leaf side
        }
      } else {
        // 3D Delivery Crate Cube with internal slats
        const size = 85;
        const corners = [
          [-size, -size, -size],
          [size, -size, -size],
          [size, size, -size],
          [-size, size, -size],
          [-size, -size, size],
          [size, -size, size],
          [size, size, size],
          [-size, size, size],
        ];
        corners.forEach((c) => vertices.push(c as [number, number, number]));

        // Inner shelf slats
        vertices.push([-size, 0, -size]);
        vertices.push([size, 0, -size]);
        vertices.push([size, 0, size]);
        vertices.push([-size, 0, size]);
      }

      return vertices;
    };

    // 3D Ambient Dust Particles
    const particles: Array<{ x: number; y: number; z: number; size: number; speed: number }> = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 320,
        y: (Math.random() - 0.5) * 320,
        z: (Math.random() - 0.5) * 320,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    const vertices = generateMesh(selectedProduce.id);

    // Main 3D Render Loop
    const render = () => {
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Auto subtle rotation when not dragging
      if (!isDragging) {
        autoRotY += 0.008;
        autoRotX = Math.sin(autoRotY * 0.5) * 0.15 + 0.1;
      } else {
        autoRotX = rotation.x;
        autoRotY = rotation.y;
      }

      const cosX = Math.cos(autoRotX);
      const sinX = Math.sin(autoRotX);
      const cosY = Math.cos(autoRotY);
      const sinY = Math.sin(autoRotY);

      // 1. Draw 3D Ambient Dew Particles
      particles.forEach((p) => {
        p.y += Math.sin(autoRotY + p.x) * 0.2;
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const fov = 400;
        const scale = fov / (fov + z2);
        const px = cx + x1 * scale;
        const py = cy + y1 * scale;

        const alpha = Math.max(0.1, Math.min(0.8, (z2 + 150) / 300));
        ctx.fillStyle = selectedProduce.id === 'apple' ? `rgba(251, 113, 133, ${alpha})` : `rgba(228, 199, 103, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Project 3D Vertices to 2D
      const projected = vertices.map(([vx, vy, vz]) => {
        // Rotate Y
        const x1 = vx * cosY - vz * sinY;
        const z1 = vz * cosY + vx * sinY;
        // Rotate X
        const y1 = vy * cosX - z1 * sinX;
        const z2 = z1 * cosX + vy * sinX;

        // Perspective projection
        const fov = 450;
        const scale = fov / (fov + z2);
        return {
          x: cx + x1 * scale,
          y: cy + y1 * scale,
          z: z2,
          scale,
        };
      });

      // Sort by depth (Z-buffer sorting)
      const sortedPoints = [...projected].sort((a, b) => b.z - a.z);

      // 3. Render Shaded 3D Points & Connection Web
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i += 2) {
        const p1 = projected[i];
        if (i + 1 < projected.length) {
          const p2 = projected[i + 1];
          const depthAlpha = Math.max(0.15, Math.min(0.7, (p1.z + 100) / 200));

          ctx.strokeStyle = selectedProduce.id === 'apple'
            ? `rgba(225, 29, 72, ${depthAlpha * 0.4})`
            : selectedProduce.id === 'citrus'
            ? `rgba(234, 88, 12, ${depthAlpha * 0.4})`
            : `rgba(16, 185, 129, ${depthAlpha * 0.4})`;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Draw shiny nodes
      sortedPoints.forEach((pt, index) => {
        const depthAlpha = Math.max(0.2, Math.min(1, (pt.z + 120) / 240));
        const radius = Math.max(1, 2.5 * pt.scale);

        // Gradient node fill for 3D specular sheen
        const grad = ctx.createRadialGradient(pt.x - 1, pt.y - 1, 0, pt.x, pt.y, radius * 2);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.4, selectedProduce.accentColor);
        grad.addColorStop(1, selectedProduce.color);

        ctx.fillStyle = grad;
        ctx.globalAlpha = depthAlpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Central Ambient Light Core
      const coreGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 180);
      coreGrad.addColorStop(0, selectedProduce.id === 'apple' ? 'rgba(225, 29, 72, 0.18)' : selectedProduce.id === 'citrus' ? 'rgba(234, 88, 12, 0.18)' : 'rgba(16, 185, 129, 0.18)');
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedProduce, isDragging, rotation]);

  // Mouse Drag Interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    setRotation((prev) => ({
      x: Math.max(-1.2, Math.min(1.2, prev.x + deltaY * 0.01)),
      y: prev.y + deltaX * 0.01,
    }));

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto my-8 sm:my-12">
      
      {/* 3D Showcase Frame with Glassmorphism & Gold/Emerald Accents */}
      <div className="relative rounded-3xl p-1 bg-gradient-to-b from-emerald-500/40 via-emerald-950/80 to-obsidian-950 border border-emerald-500/30 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(16,185,129,0.2)] overflow-hidden backdrop-blur-2xl">
        
        <div className="relative rounded-[22px] bg-obsidian-950/95 p-6 sm:p-10 overflow-hidden">
          
          {/* Top Bar: Interactive Selector & Mode */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-950">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-xs uppercase font-bold text-emerald-400 tracking-wider">
                3D Interactive Produce Inspector &bull; WebGL Engine
              </span>
            </div>

            {/* Produce Switcher Buttons */}
            <div className="flex flex-wrap gap-2">
              {PRODUCE_ITEMS.map((item) => {
                const isActive = item.id === selectedProduce.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedProduce(item)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-champagne text-obsidian-950 shadow-gold-glow scale-105'
                        : 'bg-obsidian-900/90 text-cream/70 border border-emerald-900/60 hover:text-cream hover:border-emerald-700'
                    }`}
                  >
                    <span>{item.name.split(' ')[0]}</span>
                    {isActive && <Sparkles className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main 3D Canvas Stage Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
            
            {/* Left: Dynamic Telemetry & Freshness Specs */}
            <div className="lg:col-span-5 space-y-5 text-left order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProduce.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>{selectedProduce.tag}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-cream leading-tight">
                    {selectedProduce.name}
                  </h3>

                  <p className="text-sm font-mono text-champagne">
                    {selectedProduce.subname}
                  </p>

                  <p className="text-xs sm:text-sm text-cream/70 font-sans leading-relaxed">
                    Provenanced from <strong>{selectedProduce.origin}</strong>. Quality checked at our Digbeth Hub with non-invasive sugar refraction and skin firmness sensors.
                  </p>

                  {/* 3D Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                    <div className="p-3.5 rounded-2xl bg-obsidian-900/90 border border-emerald-900/60">
                      <span className="text-[10px] text-zinc-400 uppercase block">Sugar Refraction</span>
                      <span className="text-champagne font-bold text-base mt-0.5 block">{selectedProduce.brix}</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-obsidian-900/90 border border-emerald-900/60">
                      <span className="text-[10px] text-zinc-400 uppercase block">Cold-Chain Status</span>
                      <span className="text-emerald-400 font-bold text-base mt-0.5 block">{selectedProduce.temp}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Drag Hint */}
              <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 bg-obsidian-900/60 px-3 py-1.5 rounded-xl border border-emerald-950">
                <Rotate3d className="w-4 h-4 text-champagne animate-spin" />
                <span>Click & drag 3D model to inspect in 360°</span>
              </div>
            </div>

            {/* Right: Real Interactive 3D Canvas Viewport */}
            <div 
              className="lg:col-span-7 relative h-72 sm:h-96 w-full rounded-2xl bg-gradient-to-b from-obsidian-900/60 to-obsidian-950/90 border border-emerald-900/60 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing order-1 lg:order-2 shadow-2xl"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Live Canvas */}
              <canvas
                ref={canvasRef}
                className="w-full h-full block touch-none"
                style={{ width: '100%', height: '100%' }}
              />

              {/* Corner Watermark */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-obsidian-950/80 backdrop-blur-md border border-emerald-900/50 text-[10px] font-mono text-zinc-400 pointer-events-none">
                3D WebGL • 60 FPS
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
