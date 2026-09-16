'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Truck, Lock, Building2 } from 'lucide-react';

export function WelcomeView() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full text-center space-y-8 animate-fade-in">
        {/* Glow Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>TRADE ACCOUNT APPROVED &amp; PROVISIONED</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Wholesale Account is Active
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Your commercial trade account has been provisioned with 30-day invoicing terms and early morning kitchen delivery access.
          </p>
        </div>

        {/* Feature Highlights Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl text-left space-y-5 text-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Instant Ordering Access</div>
              <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                Your credentials are ready. You can now log into your Chef &amp; Purchasing portal with the email and password you just created.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Direct Depot Routing</div>
              <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                Your kitchen postcode has been assigned to your regional Rootwills refrigerated hub for 06:00 AM delivery drops.
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
            <span>Sign In to Your Customer Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/products"
            className="inline-block text-xs font-mono text-slate-500 hover:text-slate-800 transition-colors"
          >
            &larr; Preview Public Wholesale Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
