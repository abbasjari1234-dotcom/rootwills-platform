'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Leaf, 
  Truck, 
  CheckCircle2, 
  ThermometerSnowflake,
  FileCheck2
} from 'lucide-react';

const COMPLIANCE_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'BRCGS Certified',
    subtitle: 'Grade AA Storage & Distribution',
    badge: 'ISO Accredited',
  },
  {
    icon: Award,
    title: 'SALSA Approved',
    subtitle: 'Safe and Local Supplier Approval',
    badge: 'Verified Audit',
  },
  {
    icon: FileCheck2,
    title: 'Red Tractor Assured',
    subtitle: '100% British Farm Provenance',
    badge: 'Farm to Fork',
  },
  {
    icon: Leaf,
    title: 'Soil Association Organic',
    subtitle: 'Certified Organic Wholesaler',
    badge: 'GB-ORG-05',
  },
  {
    icon: ThermometerSnowflake,
    title: '+2.0°C Calibrated Cold-Lock',
    subtitle: 'Continuous HACCP Datalogging',
    badge: 'Dual-Temp SLA',
  },
  {
    icon: Truck,
    title: 'Euro VI Green Fleet',
    subtitle: 'Clean Air Zone Compliant Sprinters',
    badge: 'Low Emission',
  },
];

export function InstitutionalComplianceBar() {
  return (
    <section className="relative z-10 w-full border-y border-emerald-900/40 bg-obsidian-900/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Header Label */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-emerald-950/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase text-champagne font-bold tracking-wider">
              British Foodservice Regulatory & Quality Accreditations
            </span>
          </div>
          <span className="text-[11px] font-mono text-cream/60">
            Certified for NHS Trusts, Michelin Kitchens & Luxury Hotel Groups
          </span>
        </div>

        {/* Accreditations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {COMPLIANCE_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col justify-between p-3.5 rounded-xl bg-obsidian-950/60 border border-emerald-950/80 hover:border-champagne/40 transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/90 text-emerald-400 flex items-center justify-center border border-emerald-800/40 group-hover:text-champagne transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono text-champagne font-semibold px-1.5 py-0.5 rounded bg-champagne/10 border border-champagne/20">
                    {item.badge}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="text-xs font-bold text-cream group-hover:text-champagne transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-cream/65 leading-snug mt-0.5 font-sans">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
