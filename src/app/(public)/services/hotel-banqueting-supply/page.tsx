import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  Truck,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Phone,
  MessageCircle,
  Building2,
  ChefHat,
  Receipt,
  Layers,
  MapPin,
  ChevronRight,
  Coffee,
  UtensilsCrossed,
  Award,
  CalendarCheck
} from 'lucide-react';
import { DoodleFlourish } from '@/components/public/DoodleFlourish';

export const metadata: Metadata = {
  title: 'Hotel Food Suppliers UK | Luxury Banqueting & Conference Foodservice | Rootwills',
  description:
    'Premier UK hotel food supplier for luxury resorts, boutique hotels & conference centres. Multi-outlet breakfast logistics, bulk banqueting butchery, artisan dairy & daily bakery with 6-day pre-dawn multi-pallet drops across Birmingham, Manchester & the UK.',
  keywords: [
    'hotel food suppliers uk',
    'commercial hotel breakfast suppliers',
    'hotel foodservice distributors birmingham',
    'wholesale food for hotels manchester',
    'banqueting meat and poultry suppliers',
    'conference catering food distributors',
    'hotel dairy and bakery supplier',
    'bulk hospitality food suppliers uk',
    'multi outlet hotel food supply',
    'hotel procurement food distributors'
  ],
  alternates: {
    canonical: '/services/hotel-banqueting-supply',
  },
  openGraph: {
    title: 'Hotel Food Suppliers UK | Rootwills Commercial Foodservice',
    description:
      'Multi-outlet wholesale foodservice for luxury hotels, country resorts, and event banqueting brigades. Consolidated multi-temperature supply delivered pre-dawn.',
    url: 'https://www.rootwills.co.uk/services/hotel-banqueting-supply',
    siteName: 'Rootwills',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/images/commercial/rootwills_hero_chef_plating.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Food Suppliers UK | Rootwills Commercial Foodservice',
    description:
      'Premier UK hotel & banqueting food supplier. Pre-dawn deliveries across Birmingham, Manchester & the UK.',
    images: ['/images/commercial/rootwills_hero_chef_plating.jpg'],
  },
};

const HOTEL_SOLUTIONS = [
  {
    title: 'Multi-Outlet Kitchen Consolidation',
    icon: Building2,
    tag: 'Departmental Invoicing',
    description:
      'Whether supplying the main dining room, breakfast buffet, executive lounge, or banqueting suite, we consolidate delivery into segregated roll-cages with cost-centre coding for seamless accounting.',
    stat: 'Department-level line item billing mapped to your hotel PMS.'
  },
  {
    title: 'High-Volume Banquet & Conference Scaling',
    icon: CalendarCheck,
    tag: 'Event-Schedule Trunking',
    description:
      'Catering for 500-cover gala dinners or multi-day corporate conferences requires precise pallet-drop timing. We coordinate directly with your conference head chef to stage deliveries exactly as needed.',
    stat: 'Dedicated staging trucks for scheduled multi-pallet drops.'
  },
  {
    title: 'Flawless Breakfast & Morning Goods Supply',
    icon: Coffee,
    tag: 'Zero-Defect Breakfast Service',
    description:
      'A hotel guest&apos;s lasting impression is breakfast. We guarantee fresh daily artisan bakery, French butter viennoiserie, Netherend butter portions, and Lion Quality free-range eggs before 06:30 AM.',
    stat: 'Pre-dawn delivery dropped into walk-ins before breakfast shifts.'
  },
  {
    title: 'Corporate Credit & Dedicated Account Director',
    icon: Receipt,
    tag: 'Institutional Terms',
    description:
      'Enjoy 30-day corporate trade terms, volume rebate structures, fixed quarterly seasonal pricing, and a single dedicated senior account director on call 24/7 for emergency service requirements.',
    stat: 'Guaranteed 2-hour response for urgent event re-stocks.'
  }
];

