'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { InquiryModal } from './InquiryModal';

export function GetInTouchBanner() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-12 sm:py-16 lg:py-24 bg-[#FAF6EE] text-slate-900 relative overflow-hidden border-b border-[#E8DEC8]">
        {/* ─── Neoclassical Parchment Watermark Texture ─── */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-45 mix-blend-multiply"
          style={{ 
            backgroundImage: `url('/images/textures/cream_parchment_texture.jpg')`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#2E060D] via-[#240409] to-[#1A0307] border border-[#BA8E4E]/35 p-7 sm:p-10 lg:p-12 shadow-2xl text-white">
            
            {/* Background Greek Engraving Watermark */}
            <div className="absolute inset-y-0 left-0 w-1/3 opacity-15 pointer-events-none mix-blend-screen overflow-hidden">
              <Image
                src="/images/commercial/greek_harvest_engraving.jpg"
                alt="Greek Engraving Motif"
                fill
                sizes="400px"
                className="object-cover object-left"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
              
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-[#D4A86A] text-[10px] sm:text-[11px] font-serif tracking-[0.25em] uppercase font-semibold">
                  — DIRECT COMMERCIAL ENQUIRIES —
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-2 tracking-tight">
                Partner With Rootwills
              </h2>

              <p className="text-xs sm:text-sm text-[#EDE4D8]/90 font-sans leading-relaxed mb-6 sm:mb-8 max-w-xl">
                Speak directly with our wholesale team to arrange tasting samples, tiered volume rates, or bespoke dawn delivery schedules for your kitchen.
              </p>

              {/* Contact Icons Row */}
              <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-10 text-xs sm:text-sm text-[#EDE4D8] font-sans mb-7 sm:mb-9">
                <a
                  href="tel:+442012345678"
                  className="flex items-center gap-2.5 hover:text-[#D4A86A] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 ring-1 ring-[#BA8E4E]/30 flex items-center justify-center text-[#D4A86A]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-medium">+44 (0) 20 1234 5678</span>
                </a>

                <a
                  href="mailto:info@rootwills.co.uk"
                  className="flex items-center gap-2.5 hover:text-[#D4A86A] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 ring-1 ring-[#BA8E4E]/30 flex items-center justify-center text-[#D4A86A]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-medium">info@rootwills.co.uk</span>
                </a>

                <div className="flex items-center gap-2.5 text-[#EDE4D8]/80">
                  <div className="w-8 h-8 rounded-full bg-white/10 ring-1 ring-[#BA8E4E]/30 flex items-center justify-center text-[#D4A86A]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>London, United Kingdom</span>
                </div>
              </div>

              {/* Send Enquiry CTA Button with Nested Arrow Pill */}
              <div>
                <button
                  onClick={() => setInquiryOpen(true)}
                  className="group inline-flex items-center gap-2.5 sm:gap-3 pl-6 pr-2 py-2 sm:pl-8 sm:pr-2.5 sm:py-2.5 rounded-full bg-[#D4A86A] hover:bg-[#C59958] text-[#2D060D] text-xs sm:text-[13px] font-serif font-bold tracking-wider uppercase transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-lg hover:shadow-2xl active:scale-[0.98] cursor-pointer"
                >
                  <span>Submit Trade Enquiry</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#2D060D]/10 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                    <ArrowRight className="w-3.5 h-3.5 text-[#2D060D]" />
                  </div>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
