'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Truck, 
  ThermometerSnowflake, 
  ShieldCheck, 
  Activity, 
  MapPin, 
  Clock, 
  ChevronRight,
  Sparkles,
  Layers,
  Wind
} from 'lucide-react';
import { ThreeDTiltCard } from '@/components/public/ThreeDTiltCard';

interface DepotZone {
  id: string;
  name: string;
  code: string;
  temp: string;
  humidity: string;
  status: string;
  capacity: string;
  description: string;
  color: string;
  icon: any;
}

const ZONES: DepotZone[] = [
  {
    id: 'vault',
    name: 'Hydro-Cooled Fresh Produce Vault',
    code: 'CHAMBER-A1',
    temp: '+2.4°C',
    humidity: '94% RH',
    status: 'Optimal Micro-Climate',
    capacity: '85,000 kg Live Stock',
    description: 'Continuous misting and ethylene-scrubbing air cycles keep leafy salads, heritage heirloom apples, and berries crisp straight from Kent & European farms.',
    color: '#10B981',
    icon: Wind,
  },
  {
    id: 'freezer',
    name: 'Sub-Zero Blast & Butchery Cell',
    code: 'CHAMBER-B3',
    temp: '-18.5°C',
    humidity: '65% RH',
    status: 'Dual-Inverter Stable',
    capacity: '40,000 kg Prime Butchery',
    description: 'Dry-aged British beef primal cuts, artisan game, and frozen patisserie dough held under digital telemetric temperature monitors.',
    color: '#38BDF8',
    icon: ThermometerSnowflake,
  },
  {
    id: 'dispatch',
    name: 'Dual-Temp Fleet Logistics Bay',
    code: 'DOCK-01 TO 08',
    temp: '+4.0°C Sealed Dock',
    humidity: '78% RH',
    status: 'Active Route Loading',
    capacity: '14 Dual-Temp Vans',
    description: 'Pre-cooled vehicle compartments with keyholder drop boxes for early 06:00 AM breakfast and prep deliveries across Birmingham and the Midlands.',
    color: '#E4C767',
    icon: Truck,
  },
];

export function ThreeDDepotExplorer() {
  const [activeZone, setActiveZone] = useState<DepotZone>(ZONES[0]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold uppercase">
          <Building2 className="w-3.5 h-3.5 text-champagne" />
          <span>Cold-Chain Infrastructure Digital Twin</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream">
          Digbeth Central Hub &bull; 3D Facility Map
        </h2>
        <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-sans">
          Explore our BRCGS-certified Birmingham distribution center. Every square meter is digitally monitored to eliminate thermal breaks.
        </p>
      </div>

      {/* 3D Isometric Map Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: 3D Interactive Isometric Facility Visual */}
        <div className="lg:col-span-7 relative rounded-3xl bg-gradient-to-b from-obsidian-900/90 to-obsidian-950 border border-emerald-900/60 p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-xl">
          
          <div className="flex justify-between items-center pb-4 border-b border-emerald-950">
            <span className="font-mono text-xs text-champagne font-bold uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Telemetry &bull; Digbeth Hub B5 5JR</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-400">SALSA / BRCGS Grade A</span>
          </div>

          {/* 3D Isometric Zone Grid Representation */}
          <div className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-4 [perspective:1000px]">
            {ZONES.map((zone, idx) => {
              const isSelected = zone.id === activeZone.id;
              const Icon = zone.icon;

              return (
                <motion.button
                  key={zone.id}
                  onClick={() => setActiveZone(zone)}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-48 [transform-style:preserve-3d] ${
                    isSelected
                      ? 'bg-gradient-to-b from-emerald-950/90 to-obsidian-950 border-champagne shadow-gold-glow'
                      : 'bg-obsidian-950/80 border-emerald-900/40 hover:border-emerald-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold"
                        style={{ backgroundColor: `${zone.color}20`, color: zone.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] text-zinc-400 uppercase">{zone.code}</span>
                    </div>

                    <h3 className="font-display text-sm font-bold text-cream line-clamp-2">
                      {zone.name}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-emerald-950/60 flex justify-between items-baseline">
                    <span className="font-mono text-sm font-bold" style={{ color: zone.color }}>
                      {zone.temp}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">{zone.humidity}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Live Fleet Dispatch Route Tracker Bar */}
          <div className="p-4 rounded-2xl bg-obsidian-950/90 border border-emerald-900/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-cream">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Morning Dispatch Wave: <strong>04:30 AM &ndash; 07:30 AM</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-champagne">
              <Activity className="w-3.5 h-3.5" />
              <span>99.8% On-Time Delivery Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right: Detailed Telemetry Inspector */}
        <div className="lg:col-span-5 space-y-5 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeZone.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
                <span>{activeZone.status}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-bold text-cream leading-tight">
                {activeZone.name}
              </h3>

              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
                {activeZone.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-emerald-900/60">
                  <span className="text-[10px] text-zinc-400 uppercase block">Monitored Temp</span>
                  <span className="text-base font-bold mt-0.5 block" style={{ color: activeZone.color }}>
                    {activeZone.temp}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-emerald-900/60">
                  <span className="text-[10px] text-zinc-400 uppercase block">Target Humidity</span>
                  <span className="text-base font-bold text-cream mt-0.5 block">
                    {activeZone.humidity}
                  </span>
                </div>

                <div className="col-span-2 p-4 rounded-2xl bg-obsidian-900/90 border border-emerald-900/60">
                  <span className="text-[10px] text-zinc-400 uppercase block">Active Throughput Capacity</span>
                  <span className="text-sm font-bold text-champagne mt-0.5 block">
                    {activeZone.capacity}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
