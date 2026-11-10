'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  Printer,
  ArrowRight,
} from 'lucide-react';
import { OrderItem, WholesaleOrder } from '@/lib/orders';

export default function CheckoutPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<WholesaleOrder | null>(null);

  // Exact Form State matching requirements
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

  // Load items from localStorage quietly in background
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
    const linesText = order.items && order.items.length > 0
      ? `\n*ATTACHED INVENTORY MANIFEST (${order.totalCases} cases):*\n` +
        order.items
          .map(
            (it, idx) =>
              `  ${idx + 1}. *${it.name}* (${it.packSize}) — *${it.qty} cases* [SKU: ${it.sku}]`
          )
          .join('\n')
      : '';

    const message = 
`📋 *ROOTWILLS CUSTOMER APPLICATION: ${order.id}*
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#131313] font-sans pt-6 sm:pt-10 pb-20 px-3 sm:px-6 relative">
      {/* Upper Soft Tinted Header Backdrop */}
      <div className="absolute top-0 inset-x-0 h-[310px] sm:h-[450px] bg-[#F3ECE0]/80 border-b border-[#E8DEC8]/60 pointer-events-none" />

      {/* Seamless Botanical Parchment Texture Overlay */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
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
          <div className="bg-[#FFFDF9] rounded-[24px] sm:rounded-[28px] p-8 sm:p-12 border border-stone-200/90 shadow-[0_25px_70px_-15px_rgba(46,6,13,0.35)] space-y-6 text-center ring-1 ring-black/5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="inline-block px-4 py-1 rounded-full bg-[#FAF4ED] border border-[#E8DEC8] text-[#4E0D17] text-xs font-mono font-bold tracking-wider">
              APPLICATION REF: {confirmedOrder.id}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950 tracking-tight">
              Customer Application Transmitted
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{confirmedOrder.name}</strong>. Your commercial wholesale account application for <strong>{confirmedOrder.company}</strong> has been received by our Birmingham trade partnerships desk.
            </p>

            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href={generateWhatsAppUrl(confirmedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Notify Trade Desk via WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-3.5 px-6 rounded-xl bg-[#4E0D17] hover:bg-[#34070F] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Copy</span>
              </button>
            </div>
          </div>
        ) : (
          /* ─── AWWWARDS-TIER CARD (FULL-WIDTH RED BANNER + CRISP WHITE FORM) ─── */
          <div className="bg-[#FFFDF9] rounded-[24px] sm:rounded-[28px] border border-stone-200/90 shadow-[0_25px_70px_-15px_rgba(46,6,13,0.35)] overflow-hidden ring-1 ring-black/5">
            {/* Top Red Hero Banner with authentic watermark circles & gold eyebrow */}
            <div className="relative bg-gradient-to-br from-[#5A101D] via-[#430A13] to-[#2B040A] text-white px-6 sm:px-10 pt-8 pb-7 overflow-hidden">
              <div className="absolute -bottom-14 -right-14 w-60 h-60 rounded-full bg-white/[0.04] pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full border border-white/[0.07] pointer-events-none" />
              <div className="absolute -bottom-36 -right-36 w-[420px] h-[420px] rounded-full border border-white/[0.04] pointer-events-none" />
              <div className="absolute -top-20 -left-20 w-52 h-52 rounded-full bg-[#F3D08A]/[0.06] pointer-events-none blur-2xl" />

              <div className="relative z-10 max-w-xl">
                <div className="inline-block text-[10.5px] sm:text-[11px] uppercase tracking-[0.25em] font-mono font-bold text-[#F3D08A]">
                  Serve Your Customers Only The Best
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-white tracking-tight mt-1.5 leading-tight">
                  BECOME A CUSTOMER
                </h1>
                <p className="mt-1.5 text-xs sm:text-[13px] text-white/75 font-sans leading-relaxed">
                  Open a direct commercial wholesale account for contract rates, dedicated pre-dawn logistics, and 30-day payment facilities.
                </p>
              </div>
            </div>

            {/* Form Canvas */}
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

                {/* Row 2: Phone with UK code selector */}
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
  );
}
