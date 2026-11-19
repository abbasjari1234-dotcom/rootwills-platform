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
  Apple,
  Carrot,
  Leaf,
  Layers,
  Calendar,
  UtensilsCrossed,
  MapPin,
  Scale,
  Award,
  ChevronRight
} from 'lucide-react';
import { DoodleFlourish } from '@/components/public/DoodleFlourish';

export const metadata: Metadata = {
  title: 'Wholesale Fruit & Vegetable Suppliers UK | Fresh Produce Distributor | Rootwills',
  description:
    'Premier UK wholesale fresh produce distributor for restaurants, hotels & caterers. Class 1 British farm harvests, morning-prepped vegetables & salads with 6-day pre-dawn delivery across Birmingham, Manchester & the UK.',
  keywords: [
    'wholesale fruit and vegetable suppliers',
    'wholesale fresh produce uk',
    'commercial salad suppliers',
    'restaurant vegetable distributor',
    'wholesale fruit and veg birmingham',
    'wholesale produce supplier manchester',
    'commercial potato supplier uk',
    'fresh herbs wholesale catering',
    'microgreens wholesale uk',
    'farm assured wholesale vegetables'
  ],
  alternates: {
    canonical: '/products/fresh-produce',
  },
  openGraph: {
    title: 'Wholesale Fruit & Vegetable Suppliers UK | Rootwills Fresh Produce',
    description:
      'Class 1 British farm harvests, seasonal heirloom vegetables, living microgreens, and pre-dawn chilled distribution supplying UK restaurants, hotels, and commercial kitchens.',
    url: 'https://www.rootwills.co.uk/products/fresh-produce',
    siteName: 'Rootwills',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/images/commercial/rootwills_fresh_crates.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wholesale Fruit & Vegetable Suppliers UK | Rootwills Fresh Produce',
    description:
      'Premier UK wholesale fresh produce distributor. 02:00 AM daily depot intake, pre-dawn delivery across Birmingham, Manchester & the UK.',
    images: ['/images/commercial/rootwills_fresh_crates.jpg'],
  },
};

const PRODUCE_CATEGORIES = [
  {
    title: 'Potatoes, Roots & Onions',
    icon: Carrot,
    tag: 'Farm Sacks & Bulk Cases',
    description:
      'High-dry-matter chipping potatoes, washed bakers, heritage heirloom carrots, parsnips, and graded British dry bulbs.',
    highlights: ['Baker 40s & 50s (15kg)', 'Maris Piper & Chippies Choice 25kg', 'Chantenay & Heritage Rainbow Carrots', 'Brown, Red & Banana Shallots'],
    idealFor: 'Gastropubs, steak houses, traditional roasters, and high-volume commercial kitchens.'
  },
  {
    title: 'Market Vegetables & Brassicas',
    icon: Leaf,
    tag: 'Class 1 British Growers',
    description:
      'Field-fresh brassicas and tender greens harvested daily across Worcestershire, Evesham, and Lincolnshire silt farms.',
    highlights: ['Tenderstem Broccoli & Romanesco', 'Savoy, Pointed Hispi & Cavolo Nero', 'Evesham Asparagus (Seasonal)', 'Fine French Beans & Sugar Snaps'],
    idealFor: 'Boutique dining, hotel banquet brigades, and modern European bistros.'
  },
  {
    title: 'Salads, Tomatoes & Living Herbs',
    icon: Sparkles,
    tag: 'Daily Hydroponic & Glasshouse',
    description:
      'Crisp washed leafy greens, Isle of Wight heritage vine tomatoes, and aromatic fresh cut and potted herbs.',
    highlights: ['Baby Gem, Wild Rocket & Mesclun Mix', 'Heritage Beefsteak & Cherry Vine Tomatoes', 'Living Microgreens & Edible Flowers', 'Cut Basil, Coriander, Mint, Tarragon & Thyme'],
    idealFor: 'Premium burger houses, artisan sandwich delis, and fine-dining garnish stations.'
  },
  {
    title: 'Fresh Fruit, Berries & Citrus',
    icon: Apple,
    tag: 'Ripened & Graded Daily',
    description:
      'Seasonal soft fruits, imported Amalfi citrus, ripened Hass avocados, and core orchard lines for pastry and bar brigades.',
    highlights: ['Class 1 Driscoll Berries (Strawberries, Raspberries)', 'Ready-to-Eat Hass Avocados (Count 16/18)', 'Unwaxed Lemons, Limes & Blood Oranges', 'English Braeburn, Gala & Conference Pears'],
    idealFor: 'Cocktail lounges, pastry chefs, breakfast buffets, and brunch venues.'
  },
  {
    title: 'Wild Mushrooms & Specialities',
    icon: Layers,
    tag: 'Forest & Cultivated Delicacies',
    description:
      'Cultivated exotic mushrooms, seasonal wild foraged fungi, black truffles, and gourmet culinary accents.',
    highlights: ['King Oyster, Shiitake & Shimeji Clustered', 'Seasonal Girolles, Chanterelles & Morels', 'Button, Chestnut & Flat Field Mushrooms', 'Fresh Black Autumn & Winter Truffles'],
    idealFor: 'Michelin-guide kitchens, luxury private member clubs, and artisanal pasta bars.'
  },
  {
    title: 'Prepared & Prepped Vegetables',
    icon: UtensilsCrossed,
    tag: 'Zero-Prep Kitchen Ready',
    description:
      'Vacuum-sealed machine-cut and hand-turned vegetables engineered to reduce kitchen prep hours, labour overheads, and waste.',
    highlights: ['Hand-Peeled Maris Piper & Chipping Batons', 'Diced & Sliced Mirepoix Mixes', 'Fine Shredded Cabbage & Coleslaw Mixes', 'Turned Fondant Potatoes & Butternut Chunks'],
    idealFor: 'High-turnover event caterers, corporate dining, and high-capacity hospital/educational brigades.'
  }
];

