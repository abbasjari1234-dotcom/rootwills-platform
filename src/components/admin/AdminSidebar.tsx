'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Users, 
  TrendingUp, 
  Layers, 
  Package, 
  ClipboardList, 
  ShieldAlert, 
  ArrowLeft,
  Building2,
  DollarSign,
  BarChart3,
  UserCheck,
  Repeat,
  Bell,
  Truck,
  LogOut
} from 'lucide-react';
import { useDemoStore } from '@/lib/store/demo-store';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { leads, orders } = useDemoStore();

  const newLeadsCount = (leads || []).filter((l) => l && l.status === 'new_lead').length;
  const activeOrdersCount = (orders || []).filter((o) => o && (o.status === 'received' || o.status === 'picking')).length;

  const links = [
    {
      href: '/admin/orders',
      label: 'Live Incoming Orders',
      icon: ClipboardList,
      badge: 'Live Sync',
    },
    {
      href: '/admin/crm',
      label: 'Sales CRM & Leads',
      icon: Users,
      badge: newLeadsCount > 0 ? `${newLeadsCount} New` : undefined,
    },
    {
      href: '/admin/customers',
      label: 'Customers & Accounts',
      icon: DollarSign,
    },
    {
      href: '/driver',
      label: 'Driver Mobile POD App',
      icon: Truck,
    },
    {
      href: '/admin/standing-orders',
      label: 'Standing Orders Engine',
      icon: Repeat,
    },
    {
      href: '/admin/notifications',
      label: 'Kitchen WhatsApp & Comms',
      icon: Bell,
    },
    {
      href: '/admin/products',
      label: 'Catalog & Product Editor',
      icon: Package,
    },
    {
      href: '/admin/analytics',
      label: 'Revenue & Sales Metrics',
      icon: BarChart3,
    },
  ];

  const handleLogout = () => {
    document.cookie = 'rootwills_role=; Max-Age=0; path=/;';
    document.cookie = 'sb-access-token=; Max-Age=0; path=/;';
    router.push('/login?role=admin');
  };

  return (
    <aside className="w-64 bg-obsidian-950 border-r border-emerald-900/40 flex flex-col justify-between p-4 min-h-screen text-cream shadow-2xl">
      <div className="space-y-6">
        {/* Logo */}
        <div className="px-2 pt-2">
          <RootwillsLogo size="sm" variant="full" />
          <div className="mt-2 text-[10px] font-mono text-champagne uppercase tracking-widest block font-bold">
            Sales & Admin Hub
          </div>
        </div>

        {/* Staff info card */}
        <div className="p-3.5 bg-obsidian-900/90 rounded-2xl border border-emerald-900/60 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-cream">
            <UserCheck className="w-3.5 h-3.5 text-champagne" />
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
                    ? 'bg-emerald-950/80 text-champagne font-bold border border-champagne/30 shadow-sm'
                    : 'text-cream/70 hover:text-cream hover:bg-emerald-950/40'
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

      {/* Footer Sign Out */}
      <div className="pt-4 border-t border-emerald-950 space-y-2 text-xs">
        <button
          onClick={handleLogout}
          className="w-full py-2.5 px-3 rounded-xl bg-obsidian-900 hover:bg-rose-950/40 border border-emerald-900/60 hover:border-rose-500/40 text-cream/70 hover:text-rose-300 text-xs font-mono font-bold flex items-center justify-between transition-all"
        >
          <span>Sign Out Staff Desk</span>
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
