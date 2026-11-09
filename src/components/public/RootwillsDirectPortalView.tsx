'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Lock,
  ArrowLeft,
  ShoppingCart,
  CheckCircle2,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface DraftOrderItem {
  id: string;
  sku: string;
  name: string;
  packSize: string;
  image: string;
  qty: number;
}

export function RootwillsDirectPortalView() {
  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<DraftOrderItem[]>([]);
  const [signedInSuccess, setSignedInSuccess] = useState(false);

  // Sign In Form State
  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: '',
    rememberMe: true,
  });

  // Read saved cart items from localStorage
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

  const cartCount = orderItems.length;
  const totalCases = orderItems.reduce((acc, it) => acc + (it.qty || 0), 0);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      setSignedInSuccess(true);
      // If user came from cart, return to products or order review
      setTimeout(() => {
        window.location.href = '/products';
      }, 1200);
    }, 800);
  };

  return (
    <div className="relative bg-[#FAF7F2] min-h-screen text-[#131313] overflow-x-hidden pb-20 sm:pb-28">
      {/* Upper Soft Tinted Header Backdrop */}
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
          <div className="relative w-[54px] h-[54px] sm:w-[70px] sm:h-[70px] rounded-full shrink-0 bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/80 shadow-[0_4px_18px_rgba(46,6,13,0.18)] transition-transform duration-300 group-hover:scale-105 overflow-hidden">
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

      {/* ─── CENTERED INTRO HEADER ─── */}
      <section className="relative z-10 pt-8 sm:pt-14 pb-5 sm:pb-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-2 sm:space-y-3">
          {cartCount > 0 ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A101D]/10 text-[#5A101D] text-xs font-bold tracking-wide mb-1">
              <ShoppingCart className="w-3.5 h-3.5 text-[#BA8E4E]" />
              <span>{cartCount} item{cartCount > 1 ? 's' : ''} saved in your basket</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#5A101D]/10 text-[#5A101D] text-[11px] font-bold tracking-wider uppercase mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#BA8E4E]" />
              Secure Customer Portal
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-bold tracking-tight text-[#2E060D]">
            Sign In to Continue
          </h1>
          <p className="text-xs sm:text-sm lg:text-[15px] text-stone-600 font-sans max-w-[50ch] mx-auto leading-[1.6] sm:leading-[1.7]">
            Please log in with your email or account number to apply contracted trade rates and proceed with your order.
          </p>
        </div>
      </section>

      {/* ─── OPTIONAL WHOLESALE DRAFT ORDER PREVIEW (When coming from catalog) ─── */}
      {orderItems.length > 0 && (
        <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#E8DEC8] shadow-[0_8px_30px_rgba(46,6,13,0.04)] font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8]/70">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#5A101D]/10 text-[#5A101D] flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-[#BA8E4E]" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#2E060D]">
                    Your Draft Wholesale Order ({orderItems.length} {orderItems.length === 1 ? 'line' : 'lines'} • {totalCases} {totalCases === 1 ? 'case' : 'cases'})
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Dispatched in standard pre-dawn window (04:00 – 07:30 AM)
                  </p>
                </div>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B2635] hover:text-[#2E060D] transition-colors"
              >
                <span>Modify Lines</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Scrollable grid/list of draft items */}
            <div className="mt-3.5 max-h-[220px] overflow-y-auto space-y-2 pr-1 divide-y divide-[#E8DEC8]/40">
              {orderItems.map((item) => (
                <div key={item.id} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-11 h-11 rounded-lg bg-white border border-[#E8DEC8] shrink-0 overflow-hidden flex items-center justify-center p-1">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="44px"
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-800 truncate text-[12.5px]">{item.name}</p>
                      <p className="text-[11px] font-mono text-stone-500">{item.packSize} • SKU: {item.sku}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-[#2E060D] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E8DEC8] text-xs">
                      {item.qty} {item.qty === 1 ? 'case' : 'cases'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── UNIFIED LUXURY CARD (Matching Enquiry page reference) ─── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[20px] sm:rounded-[24px] p-2.5 sm:p-3.5 shadow-[0_24px_70px_rgba(46,6,13,0.08)] border border-[#EAE0CE]/90 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* ─── LEFT PANEL: CONTACT INFORMATION CARD (Exact match to Enquiry Page) ─── */}
          <div className="lg:col-span-5 relative rounded-[14px] sm:rounded-[16px] bg-gradient-to-br from-[#5A101D] via-[#430A13] to-[#2B040A] text-white p-5 sm:p-10 overflow-hidden flex flex-col justify-between min-h-0 sm:min-h-[450px]">
            {/* Top Heading & Intro */}
            <div className="relative z-10 space-y-1.5 sm:space-y-2.5">
              <h2 className="text-lg sm:text-[22px] font-sans font-bold tracking-tight text-white">
                Contact Information
              </h2>
              <p className="text-[11.5px] sm:text-[13px] text-white/80 font-sans leading-relaxed max-w-[34ch] sm:max-w-[30ch]">
                Reach our wholesale partnerships desk and pre-dawn logistics team directly for bespoke kitchen supply.
              </p>
            </div>

            {/* Middle Contact Details List */}
            <div className="relative z-10 space-y-3.5 sm:space-y-6 my-4 sm:my-auto py-1 sm:py-4">
              {/* Landline Number */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3D08A] shrink-0" />
                <div className="text-xs sm:text-[13.5px] font-sans text-white/95 tabular-nums">
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#F3D08A]/85 mb-0.5">
                    Landline No
                  </span>
                  <a
                    href="tel:+441616412803"
                    className="block font-medium hover:text-[#F3D08A] transition-colors"
                  >
                    +44 16164 12803
                  </a>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3D08A] shrink-0" />
                <div className="text-xs sm:text-[13.5px] font-sans text-white/95 tabular-nums">
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#F3D08A]/85 mb-0.5">
                    WhatsApp No
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
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3D08A] shrink-0" />
                <div className="text-xs sm:text-[13.5px] font-sans text-white/95">
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#F3D08A]/85 mb-0.5">
                    Email
                  </span>
                  <a
                    href="mailto:sales@rootwills.co.uk"
                    className="block font-medium hover:text-[#F3D08A] transition-colors"
                  >
                    sales@rootwills.co.uk
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3D08A] shrink-0" />
                <span className="text-xs sm:text-[13.5px] font-sans text-white/95 leading-snug">
                  The Hub, Nobel Wy, Birmingham, UK
                </span>
              </div>
            </div>

            {/* Bottom spacer for balance */}
            <div className="hidden sm:block relative z-10 h-2" />

            {/* Decorative Translucent Corner Circle (matches reference design exactly) */}
            <div
              className="
                absolute -bottom-10 -right-10 w-32 h-32 sm:w-52 sm:h-52 rounded-full pointer-events-none
                bg-gradient-to-tl from-[#F3D08A]/25 via-[#BA8E4E]/20 to-white/5
              "
            />
          </div>

          {/* ─── RIGHT PANEL: CLEAN UNDERLINE FORM (Matching Enquiry Page) ─── */}
          <div className="lg:col-span-7 px-4 py-5 sm:px-12 sm:py-11 flex flex-col justify-center bg-white rounded-r-[16px]">
            {signedInSuccess ? (
              <div className="py-8 sm:py-12 text-center space-y-3 sm:space-y-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF7F0] text-[#4E0D17] ring-1 ring-[#BA8E4E]/40 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2E060D]">
                  Signed In Successfully
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto leading-relaxed">
                  Loading your contracted wholesale pricing and proceeding with your order...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSignIn} className="space-y-4 sm:space-y-7">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2E060D]">
                    Sign In to Rootwills
                  </h3>
                  <p className="text-xs sm:text-[13px] text-stone-500 font-sans">
                    Enter your account number or work email to view live contract pricing and place your order.
                  </p>
                </div>

                {/* Input 1: Account Number or Work Email */}
                <div className="group pt-2">
                  <label
                    htmlFor="login-identifier"
                    className="block text-[11px] sm:text-xs font-sans font-medium text-stone-500 group-focus-within:text-[#4E0D17] transition-colors"
                  >
                    Account Number or Work Email
                  </label>
                  <input
                    id="login-identifier"
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="e.g. chef@venue.co.uk or account ID"
                    value={loginForm.identifier}
                    onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                    className="w-full pt-1.5 pb-2 sm:pt-2 sm:pb-2.5 text-xs sm:text-[15px] font-sans font-medium text-[#180205] bg-transparent border-b border-stone-200 focus:border-[#4E0D17] focus:outline-none transition-colors placeholder:text-stone-400"
                  />
                </div>

                {/* Input 2: Password */}
                <div className="group">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="login-password"
                      className="block text-[11px] sm:text-xs font-sans font-medium text-stone-500 group-focus-within:text-[#4E0D17] transition-colors"
                    >
                      Password
                    </label>
                    <a
                      href="https://wa.me/447984709478?text=Hello%2C%20I%20need%20assistance%20resetting%20my%20Rootwills%20password."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-sans font-medium text-[#BA8E4E] hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <input
                    id="login-password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full pt-1.5 pb-2 sm:pt-2 sm:pb-2.5 text-xs sm:text-[15px] font-sans font-medium text-[#180205] bg-transparent border-b border-stone-200 focus:border-[#4E0D17] focus:outline-none transition-colors placeholder:text-stone-400"
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={loginForm.rememberMe}
                    onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                    className="rounded border-stone-300 text-[#4E0D17] focus:ring-[#4E0D17]"
                  />
                  <label htmlFor="rememberMe" className="text-xs text-stone-600 font-sans cursor-pointer select-none">
                    Remember this workstation for quick ordering
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-lg bg-[#4E0D17] hover:bg-[#2B040A] text-white text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Verifying...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-[#F3D08A]" />
                        <span>Sign In &amp; Proceed to Order</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-4 text-xs text-stone-500 font-sans border-t border-stone-100 flex items-center justify-between">
                  <span>New hospitality client?</span>
                  <a
                    href="https://wa.me/447984709478?text=Hello%2C%20I%20would%20like%20to%20set%20up%20a%20new%20Rootwills%20wholesale%20account."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#4E0D17] hover:underline flex items-center gap-1"
                  >
                    <span>Instant WhatsApp Setup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
