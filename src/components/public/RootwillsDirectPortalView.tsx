'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  ShieldCheck,
  Truck,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
  ArrowLeft,
  Send,
  KeyRound,
  Building2,
  Package,
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
      'Trade account verification is required to view live contract pricing. If you have not yet received your Rootwills Direct credentials, please use the "Dispatch Order & Request Login" tab to submit your order manifest and activate your portal account.'
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
        : 'No specific SKUs attached (Requesting full Rootwills Direct portal login & contract price list)';

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
    <div className="min-h-screen bg-[#FAF7F2] text-[#131313] flex flex-col">
      {/* ─── TOP STANDALONE PORTAL HEADER (ROOTWILLS DIRECT) ─── */}
      <header className="bg-[#260309] text-[#FAF7F2] border-b border-[#BA8E4E]/40 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/75 overflow-hidden shrink-0">
              <Image
                src="/images/logo.png"
                alt="Rootwills Direct Seal"
                fill
                unoptimized
                sizes="40px"
                className="object-contain p-0.5 rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base sm:text-lg text-white tracking-tight">
                  Rootwills Direct
                </span>
                <span className="px-2 py-0.5 rounded bg-[#F3D08A]/15 border border-[#F3D08A]/40 font-mono text-[10px] text-[#F3D08A] font-semibold">
                  rootwillsdirect.co.uk
                </span>
              </div>
              <p className="text-[11px] text-stone-300 font-sans hidden xs:block">
                B2B Trade Ordering, Live Contract Pricing &amp; Account Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+441616412803"
              className="hidden md:flex items-center gap-1.5 text-xs font-mono text-stone-300 hover:text-[#F3D08A] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#BA8E4E]" />
              <span>Trade Desk: +44 16164 12803</span>
            </a>

            <Link
              href="/products"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans font-medium text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalog</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── MAIN PORTAL WORKSPACE ─── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* LEFT COLUMN: Selected Order Manifest & Pricing Protection Notice (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] p-5 shadow-[0_8px_28px_rgba(46,6,13,0.05)]">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E8DEC8]">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#8B2635]" />
                  <h2 className="text-base font-serif font-bold text-[#2E060D]">
                    Your Selected Order Manifest
                  </h2>
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#2E060D] text-[#F3D08A]">
                  {totalCases} {totalCases === 1 ? 'Case' : 'Cases'} ({draftItems.length} SKUs)
                </span>
              </div>

              {draftItems.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <p className="text-xs font-serif font-bold text-[#2E060D]">
                    No catalog items attached yet
                  </p>
                  <p className="text-[11.5px] text-stone-500 font-sans">
                    You can sign in directly to browse contract rates or return to the product catalog to select items.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#EFE7D6] max-h-[340px] overflow-y-auto py-1 pr-1">
                  {draftItems.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#E8DEC8] shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          unoptimized
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[9.5px] font-bold text-[#8B2635]">
                            {item.sku}
                          </span>
                          <span className="font-mono text-[9px] text-stone-400">
                            • {item.tempZone}
                          </span>
                        </div>
                        <p className="text-xs font-sans font-semibold text-[#131313] truncate">
                          {item.name}
                        </p>
                        <p className="text-[10.5px] font-mono text-stone-500 truncate">
                          {item.packSize}
                        </p>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <span className="inline-flex items-center gap-1 font-mono text-[9.5px] text-stone-500 bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#E8DEC8] mb-1">
                          <Lock className="w-2.5 h-2.5 text-[#8B2635]" /> Trade Price
                        </span>

                        <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#DCD2C0] rounded-full px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() => updateDraftQty(item.id, -1)}
                            className="text-stone-600 hover:text-[#8B2635] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            {item.qty === 1 ? (
                              <Trash2 className="w-3 h-3" />
                            ) : (
                              <Minus className="w-3 h-3" />
                            )}
                          </button>
                          <span className="font-mono text-xs font-bold text-[#2E060D] tabular-nums">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateDraftQty(item.id, 1)}
                            className="text-stone-600 hover:text-[#2E060D] cursor-pointer"
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

              <div className="pt-3.5 border-t border-[#E8DEC8] space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#DCD2C0] flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-[#8B2635] shrink-0 mt-0.5" />
                  <p className="text-[11.5px] text-stone-600 font-sans leading-relaxed">
                    <strong className="text-[#2E060D]">Why isn&apos;t pricing public?</strong> To protect our hospitality partners&apos; margins, bespoke contract rates and volume rebates are strictly accessible via authenticated <strong className="text-[#2E060D]">Rootwills Direct</strong> trade accounts.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Trade Support Card */}
            <div className="rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-stone-700">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#8B2635]" /> 11:00 PM Cutoff for Dawn Drop
              </span>
              <a
                href="https://wa.me/447984709478"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#2E060D] font-bold hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#BA8E4E]" /> WhatsApp Desk: +44 7984 709478
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Trade Account Login & Instant Order Activation (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#FFFDF9] border border-[#DCD2C0] shadow-[0_16px_48px_rgba(46,6,13,0.08)] overflow-hidden">
              {/* Portal Mode Tabs */}
              <div className="grid grid-cols-2 border-b border-[#DCD2C0] bg-[#FAF7F2]">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`py-4 px-4 text-xs sm:text-sm font-serif font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-[#FFFDF9] text-[#2E060D] border-b-2 border-[#2E060D]'
                      : 'text-stone-500 hover:text-[#2E060D]'
                  }`}
                >
                  <KeyRound className="w-4 h-4 text-[#8B2635]" />
                  <span>Existing Trade Login</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('activate')}
                  className={`py-4 px-4 text-xs sm:text-sm font-serif font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    activeTab === 'activate'
                      ? 'bg-[#FFFDF9] text-[#2E060D] border-b-2 border-[#2E060D]'
                      : 'text-stone-500 hover:text-[#2E060D]'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#8B2635]" />
                  <span>Place Order / Request Login</span>
                </button>
              </div>

              <div className="p-6 sm:p-8">
                {activeTab === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B2635] font-semibold block mb-1">
                        ROOTWILLS DIRECT — TRADE PORTAL
                      </span>
                      <h1 className="text-2xl font-serif font-bold text-[#2E060D]">
                        Sign In to Your Trade Account
                      </h1>
                      <p className="text-xs text-stone-600 font-sans mt-1">
                        Enter your Rootwills Direct account number or work email to view your locked contract pricing and submit your {totalCases}-case order for pre-dawn delivery.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-serif font-bold text-[#2E060D] mb-1.5">
                        Trade Account Number or Work Email *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. RW-8042 or chef@restaurant.co.uk"
                        value={loginData.accountOrEmail}
                        onChange={(e) =>
                          setLoginData({ ...loginData, accountOrEmail: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DCD2C0] focus:border-[#BA8E4E] text-sm text-[#131313] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-serif font-bold text-[#2E060D] mb-1.5">
                        Password *
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({ ...loginData, password: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DCD2C0] focus:border-[#BA8E4E] text-sm text-[#131313] outline-none"
                      />
                    </div>

                    {loginFeedback && (
                      <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#BA8E4E] text-xs text-[#2E060D] space-y-2">
                        <p className="leading-relaxed">{loginFeedback}</p>
                        <button
                          type="button"
                          onClick={() => setActiveTab('activate')}
                          className="font-sans font-bold text-[#8B2635] underline cursor-pointer"
                        >
                          Switch to Dispatch Order &amp; Request Portal Login →
                        </button>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 px-5 rounded-xl bg-[#2E060D] hover:bg-[#4E0D17] text-[#FAF7F2] font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                    >
                      Sign In &amp; Unlock Contract Pricing
                    </button>

                    <div className="pt-3 border-t border-[#E8DEC8] flex items-center justify-between text-xs text-stone-600">
                      <span>Don&apos;t have a Rootwills Direct login yet?</span>
                      <button
                        type="button"
                        onClick={() => setActiveTab('activate')}
                        className="font-sans font-bold text-[#2E060D] underline hover:text-[#8B2635] cursor-pointer"
                      >
                        Request Trade Portal Login →
                      </button>
                    </div>
                  </form>
                ) : submitted ? (
                  <div className="py-10 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#BA8E4E]/15 border border-[#BA8E4E]/40 flex items-center justify-center mx-auto text-[#2E060D]">
                      <CheckCircle2 className="w-8 h-8 text-[#BA8E4E]" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#2E060D]">
                      Order Manifest &amp; Portal Request Received
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                      Our trade desk has received your {totalCases}-case order manifest and will issue your <strong className="text-[#2E060D]">Rootwills Direct</strong> login credentials along with your contract pricing schedule within 2 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleActivateSubmit} className="space-y-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B2635] font-semibold block mb-1">
                        NEW TRADE ACCOUNT &amp; ORDER DISPATCH
                      </span>
                      <h2 className="text-2xl font-serif font-bold text-[#2E060D]">
                        Submit Order &amp; Activate Portal Login
                      </h2>
                      <p className="text-xs text-stone-600 font-sans mt-1">
                        Send your selected {totalCases}-case order manifest directly to our trade desk to receive your locked contract pricing and your <strong className="text-[#2E060D]">Rootwills Direct</strong> login credentials.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-serif font-bold text-[#2E060D] mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Chef James Wilson"
                          value={activateForm.name}
                          onChange={(e) =>
                            setActivateForm({ ...activateForm, name: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DCD2C0] text-sm text-[#131313] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-serif font-bold text-[#2E060D] mb-1">
                          Restaurant / Business Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. The Grand Bistro"
                          value={activateForm.business}
                          onChange={(e) =>
                            setActivateForm({ ...activateForm, business: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DCD2C0] text-sm text-[#131313] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      <div>
                        <label className="block text-xs font-serif font-bold text-[#2E060D] mb-1">
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
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DCD2C0] text-sm text-[#131313] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-serif font-bold text-[#2E060D] mb-1">
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
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DCD2C0] text-sm text-[#131313] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-serif font-bold text-[#2E060D] mb-1">
                          Delivery Postcode *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. B6 7EU or W1K 1QA"
                          value={activateForm.deliveryPostcode}
                          onChange={(e) =>
                            setActivateForm({
                              ...activateForm,
                              deliveryPostcode: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DCD2C0] text-sm text-[#131313] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-serif font-bold text-[#2E060D] mb-1">
                        Delivery Instructions or Additional Items
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Preferred morning delivery window, keyholder access, or extra lines required..."
                        value={activateForm.notes}
                        onChange={(e) =>
                          setActivateForm({ ...activateForm, notes: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#DCD2C0] text-sm text-[#131313] outline-none resize-none"
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
                      className="w-full py-3 px-5 rounded-xl bg-[#2E060D] hover:bg-[#4E0D17] disabled:opacity-60 text-[#FAF7F2] font-sans font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                    >
                      <Send className="w-4 h-4 text-[#F3D08A]" />
                      <span>
                        {isSubmitting
                          ? 'Submitting Order Manifest...'
                          : `Submit ${totalCases}-Case Order & Request Portal Login`}
                      </span>
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
