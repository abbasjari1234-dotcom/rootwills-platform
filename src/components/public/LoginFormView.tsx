'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/store/app-store';
import { loginServerAction, logoutServerAction } from '@/actions/auth';
import { createClient } from '@/lib/supabase/client';
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
  LogOut,
  CheckCircle2,
  ShoppingBag,
} from 'lucide-react';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';

type LoginScope = 'customer' | 'staff';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setPersona = useAppStore((state) => state.setPersona);

  const [loginScope, setLoginScope] = useState<LoginScope>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeUserEmail, setActiveUserEmail] = useState<string | null>(null);

  // Check for active session on load
  useEffect(() => {
    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data }) => {
        if (data?.user?.email) {
          setActiveUserEmail(data.user.email);
        }
      }).catch(() => {});
    } catch {
      // Safe to ignore
    }
  }, []);

  // Handle URL query parameters (?role=admin or ?staff=true)
  useEffect(() => {
    const roleParam = searchParams?.get('role');
    const staffParam = searchParams?.get('staff');
    if (roleParam === 'admin' || staffParam === 'true') {
      setLoginScope('staff');
    }
  }, [searchParams]);

  // BFCache (Browser Back-Forward Cache) recovery to prevent frozen loading states
  useEffect(() => {
    setIsLoading(false);
    setIsSuccess(false);

    const onPageShow = (event: PageTransitionEvent) => {
      setIsLoading(false);
      setIsSuccess(false);
      setErrorMessage(null);
    };

    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  const handleScopeChange = (newScope: LoginScope) => {
    setLoginScope(newScope);
    setIsLoading(false);
    setIsSuccess(false);
    setErrorMessage(null);
    setPassword('');
  };

  const handleSignOutActiveSession = async () => {
    try {
      setIsLoading(true);
      await logoutServerAction();
      const supabase = createClient();
      await supabase.auth.signOut();
      setActiveUserEmail(null);
      setIsLoading(false);
      setErrorMessage(null);
    } catch {
      setActiveUserEmail(null);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setErrorMessage(null);
    setIsLoading(true);

    try {
      // Call our Next.js server action
      const res = await loginServerAction({
        email,
        password,
        scope: loginScope,
      });

      if (!res.ok) {
        setErrorMessage(res.error || 'Invalid credentials. Please verify your email and password.');
        setIsLoading(false);
        setIsSuccess(false);
        return;
      }

      // Success
      setIsSuccess(true);

      // 1. Sync persona with Zustand store
      if (loginScope === 'staff') {
        setPersona('admin');
      } else {
        setPersona('restaurant_head_chef');
      }

      // 2. Navigate with full document reload to send auth cookies to server components
      const destination = res.destination || (loginScope === 'staff' ? '/admin/crm' : '/dashboard');

      // Safety timeout: if window.location takes longer than 4s, release button
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);

      window.location.href = destination;
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication service error. Please try again.');
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center py-12 sm:py-16 sm:px-6 lg:px-8 bg-slate-50/50 relative overflow-hidden">
      {/* Header Monogram Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="flex justify-center mb-2">
          <RootwillsLogo size="lg" variant="full" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          B2B Trade Portal Login
        </h1>
        <p className="text-sm text-slate-600 max-w-sm mx-auto">
          Sign in to manage kitchen orders, daily morning deliveries, and locked contract prices.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
          
          {/* Active Session Notification */}
          {activeUserEmail && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 font-mono text-xs animate-fade-in">
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Active Session</div>
                <div className="text-emerald-800 font-bold truncate">{activeUserEmail}</div>
              </div>
              <button
                type="button"
                onClick={handleSignOutActiveSession}
                className="px-2.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all shrink-0"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          {/* Pending Checkout Order Notification */}
          {searchParams?.get('checkout') === 'true' && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pending Wholesale Order</span>
                </div>
                {searchParams?.get('total') && (
                  <span className="font-mono text-xs font-bold text-slate-900">
                    £{searchParams.get('total')}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Log in below to charge this order to your 30-day trade credit account for tomorrow morning&apos;s 06:00 AM delivery drop.
              </p>
            </div>
          )}

          {/* Scope Selector Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => handleScopeChange('customer')}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                loginScope === 'customer'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Customer Account</span>
            </button>

            <button
              type="button"
              onClick={() => handleScopeChange('staff')}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                loginScope === 'staff'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Staff CRM Portal</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span className="leading-relaxed font-sans">{errorMessage}</span>
            </div>
          )}

          {/* Success Notification */}
          {isSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-fade-in font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Authenticated! Loading your portal...</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-bold">
                {loginScope === 'customer' ? 'Business Email / Chef Login' : 'Staff Corporate Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  aria-label="Registered Business Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={loginScope === 'customer' ? 'customer@rootwills.co.uk' : 'staff@rootwills.co.uk'}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 font-sans"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="login-password" className="block text-xs font-mono uppercase text-slate-700 font-bold">
                  Password
                </label>
                <Link
                  href="/contact"
                  className="text-xs font-mono text-emerald-700 hover:underline font-semibold"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  aria-label="Account Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide account password" : "Show account password in cleartext"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <span>Remember this terminal</span>
              </label>
              <span className="text-[11px] font-mono font-medium text-emerald-700">256-Bit SSL Encrypted</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
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
          <div className="pt-4 border-t border-slate-100 text-center space-y-1.5">
            <p className="text-xs text-slate-600">
              Need a wholesale food supply account for your kitchen?
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 uppercase tracking-wider font-mono"
            >
              <span>Apply for a Trade Account &amp; 30-Day Credit &rarr;</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export function LoginFormView() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-slate-500 font-mono text-xs">Loading Secure Login...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
