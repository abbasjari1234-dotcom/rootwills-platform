'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  CheckCircle2,
  Phone,
  MessageCircle,
  Building2,
  Mail,
  MapPin,
  FileText,
  Printer,
  ArrowRight,
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

  // Exact Form State Matching User Specification
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

  if (!isOpen) return null;

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
      alert('Please fill in all required fields (*)');
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

    const fullPhone = form.phone.startsWith('+') ? form.phone : `${form.countryCode.replace('UK ', '')} ${form.phone}`;

    const payload = {
      ...form,
      phone: fullPhone,
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
        try {
          const existingHistory = JSON.parse(localStorage.getItem('rootwills_order_history') || '[]');
          localStorage.setItem('rootwills_order_history', JSON.stringify([data.order, ...existingHistory]));
        } catch {
          // ignore
        }
        onOrderSuccess();
      } else {
        alert(data.error || 'Failed to submit application. Please try again.');
      }
    } catch {
      alert('Network error. Please contact our trade desk directly on WhatsApp: +44 7984 709478.');
    } finally {
      setSubmitting(false);
    }
  };

  const generateWhatsAppUrl = (order: WholesaleOrder) => {
    const linesText = order.items.length > 0
      ? order.items
          .map((it, idx) => `  ${idx + 1}. *${it.name}* (${it.packSize}) — *${it.qty} cases* [SKU: ${it.sku}]`)
          .join('\n')
      : '  (Application submitted without pre-selected items)';

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

*REQUESTED LINES (${order.totalCases} cases):*
${linesText}`;

    return `https://wa.me/447984709478?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs select-none">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl relative font-sans"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-900 text-stone-600 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ─── CONFIRMATION VIEW ─── */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                APPLICATION REF: {confirmedOrder.id}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-950">
                Customer Application &amp; Order Received
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800/90 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{confirmedOrder.name}</strong>. Your trade account application for <strong>{confirmedOrder.company}</strong> ({confirmedOrder.postcode}) and order for <strong>{confirmedOrder.totalCases} cases</strong> have been transmitted to our trade onboarding desk.
              </p>
            </div>

            {/* Manifest Summary */}
            {confirmedOrder.items.length > 0 && (
              <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white">
                <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>Ordered Lines ({confirmedOrder.totalLines} lines • {confirmedOrder.totalCases} cases)</span>
                  <span className="font-mono text-stone-500">{confirmedOrder.company}</span>
                </div>
                <div className="divide-y divide-stone-100 max-h-48 overflow-y-auto p-2">
                  {confirmedOrder.items.map((it) => (
                    <div key={it.id} className="p-2 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative w-9 h-9 rounded-lg bg-stone-50 border border-stone-200 shrink-0 overflow-hidden flex items-center justify-center">
                          <Image src={it.image} alt={it.name} fill sizes="36px" className="object-contain p-1" unoptimized />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-stone-800 truncate text-[12.5px]">{it.name}</div>
                          <div className="text-[11px] font-mono text-stone-500">{it.packSize} • SKU: {it.sku}</div>
                        </div>
                      </div>
                      <span className="font-bold text-[#2E060D] bg-stone-50 px-2.5 py-1 rounded-md border border-stone-200 shrink-0">
                        {it.qty} {it.qty === 1 ? 'case' : 'cases'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={generateWhatsAppUrl(confirmedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Instant WhatsApp Trade Approval</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Application</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#2E060D] hover:bg-black text-white text-xs sm:text-sm font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* ─── EXACT CUSTOMER FORM FROM USER SPECIFICATION ─── */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            {/* Header Lockup matching user screenshot */}
            <div className="pr-8">
              <span className="block text-xs sm:text-[13px] font-bold text-[#E66E19] uppercase tracking-wider mb-1">
                Serve Your Customers Only The Best
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight uppercase">
                BECOME A CUSTOMER
              </h2>
              {orderItems.length > 0 && (
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8] text-xs font-semibold text-[#2E060D]">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#BA8E4E]" />
                  <span>Attaching {orderItems.length} lines ({totalCases} cases) to your customer application</span>
                </div>
              )}
            </div>

            {/* Field 1: Name * */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            {/* Field 2: Email * */}
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
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            {/* Field 3: Phone * (Split Country Code & Number) */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={form.countryCode}
                  onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                  className="px-2.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 text-stone-700 outline-none focus:border-stone-900 shrink-0"
                >
                  <option value="UK +44">UK +44</option>
                  <option value="IE +353">IE +353</option>
                  <option value="US +1">US +1</option>
                  <option value="EU +33">EU +33</option>
                </select>
                <input
                  type="tel"
                  required
                  placeholder="7123 456789"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Field 4: Job Title * */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.jobTitle}
                onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            {/* Field 5: Company * */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            {/* Field 6: Number of Sites * */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Number of Sites <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.numberOfSites}
                onChange={(e) => setForm({ ...form, numberOfSites: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            {/* Field 7: Postcode * */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Postcode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.postcode}
                onChange={(e) => setForm({ ...form, postcode: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all uppercase placeholder:text-stone-400"
              />
            </div>

            {/* Field 8: Current Supplier */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Current Supplier
              </label>
              <input
                type="text"
                value={form.currentSupplier}
                onChange={(e) => setForm({ ...form, currentSupplier: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            {/* Field 9: Approx Weekly Deliveries */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Approx Weekly Deliveries
              </label>
              <input
                type="text"
                value={form.approxWeeklyDeliveries}
                onChange={(e) => setForm({ ...form, approxWeeklyDeliveries: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            {/* Field 10: Approx Weekly Spend */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Approx Weekly Spend
              </label>
              <input
                type="text"
                value={form.approxWeeklySpend}
                onChange={(e) => setForm({ ...form, approxWeeklySpend: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            {/* Field 11: Message */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Message
              </label>
              <textarea
                rows={3}
                placeholder="Please provide any other details that may help your application."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all placeholder:text-stone-400 resize-none"
              />
            </div>

            {/* Field 12: Marketing preferences box */}
            <div className="rounded-xl bg-stone-50/80 border border-stone-200 p-4 space-y-2.5">
              <span className="block text-xs font-semibold text-stone-800">
                Marketing preferences
              </span>
              <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.marketingEmail}
                  onChange={(e) => setForm({ ...form, marketingEmail: e.target.checked })}
                  className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 w-4 h-4"
                />
                <span>Yes, send me offers and news by email</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.marketingSms}
                  onChange={(e) => setForm({ ...form, marketingSms: e.target.checked })}
                  className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 w-4 h-4"
                />
                <span>Yes, send me offers and news by SMS</span>
              </label>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#2E060D] hover:bg-black text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <span>Submit Customer Application {orderItems.length > 0 ? `& Place Order (${totalCases} Cases)` : ''}</span>
                    <ArrowRight className="w-4 h-4 text-[#F3D08A]" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
