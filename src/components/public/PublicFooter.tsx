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
    { label: 'About Rootwills', href: '/about' },
    { label: 'Wholesale Services', href: '/#services' },
    { label: 'Our Approach', href: '/#approach' },
    { label: 'Supply Terms & SLAs', href: '/terms' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const sectorLinks = [
    { label: 'Class 1 Fresh Produce', href: '/#services' },
    { label: 'Artisan Dairy & Eggs', href: '/#services' },
    { label: 'Prime British Butchery', href: '/#services' },
    { label: 'Day-Boat Coastal Catch', href: '/#services' },
    { label: 'Larder & Bulk Dry Stores', href: '/#services' },
  ];

  return (
    <footer id="footer" className="relative bg-[#28040B] text-white overflow-hidden border-t border-[#BA8E4E]/60 z-20">
      
      {/* ─── 1. Vibrant Royal Burgundy Velvet Damask Background ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/textures/burgundy_damask_texture.jpg"
          alt="Royal Burgundy Damask Background"
          fill
          priority
          unoptimized
          className="object-cover object-center opacity-100 contrast-125 saturate-160"
        />
        {/* Luminous Crimson Depth & Ambient Vignette (Keeps Red Rich & Saturated) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B040C]/35 via-[#3D0610]/15 to-[#160205]/65 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_35%_at_50%_0%,rgba(243,208,138,0.20),transparent_75%)] pointer-events-none" />
      </div>

      {/* ─── 2. Top Architectural Gold Hairline Accent ─── */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#F3D08A] to-transparent relative z-10 shadow-[0_0_14px_rgba(243,208,138,0.6)]" />

      {/* ─── 3. Main Architectural Content Container ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20 md:pb-8">
        
        {/* Top Tier: Balanced 4-Column Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-[#F3D08A]/25">
          
          {/* Column 1: Brand Seal, Wordmark & Purveyor Provenance (Col 1-5 on LG) */}
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <Link href="/#home" className="inline-flex items-center gap-3.5 group focus:outline-none apple-tactile transition-transform duration-100 ease-out active:scale-95">
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
                  <span className="font-chunky text-2xl sm:text-3xl font-black text-white tracking-[-0.02em] transition-colors group-hover:text-[#F3D08A] leading-[0.95] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    Rootwills
                  </span>
                  <span className="block text-[8px] sm:text-[9.5px] font-mono font-bold tracking-[0.26em] uppercase text-[#F3D08A] mt-1 leading-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    FOOD SERVICES &amp; WHOLESALE CO.
                  </span>
                </div>
              </Link>

              <p className="text-xs sm:text-[13.5px] text-white font-sans leading-relaxed mt-3.5 max-w-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-normal">
                Purveyors of hand-graded British farm produce, artisan dairy, and culinary wholesale lines delivered pre-dawn to the UK&apos;s leading kitchens.
              </p>
            </div>

            {/* Operational Dispatch Badge Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-white font-mono">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#180205]/85 backdrop-blur-md border border-[#F3D08A]/60 apple-tactile active:scale-95 transition-transform duration-100 shadow-[0_3px_10px_rgba(0,0,0,0.5)]">
                <Clock className="w-3.5 h-3.5 text-[#F3D08A]" />
                <span className="font-semibold">05:30 – 07:30 AM Drops</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#180205]/85 backdrop-blur-md border border-[#F3D08A]/60 apple-tactile active:scale-95 transition-transform duration-100 shadow-[0_3px_10px_rgba(0,0,0,0.5)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F3D08A]" />
                <span className="font-semibold">SALSA Assured</span>
              </div>
            </div>
          </div>

          {/* Column 2: Supply Sectors (Col 6-7 on LG) */}
          <div className="lg:col-span-2">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#F3D08A] font-bold block mb-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              — SECTORS —
            </span>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-sans">
              {sectorLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-[#F3D08A] font-normal transition-all duration-100 inline-block apple-tactile active:scale-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation (Col 8-9 on LG) */}
          <div className="lg:col-span-2">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#F3D08A] font-bold block mb-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              — COMPANY —
            </span>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-sans">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-[#F3D08A] font-normal transition-all duration-100 inline-block apple-tactile active:scale-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
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
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#F3D08A] font-bold block mb-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                — TRADE DESK —
              </span>
              
              <div className="space-y-2.5 text-xs sm:text-[13px] font-sans text-white">
                <a 
                  href="tel:+442012345678" 
                  className="flex items-center gap-2.5 hover:text-[#F3D08A] transition-colors group font-medium"
                >
                  <div className="w-6 h-6 rounded-full bg-[#F3D08A]/20 border border-[#F3D08A]/70 flex items-center justify-center shrink-0 text-[#F3D08A] group-hover:border-[#F3D08A] shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    <Phone className="w-3 h-3" />
                  </div>
                  <span>+44 (0) 20 1234 5678</span>
                </a>

                <a 
                  href="mailto:info@rootwills.co.uk" 
                  className="flex items-center gap-2.5 hover:text-[#F3D08A] transition-colors group font-medium"
                >
                  <div className="w-6 h-6 rounded-full bg-[#F3D08A]/20 border border-[#F3D08A]/70 flex items-center justify-center shrink-0 text-[#F3D08A] group-hover:border-[#F3D08A] shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    <Mail className="w-3 h-3" />
                  </div>
                  <span>info@rootwills.co.uk</span>
                </a>

                <div className="flex items-start gap-2.5 text-white/95 leading-relaxed">
                  <div className="w-6 h-6 rounded-full bg-[#F3D08A]/20 border border-[#F3D08A]/70 flex items-center justify-center shrink-0 text-[#F3D08A] mt-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    <MapPin className="w-3 h-3" />
                  </div>
                  <span>The Hub, Nobel Wy, Birmingham B6 7EU, United Kingdom</span>
                </div>
              </div>
            </div>

            {/* Social Media Micro-Bar */}
            <div className="pt-1">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#F3D08A] font-bold block mb-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                CONNECT
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rootwills on Facebook"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#180205]/85 border border-[#F3D08A]/60 hover:border-[#F3D08A] hover:bg-[#F3D08A] flex items-center justify-center text-white hover:text-[#180205] apple-tactile active:scale-90 transition-all duration-150 shadow-md"
                >
                  <Facebook className="w-3.5 h-3.5 fill-current" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rootwills on X"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#180205]/85 border border-[#F3D08A]/60 hover:border-[#F3D08A] hover:bg-[#F3D08A] flex items-center justify-center text-white hover:text-[#180205] apple-tactile active:scale-90 transition-all duration-150 shadow-md"
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
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#180205]/85 border border-[#F3D08A]/60 hover:border-[#F3D08A] hover:bg-[#F3D08A] flex items-center justify-center text-white hover:text-[#180205] apple-tactile active:scale-90 transition-all duration-150 shadow-md"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rootwills on LinkedIn"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#180205]/85 border border-[#F3D08A]/60 hover:border-[#F3D08A] hover:bg-[#F3D08A] flex items-center justify-center text-white hover:text-[#180205] apple-tactile active:scale-90 transition-all duration-150 shadow-md"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ─── Bottom Sub-Bar: Copyright, Legal & Back to Top ─── */}
        <div className="pt-6 sm:pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left text-[11.5px] font-sans text-white/95">
          <div>
            <span>© {new Date().getFullYear()} Rootwills Ltd. Registered in England &amp; Wales.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link href="/terms" className="text-white hover:text-[#F3D08A] font-medium transition-colors apple-tactile active:scale-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              Delivery SLAs &amp; Terms
            </Link>
            <span className="text-[#F3D08A]/50">•</span>
            <Link href="/privacy" className="text-white hover:text-[#F3D08A] font-medium transition-colors apple-tactile active:scale-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              Privacy Policy
            </Link>
            <span className="text-[#F3D08A]/50">•</span>
            <Link href="/terms" className="text-white hover:text-[#F3D08A] font-medium transition-colors apple-tactile active:scale-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              Terms of Supply
            </Link>
          </div>

          <div>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#180205]/85 border border-[#F3D08A]/60 hover:border-[#F3D08A] hover:bg-[#F3D08A] text-white hover:text-[#180205] transition-all duration-150 apple-tactile active:scale-95 cursor-pointer shadow-sm font-mono text-[10.5px] font-bold tracking-wider uppercase"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-[#F3D08A] group-hover:text-[#180205]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
