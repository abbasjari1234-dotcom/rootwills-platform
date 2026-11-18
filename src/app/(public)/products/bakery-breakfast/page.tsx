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
  Croissant,
  Layers,
  Award,
  ChevronRight,
  MapPin,
  UtensilsCrossed,
  Coffee,
  Sandwich,
  CakeSlice
} from 'lucide-react';
import { DoodleFlourish } from '@/components/public/DoodleFlourish';

export const metadata: Metadata = {
  title: 'Wholesale Bakery Suppliers UK | Sourdough, Brioche & Viennoiserie | Rootwills',
  description:
    'Premier UK wholesale bakery distributor for restaurants, cafes, hotels & caterers. Fresh daily sourdough loaves, glazed brioche burger buns, French butter viennoiserie, paninis & morning goods with 6-day pre-dawn delivery across Birmingham, Manchester & the UK.',
  keywords: [
    'wholesale bakery suppliers uk',
    'wholesale sourdough bread birmingham',
    'commercial brioche burger buns manchester',
    'restaurant bread supplier',
    'wholesale viennoiserie croissants',
    'catering bakery delivery uk',
    'wholesale sandwich paninis and baguettes',
    'artisan bakery distributor hospitality',
    'wholesale morning goods catering',
    'hotel breakfast bakery suppliers'
  ],
  alternates: {
    canonical: '/products/bakery-breakfast',
  },
  openGraph: {
    title: 'Wholesale Bakery Suppliers UK | Rootwills Artisan Bakery',
    description:
      'Supplying UK chefs with slow-fermented sourdough, glazed brioche buns, authentic French butter viennoiserie, and daily sandwich bread with 04:00–07:30 AM pre-dawn kitchen delivery.',
    url: 'https://www.rootwills.co.uk/products/bakery-breakfast',
    siteName: 'Rootwills',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/images/commercial/rootwills_hero_chef_plating.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wholesale Bakery Suppliers UK | Rootwills Artisan Bakery',
    description:
      'Premier UK wholesale bakery distributor. Pre-dawn deliveries across Birmingham, Manchester & the UK.',
    images: ['/images/commercial/rootwills_hero_chef_plating.jpg'],
  },
};

const BAKERY_DISCIPLINES = [
  {
    title: 'Artisan Sourdough & Farmhouse Loaves',
    icon: Croissant,
    tag: '36-Hour Fermentation',
    description:
      'Stone-baked sourdoughs, white bloomer loaves, malted grain boules, and thick sandwich tin loaves baked for kitchen crumb structure.',
    highlights: ['Country White & Seeded Sourdough Loaves (800g)', 'Hobbs House Everyday Sliced Harvester Loaf', 'Traditional White & Wholemeal Bloomers', 'Gluten-Free Artisan Sliced Loaves'],
    idealFor: 'Brunch venues, avocado toast stations, hotel table service, and artisan delis.'
  },
  {
    title: 'Brioche Buns & Burger Baps',
    icon: Sandwich,
    tag: 'Egg-Glazed & Gourmet',
    description:
      'Rich butter-glazed brioche buns, seeded potato rolls, pretzel baps, and toasted English breakfast muffins with high dome resilience.',
    highlights: ['Glazed Brioche Burger Buns 4.5" & 5" (48s)', 'Seeded Potato Roll Smashed Burger Buns', 'Authentic Sliced English Breakfast Muffins', 'Mini Sliders & Slider Buns (Case 60)'],
    idealFor: 'Gourmet burger joints, smokehouses, breakfast services, and street food operators.'
  },
  {
    title: 'French Butter Viennoiserie',
    icon: Sparkles,
    tag: 'Pure Butter Lamination',
    description:
      'Authentic pure butter croissants, pain au chocolat, almond swirls, and cinnamon rolls delivering golden flaky lift.',
    highlights: ['Ready-to-Bake & Pre-Proved Butter Croissants (60x70g)', 'Pain au Chocolat with Double Belgian Chocolate Bar', 'Pain aux Raisins & Cinnamon Swirls', 'Mini Morning Viennoiserie Assortments'],
    idealFor: 'Hotel breakfast buffets, executive conference catering, and luxury cafe counters.'
  },
  {
    title: 'Baguettes, Paninis & Ciabattas',
    icon: Layers,
    tag: 'Lunch & Grab-and-Go',
    description:
      'Crisp rustic demi-baguettes, pre-grilled grill-mark paninis, olive oil ciabatta rolls, and flatbreads engineered for speed-ovens.',
    highlights: ['Barra Gallega & Multigrain Demi Baguettes (50x125g)', 'Bar-Marked White & Brown Paninis (30x130g)', 'Artisan Ciabatta Rolls & Focaccia Slabs', 'Stone-Baked Piadina & Mediterranean Flatbreads'],
    idealFor: 'Cafes, sandwich production, corporate lunch catering, and grab-and-go counters.'
  },
  {
    title: 'Tortilla Wraps, Bagels & Flatbreads',
    icon: UtensilsCrossed,
    tag: 'High-Tensile Rollability',
    description:
      'Plain, wholemeal, and spinach tortilla wraps that roll without tearing, alongside boiled New York style bagels.',
    highlights: ['10" & 12" Plain Flour Tortilla Wraps (Case 72)', 'Multigrain & Spinach Herb Wraps', 'New York Style Plain, Poppy & Sesame Bagels', 'Khobez & Greek Souvlaki Pita Pockets'],
    idealFor: 'Burrito bars, wrap stations, lunchtime cafes, and Middle Eastern eateries.'
  },
  {
    title: 'Cakes, Traybakes & Sweet Morning Goods',
    icon: CakeSlice,
    tag: 'Countertop Retailing',
    description:
      'Pre-portioned artisan traybakes, Belgian chocolate brownies, carrot cakes, muffins, and ring donuts for pastry counters.',
    highlights: ['Pre-Portioned Salted Caramel Brownie Traybakes', 'Spiced Carrot & Walnut Loaf Cakes', 'Tulip Muffin Assortments (Triple Choc & Blueberry)', 'Artisan Filled & Glazed Ring Donuts'],
    idealFor: 'Coffee shops, afternoon tea venues, dessert lounges, and staff restaurants.'
  }
];

