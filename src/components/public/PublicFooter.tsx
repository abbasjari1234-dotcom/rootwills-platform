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
  Truck,
  ShieldCheck
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
    <footer id="footer" className="bg-[#100204] text-white relative overflow-hidden">
      
      {/* ─── 1. London Westminster Twilight Skyline (Image 3) ─── */}
      {/* Mobile: Full-bleed background with atmospheric crimson blend */}
      <div 
        className="lg:hidden absolute inset-0 z-0 bg-cover bg-[right_top] pointer-events-none opacity-65"
        style={{ backgroundImage: `url('/images/branded/london_night_skyline.jpg')` }}
      />
      <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#140205]/75 via-[#120204]/88 to-[#0a0102] pointer-events-none z-0" />
      <div className="lg:hidden absolute inset-0 bg-gradient-to-r from-[#120204]/90 via-[#120204]/60 to-transparent pointer-events-none z-0" />

      {/* Desktop: Prominently featured on the right side with panoramic view of Big Ben */}
      <div className="hidden lg:block absolute top-0 right-0 w-[52%] xl:w-[48%] h-full z-0 pointer-events-none overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-[center_top] opacity-90"
          style={{ backgroundImage: `url('/images/branded/london_night_skyline.jpg')` }}
        />
        {/* Left edge feathered blend into obsidian burgundy */}
        <div className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#100204] via-[#100204]/70 to-transparent" />
        {/* Bottom edge feathered blend into footer base */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#100204] via-[#100204]/85 to-transparent" />
        {/* Top edge subtle vignette */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#100204]/60 to-transparent" />
      </div>

      {/* ─── 2. Top Architectural Pill Badge (Matching Image 2 Top) ─── */}
      <div className="relative z-10 w-full pt-5 sm:pt-7 pb-2 flex items-center justify-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#1A0307]/85 border border-[#BA8E4E]/45 backdrop-blur-sm shadow-md max-w-[94vw]">
          <span className="text-[8px] sm:text-[9px] text-[#BA8E4E]">✦</span>
          <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.22em] sm:tracking-[0.26em] font-serif text-[#D4A86A] font-semibold truncate">
            ROOTWILLS LONDON · COMMERCIAL PURVEYORS
          </span>
          <span className="text-[8px] sm:text-[9px] text-[#BA8E4E]">✦</span>
        </div>
      </div>

      {/* ─── Main Footer Content Container ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16">
        
        {/* DESKTOP VIEW (lg and above): Asymmetric Balanced Layout with Skyline Feature */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start mb-8">
          
          {/* Left Column: Brand Pillar (5 Columns) */}
          <div className="col-span-5 flex flex-col pr-4">
            <div className="flex items-center gap-3.5 mb-2">
              {/* Medallion Heritage Seal */}
              <div className="relative w-16 h-16 shrink-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)]">
                <Image
                  src="/images/branded/rootwills_logo_master.png"
                  alt="Rootwills Logo Seal"
                  fill
                  sizes="64px"
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* Brand Wordmark & Hierarchy */}
              <div className="flex flex-col">
                <span className="font-serif font-black text-3xl tracking-wider text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  ROOTWILLS
                </span>
                <span className="text-[10.5px] font-serif tracking-[0.26em] uppercase text-[#D4A86A] font-bold mt-0.5 leading-none">
                  FOOD SERVICES &amp; WHOLESALE
                </span>
                <span className="text-[8.5px] font-sans tracking-[0.22em] text-[#EDE4D8]/65 uppercase mt-1 leading-none">
                  LONDON · ESTABLISHED TRADE PARTNER
                </span>
              </div>
            </div>

            {/* Gold Hairline Divider */}
            <div className="w-full h-[1px] bg-gradient-to-r from-[#BA8E4E]/45 via-[#BA8E4E]/20 to-transparent my-3.5" />

            {/* Narrative Paragraph */}
            <p className="text-[13.5px] text-[#EDE4D8]/85 font-sans leading-relaxed mb-5">
              Supplying the UK hospitality industry, restaurants, and food professionals with chef-curated wholesale ingredients, guaranteed pre-dawn logistics, and locked trade pricing.
            </p>

            {/* Operational SLA Badges */}
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-[#BA8E4E]/25 text-xs text-[#EDE4D8]/90 font-serif">
                <Clock className="w-3.5 h-3.5 text-[#D4A86A]" />
                <span>11:00 PM Post-Service Night Prior Order Cutoff</span>
              </div>
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-[#BA8E4E]/25 text-xs text-[#EDE4D8]/90 font-serif">
                <Truck className="w-3.5 h-3.5 text-[#D4A86A]" />
                <span>Guaranteed 05:30 – 07:30 AM Fleet Drops</span>
              </div>
            </div>

            {/* Social Media & Commercial Creed */}
            <div className="pt-4 border-t border-[#BA8E4E]/20 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-serif uppercase tracking-[0.18em] text-[#D4A86A] font-semibold">
                  Connect:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Rootwills on LinkedIn"
                    className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 hover:ring-[#D4A86A] flex items-center justify-center text-[#EDE4D8] hover:text-[#D4A86A] hover:bg-[#D4A86A]/15 transition-all shadow-sm"
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
                    className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 hover:ring-[#D4A86A] flex items-center justify-center text-[#EDE4D8] hover:text-[#D4A86A] hover:bg-[#D4A86A]/15 transition-all shadow-sm"
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
                    className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 hover:ring-[#D4A86A] flex items-center justify-center text-[#EDE4D8] hover:text-[#D4A86A] hover:bg-[#D4A86A]/15 transition-all shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <span className="text-[9.5px] font-serif tracking-[0.24em] uppercase text-[#D4A86A] font-bold">
                QUALITY · CONSISTENCY · PARTNERSHIP
              </span>
            </div>
          </div>

          {/* Right Column: 2 Balanced Luxury Cards (7 Columns) */}
          <div className="col-span-7 grid grid-cols-2 gap-5">
            
            {/* Desktop Card A: QUICK LINKS */}
            <div className="rounded-2xl border border-[#BA8E4E]/30 bg-[#160307]/80 backdrop-blur-md overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.55)] p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[#BA8E4E]/20">
                  <span className="text-[#D4A86A] text-xs">✦</span>
                  <span className="font-serif text-xs tracking-[0.2em] font-bold text-white uppercase">
                    QUICK LINKS
                  </span>
                </div>
                <div className="space-y-1">
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
                          className="group flex items-center justify-between py-2 text-white/90 hover:text-white transition-all duration-200"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 group-hover:scale-105 group-hover:ring-[#D4A86A]/70 group-hover:bg-[#D4A86A]/10 transition-all shadow-2xs">
                              <IconComponent className="w-3.5 h-3.5 stroke-[1.75]" />
                            </div>
                            <span className="font-serif text-xs font-medium tracking-wide">
                              {item.label}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#D4A86A]/50 group-hover:text-[#D4A86A] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="pt-3 border-t border-[#BA8E4E]/15 mt-2">
                <span className="text-[10px] font-serif text-[#D4A86A]/80 tracking-wider">
                  UK Foodservice Network &bull; 6-Day Delivery
                </span>
              </div>
            </div>

            {/* Desktop Card B: GET IN TOUCH */}
            <div className="rounded-2xl border border-[#BA8E4E]/30 bg-[#160307]/80 backdrop-blur-md overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.55)] p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[#BA8E4E]/20">
                  <span className="text-[#D4A86A] text-xs">✦</span>
                  <span className="font-serif text-xs tracking-[0.2em] font-bold text-white uppercase">
                    GET IN TOUCH
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="py-2">
                    <a
                      href="tel:+442012345678"
                      className="group flex items-center gap-2.5 text-white/90 hover:text-white transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 group-hover:scale-105 group-hover:ring-[#D4A86A]/70 group-hover:bg-[#D4A86A]/10 transition-all shadow-2xs">
                        <Phone className="w-3.5 h-3.5 stroke-[1.75]" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-serif uppercase tracking-[0.15em] text-[#D4A86A]/85">
                          Direct Trade Desk
                        </span>
                        <span className="font-serif text-xs font-medium tracking-wide">
                          +44 (0) 20 1234 5678
                        </span>
                      </div>
                    </a>
                  </div>

                  <div className="py-2 border-t border-[#BA8E4E]/10">
                    <a
                      href="mailto:info@rootwills.co.uk"
                      className="group flex items-center gap-2.5 text-white/90 hover:text-white transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 group-hover:scale-105 group-hover:ring-[#D4A86A]/70 group-hover:bg-[#D4A86A]/10 transition-all shadow-2xs">
                        <Mail className="w-3.5 h-3.5 stroke-[1.75]" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-serif uppercase tracking-[0.15em] text-[#D4A86A]/85">
                          Commercial Inquiries
                        </span>
                        <span className="font-serif text-xs font-medium tracking-wide">
                          info@rootwills.co.uk
                        </span>
                      </div>
                    </a>
                  </div>

                  <div className="py-2 border-t border-[#BA8E4E]/10">
                    <div className="flex items-center gap-2.5 text-white/90">
                      <div className="w-7 h-7 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 shadow-2xs">
                        <MapPin className="w-3.5 h-3.5 stroke-[1.75]" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-serif uppercase tracking-[0.15em] text-[#D4A86A]/85">
                          Central Distribution
                        </span>
                        <span className="font-serif text-xs font-medium tracking-wide">
                          London, United Kingdom
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* B2B Onboarding Facility CTA */}
              <div className="pt-3 border-t border-[#BA8E4E]/15 mt-2">
                <Link
                  href="/#contact"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#BA8E4E]/15 hover:bg-[#BA8E4E]/25 border border-[#BA8E4E]/40 text-[#D4A86A] text-xs font-serif font-semibold tracking-wider transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Open 30-Day Trade Account</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* MOBILE VIEW (< lg): Exact 3-Card Accordion Suite (Matching Image 2) */}
        <div className="lg:hidden flex flex-col space-y-4 mb-8">
          
          {/* Mobile Brand Header */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-14 h-14 shrink-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)]">
                <Image
                  src="/images/branded/rootwills_logo_master.png"
                  alt="Rootwills Logo Seal"
                  fill
                  sizes="56px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-2xl tracking-wider text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  ROOTWILLS
                </span>
                <span className="text-[9.5px] font-serif tracking-[0.26em] uppercase text-[#D4A86A] font-bold mt-0.5 leading-none">
                  FOOD SERVICES &amp; WHOLESALE
                </span>
                <span className="text-[8px] font-sans tracking-[0.22em] text-[#EDE4D8]/65 uppercase mt-1 leading-none">
                  LONDON · ESTABLISHED TRADE PARTNER
                </span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-[#BA8E4E]/45 via-[#BA8E4E]/20 to-transparent my-2.5" />

            <p className="text-xs text-[#EDE4D8]/85 font-sans leading-relaxed">
              Supplying the UK hospitality industry, restaurants, and food professionals with chef-curated wholesale ingredients.
            </p>
          </div>

          {/* ═════════ MOBILE CARD 1: QUICK LINKS ═════════ */}
          <div className="rounded-2xl border border-[#BA8E4E]/30 bg-[#160307]/75 backdrop-blur-md overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
            <button
              type="button"
              onClick={() => toggleSection('quickLinks')}
              className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
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
                className="text-[#D4A86A]/80"
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
                              <div className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 shadow-2xs">
                                <IconComponent className="w-4 h-4 stroke-[1.75]" />
                              </div>
                              <span className="font-serif text-[13.5px] font-medium tracking-wide">
                                {item.label}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#D4A86A]/60" />
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
          <div className="rounded-2xl border border-[#BA8E4E]/30 bg-[#160307]/75 backdrop-blur-md overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
            <button
              type="button"
              onClick={() => toggleSection('connect')}
              className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
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
                className="text-[#D4A86A]/80"
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
                  <div className="px-5 pt-2 pb-5 flex flex-col items-center">
                    <div className="flex items-center justify-center gap-3.5 my-2">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Rootwills on LinkedIn"
                        className="w-10 h-10 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 flex items-center justify-center text-[#EDE4D8] hover:text-[#D4A86A] transition-all shadow-sm"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Rootwills on Instagram"
                        className="w-10 h-10 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 flex items-center justify-center text-[#EDE4D8] hover:text-[#D4A86A] transition-all shadow-sm"
                      >
                        <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
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
                        className="w-10 h-10 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/40 flex items-center justify-center text-[#EDE4D8] hover:text-[#D4A86A] transition-all shadow-sm"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    </div>

                    <div className="w-full flex items-center justify-center gap-2.5 mt-3 pt-3.5 border-t border-[#BA8E4E]/15">
                      <span className="h-[1px] w-6 bg-[#BA8E4E]/30" />
                      <span className="text-[8.5px] font-serif tracking-[0.22em] uppercase text-[#D4A86A] font-bold text-center">
                        QUALITY · CONSISTENCY · PARTNERSHIP
                      </span>
                      <span className="h-[1px] w-6 bg-[#BA8E4E]/30" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ═════════ MOBILE CARD 3: GET IN TOUCH ═════════ */}
          <div className="rounded-2xl border border-[#BA8E4E]/30 bg-[#160307]/75 backdrop-blur-md overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
            <button
              type="button"
              onClick={() => toggleSection('getInTouch')}
              className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
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
                className="text-[#D4A86A]/80"
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
                  <div className="px-5 pb-4 pt-1 space-y-1">
                    <div className="py-2.5">
                      <a
                        href="tel:+442012345678"
                        className="group flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 shadow-2xs">
                          <Phone className="w-4 h-4 stroke-[1.75]" />
                        </div>
                        <span className="font-serif text-[13.5px] font-medium tracking-wide">
                          +44 (0) 20 1234 5678
                        </span>
                      </a>
                    </div>

                    <div className="py-2.5 border-t border-[#BA8E4E]/12">
                      <a
                        href="mailto:info@rootwills.co.uk"
                        className="group flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 shadow-2xs">
                          <Mail className="w-4 h-4 stroke-[1.75]" />
                        </div>
                        <span className="font-serif text-[13.5px] font-medium tracking-wide">
                          info@rootwills.co.uk
                        </span>
                      </a>
                    </div>

                    <div className="py-2.5 border-t border-[#BA8E4E]/12">
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] shrink-0 shadow-2xs">
                          <MapPin className="w-4 h-4 stroke-[1.75]" />
                        </div>
                        <span className="font-serif text-[13.5px] font-medium tracking-wide">
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

      {/* ─── 3. Bottom Sub-Bar & Legal Links ─── */}
      {/* Generous bottom padding (pb-36 sm:pb-40) guarantees zero collision with the floating dock! */}
      <div className="relative z-10 border-t border-[#BA8E4E]/20 bg-[#0a0102]/92 backdrop-blur-md pt-6 pb-36 sm:pb-40 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-2.5">
          {/* Copyright Line */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#EDE4D8]/70 font-sans">
            <span>© {new Date().getFullYear()} Rootwills Ltd.</span>
            <span className="text-[#BA8E4E]/40">|</span>
            <span className="text-[#D4A86A]/90 font-serif">England &amp; Wales</span>
          </div>

          {/* Legal / Policy Links Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#EDE4D8]/75 font-sans">
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
          <div className="flex items-center justify-center gap-2 pt-1 text-xs text-[#EDE4D8]/75 font-sans">
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
