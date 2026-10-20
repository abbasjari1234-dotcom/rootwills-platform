'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer id="footer" className="bg-[#240409] text-white relative overflow-hidden">
      {/* ─── Deep Burgundy Damask Engraving Texture Overlay ─── */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-25 mix-blend-overlay"
        style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
      />
      {/* Soft Gradient Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2D050B] via-[#240409] to-[#180205] pointer-events-none z-0" />

      {/* ─── Top Architectural Hairline with Center Gold Diamond Motif ─── */}
      <div className="relative z-10 w-full pt-3 sm:pt-4 pb-1 border-t border-[#BA8E4E]/25 flex items-center justify-center px-4">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#1A0307]/90 border border-[#BA8E4E]/35 shadow-xs max-w-[94vw]">
          <span className="text-[7px] sm:text-[8px] text-[#BA8E4E]">◆</span>
          <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.12em] sm:tracking-[0.25em] font-serif text-[#D4A86A] font-semibold truncate">
            ROOTWILLS LONDON · COMMERCIAL PURVEYORS
          </span>
          <span className="text-[7px] sm:text-[8px] text-[#BA8E4E]">◆</span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-14 lg:py-16">
        
        {/* Responsive Editorial Grid: 2-col on mobile for compact height, 4-col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-y-6 gap-x-4 sm:gap-8 lg:gap-10 items-start">
          
          {/* Column 1: Brand Seal, Identity & Narrative */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-4 flex flex-col pr-0 lg:pr-6">
            <div className="flex items-center gap-3 sm:gap-3.5 mb-2.5 sm:mb-4">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]">
                <Image
                  src="/images/branded/rootwills_logo_seal.png"
                  alt="Rootwills Logo Seal"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-white leading-tight">
                  ROOTWILLS
                </span>
                <span className="text-[9px] font-serif tracking-[0.25em] uppercase text-[#D4A86A] font-semibold mt-0.5">
                  Food Services & Wholesale
                </span>
                <span className="text-[8px] font-sans tracking-[0.2em] text-[#EDE4D8]/60 uppercase mt-0.5">
                  London · Established Trade Partner
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-[#EDE4D8]/80 font-sans leading-relaxed mb-3 sm:mb-4 max-w-sm">
              Supplying the UK hospitality industry, restaurants, and food professionals with chef-curated wholesale ingredients
              <span className="hidden sm:inline">, verified cold-chain logistics, and dependable trade partnership</span>.
            </p>

            {/* Provenance Micro-Badge */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 w-max shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A86A] shrink-0" />
              <span className="text-[9px] font-serif tracking-[0.18em] uppercase text-[#EDE4D8]/90 font-medium">
                Direct Grower Lineage · Dawn UK Drops
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (Takes left half on mobile) */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-2 lg:pl-2">
            <h3 className="font-serif text-xs sm:text-[13px] tracking-[0.18em] uppercase text-[#E8DDD4] font-bold mb-2.5 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
              <span className="text-[#D4A86A] text-[9px] sm:text-[10px]">✦</span>
              Quick Links
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-[13px] font-sans">
              {[
                { label: 'Home', href: '/#home' },
                { label: 'About Us', href: '/#about' },
                { label: 'Our Services', href: '/#services' },
                { label: 'Our Approach', href: '/#approach' },
                { label: 'Reviews', href: '/#testimonials' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[#EDE4D8]/75 hover:text-white transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="text-[#D4A86A] text-[9px] opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300">
                      ✦
                    </span>
                    <span className="tracking-wide">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Follow Us & Brand Standard (Takes right half on mobile, 4th column on desktop) */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 lg:order-4">
            <h3 className="font-serif text-xs sm:text-[13px] tracking-[0.18em] uppercase text-[#E8DDD4] font-bold mb-2.5 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
              <span className="text-[#D4A86A] text-[9px] sm:text-[10px]">✦</span>
              Connect
            </h3>
            
            {/* High-Precision Vector Social Icons */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Rootwills on LinkedIn"
                className="group w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 hover:ring-[#D4A86A] flex items-center justify-center text-[#EDE4D8]/80 hover:text-[#D4A86A] hover:bg-[#D4A86A]/10 transition-all duration-300 shadow-2xs hover:scale-105 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Rootwills on Instagram"
                className="group w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 hover:ring-[#D4A86A] flex items-center justify-center text-[#EDE4D8]/80 hover:text-[#D4A86A] hover:bg-[#D4A86A]/10 transition-all duration-300 shadow-2xs hover:scale-105 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Rootwills on X"
                className="group w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 hover:ring-[#D4A86A] flex items-center justify-center text-[#EDE4D8]/80 hover:text-[#D4A86A] hover:bg-[#D4A86A]/10 transition-all duration-300 shadow-2xs hover:scale-105 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>

            {/* Editorial Standard Creed */}
            <div className="pt-2 sm:pt-3 border-t border-[#BA8E4E]/20">
              <div className="hidden sm:block">
                <span className="block text-[9px] sm:text-[10px] font-serif tracking-[0.24em] uppercase text-[#D4A86A] font-semibold leading-relaxed">
                  QUALITY · CONSISTENCY · PARTNERSHIP
                </span>
                <span className="block text-[9px] font-sans text-[#EDE4D8]/60 mt-1">
                  A Partner of Choice for UK Food Businesses
                </span>
              </div>
              <div className="sm:hidden space-y-0.5">
                <span className="block text-[8px] font-serif tracking-[0.16em] uppercase text-[#D4A86A] font-semibold">
                  Quality · Consistency
                </span>
                <span className="block text-[8px] font-serif tracking-[0.16em] uppercase text-[#D4A86A] font-semibold">
                  Partnership
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Executive Contact Touchpoints (Compact full-width block on mobile, 3rd column on desktop) */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-3 lg:order-3 pt-3 sm:pt-0 border-t border-white/10 sm:border-t-0">
            <h3 className="font-serif text-xs sm:text-[13px] tracking-[0.18em] uppercase text-[#E8DDD4] font-bold mb-2.5 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
              <span className="text-[#D4A86A] text-[9px] sm:text-[10px]">✦</span>
              Get in Touch
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-1 gap-2 sm:gap-3 font-sans text-xs sm:text-[13px]">
              <li>
                <a
                  href="tel:+442012345678"
                  className="group flex items-center gap-2.5 sm:gap-3 text-[#EDE4D8]/80 hover:text-white transition-colors"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:ring-[#D4A86A]/70 group-hover:bg-[#D4A86A]/10 shadow-2xs">
                    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[1.75]" />
                  </div>
                  <div>
                    <span className="hidden sm:block text-[10px] font-serif uppercase tracking-[0.15em] text-[#D4A86A]/85 font-medium">
                      Direct Trade Desk
                    </span>
                    <span className="font-medium tracking-wide text-white group-hover:text-[#D4A86A] transition-colors text-xs sm:text-[13px]">
                      +44 (0) 20 1234 5678
                    </span>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="mailto:info@rootwills.co.uk"
                  className="group flex items-center gap-2.5 sm:gap-3 text-[#EDE4D8]/80 hover:text-white transition-colors"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:ring-[#D4A86A]/70 group-hover:bg-[#D4A86A]/10 shadow-2xs">
                    <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[1.75]" />
                  </div>
                  <div>
                    <span className="hidden sm:block text-[10px] font-serif uppercase tracking-[0.15em] text-[#D4A86A]/85 font-medium">
                      Commercial Enquiries
                    </span>
                    <span className="font-medium tracking-wide text-white group-hover:text-[#D4A86A] transition-colors text-xs sm:text-[13px]">
                      info@rootwills.co.uk
                    </span>
                  </div>
                </a>
              </li>

              <li className="flex items-center gap-2.5 sm:gap-3 text-[#EDE4D8]/80">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 shadow-2xs">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[1.75]" />
                </div>
                <div>
                  <span className="hidden sm:block text-[10px] font-serif uppercase tracking-[0.15em] text-[#D4A86A]/85 font-medium">
                    Operations & Distribution
                  </span>
                  <span className="font-medium tracking-wide text-white text-xs sm:text-[13px]">
                    London, United Kingdom
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* ─── Bottom Sub-Bar ─── */}
      <div className="relative z-10 border-t border-[#BA8E4E]/15 bg-[#170205]/95 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-xs text-[#EDE4D8]/60 font-sans text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
            <span>© {new Date().getFullYear()} Rootwills Ltd.</span>
            <span className="text-white/20">|</span>
            <span className="text-[11px] text-[#D4A86A]/80">England & Wales</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 sm:gap-4 text-[11px] text-[#EDE4D8]/75">
            <Link href="/delivery" className="hover:text-[#D4A86A] transition-colors">
              Delivery SLAs
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/locations" className="hover:text-[#D4A86A] transition-colors">
              Hubs &amp; Coverage
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/security" className="hover:text-[#D4A86A] transition-colors">
              Food Safety &amp; HACCP
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/privacy" className="hover:text-[#D4A86A] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/terms" className="hover:text-[#D4A86A] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-white/20">·</span>
            <a href="#home" className="hover:text-[#D4A86A] transition-colors flex items-center gap-1 group">
              <span>Back to Top</span>
              <span className="text-[#D4A86A] transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
