import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Truck, 
  ShieldCheck, 
  TrendingUp, 
  UtensilsCrossed, 
  Hotel, 
  HeartHandshake, 
  PartyPopper, 
  Beer, 
  GraduationCap,
  Sparkles,
  Phone,
  Layers,
  Thermometer,
  Percent,
  Calculator,
  Star
} from 'lucide-react';
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

const SECTORS_SEO: Record<string, { title: string; description: string; h1: string }> = {
  restaurants: {
    title: 'Restaurant Wholesale Food & Produce Supply | Rootwills',
    description:
      'Chef-led fresh produce, butchery, dairy, and culinary dry goods delivered 6 mornings a week across the UK. Request a bespoke restaurant quote today.',
    h1: 'Wholesale Food & Fresh Produce Supply for Restaurants',
  },
  hotels: {
    title: 'Hotel Foodservice & Wholesale Food Supply | Rootwills',
    description:
      'Reliable multi-department food supply, breakfast produce, and banqueting ingredients for luxury hotels. Open your hotel trade credit facility now.',
    h1: 'Wholesale Food & Fresh Produce Supply for Boutique Hotels',
  },
  'care-homes': {
    title: 'Care Home Foodservice & Produce Delivery | Rootwills',
    description:
      'Nutritious fresh produce, allergen-tracked food lines, and dependable morning supply for UK care facilities. Partner with our healthcare desk today.',
    h1: 'Wholesale Food & Fresh Produce Supply for Care Homes',
  },
  caterers: {
    title: 'Catering Foodservice & Event Food Supply | Rootwills',
    description:
      'High-volume wholesale produce, chilled goods, and flexible morning drops for contract and event caterers. Get locked event pricing with Rootwills.',
    h1: 'Wholesale Food & Fresh Produce Supply for Luxury Caterers',
  },
  'pubs-bars': {
    title: 'Gastropub Wholesale Food & Produce Supply | Rootwills',
    description:
      'Seasonal produce, artisan meats, and pantry essentials tailored for high-volume gastropubs and craft venues. Start your trade application online today.',
    h1: 'Wholesale Food & Fresh Produce Supply for Gastropubs',
  },
  pubs: {
    title: 'Gastropub Wholesale Food & Produce Supply | Rootwills',
    description:
      'Seasonal produce, artisan meats, and pantry essentials tailored for high-volume gastropubs and craft venues. Start your trade application online today.',
    h1: 'Wholesale Food & Fresh Produce Supply for Gastropubs',
  },
  schools: {
    title: 'Education Foodservice & School Produce | Rootwills',
    description:
      'Fresh farm-assured produce, compliant school fruit, and dependable delivery schedules for academies and universities. Contact our education desk.',
    h1: 'Wholesale Food & Fresh Produce Supply for Education',
  },
};

export async function generateMetadata({ params }: { params: { sector: string } }): Promise<Metadata> {
  const seo = SECTORS_SEO[params.sector.toLowerCase()];
  if (!seo) {
    return {
      title: 'Hospitality Sector Wholesale Food Supply | Rootwills',
      description:
        'Tailored foodservice programs, locked trade pricing, and guaranteed 6am delivery for hospitality kitchens across the UK. Open an account today.',
    };
  }
  return {
    title: seo.title,
    description: seo.description,
  };
}

const PriceEstimator = dynamic(
  () => import('@/components/public/PriceEstimator').then((mod) => mod.PriceEstimator),
  {
    ssr: true,
    loading: () => (
      <div className="bg-white rounded-3xl border border-slate-200 p-10 min-h-[420px] flex items-center justify-center animate-pulse">
        <div className="text-slate-400 font-mono text-xs uppercase tracking-wider">
          Loading Pricing Calculator...
        </div>
      </div>
    ),
  }
);

interface SectorData {
  title: string;
  subtitle: string;
  badge: string;
  icon: any;
  heroImage: string;
  prepTimeSaved: string;
  yieldIncrease: string;
  painPoints: { title: string; desc: string }[];
  keyProducts: string[];
  serviceBenefits: string[];
  testimonial: { quote: string; author: string; role: string; org: string };
}

