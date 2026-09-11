'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useAppStore } from '@/store/app-store';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';
import { Menu, X } from 'lucide-react';

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const { currentRole, switchRole } = useAppStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (currentRole !== 'admin' && currentRole !== 'sales' && typeof switchRole === 'function') {
        switchRole('admin');
      }
    } catch (e) {
      console.warn('Admin layout init note:', e);
    }
  }, [currentRole, switchRole]);

  // Automatically close mobile sidebar on navigation
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC] text-slate-900 font-sans">
      {/* ─── Mobile Sticky Top Admin Bar (< lg) ─── */}
      <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <RootwillsLogo size="sm" variant="icon" />
          <div>
            <span className="font-bold text-xs text-slate-900 block font-display leading-tight">
              Rootwills Commercial Hub
            </span>
            <span className="text-[10px] font-mono text-emerald-800 uppercase font-semibold">
              Sales &amp; Admin Desk
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label={mobileSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* ─── Responsive Sidebar (Fixed on Desktop, Drawer on Mobile) ─── */}
      <AdminSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* ─── Main Content Canvas (Takes 100% on Mobile) ─── */}
      <main className="flex-1 w-full overflow-y-auto min-h-screen bg-[#F8FAFC]">
        {children}
      </main>
    </div>
  );
}
