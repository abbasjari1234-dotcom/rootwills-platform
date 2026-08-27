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
  Flame
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { PinkLadyCinematicScrollytelling } from '@/components/public/PinkLadyCinematicScrollytelling';
import { MeatopiaCulinaryStrip } from '@/components/public/MeatopiaCulinaryStrip';
import { Hyper3DHeroShowcase } from '@/components/public/Hyper3DHeroShowcase';
import { Interactive3DCrateBuilder } from '@/components/3d/Interactive3DCrateBuilder';
import { ThreeDDepotExplorer } from '@/components/3d/ThreeDDepotExplorer';
import { ThreeDProductShowcase } from '@/components/public/ThreeDProductShowcase';
import { Interactive3DFarmToKitchen } from '@/components/public/Interactive3DFarmToKitchen';
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
  title: 'Rootwills Ltd | Premium B2B Foodservice & Fresh Produce Wholesale UK',
  description: 'Farm-direct fresh produce, dry-aged meats, and artisan culinary supply for restaurants, boutique hotels, caterers, and healthcare across Birmingham and the UK. Guaranteed 06:00 AM delivery, locked trade pricing, and modern ordering portal.',
};

export default function PublicHomePage() {
  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-hidden">
      
      {/* 1. PINK LADY STYLE FULL-BLEED VIDEO HERO & SCROLLYTELLING */}
      <PinkLadyCinematicScrollytelling />

      {/* 2. MEATOPIA SENSORY CULINARY SIZZLE STRIP */}
      <MeatopiaCulinaryStrip />

      {/* 3. INTERACTIVE 3D PRODUCE QUALITY INSPECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span>Interactive 3D Produce Studio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream">
            Inspect Orchard Specs in Real-Time 3D
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 font-sans">
            Rotate 3D harvested produce in 360°, inspect cell firmness, Brix sugar levels (14.8°), and cold-chain thermal barriers.
          </p>
        </div>

        <Hyper3DHeroShowcase />
      </section>

      {/* 4. INTERACTIVE 3D WOODEN WHOLESALE CRATE PACKER */}
      <Interactive3DCrateBuilder />

      {/* 5. WHOLESALE PRODUCE & CULINARY RANGE (3D Tilt Showcase) */}
      <ThreeDProductShowcase />

      {/* 6. 3D COLD-CHAIN DEPOT DIGITAL TWIN */}
      <ThreeDDepotExplorer />

      {/* 7. INTERACTIVE 3D FARM-TO-KITCHEN JOURNEY */}
      <Interactive3DFarmToKitchen />

      {/* 8. THE ROOTWILLS DIFFERENCE (3D Tilt Metric Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono uppercase text-champagne tracking-widest font-bold">
            The Rootwills Difference
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream">
            Built by Food People for Commercial Kitchens
          </h2>
          <p className="text-sm sm:text-base text-cream/70 leading-relaxed font-sans">
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
                <p className="text-xs text-cream/70 leading-relaxed font-sans">
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
                <p className="text-xs text-cream/70 leading-relaxed font-sans">
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
                <p className="text-xs text-cream/70 leading-relaxed font-sans">
                  No surprise unwanted substitutions. If an item does not meet strict grade-A specifications, our operations desk contacts you directly with verified alternatives.
                </p>
              </div>
            </div>
          </ThreeDTiltCard>
        </div>
      </section>

      {/* 9. SECTOR SOLUTIONS (Restaurants, Hotels, Care Homes, Caterers, Pubs, Schools) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono uppercase text-champagne tracking-widest font-bold">
            Tailored Industry Supply
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream">
            Which Businesses We Serve
          </h2>
          <p className="text-sm sm:text-base text-cream/70 leading-relaxed font-sans">
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
                <p className="text-xs text-cream/70 mt-1 font-sans">
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
                <p className="text-xs text-cream/70 mt-1 font-sans">
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
                <p className="text-xs text-cream/70 mt-1 font-sans">
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
                <p className="text-xs text-cream/70 mt-1 font-sans">
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
                <p className="text-xs text-cream/70 mt-1 font-sans">
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
                <p className="text-xs text-cream/70 mt-1 font-sans">
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

      {/* 10. INTERACTIVE B2B PRICING ESTIMATOR WIDGET */}
      <section id="pricing-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PriceEstimator />
      </section>

      {/* 11. FINAL VIP TRADE ACCOUNT CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-gold rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase text-champagne font-bold tracking-widest">
              Ready to Upgrade Your Kitchen Supply?
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream">
              Open a Trade Account in 2 Minutes
            </h2>
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-sans">
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
