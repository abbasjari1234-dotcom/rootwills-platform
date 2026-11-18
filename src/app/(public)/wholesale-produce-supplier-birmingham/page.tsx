import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  Truck,
  Clock,
  ShieldCheck,
  MapPin,
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Snowflake,
  UtensilsCrossed,
  Building2,
  Calendar,
  ChefHat,
  PackageCheck,
  Scale,
  Award
} from 'lucide-react';
import { DoodleFlourish } from '@/components/public/DoodleFlourish';

export const metadata: Metadata = {
  title: 'Wholesale Produce Supplier Birmingham | Rootwills Foodservice',
  description:
    'Leading Birmingham wholesale produce & foodservice distributor. Daily pre-dawn deliveries to Digbeth, Jewellery Quarter, Edgbaston & Solihull. Fresh farm produce & pantry catalog.',
  keywords: [
    'wholesale produce supplier birmingham',
    'birmingham foodservice supplier',
    'fresh produce suppliers birmingham',
    'restaurant food suppliers birmingham',
    'wholesale fruit and veg birmingham',
    'commercial catering suppliers birmingham',
    'hospitality food wholesaler west midlands',
    'birmingham wholesale market food distributors'
  ],
  alternates: {
    canonical: '/wholesale-produce-supplier-birmingham',
  },
  openGraph: {
    title: 'Wholesale Produce Supplier Birmingham | Rootwills Foodservice',
    description:
      'Daily 02:00 AM market intake & pre-dawn chilled distribution supplying Birmingham’s restaurants, gastro pubs, and commercial caterers.',
    url: 'https://www.rootwills.co.uk/wholesale-produce-supplier-birmingham',
    siteName: 'Rootwills',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/images/commercial/rootwills_fresh_crates.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wholesale Produce Supplier Birmingham | Rootwills Foodservice',
    description:
      'Leading Birmingham wholesale produce and commercial foodservice supplier. Pre-dawn deliveries across Digbeth, Jewellery Quarter, Solihull & West Midlands.',
    images: ['/images/commercial/rootwills_fresh_crates.jpg'],
  },
};

const BIRMINGHAM_ZONES = [
  {
    zone: 'Zone 01: City Centre & Jewellery Quarter',
    postcodes: 'B1, B2, B3, B4, B18',
    venues: 'Fine dining, Michelin-calibre restaurants, boutique hotels, bistro kitchens',
    window: '04:00 AM – 06:30 AM',
    desc: 'Keyhole kitchen deliveries before city morning loading restrictions and bus lane closures take effect.'
  },
  {
    zone: 'Zone 02: Digbeth & Creative Quarter',
    postcodes: 'B5, B9, B12',
    venues: 'Independent venues, street-food kitchens, artisan bakeries, events spaces',
    window: '04:30 AM – 07:00 AM',
    desc: 'High-frequency delivery directly into prep stations with zero disruption to daily services.'
  },
  {
    zone: 'Zone 03: Edgbaston & Harborne',
    postcodes: 'B15, B16, B17',
    venues: 'Gastro pubs, private dining clubs, luxury healthcare & educational brigades',
    window: '05:00 AM – 07:30 AM',
    desc: 'Daily chilled routes delivering Class 1 British seasonal brassicas, exotics, and morning dairy.'
  },
  {
    zone: 'Zone 04: Solihull & Sutton Coldfield',
    postcodes: 'B72, B73, B74, B90, B91, B92, B93',
    venues: 'Country house hotels, conference centres, regional gastro dining',
    window: '05:30 AM – 08:00 AM',
    desc: 'Bulk produce, daily dairy trunks, and ambient dry larder pallets dispatched from our Birmingham hub.'
  },
  {
    zone: 'Zone 05: Greater West Midlands Corridor',
    postcodes: 'Coventry (CV), Wolverhampton (WV), Dudley (DY), Walsall (WS)',
    venues: 'Multi-site restaurant operators, contract caterers, production kitchens',
    window: 'Daily Scheduled Trunking',
    desc: 'Consolidated commercial distribution across the Midlands manufacturing and hospitality spine.'
  }
];

