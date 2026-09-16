import React from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  ArrowLeft, 
  Phone, 
  Building2, 
  Search, 
  Clock, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        {/* Brand Header */}
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

        {/* 404 Main Callout */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xs text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-semibold border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>HTTP 404 &bull; Missing Route</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              The requested resource, product SKU, or commercial portal view could not be located. It may have moved or been updated.
            </p>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <Link
              href="/products"
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/20 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">
                Wholesale Catalog
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Browse 1,200+ Class 1 produce, dairy, and culinary goods.
              </p>
            </Link>

            <Link
              href="/apply"
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/20 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">
                Open Trade Account
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Instant B2B credit facility up to £50,000 for UK kitchens.
              </p>
            </Link>

            <Link
              href="/login"
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/20 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">
                Chef Portal Login
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Manage standing orders, live manifests, and BACS invoices.
              </p>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              Back to Homepage
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs shadow-xs transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Early Morning Depot Helpline */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Need Immediate Kitchen Depot Support?</span>
              <span className="text-slate-500">Birmingham Logistics Desk: 0121 790 4500 (Live 02:00 – 16:00 GMT)</span>
            </div>
          </div>
          <a
            href="tel:+441217904500"
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors shrink-0"
          >
            Call Dispatch Desk
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-slate-400">
        Rootwills Foodservice Ltd &bull; Units 4–6 Digbeth Wholesale Hub, Birmingham B5 6DY
      </div>
    </div>
  );
}
