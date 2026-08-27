'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDemoStore } from '@/lib/store/demo-store';
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
  Phone
} from 'lucide-react';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';

export function PortalNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    currentOrgId, 
    organizations, 
    currentLocationId, 
    setLocation, 
    userProfile 
  } = useDemoStore();
  const { items, openCart } = useCartStore();
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

  const handleLogout = () => {
    // Clear cookies & redirect to login
    document.cookie = 'rootwills_role=; Max-Age=0; path=/;';
    document.cookie = 'sb-access-token=; Max-Age=0; path=/;';
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-obsidian-950/95 backdrop-blur-xl border-b border-emerald-900/40 shadow-2xl">
      {/* Account Info & Credit Top Bar */}
      <div className="bg-obsidian-900/90 border-b border-emerald-950 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Active Organization & Location */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold text-cream">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentOrg.name}</span>
            </div>

            {/* Location selector */}
            {currentOrg.locations.length > 1 && (
              <div className="flex items-center gap-1 text-cream/70 bg-obsidian-950 px-2.5 py-1 rounded-lg border border-emerald-900/50">
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

            <span className="hidden sm:inline text-cream/30">&bull;</span>
            <span className="hidden sm:inline text-cream/70">
              Cut-off: <strong className="text-champagne font-mono">11:00 PM tonight</strong> for 06:00 AM delivery
            </span>
          </div>

          {/* Trade Credit Gauge & User Logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-[11px] text-cream/70">
                <span>Credit: </span>
                <strong className="text-emerald-400 font-mono">£{availableCredit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</strong>
                <span className="text-cream/40"> / £{currentOrg.creditLimit.toLocaleString()}</span>
              </div>
              <div className="w-16 bg-obsidian-950 h-1.5 rounded-full overflow-hidden border border-emerald-900/60 hidden md:block">
                <div
                  className={`h-full ${creditUsagePercent > 85 ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-400 to-champagne'}`}
                  style={{ width: `${creditUsagePercent}%` }}
                />
              </div>
            </div>

            {/* Logout Action */}
            <button
              onClick={handleLogout}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-cream/60 hover:text-champagne hover:border-champagne/40 text-[11px] font-mono flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Portal Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-4">
            <RootwillsLogo size="sm" variant="full" />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono uppercase tracking-wider font-bold">
              Trade Portal
            </span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-xs font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'text-champagne font-bold bg-emerald-950/70 border border-champagne/30 shadow-sm'
                      : 'text-cream/75 hover:text-cream hover:bg-emerald-950/30'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Trigger: 3D Cart Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative px-4 py-2.5 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center gap-2 active:scale-95 group"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-obsidian-950 text-champagne text-[10px] font-mono font-bold animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-2 text-cream hover:text-champagne lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div className="lg:hidden bg-obsidian-900 border-b border-emerald-950 px-4 pt-3 pb-6 space-y-2 animate-slide-up">
          <div className="grid gap-1 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className={`px-3 py-2 rounded-lg ${
                  pathname === link.href ? 'text-champagne font-bold bg-emerald-950/60' : 'text-cream/80'
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
