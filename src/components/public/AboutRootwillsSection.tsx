'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '@/lib/animations/gsap-core';

export function AboutRootwillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
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

      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { y: 18, opacity: 0.85, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current.children,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-9 sm:py-24 lg:py-32 bg-[#FAF7F2] relative overflow-hidden border-b border-[#E8DEC8]/70">
      {/* Seamless Botanical Parchment Texture */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Kicker, Narrative & Heritage Link */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-4">
            {/* Clean Editorial Hairline Kicker */}
            <div className="flex items-center gap-3 mb-3 sm:mb-5">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8B2635] font-semibold">
                01
              </span>
              <span className="w-6 sm:w-8 h-[1px] bg-[#8B2635]/40" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-stone-500 font-medium">
                Wholesale Heritage
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-serif font-bold text-[#2E060D] leading-[1.08] tracking-[-0.025em] mb-3 sm:mb-5 [text-wrap:balance]">
              More Than Just{' '}
              <br className="hidden sm:inline" />
              <span className="text-[#8B2635] italic font-normal">Food Supply.</span>
            </h2>

            <p className="text-xs sm:text-[14px] lg:text-[15.5px] text-stone-700 leading-[1.65] sm:leading-[1.72] font-sans mb-4 sm:mb-7 max-w-[52ch]">
              Rootwills connects generational British growers, artisan dairies, and coastal fisheries directly with leading professional kitchens—delivering peak-vitality ingredients pre-dawn, every morning.
            </p>

            {/* Editorial Signature & Clean CTA Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 sm:pt-5 border-t border-[#DCD2C0]">
              <span className="font-serif italic text-sm sm:text-base text-stone-600">
                Quality. Consistency. Partnership.
              </span>

              <Link
                href="/about"
                className="group inline-flex items-center gap-2 pl-4 pr-1.5 py-1 sm:py-1.5 rounded-full bg-[#2E060D] hover:bg-[#131313] text-[#FAF7F2] text-[11px] sm:text-xs font-sans font-medium tracking-wide transition-all duration-200 active:scale-[0.97]"
              >
                <span>Our Story</span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/12 group-hover:bg-[#F3D08A] text-[#FAF7F2] group-hover:text-[#131313] flex items-center justify-center transition-all duration-200">
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* Center Column: Clean Unobstructed Gallery Portrait + Crisp Editorial Caption */}
          <div className="lg:col-span-4 relative flex justify-center">
            <div 
              ref={imageRef} 
              className="group relative w-full sm:max-w-[340px] rounded-xl sm:rounded-2xl overflow-hidden border border-[#DCD2C0] bg-[#2E060D] shadow-[0_16px_40px_-12px_rgba(46,6,13,0.12)]"
            >
              <div className="relative w-full h-[210px] sm:h-[380px] lg:h-[430px] overflow-hidden">
                <Image
                  src="/images/commercial/rootwills_portrait_produce.jpg"
                  alt="Rootwills Fresh Market Produce in Crates"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Unified Rootwills Warm Editorial Tone */}
                <div className="absolute inset-0 bg-[#2E060D]/[0.06] mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#180205]/70 to-transparent pointer-events-none" />
                
                {/* Authentic Rootwills Master Seal Stamp */}
                <div className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAF7F2]/95 ring-1 ring-[#BA8E4E]/70 shadow-md overflow-hidden pointer-events-none">
                  <Image
                    src="/images/logo.png"
                    alt="Rootwills Seal"
                    fill
                    unoptimized
                    sizes="36px"
                    className="object-contain p-0.5 rounded-full"
                  />
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[#FAF7F2]">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#F3D08A]">
                    02:00 AM Market Walk
                  </span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/85">
                    Class 1 Hand-Graded
                  </span>
                </div>
              </div>
            </div>

            {/* Clean Architectural Pull-Quote Note (Desktop/Tablet) */}
            <div 
              ref={quoteRef} 
              className="hidden sm:block absolute -bottom-4 -right-3 bg-[#FFFDF9] border border-[#DCD2C0] rounded-xl p-4 shadow-[0_12px_30px_rgba(46,6,13,0.08)] max-w-[210px] z-20"
            >
              <p className="text-[13px] font-serif italic text-[#2E060D] leading-snug">
                &ldquo;Good food builds great businesses.&rdquo;
              </p>
              <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B2635] mt-2">
                Founding Principle
              </span>
            </div>
          </div>

          {/* Right Column: Classical Engraving + Architectural Ledger */}
          <div ref={rightColRef} className="lg:col-span-3 pl-0 lg:pl-7 lg:border-l lg:border-[#DCD2C0] flex flex-col justify-between space-y-4 sm:space-y-6">
            
            {/* Classical Line Engraving (Clean Editorial Plate — No Heavy Box) */}
            <div className="hidden sm:flex w-full h-24 lg:h-28 rounded-xl bg-[#F5EFE4]/70 border border-[#E2D8C3] p-3 items-center justify-center">
              <Image
                src="/images/commercial/rootwills_harvest_figures_clean.png"
                alt="Classical Harvest Engraving"
                width={260}
                height={100}
                unoptimized
                className="w-full h-full object-contain contrast-105 opacity-90"
              />
            </div>

            <div>
              <div className="hidden sm:block">
                <span className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#8B2635] font-semibold mb-1.5">
                  EST. LONDON &amp; MIDLANDS
                </span>
                <h3 className="text-lg font-serif font-bold text-[#2E060D] mb-2 leading-tight">
                  The Rootwills Pedigree
                </h3>
                <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-sans mb-5">
                  Built on a simple conviction—that Britain&apos;s finest kitchens deserve a dependable, transparent supply partner with direct farm lineage and tailored delivery windows.
                </p>
              </div>

              {/* Architectural Hairline Ledger (Replaces Nested Rounded Cards) */}
              <div className="grid grid-cols-2 divide-x divide-[#DCD2C0] border-y border-[#DCD2C0] py-3 sm:py-3.5">
                <div className="pr-3">
                  <span className="block font-serif font-bold text-lg sm:text-xl text-[#2E060D] tabular-nums leading-none">
                    100%
                  </span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-stone-500 mt-1">
                    Batch Traceable
                  </span>
                </div>
                <div className="pl-3.5">
                  <span className="block font-serif font-bold text-lg sm:text-xl text-[#2E060D] tabular-nums leading-none">
                    6 Days
                  </span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-stone-500 mt-1">
                    Pre-Dawn Fleet
                  </span>
                </div>
              </div>

              {/* Minimalist Provenance Text Line */}
              <div className="hidden sm:flex items-center justify-between pt-3 text-[10px] font-mono uppercase tracking-[0.14em] text-stone-500">
                <span>Direct Farm Lineage</span>
                <span className="text-[#BA8E4E]">•</span>
                <span>SALSA &amp; BRCGS</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
