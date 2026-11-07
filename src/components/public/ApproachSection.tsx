'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck, Truck, Users, Leaf } from 'lucide-react';
import { gsap } from '@/lib/animations/gsap-core';

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 0.96, opacity: 0.85 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current.children,
          { y: 16, opacity: 0.85 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (pillarsRef.current) {
        gsap.fromTo(
          pillarsRef.current.children,
          { x: 16, opacity: 0.85 },
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
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
      title: 'Class 1 Quality Grading',
      subtitle: 'Inspected daily at 02:00 AM by senior produce specialists. Zero compromise on freshness.',
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
      title: 'Direct Culinary Partnerships',
      subtitle: 'Your dedicated account lead works with you through seasonal menu shifts and demand surges.',
      badge: 'Direct Desk',
    },
    {
      icon: Leaf,
      roman: 'IV',
      title: 'Sustainable British Sourcing',
      subtitle: 'Prioritising local British farms, Kentish orchards, and reduced food-mile distribution.',
      badge: 'Kent & Evesham',
    },
  ];

  return (
    <section ref={sectionRef} id="approach" className="py-9 sm:py-24 lg:py-32 bg-[#FAF7F2] relative overflow-hidden border-b border-[#E8DEC8]/70">
      {/* Seamless Botanical Parchment Texture */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 lg:gap-0 items-center">

          {/* Left Column: Clean Unobstructed Provenance Diptych */}
          <div className="order-3 lg:order-1 lg:col-span-4 relative flex flex-col items-center justify-center lg:pr-8">
            <div ref={imageRef} className="relative w-full sm:max-w-[360px]">
              {/* Clean Gallery Frame with Rootwills Seal */}
              <div className="group relative w-full h-[180px] sm:h-[280px] lg:h-[320px] rounded-xl sm:rounded-2xl overflow-hidden border border-[#DCD2C0] bg-[#2E060D] shadow-[0_16px_40px_-12px_rgba(46,6,13,0.12)]">
                <Image
                  src="/images/commercial/rootwills_spices.jpg"
                  alt="Rootwills Spices and Direct Sourcing"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#2E060D]/[0.06] mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180205]/65 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF7F2]/95 ring-1 ring-[#BA8E4E]/70 shadow-md overflow-hidden pointer-events-none">
                  <Image
                    src="/images/logo.png"
                    alt="Rootwills Seal"
                    fill
                    unoptimized
                    sizes="32px"
                    className="object-contain p-0.5 rounded-full"
                  />
                </div>
                <div className="absolute bottom-3 left-3.5 flex items-center gap-2 text-[#FAF7F2]">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#F3D08A]">
                    Direct Farm Lineage
                  </span>
                </div>
              </div>

              {/* Clean Architectural Telemetry Note */}
              <div className="absolute -bottom-3 right-3 sm:-bottom-4 sm:-right-3 bg-[#FFFDF9] border border-[#DCD2C0] rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 flex items-center gap-2.5 shadow-[0_12px_28px_rgba(46,6,13,0.09)] z-20">
                <div className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-lg overflow-hidden shrink-0 border border-[#E2D8C3]">
                  <Image
                    src="/images/commercial/van_dawn_delivery.jpg"
                    alt="Pre-dawn refrigerated delivery van"
                    fill
                    unoptimized
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-[#8B2635] font-semibold">
                    Cold-Chain Telemetry
                  </span>
                  <span className="block font-serif font-bold text-[11px] sm:text-xs text-[#2E060D] tabular-nums">
                    0.5°C – 3.8°C Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column: Approach Narrative */}
          <div ref={narrativeRef} className="order-1 lg:order-2 lg:col-span-4 flex flex-col justify-center px-0 lg:px-8 lg:border-l lg:border-[#DCD2C0]">
            {/* Clean Editorial Hairline Kicker */}
            <div className="flex items-center gap-3 mb-3 sm:mb-5">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8B2635] font-semibold">
                03
              </span>
              <span className="w-6 sm:w-8 h-[1px] bg-[#8B2635]/40" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-stone-500 font-medium">
                Operational Ethos
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#2E060D] leading-[1.08] tracking-[-0.022em] mb-3 sm:mb-5 [text-wrap:balance]">
              Built on Trust,<br />
              Quality &amp; <span className="text-[#8B2635] italic font-normal">Consistency.</span>
            </h2>

            <p className="text-xs sm:text-[14px] lg:text-[15px] text-stone-600 leading-[1.65] sm:leading-[1.7] font-sans mb-3 sm:mb-6 max-w-[48ch]">
              Long-term culinary partnerships rely on predictable supply, uncompromising grading, and clear communication. We source from audited British growers, inspect every crate at depot, and stand behind kitchen brigades at every service.
            </p>

            <div className="hidden sm:flex items-center gap-4 pt-4 border-t border-[#DCD2C0] text-[10.5px] font-mono uppercase tracking-[0.16em] text-stone-500">
              <span>Integrity</span>
              <span className="text-[#8B2635]">•</span>
              <span>Consistency</span>
              <span className="text-[#8B2635]">•</span>
              <span>Precision</span>
            </div>
          </div>

          {/* Right Column: Architectural Hairline Ledger (2x2 on Mobile, Divided Vertical Ledger on Desktop) */}
          <div ref={pillarsRef} className="order-2 lg:order-3 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2.5 lg:gap-0 lg:divide-y lg:divide-[#DCD2C0] lg:border-y lg:border-[#DCD2C0] lg:pl-8 lg:border-l">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.title} 
                  className="group rounded-xl lg:rounded-none bg-[#FFFDF9] lg:bg-transparent border border-[#DCD2C0] lg:border-0 p-3 sm:p-4 lg:py-4 lg:px-0 flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between w-full sm:w-auto">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2E060D]/[0.04] border border-[#DCD2C0] flex items-center justify-center text-[#8B2635] shrink-0 group-hover:bg-[#2E060D] group-hover:text-[#F3D08A] transition-colors">
                      <Icon className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>
                    <span className="sm:hidden font-mono text-[8px] uppercase tracking-wider text-[#8B2635] font-semibold tabular-nums">
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h3 className="text-xs sm:text-[14.5px] font-serif font-bold text-[#2E060D] group-hover:text-[#8B2635] transition-colors leading-tight">
                        {pillar.title}
                      </h3>
                      <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.14em] text-[#8B2635] font-semibold shrink-0 tabular-nums">
                        {pillar.badge}
                      </span>
                    </div>
                    <p className="hidden sm:block text-xs text-stone-600 font-sans leading-relaxed">
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
