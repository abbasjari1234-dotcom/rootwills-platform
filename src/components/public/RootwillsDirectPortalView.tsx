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

export function RootwillsDirectPortalView() {
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const [signedInSuccess, setSignedInSuccess] = useState(false);

  // Sign In Form State
  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: '',
    rememberMe: true,
  });

  // Read saved cart items count from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rootwills_direct_draft_order');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCartCount(parsed.length);
        }
      }
    } catch {
      // ignore
    }
  }, []);

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

      {/* ─── UNIFIED LUXURY CARD (Matching Enquiry page reference) ─── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[20px] sm:rounded-[24px] p-2.5 sm:p-3.5 shadow-[0_24px_70px_rgba(46,6,13,0.08)] border border-[#EAE0CE]/90 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* ─── LEFT PANEL: CONTACT INFORMATION & DESK ─── */}
          <div className="lg:col-span-5 relative rounded-[16px] sm:rounded-[18px] bg-gradient-to-br from-[#5A101D] via-[#430A13] to-[#2B040A] text-white p-6 sm:p-10 overflow-hidden flex flex-col justify-between min-h-[440px]">
            {/* Top Heading */}
            <div className="relative z-10 space-y-2">
              <h2 className="text-lg sm:text-[22px] font-sans font-bold tracking-tight text-white">
                Customer Support &amp; Orders
              </h2>
              <p className="text-[12px] sm:text-[13px] text-white/80 font-sans leading-relaxed">
                Need help placing your order or setting up a custom price contract? Reach our wholesale desk directly.
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
                    Direct Landline
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
                    Order Assistance WhatsApp
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
                    Support &amp; Invoices
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
                    Distribution Depot
                  </span>
                  <span className="block font-medium text-white/90">
                    The Hub, Nobel Way, Birmingham, UK
                  </span>
                </div>
              </div>
            </div>

            {/* Ambient Circular Glow */}
            <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-[#BA8E4E]/15 blur-2xl pointer-events-none" />
            <div className="relative z-10 pt-4 border-t border-white/10 text-[11px] text-white/70">
              Orders placed before 22:00 qualify for next-morning 06:00 AM delivery.
            </div>
          </div>

          {/* ─── RIGHT PANEL: DEDICATED LOGIN FORM ─── */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            {signedInSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2E060D]">Signed In Successfully</h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Loading your contracted wholesale pricing and proceeding with your order...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#2E060D]">
                    Account Login
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Enter your email or account number to view contracted pricing and proceed.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Email or Account Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. chef@venue.co.uk or account ID"
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
                        href="https://wa.me/447984709478?text=Hello%2C%20I%20need%20assistance%20resetting%20my%20Rootwills%20password."
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
                      Remember this workstation for quick ordering
                    </label>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5A101D] to-[#430A13] hover:from-[#430A13] hover:to-[#2B040A] text-white font-bold text-sm shadow-md shadow-[#5A101D]/20 flex items-center justify-center gap-2 transition-all"
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

                <div className="pt-4 text-center text-xs text-stone-500 border-t border-stone-100 flex items-center justify-between">
                  <span>New hospitality client?</span>
                  <a
                    href="https://wa.me/447984709478?text=Hello%2C%20I%20would%20like%20to%20set%20up%20a%20new%20Rootwills%20wholesale%20account."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#5A101D] hover:underline flex items-center gap-1"
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
