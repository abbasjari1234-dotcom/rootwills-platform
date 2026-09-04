import React from 'react';
import dynamic from 'next/dynamic';

const CinematicScrollExperience = dynamic(
  () =>
    import('@/components/cinematic/CinematicScrollExperience').then(
      (mod) => mod.CinematicScrollExperience
    ),
  {
    ssr: true,
    loading: () => (
      <div className="min-h-screen bg-[#021710] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin mx-auto" />
          <div className="text-champagne/60 font-mono text-[10px] uppercase tracking-[0.3em]">
            Loading Experience
          </div>
        </div>
      </div>
    ),
  }
);

const PriceEstimator = dynamic(
  () =>
    import('@/components/public/PriceEstimator').then(
      (mod) => mod.PriceEstimator
    ),
  {
    ssr: true,
    loading: () => (
      <div className="glass-panel-gold rounded-2xl p-10 min-h-[420px] flex items-center justify-center animate-pulse">
        <div className="text-champagne font-mono text-xs uppercase tracking-wider">
          Loading Pricing Calculator...
        </div>
      </div>
    ),
  }
);

const InteractiveChefFAQ = dynamic(
  () =>
    import('@/components/public/InteractiveChefFAQ').then(
      (mod) => mod.InteractiveChefFAQ
    ),
  {
    ssr: true,
    loading: () => (
      <div className="min-h-[350px] w-full animate-pulse bg-emerald-950/20 rounded-2xl" />
    ),
  }
);

export const metadata = {
  title:
    'Rootwills | Premier UK Commercial Fresh Produce & Cold-Chain Foodservice Distributor',
  description:
    'British foodservice wholesale distributor based in Digbeth, Birmingham. Delivering single-estate fresh produce, artisan dairy, and kitchen essentials daily before 06:00 AM across the UK. BRCGS and SALSA certified.',
};

export default function PublicHomePage() {
  return (
    <div className="overflow-hidden relative">
      {/* ─── Cinematic 3D Scroll Journey (Acts I–VI) ─── */}
      <CinematicScrollExperience />

      {/* ─── Post-Experience Functional Sections ─── */}
      <div className="space-y-20 sm:space-y-28 py-20 sm:py-28 relative z-10">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <PriceEstimator />
        </section>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveChefFAQ />
        </section>
      </div>
    </div>
  );
}
