import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Truck, 
  ShieldCheck, 
  Award, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  UtensilsCrossed, 
  Hotel, 
  HeartHandshake, 
  PartyPopper, 
  Beer, 
  GraduationCap, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  Repeat, 
  FileText,
  MapPin,
  ChevronRight,
  ShieldAlert,
  Zap,
  PhoneCall,
  Check,
  Leaf,
  Rotate3d,
  Box,
  Flame,
  Scale
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { Ultra3DWorldHero } from '@/components/3d/Ultra3DWorldHero';
import { Interactive3DConveyorCrate } from '@/components/3d/Interactive3DConveyorCrate';
import { MeatopiaCulinaryStrip } from '@/components/public/MeatopiaCulinaryStrip';
import { Hyper3DHeroShowcase } from '@/components/public/Hyper3DHeroShowcase';
import { ThreeDFleetJourney } from '@/components/3d/ThreeDFleetJourney';
import { ThreeDCulinaryGrid } from '@/components/3d/ThreeDCulinaryGrid';
import { ThreeDProductShowcase } from '@/components/public/ThreeDProductShowcase';
import { ThreeDTiltCard } from '@/components/public/ThreeDTiltCard';

const PriceEstimator = dynamic(
  () => import('@/components/public/PriceEstimator').then((mod) => mod.PriceEstimator),
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

export const metadata = {
  title: 'Rootwills Ltd | 3D Interactive B2B Foodservice & Fresh Produce Wholesale UK',
  description: 'Next-generation 3D interactive wholesale food and fresh produce supplier for restaurants, boutique hotels, caterers, and healthcare across Birmingham and the UK. Guaranteed 06:00 AM delivery, locked trade pricing, and 3D digital crate ordering.',
};

export default function PublicHomePage() {
  return (
    <div className="space-y-24 sm:space-y-36 pb-28 overflow-hidden">
      
      {/* 1. FULL-SCREEN 3D PRODUCE PHYSICS HERO */}
      <Ultra3DWorldHero />

      {/* 2. INTERACTIVE 3D WOODEN CONVEYOR CRATE PACKER */}
      <Interactive3DConveyorCrate />

      {/* 3. MEATOPIA SENSORY CULINARY SIZZLE STRIP */}
      <MeatopiaCulinaryStrip />

      {/* 4. INTERACTIVE 3D PRODUCE QUALITY INSPECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold uppercase backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4 text-champagne" />
            <span>Interactive 3D Produce Studio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-cream uppercase leading-[1.05]">
            Inspect Orchard Specs in <span className="gold-gradient-text">Real-Time 3D</span>
          </h2>
          <p className="text-sm sm:text-base text-cream/80 font-sans max-w-2xl mx-auto">
            Rotate 3D harvested produce in 360°, inspect cell firmness, Brix sugar levels (14.8°), and cold-chain thermal barriers.
          </p>
        </div>

        <Hyper3DHeroShowcase />
      </section>

      {/* 5. 3D COLD-CHAIN FLEET JOURNEY (Refrigerated Van Simulation) */}
      <ThreeDFleetJourney />

      {/* 6. WHOLESALE PRODUCE RANGE (3D Tilt Showcase) */}
      <ThreeDProductShowcase />

      {/* 7. 3D SPATIAL SECTOR SOLUTIONS */}
      <ThreeDCulinaryGrid />

      {/* 8. ADVANTAGE METRICS & WHY CHOOSE US (3D Tilt Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono uppercase text-champagne tracking-widest font-bold">
            The Rootwills Advantage
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream uppercase">
            Built by Food People for Commercial Kitchens
          </h2>
          <p className="text-sm sm:text-base text-cream/70 leading-relaxed font-sans">
            We solved the five biggest frustrations chefs experience with legacy broadline suppliers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <ThreeDTiltCard maxTilt={10} depth={20}>
            <div className="glass-panel p-8 rounded-3xl border border-emerald-950 hover:border-emerald-700/40 transition-all space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-champagne/10 text-champagne flex items-center justify-center font-bold shadow-md">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-champagne font-bold block">Micro-Metric: 12h Farm-to-Kitchen</span>
                  <h3 className="font-display text-xl font-bold text-cream mt-0.5">
                    Late 11:00 PM Ordering Cut-off
                  </h3>
                </div>
                <p className="text-xs text-cream/70 leading-relaxed font-sans">
                  Never rush evening order pads again. Tally your inventory after dinner service ends, place orders on your mobile, and receive them before morning prep.
                </p>
              </div>
            </div>
          </ThreeDTiltCard>

          <ThreeDTiltCard maxTilt={10} depth={20}>
            <div className="glass-panel p-8 rounded-3xl border border-emerald-950 hover:border-emerald-700/40 transition-all space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shadow-md">
                  <Repeat className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">Micro-Metric: &lt; 45s Reorder Speed</span>
                  <h3 className="font-display text-xl font-bold text-cream mt-0.5">
                    Instant 1-Click Repeat Orders
                  </h3>
                </div>
                <p className="text-xs text-cream/70 leading-relaxed font-sans">
                  Kitchen managers don't have 30 minutes to browse 10,000 items every day. Repeat your last order, adjust crate quantities, or let our AI kitchen assistant prepare your service prep.
                </p>
              </div>
            </div>
          </ThreeDTiltCard>

          <ThreeDTiltCard maxTilt={10} depth={20}>
            <div className="glass-panel p-8 rounded-3xl border border-emerald-950 hover:border-emerald-700/40 transition-all space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-champagne/10 text-champagne flex items-center justify-center font-bold shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-champagne font-bold block">Micro-Metric: 100% Quality Credit</span>
                  <h3 className="font-display text-xl font-bold text-cream mt-0.5">
                    Zero-Substitution Assurance
                  </h3>
                </div>
                <p className="text-xs text-cream/70 leading-relaxed font-sans">
                  No surprise unwanted substitutions. If an item does not meet strict grade-A specifications, our operations desk contacts you directly with verified alternatives.
                </p>
              </div>
            </div>
          </ThreeDTiltCard>
        </div>
      </section>

      {/* 9. INTERACTIVE B2B PRICING ESTIMATOR WIDGET */}
      <section id="pricing-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PriceEstimator />
      </section>

      {/* 10. FINAL VIP TRADE ACCOUNT CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-gold rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase text-champagne font-bold tracking-widest">
              Ready to Upgrade Your Kitchen Supply?
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream uppercase">
              Open a Trade Account in 2 Minutes
            </h2>
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-sans">
              Get approved for 30-day trade credit, receive locked contract rates for your core menu lines, and place your first morning order today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-300 via-champagne to-champagne-dim text-obsidian-950 font-bold text-sm shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all"
            >
              <span>Start Trade Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-obsidian-900 border border-emerald-900/60 hover:border-champagne text-cream text-sm font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-champagne" />
              <span>Speak to Marcus (Sales Desk)</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
