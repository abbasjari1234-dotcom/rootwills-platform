'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ShoppingBag,
  CheckCircle2,
  MessageCircle,
  Printer,
  ArrowRight,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';
import { OrderItem, WholesaleOrder } from '@/lib/orders';

export default function CheckoutPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<WholesaleOrder | null>(null);

  // Exact Form State matching user screenshot
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

  // Load items from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rootwills_direct_draft_order');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setOrderItems(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const totalCases = orderItems.reduce((acc, it) => acc + (it.qty || 0), 0);

  const updateQty = (id: string, delta: number) => {
    const updated = orderItems
      .map((it) => {
        if (it.id === id) {
          const newQty = it.qty + delta;
          return newQty > 0 ? { ...it, qty: newQty } : null;
        }
        return it;
      })
      .filter(Boolean) as OrderItem[];

    setOrderItems(updated);
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
      alert('Please fill in all required fields (*)');
      return;
    }

    setSubmitting(true);

    const fullPhone = form.phone.startsWith('+') ? form.phone : `${form.countryCode.replace('UK ', '')} ${form.phone}`;

    const payload = {
      ...form,
      phone: fullPhone,
      items: orderItems,
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
        try {
          const existingHistory = JSON.parse(localStorage.getItem('rootwills_order_history') || '[]');
          localStorage.setItem('rootwills_order_history', JSON.stringify([data.order, ...existingHistory]));
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
      .map((it, idx) => `  ${idx + 1}. *${it.name}* (${it.packSize}) — *${it.qty} cases* [SKU: ${it.sku}]`)
      .join('\n');

    const message = 
`📋 *ROOTWILLS CUSTOMER APPLICATION & ORDER: ${order.id}*
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#131313] font-sans pt-6 sm:pt-10 pb-20 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <header className="flex items-center justify-between pb-4 border-b border-[#E8DEC8]">
          <Link href="/products" className="inline-flex items-center gap-2 text-xs font-semibold text-[#2E060D] hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Wholesale Catalog</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-stone-600">Rootwills Trade Onboarding Active</span>
          </div>
        </header>

        {confirmedOrder ? (
          /* ─── CONFIRMED SCREEN ─── */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-lg space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                APPLICATION REF: {confirmedOrder.id}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-emerald-950">
                Customer Application &amp; Order Received
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{confirmedOrder.name}</strong>. Your customer application for <strong>{confirmedOrder.company}</strong> has been transmitted for immediate trade account approval.
              </p>
            </div>

            {/* Manifest */}
            {confirmedOrder.items.length > 0 && (
              <div className="rounded-2xl border border-[#E8DEC8] overflow-hidden">
                <div className="px-4 py-3 bg-[#FAF7F2] border-b border-[#E8DEC8] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2E060D]">
                    Order Summary ({confirmedOrder.totalLines} lines • {confirmedOrder.totalCases} cases)
                  </span>
                  <span className="text-[11px] font-mono text-stone-500">
                    {confirmedOrder.postcode}
                  </span>
                </div>
                <div className="divide-y divide-[#E8DEC8]/50 p-2 max-h-60 overflow-y-auto">
                  {confirmedOrder.items.map((it) => (
                    <div key={it.id} className="p-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-11 h-11 rounded-lg bg-white border border-[#E8DEC8] shrink-0 overflow-hidden flex items-center justify-center p-1">
                          <Image src={it.image} alt={it.name} fill sizes="44px" className="object-contain" unoptimized />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-stone-800 truncate text-[13px]">{it.name}</div>
                          <div className="text-[11px] font-mono text-stone-500">{it.packSize} • SKU: {it.sku}</div>
                        </div>
                      </div>
                      <span className="font-bold text-[#2E060D] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E8DEC8] shrink-0">
                        {it.qty} {it.qty === 1 ? 'case' : 'cases'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transmit Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={generateWhatsAppUrl(confirmedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Instant WhatsApp Trade Approval</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#2E060D] border border-[#E8DEC8] text-sm font-bold flex items-center justify-center gap-2 shadow-2xs"
              >
                <Printer className="w-4 h-4 text-[#BA8E4E]" />
                <span>Print Application</span>
              </button>

              <Link
                href="/products"
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-[#2E060D] hover:bg-black text-white text-sm font-bold text-center"
              >
                Catalog
              </Link>
            </div>
          </div>
        ) : (
          /* Active Form Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <div>
                <span className="block text-xs sm:text-[13px] font-bold text-[#E66E19] uppercase tracking-wider mb-1">
                  Serve Your Customers Only The Best
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight uppercase">
                  BECOME A CUSTOMER
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name * */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 outline-none"
                  />
                </div>

                {/* Email * */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 outline-none"
                  />
                </div>

                {/* Phone * */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={form.countryCode}
                      onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                      className="px-2.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 text-stone-700 outline-none shrink-0"
                    >
                      <option value="UK +44">UK +44</option>
                      <option value="IE +353">IE +353</option>
                      <option value="US +1">US +1</option>
                    </select>
                    <input
                      type="tel"
                      required
                      placeholder="7123 456789"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 outline-none"
                    />
                  </div>
                </div>

                {/* Job Title * */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.jobTitle}
                    onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 outline-none"
                  />
                </div>

                {/* Company * */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 outline-none"
                  />
                </div>

                {/* Number of Sites * */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Number of Sites <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.numberOfSites}
                    onChange={(e) => setForm({ ...form, numberOfSites: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 outline-none"
                  />
                </div>

                {/* Postcode * */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Postcode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.postcode}
                    onChange={(e) => setForm({ ...form, postcode: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 outline-none uppercase"
                  />
                </div>

                {/* Current Supplier */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Current Supplier
                  </label>
                  <input
                    type="text"
                    value={form.currentSupplier}
                    onChange={(e) => setForm({ ...form, currentSupplier: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 outline-none"
                  />
                </div>

                {/* Approx Weekly Deliveries */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Approx Weekly Deliveries
                  </label>
                  <input
                    type="text"
                    value={form.approxWeeklyDeliveries}
                    onChange={(e) => setForm({ ...form, approxWeeklyDeliveries: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 outline-none"
                  />
                </div>

                {/* Approx Weekly Spend */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Approx Weekly Spend
                  </label>
                  <input
                    type="text"
                    value={form.approxWeeklySpend}
                    onChange={(e) => setForm({ ...form, approxWeeklySpend: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 outline-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Please provide any other details that may help your application."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 outline-none resize-none"
                  />
                </div>

                {/* Marketing preferences */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-4 space-y-2">
                  <span className="block text-xs font-semibold text-stone-800">
                    Marketing preferences
                  </span>
                  <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.marketingEmail}
                      onChange={(e) => setForm({ ...form, marketingEmail: e.target.checked })}
                      className="rounded border-stone-300 text-stone-900 w-4 h-4"
                    />
                    <span>Yes, send me offers and news by email</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.marketingSms}
                      onChange={(e) => setForm({ ...form, marketingSms: e.target.checked })}
                      className="rounded border-stone-300 text-stone-900 w-4 h-4"
                    />
                    <span>Yes, send me offers and news by SMS</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#2E060D] hover:bg-black text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Customer Application</span>
                      <ArrowRight className="w-4 h-4 text-[#F3D08A]" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Order Manifest */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="text-sm font-bold text-[#2E060D]">
                  Order Lines ({orderItems.length} lines • {totalCases} cases)
                </h3>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Pre-Dawn Manifest
                </span>
              </div>

              {orderItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-stone-500">
                  No items currently in your basket. You can submit your customer application directly.
                </div>
              ) : (
                <div className="divide-y divide-stone-100 max-h-[380px] overflow-y-auto pr-1">
                  {orderItems.map((it) => (
                    <div key={it.id} className="py-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative w-11 h-11 rounded-lg bg-white border border-stone-200 shrink-0 overflow-hidden flex items-center justify-center p-1">
                          <Image src={it.image} alt={it.name} fill sizes="44px" className="object-contain" unoptimized />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-stone-800 truncate text-[12.5px]">{it.name}</p>
                          <p className="text-[11px] font-mono text-stone-500">{it.packSize} • SKU: {it.sku}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => updateQty(it.id, -1)}
                          className="w-5 h-5 rounded hover:bg-black/5 text-[#2E060D] flex items-center justify-center"
                        >
                          {it.qty === 1 ? <Trash2 className="w-3 h-3 text-red-600" /> : <Minus className="w-3 h-3" />}
                        </button>
                        <span className="font-bold text-xs min-w-[14px] text-center">{it.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(it.id, 1)}
                          className="w-5 h-5 rounded hover:bg-black/5 text-[#2E060D] flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-stone-200 text-center">
                <Link href="/products" className="text-xs font-semibold text-[#8B2635] hover:underline">
                  + Add more lines from catalog
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
