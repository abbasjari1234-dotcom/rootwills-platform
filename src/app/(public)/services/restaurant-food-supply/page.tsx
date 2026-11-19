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
  UtensilsCrossed,
  ChefHat,
  Receipt,
  Layers,
  MapPin,
  ChevronRight,
  Coins,
  Scale,
  Award
} from 'lucide-react';
import { DoodleFlourish } from '@/components/public/DoodleFlourish';

export const metadata: Metadata = {
  title: 'Food Suppliers for Restaurants UK | B2B Commercial Foodservice | Rootwills',
  description:
    'Premier UK food supplier for independent restaurants, gastropubs & bistros. Single-invoice multi-temperature delivery of Class 1 farm produce, prime butchery, artisan dairy & bakery with pre-dawn 04:00–07:30 AM drops across Birmingham, Manchester & the UK.',
  keywords: [
    'food suppliers for restaurants',
    'restaurant food supplier birmingham',
    'birmingham wholesale catering',
    'chilled food wholesaler birmingham',
    'food wholesalers birmingham',
    'commercial catering suppliers birmingham',
    'manchester restaurant food suppliers',
    'commercial restaurant suppliers uk',
    'wholesale food for restaurants',
    'gastropub food wholesalers',
    'restaurant produce and meat delivery',
    'hospitality wholesale food supplier',
    'single source restaurant supply',
    'pre dawn restaurant delivery uk'
  ],
  alternates: {
    canonical: '/services/restaurant-food-supply',
  },
  openGraph: {
    title: 'Food Suppliers for Restaurants UK | Rootwills Commercial Foodservice',
    description:
      'Consolidate your kitchen supply into one trusted pre-dawn drop. Class 1 produce, dry-aged beef, farmhouse cheeses, and bakery delivered before morning prep begins.',
    url: 'https://www.rootwills.co.uk/services/restaurant-food-supply',
    siteName: 'Rootwills',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/images/commercial/rootwills_hero_chef_plating.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Food Suppliers for Restaurants UK | Rootwills Commercial Foodservice',
    description:
      'Premier UK restaurant food supplier. Pre-dawn deliveries across Birmingham, Manchester & the UK.',
    images: ['/images/commercial/rootwills_hero_chef_plating.jpg'],
  },
};

const RESTAURANT_PAIN_POINTS = [
  {
    title: 'One Van, One Invoice, Zero Noise',
    icon: Receipt,
    tag: 'Single-Source Consolidation',
    description:
      'Eliminate the chaos of 5 delivery drivers ringing your kitchen bell during breakfast prep. We consolidate Class 1 produce, butchery, dairy, and bakery into a single multi-temperature delivery.',
    stat: 'Save 6+ hours weekly in supplier invoice reconciliation.'
  },
  {
    title: '04:00 – 07:30 AM Pre-Dawn Keyhole Drops',
    icon: Clock,
    tag: 'City Centre Access',
    description:
      'Our refrigerated fleet beats pedestrian loading curfews, Clean Air Zone congestion, and bus lane restrictions across Birmingham and Manchester city centres, placing crates directly in your walk-in.',
    stat: '100% of deliveries completed before your head chef arrives.'
  },
  {
    title: 'Split Cases & Zero Minimum Penalties',
    icon: Scale,
    tag: 'Chef-Friendly Flexibility',
    description:
      'Independent menus cannot afford to buy 20kg bulk sacks of specialty microgreens or artisan cheeses. We provide broken-case flexibility, punnet ordering, and tailored single-kilo quantities.',
    stat: 'Reduce perishable food waste by up to 22%.'
  },
  {
    title: '23:00 PM Nightly Order Cut-Off',
    icon: MessageCircle,
    tag: 'After-Service WhatsApp Ordering',
    description:
      'Count your stock after the final dinner cover. Submit your orders via WhatsApp, telephone, or Rootwills Direct up to 23:00 PM, and your goods arrive next morning by 07:30 AM.',
    stat: 'Direct WhatsApp connection to your assigned account manager.'
  }
];

