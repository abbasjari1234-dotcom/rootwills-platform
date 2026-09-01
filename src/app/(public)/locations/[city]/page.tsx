import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Truck, Clock, ShieldCheck, ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import { PriceEstimator } from '@/components/public/PriceEstimator';

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
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header */}
      <section className="pt-12 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Regional Wholesale Hub &bull; {loc.name}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream">
            {seo?.h1 || `Wholesale Food Supply in ${loc.name}`}
          </h1>
          <p className="text-sm sm:text-base text-cream/70 mt-4 leading-relaxed">
            {loc.description}
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/onboarding"
              className="px-7 py-3.5 rounded-xl bg-champagne text-obsidian-950 font-bold shadow-gold-glow hover:brightness-110 text-sm flex items-center gap-2"
            >
              <span>Open a Local Business Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Logistics & SLA Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-champagne/10 text-champagne flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-cream">Order Cut-off: {loc.cutoff}</h3>
            <p className="text-xs text-cream/60">
              Late night portal ordering so kitchen managers can finalize orders after dinner service closes.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-cream">Delivery: {loc.deliveryWindow}</h3>
            <p className="text-xs text-cream/60">
              Guaranteed morning delivery before your chefs arrive for mise-en-place prep.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-champagne/10 text-champagne flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-cream">Regional Depot Fulfilment</h3>
            <p className="text-xs text-cream/60">
              Dispatched directly from <strong>{loc.depotName}</strong> ({loc.depotAddress}).
            </p>
          </div>
        </div>
      </section>

      {/* Postcode Coverage Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 rounded-2xl space-y-6">
          <h3 className="font-display text-xl font-bold text-cream">
            Active Next-Day Postcode Coverage in {loc.name}
          </h3>
          <p className="text-xs text-cream/60">
            Our temperature-controlled fleet runs regular morning routes across the following postal sectors daily:
          </p>

          <div className="flex flex-wrap gap-2.5">
            {loc.postcodes.map((pc, idx) => (
              <span key={idx} className="px-3.5 py-1.5 rounded-lg bg-obsidian-900 border border-cream/15 text-xs font-mono text-champagne">
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
    </div>
  );
}
