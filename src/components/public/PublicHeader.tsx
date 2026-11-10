'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function PublicHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';
  const [activeItem, setActiveItem] = useState<'home' | 'products' | 'about' | 'services' | 'approach' | 'contact'>('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Track active section on scroll when on homepage, or active route on subpages
  useEffect(() => {
    if (!isHome) {
      if (pathname.includes('/products')) setActiveItem('products');
      else if (pathname.includes('/contact')) setActiveItem('contact');
      else if (pathname.includes('/about')) setActiveItem('about');
      else setActiveItem('home');
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (!isHome) return;

      const aboutEl = document.getElementById('about');
      const servicesEl = document.getElementById('services');
      const approachEl = document.getElementById('approach');

      const aboutTop = aboutEl ? aboutEl.offsetTop - 140 : 800;
      const servicesTop = servicesEl ? servicesEl.offsetTop - 140 : 1600;
      const approachTop = approachEl ? approachEl.offsetTop - 140 : 2400;

      if (scrollY >= approachTop) {
        setActiveItem('approach');
      } else if (scrollY >= servicesTop) {
        setActiveItem('services');
      } else if (scrollY >= aboutTop) {
        setActiveItem('about');
      } else {
        setActiveItem('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, pathname]);

  const scrollToHash = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        const offset = 80;
        const elPos = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elPos - offset,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-300">
      {/* ─── SEAMLESS FROSTED GLASS DISSOLVE (Replaces clunky curtain wall) ───
          Soft, borderless gradient fade with backdrop-blur so content dissolves naturally 
          without any hard horizontal bar or artificial curtain block */}
      <div
        className={`absolute inset-x-0 top-0 h-[80px] sm:h-[92px] pointer-events-none transition-opacity duration-300 bg-gradient-to-b from-[#FAF7F2]/95 via-[#FAF7F2]/80 to-transparent backdrop-blur-[8px] ${
          !isHome || isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* ─── ANUBI-STYLE FLOATING CAPSULE NAVBAR SURFACE ─── */}
      <div className="relative z-10 flex justify-center px-2.5 xs:px-4 sm:px-5 md:px-8 pt-[calc(0.4rem+env(safe-area-inset-top,0px))] sm:pt-3.5">
        <div className="pointer-events-auto w-full max-w-[1320px] h-[52px] sm:h-[62px] px-2.5 xs:px-3 sm:px-4 md:px-5 flex items-center justify-between rounded-full bg-[#FFFFFF] border border-black/[0.08] shadow-[0_2px_4px_rgba(35,30,24,0.03),0_8px_28px_-8px_rgba(35,30,24,0.12),inset_0_0_0_1px_rgba(35,30,24,0.04)]">
        
        {/* LEFT: Brand Lockup with High-Visibility Master Seal & Editorial Typography */}
        <Link 
          href="/#home" 
          onClick={(e) => scrollToHash(e, 'home')}
          className="flex items-center gap-2 xs:gap-2.5 sm:gap-3.5 group focus:outline-none shrink-0"
        >
          {/* Heritage Master Seal with Warm Gold Halo Rim & Tactile Elevation */}
          <div className="relative w-[36px] h-[36px] xs:w-[40px] xs:h-[40px] sm:w-[46px] sm:h-[46px] rounded-full shrink-0 bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/70 shadow-[0_3px_12px_rgba(26,26,24,0.16)] transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_4px_16px_rgba(186,142,78,0.3)] overflow-hidden">
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
            <strong className="text-[14px] xs:text-[15px] sm:text-[16px] font-bold text-[#131313] tracking-[-0.03em] leading-tight group-hover:text-[#BA8E4E] transition-colors">
              Rootwills
            </strong>
            <small className="hidden xs:block text-[10px] sm:text-[11px] text-[#706C65] font-sans font-medium leading-tight truncate max-w-[150px] sm:max-w-none">
              Food Services &amp; Wholesale
            </small>
          </div>
        </Link>

        {/* RIGHT: Navigation Links with Soft Pill States & Accent Button */}
        <nav className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
          
          {/* Home (Visible on xs and up) */}
          <Link
            href="/#home"
            onClick={(e) => scrollToHash(e, 'home')}
            className={`hidden sm:inline-flex px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[14px] font-medium tracking-tight transition-all duration-200 ${
              activeItem === 'home'
                ? 'bg-[#EAEAEA] text-[#131313]'
                : 'text-[#131313] hover:bg-[#F2F2F0]'
            }`}
          >
            Home
          </Link>

          {/* Products (Visible on all viewports for direct catalog access) */}
          <Link
            href="/products"
            className={`inline-flex px-2.5 xs:px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[14px] font-medium tracking-tight transition-all duration-200 ${
              activeItem === 'products'
                ? 'bg-[#2E060D]/10 text-[#2E060D] font-semibold ring-1 ring-[#BA8E4E]/45'
                : 'text-[#131313] hover:bg-[#F2F2F0]'
            }`}
          >
            Products
          </Link>

          {/* About (Visible on sm and up) */}
          <Link
            href="/#about"
            onClick={(e) => scrollToHash(e, 'about')}
            className={`hidden sm:inline-flex px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[14px] font-medium tracking-tight transition-all duration-200 ${
              activeItem === 'about'
                ? 'bg-[#EAEAEA] text-[#131313]'
                : 'text-[#131313] hover:bg-[#F2F2F0]'
            }`}
          >
            About
          </Link>

          {/* Services */}
          <Link
            href="/#services"
            onClick={(e) => scrollToHash(e, 'services')}
            className={`hidden md:inline-flex px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[14px] font-medium tracking-tight transition-all duration-200 ${
              activeItem === 'services'
                ? 'bg-[#EAEAEA] text-[#131313]'
                : 'text-[#131313] hover:bg-[#F2F2F0]'
            }`}
          >
            Services
          </Link>

          {/* Approach */}
          <Link
            href="/#approach"
            onClick={(e) => scrollToHash(e, 'approach')}
            className={`hidden lg:inline-flex px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[14px] font-medium tracking-tight transition-all duration-200 ${
              activeItem === 'approach'
                ? 'bg-[#EAEAEA] text-[#131313]'
                : 'text-[#131313] hover:bg-[#F2F2F0]'
            }`}
          >
            Approach
          </Link>

          {/* Accent CTA Button: Solid Royal Burgundy + Champagne Gold */}
          <Link
            href="/contact"
            className={`group ml-1 sm:ml-2 pl-3.5 sm:pl-4 pr-1 sm:pr-1.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-[14px] font-medium tracking-tight transition-[background-color,color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center gap-1.5 sm:gap-2.5 shrink-0 active:scale-[0.96] touch-manipulation ${
              activeItem === 'contact'
                ? 'bg-[#2E060D] text-[#FAF7F2] shadow-[0_4px_14px_rgba(46,6,13,0.22)]'
                : 'bg-[#2E060D] hover:bg-[#131313] text-[#FAF7F2] shadow-[0_2px_10px_rgba(46,6,13,0.16)]'
            }`}
          >
            <span className="hidden xs:inline">Get in Touch</span>
            <span className="xs:hidden font-semibold text-[12px]">Inquire</span>
            <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white/15 ring-1 ring-white/20 flex items-center justify-center text-[10px] sm:text-[12px] font-bold text-[#F3D08A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[#F3D08A] group-hover:text-[#131313] transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
              ↗
            </span>
          </Link>

        </nav>

        </div>
      </div>
    </header>
  );
}
