'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  ShoppingBag, 
  Rotate3d, 
  Sparkles, 
  Check, 
  Scale, 
  ThermometerSnowflake, 
  Box, 
  Trash2,
  Layers
} from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

interface CrateItem {
  id: string;
  name: string;
  category: string;
  weightKg: number;
  unitPrice: number;
  color: string;
  icon: string;
}

const AVAILABLE_ITEMS: CrateItem[] = [
  { id: 'app-01', name: 'Pink Lady® Apples (12kg Crate)', category: 'Fresh Produce', weightKg: 12.0, unitPrice: 18.50, color: '#E11D48', icon: '🍎' },
  { id: 'tom-02', name: 'Heritage Vine Tomatoes (6kg)', category: 'Fresh Produce', weightKg: 6.0, unitPrice: 14.20, color: '#DC2626', icon: '🍅' },
  { id: 'but-03', name: 'Normandy Cultured Butter (5kg)', category: 'Artisan Dairy', weightKg: 5.0, unitPrice: 28.00, color: '#E4C767', icon: '🧈' },
  { id: 'mic-04', name: 'Living Microgreen Trays (x6)', category: 'Living Herbs', weightKg: 1.5, unitPrice: 12.00, color: '#10B981', icon: '🌱' },
  { id: 'egg-05', name: 'Free-Range Burford Browns (15 Dozen)', category: 'Artisan Eggs', weightKg: 10.5, unitPrice: 34.50, color: '#D97706', icon: '🥚' },
  { id: 'avo-06', name: 'Ready-to-Eat Hass Avocados (24ct)', category: 'Exotic Fruit', weightKg: 4.8, unitPrice: 19.80, color: '#059669', icon: '🥑' },
];

