'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  CheckCircle2,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
} from 'lucide-react';

interface StoredDraftItem {
  id: string;
  sku: string;
  name: string;
  packSize: string;
  tempZone: string;
  image: string;
  qty: number;
}

export function RootwillsDirectPortalView() {
  const [activeTab, setActiveTab] = useState<'login' | 'activate'>('login');
  const [draftItems, setDraftItems] = useState<StoredDraftItem[]>([]);
  const [loginData, setLoginData] = useState({ accountOrEmail: '', password: '' });
  const [loginFeedback, setLoginFeedback] = useState<string | null>(null);

  const [activateForm, setActivateForm] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    deliveryPostcode: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('rootwills_direct_draft_order');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setDraftItems(parsed);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const updateDraftQty = (id: string, delta: number) => {
    setDraftItems((prev) => {
      const updated = prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0);
      try {
        localStorage.setItem('rootwills_direct_draft_order', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const totalCases = draftItems.reduce((sum, item) => sum + item.qty, 0);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginFeedback(
      'Trade account verification is required to view contract pricing. If you do not yet have credentials, switch to "Place Order / Request Login" to submit your order and activate your portal account.'
    );
  };

  const handleActivateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    const manifestSummary =
      draftItems.length > 0
        ? draftItems
            .map((item, i) => `${i + 1}. ${item.qty}x [${item.sku}] ${item.name} (${item.packSize})`)
            .join('\n')
        : 'No specific SKUs attached (Requesting Rootwills Direct portal login & contract price list)';

    const payload = {
      Name: activateForm.name.trim(),
      Business: activateForm.business.trim(),
      Email: activateForm.email.trim(),
      Phone: activateForm.phone.trim(),
      Postcode: activateForm.deliveryPostcode.trim(),
      OrderManifest: manifestSummary,
      Notes: activateForm.notes.trim(),
      Source: 'Rootwills Direct Portal (rootwillsdirect.co.uk)',
      _replyto: activateForm.email.trim(),
      _subject: `Rootwills Direct Order & Portal Activation: ${activateForm.business.trim()}`,
      _template: 'table',
      _captcha: 'false',
    };

    try {
      let response = await fetch('https://formsubmit.co/ajax/sales@rootwills.co.uk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (!response || !response.ok) {
        response = await fetch('/api/enquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
    } catch {
      setErrorMsg('Unable to submit right now. Please call +44 16164 12803 or email sales@rootwills.co.uk.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#131313] font-sans flex flex-col">
      {/* ─── TOP PORTAL HEADER (ROOTWILLS DIRECT) ─── */}
      <header className="bg-[#2E060D] text-white border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full bg-white overflow-hidden shrink-0">
              <Image
                src="/images/logo.png"
                alt="Rootwills Direct"
                fill
                unoptimized
                sizes="36px"
                className="object-contain p-0.5 rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-white tracking-tight">
                  Rootwills Direct
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-[11px] text-[#F3D08A] font-medium">
                  rootwillsdirect.co.uk
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+441616412803"
              className="hidden md:flex items-center gap-1.5 text-xs text-stone-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F3D08A]" />
              <span>+44 16164 12803</span>
            </a>

            <Link
              href="/products"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── MAIN PORTAL WORKSPACE ─── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* LEFT COLUMN: Selected Order Summary (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white border border-black/[0.08] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.07]">
                <h2 className="text-sm font-bold text-[#131313]">Your Selected Order</h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F5F3EE] text-[#2E060D] tabular-nums">
                  {totalCases} {totalCases === 1 ? 'Case' : 'Cases'} ({draftItems.length} SKUs)
                </span>
              </div>

              {draftItems.length === 0 ? (
                <div className="py-8 text-center space-y-1.5">
                  <p className="text-xs font-semibold text-[#131313]">No items attached yet</p>
                  <p className="text-xs text-stone-500">
                    Sign in to browse contract rates or return to the catalog to add items.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-black/[0.06] max-h-[360px] overflow-y-auto py-1 pr-1">
                  {draftItems.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-[#F5F3EE] border border-black/[0.06] shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          unoptimized
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#131313] truncate">{item.name}</p>
                        <p className="text-[11px] font-semibold text-[#2E060D] truncate mt-0.5">
                          {item.packSize}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <div className="flex items-center gap-2 bg-[#F5F3EE] border border-black/10 rounded-full px-2.5 py-0.5">
                          <button
                            type="button"
                            onClick={() => updateDraftQty(item.id, -1)}
                            className="text-stone-600 hover:text-[#131313] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            {item.qty === 1 ? (
                              <Trash2 className="w-3 h-3" />
                            ) : (
                              <Minus className="w-3 h-3" />
                            )}
                          </button>
                          <span className="text-xs font-bold text-[#131313] tabular-nums min-w-[14px] text-center">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateDraftQty(item.id, 1)}
                            className="text-stone-600 hover:text-[#131313] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-3.5 border-t border-black/[0.07]">
                <p className="text-[11.5px] text-stone-500 leading-relaxed">
                  Contract pricing and volume rebates are displayed inside your authenticated Rootwills Direct trade account.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Trade Login & Order Submission (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
              {/* Portal Mode Tabs */}
              <div className="grid grid-cols-2 border-b border-black/[0.07] bg-[#F5F3EE]">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-white text-[#2E060D] border-b-2 border-[#2E060D]'
                      : 'text-stone-600 hover:text-[#131313]'
                  }`}
                >
                  Trade Account Sign In
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('activate')}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    activeTab === 'activate'
                      ? 'bg-white text-[#2E060D] border-b-2 border-[#2E060D]'
                      : 'text-stone-600 hover:text-[#131313]'
                  }`}
                >
                  Place Order / Request Login
                </button>
              </div>

              <div className="p-6 sm:p-8">
                {activeTab === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <h1 className="text-xl font-bold text-[#131313]">
                        Sign in to Rootwills Direct
                      </h1>
                      <p className="text-xs text-stone-500 mt-1">
                        Enter your account number or work email to view live contract pricing and place your order.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#131313] mb-1.5">
                        Account Number or Work Email
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. RW-8042 or chef@restaurant.co.uk"
                        value={loginData.accountOrEmail}
                        onChange={(e) =>
                          setLoginData({ ...loginData, accountOrEmail: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-black/12 focus:border-[#2E060D] text-sm text-[#131313] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#131313] mb-1.5">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({ ...loginData, password: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-black/12 focus:border-[#2E060D] text-sm text-[#131313] outline-none"
                      />
                    </div>

                    {loginFeedback && (
                      <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-black/10 text-xs text-[#131313] space-y-2">
                        <p className="leading-relaxed">{loginFeedback}</p>
                        <button
                          type="button"
                          onClick={() => setActiveTab('activate')}
                          className="font-semibold text-[#2E060D] underline cursor-pointer"
                        >
                          Place Order &amp; Request Portal Login →
                        </button>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 px-5 rounded-xl bg-[#2E060D] hover:bg-[#430A14] text-white font-semibold text-sm transition-transform active:scale-[0.98] cursor-pointer"
                    >
                      Sign In
                    </button>

                    <div className="pt-3 border-t border-black/[0.07] flex items-center justify-between text-xs text-stone-500">
                      <span>Need a Rootwills Direct account?</span>
                      <button
                        type="button"
                        onClick={() => setActiveTab('activate')}
                        className="font-semibold text-[#2E060D] hover:underline cursor-pointer"
                      >
                        Request Trade Login →
                      </button>
                    </div>
                  </form>
                ) : submitted ? (
                  <div className="py-10 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#F5F3EE] flex items-center justify-center mx-auto text-[#2E060D]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#131313]">
                      Order &amp; Portal Request Received
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                      Our trade desk has received your {totalCases}-case order and will issue your Rootwills Direct login credentials within 2 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleActivateSubmit} className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-[#131313]">
                        Submit Order &amp; Request Login
                      </h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Send your selected {totalCases}-case order to our trade desk to receive your contract pricing and Rootwills Direct credentials.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#131313] mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Chef James Wilson"
                          value={activateForm.name}
                          onChange={(e) =>
                            setActivateForm({ ...activateForm, name: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-black/12 text-sm text-[#131313] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#131313] mb-1">
                          Business Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="The Grand Bistro"
                          value={activateForm.business}
                          onChange={(e) =>
                            setActivateForm({ ...activateForm, business: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-black/12 text-sm text-[#131313] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#131313] mb-1">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="chef@venue.co.uk"
                          value={activateForm.email}
                          onChange={(e) =>
                            setActivateForm({ ...activateForm, email: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-black/12 text-sm text-[#131313] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#131313] mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+44 7984 709478"
                          value={activateForm.phone}
                          onChange={(e) =>
                            setActivateForm({ ...activateForm, phone: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-black/12 text-sm text-[#131313] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#131313] mb-1">
                          Postcode *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="B6 7EU"
                          value={activateForm.deliveryPostcode}
                          onChange={(e) =>
                            setActivateForm({
                              ...activateForm,
                              deliveryPostcode: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-black/12 text-sm text-[#131313] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#131313] mb-1">
                        Delivery Notes
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Delivery window or additional items..."
                        value={activateForm.notes}
                        onChange={(e) =>
                          setActivateForm({ ...activateForm, notes: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-black/12 text-sm text-[#131313] outline-none resize-none"
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-5 rounded-xl bg-[#2E060D] hover:bg-[#430A14] disabled:opacity-60 text-white font-semibold text-sm transition-transform active:scale-[0.98] cursor-pointer"
                    >
                      {isSubmitting
                        ? 'Submitting Order...'
                        : `Submit Order (${totalCases} Cases)`}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
