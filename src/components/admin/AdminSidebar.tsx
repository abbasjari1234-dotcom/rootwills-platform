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
import { useAppStore } from '@/store/app-store';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';
import { logoutServerAction } from '@/actions/auth';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { leads, orders } = useAppStore();

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

  const handleLogout = async () => {
    try {
      await logoutServerAction();
    } catch (e) {
      console.warn('Logout notice:', e);
    }
    window.location.href = '/login?role=admin';
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] lg:static lg:w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 min-h-screen text-slate-800 shadow-2xl lg:shadow-sm transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Top Logo & Mobile Close Button */}
          <div className="px-2 pt-2 flex items-center justify-between">
            <div>
              <RootwillsLogo size="sm" variant="full" />
              <div className="mt-2 text-[10px] font-mono text-emerald-800 uppercase tracking-widest block font-bold">
                Sales &amp; Admin Hub
              </div>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                aria-label="Close sidebar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Staff info card */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Operations Manager</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Commercial Desk &amp; Admin Lead</div>
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
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                    active
                      ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200/90 shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-emerald-700' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Sign Out */}
        <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-700 text-xs font-mono font-bold flex items-center justify-between transition-all"
          >
            <span>Sign Out Staff Desk</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
}
