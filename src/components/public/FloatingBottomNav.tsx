'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { InquiryModal } from './InquiryModal';

const NAV_ITEMS = [
  { label: 'ABOUT', href: '/#about' },
  { label: 'SERVICES', href: '/#services' },
  { label: 'SECTORS', href: '/sectors' },
  { label: 'DELIVERY', href: '/delivery' },
  { label: 'WHY US', href: '/why-choose-us' },
  { label: 'CONTACT', href: '/#contact' },
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
              {/* Clean, Crisp Capsule Container - No Fuzzy Smudged Glow Behind */}
              <div className="relative rounded-full p-[1px] shadow-[0_14px_40px_rgba(0,0,0,0.38),0_3px_10px_rgba(0,0,0,0.2)] ring-1 ring-white/35">

                {/* Main Dock Body with High-Luminosity Sunset Gradient (Zero Mud / Murkiness) */}
                <div className="relative flex items-center overflow-x-auto no-scrollbar rounded-full bg-[linear-gradient(90deg,#F43826_0%,#FA6438_28%,#EE4C70_58%,#C96EA0_82%,#B587BE_100%)] px-5 sm:px-9 py-2.5 sm:py-3.5 text-white backdrop-blur-md">
                  
                  {/* Subtle Top-Edge Specular Glass Reflection */}
                  <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/55 to-transparent pointer-events-none" />

                  {/* Navigation Links in Clean Bold Capital Letters */}
                  <div className="flex items-center gap-4 sm:gap-7 whitespace-nowrap font-sans text-[11px] sm:text-xs font-black tracking-[0.16em] uppercase">
                    {NAV_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="relative py-1 text-white/95 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
                      >
                        <span>{item.label}</span>
                      </Link>
                    ))}
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
