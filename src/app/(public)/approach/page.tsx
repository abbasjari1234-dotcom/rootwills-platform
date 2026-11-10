import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { 
  ShieldCheck, 
  Truck, 
  Sprout, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Award,
  Layers,
  Thermometer,
  Scale
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Quality Standards & Cold Chain Logistics | Rootwills UK',
  description:
    'Learn how Rootwills maintains quality standards in British foodservice wholesale. Daily 02:00 AM market intake, multi-temperature dual-evaporator delivery fleet, Red Tractor farm assurance, and transparent batch traceability.',
  alternates: {
    canonical: '/approach',
  },
  openGraph: {
    title: 'Rootwills Approach: Quality Standards & Cold-Chain Logistics',
    description:
      'Daily 02:00 AM market grading, dual-evaporator temperature control, and complete British farm traceability for commercial hospitality kitchens.',
    url: 'https://www.rootwills.co.uk/approach',
    type: 'website',
  },
};

const QUALITY_PILLARS = [
  {
    icon: Clock,
    step: 'STAGE 01',
    title: 'Daily 02:00 AM Market Inspection',
    desc: 'Before cities wake, our senior produce buyers physically inspect arriving grower consignments. Every crate is evaluated for skin firmness, sugar calibration (Brix), and transit resilience before it is accepted into stock.',
    points: [
      'Reject rate under 0.6% due to direct farm relationships',
      'Daily Class 1 specification verification across all seasonal produce',
      'Morning harvest tagging with field lot numbers',
    ],
  },
  {
    icon: Thermometer,
    step: 'STAGE 02',
    title: 'Continuous Cold-Chain Integrity',
    desc: 'Temperature fluctuations compromise shelf life and flavor. From the farm cooling tunnel to our depot chill stores and dual-evaporator multi-drop vans, temperature telemetry is recorded every 90 seconds.',
    points: [
      'Chilled produce maintained at 1°C to 4°C',
      'Fresh butchery and coastal fish kept at 0°C to 2°C',
      'Deep-frozen lines held strictly at -18°C or below',
    ],
  },
  {
    icon: Sprout,
    step: 'STAGE 03',
    title: 'Direct British Farm Lineage',
    desc: 'We bypass unnecessary trading intermediaries by dealing directly with generational farms across Worcestershire, Warwickshire, Lincolnshire, Kent, and the Scottish coast.',
    points: [
      'Red Tractor assured British livestock and poultry',
      'Full batch provenance printable on commercial delivery slips',
      'Fair grower pricing contracts that safeguard farming continuity',
    ],
  },
  {
    icon: Truck,
    step: 'STAGE 04',
    title: 'Pre-Dawn Dispatch Execution',
    desc: 'Timing is critical for kitchen brigades. Our multi-drop fleet departs our Birmingham hub between 04:00 and 05:00 AM, arriving before head chefs begin morning stock preparation.',
    points: [
      '99.4% on-time delivery record across the Midlands and London',
      'Secure key-drop facility with photo-verified electronic POD',
      'Emergency morning top-up service for priority accounts',
    ],
  },
];

const COMPLIANCE_STANDARDS = [
  {
    name: 'BRCGS Storage & Distribution',
    standard: 'Audited Facility Standards',
    detail: 'Our depots adhere to the global standard for food safety, warehouse sanitation, and operational process control.',
  },
  {
    name: 'Red Tractor Assured',
    standard: 'British Farm Origin',
    detail: 'Complete certification that beef, lamb, poultry, and dairy originate from vetted British farms with animal welfare compliance.',
  },
  {
    name: 'SALSA Standard',
    standard: 'Safe & Local Supplier Assurance',
    detail: 'Comprehensive HACCP risk assessments, allergen segregation, and microbiological testing verification.',
  },
  {
    name: 'Lion Quality Code',
    standard: 'Class A British Eggs',
    detail: 'Salmonella vaccination verification, date stamping on shells, and end-to-end flock traceability.',
  },
];

