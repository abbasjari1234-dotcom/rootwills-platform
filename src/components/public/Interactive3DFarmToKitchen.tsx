'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ThermometerSnowflake, 
  Truck, 
  UtensilsCrossed, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Sun,
  Layers
} from 'lucide-react';
import { ThreeDTiltCard } from './ThreeDTiltCard';

interface Stage {
  id: string;
  step: string;
  time: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  metricLabel: string;
  metricValue: string;
  tag: string;
}

const stages: Stage[] = [
  {
    id: 'intake',
    step: 'Stage 01',
    time: '03:30 AM',
    title: 'Orchard & Farm Harvest Intake',
    subtitle: 'Daily Brix Sugar & Crispness Quality Control',
    description: 'Every morning before dawn, our quality inspectors inspect fresh Class 1 fruit and produce arrivals at our central Digbeth Hub, grading firmness, color, and sugar brix levels.',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1000&q=80',
    metricLabel: 'Quality Pass Rate',
    metricValue: '99.4% Class 1',
    tag: 'BRCGS Inspected',
  },
  {
    id: 'coldchain',
    step: 'Stage 02',
    time: '04:45 AM',
    title: 'Dual-Temp Chilled Staging',
    subtitle: 'Zero Thermal Break Temperature Locking',
    description: 'Orders are picked into dual-temperature vehicles maintaining strictly monitored zones (+2°C to +4°C chilled and -18°C frozen) with GPS telematics.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    metricLabel: 'Chamber Temperature',
    metricValue: '+2.4°C / -18.2°C',
    tag: 'Active Cold-Chain',
  },
  {
    id: 'kitchen',
    step: 'Stage 03',
    time: '06:30 AM',
    title: 'Direct-to-Kitchen Morning Drop-off',
    subtitle: 'Pre-Prep Kitchen Delivery & Digital POD',
    description: 'Our liveried drivers deliver straight into your walk-in fridges and dry stores before your kitchen brigade clocks in. Signed via digital Proof of Delivery.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80',
    metricLabel: 'Arrival Reliability',
    metricValue: '99.8% On-Time',
    tag: 'Signed Digital POD',
  },
];

export function Interactive3DFarmToKitchen() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const currentStage = stages[activeStageIndex];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-champagne/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono mb-4 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The 6-Hour Farm-to-Kitchen Journey</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream tracking-tight leading-tight">
            How Fresh Produce Reaches Your Pass In{' '}
            <span className="gold-gradient-text">Peak Crispness</span>.
          </h2>
          <p className="mt-4 text-cream/70 text-base sm:text-lg font-sans">
            Explore our automated cold-chain logistics engineered specifically for Michelin kitchens, luxury hotels, and high-volume catering brigades.
          </p>
        </div>

        {/* Stage Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto mb-10">
          {stages.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`relative p-4 rounded-2xl text-left transition-all duration-300 border ${
                  isActive
                    ? 'bg-zinc-900/90 border-champagne shadow-[0_0_25px_rgba(228,199,103,0.2)]'
                    : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-stage-glow"
                    className="absolute inset-0 rounded-2xl bg-champagne/5 border border-champagne/40 pointer-events-none"
                    transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                  />
                )}
                <div className="flex items-center justify-between font-mono text-xs mb-1">
                  <span className={isActive ? 'text-champagne font-bold' : 'text-zinc-500'}>
                    {stage.step}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-300">
                    {stage.time}
                  </span>
                </div>
                <div className={`text-sm font-bold font-display ${isActive ? 'text-cream' : 'text-cream/60'}`}>
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* 3D Interactive Stage Display */}
        <ThreeDTiltCard maxTilt={8} depth={25} className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-obsidian-950/90 border border-zinc-800/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Visual Details */}
                <div className="lg:col-span-6 space-y-5 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono">
                    <span>{currentStage.time}</span>
                    <span>&bull;</span>
                    <span className="text-cream">{currentStage.tag}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
                    {currentStage.title}
                  </h3>

                  <div className="text-sm font-mono text-champagne/90">
                    {currentStage.subtitle}
                  </div>

                  <p className="text-sm sm:text-base text-cream/75 leading-relaxed font-sans">
                    {currentStage.description}
                  </p>

                  {/* Telemetry Metric Card */}
                  <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                        {currentStage.metricLabel}
                      </div>
                      <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
                        {currentStage.metricValue}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Right 3D High-Res Visual Frame */}
                <div className="lg:col-span-6 relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-zinc-700/60 shadow-2xl">
                  <Image
                    src={currentStage.image}
                    alt={currentStage.title}
                    fill
                    className="object-cover brightness-90 contrast-105 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
                  
                  {/* Floating Corner Indicator */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-obsidian-950/80 backdrop-blur-md border border-zinc-700 text-xs font-mono text-champagne font-bold shadow-lg">
                    {currentStage.step}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ThreeDTiltCard>

      </div>
    </section>
  );
}
