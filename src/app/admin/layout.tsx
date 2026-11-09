'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  X
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
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { name: 'Product Hub', href: '/admin/products', icon: Package, badge: '5.4k' },
      { name: 'Customer CRM', href: '/admin/crm', icon: Users, badge: 'Live' },
      { name: 'Order Desk', href: '/admin/orders', icon: ShoppingBag },
      { name: 'Pricing Tiers', href: '/admin/pricing', icon: Tag },
    ],
  },
  {
    title: 'Operations',
    items: [
      { name: 'Inventory & Stock', href: '/admin/inventory', icon: Warehouse },
      { name: 'Procurement & POs', href: '/admin/procurement', icon: FileText },
      { name: 'Fulfilment & Picking', href: '/admin/fulfilment', icon: Package },
      { name: 'Logistics & Routes', href: '/admin/logistics', icon: Truck },
    ],
  },
  {
    title: 'Accounts & Staff',
    items: [
      { name: 'Invoices & Billing', href: '/admin/invoices', icon: FileText },
      { name: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3 },
      { name: 'Staff & Roles', href: '/admin/staff', icon: ShieldCheck },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-slate-800 flex flex-col lg:flex-row font-sans">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            RW
          </div>
          <span className="font-bold text-slate-900 tracking-tight">ROOTWILLS OS</span>
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
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-extrabold text-base shadow-md ring-2 ring-emerald-500/20">
              RW
            </div>
            <div>
              <div className="font-extrabold text-slate-900 tracking-tight text-lg leading-tight">ROOTWILLS</div>
              <div className="text-[11px] font-semibold text-emerald-600 tracking-wider uppercase">Wholesale OS</div>
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
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
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
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <Link
            href="/products"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Customer Catalog
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
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
              href="/admin/products?action=add"
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                RW
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">Admin Desk</div>
                <div className="text-[10px] text-slate-500 leading-tight">Operations Lead</div>
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