export default function ApproachPage() {
  const approachJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Rootwills Operational Approach & Quality Standards',
    description: 'Detailed explanation of Rootwills supply chain, cold-chain logistics, and farm provenance standards.',
    publisher: {
      '@type': 'WholesaleStore',
      name: 'Rootwills Food Services & Wholesale',
      url: 'https://www.rootwills.co.uk',
      telephone: '+44 16164 12803',
    },
  };

  return (
    <div className="w-full bg-[#FAF7F2] text-[#131313] min-h-screen pt-24 sm:pt-28 pb-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(approachJsonLd) }}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Header Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2E060D]/5 border border-[#2E060D]/10 text-xs font-mono font-semibold uppercase tracking-widest text-[#2E060D]">
            <span>Operational Excellence</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#131313] tracking-tight leading-[1.15]">
            Our Standards, Farm Lineage &amp; Cold-Chain Logistics
          </h1>
          
          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Every crate delivered to your kitchen is backed by strict 02:00 AM depot intake grading, continuous refrigeration monitoring, and genuine British farm provenance.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Link
              href="/products"
              className="px-6 py-3 rounded-full bg-[#2E060D] hover:bg-[#430A14] text-white text-sm font-semibold transition-all duration-150 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>View Product Catalogue</span>
              <ArrowRight className="w-4 h-4 text-[#F3D08A]" />
            </Link>
            
            <Link
              href="/services"
              className="px-6 py-3 rounded-full bg-white hover:bg-stone-50 text-[#131313] border border-[#E8DEC8] text-sm font-semibold transition-all duration-150 shadow-xs cursor-pointer"
            >
              <span>Explore Supply Services</span>
            </Link>
          </div>
        </section>

        {/* 4-Stage Operational Rigor */}
        <section className="space-y-10 sm:space-y-14">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#131313]">
              The 4-Stage Quality Pipeline
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 font-sans">
              How we ensure kitchen ingredients arrive fresh, calibrated, and ready for service every single morning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {QUALITY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.step}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-[0_4px_20px_rgba(46,6,13,0.03)] space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-[#FAF5EB] border border-[#BA8E4E]/30 flex items-center justify-center text-[#2E060D]">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#BA8E4E] tracking-wider px-2.5 py-0.5 rounded bg-[#FAF7F2] border border-[#E8DEC8]">
                        {pillar.step}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#131313]">
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-stone-600 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F2ECE1] space-y-2">
                    {pillar.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-700 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Visual Inspection Spotlight */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DEC8] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#BA8E4E] font-bold">
              Depot Intake Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E060D]">
              Physical Grading, Calibration &amp; Lot Control
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              Unlike automated logistics hubs that process sealed pallets without opening them, our depot staff unboxes sample crates from every arriving lorry. We check internal temperature with calibrated probes, verify uniform fruit and vegetable sizing, and reject any product that fails our Class 1 foodservice benchmark.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              This hands-on inspection eliminates split-case defects and ensures that when your chefs slice into a box of morning produce, there are no surprises.
            </p>

            <div className="pt-2 flex items-center gap-6">
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2E060D]">99.4%</span>
                <span className="text-xs text-stone-500 block">Fulfillment Accuracy</span>
              </div>
              <div className="border-l border-stone-200 pl-6">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2E060D]">&lt; 0.6%</span>
                <span className="text-xs text-stone-500 block">Depot Return Rate</span>
              </div>
              <div className="border-l border-stone-200 pl-6">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2E060D]">6 Days</span>
                <span className="text-xs text-stone-500 block">Weekly Operations</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-[#E8DEC8] shadow-inner">
              <Image
                src="/images/commercial/chef_inspect_produce.jpg"
                alt="Depot staff inspecting crates of British farm harvest"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Accreditations & Compliance Grid */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#BA8E4E] font-bold">
              Food Safety Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#131313] mt-1">
              Third-Party Audited Quality Frameworks
            </h2>
            <p className="text-sm text-stone-600 mt-2 font-sans">
              Independent oversight that gives catering managers, hygiene inspectors, and head chefs complete peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMPLIANCE_STANDARDS.map((std, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-[#E8DEC8] shadow-xs space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF5EB] border border-[#BA8E4E]/30 flex items-center justify-center text-[#2E060D]">
                  <Award className="w-4 h-4 text-[#BA8E4E]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#131313] leading-snug">
                    {std.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[#8B1A28] font-semibold block mt-0.5">
                    {std.standard}
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-sans leading-relaxed pt-1 border-t border-stone-100">
                  {std.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="rounded-3xl bg-[#2E060D] text-white p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Experience the Rootwills Quality Standard
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              Let us arrange a trial delivery for your kitchen brigade. Experience prompt pre-dawn arrivals and hand-graded produce freshness firsthand.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full bg-[#FAF7F2] text-[#2E060D] text-sm font-semibold hover:bg-white transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Request a Trial Kitchen Delivery
            </Link>
            
            <Link
              href="/products"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Browse 5,480+ Lines</span>
              <ArrowRight className="w-4 h-4 text-[#F3D08A]" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

