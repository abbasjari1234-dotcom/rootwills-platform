'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Phone,
  MessageCircle,
  Building2,
  User,
  Mail,
  MapPin,
  Calendar,
  FileText,
  CreditCard,
  Printer,
  ArrowRight,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { OrderItem, WholesaleOrder } from '@/lib/orders';

interface WholesaleCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: Array<{ product: any; qty: number }>;
  onOrderSuccess: () => void;
}

export function WholesaleCheckoutModal({
  isOpen,
  onClose,
  orderItems,
  onOrderSuccess,
}: WholesaleCheckoutModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<WholesaleOrder | null>(null);

  // Form State
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

  if (!isOpen) return null;

  const totalCases = orderItems.reduce((acc, it) => acc + (it.qty || 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.venueName || !form.contactName || !form.phone || orderItems.length === 0) {
      return;
    }

    setSubmitting(true);

    const itemsPayload: OrderItem[] = orderItems.map(({ product, qty }) => ({
      id: product.id,
      sku: product.sku,
      name: product.name,
      packSize: product.packSize,
      tempZone: product.tempZone || 'Ambient',
      image: product.image,
      qty,
    }));

    const payload = {
      ...form,
      items: itemsPayload,
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
        // Persist to user's order history
        try {
          const existingHistory = JSON.parse(localStorage.getItem('rootwills_order_history') || '[]');
          localStorage.setItem('rootwills_order_history', JSON.stringify([data.order, ...existingHistory]));
        } catch {
          // ignore
        }
        onOrderSuccess();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs select-none">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#E8DEC8] shadow-[0_25px_70px_rgba(46,6,13,0.30)] relative font-sans"
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F2] ring-1 ring-[#BA8E4E]/50 flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-4 h-4 text-[#2E060D]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#131313] leading-tight">
                {confirmedOrder ? 'Wholesale Order Confirmed' : 'Review & Place Pre-Dawn Order'}
              </h2>
              <p className="text-[11px] font-mono text-stone-500">
                Next-Day Delivery Window: 04:00 – 07:30 AM
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#2E060D] text-stone-600 hover:text-white border border-[#E8DEC8] flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ─── CONFIRMED ORDER SUCCESS SCREEN ─── */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Top Green Verification Card */}
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 sm:p-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold mb-1">
                  ORDER REFERENCE: {confirmedOrder.id}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-emerald-950">
                  Pre-Dawn Order Successfully Logged
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800/90 max-w-lg mx-auto leading-relaxed mt-1">
                  Transmitted to Rootwills night logistics desk. Your dedicated dual-temperature vehicle is scheduled for pre-dawn drop between <strong>04:00 – 07:30 AM</strong> on <strong>{confirmedOrder.deliveryDate}</strong>.
                </p>
              </div>
            </div>

            {/* Live Fulfillment Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-1">
                <div className="w-6 h-6 rounded-full bg-[#2E060D] text-white text-xs font-bold flex items-center justify-center mx-auto">
                  1
                </div>
                <div className="text-xs font-bold text-[#2E060D]">Order Received</div>
                <p className="text-[10.5px] text-stone-500">Manifest logged &amp; queued</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-1">
                <div className="w-6 h-6 rounded-full bg-[#BA8E4E] text-white text-xs font-bold flex items-center justify-center mx-auto">
                  2
                </div>
                <div className="text-xs font-bold text-[#2E060D]">Night Picking (02:00)</div>
                <p className="text-[10.5px] text-stone-500">Artisan bakery &amp; larder crate packing</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-1">
                <div className="w-6 h-6 rounded-full bg-stone-300 text-stone-700 text-xs font-bold flex items-center justify-center mx-auto">
                  3
                </div>
                <div className="text-xs font-bold text-[#2E060D]">Pre-Dawn Key Drop</div>
                <p className="text-[10.5px] text-stone-500">04:00 – 07:30 AM kitchen delivery</p>
              </div>
            </div>

            {/* Order Manifest Summary */}
            <div className="rounded-2xl border border-[#E8DEC8] overflow-hidden bg-white">
              <div className="px-4 py-3 bg-[#FAF7F2] border-b border-[#E8DEC8] flex items-center justify-between">
                <span className="text-xs font-bold text-[#2E060D]">
                  Ordered Lines ({confirmedOrder.totalLines} lines • {confirmedOrder.totalCases} cases)
                </span>
                <span className="text-[11px] font-mono text-stone-500">
                  Venue: {confirmedOrder.venueName}
                </span>
              </div>
              <div className="divide-y divide-[#E8DEC8]/50 max-h-56 overflow-y-auto p-2">
                {confirmedOrder.items.map((it) => (
                  <div key={it.id} className="p-2 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-10 h-10 rounded-lg bg-white border border-[#E8DEC8] shrink-0 overflow-hidden flex items-center justify-center">
                        <Image src={it.image} alt={it.name} fill sizes="40px" className="object-contain p-1" unoptimized />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-stone-800 truncate text-[12.5px]">{it.name}</div>
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

            {/* Action Buttons: 1-Click WhatsApp Transmit & Print */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={generateWhatsAppUrl(confirmedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Transmit Manifest to WhatsApp Dispatch</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#2E060D] border border-[#E8DEC8] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <Printer className="w-4 h-4 text-[#BA8E4E]" />
                <span>Print Kitchen Manifest</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#2E060D] hover:bg-black text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* ─── CHECKOUT FORM ─── */
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-6">
            {/* Top Order Summary Bar */}
            <div className="rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] p-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-[#2E060D] text-white flex items-center justify-center text-xs font-mono font-bold">
                  {totalCases}
                </span>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#2E060D]">
                    {orderItems.length} Product {orderItems.length === 1 ? 'Line' : 'Lines'} Selected ({totalCases} Total Cases)
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono">
                    Pre-dawn multi-temp vehicle loading • 100% Pork-Free Assured
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E8DEC8] text-[10px] font-mono font-bold text-[#2E060D]">
                  <ShieldCheck className="w-3 h-3 text-[#BA8E4E]" />
                  Trade Assured
                </span>
              </div>
            </div>

            {/* Section 1: Venue & Kitchen Identification */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 pb-1.5 border-b border-[#E8DEC8]">
                <Building2 className="w-4 h-4 text-[#BA8E4E]" />
                <h3 className="text-xs sm:text-sm font-bold text-[#2E060D] uppercase tracking-wider">
                  1. Venue &amp; Commercial Kitchen Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Venue / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Grand Hotel / San Carlo / Gaucho"
                    value={form.venueName}
                    onChange={(e) => setForm({ ...form, venueName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D] outline-none transition-all placeholder:text-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Head Chef / Procurement Contact *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Hall (Head Chef)"
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D] outline-none transition-all placeholder:text-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Mobile / WhatsApp (for Driver Pre-Dawn ETA) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +44 7984 123456"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D] outline-none transition-all placeholder:text-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Work Email (for Invoice &amp; Delivery Note)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. accounts@venue.co.uk"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D] outline-none transition-all placeholder:text-stone-400"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Schedule & Access Instructions */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 pb-1.5 border-b border-[#E8DEC8]">
                <Truck className="w-4 h-4 text-[#BA8E4E]" />
                <h3 className="text-xs sm:text-sm font-bold text-[#2E060D] uppercase tracking-wider">
                  2. Pre-Dawn Delivery Address &amp; Key Access
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Venue Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 67-71 Temple Row, Central Kitchen"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D] outline-none transition-all placeholder:text-stone-400"
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
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D] outline-none transition-all uppercase placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Requested Delivery Date
                  </label>
                  <input
                    type="date"
                    required
                    value={form.deliveryDate}
                    onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D] outline-none transition-all"
                  />
                  <span className="block text-[10px] text-stone-400 font-mono mt-1">
                    Fixed pre-dawn window: 04:00 – 07:30 AM
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Purchase Order (PO) / Kitchen Ref
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PO-2026-NOV-11 (optional)"
                    value={form.poNumber}
                    onChange={(e) => setForm({ ...form, poNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D] outline-none transition-all placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Keycode / Delivery Door Access Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Service door keycode 4910. Stack bakery crates on table by prep room. Walk-in chiller code 1234."
                  value={form.dropoffNotes}
                  onChange={(e) => setForm({ ...form, dropoffNotes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E8DEC8] focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D] outline-none transition-all placeholder:text-stone-400 resize-none"
                />
              </div>
            </div>

            {/* Section 3: Payment Terms */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-1.5 border-b border-[#E8DEC8]">
                <CreditCard className="w-4 h-4 text-[#BA8E4E]" />
                <h3 className="text-xs sm:text-sm font-bold text-[#2E060D] uppercase tracking-wider">
                  3. Settlement &amp; Commercial Terms
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  form.paymentMethod === '30-Day Credit Account'
                    ? 'border-[#2E060D] bg-[#2E060D]/5 text-[#2E060D] ring-1 ring-[#2E060D]'
                    : 'border-[#E8DEC8] bg-white hover:bg-[#FAF7F2] text-stone-700'
                }`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={form.paymentMethod === '30-Day Credit Account'}
                      onChange={() => setForm({ ...form, paymentMethod: '30-Day Credit Account' })}
                      className="text-[#2E060D]"
                    />
                    <span className="text-xs font-bold">30-Day Credit</span>
                  </div>
                  <span className="text-[10px] text-stone-500 leading-tight">
                    Contracted monthly invoice for approved venues
                  </span>
                </label>

                <label className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  form.paymentMethod === 'Trade BACS'
                    ? 'border-[#2E060D] bg-[#2E060D]/5 text-[#2E060D] ring-1 ring-[#2E060D]'
                    : 'border-[#E8DEC8] bg-white hover:bg-[#FAF7F2] text-stone-700'
                }`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={form.paymentMethod === 'Trade BACS'}
                      onChange={() => setForm({ ...form, paymentMethod: 'Trade BACS' })}
                      className="text-[#2E060D]"
                    />
                    <span className="text-xs font-bold">Trade BACS</span>
                  </div>
                  <span className="text-[10px] text-stone-500 leading-tight">
                    Direct wire transfer against delivery note
                  </span>
                </label>

                <label className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  form.paymentMethod === 'Card on Delivery'
                    ? 'border-[#2E060D] bg-[#2E060D]/5 text-[#2E060D] ring-1 ring-[#2E060D]'
                    : 'border-[#E8DEC8] bg-white hover:bg-[#FAF7F2] text-stone-700'
                }`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={form.paymentMethod === 'Card on Delivery'}
                      onChange={() => setForm({ ...form, paymentMethod: 'Card on Delivery' })}
                      className="text-[#2E060D]"
                    />
                    <span className="text-xs font-bold">Card / COD</span>
                  </div>
                  <span className="text-[10px] text-stone-500 leading-tight">
                    Mobile terminal on driver key drop
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Action Bar */}
            <div className="pt-3 border-t border-[#E8DEC8] flex items-center justify-between gap-4">
              <div className="text-[11px] text-stone-500 font-mono hidden sm:block">
                Secure pre-dawn hospitality dispatch • Birmingham, UK
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-[#E8DEC8] text-xs font-semibold text-stone-700 hover:bg-[#FAF7F2] cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#2E060D] hover:bg-black text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting Order...</span>
                  ) : (
                    <>
                      <span>Submit Pre-Dawn Order ({totalCases} Cases)</span>
                      <ArrowRight className="w-4 h-4 text-[#F3D08A]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
