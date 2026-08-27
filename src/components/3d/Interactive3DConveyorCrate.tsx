'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Rotate3d, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Truck, 
  Scale, 
  Box, 
  Zap, 
  ArrowRight,
  Sun,
  Flame,
  Leaf
} from 'lucide-react';
import Link from 'next/link';

interface CrateProduceItem {
  id: string;
  name: string;
  category: string;
  weightKg: number;
  pricePerKg: number;
  color: string;
  glowColor: string;
  iconType: 'apple' | 'orange' | 'tomato' | 'greens' | 'meat' | 'butter';
  count: number;
}

const INITIAL_ITEMS: CrateProduceItem[] = [
  {
    id: 'apples',
    name: 'Class 1 Pink Lady® Apples',
    category: 'Fresh Orchard',
    weightKg: 2.5,
    pricePerKg: 3.40,
    color: '#FF2E63',
    glowColor: '#FF7597',
    iconType: 'apple',
    count: 2,
  },
  {
    id: 'oranges',
    name: 'Sicilian Blood Oranges',
    category: 'Heritage Citrus',
    weightKg: 3.0,
    pricePerKg: 3.80,
    color: '#FF9900',
    glowColor: '#FFCC00',
    iconType: 'orange',
    count: 1,
  },
  {
    id: 'tomatoes',
    name: 'San Marzano Vine Tomatoes',
    category: 'Salad & Vine',
    weightKg: 2.0,
    pricePerKg: 4.20,
    color: '#E63946',
    glowColor: '#FF6B6B',
    iconType: 'tomato',
    count: 1,
  },
  {
    id: 'greens',
    name: 'Living Hydroponic Microgreens',
    category: 'Herbs & Leaves',
    weightKg: 0.8,
    pricePerKg: 6.50,
    color: '#00F59B',
    glowColor: '#70FFC8',
    iconType: 'greens',
    count: 2,
  },
  {
    id: 'beef',
    name: '28-Day Dry-Aged Ribeye Primals',
    category: 'Artisan Butchery',
    weightKg: 4.5,
    pricePerKg: 18.50,
    color: '#9E2A2B',
    glowColor: '#E07A5F',
    iconType: 'meat',
    count: 1,
  },
];

