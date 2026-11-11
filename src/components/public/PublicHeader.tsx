'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Phone } from 'lucide-react';

export function PublicHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';
  const [activeItem, setActiveItem] = useState<'home' | 'products' | 'about' | 'services' | 'approach' | 'contact'>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track active canonical route for SEO & browser navigation
  useEffect(() => {
    if (pathname.startsWith('/products')) setActiveItem('products');
    else if (pathname.startsWith('/about')) setActiveItem('about');
    else if (pathname.startsWith('/services')) setActiveItem('services');
    else if (pathname.startsWith('/approach')) setActiveItem('approach');
    else if (pathname.startsWith('/contact')) setActiveItem('contact');
    else setActiveItem('home');

    // Close mobile menu on route change
    setIsMobileMenuOpen(false);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/' || pathname === '') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-300">
      {/* ─── SEAMLESS BORDERLESS DISSOLVE ─── */}
      <div
        className={`absolute inset-x-0 top-0 h-[84px] sm:h-[96px] pointer-events-none transition-opacity duration-300 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent backdrop-blur-[6px] ${
          !isHome || isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* ─── FLOATING CAPSULE NAVBAR ─── */}
      <div className="relative z-10 flex justify-center px-2.5 sm:px-5 md:px-8 pt-[calc(0.4rem+env(safe-area-inset-top,0px))] sm:pt-3.5">
        <div className="pointer-events-auto w-full max-w-[1320px] h-[52px] sm:h-[62px] px-2.5 sm:px-4 md:px-5 flex items-center justify-between rounded-full bg-[#FFFFFF] border border-black/[0.08] shadow-[0_2px_4px_rgba(35,30,24,0.03),0_8px_28px_-8px_rgba(35,30,24,0.12),inset_0_0_0_1px_rgba(35,30,24,0.04)]">
        
        {/* LEFT: Brand Lockup with High-Visibility Master Seal & Editorial Typography */}
        <Link 
          href="/" 
          onClick={handleHomeClick}
          className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0"
        >
          {/* Heritage Master Seal with Warm Gold Halo Rim & Tactile Elevation */}
          <div className="relative w-[34px] h-[34px] sm:w-[44px] sm:h-[44px] rounded-full shrink-0 bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/70 shadow-[0_3px_12px_rgba(26,26,24,0.16)] transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_4px_16px_rgba(186,142,78,0.3)] overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Rootwills Master Seal"
              fill
              unoptimized
              sizes="48px"
              className="object-contain p-0.5 rounded-full"
              priority
            />
          </div>

          {/* Brand Titles */}
          <div className="flex flex-col text-left">
            <strong className="text-[14.5px] sm:text-[16px] font-bold text-[#131313] tracking-[-0.03em] leading-tight group-hover:text-[#BA8E4E] transition-colors">
              Rootwills
            </strong>
            <small className="hidden md:block text-[11px] text-[#706C65] font-sans font-medium leading-tight">
              Food Services &amp; Wholesale
            </small>
          </div>
        </Link>

        {/* RIGHT: Navigation Links with Soft Pill States & Accent Button */}
        <nav className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
          
          {/* Home */}
          <Link
            href="/"
            onClick={handleHomeClick}
            className={`hidden lg:inline-flex px-3.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-[14px] font-medium tracking-tight transition-all duration-200 ${
              activeItem === 'home'
                ? 'bg-[#EAEAEA] text-[#131313]'
                : 'text-[#131313] hover:bg-[#F2F2F0]'
            }`}
          >
            Home
          </Link>

          {/* Products (Visible on all viewports) */}
          <Link
            href="/products"
            className={`inline-flex px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[14px] font-medium tracking-tight transition-all duration-200 ${
              activeItem === 'products'
                ? 'bg-[#2E060D]/10 text-[#2E060D] font-semibold ring-1 ring-[#BA8E4E]/45'
                : 'text-[#131313] hover:bg-[#F2F2F0]'
            }`}
          >
            Products
          </Link>

          {/* About */}
          <Link
            href="/about"
            className={`hidden md:inline-flex px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[14px] font-medium tracking-tight transition-all duration-200 ${
              activeItem === 'about'
                ? 'bg-[#2E060D]/10 text-[#2E060D] font-semibold ring-1 ring-[#BA8E4E]/45'
                : 'text-[#131313] hover:bg-[#F2F2F0]'
            }`}
          >
            About
          </Link>

          {/* Services */}
          <Link
            href="/services"
            className={`hidden md:inline-flex px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[14px] font-medium tracking-tight transition-all duration-200 ${
              activeItem === 'services'
                ? 'bg-[#2E060D]/10 text-[#2E060D] font-semibold ring-1 ring-[#BA8E4E]/45'
                : 'text-[#131313] hover:bg-[#F2F2F0]'
            }`}
          >
            Services
          </Link>

          {/* Approach */}
          <Link
            href="/approach"
            className={`hidden lg:inline-flex px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[14px] font-medium tracking-tight transition-all duration-200 ${
              activeItem === 'approach'
                ? 'bg-[#2E060D]/10 text-[#2E060D] font-semibold ring-1 ring-[#BA8E4E]/45'
                : 'text-[#131313] hover:bg-[#F2F2F0]'
            }`}
          >
            Approach
          </Link>

          {/* Accent CTA Button: Solid Royal Burgundy + Champagne Gold */}
          <Link
            href="/contact"
            className={`group pl-3 sm:pl-4 pr-1 sm:pr-1.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-[14px] font-medium tracking-tight transition-[background-color,color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center gap-1.5 sm:gap-2.5 shrink-0 active:scale-[0.96] touch-manipulation ${
              activeItem === 'contact'
                ? 'bg-[#2E060D] text-[#FAF7F2] shadow-[0_4px_14px_rgba(46,6,13,0.22)]'
                : 'bg-[#2E060D] hover:bg-[#131313] text-[#FAF7F2] shadow-[0_2px_10px_rgba(46,6,13,0.16)]'
            }`}
          >
            <span className="hidden sm:inline">Get in Touch</span>
            <span className="sm:hidden font-semibold text-[11.5px] tracking-wide">Inquire</span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/15 ring-1 ring-white/20 flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-[#F3D08A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[#F3D08A] group-hover:text-[#131313] transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
              ↗
            </span>
          </Link>

          {/* Mobile Menu Hamburger Toggle (< md) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden ml-0.5 w-8 h-8 rounded-full flex items-center justify-center bg-[#FAF7F2] hover:bg-[#EFE8D8] text-[#2E060D] border border-black/[0.08] transition-colors cursor-pointer shrink-0"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-[#2E060D]" />
            ) : (
              <Menu className="w-4 h-4 text-[#2E060D]" />
            )}
          </button>

        </nav>

        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-2.5 top-[calc(4.1rem+env(safe-area-inset-top,0px))] z-50 pointer-events-auto">
          <div className="bg-[#FFFFFF] border border-[#E8DEC8] rounded-2xl p-3 sm:p-4 shadow-[0_16px_40px_rgba(46,6,13,0.16),0_2px_8px_rgba(0,0,0,0.06)] space-y-1">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeItem === 'home' ? 'bg-[#2E060D] text-white font-semibold' : 'text-[#2E060D] hover:bg-[#FAF5EB]'
              }`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link
              href="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeItem === 'products' ? 'bg-[#2E060D] text-white font-semibold' : 'text-[#2E060D] hover:bg-[#FAF5EB]'
              }`}
            >
              <span>Wholesale Products (5,480+ Lines)</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeItem === 'about' ? 'bg-[#2E060D] text-white font-semibold' : 'text-[#2E060D] hover:bg-[#FAF5EB]'
              }`}
            >
              <span>About Rootwills</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeItem === 'services' ? 'bg-[#2E060D] text-white font-semibold' : 'text-[#2E060D] hover:bg-[#FAF5EB]'
              }`}
            >
              <span>Hospitality Solutions &amp; Wholesale</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link
              href="/approach"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeItem === 'approach' ? 'bg-[#2E060D] text-white font-semibold' : 'text-[#2E060D] hover:bg-[#FAF5EB]'
              }`}
            >
              <span>Quality Standards &amp; Fleet Logistics</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <div className="pt-2 mt-2 border-t border-[#E8DEC8] flex items-center justify-between gap-2">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-xl bg-[#2E060D] text-white text-xs font-semibold uppercase tracking-wider shadow-xs"
              >
                Inquire / Trade Account
              </Link>
              <a
                href="tel:+441616412803"
                className="px-3 py-2.5 rounded-xl bg-[#FAF5EB] border border-[#BA8E4E]/40 text-[#2E060D] text-xs font-mono font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#BA8E4E]" />
                <span>Call Depot</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
