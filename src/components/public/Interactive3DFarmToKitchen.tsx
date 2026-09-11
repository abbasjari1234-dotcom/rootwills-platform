'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Thermometer,
  Clock,
  Truck
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
  icon: React.ComponentType<{ className?: string }>;
}

const stages: Stage[] = [
  {
    id: 'intake',
    step: 'Stage 01',
    time: '03:30 AM',
    title: 'Orchard & Farm Harvest Intake',
    subtitle: 'Daily Brix Sugar & Crispness Quality Control',
    description: 'Every morning before dawn, our QA specialists inspect fresh Class 1 fruit and single-estate produce arrivals at our Digbeth Command Centre, testing sugar brix levels, firmness, and pristine stem condition.',
    image: '/images/branded/rootwills_orchard_harvest.jpg',
    metricLabel: 'Quality Pass Rate',
    metricValue: '99.4% Class 1 Grade',
    tag: 'BRCGS Inspected',
    icon: ShieldCheck,
  },
  {
    id: 'coldchain',
    step: 'Stage 02',
    time: '04:45 AM',
    title: 'Dual-Temp Chilled Staging & Loading',
    subtitle: 'Zero Thermal Break Temperature Locking',
    description: 'Orders are picked and loaded into dual-temperature Mercedes Sprinter fleet vehicles maintaining strictly monitored zones (+2°C to +4°C chilled produce and -18°C frozen) with GPS telematics.',
    image: '/images/branded/rootwills_fleet_delivery.jpg',
    metricLabel: 'Chamber Temperature',
    metricValue: '+2.4°C / -18.2°C Telemetry',
    tag: 'Active Cold-Chain',
    icon: Thermometer,
  },
  {
    id: 'kitchen',
    step: 'Stage 03',
    time: '06:00 AM',
    title: 'Direct Kitchen Pass Handover',
    subtitle: 'Pre-Shift Delivery & Digital Proof of Delivery',
    description: 'Our uniformed, vetted drivers deliver straight into your walk-in fridges and dry store pantries before your kitchen brigade clocks in. Signed via digital Proof of Delivery with zero kitchen disruption.',
    image: '/images/branded/rootwills_hero_chef_delivery.jpg',
    metricLabel: 'Arrival Reliability',
    metricValue: '99.8% On-Time SLA',
    tag: 'Signed Digital POD',
    icon: Truck,
  },
];

export function Interactive3DFarmToKitchen() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const currentStage = stages[activeStageIndex];
  const ActiveIcon = currentStage.icon;

  return (
    <div className="relative py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The 6-Hour Farm-to-Kitchen Cold-Chain Journey</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-cream tracking-tight leading-tight">
            How Produce Reaches Your Pass In{' '}
            <span className="bg-gradient-to-r from-[#FFF4D0] via-[#E4C767] to-[#C9A227] bg-clip-text text-transparent">
              Peak Crispness
            </span>.
          </h2>
          <p className="mt-3 text-cream/75 text-sm sm:text-base font-sans max-w-2xl mx-auto">
            Interact with our 3-stage cold-chain process engineered specifically for Michelin-starred kitchens, boutique hotel brigades, and high-volume catering venues.
          </p>
        </div>

        {/* Stage Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto mb-8">
          {stages.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStageIndex(idx)}
                className={`relative p-4 rounded-2xl text-left transition-all duration-300 border ${
                  isActive
                    ? 'bg-obsidian-900/90 border-champagne shadow-[0_0_25px_rgba(228,199,103,0.25)]'
                    : 'bg-obsidian-950/60 border-champagne/15 hover:border-champagne/40 hover:bg-obsidian-900/60'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-stage-glow"
                    className="absolute inset-0 rounded-2xl bg-champagne/5 border border-champagne/40 pointer-events-none block"
                    transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                  />
                )}
                <span className="flex items-center justify-between font-mono text-xs mb-1">
                  <span className={isActive ? 'text-champagne font-bold' : 'text-cream/50'}>
                    {stage.step}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-[10px] text-emerald-300 font-mono">
                    {stage.time}
                  </span>
                </span>
                <span className={`text-xs sm:text-sm font-bold font-sans block ${isActive ? 'text-cream' : 'text-cream/70'}`}>
                  {stage.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3D Interactive Stage Display with Tilt Card */}
        <ThreeDTiltCard maxTilt={6} depth={20} className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass-panel-gold p-4 sm:p-8 lg:p-10 shadow-2xl border border-champagne/25">
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
                <div className="lg:col-span-6 space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{currentStage.time}</span>
                    <span>&bull;</span>
                    <span className="text-cream">{currentStage.tag}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
                    {currentStage.title}
                  </h3>

                  <div className="text-xs sm:text-sm font-mono text-champagne/90 font-medium">
                    {currentStage.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-cream/80 leading-relaxed font-sans">
                    {currentStage.description}
                  </p>

                  {/* Telemetry Metric Card */}
                  <div className="p-4 rounded-2xl bg-obsidian-950/85 border border-champagne/20 flex items-center justify-between shadow-md">
                    <div>
                      <div className="text-[10px] font-mono text-cream/60 uppercase tracking-wider">
                        {currentStage.metricLabel}
                      </div>
                      <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400 mt-0.5">
                        {currentStage.metricValue}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2">
                    <Link
                      href="/apply"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-champagne hover:text-champagne-soft hover:underline font-bold"
                    >
                      <span>Apply for 06:00 AM Delivery Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right 3D High-Res Visual Frame */}
                <div className="lg:col-span-6 relative h-64 sm:h-84 md:h-96 w-full rounded-2xl overflow-hidden border border-champagne/30 shadow-2xl">
                  <Image
                    src={currentStage.image}
                    alt={currentStage.title}
                    fill
                    className="object-cover brightness-95 contrast-105 hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/85 via-obsidian-950/20 to-transparent" />
                  
                  {/* Floating Corner Indicator */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-obsidian-950/85 backdrop-blur-md border border-champagne/40 text-xs font-mono text-champagne font-bold shadow-lg">
                    {currentStage.step}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ThreeDTiltCard>

      </div>
    </div>
  );
}
