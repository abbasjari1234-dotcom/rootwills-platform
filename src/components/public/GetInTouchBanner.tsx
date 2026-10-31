'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { InquiryModal } from './InquiryModal';
import { DoodleFlourish } from './DoodleFlourish';

export function GetInTouchBanner() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <>
      <div id="contact" className="pt-6 sm:pt-10 pb-16 sm:pb-20 lg:pb-28 scroll-mt-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative rounded-3xl overflow-hidden bg-[#260309] border border-[#F3D08A]/35 p-7 sm:p-11 lg:p-14 shadow-[0_24px_60px_rgba(38,3,9,0.35)] text-white">
            {/* Top glowing gold hairline */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F3D08A]/70 to-transparent pointer-events-none" />

            {/* Royal Velvet Damask Texture Layer */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-45 mix-blend-overlay bg-cover bg-center contrast-125 saturate-160"
              style={{ backgroundImage: "url('/images/textures/burgundy_damask_texture.jpg')" }}
            />

            {/* Luminous Crimson Depth Vignette */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3D0612]/50 via-transparent to-[#140104]/80 pointer-events-none" />
            
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
              
              {/* Monospace Eyebrow Capsule */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#180205]/85 border border-[#F3D08A]/50 mb-3 sm:mb-4 shadow-sm backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3D08A] animate-pulse" />
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#F3D08A] font-bold">
                  06 // DIRECT WHOLESALE DESK
                </span>
              </div>

              <div className="relative inline-block">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-1 tracking-[-0.025em] leading-[1.14] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  Partner With Rootwills
                </h2>
                <div className="flex justify-center">
                  <DoodleFlourish 
                    variant="underline-loop" 
                    color="#F3D08A" 
                    strokeWidth={3} 
                    className="w-44 sm:w-56 -mt-1 mb-3 text-[#F3D08A]" 
                    delay={200}
                  />
                </div>
              </div>

              <p className="text-xs sm:text-[14px] text-white/95 font-sans leading-relaxed mb-6 sm:mb-8 max-w-xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] font-normal">
                Speak directly with our wholesale team to arrange tasting samples, tiered volume rates, or bespoke dawn delivery schedules for your kitchen.
              </p>

              {/* Contact Icons Row with Double-Bezel Frosted Medallions and Tactile Response */}
              <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-10 text-xs sm:text-sm text-white font-sans mb-7 sm:mb-9">
                <a
                  href="tel:+442012345678"
                  className="group flex items-center gap-2.5 hover:text-[#F3D08A] transition-colors apple-tactile active:scale-95"
                >
                  <div className="relative p-0.5 rounded-full bg-gradient-to-br from-[#F3D08A]/50 via-white/15 to-transparent shadow-[0_2px_8px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-200">
                    <div className="w-8 h-8 rounded-full bg-[#180205]/85 backdrop-blur-md ring-1 ring-[#F3D08A]/40 flex items-center justify-center text-[#F3D08A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                      <Phone className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide">+44 (0) 20 1234 5678</span>
                </a>

                <a
                  href="mailto:info@rootwills.co.uk"
                  className="group flex items-center gap-2.5 hover:text-[#F3D08A] transition-colors apple-tactile active:scale-95"
                >
                  <div className="relative p-0.5 rounded-full bg-gradient-to-br from-[#F3D08A]/50 via-white/15 to-transparent shadow-[0_2px_8px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-200">
                    <div className="w-8 h-8 rounded-full bg-[#180205]/85 backdrop-blur-md ring-1 ring-[#F3D08A]/40 flex items-center justify-center text-[#F3D08A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                      <Mail className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide">info@rootwills.co.uk</span>
                </a>

                <div className="flex items-center gap-2.5 text-white/95 apple-tactile active:scale-95 cursor-default">
                  <div className="relative p-0.5 rounded-full bg-gradient-to-br from-[#F3D08A]/50 via-white/15 to-transparent shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                    <div className="w-8 h-8 rounded-full bg-[#180205]/85 backdrop-blur-md ring-1 ring-[#F3D08A]/40 flex items-center justify-center text-[#F3D08A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                      <MapPin className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>
                  </div>
                  <span className="text-xs">The Hub, Nobel Wy, Birmingham B6 7EU</span>
                </div>
              </div>

              {/* Send Enquiry CTA Button with Nested Arrow Pill */}
              <div>
                <button
                  onClick={() => setInquiryOpen(true)}
                  className="group inline-flex items-center gap-2.5 sm:gap-3 pl-6 pr-2 py-2 sm:pl-8 sm:pr-2.5 sm:py-2.5 rounded-full bg-[#F3D08A] hover:bg-[#E5BE72] text-[#240308] text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase transition-all duration-200 ease-out shadow-[0_4px_20px_rgba(243,208,138,0.35)] hover:shadow-[0_6px_28px_rgba(243,208,138,0.5)] apple-tactile active:scale-[0.97] cursor-pointer"
                >
                  <span>Submit Trade Enquiry</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#240308]/15 flex items-center justify-center transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                    <ArrowRight className="w-3.5 h-3.5 text-[#240308]" />
                  </div>
                </button>
              </div>

            </div>

          </div>

        </div>

        <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
      </div>
    </>
  );
}
