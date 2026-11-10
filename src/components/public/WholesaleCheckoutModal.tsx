'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { OrderItem, WholesaleOrder } from '@/lib/orders';
import type { WholesaleProduct } from '@/data/wholesaleProducts';

export interface DraftOrderLine {
  product: WholesaleProduct;
  qty: number;
}

export interface WholesaleCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems?: (DraftOrderLine | OrderItem)[];
  onOrderSuccess?: () => void;
}

export function WholesaleCheckoutModal({
  isOpen,
  onClose,
  orderItems = [],
  onOrderSuccess,
}: WholesaleCheckoutModalProps) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<WholesaleOrder | null>(null);

  // Exact 12 customer onboarding fields
  const [form, setForm] = useState({
    name: '',
    email: '',
    countryCode: 'UK +44',
    phone: '',
    jobTitle: '',
    company: '',
    numberOfSites: '',
    postcode: '',
    currentSupplier: '',
    approxWeeklyDeliveries: '',
    approxWeeklySpend: '',
    message: '',
    marketingEmail: false,
    marketingSms: false,
  });

  // Sync passed items or load from localStorage in background (no UI cart display)
  useEffect(() => {
    if (!isOpen) {
      setConfirmedOrder(null);
      return;
    }

    if (orderItems && orderItems.length > 0) {
      const normalized: OrderItem[] = orderItems.map((it, idx) => {
        if ('product' in it) {
          const line = it as DraftOrderLine;
          return {
            id: line.product.id || `line-${idx}`,
            sku: line.product.sku,
            name: line.product.name,
            packSize: line.product.packSize,
            tempZone: line.product.tempZone,
            image: line.product.image || '/images/products/bread-roll.png',
            qty: line.qty,
          };
        }
        return it as OrderItem;
      });
      setItems(normalized);
    } else {
      try {
        const saved = localStorage.getItem('rootwills_direct_draft_order');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        }
      } catch {
        // ignore
      }
    }
  }, [isOpen, orderItems]);

  if (!isOpen) return null;

  const totalCases = items.reduce((acc, it) => acc + (it.qty || 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.jobTitle.trim() ||
      !form.company.trim() ||
      !form.numberOfSites.trim() ||
      !form.postcode.trim()
    ) {
      alert('Please fill in all required fields marked with *');
      return;
    }

    setSubmitting(true);

    const fullPhone = form.phone.startsWith('+')
      ? form.phone
      : `${form.countryCode.replace('UK ', '')} ${form.phone}`;

    const payload = {
      ...form,
      phone: fullPhone,
      items,
      totalCases,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.order) {
        setConfirmedOrder(data.order);
        if (onOrderSuccess) onOrderSuccess();
        try {
          const existingHistory = JSON.parse(
            localStorage.getItem('rootwills_order_history') || '[]'
          );
          localStorage.setItem(
            'rootwills_order_history',
            JSON.stringify([data.order, ...existingHistory])
          );
          localStorage.removeItem('rootwills_direct_draft_order');
        } catch {
          // ignore
        }
      } else {
        alert(data.error || 'Failed to submit application. Please try again.');
      }
    } catch {
      alert('Network error. Please contact dispatch directly on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const generateWhatsAppUrl = (order: WholesaleOrder) => {
    const linesText = order.items && order.items.length > 0
      ? `\n*ATTACHED INVENTORY MANIFEST (${order.totalCases} cases):*\n` +
        order.items
          .map(
            (it, idx) =>
              `  ${idx + 1}. *${it.name}* (${it.packSize}) — *${it.qty} cases* [SKU: ${it.sku}]`
          )
          .join('\n')
      : '';

    const message = `📋 *ROOTWILLS CUSTOMER APPLICATION: ${order.id}*
🏢 *Company:* ${order.company}
👤 *Name:* ${order.name} (${order.jobTitle})
📞 *Phone:* ${order.phone}
✉️ *Email:* ${order.email}
📍 *Postcode:* ${order.postcode}
🏬 *Sites:* ${order.numberOfSites}
🚚 *Current Supplier:* ${order.currentSupplier || 'N/A'}
📦 *Weekly Deliveries:* ${order.approxWeeklyDeliveries || 'N/A'}
💷 *Weekly Spend:* ${order.approxWeeklySpend || 'N/A'}
📝 *Message:* ${order.message || 'None'}${linesText}`;

    return `https://wa.me/447984709478?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/70 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 
        Awwwards-Tier Double-Bezel Modal Container 
        - Outer chassis: soft off-white canvas with hairline border & luxury elevation
        - Top banner: authentic deep oxblood brand gradient with signature geometric watermark arcs
        - Form area: warm tactile ivory background with elegant hairline underline inputs
      */}
      <div className="relative w-full max-w-3xl my-auto bg-[#FFFDF9] rounded-[24px] sm:rounded-[28px] shadow-[0_25px_70px_-15px_rgba(46,6,13,0.35)] border border-stone-200/90 overflow-hidden max-h-[92vh] flex flex-col ring-1 ring-black/5">
        
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/20 hover:bg-black/35 text-white/90 hover:text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-sm backdrop-blur-sm"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto">
          {confirmedOrder ? (
            /* ─── ENHANCED 10/10 CONFIRMED SCREEN ─── */
            <div>
              {/* TOP HERO BANNER (Matches Onboarding Brand Header) */}
              <div className="relative bg-gradient-to-br from-[#5A101D] via-[#430A13] to-[#2B040A] text-white px-6 sm:px-10 pt-8 pb-7 overflow-hidden">
                <div className="absolute -bottom-14 -right-14 w-60 h-60 rounded-full bg-white/[0.04] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full border border-white/[0.07] pointer-events-none" />
                <div className="absolute -top-20 -left-20 w-52 h-52 rounded-full bg-[#F3D08A]/[0.06] pointer-events-none blur-2xl" />

                <div className="relative z-10 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[10.5px] uppercase tracking-[0.2em] font-mono font-bold text-[#F3D08A]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Application Transmitted Successfully</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-white tracking-tight mt-2 leading-tight">
                    TRADE ACCOUNT PENDING
                  </h2>
                  <p className="mt-1 text-xs sm:text-[13px] text-white/80 font-sans leading-relaxed">
                    Application Reference <span className="font-mono font-bold text-[#F3D08A]">{confirmedOrder.id}</span> · Birmingham Trade Partnerships Desk
                  </p>
                </div>
              </div>

              {/* BODY: Luxury Receipt & Next Steps */}
              <div className="p-6 sm:p-8 space-y-5 bg-[#FAF7F2]">
                {/* Official Trade Lead Slip Card */}
                <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-stone-100 gap-2 text-left">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold block">
                        Commercial Venue Registered
                      </span>
                      <h3 className="text-lg font-serif font-bold text-[#2E060D]">
                        {confirmedOrder.company}
                      </h3>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-semibold self-start sm:self-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Priority Processing</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
                    <div className="p-2.5 rounded-xl bg-stone-50/80 border border-stone-100">
                      <span className="text-[10px] font-mono text-stone-500 uppercase block">Contact</span>
                      <p className="text-xs font-semibold text-stone-900 truncate mt-0.5">{confirmedOrder.name}</p>
                      <p className="text-[10.5px] text-stone-500 truncate">{confirmedOrder.jobTitle}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-stone-50/80 border border-stone-100">
                      <span className="text-[10px] font-mono text-stone-500 uppercase block">Delivery Depot</span>
                      <p className="text-xs font-semibold text-stone-900 truncate mt-0.5">{confirmedOrder.postcode}</p>
                      <p className="text-[10.5px] text-stone-500 truncate">{confirmedOrder.numberOfSites} site(s)</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-stone-50/80 border border-stone-100">
                      <span className="text-[10px] font-mono text-stone-500 uppercase block">Direct Phone</span>
                      <p className="text-xs font-semibold text-stone-900 truncate mt-0.5">{confirmedOrder.phone}</p>
                      <p className="text-[10.5px] text-stone-500 truncate">{confirmedOrder.email}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-stone-50/80 border border-stone-100">
                      <span className="text-[10px] font-mono text-stone-500 uppercase block">Requested Drops</span>
                      <p className="text-xs font-semibold text-[#2E060D] truncate mt-0.5">{confirmedOrder.approxWeeklyDeliveries || '3-4 drops'}</p>
                      <p className="text-[10.5px] text-stone-500 truncate">{confirmedOrder.approxWeeklySpend || '£2k - £5k'}</p>
                    </div>
                  </div>
                </div>

                {/* 3-Step Milestone */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-stone-200/80">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-3 text-left">
                    Next Onboarding Milestones:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-stone-900">Desk Review</p>
                        <p className="text-[11px] text-stone-500 mt-0.5">Trade desk verifies postcodes and credit terms.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-stone-900">Contract Rates</p>
                        <p className="text-[11px] text-stone-500 mt-0.5">Bespoke wholesale net pricing activated for your menu.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-stone-900">Portal Login</p>
                        <p className="text-[11px] text-stone-500 mt-0.5">Wholesale ID issued to order 24/7 on rootwillsdirect.co.uk.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <a
                    href={generateWhatsAppUrl(confirmedOrder)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Fast-Track via WhatsApp Trade Desk</span>
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-3 px-7 rounded-xl bg-[#2E060D] hover:bg-[#150205] text-white font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-2xs"
                  >
                    Done
                  </button>
                </div>

                {/* Footer Help Line */}
                <div className="pt-2 text-center text-[11.5px] text-stone-500 font-sans border-t border-stone-200/60">
                  <span>Direct Birmingham Depot Line: </span>
                  <a href="tel:+441616412803" className="font-semibold text-[#2E060D] hover:underline">
                    +44 16164 12803
                  </a>
                  <span> · </span>
                  <a href="mailto:sales@rootwills.co.uk" className="font-semibold text-[#2E060D] hover:underline">
                    sales@rootwills.co.uk
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* 
                TOP HERO BANNER (Full-width Red Part with Authentic Watermark Circles & Gold Typography)
              */}
              <div className="relative bg-gradient-to-br from-[#5A101D] via-[#430A13] to-[#2B040A] text-white px-6 sm:px-10 pt-8 pb-7 overflow-hidden">
                {/* Authentic Geometric Watermark Circles matching reference design */}
                <div className="absolute -bottom-14 -right-14 w-60 h-60 rounded-full bg-white/[0.04] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full border border-white/[0.07] pointer-events-none" />
                <div className="absolute -bottom-36 -right-36 w-[420px] h-[420px] rounded-full border border-white/[0.04] pointer-events-none" />
                <div className="absolute -top-20 -left-20 w-52 h-52 rounded-full bg-[#F3D08A]/[0.06] pointer-events-none blur-2xl" />

                <div className="relative z-10 max-w-xl">
                  <div className="inline-block text-[10.5px] sm:text-[11px] uppercase tracking-[0.25em] font-mono font-bold text-[#F3D08A]">
                    Serve Your Customers Only The Best
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-white tracking-tight mt-1.5 leading-tight">
                    BECOME A CUSTOMER
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-[13px] text-white/75 font-sans leading-relaxed">
                    Open a direct commercial wholesale account for contract rates, dedicated pre-dawn logistics, and 30-day payment facilities.
                  </p>
                </div>
              </div>

              {/* 
                FORM BODY: Crisp Warm White / Ivory Canvas with Underline Fields & Burgundy CTA
              */}
              <div className="p-6 sm:p-10 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div className="space-y-1">
                      <label className="text-[11.5px] font-sans font-semibold text-stone-600 block uppercase tracking-wider">
                        Name <span className="text-[#8B1A28] font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Trangely"
                        className="w-full bg-transparent border-b border-stone-200 focus:border-[#4E0D17] pb-2 pt-1 text-stone-900 text-xs sm:text-[13.5px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11.5px] font-sans font-semibold text-stone-600 block uppercase tracking-wider">
                        Email <span className="text-[#8B1A28] font-bold">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="hello@venue.co.uk"
                        className="w-full bg-transparent border-b border-stone-200 focus:border-[#4E0D17] pb-2 pt-1 text-stone-900 text-xs sm:text-[13.5px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone with UK selector */}
                  <div className="space-y-1">
                    <label className="text-[11.5px] font-sans font-semibold text-stone-600 block uppercase tracking-wider">
                      Phone <span className="text-[#8B1A28] font-bold">*</span>
                    </label>
                    <div className="flex items-center gap-2 border-b border-stone-200 focus-within:border-[#4E0D17] pb-2 pt-1 transition-colors">
                      <select
                        value={form.countryCode}
                        onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                        className="bg-transparent text-stone-800 text-xs font-semibold outline-none cursor-pointer pr-1"
                      >
                        <option value="UK +44">UK +44</option>
                        <option value="IE +353">IE +353</option>
                      </select>
                      <span className="text-stone-300">|</span>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="7123 456789"
                        className="w-full bg-transparent text-stone-900 text-xs sm:text-[13.5px] outline-none placeholder:text-stone-400 font-sans"
                      />
                    </div>
                  </div>

                  {/* Row 3: Job Title & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div className="space-y-1">
                      <label className="text-[11.5px] font-sans font-semibold text-stone-600 block uppercase tracking-wider">
                        Job Title <span className="text-[#8B1A28] font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.jobTitle}
                        onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                        placeholder="Head Chef / Procurement Manager"
                        className="w-full bg-transparent border-b border-stone-200 focus:border-[#4E0D17] pb-2 pt-1 text-stone-900 text-xs sm:text-[13.5px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11.5px] font-sans font-semibold text-stone-600 block uppercase tracking-wider">
                        Company <span className="text-[#8B1A28] font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="e.g. Dishoom / Gail's"
                        className="w-full bg-transparent border-b border-stone-200 focus:border-[#4E0D17] pb-2 pt-1 text-stone-900 text-xs sm:text-[13.5px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>
                  </div>

                  {/* Row 4: Number of Sites & Postcode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div className="space-y-1">
                      <label className="text-[11.5px] font-sans font-semibold text-stone-600 block uppercase tracking-wider">
                        Number of Sites <span className="text-[#8B1A28] font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.numberOfSites}
                        onChange={(e) => setForm({ ...form, numberOfSites: e.target.value })}
                        placeholder="e.g. 1, 3-5, 10+"
                        className="w-full bg-transparent border-b border-stone-200 focus:border-[#4E0D17] pb-2 pt-1 text-stone-900 text-xs sm:text-[13.5px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11.5px] font-sans font-semibold text-stone-600 block uppercase tracking-wider">
                        Postcode <span className="text-[#8B1A28] font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.postcode}
                        onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                        placeholder="E.G. W1D 3QU"
                        className="w-full bg-transparent border-b border-stone-200 focus:border-[#4E0D17] pb-2 pt-1 text-stone-900 text-xs sm:text-[13.5px] outline-none transition-colors placeholder:text-stone-400 font-sans uppercase"
                      />
                    </div>
                  </div>

                  {/* Row 5: Current Supplier & Approx Weekly Deliveries */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div className="space-y-1">
                      <label className="text-[11.5px] font-sans font-semibold text-stone-600 block uppercase tracking-wider">
                        Current Supplier
                      </label>
                      <input
                        type="text"
                        value={form.currentSupplier}
                        onChange={(e) => setForm({ ...form, currentSupplier: e.target.value })}
                        placeholder="e.g. Brakes, Bidfood, Direct"
                        className="w-full bg-transparent border-b border-stone-200 focus:border-[#4E0D17] pb-2 pt-1 text-stone-900 text-xs sm:text-[13.5px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11.5px] font-sans font-semibold text-stone-600 block uppercase tracking-wider">
                        Approx Weekly Deliveries
                      </label>
                      <input
                        type="text"
                        value={form.approxWeeklyDeliveries}
                        onChange={(e) => setForm({ ...form, approxWeeklyDeliveries: e.target.value })}
                        placeholder="e.g. 3-4 drops"
                        className="w-full bg-transparent border-b border-stone-200 focus:border-[#4E0D17] pb-2 pt-1 text-stone-900 text-xs sm:text-[13.5px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>
                  </div>

                  {/* Row 6: Approx Weekly Spend */}
                  <div className="space-y-1">
                    <label className="text-[11.5px] font-sans font-semibold text-stone-600 block uppercase tracking-wider">
                      Approx Weekly Spend
                    </label>
                    <input
                      type="text"
                      value={form.approxWeeklySpend}
                      onChange={(e) => setForm({ ...form, approxWeeklySpend: e.target.value })}
                      placeholder="e.g. £2,000 - £5,000"
                      className="w-full bg-transparent border-b border-stone-200 focus:border-[#4E0D17] pb-2 pt-1 text-stone-900 text-xs sm:text-[13.5px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                    />
                  </div>

                  {/* Row 7: Message */}
                  <div className="space-y-1">
                    <label className="text-[11.5px] font-sans font-semibold text-stone-600 block uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      rows={2}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please provide any other details that may help your application."
                      className="w-full bg-transparent border-b border-stone-200 focus:border-[#4E0D17] pb-2 pt-1 text-stone-900 text-xs sm:text-[13.5px] outline-none transition-colors placeholder:text-stone-400 font-sans resize-none"
                    />
                  </div>

                  {/* Marketing Preferences Box */}
                  <div className="rounded-xl bg-[#FAF7F2] border border-[#EAE0CE] p-3.5 space-y-2">
                    <div className="text-[11.5px] font-semibold text-stone-700 font-sans">
                      Marketing preferences
                    </div>
                    <label className="flex items-center gap-2.5 text-stone-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={form.marketingEmail}
                        onChange={(e) => setForm({ ...form, marketingEmail: e.target.checked })}
                        className="rounded border-stone-300 text-[#4E0D17] focus:ring-[#4E0D17] w-3.5 h-3.5"
                      />
                      <span className="text-[12px] font-sans">Yes, send me offers and news by email</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-stone-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={form.marketingSms}
                        onChange={(e) => setForm({ ...form, marketingSms: e.target.checked })}
                        className="rounded border-stone-300 text-[#4E0D17] focus:ring-[#4E0D17] w-3.5 h-3.5"
                      />
                      <span className="text-[12px] font-sans">Yes, send me offers and news by SMS</span>
                    </label>
                  </div>

                  {/* Submit Button & Security Note */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#4E0D17] hover:bg-[#34070F] text-white text-xs sm:text-[13px] font-sans font-semibold transition-all duration-200 cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-2.5 disabled:opacity-50 group"
                    >
                      {submitting ? (
                        <span>Transmitting Application...</span>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                            <ArrowRight className="w-3 h-3 text-[#F3D08A]" />
                          </span>
                        </>
                      )}
                    </button>

                    <span className="text-[10.5px] font-mono text-stone-400">
                      Protected by Rootwills B2B Trade Terms
                    </span>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WholesaleCheckoutModal;
