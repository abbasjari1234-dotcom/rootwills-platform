import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-obsidian-950 text-cream">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto min-h-screen bg-obsidian-900/30">
        {children}
      </main>
    </div>
  );
}
