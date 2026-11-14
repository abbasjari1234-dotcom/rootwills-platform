import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { 
  ArrowRight, 
  ArrowUpRight,
  Clock, 
  Sparkles, 
  Snowflake, 
  Coins, 
  Sprout, 
  CheckCircle2, 
  UserCheck, 
  CreditCard, 
  Calendar,
  UtensilsCrossed,
  Building2,
  ChefHat,
  Landmark,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { DoodleFlourish } from '@/components/public/DoodleFlourish';

export const metadata: Metadata = {
  title: 'Wholesale Produce Supplier Birmingham & UK | Rootwills',
  description:
    'Commercial food service and fresh produce wholesaler for restaurants and hotels across Birmingham and UK. Pre-dawn delivery and wholesale trade terms.',
  keywords: [
    'wholesale produce supplier Birmingham',
    'commercial food service supplier UK',
    'restaurant food suppliers Birmingham',
    'wholesale fruit and veg supplier West Midlands',
    'fresh produce suppliers for restaurants London',
    'wholesale catering supplier Midlands',
    'hospitality food distributors UK',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Wholesale Produce Supplier Birmingham & UK | Rootwills',
    description:
      'Commercial foodservice and fresh produce wholesale supplying hospitality kitchens across Birmingham and London pre-dawn.',
    url: 'https://www.rootwills.co.uk/services',
    siteName: 'Rootwills',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/images/commercial/rootwills_hero_chef_plating.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wholesale Produce Supplier Birmingham & UK | Rootwills',
    description:
      'Commercial food service and fresh produce wholesaler with pre-dawn delivery across Birmingham and UK.',
    images: ['/images/commercial/rootwills_hero_chef_plating.jpg'],
  },
};

const SERVICES_DATA = [
  {
    index: '01',
    tag: 'LOGISTICS & FRESH PRODUCE',
    badge: 'MICHELIN & BISTRO',
    title: 'Food Service Supply',
    subtitle: 'Field-to-Kitchen Deliveries Before Your Morning Prep Begins',
    description: 'Fresh, hand-graded ingredients and chef-specified kitchen essentials delivered pre-dawn across London and the Midlands.',
    image: '/images/commercial/chef_inspect_produce.jpg',
    imageAlt: 'Head chef inspecting fresh morning harvest produce crate',
    highlights: [
      { 
        icon: Clock, 
        title: '04:00 AM Dawn London Drops',
        desc: 'Reliable transit routes hitting your loading docks before service preparation starts.' 
      },
      { 
        icon: Sparkles, 
        title: 'Chef-Curated Farm Produce',
        desc: 'Ingredients hand-selected to meet strict culinary specifications.' 
      },
      { 
        icon: Snowflake, 
        title: 'Continuous Cold-Chain Telemetry',
        desc: 'GPS-monitored fleet keeping produce in peak climatic condition.' 
      },
    ],
  },
  {
    index: '02',
    tag: 'COMMERCIAL DISTRIBUTION',
    badge: 'VOLUME CONTRACTS',
    title: 'Wholesale Solutions',
    subtitle: 'Margin-Locked Supply Chains for Multi-Site Venues',
    description: 'Reliable, margin-locked wholesale supply for hospitality businesses of all sizes, from independent venues to multi-site groups.',
    image: '/images/commercial/cold_depot_logistics.jpg',
    imageAlt: 'Temperature-controlled wholesale distribution hub',
    highlights: [
      { 
        icon: Coins, 
        title: 'Tiered Volume Rates & Locked Terms',
        desc: 'Protecting your food margins against seasonal market fluctuations.' 
      },
      { 
        icon: Sprout, 
        title: 'Direct Grower & Farm Lineage',
        desc: 'Sourcing straight from the farm gate to guarantee unmatched product freshness.' 
      },
      { 
        icon: CheckCircle2, 
        title: 'Zero Split-Case Surcharges',
        desc: 'Ordering exactly what your kitchen requires without paying punishing split-case penalties.' 
      },
    ],
  },
  {
    index: '03',
    tag: 'STRATEGIC ACCOUNTS',
    badge: 'DEDICATED DESK',
    title: 'Business Partnerships',
    subtitle: 'Direct Collaboration with Culinary Directors & Procurement Teams',
    description: 'We collaborate directly with head chefs and culinary directors to engineer bespoke supply schedules and seasonal menu forecasts.',
    image: '/images/commercial/rootwills_hero_chef_plating.jpg',
    imageAlt: 'Executive chef plating fine dining dish with fresh micro-herbs',
    highlights: [
      { 
        icon: UserCheck, 
        title: 'Assigned Senior Depot Account Lead',
        desc: 'A dedicated wholesale logistics manager on direct dial whenever you need them.' 
      },
      { 
        icon: CreditCard, 
        title: '30-Day Commercial Trade Terms',
        desc: 'Seamless credit facilities structured for modern hospitality operations.' 
      },
      { 
        icon: Calendar, 
        title: 'Seasonal Menu Yield Forecasts',
        desc: 'Data-driven crop insights helping you manage plate costs before menu shifts.' 
      },
    ],
  },
];

const SECTORS_WE_SERVE = [
  {
    title: 'Restaurants & Fine Dining',
    subtitle: 'Hand-graded heritage produce, coastal catch, and living microgreens.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80',
    icon: UtensilsCrossed,
    tag: 'CULINARY',
  },
  {
    title: 'Hotels & Boutique Resorts',
    subtitle: 'Multi-outlet breakfast dairy, artisan bakery lines, and large-scale banqueting supply.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    icon: Building2,
    tag: 'HOSPITALITY',
  },
  {
    title: 'Event & Contract Caterers',
    subtitle: 'Precision-timed volume drops and bespoke menu spec grading for tight operational windows.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80',
    icon: ChefHat,
    tag: 'CATERING',
  },
  {
    title: 'Gastro Pubs & Institutions',
    subtitle: 'Dependable British farm staples, prime butchery cuts, and a comprehensive dry larder selection.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80',
    icon: Landmark,
    tag: 'COMMERCIAL',
  },
];

export default function ServicesPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Wholesale Food Service and Commercial Catering Supply',
    provider: {
      '@type': 'WholesaleStore',
      name: 'Rootwills Food Services & Wholesale',
      url: 'https://www.rootwills.co.uk',
      telephone: '+44 16164 12803',
    },
    areaServed: ['Birmingham', 'London', 'West Midlands', 'Warwickshire'],
  };

  return (
    <div className="relative bg-[#FAF7F2] min-h-screen text-[#131313] overflow-x-hidden">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* ─── ACT I: EDITORIAL HERO HEADER (Rootwills Parchment & Burgundy Identity) ─── */}
      <section className="relative z-10 pt-28 sm:pt-36 pb-14 sm:pb-20 border-b border-[#E8DEC8]/70 overflow-hidden">
        {/* Seamless Unified Parchment Texture */}
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          {/* Monospace Eyebrow Capsule */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#2E060D] font-semibold">
              02 // HOSPITALITY SOLUTIONS &amp; WHOLESALE
            </span>
          </div>

          <div className="relative">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-[-0.025em] text-[#2E060D] leading-[1.08] [text-wrap:balance]">
              Tailored Solutions for <br className="hidden sm:inline" />
              <span className="text-[#8B2635] italic font-normal">Every Food Business</span>
            </h1>
            <div className="flex justify-center">
              <DoodleFlourish 
                variant="underline-loop" 
                color="#BA8E4E" 
                strokeWidth={3} 
                className="w-52 sm:w-72 -mt-1 sm:-mt-1.5 mb-2 text-[#BA8E4E]" 
                delay={150}
              />
            </div>
          </div>

          <p className="text-xs sm:text-sm lg:text-[15.5px] text-stone-600 font-sans max-w-[66ch] mx-auto leading-[1.68]">
            We provide a comprehensive, end-to-end suite of foodservice supply and wholesale capabilities, specifically engineered to align with the daily operational rhythm of independent restaurants, luxury hotels, and high-volume commercial catering groups.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-[#2E060D] hover:bg-[#131313] text-[#FAF7F2] text-xs sm:text-[13px] font-sans font-semibold tracking-wider uppercase transition-all duration-200 active:scale-[0.96] shadow-[0_8px_24px_rgba(46,6,13,0.18)] cursor-pointer"
            >
              <span>Explore 5,480+ Products</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/12 ring-1 ring-white/20 flex items-center justify-center text-[#F3D08A] group-hover:bg-[#F3D08A] group-hover:text-[#131313] transition-all duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFFDF9] hover:bg-[#EFE8D8]/70 text-[#2E060D] text-xs sm:text-[13px] font-sans font-semibold tracking-wide border border-[#E8DEC8] hover:border-[#BA8E4E]/60 transition-all duration-200 active:scale-[0.96] shadow-2xs cursor-pointer"
            >
              <span>Open Commercial Account</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ACT II: CORE SERVICE PILLARS (Original Triple-Card Architecture) ─── */}
      <section className="relative z-10 py-12 sm:py-20 border-b border-[#E8DEC8]/70 overflow-hidden">
        {/* Seamless Unified Parchment Texture */}
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.index}
                className="group relative rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] hover:border-[#BA8E4E] shadow-[0_6px_24px_rgba(46,6,13,0.04)] hover:shadow-[0_16px_36px_rgba(46,6,13,0.09)] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                {/* Unobstructed Photography with Rootwills Seal */}
                <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-[#2E060D] border-b border-[#E8DEC8]">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#2E060D]/[0.05] mix-blend-multiply pointer-events-none" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FAF7F2]/95 ring-1 ring-[#BA8E4E]/65 shadow-sm overflow-hidden pointer-events-none">
                    <Image
                      src="/images/logo.png"
                      alt="Rootwills Seal"
                      fill
                      unoptimized
                      sizes="32px"
                      className="object-contain p-0.5 rounded-full"
                    />
                  </div>
                  <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded bg-[#131313]/70 backdrop-blur-xs text-[10px] font-mono text-[#F3D08A] uppercase tracking-wider">
                    {service.tag}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B2635] font-semibold">
                        {service.badge}
                      </span>
                      <span className="font-mono text-xs text-stone-400 tabular-nums">
                        /{service.index}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2E060D] group-hover:text-[#8B2635] transition-colors duration-150 mb-1 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-stone-700 mb-2 font-sans">
                      {service.subtitle}
                    </p>
                    <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-sans">
                      {service.description}
                    </p>
                  </div>

                  {/* Highlights List */}
                  <ul className="space-y-2.5 pt-3.5 border-t border-[#E8DEC8] text-xs text-stone-700 font-sans">
                    {service.highlights.map((item, hIdx) => {
                      const Icon = item.icon;
                      return (
                        <li key={hIdx} className="flex items-start gap-2.5">
                          <Icon className="w-3.5 h-3.5 text-[#8B2635] shrink-0 mt-0.5" strokeWidth={2} />
                          <span className="leading-snug text-[12px]">
                            <strong className="font-semibold text-[#2E060D]">{item.title}:</strong>{' '}
                            <span className="text-stone-600">{item.desc}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACT III: SECTORS WE SERVE (Hospitality Grid with Editorial Typography) ─── */}
      <section className="relative z-10 py-12 sm:py-20 border-b border-[#E8DEC8]/70 overflow-hidden">
        {/* Seamless Unified Parchment Texture */}
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8B2635] font-semibold">
              <span>HOSPITALITY PORTFOLIO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2E060D] tracking-tight">
              Sectors We Proudly Supply
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Tailored supply agreements structured around your service timings, brigade size, and storage constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SECTORS_WE_SERVE.map((sector, sIdx) => {
              const Icon = sector.icon;
              return (
                <div
                  key={sIdx}
                  className="group relative rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] hover:border-[#BA8E4E] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative w-full h-36 overflow-hidden bg-stone-900 border-b border-[#E8DEC8]">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#2E060D]/20 mix-blend-multiply pointer-events-none" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#FAF7F2]/90 text-[9px] font-mono font-bold text-[#8B2635] uppercase tracking-wider">
                      {sector.tag}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[#2E060D] mb-1">
                        <Icon className="w-4 h-4 text-[#BA8E4E]" />
                        <h3 className="text-sm sm:text-base font-serif font-bold text-[#2E060D] group-hover:text-[#8B2635] transition-colors">
                          {sector.title}
                        </h3>
                      </div>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed">
                        {sector.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E8DEC8]/60">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8B2635] hover:text-[#2E060D] transition-colors"
                      >
                        <span>Discuss Venue Supply</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ACT IV: BOTTOM CTA BANNER (Royal Burgundy Velvet with Gold Accents) ─── */}
      <section className="relative z-10 py-14 sm:py-20 bg-gradient-to-br from-[#430A13] via-[#2E060D] to-[#150205] text-[#FAF7F2] overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/textures/burgundy_damask_texture.jpg')" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10.5px] font-mono uppercase tracking-[0.2em] text-[#F3D08A]">
            <span>Commercial Accounts Desk</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-bold text-white tracking-tight">
            Ready to Streamline Your Kitchen Wholesale Supply?
          </h2>

          <p className="text-xs sm:text-sm text-white/80 font-sans max-w-2xl mx-auto leading-relaxed">
            Open a direct commercial trade account today. Our Birmingham dispatch desk will immediately configure your contracted rates, automate standing orders, and secure pre-dawn delivery slots tailored to your menu rhythm.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full bg-[#FAF7F2] hover:bg-white text-[#2E060D] text-xs sm:text-[13px] font-sans font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Request Trade Account Setup
            </Link>

            <a
              href="tel:+441616412803"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-[13px] font-sans font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#F3D08A]" />
              <span>Direct Depot: +44 16164 12803</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
