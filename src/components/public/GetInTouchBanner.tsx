'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { InquiryModal } from './InquiryModal';

export function GetInTouchBanner() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <>
      <div id="contact" className="pt-4 sm:pt-6 pb-12 sm:pb-16 lg:pb-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2E060D] via-[#240409] to-[#1A0307] border-t border-white/25 border-b border-black/40 p-7 sm:p-10 lg:p-12 shadow-2xl text-white">
            {/* Top specular hairline */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
            
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

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-2 tracking-[-0.025em] leading-[1.14]">
                Partner With Rootwills
              </h2>

              <p className="text-xs sm:text-sm text-[#EDE4D8]/95 font-sans leading-relaxed mb-6 sm:mb-8 max-w-xl">
                Speak directly with our wholesale team to arrange tasting samples, tiered volume rates, or bespoke dawn delivery schedules for your kitchen.
              </p>

              {/* Contact Icons Row with Double-Bezel Frosted Medallions and Tactile Response */}
              <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-10 text-xs sm:text-sm text-[#EDE4D8] font-sans mb-7 sm:mb-9">
                <a
                  href="tel:+442012345678"
                  className="group flex items-center gap-2.5 hover:text-[#D4A86A] transition-colors apple-tactile active:scale-95"
                >
                  <div className="relative p-0.5 rounded-full bg-gradient-to-br from-[#BA8E4E]/50 via-white/15 to-transparent shadow-[0_2px_8px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-200">
                    <div className="w-8 h-8 rounded-full bg-white/[0.08] backdrop-blur-md ring-1 ring-white/20 flex items-center justify-center text-[#D4A86A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                      <Phone className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>
                  </div>
                  <span className="font-medium">+44 (0) 20 1234 5678</span>
                </a>

                <a
                  href="mailto:info@rootwills.co.uk"
                  className="group flex items-center gap-2.5 hover:text-[#D4A86A] transition-colors apple-tactile active:scale-95"
                >
                  <div className="relative p-0.5 rounded-full bg-gradient-to-br from-[#BA8E4E]/50 via-white/15 to-transparent shadow-[0_2px_8px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-200">
                    <div className="w-8 h-8 rounded-full bg-white/[0.08] backdrop-blur-md ring-1 ring-white/20 flex items-center justify-center text-[#D4A86A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                      <Mail className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>
                  </div>
                  <span className="font-medium">info@rootwills.co.uk</span>
                </a>

                <div className="flex items-center gap-2.5 text-[#EDE4D8]/80 apple-tactile active:scale-95 cursor-default">
                  <div className="relative p-0.5 rounded-full bg-gradient-to-br from-[#BA8E4E]/50 via-white/15 to-transparent shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                    <div className="w-8 h-8 rounded-full bg-white/[0.08] backdrop-blur-md ring-1 ring-white/20 flex items-center justify-center text-[#D4A86A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                      <MapPin className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>
                  </div>
                  <span>The Hub, Nobel Wy, Birmingham B6 7EU, United Kingdom</span>
                </div>
              </div>

              {/* Send Enquiry CTA Button with Nested Arrow Pill */}
              <div>
                <button
                  onClick={() => setInquiryOpen(true)}
                  className="group inline-flex items-center gap-2.5 sm:gap-3 pl-6 pr-2 py-2 sm:pl-8 sm:pr-2.5 sm:py-2.5 rounded-full bg-[#D4A86A] hover:bg-[#C59958] text-[#2D060D] text-xs sm:text-[13px] font-serif font-bold tracking-wider uppercase transition-all duration-100 ease-out shadow-lg hover:shadow-2xl apple-tactile active:scale-[0.97] cursor-pointer"
                >
                  <span>Submit Trade Enquiry</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#2D060D]/10 flex items-center justify-center transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                    <ArrowRight className="w-3.5 h-3.5 text-[#2D060D]" />
                  </div>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
