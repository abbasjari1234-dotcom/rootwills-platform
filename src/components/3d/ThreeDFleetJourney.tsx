'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  ThermometerSnowflake, 
  MapPin, 
  Clock, 
  Rotate3d, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Sparkles, 
  Layers,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

interface RouteStage {
  step: string;
  time: string;
  location: string;
  title: string;
  temp: string;
  status: string;
  desc: string;
  color: string;
}

const ROUTE_STAGES: RouteStage[] = [
  {
    step: '01',
    time: '11:00 PM',
    location: 'Chef Ordering Closes',
    title: 'Automated Depot Batch Consolidation',
    temp: '+2.0°C Vault',
    status: 'Consolidated',
    desc: 'Orders placed across the Midlands are tallied, batch-allocated from the Hydro-Vault, and staged for dual-temp loading.',
    color: '#FFC837',
  },
  {
    step: '02',
    time: '03:30 AM',
    location: 'Digbeth Central Hub',
    title: 'Dual-Temp Vehicle Pre-Chill & Loading',
    temp: '-18.5°C Butchery / +2.4°C Produce',
    status: 'Pre-Chilled',
    desc: 'Dedicated refrigerated Mercedes-Benz Sprinters pre-chill to contract SLA before crates are loaded in reverse delivery order.',
    color: '#00F59B',
  },
  {
    step: '03',
    time: '05:15 AM',
    location: 'GPS Geofenced Route',
    title: 'Live Telemetric Cold-Chain Transit',
    temp: '+2.2°C Calibrated',
    status: 'In Transit',
    desc: 'Continuous real-time temperature telemetry logged every 30 seconds with automated zero-thermal-break certification.',
    color: '#38BDF8',
  },
  {
    step: '04',
    time: '06:00 – 07:30 AM',
    location: 'Kitchen Inwards Door',
    title: 'Direct Coldroom Keyholder Drop',
    temp: '+2.1°C Final Handover',
    status: 'Delivered',
    desc: 'Quiet early morning drop directly inside your walk-in chiller before the head chef arrives for morning service prep.',
    color: '#00F59B',
  },
];

