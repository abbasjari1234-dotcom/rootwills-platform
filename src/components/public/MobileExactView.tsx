'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { InquiryModal } from './InquiryModal';

export function MobileExactView() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <div className="w-full bg-[#FBF9F6] text-stone-900 font-sans">

      {/* ─── 1. MOBILE TOP HEADER ─── */}
      <header className="sticky top-0 z-50 w-full bg-[#FAF7F0] border-b border-[#E7DEC8] px-4 py-3 shadow-xs">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {/* Logo Medallion */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md ring-2 ring-[#BA8E4E]/40 bg-white shrink-0">
              <Image
                src="/images/branded/rootwills_logo_seal.png"
                alt="Rootwills Medallion"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-sm tracking-wider text-[#4E0D17]">
                ROOTWILLS
              </span>
              <span className="text-[8px] font-sans tracking-[0.2em] uppercase text-stone-500">
                FOOD SERVICES & WHOLESALE
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setInquiryOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#4E0D17] text-white text-xs font-serif font-medium tracking-wide shadow-xs hover:bg-[#3D0A12] transition-colors"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4A86A]" />
          </button>
        </div>

        {/* Horizontal Navigation Pills */}
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-4 pt-2 text-[11px] font-serif text-stone-700 tracking-wide">
          <a href="#mob-home" className="text-[#4E0D17] font-bold border-b border-[#BA8E4E] pb-0.5 whitespace-nowrap">Home</a>
          <a href="#mob-about" className="whitespace-nowrap hover:text-[#4E0D17]">About Us</a>
          <a href="#mob-services" className="whitespace-nowrap hover:text-[#4E0D17]">Our Services</a>
          <a href="#mob-why" className="whitespace-nowrap hover:text-[#4E0D17]">Why RootWills</a>
          <a href="#mob-approach" className="whitespace-nowrap hover:text-[#4E0D17]">Our Approach</a>
          <a href="#mob-contact" className="whitespace-nowrap hover:text-[#4E0D17]">Contact</a>
        </div>
      </header>

      {/* ─── 2. HERO SECTION ─── */}
      <section id="mob-home" className="px-4 pt-4 pb-8 max-w-lg mx-auto">
        <div className="bg-[#4E0D17] text-white rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-lg border border-[#BA8E4E]/30">

          {/* Damask Texture Overlay */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-25 mix-blend-screen"
            style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
          />

          {/* Eyebrow */}
          <div className="relative z-10 flex items-center gap-2 mb-2">
            <span className="text-[#D4A86A] text-[11px] font-serif tracking-[0.2em] uppercase font-semibold">
              — ROOTWILLS —
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight mb-3">
            Your Trusted Partner in<br />
            <span className="text-[#D4A86A]">Food Services & Wholesale</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs text-cream-100/85 leading-relaxed font-sans mb-6">
            Quality ingredients. Reliable supply. Stronger businesses. Together, we grow.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-2.5 mb-5">
            <a
              href="#mob-services"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md bg-[#D4A86A] text-[#2D060D] text-xs font-serif font-bold tracking-wide shadow-xs"
            >
              <span>Our Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setInquiryOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md bg-[#380710] border border-[#BA8E4E]/50 text-white text-xs font-serif font-bold tracking-wide shadow-xs"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4A86A]" />
            </button>
          </div>

          {/* Hero Image within card */}
          <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden shadow-md mt-2">
            <Image
              src="/images/commercial/rootwills_hero_concept2_heirloom.jpg"
              alt="Artisanal Fresh Produce & Wholesale"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── 3. ABOUT ROOTWILLS SECTION ─── */}
      <section id="mob-about" className="px-4 py-8 max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#BA8E4E] text-[11px] font-serif tracking-[0.2em] uppercase font-semibold">
            — ABOUT ROOTWILLS —
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4E0D17] leading-tight mb-3">
          Building Stronger<br />
          Food Businesses
        </h2>

        <p className="text-xs text-stone-600 leading-relaxed font-sans mb-5">
          RootWills is a UK-based B2B food services and wholesale supplier, dedicated to providing high-quality products and reliable service to the food industry. We work closely with restaurants, caterers, hotels and food businesses across the UK to deliver fresh, premium ingredients you can trust.
        </p>

        <button
          onClick={() => setInquiryOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#4E0D17] text-white text-xs font-serif font-bold tracking-wide shadow-xs mb-7"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D4A86A]" />
        </button>

        {/* Arch Image with Overlapping Medallion Badge */}
        <div className="relative flex justify-center items-center py-4">
          <div className="relative w-56 h-64 rounded-t-full rounded-b-2xl overflow-hidden shadow-lg border-2 border-[#D4A86A]/40 bg-[#FAF7F0]">
            <Image
              src="/images/commercial/rootwills_portrait_produce.jpg"
              alt="Rootwills Produce"
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          {/* Overlapping Circular Medallion */}
          <div className="absolute -bottom-2 right-8 w-20 h-20 rounded-full overflow-hidden shadow-2xl ring-4 ring-white bg-[#FAF7F0]">
            <Image
              src="/images/branded/rootwills_logo_seal.png"
              alt="Seal"
              width={80}
              height={80}
              unoptimized
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 gap-3.5 mt-8 pt-3 border-t border-[#E7DEC8]">
          <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg border border-[#E7DEC8] shadow-xs">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F0] border border-[#BA8E4E]/40 flex items-center justify-center text-[#BA8E4E] shrink-0">
              <svg className="w-5 h-5 stroke-[#BA8E4E] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <div>
              <span className="block font-serif font-bold text-sm text-[#4E0D17]">Quality First</span>
              <span className="text-[11px] text-stone-500 font-sans">Only the finest ingredients, verified daily.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg border border-[#E7DEC8] shadow-xs">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F0] border border-[#BA8E4E]/40 flex items-center justify-center text-[#BA8E4E] shrink-0">
              <svg className="w-5 h-5 stroke-[#BA8E4E] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m11 17 2 2a1 1 0 0 0 1.4 0l3.6-3.6a2 2 0 0 0 0-2.8l-1.4-1.4a2 2 0 0 0-2.8 0L12 13" />
                <path d="m3 11 5-5a2 2 0 0 1 2.8 0l1.4 1.4a2 2 0 0 1 0 2.8L10 12" />
              </svg>
            </div>
            <div>
              <span className="block font-serif font-bold text-sm text-[#4E0D17]">Reliable Partnerships</span>
              <span className="text-[11px] text-stone-500 font-sans">Dedicated account managers and consistent pricing.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg border border-[#E7DEC8] shadow-xs">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F0] border border-[#BA8E4E]/40 flex items-center justify-center text-[#BA8E4E] shrink-0">
              <svg className="w-5 h-5 stroke-[#BA8E4E] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div>
              <span className="block font-serif font-bold text-sm text-[#4E0D17]">Fresh & Premium Produce</span>
              <span className="text-[11px] text-stone-500 font-sans">Cold-chain logistics guaranteeing fresh arrivals.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. OUR SERVICES: WHAT WE OFFER ─── */}
      <section id="mob-services" className="px-4 py-8 max-w-lg mx-auto bg-[#F4EFEA]/60 rounded-2xl my-4 border border-[#E7DEC8]">
        <div className="text-center mb-6">
          <span className="text-[#BA8E4E] text-[11px] font-serif tracking-[0.2em] uppercase font-semibold block mb-1">
            — OUR SERVICES —
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#4E0D17] mb-2">
            What We Offer
          </h2>
          <p className="text-xs text-stone-600 max-w-xs mx-auto">
            Comprehensive food supply solutions for your business needs.
          </p>
        </div>

        <div className="space-y-4">
          {/* Card 1 */}
          <div className="bg-white border border-[#E7DEC8] rounded-xl p-5 shadow-xs relative">
            <div className="w-10 h-10 rounded-full bg-[#4E0D17] flex items-center justify-center mb-3">
              <svg className="w-5 h-5 stroke-[#D4A86A] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v2" />
                <path d="M4 17h16" />
                <path d="M4 17a8 8 0 0 1 16 0" />
                <circle cx="12" cy="3" r="1" fill="#D4A86A" />
              </svg>
            </div>
            <h3 className="font-serif font-bold text-base text-[#4E0D17] mb-1.5">
              Food Service Supply
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans mb-3">
              Fresh, high-quality ingredients and essential food products for restaurants, caterers and hospitality businesses.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setInquiryOpen(true)}
                className="w-7 h-7 rounded-full bg-[#4E0D17] text-[#D4A86A] flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Inquire Food Service Supply"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#E7DEC8] rounded-xl p-5 shadow-xs relative">
            <div className="w-10 h-10 rounded-full bg-[#4E0D17] flex items-center justify-center mb-3">
              <svg className="w-5 h-5 stroke-[#D4A86A] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
            </div>
            <h3 className="font-serif font-bold text-base text-[#4E0D17] mb-1.5">
              Wholesale Solutions
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans mb-3">
              Efficient, reliable wholesale supply for food businesses of all sizes, from independents to large operations.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setInquiryOpen(true)}
                className="w-7 h-7 rounded-full bg-[#4E0D17] text-[#D4A86A] flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Inquire Wholesale Solutions"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#E7DEC8] rounded-xl p-5 shadow-xs relative">
            <div className="w-10 h-10 rounded-full bg-[#4E0D17] flex items-center justify-center mb-3">
              <svg className="w-5 h-5 stroke-[#D4A86A] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m11 17 2 2a1 1 0 0 0 1.4 0l3.6-3.6a2 2 0 0 0 0-2.8l-1.4-1.4a2 2 0 0 0-2.8 0L12 13" />
                <path d="m3 11 5-5a2 2 0 0 1 2.8 0l1.4 1.4a2 2 0 0 1 0 2.8L10 12" />
                <path d="M2 13a6 6 0 0 0 9 5l1-1" />
                <path d="M22 11a6 6 0 0 0-9-5l-1 1" />
              </svg>
            </div>
            <h3 className="font-serif font-bold text-base text-[#4E0D17] mb-1.5">
              Business Partnerships
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans mb-3">
              We work alongside our clients to understand their needs and create supply solutions that support their growth.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setInquiryOpen(true)}
                className="w-7 h-7 rounded-full bg-[#4E0D17] text-[#D4A86A] flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Inquire Business Partnerships"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. WHY CHOOSE ROOTWILLS: OUR COMMITMENT TO YOUR SUCCESS ─── */}
      <section id="mob-why" className="px-4 py-10 bg-[#4E0D17] text-white my-6 relative overflow-hidden">
        {/* Damask Texture Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-25 mix-blend-screen"
          style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
        />

        <div className="relative z-10 max-w-lg mx-auto text-center">
          <span className="text-[#D4A86A] text-[11px] font-serif tracking-[0.2em] uppercase font-semibold block mb-1">
            — WHY CHOOSE ROOTWILLS —
          </span>
          <h2 className="text-2xl font-serif font-bold text-white mb-8">
            Our Commitment to Your Success
          </h2>

          <div className="grid grid-cols-2 gap-5 text-left">
            {/* Pillar 1 */}
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
              <div className="w-8 h-8 flex items-center justify-start text-[#D4A86A] mb-2.5">
                <svg className="w-6 h-6 stroke-[#D4A86A] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12l4 6-10 12L2 9Z" />
                  <path d="M11 3 8 9l4 12 4-12-3-6" />
                  <path d="M2 9h20" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-sm text-white mb-1">Premium</h3>
              <p className="text-[11px] text-cream-100/75 leading-tight">Only the best products, always.</p>
            </div>

            {/* Pillar 2 */}
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
              <div className="w-8 h-8 flex items-center justify-start text-[#D4A86A] mb-2.5">
                <svg className="w-6 h-6 stroke-[#D4A86A] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                  <circle cx="17" cy="18" r="2" />
                  <circle cx="7" cy="18" r="2" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-sm text-white mb-1">Reliable Supply</h3>
              <p className="text-[11px] text-cream-100/75 leading-tight">On time, every time.</p>
            </div>

            {/* Pillar 3 */}
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
              <div className="w-8 h-8 flex items-center justify-start text-[#D4A86A] mb-2.5">
                <svg className="w-6 h-6 stroke-[#D4A86A] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-sm text-white mb-1">Trusted Partner</h3>
              <p className="text-[11px] text-cream-100/75 leading-tight">Supporting your business growth.</p>
            </div>

            {/* Pillar 4 */}
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
              <div className="w-8 h-8 flex items-center justify-start text-[#D4A86A] mb-2.5">
                <svg className="w-6 h-6 stroke-[#D4A86A] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-sm text-white mb-1">Long-Term Relationships</h3>
              <p className="text-[11px] text-cream-100/75 leading-tight">Built on trust and mutual success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. OUR APPROACH ─── */}
      <section id="mob-approach" className="px-4 py-8 max-w-lg mx-auto">
        <span className="text-[#BA8E4E] text-[11px] font-serif tracking-[0.2em] uppercase font-semibold block mb-1">
          — OUR APPROACH —
        </span>
        <h2 className="text-2xl font-serif font-bold text-[#4E0D17] leading-tight mb-3">
          Fresh Produce. Greater Possibilities.
        </h2>
        <p className="text-xs text-stone-600 leading-relaxed font-sans mb-5">
          We believe in building long-term partnerships through integrity, consistency and exceptional service. From sourcing the finest products to ensuring timely delivery, our approach is simple — your success is our priority.
        </p>

        <button
          onClick={() => setInquiryOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#D4A86A] text-[#2D060D] text-xs font-serif font-bold tracking-wide shadow-xs mb-6"
        >
          <span>Our Approach</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden shadow-md border border-[#E7DEC8]">
          <Image
            src="/images/commercial/rootwills_chef_salad_plating.jpg"
            alt="Chef artfully plating fresh dish"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </section>

      {/* ─── 7. GET IN TOUCH BANNER CARD ─── */}
      <section id="mob-contact" className="px-4 py-6 max-w-lg mx-auto">
        <div className="bg-[#4E0D17] text-white rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-xl border border-[#BA8E4E]/40">

          {/* Classical Greek Figures Watermark Background */}
          <div className="absolute left-0 top-0 bottom-0 w-44 opacity-20 pointer-events-none overflow-hidden flex items-center">
            <Image
              src="/images/commercial/rootwills_harvest_figures_clean.png"
              alt="Greek Figures Watermark"
              width={200}
              height={120}
              unoptimized
              className="w-full h-auto object-contain object-left"
            />
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-2xl font-serif font-bold text-white mb-2">
              Get in Touch
            </h2>
            <p className="text-xs text-cream-100/85 mb-6 max-w-xs mx-auto">
              Have a question or want to discuss your business needs? We&apos;d love to hear from you.
            </p>

            <div className="space-y-2.5 text-xs text-cream-100/90 mb-6 text-left max-w-xs mx-auto">
              <a href="tel:+442012345678" className="flex items-center gap-2.5 hover:text-white">
                <Phone className="w-4 h-4 text-[#D4A86A] shrink-0" />
                <span>+44 (0) 20 1234 5678</span>
              </a>
              <a href="mailto:info@rootwills.co.uk" className="flex items-center gap-2.5 hover:text-white">
                <Mail className="w-4 h-4 text-[#D4A86A] shrink-0" />
                <span>info@rootwills.co.uk</span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A86A] shrink-0" />
                <span>London, United Kingdom</span>
              </div>
            </div>

            <button
              onClick={() => setInquiryOpen(true)}
              className="w-full py-3 rounded-md bg-[#D4A86A] hover:bg-[#C59958] text-[#2D060D] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md"
            >
              Send Enquiry →
            </button>
          </div>
        </div>
      </section>

      {/* ─── 8. MOBILE FOOTER ─── */}
      <footer className="bg-[#2E060D] text-white pt-8 pb-6 px-4 mt-8 border-t border-[#BA8E4E]/25 relative overflow-hidden">
        {/* Damask Texture Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20 mix-blend-screen"
          style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
        />

        <div className="relative z-10 max-w-lg mx-auto text-center space-y-5">
          {/* Logo & Brand */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg ring-2 ring-[#BA8E4E]/50 bg-white">
              <Image
                src="/images/branded/rootwills_logo_seal.png"
                alt="Rootwills Seal"
                width={56}
                height={56}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-serif font-bold text-lg tracking-widest text-white">
              ROOTWILLS
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#D4A86A] uppercase font-sans">
              FOOD SERVICES & WHOLESALE
            </span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-serif text-cream-100/80 pt-2">
            <a href="#mob-home" className="hover:text-white">Home</a>
            <a href="#mob-about" className="hover:text-white">About Us</a>
            <a href="#mob-services" className="hover:text-white">Our Services</a>
            <a href="#mob-why" className="hover:text-white">Why RootWills</a>
            <a href="#mob-approach" className="hover:text-white">Our Approach</a>
            <a href="#mob-contact" className="hover:text-white">Contact</a>
          </div>

          {/* Socials */}
          <div className="flex justify-center items-center gap-3 pt-2">
            <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs hover:border-[#D4A86A] hover:text-[#D4A86A]">
              in
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs hover:border-[#D4A86A] hover:text-[#D4A86A]">
              ig
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs hover:border-[#D4A86A] hover:text-[#D4A86A]" aria-label="X">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {/* Industry Accreditations Strip */}
          <div className="pt-3 text-center">
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[9px] font-sans tracking-[0.14em] uppercase text-cream-100/60">
              <span>✦ SALSA Assured</span>
              <span>✦ Red Tractor</span>
              <span>✦ Chilled Fleet</span>
            </div>
            <p className="text-[9px] font-sans tracking-[0.1em] text-[#D4A86A]/80 uppercase mt-1">
              Bermondsey SE16 · Birmingham B24
            </p>
          </div>

          {/* Three Diamonds Divider */}
          <div className="relative w-full h-[1px] bg-white/10 my-4 flex items-center justify-center">
            <div className="bg-[#2E060D] px-2 text-[8px] text-[#D4A86A] tracking-[0.3em]">
              ◆ ◆ ◆
            </div>
          </div>

          {/* Copyright & Motto */}
          <div className="text-[10px] text-cream-100/60 space-y-1 font-sans">
            <p>© 2025 RootWills. All rights reserved.</p>
            <p className="font-serif tracking-wider text-[#D4A86A]/80">
              Quality. Consistency. Partnership.
            </p>
          </div>
        </div>
      </footer>

      {/* Inquiry Modal */}
      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
