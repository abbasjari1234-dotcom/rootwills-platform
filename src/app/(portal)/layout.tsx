'use client';

import React from 'react';
import { PortalNav } from '@/components/portal/PortalNav';
import { AIOrderAssistant } from '@/components/portal/AIOrderAssistant';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-obsidian-950 text-cream selection:bg-champagne selection:text-obsidian-950">
      <PortalNav />
      <main className="min-h-[calc(100vh-120px)]">{children}</main>
      <AIOrderAssistant />
    </div>
  );
}
