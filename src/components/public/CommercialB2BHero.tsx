'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export function CommercialB2BHero() {
  return (
    <section className="relative min-h-[80vh] lg:min-h-[88vh] flex items-center overflow-hidden bg-slate-950">
      {/* 4K Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/commercial/01_hero_chef_v2.jpg"
          alt="Rootwills Commercial Foodservice Supplier"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[72%_center] lg:object-center"
        />
        {/* Subtle cinematic gradient overlay to ensure crisp headline readability without washing out the chef & produce */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl">
          {/* Green Eyebrow Text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-emerald-400">
              B2B FOOD SERVICE SUPPLIER
            </span>
          </motion.div>

          {/* Primary High-Impact Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans font-extrabold text-white tracking-tight leading-[1.08] mb-6"
          >
            Fresh Food.<br />
            Reliable Supply.<br />
            <span className="text-emerald-400">
              Better Business.
            </span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed mb-8 max-w-xl"
          >
            Professional food and fresh produce supply for restaurants, hotels, caterers, care homes and other businesses.
          </motion.p>

          {/* 3 Action Pill Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
          >
            {/* Primary Action Button: Open Account */}
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-3 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-sans font-bold text-sm sm:text-base shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto text-center"
            >
              <span>Open a Business Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary Action: Request Price List */}
            <Link
              href="/contact?subject=Price+List+Request"
              className="inline-flex items-center justify-center px-5 sm:px-6 py-3.5 sm:py-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/70 text-white font-sans font-semibold text-sm sm:text-base backdrop-blur-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto text-center"
            >
              <span>Request a Price List</span>
            </Link>

            {/* Tertiary Action: Customer Portal Login */}
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/70 text-white font-sans font-semibold text-sm sm:text-base backdrop-blur-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto text-center"
            >
              <Lock className="w-4 h-4 text-white" />
              <span>Login to Customer Portal</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
