'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
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

  // Sync passed items or load from localStorage
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

  const updateQty = (id: string, delta: number) => {
    const updated = items
      .map((it) => {
        if (it.id === id) {
          const newQty = it.qty + delta;
          return newQty > 0 ? { ...it, qty: newQty } : null;
        }
        return it;
      })
      .filter(Boolean) as OrderItem[];

    setItems(updated);
    try {
      localStorage.setItem('rootwills_direct_draft_order', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

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
    const linesText = order.items
      .map(
        (it, idx) =>
          `  ${idx + 1}. *${it.name}* (${it.packSize}) — *${it.qty} cases* [SKU: ${it.sku}]`
      )
      .join('\n');

    const message = `📋 *ROOTWILLS CUSTOMER APPLICATION & ORDER: ${order.id}*
🏢 *Company:* ${order.company}
👤 *Name:* ${order.name} (${order.jobTitle})
📞 *Phone:* ${order.phone}
✉️ *Email:* ${order.email}
📍 *Postcode:* ${order.postcode}
🏬 *Sites:* ${order.numberOfSites}
🚚 *Current Supplier:* ${order.currentSupplier || 'N/A'}
📦 *Weekly Deliveries:* ${order.approxWeeklyDeliveries || 'N/A'}
💷 *Weekly Spend:* ${order.approxWeeklySpend || 'N/A'}
📝 *Message:* ${order.message || 'None'}

*ORDER MANIFEST (${order.totalCases} cases):*
${linesText}`;

    return `https://wa.me/447984709478?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl my-auto bg-[#FFFDF9] rounded-[24px] shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-stone-100/90 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer shadow-sm"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-4 sm:p-7">
          {confirmedOrder ? (
            /* ─── CONFIRMED SCREEN ─── */
            <div className="space-y-6 py-4">
              <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                  APPLICATION REF: {confirmedOrder.id}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950">
                  Customer Application &amp; Order Received
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong>{confirmedOrder.name}</strong>. Your application for{' '}
                  <strong>{confirmedOrder.company}</strong> has been transmitted for immediate trade account approval.
                </p>
              </div>

              {/* Order Manifest */}
              {confirmedOrder.items.length > 0 && (
                <div className="rounded-[16px] border border-[#EAE0CE] overflow-hidden max-w-xl mx-auto">
                  <div className="px-4 py-3 bg-[#FAF7F2] border-b border-[#EAE0CE] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2E060D]">
                      Order Summary ({confirmedOrder.totalLines} lines • {confirmedOrder.totalCases} cases)
                    </span>
                    <span className="text-[11px] font-mono text-stone-500">
                      {confirmedOrder.postcode}
                    </span>
                  </div>
                  <div className="divide-y divide-[#EAE0CE]/50 p-2 max-h-56 overflow-y-auto">
                    {confirmedOrder.items.map((it) => (
                      <div key={it.id} className="p-2.5 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-10 h-10 rounded-lg bg-white border border-[#EAE0CE] shrink-0 overflow-hidden flex items-center justify-center p-1">
                            <Image
                              src={it.image}
                              alt={it.name}
                              fill
                              sizes="40px"
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-stone-900 truncate">{it.name}</p>
                            <p className="text-[11px] text-stone-500 font-mono">
                              SKU: {it.sku} • {it.packSize}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold font-mono text-[#2E060D] shrink-0">
                          {it.qty} {it.qty === 1 ? 'case' : 'cases'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dispatch Action Buttons */}
              <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={generateWhatsAppUrl(confirmedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify Trade Desk via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-6 rounded-xl bg-[#4E0D17] hover:bg-[#2B040A] text-white font-semibold text-xs transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* ─── DUAL PANEL SPLIT CARD (MATCHING REFERENCE IMAGE 2) ─── */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Brand Panel (Deep Oxblood Gradient) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#5A101D] via-[#430A13] to-[#2B040A] text-white p-6 sm:p-8 rounded-[20px] shadow-lg relative overflow-hidden flex flex-col justify-between">
                {/* Subtle corner radial decoration matching reference */}
                <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-sans font-bold tracking-tight text-white">
                      Contact Information
                    </h3>
                    <p className="mt-2 text-xs sm:text-[13px] text-white/70 leading-relaxed font-sans">
                      Reach our wholesale partnerships desk and pre-dawn logistics team directly for bespoke kitchen supply.
                    </p>
                  </div>

                  {/* Direct Contact Lockups matching reference */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="w-4 h-4 text-[#F3D08A]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#F3D08A] font-semibold">
                          Landline No
                        </div>
                        <a
                          href="tel:+441616412803"
                          className="text-xs sm:text-sm font-sans font-medium text-white hover:underline"
                        >
                          +44 16164 12803
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageCircle className="w-4 h-4 text-[#F3D08A]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#F3D08A] font-semibold">
                          WhatsApp No
                        </div>
                        <a
                          href="https://wa.me/447984709478"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-sm font-sans font-medium text-white hover:underline"
                        >
                          +44 7984 709478
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Mail className="w-4 h-4 text-[#F3D08A]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#F3D08A] font-semibold">
                          Email
                        </div>
                        <a
                          href="mailto:sales@rootwills.co.uk"
                          className="text-xs sm:text-sm font-sans font-medium text-white hover:underline"
                        >
                          sales@rootwills.co.uk
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-[#F3D08A]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#F3D08A] font-semibold">
                          Hub Depot
                        </div>
                        <div className="text-xs sm:text-sm font-sans font-medium text-white">
                          The Hub, Nobel Wy, Birmingham, UK
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attached Order Lines Manifest inside Left Panel */}
                {items.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-white/15 relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#F3D08A]" />
                        <span className="text-xs font-semibold text-white">
                          Draft Order Lines ({items.length})
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#F3D08A] bg-white/10 px-2 py-0.5 rounded-full">
                        {totalCases} cases
                      </span>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {items.map((it) => (
                        <div
                          key={it.id}
                          className="bg-black/25 rounded-lg p-2 flex items-center justify-between text-xs gap-2"
                        >
                          <div className="min-w-0">
                            <p className="font-medium text-white truncate text-[11.5px]">{it.name}</p>
                            <p className="text-[10px] text-white/60 font-mono">
                              {it.sku} • {it.packSize}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => updateQty(it.id, -1)}
                              className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
                            >
                              {it.qty === 1 ? <Trash2 className="w-2.5 h-2.5" /> : <Minus className="w-2.5 h-2.5" />}
                            </button>
                            <span className="font-mono text-xs font-semibold text-[#F3D08A] px-1">
                              {it.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(it.id, 1)}
                              className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Form Panel (Underline Form Style matching Reference Image 2) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="mb-5">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-[#A2441D] font-sans">
                    Serve Your Customers Only The Best
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-[#111111] mt-1">
                    BECOME A CUSTOMER
                  </h3>
                  {items.length > 0 && (
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4ED] border border-[#E8DEC8] text-[11.5px] text-[#4E0D17] font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-[#A2441D]" />
                      <span>
                        Attaching <strong>{items.length} lines</strong> ({totalCases} cases) to your customer application
                      </span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[12px] font-sans font-medium text-stone-600 block">
                        Name <span className="text-rose-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Trangely"
                        className="w-full bg-transparent border-b border-stone-300 focus:border-[#4E0D17] pb-1.5 pt-0.5 text-stone-900 text-xs sm:text-[13px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] font-sans font-medium text-stone-600 block">
                        Email <span className="text-rose-600 font-bold">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="hello@venue.co.uk"
                        className="w-full bg-transparent border-b border-stone-300 focus:border-[#4E0D17] pb-1.5 pt-0.5 text-stone-900 text-xs sm:text-[13px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone with UK code selector */}
                  <div className="space-y-1">
                    <label className="text-[12px] font-sans font-medium text-stone-600 block">
                      Phone <span className="text-rose-600 font-bold">*</span>
                    </label>
                    <div className="flex items-center gap-2 border-b border-stone-300 focus-within:border-[#4E0D17] pb-1.5 pt-0.5 transition-colors">
                      <select
                        value={form.countryCode}
                        onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                        className="bg-transparent text-stone-700 text-xs font-semibold outline-none cursor-pointer pr-1"
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
                        className="w-full bg-transparent text-stone-900 text-xs sm:text-[13px] outline-none placeholder:text-stone-400 font-sans"
                      />
                    </div>
                  </div>

                  {/* Row 3: Job Title & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[12px] font-sans font-medium text-stone-600 block">
                        Job Title <span className="text-rose-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.jobTitle}
                        onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                        placeholder="Head Chef / Procurement Manager"
                        className="w-full bg-transparent border-b border-stone-300 focus:border-[#4E0D17] pb-1.5 pt-0.5 text-stone-900 text-xs sm:text-[13px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] font-sans font-medium text-stone-600 block">
                        Company <span className="text-rose-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="e.g. Dishoom / Gail's"
                        className="w-full bg-transparent border-b border-stone-300 focus:border-[#4E0D17] pb-1.5 pt-0.5 text-stone-900 text-xs sm:text-[13px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>
                  </div>

                  {/* Row 4: Number of Sites & Postcode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[12px] font-sans font-medium text-stone-600 block">
                        Number of Sites <span className="text-rose-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.numberOfSites}
                        onChange={(e) => setForm({ ...form, numberOfSites: e.target.value })}
                        placeholder="e.g. 1, 3-5, 10+"
                        className="w-full bg-transparent border-b border-stone-300 focus:border-[#4E0D17] pb-1.5 pt-0.5 text-stone-900 text-xs sm:text-[13px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] font-sans font-medium text-stone-600 block">
                        Postcode <span className="text-rose-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.postcode}
                        onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                        placeholder="e.g. W1D 3QU"
                        className="w-full bg-transparent border-b border-stone-300 focus:border-[#4E0D17] pb-1.5 pt-0.5 text-stone-900 text-xs sm:text-[13px] outline-none transition-colors placeholder:text-stone-400 font-sans uppercase"
                      />
                    </div>
                  </div>

                  {/* Row 5: Current Supplier & Approx Weekly Deliveries */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[12px] font-sans font-medium text-stone-600 block">
                        Current Supplier
                      </label>
                      <input
                        type="text"
                        value={form.currentSupplier}
                        onChange={(e) => setForm({ ...form, currentSupplier: e.target.value })}
                        placeholder="e.g. Brakes, Bidfood, Direct"
                        className="w-full bg-transparent border-b border-stone-300 focus:border-[#4E0D17] pb-1.5 pt-0.5 text-stone-900 text-xs sm:text-[13px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] font-sans font-medium text-stone-600 block">
                        Approx Weekly Deliveries
                      </label>
                      <input
                        type="text"
                        value={form.approxWeeklyDeliveries}
                        onChange={(e) => setForm({ ...form, approxWeeklyDeliveries: e.target.value })}
                        placeholder="e.g. 3-4 drops"
                        className="w-full bg-transparent border-b border-stone-300 focus:border-[#4E0D17] pb-1.5 pt-0.5 text-stone-900 text-xs sm:text-[13px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                      />
                    </div>
                  </div>

                  {/* Row 6: Approx Weekly Spend */}
                  <div className="space-y-1">
                    <label className="text-[12px] font-sans font-medium text-stone-600 block">
                      Approx Weekly Spend
                    </label>
                    <input
                      type="text"
                      value={form.approxWeeklySpend}
                      onChange={(e) => setForm({ ...form, approxWeeklySpend: e.target.value })}
                      placeholder="e.g. £2,000 - £5,000"
                      className="w-full bg-transparent border-b border-stone-300 focus:border-[#4E0D17] pb-1.5 pt-0.5 text-stone-900 text-xs sm:text-[13px] outline-none transition-colors placeholder:text-stone-400 font-sans"
                    />
                  </div>

                  {/* Row 7: Message */}
                  <div className="space-y-1">
                    <label className="text-[12px] font-sans font-medium text-stone-600 block">
                      Message
                    </label>
                    <textarea
                      rows={2}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please provide any other details that may help your application."
                      className="w-full bg-transparent border-b border-stone-300 focus:border-[#4E0D17] pb-1.5 pt-0.5 text-stone-900 text-xs sm:text-[13px] outline-none transition-colors placeholder:text-stone-400 font-sans resize-none"
                    />
                  </div>

                  {/* Marketing Preferences Box */}
                  <div className="rounded-xl bg-stone-50 border border-stone-200/80 p-3 space-y-2">
                    <div className="text-[11px] font-semibold text-stone-700">Marketing preferences</div>
                    <label className="flex items-center gap-2 text-stone-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={form.marketingEmail}
                        onChange={(e) => setForm({ ...form, marketingEmail: e.target.checked })}
                        className="rounded border-stone-300 text-[#4E0D17] focus:ring-[#4E0D17] w-3.5 h-3.5"
                      />
                      <span className="text-[11.5px]">Yes, send me offers and news by email</span>
                    </label>
                    <label className="flex items-center gap-2 text-stone-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={form.marketingSms}
                        onChange={(e) => setForm({ ...form, marketingSms: e.target.checked })}
                        className="rounded border-stone-300 text-[#4E0D17] focus:ring-[#4E0D17] w-3.5 h-3.5"
                      />
                      <span className="text-[11.5px]">Yes, send me offers and news by SMS</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3 rounded-xl bg-[#4E0D17] hover:bg-[#2B040A] text-white text-xs sm:text-[13px] font-sans font-semibold transition-all duration-200 cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Transmitting Application...</span>
                      ) : (
                        <>
                          <span>
                            Submit Application
                            {items.length > 0 ? ` (${totalCases} Cases)` : ''}
                          </span>
                          <ArrowRight className="w-4 h-4 text-[#F3D08A]" />
                        </>
                      )}
                    </button>

                    <span className="text-[10.5px] font-mono text-stone-400 hidden sm:inline">
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
