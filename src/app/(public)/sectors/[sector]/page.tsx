import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
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
  Phone
} from 'lucide-react';

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

interface SectorData {
  title: string;
  subtitle: string;
  badge: string;
  icon: any;
  heroImage: string;
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

  const IconComponent = sector.icon;

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* Hero Header */}
      <section className="relative pt-12 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase">
                <IconComponent className="w-4 h-4" />
                <span>{sector.badge}</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream leading-tight">
                {sector.title}
              </h1>
              <p className="text-base sm:text-lg text-cream/75 leading-relaxed font-sans">
                {sector.subtitle}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/onboarding"
                  className="px-7 py-3.5 rounded-xl font-bold text-obsidian-950 bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <span>Open a Trade Account</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#quote-section"
                  className="px-6 py-3.5 rounded-xl font-semibold text-cream bg-obsidian-900 border border-cream/20 hover:border-champagne flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <span>Get Custom Sector Pricing</span>
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-cream/15 aspect-[4/3] bg-obsidian-900">
              <Image
                src={sector.heroImage}
                alt={sector.title}
                fill
                quality={75}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-obsidian-950/80 backdrop-blur-md border border-cream/10">
                <div className="text-xs font-bold text-champagne font-mono uppercase">Direct Delivery Guarantee</div>
                <div className="text-xs text-cream/80 mt-0.5">Dual-temp fleet arriving 6 mornings a week across the Midlands & UK.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Resolved */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase text-champagne tracking-wider">Solving Industry Bottlenecks</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            Why Standard Broadliners Fail Your Operation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sector.painPoints.map((point, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-cream/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-champagne/10 text-champagne font-mono font-bold text-sm flex items-center justify-center">
                0{idx + 1}
              </div>
              <h3 className="font-display text-lg font-bold text-cream">{point.title}</h3>
              <p className="text-xs text-cream/65 leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tailored Product Range & Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Key Sector Lines */}
          <div className="glass-panel p-8 rounded-2xl space-y-6">
            <div className="flex items-center gap-2 text-champagne font-mono text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Core Sector Product Assortment</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-cream">
              High-Demand Commercial Lines
            </h3>
            <ul className="space-y-3 text-sm">
              {sector.keyProducts.map((prod, idx) => (
                <li key={idx} className="flex items-center gap-3 text-cream/80">
                  <CheckCircle2 className="w-4 h-4 text-champagne shrink-0" />
                  <span>{prod}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-cream/10">
              <Link
                href="/products"
                className="text-xs font-semibold text-champagne hover:underline flex items-center gap-1"
              >
                <span>View all products in our wholesale catalog &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Operational Benefits */}
          <div className="glass-panel p-8 rounded-2xl space-y-6">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Service Level Agreements</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-cream">
              The Dedicated Operational Package
            </h3>
            <ul className="space-y-3 text-sm">
              {sector.serviceBenefits.map((ben, idx) => (
                <li key={idx} className="flex items-center gap-3 text-cream/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-cream/10">
              <div className="text-xs text-cream/60">
                Need specific bespoke sourcing? Contact our direct buyer desk: <span className="text-champagne font-mono">0121 790 8800</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sector Testimonial */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-gold p-8 sm:p-10 rounded-2xl text-center space-y-4 shadow-xl">
          <p className="font-display text-xl sm:text-2xl italic text-cream leading-relaxed">
            "{sector.testimonial.quote}"
          </p>
          <div>
            <div className="font-bold text-champagne text-sm">{sector.testimonial.author}</div>
            <div className="text-xs text-cream/60">{sector.testimonial.role} &bull; {sector.testimonial.org}</div>
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section id="quote-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PriceEstimator />
      </section>
    </div>
  );
}
