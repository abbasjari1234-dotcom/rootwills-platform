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
  Trash2,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { OrderItem, WholesaleOrder } from '@/lib/orders';

export default function CheckoutPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [showManifest, setShowManifest] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<WholesaleOrder | null>(null);

  // Exact Form State matching user requirements
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

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
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
          <div className="bg-gradient-to-br from-[#4E0D17] via-[#380911] to-[#240307] text-white rounded-[26px] p-6 sm:p-10 border-2 border-white/25 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#F3D08A] text-xs font-mono font-bold tracking-wider">
                APPLICATION REF: {confirmedOrder.id}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-white tracking-tight">
                Customer Application &amp; Order Received
              </h1>
              <p className="text-xs sm:text-sm text-stone-200 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{confirmedOrder.name}</strong>. Your customer application for <strong>{confirmedOrder.company}</strong> has been transmitted for immediate trade account approval.
              </p>
            </div>

            {/* Manifest */}
            {confirmedOrder.items.length > 0 && (
              <div className="rounded-[18px] border border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden max-w-xl mx-auto">
                <div className="px-4 py-3 bg-white/10 border-b border-white/15 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    Order Summary ({confirmedOrder.totalLines} lines • {confirmedOrder.totalCases} cases)
                  </span>
                  <span className="text-[11px] font-mono text-[#F3D08A]">
                    {confirmedOrder.postcode}
                  </span>
                </div>
                <div className="divide-y divide-white/10 p-2 max-h-60 overflow-y-auto">
                  {confirmedOrder.items.map((it) => (
                    <div key={it.id} className="p-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-11 h-11 rounded-lg bg-white shrink-0 overflow-hidden flex items-center justify-center p-1">
                          <Image src={it.image} alt={it.name} fill sizes="44px" className="object-contain" unoptimized />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate">{it.name}</p>
                          <p className="text-[11px] text-stone-300 font-mono">
                            SKU: {it.sku} • {it.packSize}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold font-mono text-[#F3D08A] shrink-0">
                        {it.qty} {it.qty === 1 ? 'case' : 'cases'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href={generateWhatsAppUrl(confirmedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#F3D08A]" />
                <span>Notify Trade Desk via WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-3.5 px-6 rounded-xl bg-white hover:bg-stone-100 text-[#4E0D17] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Copy</span>
              </button>
            </div>
          </div>
        ) : (
          /* ─── FULL RED THEME CUSTOMER APPLICATION CARD ─── */
          <div className="bg-gradient-to-br from-[#4E0D17] via-[#380911] to-[#240307] text-white rounded-[26px] p-6 sm:p-10 border-2 border-white/25 sm:border-white/30 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Ambient luxury glows */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#F3D08A]/10 pointer-events-none blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none blur-3xl" />

            {/* Header */}
            <div className="border-b border-white/15 pb-5 relative z-10">
              <div className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#F3D08A] font-sans">
                Serve Your Customers Only The Best
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-white mt-1.5">
                BECOME A CUSTOMER
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-stone-200/90 font-sans max-w-2xl leading-relaxed">
                Register your hospitality venue or commercial kitchen for direct wholesale terms, dedicated key account management, and pre-dawn refrigerated deliveries.
              </p>

              {/* Attached Basket Lines Notification */}
              {orderItems.length > 0 && (
                <div className="mt-3.5">
                  <button
                    type="button"
                    onClick={() => setShowManifest(!showManifest)}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs text-white font-medium backdrop-blur-sm transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#F3D08A]" />
                    <span>
                      Attaching <strong className="text-[#F3D08A]">{orderItems.length} lines</strong> ({totalCases} cases) to your application
                    </span>
                    {showManifest ? (
                      <ChevronUp className="w-3.5 h-3.5 text-stone-300" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-stone-300" />
                    )}
                  </button>

                  {/* Expandable Manifest Panel */}
                  {showManifest && (
                    <div className="mt-3 rounded-xl border border-white/20 bg-black/30 backdrop-blur-md p-3 max-h-48 overflow-y-auto space-y-2">
                      {orderItems.map((it) => (
                        <div
                          key={it.id}
                          className="flex items-center justify-between gap-3 text-xs p-2 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate text-[12px]">{it.name}</p>
                            <p className="text-[10px] text-stone-300 font-mono">
                              {it.sku} • {it.packSize}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => updateQty(it.id, -1)}
                              className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                            >
                              {it.qty === 1 ? <Trash2 className="w-3 h-3 text-rose-300" /> : <Minus className="w-3 h-3" />}
                            </button>
                            <span className="font-mono text-xs font-bold text-[#F3D08A] px-1.5">
                              {it.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(it.id, 1)}
                              className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Form Fields: White Background / White Border for Extreme Legibility & Contrast */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 relative z-10">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-sans font-semibold text-white/95 flex items-center gap-1">
                    <span>Name</span>
                    <span className="text-[#F3D08A] font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. John Trangely"
                    className="w-full bg-white text-stone-900 border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13.5px] font-sans placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F3D08A] focus:border-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-sans font-semibold text-white/95 flex items-center gap-1">
                    <span>Email</span>
                    <span className="text-[#F3D08A] font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. hello@venue.co.uk"
                    className="w-full bg-white text-stone-900 border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13.5px] font-sans placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F3D08A] focus:border-white transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Phone with Country Code */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-sans font-semibold text-white/95 flex items-center gap-1">
                  <span>Phone</span>
                  <span className="text-[#F3D08A] font-bold">*</span>
                </label>
                <div className="flex rounded-xl overflow-hidden shadow-sm bg-white border border-stone-200/90 focus-within:ring-2 focus-within:ring-[#F3D08A]">
                  <select
                    value={form.countryCode}
                    onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                    className="bg-stone-50 text-stone-800 text-xs sm:text-[13px] font-semibold px-3 py-2.5 border-r border-stone-200 outline-none cursor-pointer"
                  >
                    <option value="UK +44">UK +44</option>
                    <option value="IE +353">IE +353</option>
                  </select>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="7123 456789"
                    className="w-full bg-white text-stone-900 px-3.5 py-2.5 text-xs sm:text-[13.5px] font-sans placeholder:text-stone-400 outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Job Title & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-sans font-semibold text-white/95 flex items-center gap-1">
                    <span>Job Title</span>
                    <span className="text-[#F3D08A] font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.jobTitle}
                    onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                    placeholder="e.g. Head Chef / Procurement Manager"
                    className="w-full bg-white text-stone-900 border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13.5px] font-sans placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F3D08A] focus:border-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-sans font-semibold text-white/95 flex items-center gap-1">
                    <span>Company</span>
                    <span className="text-[#F3D08A] font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Dishoom / Gail's"
                    className="w-full bg-white text-stone-900 border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13.5px] font-sans placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F3D08A] focus:border-white transition-all"
                  />
                </div>
              </div>

              {/* Row 4: Number of Sites & Postcode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-sans font-semibold text-white/95 flex items-center gap-1">
                    <span>Number of Sites</span>
                    <span className="text-[#F3D08A] font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.numberOfSites}
                    onChange={(e) => setForm({ ...form, numberOfSites: e.target.value })}
                    placeholder="e.g. 1, 3-5, 10+"
                    className="w-full bg-white text-stone-900 border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13.5px] font-sans placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F3D08A] focus:border-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-sans font-semibold text-white/95 flex items-center gap-1">
                    <span>Postcode</span>
                    <span className="text-[#F3D08A] font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.postcode}
                    onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                    placeholder="e.g. W1D 3QU"
                    className="w-full bg-white text-stone-900 border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13.5px] font-sans placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F3D08A] focus:border-white transition-all uppercase"
                  />
                </div>
              </div>

              {/* Row 5: Current Supplier & Approx Weekly Deliveries */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-sans font-semibold text-white/90">
                    Current Supplier
                  </label>
                  <input
                    type="text"
                    value={form.currentSupplier}
                    onChange={(e) => setForm({ ...form, currentSupplier: e.target.value })}
                    placeholder="e.g. Brakes, Bidfood, Direct"
                    className="w-full bg-white text-stone-900 border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13.5px] font-sans placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F3D08A] focus:border-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-sans font-semibold text-white/90">
                    Approx Weekly Deliveries
                  </label>
                  <input
                    type="text"
                    value={form.approxWeeklyDeliveries}
                    onChange={(e) => setForm({ ...form, approxWeeklyDeliveries: e.target.value })}
                    placeholder="e.g. 3-4 drops"
                    className="w-full bg-white text-stone-900 border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13.5px] font-sans placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F3D08A] focus:border-white transition-all"
                  />
                </div>
              </div>

              {/* Row 6: Approx Weekly Spend */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-sans font-semibold text-white/90">
                  Approx Weekly Spend
                </label>
                <input
                  type="text"
                  value={form.approxWeeklySpend}
                  onChange={(e) => setForm({ ...form, approxWeeklySpend: e.target.value })}
                  placeholder="e.g. £2,000 - £5,000"
                  className="w-full bg-white text-stone-900 border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13.5px] font-sans placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F3D08A] focus:border-white transition-all"
                />
              </div>

              {/* Row 7: Message */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-sans font-semibold text-white/90">
                  Message
                </label>
                <textarea
                  rows={2}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Please provide any other details that may help your application."
                  className="w-full bg-white text-stone-900 border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13.5px] font-sans placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F3D08A] focus:border-white transition-all resize-none"
                />
              </div>

              {/* Marketing Preferences Box with White Border */}
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-3.5 space-y-2">
                <div className="text-[11.5px] font-semibold text-white font-sans">
                  Marketing preferences
                </div>
                <label className="flex items-center gap-2.5 text-stone-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.marketingEmail}
                    onChange={(e) => setForm({ ...form, marketingEmail: e.target.checked })}
                    className="rounded border-white/40 text-[#4E0D17] focus:ring-[#F3D08A] w-4 h-4 bg-white"
                  />
                  <span className="text-[12px] font-sans">Yes, send me offers and news by email</span>
                </label>
                <label className="flex items-center gap-2.5 text-stone-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.marketingSms}
                    onChange={(e) => setForm({ ...form, marketingSms: e.target.checked })}
                    className="rounded border-white/40 text-[#4E0D17] focus:ring-[#F3D08A] w-4 h-4 bg-white"
                  />
                  <span className="text-[12px] font-sans">Yes, send me offers and news by SMS</span>
                </label>
              </div>

              {/* Submit Row: Gold / Champagne CTA Button + Terms */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F3D08A] to-[#E5BE72] hover:from-[#FFF1CC] hover:to-[#F3D08A] text-[#2E060D] text-xs sm:text-sm font-sans font-bold transition-all duration-200 cursor-pointer active:scale-95 shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Transmitting Application...</span>
                  ) : (
                    <>
                      <span>
                        Submit Application
                        {orderItems.length > 0 ? ` & Place Order (${totalCases} Cases)` : ''}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#2E060D]" />
                    </>
                  )}
                </button>

                <span className="text-[11px] font-mono text-stone-300">
                  Protected by Rootwills B2B Trade Terms
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
