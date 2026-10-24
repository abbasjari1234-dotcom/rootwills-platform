'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'Rootwills has been an excellent partner for our restaurant. The quality of their products and reliability of delivery are unmatched.',
      author: 'Head Chef',
      location: 'London',
    },
    {
      quote:
        "Professional, responsive and always willing to go the extra mile. We've built a great relationship with the team.",
      author: 'Caterer',
      location: 'Birmingham',
    },
    {
      quote:
        'Their wholesale service is efficient and consistent. We highly recommend Rootwills to any food business.',
      author: 'Restaurant Owner',
      location: 'Manchester',
    },
    {
      quote:
        'Reliable supply during peak seasonal demands has made Rootwills our primary wholesale foundation across four dining rooms.',
      author: 'Culinary Director',
      location: 'Edinburgh',
    },
    {
      quote:
        'Integrity in sourcing and produce that arrives at peak vitality every morning. A true partner in culinary excellence.',
      author: 'Head of Culinary Procurement',
      location: 'Bristol',
    },
    {
      quote:
        'From dry stores to bespoke fresh produce deliveries, their standards and logistics accuracy have streamlined our kitchen operations.',
      author: 'Executive Head Chef',
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
    <div id="testimonials" className="pt-10 sm:pt-16 lg:pt-24 pb-4 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-14">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <span className="text-[#BA8E4E] text-[10px] sm:text-[11px] font-serif tracking-[0.25em] uppercase font-semibold">
              — WHAT OUR CLIENTS SAY —
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-serif font-bold text-[#2E060D] leading-[1.2]">
            Trusted by<br className="sm:hidden" /> Food Businesses
          </h2>
        </div>

        {/* ─── MOBILE VIEW: 1 Clean Card at a time with Navigation ─── */}
        <div className="block md:hidden w-full max-w-md mx-auto">
          <div className="min-h-[160px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileIndex}
                initial={{ opacity: 0, transform: 'translateY(6px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                exit={{ opacity: 0, transform: 'translateY(-6px)' }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="bg-[#FAF7F2] rounded-xl p-4 sm:p-5 border border-[#E7DEC8] shadow-xs flex flex-col justify-between min-h-[160px] w-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/30 flex items-center justify-center text-[#BA8E4E]">
                      <Quote className="w-3 h-3 stroke-[1.8] fill-[#BA8E4E]/15" />
                    </div>
                    <div className="flex items-center gap-0.5 text-[#BA8E4E]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-[#BA8E4E] text-[#BA8E4E]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans mb-3">
                    &ldquo;{testimonials[mobileIndex].quote}&rdquo;
                  </p>
                </div>
                <div className="pt-2 border-t border-[#EAE1D1] flex items-center justify-between">
                  <span className="text-xs font-sans text-stone-600 font-medium">
                    {testimonials[mobileIndex].author}, {testimonials[mobileIndex].location}
                  </span>
                  <div className="flex items-center gap-1 text-[9.5px] text-[#BA8E4E] font-sans font-medium">
                    <BadgeCheck className="w-3 h-3 text-[#BA8E4E]" />
                    <span>Verified</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Arrows & Counter */}
          <div className="flex items-center justify-between mt-3 px-0.5 w-full">
            <span className="text-[10px] font-sans text-stone-500 tracking-wider">
              {mobileIndex + 1} of {testimonials.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMobilePrev}
                className="w-8 h-8 rounded-full border border-[#D5CABB] bg-white text-stone-600 flex items-center justify-center shadow-2xs transition-[transform,background-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleMobileNext}
                className="w-8 h-8 rounded-full border border-[#D5CABB] bg-white text-stone-600 flex items-center justify-center shadow-2xs transition-[transform,background-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] cursor-pointer"
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
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-[#D5CABB] bg-transparent hover:bg-white text-stone-500 hover:text-stone-800 flex items-center justify-center shrink-0 transition-[transform,background-color,color,border-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-xs active:scale-[0.96] cursor-pointer"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 3 Review Cards Animated on Page Change */}
          <div className="w-full max-w-5xl overflow-hidden min-h-[190px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, transform: 'translateY(8px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                exit={{ opacity: 0, transform: 'translateY(-8px)' }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="grid grid-cols-3 gap-5 lg:gap-6 w-full"
              >
                {visibleTestimonials.map((item, index) => (
                  <div
                    key={`${currentPage}-${index}`}
                    className="bg-[#FAF7F2] rounded-xl p-6 lg:p-7 border border-[#E7DEC8] shadow-xs hover:shadow-md transition-[box-shadow,border-color] duration-200 ease-out flex flex-col justify-between"
                  >
                    <div>
                      {/* Refined Gold Quote Medallion and 5-Star Rating */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-7 h-7 rounded-full bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/30 flex items-center justify-center text-[#BA8E4E]">
                          <Quote className="w-3.5 h-3.5 stroke-[1.8] fill-[#BA8E4E]/15" />
                        </div>
                        <div className="flex items-center gap-0.5 text-[#BA8E4E]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#BA8E4E] text-[#BA8E4E]" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-sans mb-6">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-[#EAE1D1] flex items-center justify-between">
                      <span className="text-xs font-sans text-stone-700 font-medium">
                        {item.author}, <span className="text-stone-500">{item.location}</span>
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-[#BA8E4E] font-sans font-medium">
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
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-[#D5CABB] bg-transparent hover:bg-white text-stone-500 hover:text-stone-800 flex items-center justify-center shrink-0 transition-[transform,background-color,color,border-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-xs active:scale-[0.96] cursor-pointer"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
