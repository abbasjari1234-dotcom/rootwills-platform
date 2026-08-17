'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDemoStore } from '@/lib/store/demo-store';
import { createClient } from '@/lib/supabase/client';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  UtensilsCrossed, 
  Hotel, 
  Sparkles,
  Eye,
  EyeOff,
  SlidersHorizontal,
  Building2,
  Briefcase,
  AlertCircle
} from 'lucide-react';

type DemoPersonaKey = 'chef' | 'hotel' | 'admin';
type LoginScope = 'customer' | 'staff';

const DEMO_PERSONAS: Record<DemoPersonaKey, {
  label: string;
  name: string;
  email: string;
  orgId: string;
  role: 'customer' | 'admin';
  icon: typeof UtensilsCrossed;
  badge: string;
  credit: string;
  priceNote: string;
}> = {
  chef: {
    label: '👨‍🍳 Chef Marco',
    name: 'Executive Chef Marco Rossi',
    email: 'marco.chef@sancarlo.co.uk',
    orgId: 'org-sancarlo',
    role: 'customer',
    icon: UtensilsCrossed,
    badge: 'Fine Dining • San Carlo Ristorante',
    credit: '£15,000 Credit',
    priceNote: 'Custom £7.80 Tomato Rate',
  },
  hotel: {
    label: '🏨 Grand Hotel',
    name: 'Purchasing Director — The Grand Hotel',
    email: 'purchasing@thegrandhotel.co.uk',
    orgId: 'org-grandhotel',
    role: 'customer',
    icon: Hotel,
    badge: 'Hotel Banqueting • Digbeth Hub',
    credit: '£30,000 Credit',
    priceNote: 'Locked £28.50 Eggs Contract',
  },
  admin: {
    label: '💼 Marcus (CRM)',
    name: 'Marcus Vance — Commercial Lead',
    email: 'marcus.vance@rootwills.co.uk',
    orgId: 'org-sancarlo',
    role: 'admin',
    icon: UserCheck,
    badge: 'Rootwills Commercial Desk',
    credit: 'Staff Admin Full Access',
    priceNote: 'CRM & Fulfillment Matrix',
  },
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setPersona = useDemoStore((state) => state.setPersona);
  
  const [loginScope, setLoginScope] = useState<LoginScope>('customer');
  const [showDemoSelector, setShowDemoSelector] = useState(false);
  const [selectedTab, setSelectedTab] = useState<DemoPersonaKey>('chef');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const roleParam = searchParams?.get('role');
    const staffParam = searchParams?.get('staff');
    if (roleParam === 'admin' || staffParam === 'true') {
      setLoginScope('staff');
      setEmail('marcus.vance@rootwills.co.uk');
    }
  }, [searchParams]);

  const handleSelectTab = (key: DemoPersonaKey) => {
    setSelectedTab(key);
    setEmail(DEMO_PERSONAS[key].email);
    setPassword('demo-access-2026');
    setErrorMessage(null);
    if (key === 'admin') {
      setLoginScope('staff');
    } else {
      setLoginScope('customer');
    }
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      // 1. Validate inputs
      if (!cleanEmail) {
        throw new Error('Please enter your registered email address.');
      }
      if (!cleanPassword) {
        throw new Error('Please enter your account password.');
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const isRealSupabaseConfigured = supabaseUrl && !supabaseUrl.includes('placeholder');

      let targetRole: 'admin' | 'customer' = 'customer';
      let targetOrgId = 'org-sancarlo';

      if (isRealSupabaseConfigured) {
        // Real Supabase Authentication
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (error) {
          throw new Error('Invalid email or password. Please verify your credentials.');
        }

        if (data?.user) {
          const isStaff = cleanEmail.includes('rootwills.co.uk') || cleanEmail.includes('admin');
          targetRole = isStaff ? 'admin' : 'customer';
          targetOrgId = 'org-sancarlo';
        }
      } else {
        // Strict demo mode check: reject any incorrect password
        const VALID_DEMO_PASSWORDS = ['demo-access-2026', 'rootwills2026', 'admin123', 'password123'];

        const isValidDemoPassword = VALID_DEMO_PASSWORDS.includes(cleanPassword);
        if (!isValidDemoPassword) {
          throw new Error('Invalid password. For demo accounts, use password: demo-access-2026');
        }

        const isStaff = loginScope === 'staff' || 
                        cleanEmail.includes('rootwills') || 
                        cleanEmail.includes('admin') || 
                        cleanEmail.includes('marcus') ||
                        selectedTab === 'admin';

        targetRole = isStaff ? 'admin' : 'customer';
        targetOrgId = selectedTab === 'hotel' ? 'org-grandhotel' : 'org-sancarlo';
      }

      // Update authentication state
      setPersona(targetOrgId, targetRole);

      // Set cookie for server route protection middleware
      if (typeof document !== 'undefined') {
        document.cookie = `rootwills_role=${targetRole}; path=/; max-age=86400; SameSite=Lax`;
      }

      const redirectParam = searchParams?.get('redirect');
      const destination = (redirectParam && redirectParam.startsWith('/'))
        ? redirectParam
        : targetRole === 'admin'
          ? '/admin/crm'
          : '/dashboard';

      await router.push(destination);
    } catch (err: any) {
      console.error('Authentication rejected:', err);
      setErrorMessage(err?.message || 'Invalid login credentials. Please check your email and password.');
      setIsLoading(false);
    } finally {
      const safetyTimer = setTimeout(() => {
        setIsLoading(false);
      }, 3500);
      return () => clearTimeout(safetyTimer);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(201,162,39,0.12),_transparent_70%)]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-champagne/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-md w-full space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-display font-bold text-2xl flex items-center justify-center mx-auto shadow-gold-glow">
            R
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream">
            {loginScope === 'staff' ? 'Staff CRM & Operations' : 'Sign In to Rootwills'}
          </h1>
          <p className="text-xs text-cream/60">
            {loginScope === 'staff' 
              ? 'Authorized Rootwills Sales & Logistics Management' 
              : 'Commercial Foodservice & Wholesale Ordering Portal'}
          </p>
        </div>

        {/* Main Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl space-y-6 relative">
          
          {/* Scope Selector: Customer vs Staff */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-950 rounded-xl border border-zinc-800 text-xs">
            <button
              type="button"
              onClick={() => {
                setLoginScope('customer');
                setErrorMessage(null);
                if (email.includes('rootwills.co.uk')) setEmail('');
              }}
              className={`py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                loginScope === 'customer'
                  ? 'bg-zinc-800 text-champagne font-bold shadow-sm border border-champagne/30'
                  : 'text-cream/60 hover:text-cream'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Customer Portal</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginScope('staff');
                setErrorMessage(null);
                if (!email) setEmail('marcus.vance@rootwills.co.uk');
              }}
              className={`py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                loginScope === 'staff'
                  ? 'bg-zinc-800 text-champagne font-bold shadow-sm border border-champagne/30'
                  : 'text-cream/60 hover:text-cream'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Staff CRM & Admin</span>
            </button>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-200 flex items-start gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold text-red-300">Access Denied: </span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Collapsible Demo Persona Box */}
          {showDemoSelector && (
            <div className="space-y-2 p-3 bg-zinc-950/90 rounded-2xl border border-champagne/30 animate-fade-in">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-champagne font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>1-Click Test Persona</span>
                </span>
                <button 
                  type="button" 
                  onClick={() => setShowDemoSelector(false)}
                  className="text-cream/40 hover:text-cream text-[10px]"
                >
                  Hide
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
                {(Object.keys(DEMO_PERSONAS) as DemoPersonaKey[]).map((key) => {
                  const p = DEMO_PERSONAS[key];
                  const active = selectedTab === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSelectTab(key)}
                      className={`py-2 px-1 rounded-lg text-xs font-medium transition-all text-center flex flex-col items-center gap-0.5 ${
                        active
                          ? 'bg-zinc-800 text-champagne font-bold shadow-sm border border-champagne/30'
                          : 'text-cream/60 hover:text-cream hover:bg-zinc-900/60'
                      }`}
                    >
                      <span className="truncate w-full">{p.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="p-2.5 bg-zinc-900/80 rounded-xl border border-zinc-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-cream text-xs">{DEMO_PERSONAS[selectedTab].name}</div>
                  <div className="text-[10px] text-cream/50">
                    {DEMO_PERSONAS[selectedTab].credit} &bull; {DEMO_PERSONAS[selectedTab].priceNote}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleLogin()}
                  className="px-2.5 py-1 rounded-lg bg-champagne text-obsidian-950 font-bold text-[11px] hover:brightness-110 shadow-gold-glow"
                >
                  Instant Enter &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Standard Credentials Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-mono uppercase text-cream/70 mb-1">
                {loginScope === 'staff' ? 'Staff Internal Email' : 'Commercial Account Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder={loginScope === 'staff' ? 'marcus.vance@rootwills.co.uk' : 'chef@establishment.co.uk'}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-mono uppercase text-cream/70">
                  Password
                </label>
                <a 
                  href="#forgot" 
                  onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered email address.'); }} 
                  className="text-[10px] text-champagne hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-xl pl-10 pr-10 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-cream/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-900 text-champagne accent-champagne cursor-pointer"
                />
                <span className="text-[11px]">Remember this terminal</span>
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold shadow-gold-glow hover:brightness-110 text-xs sm:text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {loginScope === 'staff' ? 'Access Staff CRM & Cockpit' : 'Sign In to Customer Portal'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* New Account Onboarding Prompt */}
          {loginScope === 'customer' && (
            <div className="pt-4 border-t border-zinc-800 text-center space-y-1 text-xs">
              <p className="text-cream/60">
                Need to set up a new trade account with credit terms?
              </p>
              <Link
                href="/onboarding"
                className="inline-block font-bold text-champagne hover:underline"
              >
                Open a Business Account in 2 Minutes &rarr;
              </Link>
            </div>
          )}

          {/* Subtle Demo Toggle */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setShowDemoSelector(!showDemoSelector);
                if (!showDemoSelector) handleSelectTab('chef');
              }}
              className="text-[10px] font-mono text-cream/30 hover:text-champagne flex items-center justify-center gap-1 mx-auto transition-colors"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>{showDemoSelector ? 'Close Demo Mode' : 'Quick Demo Switcher'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[85vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
