'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Snowflake, 
  Truck, 
  Clock, 
  Radio, 
  MapPin, 
  ShieldCheck, 
  ThermometerSnowflake, 
  ArrowUpRight,
  Activity,
  Navigation
} from 'lucide-react';

const depotStats = [
  { 
    icon: Snowflake, 
    index: 'ZONE 01',
    value: '–22°C to +8°C', 
    unit: 'Range',
    label: 'Dual-Zone Controlled',
    tag: 'Frozen & Chilled Sync',
    detail: 'Digital multi-temp bulkheads maintain independent sub-zero and chilled microclimates simultaneously.',
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
    detail: 'Liveried Mercedes-Benz commercial fleet with live GPS and hold-temperature telemetry tracking.',
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
    name: 'Digbeth Central Hub & Urban Pass', 
    route: 'Birmingham Central, Edgbaston & Jewellery Quarter',
    status: 'Operational', 
    temp: '2.1°C', 
    tempSafe: true,
    vehicles: 12,
    window: '04:00 – 05:30 AM',
  },
  { 
    code: 'CORRIDOR 02',
    name: 'Midlands & Cotswolds Arteries', 
    route: 'M42 / M5 South — Solihull to Cheltenham & Stratford',
    status: 'Active En-Route', 
    temp: '3.4°C', 
    tempSafe: true,
    vehicles: 8,
    window: '04:30 – 06:00 AM',
  },
  { 
    code: 'CORRIDOR 03',
    name: 'London & Capital Express Line', 
    route: 'M40 Southern Trunk — Mayfair, Soho & City Direct',
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
    <section 
      id="act-coldchain" 
      className="act-coldchain relative w-full overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 bg-[#021710]"
    >
      {/* Background — Digbeth depot image with multi-layered atmospheric lighting */}
      <div className="act-coldchain-bg absolute inset-0 pointer-events-none will-change-transform overflow-hidden">
        <Image
          src="/images/branded/rootwills_digbeth_hub.jpg"
          alt="Rootwills Digbeth distribution hub"
          fill
          className="object-cover opacity-15 scale-105 [mask-image:linear-gradient(to_bottom,transparent_0%,black_25%,black_75%,transparent_100%)]"
          sizes="100vw"
        />
        {/* Soft diffused warm champagne & royal botanical depth halos (No harsh green cast) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#021710] via-[#021710]/85 to-[#021710]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-champagne/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[350px] bg-emerald-500/8 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 dot-grid-texture opacity-20 pointer-events-none" />
      </div>

      {/* Seamless top & bottom blends */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#021710] to-transparent pointer-events-none z-[5]" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#021710] to-transparent pointer-events-none z-[5]" />

      <div className="act-coldchain-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="act-coldchain-header text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-champagne/30 text-champagne text-[11px] font-mono uppercase tracking-[0.28em] font-semibold mb-5 shadow-[0_0_25px_rgba(228,199,103,0.18)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Digbeth Logistics Command &bull; Live Fleet Telemetry</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-cream uppercase leading-[0.95] tracking-tight">
            Digbeth Distribution
            <br />
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F6E199] to-[#C59B27] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(228,199,103,0.3)]">
              Command Centre
            </span>
          </h2>
          
          <p className="mt-4 text-cream/85 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Temperature-controlled from cold store to kitchen pass &bull; 38 multi-temp vehicles &bull; 200-mile West Midlands &amp; national radius &bull; Every delivery before 06:00 AM.
          </p>
        </div>

        {/* 4 Telemetry Metrics Cards — Unified Luxury Obsidian & Champagne */}
        <div className="act-coldchain-stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14 sm:mb-18">
          {depotStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`act-coldchain-stat-${i} rounded-2xl p-6 text-left will-change-transform group relative overflow-hidden bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 hover:border-champagne hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_30px_rgba(228,199,103,0.2)] transition-all duration-500 flex flex-col justify-between`}
            >
              {/* Top metallic shimmer accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center group-hover:scale-105 group-hover:border-champagne group-hover:shadow-[0_0_15px_rgba(228,199,103,0.3)] transition-all shadow-sm">
                    <stat.icon className="w-5 h-5 text-champagne" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-obsidian-900/90 border border-champagne/30 font-mono text-[10px] text-champagne font-bold tracking-wider">
                    {stat.index}
                  </span>
                </div>

                <div className="flex items-baseline gap-1.5 mb-1">
                  <div className="text-2xl sm:text-3xl font-display font-black text-cream tracking-tight group-hover:text-champagne transition-colors">
                    {stat.value}
                  </div>
                  {stat.unit && (
                    <div className="text-xs font-mono text-champagne font-bold uppercase">
                      {stat.unit}
                    </div>
                  )}
                </div>

                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-champagne font-semibold mb-2">
                  {stat.label}
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-obsidian-900 border border-champagne/20 text-[10px] font-mono text-champagne/90 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{stat.tag}</span>
                </div>
              </div>

              <p className="text-xs font-sans text-cream/75 leading-relaxed pt-3 border-t border-champagne/15">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Fleet Monitor + Distribution Corridors Ledger */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left: Fleet Live Telemetry HUD Monitor (5 Cols) */}
          <div className="lg:col-span-5 act-coldchain-fleet relative rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] will-change-transform group border border-champagne/30 hover:border-champagne transition-all duration-500 flex flex-col justify-between bg-obsidian-950">
            {/* Top Command Monitor Bar */}
            <div className="relative z-20 px-5 py-3.5 bg-obsidian-950/95 backdrop-blur-md border-b border-champagne/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="font-mono text-[10px] text-cream uppercase tracking-widest font-bold">
                  VEHICLE #04 &bull; LIVE PASS
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-champagne/10 border border-champagne/30">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-champagne" />
                <span className="font-mono text-[10px] text-champagne font-bold">
                  2.1°C CORE
                </span>
              </div>
            </div>

            {/* High-Impact Fleet Image with Depth */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/branded/rootwills_fleet_delivery.jpg"
                alt="Rootwills refrigerated delivery fleet morning drop"
                fill
                className="object-cover group-hover:scale-[1.04] transition-transform duration-700 brightness-95"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />
              
              {/* GPS coordinates watermark */}
              <div className="absolute top-3 left-4 font-mono text-[9px] text-cream/80 tracking-widest bg-obsidian-950/85 px-2.5 py-1 rounded-lg border border-champagne/25 shadow-md">
                52.478° N, 1.884° W &bull; DIGBETH FLEET
              </div>
            </div>

            {/* Bottom HUD Telemetry Card */}
            <div className="relative z-20 p-5 sm:p-6 bg-gradient-to-t from-obsidian-950 via-obsidian-950/95 to-obsidian-950/80 border-t border-champagne/20">
              <div className="flex items-center justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-champagne" />
                  <span>Live Dispatch Feed</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-wider">
                  Verified Route
                </span>
              </div>

              <div className="text-cream text-lg sm:text-xl font-display font-bold mb-2">
                The Crown &amp; Willow &bull; Morning Drop
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-champagne/15">
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

          {/* Right: Distribution Corridors Ledger (7 Cols) */}
          <div className="lg:col-span-7 act-coldchain-corridors flex flex-col justify-between">
            {/* Header of Ledger */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-champagne animate-pulse" />
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-champagne font-bold">
                  Active Transit Corridors
                </div>
              </div>
              <div className="font-mono text-[10px] text-cream/60 uppercase tracking-wider">
                Telemetry Synced: 38 / 38 Vans
              </div>
            </div>

            {/* Corridors List — Unified Frosted Obsidian Glass */}
            <div className="flex flex-col gap-3 flex-1">
              {corridors.map((corridor, i) => (
                <div
                  key={corridor.name}
                  className={`act-coldchain-corridor-${i} rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 will-change-transform bg-obsidian-950/85 backdrop-blur-xl border border-champagne/20 hover:border-champagne hover:shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(228,199,103,0.15)] transition-all duration-300 cursor-default group`}
                >
                  {/* Left info: Route name and details */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[9px] text-champagne font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-champagne/10 border border-champagne/25">
                          {corridor.code}
                        </span>
                        <span className="font-mono text-[10px] text-champagne/80 font-medium">
                          {corridor.window}
                        </span>
                      </div>
                      <div className="text-base font-sans font-bold text-cream group-hover:text-champagne transition-colors">
                        {corridor.name}
                      </div>
                      <div className="text-xs text-cream/65 font-sans mt-0.5">
                        {corridor.route}
                      </div>
                    </div>
                  </div>

                  {/* Right telemetry readout */}
                  <div className="flex items-center gap-5 sm:gap-6 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-champagne/15 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Temperature gauge */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-sm font-mono text-champagne font-bold">
                        <ThermometerSnowflake className="w-3.5 h-3.5 text-champagne" />
                        <span>{corridor.temp}</span>
                      </div>
                      <div className="text-[9px] font-mono text-cream/60 uppercase tracking-wider">
                        Core Temp
                      </div>
                    </div>

                    {/* Vehicles count */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-sm font-mono text-cream font-bold">
                        <Truck className="w-3.5 h-3.5 text-champagne" />
                        <span>{corridor.vehicles}</span>
                      </div>
                      <div className="text-[9px] font-mono text-cream/60 uppercase tracking-wider">
                        Fleet Assigned
                      </div>
                    </div>

                    {/* Status pill */}
                    <div className="hidden md:flex flex-col items-end">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 font-mono text-[9px] text-emerald-300 font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        {corridor.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom summary indicator */}
            <div className="mt-3.5 px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-cream/75">
              <div className="flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-champagne" />
                <span>Central Hub: Digbeth, Birmingham B5 6DY</span>
              </div>
              <div className="text-emerald-400 font-semibold flex items-center gap-1">
                <span>HACCP Dual-Temp Protocol Active</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-champagne" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