const HOTEL_DIVISIONS = [
  {
    title: 'Breakfast Buffet & Morning Goods',
    desc: 'Artisan viennoiserie, butter portions, Greek yoghurts, free-range eggs, fresh whole milk churns, and sliced bloomers.',
    href: '/products/chilled-dairy',
    cta: 'Explore Dairy & Breakfast'
  },
  {
    title: 'Banqueting Butchery & Carving Joints',
    desc: 'Prime British beef striploins, French-trimmed Welsh lamb racks, Red Tractor chicken fillets, and slow-cook primals.',
    href: '/products/meat-poultry',
    cta: 'Explore Banqueting Meats'
  },
  {
    title: 'Fresh Farm Produce & Microgreens',
    desc: 'Class 1 seasonal British vegetables, pre-prepped roasting potatoes, living microgreens, and exotic fruits.',
    href: '/products/fresh-produce',
    cta: 'Explore Fresh Produce'
  },
  {
    title: 'Artisan Bakery & Afternoon Tea Goods',
    desc: 'Slow-fermented sourdough loaves, clotted creams, brioche burger buns, and fine morning pastries.',
    href: '/products/bakery-breakfast',
    cta: 'Explore Bakery Lines'
  }
];

const HOTEL_FAQS = [
  {
    q: 'Can Rootwills deliver to multiple kitchens or bars within a single hotel property?',
    a: 'Yes. For large hotel properties and resorts with separate kitchens (e.g. main restaurant, banqueting kitchen, breakfast prep, and bar), our drivers deliver order crates pre-sorted and labeled by department or cost centre directly to designated cold-room drop points.'
  },
  {
    q: 'How do you handle high-volume banqueting and gala event orders?',
    a: 'We work closely with executive banquet chefs to stage multi-pallet deliveries up to 72 hours in advance of major events. We secure guaranteed grower and abattoir allocations for high-volume items like 500-portion beef striploins or 1,000 breakfast pastries.'
  },
  {
    q: 'What time are hotel deliveries completed in Birmingham and Manchester?',
    a: 'Our hotel logistics routes commence at 04:00 AM, with 100% of hotel breakfast drops completed before 06:30 AM. This guarantees that morning goods, milks, and fresh eggs are checked in before hotel breakfast service begins.'
  },
  {
    q: 'Do you offer fixed price contracts for hotel budgeting?',
    a: 'Yes. We offer fixed quarterly and seasonal commodity rate sheets on core lines (dairy, butchery, eggs, and bakery staples), protecting hotel food margins against sudden open-market price fluctuations.'
  },
  {
    q: 'What corporate payment and credit terms are available for hotel groups?',
    a: 'We provide structured 30-day net monthly corporate credit facilities subject to standard credit verification. We can issue consolidated weekly or monthly invoices formatted for integration into major hotel accounting systems.'
  },
  {
    q: 'How do we arrange a consultation with your Hotel Key Accounts team?',
    a: 'Submit an inquiry through our trade portal or contact our key accounts desk directly at +44 16164 12803. We will assign a senior culinary director to review your property menus, breakfast specs, and delivery schedules.'
  }
];

