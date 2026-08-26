'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, ShieldCheck, ThermometerSnowflake, Truck, Clock, Award, Leaf } from 'lucide-react';

export function ThreeDHeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 180, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Different depth layers move at different parallax speeds
  const bgLayerX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const bgLayerY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  const midLayerX = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const midLayerY = useTransform(smoothY, [-0.5, 0.5], [-35, 35]);

  const frontLayerX = useTransform(smoothX, [-0.5, 0.5], [-55, 55]);
  const frontLayerY = useTransform(smoothY, [-0.5, 0.5], [-55, 55]);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-6xl mx-auto min-h-[540px] sm:min-h-[620px] flex items-center justify-center [perspective:1400px] select-none my-6 sm:my-10"
    >
      {/* 1. AMBIENT 3D GLOW SPHERES */}
      <motion.div
        style={{ x: bgLayerX, y: bgLayerY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[620px] h-[380px] sm:h-[480px] bg-gradient-to-tr from-amber-500/20 via-champagne/25 to-emerald-500/20 rounded-full blur-[110px] pointer-events-none -z-10"
      />

      {/* 2. 3D CENTRAL HERO STAGE */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-4xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-champagne/40 via-zinc-800/80 to-zinc-950/90 shadow-[0_30px_90px_rgba(0,0,0,0.8),0_0_50px_rgba(228,199,103,0.15)] backdrop-blur-xl border border-champagne/30"
      >
        <div className="relative rounded-[22px] overflow-hidden bg-obsidian-950/90 p-6 sm:p-10 border border-zinc-800/80">
          
          {/* Subtle Grid / Radial pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e4c767_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          
          {/* Main Visual Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Fresh Produce Feature & Metrics */}
            <div className="lg:col-span-5 text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
                <Leaf className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                <span>Class 1 Farm-Fresh Produce</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream leading-tight">
                Orchard Crispness & Dual-Temp Integrity.
              </h3>

              <p className="text-sm text-cream/70 leading-relaxed font-sans">
                Hand-graded UK & European produce delivered direct to executive kitchens before 7:00 AM, with continuous temperature monitoring from depot to kitchen door.
              </p>

              {/* Live Spec Badges */}
              <div className="pt-2 grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <span className="text-zinc-400 block text-[10px] uppercase">Chilled Fleet</span>
                  <span className="text-emerald-400 font-bold text-sm">+2.4°C Active</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <span className="text-zinc-400 block text-[10px] uppercase">Morning Transit</span>
                  <span className="text-champagne font-bold text-sm">&lt; 4 Hours</span>
                </div>
              </div>
            </div>

            {/* Right: 3D High-Res Produce Hero Showcase */}
            <div className="lg:col-span-7 relative h-64 sm:h-80 w-full flex items-center justify-center [transform-style:preserve-3d]">
              {/* Central Main High-Res Fresh Image */}
              <motion.div
                animate={{
                  y: [-6, 6, -6],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut',
                }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/60 group"
              >
                <Image
                  src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=85"
                  alt="Fresh Class 1 Apples and Citrus Produce"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />
                
                {/* Floating badge inside image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-obsidian-950/80 backdrop-blur-md border border-zinc-700/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-champagne/20 border border-champagne/40 flex items-center justify-center text-champagne">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-cream">Pink Lady & Heirloom Apples</div>
                      <div className="text-[10px] text-zinc-400">Class 1 • Farm Crispness Guaranteed</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-1 rounded bg-emerald-950/60 border border-emerald-500/30">
                    Grade A
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. FLOATING 3D GLASS PILLS (Parallax depth layers) */}
      
      {/* Top Left Floating 3D Badge: Temperature Probe */}
      <motion.div
        style={{ x: frontLayerX, y: frontLayerY }}
        animate={{ y: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="absolute -top-4 sm:-top-8 left-2 sm:left-6 z-30 pointer-events-none hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-emerald-500/50 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(16,185,129,0.2)]"
      >
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
          <ThermometerSnowflake className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Cold-Chain Guard</div>
          <div className="text-sm font-bold text-cream flex items-center gap-1.5 font-mono">
            <span>+2.4°C</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
            <span className="text-xs font-sans text-emerald-400 font-normal">Optimal</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Right Floating 3D Badge: Early Morning Dispatch */}
      <motion.div
        style={{ x: midLayerX, y: midLayerY }}
        animate={{ y: [8, -8, 8] }}
        transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut' }}
        className="absolute -bottom-6 sm:-bottom-8 right-2 sm:right-6 z-30 pointer-events-none flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-champagne/50 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(228,199,103,0.2)]"
      >
        <div className="w-10 h-10 rounded-xl bg-champagne/20 border border-champagne/40 flex items-center justify-center text-champagne">
          <Truck className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Morning Delivery</div>
          <div className="text-sm font-bold text-cream flex items-center gap-1.5 font-mono">
            <span className="text-champagne">06:00 AM – 07:30 AM</span>
          </div>
        </div>
      </motion.div>

      {/* Top Right Floating 3D Badge: BRCGS Certified */}
      <motion.div
        style={{ x: bgLayerX, y: bgLayerY }}
        animate={{ y: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-8 right-4 sm:-right-4 z-20 pointer-events-none hidden md:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 shadow-xl"
      >
        <Award className="w-4 h-4 text-champagne" />
        <span className="text-xs font-mono text-cream/90 font-medium">BRCGS Food Safety Certified</span>
      </motion.div>
    </div>
  );
}
