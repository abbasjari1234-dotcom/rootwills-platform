import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { 
  Truck, 
  Clock, 
  ShieldCheck, 
  Coins, 
  Sparkles, 
  Snowflake, 
  Sprout, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  FileText,
  UtensilsCrossed,
  Layers,
  CalendarCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wholesale Foodservice Solutions & Pre-Dawn Multi-Drop | Rootwills UK',
  description:
    'Reliable B2B wholesale food supply and pre-dawn multi-drop delivery across London, Birmingham, and the Midlands. Hand-graded fresh produce, prime butchery, dairy, and ambient catering staples delivered directly to commercial kitchens.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Rootwills Food Services & Wholesale Distribution UK',
    description:
      'Contract wholesale supply for restaurants, hotels, schools, and commercial caterers. Pre-dawn refrigerated delivery from 04:00 AM.',
    url: 'https://www.rootwills.co.uk/services',
    type: 'website',
  },
};

const WHOLESALE_SERVICES = [
  {
    step: '01',
    badge: 'HOSPITALITY DIRECT',
    title: 'Daily Food Service Supply',
    subtitle: 'From Field to Kitchen Before Morning Prep Begins',
    description:
      'We supply independent bistros, fine dining restaurants, and hotel kitchens with daily fresh produce, artisan dairy, and prime meats. Every order is inspected at our 02:00 AM market depot intake and delivered between 04:00 and 07:30 AM so your brigade can start service without waiting for supplies.',
    highlights: [
      'Guaranteed pre-dawn drop windows (04:00 – 07:30 AM)',
      'Class 1 hand-selected fruit, vegetables, and living micro-herbs',
      'Red Tractor British beef, poultry, and day-boat coastal seafood',
      'Zero split-case surcharges for bespoke menu testing',
    ],
    image: '/images/commercial/chef_inspect_produce.jpg',
    imageAlt: 'Head chef inspecting fresh morning wholesale produce crate',
  },
  {
    step: '02',
    badge: 'VOLUME & CONTRACTS',
    title: 'Commercial Wholesale Distribution',
    subtitle: 'Locked Margins & Volume Parity for Multi-Site Groups',
    description:
      'For restaurant groups, contract caterers, and institutional dining facilities, Rootwills provides predictable case pricing and scheduled regional drops. We eliminate supplier volatility through forward-contracted grower agreements, ensuring consistent food costs throughout your quarterly menu cycles.',
    highlights: [
      'Tiered volume pricing matrix with index-linked price protection',
      'Consolidated multi-site invoicing with 30-day commercial credit terms',
      'Comprehensive allergen and nutritional data integration',
      'Electronic Proof of Delivery (ePOD) with time-stamped temperature logs',
    ],
    image: '/images/commercial/cold_depot_logistics.jpg',
    imageAlt: 'Temperature-controlled multi-temperature wholesale logistics depot',
  },
  {
    step: '03',
    badge: 'MENU FORECASTING',
    title: 'Bespoke Sourcing & Seasonal Planning',
    subtitle: 'Dedicated Account Management for Executive Chefs',
    description:
      'Our senior buyers work directly with culinary directors to forecast seasonal yields, reserve small-batch harvest parcels, and secure specialty imports from European markets. Whether you need forced Yorkshire rhubarb in January or heritage Amalfi lemons in spring, our supply desk coordinates directly with generational growers.',
    highlights: [
      'Dedicated wholesale account manager accessible via phone and direct WhatsApp',
      'Early access to seasonal British farm flushes and specialty imports',
      'Standing order automation with standing case quantity parity',
      'Next-day sample crate requests for seasonal menu development',
    ],
    image: '/images/commercial/rootwills_hero_chef_plating.jpg',
    imageAlt: 'Executive chef garnishing fine dining plate with fresh microgreens',
  },
];