export function Interactive3DConveyorCrate() {
  const [items, setItems] = useState<CrateProduceItem[]>(INITIAL_ITEMS);
  const [isAdded, setIsAdded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotationY, setRotationY] = useState(0.4);
  const [rotationX, setRotationX] = useState(0.3);
  const [isDragging, setIsDragging] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const totalWeight = items.reduce((acc, item) => acc + item.count * item.weightKg, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.count * item.weightKg * item.pricePerKg, 0);
  const totalItemsCount = items.reduce((acc, item) => acc + item.count, 0);
  const maxCapacity = 25; // kg
  const capacityPercent = Math.min(100, Math.round((totalWeight / maxCapacity) * 100));

  const updateItemCount = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newCount = Math.max(0, item.count + delta);
          return { ...item, count: newCount };
        }
        return item;
      })
    );
  };

  // 3D Canvas Rendering of the Wooden Crate and Produce
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let autoAngle = rotationY;

    const render = () => {
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2 + 10;

      ctx.clearRect(0, 0, w, heightDpr(h));

      if (!isDragging) {
        autoAngle += 0.005;
      } else {
        autoAngle = rotationY;
      }

      const cosY = Math.cos(autoAngle);
      const sinY = Math.sin(autoAngle);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const fov = 450;

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

      // 1. Draw 3D Radial Glow underneath crate
      const crateGlow = ctx.createRadialGradient(cx, cy + 60, 10, cx, cy + 60, 180);
      crateGlow.addColorStop(0, 'rgba(0, 245, 155, 0.2)');
      crateGlow.addColorStop(0.5, 'rgba(255, 200, 55, 0.08)');
      crateGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = crateGlow;
      ctx.beginPath();
      ctx.arc(cx, cy + 60, 180, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw 3D Wooden Crate Slats
      const cw = 110;
      const ch = 55;
      const cd = 80;

      // Crate 8 Corners
      const crateCorners: Array<[number, number, number]> = [
        [-cw, -ch, -cd], [cw, -ch, -cd], [cw, ch, -cd], [-cw, ch, -cd],
        [-cw, -ch, cd], [cw, -ch, cd], [cw, ch, cd], [-cw, ch, cd]
      ];

      const projCorners = crateCorners.map(([x, y, z]) => project(x, y, z));

      // Draw Wooden Slats (Wireframe with wood color gradient)
      ctx.strokeStyle = '#D4A373';
      ctx.lineWidth = 3;

      // Bottom base
      ctx.beginPath();
      ctx.moveTo(projCorners[3].x, projCorners[3].y);
      ctx.lineTo(projCorners[2].x, projCorners[2].y);
      ctx.lineTo(projCorners[6].x, projCorners[6].y);
      ctx.lineTo(projCorners[7].x, projCorners[7].y);
      ctx.closePath();
      ctx.fillStyle = 'rgba(74, 52, 38, 0.75)';
      ctx.fill();
      ctx.stroke();

      // Vertical corner posts
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(projCorners[i].x, projCorners[i].y);
        ctx.lineTo(projCorners[i + 4].x, projCorners[i + 4].y);
        ctx.stroke();
      }

      // Top rim
      ctx.strokeStyle = '#FAEDCD';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(projCorners[0].x, projCorners[0].y);
      ctx.lineTo(projCorners[1].x, projCorners[1].y);
      ctx.lineTo(projCorners[5].x, projCorners[5].y);
      ctx.lineTo(projCorners[4].x, projCorners[4].y);
      ctx.closePath();
      ctx.stroke();

      // 3. Draw 3D Spheres for packed produce inside the crate
      const produceSpheres: Array<{ x: number; y: number; z: number; r: number; color: string; glow: string }> = [];
      let sphereIdx = 0;

      items.forEach((item) => {
        for (let c = 0; c < item.count; c++) {
          const col = sphereIdx % 4;
          const row = Math.floor(sphereIdx / 4) % 3;
          const layer = Math.floor(sphereIdx / 12);

          const px = -cw + 30 + col * 52 + (Math.sin(sphereIdx) * 6);
          const py = ch - 22 - layer * 28;
          const pz = -cd + 30 + row * 46;

          produceSpheres.push({
            x: px,
            y: py,
            z: pz,
            r: 16,
            color: item.color,
            glow: item.glowColor,
          });

          sphereIdx++;
        }
      });

      // Sort spheres by depth
      const projSpheres = produceSpheres.map((s) => {
        const pt = project(s.x, s.y, s.z);
        return { ...s, ...pt };
      }).sort((a, b) => b.z - a.z);

      projSpheres.forEach((s) => {
        if (s.scale > 0) {
          const rad = s.r * s.scale;
          const grad = ctx.createRadialGradient(s.x - rad * 0.3, s.y - rad * 0.3, 0, s.x, s.y, rad);
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.35, s.glow);
          grad.addColorStop(0.8, s.color);
          grad.addColorStop(1, '#0B2B20');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(s.x, s.y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    function heightDpr(h: number) {
      return h;
    }

    render();

    return () => cancelAnimationFrame(animId);
  }, [items, isDragging, rotationY, rotationX]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    setRotationY((r) => r + dx * 0.01);
    setRotationX((r) => Math.max(0.1, Math.min(0.8, r + dy * 0.01)));
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <section id="3d-crate-station" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24 sm:my-32">
      
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold uppercase backdrop-blur-md shadow-lg">
          <Box className="w-4 h-4 text-champagne" />
          <span>Interactive 3D Crate Packer</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-cream uppercase leading-[1.05]">
          Pack Your Kitchen <span className="gold-gradient-text">Delivery Crate</span>
        </h2>

        <p className="text-sm sm:text-base text-cream/80 font-sans leading-relaxed">
          Customize your morning delivery order in real-time 3D. Add your fresh produce and butcher cuts, monitor crate weight and locked contract rates, and push straight to the kitchen dispatch bay.
        </p>
      </div>

      {/* 3D Crate Customizer Stage */}
      <div className="rounded-[32px] p-1 bg-gradient-to-b from-emerald-500/40 via-emerald-900/50 to-obsidian-950 border border-champagne/30 shadow-[0_30px_90px_rgba(2,23,16,0.9),0_0_50px_rgba(0,245,155,0.2)] overflow-hidden">
        
        <div className="rounded-[28px] bg-obsidian-900/95 p-6 sm:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: 3D Interactive Crate Canvas */}
            <div
              className="lg:col-span-6 relative h-[380px] sm:h-[480px] w-full rounded-3xl bg-gradient-to-b from-obsidian-950 to-obsidian-900 border border-emerald-900/70 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing shadow-2xl"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <canvas ref={canvasRef} className="w-full h-full block touch-none" />

              {/* Top Crate Telemetry Bar */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                <div className="bg-obsidian-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-emerald-500/40 text-xs font-mono text-emerald-300 font-bold flex items-center gap-1.5 shadow-lg">
                  <Scale className="w-3.5 h-3.5 text-champagne" />
                  <span>Payload: {totalWeight.toFixed(1)} / {maxCapacity} kg ({capacityPercent}%)</span>
                </div>

                <div className="bg-obsidian-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-champagne/40 text-xs font-mono text-champagne font-bold shadow-lg">
                  Est: £{totalPrice.toFixed(2)}
                </div>
              </div>

              {/* Bottom Drag Instruction */}
              <div className="absolute bottom-4 left-4 bg-obsidian-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-900/60 text-[11px] font-mono text-zinc-300 flex items-center gap-2 pointer-events-none shadow-lg">
                <Rotate3d className="w-4 h-4 text-champagne animate-spin" />
                <span>Drag to inspect 3D wooden crate in 360°</span>
              </div>
            </div>

            {/* Right: Produce Selector Controls */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              <div className="flex justify-between items-center pb-2 border-b border-emerald-950">
                <span className="font-mono text-xs text-cream/60 uppercase">Wholesale Core Lines</span>
                <span className="font-mono text-xs text-emerald-400 font-bold">{totalItemsCount} units in crate</span>
              </div>

              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-obsidian-950/85 border border-emerald-900/60 flex items-center justify-between hover:border-champagne/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-md"
                        style={{ backgroundColor: `${item.color}25`, color: item.color }}
                      >
                        <Box className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-cream group-hover:text-champagne transition-colors">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] font-mono text-cream/60">
                          <span>{item.weightKg} kg pack</span>
                          <span>&bull;</span>
                          <span className="text-champagne font-bold">£{item.pricePerKg.toFixed(2)}/kg</span>
                        </div>
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 bg-obsidian-900 px-2 py-1 rounded-xl border border-emerald-900/60">
                      <button
                        type="button"
                        onClick={() => updateItemCount(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-obsidian-950 hover:bg-rose-950 text-cream/70 hover:text-rose-400 flex items-center justify-center font-bold transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-mono font-bold text-xs text-cream">
                        {item.count}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateItemCount(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-obsidian-950 hover:bg-emerald-950 text-cream/70 hover:text-emerald-400 flex items-center justify-center font-bold transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Crate to Order CTA */}
              <div className="pt-2">
                <Link
                  href="/onboarding"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-300 via-champagne to-champagne-dim text-obsidian-950 font-bold text-sm shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order This 3D Crate ({totalWeight.toFixed(1)}kg &bull; £{totalPrice.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
