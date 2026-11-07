'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';

export function FloatingBrandWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsSubmitted(true);
  };

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-3.5 left-3.5 sm:bottom-5 sm:left-5 z-50 flex flex-col items-start select-none pointer-events-none"
    >
      {/* ─── FLOATING POPOVER CARD (OPEN STATE) ─── */}
      <div
        className={`absolute bottom-full left-0 mb-3 sm:mb-4 w-[calc(100vw-1.75rem)] max-w-[320px] sm:w-[376px] sm:max-w-none min-h-0 sm:min-h-[510px] max-h-[calc(100svh-130px)] overflow-y-auto rounded-2xl bg-[#FFFDF9] border border-[#E6DAC3] shadow-[0_24px_65px_rgba(24,2,5,0.34)] flex flex-col justify-between origin-bottom-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen
            ? 'opacity-100 visible scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 invisible scale-90 translate-y-4 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <div>
          {/* ─── TOP BRAND HEADER (DEEP OXBLOOD + GOLD BOTANICAL CANVAS) ─── */}
          <div className="relative bg-[#2B040A] text-white pt-4 sm:pt-6 pb-16 sm:pb-20 px-5 sm:px-6 overflow-hidden">
            {/* Subtle Luxury Botanical Canvas Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-45 mix-blend-screen"
              style={{
                backgroundImage: "url('/images/textures/rootwills_luxury_footer_canvas.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(145deg, rgba(43,4,10,0.88) 0%, rgba(78,13,23,0.78) 100%)',
              }}
            />

            {/* Top Row: Logo + Tagline on Left, Close (X) on Right */}
            <div className="relative z-10 flex items-center justify-between mb-3.5 sm:mb-5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-[#FAF7F2] p-0.5 ring-1 ring-[#F3D08A]/75 shadow-sm shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Rootwills Logo"
                    fill
                    sizes="44px"
                    className="object-contain rounded-full"
                  />
                </div>
                <div className="leading-tight">
                  <span className="block font-serif font-bold text-base sm:text-lg tracking-tight text-white">
                    Rootwills
                  </span>
                  <span className="block font-sans text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F3D08A]">
                    Food Services &amp; Wholesale
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Rootwills widget"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Greeting Copy */}
            <div className="relative z-10">
              <h3 className="font-sans font-extrabold text-2xl sm:text-[28px] tracking-tight text-white leading-snug">
                Hi!
              </h3>
              <p className="font-sans text-xs sm:text-[13px] font-medium text-[#F5EDE1]/90 mt-0.5">
                Welcome to Rootwills.co.uk
              </p>
            </div>
          </div>

          {/* ─── OVERLAPPING INNER CALLOUT CARD ─── */}
          <div className="relative z-20 -mt-11 sm:-mt-12 mx-3.5 sm:mx-4 rounded-xl bg-[#FFFDF9] shadow-[0_12px_34px_rgba(24,2,5,0.16)] border border-[#EAE0CE] overflow-hidden">
            {/* Upper Burgundy Banner */}
            <div className="bg-[#3D0812] px-4 py-4 sm:px-6 sm:py-6 text-center border-b border-[#F3D08A]/25">
              <p className="font-sans font-bold text-[13.5px] sm:text-[15px] leading-snug text-white">
                Sign up to stay updated on seasonal British harvests &amp; wholesale supply
              </p>
            </div>

            {/* Lower White/Ivory Form Area */}
            <div className="p-4 sm:p-5 text-center bg-[#FFFDF9]">
              {isSubmitted ? (
                <div className="py-3 sm:py-4 px-2 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#4E0D17]/10 text-[#4E0D17] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="font-sans font-bold text-sm text-[#180205]">
                    Thank you for connecting!
                  </p>
                  <p className="font-sans text-xs text-stone-600 leading-relaxed">
                    Our wholesale desk has received your email and will be in touch shortly.
                  </p>
                </div>
              ) : (
                <>
                  <p className="font-sans font-semibold text-xs sm:text-[13px] leading-relaxed text-[#180205] mb-3.5 sm:mb-4 px-1">
                    Join our trade mailing list for seasonal harvest updates, wholesale supply schedules &amp; kitchen insights.
                  </p>

                  <form onSubmit={handleSubmit} className="flex items-stretch">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email here..."
                      className="flex-1 min-w-0 h-10 sm:h-11 px-3.5 sm:px-4 text-xs sm:text-[13px] font-sans text-[#180205] bg-white border border-r-0 border-[#D8CBB3] rounded-l-lg focus:outline-none focus:border-[#4E0D17] placeholder:text-stone-400"
                    />
                    <button
                      type="submit"
                      aria-label="Submit email"
                      className="w-10 h-10 sm:w-11 sm:h-11 bg-[#3D0812] hover:bg-[#260309] text-white flex items-center justify-center rounded-r-lg transition-colors shrink-0 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5 text-[#F3D08A]" />
                    </button>
                  </form>
                </>
              )}

              <p className="font-sans text-[10.5px] sm:text-[11px] text-stone-500 mt-3 sm:mt-3.5 leading-normal">
                To see how we process your data view our{' '}
                <Link
                  href="/privacy"
                  onClick={() => setIsOpen(false)}
                  className="underline text-stone-700 hover:text-[#4E0D17] transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM BRAND CAPTION ─── */}
        <div className="pt-4 sm:pt-6 pb-3 sm:pb-3.5 text-center">
          <span className="font-sans text-[10.5px] sm:text-[11px] font-medium text-stone-400 tracking-wide">
            Powered by <strong className="font-bold text-stone-600">Rootwills</strong>
          </span>
        </div>
      </div>

      {/* ─── FLOATING BOTTOM-LEFT CIRCULAR LOGO LAUNCHER BUTTON ─── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Minimize Rootwills widget' : 'Open Rootwills welcome widget'}
        aria-expanded={isOpen}
        className="pointer-events-auto group relative w-[52px] h-[52px] sm:w-[70px] sm:h-[70px] rounded-full bg-[#2B040A] text-white shadow-[0_12px_32px_rgba(24,2,5,0.42)] ring-2 ring-[#F3D08A]/80 hover:ring-[#F3D08A] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer overflow-hidden touch-manipulation"
      >
        {/* Closed State: Crisp Rootwills Circular Logo */}
        <span
          className={`absolute inset-1 rounded-full overflow-hidden bg-[#FAF7F2] flex items-center justify-center transition-all duration-300 ${
            isOpen ? 'opacity-0 scale-50 rotate-45' : 'opacity-100 scale-100 rotate-0'
          }`}
        >
          <Image
            src="/images/logo.png"
            alt="Rootwills"
            fill
            sizes="68px"
            className="object-contain p-0.5 rounded-full"
          />
        </span>

        {/* Open State: Circular Chevron-Down Icon */}
        <span
          className={`flex items-center justify-center transition-all duration-300 ${
            isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-45'
          }`}
        >
          <ChevronDown className="w-7 h-7 text-[#F3D08A]" strokeWidth={2.5} />
        </span>
      </button>
    </div>
  );
}

