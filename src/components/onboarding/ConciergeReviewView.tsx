'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Clock, ShieldCheck, Building2, PhoneCall } from 'lucide-react';

export function ConciergeReviewView() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full text-center space-y-8 animate-fade-in">
        {/* Glow Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 mx-auto shadow-sm border border-amber-200">
          <Building2 className="w-10 h-10" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>ENTERPRISE CONCIERGE REVIEW</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Enterprise Account Priority Review
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Due to your high-volume requirements and bespoke credit tier request, your application has been assigned to our Senior Commercial Team for custom rate locking.
          </p>
        </div>

        {/* What Happens Next Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl text-left space-y-5 text-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Dedicated Account Manager</div>
              <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                Our Senior Commercial Account Manager will contact you within 2 business hours to verify your locked contract rates.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Credit Line Underwriting</div>
              <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                Your trade credit facility will be active as soon as review is completed, and you can log in with your selected password.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="space-y-3 pt-2">
          <Link
            href="/login"
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Login Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-block text-xs font-mono text-slate-500 hover:text-slate-800 transition-colors"
          >
            &larr; Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
