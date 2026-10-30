'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck, Truck, Users, Leaf, Sparkles } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap-core';
import { DoodleFlourish } from './DoodleFlourish';

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
      roman: 'I',
      title: 'Class 1 Quality Products',
      subtitle: 'Inspected daily at dawn by experienced produce specialists. Zero compromise on freshness.',
      badge: 'SALSA Assured',
    },
    {
      icon: Truck,
      roman: 'II',
      title: 'Pre-Dawn Reliable Delivery',
      subtitle: 'On time, every time before morning kitchen prep begins across London and the Midlands.',
      badge: '05:30 AM Drops',
    },
    {
      icon: Users,
      roman: 'III',
      title: 'Direct Trade Relationships',
      subtitle: 'Your dedicated account lead works with you through seasonal shifts and demand surges.',
      badge: 'Direct Dial',
    },
    {
      icon: Leaf,
      roman: 'IV',
      title: 'Sustainable British Sourcing',
      subtitle: 'Prioritising local British farms, Kentish growers, and reduced food-mile distribution.',
      badge: 'Kent & Evesham',
    },
  ];

  return (
    <section ref={sectionRef} id="approach" className="py-12 sm:py-20 lg:py-28 relative overflow-hidden border-b border-[#E8DEC8]/60">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-0 items-center">

          {/* Left Column: Stone Bowls of Spices Photo with Double-Bezel Architecture */}
          <div className="lg:col-span-4 relative flex flex-col items-center justify-center lg:pr-8 py-2">
            <div ref={imageRef} className="group p-2 sm:p-2.5 rounded-2xl bg-[#FFFDF9]/90 ring-1 ring-[#BA8E4E]/30 shadow-lg relative max-w-full">
              {/* Specular Top Rim */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

              <div className="relative w-[280px] sm:w-[340px] h-[190px] sm:h-[230px] lg:h-[265px] rounded-[calc(1rem-0.125rem)] overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]">
                <Image
                  src="/images/commercial/rootwills_spices.jpg"
                  alt="Rootwills Spices and Direct Sourcing"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Provenance Badge with Leaf Micro-Medallion */}
              <div className="absolute -bottom-3 left-4 sm:left-6 px-3 py-1 rounded-full bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/40 shadow-md text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-[#2E060D] font-semibold flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#BA8E4E]/15 flex items-center justify-center">
                  <Leaf className="w-2.5 h-2.5 text-[#BA8E4E]" strokeWidth={2.2} />
                </div>
                <span>Direct Farm Lineage</span>
              </div>
            </div>

            {/* Subtle Handwritten Note below the photo with Doodle Arrow */}
            <div className="mt-5 hidden sm:flex items-center gap-2 text-stone-500 font-script text-sm sm:text-base">
              <span>Traceable batch sourcing direct from verified British growers</span>
            </div>
          </div>

          {/* Middle Column: Approach Narrative */}
          <div className="lg:col-span-4 flex flex-col justify-center px-0 lg:px-8 lg:border-l lg:border-stone-200/80">
            {/* Monospace Eyebrow Capsule */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 mb-3 sm:mb-4 shadow-2xs w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#2E060D] font-semibold">
                03 // OPERATIONAL ETHOS
              </span>
            </div>

            <div className="relative">
              <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-serif font-bold text-[#2E060D] leading-[1.12] tracking-[-0.022em] mb-1 sm:mb-1.5">
                Built on Trust,<br />
                Quality &amp; Consistency
              </h2>
              {/* Hand-drawn underline swoop */}
              <DoodleFlourish 
                variant="underline-wave" 
                color="#BA8E4E" 
                strokeWidth={3} 
                className="w-52 sm:w-64 -mt-1 mb-3 text-[#BA8E4E]" 
                delay={200}
              />
            </div>

            <p className="text-xs sm:text-[13px] lg:text-sm text-stone-600 leading-relaxed font-sans mb-4 sm:mb-5">
              We believe that long-term foodservice partnerships rely on predictable supply, uncompromising grading, and transparent communications. We source from accredited partners, inspect every crate at depot, and support kitchen operations at every step.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-stone-200/80 text-[10px] font-sans text-stone-700">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF7F0] border border-[#BA8E4E]/30 tracking-wider uppercase font-semibold text-[#8B2635] apple-tactile active:scale-95 transition-transform duration-100 ease-out">
                <Sparkles className="w-2.5 h-2.5 text-[#BA8E4E]" />
                Integrity
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF7F0] border border-[#BA8E4E]/30 tracking-wider uppercase font-semibold text-[#8B2635] apple-tactile active:scale-95 transition-transform duration-100 ease-out">
                <Sparkles className="w-2.5 h-2.5 text-[#BA8E4E]" />
                Consistency
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF7F0] border border-[#BA8E4E]/30 tracking-wider uppercase font-semibold text-[#8B2635] apple-tactile active:scale-95 transition-transform duration-100 ease-out">
                <Sparkles className="w-2.5 h-2.5 text-[#BA8E4E]" />
                Precision
              </span>
            </div>
          </div>

          {/* Right Column: 4 Refined Feature Cards with Tactile Glass and Specular Highlights */}
          <div ref={pillarsRef} className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3 pt-2 lg:pt-0 lg:pl-8 lg:border-l lg:border-stone-200/80">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.title} 
                  className="group relative flex items-start gap-3 p-3 rounded-2xl bg-[#FFFDF9]/80 hover:bg-white border border-[#E8DEC8] hover:border-[#BA8E4E]/60 shadow-[0_2px_8px_rgba(46,6,13,0.03)] hover:shadow-[0_8px_24px_rgba(46,6,13,0.06)] transition-all duration-200 ease-out apple-tactile active:scale-[0.985] cursor-default"
                >
                  {/* Top Specular Line */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

                  <div className="relative p-0.5 rounded-full bg-gradient-to-br from-[#BA8E4E]/35 via-white to-[#BA8E4E]/10 shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFFDF9] ring-1 ring-[#BA8E4E]/35 flex items-center justify-center text-[#BA8E4E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.7]" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#2E060D] text-[#FAF7F0] text-[8px] font-mono font-bold flex items-center justify-center border border-[#BA8E4E]/40 shadow-xs">
                      {pillar.roman}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h3 className="text-xs sm:text-sm font-serif font-bold text-stone-900 leading-snug group-hover:text-[#2E060D] transition-colors">
                        {pillar.title}
                      </h3>
                      <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#BA8E4E] font-semibold shrink-0">
                        {pillar.badge}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-stone-500 font-sans leading-relaxed">
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
