'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Building2,
  User,
  Sparkles
} from 'lucide-react';

export function RootwillsDirectPortalView() {
  const [activeTab, setActiveTab] = useState<'signin' | 'request'>('signin');
  const [loading, setLoading] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(false);

  // Sign In Form State
  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: '',
    rememberMe: true,
  });

  // Request Account Form State
  const [requestForm, setRequestForm] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: 'Restaurant / Dining',
    notes: '',
  });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Demo trade auth simulation
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/admin';
    }, 800);
  };

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        Subject: `New B2B Trade Account Request: ${requestForm.businessName}`,
        BusinessName: requestForm.businessName,
        ContactName: requestForm.contactName,
        Email: requestForm.email,
        Phone: requestForm.phone,
        BusinessType: requestForm.businessType,
        Notes: requestForm.notes,
        Source: 'Rootwills Trade Portal (/direct)',
      };

      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null);

      setSubmittedRequest(true);
    } catch {
      setSubmittedRequest(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[#FAF7F2] min-h-screen text-[#131313] overflow-x-hidden pb-20 sm:pb-28">
      {/* Upper Soft Tinted Header Backdrop (Matching Enquiry page reference) */}
      <div className="absolute top-0 inset-x-0 h-[310px] sm:h-[470px] bg-[#F3ECE0]/80 border-b border-[#E8DEC8]/60 pointer-events-none" />

      {/* Seamless Botanical Parchment Texture Overlay */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />

      {/* ─── TOP LEFT: PROMINENT LARGE ROOTWILLS LOGO ─── */}
      <header className="relative z-20 px-6 sm:px-12 pt-6 sm:pt-8 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3.5 sm:gap-4 group focus:outline-none shrink-0"
        >
          {/* Large Master Seal Logo */}
          <div className="relative w-[52px] h-[52px] sm:w-[68px] sm:h-[68px] rounded-full shrink-0 bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/80 shadow-[0_4px_18px_rgba(46,6,13,0.18)] transition-transform duration-300 group-hover:scale-105 overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Rootwills Logo"
              fill
              unoptimized
              sizes="80px"
              className="object-contain p-1 rounded-full"
              priority
            />
          </div>

          {/* Large Brand Typography */}
          <div className="flex flex-col text-left">
            <span className="text-xl sm:text-2xl font-serif font-bold text-[#2E060D] tracking-tight group-hover:text-[#BA8E4E] transition-colors leading-tight">
              Rootwills
            </span>
            <span className="text-[11px] sm:text-xs text-stone-600 font-sans font-medium tracking-wide">
              Food Services &amp; Wholesale
            </span>
          </div>
        </Link>

        {/* Back to Products Navigation */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-[#5A101D] text-xs font-semibold border border-[#EAE0CE] shadow-sm backdrop-blur-sm transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
      </header>

      {/* ─── CENTERED INTRO HEADER (Matching Enquiry page style) ─── */}
      <section className="relative z-10 pt-8 sm:pt-14 pb-5 sm:pb-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A101D]/10 text-[#5A101D] text-[11px] font-bold tracking-wider uppercase mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#BA8E4E]" />
            B2B Hospitality Trade Portal
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-bold tracking-tight text-[#2E060D]">
            Trade Account Sign In
          </h1>
          <p className="text-xs sm:text-sm lg:text-[15px] text-stone-600 font-sans max-w-[54ch] mx-auto leading-[1.6] sm:leading-[1.7]">
            Sign in to access your bespoke hospitality contract pricing, standing kitchen orders, and live pre-dawn delivery dispatch.
          </p>
        </div>
      </section>

      {/* ─── UNIFIED LUXURY CARD (Matching Enquiry page reference) ─── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[20px] sm:rounded-[24px] p-2.5 sm:p-3.5 shadow-[0_24px_70px_rgba(46,6,13,0.08)] border border-[#EAE0CE]/90 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* ─── LEFT PANEL: CONTACT & TRADE DESK (Wine Gradient) ─── */}
          <div className="lg:col-span-5 relative rounded-[16px] sm:rounded-[18px] bg-gradient-to-br from-[#5A101D] via-[#430A13] to-[#2B040A] text-white p-6 sm:p-10 overflow-hidden flex flex-col justify-between min-h-[460px]">
            {/* Top Heading */}
            <div className="relative z-10 space-y-2">
              <h2 className="text-lg sm:text-[22px] font-sans font-bold tracking-tight text-white flex items-center gap-2">
                <span>Trade Desk Support</span>
              </h2>
              <p className="text-[12px] sm:text-[13px] text-white/80 font-sans leading-relaxed">
                Dedicated wholesale partnerships desk for executive chefs, hospitality groups, and procurement directors.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="relative z-10 space-y-4 sm:space-y-6 my-6 sm:my-auto">
              {/* Landline */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#F3D08A]" />
                </div>
                <div className="text-xs sm:text-[13.5px] font-sans text-white/95 tabular-nums">
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#F3D08A]/85 mb-0.5">
                    Landline No
                  </span>
                  <a href="tel:+441616412803" className="block font-medium hover:text-[#F3D08A] transition-colors">
                    +44 16164 12803
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-[#F3D08A]" />
                </div>
                <div className="text-xs sm:text-[13.5px] font-sans text-white/95 tabular-nums">
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#F3D08A]/85 mb-0.5">
                    Chef WhatsApp Desk
                  </span>
                  <a
                    href="https://wa.me/447984709478"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-medium hover:text-[#F3D08A] transition-colors"
                  >
                    +44 7984 709478
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#F3D08A]" />
                </div>
                <div className="text-xs sm:text-[13.5px] font-sans text-white/95">
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#F3D08A]/85 mb-0.5">
                    Trade Accounts Email
                  </span>
                  <a href="mailto:sales@rootwills.co.uk" className="block font-medium hover:text-[#F3D08A] transition-colors">
                    sales@rootwills.co.uk
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#F3D08A]" />
                </div>
                <div className="text-xs sm:text-[13px] font-sans text-white/95">
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#F3D08A]/85 mb-0.5">
                    Central Distribution
                  </span>
                  <span className="block font-medium text-white/90">
                    The Hub, Nobel Way, Birmingham, UK
                  </span>
                </div>
              </div>
            </div>

            {/* Ambient Circular Glow (matching the reference) */}
            <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-[#BA8E4E]/15 blur-2xl pointer-events-none" />
            <div className="relative z-10 pt-4 border-t border-white/10 text-[11px] text-white/70">
              Need immediate dispatch? Cut-off 22:00 for 06:00 pre-dawn delivery.
            </div>
          </div>

          {/* ─── RIGHT PANEL: LOGIN / REGISTRATION FORM ─── */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            {/* Tab Switcher */}
            <div className="flex items-center border-b border-stone-200 mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signin');
                  setSubmittedRequest(false);
                }}
                className={`pb-3.5 px-4 text-xs sm:text-sm font-bold tracking-tight transition-all relative ${
                  activeTab === 'signin'
                    ? 'text-[#5A101D]'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                Trade Account Sign In
                {activeTab === 'signin' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#5A101D] rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('request');
                  setSubmittedRequest(false);
                }}
                className={`pb-3.5 px-4 text-xs sm:text-sm font-bold tracking-tight transition-all relative ${
                  activeTab === 'request'
                    ? 'text-[#5A101D]'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                Request Trade Account
                {activeTab === 'request' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#5A101D] rounded-full" />
                )}
              </button>
            </div>

            {/* TAB 1: SIGN IN */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-5 flex-1 flex flex-col justify-center">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#2E060D]">
                    Welcome Back to Rootwills
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Enter your account credentials to view contracted rates and place wholesale orders.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Account Number or Work Email
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. chef@venue.co.uk or RW-4821"
                      value={loginForm.identifier}
                      onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5A101D]/20 focus:border-[#5A101D] transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-stone-700">
                        Password
                      </label>
                      <a
                        href="https://wa.me/447984709478?text=Hello%2C%20I%20need%20assistance%20resetting%20my%20Rootwills%20trade%20portal%20password."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-[#BA8E4E] hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5A101D]/20 focus:border-[#5A101D] transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={loginForm.rememberMe}
                      onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                      className="rounded border-stone-300 text-[#5A101D] focus:ring-[#5A101D]"
                    />
                    <label htmlFor="rememberMe" className="text-xs text-stone-600 cursor-pointer">
                      Remember this workstation for fast ordering
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5A101D] to-[#430A13] hover:from-[#430A13] hover:to-[#2B040A] text-white font-bold text-sm shadow-md shadow-[#5A101D]/20 flex items-center justify-center gap-2 transition-all"
                  >
                    {loading ? (
                      <span>Verifying Credentials...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-[#F3D08A]" />
                        <span>Sign In to Trade Account</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-4 text-center text-xs text-stone-500 border-t border-stone-100">
                  Don&apos;t have an authenticated trade account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('request')}
                    className="font-bold text-[#5A101D] hover:underline ml-1"
                  >
                    Request Trade Access &rarr;
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: REQUEST ACCESS */}
            {activeTab === 'request' && (
              <div>
                {submittedRequest ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900">Application Received</h3>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                      Our trade partnerships desk has received your request. An account manager will contact you within 2 business hours with your account details.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('signin')}
                      className="mt-4 px-5 py-2.5 rounded-xl bg-[#5A101D] text-white text-xs font-bold"
                    >
                      Return to Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRequestAccess} className="space-y-4">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-[#2E060D]">
                        Open a Wholesale Trade Account
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Enjoy bespoke tier pricing, 30-day net terms, and priority pre-dawn delivery.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Business / Venue Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. The Dorchester Grill"
                          value={requestForm.businessName}
                          onChange={(e) => setRequestForm({ ...requestForm, businessName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A101D]/20 focus:border-[#5A101D]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Contact Name / Head Chef *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Chef Marcus Wareing"
                          value={requestForm.contactName}
                          onChange={(e) => setRequestForm({ ...requestForm, contactName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A101D]/20 focus:border-[#5A101D]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="procurement@venue.co.uk"
                          value={requestForm.email}
                          onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A101D]/20 focus:border-[#5A101D]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Direct Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+44 7984 000000"
                          value={requestForm.phone}
                          onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A101D]/20 focus:border-[#5A101D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Sector / Hospitality Type
                      </label>
                      <select
                        value={requestForm.businessType}
                        onChange={(e) => setRequestForm({ ...requestForm, businessType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#5A101D]/20 focus:border-[#5A101D]"
                      >
                        <option value="Fine Dining / Restaurant">Fine Dining / Restaurant</option>
                        <option value="Hotel & Banqueting">Hotel &amp; Banqueting</option>
                        <option value="Pub Group / Gastropub">Pub Group / Gastropub</option>
                        <option value="Event Catering / Corporate">Event Catering / Corporate</option>
                        <option value="Dark Kitchen / Food Service">Dark Kitchen / Food Service</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Estimated Weekly Spend / Specific Requirements
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. £3k weekly fresh produce and poultry, morning delivery before 8:00 AM..."
                        value={requestForm.notes}
                        onChange={(e) => setRequestForm({ ...requestForm, notes: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A101D]/20 focus:border-[#5A101D]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5A101D] to-[#430A13] hover:from-[#430A13] hover:to-[#2B040A] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        {loading ? 'Submitting Application...' : 'Submit Trade Account Application'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
