'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp,
  Instagram,
  Linkedin,
  Facebook
} from 'lucide-react';

export function PublicFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'About Us', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Sectors', href: '/sectors' },
    { label: 'Delivery', href: '/delivery' },
    { label: 'Why Us', href: '/why-choose-us' },
    { label: 'Contact Us', href: '/#contact' },
  ];

  return (
    <footer id="footer" className="bg-[#0a0102] text-white relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5">
        
        {/* ═══════════════ CARD 1: MAIN FLOATING DOCK CARD (Inspired by slothUI) ═══════════════ */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#120205]/95 border border-[#BA8E4E]/25 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(212,168,106,0.15)] backdrop-blur-xl px-6 py-8 sm:px-10 sm:py-10 text-center flex flex-col items-center">
          
          {/* 1. Centered Brand Identity */}
          <div className="flex flex-col items-center gap-2.5 mb-5 sm:mb-6">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 drop-shadow-[0_6px_18px_rgba(0,0,0,0.85)]">
              <Image
                src="/images/branded/rootwills_logo_master.png"
                alt="Rootwills Logo Seal"
                fill
                sizes="56px"
                className="object-contain"
                priority
              />
            </div>
            
            <div className="flex flex-col items-center">
              <span className="font-serif font-black text-2xl sm:text-3xl tracking-widest text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                ROOTWILLS
              </span>
              <span className="text-[9px] sm:text-[10px] font-serif tracking-[0.26em] uppercase text-[#D4A86A] font-semibold mt-0.5">
                FOOD SERVICES &amp; WHOLESALE · LONDON
              </span>
            </div>
          </div>

          {/* 2. Horizontal Navigation Row */}
          <nav 
            aria-label="Footer Navigation" 
            className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-2 mb-5 sm:mb-6 text-xs sm:text-[13.5px] font-serif text-[#EDE4D8]/80"
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-[#D4A86A] hover:underline underline-offset-4 decoration-[#BA8E4E]/40 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 3. Subtle Commercial Contact & Logistics Micro-Strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-[11px] sm:text-xs text-[#EDE4D8]/65 font-sans mb-5 sm:mb-6 pt-3 sm:pt-4 border-t border-[#BA8E4E]/15 w-full max-w-xl">
            <a 
              href="tel:+442012345678" 
              className="flex items-center gap-1.5 hover:text-[#D4A86A] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D4A86A]" />
              <span>+44 (0) 20 1234 5678</span>
            </a>
            <span className="text-[#BA8E4E]/30 hidden sm:inline">•</span>
            <a 
              href="mailto:info@rootwills.co.uk" 
              className="flex items-center gap-1.5 hover:text-[#D4A86A] transition-colors"
            >
              <Mail className="w-3 h-3 text-[#D4A86A]" />
              <span>info@rootwills.co.uk</span>
            </a>
            <span className="text-[#BA8E4E]/30 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-[#EDE4D8]/65">
              <MapPin className="w-3 h-3 text-[#D4A86A]" />
              <span>London, United Kingdom</span>
            </div>
          </div>

          {/* 4. Social Media Icon Row (Centered, matching slothUI) */}
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Rootwills on Facebook"
              className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 hover:ring-[#D4A86A] hover:bg-[#D4A86A]/15 flex items-center justify-center text-[#EDE4D8]/80 hover:text-[#D4A86A] transition-all duration-200"
            >
              <Facebook className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Rootwills on X"
              className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 hover:ring-[#D4A86A] hover:bg-[#D4A86A]/15 flex items-center justify-center text-[#EDE4D8]/80 hover:text-[#D4A86A] transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Rootwills on Instagram"
              className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 hover:ring-[#D4A86A] hover:bg-[#D4A86A]/15 flex items-center justify-center text-[#EDE4D8]/80 hover:text-[#D4A86A] transition-all duration-200"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Rootwills on LinkedIn"
              className="w-8 h-8 rounded-full bg-white/[0.04] ring-1 ring-[#D4A86A]/30 hover:ring-[#D4A86A] hover:bg-[#D4A86A]/15 flex items-center justify-center text-[#EDE4D8]/80 hover:text-[#D4A86A] transition-all duration-200"
            >
              <Linkedin className="w-4 h-4 fill-current" />
            </a>
          </div>

        </div>

        {/* ═══════════════ CARD 2: BOTTOM BAR / SUB-DOCK (Matching slothUI Bottom Strip) ═══════════════ */}
        <div className="relative rounded-2xl bg-[#120205]/95 border border-[#BA8E4E]/25 shadow-[0_10px_30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(212,168,106,0.15)] backdrop-blur-xl px-5 sm:px-8 py-3.5 sm:py-4">
          
          {/* Top Hairline Accent (As shown in slothUI reference) */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#BA8E4E]/30 to-transparent mb-3 sm:mb-3.5" />

          {/* 3-Part Row: Left Logo | Center Copyright & Legal | Right Socials & Back-to-Top */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
            
            {/* Left: Brand Seal + Name */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-6 h-6 shrink-0">
                <Image
                  src="/images/branded/rootwills_logo_master.png"
                  alt="Rootwills Small Seal"
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </div>
              <span className="font-serif font-bold text-sm tracking-widest text-white">
                ROOTWILLS
              </span>
            </div>

            {/* Center: Copyright & Legal */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[11px] text-[#EDE4D8]/70 font-sans">
              <span>Copyright {new Date().getFullYear()} © Rootwills Ltd.</span>
              <span className="text-[#BA8E4E]/40">•</span>
              <span className="text-[#D4A86A]/90 font-serif">England &amp; Wales</span>
              <span className="text-[#BA8E4E]/40 hidden md:inline">•</span>
              <Link href="/delivery" className="hover:text-[#D4A86A] transition-colors hidden md:inline">
                Delivery SLAs
              </Link>
              <span className="text-[#BA8E4E]/40 hidden md:inline">•</span>
              <Link href="/privacy" className="hover:text-[#D4A86A] transition-colors hidden md:inline">
                Privacy Policy
              </Link>
              <span className="text-[#BA8E4E]/40 hidden md:inline">•</span>
              <Link href="/terms" className="hover:text-[#D4A86A] transition-colors hidden md:inline">
                Terms
              </Link>
            </div>

            {/* Right: Quick Back to Top */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="text-[11px] font-sans text-[#EDE4D8]/80 hover:text-[#D4A86A] flex items-center gap-1 transition-colors px-2.5 py-1 rounded-full bg-white/[0.03] ring-1 ring-[#BA8E4E]/25 hover:ring-[#D4A86A]/50 cursor-pointer"
              >
                <span>Top</span>
                <ArrowUp className="w-3 h-3 text-[#D4A86A]" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Extra bottom padding reserve so the fixed floating bottom nav (FloatingBottomNav.tsx) never obscures the cards */}
      <div className="h-12 sm:h-16" />
    </footer>
  );
}
