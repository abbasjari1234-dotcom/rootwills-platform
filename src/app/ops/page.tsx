'use client';

import React from 'react';
import Link from 'next/link';
import {
  Package,
  Users,
  ShoppingBag,
  ArrowUpRight,
  Truck,
  TrendingUp,
  Clock,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Plus
} from 'lucide-react';

export default function OpsOverviewDashboard() {
  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Rootwills Internal Operations Active
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">
            Operations &amp; Enterprise Desk
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Welcome to the internal Rootwills operating system. Manage 5,487 catalog lines, supplier costs, customer CRM accounts, dispatch delivery runs, and configure customer pricing tiers.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Link
              href="/ops/products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all"
            >
              <Package className="w-4 h-4" />
              Product Management (5.4k Lines)
            </Link>
            <Link
              href="/ops/crm"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              <Users className="w-4 h-4" />
              Customer CRM
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/ops/products"
          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-emerald-500/50 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
            Product Management Hub
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Add, edit, delete, and manage 5,487 products. Upload photos to Supabase Storage, update wholesale pricing, and change descriptions.
          </p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600">
            <span>Launch Product Hub</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          href="/ops/crm"
          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-emerald-500/50 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
            Customer CRM &amp; Accounts
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Manage restaurant accounts, hotel groups, head chef contacts, credit limits, assigned sales reps, and delivery requirements.
          </p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600">
            <span>Launch CRM Workspace</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
              <ExternalLink className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              Live Customer Storefront
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Preview how chefs, restaurant buyers, and caterers browse your 100% pork-free wholesale catalog on the customer-facing site.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              href="/products"
              target="_blank"
              className="inline-flex items-center justify-between w-full text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors"
            >
              <span>Visit rootwills.co.uk/products</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
