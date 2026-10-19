'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CommercialB2BHero() {
  return (
    <section id="home" className="relative h-[460px] sm:h-[580px] lg:h-[680px] flex items-center overflow-hidden bg-[#120305]">
      {/* Background Image: Chef Plating Produce on Cutting Board */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/commercial/rootwills_hero_chef_plating.jpg"
          alt="Rootwills - A Trusted Partner in Food Services & Wholesale"
          fill
          priority
          unoptimized
          className="object-cover object-[75%_center] lg:object-center"
        />
        {/* Scrim: Dark fade on left side for text contrast, completely transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120305] via-[#120305]/80 via-45% to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-14">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-2 sm:mb-4">
            <span className="text-[#D4A86A] text-[11px] sm:text-sm font-serif tracking-[0.25em] uppercase font-semibold">
              — ROOTWILLS —
            </span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-[54px] font-serif font-bold text-white tracking-tight leading-[1.15] mb-3 sm:mb-5">
            A Trusted Partner in<br />
            <span className="text-[#D4A86A]">Food Services & Wholesale</span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-xs sm:text-base text-[#EFE8DF]/90 font-sans leading-relaxed mb-5 sm:mb-8 max-w-xl">
            Reliable supply solutions for restaurants, caterers, hospitality businesses and food professionals across the UK.
          </p>

          {/* Buttons: Primary Gold Solid + Secondary Burgundy Outlined with Nested Arrow Pills */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="/#services"
              className="group inline-flex items-center gap-2.5 sm:gap-3 pl-5 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 rounded-full bg-[#D4A86A] hover:bg-[#C59958] text-[#2D060D] text-xs sm:text-[13px] font-serif font-bold tracking-wider uppercase transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-md hover:shadow-xl active:scale-[0.98] active:translate-y-[1px] cursor-pointer"
            >
              <span>Our Services</span>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#2D060D]/10 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                <ArrowRight className="w-3.5 h-3.5 text-[#2D060D]" />
              </div>
            </a>

            <a
              href="/#about"
              className="group inline-flex items-center gap-2.5 sm:gap-3 pl-5 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 rounded-full bg-[#250409]/80 hover:bg-[#380710] ring-1 ring-[#BA8E4E]/40 hover:ring-[#BA8E4E] text-white text-xs sm:text-[13px] font-serif font-bold tracking-wider uppercase transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-md hover:shadow-xl active:scale-[0.98] active:translate-y-[1px] cursor-pointer"
            >
              <span className="text-[#EDE4D8]">About Rootwills</span>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                <ArrowRight className="w-3.5 h-3.5 text-[#D4A86A]" />
              </div>
            </a>
          </div>

        </div>
      </div>

      {/* Center Bottom Scroll Indicator */}
      <div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer text-cream-200/70 hover:text-white transition-colors"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div className="w-5 h-7 rounded-full border border-[#BA8E4E]/50 flex items-start justify-center p-1 shadow-xs">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1 rounded-full bg-[#D4A86A]"
          />
        </div>
        <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-[#D4A86A]/85 font-semibold">
          SCROLL DOWN
        </span>
      </div>
    </section>
  );
}
