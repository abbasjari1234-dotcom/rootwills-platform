'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDemoStore } from '@/lib/store/demo-store';
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
  Check
} from 'lucide-react';

type DemoPersonaKey = 'chef' | 'hotel' | 'admin';

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
    badge: 'Fine Dining &bull; San Carlo Ristorante',
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
    badge: 'Hotel Banqueting &bull; Digbeth Hub',
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

export default function LoginPage() {
  const router = useRouter();
  const setPersona = useDemoStore((state) => state.setPersona);
  
  const [selectedTab, setSelectedTab] = useState<DemoPersonaKey>('chef');
  const [email, setEmail] = useState(DEMO_PERSONAS.chef.email);
  const [password, setPassword] = useState('demo-access-2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectTab = (key: DemoPersonaKey) => {
    setSelectedTab(key);
    setEmail(DEMO_PERSONAS[key].email);
    setPassword('demo-access-2026');
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    const persona = DEMO_PERSONAS[selectedTab];
    setPersona(persona.orgId, persona.role);

    setTimeout(() => {
      if (persona.role === 'admin') {
        router.push('/admin/crm');
      } else {
        router.push('/dashboard');
      }
    }, 400);
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
            Sign In to Rootwills
          </h1>
          <p className="text-xs text-cream/60">
            Access your B2B wholesale ordering portal or staff CRM
          </p>
        </div>

        {/* Consolidated Unified Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl space-y-6 relative">
          
          {/* Segmented Persona Tab Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-champagne font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Select Demo Account</span>
              </span>
              <span className="text-cream/40">1-Click Auto-Fill</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-950/80 rounded-xl border border-zinc-800">
              {(Object.keys(DEMO_PERSONAS) as DemoPersonaKey[]).map((key) => {
                const p = DEMO_PERSONAS[key];
                const active = selectedTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectTab(key)}
                    className={`py-2 px-1.5 rounded-lg text-xs font-medium transition-all text-center flex flex-col items-center gap-0.5 ${
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

            {/* Persona Details Badge */}
            <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/80 flex items-center justify-between text-xs animate-fade-in">
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

          {/* Subtle OR Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-zinc-800 w-full" />
            <span className="bg-zinc-900 px-3 text-[10px] font-mono uppercase text-cream/40 absolute">
              OR WITH EMAIL & PASSWORD
            </span>
          </div>

          {/* Standard Credentials Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-mono uppercase text-cream/70 mb-1">
                Registered Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="chef@establishment.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-mono uppercase text-cream/70">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to registered email.'); }} className="text-[10px] text-champagne hover:underline">
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
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Remember Me checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-cream/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-900 text-champagne accent-champagne cursor-pointer"
                />
                <span className="text-[11px]">Remember this kitchen terminal</span>
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
                  <span>Sign In to Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* New Account Onboarding Prompt */}
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
        </div>
      </div>
    </div>
  );
}
