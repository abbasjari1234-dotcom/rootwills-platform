'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useDemoStore } from '@/lib/store/demo-store';
import { ShieldAlert, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentRole } = useDemoStore();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if current user is an authorized admin/sales staff
    const hasAdminCookie = document.cookie.includes('rootwills_role=admin') || document.cookie.includes('rootwills_role=sales');
    const isStoreAdmin = currentRole === 'admin' || currentRole === 'sales';

    if (isStoreAdmin || hasAdminCookie) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      const redirectTimer = setTimeout(() => {
        router.push(`/login?role=admin&redirect=${encodeURIComponent(pathname)}`);
      }, 1200);
      return () => clearTimeout(redirectTimer);
    }
  }, [currentRole, router, pathname]);

  // Loading state while verifying credentials
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center space-y-4 text-cream">
        <div className="w-10 h-10 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        <div className="text-xs font-mono text-cream/60">Verifying Admin Access Credentials...</div>
      </div>
    );
  }

  // Unauthorized screen (if user visits directly without logging in)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-red-500/30 text-center space-y-5 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-cream">Restricted Staff Area</h2>
            <p className="text-xs text-cream/60 mt-1">
              You must authenticate with authorized Rootwills Commercial or Logistics credentials to view the Admin CRM.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={`/login?role=admin&redirect=${encodeURIComponent(pathname)}`}
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-500 text-obsidian-950 font-bold text-xs hover:brightness-110 shadow-emerald-glow transition-all"
            >
              <span>Go to Staff Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-obsidian-950 text-cream">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto min-h-screen bg-obsidian-900/30">
        {children}
      </main>
    </div>
  );
}
