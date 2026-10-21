'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { InquiryModal } from './InquiryModal';

const NAV_ITEMS = [
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Delivery', href: '/delivery' },
  { label: 'Why Us', href: '/why-choose-us' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Trade Portal', href: '/login', isCta: true },
];

export function FloatingBottomNav() {
  const pathname = usePathname();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Subtle auto-hide on rapid downscroll, reveal on upscroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 150 && currentScrollY > lastScrollY + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5 || currentScrollY < 100) {
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
          <motion.nav
            initial={{ y: 70, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 70, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            aria-label="Floating Navigation Dock"
            className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[96vw] sm:max-w-fit"
          >
            {/* The Signature Sunset Coral-to-Lilac Gradient Dock Capsule */}
            <div className="relative rounded-full p-[1px] shadow-[0_16px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/25">
              
              {/* Outer Glow Sheen */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#F04E38]/30 via-[#C8385A]/30 to-[#B282A8]/30 blur-md pointer-events-none opacity-80" />

              {/* Main Pill Bar Container with Reference Gradient */}
              <div className="relative flex items-center overflow-x-auto no-scrollbar rounded-full bg-gradient-to-r from-[#EB4632] via-[#C93856] to-[#AD7E9F] px-4 sm:px-7 py-2.5 sm:py-3 text-white backdrop-blur-md">
                
                {/* Subtle Top-Edge Specular Glass Line */}
                <div className="absolute inset-x-5 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                <div className="flex items-center gap-3.5 sm:gap-6 whitespace-nowrap font-sans text-xs sm:text-[13px] font-bold tracking-wide">
                  {NAV_ITEMS.map((item) => {
                    if (item.isCta) {
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="group relative ml-1 sm:ml-2 inline-flex items-center gap-1.5 rounded-full bg-black/25 hover:bg-black/40 px-3.5 py-1.5 ring-1 ring-white/30 text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
                        >
                          <span className="font-serif tracking-wider">{item.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-white/90 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="relative py-1 text-white/95 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                      >
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>

              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