const HARVEST_CALENDAR = [
  {
    season: 'Spring (March – May)',
    focus: 'Evesham Asparagus, Jersey Royals, Wild Garlic & Microgreens',
    regions: 'Vale of Evesham, Jersey, Kent Orchards',
    notes: 'Pre-season allocations locked in for contracted hospitality partners.'
  },
  {
    season: 'Summer (June – August)',
    focus: 'Isle of Wight Tomatoes, English Strawberries, Courgette Flowers, Broad Beans',
    regions: 'Isle of Wight, Herefordshire Soft Fruit, Lincolnshire',
    notes: 'Daily picking delivered to kitchen fridges within 24 hours of harvest.'
  },
  {
    season: 'Autumn (September – November)',
    focus: 'Wild Forest Mushrooms, Squash, Pumpkins, Heritage Beetroot, Chantenay Carrots',
    regions: 'Scottish Highlands, Lancashire Silt Fields, Norfolk',
    notes: 'Hearty root vegetables and foraged delicacies for seasonal menu transitions.'
  },
  {
    season: 'Winter (December – February)',
    focus: 'Cavolo Nero, Purple Sprouting Broccoli, Kalettes, Parsnips, Blood Oranges',
    regions: 'Lincolnshire Brassica Belts, Sicily & Valencia Citrus Groves',
    notes: 'Frost-sweetened winter brassicas and bright Mediterranean citrus imports.'
  }
];

const PRODUCE_FAQS = [
  {
    q: 'What is the order cut-off for next-morning fresh produce delivery?',
    a: 'Orders placed by 23:00 (11:00 PM) Sunday through Friday are dispatched on our pre-dawn refrigerated routes for delivery between 04:00 AM and 07:30 AM Monday through Saturday. Your produce arrives before your morning prep shift begins.'
  },
  {
    q: 'Can our kitchen order broken cases or split quantities of fresh produce?',
    a: 'Yes. Unlike rigid box-movers, Rootwills supports split cases and broken packs on specialty items, microgreens, and exotic fruits. You can order single punnets, individual kilos, or full bulk farm sacks (15kg/25kg) without minimum line penalties.'
  },
  {
    q: 'How does Rootwills assure Grade 1 produce freshness across the cold chain?',
    a: 'Our central intake depot operates daily quality inspections at 02:00 AM. Inbound grower pallets are checked with digital refractometers (Brix sugar levels), core temperature probes, and visual grading. Dispatches run on calibrated dual-evaporator multi-temperature vehicles kept strictly at 1–4°C.'
  },
  {
    q: 'Do you supply pre-prepped vegetables to reduce kitchen labour costs?',
    a: 'Yes. We provide a full line of prepared vegetables including hand-peeled potatoes, chipped batons, diced mirepoix, shredded coleslaw, and vacuum-sealed root vegetable chunks, enabling chefs to cut prep hours and eliminate peel waste.'
  },
  {
    q: 'Which geographic regions do your fresh produce delivery fleets cover?',
    a: 'We operate dedicated daily pre-dawn routes across Birmingham & the West Midlands (from our Birmingham corridor desk) and Greater Manchester & Cheshire (from our Middleton Headquarters hub at 7d Yates Street, M24 4GA), alongside trunk routes across the UK.'
  },
  {
    q: 'How do new commercial kitchens apply for a 30-day trade credit account?',
    a: 'You can submit a trade account request online in under two minutes or speak directly with our wholesale trade desk at +44 16164 12803. We verify Companies House and VAT details within 2 hours and assign you a dedicated produce account manager.'
  }
];

