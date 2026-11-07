'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from '@/lib/animations/gsap-core';

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
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

  const testimonials = [
    {
      quote:
        'Rootwills has been an exceptional supply partner for our dining rooms. The hand-graded vitality of their produce and precision of the 05:30 AM drops are unmatched.',
      author: 'Marcus Vance',
      initials: 'MV',
      role: 'Executive Chef · Mayfair Bistro Collection',
      location: 'Mayfair, London',
    },
    {
      quote:
        'Proactive, deeply knowledgeable, and always ready to source specialist harvests for our seasonal menus. Having a dedicated depot account lead makes all the difference.',
      author: 'Eleanor Sterling',
      initials: 'ES',
      role: 'Culinary Director · The Midlands Grand',
      location: 'Birmingham',
    },
    {
      quote:
        'Their wholesale operations and locked seasonal terms provide the exact predictability our multi-site kitchens require. Zero missing crates across eighteen months.',
      author: 'Julian Thorne',
      initials: 'JT',
      role: 'Procurement Director · Albion Hospitality',
      location: 'Manchester',
    },
    {
      quote:
        'Dependable morning supply during peak service seasons has made Rootwills our primary culinary foundation across four independent restaurant kitchens.',
      author: 'Callum Fraser',
      initials: 'CF',
      role: 'Executive Head Chef · Caledonian Dining',
      location: 'Edinburgh',
    },
    {
      quote:
        'True integrity in British farm sourcing and produce that arrives at peak freshness before our prep brigade clocks in. A genuine partner in culinary craft.',
      author: 'Harriet Beaumont',
      initials: 'HB',
      role: 'Head of Culinary Ops · Clifton Estate',
      location: 'Bristol',
    },
    {
      quote:
        'From artisan West Country dairy to bespoke heritage vegetables, their cold-chain standards and logistics accuracy have transformed our morning pass.',
      author: 'Alistair Kensington',
      initials: 'AK',
      role: 'Chef Patron · Cotswold Manor House',
      location: 'Oxfordshire',
    },
  ];

  const cardsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  const visibleTestimonials = testimonials.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleMobileNext = () => {
    setMobileIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleMobilePrev = () => {
    setMobileIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div ref={sectionRef} id="testimonials" className="pt-8 sm:pt-24 lg:pt-28 pb-6 sm:pb-12 bg-[#FAF7F2] relative overflow-hidden">
      {/* Seamless Botanical Parchment Texture */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          {/* Clean Centered Editorial Hairline Kicker */}
          <div className="inline-flex items-center gap-3 mb-3 sm:mb-5">
            <span className="w-6 sm:w-8 h-[1px] bg-[#8B2635]/40" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8B2635] font-semibold">
              05 — Client Voices
            </span>
            <span className="w-6 sm:w-8 h-[1px] bg-[#8B2635]/40" />
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#2E060D] leading-[1.08] tracking-[-0.025em] mb-3 [text-wrap:balance]">
            Trusted by Britain&apos;s <span className="text-[#8B2635] italic font-normal">Leading Kitchens.</span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed max-w-lg mx-auto">
            Endorsed by executive chefs, culinary directors, and hospitality procurement leaders across the United Kingdom.
          </p>
        </div>

        {/* ─── MOBILE VIEW: Clean Architectural Editorial Quote Card ─── */}
        <div className="block md:hidden w-full max-w-md mx-auto">
          <div className="min-h-[168px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="rounded-xl bg-[#FFFDF9] border border-[#DCD2C0] p-4 sm:p-5 shadow-[0_8px_24px_rgba(46,6,13,0.05)] flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#8B2635] font-semibold">
                      {testimonials[mobileIndex].location}
                    </span>
                    <div className="flex items-center gap-0.5 text-[#BA8E4E]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-[#BA8E4E] text-[#BA8E4E]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-[13px] font-serif italic text-[#2E060D] leading-relaxed mb-3.5">
                    &ldquo;{testimonials[mobileIndex].quote}&rdquo;
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#E8DEC8] flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-xs font-serif font-bold text-[#2E060D] block truncate">
                      {testimonials[mobileIndex].author}
                    </span>
                    <span className="text-[10px] font-sans text-stone-500 block truncate">
                      {testimonials[mobileIndex].role}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400 shrink-0">
                    Verified Partner
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Arrows & Counter */}
          <div className="flex items-center justify-between mt-2.5 px-1 w-full">
            <span className="text-[10.5px] font-mono text-stone-500 tracking-wider tabular-nums">
              0{mobileIndex + 1} / 0{testimonials.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMobilePrev}
                className="w-8 h-8 rounded-full border border-[#DCD2C0] bg-[#FFFDF9] text-stone-700 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleMobileNext}
                className="w-8 h-8 rounded-full border border-[#DCD2C0] bg-[#FFFDF9] text-stone-700 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── DESKTOP VIEW: Architectural 3-Column Hairline Press Ledger ─── */}
        <div className="hidden md:flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-4 lg:gap-6 w-full">
            {/* Left Arrow Button */}
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-[#DCD2C0] bg-[#FFFDF9] hover:bg-[#2E060D] text-stone-700 hover:text-[#FAF7F2] hover:border-[#2E060D] flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Unified 3-Column Hairline Board */}
            <div className="w-full max-w-5xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-3 divide-x divide-[#DCD2C0] rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] shadow-[0_12px_36px_-12px_rgba(46,6,13,0.06)] overflow-hidden"
                >
                  {visibleTestimonials.map((item, index) => (
                    <div
                      key={`${currentPage}-${index}`}
                      className="p-6 lg:p-8 flex flex-col justify-between hover:bg-[#FAF7F2]/60 transition-colors duration-200"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8B2635] font-semibold">
                            {item.location}
                          </span>
                          <div className="flex items-center gap-0.5 text-[#BA8E4E]">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-[#BA8E4E] text-[#BA8E4E]" />
                            ))}
                          </div>
                        </div>

                        <p className="text-[14px] lg:text-[15px] font-serif italic text-[#2E060D] leading-[1.68] mb-6">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#E8DEC8] flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-xs sm:text-[13px] font-serif font-bold text-[#2E060D] block truncate">
                            {item.author}
                          </span>
                          <span className="text-[11px] font-sans text-stone-500 block truncate mt-0.5">
                            {item.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-[#DCD2C0] bg-[#FFFDF9] hover:bg-[#2E060D] text-stone-700 hover:text-[#FAF7F2] hover:border-[#2E060D] flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Pagination Pill Indicator */}
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPage(idx)}
                aria-label={`View testimonials page ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentPage === idx ? 'w-7 bg-[#2E060D]' : 'w-2 bg-[#BA8E4E]/35 hover:bg-[#BA8E4E]/70'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
