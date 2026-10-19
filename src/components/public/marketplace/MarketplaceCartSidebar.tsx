'use client';

import React from 'react';
import { 
  Phone, 
  Mail, 
  Truck, 
  Clock, 
  ShieldCheck, 
  FileText,
  MapPin,
  ArrowRight
} from 'lucide-react';

export function MarketplaceCartSidebar() {
  return (
    <aside className="hidden xl:block w-[300px] shrink-0 sticky top-24 space-y-4">
      {/* ─── Trade Procurement Desk Card ─── */}
      <div className="bg-white rounded-3xl p-5 border border-[#BA8E4E]/30 shadow-md">
        
        {/* Header */}
        <div className="flex items-center gap-3 pb-3.5 border-b border-stone-100 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF6EE] text-[#16201B] border border-[#BA8E4E]/30 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5 text-[#BA8E4E]" />
          </div>
          <div>
            <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#BA8E4E] font-semibold block">
              B2B Purveyors
            </span>
            <h3 className="text-sm font-serif font-bold text-[#16201B]">
              Commercial Trade Desk
            </h3>
          </div>
        </div>

        {/* Narrative */}
        <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
          Rootwills supplies chefs, restaurant operators, and hospitality groups with bespoke wholesale produce lines on contracted schedules.
        </p>

        {/* Operational Highlights */}
        <div className="space-y-2.5 mb-5 pb-4 border-b border-stone-100 text-xs font-sans text-stone-700">
          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-[#BA8E4E] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 font-semibold text-[11px]">4:00 AM Dawn Drops</strong>
              <span className="text-[10px] text-stone-500">London &amp; UK metro delivery daily</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Truck className="w-4 h-4 text-[#BA8E4E] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 font-semibold text-[11px]">Temperature-Controlled Fleet</strong>
              <span className="text-[10px] text-stone-500">Dual-temp chilled and ambient vans</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#BA8E4E] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 font-semibold text-[11px]">SALSA &amp; BRCGS Accredited</strong>
              <span className="text-[10px] text-stone-500">Rigorous cold-chain farm audits</span>
            </div>
          </div>
        </div>

        {/* Direct Action Enquire */}
        <div className="space-y-2.5">
          <a
            href="mailto:info@rootwills.co.uk?subject=Commercial%20Supply%20Enquiry"
            className="w-full py-3 px-4 rounded-full bg-[#D4A86A] hover:bg-[#C59958] text-[#0E1512] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Mail className="w-3.5 h-3.5 text-[#0E1512]" />
            <span>Request Price Schedule</span>
          </a>

          <a
            href="tel:+442012345678"
            className="w-full py-2.5 px-4 rounded-full bg-[#FAF6EE] hover:bg-[#F3EAD8] text-[#16201B] border border-[#BA8E4E]/30 text-xs font-serif font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-[#BA8E4E]" />
            <span>Call +44 20 1234 5678</span>
          </a>
        </div>

      </div>

      {/* London Depot Address Card */}
      <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E7DEC8] text-center">
        <div className="flex items-center justify-center gap-1.5 text-[#BA8E4E] mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-[10px] font-serif uppercase tracking-[0.18em] font-bold">
            Central Distribution Depot
          </span>
        </div>
        <p className="text-xs text-stone-700 font-sans font-medium">
          London &bull; United Kingdom
        </p>
        <span className="text-[10px] text-stone-500 font-sans block mt-0.5">
          Dispatching 6 days a week across the UK
        </span>
      </div>
    </aside>
  );
}
