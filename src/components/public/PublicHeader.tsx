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

  const isFullBar = !isHome || isScrolled;

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-200">
      {/* ─── FULL-WIDTH ARCHITECTURAL HEADER BAR (Active on Subpages & On Scroll) ───
          Clean, borderless-top sticky bar anchored at top: 0. 
          Completely eliminates the "curtain" problem because content scrolls cleanly underneath it. */}
      {isFullBar ? (
        <div className="w-full h-[62px] sm:h-[68px] bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8] shadow-[0_2px_10px_rgba(46,6,13,0.03)] flex items-center">
          <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* LEFT: Brand Lockup */}
            <Link 
              href="/#home" 
              onClick={(e) => scrollToHash(e, 'home')}
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
            >
              <div className="relative w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full shrink-0 bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/70 shadow-xs overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Rootwills Master Seal"
                  fill
                  unoptimized
                  sizes="40px"
                  className="object-contain p-0.5 rounded-full"
                  priority
                />
              </div>
              <div className="flex flex-col text-left">
                <strong className="text-[14.5px] sm:text-[15.5px] font-bold text-[#131313] tracking-[-0.02em] leading-tight group-hover:text-[#BA8E4E] transition-colors">
                  Rootwills
                </strong>
                <small className="hidden xs:block text-[10px] sm:text-[11px] text-stone-500 font-sans font-medium leading-tight">
                  Food Services &amp; Wholesale
                </small>
              </div>
            </Link>

            {/* RIGHT: Navigation Links + Accent Button */}
            <nav className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
              <Link
                href="/#home"
                onClick={(e) => scrollToHash(e, 'home')}
                className={`hidden sm:inline-flex px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-colors ${
                  activeItem === 'home'
                    ? 'bg-black/[0.06] text-[#131313] font-semibold'
                    : 'text-[#131313] hover:bg-black/[0.04]'
                }`}
              >
                Home
              </Link>

              <Link
                href="/products"
                className={`inline-flex px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-colors ${
                  activeItem === 'products'
                    ? 'bg-[#2E060D] text-white font-semibold shadow-2xs'
                    : 'text-[#131313] hover:bg-black/[0.04]'
                }`}
              >
                Products
              </Link>

              <Link
                href="/#about"
                onClick={(e) => scrollToHash(e, 'about')}
                className={`hidden sm:inline-flex px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-colors ${
                  activeItem === 'about'
                    ? 'bg-black/[0.06] text-[#131313] font-semibold'
                    : 'text-[#131313] hover:bg-black/[0.04]'
                }`}
              >
                About
              </Link>

              <Link
                href="/#services"
                onClick={(e) => scrollToHash(e, 'services')}
                className={`hidden md:inline-flex px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-colors ${
                  activeItem === 'services'
                    ? 'bg-black/[0.06] text-[#131313] font-semibold'
                    : 'text-[#131313] hover:bg-black/[0.04]'
                }`}
              >
                Services
              </Link>

              <Link
                href="/#approach"
                onClick={(e) => scrollToHash(e, 'approach')}
                className={`hidden lg:inline-flex px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-colors ${
                  activeItem === 'approach'
                    ? 'bg-black/[0.06] text-[#131313] font-semibold'
                    : 'text-[#131313] hover:bg-black/[0.04]'
                }`}
              >
                Approach
              </Link>

              <Link
                href="/contact"
                className="group ml-1 sm:ml-2 pl-3.5 pr-1 py-1 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight bg-[#2E060D] hover:bg-[#131313] text-[#FAF7F2] shadow-xs flex items-center gap-2 shrink-0 active:scale-95 transition-all"
              >
                <span className="hidden xs:inline">Get in Touch</span>
                <span className="xs:hidden">Inquire</span>
                <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-[10px] text-[#F3D08A] group-hover:bg-[#F3D08A] group-hover:text-[#131313] transition-colors">
                  ↗
                </span>
              </Link>
            </nav>
          </div>
        </div>
      ) : (
        /* ─── FLOATING PILL NAVBAR (Only on Homepage Hero when at top) ─── */
        <div className="flex justify-center px-2.5 xs:px-4 sm:px-5 md:px-8 pt-3 sm:pt-4">
          <div className="w-full max-w-[1320px] h-[52px] sm:h-[60px] px-3 sm:px-4 md:px-5 flex items-center justify-between rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
            {/* LEFT: Brand Lockup */}
            <Link 
              href="/#home" 
              onClick={(e) => scrollToHash(e, 'home')}
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
            >
              <div className="relative w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] rounded-full shrink-0 bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/70 shadow-xs overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Rootwills Master Seal"
                  fill
                  unoptimized
                  sizes="44px"
                  className="object-contain p-0.5 rounded-full"
                  priority
                />
              </div>
              <div className="flex flex-col text-left">
                <strong className="text-[14px] xs:text-[15px] sm:text-[16px] font-bold text-[#131313] tracking-[-0.03em] leading-tight group-hover:text-[#BA8E4E] transition-colors">
                  Rootwills
                </strong>
                <small className="hidden xs:block text-[10px] sm:text-[11px] text-stone-500 font-sans font-medium leading-tight">
                  Food Services &amp; Wholesale
                </small>
              </div>
            </Link>

            {/* RIGHT: Navigation Links */}
            <nav className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
              <Link
                href="/#home"
                onClick={(e) => scrollToHash(e, 'home')}
                className={`hidden sm:inline-flex px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13.5px] font-medium transition-colors ${
                  activeItem === 'home'
                    ? 'bg-[#EAEAEA] text-[#131313] font-semibold'
                    : 'text-[#131313] hover:bg-[#F2F2F0]'
                }`}
              >
                Home
              </Link>

              <Link
                href="/products"
                className="inline-flex px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13.5px] font-medium text-[#131313] hover:bg-[#F2F2F0] transition-colors"
              >
                Products
              </Link>

              <Link
                href="/#about"
                onClick={(e) => scrollToHash(e, 'about')}
                className="hidden sm:inline-flex px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13.5px] font-medium text-[#131313] hover:bg-[#F2F2F0] transition-colors"
              >
                About
              </Link>

              <Link
                href="/#services"
                onClick={(e) => scrollToHash(e, 'services')}
                className="hidden md:inline-flex px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13.5px] font-medium text-[#131313] hover:bg-[#F2F2F0] transition-colors"
              >
                Services
              </Link>

              <Link
                href="/#approach"
                onClick={(e) => scrollToHash(e, 'approach')}
                className="hidden lg:inline-flex px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13.5px] font-medium text-[#131313] hover:bg-[#F2F2F0] transition-colors"
              >
                Approach
              </Link>

              <Link
                href="/contact"
                className="group ml-1 sm:ml-2 pl-3.5 pr-1 py-1 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight bg-[#2E060D] hover:bg-[#131313] text-[#FAF7F2] shadow-xs flex items-center gap-2 shrink-0 active:scale-95 transition-all"
              >
                <span className="hidden xs:inline">Get in Touch</span>
                <span className="xs:hidden">Inquire</span>
                <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-[10px] text-[#F3D08A] group-hover:bg-[#F3D08A] group-hover:text-[#131313] transition-colors">
                  ↗
                </span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
