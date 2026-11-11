import React from 'react';
import { PublicHeader } from '@/components/public/PublicHeader';
import { PublicFooter } from '@/components/public/PublicFooter';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { OrganicIrisTransition } from '@/components/public/OrganicIrisTransition';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      {/* ─── Cinematic Anubi-style Organic Iris Aperture Reveal on Page Load/Refresh ─── */}
      <OrganicIrisTransition inkColor="#131313" accentColor="#BA8E4E" />

      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#131313] selection:bg-[#4E0D17] selection:text-[#FAF7F2]">
        <PublicHeader />
        <main className="flex-1">
          {children}
        </main>
        <PublicFooter />
      </div>
    </SmoothScrollProvider>
  );
}