const SECTORS_DATA: Record<string, SectorData> = {
  restaurants: {
    title: 'Wholesale Food & Fresh Produce Supply for Restaurants',
    subtitle: 'Chef-led fresh produce, butchery, dairy, and culinary dry goods delivered 6 mornings a week across the UK.',
    badge: 'Restaurant & Fine Dining Program',
    icon: UtensilsCrossed,
    heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
    prepTimeSaved: '18% Less Kitchen Trimming',
    yieldIncrease: '+14% Usable Crate Yield',
    painPoints: [
      { title: 'Inconsistent Produce Quality', desc: 'We visually hand-grade every crate. Zero bruised tomatoes or wilted herbs in your service prep.' },
      { title: 'Early Evening Order Deadlines', desc: 'Our order cut-off is 11:00 PM. Order easily from your phone right after dinner service closes.' },
      { title: 'Volatile Fluctuating Prices', desc: 'Locked weekly and monthly contract rates so your kitchen GP remains consistent.' },
    ],
    keyProducts: [
      'San Marzano & Heritage Vine Tomatoes',
      'Wild French & British Forest Mushrooms',
      '28-Day Dry-Aged British Steaks',
      'Living Microgreens & Edible Flowers',
      'Specialist Valrhona Pastry Ingredients',
      'Amalfi Coast Lemons & Fresh Truffles',
    ],
    serviceBenefits: [
      'Guaranteed 06:00 - 08:00 AM delivery window before kitchen prep begins',
      'Direct mobile reorder portal with 1-click "Repeat Last Order"',
      'Dedicated senior account manager with professional culinary background',
      'No split delivery charges or hidden fuel surcharges',
    ],
    testimonial: {
      quote: 'Rootwills has transformed our morning prep. The visual standard of their herbs and dry-aged beef is impeccable, and the late 11 PM portal order cut-off is a lifesaver.',
      author: 'Marco Rossi',
      role: 'Executive Chef',
      org: 'San Carlo Ristorante Group',
    },
  },
  hotels: {
    title: 'Foodservice Wholesale & Fresh Supply for Hotels',
    subtitle: 'High-capacity, multi-outlet food supply for hotel banqueting, breakfast operations, room service, and luxury dining.',
    badge: 'Hotels & Banqueting Program',
    icon: Hotel,
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80',
    prepTimeSaved: '22% Faster Breakfast Prep',
    yieldIncrease: '+16% High-Volume Yield',
    painPoints: [
      { title: 'Multi-Outlet Invoicing Chaos', desc: 'We consolidate your main kitchen, bar, banqueting, and room service into structured multi-site accounts with PO support.' },
      { title: 'Bulk Breakfast Volume Deficits', desc: 'Reliable volume supply of British Lion eggs, pasture butter, bacon, and bakery fruit.' },
      { title: 'Strict Loading Bay Restrictions', desc: 'Our drivers adhere to your security protocols, time slots, and loading bay procedures.' },
    ],
    keyProducts: [
      'British Lion Free Range Eggs (15 Dozen Outers)',
      'Pasteurized Cotswold Double Cream & Milk (2L/Bulk)',
      'Pre-Prepared Fruit Salad & Breakfast Melons',
      'Banqueting Cut Prime Beef & Poultry',
      'Artisan Butter Portions & Preserves',
      'Gourmet Bar Citrus & Cocktail Garnishes',
    ],
    serviceBenefits: [
      'Consolidated monthly statements with 30-day corporate trade credit terms',
      'Multi-user portal permissions for Head Chef, F&B Director, and Finance Controller',
      'Emergency supplementary delivery service for unexpected banquet surges',
      'Full BRCGS storage and distribution accreditation',
    ],
    testimonial: {
      quote: 'Managing 200+ breakfast covers plus weekend banquets requires absolute reliability. Rootwills delivers exact volume specs on time, every single morning.',
      author: 'David Harrison',
      role: 'Director of Food & Beverage',
      org: 'The Grand Hotel Birmingham',
    },
  },
  'care-homes': {
    title: 'Nutritious Foodservice Supply for Care Homes & Healthcare',
    subtitle: 'Cost-controlled, dependable fresh food supply with strict allergen auditing, IDDSI compliance support, and scheduled standing orders.',
    badge: 'Care Homes & Healthcare Program',
    icon: HeartHandshake,
    heroImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&auto=format&fit=crop&q=80',
    prepTimeSaved: '25% Reduction in Dicing Prep',
    yieldIncrease: '100% Guaranteed Portions',
    painPoints: [
      { title: 'Budget & Price Volatility', desc: 'Fixed monthly pricing schedules to protect your per-resident daily food budget.' },
      { title: 'Allergen & Traceability Risk', desc: 'Clear digital allergen matrices and batch tracking on every invoice and delivery note.' },
      { title: 'Staff Ordering Burden', desc: 'Scheduled automated standing orders so catering managers never forget weekly staples.' },
    ],
    keyProducts: [
      'Selected Maris Piper Washed Potatoes (25kg)',
      'Pre-Cut Fresh Stew Vegetables & Root Medleys',
      'Fortified Dairy Products & Full-Cream Milk',
      'Tender Braising Meats & Minces',
      'Seasonal Soft Fruits & Easy-Peel Citrus',
      'Dietary & Pureed Texture Prep Produce',
    ],
    serviceBenefits: [
      'Scheduled weekly standing orders with automated delivery confirmation',
      'Full product spec sheets with nutritional and allergen certification',
      'Consistent fixed-price contracts to prevent care home budget overruns',
      'CRB-checked, professional delivery drivers',
    ],
    testimonial: {
      quote: 'Rootwills provides our care catering teams with total peace of mind. Consistent quality root vegetables, reliable scheduled deliveries, and transparent allergen tracking.',
      author: 'Sarah Jenkins',
      role: 'Operations Director',
      org: 'Opal Senior Care Living',
    },
  },
  caterers: {
    title: 'Wholesale Produce & Food Supply for Luxury Caterers',
    subtitle: 'Flexible, scalable fresh food supply for event catering companies, private dining chefs, and marquee wedding venues.',
    badge: 'Event Catering Program',
    icon: PartyPopper,
    heroImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&auto=format&fit=crop&q=80',
    prepTimeSaved: '15% Banquet Assembly Speed',
    yieldIncrease: 'Zero Trimming Loss',
    painPoints: [
      { title: 'Irregular Event Delivery Locations', desc: 'We deliver directly to your temporary venue, marquee site, or production kitchen.' },
      { title: 'Weekend Volume Spikes', desc: 'High-capacity surge ordering for 500+ cover corporate banquets and weddings.' },
      { title: 'Specialist Sourcing Needs', desc: 'Rare artisanal items, micro-herbs, and bespoke prep to match your custom menus.' },
    ],
    keyProducts: [
      'Seasonal Heirloom Vegetables & Baby Veg',
      'Prime Dry-Aged Steaks & Frenched Lamb Racks',
      'Specialty Truffles, Caviar & Infusions',
      'Bulk Artisan Dairy & Pastry Essentials',
      'Fresh Canapé Garnishes & Edible Petals',
    ],
    serviceBenefits: [
      'Custom venue drop-off routing with driver dispatch contact',
      'Surge ordering capabilities with guaranteed stock allocation',
      'Sample product provisions for client menu tastings',
      'Direct WhatsApp and commercial desk priority access',
    ],
    testimonial: {
      quote: 'For 500-guest marquee weddings, there is zero margin for error. Rootwills delivers pristine heirloom vegetables and prime beef straight to our prep kitchens.',
      author: 'Claire Beaumont',
      role: 'Founder & Culinary Director',
      org: 'Beaumont Luxury Events',
    },
  },
  'pubs-bars': {
    title: 'Foodservice Supply for Gastropubs & High-Volume Bars',
    subtitle: 'Consistent, profit-driving produce and foodservice items for gastropubs, burger kitchens, and cocktail bars.',
    badge: 'Pub & Bar Supply Program',
    icon: Beer,
    heroImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&auto=format&fit=crop&q=80',
    prepTimeSaved: 'High-Dry Matter Chipping',
    yieldIncrease: '+20% Higher French Fry Yield',
    painPoints: [
      { title: 'Inconsistent Hand-Cut Chips', desc: 'Selected high-starch Maris Piper potatoes graded specifically for frying and roasting.' },
      { title: 'High Citrus & Garnish Costs', desc: 'Wholesale cases of unwaxed lemons, limes, and cocktail herbs at direct bulk rates.' },
      { title: 'Sunday Roast Surges', desc: 'Guaranteed weekend delivery of roast meats, potatoes, and gravy-prep roots.' },
    ],
    keyProducts: [
      'Washed 25kg Maris Piper Potatoes (High-Dry Matter)',
      'Unwaxed Bar Limes & Lemons (Cases of 100+)',
      'Fresh Mint & Cocktail Herb Bunches',
      'Prime British Chuck & Brisket Burger Blends',
      'Brioche Burger Buns & Sourdoughs',
      'Sunday Roast Trimmings & Root Veg',
    ],
    serviceBenefits: [
      'Sunday morning early drops for weekend roast readiness',
      'Volume citrus discounts for high-volume mixology bars',
      'Simple reordering directly via smartphone',
      'Generous 30-day trade credit lines',
    ],
    testimonial: {
      quote: 'Our potato consistency used to be a nightmare with previous suppliers. Since switching to Rootwills, our hand-cut triple-cooked chips have never looked better.',
      author: 'Tom Cartwright',
      role: 'General Manager',
      org: 'The Crown & Anchor Gastropub',
    },
  },
  pubs: {
    title: 'Foodservice Supply for Gastropubs & High-Volume Bars',
    subtitle: 'Consistent, profit-driving produce and foodservice items for gastropubs, burger kitchens, and cocktail bars.',
    badge: 'Pub & Bar Supply Program',
    icon: Beer,
    heroImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&auto=format&fit=crop&q=80',
    prepTimeSaved: 'High-Dry Matter Chipping',
    yieldIncrease: '+20% Higher French Fry Yield',
    painPoints: [
      { title: 'Inconsistent Hand-Cut Chips', desc: 'Selected high-starch Maris Piper potatoes graded specifically for frying and roasting.' },
      { title: 'High Citrus & Garnish Costs', desc: 'Wholesale cases of unwaxed lemons, limes, and cocktail herbs at direct bulk rates.' },
      { title: 'Sunday Roast Surges', desc: 'Guaranteed weekend delivery of roast meats, potatoes, and gravy-prep roots.' },
    ],
    keyProducts: [
      'Washed 25kg Maris Piper Potatoes (High-Dry Matter)',
      'Unwaxed Bar Limes & Lemons (Cases of 100+)',
      'Fresh Mint & Cocktail Herb Bunches',
      'Prime British Chuck & Brisket Burger Blends',
      'Brioche Burger Buns & Sourdoughs',
      'Sunday Roast Trimmings & Root Veg',
    ],
    serviceBenefits: [
      'Sunday morning early drops for weekend roast readiness',
      'Volume citrus discounts for high-volume mixology bars',
      'Simple reordering directly via smartphone',
      'Generous 30-day trade credit lines',
    ],
    testimonial: {
      quote: 'Our potato consistency used to be a nightmare with previous suppliers. Since switching to Rootwills, our hand-cut triple-cooked chips have never looked better.',
      author: 'Tom Cartwright',
      role: 'General Manager',
      org: 'The Crown & Anchor Gastropub',
    },
  },
  schools: {
    title: 'Wholesale Produce Supply for Schools & Educational Caterers',
    subtitle: 'Nutritious, School Food Standards compliant fresh food supply with Red Tractor certification and reliable bulk distribution.',
    badge: 'Schools & Colleges Program',
    icon: GraduationCap,
    heroImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&auto=format&fit=crop&q=80',
    prepTimeSaved: 'Pre-Washed & Portion Controlled',
    yieldIncrease: '100% Compliant Yield',
    painPoints: [
      { title: 'Tight Per-Pupil Budget Caps', desc: 'Contract-locked pricing for term-time budgets with zero surprise price spikes.' },
      { title: 'Nut-Free & Allergy Safety', desc: 'Audited nut-free supply segregation and comprehensive allergen documentation.' },
      { title: 'Strict Sourcing Standards', desc: '100% Red Tractor certified British meats, dairy, and seasonal vegetables.' },
    ],
    keyProducts: [
      'Red Tractor British Whole Milk & Cheese',
      'Seasonal UK Apples, Pears & Easy-Peel Oranges',
      'Washed Pre-Diced Root Vegetables',
      'Lean British Minced Beef & Diced Chicken',
      'Fresh Salad Vegetables & Cucumbers',
    ],
    serviceBenefits: [
      'Compliant with Department for Education School Food Standards',
      'Allergen tracking integrated into digital order sheets',
      'Term-time delivery scheduling with automatic holiday pauses',
      'Dedicated public sector purchasing discounts',
    ],
    testimonial: {
      quote: 'Rootwills makes term-time provisioning straightforward. Fresh British seasonal fruit and vegetables at prices that fit our per-pupil budget constraints.',
      author: 'Helen Foster',
      role: 'Head of Catering',
      org: 'Midlands Education Trust',
    },
  },
};