const LOGISTICS_SPECIFICATIONS = [
  {
    icon: Snowflake,
    title: 'Dual-Evaporator Multi-Zone Fleet',
    desc: 'Our refrigerated vehicles maintain independent temperature zones: chilled produce at 1–4°C, fresh butchery at 0–2°C, frozen goods at -18°C, and ambient dry larder goods.',
  },
  {
    icon: Clock,
    title: 'Strict Pre-Dawn Dispatch',
    desc: 'Routes run between 04:00 and 07:30 AM to bypass urban congestion and ensure all fresh deliveries are safely inside your kitchen or secure key-drop area before front-of-house opens.',
  },
  {
    icon: ShieldCheck,
    title: 'Full Farm Traceability',
    desc: 'Every crate carries farm lineage, harvest dates, and depot grading timestamps. We operate under rigorous food hygiene standards benchmarked to BRCGS and SALSA guidelines.',
  },
  {
    icon: Coins,
    title: 'Transparent B2B Billing',
    desc: 'Consolidated weekly or monthly electronic statements with itemised VAT breakdown (0% Zero-Rated UK food vs 20% Standard Rate consumables) simplify accounting reconciliation.',
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
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Digbeth Wholesale Logistics Corridor',
        addressLocality: 'Birmingham',
        postalCode: 'B5 4RB',
        addressCountry: 'GB',
      },
    },
    areaServed: ['Birmingham', 'London', 'West Midlands', 'Warwickshire', 'Coventry'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Wholesale Hospitality Food Supply',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Daily Restaurant Food Supply',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Volume Commercial Wholesale Distribution',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Temperature-Controlled Pre-Dawn Multi-Drop Delivery',
          },
        },
      ],
    },
  };

  return (
    <div className="w-full bg-[#FAF7F2] text-[#131313] min-h-screen pt-24 sm:pt-28 pb-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Header Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2E060D]/5 border border-[#2E060D]/10 text-xs font-mono font-semibold uppercase tracking-widest text-[#2E060D]">
            <span>Commercial Wholesale Solutions</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#131313] tracking-tight leading-[1.15]">
            Wholesale Foodservice &amp; Pre-Dawn Multi-Drop Supply
          </h1>
          
          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Delivering hand-graded British produce, butcher cuts, dairy, and pantry lines directly to professional hospitality kitchens across Birmingham, the Midlands, and London.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Link
              href="/products"
              className="px-6 py-3 rounded-full bg-[#2E060D] hover:bg-[#430A14] text-white text-sm font-semibold transition-all duration-150 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Explore 5,480+ Products</span>
              <ArrowRight className="w-4 h-4 text-[#F3D08A]" />
            </Link>
            
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-white hover:bg-stone-50 text-[#131313] border border-[#E8DEC8] text-sm font-semibold transition-all duration-150 shadow-xs cursor-pointer"
            >
              <span>Open Commercial Account</span>
            </Link>
          </div>
        </section>

        {/* Core Services Breakdown */}
        <section className="space-y-12 sm:space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#131313]">
              Tailored Supply Programs for Food Businesses
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 font-sans">
              From independent neighbourhood restaurants to multi-site hospitality groups, we structure our supply to match your kitchen workflow.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {WHOLESALE_SERVICES.map((srv, idx) => (
              <div
                key={srv.step}
                className={`bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-[0_4px_24px_rgba(46,6,13,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Content Column */}
                <div className={`space-y-4 lg:col-span-7 ${idx % 2 === 1 ? 'lg:col-start-6' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#BA8E4E] px-2.5 py-0.5 rounded bg-[#FAF5EB] border border-[#BA8E4E]/30">
                      {srv.badge}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      SERVICE {srv.step}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E060D] leading-snug">
                    {srv.title}
                  </h3>

                  <p className="text-sm font-semibold text-stone-700">
                    {srv.subtitle}
                  </p>

                  <p className="text-sm text-stone-600 leading-relaxed font-sans">
                    {srv.description}
                  </p>

                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {srv.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#2E060D] hover:text-[#8B1A28] transition-colors"
                    >
                      <span>Inquire About {srv.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Visual Column */}
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-[#E8DEC8] shadow-inner">
                    <Image
                      src={srv.image}
                      alt={srv.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cold-Chain Logistics Standards */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DEC8] shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#BA8E4E] font-bold">
              Operational Rigor
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#131313] mt-1">
              Cold-Chain Temperature Telemetry &amp; Compliance
            </h2>
            <p className="text-sm text-stone-600 mt-2 font-sans leading-relaxed">
              Food safety is non-negotiable. Our logistical processes protect ingredient vitality from the moment harvests leave the soil to final kitchen check-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOGISTICS_SPECIFICATIONS.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8DEC8] space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E8DEC8] flex items-center justify-center text-[#2E060D] shadow-2xs">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="text-base font-bold text-[#131313]">
                    {spec.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {spec.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Commercial CTA Strip */}
        <section className="rounded-3xl bg-[#2E060D] text-white p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Ready to Upgrade Your Kitchen Wholesale Supply?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              Open a direct trade account today. Our Birmingham dispatch team will review your menu requirements and configure contracted volume rates within 24 hours.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full bg-[#FAF7F2] text-[#2E060D] text-sm font-semibold hover:bg-white transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Request Trade Account Setup
            </Link>
            
            <a
              href="tel:+441616412803"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#F3D08A]" />
              <span>Direct Depot: +44 16164 12803</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

