import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PortalNav } from '@/components/portal/PortalNav';
import { AIOrderAssistant } from '@/components/portal/AIOrderAssistant';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <PortalNav />
      <main className="min-h-[calc(100vh-120px)]">{children}</main>
      <AIOrderAssistant />
    </div>
  );
}