export default function SectorPage({ params }: { params: { sector: string } }) {
  const sector = SECTORS_DATA[params.sector];
  if (!sector) return notFound();
  const seo = SECTORS_SEO[params.sector.toLowerCase()];

  const IconComponent = sector.icon;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 pb-20 space-y-12 sm:space-y-16">
      {/* ─── Hero Header ─── */}
      <section className="bg-[#180306] text-white relative overflow-hidden border-b border-[#BA8E4E]/25 pt-14 sm:pt-20 pb-16 lg:pb-20">
        {/* Authentic Rich Damask Texture */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-85"
          style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
        />
        {/* Atmospheric Vignette & Contrast Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(16,2,4,0.45)_75%,rgba(8,1,2,0.85)_100%)] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#180306]/70 via-transparent to-[#100204]/85 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BA8E4E]/15 border border-[#BA8E4E]/40 text-[#D4A86A] text-xs font-serif uppercase tracking-[0.2em] font-semibold">
                <IconComponent className="w-3.5 h-3.5 text-[#D4A86A]" />
                <span>{sector.badge}</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                {seo?.h1 || sector.title}
              </h1>
              
              <p className="text-xs sm:text-base text-[#EDE4D8]/85 leading-relaxed font-sans">
                {sector.subtitle}
              </p>

              {/* Live Operational Metrics Strip */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-[#1A0307]/80 border border-[#BA8E4E]/30 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-[#D4A86A] shrink-0" />
                  <div>
                    <span className="text-[#D4A86A] font-serif font-bold block text-sm">{sector.yieldIncrease}</span>
                    <span className="text-xs text-[#EDE4D8]/70 font-sans">Crate Usability</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1A0307]/80 border border-[#BA8E4E]/30 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#D4A86A] shrink-0" />
                  <div>
                    <span className="text-[#D4A86A] font-serif font-bold block text-sm">{sector.prepTimeSaved}</span>
                    <span className="text-xs text-[#EDE4D8]/70 font-sans">Kitchen Efficiency</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3.5 text-xs">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center justify-center gap-3 pl-7 pr-2.5 py-2.5 rounded-full bg-[#D4A86A] hover:bg-[#C59958] text-[#2D060D] text-xs sm:text-[13px] font-serif font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-xl active:scale-[0.98]"
                >
                  <span>Apply for Sector Facility</span>
                  <div className="w-7 h-7 rounded-full bg-[#2D060D]/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5 text-[#2D060D]" />
                  </div>
                </Link>
                <Link
                  href="#quote-section"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#1A0307]/80 hover:bg-[#2A050D] border border-[#BA8E4E]/40 text-[#EDE4D8] text-xs sm:text-[13px] font-serif font-semibold tracking-wider transition-all"
                >
                  <span>Estimate Kitchen Savings</span>
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#BA8E4E]/30 aspect-[4/3] bg-[#1A0307]">
              <Image
                src={sector.heroImage}
                alt={sector.title}
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0307]/90 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#240409]/90 backdrop-blur-md border border-[#BA8E4E]/35 shadow-xl">
                <div className="flex items-center justify-between text-xs font-serif">
                  <span className="font-bold text-[#EDE4D8] uppercase tracking-wider">Direct Kitchen Delivery SLA</span>
                  <span className="text-[#D4A86A] font-bold">06:00 AM Guaranteed</span>
                </div>
                <div className="text-xs text-[#EDE4D8]/80 mt-1 font-sans">Dual-temperature fleet arriving 6 mornings a week with zero thermal breaks.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 24-Hour Operation Timeline Schedule */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] p-7 sm:p-10 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <span className="text-xs font-serif uppercase text-[#BA8E4E] font-semibold tracking-[0.2em]">— GUARANTEED CADENCE —</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E060D]">How Your Daily Supply Operates</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-2">
              <span className="text-xs font-serif text-[#BA8E4E] font-bold">11:00 PM Tonight</span>
              <h3 className="text-base font-serif font-bold text-[#2E060D]">Service Close Cut-off</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">Order on your phone right after evening dinner service finishes.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-2">
              <span className="text-xs font-serif text-[#BA8E4E] font-bold">02:30 AM</span>
              <h3 className="text-base font-serif font-bold text-[#2E060D]">Optical Quality Grading</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">Depot team hand-grades and picks every crate into chilled compartments.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-2">
              <span className="text-xs font-serif text-[#BA8E4E] font-bold">05:15 AM</span>
              <h3 className="text-base font-serif font-bold text-[#2E060D]">Fleet Launch</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">Dual-temp fleet departs depot with calibrated temperature audit telemetry.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#BA8E4E]/40 space-y-2">
              <span className="text-xs font-serif text-[#8C6629] font-bold">06:00 - 07:30 AM</span>
              <h3 className="text-base font-serif font-bold text-[#2E060D]">Kitchen Cold-Room Drop</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">Pristine crates placed inside your walk-in before morning prep brigades arrive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Resolved */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-serif uppercase text-[#BA8E4E] font-semibold tracking-[0.2em]">— SOLVING INDUSTRY BOTTLENECKS —</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E060D] mt-1">
            Why Standard Broadliners Fail Your Operation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sector.painPoints.map((point, idx) => (
            <div key={idx} className="bg-[#FFFDF9] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-sm space-y-3 hover:border-[#BA8E4E] transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#2E060D] text-[#D4A86A] font-serif font-bold text-sm flex items-center justify-center border border-[#BA8E4E]/30">
                0{idx + 1}
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#2E060D]">{point.title}</h3>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tailored Product Range & Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Sector Lines */}
          <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-[#BA8E4E] font-serif text-xs uppercase tracking-[0.2em] font-semibold">
              <Sparkles className="w-4 h-4 text-[#BA8E4E]" />
              <span>Core Sector Product Assortment</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2E060D]">
              High-Demand Commercial Lines
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              {sector.keyProducts.map((prod, idx) => (
                <li key={idx} className="flex items-center gap-3 text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-[#BA8E4E] shrink-0" />
                  <span className="font-sans font-medium">{prod}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-[#E8DEC8]">
              <Link
                href="/#services"
                className="text-xs font-serif font-bold text-[#BA8E4E] hover:text-[#8C6629] flex items-center gap-1 uppercase tracking-wider transition-colors"
              >
                <span>View all products in our wholesale catalog &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Operational Benefits */}
          <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-[#BA8E4E] font-serif text-xs uppercase tracking-[0.2em] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#BA8E4E]" />
              <span>Service Level Agreements</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2E060D]">
              The Dedicated Operational Package
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              {sector.serviceBenefits.map((ben, idx) => (
                <li key={idx} className="flex items-center gap-3 text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-[#BA8E4E] shrink-0" />
                  <span className="font-sans font-medium">{ben}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-[#E8DEC8]">
              <div className="text-xs text-stone-600 font-sans">
                Need bespoke sourcing or volume specs? Contact our buyer desk: <span className="text-[#2E060D] font-serif font-bold">+44 (0) 20 1234 5678</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sector Testimonial */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] p-8 sm:p-12 rounded-3xl border border-[#E8DEC8] shadow-sm text-center space-y-4">
          <div className="flex justify-center gap-1 text-[#BA8E4E]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <p className="text-base sm:text-lg font-serif italic text-stone-800 leading-relaxed max-w-2xl mx-auto">
            &ldquo;{sector.testimonial.quote}&rdquo;
          </p>
          <div className="pt-2">
            <div className="font-serif font-bold text-[#2E060D] text-sm">{sector.testimonial.author}</div>
            <div className="text-xs text-stone-500 font-sans">{sector.testimonial.role} &bull; {sector.testimonial.org}</div>
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section id="quote-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PriceEstimator />
      </section>

      {/* Commercial Bottom CTA */}
      <CommercialBottomCTA />
    </div>
  );
}
