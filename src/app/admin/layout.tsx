'use client';

import React, { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useDemoStore } from '@/lib/store/demo-store';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentRole, switchRole } = useDemoStore();

  useEffect(() => {
    // Automatically ensure user is in staff admin mode when viewing /admin routes
    if (currentRole !== 'admin' && currentRole !== 'sales') {
      switchRole('admin');
    }
    // Set cookie for API routes and middleware
    document.cookie = 'rootwills_role=admin; path=/; max-age=86400; SameSite=Lax';
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