const RESTAURANT_CATEGORIES = [
  {
    title: 'Class 1 Farm Produce & Salads',
    desc: 'High-dry-matter chipping potatoes, heirloom tomatoes, fresh herbs, and living microgreens from British growers.',
    href: '/products/fresh-produce',
    cta: 'Explore Produce Division'
  },
  {
    title: 'Prime British Butchery & Poultry',
    desc: '28-day dry-aged steaks, Red Tractor chicken fillets, smash burger patties, and Welsh lamb cuts.',
    href: '/products/meat-poultry',
    cta: 'Explore Butchery Division'
  },
  {
    title: 'Farmhouse Dairy, Cheese & Eggs',
    desc: 'Mature West Country cheddar, Netherend butter portions, culinary creams, and Lion Quality free-range eggs.',
    href: '/products/chilled-dairy',
    cta: 'Explore Dairy Division'
  },
  {
    title: 'Artisan Sourdough & Burger Buns',
    desc: 'Overnight-baked country sourdough loaves, egg-glazed brioche buns, and morning butter viennoiserie.',
    href: '/products/bakery-breakfast',
    cta: 'Explore Bakery Division'
  }
];

const RESTAURANT_FAQS = [
  {
    q: 'How does Rootwills consolidate restaurant food supply into a single delivery?',
    a: 'We operate dual-evaporator multi-temperature delivery vehicles calibrated with segregated zones: 0–2°C for butchery, 1–4°C for dairy and fresh produce, and ambient for bakery and dry larder. This allows one vehicle to deliver your entire order in a single pre-dawn drop.'
  },
  {
    q: 'What is the order cut-off time for independent restaurants?',
    a: 'Orders can be placed until 23:00 (11:00 PM) Sunday to Friday. This gives head chefs and sous chefs ample time to complete post-service inventory counts and submit requirements via WhatsApp or our Rootwills Direct trade portal.'
  },
  {
    q: 'Do you offer keyhole delivery service into restaurant walk-in fridges?',
    a: 'Yes. Over 60% of our restaurant clients operate on keyhole delivery agreements. Our vetted drivers hold secure alarm codes and kitchen keys, placing chilled crates and dairy directly into your walk-in cold rooms before 07:00 AM.'
  },
  {
    q: 'Can our restaurant order broken cases or split packs on delicate items?',
    a: 'Yes. We cater specifically to independent dining rooms and gastropubs. You can order single punnets of microgreens, individual blocks of artisan cheese, or single kilograms of specialty vegetables without minimum line penalties.'
  },
  {
    q: 'Which restaurant districts do your pre-dawn delivery fleets cover?',
    a: 'We deliver 6 days a week across Birmingham (Jewellery Quarter, Digbeth, Colmore Row, Edgbaston, Solihull) and Greater Manchester (Northern Quarter, Ancoats, Spinningfields, Didsbury, Salford Quays), with regional trunking across the UK.'
  },
  {
    q: 'How quickly can our restaurant open a 30-day wholesale credit account?',
    a: 'Trade account applications are processed within 2 business hours. Upon verifying Companies House and VAT details, we assign a dedicated culinary account manager and immediately issue bespoke seasonal contract pricing.'
  }
];

