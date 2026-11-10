'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Lock,
  X,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { WholesaleCheckoutModal } from './WholesaleCheckoutModal';

export function RootwillsDirectPortalView() {
  const [loading, setLoading] = useState(false);
  const [showCookieNotice, setShowCookieNotice] = useState(true);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // Form State
  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: '',
    staySignedIn: true,
  });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.identifier.trim() || !loginForm.password.trim()) {
      alert('Please enter your Login ID and Password.');
      return;
    }

    setLoading(true);

    // Simulate login and redirect to products catalog
    setTimeout(() => {
      setLoading(false);
      try {
        localStorage.setItem('rootwills_user_logged_in', 'true');
        localStorage.setItem(
          'rootwills_user_account',
          JSON.stringify({
            identifier: loginForm.identifier,
            accountName: 'The Savoy London (Fairmont)',
            accountNo: 'RW-2026-89412',
            tier: 'Tier 1 Wholesale Direct',
          })
        );
      } catch {
        // ignore
      }
      window.location.href = '/products';
    }, 600);
  };

  return (
    <div className="relative bg-[#FAF7F2] min-h-screen text-[#131313] flex flex-col justify-between font-sans selection:bg-[#4E0D17] selection:text-white">
      {/* Seamless Botanical Parchment Texture Overlay */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />

      {/* ─── 1. TOP COOKIE / COMPLIANCE BANNER (Matches Bidfood Direct) ─── */}
      {showCookieNotice && (
        <div className="relative z-30 bg-black text-white text-[11px] sm:text-xs py-2 px-4 flex items-center justify-between border-b border-stone-800">
          <div className="max-w-5xl mx-auto text-center flex-1 pr-4 text-white/90">
            <span>
              This website uses cookies, some of which are essential to ensure our site works for you in the best possible way. By continuing to use this website, you agree to our use of cookies.{' '}
            </span>
            <Link href="/privacy" className="underline hover:text-[#F3D08A] transition-colors">
              Learn more.
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setShowCookieNotice(false)}
            className="text-white/60 hover:text-white p-1 transition-colors border border-white/20 rounded text-[11px] px-1.5 py-0.5 leading-none shrink-0"
            aria-label="Close banner"
          >
            &#x2715;
          </button>
        </div>
      )}

      {/* ─── 2. MAIN BODY (Zero Nav Bar, Clean Centered Layout matching Bidfood Direct) ─── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 w-full max-w-2xl mx-auto my-auto">
        {/* Large Centered Logo */}
        <div className="text-center mb-6 sm:mb-8 flex flex-col items-center">
          <Link href="/" className="inline-flex flex-col items-center group">
            {/* Master Seal Medallion with Gold Rim */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/80 shadow-[0_4px_24px_rgba(46,6,13,0.18)] transition-transform duration-300 group-hover:scale-105 overflow-hidden p-1.5 mb-2.5">
              <Image
                src="/images/logo.png"
                alt="Rootwills Master Logo"
                fill
                sizes="80px"
                className="object-contain p-1 rounded-full"
                priority
                unoptimized
              />
            </div>

            {/* Wordmark: Rootwills Direct */}
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-4xl sm:text-5xl text-[#2E060D] tracking-tight leading-none">
                Rootwills
              </span>
              <span className="font-serif italic font-normal text-3xl sm:text-4xl text-[#A2441D] leading-none">
                Direct
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#8C6E12] font-semibold mt-1">
              Food Services &bull; Wholesale Portal
            </span>
          </Link>
        </div>

        {/* ─── CENTER LOGIN CARD (Bidfood Direct Exact Layout in Rootwills Luxury Theme) ─── */}
        <div className="w-full max-w-[460px] bg-[#240308] text-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(36,3,8,0.55)] border border-[#BA8E4E]/30 p-6 sm:p-8">
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Field 1: Login ID */}
            <div className="flex rounded-md overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#F3D08A]">
              <div className="w-11 bg-[#7E1A29] flex items-center justify-center text-white shrink-0">
                <User className="w-4 h-4 text-[#F3D08A]" />
              </div>
              <input
                type="text"
                required
                value={loginForm.identifier}
                onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                placeholder="Login ID"
                className="w-full px-3.5 py-2.5 text-stone-900 text-sm outline-none placeholder:text-stone-400 font-sans"
              />
            </div>

            {/* Field 2: Password */}
            <div className="flex rounded-md overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#F3D08A]">
              <div className="w-11 bg-[#7E1A29] flex items-center justify-center text-white shrink-0">
                <Lock className="w-4 h-4 text-[#F3D08A]" />
              </div>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Password"
                className="w-full px-3.5 py-2.5 text-stone-900 text-sm outline-none placeholder:text-stone-400 font-sans"
              />
            </div>

            {/* Primary Action Button: Log In */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md bg-[#8C1D2F] hover:bg-[#A82439] text-white font-sans font-bold text-base tracking-wide transition-all active:scale-[0.98] shadow-md cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>
            </div>

            {/* Row 1: Stay Signed In | Forgotten Password? */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-stone-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={loginForm.staySignedIn}
                  onChange={(e) => setLoginForm({ ...loginForm, staySignedIn: e.target.checked })}
                  className="rounded border-stone-400 text-[#8C1D2F] focus:ring-[#F3D08A] w-3.5 h-3.5 bg-white"
                />
                <span className="text-[12px]">Stay Signed In</span>
              </label>

              <button
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-[#F3D08A] hover:underline font-medium text-[12px] cursor-pointer"
              >
                Forgotten Password?
              </button>
            </div>

            {/* Row 2: Register Here | Become a customer */}
            <div className="flex items-center justify-between text-xs sm:text-[13px] pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsCustomerModalOpen(true)}
                className="text-[#F3D08A] hover:underline font-semibold cursor-pointer"
              >
                Register Here
              </button>

              <button
                type="button"
                onClick={() => setIsCustomerModalOpen(true)}
                className="text-[#F3D08A] hover:underline font-semibold cursor-pointer"
              >
                Become a customer
              </button>
            </div>

            {/* Quick Demo Fill */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setLoginForm({
                    identifier: 'chef@savoy.london',
                    password: 'demo-password-2026',
                    staySignedIn: true,
                  });
                }}
                className="text-[10.5px] font-mono text-white/40 hover:text-white/80 underline"
              >
                Auto-fill demo credentials
              </button>
            </div>
          </form>
        </div>

        {/* ─── MOBILE APP BADGES (Centered under card, matching Bidfood Direct) ─── */}
        <div className="mt-7 flex items-center justify-center gap-3">
          {/* App Store Badge */}
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-black hover:bg-stone-900 text-white text-xs font-sans font-semibold flex items-center gap-2.5 shadow-sm transition-all active:scale-95 border border-stone-800"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.76 1.06-1.82.94-2.88-.91.04-2.02.61-2.67 1.37-.58.67-1.09 1.76-.95 2.8.01 0 .03 0 .05 0 1.02 0 2-.53 2.63-1.29z"/>
            </svg>
            <div className="text-left leading-tight">
              <div className="text-[9px] text-stone-400 uppercase leading-none">Download on the</div>
              <div className="text-[12px] font-bold">App Store</div>
            </div>
          </a>

          {/* Google Play Badge */}
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-black hover:bg-stone-900 text-white text-xs font-sans font-semibold flex items-center gap-2.5 shadow-sm transition-all active:scale-95 border border-stone-800"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.22-.924V2.738c0-.34.08-.656.22-.924zm11.238 11.24l2.585 2.586-11.87 6.852 9.285-9.438zm0-2.108L5.562 1.508l11.87 6.852-2.585 2.586zm1.488 1.488l3.415 1.972c.87.502.87 1.328 0 1.83l-3.415 1.972-2.108-2.108 2.108-2.108z"/>
            </svg>
            <div className="text-left leading-tight">
              <div className="text-[9px] text-stone-400 uppercase leading-none">Get it on</div>
              <div className="text-[12px] font-bold">Google Play</div>
            </div>
          </a>
        </div>
      </main>

      {/* ─── 3. BOTTOM FULL-WIDTH BLACK FOOTER (Matches Bidfood Direct) ─── */}
      <footer className="relative z-20 bg-black text-white py-6 px-4 text-center border-t border-stone-800">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-stone-300 font-sans">
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Promotional Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>

          <div className="text-[11px] font-mono text-stone-500">
            Copyright &copy; 2026 Rootwills. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ─── BECOME A CUSTOMER MODAL (Opens with exact luxury layout) ─── */}
      <WholesaleCheckoutModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
      />

      {/* ─── FORGOTTEN PASSWORD HELP MODAL ─── */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-[#FFFDF9] rounded-2xl max-w-md w-full p-6 border border-stone-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-[#2E060D]">
                Reset Wholesale Password
              </h3>
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(false)}
                className="text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              Wholesale accounts are managed under commercial contracts. For instant password reset or login recovery, please contact your assigned depot lead or message dispatch directly:
            </p>
            <div className="space-y-2 pt-2">
              <a
                href="https://wa.me/447984709478?text=Hello%20Rootwills%20Support%2C%20I%20need%20assistance%20logging%20into%20my%20wholesale%20trade%20account."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Account Desk (+44 7984 709478)</span>
              </a>
              <a
                href="tel:+441616412803"
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Landline (+44 16164 12803)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RootwillsDirectPortalView;
