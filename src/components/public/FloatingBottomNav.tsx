'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight, ShieldCheck, Truck, UtensilsCrossed, Sparkles, Phone } from 'lucide-react';
import { InquiryModal } from './InquiryModal';

interface DropdownItem {
  label: string;
  desc: string;
  href: string;
  icon: React.ElementType;
  isHash?: boolean;
}

const LEARN_ITEMS: DropdownItem[] = [
  {
    label: 'Wholesale Services',
    desc: 'Produce, dairy, and butchery culinary supply',
    href: '/#services',
    icon: Sparkles,
    isHash: true,
  },
  {
    label: 'Sectors We Supply',
    desc: 'Restaurants, hotels, caterers & institutions',
    href: '/sectors',
    icon: UtensilsCrossed,
  },
  {
    label: 'Delivery & Cold-Chain SLA',
    desc: '05:30 – 07:30 AM pre-dawn fleet drops',
    href: '/delivery',
    icon: Truck,
  },
  {
    label: 'Why Rootwills',
    desc: 'Farm provenance, grower lineage & SALSA assurance',
    href: '/why-choose-us',
    icon: ShieldCheck,
  },
  {
    label: 'Direct Trade Desk',
    desc: 'Speak directly with our commercial wholesale desk',
    href: '/#contact',
    icon: Phone,
    isHash: true,
  },
];

export function FloatingBottomNav() {
  const pathname = usePathname();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setIsLearnOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLearnOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smoothly hide floating nav when approaching footer, reveal when leaving
  useEffect(() => {
    const checkFooterIntersection = () => {
      const footer = document.getElementById('footer');
      if (!footer) {
        setIsNearFooter(false);
        return;
      }

      const rect = footer.getBoundingClientRect();
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

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setIsLearnOpen(false);
    if (pathname === '/' || pathname === '') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: targetId === 'home' ? 0 : elementPosition - headerOffset,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isNearFooter && (
          <motion.div
            key="floating-capsule-nav"
            initial={{ transform: 'translateY(70px)', opacity: 0 }}
            animate={{ transform: 'translateY(0px)', opacity: 1 }}
            exit={{ transform: 'translateY(70px)', opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-4 sm:bottom-7 left-0 right-0 w-full z-50 flex items-center justify-center pointer-events-none px-3"
          >
            <div ref={navContainerRef} className="relative pointer-events-auto max-w-full">
              
              {/* ─── 'Learn' Interactive Dropdown Menu Card ─── */}
              <AnimatePresence>
                {isLearnOpen && (
                  <motion.div
                    initial={{ opacity: 0, transform: 'translateY(10px) scale(0.96)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                    exit={{ opacity: 0, transform: 'translateY(8px) scale(0.96)' }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[90vw] max-w-[340px] z-50 pointer-events-auto"
                  >
                    {/* Concentric Double-Bezel Bevel Frame */}
                    <div className="p-1 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/20 shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
                      <div className="rounded-xl bg-[#121212] border border-white/10 p-2 text-left space-y-1">
                        <div className="px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
                          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#D4A86A] font-semibold">
                            Explore Rootwills
                          </span>
                          <span className="text-[10px] text-white/50 font-mono">B2B Wholesale</span>
                        </div>

                        {LEARN_ITEMS.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={(e) => {
                                if (item.isHash) {
                                  handleSmoothScroll(e, item.href.replace('/#', ''));
                                } else {
                                  setIsLearnOpen(false);
                                }
                              }}
                              className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/10 transition-colors text-white"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-[#D4A86A] group-hover:scale-105 transition-transform">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="block text-xs font-semibold text-white/95 group-hover:text-[#D4A86A] transition-colors leading-tight">
                                  {item.label}
                                </span>
                                <span className="block text-[11px] text-white/60 font-sans mt-0.5 leading-snug line-clamp-1">
                                  {item.desc}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ─── The Iconic Concentric Double-Stroke Pill Navbar ─── */}
              {/* Outer Bezel (Thin outer hairline contour + dark translucent spacing) */}
              <div className="relative p-[3px] rounded-full bg-black/50 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.85)] transition-all">
                
                {/* Inner Solid Black Capsule */}
                <nav
                  aria-label="Floating Navigation Bar"
                  className="relative flex items-center rounded-full bg-[#121212] border border-white/10 pl-4 sm:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2 text-white shadow-inner"
                >
                  
                  {/* Navigation Links Group */}
                  <div className="flex items-center gap-4 sm:gap-7 mr-3 sm:mr-5 text-[13px] sm:text-sm font-sans font-medium">
                    
                    {/* 1. Home */}
                    <Link
                      href="/#home"
                      onClick={(e) => handleSmoothScroll(e, 'home')}
                      className="text-white/85 hover:text-white transition-colors duration-160 cursor-pointer select-none active:scale-[0.96]"
                    >
                      Home
                    </Link>

                    {/* 2. About */}
                    <Link
                      href="/#about"
                      onClick={(e) => handleSmoothScroll(e, 'about')}
                      className="text-white/85 hover:text-white transition-colors duration-160 cursor-pointer select-none active:scale-[0.96]"
                    >
                      About
                    </Link>

                    {/* 3. Learn with Chevron Dropdown */}
                    <button
                      type="button"
                      onClick={() => setIsLearnOpen(!isLearnOpen)}
                      aria-expanded={isLearnOpen}
                      className="flex items-center gap-1 text-white/85 hover:text-white transition-colors duration-160 cursor-pointer select-none active:scale-[0.96] focus:outline-none"
                    >
                      <span>Learn</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-white/70 transition-transform duration-200 ${
                          isLearnOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </button>

                  </div>

                  {/* 4. White Capsule 'Visit ↗' Action Button (Matching Reference Image) */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLearnOpen(false);
                      setInquiryOpen(true);
                    }}
                    aria-label="Book a Visit or Submit Trade Enquiry"
                    className="inline-flex items-center gap-1.5 px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full bg-white hover:bg-stone-100 text-black font-semibold text-xs sm:text-[13px] tracking-tight transition-all duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] shadow-sm cursor-pointer shrink-0"
                  >
                    <span>Visit</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-black stroke-[2.2]" />
                  </button>

                </nav>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trade Enquiry & Tasting Visit Modal */}
      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
