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
  CheckCircle2, 
  Layers, 
  Repeat, 
  FileText,
  MapPin,
  PhoneCall,
  Check,
  Leaf,
  ThermometerSnowflake,
  Scale,
  Calendar
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { LuxuryAmbientBackground } from '@/components/public/LuxuryAmbientBackground';
import { CinematicPinkLadyExperience } from '@/components/public/CinematicPinkLadyExperience';
import { HospitalityPartnerMarquee } from '@/components/public/HospitalityPartnerMarquee';
import { InstitutionalComplianceBar } from '@/components/public/InstitutionalComplianceBar';
import { SupplyChainLogisticsMap } from '@/components/public/SupplyChainLogisticsMap';
import { WeeklyMarketCropReport } from '@/components/public/WeeklyMarketCropReport';
import { CommercialWholesaleCategories } from '@/components/public/CommercialWholesaleCategories';

const InteractiveLogisticsHub = dynamic(
  () => import('@/components/public/InteractiveLogisticsHub').then((mod) => mod.InteractiveLogisticsHub),
  {
    ssr: true,
    loading: () => <div className="min-h-[500px] w-full animate-pulse bg-emerald-950/20" />,
  }
);

const FreshProduceShowcaseStrip = dynamic(
  () => import('@/components/public/FreshProduceShowcaseStrip').then((mod) => mod.FreshProduceShowcaseStrip),
  {
    ssr: true,
    loading: () => <div className="min-h-[400px] w-full animate-pulse bg-emerald-950/20" />,
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
  title: 'Rootwills | Premier UK Commercial Fresh Produce & Cold-Chain Foodservice Distributor',
  description:
    'British foodservice wholesale distributor based in Digbeth, Birmingham. Delivering single-estate fresh produce, artisan dairy, and kitchen essentials daily before 06:00 AM across the UK. BRCGS and SALSA certified.',
};

export default function PublicHomePage() {
  return (
    <div className="space-y-20 sm:space-y-28 pb-28 overflow-hidden relative">
      
      {/* 0. LUXURY GEOMETRIC AMBIENT BACKDROP */}
      <LuxuryAmbientBackground />

      {/* 1. EDITORIAL CHEF HANDOVER HERO (100% Branded Rootwills Photography) */}
      <CinematicPinkLadyExperience />

      {/* 2. INSTITUTIONAL ACCREDITATIONS & COMPLIANCE BAR (BRCGS Grade AA, SALSA, Red Tractor, Soil Association) */}
      <InstitutionalComplianceBar />

      {/* 3. INTERACTIVE UK COLD-CHAIN LOGISTICS & DEPOT NETWORK MAP */}
      <SupplyChainLogisticsMap />

      {/* 4. WEEKLY WHOLESALE MARKET INTELLIGENCE & CROP SEASONALITY REPORT */}
      <WeeklyMarketCropReport />

      {/* 5. COMMERCIAL WHOLESALE PRODUCT DIVISIONS (5 Core Foodservice Lines) */}
      <CommercialWholesaleCategories />

      {/* 6. 4K COLD-CHAIN FLEET DISPATCH CONSOLE & OPERATIONAL TELEMETRY */}
      <InteractiveLogisticsHub />

      {/* 7. HOSPITALITY PARTNER REPUTATION & PROVENANCE MARQUEE */}
      <HospitalityPartnerMarquee />

      {/* 8. HERITAGE FRESH PRODUCE SHOWCASE STRIP */}
      <FreshProduceShowcaseStrip />

      {/* 9. SECTOR SOLUTIONS (Michelin Dining, Boutique Hotels, Care Homes, Luxury Caterers) */}
      <ThreeDCulinaryGrid />

      {/* 10. THE ROOTWILLS COLD-CHAIN SLA COMMITMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-mono uppercase text-champagne tracking-widest font-bold">
            The Rootwills Service Level Agreement
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream uppercase">
            Built by Food People for Professional Kitchens
          </h2>
          <p className="text-sm sm:text-base text-cream/75 leading-relaxed font-sans">
            We eliminate the daily frustrations chefs experience with legacy broadline distributors: late deliveries, unexpected substitutions, and thermal breaks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          <div className="bg-obsidian-950/90 p-8 rounded-3xl border border-emerald-900/60 hover:border-champagne/40 transition-all space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-champagne/10 text-champagne flex items-center justify-center font-bold shadow-md border border-champagne/20">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-champagne font-bold block">
                  Service SLA: Pre-06:00 AM Delivery
                </span>
                <h3 className="font-display text-xl font-bold text-cream mt-0.5">
                  Late 11:00 PM Ordering Cut-off
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
                Never rush evening inventory counting. Tally your orders after dinner service closes, place orders seamlessly via web or phone, and receive them inside your cold room before breakfast prep begins.
              </p>
            </div>
            <div className="pt-4 border-t border-emerald-950 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Key-drop driver access available</span>
            </div>
          </div>

          <div className="bg-obsidian-950/90 p-8 rounded-3xl border border-emerald-900/60 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shadow-md border border-emerald-500/20">
                <ThermometerSnowflake className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                  Thermal SLA: +2.0°C Calibrated Vault
                </span>
                <h3 className="font-display text-xl font-bold text-cream mt-0.5">
                  Zero Thermal Breaks Guaranteed
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
                Thermal fluctuations ruin crisp leafy salads and soften orchard fruit. Every Rootwills Mercedes Sprinter is equipped with dual-temperature calibrated refrigeration and digital timestamp logging.
              </p>
            </div>
            <div className="pt-4 border-t border-emerald-950 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Continuous HACCP audit compliance</span>
            </div>
          </div>

          <div className="bg-obsidian-950/90 p-8 rounded-3xl border border-emerald-900/60 hover:border-champagne/40 transition-all space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-champagne/10 text-champagne flex items-center justify-center font-bold shadow-md border border-champagne/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-champagne font-bold block">
                  Quality SLA: 100% Class 1 Extra
                </span>
                <h3 className="font-display text-xl font-bold text-cream mt-0.5">
                  Zero-Substitution Guarantee
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
                No unapproved substitutions ever. If an item fails our sunrise intake quality check, our operations desk contacts the head chef directly with verified alternative selections.
              </p>
            </div>
            <div className="pt-4 border-t border-emerald-950 text-xs font-mono text-champagne font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>60-minute quality credit resolution</span>
            </div>
          </div>

        </div>
      </section>

      {/* 11. INTERACTIVE B2B PRICING & VOLUME CALCULATOR */}
      <section id="pricing-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <PriceEstimator />
      </section>

      {/* 12. CHEF & OPERATOR PROCUREMENT FAQ */}
      <InteractiveChefFAQ />

      {/* 13. FINAL COMMERCIAL TRADE ACCOUNT INVITATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-emerald-950 via-obsidian-950 to-obsidian-950 rounded-3xl p-8 sm:p-14 text-center space-y-8 shadow-2xl border border-champagne/40 relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono font-bold uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>Dedicated Commercial Account Desk</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream uppercase leading-tight">
              Open Your 30-Day Trade Account
            </h2>
            <p className="text-xs sm:text-sm text-cream/80 leading-relaxed font-sans">
              Approved commercial credit facility up to £30,000. Receive a dedicated key account manager, locked contract pricing for your menu cycles, and next-day 06:00 AM delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/apply"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-sm shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all font-mono"
            >
              <span>Start 2-Minute Trade Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-obsidian-900 border border-emerald-800/80 hover:border-champagne text-cream text-sm font-semibold flex items-center justify-center gap-2 transition-all font-mono"
            >
              <PhoneCall className="w-4 h-4 text-champagne" />
              <span>Commercial Sales: 0121 790 8800</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-cream/60">
            <span>&bull; No setup fees</span>
            <span>&bull; 30-Day Bacs / Direct Debit Terms</span>
            <span>&bull; Key-drop delivery service</span>
            <span>&bull; Full batch traceability</span>
          </div>

        </div>
      </section>

    </div>
  );
}
