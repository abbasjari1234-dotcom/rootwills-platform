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
  Beef,
  Flame,
  Layers,
  Award,
  ChevronRight,
  MapPin,
  UtensilsCrossed,
  Scale,
  Drumstick,
  PackageCheck
} from 'lucide-react';
import { DoodleFlourish } from '@/components/public/DoodleFlourish';

export const metadata: Metadata = {
  title: 'Wholesale Meat Suppliers UK | Catering Butchery & Poultry | Rootwills',
  description:
    'Premier UK wholesale butchery & poultry distributor for restaurants, hotels & commercial kitchens. Prime British beef, Red Tractor farm-assured poultry, Welsh lamb & portion-controlled meats with 0–2°C pre-dawn delivery across Birmingham, Manchester & the UK.',
  keywords: [
    'wholesale meat suppliers uk',
    'catering butchers birmingham',
    'wholesale poultry suppliers manchester',
    'restaurant meat wholesaler',
    'red tractor chicken wholesale',
    'commercial burger suppliers',
    'prime british beef wholesale',
    'halal poultry wholesale uk',
    'wholesale bacon and sausages catering',
    'hospitality meat distributors'
  ],
  alternates: {
    canonical: '/products/meat-poultry',
  },
  openGraph: {
    title: 'Wholesale Meat Suppliers UK | Rootwills Prime Butchery',
    description:
      'Chef-graded prime British beef, Red Tractor poultry, portion-cut steaks, and artisan sausages with 0–2°C butchery-controlled logistics for UK hospitality.',
    url: 'https://www.rootwills.co.uk/products/meat-poultry',
    siteName: 'Rootwills',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/images/commercial/rootwills_hero_chef_plating.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wholesale Meat Suppliers UK | Rootwills Prime Butchery',
    description:
      'Premier UK wholesale butchery & poultry distributor. Pre-dawn deliveries across Birmingham, Manchester & the UK.',
    images: ['/images/commercial/rootwills_hero_chef_plating.jpg'],
  },
};

const MEAT_DISCIPLINES = [
  {
    title: 'Prime British & Dry-Aged Beef',
    icon: Beef,
    tag: 'Red Tractor & Heritage Breeds',
    description:
      'Grass-fed British beef dry-aged on the bone, portion-cut steaks, roasting joints, and slow-cook primal braising cuts.',
    highlights: ['28-Day Dry-Aged Ribeye, Sirloin & Fillet Steaks', 'Prime Whole Striploins & Rump Hearts', 'Beef Brisket & Ox Cheek Primal Cuts', 'Bone-In Tomahawks & T-Bone Steaks'],
    idealFor: 'Steakhouses, boutique dining, Sunday roast pub brigades, and fine-dining restaurants.'
  },
  {
    title: 'Red Tractor Chicken & Poultry',
    icon: Drumstick,
    tag: 'Farm Assured & Halal Options',
    description:
      'Whole farm-assured birds, portioned skinless fillets, thigh meat, wings, and skewers prepared to exact gram specifications.',
    highlights: ['Grade A Fresh Chicken Fillets (10kg & 2x5kg)', 'Bone-In & Boneless Skinless Chicken Thighs', 'Marinated Chicken Satay & Souvlaki Skewers', 'Corn-Fed French & Free-Range British Chickens'],
    idealFor: 'High-volume grill houses, modern rotisseries, street food concepts, and banqueting kitchens.'
  },
  {
    title: 'Welsh Lamb & Prime Mutton',
    icon: Award,
    tag: 'PGI Pasture Assured',
    description:
      'Tender mountain-grazed Welsh lamb racks, boneless saddles, French-trimmed cutlets, and slow-braising lamb shanks.',
    highlights: ['French-Trimmed 8-Rib Lamb Racks', 'Whole Boned & Rolled Lamb Shoulders', 'Hindquarter Lamb Shanks (Individual Vac-Pack)', 'Diced Lamb Leg & Minces for Stews & Curries'],
    idealFor: 'Gastro dining, Mediterranean bistros, luxury weddings, and Middle Eastern grills.'
  },
  {
    title: 'Handcrafted Burgers & Minces',
    icon: Flame,
    tag: 'Steak Blend & Smashed',
    description:
      'Coarse-ground steak burgers, brisket & chuck smash patties, and culinary minces with consistent fat-to-lean ratios.',
    highlights: ['Gourmet Steak Burgers (4oz, 6oz, 8oz)', 'Brisket & Short Rib Blend Smash Balls', 'Lean Minced Beef (90VL & 80VL Commercial Sacks)', 'Seasoned Lamb & Herb Burger Patties'],
    idealFor: 'Artisan burger bars, sports lounges, festival caterers, and casual dining chains.'
  },
  {
    title: 'Bacon, Sausages & Cooked Deli Meats',
    icon: Layers,
    tag: 'Traditional Cured Lines',
    description:
      'Dry-cured back and streaky bacon, British Cumberland & Lincolnshire sausages, and sliced charcuterie for service.',
    highlights: ['Thick-Cut Dry-Cured Back Bacon (2.27kg / 5lb)', 'Crispy Smoked Streaky Bacon for Burgers', 'Award-Winning Cumberland & Pork Sausages', 'Sliced Pastrami, Prosciutto & Roast Ham'],
    idealFor: 'Brunch operations, hotel breakfast services, charcuterie boards, and deli delis.'
  },
  {
    title: 'Game, Duck & Specialty Cuts',
    icon: UtensilsCrossed,
    tag: 'Seasonal & Specialty',
    description:
      'Gressingham duck breasts, venison saddles, guinea fowl, and seasonal game cuts handled with strict culinary traceability.',
    highlights: ['Gressingham Duck Breast Fillets (Graded 200–250g)', 'Slow-Cooked Duck Confit Legs', 'Highland Red Deer Venison Haunch & Steaks', 'Whole Guinea Fowl & Quail Portions'],
    idealFor: 'Autumn/winter seasonal menus, tasting room brigades, and upscale countryside inns.'
  }
];

