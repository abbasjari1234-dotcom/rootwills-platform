'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function CommercialBottomCTA() {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Split Banner Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 items-stretch">
          
          {/* Left Visual: 4K Produce Harvest */}
          <div className="md:col-span-5 relative min-h-[160px] sm:min-h-[220px] md:min-h-[280px] bg-slate-100 overflow-hidden">
            <Image
              src="/images/commercial/17_cta_produce.jpg"
              alt="Fresh Produce Vegetables Wholesale Supply"
              fill
              quality={95}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="md:col-span-7 p-5 sm:p-10 lg:p-12 flex flex-col justify-center">
            <div className="mb-1.5 sm:mb-2">
              <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-emerald-600">
                READY TO GET STARTED?
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight mb-2 sm:mb-3">
              Become a Customer Today
            </h2>

            <p className="text-slate-600 font-sans text-xs sm:text-base leading-relaxed mb-4 sm:mb-6">
              Join 1,000+ businesses already enjoying our fresh foodservice supply.
            </p>

            <div className="flex flex-col items-stretch sm:items-start gap-3">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 sm:py-3.5 rounded-full bg-[#14532d] hover:bg-[#166534] text-white font-sans font-bold text-sm shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto text-center"
              >
                <span>Open a Business Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="text-xs sm:text-sm font-sans font-semibold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center justify-center sm:justify-start gap-1.5 pt-0.5"
              >
                <span>Or get in touch with our sales team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
