import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  ArrowLeft, 
  Phone, 
  Building2, 
  HelpCircle,
  FileText
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        {/* Brand Header */}
        <div className="flex justify-between items-center pb-6 border-b border-[#E8DEC8]">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
              <Image
                src="/images/branded/rootwills_logo_seal.png"
                alt="Rootwills Logo Seal"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg text-[#2E060D] tracking-wider leading-tight">
                ROOTWILLS
              </span>
              <span className="text-[9px] font-serif tracking-[0.25em] uppercase text-[#BA8E4E] font-semibold">
                Food Services &amp; Wholesale
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-serif font-semibold text-[#BA8E4E] hover:text-[#8C6629] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        {/* 404 Main Callout */}
        {/* 404 Main Callout */}
        <div className="relative bg-[#FFFDF9]/95 backdrop-blur-md border border-[#E8DEC8] rounded-3xl p-8 sm:p-12 shadow-[0_4px_20px_rgba(46,6,13,0.03)] text-center space-y-6 overflow-hidden">
          {/* Specular top rim */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 text-[#2E060D] text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-semibold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
            <span>404 // ROUTE NOT LOCATED</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#131313] tracking-tight">
              Page Not Located
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto font-sans leading-relaxed">
              The requested commercial showcase page, product category, or trade resource could not be found. It may have moved or been updated.
            </p>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <Link
              href="/#services"
              className="relative p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] hover:border-[#BA8E4E] hover:shadow-md transition-all group overflow-hidden"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/30 text-[#BA8E4E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h2 className="text-sm font-serif font-bold text-[#131313] group-hover:text-[#8B2635] transition-colors">
                Wholesale Services
              </h2>
              <p className="text-xs text-stone-600 mt-1 font-sans">
                Explore hand-graded British produce, dairy, and culinary lines.
              </p>
            </Link>

            <Link
              href="/contact"
              className="relative p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] hover:border-[#BA8E4E] hover:shadow-md transition-all group overflow-hidden"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/30 text-[#BA8E4E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Building2 className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h2 className="text-sm font-serif font-bold text-[#131313] group-hover:text-[#8B2635] transition-colors">
                Partner With Rootwills
              </h2>
              <p className="text-xs text-stone-600 mt-1 font-sans">
                Arrange bespoke samples, locked rates, or pre-dawn drops.
              </p>
            </Link>

            <Link
              href="/about"
              className="relative p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] hover:border-[#BA8E4E] hover:shadow-md transition-all group overflow-hidden"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/30 text-[#BA8E4E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h2 className="text-sm font-serif font-bold text-[#131313] group-hover:text-[#8B2635] transition-colors">
                About Rootwills
              </h2>
              <p className="text-xs text-stone-600 mt-1 font-sans">
                Learn about our heritage, accreditations, and supply chain.
              </p>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#131313] hover:bg-[#2A2A2A] text-[#FCFCFA] text-xs sm:text-[13px] font-sans font-semibold tracking-wide transition-all duration-200 active:scale-[0.96] shadow-sm"
            >
              <span>Back to Homepage</span>
              <span className="text-stone-400 group-hover:text-white transition-colors">↗</span>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-stone-50 text-[#131313] text-xs sm:text-[13px] font-sans font-semibold tracking-wide border border-stone-300 transition-all duration-200 active:scale-[0.96] shadow-sm"
            >
              <span>Contact Commercial Team</span>
            </Link>
          </div>
        </div>

        {/* Early Morning Depot Helpline */}
        <div className="p-4 sm:p-5 bg-[#FFFDF9] border border-[#E8DEC8] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2E060D] text-[#D4A86A] border border-[#BA8E4E]/30 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-bold text-[#2E060D] block text-sm">
                Need Immediate Kitchen Depot Support?
              </span>
              <span className="text-stone-500 font-sans">
                London &amp; Midlands Logistics Desk: +44 (0) 20 1234 5678 (Live 02:00 – 16:00 GMT)
              </span>
            </div>
          </div>
          <a
            href="tel:+442012345678"
            className="px-4 py-2 rounded-full bg-[#FAF6EE] hover:bg-[#F3EAD8] text-[#2E060D] border border-[#BA8E4E]/40 font-serif font-semibold text-xs transition-colors shrink-0"
          >
            Call Dispatch Desk
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-stone-500 font-serif">
        Rootwills Commercial Purveyors &bull; London &amp; Midlands Wholesale Depots
      </div>
    </div>
  );
}