const BAKERY_STANDARDS = [
  {
    title: 'Nightly Fresh Bake Intake',
    desc: 'Bread collections and depot drop-offs occur between 00:30 AM and 02:00 AM, ensuring bread never sits stale in transit.'
  },
  {
    title: 'Pre-Dawn Arrival Before 07:30 AM',
    desc: 'Your bread arrives before your morning kitchen brigade clocks in, ready for breakfast service, prep, and slicing.'
  },
  {
    title: 'Fresh & Bake-Off Formats',
    desc: 'Flexibility to choose fresh-baked daily loaves or frozen par-baked lines for oven-fresh aroma throughout peak rushes.'
  },
  {
    title: 'Zero Waste Standing Orders',
    desc: 'Automate your daily bread orders with standing orders on Rootwills Direct, easily adjusted with a quick WhatsApp message.'
  }
];

const BAKERY_FAQS = [
  {
    q: 'What is the order cut-off for next-morning artisan bakery delivery?',
    a: 'Orders submitted by 23:00 (11:00 PM) Sunday to Friday are baked overnight and dispatched on our pre-dawn delivery vehicles for drop-off between 04:00 AM and 07:30 AM before breakfast service.'
  },
  {
    q: 'Do you offer fresh daily bread or par-baked frozen lines?',
    a: 'We offer both. Independent dining rooms and cafes often take fresh-baked daily sourdough loaves and brioche buns, while hotels and banquet kitchens prefer our frozen par-baked baguettes and unbaked viennoiserie to bake on demand.'
  },
  {
    q: 'Can our kitchen order split cases or single boxes of artisan breads?',
    a: 'Yes. We cater to independent bistros requiring single boxes of brioche burger buns or individual specialty loaves alongside high-volume caterers ordering multi-pallet weekly drops.'
  },
  {
    q: 'Do your brioche burger buns hold up against heavy sauces and burger juices?',
    a: 'Yes. Our commercial brioche burger buns are specifically engineered with a rich egg-and-butter glaze and dense crumb structure that toasts evenly and maintains structural integrity without turning soggy.'
  },
  {
    q: 'Which regions do your daily morning bakery vehicles cover?',
    a: 'We provide daily pre-dawn delivery routes across Birmingham & the West Midlands (from our Birmingham corridor dispatch desk) and Greater Manchester & Cheshire (from our Middleton Headquarters hub at 7d Yates Street, M24 4GA).'
  },
  {
    q: 'How do new hospitality businesses set up a 30-day wholesale bakery account?',
    a: 'You can apply online via our Contact page or call our trade desk at +44 16164 12803. We verify Companies House details within 2 business hours and assign you a dedicated bakery account manager.'
  }
];

