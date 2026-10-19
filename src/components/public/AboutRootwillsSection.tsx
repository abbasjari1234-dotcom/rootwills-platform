'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap-core';

export function AboutRootwillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

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
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.2,
            ease: 'back.out(1.4)',
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

  return (
    <section ref={sectionRef} id="about" className="py-10 sm:py-16 lg:py-28 bg-[#FAF6EE] text-slate-900 relative overflow-hidden border-t border-b border-[#E8DEC8]">
      {/* ─── Classical Agrarian Harvest Landscape Watermark Texture ─── */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-45 mix-blend-multiply"
        style={{ 
          backgroundImage: `url('/images/textures/texture_about_harvest.jpg')`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Layout Matching Exact Mockup in media_1791673962373.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Narrative, Signature */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-4">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-[#BA8E4E] text-[10px] sm:text-[11px] font-serif tracking-[0.25em] uppercase font-semibold">
                — ABOUT ROOTWILLS —
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#16201B] leading-[1.15] mb-3 sm:mb-5">
              More Than Just<br />
              Food Supply
            </h2>

            <p className="text-xs sm:text-[13px] lg:text-sm text-stone-700 leading-relaxed font-sans mb-4 sm:mb-6 max-w-lg">
              Rootwills is a UK-based food services and wholesale supplier, dedicated to providing high-quality products and reliable service to the food industry. We work closely with restaurants, caterers, hospitality businesses and food professionals to ensure they get the best ingredients, consistently and on time.
            </p>

            {/* Script Signature */}
            <div className="pt-0.5 sm:pt-1">
              <span className="font-script text-xl sm:text-3xl text-[#BA8E4E] tracking-wide block">
                Quality. Consistency. Partnership.
              </span>
            </div>
          </div>

          {/* Center Column: Fresh Produce in Wooden Crate + Overlapping Quote Card */}
          <div className="lg:col-span-4 relative flex justify-center py-2 sm:py-4">
            {/* Produce Photo in Clean Wooden Frame */}
            <div ref={imageRef} className="group relative w-full max-w-[260px] sm:max-w-[310px] h-[230px] sm:h-[350px] lg:h-[410px] rounded-lg overflow-hidden shadow-lg border border-[#DDD3BC] bg-[#EFE8D8]">
              <Image
                src="/images/commercial/rootwills_portrait_produce.jpg"
                alt="Rootwills Fresh Market Produce in Crates"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Overlapping Ivory Double-Bezel Quote Card */}
            <div 
              ref={quoteRef} 
              className="absolute -bottom-2 sm:-bottom-3 right-1 sm:-right-4 p-1 rounded-lg bg-stone-200/60 ring-1 ring-[#BA8E4E]/35 shadow-2xl max-w-[170px] sm:max-w-[225px] z-20 backdrop-blur-xs"
            >
              <div className="bg-[#FFFDF9] rounded-[calc(0.5rem-0.125rem)] p-4 sm:p-5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.95)]">
                <span className="block text-2xl font-serif text-[#D4A86A] leading-none mb-1 select-none font-bold">
                  “
                </span>
                <p className="text-xs sm:text-[13px] font-serif italic text-stone-800 leading-snug">
                  Good food builds great businesses.
                </p>
                <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-stone-200/80">
                  <span className="text-[9px] font-sans tracking-[0.15em] uppercase text-[#BA8E4E] font-semibold">
                    Principle I
                  </span>
                  <div className="w-4 h-[1.5px] bg-[#BA8E4E]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Greek Engraving Illustration + Rootwills Philosophy with Subtle Vertical Divider */}
          <div className="lg:col-span-3 pl-0 lg:pl-6 lg:border-l lg:border-[#E2D8C3]/80">
            <div className="flex flex-col space-y-4">
              
              {/* Classical Greek Line Engraving Card with Concentric Hairline */}
              <div className="w-full rounded-lg p-1 bg-stone-200/40 ring-1 ring-[#BA8E4E]/25 shadow-xs">
                <div className="w-full h-20 sm:h-28 lg:h-32 rounded-[calc(0.5rem-0.125rem)] overflow-hidden bg-[#FAF6EC] p-2 flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]">
                  <Image
                    src="/images/commercial/rootwills_harvest_figures_clean.png"
                    alt="Classical Greek Harvest Engraving"
                    width={260}
                    height={100}
                    unoptimized
                    className="w-full h-full object-contain filter contrast-105"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#BA8E4E] font-semibold">
                    EST. LONDON
                  </span>
                </div>
                <h3 className="text-base font-serif font-bold text-[#16201B] mb-2">
                  Rootwills Heritage
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans mb-3">
                  Rootwills was built on a simple belief — that great food deserves great supply partners. Today, we continue to support businesses across the UK with trusted products, flexible solutions and a commitment to long-term growth.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-sans tracking-[0.15em] text-[#BA8E4E] uppercase font-semibold">
                  <span>Direct Farm Supply</span>
                  <span>·</span>
                  <span>Zero Compromise</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
