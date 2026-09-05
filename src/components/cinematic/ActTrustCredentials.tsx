'use client';

import React from 'react';
import { ShieldCheck, Award, Leaf, Scale, FileText, CheckCircle2 } from 'lucide-react';

const credentials = [
  {
    icon: ShieldCheck,
    title: 'BRCGS',
    grade: 'Grade AA',
    description: 'Global food safety standard — highest achievable grade',
  },
  {
    icon: Award,
    title: 'SALSA',
    grade: 'Certified',
    description: 'Safe and Local Supplier Approval for the UK market',
  },
  {
    icon: Leaf,
    title: 'Red Tractor',
    grade: 'Assured',
    description: 'British farm assurance: safety, welfare, and environment',
  },
  {
    icon: Scale,
    title: 'HACCP',
    grade: 'Compliant',
    description: 'Hazard Analysis Critical Control Points — full compliance',
  },
  {
    icon: FileText,
    title: "Natasha\u2019s Law",
    grade: 'Compliant',
    description: 'Full allergen labelling on all prepacked items for direct sale',
  },
  {
    icon: CheckCircle2,
    title: 'ISO 22000',
    grade: 'Certified',
    description: 'International food safety management system standard',
  },
];

export function ActTrustCredentials() {
  return (
    <section className="act-trust relative w-full overflow-hidden py-24 sm:py-32 lg:py-40 flex items-center">
      {/* Background gradient — clean, restrained */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#021710] via-emerald-950/25 to-[#021710]" />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-champagne/25" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-champagne/25" />

      {/* Section fade-in */}
      <div className="section-fade-in" />

      <div className="act-trust-content relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="act-trust-header text-center mb-14 sm:mb-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-champagne/50 mb-3 font-semibold">
            Compliance &amp; Accreditation
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-cream uppercase leading-[0.9]">
            Trusted by
            <br />
            <span className="gold-gradient-text">Professional Kitchens</span>
          </h2>
          <p className="mt-5 text-cream/45 text-sm sm:text-base max-w-lg mx-auto font-sans leading-relaxed">
            Every certification verified. Every standard exceeded. Zero compromises
            on food safety or traceability.
          </p>
        </div>

        {/* Credential badges grid */}
        <div className="act-trust-badges grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {credentials.map((cred, i) => (
            <div
              key={cred.title}
              className={`act-trust-badge-${i} glass-panel-gold rounded-2xl p-6 sm:p-7 will-change-transform text-center group hover:shadow-[0_0_40px_rgba(228,199,103,0.2)] transition-shadow duration-500`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Icon container */}
              <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-champagne/10 to-emerald-500/5 border border-champagne/20 flex items-center justify-center mb-4 group-hover:border-champagne/50 group-hover:shadow-[0_0_15px_rgba(228,199,103,0.15)] transition-all duration-500">
                <cred.icon className="w-5 h-5 text-champagne" />
              </div>

              {/* Title and grade */}
              <div className="text-base font-display font-black text-cream uppercase tracking-wide">
                {cred.title}
              </div>
              <div className="text-xs font-mono text-champagne/80 uppercase tracking-[0.2em] mt-1 font-semibold">
                {cred.grade}
              </div>

              {/* Description */}
              <p className="mt-3 text-[11px] text-cream/45 font-sans leading-relaxed">
                {cred.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
