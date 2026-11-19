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
  Milk,
  Egg,
  Layers,
  Award,
  ChevronRight,
  MapPin,
  UtensilsCrossed,
  Droplets,
  PackageCheck
} from 'lucide-react';
import { DoodleFlourish } from '@/components/public/DoodleFlourish';

export const metadata: Metadata = {
  title: 'Wholesale Dairy Suppliers UK | Cheese, Butter & Eggs Wholesaler | Rootwills',
  description:
    'Premier UK wholesale dairy distributor. British farmhouse cheeses, artisan butter, double cream, barista milks & Lion Quality eggs with 6-day pre-dawn chilled delivery (1–4°C) across Birmingham, Manchester & the UK.',
  keywords: [
    'wholesale dairy suppliers uk',
    'restaurant cheese suppliers',
    'commercial dairy distributor',
    'wholesale butter and cream',
    'lion quality eggs wholesale',
    'wholesale cheese suppliers birmingham',
    'dairy suppliers manchester',
    'catering milk wholesale',
    'artisan british cheese wholesale',
    'catering block cheddar wholesale'
  ],
  alternates: {
    canonical: '/products/chilled-dairy',
  },
  openGraph: {
    title: 'Wholesale Dairy Suppliers UK | Rootwills Chilled Dairy',
    description:
      'Supplying UK chefs with British farmhouse cheeses, clotted creams, artisan butter, and Lion Quality eggs with dual-evaporator 1–4°C cold chain delivery.',
    url: 'https://www.rootwills.co.uk/products/chilled-dairy',
    siteName: 'Rootwills',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/images/commercial/rootwills_fresh_crates.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wholesale Dairy Suppliers UK | Rootwills Chilled Dairy',
    description:
      'Premier UK wholesale dairy distributor. Pre-dawn chilled deliveries across Birmingham, Manchester & the UK.',
    images: ['/images/commercial/rootwills_fresh_crates.jpg'],
  },
};

const DAIRY_DISCIPLINES = [
  {
    title: 'British & Continental Cheeses',
    icon: Award,
    tag: 'Artisan & Block Lines',
    description:
      'From West Country Farmhouse Cheddar and Stilton to PDO Italian Parmigiano Reggiano, Fior di Latte, and French Brie.',
    highlights: ['Mature & Extra Mature Block Cheddar (5kg)', 'Pre-Grated Mozzarella & Cheddar Blends', 'Colston Bassett Stilton & Cashel Blue', 'PDO Buffalo Mozzarella & Burrata Pugliese'],
    idealFor: 'Artisan pizzerias, gastropubs, banqueting cheese boards, and gourmet burgers.'
  },
  {
    title: 'Farmhouse Butter & Spreads',
    icon: Layers,
    tag: 'Pastry & Table Grade',
    description:
      'High-butterfat unsalted sheets for lamination, salted rolls for dining tables, and portion dishes for hospitality service.',
    highlights: ['Netherend Farm Salted Butter Portions (100x10g)', 'Lurpak Spreadable & Block Butters', '84% Butterfat French Dry Pastry Butter Sheets', 'Wholesale Bulk Unsalted Butter 25kg blocks'],
    idealFor: 'Fine-dining bakeries, viennoiserie pastry chefs, and boutique hotel dining.'
  },
  {
    title: 'Creams, Crème Fraîche & Custards',
    icon: Droplets,
    tag: 'Pastry & Sauce Grade',
    description:
      'Fresh pasteurised double cream, whipping cream, sour cream, and velvety crème fraîche engineered for culinary stability.',
    highlights: ['Double Cream 2L & 5L poly-bottles', 'Whipping Cream 38% butterfat stability', 'Set Sour Cream & French Crème Fraîche', 'Cornish Clotted Cream for Afternoon Tea'],
    idealFor: 'Pastry kitchens, dessert parlours, sauce sections, and afternoon tea venues.'
  },
  {
    title: 'Milks & Barista Plant Formulations',
    icon: Milk,
    tag: 'Daily Dairy & Oat Blends',
    description:
      'Farm-assured whole, semi-skimmed, and skimmed fresh milks alongside professional barista-grade oat, almond, and soya.',
    highlights: ['Fresh Whole & Semi-Skimmed Milk (2L / 4-Pint)', 'Oatly Barista Edition (6x1L / 12x1L)', 'Minor Figures & Alpro Professional lines', 'Organic & Non-Homogenised Farm Milks'],
    idealFor: 'Speciality espresso bars, hotel breakfast services, and catering brigades.'
  },
  {
    title: 'Lion Quality Eggs & Egg Liquid',
    icon: Egg,
    tag: 'Red Lion Assured',
    description:
      'British Lion-stamped fresh shell eggs, free-range woodland eggs, and pasteurised egg whites/yolks for high-volume service.',
    highlights: ['Medium & Large Free-Range Eggs (Tray 30 / Box 360)', 'Lion Quality Graded Medium (15 Dozen / 30 Dozen)', 'Pasteurised Whole Liquid Egg (1kg / 10kg)', 'Liquid Egg Whites & Yolks for Pastry'],
    idealFor: 'Brunch operations, high-volume baking production, and commercial kitchens.'
  },
  {
    title: 'Yoghurts, Dips & Cooked Delis',
    icon: UtensilsCrossed,
    tag: 'Chilled Larder Staples',
    description:
      'Authentic strained Greek yoghurts, fruit coulis, culinary mayonnaise, hummus, and freshly prepared deli salads.',
    highlights: ['Authentic Greek Strained Yoghurt 5kg & 10kg', 'Individual Glass Pot Breakfast Yoghurts', 'Commercial Real Mayonnaise (5L & 10L)', 'Artisan Hummus, Guacamole & Tzatziki'],
    idealFor: 'Buffet services, deli counters, modern Mediterranean menus, and quick-service operations.'
  }
];

