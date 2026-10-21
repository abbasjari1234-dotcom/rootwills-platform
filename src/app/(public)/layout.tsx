import React from 'react';
import { PublicHeader } from '@/components/public/PublicHeader';
import { PublicFooter } from '@/components/public/PublicFooter';
import { FloatingBottomNav } from '@/components/public/FloatingBottomNav';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-900 selection:bg-[#4E0D17] selection:text-[#FAF7F2]">
        <PublicHeader />
        <main className="flex-1">
          {children}
        </main>
        <PublicFooter />
        <FloatingBottomNav />
      </div>
    </SmoothScrollProvider>
  );
}

