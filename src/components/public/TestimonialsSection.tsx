'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoodleFlourish } from './DoodleFlourish';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'Rootwills has been an exceptional supply partner for our dining rooms. The quality of their produce and precision of the 05:30 AM drops are unmatched.',
      author: 'Head Chef',
      role: 'Michelin-Caliber Bistro',
      location: 'Mayfair, London',
    },
    {
      quote:
        'Professional, proactive, and always willing to source rare ingredients for our seasonal menus. The dedicated depot account lead makes all the difference.',
      author: 'Executive Chef',
      role: 'Boutique Hotel Group',
      location: 'Birmingham',
    },
    {
      quote:
        'Their wholesale operations and locked contract pricing provide the predictability our multi-site venues require. Zero missing crates across six months.',
      author: 'Procurement Director',
      role: 'Hospitality Group',
      location: 'Manchester',
    },
    {
      quote:
        'Reliable supply during peak seasonal demands has made Rootwills our primary wholesale foundation across four independent kitchens.',
      author: 'Culinary Director',
      role: 'Independent Restaurant Co.',
      location: 'Edinburgh',
    },
    {
      quote:
        'Integrity in sourcing and produce that arrives at peak vitality every morning. A true partner in culinary excellence.',
      author: 'Head of Culinary Procurement',
      role: 'Fine Dining Estate',
      location: 'Bristol',
    },
    {
      quote:
        'From dry stores to bespoke fresh produce deliveries, their standards and logistics accuracy have streamlined our kitchen operations.',
      author: 'Executive Head Chef',
      role: 'Country House Hotel',
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
    <div id="testimonials" className="pt-12 sm:pt-20 lg:pt-28 pb-6 sm:pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-14">
          {/* Monospace Eyebrow Capsule */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 mb-3 sm:mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#2E060D] font-semibold">
              05 // CLIENT TESTIMONIALS
            </span>
          </div>

          <div className="relative inline-block">
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-serif font-bold text-[#2E060D] leading-[1.14] mb-1">
              Trusted by Leading<br className="sm:hidden" /> Food Businesses
            </h2>
            <div className="flex justify-center">
              <DoodleFlourish 
                variant="underline-loop" 
                color="#BA8E4E" 
                strokeWidth={3} 
                className="w-44 sm:w-56 -mt-1 mb-2 text-[#BA8E4E]" 
                delay={200}
              />
            </div>
          </div>
        </div>

        {/* ─── MOBILE VIEW: 1 Clean Card at a time with Navigation ─── */}
        <div className="block md:hidden w-full max-w-md mx-auto">
          <div className="min-h-[175px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileIndex}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                className="relative bg-[#FFFDF9]/95 backdrop-blur-md rounded-2xl p-5 border border-[#E7DEC8] shadow-sm flex flex-col justify-between min-h-[175px] w-full overflow-hidden"
              >
                {/* Specular Top Rim */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/30 flex items-center justify-center text-[#BA8E4E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                      <Quote className="w-3.5 h-3.5 stroke-[1.8] fill-[#BA8E4E]/15" />
                    </div>
                    <div className="flex items-center gap-0.5 text-[#BA8E4E]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#BA8E4E] text-[#BA8E4E]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans mb-3">
                    &ldquo;{testimonials[mobileIndex].quote}&rdquo;
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#EAE1D1] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-serif font-bold text-stone-800 block">
                      {testimonials[mobileIndex].author}
                    </span>
                    <span className="text-[10px] font-sans text-stone-500">
                      {testimonials[mobileIndex].role} · {testimonials[mobileIndex].location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[9.5px] text-[#BA8E4E] font-mono font-medium">
                    <BadgeCheck className="w-3 h-3 text-[#BA8E4E]" />
                    <span>Verified</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Arrows & Counter */}
          <div className="flex items-center justify-between mt-3 px-1 w-full">
            <span className="text-[10px] font-mono text-stone-500 tracking-wider">
              {mobileIndex + 1} / {testimonials.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMobilePrev}
                className="w-8 h-8 rounded-full border border-[#D5CABB] bg-white text-stone-600 flex items-center justify-center shadow-2xs apple-tactile active:scale-90 transition-transform duration-100 ease-out cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleMobileNext}
                className="w-8 h-8 rounded-full border border-[#D5CABB] bg-white text-stone-600 flex items-center justify-center shadow-2xs apple-tactile active:scale-90 transition-transform duration-100 ease-out cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── DESKTOP VIEW: 3 Editorial Cards Flanked by Side Arrows ─── */}
        <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-[#D5CABB] bg-white/80 hover:bg-white text-stone-500 hover:text-stone-800 flex items-center justify-center shrink-0 shadow-xs apple-tactile active:scale-90 transition-all duration-100 ease-out cursor-pointer"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 3 Review Cards Animated on Page Change */}
          <div className="w-full max-w-5xl overflow-hidden min-h-[210px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.99 }}
                transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                className="grid grid-cols-3 gap-5 lg:gap-6 w-full"
              >
                {visibleTestimonials.map((item, index) => (
                  <div
                    key={`${currentPage}-${index}`}
                    className="relative bg-[#FFFDF9]/90 backdrop-blur-md rounded-2xl p-6 lg:p-7 border border-[#E7DEC8] hover:border-[#BA8E4E]/60 shadow-[0_4px_20px_rgba(46,6,13,0.03)] hover:shadow-[0_12px_32px_rgba(46,6,13,0.08)] hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col justify-between apple-card-interactive active:scale-[0.985] overflow-hidden"
                  >
                    {/* Specular Top Rim */}
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

                    <div>
                      {/* Refined Gold Quote Medallion and 5-Star Rating */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-7 h-7 rounded-full bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/30 flex items-center justify-center text-[#BA8E4E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                          <Quote className="w-3.5 h-3.5 stroke-[1.8] fill-[#BA8E4E]/15" />
                        </div>
                        <div className="flex items-center gap-0.5 text-[#BA8E4E]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#BA8E4E] text-[#BA8E4E]" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-sans mb-5">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#EAE1D1] flex items-center justify-between">
                      <div>
                        <span className="text-xs font-serif font-bold text-stone-800 block">
                          {item.author}
                        </span>
                        <span className="text-[10px] font-sans text-stone-500">
                          {item.role} · {item.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[9.5px] text-[#BA8E4E] font-mono font-medium">
                        <BadgeCheck className="w-3 h-3 text-[#BA8E4E]" />
                        <span>Verified Client</span>
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
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-[#D5CABB] bg-white/80 hover:bg-white text-stone-500 hover:text-stone-800 flex items-center justify-center shrink-0 shadow-xs apple-tactile active:scale-90 transition-all duration-100 ease-out cursor-pointer"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