export default function BakeryBreakfastPage() {
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
            name: 'Wholesale Products',
            item: 'https://www.rootwills.co.uk/products'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Bakery, Bread & Morning Goods',
            item: 'https://www.rootwills.co.uk/products/bakery-breakfast'
          }
        ]
      },
      {
        '@type': 'Service',
        '@id': 'https://www.rootwills.co.uk/products/bakery-breakfast#service',
        name: 'Commercial Wholesale Bakery & Morning Goods Distribution',
        serviceType: 'Wholesale Bakery Supplier',
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
          'Chef-graded wholesale sourdough loaves, glazed brioche burger buns, French viennoiserie, and sandwich breads with 6-day pre-dawn delivery.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Wholesale Bakery Lines',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Country White Sourdough Loaf 800g',
                category: 'Loaves & Bloomers'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Glazed Brioche Burger Buns 4.5" (Case 48)',
                category: 'Burger Buns & Baps'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Pure Butter Croissants & Pain au Chocolat (60x70g)',
                category: 'Viennoiserie & Croissants'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Rustic Demi Baguettes & Paninis (50x125g)',
                category: 'Baguettes & Paninis'
              }
            }
          ]
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: BAKERY_FAQS.map((faq) => ({
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
        {/* Unified Botanical Parchment Canvas */}
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
                <Link href="/products" className="hover:text-[#260309] transition-colors">
                  Wholesale Catalog
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <li className="font-semibold text-[#260309]">
                Bakery, Bread &amp; Morning Goods
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
                    COMMODITY DIVISION 04 // ARTISAN BAKERY &amp; BREAD
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-bold text-white tracking-tight leading-[1.08] mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  Artisan Sourdough, Brioche Buns <span className="text-[#F3D08A] italic font-normal">&amp; French Viennoiserie</span>
                </h1>

                <DoodleFlourish 
                  variant="underline-loop" 
                  color="#F3D08A" 
                  strokeWidth={3} 
                  className="w-40 sm:w-64 -mt-1 mb-4 text-[#F3D08A]" 
                  delay={150}
                />

                <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed mb-6 sm:mb-8 font-light max-w-2xl">
                  Supplying UK restaurants, boutique cafes, burger bars, and luxury hotel brigades with fresh slow-fermented sourdoughs, glazed brioche burger buns, and buttery morning goods. Delivered pre-dawn before your breakfast shift.
                </p>

                {/* Key Operational Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Bake Schedule</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">Overnight Fresh</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Delivery Drop</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">04:00–07:30 AM</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Order Cut-Off</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">23:00 Nightly</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Standing Orders</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">Automated Drops</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href="/products?dept=bakery-breakfast"
                    className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#BA8E4E] hover:bg-[#A37B3E] text-[#131313] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Browse Live Bakery Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#F3D08A]/40 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Open 30-Day Trade Account</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* BAKERY DISCIPLINES GRID */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#BA8E4E] font-bold block mb-2">
              CURATED BAKERY DISCIPLINES
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#131313] tracking-tight">
              Six Comprehensive Commercial Bread Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2">
              From staple sandwich tin loaves to delicate all-butter French morning pastries, fresh daily intake for hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {BAKERY_DISCIPLINES.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={idx}
                  className="p-1 rounded-2xl bg-gradient-to-b from-[#BA8E4E]/25 via-white to-[#BA8E4E]/15 ring-1 ring-[#BA8E4E]/30 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="p-6 sm:p-7 rounded-[calc(1rem-0.125rem)] bg-white/90 backdrop-blur-xs h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#260309] text-[#F3D08A] flex items-center justify-center shadow-xs">
                          <IconComp className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <span className="font-mono text-[10px] uppercase font-bold text-[#BA8E4E] bg-[#FAF5EB] px-2.5 py-1 rounded-full border border-[#BA8E4E]/30">
                          {cat.tag}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#260309] mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-stone-600 font-sans leading-relaxed mb-4">
                        {cat.description}
                      </p>

                      <div className="space-y-1.5 mb-5 pt-3 border-t border-stone-100">
                        <span className="font-mono text-[9.5px] uppercase text-stone-400 font-bold block mb-1">
                          Core Wholesale Specifications:
                        </span>
                        {cat.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#BA8E4E] shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-stone-500 italic">
                        {cat.idealFor}
                      </span>
                      <Link
                        href={`/products?dept=bakery-breakfast`}
                        className="font-bold text-[#BA8E4E] hover:text-[#260309] transition-colors shrink-0 flex items-center gap-1 group"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* BAKERY STANDARDS & MORNING SERVICE SECTION */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="p-1 sm:p-1.5 rounded-[2rem] bg-gradient-to-b from-[#BA8E4E]/30 via-[#EFE8D8]/60 to-[#BA8E4E]/20 ring-1 ring-[#BA8E4E]/35 shadow-md">
            <div className="rounded-[calc(2rem-0.375rem)] bg-white p-6 sm:p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#BA8E4E]/30 text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#BA8E4E] font-bold mb-3">
                    <Coffee className="w-3.5 h-3.5" />
                    <span>PRE-DAWN BAKERY DISTRIBUTION</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#260309] tracking-tight">
                    Engineered for Breakfast &amp; Brunch Brigades
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md">
                  Bakery logistics require reliable arrival times. We guarantee pre-dawn delivery so your morning staff can bake off and slice before opening.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {BAKERY_STANDARDS.map((p, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]/80 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#BA8E4E]" />
                        <h4 className="font-serif font-bold text-sm text-[#260309]">{p.title}</h4>
                      </div>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SISTER COMMODITIES & REGIONAL HUBS CALLOUT */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Link
              href="/products/fresh-produce"
              className="p-6 rounded-2xl bg-white border border-[#BA8E4E]/30 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#BA8E4E] tracking-wider mb-2 block">
                  Commodity Division 01
                </span>
                <h3 className="font-serif font-bold text-lg text-[#260309] group-hover:text-[#BA8E4E] transition-colors mb-1">
                  Fresh Farm Produce &amp; Salads
                </h3>
                <p className="text-xs text-stone-600 font-sans">
                  Class 1 British brassicas, chipping potatoes, living herbs, and soft fruit.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#BA8E4E]">
                <span>Explore Produce</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/products/chilled-dairy"
              className="p-6 rounded-2xl bg-white border border-[#BA8E4E]/30 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#BA8E4E] tracking-wider mb-2 block">
                  Commodity Division 02
                </span>
                <h3 className="font-serif font-bold text-lg text-[#260309] group-hover:text-[#BA8E4E] transition-colors mb-1">
                  Chilled Dairy, Cheese &amp; Eggs
                </h3>
                <p className="text-xs text-stone-600 font-sans">
                  Farmhouse cheddars, pastry butters, double creams, and Lion Quality eggs.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#BA8E4E]">
                <span>Explore Dairy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/products/meat-poultry"
              className="p-6 rounded-2xl bg-white border border-[#BA8E4E]/30 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#BA8E4E] tracking-wider mb-2 block">
                  Commodity Division 03
                </span>
                <h3 className="font-serif font-bold text-lg text-[#260309] group-hover:text-[#BA8E4E] transition-colors mb-1">
                  Prime Butchery &amp; Poultry
                </h3>
                <p className="text-xs text-stone-600 font-sans">
                  Dry-aged British beef, Red Tractor chicken, Welsh lamb &amp; smash burgers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#BA8E4E]">
                <span>Explore Butchery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
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
              Commercial Wholesale Bakery FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {BAKERY_FAQS.map((faq, idx) => (
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
                  FRESH MORNING BREAD PROCUREMENT
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
                  Set Up Automated Bread Delivery Drops
                </h2>
                <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed mb-8 font-light">
                  Eliminate morning bread runs. Open a 30-day commercial trade credit account or set up flexible standing bakery orders today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#BA8E4E] hover:bg-[#A37B3E] text-[#131313] font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Apply for 30-Day Trade Account
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
