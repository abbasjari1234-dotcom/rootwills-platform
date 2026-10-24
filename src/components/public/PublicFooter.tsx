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
  Facebook, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

export function PublicFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'About Rootwills', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Delivery & Logistics', href: '/delivery' },
    { label: 'Why Choose Us', href: '/why-choose-us' },
    { label: 'Contact Us', href: '/#contact' },
  ];

  const sectorLinks = [
    { label: 'Fresh Produce', href: '/sectors' },
    { label: 'Artisan Dairy & Eggs', href: '/sectors' },
    { label: 'Prime Butchery', href: '/sectors' },
    { label: 'Coastal Seafood', href: '/sectors' },
    { label: 'Dry Stores & Pantry', href: '/sectors' },
  ];

  return (
    <footer id="footer" className="relative bg-[#1A0307] text-[#EDE4D8] overflow-hidden border-t border-[#BA8E4E]/35 z-20">
      
      {/* ─── 1. Continuous Royal Damask Background Texture ─── */}
      <div 
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-30 mix-blend-overlay"
        style={{ 
          backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')`,
          backgroundSize: '380px auto'
        }}
      />

      {/* ─── 2. Golden Ambient Top Glow & Depth Vignette ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_40%_at_50%_0%,rgba(186,142,78,0.18),transparent_75%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E0409]/70 via-[#180306]/85 to-[#120204]/98 pointer-events-none z-0" />

      {/* ─── 3. Top Architectural Gold Hairline Accent ─── */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8C28A]/50 to-transparent relative z-10" />

      {/* ─── 4. Main Architectural Content Container ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20 md:pb-8">
        
        {/* Top Tier: Balanced 4-Column Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-[#BA8E4E]/20">
          
          {/* Column 1: Brand Seal, Wordmark & Purveyor Provenance (Col 1-5 on LG) */}
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <Link href="/#home" className="inline-flex items-center gap-3.5 group focus:outline-none">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src="/images/branded/rootwills_logo_master.png"
                    alt="Rootwills Master Seal"
                    fill
                    sizes="48px"
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-chunky text-2xl sm:text-3xl font-black text-white tracking-wide transition-colors group-hover:text-[#D4A86A] leading-none">
                    Rootwills
                  </span>
                  <span className="block text-[8px] sm:text-[9px] font-sans font-bold tracking-[0.26em] uppercase text-[#D4A86A] mt-1 leading-none">
                    FOOD SERVICES &amp; WHOLESALE CO.
                  </span>
                </div>
              </Link>

              <p className="text-xs sm:text-[13px] text-[#EDE4D8]/75 font-sans leading-relaxed mt-3.5 max-w-sm">
                Purveyors of hand-graded British farm produce, artisan dairy, and culinary wholesale lines delivered pre-dawn to the UK&apos;s leading kitchens.
              </p>
            </div>

            {/* Operational Dispatch Badge Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#EDE4D8]/80 font-mono">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-[#BA8E4E]/30">
                <Clock className="w-3 h-3 text-[#D4A86A]" />
                <span>05:30 – 07:30 AM Drops</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-[#BA8E4E]/30">
                <ShieldCheck className="w-3 h-3 text-[#D4A86A]" />
                <span>SALSA Assured</span>
              </div>
            </div>
          </div>

          {/* Column 2: Supply Sectors (Col 6-7 on LG) */}
          <div className="lg:col-span-2">
            <span className="text-[10px] font-serif tracking-[0.25em] uppercase text-[#D4A86A] font-semibold block mb-3.5">
              — SECTORS —
            </span>
            <ul className="space-y-2 text-xs sm:text-[13px] font-serif">
              {sectorLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#EDE4D8]/75 hover:text-[#D4A86A] transition-colors duration-150 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation (Col 8-9 on LG) */}
          <div className="lg:col-span-2">
            <span className="text-[10px] font-serif tracking-[0.25em] uppercase text-[#D4A86A] font-semibold block mb-3.5">
              — COMPANY —
            </span>
            <ul className="space-y-2 text-xs sm:text-[13px] font-serif">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#EDE4D8]/75 hover:text-[#D4A86A] transition-colors duration-150 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Commercial Dispatch Desk & Socials (Col 10-12 on LG) */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-serif tracking-[0.25em] uppercase text-[#D4A86A] font-semibold block mb-3.5">
                — TRADE DESK —
              </span>
              
              <div className="space-y-2.5 text-xs sm:text-[13px] font-sans text-[#EDE4D8]/85">
                <a 
                  href="tel:+442012345678" 
                  className="flex items-center gap-2.5 hover:text-[#D4A86A] transition-colors group"
                >
                  <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-[#BA8E4E]/35 flex items-center justify-center shrink-0 text-[#D4A86A] group-hover:border-[#D4A86A]">
                    <Phone className="w-3 h-3" />
                  </div>
                  <span>+44 (0) 20 1234 5678</span>
                </a>

                <a 
                  href="mailto:info@rootwills.co.uk" 
                  className="flex items-center gap-2.5 hover:text-[#D4A86A] transition-colors group"
                >
                  <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-[#BA8E4E]/35 flex items-center justify-center shrink-0 text-[#D4A86A] group-hover:border-[#D4A86A]">
                    <Mail className="w-3 h-3" />
                  </div>
                  <span>info@rootwills.co.uk</span>
                </a>

                <div className="flex items-center gap-2.5 text-[#EDE4D8]/70">
                  <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-[#BA8E4E]/35 flex items-center justify-center shrink-0 text-[#D4A86A]">
                    <MapPin className="w-3 h-3" />
                  </div>
                  <span>London &amp; Midlands, UK</span>
                </div>
              </div>
            </div>

            {/* Social Media Micro-Bar */}
            <div className="pt-1">
              <span className="text-[9.5px] font-sans tracking-[0.18em] uppercase text-[#D4A86A]/80 font-semibold block mb-2">
                CONNECT
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rootwills on Facebook"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] border border-[#BA8E4E]/35 hover:border-[#D4A86A] hover:bg-[#D4A86A]/15 flex items-center justify-center text-[#EDE4D8]/80 hover:text-[#D4A86A] transition-[transform,background-color,color,border-color] duration-160 ease-out active:scale-95"
                >
                  <Facebook className="w-3.5 h-3.5 fill-current" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rootwills on X"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] border border-[#BA8E4E]/35 hover:border-[#D4A86A] hover:bg-[#D4A86A]/15 flex items-center justify-center text-[#EDE4D8]/80 hover:text-[#D4A86A] transition-[transform,background-color,color,border-color] duration-160 ease-out active:scale-95"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rootwills on Instagram"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] border border-[#BA8E4E]/35 hover:border-[#D4A86A] hover:bg-[#D4A86A]/15 flex items-center justify-center text-[#EDE4D8]/80 hover:text-[#D4A86A] transition-[transform,background-color,color,border-color] duration-160 ease-out active:scale-95"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rootwills on LinkedIn"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] border border-[#BA8E4E]/35 hover:border-[#D4A86A] hover:bg-[#D4A86A]/15 flex items-center justify-center text-[#EDE4D8]/80 hover:text-[#D4A86A] transition-[transform,background-color,color,border-color] duration-160 ease-out active:scale-95"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ─── Bottom Sub-Bar: Copyright, Legal & Back to Top ─── */}
        <div className="pt-6 sm:pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left text-[11px] font-sans text-[#EDE4D8]/65">
          <div>
            <span>© {new Date().getFullYear()} Rootwills Ltd. Registered in England &amp; Wales.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link href="/delivery" className="hover:text-[#D4A86A] transition-colors">
              Delivery SLAs
            </Link>
            <span className="text-[#BA8E4E]/30">•</span>
            <Link href="/privacy" className="hover:text-[#D4A86A] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#BA8E4E]/30">•</span>
            <Link href="/terms" className="hover:text-[#D4A86A] transition-colors">
              Terms of Supply
            </Link>
          </div>

          <div>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-[#BA8E4E]/25 hover:border-[#D4A86A]/60 text-[#EDE4D8]/80 hover:text-[#D4A86A] transition-[transform,color,border-color] duration-160 active:scale-95 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-[#D4A86A]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
