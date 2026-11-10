'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  X,
  Smartphone,
} from 'lucide-react';
import { WholesaleCheckoutModal } from './WholesaleCheckoutModal';

export function RootwillsDirectPortalView() {
  const [loading, setLoading] = useState(false);
  const [signedInSuccess, setSignedInSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNotice, setShowNotice] = useState(true);
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
      alert('Please enter your Account Number/Email and Password.');
      return;
    }

    setLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      setSignedInSuccess(true);
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

      setTimeout(() => {
        window.location.href = '/products';
      }, 1000);
    }, 700);
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

      {/* Top Banner Notice (Bidfood Direct-style compliance / SLA notice) */}
      {showNotice && (
        <div className="relative z-30 bg-[#260309] text-white/90 text-[11px] sm:text-xs py-2 px-4 flex items-center justify-between border-b border-[#BA8E4E]/30">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-center justify-center flex-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F3D08A] animate-pulse" />
            <span className="font-mono uppercase tracking-wider text-[#F3D08A] font-semibold">
              Rootwills Direct Trade Portal:
            </span>
            <span>Pre-dawn kitchen delivery cutoff is 23:00 GMT for tomorrow morning drops.</span>
          </div>
          <button
            type="button"
            onClick={() => setShowNotice(false)}
            className="text-white/60 hover:text-white p-1 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Center Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 max-w-xl mx-auto w-full">
        {/* ─── 1. LARGE PROMINENT BRAND HEADER (Rootwills Direct) ─── */}
        <div className="text-center mb-6 sm:mb-8 flex flex-col items-center">
          <Link href="/" className="inline-flex flex-col items-center group">
            {/* Master Seal Medallion with Gold Ring */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/80 shadow-[0_4px_24px_rgba(46,6,13,0.18)] transition-transform duration-300 group-hover:scale-105 overflow-hidden p-1.5 mb-3">
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

            {/* Wordmark with "Direct" Emphasis */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="font-serif font-black text-3xl sm:text-4xl text-[#2E060D] tracking-tight leading-none">
                Rootwills
              </span>
              <span className="font-serif italic font-normal text-3xl sm:text-4xl text-[#A2441D] leading-none">
                Direct
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#8C6E12] font-semibold mt-1.5">
              Commercial Food Services &bull; Wholesale Portal
            </span>
          </Link>
        </div>

        {/* ─── 2. THE SIGNATURE RED & WHITE LUXURY LOGIN CARD ─── */}
        <div className="w-full bg-[#FFFDF9] rounded-[24px] sm:rounded-[28px] shadow-[0_25px_70px_-15px_rgba(46,6,13,0.30)] border border-stone-200/90 overflow-hidden ring-1 ring-black/5">
          {/* Top Oxblood Red Banner with Geometric Watermark Arcs */}
          <div className="relative bg-gradient-to-br from-[#5A101D] via-[#430A13] to-[#2B040A] text-white px-6 sm:px-8 pt-7 pb-6 overflow-hidden">
            {/* Geometric Watermark Arcs */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-white/[0.04] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full border border-white/[0.07] pointer-events-none" />
            <div className="absolute -top-16 -left-16 w-44 h-44 rounded-full bg-[#F3D08A]/[0.06] pointer-events-none blur-xl" />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10.5px] font-mono uppercase tracking-wider text-[#F3D08A] font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Trade Account Sign In</span>
              </div>
              <h1 className="text-2xl sm:text-[26px] font-serif font-bold text-white tracking-tight">
                Wholesale Portal Login
              </h1>
              <p className="text-xs text-white/75 font-sans mt-1">
                Enter your contracted credentials to access bespoke kitchen pricing.
              </p>
            </div>
          </div>

          {/* Form Area */}
          <div className="p-6 sm:p-8">
            {signedInSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Signed In Successfully
                </h3>
                <p className="text-xs text-stone-600 font-sans max-w-sm mx-auto">
                  Applying contracted wholesale pricing and redirecting to the kitchen order pad...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSignIn} className="space-y-4 sm:space-y-5">
                {/* Field 1: Login ID / Account Number */}
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-sans font-semibold text-stone-700 block uppercase tracking-wider">
                    Login ID / Account Number
                  </label>
                  <div className="relative flex items-center rounded-xl bg-white border border-stone-200/90 shadow-sm focus-within:ring-2 focus-within:ring-[#BA8E4E] focus-within:border-transparent transition-all">
                    <span className="pl-3.5 text-stone-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={loginForm.identifier}
                      onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                      placeholder="e.g. RW-2026-89412 or chef@venue.co.uk"
                      className="w-full bg-transparent text-stone-900 px-3 py-2.5 text-xs sm:text-[13.5px] outline-none placeholder:text-stone-400 font-sans"
                    />
                  </div>
                </div>

                {/* Field 2: Password */}
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-sans font-semibold text-stone-700 block uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative flex items-center rounded-xl bg-white border border-stone-200/90 shadow-sm focus-within:ring-2 focus-within:ring-[#BA8E4E] focus-within:border-transparent transition-all">
                    <span className="pl-3.5 text-stone-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full bg-transparent text-stone-900 px-3 py-2.5 text-xs sm:text-[13.5px] outline-none placeholder:text-stone-400 font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="pr-3 text-stone-400 hover:text-stone-600 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Checkbox: Stay Signed In + Forgotten Password */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-stone-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={loginForm.staySignedIn}
                      onChange={(e) => setLoginForm({ ...loginForm, staySignedIn: e.target.checked })}
                      className="rounded border-stone-300 text-[#4E0D17] focus:ring-[#4E0D17] w-3.5 h-3.5"
                    />
                    <span className="font-sans text-[12px]">Stay Signed In</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-[#4E0D17] hover:text-[#2B040A] font-semibold text-[12px] underline transition-colors cursor-pointer"
                  >
                    Forgotten Password?
                  </button>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#4E0D17] hover:bg-[#34070F] text-white text-xs sm:text-sm font-sans font-bold transition-all duration-200 cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 group"
                  >
                    {loading ? (
                      <span>Verifying Trade Account...</span>
                    ) : (
                      <>
                        <span>Log In to Rootwills Direct</span>
                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                          <ArrowRight className="w-3 h-3 text-[#F3D08A]" />
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Test Demo Hint */}
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
                    className="text-[11px] font-mono text-stone-400 hover:text-stone-700 underline"
                  >
                    Auto-fill demo chef credentials
                  </button>
                </div>

                {/* Divider Line */}
                <div className="relative py-2 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-200" />
                  </div>
                  <span className="relative bg-[#FFFDF9] px-3 text-[11px] font-mono text-stone-400 uppercase">
                    New Hospitality Account?
                  </span>
                </div>

                {/* Secondary Actions (Bidfood Direct-style "Become a Customer" + "Browse Catalog") */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsCustomerModalOpen(true)}
                    className="py-2.5 px-3 rounded-xl bg-[#FAF4ED] hover:bg-[#F3ECE0] text-[#4E0D17] border border-[#E8DEC8] text-xs font-semibold font-sans transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#BA8E4E]" />
                    <span>Become a Customer</span>
                  </button>

                  <Link
                    href="/products"
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs font-semibold font-sans transition-all flex items-center justify-center gap-1.5 text-center"
                  >
                    <span>Browse Catalog</span>
                    <ArrowRight className="w-3 h-3 text-stone-400" />
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ─── 3. MOBILE APP DOWNLOAD BADGES (Bidfood Direct Style) ─── */}
        <div className="mt-8 flex flex-col items-center space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-semibold flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-[#BA8E4E]" />
            <span>Kitchen Display &bull; Order On The Go</span>
          </span>

          <div className="flex items-center justify-center gap-3">
            {/* App Store Pill */}
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#131313] hover:bg-black text-white text-xs font-sans font-semibold flex items-center gap-2.5 shadow-sm transition-all active:scale-95 border border-stone-800"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.76 1.06-1.82.94-2.88-.91.04-2.02.61-2.67 1.37-.58.67-1.09 1.76-.95 2.8.01 0 .03 0 .05 0 1.02 0 2-.53 2.63-1.29z"/>
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[9px] text-stone-400 uppercase leading-none">Download on the</div>
                <div className="text-[12px] font-bold">App Store</div>
              </div>
            </a>

            {/* Google Play Pill */}
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#131313] hover:bg-black text-white text-xs font-sans font-semibold flex items-center gap-2.5 shadow-sm transition-all active:scale-95 border border-stone-800"
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
        </div>
      </main>

      {/* ─── 4. BIDFOOD DIRECT-STYLE FOOTER ─── */}
      <footer className="relative z-10 border-t border-stone-200/80 bg-white/70 backdrop-blur-sm py-4 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-sans">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/about" className="hover:text-[#4E0D17] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-[#4E0D17] transition-colors">
              Contact Desk
            </Link>
            <Link href="/terms" className="hover:text-[#4E0D17] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-[#4E0D17] transition-colors">
              Privacy Policy
            </Link>
          </div>

          <div className="text-[11px] font-mono text-stone-400">
            Copyright &copy; 2026 Rootwills Ltd. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ─── 5. BECOME A CUSTOMER MODAL (Exact design matching your approved version) ─── */}
      <WholesaleCheckoutModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
      />

      {/* ─── 6. FORGOTTEN PASSWORD HELP MODAL ─── */}
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
                className="text-stone-400 hover:text-stone-600"
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
                <span>WhatsApp Account Desk (+44 7984 709478)</span>
              </a>
              <a
                href="tel:+441616412803"
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
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
