'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AlertTriangle, RotateCcw, ArrowLeft, Phone } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Rootwills Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto w-full space-y-6">
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

        <div className="bg-[#FFFDF9] border border-[#E8DEC8] rounded-3xl p-8 sm:p-10 shadow-sm text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#2E060D]/10 text-[#2E060D] mx-auto flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-[#BA8E4E]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E060D]">
              Something went wrong
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm mx-auto font-sans">
              An unexpected error occurred while loading this page. Please try refreshing or return to the homepage.
            </p>
          </div>

          {error?.digest && (
            <div className="p-2.5 rounded-lg bg-[#FAF6EE] border border-[#E8DEC8] text-[11px] font-mono text-stone-500">
              Incident Ref: {error.digest}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="px-5 py-2.5 rounded-full bg-[#2E060D] hover:bg-[#380710] text-[#D4A86A] font-serif font-semibold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-full bg-[#FAF6EE] border border-[#E8DEC8] hover:border-[#BA8E4E] text-[#2E060D] font-serif font-semibold text-xs shadow-xs transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>

        <div className="p-4 bg-[#FFFDF9] border border-[#E8DEC8] rounded-2xl flex items-center justify-between text-xs shadow-xs">
          <div className="flex items-center gap-2.5 text-stone-600 font-sans">
            <Phone className="w-4 h-4 text-[#BA8E4E]" />
            <span>Commercial Support Desk: <strong>+44 (0) 20 1234 5678</strong></span>
          </div>
          <Link href="/contact" className="text-[#BA8E4E] font-serif font-bold hover:underline">
            Contact Team &rarr;
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-stone-400 font-sans">
        Rootwills Ltd &bull; London &amp; Midlands, UK
      </div>
    </div>
  );
}
