'use client';

import { useState } from 'react';
import { UtensilsCrossed, Building2, PartyPopper, Crown, Coffee, Sparkles } from 'lucide-react';
import { SectorCard } from '@/components/onboarding/SectorCard';
import { SECTORS, type Sector } from '@/types/onboarding';
import { useOnboardingStore } from '@/store/onboarding-store';

const ICONS: Record<Sector, typeof UtensilsCrossed> = {
  fine_dining: UtensilsCrossed,
  boutique_hotel: Building2,
  luxury_catering: PartyPopper,
  private_club: Crown,
  artisan_cafe: Coffee,
  other: Sparkles,
};

export function StepIndustry() {
  const { industry, setIndustry, goNext } = useOnboardingStore();
  const [selected, setSelected] = useState<Sector | undefined>(industry.sector);

  function handleSelect(sector: Sector) {
    setSelected(sector);
    setIndustry({ sector });
    // Small delay so the selection animation is visible before advancing.
    setTimeout(() => goNext(), 350);
  }

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-champagne">Step 1 of 4</p>
      <h2 className="mt-3 font-display text-3xl font-light text-cream md:text-4xl">
        Which best describes your business?
      </h2>
      <p className="mt-3 max-w-lg font-light text-cream/50">
        We'll tailor the questions that follow — and your eventual catalog — to your sector.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTORS.map((s) => (
          <SectorCard
            key={s.value}
            label={s.label}
            description={s.description}
            icon={ICONS[s.value]}
            selected={selected === s.value}
            onSelect={() => handleSelect(s.value)}
          />
        ))}
      </div>
    </div>
  );
}
