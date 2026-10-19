'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  const navLinks = [
    { label: 'HOME', href: '/#home', id: 'home' },
    { label: 'ABOUT US', href: '/#about', id: 'about' },
    { label: 'OUR SERVICES', href: '/#services', id: 'services' },
    { label: 'OUR APPROACH', href: '/#approach', id: 'approach' },
    { label: 'CONTACT', href: '/#contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0F1714] border-b border-[#BA8E4E]/25 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex items-center justify-between h-14 sm:h-20 relative">
          
          {/* Left: Circular Logo Seal (Enlarged hanging medallion matching reference) */}
          <div className="flex items-center">
            <Link 
              href="#home" 
              onClick={() => setActiveNav('home')}
              className="relative z-20 group -mb-4 sm:-mb-10 lg:-mb-16 focus:outline-none"
            >
              <div className="relative w-14 h-14 sm:w-24 sm:h-24 lg:w-36 lg:h-36 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_14px_28px_rgba(0,0,0,0.45)]">
                <Image
                  src="/images/branded/rootwills_logo_seal.png"
                  alt="Rootwills Logo Seal"
                  fill
                  sizes="(max-width: 640px) 56px, (max-width: 1024px) 96px, 144px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Center: Navigation Links (Capital Letters & Gold Color) */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-10 pl-6 lg:pl-10">
            {navLinks.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveNav(item.id)}
                  className={`relative py-2 text-xs sm:text-[13px] tracking-wider uppercase font-serif transition-colors whitespace-nowrap text-[#D4A86A] hover:text-[#F3E5D0] ${
                    isActive 
                      ? 'font-bold drop-shadow-[0_1px_4px_rgba(212,168,106,0.3)]' 
                      : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4A86A] shadow-[0_0_8px_rgba(212,168,106,0.5)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right: Understated Typographic Motto */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="h-7 w-[1px] bg-white/20" />
            <div className="text-left">
              <span className="block text-[9px] tracking-[0.2em] uppercase font-serif text-white/90 leading-tight">
                QUALITY FOOD
              </span>
              <span className="block text-[9px] tracking-[0.2em] uppercase font-serif text-white/80 leading-tight">
                FOR A STRONGER
              </span>
              <span className="block text-[9px] tracking-[0.2em] uppercase font-serif text-[#D4A86A] leading-tight">
                TOMORROW
              </span>
            </div>
          </div>

          {/* Mobile Right: Menu Toggle */}
          <div className="flex md:hidden items-center z-20">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg text-cream-200 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6 text-[#D4A86A]" /> : <Menu className="w-6 h-6 text-[#EDE4D8]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Decorative thin separator line with center diamond on mobile */}
      <div className="relative w-full h-[1px] bg-[#BA8E4E]/25 flex items-center justify-center">
        <div className="absolute bg-[#0F1714] px-1.5 text-[8px] text-[#D4A86A]">
          ◆
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A110E] border-b border-[#BA8E4E]/25 px-4 pt-3 pb-6 space-y-3"
          >
            <nav className="flex flex-col space-y-2">
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveNav(item.id);
                    setMobileOpen(false);
                  }}
                  className="px-3 py-2 text-sm text-[#D4A86A] hover:text-[#F3E5D0] hover:bg-white/5 rounded-md transition-colors font-serif tracking-wider uppercase font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Mobile Direct Enquire Contact Bar */}
            <div className="pt-3 border-t border-[#BA8E4E]/20 space-y-2">
              <span className="block text-[10px] font-serif uppercase tracking-[0.2em] text-[#D4A86A]/80 px-3">
                Commercial Enquiries
              </span>
              <div className="flex flex-col gap-1.5 px-3">
                <a
                  href="tel:+442012345678"
                  className="text-xs text-white/90 hover:text-[#D4A86A] font-sans flex items-center gap-2"
                >
                  <span className="text-[#D4A86A]">📞</span> +44 (0) 20 1234 5678
                </a>
                <a
                  href="mailto:info@rootwills.co.uk"
                  className="text-xs text-white/90 hover:text-[#D4A86A] font-sans flex items-center gap-2"
                >
                  <span className="text-[#D4A86A]">✉️</span> info@rootwills.co.uk
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