const BIRMINGHAM_FAQS = [
  {
    q: 'What is the order cut-off for next-morning delivery across Birmingham?',
    a: 'Orders placed up to 23:00 (11:00 PM) Sunday through Friday via WhatsApp, phone, or our Rootwills Direct online portal are delivered next morning between 04:00 AM and 07:30 AM before your kitchen prep shift begins.'
  },
  {
    q: 'Do you deliver to Birmingham city centre locations with restricted morning access?',
    a: 'Yes. Our pre-dawn multi-temperature delivery fleet operates between 04:00 AM and 06:30 AM specifically to beat Birmingham Clean Air Zone congestion and pedestrianised delivery window curfews in areas such as Colmore Row, New Street, and the Jewellery Quarter.'
  },
  {
    q: 'Where is the Rootwills distribution and registered hub located?',
    a: 'Rootwills Ltd (Companies House No. 17398744) is headquartered at 7d Yates Street, Middleton, Manchester M24 4GA, England, operating dedicated daily pre-dawn refrigerated fleet trunks across Birmingham, Digbeth, the Jewellery Quarter, Edgbaston, Solihull, and the Greater West Midlands.'
  },
  {
    q: 'Can Birmingham kitchens order broken cases or split produce?',
    a: 'Yes. We cater to fine-dining bistros and independent restaurants that require single-kilo, punnet, or broken-case quantities alongside high-volume catering institutions ordering multi-pallet weekly drops.'
  },
  {
    q: 'How do Birmingham hospitality businesses open a 30-day trade account?',
    a: 'You can apply online via our Contact page or call our trade desk at +44 16164 12803. We verify VAT and Companies House credentials within 2 business hours, assigning you a dedicated Birmingham account manager and tailored contract pricing.'
  }
];

const birminghamJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['WholesaleStore', 'LocalBusiness'],
      '@id': 'https://www.rootwills.co.uk/wholesale-produce-supplier-birmingham#localbusiness',
      name: 'Rootwills Birmingham - Wholesale Produce & Foodservice Supplier',
      url: 'https://www.rootwills.co.uk/wholesale-produce-supplier-birmingham',
      logo: 'https://www.rootwills.co.uk/images/logo.png',
      image: 'https://www.rootwills.co.uk/images/commercial/rootwills_fresh_crates.jpg',
      telephone: '+44-16164-12803',
      email: 'sales@rootwills.co.uk',
      priceRange: '££',
      currenciesAccepted: 'GBP',
      paymentAccepted: 'BACS, Direct Debit, Trade Credit Account, Credit Card',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '7d Yates Street',
        addressLocality: 'Middleton',
        addressRegion: 'Manchester',
        postalCode: 'M24 4GA',
        addressCountry: 'GB'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 53.5447,
        longitude: -2.2240
      },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Birmingham' },
        { '@type': 'AdministrativeArea', name: 'West Midlands' },
        { '@type': 'AdministrativeArea', name: 'Solihull' },
        { '@type': 'AdministrativeArea', name: 'Sutton Coldfield' },
        { '@type': 'AdministrativeArea', name: 'Coventry' },
        { '@type': 'AdministrativeArea', name: 'Wolverhampton' }
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '02:00',
          closes: '16:00'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.rootwills.co.uk/wholesale-produce-supplier-birmingham#faq',
      mainEntity: BIRMINGHAM_FAQS.map((faq) => ({
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

export default function BirminghamWholesaleProducePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(birminghamJsonLd) }}
      />

      {/* ─── GLOBAL BOTANICAL PARCHMENT TEXTURE ─── */}
      <div
        className="fixed inset-0 z-0 bg-repeat pointer-events-none opacity-[0.22] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />

      <article className="relative z-10 min-h-screen text-[#131313] pt-28 sm:pt-32 pb-24 overflow-x-hidden">
        
        {/* HERO SECTION WITH LUXURY DOUBLE-BEZEL GOLD RIM */}
        <header className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          <div className="p-1.5 sm:p-2 rounded-[1.75rem] sm:rounded-[2.25rem] bg-gradient-to-b from-[#BA8E4E]/45 via-[#EFE8D8]/85 to-[#BA8E4E]/35 ring-1 ring-[#BA8E4E]/45 shadow-[0_28px_70px_-12px_rgba(38,3,9,0.34)]">
            <div className="relative rounded-[calc(1.75rem-0.375rem)] sm:rounded-[calc(2.25rem-0.5rem)] overflow-hidden bg-[#260309] border border-[#F3D08A]/40 p-6 sm:p-14 lg:p-20 text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]">
              
              {/* Top glowing gold hairline */}
              <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F3D08A]/80 to-transparent pointer-events-none" />

              {/* Bespoke Oxblood Linen & Canvas Texture */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-85 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/textures/rootwills_luxury_footer_canvas.jpg')" }}
              />

              {/* Greek Harvest Engraving Watermark on Right */}
              <div className="absolute inset-y-0 right-0 w-2/3 sm:w-1/2 opacity-15 pointer-events-none mix-blend-screen overflow-hidden">
                <Image
                  src="/images/commercial/greek_harvest_engraving.jpg"
                  alt="Greek Engraving Motif"
                  fill
                  sizes="600px"
                  className="object-cover object-right"
                  priority
                />
              </div>

              {/* Produce crates ambient glow */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none"
                style={{ backgroundImage: "url('/images/commercial/rootwills_fresh_crates.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#260309] via-[#260309]/90 to-transparent pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                
                {/* Eyebrow Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#180205]/90 border border-[#F3D08A]/50 mb-4 shadow-sm backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#F3D08A] animate-pulse" />
                  <span className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] text-[#F3D08A] font-bold">
                    BIRMINGHAM WHOLESALE CORRIDOR // DIRECT SUPPLY
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.08] mb-3 [text-wrap:balance]">
                  Wholesale Produce &amp; Foodservice Supplier in <span className="text-[#F3D08A] italic">Birmingham</span>
                </h1>

                <div className="flex">
                  <DoodleFlourish 
                    variant="underline-loop" 
                    color="#F3D08A" 
                    strokeWidth={3} 
                    className="w-48 sm:w-72 -mt-1 mb-5 text-[#F3D08A]" 
                    delay={150}
                  />
                </div>

                <p className="text-sm sm:text-lg text-white/95 font-sans leading-relaxed mb-8 max-w-2xl font-light drop-shadow-sm">
                  Direct grower partnerships, 02:00 AM daily depot intake, and guaranteed pre-dawn refrigerated delivery across Digbeth, the Jewellery Quarter, Edgbaston, Solihull, and Greater West Midlands.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 font-sans text-sm">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#BA8E4E] hover:bg-[#A37B3E] text-[#131313] font-bold tracking-wide transition-all duration-200 shadow-[0_4px_16px_rgba(186,142,78,0.35)] active:scale-95"
                  >
                    <span>Open Birmingham Trade Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#F3D08A]/35 text-white font-medium transition-all duration-200 backdrop-blur-xs"
                  >
                    <span>Explore Wholesale Catalog</span>
                  </Link>

                  <a
                    href="tel:+441616412803"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#180205]/90 border border-[#F3D08A]/40 text-[#F3D08A] font-mono text-xs font-semibold hover:border-[#F3D08A] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F3D08A]" />
                    <span>+44 16164 12803</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-white/90">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#F3D08A]" />
                    <span>23:00 Cut-off</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#F3D08A]" />
                    <span>04:00 - 07:30 Drops</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Snowflake className="w-4 h-4 text-[#F3D08A]" />
                    <span>Dual-Zone Chill</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#F3D08A]" />
                    <span>Co. House: 17398744</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </header>

        {/* BIRMINGHAM LOGISTICS & VALUE PROPOSITION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BA8E4E] font-bold block mb-2">
              WHY BIRMINGHAM HOSPITALITY CHOOSES ROOTWILLS
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#131313] tracking-tight">
              Built for Birmingham’s Demanding Kitchens
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-700 font-sans">
              Unlike broadline FMCG wholesalers who treat fresh produce as an afterthought, our entire Birmingham operation revolves around pre-dawn culinary integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#E8DEC8] shadow-sm hover:border-[#BA8E4E]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#260309] text-[#F3D08A] flex items-center justify-center mb-6 shadow-sm">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#131313] mb-2">
                02:00 AM Depot Crate Grading
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Every crate entering our daily pre-dawn dispatch is hand-inspected for core temperature, firmness, and cosmetic grade before being loaded onto our dual-zone refrigerated vans.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#E8DEC8] shadow-sm hover:border-[#BA8E4E]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#260309] text-[#F3D08A] flex items-center justify-center mb-6 shadow-sm">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#131313] mb-2">
                Clean Air Zone &amp; Keyhole Access
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Our drivers are trained on Birmingham city centre access restrictions, keyholder passcodes, and delivery bays across Colmore Row, Digbeth, and the Jewellery Quarter for seamless 04:00 AM drops.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#E8DEC8] shadow-sm hover:border-[#BA8E4E]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#260309] text-[#F3D08A] flex items-center justify-center mb-6 shadow-sm">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#131313] mb-2">
                Broken Cases &amp; No Minimum Penalties
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Order exactly what your service covers: single bundles of heritage carrots, punnets of living micro herbs, or full pallets of Idaho russets and dry pantry staples without inflated broken-case surcharges.
              </p>
            </div>

          </div>
        </section>

        {/* BIRMINGHAM POSTCODE DELIVERY ZONES (Double-Bezel Design) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
          <div className="p-1 sm:p-1.5 rounded-[2rem] bg-gradient-to-b from-[#BA8E4E]/35 via-[#EFE8D8]/70 to-[#BA8E4E]/25 ring-1 ring-[#BA8E4E]/40 shadow-xl">
            <div className="bg-[#260309] rounded-[calc(2rem-0.375rem)] p-8 sm:p-12 text-white border border-[#F3D08A]/30 relative overflow-hidden">
              
              {/* Background Canvas */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-80 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/textures/rootwills_luxury_footer_canvas.jpg')" }}
              />

              <div className="relative z-10 max-w-3xl mb-10">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F3D08A] font-bold block mb-2">
                  DAILY FLEET ROUTING
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  Birmingham Postcode Coverage &amp; Delivery Windows
                </h2>
                <p className="mt-3 text-sm sm:text-base text-white/85 font-sans font-light">
                  Operating 6 days a week with guaranteed pre-service delivery slots tailored to your head chef’s schedule.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
                {BIRMINGHAM_ZONES.map((zone, idx) => (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F3D08A]/50 transition-colors flex flex-col justify-between backdrop-blur-xs"
                  >
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-md bg-[#BA8E4E]/20 text-[#F3D08A] font-mono text-[11px] font-bold mb-3 border border-[#F3D08A]/25">
                        {zone.postcodes}
                      </span>
                      <h3 className="text-base font-serif font-bold text-white mb-1">
                        {zone.zone}
                      </h3>
                      <p className="text-xs text-white/70 mb-3 font-mono font-medium">
                        Window: <strong className="text-[#F3D08A]">{zone.window}</strong>
                      </p>
                      <p className="text-xs text-white/85 font-sans leading-relaxed">
                        {zone.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-white/60 font-sans italic">
                      Serving: {zone.venues}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/80 relative z-10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F3D08A]" />
                  <span>Headquarters &amp; Hub: 7d Yates Street, Middleton, Manchester M24 4GA</span>
                </div>
                <Link 
                  href="/contact"
                  className="text-[#F3D08A] hover:underline flex items-center gap-1 font-sans font-semibold text-sm"
                >
                  <span>Check your postcode with our logistics desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* FRESH PRODUCE & COMMERCIAL CATALOG CATEGORIES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BA8E4E] font-bold block mb-2">
              COMPREHENSIVE BIRMINGHAM INVENTORY
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#131313] tracking-tight">
              Curated Produce &amp; Commercial Larder
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-700 font-sans">
              Consolidate your invoices: from Michelin-grade seasonal brassicas and foraged mushrooms to everyday kitchen dry goods, dairy, and hygiene supplies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="rounded-2xl overflow-hidden bg-white/90 backdrop-blur-xs border border-[#E8DEC8] shadow-sm flex flex-col hover:border-[#BA8E4E]/50 transition-colors">
              <div className="relative h-44 w-full bg-stone-100">
                <Image
                  src="/images/commercial/02_fresh_produce.jpg"
                  alt="Fresh wholesale produce Birmingham"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#131313] mb-1">
                    Fresh Farm Vegetables &amp; Salads
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
                    Class 1 British brassicas, heritage carrots, vine tomatoes, wild mushrooms, micro herbs, and daily prepared veg.
                  </p>
                </div>
                <Link
                  href="/products?category=produce"
                  className="text-xs font-semibold text-[#BA8E4E] hover:underline flex items-center gap-1"
                >
                  <span>Explore Produce</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white/90 backdrop-blur-xs border border-[#E8DEC8] shadow-sm flex flex-col hover:border-[#BA8E4E]/50 transition-colors">
              <div className="relative h-44 w-full bg-stone-100">
                <Image
                  src="/images/commercial/03_dairy_eggs.jpg"
                  alt="Artisan dairy and eggs wholesale Birmingham"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#131313] mb-1">
                    Dairy, British Cheeses &amp; Eggs
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
                    Farmhouse butters, clotted cream, double cream, graded Lion Quality eggs, and regional British farmhouse cheeses.
                  </p>
                </div>
                <Link
                  href="/products?category=dairy"
                  className="text-xs font-semibold text-[#BA8E4E] hover:underline flex items-center gap-1"
                >
                  <span>Explore Dairy</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white/90 backdrop-blur-xs border border-[#E8DEC8] shadow-sm flex flex-col hover:border-[#BA8E4E]/50 transition-colors">
              <div className="relative h-44 w-full bg-stone-100">
                <Image
                  src="/images/commercial/dry_pantry_wholesale.jpg"
                  alt="Commercial dry pantry wholesale Birmingham"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#131313] mb-1">
                    Dry Store Pantry &amp; Pastas
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
                    Cold-pressed extra virgin oils, San Marzano tomatoes, premium Italian bronze-die pastas, jasmine rice, and flours.
                  </p>
                </div>
                <Link
                  href="/products?category=pantry"
                  className="text-xs font-semibold text-[#BA8E4E] hover:underline flex items-center gap-1"
                >
                  <span>Explore Dry Goods</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white/90 backdrop-blur-xs border border-[#E8DEC8] shadow-sm flex flex-col hover:border-[#BA8E4E]/50 transition-colors">
              <div className="relative h-44 w-full bg-stone-100">
                <Image
                  src="/images/commercial/living_microgreens_chef.jpg"
                  alt="Living microgreens and culinary herbs Birmingham"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#131313] mb-1">
                    Specialist &amp; Living Microgreens
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
                    Cut-to-order culinary microgreens, edible flowers, Asian exotics, and bespoke garnishes for high-end plating.
                  </p>
                </div>
                <Link
                  href="/products?category=speciality"
                  className="text-xs font-semibold text-[#BA8E4E] hover:underline flex items-center gap-1"
                >
                  <span>Explore Specialist</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* BIRMINGHAM WHOLESALE FAQS */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BA8E4E] font-bold block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#131313]">
              Birmingham Wholesale Produce &amp; Ordering FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {BIRMINGHAM_FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="group p-6 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#E8DEC8] shadow-xs open:ring-1 open:ring-[#BA8E4E]/40 transition-all"
              >
                <summary className="font-serif font-bold text-base sm:text-lg text-[#131313] cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{faq.q}</span>
                  <span className="font-mono text-sm text-[#BA8E4E] group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed pt-3 border-t border-stone-100">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* BOTTOM ACTION CARD (Matching Luxury Footer Bezel) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Sister Regional Corridor Callout */}
          <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/70 backdrop-blur-xs border border-[#BA8E4E]/30 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BA8E4E] animate-pulse" />
              <span className="text-[#260309] font-medium">
                Operating kitchens in Greater Manchester or Cheshire?
              </span>
            </div>
            <Link
              href="/wholesale-produce-supplier-manchester"
              className="inline-flex items-center gap-1.5 font-bold text-[#BA8E4E] hover:text-[#260309] transition-colors group underline"
            >
              <span>Explore Manchester Headquarters Hub</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="p-1 sm:p-1.5 rounded-[2rem] bg-gradient-to-b from-[#BA8E4E]/35 via-[#EFE8D8]/70 to-[#BA8E4E]/25 ring-1 ring-[#BA8E4E]/40 shadow-xl">
            <div className="rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-[#260309] to-[#120104] p-8 sm:p-14 text-center text-white border border-[#F3D08A]/30 relative overflow-hidden">
              <div 
                className="absolute inset-0 pointer-events-none opacity-80 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/textures/rootwills_luxury_footer_canvas.jpg')" }}
              />
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F3D08A] font-bold block mb-3">
                  JOIN OVER 140+ BIRMINGHAM HOSPITALITY VENUES
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
                  Ready to Upgrade Your Birmingham Kitchen Supply?
                </h2>
                <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed mb-8 font-light">
                  Request a sample crate, schedule a site visit with our Birmingham depot manager, or open a 30-day trade credit account today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#BA8E4E] hover:bg-[#A37B3E] text-[#131313] font-bold text-sm tracking-wide transition-all shadow-md active:scale-95"
                  >
                    Apply for Trade Account
                  </Link>
                  <a
                    href="https://wa.me/447984709478"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#F3D08A]/30 text-white font-medium text-sm flex items-center justify-center gap-2"
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
