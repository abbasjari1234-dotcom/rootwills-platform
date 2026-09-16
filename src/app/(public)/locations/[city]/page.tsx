import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Truck, Clock, ShieldCheck, ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import { PriceEstimator } from '@/components/public/PriceEstimator';
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

const LOCATIONS_SEO: Record<string, { title: string; description: string; h1: string }> = {
  birmingham: {
    title: 'Birmingham Wholesale Food & Produce Supply | Rootwills',
    description:
      'Get early morning wholesale produce and food delivery across Birmingham and the West Midlands. Check your delivery postcode and open an account today.',
    h1: 'Wholesale Food Supply in Birmingham & West Midlands',
  },
  coventry: {
    title: 'Coventry Wholesale Produce & Food Delivery | Rootwills',
    description:
      'Reliable wholesale food and fresh produce delivery across Coventry and Warwickshire commercial kitchens. Register today for morning delivery windows.',
    h1: 'Wholesale Food Supply in Coventry & Warwickshire',
  },
  leicester: {
    title: 'Leicester Wholesale Food & Produce Supply | Rootwills',
    description:
      'Direct farm-fresh produce and foodservice delivery for East Midlands restaurants, hotels, and caterers. Sign up today to access locked trade pricing.',
    h1: 'Wholesale Food Supply in Leicester & East Midlands',
  },
  london: {
    title: 'London Wholesale Food & Produce Supply | Rootwills',
    description:
      'Early morning dual-temperature food delivery for high-volume restaurants and hospitality across London. Request your trade account access online now.',
    h1: 'Wholesale Food Supply in Greater London',
  },
};

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const seo = LOCATIONS_SEO[params.city.toLowerCase()];
  if (!seo) {
    return {
      title: 'Regional Wholesale Food & Produce Supply | Rootwills',
      description:
        'Explore our regional wholesale foodservice network with guaranteed morning delivery windows. Check your kitchen delivery postcode and open an account.',
    };
  }
  return {
    title: seo.title,
    description: seo.description,
  };
}

const LOCATIONS_DATA: Record<string, {
  name: string;
  county: string;
  depotName: string;
  depotAddress: string;
  postcodes: string[];
  cutoff: string;
  deliveryWindow: string;
  description: string;
}> = {
  birmingham: {
    name: 'Birmingham & West Midlands',
    county: 'West Midlands',
    depotName: 'Birmingham Central Fulfilment Hub',
    depotAddress: 'Digbeth Wholesale Quarter, Birmingham, B5 5JR',
    postcodes: ['B1', 'B2', 'B3', 'B4', 'B5', 'B15', 'B16', 'B18', 'B91', 'B92', 'B72', 'B73', 'B74'],
    cutoff: '11:00 PM',
    deliveryWindow: '05:30 - 08:00 AM',
    description: 'Direct morning wholesale fruit, vegetable, dairy, and meat supply across Birmingham City Centre, Jewellery Quarter, Edgbaston, Solihull, Sutton Coldfield, and surrounding business districts.',
  },
  coventry: {
    name: 'Coventry & Warwickshire',
    county: 'Warwickshire',
    depotName: 'Coventry & South Midlands Depot',
    depotAddress: 'Rowley Road Distribution Park, Coventry, CV3 4FL',
    postcodes: ['CV1', 'CV2', 'CV3', 'CV4', 'CV5', 'CV31', 'CV32', 'CV34', 'CV37'],
    cutoff: '11:00 PM',
    deliveryWindow: '05:45 - 08:15 AM',
    description: 'Comprehensive wholesale foodservice delivery across Coventry, Leamington Spa, Warwick, Kenilworth, and Stratford-upon-Avon.',
  },
  leicester: {
    name: 'Leicester & East Midlands',
    county: 'Leicestershire',
    depotName: 'Leicester Commercial Depot',
    depotAddress: 'Thurmaston Commercial Centre, Leicester, LE4 8JF',
    postcodes: ['LE1', 'LE2', 'LE3', 'LE4', 'LE5', 'LE11', 'DE1', 'NG1'],
    cutoff: '10:30 PM',
    deliveryWindow: '06:00 - 08:30 AM',
    description: 'Daily fresh produce and foodservice deliveries across Leicester, Loughborough, Derby, and Nottingham hospitality venues.',
  },
  london: {
    name: 'Greater London',
    county: 'Greater London',
    depotName: 'Greater London Gateway Hub',
    depotAddress: 'Park Royal Logistics Hub, London, NW10 7LT',
    postcodes: ['W1', 'WC1', 'EC1', 'EC2', 'SW1', 'SE1', 'E1', 'NW1'],
    cutoff: '11:00 PM',
    deliveryWindow: '05:00 - 07:30 AM',
    description: 'Early morning dual-temp supply to high-volume Central London restaurants, hotels, clubs, and luxury event venues.',
  },
};

export default function LocationPage({ params }: { params: { city: string } }) {
  const loc = LOCATIONS_DATA[params.city];
  if (!loc) return notFound();
  const seo = LOCATIONS_SEO[params.city.toLowerCase()];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 space-y-16 sm:space-y-24">
      {/* Header */}
      <section className="bg-slate-950 text-white relative overflow-hidden border-b border-slate-800 pt-12 sm:pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Regional Wholesale Hub &bull; {loc.name}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {seo?.h1 || `Wholesale Food Supply in ${loc.name}`}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {loc.description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/apply"
              className="px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <span>Open a Local Business Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Browse Regional Wholesale Catalog</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Logistics & SLA Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Order Cut-off: {loc.cutoff}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Late night portal ordering so kitchen managers can finalize orders after evening dinner service closes.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Delivery: {loc.deliveryWindow}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Guaranteed early morning drop before head chefs and prep brigades arrive for morning mise-en-place.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Regional Depot Fulfilment</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dispatched directly from <strong className="text-slate-900">{loc.depotName}</strong> ({loc.depotAddress}).
            </p>
          </div>
        </div>
      </section>

      {/* Postcode Coverage Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Active Next-Day Postcode Coverage in {loc.name}
            </h3>
            <p className="text-sm text-slate-600">
              Our temperature-controlled fleet runs regular morning routes across the following postal sectors daily:
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {loc.postcodes.map((pc, idx) => (
              <span key={idx} className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-800">
                {pc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PriceEstimator />
      </section>

      {/* Commercial Bottom CTA */}
      <CommercialBottomCTA />
    </div>
  );
}
