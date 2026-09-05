'use client';

import React from 'react';
import Image from 'next/image';
import { Leaf, ThermometerSnowflake, Award, MapPin } from 'lucide-react';

const provenanceData = [
  {
    icon: Leaf,
    metric: '14.8°',
    unit: 'Brix',
    label: 'Sugar Density',
    detail: 'Measured at harvest gate',
  },
  {
    icon: MapPin,
    metric: 'Kent',
    unit: 'Orchards',
    label: 'Single Estate',
    detail: 'Direct grower partnerships',
  },
  {
    icon: Award,
    metric: 'Class 1',
    unit: 'Grade',
    label: 'Quality Standard',
    detail: 'Zero compromise specifications',
  },
  {
    icon: ThermometerSnowflake,
    metric: '2–4°C',
    unit: 'Chain',
    label: 'Cold-Chain Integrity',
    detail: 'Field to kitchen unbroken',
  },
];

export function ActHarvestProvenance() {
  return (
    <section
      className="act-harvest relative w-full overflow-hidden py-24 sm:py-32 lg:py-40"
      style={{ perspective: '800px' }}
    >
      {/* Background image — subtle orchard overlay */}
      <div className="act-harvest-bg absolute inset-0 will-change-transform">
        <Image
          src="/images/branded/rootwills_orchard_harvest.jpg"
          alt="Rootwills partner orchard harvest"
          fill
          className="object-cover opacity-15 scale-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#021710] via-[#021710]/85 to-[#021710]" />
      </div>

      {/* Content container */}
      <div className="act-harvest-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="act-harvest-header text-center mb-16 sm:mb-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-400/70 mb-3 font-semibold">
            Provenance &amp; Quality
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-cream uppercase leading-[0.9]">
            From Field to
            <br />
            <span className="gold-gradient-text">Professional Kitchen</span>
          </h2>
          <p className="mt-5 text-cream/55 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Every item traced from source. Every specification verified at receiving.
            Full provenance transparency on every delivery.
          </p>
        </div>

        {/* Provenance data cards — positioned for 3D reveal */}
        <div className="act-harvest-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {provenanceData.map((item, i) => (
            <div
              key={item.label}
              className={`act-harvest-card-${i} glass-panel rounded-2xl p-6 sm:p-7 will-change-transform hover:border-champagne/30 transition-colors duration-500 group`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center mb-4 group-hover:border-champagne/30 transition-colors">
                <item.icon className="w-4 h-4 text-emerald-400 group-hover:text-champagne transition-colors duration-500" />
              </div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-3xl sm:text-4xl font-display font-black text-cream tracking-tight">
                  {item.metric}
                </span>
                <span className="text-sm font-sans font-medium text-champagne/70">
                  {item.unit}
                </span>
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400/60 mb-2 font-semibold">
                {item.label}
              </div>
              <p className="text-cream/45 text-xs font-sans leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Featured product hero image */}
        <div
          className="act-harvest-featured mt-16 sm:mt-24 relative mx-auto max-w-3xl"
          style={{ perspective: '600px' }}
        >
          <div className="act-harvest-featured-img relative rounded-2xl overflow-hidden aspect-[16/9] shadow-royal-depth will-change-transform border border-emerald-400/30">
            <Image
              src="/images/branded/rootwills_apples_card.jpg"
              alt="Premium Rootwills Pink Lady apples"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021710]/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-champagne/70 mb-1">
                  Featured Produce
                </div>
                <div className="font-display text-lg sm:text-xl font-bold text-cream">
                  Pink Lady Apples — Kent Orchards
                </div>
              </div>
              <div className="hidden sm:block glass-panel rounded-lg px-3 py-1.5">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider font-bold">
                  In Season
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
