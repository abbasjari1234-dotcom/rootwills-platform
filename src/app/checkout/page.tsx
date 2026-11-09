'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Building2,
  Calendar,
  CreditCard,
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

  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [form, setForm] = useState({
    venueName: '',
    contactName: '',
    phone: '',
    email: '',
    address: '',
    postcode: '',
    deliveryDate: tomorrowStr,
    dropoffNotes: '',
    poNumber: '',
    paymentMethod: '30-Day Credit Account' as WholesaleOrder['paymentMethod'],
  });

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

  const removeItem = (id: string) => {
    const updated = orderItems.filter((it) => it.id !== id);
    setOrderItems(updated);
    try {
      localStorage.setItem('rootwills_direct_draft_order', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.venueName || !form.contactName || !form.phone || orderItems.length === 0) {
      return;
    }

    setSubmitting(true);

    const payload = {
      ...form,
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
        alert(data.error || 'Failed to submit order. Please try again.');
      }
    } catch {
      alert('Network error submitting order. Please contact dispatch directly on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const generateWhatsAppUrl = (order: WholesaleOrder) => {
    const linesText = order.items
      .map((it, idx) => `  ${idx + 1}. *${it.name}* (${it.packSize}) — *${it.qty} cases* [SKU: ${it.sku}]`)
      .join('\n');

    const message = 
`📋 *ROOTWILLS WHOLESALE ORDER: ${order.id}*
🏢 *Venue:* ${order.venueName}
👤 *Chef Contact:* ${order.contactName} (${order.phone})
📍 *Delivery Address:* ${order.address}, ${order.postcode}
🚚 *Delivery Date:* ${order.deliveryDate} (04:00 – 07:30 AM Pre-Dawn)
🔑 *Keycode / Drop Notes:* ${order.dropoffNotes || 'Standard kitchen delivery door'}
🏷️ *PO / Ref:* ${order.poNumber || 'N/A'}
💳 *Terms:* ${order.paymentMethod}

*ORDER MANIFEST (${order.totalCases} cases / ${order.totalLines} lines):*
${linesText}

_Please confirm truck loading and pre-dawn dispatch window._`;

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
            <span className="text-xs font-mono font-semibold text-stone-600">Pre-Dawn Logistics Desk Active</span>
          </div>
        </header>

        {confirmedOrder ? (
          /* ─── CONFIRMED ORDER SCREEN ─── */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-lg space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                ORDER REFERENCE: {confirmedOrder.id}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-emerald-950">
                Pre-Dawn Order Confirmed &amp; Queued
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{confirmedOrder.contactName}</strong>. Your wholesale catering order for <strong>{confirmedOrder.venueName}</strong> has been logged for delivery on <strong>{confirmedOrder.deliveryDate}</strong> (04:00 – 07:30 AM).
              </p>
            </div>

            {/* Manifest */}
            <div className="rounded-2xl border border-[#E8DEC8] overflow-hidden">
              <div className="px-4 py-3 bg-[#FAF7F2] border-b border-[#E8DEC8] flex items-center justify-between">
                <span className="text-xs font-bold text-[#2E060D]">
                  Order Summary ({confirmedOrder.totalLines} lines • {confirmedOrder.totalCases} cases)
                </span>
                <span className="text-[11px] font-mono text-stone-500">
                  {confirmedOrder.address}, {confirmedOrder.postcode}
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

            {/* Transmit Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={generateWhatsAppUrl(confirmedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Transmit Manifest to WhatsApp Logistics</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#2E060D] border border-[#E8DEC8] text-sm font-bold flex items-center justify-center gap-2 shadow-2xs"
              >
                <Printer className="w-4 h-4 text-[#BA8E4E]" />
                <span>Print Delivery Slip</span>
              </button>

              <Link
                href="/products"
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-[#2E060D] hover:bg-black text-white text-sm font-bold text-center"
              >
                Catalog
              </Link>
            </div>
          </div>
        ) : orderItems.length === 0 ? (
          /* Empty Order Screen */
          <div className="bg-white rounded-3xl p-10 sm:p-16 border border-[#E8DEC8] text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-center mx-auto text-stone-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#131313]">Your Wholesale Order is Empty</h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
              Please browse our 5,487 commercial lines across bakery, butchery, dairy, produce, and dry larder to add cases.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E060D] hover:bg-black text-white font-bold text-xs sm:text-sm shadow-md"
            >
              <span>Explore Wholesale Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Active Checkout Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DEC8] shadow-sm space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#2E060D]">
                  Commercial Kitchen Checkout
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  Enter your venue credentials for contracted pre-dawn dispatch (04:00 – 07:30 AM).
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Venue Details */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#2E060D] uppercase tracking-wider pb-1 border-b border-[#E8DEC8]">
                    1. Venue &amp; Contact
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Venue / Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. The Grand Hotel / San Carlo"
                        value={form.venueName}
                        onChange={(e) => setForm({ ...form, venueName: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Chef / Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Head Chef Marcus"
                        value={form.contactName}
                        onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Phone / WhatsApp (Driver ETA) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +44 7984 123456"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Work Email (for Invoice)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. accounts@venue.co.uk"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Logistics */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#2E060D] uppercase tracking-wider pb-1 border-b border-[#E8DEC8]">
                    2. Delivery Address &amp; Key Access
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 67-71 Temple Row"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Postcode *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. B2 5LS"
                        value={form.postcode}
                        onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] outline-none uppercase"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Delivery Date
                      </label>
                      <input
                        type="date"
                        required
                        value={form.deliveryDate}
                        onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        PO / Kitchen Reference
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. PO-NOV-11 (optional)"
                        value={form.poNumber}
                        onChange={(e) => setForm({ ...form, poNumber: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Keybox / Delivery Instructions
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Service door keycode 4910. Stack bakery crates on table by prep room."
                      value={form.dropoffNotes}
                      onChange={(e) => setForm({ ...form, dropoffNotes: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#2E060D] hover:bg-black text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <span>Submitting Order...</span>
                  ) : (
                    <>
                      <span>Place Wholesale Order ({totalCases} Cases)</span>
                      <ArrowRight className="w-4 h-4 text-[#F3D08A]" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Order Manifest & Stepper */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DEC8] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8]">
                <h3 className="text-sm font-bold text-[#2E060D]">
                  Order Manifest ({orderItems.length} lines • {totalCases} cases)
                </h3>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Pre-Dawn Active
                </span>
              </div>

              <div className="divide-y divide-[#E8DEC8]/50 max-h-[380px] overflow-y-auto pr-1">
                {orderItems.map((it) => (
                  <div key={it.id} className="py-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-11 h-11 rounded-lg bg-white border border-[#E8DEC8] shrink-0 overflow-hidden flex items-center justify-center p-1">
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

              <div className="pt-3 border-t border-[#E8DEC8] text-center">
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
