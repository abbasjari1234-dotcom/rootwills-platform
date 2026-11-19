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
  title: 'Wholesale Food & Catering Supplies Birmingham | Commercial Foodservice | Rootwills',
  description:
    'Leading Birmingham wholesale food & catering supplies distributor. Daily pre-dawn multi-drop delivery of fresh farm produce, chilled dairy, prime butchery & artisan bakery to Digbeth, Jewellery Quarter, Edgbaston & Solihull.',
  keywords: [
    'wholesale food supplier birmingham',
    'birmingham wholesale catering',
    'chilled food wholesaler birmingham',
    'wholesale produce supplier birmingham',
    'birmingham foodservice supplier',
    'fresh produce suppliers birmingham',
    'restaurant food suppliers birmingham',
    'commercial catering suppliers birmingham',
    'catering supplies cash and carry birmingham',
    'hospitality food wholesaler west midlands',
    'birmingham wholesale food market'
  ],
  alternates: {
    canonical: '/wholesale-produce-supplier-birmingham',
  },
  openGraph: {
    title: 'Wholesale Food & Catering Supplies Birmingham | Commercial Foodservice | Rootwills',
    description:
      'Daily pre-dawn temperature-controlled multi-drop deliveries supplying Birmingham’s restaurants, gastro pubs, luxury hotels, and commercial caterers.',
    url: 'https://www.rootwills.co.uk/wholesale-produce-supplier-birmingham',
    siteName: 'Rootwills',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/images/commercial/rootwills_fresh_crates.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wholesale Food & Catering Supplies Birmingham | Rootwills Foodservice',
    description:
      'Leading Birmingham wholesale food, chilled produce, and commercial catering supplier. Pre-dawn deliveries across Digbeth, Jewellery Quarter, Solihull & West Midlands.',
    images: ['/images/commercial/rootwills_fresh_crates.jpg'],
  },
};

const BIRMINGHAM_ZONES = [
  {
    zone: 'Zone 01: City Centre & Jewellery Quarter',
    postcodes: 'B1, B2, B3, B4, B18',
    venues: 'Fine dining, Michelin-calibre restaurants, boutique hotels, Colmore Row bistro kitchens',
    window: '04:00 AM – 06:30 AM',
    desc: 'Keyhole kitchen deliveries before Birmingham morning loading curfews and Clean Air Zone (CAZ) traffic restrictions take effect.'
  },
  {
    zone: 'Zone 02: Digbeth & Creative Quarter',
    postcodes: 'B5, B9, B12',
    venues: 'Independent venues, street-food kitchens, artisan bakeries, high-volume event spaces',
    window: '04:30 AM – 07:00 AM',
    desc: 'Consolidated single-van drops directly into walk-in prep chillers with zero daytime disruption to kitchen brigades.'
  },
  {
    zone: 'Zone 03: Edgbaston & Harborne',
    postcodes: 'B15, B16, B17',
    venues: 'Gastro pubs, private dining clubs, luxury healthcare & university catering brigades',
    window: '05:00 AM – 07:30 AM',
    desc: 'Daily multi-temperature delivery of Class 1 British seasonal brassicas, chilled dairy blocks, and fresh catering lines.'
  },
  {
    zone: 'Zone 04: Solihull & Sutton Coldfield',
    postcodes: 'B72, B73, B74, B90, B91, B92, B93',
    venues: 'Country house hotels, conference centres, regional gastro dining, NEC exhibition banqueting',
    window: '05:30 AM – 08:00 AM',
    desc: 'Bulk produce, daily chilled dairy trunks, and ambient dry larder pallets dispatched on dedicated regional delivery routes.'
  },
  {
    zone: 'Zone 05: Greater West Midlands Corridor',
    postcodes: 'Coventry (CV), Wolverhampton (WV), Dudley (DY), Walsall (WS)',
    venues: 'Multi-site restaurant operators, contract caterers, production kitchens, banqueting halls',
    window: 'Daily Scheduled Trunking',
    desc: 'Consolidated commercial distribution across the Midlands industrial, healthcare, and hospitality spine.'
  }
];

