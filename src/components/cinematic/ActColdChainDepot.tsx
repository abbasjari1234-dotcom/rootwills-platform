'use client';

import React from 'react';
import Image from 'next/image';
import { 
  ThermometerSnowflake, 
  Clock, 
  Truck, 
  MapPin, 
  Activity, 
  ShieldCheck, 
  Radio, 
  Navigation,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

const depotStats = [
  { 
    icon: ThermometerSnowflake, 
    index: 'ZONE 01',
    value: '−22°C to +8°C', 
    unit: 'Range',
    label: 'Dual-Zone Controlled',
    tag: 'Frozen & Chilled Sync',
    detail: 'Digital multi-temp bulkheads maintain independent sub-zero and chilled microclimates.',
  },
  { 
    icon: Clock, 
    index: 'SLA 02',
    value: '04:00', 
    unit: 'AM',
    label: 'First Morning Dispatch',
    tag: 'Pre-Dawn City Access',
    detail: 'Loading commences at 03:15 AM with all urban delivery runs completed before kitchen prep.',
  },
  { 
    icon: Truck, 
    index: 'FLEET 03',
    value: '38', 
    unit: 'Vans',
    label: 'Dedicated Refrigerated Fleet',
    tag: '100% Direct Operations',
    detail: 'Liveried Mercedes-Benz and DAF commercial vehicles with live telemetry tracking.',
  },
  { 
    icon: MapPin, 
    index: 'RADIUS 04',
    value: '200', 
    unit: 'Miles',
    label: 'Depot Operational Radius',
    tag: 'Midlands & National Hubs',
    detail: 'Daily express corridors spanning Birmingham, the Cotswolds, London, and Manchester.',
  },
];

const corridors = [
  { 
    code: 'CORRIDOR 01',
    name: 'Digbeth Central Hub', 
    route: 'BHM Urban Core & Jewellery Quarter',
    status: 'Operational', 
    temp: '2.1°C', 
    tempSafe: true,
    vehicles: 12,
    window: '04:00 – 05:30 AM',
  },
  { 
    code: 'CORRIDOR 02',
    name: 'Midlands & Cotswolds Arteries', 
    route: 'M42 / M5 South — Solihull to Cheltenham',
    status: 'Active En-Route', 
    temp: '3.4°C', 
    tempSafe: true,
    vehicles: 8,
    window: '04:30 – 06:00 AM',
  },
  { 
    code: 'CORRIDOR 03',
    name: 'London & Capital Express Line', 
    route: 'M40 Southern Trunk — Mayfair & Soho Direct',
    status: 'Active En-Route', 
    temp: '2.8°C', 
    tempSafe: true,
    vehicles: 10,
    window: '03:45 – 05:45 AM',
  },
  { 
    code: 'CORRIDOR 04',
    name: 'Northern Line (M6 Corridor)', 
    route: 'M6 North — Manchester & Leeds Cross-Dock',
    status: 'Active En-Route', 
    temp: '3.1°C', 
    tempSafe: true,
    vehicles: 8,
    window: '04:15 – 06:00 AM',
  },
];

export function ActColdChainDepot() {
  return (
    <section id="act-coldchain" className="act-coldchain relative w-full overflow-hidden pt-4 sm:pt-8 lg:pt-10 pb-8 sm:pb-12 lg:pb-14 bg-[#021710]">
      {/* Background — Digbeth depot image with multi-layered atmospheric lighting */}
      <div className="act-coldchain-bg absolute inset-0 pointer-events-none will-change-transform overflow-hidden">
        <Image
          src="/images/branded/rootwills_digbeth_hub.jpg"
          alt="Rootwills Digbeth distribution hub"
          fill
          className="object-cover opacity-20 scale-105 [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]"
          sizes="100vw"
        />
        {/* Dynamic atmospheric gradients eliminating the dark void */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#021710] via-[#021710]/80 to-[#021710]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(228,199,103,0.12),_transparent_65%)]" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[300px] bg-champagne/8 rounded-full blur-[120px] pointer-events-none" />
        
        {/* High-tech telemetry grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4c76706_1px,transparent_1px),linear-gradient(to_bottom,#e4c76706_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
      </div>

      {/* Seamless top blend from Act II */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#021710] via-[#021710]/95 to-transparent pointer-events-none z-[5]" />

      {/* Seamless bottom fade into Act IV to eliminate gaps and image seams */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#021710] via-[#021710]/95 to-transparent pointer-events-none z-[5]" />

      {/* Scanning radar line — ambient operational command feel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="act-coldchain-scanline absolute w-full h-[2px] bg-gradient-to-r from-transparent via-champagne/40 to-transparent top-0 will-change-transform shadow-[0_0_15px_rgba(228,199,103,0.5)]" />
      </div>

      <div className="act-coldchain-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="act-coldchain-header text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-champagne/30 text-champagne text-[11px] font-mono uppercase tracking-[0.25em] font-semibold mb-5 shadow-[0_0_25px_rgba(228,199,103,0.18)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>Digbeth Logistics Command &bull; Live Fleet Telemetry</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-cream uppercase leading-[0.92] tracking-tight">
            Digbeth Distribution
            <br />
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F6E199] to-[#C59B27] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(228,199,103,0.3)]">
              Command Centre
            </span>
          </h2>
          
          <p className="mt-5 text-cream/85 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            Temperature-controlled from cold store to kitchen pass &bull; 38 multi-temp vehicles &bull; 200-mile West Midlands &amp; national radius &bull; Every delivery before 06:00 AM.
          </p>
        </div>

        {/* 4 Telemetry Metrics Cards */}
        <div className="act-coldchain-stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14 sm:mb-20">
          {depotStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`act-coldchain-stat-${i} glass-panel-emerald rounded-2xl p-6 text-left will-change-transform group relative overflow-hidden border border-emerald-400/30 hover:border-emerald-400/70 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.2)] transition-all duration-500 flex flex-col justify-between`}
            >
              {/* Top metallic shimmer accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center group-hover:scale-105 group-hover:border-emerald-300 transition-all shadow-sm">
                    <stat.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-obsidian-950/80 border border-emerald-500/30 font-mono text-[10px] text-emerald-300 font-bold tracking-wider">
                    {stat.index}
                  </span>
                </div>

                <div className="flex items-baseline gap-1.5 mb-1">
                  <div className="text-2xl sm:text-3xl font-display font-black text-cream tracking-tight group-hover:text-emerald-300 transition-colors">
                    {stat.value}
                  </div>
                  {stat.unit && (
                    <div className="text-xs font-mono text-emerald-400/80 font-bold uppercase">
                      {stat.unit}
                    </div>
                  )}
                </div>

                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-400 font-bold mb-2.5">
                  {stat.label}
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-obsidian-950/80 border border-emerald-500/20 text-[10px] font-mono text-emerald-300/90 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{stat.tag}</span>
                </div>
              </div>

              <p className="text-[11px] font-sans text-cream/70 leading-relaxed pt-2 border-t border-emerald-500/15">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Fleet Monitor + Distribution Corridors Ledger */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left: Fleet Live Telemetry HUD Monitor (5 Cols on large) */}
          <div className="lg:col-span-5 act-coldchain-fleet relative rounded-2xl overflow-hidden shadow-royal-depth will-change-transform group border border-emerald-400/40 hover:border-emerald-400/70 transition-all duration-500 flex flex-col justify-between bg-obsidian-950">
            {/* Top Command Monitor Bar */}
            <div className="relative z-20 px-5 py-3.5 bg-obsidian-950/90 backdrop-blur-md border-b border-emerald-500/25 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="font-mono text-[10px] text-cream uppercase tracking-widest font-bold">
                  VEHICLE #04 &bull; LIVE PASS
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/40">
                <ThermometerSnowflake className="w-3 h-3 text-emerald-400" />
                <span className="font-mono text-[10px] text-emerald-300 font-bold">
                  2.1°C CORE
                </span>
              </div>
            </div>

            {/* High-Impact Image with Depth */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/branded/rootwills_fleet_delivery.jpg"
                alt="Rootwills refrigerated delivery fleet morning drop"
                fill
                className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#021710] via-transparent to-transparent opacity-90" />
              
              {/* GPS coordinates watermark */}
              <div className="absolute top-3 left-4 font-mono text-[9px] text-cream/70 tracking-widest bg-obsidian-950/80 px-2 py-0.5 rounded border border-emerald-500/20">
                52.478° N, 1.884° W &bull; DIGBETH FLEET
              </div>
            </div>

            {/* Bottom HUD Telemetry Card */}
            <div className="relative z-20 p-5 sm:p-6 bg-gradient-to-t from-obsidian-950 via-obsidian-950/95 to-obsidian-950/80 border-t border-emerald-500/20">
              <div className="flex items-center justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Dispatch Feed</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-wider">
                  Verified Route
                </span>
              </div>

              <div className="text-cream text-lg sm:text-xl font-display font-bold mb-2">
                The Crown & Willow &bull; Morning Drop
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-500/15">
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-cream/50">
                    Fleet Status
                  </div>
                  <div className="text-xs font-mono text-cream font-semibold flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    38 Active Runs
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-cream/50">
                    Target SLA
                  </div>
                  <div className="text-xs font-mono text-champagne font-semibold mt-0.5">
                    Before 06:00 AM
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Distribution Corridors Ledger (7 Cols on large) */}
          <div className="lg:col-span-7 act-coldchain-corridors flex flex-col justify-between">
            {/* Header of Ledger */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400 font-bold">
                  Active Transit Corridors
                </div>
              </div>
              <div className="font-mono text-[10px] text-cream/60 uppercase tracking-wider">
                Telemetry Synced: 38 / 38 Vans
              </div>
            </div>

            {/* Corridors List */}
            <div className="flex flex-col gap-3.5 flex-1">
              {corridors.map((corridor, i) => (
                <div
                  key={corridor.name}
                  className={`act-coldchain-corridor-${i} glass-panel rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 will-change-transform border border-emerald-500/25 hover:border-emerald-400/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(16,185,129,0.15)] transition-all duration-400 cursor-default group`}
                >
                  {/* Left info: Route name and details */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                          {corridor.code}
                        </span>
                        <span className="font-mono text-[10px] text-champagne/90 font-medium">
                          {corridor.window}
                        </span>
                      </div>
                      <div className="text-base font-sans font-bold text-cream group-hover:text-emerald-300 transition-colors">
                        {corridor.name}
                      </div>
                      <div className="text-xs text-cream/60 font-sans mt-0.5">
                        {corridor.route}
                      </div>
                    </div>
                  </div>

                  {/* Right telemetry readout */}
                  <div className="flex items-center gap-5 sm:gap-6 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-emerald-500/15 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Temperature gauge */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-sm font-mono text-emerald-400 font-black">
                        <ThermometerSnowflake className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{corridor.temp}</span>
                      </div>
                      <div className="text-[9px] font-mono text-emerald-300/70 uppercase tracking-wider font-semibold">
                        Core Temp
                      </div>
                    </div>

                    {/* Vehicles count */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-sm font-mono text-cream font-black">
                        <Truck className="w-3.5 h-3.5 text-cream/60" />
                        <span>{corridor.vehicles}</span>
                      </div>
                      <div className="text-[9px] font-mono text-cream/50 uppercase tracking-wider font-semibold">
                        Fleet Assigned
                      </div>
                    </div>

                    {/* Status pill */}
                    <div className="hidden md:flex flex-col items-end">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 font-mono text-[9px] text-emerald-300 font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                        {corridor.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom summary indicator */}
            <div className="mt-4 px-4 py-3 rounded-xl bg-obsidian-950/60 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-cream/70">
              <div className="flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Central Hub: Digbeth, Birmingham B5 6DY</span>
              </div>
              <div className="text-emerald-400 font-semibold flex items-center gap-1">
                <span>HACCP Dual-Temp Protocol Active</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
