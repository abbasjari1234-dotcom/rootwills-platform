'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

  return (
    <>
      {/* Fixed Outer Screen-Width Wrapper: Permanently Pinned & Centered Across All Devices */}
      <div className="fixed bottom-4 sm:bottom-7 left-0 right-0 w-full z-50 flex items-center justify-center pointer-events-none px-3 sm:px-6">
        <motion.nav
          initial={{ y: 35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Floating Glass Navigation Dock"
          className="pointer-events-auto mx-auto max-w-[96vw] sm:max-w-fit flex justify-center"
        >
          {/* Premium Glassmorphic Capsule with Specular Border Rim */}
          <div className="relative rounded-full p-[1px] bg-gradient-to-b from-white/35 via-white/10 to-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.55),0_4px_16px_rgba(0,0,0,0.3)]">
            
            {/* Frosted Translucent Glass Body with Real-Time Background Refraction */}
            <div className="relative flex items-center overflow-x-auto no-scrollbar rounded-full bg-[#180306]/80 hover:bg-[#180306]/90 backdrop-blur-2xl backdrop-saturate-150 px-3 sm:px-6 py-1.5 sm:py-2 text-white transition-colors duration-300">
              
              {/* Top Specular Glass Reflection Highlight */}
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
              
              {/* Subtle Inner Glass Sheen */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

              {/* Navigation Links in Clean Bold Capital Letters with Interactive Frosted Glass Hover Highlights */}
              <div className="relative flex items-center gap-1 sm:gap-2 whitespace-nowrap font-sans text-[11px] sm:text-xs font-black tracking-[0.16em] uppercase">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group relative px-2.5 sm:px-4 py-1.5 rounded-full text-white/85 hover:text-white transition-all duration-200 hover:bg-white/12 active:scale-95"
                  >
                    <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                      {item.label}
                    </span>
                  </Link>
                ))}
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
