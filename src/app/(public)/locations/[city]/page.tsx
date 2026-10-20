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
    description: 'Direct morning wholesale produce, meat, and dairy supply across Birmingham City Centre, Jewellery Quarter, Edgbaston, Solihull, and Sutton Coldfield.',
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
    county: 'East Midlands',
    depotName: 'Leicester Commercial Depot',
    depotAddress: 'Thurmaston Commercial Centre, Leicester, LE4 8JF',
    postcodes: ['LE1', 'LE2', 'LE3', 'LE4', 'LE5', 'LE11', 'DE1', 'NG1'],
    cutoff: '10:30 PM',
    deliveryWindow: '06:00 - 08:30 AM',
    description: 'Daily fresh produce and foodservice deliveries across Leicester, Loughborough, Derby, and Nottingham hospitality kitchens.',
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
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 pb-20 space-y-12 sm:space-y-16">
      {/* Header */}
      <section className="bg-[#2E060D] text-white relative overflow-hidden border-b border-[#BA8E4E]/25 pt-16 sm:pt-24 pb-16">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-25 mix-blend-overlay"
          style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#380710] via-[#2E060D] to-[#1E0307] pointer-events-none z-0" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BA8E4E]/15 border border-[#BA8E4E]/40 text-[#D4A86A] text-xs font-serif uppercase tracking-[0.2em] font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#D4A86A]" />
            <span>Regional Wholesale Hub &bull; {loc.name}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            {seo?.h1 || `Wholesale Food Supply in ${loc.name}`}
          </h1>

          <p className="text-xs sm:text-base text-[#EDE4D8]/85 max-w-2xl mx-auto font-sans leading-relaxed">
            {loc.description}
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
              <span>Check Delivery Postcodes</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Logistics & SLA Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-3 hover:border-[#BA8E4E] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#2E060D] text-[#D4A86A] flex items-center justify-center border border-[#BA8E4E]/30">
              <Clock className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2E060D]">Order Cut-off: {loc.cutoff}</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Late night portal ordering so kitchen managers can finalize orders after evening dinner service closes.
            </p>
          </div>

          <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-3 hover:border-[#BA8E4E] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#2E060D] text-[#D4A86A] flex items-center justify-center border border-[#BA8E4E]/30">
              <Truck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2E060D]">Delivery: {loc.deliveryWindow}</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Guaranteed early morning drop before head chefs and prep brigades arrive for morning mise-en-place.
            </p>
          </div>

          <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-3 hover:border-[#BA8E4E] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#2E060D] text-[#D4A86A] flex items-center justify-center border border-[#BA8E4E]/30">
              <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2E060D]">Regional Depot Fulfilment</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Dispatched directly from <strong className="text-[#2E060D] font-serif">{loc.depotName}</strong> ({loc.depotAddress}).
            </p>
          </div>
        </div>
      </section>

      {/* Postcode Coverage Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] p-8 sm:p-10 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-5">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2E060D]">
              Active Next-Day Postcode Coverage in {loc.name}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Our temperature-controlled fleet runs regular morning routes across the following postal sectors daily:
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {loc.postcodes.map((pc, idx) => (
              <span key={idx} className="px-4 py-2 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-xs font-serif font-bold text-[#2E060D]">
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
