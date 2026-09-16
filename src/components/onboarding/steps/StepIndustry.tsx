'use client';

import { useState } from 'react';
import { 
  UtensilsCrossed, 
  Hotel, 
  Beer, 
  Coffee, 
  PartyPopper, 
  Building2, 
  HeartHandshake, 
  Crown, 
  Sparkles,
  Truck,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { SectorCard } from '@/components/onboarding/SectorCard';
import { SECTORS, type Sector } from '@/types/onboarding';
import { useOnboardingStore } from '@/store/onboarding-store';
import { motion } from 'framer-motion';

const ICONS: Record<Sector, typeof UtensilsCrossed> = {
  fine_dining: UtensilsCrossed,
  boutique_hotel: Hotel,
  gastropub: Beer,
  artisan_cafe: Coffee,
  luxury_catering: PartyPopper,
  contract_catering: Building2,
  care_home: HeartHandshake,
  private_club: Crown,
  other: Sparkles,
};

export function StepIndustry() {
  const { industry, setIndustry, goNext } = useOnboardingStore();
  const [selected, setSelected] = useState<Sector | undefined>(industry.sector);

  function handleSelect(sector: Sector) {
    setSelected(sector);
    setIndustry({ sector });
    // Smooth delay so the selection animation is visible before advancing.
    setTimeout(() => goNext(), 300);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold">
          Step 1 of 4 &bull; Commercial Profile
        </p>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-semibold text-emerald-800">
          <Truck className="w-3.5 h-3.5 text-emerald-600" />
          <span>06:00 AM Delivery Network</span>
        </span>
      </div>

      <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        Select your hospitality sector
      </h2>
      <p className="mt-2 max-w-xl text-slate-600 text-sm sm:text-base leading-relaxed">
        We tailor your wholesale catalogue, bulk tier pricing, and morning keyslot delivery windows to match your kitchen&apos;s operating model.
      </p>

      {/* Sector Selection Grid */}
      <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {SECTORS.map((s) => (
          <SectorCard
            key={s.value}
            label={s.label}
            description={s.description}
            tag={'tag' in s ? (s as any).tag : undefined}
            icon={ICONS[s.value]}
            selected={selected === s.value}
            onSelect={() => handleSelect(s.value)}
          />
        ))}
      </div>

      {/* Commercial Value Proposition Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-600"
      >
        <div className="flex items-center gap-2 text-slate-800 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>BRCGS Storage &amp; Distribution Food Safety Certified</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1 text-emerald-700 font-bold">
            <Percent className="w-3.5 h-3.5" />
            <span>Up to 15% Volume Discount Tier</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">&bull;</span>
          <span>11:00 PM Order Cut-off</span>
        </div>
      </motion.div>
    </div>
  );
}
