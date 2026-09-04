'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Truck, 
  Clock, 
  ThermometerSnowflake, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  Navigation,
  Building2,
  Gauge
} from 'lucide-react';

interface RouteDepot {
  id: string;
  name: string;
  type: 'Central Hub' | 'Dedicated Route' | 'Regional Link';
  postcode: string;
  transitSLA: string;
  operatingTemp: string;
  capacity: string;
  coverage: string[];
  vehicleSpec: string;
  highlights: string[];
}

const DEPOT_ROUTES: RouteDepot[] = [
  {
    id: 'digbeth-hub',
    name: 'Digbeth Central Fulfilment Hub',
    type: 'Central Hub',
    postcode: 'Birmingham B5 5JR',
    transitSLA: 'Pre-06:00 AM Guaranteed Drop',
    operatingTemp: '+2.0°C Chilled / -18°C Frozen / 14°C Ambient',
    capacity: '45,000 sq ft Dual-Temperature Vault',
    coverage: [
      'Birmingham City Centre & Jewellery Quarter',
      'Edgbaston, Solihull & Sutton Coldfield',
      'Coventry & Warwickshire Hospitality Hubs',
      'Wolverhampton & Black Country Gastropubs'
    ],
    vehicleSpec: 'Dedicated Mercedes-Benz Sprinter Dual-Temp Fleet (Euro VI)',
    highlights: [
      'Nightly cross-docking from single-estate British growers',
      'Automated optical grading and temperature logging prior to loading',
      'Zero intermediate holding — farm harvest to kitchen pass in <14 hours'
    ]
  },
  {
    id: 'midlands-michelin',
    name: 'Midlands Fine Dining & Hotel Arterial',
    type: 'Dedicated Route',
    postcode: 'West Midlands & Cotswolds Corridor',
    transitSLA: '05:30 AM – 06:45 AM Drop Window',
    operatingTemp: '+2.2°C Calibrated Leaf & Berry Compartment',
    capacity: '18 Daily Active Multi-Temp Vans',
    coverage: [
      'Stratford-upon-Avon & Cotswolds Boutique Hotels',
      'Leamington Spa & Warwick Luxury Dining',
      'Malvern & Worcestershire Country Inns',
      'NEC & Birmingham Airport Commercial Catering'
    ],
    vehicleSpec: 'Calibrated GAH Refrigeration Units with Live GPS Telematics',
    highlights: [
      'Driver key-drop service with direct cold-room placement',
      'Digital time-stamped delivery manifests with kitchen photo audit',
      'Full emergency same-day replenishment backup dispatch available'
    ]
  },
  {
    id: 'london-southeast',
    name: 'London & Kent Single-Estate Express Link',
    type: 'Regional Link',
    postcode: 'M40 / M25 Distribution Corridor',
    transitSLA: 'Direct Overnight Grower Trunking',
    operatingTemp: '+3.0°C Controlled Atmosphere',
    capacity: 'Direct Orchard Farm-Gate Sourcing',
    coverage: [
      'Kent Fruit & Heritage Orchard Estates',
      'New Covent Garden Wholesale Market Link',
      'Thames Valley & Berkshire Country Clubs',
      'London Central Hotel & Restaurant Accounts'
    ],
    vehicleSpec: 'Scania Dual-Temp Rigids & Sprinters with Transicold Units',
    highlights: [
      'Daily 03:00 AM pickup direct from certified Kent grower packhouses',
      'Rapid chilling within 60 minutes of tree-picking',
      'SALSA & Red Tractor certified farm-to-fork chain of custody'
    ]
  },
  {
    id: 'northern-link',
    name: 'Northern Hospitality Link',
    type: 'Regional Link',
    postcode: 'M6 Northbound Corridor',
    transitSLA: '06:00 AM Next-Day Delivery',
    operatingTemp: '+2.0°C to +4.0°C Chilled Vault',
    capacity: 'Scheduled Multi-Drop Logistics',
    coverage: [
      'Manchester City Centre & Ancoats Kitchens',
      'Cheshire & Knutsford Fine Dining Corridors',
      'Leeds Commercial Dining & University Groups',
      'Sheffield & Peak District Boutique Venues'
    ],
    vehicleSpec: 'Dual-Compartment Euro VI Fleet with Digital Temperature Audit',
    highlights: [
      'Evening 11:00 PM cutoff fulfilled for 06:00 AM northern drop',
      'Dedicated key account logistics coordinator on call 24/7',
      'Locked wholesale contract pricing guaranteed across all northern sites'
    ]
  }
];