export default function HotelBanquetingSupplyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.rootwills.co.uk'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Hospitality Solutions',
            item: 'https://www.rootwills.co.uk/services'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Hotel & Banqueting Food Supply',
            item: 'https://www.rootwills.co.uk/services/hotel-banqueting-supply'
          }
        ]
      },
      {
        '@type': 'Service',
        '@id': 'https://www.rootwills.co.uk/services/hotel-banqueting-supply#service',
        name: 'Commercial Wholesale Foodservice for Hotels & Luxury Banqueting',
        serviceType: 'Hotel Foodservice Wholesaler',
        provider: {
          '@type': 'Organization',
          name: 'Rootwills Ltd',
          url: 'https://www.rootwills.co.uk',
          telephone: '+44 16164 12803',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '7d Yates Street, Middleton',
            addressLocality: 'Manchester',
            postalCode: 'M24 4GA',
            addressCountry: 'GB'
          }
        },
        areaServed: [
          { '@type': 'City', name: 'Birmingham' },
          { '@type': 'City', name: 'Manchester' },
          { '@type': 'AdministrativeArea', name: 'West Midlands' },
          { '@type': 'Country', name: 'United Kingdom' }
        ],
        description:
          'Specialist wholesale foodservice supply for luxury hotel brigades, boutique resorts, and event banqueting suites. Pre-dawn multi-outlet distribution across produce, butchery, dairy, and bakery.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Hotel & Banqueting Food Wholesale',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Multi-Outlet Hotel Pre-Dawn Distribution Drop',
                category: 'Hotel Supply Logistics'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'High-Volume Banquet Butchery & Carving Primals',
                category: 'Banqueting Butchery'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Fresh Daily Breakfast Dairy, Milks & Viennoiserie',
                category: 'Hotel Breakfast'
              }
            }
          ]
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: HOTEL_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-[#FAF7F2] text-[#131313] pt-24 sm:pt-28 pb-20 relative overflow-hidden">
        {/* Unified Botanical Parchment Texture */}
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.22] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />

        {/* HERO HEADER SECTION */}
        <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          {/* Breadcrumb Trail */}
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-[13px] font-sans text-stone-500">
              <li>
                <Link href="/" className="hover:text-[#260309] transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <li>
                <Link href="/services" className="hover:text-[#260309] transition-colors">
                  Hospitality Solutions
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <li className="font-semibold text-[#260309]">
                Hotel &amp; Banqueting Supply
              </li>
            </ol>
          </nav>

          {/* Luxury Double-Bezel Outer Shell */}
          <div className="p-1 sm:p-1.5 rounded-[2rem] bg-gradient-to-b from-[#BA8E4E]/35 via-[#EFE8D8]/70 to-[#BA8E4E]/25 ring-1 ring-[#BA8E4E]/40 shadow-xl">
            <div className="relative rounded-[calc(2rem-0.375rem)] overflow-hidden bg-gradient-to-br from-[#260309] via-[#1F0207] to-[#120104] p-6 sm:p-12 lg:p-16 text-white border border-[#F3D08A]/30">
              {/* Top Hairline Gold Glow */}
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#F3D08A]/80 to-transparent pointer-events-none" />

              {/* Textured Botanical Linen Background */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-85 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/textures/rootwills_luxury_footer_canvas.jpg')" }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(18,2,6,0.5)_0%,rgba(18,2,6,0.15)_70%,transparent_100%)] pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                {/* Monospace Eyebrow Capsule */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#180205]/85 border border-[#F3D08A]/50 mb-3 sm:mb-4 shadow-sm backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F3D08A] animate-pulse" />
                  <span className="font-mono text-[9.5px] sm:text-[11px] uppercase tracking-[0.2em] text-[#F3D08A] font-bold">
                    HOSPITALITY SECTOR 02 // HOTELS &amp; LUXURY BANQUETING
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-bold text-white tracking-tight leading-[1.08] mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  Wholesale Foodservice for Hotel Brigades <span className="text-[#F3D08A] italic font-normal">&amp; Luxury Banqueting</span>
                </h1>

                <DoodleFlourish 
                  variant="underline-loop" 
                  color="#F3D08A" 
                  strokeWidth={3} 
                  className="w-40 sm:w-64 -mt-1 mb-4 text-[#F3D08A]" 
                  delay={150}
                />

                <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed mb-6 sm:mb-8 font-light max-w-2xl">
                  Precision procurement engineered for hotel brigades, golf resorts, and large-scale conference centres. Multi-outlet consolidation, dedicated banqueting staging, and daily pre-dawn drops dropped directly into your walk-ins before breakfast service begins.
                </p>

                {/* Key Operational Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Drop Window</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">04:00–06:30 AM</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Scale</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">Pallets &amp; Roll-Cages</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Invoicing</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">Department Coded</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Credit Terms</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">30-Day Corporate</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href="/contact"
                    className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#BA8E4E] hover:bg-[#A37B3E] text-[#131313] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request Hotel Procurement Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="tel:+441616412803"
                    className="px-6 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#F3D08A]/40 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#F3D08A]" />
                    <span>Hotel Desk: +44 16164 12803</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* HOTEL CHALLENGES & TAILORED SOLUTIONS */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#BA8E4E] font-bold block mb-2">
              WHY HOTEL OPERATORS PARTNER WITH ROOTWILLS
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#131313] tracking-tight">
              Enterprise Foodservice Reliability for Hotel Operations
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2">
              Designed around the complex demands of multi-outlet venues, scheduled banquet staging, and executive food margin control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {HOTEL_SOLUTIONS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-1 rounded-2xl bg-gradient-to-b from-[#BA8E4E]/25 via-white to-[#BA8E4E]/15 ring-1 ring-[#BA8E4E]/30 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="p-6 sm:p-8 rounded-[calc(1rem-0.125rem)] bg-white/90 backdrop-blur-xs h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#260309] text-[#F3D08A] flex items-center justify-center shadow-xs">
                          <IconComp className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <span className="font-mono text-[10px] uppercase font-bold text-[#BA8E4E] bg-[#FAF5EB] px-2.5 py-1 rounded-full border border-[#BA8E4E]/30">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#260309] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-[#BA8E4E]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#BA8E4E]" />
                      <span>{item.stat}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FOUR PRODUCT DIVISIONS ACCORDION */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="p-1 sm:p-1.5 rounded-[2rem] bg-gradient-to-b from-[#BA8E4E]/30 via-[#EFE8D8]/60 to-[#BA8E4E]/20 ring-1 ring-[#BA8E4E]/35 shadow-md">
            <div className="rounded-[calc(2rem-0.375rem)] bg-white p-6 sm:p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#BA8E4E]/30 text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#BA8E4E] font-bold mb-3">
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    <span>WHOLE HOTEL PROCUREMENT</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#260309] tracking-tight">
                    Four Core Provisions Streams for Hotel Venues
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md">
                  Everything from high-volume breakfast lines to executive dining primals, consolidated under one contract.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {HOTEL_DIVISIONS.map((cat, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]/80 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#260309] mb-2">{cat.title}</h4>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
                        {cat.desc}
                      </p>
                    </div>
                    <Link
                      href={cat.href}
                      className="inline-flex items-center justify-between text-xs font-bold text-[#BA8E4E] hover:text-[#260309] transition-colors pt-3 border-t border-stone-200 group"
                    >
                      <span>{cat.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REGIONAL HUBS CALLOUT */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Link
              href="/wholesale-produce-supplier-birmingham"
              className="p-6 rounded-2xl bg-white border border-[#BA8E4E]/30 shadow-xs hover:shadow-md transition-all group flex items-start justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#BA8E4E] uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4 text-[#BA8E4E]" />
                  <span>Birmingham &amp; Midlands Hub</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#260309] group-hover:text-[#BA8E4E] transition-colors mb-1">
                  Birmingham Hotel Distribution
                </h3>
                <p className="text-xs text-stone-600 font-sans">
                  Pre-dawn 04:00 AM drops across Colmore Row, Convention Quarter, Edgbaston, NEC &amp; Solihull.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#BA8E4E] group-hover:translate-x-1 transition-transform shrink-0 ml-4 mt-1" />
            </Link>

            <Link
              href="/wholesale-produce-supplier-manchester"
              className="p-6 rounded-2xl bg-white border border-[#BA8E4E]/30 shadow-xs hover:shadow-md transition-all group flex items-start justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#BA8E4E] uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4 text-[#BA8E4E]" />
                  <span>Manchester Headquarters Hub</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#260309] group-hover:text-[#BA8E4E] transition-colors mb-1">
                  Greater Manchester Hotel Distribution
                </h3>
                <p className="text-xs text-stone-600 font-sans">
                  Direct dispatch from Middleton (M24 4GA) across Manchester City Centre, MediaCity &amp; Airport hotels.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#BA8E4E] group-hover:translate-x-1 transition-transform shrink-0 ml-4 mt-1" />
            </Link>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="text-center mb-8">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#BA8E4E] font-bold block mb-2">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#131313]">
              Hotel &amp; Banqueting Wholesale FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {HOTEL_FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="group p-5 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#E8DEC8] shadow-xs open:ring-1 open:ring-[#BA8E4E]/40 transition-all"
              >
                <summary className="font-serif font-bold text-sm sm:text-base text-[#131313] cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{faq.q}</span>
                  <span className="font-mono text-sm text-[#BA8E4E] group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed pt-3 border-t border-stone-100">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* BOTTOM ACTION CARD */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-1 sm:p-1.5 rounded-[2rem] bg-gradient-to-b from-[#BA8E4E]/35 via-[#EFE8D8]/70 to-[#BA8E4E]/25 ring-1 ring-[#BA8E4E]/40 shadow-xl">
            <div className="rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-[#260309] to-[#120104] p-8 sm:p-14 text-center text-white border border-[#F3D08A]/30 relative overflow-hidden">
              <div 
                className="absolute inset-0 pointer-events-none opacity-80 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/textures/rootwills_luxury_footer_canvas.jpg')" }}
              />
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F3D08A] font-bold block mb-3">
                  INSTITUTIONAL HOTEL FOOD SUPPLY
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
                  Request a Formal Hotel Supply Proposal
                </h2>
                <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed mb-8 font-light">
                  Speak directly with our senior hotel accounts director to arrange menu costing audits, sample drops, or bespoke 30-day corporate trade terms.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#BA8E4E] hover:bg-[#A37B3E] text-[#131313] font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Request Corporate Account Setup
                  </Link>
                  <a
                    href="https://wa.me/447984709478"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#F3D08A]/30 text-white font-medium text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#F3D08A]" />
                    <span>WhatsApp Executive Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </article>
    </>
  );
}
