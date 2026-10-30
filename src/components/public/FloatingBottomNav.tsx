'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { InquiryModal } from './InquiryModal';

interface NavItem {
  id: string;
  label: string;
  href: string;
  isHash?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'ABOUT', href: '/#about', isHash: true },
  { id: 'services', label: 'SERVICES', href: '/#services', isHash: true },
  { id: 'contact', label: 'CONTACT', href: '/contact' },
];

export function FloatingBottomNav() {
  const pathname = usePathname();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [slaAlertActive, setSlaAlertActive] = useState<boolean>(true);
  const [isNearFooter, setIsNearFooter] = useState<boolean>(false);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Determine active item based on current route and scroll position on homepage
  useEffect(() => {
    if (pathname.includes('/contact')) {
      setActiveId('contact');
      return;
    }

    if (pathname === '/' || pathname === '') {
      const handleScrollSpy = () => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.45;
        const contactEl = document.getElementById('contact');
        const servicesEl = document.getElementById('services');
        const aboutEl = document.getElementById('about');

        if (contactEl && contactEl.offsetTop <= scrollPosition) {
          setActiveId('contact');
        } else if (servicesEl && servicesEl.offsetTop <= scrollPosition) {
          setActiveId('services');
        } else if (aboutEl && aboutEl.offsetTop <= scrollPosition) {
          setActiveId('about');
        }
      };

      window.addEventListener('scroll', handleScrollSpy, { passive: true });
      handleScrollSpy();
      return () => window.removeEventListener('scroll', handleScrollSpy);
    }
  }, [pathname]);

  // Smoothly hide floating nav when approaching footer, reveal when leaving
  useEffect(() => {
    const checkFooterIntersection = () => {
      const footer = document.getElementById('footer');
      if (!footer) {
        setIsNearFooter(false);
        return;
      }

      const rect = footer.getBoundingClientRect();
      // Floating nav sits at bottom (approx 80px high).
      // Disappear when footer top enters within 60px of viewport bottom.
      // Reappear with hysteresis when footer leaves past 15px below viewport bottom.
      const thresholdHide = window.innerHeight - 60;
      const thresholdShow = window.innerHeight - 15;

      setIsNearFooter((prev) => {
        if (!prev && rect.top < thresholdHide) {
          return true;
        }
        if (prev && rect.top > thresholdShow) {
          return false;
        }
        return prev;
      });
    };

    window.addEventListener('scroll', checkFooterIntersection, { passive: true });
    window.addEventListener('resize', checkFooterIntersection, { passive: true });
    checkFooterIntersection();

    return () => {
      window.removeEventListener('scroll', checkFooterIntersection);
      window.removeEventListener('resize', checkFooterIntersection);
    };
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    setIsMobileMenuOpen(false);

    if (item.isHash && (pathname === '/' || pathname === '')) {
      e.preventDefault();
      const targetId = item.id;
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: 'smooth',
        });
        setActiveId(targetId);
      }
    }
  };

  return (
    <>
      {/* ─── FULL-SCREEN MOBILE OVERLAY MENU (Apple Sheet Architecture) ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed inset-0 z-50 md:hidden bg-[#180306] overflow-y-auto flex flex-col justify-between items-center px-6 pt-[calc(1.5rem+env(safe-area-inset-top,0px))] pb-[calc(7rem+env(safe-area-inset-bottom,0px))] text-center"
          >
            {/* Apple Sheet Drag Handle Grab Bar */}
            <div className="w-10 h-1.5 rounded-full bg-white/25 mx-auto mb-2 relative z-20 shrink-0" />

            {/* Authentic Rich Dark Burgundy Damask Texture */}
            <div 
              className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-85"
              style={{ backgroundImage: "url('/images/textures/burgundy_damask_texture.jpg')" }}
            />
            {/* Dark Vignette & Edge Shadowing */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(16,2,4,0.45)_75%,rgba(8,1,2,0.85)_100%)]" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#180306]/70 via-transparent to-[#0d0103]/85" />

            {/* TOP BRAND IDENTITY */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.05 }}
              className="relative z-10 flex flex-col items-center mt-1"
            >
              {/* High-Resolution Heritage Seal Medallion with Gold Rim Halo */}
              <div className="relative w-14 h-14 shrink-0 transition-transform duration-300 rounded-full ring-1 ring-[#D4A86A]/35 shadow-[0_8px_24px_rgba(0,0,0,0.85)]">
                <Image
                  src="/images/branded/rootwills_logo_master.png"
                  alt="Rootwills Logo Seal"
                  fill
                  unoptimized
                  sizes="56px"
                  className="object-contain rounded-full"
                  priority
                />
              </div>

              {/* Brand Wordmark & Subtitle */}
              <span className="font-chunky text-3xl font-black text-white tracking-[-0.02em] mt-2.5 leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                Rootwills
              </span>
              <span className="block text-[8.5px] font-sans font-black tracking-[0.3em] uppercase text-[#D4A86A] mt-1.5 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                FOOD SERVICES &amp; WHOLESALE CO.
              </span>

              {/* Subtle Gold Hairline Divider */}
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4A86A]/45 to-transparent mt-3.5" />
            </motion.div>

            {/* CENTER NAVIGATION LINKS (Large Stacked Editorial Links with Apple Tactile Response) */}
            <nav className="relative z-10 flex flex-col items-center space-y-3 my-auto py-3">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeId === item.id;
                const displayLabel = item.label.charAt(0).toUpperCase() + item.label.slice(1).toLowerCase();

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      type: 'spring',
                      damping: 25,
                      stiffness: 280,
                      delay: 0.08 + index * 0.04 
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className="group relative inline-flex items-center gap-2 px-6 py-1.5 text-3xl xs:text-4xl font-serif font-bold tracking-tight transition-all duration-100 ease-out active:scale-[0.95]"
                    >
                      {/* Active Diamond Jewel */}
                      {isActive && (
                        <motion.span
                          layoutId="activeMobileDot"
                          className="text-[#E4C767] text-base drop-shadow-[0_0_8px_#E4C767]"
                          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        >
                          ✦
                        </motion.span>
                      )}
                      
                      <span className={isActive ? 'text-[#E4C767] drop-shadow-[0_2px_12px_rgba(228,199,103,0.4)]' : 'text-white/95 group-hover:text-[#E4C767] group-active:text-[#E4C767]'}>
                        {displayLabel}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* BOTTOM COMMERCIAL CONTROL (Apple-Style Spring Toggle Switch) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280, delay: 0.32 }}
              className="relative z-10 flex flex-col items-center gap-2 mb-2"
            >
              {/* Dispatch SLA Toggle Switch */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-wider text-[#EDE4D8]/90">
                  Pre-Dawn Fleet Drops
                </span>

                {/* Interactive Toggle Switch with iOS Physical Spring */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={slaAlertActive}
                  onClick={() => setSlaAlertActive(!slaAlertActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none p-0.5 active:scale-95 ${
                    slaAlertActive ? 'bg-[#D4A86A]' : 'bg-white/20'
                  }`}
                >
                  <motion.span
                    animate={{ x: slaAlertActive ? 20 : 0 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 450 }}
                    className="inline-block h-5 w-5 rounded-full bg-[#180306] shadow-md flex items-center justify-center"
                  >
                    <span className="text-[9px] text-[#D4A86A] leading-none">✦</span>
                  </motion.span>
                </button>
              </div>

              {/* Subtitle Guarantee Tagline */}
              <span className="text-[10.5px] font-mono text-[#D4A86A]/80 tracking-wider">
                05:30 – 07:30 AM SLA &bull; London &amp; Midlands
              </span>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FLOATING BOTTOM CONTROLS (DESKTOP DOCK + MOBILE MENU PILL) ─── */}
      <AnimatePresence>
        {!isNearFooter && (
          <motion.div
            key="floating-bottom-controls"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:bottom-7 left-0 right-0 w-full z-50 flex items-center justify-center pointer-events-none px-3 sm:px-6"
          >
            {/* 1. DESKTOP VIEW: Hidden since desktop navigation is provided by the top floating Anubi navbar */}
            <motion.nav
              aria-label="Floating Glass Navigation Dock"
              className="hidden"
            >
              {/* Double-Bezel Glass Frame with Specular Top Edge */}
              <div className="relative rounded-full p-1 sm:p-1.5 bg-white/[0.04] ring-1 ring-white/20 backdrop-blur-3xl shadow-[0_24px_60px_-10px_rgba(0,0,0,0.65),0_8px_24px_rgba(0,0,0,0.4)]">
                <div className="relative flex items-center overflow-x-auto no-scrollbar rounded-full bg-[#130306]/85 hover:bg-[#130306]/90 backdrop-blur-2xl backdrop-saturate-180 ring-1 ring-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-white transition-colors duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.4)]">
                  
                  {/* Specular Hairline Highlight where light catches top edge */}
                  <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E4C767]/45 via-white/60 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

                  {/* Navigation Links with Critically Damped Spring Gliding Indicator */}
                  <div className="relative flex items-center gap-0.5 sm:gap-1.5 whitespace-nowrap font-sans text-[10.5px] sm:text-xs font-black tracking-[0.16em] uppercase">
                    {NAV_ITEMS.map((item) => {
                      const isActive = activeId === item.id;

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item)}
                          className="group relative px-2.5 sm:px-4 py-1.5 rounded-full text-white/80 hover:text-white transition-[color,transform] duration-100 ease-out active:scale-[0.96] touch-manipulation"
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeDockPill"
                              className="absolute inset-0 rounded-full bg-white/[0.14] ring-1 ring-white/30 shadow-xs"
                              transition={{ type: 'spring', damping: 30, stiffness: 380 }}
                            />
                          )}

                          <span className="relative z-10 flex items-center gap-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                            {isActive && (
                              <motion.span
                                initial={{ scale: 0.6, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', damping: 20, stiffness: 400 }}
                                className="w-1 h-1 rounded-full bg-[#E4C767] shadow-[0_0_6px_#E4C767]"
                              />
                            )}
                            <span className={isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}>
                              {item.label}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                </div>
              </div>
            </motion.nav>

            {/* 2. MOBILE VIEW: Velvet Dark Burgundy Menu Pill with Specular Rim */}
            <div className="pointer-events-auto md:hidden flex justify-center">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
                className="group relative p-[1.5px] rounded-full transition-[transform,box-shadow] duration-100 ease-out active:scale-[0.96] bg-[#E4C767]/30 ring-1 ring-[#D4A86A]/50 shadow-[0_0_30px_rgba(200,30,45,0.6),0_8px_24px_rgba(0,0,0,0.85)] cursor-pointer touch-manipulation"
              >
                {/* Inner Velvet Capsule with Specular Top Highlight */}
                <div className="relative flex items-center gap-2.5 px-6 py-2.5 rounded-full font-serif font-bold text-sm text-white tracking-wider bg-gradient-to-b from-[#26050B] via-[#1B0307] to-[#120205] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition-colors duration-200">
                  {/* Specular hairline */}
                  <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                  {/* Animated Hamburger ☰ / Close ✕ Icon */}
                  <div className="w-4 h-4 flex items-center justify-center">
                    {isMobileMenuOpen ? (
                      <X className="w-4 h-4 text-white transition-transform duration-200 rotate-90 scale-110" />
                    ) : (
                      <div className="flex flex-col justify-between w-3.5 h-2.5">
                        <span className="w-full h-[1.5px] bg-white rounded-full" />
                        <span className="w-full h-[1.5px] bg-white rounded-full" />
                        <span className="w-full h-[1.5px] bg-white rounded-full" />
                      </div>
                    )}
                  </div>

                  <span>Menu</span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
