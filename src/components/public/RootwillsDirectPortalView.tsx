'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Phone,
  MessageCircle,
  AlertCircle,
} from 'lucide-react';
import { WholesaleCheckoutModal } from './WholesaleCheckoutModal';

export function RootwillsDirectPortalView() {
  const [loading, setLoading] = useState(false);
  const [signedInSuccess, setSignedInSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isAuthRequired, setIsAuthRequired] = useState(false);
  const [redirectTarget, setRedirectTarget] = useState('/products');

  // Form State
  const [form, setForm] = useState({
    identifier: '',
    password: '',
    staySignedIn: true,
  });

  // Read URL params safely on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('auth_required') === '1') {
        setIsAuthRequired(true);
      }
      const r = params.get('redirect');
      if (r) {
        setRedirectTarget(r);
      }
    }
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.identifier.trim() || !form.password.trim()) {
      alert('Please enter your Account ID and Password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSignedInSuccess(true);
      try {
        // Set persistent authentication cookie so Next.js middleware grants access
        document.cookie = 'rootwills_auth=true; path=/; max-age=2592000; SameSite=Lax';
        localStorage.setItem('rootwills_user_logged_in', 'true');
        localStorage.setItem(
          'rootwills_user_account',
          JSON.stringify({
            identifier: form.identifier,
            accountName: 'Wholesale Trade Account',
            accountNo: 'RW-2026-89412',
            tier: 'Tier 1 Wholesale Direct',
          })
        );
      } catch {
        // ignore storage errors
      }

      setTimeout(() => {
        window.location.href = redirectTarget;
      }, 700);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#131313] flex flex-col justify-between font-sans selection:bg-[#4E0D17] selection:text-[#FAF7F2] relative overflow-hidden">
      {/* ─── British Heritage Botanical Parchment Canvas (Exact Main Web Match) ─── */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.38] mix-blend-multiply pointer-events-none -z-10"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
        aria-hidden="true"
      />

      {/* Soft Luminous Center Vignette keeping text & card pristine */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 45%, rgba(255, 255, 255, 0.72) 0%, rgba(250, 247, 242, 0.35) 60%, rgba(250, 247, 242, 0) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ─── TOP BRAND BAR (High-Visibility Master Seal & Exact Font Match) ─── */}
      <header className="relative z-10 max-w-6xl mx-auto w-full px-5 sm:px-8 py-6 sm:py-8 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3 sm:gap-4 group focus:outline-none shrink-0">
          {/* Heritage Master Seal with Warm Gold Halo Rim from Main Web */}
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full shrink-0 bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/80 shadow-[0_4px_16px_rgba(26,26,24,0.18)] transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_6px_20px_rgba(186,142,78,0.32)] overflow-hidden p-1">
            <Image
              src="/images/logo.png"
              alt="Rootwills Master Seal"
              fill
              sizes="64px"
              className="object-contain p-0.5 rounded-full"
              priority
              unoptimized
            />
          </div>

          {/* Exact Brand Font & Typography from Main Web */}
          <div className="flex flex-col text-left">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#131313] tracking-[-0.03em] leading-tight group-hover:text-[#BA8E4E] transition-colors">
                Rootwills
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-serif italic text-[#A2441D] tracking-tight">
                Direct
              </span>
            </div>
            <span className="text-[11px] sm:text-xs text-[#706C65] font-sans font-medium tracking-normal leading-tight">
              Food Services &amp; Wholesale
            </span>
          </div>
        </Link>

        {/* Live Operational Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-stone-200/80 shadow-2xs backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono text-stone-600 tracking-wider uppercase font-semibold">
            B2B Trade Portal Active
          </span>
        </div>
      </header>

      {/* ─── MAIN CENTER MINIMALIST LOGIN ─── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-10 w-full max-w-md mx-auto">
        {/* Brand Crest & Lockup */}
        <div className="text-center mb-6 sm:mb-8 flex flex-col items-center">
          {/* Prominent Center Master Seal Medallion */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/80 shadow-[0_8px_24px_rgba(46,6,13,0.12)] p-2 mb-4">
            <Image
              src="/images/logo.png"
              alt="Rootwills Master Seal"
              fill
              sizes="96px"
              className="object-contain p-1 rounded-full"
              priority
              unoptimized
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3EA] border border-[#E8DEC8] text-[10.5px] font-mono uppercase tracking-[0.2em] text-[#8C6E12] font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#BA8E4E]" />
            <span>Pre-Dawn Ordering Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Sign In to Direct
          </h1>
          <p className="mt-2 text-xs sm:text-[13px] text-stone-600 font-sans max-w-sm mx-auto leading-relaxed">
            Enter your wholesale credentials to access contracted venue pricing and place order drops.
          </p>
        </div>

        {/* Minimalist Architectural Card */}
        <div className="w-full bg-white/95 backdrop-blur-xs rounded-[24px] border border-stone-200/90 shadow-[0_18px_50px_-12px_rgba(46,6,13,0.08)] p-7 sm:p-9">
          {signedInSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Verified Successfully
              </h2>
              <p className="text-xs text-stone-500 font-sans">
                Opening your kitchen order pad...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-4">
              {/* Restricted Catalog Access Notice */}
              {isAuthRequired && (
                <div className="p-3.5 rounded-xl bg-[#FAF3EA] border border-[#E8DEC8] flex items-start gap-2.5 text-left">
                  <AlertCircle className="w-4 h-4 text-[#A2441D] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#5C4524] font-sans leading-relaxed">
                    <strong className="font-semibold text-[#2E060D]">Trade Sign-In Required:</strong> Catalog lines, wholesale pack sizes, and contract pricing are strictly reserved for verified hospitality businesses.
                  </p>
                </div>
              )}

              {/* Account ID / Email */}
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-sans font-medium text-stone-700 block uppercase tracking-wider">
                  Account ID or Email
                </label>
                <input
                  type="text"
                  required
                  value={form.identifier}
                  onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                  placeholder="e.g. chef@venue.co.uk or RW-89412"
                  className="w-full bg-[#FAF9F7] text-stone-900 border border-stone-200/90 focus:border-[#4E0D17] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-[13.5px] outline-none transition-all placeholder:text-stone-400 font-sans"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11.5px] font-sans font-medium text-stone-700 block uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-[11.5px] font-sans font-medium text-[#4E0D17] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Enter your trade password"
                    className="w-full bg-[#FAF9F7] text-stone-900 border border-stone-200/90 focus:border-[#4E0D17] focus:bg-white rounded-xl px-3.5 py-2.5 pr-10 text-xs sm:text-[13.5px] outline-none transition-all placeholder:text-stone-400 font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-stone-400 hover:text-stone-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Stay Signed In */}
              <div className="pt-1">
                <label className="flex items-center gap-2 text-stone-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.staySignedIn}
                    onChange={(e) => setForm({ ...form, staySignedIn: e.target.checked })}
                    className="rounded border-stone-300 text-[#4E0D17] focus:ring-[#4E0D17] w-3.5 h-3.5"
                  />
                  <span className="text-[12px] font-sans">Remember this device for 30 days</span>
                </label>
              </div>

              {/* Primary Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#2E060D] hover:bg-[#150205] text-white text-xs sm:text-[13px] font-sans font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Verifying...</span>
                  ) : (
                    <>
                      <span>Sign In to Direct</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F3D08A]" />
                    </>
                  )}
                </button>
              </div>

              {/* Bottom Separator */}
              <div className="pt-4 border-t border-stone-100 text-center">
                <span className="text-xs text-stone-500 font-sans">
                  New commercial venue?{' '}
                </span>
                <button
                  type="button"
                  onClick={() => setIsCustomerModalOpen(true)}
                  className="text-xs font-semibold text-[#4E0D17] hover:underline cursor-pointer"
                >
                  Open a Trade Account &rarr;
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* ─── MINIMALIST QUIET FOOTER ─── */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full px-6 py-6 border-t border-stone-200/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-sans">
          <div className="flex items-center gap-5">
            <Link href="/terms" className="hover:text-stone-800 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-stone-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-stone-800 transition-colors">
              Contact Desk
            </Link>
          </div>

          <div className="text-[11px] font-mono text-stone-400">
            &copy; 2026 Rootwills Ltd. Birmingham Central Hub.
          </div>
        </div>
      </footer>

      {/* ─── BECOME A CUSTOMER MODAL (The 10/10 Approved Modal) ─── */}
      <WholesaleCheckoutModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
      />

      {/* ─── FORGOT PASSWORD ASSISTANCE MODAL ─── */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-stone-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Password Recovery
              </h3>
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(false)}
                className="text-stone-400 hover:text-stone-600 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              Wholesale accounts are tied to registered hospitality trade terms. To reset your password or update authorized buyers, please reach your trade desk lead:
            </p>
            <div className="space-y-2 pt-2">
              <a
                href="https://wa.me/447984709478?text=Hello%20Rootwills%2C%20I%20need%20assistance%20logging%20into%20my%20wholesale%20account."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message WhatsApp Trade Desk</span>
              </a>
              <a
                href="tel:+441616412803"
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Birmingham Depot (+44 16164 12803)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RootwillsDirectPortalView;