const COLD_CHAIN_PILLARS = [
  {
    title: 'Strict 1°C – 4°C Calibration',
    desc: 'Dual-evaporator Thermo King units monitored via real-time GPS telemetry ensuring dairy and cream never spike in transit.'
  },
  {
    title: '02:00 AM Depot Intake Check',
    desc: 'Every dairy pallet undergoes temperature probe logging, seal integrity inspection, and BRCGS food safety sign-off.'
  },
  {
    title: 'Walk-In Fridge Keyhole Drops',
    desc: 'Pre-dawn delivery directly into your kitchen cold-room before 07:30 AM so dairy products never sit unattended on ambient loading bays.'
  },
  {
    title: 'Red Tractor & Lion Assured',
    desc: 'Full traceability from accredited UK farms, guaranteeing ethical dairy husbandry and complete food safety provenance.'
  }
];

const DAIRY_FAQS = [
  {
    q: 'What are your delivery cut-offs for next-morning chilled dairy orders?',
    a: 'Orders submitted by 23:00 (11:00 PM) Sunday to Friday via WhatsApp, telephone, or our Rootwills Direct online trade portal are dispatched on our pre-dawn refrigerated route for delivery between 04:00 AM and 07:30 AM the next morning.'
  },
  {
    q: 'Are your eggs certified under the British Lion Quality Code?',
    a: 'Yes. 100% of our shell eggs carry the British Lion mark, ensuring hens are vaccinated against Salmonella, farm audited under stringent UK animal welfare standards, and fully traceable with printed farm codes.'
  },
  {
    q: 'Can we order single cases or split quantities of specialty cheeses and butters?',
    a: 'Yes. We support independent kitchens with split-case ordering on specialty cheeses, individual artisan butter rolls, and bespoke wedges alongside full bulk pallet drops for high-volume hotels and caterers.'
  },
  {
    q: 'Do you supply barista-grade plant milks for specialty coffee operations?',
    a: 'Yes. We stock full pallet and case quantities of professional barista plant milks including Oatly Barista Edition, Minor Figures, and Alpro Barista alongside our core dairy lines.'
  },
  {
    q: 'Where do your dairy delivery vehicles operate?',
    a: 'Our dual-evaporator refrigerated fleet provides daily pre-dawn deliveries across Greater Manchester & Cheshire (from our Middleton Headquarters hub at M24 4GA) and Birmingham & the West Midlands (from our Birmingham corridor dispatch desk).'
  },
  {
    q: 'How does a commercial business open a 30-day wholesale credit account?',
    a: 'You can apply online via our Contact page or call our trade desk at +44 16164 12803. We verify Companies House and VAT registration within 2 business hours, assigning you a dedicated account manager and tailored rate sheets.'
  }
];