const BUTCHERY_PILLARS = [
  {
    title: '0°C – 2°C Meat Cold Chain',
    desc: 'Dedicated butchery temperature zone calibrated specifically below dairy levels to inhibit microbial growth and retain bloom.'
  },
  {
    title: 'Portion Control & Yield Yield',
    desc: 'Precision gram-weight steak and breast cutting reducing kitchen prep labour, trimming losses, and plate cost variance.'
  },
  {
    title: 'Full Farm-to-Fork Traceability',
    desc: 'Every primal carcass logged with ear tag, abattoir license, maturation date, and Red Tractor / PGI origin credentials.'
  },
  {
    title: 'Daily Pre-Dawn Kitchen Drop',
    desc: 'Dispatched in dual-temperature refrigerated vehicles directly into your walk-in cold room between 04:00 AM and 07:30 AM.'
  }
];

const BUTCHERY_FAQS = [
  {
    q: 'What is the order cut-off for next-morning fresh butchery delivery?',
    a: 'Orders submitted by 23:00 (11:00 PM) Sunday to Friday are prepared overnight by our master butchery team and delivered directly to your kitchen walk-in fridge between 04:00 AM and 07:30 AM Monday through Saturday.'
  },
  {
    q: 'Do you offer certified Halal meat and poultry options?',
    a: 'Yes. We supply certified Halal chicken fillets, diced meats, and lamb cuts accompanied by official HMC or Halal Food Authority accreditation certificates upon request.'
  },
  {
    q: 'Can we order bespoke portion-cut steaks or specific burger blends?',
    a: 'Yes. Our butchery team works directly with executive chefs to cut steaks to exact ounce or gram specifications (e.g., 8oz, 10oz, 12oz) and can calibrate burger grinds with custom chuck-to-brisket ratios.'
  },
  {
    q: 'Are your beef and poultry products Red Tractor farm assured?',
    a: 'Yes. The vast majority of our fresh British beef, pork, and chicken lines are certified under the Red Tractor Food Assurance Scheme, ensuring animal welfare standards, farm traceability, and environmental responsibility.'
  },
  {
    q: 'Which delivery corridors do your butchery refrigerated fleet cover?',
    a: 'We operate dedicated daily pre-dawn delivery routes across Birmingham & the West Midlands (from our Birmingham dispatch desk) and Greater Manchester & Cheshire (from our Middleton Headquarters hub at 7d Yates Street, M24 4GA).'
  },
  {
    q: 'How do new commercial kitchens establish a 30-day wholesale account?',
    a: 'Submit an inquiry through our Contact page or call our trade desk at +44 16164 12803. We verify Companies House details within 2 business hours and assign you a dedicated butchery account manager.'
  }
];

