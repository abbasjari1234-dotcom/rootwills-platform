'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Rotate3d, 
  Sun, 
  Droplets, 
  ThermometerSnowflake,
  Activity,
  CheckCircle2,
  ChevronRight,
  Zap,
  Flame,
  Layers,
  Box
} from 'lucide-react';

interface Produce3D {
  id: string;
  name: string;
  type: 'apple' | 'orange' | 'tomato' | 'ice' | 'leaf';
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  radius: number;
  color: string;
  glowColor: string;
  brix: string;
  origin: string;
  temp: string;
}

export function Ultra3DWorldHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedItem, setSelectedItem] = useState<Produce3D | null>(null);
  const [gravityMode, setGravityMode] = useState<'orbit' | 'float' | 'repel'>('orbit');
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = (canvas.parentElement?.clientWidth || window.innerWidth) * dpr);
    let height = (canvas.height = (canvas.parentElement?.clientHeight || 750) * dpr);
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth * dpr;
      height = canvas.height = canvas.parentElement.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.targetX = e.clientX - rect.left - rect.width / 2;
      mouse.current.targetY = e.clientY - rect.top - rect.height / 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create 3D Physics Produce Bodies
    const produceList: Produce3D[] = [
      {
        id: 'pink_lady_1',
        name: 'Pink Lady® Crisp Apple',
        type: 'apple',
        x: -180,
        y: -90,
        z: 40,
        vx: 0.4,
        vy: 0.2,
        vz: -0.2,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        vRotX: 0.015,
        vRotY: 0.02,
        vRotZ: 0.008,
        radius: 46,
        color: '#FF2E63',
        glowColor: '#FF7597',
        brix: '14.8° Brix',
        origin: 'Kent Sun Orchards',
        temp: '+2.2°C',
      },
      {
        id: 'orange_1',
        name: 'Sicilian Tarocco Blood Orange',
        type: 'orange',
        x: 190,
        y: -110,
        z: -30,
        vx: -0.3,
        vy: 0.4,
        vz: 0.3,
        rotX: 0.5,
        rotY: 0.2,
        rotZ: 0.1,
        vRotX: 0.01,
        vRotY: 0.018,
        vRotZ: 0.012,
        radius: 42,
        color: '#FF9900',
        glowColor: '#FFCC00',
        brix: '13.5° Brix',
        origin: 'Mount Etna Groves',
        temp: '+3.0°C',
      },
      {
        id: 'tomato_1',
        name: 'San Marzano Heritage Tomato',
        type: 'tomato',
        x: -120,
        y: 130,
        z: 10,
        vx: 0.5,
        vy: -0.3,
        vz: 0.1,
        rotX: 0.2,
        rotY: 0.8,
        rotZ: 0.3,
        vRotX: 0.012,
        vRotY: 0.022,
        vRotZ: 0.01,
        radius: 38,
        color: '#E63946',
        glowColor: '#FF6B6B',
        brix: '11.2° Brix',
        origin: 'Campania Volcanic Soil',
        temp: '+4.0°C',
      },
      {
        id: 'ice_1',
        name: 'Sub-Zero Cold-Chain Crystal',
        type: 'ice',
        x: 160,
        y: 110,
        z: -20,
        vx: -0.4,
        vy: -0.2,
        vz: 0.4,
        rotX: 0.7,
        rotY: 0.4,
        rotZ: 0.2,
        vRotX: 0.02,
        vRotY: 0.015,
        vRotZ: 0.025,
        radius: 34,
        color: '#00F59B',
        glowColor: '#70FFC8',
        brix: '0.00 Thermal Defect',
        origin: 'Digbeth Central Hub',
        temp: '-18.5°C',
      },
      {
        id: 'pink_lady_2',
        name: 'Heritage Golden Russet Apple',
        type: 'apple',
        x: 0,
        y: -160,
        z: -60,
        vx: 0.2,
        vy: 0.3,
        vz: -0.4,
        rotX: 0.3,
        rotY: 0.6,
        rotZ: 0.2,
        vRotX: 0.01,
        vRotY: 0.014,
        vRotZ: 0.009,
        radius: 40,
        color: '#FFC837',
        glowColor: '#FFE17D',
        brix: '15.2° Brix',
        origin: 'Herefordshire Organic Estate',
        temp: '+2.4°C',
      },
    ];

    // Background 3D Particles
    const particles: Array<{ x: number; y: number; z: number; size: number; alpha: number }> = [];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 600,
        z: (Math.random() - 0.5) * 400,
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.7 + 0.2,
      });
    }

    const render = () => {
      const renderW = width / dpr;
      const renderH = height / dpr;
      ctx.clearRect(0, 0, renderW, renderH);

      // Smooth mouse easing
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.06;

      const cx = renderW / 2;
      const cy = renderH / 2;
      const fov = 420;

      // Draw 3D Radial Background Sunlight / Emerald Beacon
      const bgSun = ctx.createRadialGradient(cx + mouse.current.x * 0.3, cy - 40 + mouse.current.y * 0.3, 10, cx, cy, 380);
      bgSun.addColorStop(0, 'rgba(0, 245, 155, 0.22)');
      bgSun.addColorStop(0.35, 'rgba(255, 200, 55, 0.08)');
      bgSun.addColorStop(0.7, 'rgba(11, 43, 32, 0.05)');
      bgSun.addColorStop(1, 'transparent');
      ctx.fillStyle = bgSun;
      ctx.beginPath();
      ctx.arc(cx, cy, 380, 0, Math.PI * 2);
      ctx.fill();

      // 3D Projection Helper
      const project = (x: number, y: number, z: number) => {
        const scale = fov / (fov + z);
        return {
          x: cx + x * scale,
          y: cy + y * scale,
          scale,
          z,
        };
      };

      // 1. Draw Floating 3D Sparkle Particles
      particles.forEach((p) => {
        p.y += 0.2;
        if (p.y > 300) p.y = -300;
        const pt = project(p.x, p.y, p.z);
        if (pt.scale > 0) {
          ctx.fillStyle = '#00F59B';
          ctx.globalAlpha = p.alpha * Math.max(0.1, Math.min(0.9, (p.z + 200) / 400));
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * pt.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // 2. Physics Update & Render 3D Produce
      produceList.forEach((item) => {
        // Rotation
        item.rotX += item.vRotX;
        item.rotY += item.vRotY;
        item.rotZ += item.vRotZ;

        // Mouse interaction force (Repel or Float)
        const dx = item.x - mouse.current.x;
        const dy = item.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          item.vx += (dx / dist) * force * 0.35;
          item.vy += (dy / dist) * force * 0.35;
        }

        // Return to natural orbit
        item.x += item.vx;
        item.y += item.vy;
        item.z += item.vz;

        item.vx *= 0.98;
        item.vy *= 0.98;
        item.vz *= 0.98;

        // Boundary bounce
        if (Math.abs(item.x) > 280) item.vx *= -1;
        if (Math.abs(item.y) > 220) item.vy *= -1;
        if (Math.abs(item.z) > 140) item.vz *= -1;
      });

      // Sort by Z for realistic depth occlusion
      const sortedProduce = [...produceList].sort((a, b) => b.z - a.z);

      sortedProduce.forEach((item) => {
        const pt = project(item.x, item.y, item.z);
        const r = item.radius * pt.scale;

        if (pt.scale > 0 && r > 2) {
          ctx.save();
          ctx.translate(pt.x, pt.y);

          // 3D Sphere Specular Shading with Light Source at Top-Left
          const lightOffsetX = -r * 0.35;
          const lightOffsetY = -r * 0.35;
          const sphereGrad = ctx.createRadialGradient(
            lightOffsetX,
            lightOffsetY,
            r * 0.1,
            0,
            0,
            r
          );

          sphereGrad.addColorStop(0, '#FFFFFF');
          sphereGrad.addColorStop(0.3, item.glowColor);
          sphereGrad.addColorStop(0.75, item.color);
          sphereGrad.addColorStop(1, '#041A13');

          // Outer Glow
          ctx.shadowColor = item.glowColor;
          ctx.shadowBlur = 24 * pt.scale;

          ctx.fillStyle = sphereGrad;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 0;

          // 3D Apple / Fruit Stem & Highlight
          if (item.type === 'apple') {
            ctx.strokeStyle = '#5A3D1E';
            ctx.lineWidth = 3 * pt.scale;
            ctx.beginPath();
            ctx.moveTo(0, -r * 0.8);
            ctx.quadraticCurveTo(8 * pt.scale, -r * 1.25, 4 * pt.scale, -r * 1.35);
            ctx.stroke();

            // Leaf
            ctx.fillStyle = '#00F59B';
            ctx.beginPath();
            ctx.ellipse(6 * pt.scale, -r * 1.15, 6 * pt.scale, 3 * pt.scale, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
          } else if (item.type === 'orange') {
            // Citrus Pore Texture Simulation
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            for (let p = 0; p < 6; p++) {
              const pa = (p * Math.PI * 2) / 6 + item.rotZ;
              ctx.beginPath();
              ctx.arc(Math.cos(pa) * (r * 0.5), Math.sin(pa) * (r * 0.5), 1.5 * pt.scale, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (item.type === 'ice') {
            // Ice Crystal facets
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1.5 * pt.scale;
            ctx.beginPath();
            ctx.moveTo(-r * 0.6, -r * 0.4);
            ctx.lineTo(r * 0.5, -r * 0.5);
            ctx.lineTo(r * 0.6, r * 0.4);
            ctx.lineTo(-r * 0.4, r * 0.6);
            ctx.closePath();
            ctx.stroke();
          }

          ctx.restore();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-center items-center pt-8 pb-16 overflow-hidden">
      
      {/* Interactive 3D Canvas Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
      </div>

      {/* Floating Foreground Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-center space-y-8 pointer-events-none">
        
        {/* Live Operational Status Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-900/90 border border-emerald-400/50 text-cream text-xs font-mono backdrop-blur-xl shadow-2xl pointer-events-auto">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <span className="text-emerald-300 font-bold">3D Fresh Produce Network Live &bull; Birmingham Digbeth Hub</span>
          <span className="text-cream/30 hidden sm:inline">&bull;</span>
          <span className="text-champagne hidden sm:inline">06:00 AM Delivery SLA</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-5xl mx-auto">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-cream uppercase leading-[1.02] drop-shadow-2xl">
            NATURE GROWN. <br />
            <span className="bg-gradient-to-r from-emerald-300 via-champagne to-rose-400 bg-clip-text text-transparent">
              3D DELIVERED.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-cream/90 max-w-3xl mx-auto font-sans leading-relaxed drop-shadow">
            The next-generation B2B wholesale food supply platform for <strong>restaurants, hotels, luxury caterers, and healthcare groups</strong>. Real-time 3D produce inspection, locked contract pricing, and guaranteed 06:00 AM kitchen drop-offs.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto pt-2 pointer-events-auto">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-obsidian-950 bg-gradient-to-r from-emerald-300 via-champagne to-champagne-dim hover:brightness-110 shadow-gold-glow transition-all flex items-center justify-center gap-2 text-base group"
          >
            <span>Open a Business Account</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="#3d-crate-station"
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-cream bg-obsidian-900/90 border border-emerald-500/50 hover:border-champagne/80 hover:bg-emerald-950/60 transition-all flex items-center justify-center gap-2 text-sm sm:text-base backdrop-blur-md"
          >
            <Box className="w-4 h-4 text-champagne" />
            <span>Pack 3D Delivery Crate</span>
          </Link>

          <Link
            href="/login"
            className="px-5 py-4 rounded-xl font-medium text-cream/80 hover:text-champagne bg-obsidian-950/80 border border-emerald-900/80 hover:border-emerald-700 flex items-center justify-center gap-1.5 text-sm transition-all"
            title="Customer Portal Login"
          >
            <span>Portal Login</span>
            <ChevronRight className="w-4 h-4 text-champagne" />
          </Link>
        </div>

        {/* 3D Interaction Prompt HUD */}
        <div className="pt-4 flex items-center justify-center gap-2 text-xs font-mono text-emerald-300/80 pointer-events-auto">
          <Rotate3d className="w-4 h-4 text-champagne animate-spin" />
          <span>Move mouse across screen to repel & interact with floating 3D produce</span>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-6 border-t border-emerald-950/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-5xl mx-auto pointer-events-auto">
          <div className="p-3.5 bg-obsidian-900/70 rounded-xl border border-emerald-900/60 font-mono text-xs shadow-lg">
            <span className="text-champagne font-bold block uppercase">11:00 PM Cut-off</span>
            <span className="text-cream/60 text-[11px]">Order after dinner service</span>
          </div>
          <div className="p-3.5 bg-obsidian-900/70 rounded-xl border border-emerald-900/60 font-mono text-xs shadow-lg">
            <span className="text-emerald-400 font-bold block uppercase">06:00 AM Drop</span>
            <span className="text-cream/60 text-[11px]">Guaranteed early breakfast SLA</span>
          </div>
          <div className="p-3.5 bg-obsidian-900/70 rounded-xl border border-emerald-900/60 font-mono text-xs shadow-lg">
            <span className="text-champagne font-bold block uppercase">SALSA & BRCGS</span>
            <span className="text-cream/60 text-[11px]">Farm-to-fork batch traceability</span>
          </div>
          <div className="p-3.5 bg-obsidian-900/70 rounded-xl border border-emerald-900/60 font-mono text-xs shadow-lg">
            <span className="text-emerald-400 font-bold block uppercase">30-Day Facility</span>
            <span className="text-cream/60 text-[11px]">Up to £30k trade credit</span>
          </div>
        </div>

      </div>
    </section>
  );
}
