'use client';

import React, { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useDemoStore } from '@/lib/store/demo-store';

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const { currentRole, switchRole } = useDemoStore();

  useEffect(() => {
    try {
      if (currentRole !== 'admin' && currentRole !== 'sales' && typeof switchRole === 'function') {
        switchRole('admin');
      }
      if (typeof document !== 'undefined') {
        document.cookie = 'rootwills_role=admin; path=/; max-age=86400; SameSite=Lax';
      }
    } catch (e) {
      console.warn('Admin layout init note:', e);
    }
  }, [currentRole, switchRole]);

  return (
    <div className="min-h-screen flex bg-obsidian-950 text-cream">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto min-h-screen bg-obsidian-900/30">
        {children}
      </main>
    </div>
  );
}
