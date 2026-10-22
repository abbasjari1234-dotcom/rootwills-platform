'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  Settings, 
  Sprout, 
  Star, 
  ChevronDown, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp 
} from 'lucide-react';

export function PublicFooter() {
  // Mobile accordion state (all expanded by default to match Image 2)
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    quickLinks: true,
    connect: true,
    getInTouch: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#120205] text-white relative overflow-hidden">
      {/* ─── London Westminster Skyline at Twilight (Image 3) ─── */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-[right_top] sm:bg-[center_top] pointer-events-none opacity-55"
        style={{ backgroundImage: `url('/images/branded/london_night_skyline.jpg')` }}
      />

      {/* ─── Deep Obsidian-Burgundy Gradient Overlays for High-End Readability ─── */}
      {/* Vertical fade to deep dark burgundy */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#160206]/75 via-[#140205]/85 to-[#0b0103] pointer-events-none z-0" />
      {/* Horizontal fade from left so brand text pops */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#140205]/95 via-[#140205]/65 to-transparent pointer-events-none z-0" />
      {/* Subtle radial glow from top right */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.22),transparent_70%)] pointer-events-none z-0" />

      {/* ─── Top Architectural Pill Badge (Matching Image 2 Top) ─── */}
      <div className="relative z-10 w-full pt-4 sm:pt-6 pb-2 flex items-center justify-center px-4">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1 rounded-full bg-[#1A0307]/85 border border-[#BA8E4E]/45 backdrop-blur-sm shadow-md max-w-[94vw]">
          <span className="text-[8px] sm:text-[9px] text-[#BA8E4E]">✦</span>
          <span className="text-[8px] sm:text-[9.5px] uppercase tracking-[0.22em] sm:tracking-[0.25em] font-serif text-[#D4A86A] font-semibold truncate">
            ROOTWILLS LONDON · COMMERCIAL PURVEYORS
          </span>
          <span className="text-[8px] sm:text-[9px] text-[#BA8E4E]">✦</span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-20">
        
        {/* ─── Brand Identity & Heritage Header (Matching Image 2) ─── */}
        <div className="max-w-2xl mx-auto lg:mx-0 flex flex-col mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-2">
            {/* Medallion Heritage Seal */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)]">
              <Image
                src="/images/branded/rootwills_logo_master.png"
                alt="Rootwills Logo Seal"
                fill
                sizes="64px"
                className="object-contain"
                priority
              />
            </div>
            
            {/* Brand Wordmark & Typography */}
            <div className="flex flex-col">
              <span className="font-serif font-black text-2xl sm:text-3xl tracking-wider text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                ROOTWILLS
              </span>
              <span className="text-[9.5px] sm:text-[10.5px] font-serif tracking-[0.26em] uppercase text-[#D4A86A] font-bold mt-0.5 leading-none">
                FOOD SERVICES &amp; WHOLESALE
              </span>
              <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.22em] text-[#EDE4D8]/65 uppercase mt-1 leading-none">
                LONDON · ESTABLISHED TRADE PARTNER
              </span>
            </div>
          </div>

          {/* Subtle Gold Hairline Divider */}
          <div className="w-full max-w-lg h-[1px] bg-gradient-to-r from-[#BA8E4E]/45 via-[#BA8E4E]/20 to-transparent my-3" />

          {/* Brand Narrative Paragraph */}
          <p className="text-xs sm:text-[13.5px] text-[#EDE4D8]/85 font-sans leading-relaxed max-w-xl">
            Supplying the UK hospitality industry, restaurants, and food professionals with chef-curated wholesale ingredients.
          </p>
        </div>

        {/* ─── Luxury 3-Card Layout (Accordions on Mobile, 3-Col Cards on Desktop) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* ═════════ CARD 1: QUICK LINKS ═════════ */}
          <div className="rounded-2xl border border-[#BA8E4E]/30 bg-[#160307]/75 backdrop-blur-md overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-all">
            {/* Card Header (Accordion Button on Mobile) */}
            <button
              type="button"
              onClick={() => toggleSection('quickLinks')}
              className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
              aria-expanded={openSections.quickLinks}
            >
              <div className="flex items-center gap-2">
                <span className="text-[#D4A86A] text-xs">✦</span>
                <span className="font-serif text-xs sm:text-sm tracking-[0.2em] font-bold text-white uppercase">
                  QUICK LINKS
                </span>
              </div>
              <motion.div
                animate={{ rotate: openSections.quickLinks ? 0 : -90 }}
                transition={{ duration: 0.2 }}
                className="text-[#D4A86A]/80"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            {/* Card Body */}
            <AnimatePresence initial={false}>
              {openSections.quickLinks && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-3 pt-1 space-y-1">
                    {[
                      { label: 'Home', href: '/#home', icon: Home },
                      { label: 'About Us', href: '/#about', icon: User },
                      { label: 'Our Services', href: '/#services', icon: Settings },
                      { label: 'Our Approach', href: '/#approach', icon: Sprout },
                      { label: 'Reviews', href: '/#testimonials', icon: Star },
                    ].map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={item.label} className={idx > 0 ? "border-t border-[#BA8E4E]/12" : ""}>
                          <Link
                            href={item.href}
                            className="group flex items-center justify-between py-2.5 text-white/90 hover:text-white transition-all duration-200 active:scale-[0.98]"
                          >
                            <div className="flex items-center gap-3">
                              {/* Circular Icon Badge */}
                              <div className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 group-hover:scale-105 group-hover:ring-[#D4A86A]/70 group-hover:bg-[#D4A86A]/10 transition-all duration-300 shadow-2xs">
                                <IconComponent className="w-4 h-4 stroke-[1.75]" />
                              </div>
                              <span className="font-serif text-[13.5px] sm:text-sm font-medium tracking-wide">
                                {item.label}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#D4A86A]/60 group-hover:text-[#D4A86A] group-hover:translate-x-0.5 transition-all duration-200" />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ═════════ CARD 2: CONNECT ═════════ */}
          <div className="rounded-2xl border border-[#BA8E4E]/30 bg-[#160307]/75 backdrop-blur-md overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-all">
            {/* Card Header (Accordion Button on Mobile) */}
            <button
              type="button"
              onClick={() => toggleSection('connect')}
              className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
              aria-expanded={openSections.connect}
            >
              <div className="flex items-center gap-2">
                <span className="text-[#D4A86A] text-xs">✦</span>
                <span className="font-serif text-xs sm:text-sm tracking-[0.2em] font-bold text-white uppercase">
                  CONNECT
                </span>
              </div>
              <motion.div
                animate={{ rotate: openSections.connect ? 0 : -90 }}
                transition={{ duration: 0.2 }}
                className="text-[#D4A86A]/80"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            {/* Card Body */}
            <AnimatePresence initial={false}>
              {openSections.connect && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pt-2 pb-5 flex flex-col items-center">
                    {/* Social Media Circular Buttons */}
                    <div className="flex items-center justify-center gap-3.5 my-2">
                      {/* LinkedIn */}
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Rootwills on LinkedIn"
                        className="group w-10 h-10 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 hover:ring-[#D4A86A] flex items-center justify-center text-[#EDE4D8]/85 hover:text-[#D4A86A] hover:bg-[#D4A86A]/15 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                      >
                        <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Rootwills on Instagram"
                        className="group w-10 h-10 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 hover:ring-[#D4A86A] flex items-center justify-center text-[#EDE4D8]/85 hover:text-[#D4A86A] hover:bg-[#D4A86A]/15 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                      >
                        <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
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
                        className="group w-10 h-10 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 hover:ring-[#D4A86A] flex items-center justify-center text-[#EDE4D8]/85 hover:text-[#D4A86A] hover:bg-[#D4A86A]/15 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                      >
                        <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    </div>

                    {/* Flanked Creed: QUALITY · CONSISTENCY · PARTNERSHIP (Matching Image 2) */}
                    <div className="w-full flex items-center justify-center gap-2.5 mt-3 pt-3.5 border-t border-[#BA8E4E]/15">
                      <span className="h-[1px] w-6 sm:w-8 bg-[#BA8E4E]/30" />
                      <span className="text-[8.5px] sm:text-[9.5px] font-serif tracking-[0.22em] uppercase text-[#D4A86A] font-bold text-center">
                        QUALITY · CONSISTENCY · PARTNERSHIP
                      </span>
                      <span className="h-[1px] w-6 sm:w-8 bg-[#BA8E4E]/30" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ═════════ CARD 3: GET IN TOUCH ═════════ */}
          <div className="rounded-2xl border border-[#BA8E4E]/30 bg-[#160307]/75 backdrop-blur-md overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-all">
            {/* Card Header (Accordion Button on Mobile) */}
            <button
              type="button"
              onClick={() => toggleSection('getInTouch')}
              className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
              aria-expanded={openSections.getInTouch}
            >
              <div className="flex items-center gap-2">
                <span className="text-[#D4A86A] text-xs">✦</span>
                <span className="font-serif text-xs sm:text-sm tracking-[0.2em] font-bold text-white uppercase">
                  GET IN TOUCH
                </span>
              </div>
              <motion.div
                animate={{ rotate: openSections.getInTouch ? 0 : -90 }}
                transition={{ duration: 0.2 }}
                className="text-[#D4A86A]/80"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            {/* Card Body */}
            <AnimatePresence initial={false}>
              {openSections.getInTouch && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pt-1 space-y-1">
                    {/* Phone Touchpoint */}
                    <div className="py-2.5">
                      <a
                        href="tel:+442012345678"
                        className="group flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 group-hover:scale-105 group-hover:ring-[#D4A86A]/70 group-hover:bg-[#D4A86A]/10 transition-all duration-300 shadow-2xs">
                          <Phone className="w-4 h-4 stroke-[1.75]" />
                        </div>
                        <span className="font-serif text-[13.5px] sm:text-sm font-medium tracking-wide">
                          +44 (0) 20 1234 5678
                        </span>
                      </a>
                    </div>

                    {/* Email Touchpoint */}
                    <div className="py-2.5 border-t border-[#BA8E4E]/12">
                      <a
                        href="mailto:info@rootwills.co.uk"
                        className="group flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 group-hover:scale-105 group-hover:ring-[#D4A86A]/70 group-hover:bg-[#D4A86A]/10 transition-all duration-300 shadow-2xs">
                          <Mail className="w-4 h-4 stroke-[1.75]" />
                        </div>
                        <span className="font-serif text-[13.5px] sm:text-sm font-medium tracking-wide">
                          info@rootwills.co.uk
                        </span>
                      </a>
                    </div>

                    {/* Address / Location Touchpoint */}
                    <div className="py-2.5 border-t border-[#BA8E4E]/12">
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 shadow-2xs">
                          <MapPin className="w-4 h-4 stroke-[1.75]" />
                        </div>
                        <span className="font-serif text-[13.5px] sm:text-sm font-medium tracking-wide">
                          London, United Kingdom
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* ─── Bottom Sub-Bar & Legal Links (Matching Image 2 Bottom) ─── */}
      <div className="relative z-10 border-t border-[#BA8E4E]/20 bg-[#0c0103]/90 backdrop-blur-md pt-5 pb-28 sm:pb-8 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-2.5">
          {/* Copyright Line */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#EDE4D8]/70 font-sans">
            <span>© {new Date().getFullYear()} Rootwills Ltd.</span>
            <span className="text-[#BA8E4E]/40">|</span>
            <span className="text-[#D4A86A]/90 font-serif">England &amp; Wales</span>
          </div>

          {/* Legal / Policy Links Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-[#EDE4D8]/75 font-sans">
            <Link href="/delivery" className="hover:text-[#D4A86A] transition-colors">
              Delivery SLAs
            </Link>
            <span className="text-[#BA8E4E]/40">·</span>
            <Link href="/locations" className="hover:text-[#D4A86A] transition-colors">
              Hubs &amp; Collections
            </Link>
            <span className="text-[#BA8E4E]/40">^</span>
            <Link href="/security" className="hover:text-[#D4A86A] transition-colors">
              HACCP
            </Link>
            <span className="text-[#BA8E4E]/40">·</span>
            <Link href="/privacy" className="hover:text-[#D4A86A] transition-colors">
              Privacy Policy
            </Link>
          </div>

          {/* Sub-row: Terms & Conditions and Back to Top with Flanked Lines */}
          <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#EDE4D8]/75 font-sans">
            <span className="h-[1px] w-6 sm:w-10 bg-[#BA8E4E]/30" />
            <Link href="/terms" className="hover:text-[#D4A86A] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-[#BA8E4E]/40">^</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-[#D4A86A] transition-colors flex items-center gap-0.5 group focus:outline-none"
            >
              <span>Back to Top</span>
              <span className="text-[#D4A86A] transition-transform duration-200 group-hover:-translate-y-0.5">↑</span>
            </button>
            <span className="h-[1px] w-6 sm:w-10 bg-[#BA8E4E]/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
