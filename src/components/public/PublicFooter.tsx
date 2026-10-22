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
  Clock,
  Truck
} from 'lucide-react';

export function PublicFooter() {
  // Mobile accordion state (expanded by default to match Image 2)
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
    <footer id="footer" className="bg-[#0e0204] text-white relative overflow-hidden">
      
      {/* ─── 1. London Westminster Twilight Skyline Background ─── */}
      {/* Mobile (< lg): Bespoke Cinematic Westminster Twilight Canvas (Matching Image 2) */}
      <div 
        className="lg:hidden absolute inset-0 z-0 bg-cover bg-top pointer-events-none opacity-90"
        style={{ backgroundImage: `url('/images/branded/london_skyline_mobile.jpg')` }}
      />
      <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#120204]/30 via-[#100204]/60 to-[#080102]/95 pointer-events-none z-0" />
      <div className="lg:hidden absolute inset-0 bg-gradient-to-r from-[#0e0204]/80 via-[#0e0204]/35 to-transparent pointer-events-none z-0" />

      {/* Desktop (>= lg): Bespoke Compact 1920x580 Panoramic Skyline Canvas with Big Ben, Parliament & Thames */}
      <div 
        className="hidden lg:block absolute inset-0 z-0 pointer-events-none bg-cover bg-right-bottom xl:bg-right opacity-95 transition-opacity duration-700"
        style={{ backgroundImage: `url('/images/branded/london_skyline_desktop_canvas.jpg')` }}
      />
      {/* Top subtle atmospheric feather */}
      <div className="hidden lg:block absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0e0204] via-[#0e0204]/60 to-transparent pointer-events-none z-0" />
      {/* Left feather for razor-sharp brand typography legibility */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-[#0e0204] via-[#0e0204]/85 to-transparent pointer-events-none z-0" />
      {/* Gentle base gradient into dock area */}
      <div className="hidden lg:block absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0102] via-[#0a0102]/60 to-transparent pointer-events-none z-0" />

      {/* ─── 2. Top Architectural Pill Badge (Matching Image 2 Top) ─── */}
      <div className="relative z-10 w-full pt-4 sm:pt-4 pb-1.5 flex items-center justify-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#180306]/80 border border-[#BA8E4E]/40 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.6)] max-w-[94vw]">
          <span className="text-[7.5px] sm:text-[8px] text-[#D4A86A]">✦</span>
          <span className="text-[8.5px] sm:text-[9px] uppercase tracking-[0.24em] sm:tracking-[0.26em] font-serif text-[#D4A86A] font-semibold truncate">
            ROOTWILLS LONDON · COMMERCIAL PURVEYORS
          </span>
          <span className="text-[7.5px] sm:text-[8px] text-[#D4A86A]">✦</span>
        </div>
      </div>

      {/* ─── Main Content Container ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-3">
        
        {/* DESKTOP ARCHITECTURE (lg and above): High-End 3-Column Luxury Purveyor Structure */}
        <div className="hidden lg:grid grid-cols-12 gap-6 items-stretch mb-3">
          
          {/* Column 1: Heritage Brand Pillar (5 Columns) */}
          <div className="col-span-5 flex flex-col justify-between pr-3">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {/* Medallion Heritage Seal */}
                <div className="relative w-12 h-12 shrink-0 drop-shadow-[0_6px_18px_rgba(0,0,0,0.85)]">
                  <Image
                    src="/images/branded/rootwills_logo_master.png"
                    alt="Rootwills Logo Seal"
                    fill
                    sizes="48px"
                    className="object-contain"
                    priority
                  />
                </div>
                
                {/* Brand Wordmark & Hierarchy */}
                <div className="flex flex-col">
                  <span className="font-serif font-black text-2xl tracking-wider text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    ROOTWILLS
                  </span>
                  <span className="text-[9.5px] font-serif tracking-[0.24em] uppercase text-[#D4A86A] font-bold mt-0.5 leading-none">
                    FOOD SERVICES &amp; WHOLESALE
                  </span>
                  <span className="text-[7.5px] font-sans tracking-[0.2em] text-[#EDE4D8]/65 uppercase mt-0.5 leading-none">
                    LONDON · ESTABLISHED TRADE PARTNER
                  </span>
                </div>
              </div>

              {/* Gold Hairline Divider */}
              <div className="w-full h-[1px] bg-gradient-to-r from-[#BA8E4E]/50 via-[#BA8E4E]/20 to-transparent my-2" />

              {/* Narrative Paragraph */}
              <p className="text-xs text-[#EDE4D8]/85 font-sans leading-relaxed mb-2.5 max-w-[46ch]">
                Supplying the UK hospitality industry, restaurants, and food professionals with chef-curated wholesale ingredients, guaranteed pre-dawn logistics, and locked trade pricing.
              </p>

              {/* Operational SLA Badges */}
              <div className="space-y-1.5 mb-2.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#140205]/60 border border-[#BA8E4E]/25 text-[11px] text-[#EDE4D8]/90 font-serif backdrop-blur-xs">
                  <Clock className="w-3 h-3 text-[#D4A86A]" />
                  <span>11:00 PM Post-Service Night Prior Order Cutoff</span>
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#140205]/60 border border-[#BA8E4E]/25 text-[11px] text-[#EDE4D8]/90 font-serif backdrop-blur-xs">
                  <Truck className="w-3 h-3 text-[#D4A86A]" />
                  <span>Guaranteed 05:30 – 07:30 AM Fleet Drops</span>
                </div>
              </div>
            </div>

            {/* Social Media & Commercial Creed (Tight, Single-Line Row) */}
            <div className="pt-2 border-t border-[#BA8E4E]/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-serif uppercase tracking-[0.16em] text-[#D4A86A] font-semibold">
                  Connect:
                </span>
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Rootwills on LinkedIn"
                    className="w-7 h-7 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 hover:ring-[#D4A86A] flex items-center justify-center text-[#EDE4D8] hover:text-[#D4A86A] hover:bg-[#D4A86A]/15 transition-all shadow-sm"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Rootwills on Instagram"
                    className="w-7 h-7 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 hover:ring-[#D4A86A] flex items-center justify-center text-[#EDE4D8] hover:text-[#D4A86A] hover:bg-[#D4A86A]/15 transition-all shadow-sm"
                  >
                    <svg className="w-3 h-3 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Rootwills on X"
                    className="w-7 h-7 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 hover:ring-[#D4A86A] flex items-center justify-center text-[#EDE4D8] hover:text-[#D4A86A] hover:bg-[#D4A86A]/15 transition-all shadow-sm"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <span className="text-[8.5px] font-serif tracking-[0.2em] uppercase text-[#D4A86A] font-bold">
                QUALITY · CONSISTENCY · PARTNERSHIP
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links Glass Panel (3 Columns) */}
          <div className="col-span-3 rounded-xl border border-[#BA8E4E]/30 bg-[#140205]/60 backdrop-blur-md overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(212,168,106,0.18)] p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-[#BA8E4E]/20">
                <span className="text-[#D4A86A] text-[10px]">✦</span>
                <span className="font-serif text-[11px] tracking-[0.18em] font-bold text-white uppercase">
                  QUICK LINKS
                </span>
              </div>
              <div className="space-y-0.5">
                {[
                  { label: 'Home', href: '/#home', icon: Home },
                  { label: 'About Us', href: '/#about', icon: User },
                  { label: 'Our Services', href: '/#services', icon: Settings },
                  { label: 'Our Approach', href: '/#approach', icon: Sprout },
                  { label: 'Reviews', href: '/#testimonials', icon: Star },
                ].map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.label} className={idx > 0 ? "border-t border-[#BA8E4E]/10" : ""}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between py-1 text-white/90 hover:text-white transition-all duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 group-hover:scale-105 group-hover:ring-[#D4A86A]/70 group-hover:bg-[#D4A86A]/10 transition-all shadow-2xs">
                            <IconComponent className="w-3 h-3 stroke-[1.75]" />
                          </div>
                          <span className="font-serif text-xs font-medium tracking-wide">
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-[#D4A86A]/50 group-hover:text-[#D4A86A] group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pt-2 border-t border-[#BA8E4E]/15 mt-1.5">
              <span className="text-[9.5px] font-serif text-[#D4A86A]/85 tracking-wider block">
                UK Foodservice Network &bull; 6-Day Delivery
              </span>
            </div>
          </div>

          {/* Column 3: Commercial Trade Desk Glass Panel (4 Columns) */}
          <div className="col-span-4 rounded-xl border border-[#BA8E4E]/30 bg-[#140205]/60 backdrop-blur-md overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(212,168,106,0.18)] p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-[#BA8E4E]/20">
                <span className="text-[#D4A86A] text-[10px]">✦</span>
                <span className="font-serif text-[11px] tracking-[0.18em] font-bold text-white uppercase">
                  GET IN TOUCH
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="py-1">
                  <a
                    href="tel:+442012345678"
                    className="group flex items-center gap-2.5 text-white/90 hover:text-white transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 group-hover:scale-105 group-hover:ring-[#D4A86A]/70 group-hover:bg-[#D4A86A]/10 transition-all shadow-2xs">
                      <Phone className="w-3 h-3 stroke-[1.75]" />
                    </div>
                    <div>
                      <span className="block text-[8px] font-serif uppercase tracking-[0.15em] text-[#D4A86A]/85 leading-none">
                        Direct Trade Desk
                      </span>
                      <span className="font-serif text-xs font-medium tracking-wide leading-tight">
                        +44 (0) 20 1234 5678
                      </span>
                    </div>
                  </a>
                </div>

                <div className="py-1 border-t border-[#BA8E4E]/10">
                  <a
                    href="mailto:info@rootwills.co.uk"
                    className="group flex items-center gap-2.5 text-white/90 hover:text-white transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 group-hover:scale-105 group-hover:ring-[#D4A86A]/70 group-hover:bg-[#D4A86A]/10 transition-all shadow-2xs">
                      <Mail className="w-3 h-3 stroke-[1.75]" />
                    </div>
                    <div>
                      <span className="block text-[8px] font-serif uppercase tracking-[0.15em] text-[#D4A86A]/85 leading-none">
                        Commercial Inquiries
                      </span>
                      <span className="font-serif text-xs font-medium tracking-wide leading-tight">
                        info@rootwills.co.uk
                      </span>
                    </div>
                  </a>
                </div>

                <div className="py-1 border-t border-[#BA8E4E]/10">
                  <div className="flex items-center gap-2.5 text-white/90">
                    <div className="w-6 h-6 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 shadow-2xs">
                      <MapPin className="w-3 h-3 stroke-[1.75]" />
                    </div>
                    <div>
                      <span className="block text-[8px] font-serif uppercase tracking-[0.15em] text-[#D4A86A]/85 leading-none">
                        Central Distribution
                      </span>
                      <span className="font-serif text-xs font-medium tracking-wide leading-tight">
                        London, United Kingdom
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#BA8E4E]/15 mt-1.5">
              <span className="text-[9.5px] font-serif text-[#D4A86A]/85 tracking-wider block">
                Dedicated Trade Support &bull; Mon–Sat 05:00–23:00
              </span>
            </div>
          </div>

        </div>

        {/* MOBILE ARCHITECTURE (< lg): Award-Winning Luxury Accordion Suite (Matching Image 2) */}
        <div className="lg:hidden flex flex-col space-y-3 mb-5">
          
          {/* Mobile Brand Header (Gorgeously Framed with Big Ben at Top Right) */}
          <div className="flex flex-col mb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-13 h-13 shrink-0 drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)]">
                <Image
                  src="/images/branded/rootwills_logo_master.png"
                  alt="Rootwills Logo Seal"
                  fill
                  sizes="52px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-2xl tracking-wider text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  ROOTWILLS
                </span>
                <span className="text-[9px] font-serif tracking-[0.26em] uppercase text-[#D4A86A] font-bold mt-0.5 leading-none">
                  FOOD SERVICES &amp; WHOLESALE
                </span>
                <span className="text-[7.5px] font-sans tracking-[0.2em] text-[#EDE4D8]/70 uppercase mt-0.5 leading-none">
                  LONDON · ESTABLISHED TRADE PARTNER
                </span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-[#BA8E4E]/50 via-[#BA8E4E]/20 to-transparent my-2" />

            <p className="text-xs text-[#EDE4D8]/85 font-sans leading-relaxed max-w-[42ch]">
              Supplying the UK hospitality industry, restaurants, and food professionals with chef-curated wholesale ingredients.
            </p>
          </div>

          {/* ═════════ MOBILE CARD 1: QUICK LINKS ═════════ */}
          <div className="rounded-2xl border border-[#BA8E4E]/30 bg-[#160307]/70 backdrop-blur-xl overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(212,168,106,0.2)]">
            <button
              type="button"
              onClick={() => toggleSection('quickLinks')}
              className="w-full px-4 py-3 flex items-center justify-between text-left focus:outline-none active:bg-white/[0.03] transition-colors"
              aria-expanded={openSections.quickLinks}
            >
              <div className="flex items-center gap-2">
                <span className="text-[#D4A86A] text-xs">✦</span>
                <span className="font-serif text-xs tracking-[0.2em] font-bold text-white uppercase">
                  QUICK LINKS
                </span>
              </div>
              <motion.div
                animate={{ rotate: openSections.quickLinks ? 0 : -90 }}
                transition={{ duration: 0.2 }}
                className="text-[#D4A86A]/85"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openSections.quickLinks && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-2 pt-0.5 space-y-0.5">
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
                            className="group flex items-center justify-between py-2 text-white/90 hover:text-white transition-all duration-200 active:scale-[0.98]"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/35 flex items-center justify-center text-[#D4A86A] shrink-0 shadow-2xs">
                                <IconComponent className="w-3.5 h-3.5 stroke-[1.75]" />
                              </div>
                              <span className="font-serif text-[13px] font-medium tracking-wide">
                                {item.label}
                              </span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-[#D4A86A]/60" />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ═════════ MOBILE CARD 2: CONNECT ═════════ */}
          <div className="rounded-2xl border border-[#BA8E4E]/30 bg-[#160307]/70 backdrop-blur-xl overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(212,168,106,0.2)]">
            <button
              type="button"
              onClick={() => toggleSection('connect')}
              className="w-full px-4 py-3 flex items-center justify-between text-left focus:outline-none active:bg-white/[0.03] transition-colors"
              aria-expanded={openSections.connect}
            >
              <div className="flex items-center gap-2">
                <span className="text-[#D4A86A] text-xs">✦</span>
                <span className="font-serif text-xs tracking-[0.2em] font-bold text-white uppercase">
                  CONNECT
                </span>
              </div>
              <motion.div
                animate={{ rotate: openSections.connect ? 0 : -90 }}
                transition={{ duration: 0.2 }}
                className="text-[#D4A86A]/85"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openSections.connect && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pt-1 pb-3.5 flex flex-col items-center">
                    <div className="flex items-center justify-center gap-3.5 my-1.5">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Rootwills on LinkedIn"
                        className="w-9 h-9 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 flex items-center justify-center text-[#EDE4D8] hover:text-[#D4A86A] transition-all shadow-sm active:scale-95"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Rootwills on Instagram"
                        className="w-9 h-9 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 flex items-center justify-center text-[#EDE4D8] hover:text-[#D4A86A] transition-all shadow-sm active:scale-95"
                      >
                        <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                        </svg>
                      </a>
                      <a
                        href="https://x.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Rootwills on X"
                        className="w-9 h-9 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 flex items-center justify-center text-[#EDE4D8] hover:text-[#D4A86A] transition-all shadow-sm active:scale-95"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    </div>

                    <div className="w-full flex items-center justify-center gap-2.5 mt-2.5 pt-2.5 border-t border-[#BA8E4E]/15">
                      <span className="h-[1px] w-5 bg-[#BA8E4E]/30" />
                      <span className="text-[8px] font-serif tracking-[0.22em] uppercase text-[#D4A86A] font-bold text-center">
                        QUALITY · CONSISTENCY · PARTNERSHIP
                      </span>
                      <span className="h-[1px] w-5 bg-[#BA8E4E]/30" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ═════════ MOBILE CARD 3: GET IN TOUCH ═════════ */}
          <div className="rounded-2xl border border-[#BA8E4E]/30 bg-[#160307]/70 backdrop-blur-xl overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(212,168,106,0.2)]">
            <button
              type="button"
              onClick={() => toggleSection('getInTouch')}
              className="w-full px-4 py-3 flex items-center justify-between text-left focus:outline-none active:bg-white/[0.03] transition-colors"
              aria-expanded={openSections.getInTouch}
            >
              <div className="flex items-center gap-2">
                <span className="text-[#D4A86A] text-xs">✦</span>
                <span className="font-serif text-xs tracking-[0.2em] font-bold text-white uppercase">
                  GET IN TOUCH
                </span>
              </div>
              <motion.div
                animate={{ rotate: openSections.getInTouch ? 0 : -90 }}
                transition={{ duration: 0.2 }}
                className="text-[#D4A86A]/85"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openSections.getInTouch && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-3 pt-0.5 space-y-0.5">
                    <div className="py-2">
                      <a
                        href="tel:+442012345678"
                        className="group flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                      >
                        <div className="w-7 h-7 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/35 flex items-center justify-center text-[#D4A86A] shrink-0 shadow-2xs">
                          <Phone className="w-3.5 h-3.5 stroke-[1.75]" />
                        </div>
                        <span className="font-serif text-[13px] font-medium tracking-wide">
                          +44 (0) 20 1234 5678
                        </span>
                      </a>
                    </div>

                    <div className="py-2 border-t border-[#BA8E4E]/12">
                      <a
                        href="mailto:info@rootwills.co.uk"
                        className="group flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                      >
                        <div className="w-7 h-7 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/35 flex items-center justify-center text-[#D4A86A] shrink-0 shadow-2xs">
                          <Mail className="w-3.5 h-3.5 stroke-[1.75]" />
                        </div>
                        <span className="font-serif text-[13px] font-medium tracking-wide">
                          info@rootwills.co.uk
                        </span>
                      </a>
                    </div>

                    <div className="py-2 border-t border-[#BA8E4E]/12">
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="w-7 h-7 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/35 flex items-center justify-center text-[#D4A86A] shrink-0 shadow-2xs">
                          <MapPin className="w-3.5 h-3.5 stroke-[1.75]" />
                        </div>
                        <span className="font-serif text-[13px] font-medium tracking-wide">
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

      {/* ─── 3. Bottom Sub-Bar & Legal Links (Compact & Dock-Aligned) ─── */}
      <div className="relative z-10 border-t border-[#BA8E4E]/20 bg-gradient-to-b from-transparent via-[#0a0102]/60 to-[#0a0102]/95 pt-2.5 pb-24 sm:pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-1.5">
          {/* Copyright Line */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#EDE4D8]/70 font-sans">
            <span>© {new Date().getFullYear()} Rootwills Ltd.</span>
            <span className="text-[#BA8E4E]/40">|</span>
            <span className="text-[#D4A86A]/90 font-serif">England &amp; Wales</span>
          </div>

          {/* Legal / Policy Links Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 text-[11px] text-[#EDE4D8]/75 font-sans">
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
          <div className="flex items-center justify-center gap-2 pt-0.5 text-[11px] text-[#EDE4D8]/75 font-sans">
            <span className="h-[1px] w-8 sm:w-12 bg-[#BA8E4E]/30" />
            <Link href="/terms" className="hover:text-[#D4A86A] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-[#BA8E4E]/40">^</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-[#D4A86A] transition-colors flex items-center gap-1 group focus:outline-none cursor-pointer"
            >
              <span>Back to Top</span>
              <span className="text-[#D4A86A] transition-transform duration-200 group-hover:-translate-y-0.5">↑</span>
            </button>
            <span className="h-[1px] w-8 sm:w-12 bg-[#BA8E4E]/30" />
          </div>
        </div>
      </div>

    </footer>
  );
}