export default function MeatPoultryPage() {
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
            name: 'Prime Butchery & Poultry',
            item: 'https://www.rootwills.co.uk/products/meat-poultry'
          }
        ]
      },
      {
        '@type': 'Service',
        '@id': 'https://www.rootwills.co.uk/products/meat-poultry#service',
        name: 'Commercial Wholesale Butchery & Poultry Supply',
        serviceType: 'Wholesale Meat Supplier',
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
          'Chef-graded wholesale British beef, Red Tractor poultry, Welsh lamb, gourmet burger patties, and bacon with 0–2°C pre-dawn delivery.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Wholesale Butchery & Poultry Lines',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: '28-Day Dry-Aged British Steaks (Ribeye, Sirloin, Fillet)',
                category: 'Prime British Beef'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Red Tractor Grade A Fresh Chicken Breast Fillets 10kg',
                category: 'Red Tractor Chicken & Poultry'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Handcrafted Gourmet Steak Burger Patties (4oz–8oz)',
                category: 'Burgers & Minces'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'French-Trimmed Welsh Lamb Racks & Shanks',
                category: 'Welsh Lamb & Prime Mutton'
              }
            }
          ]
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: BUTCHERY_FAQS.map((faq) => ({
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
                Prime Butchery &amp; Poultry
              </li>
            </ol>
          </nav>

          {/* Luxury Double-Bezel Outer Shell */}
          <div className="p-1 sm:p-1.5 rounded-[2rem] bg-gradient-to-b from-[#BA8E4E]/35 via-[#EFE8D8]/70 to-[#BA8E4E]/25 ring-1 ring-[#BA8E4E]/40 shadow-xl">
            <div className="relative rounded-[calc(2rem-0.375rem)] overflow-hidden bg-gradient-to-br from-[#260309] via-[#1F0207] to-[#120104] p-6 sm:p-12 lg:p-16 text-white border border-[#F3D08A]/30">
              {/* Top Hairline Gold Glow */}
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#F3D08A]/80 to-transparent pointer-events-none" />

              {/* Textured Linen Canvas Background */}
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
                    COMMODITY DIVISION 03 // BUTCHERY &amp; POULTRY
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-bold text-white tracking-tight leading-[1.08] mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  Prime British Butchery, Red Tractor Poultry <span className="text-[#F3D08A] italic font-normal">&amp; Welsh Lamb</span>
                </h1>

                <DoodleFlourish 
                  variant="underline-loop" 
                  color="#F3D08A" 
                  strokeWidth={3} 
                  className="w-40 sm:w-64 -mt-1 mb-4 text-[#F3D08A]" 
                  delay={150}
                />

                <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed mb-6 sm:mb-8 font-light max-w-2xl">
                  Supplying the UK&apos;s leading dining rooms, steakhouses, and catering operations with dry-aged British beef, portion-controlled Red Tractor poultry, and Welsh mountain lamb. Calibrated to 0–2°C for peak freshness.
                </p>

                {/* Operational Metrics Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Cold Zone</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">0°C – 2°C Calibrated</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Farm Assured</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">Red Tractor / PGI</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Kitchen Drop</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">04:00–07:30 AM</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="block font-mono text-[10px] uppercase text-[#F3D08A] tracking-wider mb-0.5">Portioning</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-white">Bespoke Gram Cuts</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href="/products?dept=meat-poultry"
                    className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#BA8E4E] hover:bg-[#A37B3E] text-[#131313] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Browse Live Butchery Catalog</span>
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

        {/* BUTCHERY DISCIPLINES GRID */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#BA8E4E] font-bold block mb-2">
              CURATED BUTCHERY LINES
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#131313] tracking-tight">
              Six Comprehensive Commercial Meat Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2">
              Bespoke whole-muscle fabrication, dry-aged steak primal cutting, and catering portion control for commercial kitchens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {MEAT_DISCIPLINES.map((cat, idx) => {
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
                        href={`/products?dept=meat-poultry`}
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

        {/* BUTCHERY LOGISTICS & COLD CHAIN SECTION */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="p-1 sm:p-1.5 rounded-[2rem] bg-gradient-to-b from-[#BA8E4E]/30 via-[#EFE8D8]/60 to-[#BA8E4E]/20 ring-1 ring-[#BA8E4E]/35 shadow-md">
            <div className="rounded-[calc(2rem-0.375rem)] bg-white p-6 sm:p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#BA8E4E]/30 text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#BA8E4E] font-bold mb-3">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>0°C – 2°C BUTCHERY STANDARDS</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#260309] tracking-tight">
                    Strict Traceability &amp; Precision Portioning
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md">
                  From farm carcass tags to portion-controlled vacuum packs, we guarantee exact weight consistency and verified origin documentation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {BUTCHERY_PILLARS.map((p, idx) => (
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
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="text-center mb-8">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#BA8E4E] font-bold block mb-2">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#131313]">
              Commercial Wholesale Butchery FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {BUTCHERY_FAQS.map((faq, idx) => (
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
                  STABLE COMMERCIAL BUTCHERY PROCUREMENT
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
                  Upgrade Your Kitchen Butchery Supply
                </h2>
                <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed mb-8 font-light">
                  Request custom portion steak samples, review volume contracted poultry rate sheets, or open a 30-day commercial credit account today.
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
