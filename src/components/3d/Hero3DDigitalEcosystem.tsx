'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Truck, 
  ThermometerSnowflake, 
  Activity, 
  Layers, 
  Zap, 
  Rotate3d, 
  Sun, 
  Leaf, 
  PhoneCall, 
  Maximize2,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

interface TelemetryPod {
  id: string;
  label: string;
  metric: string;
  status: string;
  color: string;
  icon: any;
  description: string;
  xOffset: number;
  yOffset: number;
}

const TELEMETRY_PODS: TelemetryPod[] = [
  {
    id: 'orchard',
    label: 'Orchard Brix Refraction',
    metric: '14.8° Brix',
    status: 'Peak Harvest Sugar',
    color: '#E4C767',
    icon: Sun,
    description: 'Non-invasive infrared testing verifies optimum sugar & crispness before loading.',
    xOffset: -0.35,
    yOffset: -0.22,
  },
  {
    id: 'coldchain',
    label: 'Cold-Chain Dual-Temp',
    metric: '+2.2°C Hold',
    status: 'Zero Thermal Break',
    color: '#10B981',
    icon: ThermometerSnowflake,
    description: 'Continuous digital probes transmit live chamber readings to the Digbeth hub.',
    xOffset: 0.35,
    yOffset: -0.22,
  },
  {
    id: 'fleet',
    label: 'Fleet Logistics SLA',
    metric: '06:00 AM Drop',
    status: '99.8% On-Time Matrix',
    color: '#34D399',
    icon: Truck,
    description: 'Keyholder & kitchen inwards door drops completed before morning breakfast service.',
    xOffset: -0.38,
    yOffset: 0.24,
  },
  {
    id: 'credit',
    label: 'Instant Trade Facility',
    metric: '£30,000 Credit',
    status: '30-Day Terms Active',
    color: '#E4C767',
    icon: ShieldCheck,
    description: 'Instant paperless credit facility with automated EDI statement reconciliations.',
    xOffset: 0.38,
    yOffset: 0.24,
  },
];

