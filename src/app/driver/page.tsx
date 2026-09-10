import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DriverPageClient } from '@/components/driver/DriverPageClient';

export const metadata: Metadata = {
  title: 'Driver Delivery Manifest & Proof of Drop | Rootwills',
  description:
    'Access mobile driver run sheets, log dual-zone chamber temperatures, and capture digital proof-of-delivery signatures. Open the driver console now.',
};

export default async function DriverPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?role=driver');
  }

  const role = (
    user.app_metadata?.role ||
    user.user_metadata?.role ||
    'customer'
  ).toLowerCase();

  if (role !== 'driver' && role !== 'admin') {
    redirect('/dashboard');
  }

  return <DriverPageClient />;
}
