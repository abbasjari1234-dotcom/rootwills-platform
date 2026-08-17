'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  TrendingUp, 
  Layers, 
  Package, 
  ClipboardList, 
  ShieldAlert, 
  Sparkles, 
  ArrowLeft,
  Building2,
  DollarSign,
  BarChart3,
  UserCheck,
  Repeat,
  Bell,
  Truck
} from 'lucide-react';
import { useDemoStore } from '@/lib/store/demo-store';

export function AdminSidebar() {
  const pathname = usePathname();
  const { leads, orders, organizations } = useDemoStore();

  const newLeadsCount = leads.filter((l) => l.status === 'new_lead').length;
  const activeOrdersCount = orders.filter((o) => o.status === 'received' || o.status === 'picking').length;

  const links = [
    {
      href: '/admin/crm',
      label: 'Sales CRM & Leads',
      icon: Users,
      badge: newLeadsCount > 0 ? `${newLeadsCount} New` : undefined,
    },
    {
      href: '/admin/customers',
      label: 'Customers & Price Matrix',
      icon: DollarSign,
    },
    {
      href: '/admin/orders',
      label: 'Fulfillment & Picking',
      icon: ClipboardList,
      badge: activeOrdersCount > 0 ? `${activeOrdersCount} Live` : undefined,
    },
    {
      href: '/admin/standing-orders',
      label: 'Standing Orders Engine',
      icon: Repeat,
    },
    {
      href: '/admin/notifications',
      label: 'Kitchen Comms & WhatsApp',
      icon: Bell,
    },
    {
      href: '/admin/products',
      label: 'Product Catalog Editor',
      icon: Package,
    },
    {
      href: '/admin/analytics',
      label: 'Sales & Inactive Alerts',
      icon: BarChart3,
    },
    {
      href: '/driver',
      label: 'Driver Mobile POD App',
      icon: Truck,
    },
  ];

  return (
    <aside className="w-64 bg-obsidian-950 border-r border-cream/10 flex flex-col justify-between p-4 min-h-screen text-cream">
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-500 text-obsidian-950 font-display font-bold text-lg flex items-center justify-center shadow-emerald-glow">
            R
          </div>
          <div>
            <span className="font-display text-lg font-bold text-cream tracking-tight block">ROOTWILLS</span>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block -mt-1">
              Sales & Admin Portal
            </span>
          </div>
        </div>

        {/* Staff info card */}
        <div className="p-3 bg-obsidian-900 rounded-xl border border-cream/10 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-cream">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Marcus Vance</span>
          </div>
          <div className="text-[10px] text-cream/50 font-mono">Commercial Desk & Admin Lead</div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 text-xs">
          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                  active
                    ? 'bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30'
                    : 'text-cream/70 hover:text-cream hover:bg-obsidian-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Switchers */}
      <div className="pt-4 border-t border-cream/10 space-y-2 text-xs">
        <Link
          href="/dashboard"
          className="w-full py-2 px-3 rounded-lg bg-obsidian-900 hover:bg-obsidian-850 border border-champagne/30 text-champagne text-xs font-semibold flex items-center justify-between"
        >
          <span>Switch to Customer Portal</span>
          <Sparkles className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-cream/50 hover:text-cream px-3 py-1 text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Public Website</span>
        </Link>
      </div>
    </aside>
  );
}
