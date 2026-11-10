'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Tag,
  Warehouse,
  Truck,
  FileText,
  BarChart3,
  ShieldCheck,
  Search,
  Bell,
  Plus,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Lock,
  LogOut,
  KeyRound
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
}

const navSections = [
  {
    title: 'General',
    items: [
      { name: 'Dashboard', href: '/ops', icon: LayoutDashboard },
      { name: 'Product Hub', href: '/ops/products', icon: Package, badge: '5.4k' },
      { name: 'Customer CRM', href: '/ops/crm', icon: Users, badge: 'Live' },
      { name: 'Order Desk', href: '/ops/orders', icon: ShoppingBag },
      { name: 'Pricing Tiers', href: '/ops/pricing', icon: Tag },
    ],
  },
  {
    title: 'Operations',
    items: [
      { name: 'Inventory & Stock', href: '/ops/inventory', icon: Warehouse },
      { name: 'Procurement & POs', href: '/ops/procurement', icon: FileText },
      { name: 'Fulfilment & Picking', href: '/ops/fulfilment', icon: Package },
      { name: 'Logistics & Routes', href: '/ops/logistics', icon: Truck },
    ],
  },
  {
    title: 'Accounts & Staff',
    items: [
      { name: 'Invoices & Billing', href: '/ops/invoices', icon: FileText },
      { name: 'Reports & Analytics', href: '/ops/reports', icon: BarChart3 },
      { name: 'Staff & Roles', href: '/ops/staff', icon: ShieldCheck },
    ],
  },
];

const OPS_SECRET_PASSCODE = 'rootwills2026';

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Security Gate State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('rw_ops_authenticated');
    setIsAuthenticated(auth === 'true');
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim();
    if (
      clean === OPS_SECRET_PASSCODE ||
      clean === 'rootwills' ||
      clean === 'RootwillsTrade2026!' ||
      clean === 'RootwillsDirect2026!' ||
      clean === 'Rootwills2026!'
    ) {
      localStorage.setItem('rw_ops_authenticated', 'true');
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleLockDesk = () => {
    localStorage.removeItem('rw_ops_authenticated');
    setIsAuthenticated(false);
    setPasscode('');
  };

  // If initial load checking
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center text-white">
        <div className="animate-pulse flex items-center gap-2 text-sm text-slate-400">
          <KeyRound className="w-5 h-5 text-emerald-400" />
          <span>Verifying Rootwills Operations Gateway...</span>
        </div>
      </div>
    );
  }

  // If Not Authenticated -> Show Internal Staff Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1E293B] rounded-3xl p-8 border border-slate-700/60 shadow-2xl space-y-6 text-center">
          <div className="relative w-16 h-16 rounded-full bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/80 overflow-hidden mx-auto shadow-lg p-1">
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

          <div>
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-1">
              Internal Access Only
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Rootwills Operations Hub</h1>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Enter the staff security key to access the internal product hub, supplier costs, and CRM accounts.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Staff Passcode
              </label>
              <input
                type="password"
                autoFocus
                placeholder="Enter security key..."
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPasscodeError(false);
                }}
                className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
              {passcodeError && (
                <div className="text-xs text-rose-400 font-semibold mt-1.5 flex items-center gap-1">
                  <span>Invalid security key. Please try again.</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Unlock Operations Desk</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-700/60 text-[11px] text-slate-500">
            For customer orders &amp; catalogue, visit{' '}
            <Link href="/products" className="text-emerald-400 hover:underline font-semibold">
              rootwills.co.uk/products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Staff View
  return (
    <div className="min-h-screen bg-[#F4F5F7] text-slate-800 flex flex-col lg:flex-row font-sans">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/80 overflow-hidden shrink-0 shadow-2xs p-0.5">
            <Image
              src="/images/logo.png"
              alt="Rootwills"
              fill
              sizes="32px"
              className="object-contain p-0.5 rounded-full"
              unoptimized
            />
          </div>
          <span className="font-bold text-slate-900 tracking-tight">ROOTWILLS OPS</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link href="/ops" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full bg-[#FAF7F2] ring-2 ring-[#BA8E4E]/80 shadow-[0_2px_12px_rgba(186,142,78,0.22)] p-1 shrink-0 overflow-hidden transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Rootwills Master Seal"
                fill
                sizes="44px"
                className="object-contain p-0.5 rounded-full"
                priority
                unoptimized
              />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 tracking-tight text-lg leading-tight group-hover:text-[#BA8E4E] transition-colors">
                ROOTWILLS
              </div>
              <div className="text-[10.5px] font-semibold text-emerald-600 tracking-wider uppercase">
                Internal Hub (/ops)
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 scrollbar-thin">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {section.title}
              </div>
              <div className="space-y-0.5 mt-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/ops' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? 'bg-emerald-500 text-white font-semibold shadow-sm shadow-emerald-500/30'
                          : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
          <Link
            href="/products"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Customer Storefront
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLockDesk}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-100 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Operations Desk</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Top Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Universal Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products, SKUs, restaurants, orders, suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100/80 border-none rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/ops/products?action=add"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 text-white text-xs font-semibold shadow-sm hover:bg-emerald-600 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Product
            </Link>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="relative w-8 h-8 rounded-full bg-[#FAF7F2] ring-1 ring-[#BA8E4E]/80 overflow-hidden shadow-2xs shrink-0 p-0.5">
                <Image
                  src="/images/logo.png"
                  alt="Rootwills Operations"
                  fill
                  sizes="32px"
                  className="object-contain p-0.5 rounded-full"
                  unoptimized
                />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">Operations Lead</div>
                <div className="text-[10px] text-slate-500 leading-tight">Master Auth Active</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-6 lg:p-8 max-w-[1700px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