export function Hero3DDigitalEcosystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activePod, setActivePod] = useState<TelemetryPod>(TELEMETRY_PODS[0]);
  const [isHovered, setIsHovered] = useState(false);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 680);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.targetX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouse.current.targetY = ((e.clientY - rect.top) / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 3D Polyhedron Geometry Points (Central Digital Core)
    const phi = (1 + Math.sqrt(5)) / 2;
    const coreVertices: Array<[number, number, number]> = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ].map(([x, y, z]) => [x * 45, y * 45, z * 45] as [number, number, number]);

    // Outer Orbital Ring Segments
    const ringSegments = 36;

    // Floating Data Particle Conduits
    interface DataParticle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;
      alpha: number;
    }

    const particles: DataParticle[] = [];
    const colors = ['#E4C767', '#10B981', '#34D399', '#FFF4D0'];
    for (let i = 0; i < 75; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 450,
        y: (Math.random() - 0.5) * 450,
        z: (Math.random() - 0.5) * 450,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.3,
      });
    }

    let coreRotX = 0.2;
    let coreRotY = 0.4;
    let orbitalAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation for camera parallax
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      coreRotY += 0.006;
      coreRotX = Math.sin(coreRotY * 0.5) * 0.15 + mouse.current.y * 0.3;
      orbitalAngle += 0.008;

      const cosX = Math.cos(coreRotX);
      const sinX = Math.sin(coreRotX);
      const cosY = Math.cos(coreRotY + mouse.current.x * 0.4);
      const sinY = Math.sin(coreRotY + mouse.current.x * 0.4);

      const cx = width / 2;
      const cy = height / 2 - 20;
      const fov = 480;

      // Project 3D vector to 2D
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

      // 1. Draw 3D Radial Ambient Lighting centered on the core
      const coreAmbient = ctx.createRadialGradient(cx, cy, 20, cx, cy, 280);
      coreAmbient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
      coreAmbient.addColorStop(0.5, 'rgba(228, 199, 103, 0.06)');
      coreAmbient.addColorStop(1, 'transparent');
      ctx.fillStyle = coreAmbient;
      ctx.beginPath();
      ctx.arc(cx, cy, 280, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw 3D Data Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (Math.abs(p.x) > 240) p.vx *= -1;
        if (Math.abs(p.y) > 240) p.vy *= -1;
        if (Math.abs(p.z) > 240) p.vz *= -1;

        const pt = project(p.x, p.y, p.z);
        if (pt.scale > 0) {
          const depthAlpha = Math.max(0.1, Math.min(0.9, (pt.z + 200) / 400));
          ctx.fillStyle = p.color;
          ctx.globalAlpha = depthAlpha * p.alpha;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * pt.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // 3. Draw 3D Orbital Rings
      for (let r = 0; r < 2; r++) {
        const ringRadius = 140 + r * 50;
        const ringTilt = (r === 0 ? 0.6 : -0.5) + Math.sin(orbitalAngle) * 0.1;
        const pts: Array<{ x: number; y: number; scale: number }> = [];

        for (let s = 0; s <= ringSegments; s++) {
          const theta = (s / ringSegments) * Math.PI * 2;
          const rx = Math.cos(theta) * ringRadius;
          const ry = Math.sin(theta) * ringRadius * Math.sin(ringTilt);
          const rz = Math.sin(theta) * ringRadius * Math.cos(ringTilt);
          pts.push(project(rx, ry, rz));
        }

        ctx.strokeStyle = r === 0 ? 'rgba(228, 199, 103, 0.4)' : 'rgba(52, 211, 153, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        pts.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
      }

      // 4. Draw Central 3D Digital Crystal Core
      const projCore = coreVertices.map(([x, y, z]) => project(x, y, z));

      // Draw wireframe links
      ctx.strokeStyle = 'rgba(228, 199, 103, 0.5)';
      ctx.lineWidth = 1.4;
      for (let i = 0; i < projCore.length; i++) {
        for (let j = i + 1; j < projCore.length; j++) {
          const p1 = coreVertices[i];
          const p2 = coreVertices[j];
          const distSq = (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2 + (p1[2] - p2[2]) ** 2;
          if (distSq < 7200) {
            ctx.beginPath();
            ctx.moveTo(projCore[i].x, projCore[i].y);
            ctx.lineTo(projCore[j].x, projCore[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw glowing nodes on crystal
      projCore.forEach((pt) => {
        const nodeGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 6 * pt.scale);
        nodeGrad.addColorStop(0, '#FFFFFF');
        nodeGrad.addColorStop(0.4, '#E4C767');
        nodeGrad.addColorStop(1, '#062D21');
        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4 * pt.scale, 0, Math.PI * 2);
        ctx.fill();
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
      
      {/* 3D WebGL Background Canvas */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Main Foreground Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-center space-y-8">
        
        {/* Live Operational Status Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-900/90 border border-emerald-500/40 text-cream text-xs font-mono backdrop-blur-xl shadow-2xl"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-emerald-300 font-bold">Cold-Chain Network Live: 99.8% On-Time SLA</span>
          <span className="text-cream/30 hidden sm:inline">&bull;</span>
          <span className="text-champagne hidden sm:inline">Digbeth Central Hub Active</span>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 max-w-5xl mx-auto"
        >
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-cream uppercase leading-[1.03]">
            The Connected <br />
            <span className="gold-gradient-text">Foodservice Platform</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-cream/80 max-w-3xl mx-auto font-sans leading-relaxed">
            Technology-powered B2B food & produce wholesale for <strong>fine dining restaurants, boutique hotels, luxury caterers, and healthcare groups</strong>. Precision cold chain, locked contract pricing, and guaranteed 06:00 AM kitchen drop-offs.
          </p>
        </motion.div>

        {/* Action CTAs Grouping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto pt-2"
        >
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-obsidian-950 bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim hover:brightness-110 shadow-gold-glow transition-all flex items-center justify-center gap-2 text-base group"
          >
            <span>Open a Business Account</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="#service-ecosystem"
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-cream bg-obsidian-900/90 border border-emerald-900/80 hover:border-champagne/60 hover:bg-emerald-950/40 transition-all flex items-center justify-center gap-2 text-sm sm:text-base backdrop-blur-md"
          >
            <Layers className="w-4 h-4 text-champagne" />
            <span>Explore 3D Ecosystem</span>
          </Link>

          <Link
            href="/login"
            className="px-5 py-4 rounded-xl font-medium text-cream/80 hover:text-champagne bg-obsidian-950/80 border border-emerald-900/80 hover:border-emerald-700 flex items-center justify-center gap-1.5 text-sm transition-all"
            title="Customer Portal Login"
          >
            <span>Portal Login</span>
            <ChevronRight className="w-4 h-4 text-champagne" />
          </Link>
        </motion.div>

        {/* 4 Interactive Telemetry Satellite Pods */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto pt-8 text-left"
        >
          {TELEMETRY_PODS.map((pod) => {
            const isSelected = pod.id === activePod.id;
            const Icon = pod.icon;

            return (
              <button
                key={pod.id}
                type="button"
                onClick={() => setActivePod(pod)}
                className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between backdrop-blur-xl group text-left ${
                  isSelected
                    ? 'bg-gradient-to-b from-emerald-950/90 to-obsidian-950/95 border-champagne shadow-gold-glow scale-102'
                    : 'bg-obsidian-900/80 border-emerald-900/50 hover:border-emerald-700 hover:bg-obsidian-900'
                }`}
              >
                <span className="block space-y-2 w-full">
                  <span className="flex justify-between items-center">
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0"
                      style={{ backgroundColor: `${pod.color}20`, color: pod.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400 uppercase font-bold">{pod.status}</span>
                  </span>

                  <span className="block">
                    <span className="block font-display text-sm font-bold text-cream group-hover:text-champagne transition-colors">
                      {pod.label}
                    </span>
                    <span className="block font-mono text-lg font-extrabold mt-0.5" style={{ color: pod.color }}>
                      {pod.metric}
                    </span>
                  </span>
                </span>

                <span className="block text-[11px] text-cream/65 font-sans mt-2 line-clamp-2 leading-relaxed text-left">
                  {pod.description}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Bottom Trust Row */}
        <div className="pt-6 border-t border-emerald-950/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-5xl mx-auto">
          <div className="p-3.5 bg-obsidian-900/50 rounded-xl border border-emerald-950 font-mono text-xs">
            <span className="text-champagne font-bold block uppercase">11:00 PM Cut-off</span>
            <span className="text-cream/60 text-[11px]">Late evening chef ordering</span>
          </div>
          <div className="p-3.5 bg-obsidian-900/50 rounded-xl border border-emerald-950 font-mono text-xs">
            <span className="text-emerald-400 font-bold block uppercase">06:00 AM SLA</span>
            <span className="text-cream/60 text-[11px]">Early morning kitchen drop</span>
          </div>
          <div className="p-3.5 bg-obsidian-900/50 rounded-xl border border-emerald-950 font-mono text-xs">
            <span className="text-champagne font-bold block uppercase">SALSA & BRCGS</span>
            <span className="text-cream/60 text-[11px]">Farm-to-fork batch lock</span>
          </div>
          <div className="p-3.5 bg-obsidian-900/50 rounded-xl border border-emerald-950 font-mono text-xs">
            <span className="text-emerald-400 font-bold block uppercase">30-Day Facility</span>
            <span className="text-cream/60 text-[11px]">Up to £30k trade credit</span>
          </div>
        </div>

      </div>
    </section>
  );
}
