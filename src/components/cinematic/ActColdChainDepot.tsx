'use client';

import React from 'react';
import Image from 'next/image';
import { ThermometerSnowflake, Clock, Truck, MapPin } from 'lucide-react';

const depotStats = [
  { icon: ThermometerSnowflake, value: '−22°C to +8°C', label: 'Dual Temperature' },
  { icon: Clock, value: '04:00 AM', label: 'First Dispatch' },
  { icon: Truck, value: '38', label: 'Refrigerated Fleet' },
  { icon: MapPin, value: '200 mi', label: 'Delivery Radius' },
];

const corridors = [
  { name: 'Digbeth Hub', status: 'Operational', temp: '2.1°C', vehicles: 12 },
  { name: 'Midlands Corridor', status: 'Active', temp: '3.4°C', vehicles: 8 },
  { name: 'London Route', status: 'Active', temp: '2.8°C', vehicles: 10 },
  { name: 'Northern Line', status: 'Active', temp: '3.1°C', vehicles: 8 },
];

export function ActColdChainDepot() {
  return (
    <section className="act-coldchain relative w-full overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Background — Digbeth depot image */}
      <div className="act-coldchain-bg absolute inset-0">
        <Image
          src="/images/branded/rootwills_digbeth_hub.jpg"
          alt="Rootwills Digbeth distribution hub"
          fill
          className="object-cover opacity-12"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#021710] via-emerald-950/90 to-[#021710]" />
      </div>

      {/* Scanning line — ambient operational feel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="act-coldchain-scanline absolute w-full h-px bg-gradient-to-r from-transparent via-emerald-400/15 to-transparent top-0 will-change-transform" />
      </div>

      <div className="act-coldchain-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="act-coldchain-header text-center mb-14 sm:mb-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-400/70 mb-3 font-semibold">
            Cold-Chain Infrastructure
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-cream uppercase leading-[0.9]">
            Digbeth Distribution
            <br />
            <span className="emerald-gradient-text">Command Centre</span>
          </h2>
          <p className="mt-5 text-cream/50 text-sm sm:text-base max-w-lg mx-auto font-sans leading-relaxed">
            Temperature-controlled from cold store to kitchen pass.
            38 refrigerated vehicles. 200-mile radius. Every delivery before 6 AM.
          </p>
        </div>

        {/* Stats row */}
        <div className="act-coldchain-stats grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14 sm:mb-20">
          {depotStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`act-coldchain-stat-${i} glass-panel-emerald rounded-xl p-5 sm:p-6 text-center will-change-transform group`}
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-3 group-hover:border-emerald-400/40 transition-colors">
                <stat.icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-lg sm:text-xl font-display font-black text-cream tracking-tight">
                {stat.value}
              </div>
              <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-emerald-400/50 mt-1.5 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Fleet + Corridor grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Fleet image with depth */}
          <div className="act-coldchain-fleet relative rounded-2xl overflow-hidden aspect-[4/3] shadow-royal-depth will-change-transform group border border-emerald-400/30">
            <Image
              src="/images/branded/rootwills_fleet_delivery.jpg"
              alt="Rootwills refrigerated delivery fleet"
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021710]/85 via-[#021710]/20 to-transparent" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400/80 mb-1 font-semibold">
                Live Fleet Status
              </div>
              <div className="text-cream text-lg sm:text-xl font-display font-bold">
                38 Vehicles — All Routes Active
              </div>
            </div>
            {/* Floating temperature badge */}
            <div className="absolute top-4 right-4 glass-panel-emerald rounded-lg px-3 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] text-emerald-300 uppercase tracking-wider font-bold">
                2.1°C Core
              </span>
            </div>
          </div>

          {/* Distribution corridors */}
          <div className="act-coldchain-corridors flex flex-col">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/35 mb-4 font-semibold">
              Distribution Corridors
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {corridors.map((corridor, i) => (
                <div
                  key={corridor.name}
                  className={`act-coldchain-corridor-${i} glass-panel rounded-xl px-5 py-4 flex items-center justify-between will-change-transform hover:border-emerald-400/30 transition-all duration-400 cursor-default group flex-1`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                    <div>
                      <div className="text-sm font-sans font-semibold text-cream group-hover:text-emerald-300 transition-colors">
                        {corridor.name}
                      </div>
                      <div className="text-[10px] font-mono text-cream/35 uppercase tracking-wider">
                        {corridor.status}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 text-right">
                    <div>
                      <div className="text-sm font-mono text-emerald-400 font-semibold">
                        {corridor.temp}
                      </div>
                      <div className="text-[8px] font-mono text-cream/25 uppercase tracking-wider">
                        Core Temp
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-mono text-cream/70 font-semibold">
                        {corridor.vehicles}
                      </div>
                      <div className="text-[8px] font-mono text-cream/25 uppercase tracking-wider">
                        Vehicles
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
