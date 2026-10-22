'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import { InquiryModal } from './InquiryModal';

export function CommercialBottomCTA() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Horizontal Split Banner Card in Signature Royal Burgundy & Gold */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#2E060D] via-[#240409] to-[#1A0307] border border-[#BA8E4E]/35 shadow-2xl grid grid-cols-1 md:grid-cols-12 items-stretch">
            
            {/* Authentic Rich Damask Texture */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-50"
              style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
            />
            
            {/* Greek Engraving Watermark Overlay */}
            <div className="absolute inset-y-0 left-0 w-1/3 opacity-15 pointer-events-none mix-blend-screen overflow-hidden">
              <Image
                src="/images/commercial/greek_harvest_engraving.jpg"
                alt="Greek Engraving Motif"
                fill
                sizes="400px"
                className="object-cover object-left"
              />
            </div>

            {/* Left Visual: Produce Harvest with Dark Fade */}
            <div className="md:col-span-5 relative min-h-[200px] sm:min-h-[260px] md:min-h-[320px] overflow-hidden">
              <Image
                src="/images/commercial/17_cta_produce.jpg"
                alt="Fresh Produce Vegetables Wholesale Supply"
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#240409]/40 to-[#240409] pointer-events-none" />
            </div>

            {/* Right Content */}
            <div className="md:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center relative z-10 text-white">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-[#D4A86A] text-[11px] sm:text-xs font-serif tracking-[0.25em] uppercase font-semibold">
                  — DIRECT COMMERCIAL PURVEYORS —
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight mb-2 sm:mb-3">
                Elevate Your Kitchen's Wholesale Supply
              </h2>

              <p className="text-[#EDE4D8]/90 font-sans text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 max-w-xl">
                Join UK restaurants, luxury hotel groups, and catering brigades already relying on our hand-graded market produce and locked contract trade pricing.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => setInquiryOpen(true)}
                  className="group inline-flex items-center justify-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-[#D4A86A] hover:bg-[#C59958] text-[#2D060D] text-xs sm:text-[13px] font-serif font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl active:scale-[0.98] cursor-pointer"
                >
                  <span>Partner With Rootwills</span>
                  <div className="w-7 h-7 rounded-full bg-[#2D060D]/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5 text-[#2D060D]" />
                  </div>
                </button>

                <a
                  href="tel:+442012345678"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1A0307]/80 hover:bg-[#2A050D] ring-1 ring-[#BA8E4E]/40 hover:ring-[#BA8E4E] text-[#EDE4D8] text-xs sm:text-[13px] font-serif font-semibold tracking-wider transition-all duration-300"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4A86A]" />
                  <span>+44 (0) 20 1234 5678</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
