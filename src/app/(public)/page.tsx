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
  Rotate3d
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { WebGLProduceExperience } from '@/components/public/WebGLProduceExperience';
import { ThreeDHeroVisual } from '@/components/public/ThreeDHeroVisual';
import { ThreeDTiltCard } from '@/components/public/ThreeDTiltCard';
import { Interactive3DFarmToKitchen } from '@/components/public/Interactive3DFarmToKitchen';
import { ThreeDProductShowcase } from '@/components/public/ThreeDProductShowcase';

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
  title: 'Rootwills Ltd | B2B Foodservice & Fresh Produce Wholesale UK',
  description: 'Premium wholesale food and fresh produce supplier for restaurants, hotels, caterers, and care homes across Birmingham and the UK. Guaranteed morning delivery, personalized trade pricing, and modern ordering portal.',
};

export default function PublicHomePage() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      
      {/* 1. 3D HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 lg:pt-20">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-champagne/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Live Operational Status Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-900/90 border border-emerald-500/40 text-cream text-xs font-mono mb-6 animate-fade-in shadow-2xl backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-bold">⚡ Live Deliveries: 99.8% On-Time Today</span>
            <span className="text-cream/30 hidden sm:inline">&bull;</span>
            <span className="text-champagne hidden sm:inline">Digbeth Central Hub Active</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-cream max-w-5xl mx-auto leading-[1.08] animate-slide-up">
            Fresh Food. Reliable Supply.{' '}
            <span className="gold-gradient-text block sm:inline">Better Business.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-cream/75 max-w-3xl mx-auto font-sans leading-relaxed">
            Professional food and farm-fresh produce supply for <strong>restaurants, hotels, caterers, care homes, and commercial kitchens</strong> across Birmingham and the UK. Next-day morning delivery, contract-locked pricing, and smart online ordering.
          </p>

          {/* Action CTAs Grouping */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-obsidian-950 bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim hover:brightness-110 shadow-gold-glow transition-all flex items-center justify-center gap-2 text-base group"
            >
              <span>Open a Business Account</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex w-full sm:w-auto items-center gap-2">
              <Link
                href="#pricing-calculator"
                className="flex-1 sm:flex-initial px-6 py-4 rounded-xl font-semibold text-cream bg-obsidian-900/90 border border-emerald-900/60 hover:border-champagne/60 hover:bg-emerald-950/40 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>Request a Price List</span>
              </Link>

              <Link
                href="/login"
                className="px-5 py-4 rounded-xl font-medium text-cream/80 hover:text-champagne bg-obsidian-950/60 border border-emerald-900/60 hover:border-emerald-700 flex items-center justify-center gap-1.5 text-sm transition-all"
                title="Customer Portal Login"
              >
                <span>Portal Login</span>
                <ChevronRight className="w-4 h-4 text-champagne" />
              </Link>
            </div>
          </div>

          {/* REAL INTERACTIVE 3D WEBGL PRODUCE VIEWER */}
          <WebGLProduceExperience />

          {/* Trust Guarantees Row */}
          <div className="mt-12 pt-8 border-t border-emerald-950 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-5xl mx-auto">
            <div className="p-4 bg-obsidian-900/60 rounded-2xl border border-emerald-950 hover:border-champagne/40 transition-all">
              <div className="text-champagne font-mono text-xs font-bold uppercase">11:00 PM Cut-off</div>
              <div className="text-xs text-cream/70 mt-1">Order late after evening dinner service</div>
            </div>
            <div className="p-4 bg-obsidian-900/60 rounded-2xl border border-emerald-950 hover:border-champagne/40 transition-all">
              <div className="text-champagne font-mono text-xs font-bold uppercase">06:00 - 08:30 AM SLA</div>
              <div className="text-xs text-cream/70 mt-1">Guaranteed early kitchen drop-off</div>
            </div>
            <div className="p-4 bg-obsidian-900/60 rounded-2xl border border-emerald-950 hover:border-champagne/40 transition-all">
              <div className="text-champagne font-mono text-xs font-bold uppercase">SALSA & BRCGS</div>
              <div className="text-xs text-cream/70 mt-1">Full farm-to-fork batch traceability</div>
            </div>
            <div className="p-4 bg-obsidian-900/60 rounded-2xl border border-emerald-950 hover:border-champagne/40 transition-all">
              <div className="text-champagne font-mono text-xs font-bold uppercase">Trade Credit</div>
              <div className="text-xs text-cream/70 mt-1">Up to £30,000 facility (30 Days)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3D INTERACTIVE PRODUCT CATALOG SHOWCASE */}
      <ThreeDProductShowcase />

      {/* 3. INTERACTIVE 3D FARM-TO-KITCHEN JOURNEY */}
      <Interactive3DFarmToKitchen />

      {/* 4. ADVANTAGE METRICS & WHY CHOOSE US (with 3D Tilt Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono uppercase text-champagne tracking-widest font-bold">
            The Rootwills Difference
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream">
            Built by Food People for Commercial Kitchens
          </h2>
          <p className="text-sm sm:text-base text-cream/70 leading-relaxed">
            We solved the five biggest frustrations chefs experience with legacy broadline suppliers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ThreeDTiltCard maxTilt={10} depth={20}>
            <div className="glass-panel p-8 rounded-3xl border border-emerald-950 hover:border-emerald-700/40 transition-all space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-champagne/10 text-champagne flex items-center justify-center font-bold">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-champagne font-bold block">Micro-Metric: 12h Farm-to-Kitchen</span>
                  <h3 className="font-display text-xl font-bold text-cream mt-0.5">
                    Late 11:00 PM Ordering Cut-off
                  </h3>
                </div>
                <p className="text-xs text-cream/70 leading-relaxed">
                  Never rush evening order pads again. Tally your inventory after dinner service ends, place orders on your mobile, and receive them before morning prep.
                </p>
              </div>
            </div>
          </ThreeDTiltCard>

          <ThreeDTiltCard maxTilt={10} depth={20}>
            <div className="glass-panel p-8 rounded-3xl border border-emerald-950 hover:border-emerald-700/40 transition-all space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <Repeat className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">Micro-Metric: &lt; 45s Reorder Speed</span>
                  <h3 className="font-display text-xl font-bold text-cream mt-0.5">
                    Instant 1-Click Repeat Orders
                  </h3>
                </div>
                <p className="text-xs text-cream/70 leading-relaxed">
                  Kitchen managers don't have 30 minutes to browse 10,000 items every day. Repeat your last order, adjust crate quantities, or let our AI kitchen assistant prepare your service prep.
                </p>
              </div>
            </div>
          </ThreeDTiltCard>

          <ThreeDTiltCard maxTilt={10} depth={20}>
            <div className="glass-panel p-8 rounded-3xl border border-emerald-950 hover:border-emerald-700/40 transition-all space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-champagne/10 text-champagne flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-champagne font-bold block">Micro-Metric: 100% Quality Credit</span>
                  <h3 className="font-display text-xl font-bold text-cream mt-0.5">
                    Zero-Substitution Assurance
                  </h3>
                </div>
                <p className="text-xs text-cream/70 leading-relaxed">
                  No surprise unwanted substitutions. If an item does not meet strict grade-A specifications, our operations desk contacts you directly with verified alternatives.
                </p>
              </div>
            </div>
          </ThreeDTiltCard>
        </div>
      </section>

      {/* 5. SECTOR SOLUTIONS (with 3D Tilt Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono uppercase text-champagne tracking-widest font-bold">
            Tailored Industry Supply
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream">
            Which Businesses We Serve
          </h2>
          <p className="text-sm sm:text-base text-cream/70 leading-relaxed">
            Every hospitality operation has unique delivery windows, pack specs, and invoicing requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ThreeDTiltCard maxTilt={8} depth={15}>
            <Link
              href="/sectors/restaurants"
              className="p-6 rounded-2xl glass-panel border border-emerald-950 hover:border-champagne/40 transition-all group flex flex-col justify-between h-56 w-full shadow-lg"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-3">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-cream group-hover:text-champagne transition-colors">
                  Fine Dining & Restaurants
                </h3>
                <p className="text-xs text-cream/70 mt-1">
                  Precision microgreens, heirloom produce, dry-aged meats, and late-night order cut-offs.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-champagne font-mono font-bold">
                <span>View Restaurant Solutions &rarr;</span>
              </div>
            </Link>
          </ThreeDTiltCard>

          <ThreeDTiltCard maxTilt={8} depth={15}>
            <Link
              href="/sectors/hotels"
              className="p-6 rounded-2xl glass-panel border border-emerald-950 hover:border-champagne/40 transition-all group flex flex-col justify-between h-56 w-full shadow-lg"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                  <Hotel className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-cream group-hover:text-champagne transition-colors">
                  Hotels & Banqueting
                </h3>
                <p className="text-xs text-cream/70 mt-1">
                  High-volume breakfast dairy, bulk egg outers, multi-outlet consolidating, and consolidated EDI invoicing.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-champagne font-mono font-bold">
                <span>View Hotel Solutions &rarr;</span>
              </div>
            </Link>
          </ThreeDTiltCard>

          <ThreeDTiltCard maxTilt={8} depth={15}>
            <Link
              href="/sectors/care-homes"
              className="p-6 rounded-2xl glass-panel border border-emerald-950 hover:border-champagne/40 transition-all group flex flex-col justify-between h-56 w-full shadow-lg"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-3">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-cream group-hover:text-champagne transition-colors">
                  Care Homes & Healthcare
                </h3>
                <p className="text-xs text-cream/70 mt-1">
                  Texture-modified IDDSI ingredients, strict allergen segregation, scheduled standing orders, and dietetic specs.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-champagne font-mono font-bold">
                <span>View Care Home Solutions &rarr;</span>
              </div>
            </Link>
          </ThreeDTiltCard>

          <ThreeDTiltCard maxTilt={8} depth={15}>
            <Link
              href="/sectors/caterers"
              className="p-6 rounded-2xl glass-panel border border-emerald-950 hover:border-champagne/40 transition-all group flex flex-col justify-between h-56 w-full shadow-lg"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                  <PartyPopper className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-cream group-hover:text-champagne transition-colors">
                  Caterers & Wedding Venues
                </h3>
                <p className="text-xs text-cream/70 mt-1">
                  Bespoke event drop-offs, pop-up kitchen logistics, pre-portioned butchery, and weekend delivery flexibility.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-champagne font-mono font-bold">
                <span>View Catering Solutions &rarr;</span>
              </div>
            </Link>
          </ThreeDTiltCard>

          <ThreeDTiltCard maxTilt={8} depth={15}>
            <Link
              href="/sectors/pubs-bars"
              className="p-6 rounded-2xl glass-panel border border-emerald-950 hover:border-champagne/40 transition-all group flex flex-col justify-between h-56 w-full shadow-lg"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-3">
                  <Beer className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-cream group-hover:text-champagne transition-colors">
                  Pubs, Bars & Gastropubs
                </h3>
                <p className="text-xs text-cream/70 mt-1">
                  Hand-cut chip potatoes, fresh bar citrus, burger buns, dry goods, and Sunday roast prep.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-champagne font-mono font-bold">
                <span>View Pub & Bar Solutions &rarr;</span>
              </div>
            </Link>
          </ThreeDTiltCard>

          <ThreeDTiltCard maxTilt={8} depth={15}>
            <Link
              href="/sectors/schools"
              className="p-6 rounded-2xl glass-panel border border-emerald-950 hover:border-champagne/40 transition-all group flex flex-col justify-between h-56 w-full shadow-lg"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-cream group-hover:text-champagne transition-colors">
                  Schools & Education
                </h3>
                <p className="text-xs text-cream/70 mt-1">
                  Red Tractor British provenance, seasonal fruit schemes, budget-controlled portion specs, and nut-free guarantees.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-champagne font-mono font-bold">
                <span>View Education Solutions &rarr;</span>
              </div>
            </Link>
          </ThreeDTiltCard>
        </div>
      </section>

      {/* 6. INTERACTIVE B2B PRICING ESTIMATOR WIDGET */}
      <section id="pricing-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PriceEstimator />
      </section>

      {/* 7. CALL TO ACTION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-gold rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase text-champagne font-bold tracking-widest">
              Ready to Upgrade Your Kitchen Supply?
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream">
              Open a Trade Account in 2 Minutes
            </h2>
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
              Get approved for 30-day trade credit, receive locked contract rates for your core menu lines, and place your first morning order today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-sm shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2"
            >
              <span>Start Trade Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-obsidian-900 border border-emerald-900/60 hover:border-champagne text-cream text-sm font-semibold flex items-center justify-center gap-2"
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
