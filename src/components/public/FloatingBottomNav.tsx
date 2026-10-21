'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { InquiryModal } from './InquiryModal';

const NAV_ITEMS = [
  { label: 'ABOUT', href: '/#about' },
  { label: 'SERVICES', href: '/#services' },
  { label: 'SECTORS', href: '/sectors' },
  { label: 'DELIVERY', href: '/delivery' },
  { label: 'WHY US', href: '/why-choose-us' },
  { label: 'CONTACT', href: '/#contact' },
  { label: 'TRADE PORTAL', href: '/login', isCta: true },
];

export function FloatingBottomNav() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide on fast downward scroll, restore on upward scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 150 && currentScrollY > lastScrollY + 12) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 6 || currentScrollY < 80) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          /* Fixed Outer Screen-Width Wrapper that mathematically guarantees true center alignment across all devices */
          <div className="fixed bottom-4 sm:bottom-7 left-0 right-0 w-full z-50 flex items-center justify-center pointer-events-none px-3 sm:px-6">
            <motion.nav
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              aria-label="Floating Navigation Dock"
              className="pointer-events-auto mx-auto max-w-[96vw] sm:max-w-fit flex justify-center"
            >
              {/* Reference-Perfect Gradient Capsule Container */}
              <div className="relative rounded-2xl sm:rounded-full p-[1px] shadow-[0_18px_50px_rgba(241,54,36,0.38),0_6px_22px_rgba(183,158,188,0.3)] ring-1 ring-white/35">
                
                {/* Ambient Soft Glow Behind the Pill */}
                <div className="absolute -inset-1 rounded-2xl sm:rounded-full bg-[linear-gradient(90deg,#F13624_0%,#FA7E3D_35%,#FBA45C_65%,#B79EBC_100%)] blur-md opacity-70 pointer-events-none" />

                {/* Main Dock Body with EXACT Matched Sunbeam Color Gradient */}
                <div className="relative flex items-center overflow-x-auto no-scrollbar rounded-2xl sm:rounded-full bg-[linear-gradient(90deg,#F13624_0%,#F65B32_20%,#FA7E3D_40%,#FBA45C_60%,#E6A896_78%,#CCA7BD_90%,#B79EBC_100%)] px-3.5 sm:px-7 py-2.5 sm:py-3.5 text-white backdrop-blur-md">
                  
                  {/* Subtle Top-Edge Specular Glass Line */}
                  <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/55 to-transparent pointer-events-none" />

                  {/* Navigation Links in High-End Bold Capital Letters */}
                  <div className="flex items-center gap-2.5 sm:gap-6 whitespace-nowrap font-sans text-[11px] sm:text-xs font-black tracking-[0.16em] uppercase">
                    {NAV_ITEMS.map((item) => {
                      if (item.isCta) {
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="group relative ml-1 sm:ml-2 inline-flex items-center gap-1.5 rounded-full bg-black/25 hover:bg-black/45 px-3.5 py-1.5 ring-1 ring-white/35 text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs"
                          >
                            <span className="font-sans font-black tracking-[0.16em] uppercase">{item.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-white/95 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        );
                      }

                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="relative py-1 text-white/95 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
                        >
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                </div>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
