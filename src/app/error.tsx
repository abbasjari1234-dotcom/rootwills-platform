'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, ArrowLeft, Phone } from 'lucide-react';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';

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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto w-full space-y-6">
        <div className="flex justify-between items-center pb-6 border-b border-slate-200">
          <RootwillsLogo size="md" variant="full" />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xs text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Something went wrong
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Our kitchen portal encountered an unexpected runtime issue. Your order drafts and account data remain secure.
            </p>
          </div>

          {error?.digest && (
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-500">
              Incident Ref: {error.digest}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs shadow-xs transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs shadow-xs">
          <div className="flex items-center gap-2.5 text-slate-600">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Need immediate phone assistance? <strong>0121 790 4500</strong></span>
          </div>
          <Link href="/contact" className="text-emerald-700 font-semibold hover:underline">
            Support Desk &rarr;
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-slate-400">
        Rootwills Foodservice Ltd &bull; 24/7 Operations Monitoring
      </div>
    </div>
  );
}