export default function FreshProducePage() {
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
            name: 'Fresh Produce',
            item: 'https://www.rootwills.co.uk/products/fresh-produce'
          }
        ]
      },
      {
        '@type': 'Service',
        '@id': 'https://www.rootwills.co.uk/products/fresh-produce#service',
        name: 'Commercial Wholesale Fresh Produce Supply',
        serviceType: 'Wholesale Fruit and Vegetable Distributor',
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
          'Chef-graded Class 1 wholesale fresh fruit, vegetables, salads, and living microgreens with 6-day pre-dawn refrigerated distribution.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Wholesale Fresh Produce Lines',
          itemListElement: [
            {
              '@type': 'Offer',
              priceCurrency: 'GBP',
              price: '16.50',
              availability: 'https://schema.org/InStock',
              priceValidUntil: '2027-12-31',
              itemOffered: {
                '@type': 'Product',
                name: 'Chipping & Baker Potatoes 25kg / 15kg',
                description: 'Commercial 25kg / 15kg catering sacks of Class 1 chipping and baker potatoes for hospitality kitchens.',
                category: 'Potatoes, Roots & Onions',
                sku: 'RW-FP-POT-01',
                image: 'https://www.rootwills.co.uk/images/commercial/rootwills_fresh_crates.jpg',
                brand: {
                  '@type': 'Brand',
                  name: 'Rootwills Trade Assured'
                },
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'GBP',
                  price: '16.50',
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
                  reviewCount: '38'
                }
              }
            },
            {
              '@type': 'Offer',
              priceCurrency: 'GBP',
              price: '19.20',
              availability: 'https://schema.org/InStock',
              priceValidUntil: '2027-12-31',
              itemOffered: {
                '@type': 'Product',
                name: 'Tenderstem Broccoli & Brassicas',
                description: 'Daily harvest British tenderstem broccoli and brassicas graded for commercial dining.',
                category: 'Market Vegetables & Brassicas',
                sku: 'RW-FP-BROC-02',
                image: 'https://www.rootwills.co.uk/images/commercial/rootwills_fresh_crates.jpg',
                brand: {
                  '@type': 'Brand',
                  name: 'Rootwills Trade Assured'
                },
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'GBP',
                  price: '19.20',
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
                  reviewCount: '42'
                }
              }
            },
            {
              '@type': 'Offer',
              priceCurrency: 'GBP',
              price: '14.00',
              availability: 'https://schema.org/InStock',
              priceValidUntil: '2027-12-31',
              itemOffered: {
                '@type': 'Product',
                name: 'Living Microgreens & Heritage Tomatoes',
                description: 'Specialist living culinary microgreens, edible flowers, and Isle of Wight heritage vine tomatoes.',
                category: 'Salad, Tomatoes & Fresh Herbs',
                sku: 'RW-FP-MICRO-03',
                image: 'https://www.rootwills.co.uk/images/commercial/living_microgreens_chef.jpg',
                brand: {
                  '@type': 'Brand',
                  name: 'Rootwills Trade Assured'
                },
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'GBP',
                  price: '14.00',
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
                  reviewCount: '29'
                }
              }
            },
            {
              '@type': 'Offer',
              priceCurrency: 'GBP',
              price: '24.50',
              availability: 'https://schema.org/InStock',
              priceValidUntil: '2027-12-31',
              itemOffered: {
                '@type': 'Product',
                name: 'Wild & Cultivated Exotic Mushrooms',
                description: 'Chef-selected exotic cultivated and seasonal wild foraged fungi for luxury gastronomy.',
                category: 'Mushrooms & Specialities',
                sku: 'RW-FP-MUSH-04',
                image: 'https://www.rootwills.co.uk/images/commercial/wild_mushrooms_chef.jpg',
                brand: {
                  '@type': 'Brand',
                  name: 'Rootwills Trade Assured'
                },
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'GBP',
                  price: '24.50',
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
                  reviewCount: '31'
                }
              }
            }
          ]
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: PRODUCE_FAQS.map((faq) => ({
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
                Fresh Produce
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
                    COMMODITY DIVISION 01 // CLASS 1 FRESH PRODUCE
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-bold text-white tracking-tight leading-[1.08] mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  Wholesale Fruit, Vegetables &amp; Salad <span className="text-[#F3D08A] italic font-normal">for UK Kitchens</span>
                </h1>

                <DoodleFlourish 
                  variant="underline-loop" 
                  color="#F3D08A" 
                  strokeWidth={3} 
                  className="w-40 sm:w-64 -mt-1 mb-4 text-[#F3D08A]" 
                  delay={150}
                />

                <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed mb-6 sm:mb-8 font-light max-w-2xl">
                  Supplying the UK&apos;s leading independent restaurants, hotel brigades, and gastro dining with field-fresh British farm harvests, morning-prepped vegetables, and imported exotics. Graded at 02:00 AM daily, dropped before your kitchen opens.
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
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Quality Tier</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">Class 1 Assured</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Splits / Cases</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">Zero Line Minimum</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href="/products?dept=fresh-produce"
                    className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#BA8E4E] hover:bg-[#A37B3E] text-[#131313] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Browse Live Produce Catalog</span>
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

        {/* PRODUCE CATEGORIES GRID */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#BA8E4E] font-bold block mb-2">
              CURATED COMMODITY LINES
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#131313] tracking-tight">
              Six Comprehensive Fresh Produce Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2">
              From staple 25kg chipping sacks to delicate edible blossoms, our daily intake covers every station of the professional brigade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {PRODUCE_CATEGORIES.map((cat, idx) => {
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
                        href={`/products?dept=fresh-produce`}
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

        {/* HARVEST & SEASONAL PROVENANCE SECTION */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="p-1 sm:p-1.5 rounded-[2rem] bg-gradient-to-b from-[#BA8E4E]/30 via-[#EFE8D8]/60 to-[#BA8E4E]/20 ring-1 ring-[#BA8E4E]/35 shadow-md">
            <div className="rounded-[calc(2rem-0.375rem)] bg-white p-6 sm:p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#BA8E4E]/30 text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#BA8E4E] font-bold mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>ANNUAL GROWING CYCLE</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#260309] tracking-tight">
                    Seasonal British Harvest &amp; Global Sourcing Calendar
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md">
                  We bridge British agricultural seasons with accredited global growers in Spain, Italy, and the Netherlands to ensure zero menu interruptions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {HARVEST_CALENDAR.map((h, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]/80 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#BA8E4E]" />
                        <h4 className="font-serif font-bold text-sm text-[#260309]">{h.season}</h4>
                      </div>
                      <p className="text-xs font-semibold text-stone-800 font-sans mb-3 leading-snug">
                        {h.focus}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-stone-200/80 text-[11px] text-stone-500">
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-[#BA8E4E] font-bold mb-0.5">Origins</span>
                      <span>{h.regions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SISTER REGIONAL HUBS CALLOUT */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Link
              href="/wholesale-produce-supplier-birmingham"
              className="p-6 rounded-2xl bg-white border border-[#BA8E4E]/30 shadow-xs hover:shadow-md transition-all group flex items-start justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#BA8E4E] uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4 text-[#BA8E4E]" />
                  <span>Birmingham &amp; West Midlands Trunk</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#260309] group-hover:text-[#BA8E4E] transition-colors mb-1">
                  Birmingham Pre-Dawn Distribution
                </h3>
                <p className="text-xs text-stone-600 font-sans">
                  Pre-dawn 04:00 AM delivery drops across Digbeth, Jewellery Quarter, Edgbaston &amp; Solihull.
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
                  Greater Manchester Distribution
                </h3>
                <p className="text-xs text-stone-600 font-sans">
                  Direct dispatch from Middleton HQ (M24 4GA) across Northern Quarter, Ancoats, Spinningfields &amp; Salford Quays.
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
              Commercial Fresh Produce Wholesale FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {PRODUCE_FAQS.map((faq, idx) => (
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
                  ELEVATE YOUR KITCHEN PRODUCE SUPPLY
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
                  Request a Sample Produce Crate
                </h2>
                <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed mb-8 font-light">
                  Experience Rootwills Class 1 quality firsthand. Speak with our produce specialists to receive a bespoke seasonal rate sheet or trial delivery drop.
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
