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

      {/* ─── Post-Experience Functional Sections with Seamless Ambient Blending ─── */}
      <div className="relative z-10 space-y-20 sm:space-y-24 py-16 sm:py-24">
        {/* Subtle Ambient Depth Lighting behind functional sections */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-emerald-500/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[350px] bg-champagne/6 rounded-full blur-[130px]" />
        </div>

        {/* Elegant Gold Section Divider */}
        <div className="section-divider" />

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <PriceEstimator />
        </section>

        {/* Elegant Gold Section Divider */}
        <div className="section-divider" />

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveChefFAQ />
        </section>
      </div>
    </div>
  );
}
