'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDemoStore } from '@/lib/store/demo-store';
import { loginServerAction } from '@/actions/auth';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Building2,
  Briefcase,
  AlertCircle,
  Eye,
  EyeOff,
  Truck,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';

type LoginScope = 'customer' | 'staff';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setPersona = useDemoStore((state) => state.setPersona);

  const [loginScope, setLoginScope] = useState<LoginScope>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const roleParam = searchParams?.get('role');
    const staffParam = searchParams?.get('staff');
    if (roleParam === 'admin' || staffParam === 'true') {
      setLoginScope('staff');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter your business email and account password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginServerAction({
        email,
        password,
        scope: loginScope,
      });

      if (!res.ok) {
        setErrorMessage(res.error || 'Invalid credentials. Please verify your email and password.');
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);

      // 1. Update client-side store state
      const targetRole = res.role || (loginScope === 'staff' ? 'admin' : 'customer');
      if (res.organizationId) {
        setPersona(res.organizationId, targetRole === 'admin' ? 'admin' : 'customer');
      }

      // 2. Set client-side cookie to ensure synchronous middleware pickup
      if (typeof document !== 'undefined') {
        document.cookie = `rootwills_role=${targetRole}; path=/; max-age=604800; SameSite=Lax;`;
      }

      // 3. Navigate with full document reload to send auth cookies to server components
      const destination = res.destination || (loginScope === 'staff' ? '/admin/crm' : '/dashboard');
      window.location.href = destination;
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication service error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-obsidian-950 via-emerald-950/30 to-obsidian-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header Monogram Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="flex justify-center">
          <RootwillsLogo size="lg" variant="full" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-cream uppercase tracking-wide">
          B2B Trade Portal Login
        </h1>
        <p className="text-xs sm:text-sm text-cream/70 font-sans max-w-sm mx-auto">
          Log in to manage kitchen orders, daily deliveries, and locked contract prices.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-900/60 backdrop-blur-2xl space-y-6">
          
          {/* Scope Selector Tabs */}
          <div className="grid grid-cols-2 p-1 bg-obsidian-950/80 rounded-2xl border border-emerald-950">
            <button
              type="button"
              onClick={() => {
                setLoginScope('customer');
                setErrorMessage(null);
              }}
              className={`py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                loginScope === 'customer'
                  ? 'bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 shadow-md'
                  : 'text-cream/60 hover:text-cream'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Customer Account</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginScope('staff');
                setErrorMessage(null);
              }}
              className={`py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                loginScope === 'staff'
                  ? 'bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 shadow-md'
                  : 'text-cream/60 hover:text-cream'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Staff CRM Portal</span>
            </button>
          </div>

          {/* Quick Demo / Test Fill Pills */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-obsidian-950/80 border border-emerald-900/60 text-[11px] font-mono">
            <span className="text-cream/50 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-champagne" />
              <span>Quick Login:</span>
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setLoginScope('customer');
                  setEmail('orders@rootwills.co.uk');
                  setPassword('Rootwills2026!');
                  setErrorMessage(null);
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/80 transition-colors text-[10px] font-bold"
              >
                Chef Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginScope('staff');
                  setEmail('staff@rootwills.co.uk');
                  setPassword('Rootwills2026!');
                  setErrorMessage(null);
                }}
                className="px-2.5 py-1 rounded-lg bg-amber-950/90 hover:bg-amber-900 text-champagne border border-amber-800/80 transition-colors text-[10px] font-bold"
              >
                Staff Admin
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-sans">{errorMessage}</span>
            </div>
          )}

          {/* Success Notification */}
          {isSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-fade-in font-mono">
              <CheckCircle2 className="w-4 h-4 text-champagne" />
              <span>Authenticated! Loading your portal...</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-mono uppercase text-cream/80 mb-1.5 font-bold">
                {loginScope === 'customer' ? 'Business Email / Chef Login' : 'Staff Corporate Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cream/70">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  required
                  aria-label="Registered Business Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email address"
                  className="w-full bg-obsidian-950 border border-emerald-900/60 rounded-xl pl-10 pr-4 py-3 text-xs text-cream focus:outline-none focus:border-champagne placeholder:text-cream/60 font-sans"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="login-password" className="block text-xs font-mono uppercase text-cream/80 font-bold">
                  Password
                </label>
                <Link
                  href="/contact"
                  className="text-[11px] font-mono text-champagne hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cream/70">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  aria-label="Account Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  className="w-full bg-obsidian-950 border border-emerald-900/60 rounded-xl pl-10 pr-10 py-3 text-xs text-cream focus:outline-none focus:border-champagne placeholder:text-cream/60 font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide account password" : "Show account password in cleartext"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-cream/70 hover:text-cream"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-cream/70 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-emerald-900 text-champagne focus:ring-champagne bg-obsidian-950"
                />
                <span>Remember this terminal</span>
              </label>
              <span className="text-[10px] font-mono text-emerald-400">256-Bit SSL Encrypted</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs sm:text-sm shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Sign In to {loginScope === 'customer' ? 'Customer Portal' : 'Sales CRM'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Open Account Prompt */}
          <div className="pt-4 border-t border-emerald-950 text-center space-y-2">
            <p className="text-xs text-cream/70 font-sans">
              Need a wholesale food supply account for your kitchen?
            </p>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-champagne hover:underline"
            >
              <span>Apply for a Trade Account & 30-Day Credit &rarr;</span>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}

export function LoginFormView() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-obsidian-950 flex items-center justify-center text-champagne font-mono text-xs">Loading Secure Login...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