const BIRMINGHAM_FAQS = [
  {
    q: 'Are you a chilled food wholesaler delivering across Birmingham?',
    a: 'Yes. Rootwills operates temperature-controlled dual-zone refrigerated vehicles maintaining strict 0°C to 4°C cold-chain standards across Birmingham. We supply commercial kitchens with farmhouse cheeses, salted and unsalted butter blocks, creams, Lion-certified eggs, and vacuum-packed prime British butchery cuts.'
  },
  {
    q: 'How does Rootwills support commercial catering and high-volume banqueting in Birmingham?',
    a: 'We provide dedicated commercial catering account management with bulk case pricing, multi-pallet conference staging, and automated standing order drops. Catering teams can order full pallet allocations for weekend weddings and corporate banquets alongside broken-case top-ups without penalty.'
  },
  {
    q: 'What is the order cut-off for next-morning delivery across Birmingham?',
    a: 'Orders placed up to 23:00 (11:00 PM) Sunday through Friday via WhatsApp, phone (+44 16164 12803), or our Rootwills Direct online trade portal are delivered next morning between 04:00 AM and 07:30 AM before your head chef’s service prep begins.'
  },
  {
    q: 'Do you deliver to Birmingham city centre locations with Clean Air Zone curfews?',
    a: 'Yes. Our pre-dawn delivery fleet operates between 04:00 AM and 06:30 AM specifically to beat Birmingham Clean Air Zone congestion and pedestrianised delivery window curfews in areas such as Colmore Row, New Street, Broad Street, and the Jewellery Quarter.'
  },
  {
    q: 'Where is the Rootwills distribution and registered hub located?',
    a: 'Rootwills Ltd (Companies House No. 17398744) is headquartered at 7d Yates Street, Middleton, Manchester M24 4GA, England, operating dedicated daily pre-dawn refrigerated fleet trunks across Birmingham, Digbeth, the Jewellery Quarter, Edgbaston, Solihull, and the Greater West Midlands.'
  },
  {
    q: 'How do Birmingham hospitality businesses open a 30-day trade account?',
    a: 'You can apply online via our trade application portal or call our desk at +44 16164 12803. We verify VAT and Companies House credentials within 2 business hours, assigning you a dedicated account manager and tailored wholesale contract pricing.'
  }
];

const birminghamJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['WholesaleStore', 'LocalBusiness'],
      '@id': 'https://www.rootwills.co.uk/wholesale-produce-supplier-birmingham#localbusiness',
      name: 'Rootwills Birmingham - Wholesale Food, Catering & Produce Supplier',
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
        { '@type': 'AdministrativeArea', name: 'Wolverhampton' },
        { '@type': 'AdministrativeArea', name: 'Dudley' }
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
                    BIRMINGHAM WHOLESALE FOOD &amp; CATERING // DIRECT SUPPLY
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.08] mb-3 [text-wrap:balance]">
                  Wholesale Food, Produce &amp; Catering Supplies in <span className="text-[#F3D08A] italic">Birmingham</span>
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
                  Direct farm partnerships, 02:00 AM depot intake, and guaranteed pre-dawn temperature-controlled delivery across Digbeth, the Jewellery Quarter, Edgbaston, Solihull, and Greater West Midlands. Supplying commercial kitchens with Class 1 produce, chilled dairy, prime butchery, and catering essentials.
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
                    <span>0–4°C Chilled Dual-Zone</span>
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
              Built for Birmingham’s Commercial Foodservice &amp; Catering Brigades
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-700 font-sans">
              Unlike broadline FMCG suppliers who deliver ambient parcels during lunchtime service, our entire Birmingham operation is engineered for pre-dawn culinary excellence and single-van consolidation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#E8DEC8] shadow-sm hover:border-[#BA8E4E]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#260309] text-[#F3D08A] flex items-center justify-center mb-6 shadow-sm">
                <Snowflake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#131313] mb-2">
                0–4°C Chilled Food &amp; Dairy Cold-Chain
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Dual-temperature refrigerated vans ensure that fragile artisan cheeses, clotted creams, fresh milks, butter blocks, and butchery primals arrive with verified temperature compliance at 04:00 AM.
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
                Commercial Catering Splits &amp; Bulk Staging
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Order multi-pallet staging for high-volume corporate conferences and banquets, or single broken cases of heritage brassicas and micro herbs without penalty surcharges.
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

        {/* 6 CORE COMMODITY DIVISIONS (Fresh Produce, Chilled Dairy, Butchery, Bakery, Restaurant, Hotel) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BA8E4E] font-bold block mb-2">
              COMPREHENSIVE BIRMINGHAM INVENTORY
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#131313] tracking-tight">
              Consolidated Wholesale Larder &amp; Chilled Supplies
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-700 font-sans">
              Consolidate your invoices into a single morning delivery: from Class 1 farm produce and chilled dairy to dry-aged British butchery and daily morning bake drops.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Division 1: Fresh Produce */}
            <div className="rounded-2xl overflow-hidden bg-white/90 backdrop-blur-xs border border-[#E8DEC8] shadow-sm flex flex-col hover:border-[#BA8E4E]/50 transition-colors">
              <div className="relative h-44 w-full bg-stone-100">
                <Image
                  src="/images/commercial/rootwills_fresh_crates.jpg"
                  alt="Fresh farm produce wholesale Birmingham"
                  fill
                  sizes="380px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#BA8E4E] font-bold">Division 01</span>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Class 1 Spec</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#131313] mb-1">
                    Fresh Farm Vegetables &amp; Salads
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
                    Class 1 British brassicas, heirloom carrots, vine tomatoes, wild mushrooms, living micro herbs, and prepared kitchen vegetables.
                  </p>
                </div>
                <Link
                  href="/products/fresh-produce"
                  className="text-xs font-semibold text-[#BA8E4E] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
                >
                  <span>Explore Fresh Produce Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Division 2: Chilled Dairy & Cheeses */}
            <div className="rounded-2xl overflow-hidden bg-white/90 backdrop-blur-xs border border-[#E8DEC8] shadow-sm flex flex-col hover:border-[#BA8E4E]/50 transition-colors">
              <div className="relative h-44 w-full bg-stone-100">
                <Image
                  src="/images/commercial/rootwills_dairy_cheese.jpg"
                  alt="Chilled food wholesaler dairy and cheeses Birmingham"
                  fill
                  sizes="380px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#BA8E4E] font-bold">Division 02</span>
                    <span className="text-[10px] font-mono text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">0–4°C Chilled</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#131313] mb-1">
                    Chilled Dairy, Cheeses &amp; Lion Eggs
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
                    Farmhouse British cheeses, salted &amp; unsalted butter blocks, double cream, graded Lion Quality eggs, and organic milks.
                  </p>
                </div>
                <Link
                  href="/products/chilled-dairy"
                  className="text-xs font-semibold text-[#BA8E4E] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
                >
                  <span>Explore Dairy Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Division 3: Prime Butchery & Poultry */}
            <div className="rounded-2xl overflow-hidden bg-white/90 backdrop-blur-xs border border-[#E8DEC8] shadow-sm flex flex-col hover:border-[#BA8E4E]/50 transition-colors">
              <div className="relative h-44 w-full bg-stone-100">
                <Image
                  src="/images/commercial/rootwills_meat_poultry.jpg"
                  alt="Wholesale meat suppliers and catering butchery Birmingham"
                  fill
                  sizes="380px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#BA8E4E] font-bold">Division 03</span>
                    <span className="text-[10px] font-mono text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Red Tractor</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#131313] mb-1">
                    Prime British Butchery &amp; Poultry
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
                    Dry-aged British beef cuts, Red Tractor assured poultry, Welsh pasture lamb, and bespoke portioning tailored to culinary specs.
                  </p>
                </div>
                <Link
                  href="/products/meat-poultry"
                  className="text-xs font-semibold text-[#BA8E4E] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
                >
                  <span>Explore Butchery Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Division 4: Artisan Morning Bakery */}
            <div className="rounded-2xl overflow-hidden bg-white/90 backdrop-blur-xs border border-[#E8DEC8] shadow-sm flex flex-col hover:border-[#BA8E4E]/50 transition-colors">
              <div className="relative h-44 w-full bg-stone-100">
                <Image
                  src="/images/commercial/rootwills_artisan_bakery.jpg"
                  alt="Wholesale artisan bakery and morning goods Birmingham"
                  fill
                  sizes="380px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#BA8E4E] font-bold">Division 04</span>
                    <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Daily Bake</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#131313] mb-1">
                    Artisan Sourdoughs &amp; Morning Goods
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
                    Slow-fermented sourdough boules, glazed brioche burger buns, sandwich loaves, and handcrafted butter viennoiserie.
                  </p>
                </div>
                <Link
                  href="/products/bakery-breakfast"
                  className="text-xs font-semibold text-[#BA8E4E] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
                >
                  <span>Explore Bakery Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Division 5: Restaurant Food Supply */}
            <div className="rounded-2xl overflow-hidden bg-white/90 backdrop-blur-xs border border-[#E8DEC8] shadow-sm flex flex-col hover:border-[#BA8E4E]/50 transition-colors">
              <div className="relative h-44 w-full bg-stone-100">
                <Image
                  src="/images/commercial/rootwills_delivery_van.jpg"
                  alt="Restaurant food suppliers commercial wholesale Birmingham"
                  fill
                  sizes="380px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#BA8E4E] font-bold">Service Solution</span>
                    <span className="text-[10px] font-mono text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">Single-Van</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#131313] mb-1">
                    Restaurant Food Supply &amp; Keyhole Drops
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
                    Eliminate multiple noisy morning deliveries. Consolidate produce, dairy, bakery, and dry store into one reliable pre-dawn delivery.
                  </p>
                </div>
                <Link
                  href="/services/restaurant-food-supply"
                  className="text-xs font-semibold text-[#BA8E4E] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
                >
                  <span>Restaurant Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Division 6: Hotel & Catering Banqueting */}
            <div className="rounded-2xl overflow-hidden bg-white/90 backdrop-blur-xs border border-[#E8DEC8] shadow-sm flex flex-col hover:border-[#BA8E4E]/50 transition-colors">
              <div className="relative h-44 w-full bg-stone-100">
                <Image
                  src="/images/commercial/01_hero_culinary.jpg"
                  alt="Birmingham wholesale catering supplies and banquet foodservice"
                  fill
                  sizes="380px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#BA8E4E] font-bold">Service Solution</span>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">30-Day Terms</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#131313] mb-1">
                    Hotel &amp; Banqueting Catering Supplies
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
                    High-capacity staging for multi-outlet hotels, conference banqueting, and major West Midlands event venues with SLA guarantees.
                  </p>
                </div>
                <Link
                  href="/services/hotel-banqueting-supply"
                  className="text-xs font-semibold text-[#BA8E4E] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
                >
                  <span>Hotel &amp; Catering Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
              Birmingham Food &amp; Catering Wholesale FAQs
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
