'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/app-store';
import { useCartStore } from '@/store/cart-store';
import { 
  ShoppingBag, 
  MapPin, 
  ChevronDown, 
  User, 
  LogOut, 
  Menu, 
  X, 
  CreditCard,
  Building2,
  Phone,
  Clock
} from 'lucide-react';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';
import { logoutServerAction } from '@/actions/auth';

export function PortalNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    currentOrgId, 
    organizations, 
    currentLocationId, 
    setLocation, 
    userProfile 
  } = useAppStore();
  const { items, openCart } = useCartStore();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0] || {
    id: 'org-default',
    name: 'Trade Client',
    creditLimit: 25000,
    creditUsed: 4200,
    locations: [{ id: 'loc-1', name: 'Main Kitchen', postcode: 'B1 1AA' }]
  };
  const currentLocation = currentOrg?.locations?.find((l) => l.id === currentLocationId) || currentOrg?.locations?.[0];
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

  const handleLogout = async () => {
    try {
      await logoutServerAction();
    } catch (e) {
      console.warn('Logout notice:', e);
    }
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* ─── Top Context Bar: Operational Status, Postcode & Credit Headroom ─── */}
      <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Active Organization & Location Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentOrg.name}</span>
            </div>

            {/* Location selector */}
            {currentOrg?.locations && currentOrg.locations.length > 1 && (
              <div className="flex items-center gap-1 text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <select
                  aria-label="Switch delivery location"
                  value={currentLocationId}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-white text-[11px] focus:outline-none cursor-pointer"
                >
                  {currentOrg.locations.map((loc) => (
                    <option key={loc.id} value={loc.id} className="bg-slate-900 text-white">
                      {loc.name} ({loc.postcode})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <span className="hidden sm:inline text-slate-600">&bull;</span>
            <span className="hidden sm:inline text-slate-300">
              Cut-off: <strong className="text-emerald-400 font-mono">11:00 PM tonight</strong> for 06:00 AM delivery
            </span>
          </div>

          {/* Trade Credit Gauge & User Sign Out */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-[11px] text-slate-300">
                <span>Credit: </span>
                <strong className="text-emerald-400 font-mono">
                  £{availableCredit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                </strong>
                <span className="text-slate-400"> / £{currentOrg.creditLimit.toLocaleString()}</span>
              </div>
              <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700 hidden md:block">
                <div
                  className={`h-full ${creditUsagePercent > 85 ? 'bg-rose-500' : 'bg-emerald-400'}`}
                  style={{ width: `${creditUsagePercent}%` }}
                />
              </div>
            </div>

            {/* Logout Action */}
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Sign out of account"
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] font-mono flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Main Portal Nav Bar ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <RootwillsLogo size="md" variant="compact" href="/dashboard" />

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Trigger: Live Basket Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open shopping cart (${cartItemCount} items)`}
              className="relative px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 active:scale-95 group"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Basket</span>
              {cartItemCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-white text-emerald-800 text-[10px] font-mono font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Nav Toggle */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl lg:hidden transition-colors"
              aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileNavOpen}
            >
              {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile Menu Drawer ─── */}
      {mobileNavOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-slide-up shadow-lg">
          <div className="grid gap-1 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className={`px-3 py-2 rounded-xl font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-emerald-800 font-bold bg-emerald-50 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
