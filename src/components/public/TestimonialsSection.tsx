'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <section id="testimonials" className="py-10 sm:py-16 lg:py-28 bg-[#FAF6EE] text-slate-900 relative overflow-hidden border-b border-[#E8DEC8]">
      {/* ─── Neoclassical Laurel Wreaths & Architectural Crest Watermark Texture ─── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-45 mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/texture_testimonials_crest.jpg')`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
          <div className="bg-[#FAF7F2] rounded-xl p-4 sm:p-5 border border-[#E7DEC8] shadow-xs flex flex-col justify-between min-h-[160px] w-full">
            <div>
              <div className="flex items-center gap-1 text-[#BA8E4E] mb-2">
                <span className="font-serif text-base leading-none select-none font-bold">“</span>
                <span className="font-serif text-base leading-none select-none font-bold -ml-0.5">“</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-sans mb-3">
                &ldquo;{testimonials[mobileIndex].quote}&rdquo;
              </p>
            </div>
            <div className="pt-2 border-t border-[#EAE1D1]">
              <span className="text-xs font-sans text-stone-600 font-medium">
                {testimonials[mobileIndex].author}, {testimonials[mobileIndex].location}
              </span>
            </div>
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
                className="w-8 h-8 rounded-full border border-[#D5CABB] bg-white text-stone-600 flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleMobileNext}
                className="w-8 h-8 rounded-full border border-[#D5CABB] bg-white text-stone-600 flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
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
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-[#D5CABB] bg-transparent hover:bg-white text-stone-500 hover:text-stone-800 flex items-center justify-center shrink-0 transition-all shadow-xs active:scale-95 cursor-pointer"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 3 Review Cards Matching Reference Mockup */}
          <div className="grid grid-cols-3 gap-5 lg:gap-6 w-full max-w-5xl">
            {visibleTestimonials.map((item, index) => (
              <div
                key={`${currentPage}-${index}`}
                className="bg-[#FAF7F2] rounded-xl p-6 lg:p-7 border border-[#E7DEC8] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Subtle Gold Quote Marks Icon */}
                  <div className="flex items-center gap-1 text-[#BA8E4E] mb-3">
                    <span className="font-serif text-lg leading-none select-none font-bold">“</span>
                    <span className="font-serif text-lg leading-none select-none font-bold -ml-0.5">“</span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-sans mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-sans text-stone-600 font-medium">
                    {item.author}, {item.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-[#D5CABB] bg-transparent hover:bg-white text-stone-500 hover:text-stone-800 flex items-center justify-center shrink-0 transition-all shadow-xs active:scale-95 cursor-pointer"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