export function Interactive3DCrateBuilder() {
  const [packedItems, setPackedItems] = useState<{ item: CrateItem; qty: number }[]>([
    { item: AVAILABLE_ITEMS[0], qty: 1 },
    { item: AVAILABLE_ITEMS[1], qty: 1 },
  ]);
  const [addedEffect, setAddedEffect] = useState(false);
  const { addLine, openCart } = useCartStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0.35, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const totalWeight = packedItems.reduce((sum, p) => sum + p.item.weightKg * p.qty, 0);
  const totalPrice = packedItems.reduce((sum, p) => sum + p.item.unitPrice * p.qty, 0);
  const maxCapacityKg = 35.0;
  const capacityPercent = Math.min(100, Math.round((totalWeight / maxCapacityKg) * 100));

  const addItemToCrate = (item: CrateItem) => {
    setPackedItems((prev) => {
      const existing = prev.find((p) => p.item.id === item.id);
      if (existing) {
        return prev.map((p) => (p.item.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const removeItemFromCrate = (id: string) => {
    setPackedItems((prev) => {
      const existing = prev.find((p) => p.item.id === id);
      if (existing && existing.qty > 1) {
        return prev.map((p) => (p.item.id === id ? { ...p, qty: p.qty - 1 } : p));
      }
      return prev.filter((p) => p.item.id !== id);
    });
  };

  const handleAddAllToCart = () => {
    packedItems.forEach((p) => {
      addLine(
        {
          productId: p.item.id,
          sku: `RW-${p.item.id.toUpperCase()}`,
          name: p.item.name,
          unit: 'Crate',
          unitPrice: p.item.unitPrice,
          moq: 1,
        },
        p.qty
      );
    });
    setAddedEffect(true);
    setTimeout(() => {
      setAddedEffect(false);
      openCart();
    }, 800);
  };

  // 3D Canvas Real-Time Crate Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let currentRotY = rotation.y;
    let currentRotX = rotation.x;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      if (!isDragging) {
        currentRotY += 0.007;
        currentRotX = Math.sin(currentRotY * 0.4) * 0.1 + 0.35;
      } else {
        currentRotX = rotation.x;
        currentRotY = rotation.y;
      }

      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      const fov = 420;

      // Project 3D coordinate
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

      // 1. Draw 3D Wooden Crate Slats
      const sizeX = 90;
      const sizeY = 55;
      const sizeZ = 75;

      const corners = [
        [-sizeX, -sizeY, -sizeZ],
        [sizeX, -sizeY, -sizeZ],
        [sizeX, sizeY, -sizeZ],
        [-sizeX, sizeY, -sizeZ],
        [-sizeX, -sizeY, sizeZ],
        [sizeX, -sizeY, sizeZ],
        [sizeX, sizeY, sizeZ],
        [-sizeX, sizeY, sizeZ],
      ];

      const projCorners = corners.map(([x, y, z]) => project(x, y, z));

      // Edges of 3D box
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // back
        [4, 5], [5, 6], [6, 7], [7, 4], // front
        [0, 4], [1, 5], [2, 6], [3, 7], // sides
        // Slats
        [0, 5], [3, 6], [4, 1]
      ];

      // Draw bottom base
      ctx.fillStyle = 'rgba(6, 78, 59, 0.25)';
      ctx.beginPath();
      ctx.moveTo(projCorners[2].x, projCorners[2].y);
      ctx.lineTo(projCorners[3].x, projCorners[3].y);
      ctx.lineTo(projCorners[7].x, projCorners[7].y);
      ctx.lineTo(projCorners[6].x, projCorners[6].y);
      ctx.closePath();
      ctx.fill();

      // Draw 3D Crate Wireframe Slats
      edges.forEach(([i1, i2]) => {
        const p1 = projCorners[i1];
        const p2 = projCorners[i2];
        ctx.strokeStyle = 'rgba(228, 199, 103, 0.45)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // 2. Draw 3D Floating Packed Spheres inside the crate
      packedItems.forEach((p, idx) => {
        const count = p.qty;
        for (let c = 0; c < count; c++) {
          const offsetX = ((idx * 37 + c * 29) % (sizeX * 1.4)) - sizeX * 0.7;
          const offsetY = -sizeY * 0.2 - c * 15;
          const offsetZ = ((idx * 23 + c * 41) % (sizeZ * 1.4)) - sizeZ * 0.7;

          const sphereProj = project(offsetX, offsetY, offsetZ);

          const radius = 14 * sphereProj.scale;
          const grad = ctx.createRadialGradient(
            sphereProj.x - radius * 0.3,
            sphereProj.y - radius * 0.3,
            radius * 0.1,
            sphereProj.x,
            sphereProj.y,
            radius
          );
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.3, p.item.color);
          grad.addColorStop(1, '#022C22');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(sphereProj.x, sphereProj.y, radius, 0, Math.PI * 2);
          ctx.fill();

          // 3D Glow
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [packedItems, isDragging, rotation]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    setRotation((r) => ({
      x: Math.max(-0.8, Math.min(0.8, r.x + dy * 0.01)),
      y: r.y + dx * 0.01,
    }));
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span>Interactive 3D Cold-Chain Studio</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream">
          Build & Pack Your 3D Wholesale Crate
        </h2>
        <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-sans">
          Simulate your morning delivery crate in 3D. Add your fresh produce lines, monitor weight distribution & temperature constraints, and add directly to your order basket.
        </p>
      </div>

      {/* 3D Crate Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: 3D Viewport */}
        <div className="lg:col-span-6 relative rounded-3xl bg-gradient-to-b from-obsidian-900/90 to-obsidian-950/95 border border-emerald-900/60 p-6 shadow-2xl backdrop-blur-xl">
          
          <div className="flex justify-between items-center pb-4 border-b border-emerald-950">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-champagne" />
              <span className="font-display text-base font-bold text-cream">3D Crate Chamber #01</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">+2.2°C Chilled SLA</span>
            </div>
          </div>

          {/* 3D Interactive Canvas */}
          <div
            className="relative h-72 sm:h-96 w-full cursor-grab active:cursor-grabbing flex items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <canvas ref={canvasRef} className="w-full h-full block" />

            <div className="absolute bottom-3 left-3 bg-obsidian-950/80 px-2.5 py-1 rounded-lg border border-emerald-900/50 text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 pointer-events-none">
              <Rotate3d className="w-3.5 h-3.5 text-champagne animate-spin" />
              <span>Drag to rotate 3D crate</span>
            </div>

            <div className="absolute top-3 right-3 bg-obsidian-950/90 px-3 py-1.5 rounded-xl border border-emerald-900/60 text-right">
              <span className="text-[10px] text-zinc-400 font-mono block">Crate Capacity</span>
              <span className="font-mono text-xs font-bold text-champagne">{totalWeight.toFixed(1)} / {maxCapacityKg} kg</span>
            </div>
          </div>

          {/* Weight Capacity Progress Bar */}
          <div className="space-y-1 pt-3 border-t border-emerald-950">
            <div className="flex justify-between text-[11px] font-mono text-cream/70">
              <span className="flex items-center gap-1"><Scale className="w-3 h-3 text-champagne" /> Total Payload Weight</span>
              <span className="font-bold text-emerald-400">{capacityPercent}% Utilized</span>
            </div>
            <div className="w-full h-2 bg-obsidian-950 rounded-full overflow-hidden border border-emerald-900/40">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-champagne transition-all duration-300"
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Produce Selector & Packed Items List */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Available Produce Selector */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-900/60 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display text-lg font-bold text-cream">Select Produce to Pack</h3>
              <span className="text-xs text-champagne font-mono font-bold">1-Click Crate Injection</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVAILABLE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => addItemToCrate(item)}
                  className="p-3 rounded-2xl bg-obsidian-950/80 border border-emerald-950 hover:border-champagne/40 hover:bg-emerald-950/40 transition-all text-left flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl">{item.icon}</span>
                    <span className="min-w-0 block">
                      <span className="text-xs font-bold text-cream truncate group-hover:text-champagne transition-colors block">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-cream/50 font-mono block">
                        £{item.unitPrice.toFixed(2)} &bull; {item.weightKg}kg
                      </span>
                    </span>
                  </span>
                  <span className="w-7 h-7 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center shrink-0 group-hover:bg-champagne group-hover:text-obsidian-950 transition-all">
                    <Plus className="w-3.5 h-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Current Crate Manifest & Order Action */}
          <div className="glass-panel-gold p-6 rounded-3xl border border-champagne/40 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-display text-base font-bold text-cream">Crate Manifest</h3>
                <span className="text-[11px] text-cream/60 font-mono">{packedItems.length} lines packed</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Total Est. Price</span>
                <span className="font-mono text-xl font-bold text-champagne">£{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* List */}
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {packedItems.length === 0 ? (
                <div className="text-center py-4 text-xs text-cream/50">Your 3D crate is currently empty. Click an item above to pack.</div>
              ) : (
                packedItems.map((p) => (
                  <div key={p.item.id} className="p-2.5 rounded-xl bg-obsidian-950/80 border border-emerald-900/40 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span>{p.item.icon}</span>
                      <span className="font-bold text-cream">{p.item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-champagne font-bold">{p.qty}x</span>
                      <button
                        type="button"
                        onClick={() => removeItemFromCrate(p.item.id)}
                        className="p-1 text-cream/40 hover:text-rose-400"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              type="button"
              onClick={handleAddAllToCart}
              disabled={packedItems.length === 0}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs sm:text-sm shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all"
            >
              {addedEffect ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>3D Crate Added to Basket!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Entire 3D Crate to Basket (£{totalPrice.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
