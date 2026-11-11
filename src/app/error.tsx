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
    <div className="relative min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Seamless Botanical Parchment Texture Overlay */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />
      <div className="relative z-10 max-w-xl mx-auto w-full space-y-6">
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

        <div className="p-1.5 sm:p-2 rounded-[2rem] bg-[#EFE8D8]/85 ring-1 ring-[#BA8E4E]/35 shadow-[0_16px_44px_rgba(46,6,13,0.06)]">
          <div className="relative bg-[#FFFDF9] rounded-[calc(2rem-0.5rem)] p-8 sm:p-10 border border-white/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.95)] text-center space-y-6 overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/35 text-[#BA8E4E] mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 stroke-[1.8]" />
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

            {error?.message && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-mono text-rose-900 break-words text-left max-h-36 overflow-y-auto shadow-inner">
                <span className="font-bold block uppercase text-[10px] tracking-wider text-rose-700 mb-1">Diagnostic Error:</span>
                {error.message}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem('rootwills_direct_draft_order');
                  } catch {
                    // ignore
                  }
                  reset();
                }}
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#131313] hover:bg-[#2A2A2A] text-[#FCFCFA] font-sans font-semibold text-xs sm:text-[13px] shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
              <Link
                href="/"
                onClick={() => {
                  try {
                    localStorage.removeItem('rootwills_direct_draft_order');
                  } catch {
                    // ignore
                  }
                }}
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-stone-50 text-[#131313] border border-stone-300 font-sans font-semibold text-xs sm:text-[13px] shadow-sm transition-colors active:scale-95"
              >
                <span>Go to Homepage</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#FFFDF9] border border-[#E8DEC8] rounded-2xl flex items-center justify-between text-xs shadow-xs">
          <div className="flex items-center gap-2.5 text-stone-600 font-sans">
            <Phone className="w-4 h-4 text-[#BA8E4E]" />
            <span>Commercial Support Desk: <strong>+44 16164 12803</strong></span>
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
