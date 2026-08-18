'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemoStore } from '@/lib/store/demo-store';
import { useCartStore } from '@/store/cart-store';
import { 
  ShoppingBag, 
  MapPin, 
  ChevronDown, 
  Repeat, 
  Layers, 
  Clock, 
  FileText, 
  Calendar, 
  User, 
  LogOut, 
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Zap,
  Menu,
  X
} from 'lucide-react';

export function PortalNav() {
  const pathname = usePathname();
  const { 
    currentOrgId, 
    organizations, 
    currentLocationId, 
    setLocation, 
    setPersona, 
    userProfile 
  } = useDemoStore();
  const { items, openCart } = useCartStore();
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];
  const currentLocation = currentOrg?.locations.find((l) => l.id === currentLocationId) || currentOrg?.locations[0];
  const cartItemCount = items.reduce((sum, item) => sum + item.qty, 0);

  const availableCredit = Math.max(0, currentOrg.creditLimit - currentOrg.creditUsed);
  const creditUsagePercent = Math.min(100, Math.round((currentOrg.creditUsed / currentOrg.creditLimit) * 100));

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/catalog', label: 'Wholesale Catalog' },
    { href: '/quick-order', label: 'Speed Order Sheet' },
    { href: '/orders', label: 'Orders & Tracking' },
    { href: '/standing-orders', label: 'Standing Orders' },
    { href: '/invoices', label: 'Invoices' },
    { href: '/price-list', label: 'Rate Card' },
    { href: '/account', label: 'Account' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-obsidian-950/95 backdrop-blur-md border-b border-cream/10">
      {/* Account Info & Credit Top Bar */}
      <div className="bg-obsidian-900 border-b border-cream/10 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Active Organization & Location Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold text-cream">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentOrg.name}</span>
            </div>

            {/* Location selector */}
            {currentOrg.locations.length > 1 && (
              <div className="flex items-center gap-1 text-cream/70 bg-obsidian-950 px-2 py-1 rounded border border-cream/15">
                <MapPin className="w-3 h-3 text-champagne" />
                <select
                  value={currentLocationId}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-cream text-[11px] focus:outline-none cursor-pointer"
                >
                  {currentOrg.locations.map((loc) => (
                    <option key={loc.id} value={loc.id} className="bg-obsidian-900 text-cream">
                      {loc.name} ({loc.postcode})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <span className="hidden sm:inline text-cream/40">&bull;</span>
            <span className="hidden sm:inline text-cream/60">
              Cut-off: <strong className="text-champagne font-mono">11:00 PM tonight</strong> for 06:00 AM delivery
            </span>
          </div>

          {/* Trade Credit Gauge & Persona Switcher */}
          <div className="flex items-center gap-4">
            {/* Credit Gauge */}
            <div className="flex items-center gap-2">
              <div className="text-[11px] text-cream/70">
                <span>Credit: </span>
                <strong className="text-emerald-400 font-mono">£{availableCredit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</strong>
                <span className="text-cream/40"> / £{currentOrg.creditLimit.toLocaleString()}</span>
              </div>
              <div className="w-16 bg-obsidian-950 h-1.5 rounded-full overflow-hidden border border-cream/10 hidden md:block">
                <div
                  className={`h-full ${creditUsagePercent > 85 ? 'bg-rose-500' : 'bg-champagne'}`}
                  style={{ width: `${creditUsagePercent}%` }}
                />
              </div>
            </div>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
                className="px-2.5 py-1 rounded-md bg-champagne/10 border border-champagne/30 text-champagne text-[11px] font-mono flex items-center gap-1 hover:bg-champagne/20 transition-all"
              >
                <Sparkles className="w-3 h-3" />
                <span>Switch Persona</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {personaDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-obsidian-900 border border-champagne/30 rounded-xl shadow-2xl p-2 z-50 animate-fade-in">
                  <div className="px-2 py-1.5 text-[10px] uppercase font-mono text-champagne font-bold border-b border-cream/10">
                    Switch Test Account / Role
                  </div>
                  <button
                    onClick={() => {
                      setPersona('org-sancarlo', 'customer');
                      setPersonaDropdownOpen(false);
                    }}
                    className="w-full text-left p-2 rounded hover:bg-obsidian-800 text-xs text-cream flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold">San Carlo Ristorante</div>
                      <div className="text-[10px] text-cream/50">Chef Marco &bull; £7.80 Tomatoes</div>
                    </div>
                    {currentOrgId === 'org-sancarlo' && <span className="text-champagne font-bold">✓</span>}
                  </button>

                  <button
                    onClick={() => {
                      setPersona('org-grandhotel', 'customer');
                      setPersonaDropdownOpen(false);
                    }}
                    className="w-full text-left p-2 rounded hover:bg-obsidian-800 text-xs text-cream flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold">The Grand Hotel</div>
                      <div className="text-[10px] text-cream/50">Purchasing Dir &bull; £30k Credit</div>
                    </div>
                    {currentOrgId === 'org-grandhotel' && <span className="text-champagne font-bold">✓</span>}
                  </button>

                  <button
                    onClick={() => {
                      setPersona('org-opalcare', 'customer');
                      setPersonaDropdownOpen(false);
                    }}
                    className="w-full text-left p-2 rounded hover:bg-obsidian-800 text-xs text-cream flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold">Opal Care Living</div>
                      <div className="text-[10px] text-cream/50">Care Home &bull; Inactive alert</div>
                    </div>
                    {currentOrgId === 'org-opalcare' && <span className="text-champagne font-bold">✓</span>}
                  </button>

                  <div className="border-t border-cream/10 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setPersona('org-rootwills-hq', 'admin');
                        if (typeof document !== 'undefined') {
                          document.cookie = 'rootwills_role=admin; path=/; max-age=86400; SameSite=Lax';
                        }
                        setPersonaDropdownOpen(false);
                        window.location.href = '/admin/crm';
                      }}
                      className="w-full text-left p-2 rounded hover:bg-emerald-950/40 text-xs text-emerald-400 font-bold flex items-center justify-between"
                    >
                      <span>Marcus Vance (Sales & Admin CRM)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Portal Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-champagne text-obsidian-950 font-display font-bold text-lg flex items-center justify-center shadow-gold-glow">
                R
              </div>
              <div>
                <span className="font-display text-xl font-bold text-cream group-hover:text-champagne transition-colors">
                  ROOTWILLS
                </span>
                <span className="text-[9px] font-mono text-champagne block tracking-widest -mt-1 uppercase">
                  Trade Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'bg-champagne/15 text-champagne font-bold border border-champagne/30 shadow-gold-glow'
                      : 'text-cream/75 hover:text-cream hover:bg-obsidian-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Quick Cart Trigger */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-cream/50 hover:text-cream hidden sm:inline"
            >
              Public Site
            </Link>

            <button
              onClick={openCart}
              className="px-3.5 py-2 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs flex items-center gap-2 shadow-gold-glow hover:brightness-110 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Basket</span>
              {cartItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-obsidian-950 text-champagne text-[11px] font-mono font-bold flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 text-cream hover:text-champagne"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div className="lg:hidden bg-obsidian-900 border-b border-cream/15 p-4 space-y-2 animate-slide-up">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileNavOpen(false)}
              className="block p-2 rounded-lg text-sm font-medium text-cream hover:text-champagne hover:bg-obsidian-800"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-cream/10 flex justify-between text-xs text-cream/60">
            <Link href="/" onClick={() => setMobileNavOpen(false)}>Public Site</Link>
            <Link href="/login" onClick={() => setMobileNavOpen(false)}>Sign Out</Link>
          </div>
        </div>
      )}
    </header>
  );
}
