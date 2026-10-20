import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MapPin, Clock, Truck, ShieldCheck, ArrowRight, Building2, Phone } from 'lucide-react';
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

export const metadata: Metadata = {
  title: 'UK Regional Wholesale Distribution Hubs & Postcodes | Rootwills',
  description:
    'Explore our regional UK foodservice network across Birmingham, Coventry, Leicester, and Greater London. Guaranteed morning drops and unbroken cold-chain logistics.',
};

const REGIONAL_HUBS = [
  {
    slug: 'birmingham',
    name: 'Birmingham & West Midlands',
    hubTitle: 'Birmingham Central Fulfilment Hub',
    address: 'Digbeth Wholesale Quarter, Birmingham, B5 5JR',
    cutoff: '11:00 PM',
    deliveryWindow: '05:30 - 08:00 AM',
    postcodes: ['B1', 'B2', 'B3', 'B4', 'B5', 'B15', 'B16', 'B18', 'B91', 'B92', 'B72', 'B73', 'B74'],
    description: 'Direct morning wholesale produce, meat, and dairy supply across Birmingham City Centre, Jewellery Quarter, Edgbaston, Solihull, and Sutton Coldfield.',
    badge: 'Central Operations Depot',
  },
  {
    slug: 'coventry',
    name: 'Coventry & Warwickshire',
    hubTitle: 'Coventry & South Midlands Depot',
    address: 'Rowley Road Distribution Park, Coventry, CV3 4FL',
    cutoff: '11:00 PM',
    deliveryWindow: '05:45 - 08:15 AM',
    postcodes: ['CV1', 'CV2', 'CV3', 'CV4', 'CV5', 'CV31', 'CV32', 'CV34', 'CV37'],
    description: 'Comprehensive wholesale foodservice delivery across Coventry, Leamington Spa, Warwick, Kenilworth, and Stratford-upon-Avon.',
    badge: 'Warwickshire Hub',
  },
  {
    slug: 'leicester',
    name: 'Leicester & East Midlands',
    hubTitle: 'Leicester Commercial Depot',
    address: 'Thurmaston Commercial Centre, Leicester, LE4 8JF',
    cutoff: '10:30 PM',
    deliveryWindow: '06:00 - 08:30 AM',
    postcodes: ['LE1', 'LE2', 'LE3', 'LE4', 'LE5', 'LE11', 'DE1', 'NG1'],
    description: 'Daily fresh produce and foodservice deliveries across Leicester, Loughborough, Derby, and Nottingham hospitality kitchens.',
    badge: 'East Midlands Hub',
  },
  {
    slug: 'london',
    name: 'Greater London',
    hubTitle: 'Greater London Gateway Hub',
    address: 'Park Royal Logistics Hub, London, NW10 7LT',
    cutoff: '11:00 PM',
    deliveryWindow: '05:00 - 07:30 AM',
    postcodes: ['W1', 'WC1', 'EC1', 'EC2', 'SW1', 'SE1', 'E1', 'NW1'],
    description: 'Early morning dual-temperature supply to high-volume Central London restaurants, hotels, clubs, and contract catering operations.',
    badge: 'London Gateway',
  },
];

export default function LocationsHubPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 pb-20 space-y-12 sm:space-y-16">
      {/* Hero Header */}
      <section className="bg-[#2E060D] text-white relative overflow-hidden border-b border-[#BA8E4E]/25 pt-16 sm:pt-24 pb-16 lg:pb-20">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-25 mix-blend-overlay"
          style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#380710] via-[#2E060D] to-[#1E0307] pointer-events-none z-0" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BA8E4E]/15 border border-[#BA8E4E]/40 text-[#D4A86A] text-xs font-serif uppercase tracking-[0.2em] font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#D4A86A]" />
            <span>UK Commercial Distribution Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            Regional Logistics Hubs &amp; <br className="hidden sm:inline" />
            <span className="text-[#D4A86A]">Delivery Coverage</span>
          </h1>

          <p className="text-xs sm:text-base text-[#EDE4D8]/85 max-w-2xl mx-auto font-sans leading-relaxed">
            Our multi-temperature fleet runs 6 mornings a week across the Midlands and Greater London. Explore our depot locations, ordering cutoffs, and verified delivery postcodes.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/#contact"
              className="group inline-flex items-center justify-center gap-3 pl-7 pr-2.5 py-2.5 rounded-full bg-[#D4A86A] hover:bg-[#C59958] text-[#2D060D] text-xs sm:text-[13px] font-serif font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-xl active:scale-[0.98]"
            >
              <span>Partner With Rootwills</span>
              <div className="w-7 h-7 rounded-full bg-[#2D060D]/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5 text-[#2D060D]" />
              </div>
            </Link>

            <Link
              href="/delivery"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#1A0307]/80 hover:bg-[#2A050D] border border-[#BA8E4E]/40 text-[#EDE4D8] text-xs sm:text-[13px] font-serif font-semibold tracking-wider transition-all"
            >
              <span>Check Postcode Schedule</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Regional Hubs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {REGIONAL_HUBS.map((hub) => (
            <div
              key={hub.slug}
              className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md hover:border-[#BA8E4E]/60 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#BA8E4E]/30 text-[#8C6629] text-xs font-serif font-semibold">
                    {hub.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-serif">
                    <Clock className="w-3.5 h-3.5 text-[#BA8E4E]" />
                    <span>Cutoff: {hub.cutoff}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#2E060D]">{hub.name}</h2>
                  <div className="text-xs text-stone-500 font-medium mt-1 font-sans">{hub.hubTitle} &bull; {hub.address}</div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  {hub.description}
                </p>

                {/* Delivery details strip */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-[#FAF6EE] border border-[#E8DEC8] rounded-2xl text-xs">
                  <div>
                    <div className="text-stone-500 font-serif">Morning Drop Window</div>
                    <div className="text-[#2E060D] font-serif font-bold text-sm mt-0.5">{hub.deliveryWindow}</div>
                  </div>
                  <div>
                    <div className="text-stone-500 font-serif">Fleet Standard</div>
                    <div className="text-stone-800 font-sans font-semibold text-xs mt-1">Dual-Temp +2°C / -18°C</div>
                  </div>
                </div>

                {/* Postcodes */}
                <div className="space-y-2">
                  <div className="text-xs font-serif uppercase tracking-wider text-stone-600 font-semibold">
                    Core Postal Sectors:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {hub.postcodes.map((pc, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#FAF6EE] border border-[#E8DEC8] text-stone-700 text-xs font-serif font-medium">
                        {pc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DEC8] flex items-center justify-between">
                <Link
                  href={`/locations/${hub.slug}`}
                  className="text-xs sm:text-sm font-serif font-bold text-[#BA8E4E] hover:text-[#8C6629] flex items-center gap-1.5 uppercase tracking-wider transition-colors"
                >
                  <span>Explore {hub.name} Hub Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commercial Bottom CTA */}
      <CommercialBottomCTA />
    </div>
  );
}