export function SupplyChainLogisticsMap() {
  const [activeRouteId, setActiveRouteId] = useState('digbeth-hub');
  const activeRoute = DEPOT_ROUTES.find((r) => r.id === activeRouteId) || DEPOT_ROUTES[0];

  return (
    <section className="relative z-10 w-full py-20 bg-obsidian-950 border-t border-emerald-900/40 overflow-hidden">
      
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[450px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-emerald-950/80">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase backdrop-blur-md">
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>UK Cold-Chain Distribution Infrastructure</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream uppercase leading-[1.05]">
              National Reach. <span className="gold-gradient-text">Midlands Heart.</span>
            </h2>

            <p className="text-sm sm:text-base text-cream/80 font-sans leading-relaxed">
              Operating from our 45,000 sq ft central distribution facility in Digbeth, Birmingham, Rootwills powers next-morning fresh foodservice delivery across the UK with zero thermal breaks.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 p-4 rounded-2xl bg-obsidian-900/90 border border-emerald-900/80 shadow-xl font-mono text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] text-cream/50 uppercase block">Daily Transit SLA</span>
              <span className="text-champagne font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Guaranteed Pre-6AM</span>
              </span>
            </div>
            <div className="h-8 w-px bg-emerald-900/80 hidden sm:block" />
            <div className="space-y-0.5">
              <span className="text-[10px] text-cream/50 uppercase block">Central Depots</span>
              <span className="text-cream font-bold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-champagne" />
                <span>Digbeth, B5 5JR</span>
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Grid: Route Selector (Left) + Logistics Terminal Specs (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Route Network Tabs */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono uppercase text-champagne font-bold tracking-wider px-1">
              Select Distribution Corridor:
            </div>

            <div className="space-y-3">
              {DEPOT_ROUTES.map((route) => {
                const isActive = route.id === activeRouteId;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => setActiveRouteId(route.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden group ${
                      isActive 
                        ? 'bg-emerald-950/80 border-champagne shadow-[0_0_25px_rgba(228,199,103,0.18)]' 
                        : 'bg-obsidian-900/70 border-emerald-900/60 hover:border-emerald-700/60 hover:bg-obsidian-900/90'
                    }`}
                  >
                    {/* Active Accent Strip */}
                    {isActive && (
                      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-champagne via-emerald-400 to-champagne" />
                    )}

                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className={`font-semibold ${isActive ? 'text-champagne' : 'text-cream/60'}`}>
                        {route.type}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        {route.transitSLA}
                      </span>
                    </div>

                    <h3 className="font-display text-base sm:text-lg font-bold text-cream group-hover:text-champagne transition-colors">
                      {route.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-2 text-xs text-cream/70 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{route.postcode}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Direct Logistics Phone Hotline Card */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-900/60 flex items-center justify-between gap-4 mt-6">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-champagne font-bold block">
                  Transport & Routing Desk
                </span>
                <span className="text-xs text-cream/80 font-sans">
                  Need a priority delivery window for your kitchen?
                </span>
              </div>
              <a
                href="tel:01217908800"
                className="px-3.5 py-2 rounded-xl bg-champagne text-obsidian-950 font-mono text-xs font-bold shadow-gold-glow hover:brightness-110 flex items-center gap-1.5 transition-all shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>0121 790 8800</span>
              </a>
            </div>
          </div>

          {/* Right Column: Terminal Specification & Route Overview */}
          <div className="lg:col-span-7 bg-obsidian-900/90 border border-emerald-900/70 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl relative">
            
            {/* Top Header of Selected Route */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-950/80">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-champagne font-bold">
                  Active Logistics Corridor Spec
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
                  {activeRoute.name}
                </h3>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeRoute.operatingTemp}</span>
              </div>
            </div>

            {/* High-Resolution Operational Depot Visual */}
            <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden border border-emerald-900/50 shadow-inner group">
              <Image
                src="/images/branded/rootwills_cinematic_depot_reel.jpg"
                alt="Rootwills Digbeth Central Hub Logistics Operation"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover brightness-90 contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />
              
              {/* Overlay HUD Telemetry */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-cream/90">
                <div className="flex items-center gap-2 bg-obsidian-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-champagne/30 text-champagne">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>FACILITY SPEC: {activeRoute.capacity}</span>
                </div>
                <div className="bg-obsidian-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-900/60 text-emerald-300">
                  {activeRoute.vehicleSpec}
                </div>
              </div>
            </div>

            {/* Corridor Coverage Area List */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase text-champagne font-bold tracking-wider">
                Key Hospitality & Commercial Hubs Served:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeRoute.coverage.map((area, aIdx) => (
                  <div 
                    key={aIdx} 
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-obsidian-950/70 border border-emerald-950 text-xs font-sans text-cream/85"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality & Cold-Chain Highlights */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono uppercase text-champagne font-bold tracking-wider">
                Cold-Chain Operating Standards:
              </div>
              <div className="space-y-2">
                {activeRoute.highlights.map((highlight, hIdx) => (
                  <div 
                    key={hIdx} 
                    className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-cream/80 leading-relaxed"
                  >
                    <ShieldCheck className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Account Action */}
            <div className="pt-4 border-t border-emerald-950/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-sans text-cream/70 text-center sm:text-left">
                Join over 400 Midland and UK commercial kitchens on scheduled morning runs.
              </div>
              <Link
                href="/apply"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs font-mono shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all"
              >
                <span>Apply for Depot Route Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