export default function RestaurantFoodSupplyPage() {
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
            name: 'Restaurant Food Supply',
            item: 'https://www.rootwills.co.uk/services/restaurant-food-supply'
          }
        ]
      },
      {
        '@type': 'Service',
        '@id': 'https://www.rootwills.co.uk/services/restaurant-food-supply#service',
        name: 'Commercial Food Supply for Independent Restaurants & Bistros',
        serviceType: 'Restaurant Foodservice Wholesaler',
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
          'Chef-first wholesale food supply for independent dining rooms, gastro pubs, and bistros. Consolidated single-invoice pre-dawn deliveries across produce, butchery, dairy, and bakery.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Restaurant Wholesale Provisions',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Consolidated Pre-Dawn Multi-Temperature Drop',
                category: 'Hospitality Supply Logistics'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Class 1 British Farm Produce & Living Herbs',
                category: 'Fresh Produce'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Prime British Dry-Aged Steaks & Poultry',
                category: 'Butchery'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'British Farmhouse Cheeses & Artisan Dairy',
                category: 'Chilled Dairy'
              }
            }
          ]
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: RESTAURANT_FAQS.map((faq) => ({
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
                Restaurant Food Supply
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
                    HOSPITALITY SECTOR 01 // INDEPENDENT RESTAURANTS &amp; BISTROS
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-bold text-white tracking-tight leading-[1.08] mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  The Single-Source Food Supplier <span className="text-[#F3D08A] italic font-normal">for UK Restaurants</span>
                </h1>

                <DoodleFlourish 
                  variant="underline-loop" 
                  color="#F3D08A" 
                  strokeWidth={3} 
                  className="w-40 sm:w-64 -mt-1 mb-4 text-[#F3D08A]" 
                  delay={150}
                />

                <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed mb-6 sm:mb-8 font-light max-w-2xl">
                  Stop juggling five different suppliers and five delivery vans every morning. Rootwills consolidates Class 1 farm produce, prime butchery, artisan cheeses, and bakery into one single invoice, dropped into your walk-in before 07:30 AM.
                </p>

                {/* Key Operational Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Order Cut-Off</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">23:00 Nightly</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Kitchen Drop</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">04:00–07:30 AM</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Multi-Drop</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">Single Consolidated Van</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Account Terms</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">30-Day Trade Credit</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href="/contact"
                    className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#BA8E4E] hover:bg-[#A37B3E] text-[#131313] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Apply for Restaurant Trade Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://wa.me/447984709478"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#F3D08A]/40 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#F3D08A]" />
                    <span>WhatsApp Chef Trade Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* RESTAURANT PAIN POINTS & SOLUTIONS */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#BA8E4E] font-bold block mb-2">
              WHY CHEFS SWITCH TO ROOTWILLS
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#131313] tracking-tight">
              Built Specifically for the Rhythms of a Working Kitchen
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2">
              We eliminated the supplier friction that pulls head chefs away from their pass and front-of-house managers away from their guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {RESTAURANT_PAIN_POINTS.map((item, idx) => {
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

        {/* FOUR PRODUCT PILLARS ACCORDION */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="p-1 sm:p-1.5 rounded-[2rem] bg-gradient-to-b from-[#BA8E4E]/30 via-[#EFE8D8]/60 to-[#BA8E4E]/20 ring-1 ring-[#BA8E4E]/35 shadow-md">
            <div className="rounded-[calc(2rem-0.375rem)] bg-white p-6 sm:p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#BA8E4E]/30 text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#BA8E4E] font-bold mb-3">
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    <span>WHOLE MENU PROCUREMENT</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#260309] tracking-tight">
                    Four Complete Kitchen Supply Divisions
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md">
                  Everything from morning sourdough and eggs to evening prime steaks and heirloom vegetables, managed under one roof.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {RESTAURANT_CATEGORIES.map((cat, idx) => (
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
                  <span>Birmingham Hospitality Corridor</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#260309] group-hover:text-[#BA8E4E] transition-colors mb-1">
                  Birmingham Restaurant Distribution
                </h3>
                <p className="text-xs text-stone-600 font-sans">
                  Daily 04:00 AM delivery drops across Digbeth, Jewellery Quarter, Colmore Row &amp; Edgbaston.
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
                  Greater Manchester Restaurant Distribution
                </h3>
                <p className="text-xs text-stone-600 font-sans">
                  Dispatched directly from Middleton (M24 4GA) across Northern Quarter, Ancoats &amp; Spinningfields.
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
              Restaurant Wholesale Supply FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {RESTAURANT_FAQS.map((faq, idx) => (
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
                  UPGRADE YOUR RESTAURANT KITCHEN SUPPLY
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
                  Trial Rootwills in Your Kitchen
                </h2>
                <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed mb-8 font-light">
                  Request a sample crate, speak with a culinary specialist, or open a 30-day commercial credit account today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#BA8E4E] hover:bg-[#A37B3E] text-[#131313] font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Apply for 30-Day Restaurant Account
                  </Link>
                  <a
                    href="https://wa.me/447984709478"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#F3D08A]/30 text-white font-medium text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#F3D08A]" />
                    <span>Chat on WhatsApp (+44 7984 709478)</span>
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