export function ThreeDFleetJourney() {
  const [activeStage, setActiveStage] = useState<RouteStage>(ROUTE_STAGES[2]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [vanAngle, setVanAngle] = useState(0.4);

  // 3D Van & Cold-Chain Simulation
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

    let angle = vanAngle;

    // 3D Sub-Zero Mist Particles
    const mistParticles: Array<{ x: number; y: number; z: number; vx: number; vy: number; vz: number; size: number }> = [];
    for (let i = 0; i < 60; i++) {
      mistParticles.push({
        x: (Math.random() - 0.5) * 240,
        y: (Math.random() - 0.5) * 80 + 20,
        z: (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2,
        vz: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 3 + 1,
      });
    }

    const render = () => {
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2 + 10;

      ctx.clearRect(0, 0, w, h);

      angle += 0.006;
      const cosY = Math.cos(angle);
      const sinY = Math.sin(angle);
      const cosX = Math.cos(0.35);
      const sinX = Math.sin(0.35);
      const fov = 440;

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

      // 1. Draw 3D Radial Cold Light Underneath Van
      const underGlow = ctx.createRadialGradient(cx, cy + 40, 10, cx, cy + 40, 160);
      underGlow.addColorStop(0, 'rgba(0, 245, 155, 0.25)');
      underGlow.addColorStop(0.6, 'rgba(56, 189, 248, 0.08)');
      underGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = underGlow;
      ctx.beginPath();
      ctx.arc(cx, cy + 40, 160, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw 3D Refrigerated Box Van Body
      const vw = 100;
      const vh = 50;
      const vd = 65;

      const vanCorners: Array<[number, number, number]> = [
        [-vw, -vh, -vd], [vw * 0.4, -vh, -vd], [vw * 0.4, vh, -vd], [-vw, vh, -vd],
        [-vw, -vh, vd], [vw * 0.4, -vh, vd], [vw * 0.4, vh, vd], [-vw, vh, vd],
        // Cab
        [vw * 0.4, -vh * 0.4, -vd * 0.9], [vw * 0.9, -vh * 0.4, -vd * 0.9],
        [vw * 0.9, vh, -vd * 0.9], [vw * 0.4, vh, -vd * 0.9],
        [vw * 0.4, -vh * 0.4, vd * 0.9], [vw * 0.9, -vh * 0.4, vd * 0.9],
        [vw * 0.9, vh, vd * 0.9], [vw * 0.4, vh, vd * 0.9],
      ];

      const proj = vanCorners.map(([x, y, z]) => project(x, y, z));

      // Draw Main Refrigerated Chiller Box
      ctx.strokeStyle = '#00F59B';
      ctx.lineWidth = 2.2;
      ctx.fillStyle = 'rgba(4, 26, 19, 0.85)';

      // Left wall
      ctx.beginPath();
      ctx.moveTo(proj[0].x, proj[0].y);
      ctx.lineTo(proj[1].x, proj[1].y);
      ctx.lineTo(proj[2].x, proj[2].y);
      ctx.lineTo(proj[3].x, proj[3].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right wall
      ctx.beginPath();
      ctx.moveTo(proj[4].x, proj[4].y);
      ctx.lineTo(proj[5].x, proj[5].y);
      ctx.lineTo(proj[6].x, proj[6].y);
      ctx.lineTo(proj[7].x, proj[7].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Connecting edges
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(proj[i].x, proj[i].y);
        ctx.lineTo(proj[i + 4].x, proj[i + 4].y);
        ctx.stroke();
      }

      // Draw Cab Wireframe
      ctx.strokeStyle = '#FFC837';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(proj[8].x, proj[8].y);
      ctx.lineTo(proj[9].x, proj[9].y);
      ctx.lineTo(proj[10].x, proj[10].y);
      ctx.lineTo(proj[11].x, proj[11].y);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(proj[12].x, proj[12].y);
      ctx.lineTo(proj[13].x, proj[13].y);
      ctx.lineTo(proj[14].x, proj[14].y);
      ctx.lineTo(proj[15].x, proj[15].y);
      ctx.closePath();
      ctx.stroke();

      for (let i = 8; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(proj[i].x, proj[i].y);
        ctx.lineTo(proj[i + 4].x, proj[i + 4].y);
        ctx.stroke();
      }

      // 3. Draw Sub-Zero Mist Particles
      mistParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        if (p.y < -60) p.y = 40;

        const pt = project(p.x, p.y, p.z);
        if (pt.scale > 0) {
          ctx.fillStyle = '#00F59B';
          ctx.globalAlpha = 0.45 * pt.scale;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * pt.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [vanAngle]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24 sm:my-32">
      
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold uppercase backdrop-blur-md shadow-lg">
          <Truck className="w-4 h-4 text-champagne" />
          <span>Cold-Chain Fleet Journey</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-cream uppercase leading-[1.05]">
          Zero-Break <span className="gold-gradient-text">6:00 AM Delivery</span>
        </h2>

        <p className="text-sm sm:text-base text-cream/80 font-sans leading-relaxed">
          From the late-night 11:00 PM kitchen cutoff to early morning coldroom drop-off. Track our calibrated dual-temp logistics infrastructure in real time.
        </p>
      </div>

      {/* 3D Fleet Visualizer Stage */}
      <div className="rounded-[32px] p-1 bg-gradient-to-b from-emerald-500/40 via-emerald-900/50 to-obsidian-950 border border-champagne/30 shadow-[0_30px_90px_rgba(2,23,16,0.9),0_0_50px_rgba(0,245,155,0.2)] overflow-hidden">
        
        <div className="rounded-[28px] bg-obsidian-900/95 p-6 sm:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: 3D Van Simulator Canvas */}
            <div className="lg:col-span-6 relative h-[360px] sm:h-[440px] w-full rounded-3xl bg-gradient-to-b from-obsidian-950 to-obsidian-900 border border-emerald-900/70 overflow-hidden flex items-center justify-center shadow-2xl">
              <canvas ref={canvasRef} className="w-full h-full block" />

              {/* Floating Live Telemetry Badge */}
              <div className="absolute top-4 left-4 bg-obsidian-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-emerald-400/50 text-xs font-mono text-emerald-300 font-bold flex items-center gap-2 shadow-lg">
                <ThermometerSnowflake className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Probe: {activeStage.temp}</span>
              </div>

              <div className="absolute bottom-4 left-4 bg-obsidian-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-900/60 text-[11px] font-mono text-zinc-300 flex items-center gap-2 shadow-lg">
                <Rotate3d className="w-4 h-4 text-champagne animate-spin" />
                <span>3D Dual-Temp Mercedes-Benz Sprinter Fleet</span>
              </div>
            </div>

            {/* Right: 4-Stage Route Interactive Timeline */}
            <div className="lg:col-span-6 space-y-4 text-left">
              
              {ROUTE_STAGES.map((stage) => {
                const isSelected = stage.step === activeStage.step;

                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveStage(stage)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-950/95 to-obsidian-950/95 border-emerald-400 shadow-gold-glow scale-102'
                        : 'bg-obsidian-950/80 border-emerald-900/50 hover:border-emerald-700 hover:bg-obsidian-900'
                    }`}
                  >
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 shadow-md"
                      style={{ backgroundColor: `${stage.color}25`, color: stage.color }}
                    >
                      {stage.step}
                    </span>

                    <span className="space-y-1 flex-1 block">
                      <span className="flex justify-between items-center">
                        <span className="font-mono text-[11px] text-champagne font-bold uppercase">
                          {stage.time} &bull; {stage.location}
                        </span>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800">
                          {stage.temp}
                        </span>
                      </span>

                      <span className="block font-display text-base font-bold text-cream">
                        {stage.title}
                      </span>

                      <span className="block text-xs text-cream/70 font-sans leading-relaxed">
                        {stage.desc}
                      </span>
                    </span>
                  </button>
                );
              })}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
