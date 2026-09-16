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
    <div className="min-h-screen bg-slate-50/50 pb-20 space-y-16 sm:space-y-24">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white relative overflow-hidden border-b border-slate-800 pt-16 sm:pt-24 pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>UK Commercial Distribution Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Regional Logistics Hubs &amp; Delivery Coverage
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Our multi-temperature fleet runs 6 mornings a week across the Midlands and Greater London. Explore our depot locations, ordering cutoffs, and verified delivery postcodes.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/apply"
              className="px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <span>Open Commercial Trade Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/delivery"
              className="px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Check Postcode Schedule</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Regional Hubs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REGIONAL_HUBS.map((hub) => (
            <div
              key={hub.slug}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold font-mono uppercase">
                    {hub.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cutoff: {hub.cutoff}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{hub.name}</h2>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{hub.hubTitle} &bull; {hub.address}</div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {hub.description}
                </p>

                {/* Delivery details strip */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
                  <div>
                    <div className="text-slate-500 font-semibold">Morning Drop Window</div>
                    <div className="text-emerald-700 font-bold font-mono text-sm mt-0.5">{hub.deliveryWindow}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-semibold">Fleet Standard</div>
                    <div className="text-slate-900 font-bold text-sm mt-0.5">Dual-Temp +2°C / -18°C</div>
                  </div>
                </div>

                {/* Postcodes */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
                    Core Postal Sectors:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {hub.postcodes.map((pc, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-medium">
                        {pc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/locations/${hub.slug}`}
                  className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 font-mono uppercase tracking-wider"
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
