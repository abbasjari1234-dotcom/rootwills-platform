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
  Scale
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { LuxuryAmbientBackground } from '@/components/public/LuxuryAmbientBackground';
import { CinematicPinkLadyExperience } from '@/components/public/CinematicPinkLadyExperience';
import { HospitalityPartnerMarquee } from '@/components/public/HospitalityPartnerMarquee';
import { ThreeDTiltCard } from '@/components/public/ThreeDTiltCard';

const FreshProduceShowcaseStrip = dynamic(
  () => import('@/components/public/FreshProduceShowcaseStrip').then((mod) => mod.FreshProduceShowcaseStrip),
  {
    ssr: true,
    loading: () => <div className="min-h-[400px] w-full animate-pulse bg-emerald-950/20" />,
  }
);

const ThreeDProductShowcase = dynamic(
  () => import('@/components/public/ThreeDProductShowcase').then((mod) => mod.ThreeDProductShowcase),
  {
    ssr: true,
    loading: () => <div className="min-h-[500px] w-full animate-pulse bg-emerald-950/20" />,
  }
);

const ThreeDCulinaryGrid = dynamic(
  () => import('@/components/3d/ThreeDCulinaryGrid').then((mod) => mod.ThreeDCulinaryGrid),
  {
    ssr: true,
    loading: () => <div className="min-h-[450px] w-full animate-pulse bg-emerald-950/20" />,
  }
);

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

const InteractiveChefFAQ = dynamic(
  () => import('@/components/public/InteractiveChefFAQ').then((mod) => mod.InteractiveChefFAQ),
  {
    ssr: true,
    loading: () => <div className="min-h-[350px] w-full animate-pulse bg-emerald-950/20" />,
  }
);

export const metadata = {
  title: 'Premium UK Wholesale Foodservice Supplier | Rootwills',
  description:
    'Source farm-fresh wholesale produce, dairy, and culinary goods with guaranteed 6am delivery across the UK. Apply for your Rootwills trade account today.',
};

export default function PublicHomePage() {
  return (
    <div className="space-y-24 sm:space-y-36 pb-28 overflow-hidden relative">
      
      {/* 0. LUXURY GEOMETRIC TRELLIS PATTERN & SCROLL PROGRESS BAR */}
      <LuxuryAmbientBackground />

      {/* 1. PINK LADY STYLE CINEMATIC VIDEO REEL HERO & SCROLLYTELLING */}
      <CinematicPinkLadyExperience />

      {/* 2. HOSPITALITY PARTNER INFINITE MARQUEE */}
      <HospitalityPartnerMarquee />

      {/* 3. FRESH PRODUCE & HERITAGE ORCHARD SHOWCASE STRIP (Zero Meat) */}
      <FreshProduceShowcaseStrip />

      {/* 4. WHOLESALE PRODUCE & ARTISAN LINES SHOWCASE */}
      <ThreeDProductShowcase />

      {/* 5. SECTOR SOLUTIONS (Restaurants, Hotels, Care Homes, Caterers, Pubs, Schools) */}
      <ThreeDCulinaryGrid />

      {/* 6. THE ROOTWILLS ADVANTAGE METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono uppercase text-champagne tracking-widest font-bold">
            The Rootwills Advantage
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream uppercase">
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

      {/* 7. INTERACTIVE B2B PRICING ESTIMATOR WIDGET */}
      <section id="pricing-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <PriceEstimator />
      </section>

      {/* 8. INTERACTIVE CHEF & OPERATOR FAQ ACCORDION */}
      <InteractiveChefFAQ />

      {/* 9. FINAL VIP TRADE ACCOUNT CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel-gold rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase text-champagne font-bold tracking-widest">
              Ready to Upgrade Your Kitchen Supply?
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream uppercase">
              Open a Trade Account in 2 Minutes
            </h2>
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-sans">
              Get approved for 30-day trade credit, receive locked contract rates for your core menu lines, and place your first morning order today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-sm shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all"
            >
              <span>Start Trade Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-obsidian-900 border border-emerald-900/60 hover:border-champagne text-cream text-sm font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-champagne" />
              <span>Contact Commercial Sales Desk</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
