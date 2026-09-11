'use client';

import React, { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useAppStore } from '@/store/app-store';

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const { currentRole, switchRole } = useAppStore();

  useEffect(() => {
    try {
      if (currentRole !== 'admin' && currentRole !== 'sales' && typeof switchRole === 'function') {
        switchRole('admin');
      }
    } catch (e) {
      console.warn('Admin layout init note:', e);
    }
  }, [currentRole, switchRole]);

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-slate-900 font-sans">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto min-h-screen bg-[#F8FAFC]">
        {children}
      </main>
    </div>
  );
}
