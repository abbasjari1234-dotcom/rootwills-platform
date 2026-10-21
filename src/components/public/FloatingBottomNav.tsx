'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
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
  { id: 'sectors', label: 'SECTORS', href: '/sectors' },
  { id: 'delivery', label: 'DELIVERY', href: '/delivery' },
  { id: 'why-us', label: 'WHY US', href: '/why-choose-us' },
  { id: 'contact', label: 'CONTACT', href: '/#contact', isHash: true },
];

export function FloatingBottomNav() {
  const pathname = usePathname();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('about');

  // Determine active item based on current route and scroll position on homepage
  useEffect(() => {
    // Sub-pages check
    if (pathname.includes('/sectors')) {
      setActiveId('sectors');
      return;
    }
    if (pathname.includes('/delivery')) {
      setActiveId('delivery');
      return;
    }
    if (pathname.includes('/why-choose-us')) {
      setActiveId('why-us');
      return;
    }

    // On homepage, observe section scroll positions
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
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
      {/* Fixed Outer Screen-Width Wrapper: 100% Guaranteed Dead-Center Viewport Anchoring */}
      <div className="fixed bottom-4 sm:bottom-7 left-0 right-0 w-full z-50 flex items-center justify-center pointer-events-none px-3 sm:px-6">
        <motion.nav
          initial={{ y: 35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Floating Glass Navigation Dock"
          className="pointer-events-auto mx-auto max-w-[96vw] sm:max-w-fit flex justify-center"
        >
          {/* ─── DOUBLE-BEZEL (DOPPELRAND) ARCHITECTURE ─── */}
          {/* Outer Machined Shell: Micro-padding, Hairline Ring, Deep Ambient Diffused Shadow */}
          <div className="relative rounded-full p-1 sm:p-1.5 bg-white/[0.04] ring-1 ring-white/15 backdrop-blur-3xl shadow-[0_24px_60px_-10px_rgba(0,0,0,0.65),0_8px_24px_rgba(0,0,0,0.4)]">
            
            {/* Inner Optical Glass Slab: Deep Obsidian Tint, 2xl Refraction & Concentric Curvature */}
            <div className="relative flex items-center overflow-x-auto no-scrollbar rounded-full bg-[#130306]/85 hover:bg-[#130306]/90 backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/10 px-2 sm:px-4 py-1.5 sm:py-2 text-white transition-colors duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.4)]">
              
              {/* Specular Hairline Highlight with Warm Gold/White Refraction */}
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E4C767]/35 via-white/55 to-transparent pointer-events-none" />
              
              {/* Subtle Inner Glass Ambient Light Sheen */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />

              {/* Navigation Links with Gliding Kinetic Spring Pill & Micro-Interactions */}
              <div className="relative flex items-center gap-0.5 sm:gap-1.5 whitespace-nowrap font-sans text-[10.5px] sm:text-xs font-black tracking-[0.18em] uppercase">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeId === item.id;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className="group relative px-2.5 sm:px-4 py-1.5 rounded-full text-white/80 hover:text-white transition-all duration-200 active:scale-[0.96]"
                    >
                      {/* Fluid Spring Gliding Pill (Active Indicator) */}
                      {isActive && (
                        <motion.div
                          layoutId="activeDockPill"
                          className="absolute inset-0 rounded-full bg-white/[0.14] ring-1 ring-white/25 shadow-xs"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}

                      {/* Link Label & Micro Gold Jewel */}
                      <span className="relative z-10 flex items-center gap-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
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
      </div>

      {/* Inquiry Modal */}
      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
