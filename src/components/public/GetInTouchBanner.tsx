'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { InquiryModal } from './InquiryModal';

export function GetInTouchBanner() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#3D0810] via-[#4E0D17] to-[#36060E] border border-[#BA8E4E]/40 p-8 sm:p-10 lg:p-12 shadow-2xl text-white">
            
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
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-2">
                Get in Touch
              </h2>

              <p className="text-xs sm:text-sm text-cream-200/90 font-sans leading-relaxed mb-8 max-w-xl">
                Have a question or want to discuss your business needs? We’d love to hear from you.
              </p>

              {/* Contact Icons Row */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-cream-100 font-sans mb-8">
                <a
                  href="tel:+442012345678"
                  className="flex items-center gap-2 hover:text-[#CCA362] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#CCA362]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+44 (0) 20 1234 5678</span>
                </a>

                <a
                  href="mailto:info@rootwills.co.uk"
                  className="flex items-center gap-2 hover:text-[#CCA362] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#CCA362]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>info@rootwills.co.uk</span>
                </a>

                <div className="flex items-center gap-2 text-cream-200/80">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#CCA362]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>London, United Kingdom</span>
                </div>
              </div>

              {/* Send Enquiry CTA Button */}
              <div>
                <button
                  onClick={() => setInquiryOpen(true)}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded bg-[#BA8E4E] hover:bg-[#A87D38] text-white text-xs sm:text-sm font-serif font-bold tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all"
                >
                  <span>Send Enquiry</span>
                  <ArrowRight className="w-4 h-4 text-white" />
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
