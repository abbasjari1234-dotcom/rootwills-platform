'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck, Truck, Users, Leaf } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap-core';

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 0.94, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (pillarsRef.current) {
        gsap.fromTo(
          pillarsRef.current.children,
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Quality Products',
      subtitle: 'Only the best, always.',
    },
    {
      icon: Truck,
      title: 'Reliable Delivery',
      subtitle: 'On time, every time.',
    },
    {
      icon: Users,
      title: 'Long-Term Relationships',
      subtitle: 'Your success is our success.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Choices',
      subtitle: 'Better for business, better for tomorrow.',
    },
  ];

  return (
    <section ref={sectionRef} id="approach" className="py-10 sm:py-16 lg:py-28 bg-[#FAF6EE] text-slate-900 relative overflow-hidden border-b border-[#E8DEC8]">
      {/* ─── Antique Culinary Botanical Herbs Watermark Texture ─── */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-45 mix-blend-multiply"
        style={{ 
          backgroundImage: `url('/images/textures/texture_approach_botanical.jpg')`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-0 items-center">

          {/* Left Column: Stone Bowls of Spices Photo with Double-Bezel Architecture */}
          <div className="lg:col-span-4 relative flex justify-center lg:pr-8 py-2">
            <div ref={imageRef} className="group p-1.5 sm:p-2.5 rounded-2xl bg-stone-200/50 ring-1 ring-[#BA8E4E]/30 shadow-lg relative">
              <div className="relative w-[270px] sm:w-[340px] h-[180px] sm:h-[220px] lg:h-[255px] rounded-[calc(1rem-0.125rem)] overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]">
                <Image
                  src="/images/commercial/rootwills_spices.jpg"
                  alt="Rootwills Spices and Sourcing"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Provenance Badge */}
              <div className="absolute -bottom-2.5 sm:-bottom-3 left-4 sm:left-6 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/40 shadow-md text-[8px] sm:text-[9px] font-sans tracking-[0.18em] uppercase text-[#2E060D] font-semibold flex items-center gap-1">
                <span className="text-[#BA8E4E]">✦</span> Direct Farm Provenance
              </div>
            </div>
          </div>

          {/* Middle Column: Approach Narrative */}
          <div className="lg:col-span-4 flex flex-col justify-center px-0 lg:px-8 lg:border-l lg:border-stone-200/80">
            <div className="flex items-center gap-2 mb-2 sm:mb-3.5">
              <span className="text-[#BA8E4E] text-[10px] sm:text-xs font-serif tracking-[0.25em] uppercase font-semibold">
                — OUR APPROACH —
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[38px] font-serif font-bold text-[#2E060D] leading-[1.18] mb-3 sm:mb-5">
              Built on Trust,<br />
              Quality & Consistency
            </h2>

            <p className="text-xs sm:text-[13px] lg:text-sm text-stone-600 leading-relaxed font-sans mb-3 sm:mb-4">
              We believe that long-term success comes from reliable supply, uncompromising quality and strong partnerships. Our approach is simple — we source the best, maintain the highest standards and support our clients at every step.
            </p>

            <div className="flex items-center gap-2 pt-2 border-t border-stone-200/80 text-[9px] sm:text-[10px] font-sans tracking-[0.15em] text-[#BA8E4E] uppercase font-semibold">
              <span>Integrity</span>
              <span>·</span>
              <span>Consistency</span>
              <span>·</span>
              <span>Precision</span>
            </div>
          </div>

          {/* Right Column: 4 Clean Feature Items with Micro-Bezel Medallions */}
          <div ref={pillarsRef} className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-2.5 pt-2 lg:pt-0 lg:pl-8 lg:border-l lg:border-stone-200/80">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const romanNumerals = ['I', 'II', 'III', 'IV'];
              return (
                <div 
                  key={pillar.title} 
                  className="group flex items-start gap-3 p-2 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#FAF7F0] ring-1 ring-transparent hover:ring-[#BA8E4E]/25 shadow-2xs"
                >
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/30 flex items-center justify-center text-[#BA8E4E] shrink-0 shadow-2xs transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:ring-[#BA8E4E]/60">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.5]" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#2E060D] text-[#FAF7F0] text-[7px] font-serif font-bold flex items-center justify-center">
                      {romanNumerals[idx]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-serif font-bold text-stone-800 leading-snug group-hover:text-[#2E060D] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-500 font-sans mt-0.5">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
