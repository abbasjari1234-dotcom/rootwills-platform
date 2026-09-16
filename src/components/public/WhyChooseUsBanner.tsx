'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Leaf, 
  UserCheck, 
  BadgePercent, 
  ShoppingBag, 
  Truck, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const VALUE_PROPS = [
  {
    icon: Leaf,
    title: 'Farm-Direct Harvests',
    desc: 'Grade-A seasonal produce picked & delivered within 24 hours.',
  },
  {
    icon: UserCheck,
    title: 'Dedicated Account Manager',
    desc: 'Direct depot desk, custom specs & tailored 30-day trade credit.',
  },
  {
    icon: BadgePercent,
    title: 'Volume Contract Rates',
    desc: 'Locked commercial pricing with zero hidden distributor markups.',
  },
  {
    icon: ShoppingBag,
    title: 'Digital Ordering Portal',
    desc: '24/7 web & app ordering with recurring kitchen stock sheets.',
  },
  {
    icon: Truck,
    title: 'Guaranteed 06:00 AM Drops',
    desc: 'Dual-temp refrigerated fleet arriving before morning kitchen prep.',
  },
  {
    icon: ShieldCheck,
    title: 'Certified Food Standards',
    desc: 'Full Red Tractor, Lion Quality & SALSA farm-to-fork traceability.',
  },
];

export function WhyChooseUsBanner() {
  return (
    <section className="relative py-16 lg:py-24 bg-slate-950 overflow-hidden">
      {/* Cinematic Dark Culinary Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/commercial/16_why_choose_us_background.jpg"
          alt="Why Choose Rootwills Commercial Foodservice"
          fill
          quality={95}
          sizes="100vw"
          className="object-cover object-center brightness-90"
        />
        {/* Layered cinematic overlays for contrast & legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/75" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950/90 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Callout */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-emerald-400">
                The Rootwills Advantage
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.12]">
              More Than a Supplier. <br className="hidden sm:inline" />
              <span className="text-emerald-400">Your Kitchen’s Growth Partner.</span>
            </h2>

            <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed max-w-lg">
              We empower commercial kitchens, hospitality groups, and schools across the UK with farm-direct fresh produce, butchery, and chilled dairy backed by contract rates and reliable pre-dawn delivery.
            </p>

            <div className="pt-2">
              <Link
                href="/why-choose-us"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-sm shadow-lg shadow-emerald-950/60 hover:shadow-emerald-600/30 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Explore Partnership Benefits</span>
                <ArrowRight className="w-4 h-4 text-emerald-100" />
              </Link>
            </div>
          </div>

          {/* Right Column: 6 Value Proposition Cards (2 cols x 3 rows) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4.5">
              {VALUE_PROPS.map((prop, idx) => {
                const Icon = prop.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-emerald-500/30 backdrop-blur-md transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-200 mt-0.5">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-sm sm:text-base text-white tracking-tight leading-snug">
                        {prop.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-[13px] text-slate-300 mt-1 leading-relaxed">
                        {prop.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

