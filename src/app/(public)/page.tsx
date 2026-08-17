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
  Check
} from 'lucide-react';
import { PriceEstimator } from '@/components/public/PriceEstimator';

export const metadata = {
  title: 'Rootwills Ltd | B2B Foodservice & Fresh Produce Wholesale UK',
  description: 'Premium wholesale food and fresh produce supplier for restaurants, hotels, caterers, and care homes across Birmingham and the UK. Guaranteed morning delivery, personalized trade pricing, and modern ordering portal.',
};

export default function PublicHomePage() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-champagne/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Live Operational Status Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-cream text-xs font-mono mb-6 animate-fade-in shadow-2xl backdrop-blur-md">
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
                className="flex-1 sm:flex-initial px-6 py-4 rounded-xl font-semibold text-cream bg-zinc-900/90 border border-zinc-700 hover:border-champagne/60 hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>Request a Price List</span>
              </Link>

              <Link
                href="/login"
                className="px-5 py-4 rounded-xl font-medium text-cream/80 hover:text-champagne bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center gap-1.5 text-sm transition-all"
                title="Customer Portal Login"
              >
                <span>Portal Login</span>
                <ChevronRight className="w-4 h-4 text-champagne" />
              </Link>
            </div>
          </div>

          {/* Trust Guarantees Row */}
          <div className="mt-16 pt-8 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-5xl mx-auto">
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 hover:border-champagne/40 transition-all">
              <div className="text-champagne font-mono text-xs font-bold uppercase">11:00 PM Cut-off</div>
              <div className="text-xs text-cream/70 mt-1">Order late after evening dinner service</div>
            </div>
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 hover:border-champagne/40 transition-all">
              <div className="text-champagne font-mono text-xs font-bold uppercase">06:00 - 08:30 AM SLA</div>
              <div className="text-xs text-cream/70 mt-1">Guaranteed early kitchen drop-off</div>
            </div>
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 hover:border-champagne/40 transition-all">
              <div className="text-champagne font-mono text-xs font-bold uppercase">SALSA & BRCGS</div>
              <div className="text-xs text-cream/70 mt-1">Full farm-to-fork batch traceability</div>
            </div>
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 hover:border-champagne/40 transition-all">
              <div className="text-champagne font-mono text-xs font-bold uppercase">Trade Credit</div>
              <div className="text-xs text-cream/70 mt-1">Up to £30,000 facility (30 Days)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHOLESALE CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div className="text-xs font-mono uppercase text-champagne tracking-widest font-bold mb-2">
              Master Wholesale Range
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
              What We Supply
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-mono text-champagne hover:underline flex items-center gap-1"
          >
            <span>View Full 1,200+ SKU Product Catalogue</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category 1 */}
          <Link
            href="/products?cat=fresh_produce"
            className="group relative rounded-2xl overflow-hidden glass-panel border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col h-80 shadow-lg"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80"
                alt="Fresh Fruit & Vegetables"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-30 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-transparent" />
            </div>
            <div className="relative z-10 p-6 flex flex-col justify-between h-full">
              <span className="px-2.5 py-1 rounded-full bg-zinc-900/90 text-emerald-400 text-[10px] font-mono border border-zinc-700 self-start">
                350+ Produce SKUs
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold text-cream group-hover:text-champagne transition-colors">
                  Fresh Produce & Microgreens
                </h3>
                <p className="text-xs text-cream/70 mt-1 leading-relaxed">
                  Daily farm-picked salads, heritage tomatoes, prepared vegetables, seasonal berries, and exotic fruits.
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-mono text-champagne font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </Link>

          {/* Category 2 */}
          <Link
            href="/products?cat=dairy_eggs"
            className="group relative rounded-2xl overflow-hidden glass-panel border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col h-80 shadow-lg"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80"
                alt="Dairy & Eggs"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-30 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-transparent" />
            </div>
            <div className="relative z-10 p-6 flex flex-col justify-between h-full">
              <span className="px-2.5 py-1 rounded-full bg-zinc-900/90 text-champagne text-[10px] font-mono border border-zinc-700 self-start">
                120+ Dairy Lines
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold text-cream group-hover:text-champagne transition-colors">
                  Dairy, Cheeses & Eggs
                </h3>
                <p className="text-xs text-cream/70 mt-1 leading-relaxed">
                  British Lion free range eggs, Cotswold salted butter, artisan European cheeses, double creams, and organic milks.
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-mono text-champagne font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </Link>

          {/* Category 3 */}
          <Link
            href="/products?cat=meat_poultry"
            className="group relative rounded-2xl overflow-hidden glass-panel border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col h-80 shadow-lg"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80"
                alt="Meat & Poultry"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-30 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-transparent" />
            </div>
            <div className="relative z-10 p-6 flex flex-col justify-between h-full">
              <span className="px-2.5 py-1 rounded-full bg-zinc-900/90 text-rose-400 text-[10px] font-mono border border-zinc-700 self-start">
                85+ Butchery Cuts
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold text-cream group-hover:text-champagne transition-colors">
                  Meat, Poultry & Game
                </h3>
                <p className="text-xs text-cream/70 mt-1 leading-relaxed">
                  28-day dry-aged British steaks, corn-fed poultry, Shropshire lamb, and bespoke primal cuts.
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-mono text-champagne font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </Link>

          {/* Category 4 */}
          <Link
            href="/products?cat=specialty"
            className="group relative rounded-2xl overflow-hidden glass-panel border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col h-80 shadow-lg"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80"
                alt="Pastry & Specialty Goods"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-30 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-transparent" />
            </div>
            <div className="relative z-10 p-6 flex flex-col justify-between h-full">
              <span className="px-2.5 py-1 rounded-full bg-zinc-900/90 text-purple-400 text-[10px] font-mono border border-zinc-700 self-start">
                400+ Specialty Lines
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold text-cream group-hover:text-champagne transition-colors">
                  Pastry, Truffles & Oils
                </h3>
                <p className="text-xs text-cream/70 mt-1 leading-relaxed">
                  Valrhona chocolate, Italian white truffle oils, Modena vinegars, baking flours, and gourmet storecupboard dry goods.
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-mono text-champagne font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. ADVANTAGE METRICS & WHY CHOOSE US */}
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
          <div className="glass-panel p-8 rounded-3xl border border-zinc-800 hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Micro-Metric: 12h Farm-to-Kitchen</span>
              <h3 className="font-display text-xl font-bold text-cream mt-0.5">
                Late 11:00 PM Ordering Cut-off
              </h3>
            </div>
            <p className="text-xs text-cream/70 leading-relaxed">
              Never rush evening order pads again. Tally your inventory after dinner service ends, place orders on your mobile, and receive them before morning prep.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-zinc-800 hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Repeat className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Micro-Metric: &lt; 45s Reorder Speed</span>
              <h3 className="font-display text-xl font-bold text-cream mt-0.5">
                Instant 1-Click Repeat Orders
              </h3>
            </div>
            <p className="text-xs text-cream/70 leading-relaxed">
              Kitchen managers don't have 30 minutes to browse 10,000 items every day. Repeat your last order, adjust crate quantities, or let our AI kitchen assistant prepare your service prep.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-zinc-800 hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Micro-Metric: 100% Quality Credit</span>
              <h3 className="font-display text-xl font-bold text-cream mt-0.5">
                Zero-Substitution Assurance
              </h3>
            </div>
            <p className="text-xs text-cream/70 leading-relaxed">
              No surprise unwanted substitutions. If an item does not meet strict grade-A specifications, our operations desk contacts you directly with verified alternatives.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SECTOR SOLUTIONS */}
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
          <Link
            href="/sectors/restaurants"
            className="p-6 rounded-2xl glass-panel border border-zinc-800 hover:border-amber-500/40 transition-all group flex flex-col justify-between h-56"
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

          <Link
            href="/sectors/hotels"
            className="p-6 rounded-2xl glass-panel border border-zinc-800 hover:border-amber-500/40 transition-all group flex flex-col justify-between h-56"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-3">
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

          <Link
            href="/sectors/care-homes"
            className="p-6 rounded-2xl glass-panel border border-zinc-800 hover:border-amber-500/40 transition-all group flex flex-col justify-between h-56"
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

          <Link
            href="/sectors/caterers"
            className="p-6 rounded-2xl glass-panel border border-zinc-800 hover:border-amber-500/40 transition-all group flex flex-col justify-between h-56"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-3">
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

          <Link
            href="/sectors/pubs-bars"
            className="p-6 rounded-2xl glass-panel border border-zinc-800 hover:border-amber-500/40 transition-all group flex flex-col justify-between h-56"
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

          <Link
            href="/sectors/schools"
            className="p-6 rounded-2xl glass-panel border border-zinc-800 hover:border-amber-500/40 transition-all group flex flex-col justify-between h-56"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-3">
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
        </div>
      </section>

      {/* 5. INTERACTIVE B2B PRICING ESTIMATOR WIDGET */}
      <section id="pricing-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PriceEstimator />
      </section>

      {/* 6. CALL TO ACTION STRIP */}
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
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-champagne text-cream text-sm font-semibold flex items-center justify-center gap-2"
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