export default function ChilledDairyPage() {
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
            name: 'Chilled Dairy, Cheese & Eggs',
            item: 'https://www.rootwills.co.uk/products/chilled-dairy'
          }
        ]
      },
      {
        '@type': 'Service',
        '@id': 'https://www.rootwills.co.uk/products/chilled-dairy#service',
        name: 'Commercial Wholesale Dairy, Cheese & Egg Distribution',
        serviceType: 'Wholesale Dairy Supplier',
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
          'Chef-graded wholesale dairy, British artisan cheese, farmhouse butter, barista milks, and Lion Quality eggs with dual-evaporator 1–4°C pre-dawn delivery.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Wholesale Chilled Dairy Lines',
          itemListElement: [
            {
              '@type': 'Offer',
              priceCurrency: 'GBP',
              price: '38.50',
              availability: 'https://schema.org/InStock',
              priceValidUntil: '2027-12-31',
              itemOffered: {
                '@type': 'Product',
                name: 'British Farmhouse Mature Cheddar 5kg',
                description: 'Traditional clothbound and block mature British farmhouse cheddars aged 12–18 months for commercial kitchens.',
                category: 'British & Continental Cheese',
                sku: 'RW-CD-CHD-01',
                image: 'https://www.rootwills.co.uk/images/commercial/03_dairy_eggs.jpg',
                brand: {
                  '@type': 'Brand',
                  name: 'Rootwills Trade Assured'
                },
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'GBP',
                  price: '38.50',
                  priceValidUntil: '2027-12-31',
                  availability: 'https://schema.org/InStock',
                  itemCondition: 'https://schema.org/NewCondition',
                  seller: {
                    '@type': 'Organization',
                    name: 'Rootwills Ltd',
                    url: 'https://www.rootwills.co.uk'
                  }
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  reviewCount: '44'
                }
              }
            },
            {
              '@type': 'Offer',
              priceCurrency: 'GBP',
              price: '28.00',
              availability: 'https://schema.org/InStock',
              priceValidUntil: '2027-12-31',
              itemOffered: {
                '@type': 'Product',
                name: 'Netherend Farm & Lurpak Butters',
                description: 'Salted, unsalted, and micro-portioned table churn butters for premier hotel breakfast services and pastry kitchens.',
                category: 'Butter, Fats & Spreads',
                sku: 'RW-CD-BTR-02',
                image: 'https://www.rootwills.co.uk/images/commercial/03_dairy_eggs.jpg',
                brand: {
                  '@type': 'Brand',
                  name: 'Rootwills Trade Assured'
                },
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'GBP',
                  price: '28.00',
                  priceValidUntil: '2027-12-31',
                  availability: 'https://schema.org/InStock',
                  itemCondition: 'https://schema.org/NewCondition',
                  seller: {
                    '@type': 'Organization',
                    name: 'Rootwills Ltd',
                    url: 'https://www.rootwills.co.uk'
                  }
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  reviewCount: '36'
                }
              }
            },
            {
              '@type': 'Offer',
              priceCurrency: 'GBP',
              price: '42.00',
              availability: 'https://schema.org/InStock',
              priceValidUntil: '2027-12-31',
              itemOffered: {
                '@type': 'Product',
                name: 'Lion Quality Free-Range Eggs (Tray 30 / Box 360)',
                description: 'Class A Lion-marked British free-range large and medium eggs supplied in keyhole commercial trays.',
                category: 'Eggs & Egg Products',
                sku: 'RW-CD-EGG-03',
                image: 'https://www.rootwills.co.uk/images/commercial/03_dairy_eggs.jpg',
                brand: {
                  '@type': 'Brand',
                  name: 'Rootwills Trade Assured'
                },
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'GBP',
                  price: '42.00',
                  priceValidUntil: '2027-12-31',
                  availability: 'https://schema.org/InStock',
                  itemCondition: 'https://schema.org/NewCondition',
                  seller: {
                    '@type': 'Organization',
                    name: 'Rootwills Ltd',
                    url: 'https://www.rootwills.co.uk'
                  }
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  reviewCount: '58'
                }
              }
            },
            {
              '@type': 'Offer',
              priceCurrency: 'GBP',
              price: '18.50',
              availability: 'https://schema.org/InStock',
              priceValidUntil: '2027-12-31',
              itemOffered: {
                '@type': 'Product',
                name: 'Fresh Double & Whipping Cream (2L / 5L)',
                description: 'Commercial pasteurised British fresh double, whipping, and clotted cream for sauce stations and pastry brigades.',
                category: 'Creams, Crème Fraîche & Custards',
                sku: 'RW-CD-CRM-04',
                image: 'https://www.rootwills.co.uk/images/commercial/03_dairy_eggs.jpg',
                brand: {
                  '@type': 'Brand',
                  name: 'Rootwills Trade Assured'
                },
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'GBP',
                  price: '18.50',
                  priceValidUntil: '2027-12-31',
                  availability: 'https://schema.org/InStock',
                  itemCondition: 'https://schema.org/NewCondition',
                  seller: {
                    '@type': 'Organization',
                    name: 'Rootwills Ltd',
                    url: 'https://www.rootwills.co.uk'
                  }
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.8',
                  reviewCount: '33'
                }
              }
            }
          ]
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: DAIRY_FAQS.map((faq) => ({
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

        {/* HERO SECTION */}
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
                Chilled Dairy, Cheese &amp; Eggs
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
                    COMMODITY DIVISION 02 // CHILLED DAIRY &amp; CHEESE
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-bold text-white tracking-tight leading-[1.08] mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  Wholesale Dairy, Farmhouse Cheese <span className="text-[#F3D08A] italic font-normal">&amp; Lion Eggs</span>
                </h1>

                <DoodleFlourish 
                  variant="underline-loop" 
                  color="#F3D08A" 
                  strokeWidth={3} 
                  className="w-40 sm:w-64 -mt-1 mb-4 text-[#F3D08A]" 
                  delay={150}
                />

                <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed mb-6 sm:mb-8 font-light max-w-2xl">
                  Supplying the UK&apos;s leading dining rooms, luxury hotel brigades, and artisan bakeries with British farmhouse cheeses, high-butterfat culinary creams, and Lion-certified eggs. Maintained strictly at 1–4°C across pre-dawn routes.
                </p>

                {/* Operational Metrics Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Cold Chain</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">1°C – 4°C Calibrated</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Egg Assured</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">British Lion Quality</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Drop Window</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">04:00–07:30 AM</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Order Cut-Off</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">23:00 Nightly</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href="/products?dept=chilled-dairy"
                    className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#BA8E4E] hover:bg-[#A37B3E] text-[#131313] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Browse Live Dairy Catalog</span>
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

        {/* DAIRY DISCIPLINES GRID */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#BA8E4E] font-bold block mb-2">
              CURATED DAIRY DISCIPLINES
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#131313] tracking-tight">
              Six Comprehensive Chilled Provisions Lines
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2">
              Precision temperature storage for commercial catering kitchens, specialty pizzerias, patisseries, and dining brigades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {DAIRY_DISCIPLINES.map((cat, idx) => {
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
                        href={`/products?dept=chilled-dairy`}
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

        {/* COLD CHAIN QUALITY ASSURANCE SECTION */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="p-1 sm:p-1.5 rounded-[2rem] bg-gradient-to-b from-[#BA8E4E]/30 via-[#EFE8D8]/60 to-[#BA8E4E]/20 ring-1 ring-[#BA8E4E]/35 shadow-md">
            <div className="rounded-[calc(2rem-0.375rem)] bg-white p-6 sm:p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#BA8E4E]/30 text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#BA8E4E] font-bold mb-3">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>FOOD SAFETY &amp; COLD CHAIN</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#260309] tracking-tight">
                    Dual-Evaporator Refrigeration &amp; Quality Control
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md">
                  Dairy integrity requires uncompromised temperature fidelity. We maintain rigorous digital thermal audits from farm gate to your walk-in fridge.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {COLD_CHAIN_PILLARS.map((p, idx) => (
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
                  Class 1 British brassicas, chipping potatoes, living herbs, and exotics.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#BA8E4E]">
                <span>Explore Produce</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/wholesale-produce-supplier-birmingham"
              className="p-6 rounded-2xl bg-white border border-[#BA8E4E]/30 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#BA8E4E] tracking-wider mb-2 block">
                  Regional Trunk Corridor
                </span>
                <h3 className="font-serif font-bold text-lg text-[#260309] group-hover:text-[#BA8E4E] transition-colors mb-1">
                  Birmingham Pre-Dawn Corridor
                </h3>
                <p className="text-xs text-stone-600 font-sans">
                  Daily 04:00 AM delivery drops across Digbeth, Jewellery Quarter, Edgbaston &amp; Solihull.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#BA8E4E]">
                <span>Birmingham Depot</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/wholesale-produce-supplier-manchester"
              className="p-6 rounded-2xl bg-white border border-[#BA8E4E]/30 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#BA8E4E] tracking-wider mb-2 block">
                  Headquarters Hub (M24 4GA)
                </span>
                <h3 className="font-serif font-bold text-lg text-[#260309] group-hover:text-[#BA8E4E] transition-colors mb-1">
                  Manchester Hub Distribution
                </h3>
                <p className="text-xs text-stone-600 font-sans">
                  Arterial dispatch from Middleton across Northern Quarter, Ancoats &amp; Salford Quays.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#BA8E4E]">
                <span>Manchester HQ</span>
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
              Commercial Wholesale Dairy FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {DAIRY_FAQS.map((faq, idx) => (
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
                  STABLE COMMERCIAL DAIRY PROCUREMENT
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
                  Lock In Contract Dairy Rates for Your Kitchen
                </h2>
                <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed mb-8 font-light">
                  Shield your food margins against dairy market volatility. Apply for a 30-day commercial trade credit account or request fixed volume contracts today.
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
