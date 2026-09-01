import React from 'react';
import type { Metadata } from 'next';
import { PortalQuickOrderView } from '@/components/portal/PortalQuickOrderView';

export const metadata: Metadata = {
  title: 'Rapid Kitchen Quick Order Pad & Matrix | Rootwills',
  description:
    'Enter quantities directly on our rapid order matrix to complete your 11pm evening kitchen order in seconds. Submit your next-day produce order now.',
};

export default function QuickOrderPage() {
  return <PortalQuickOrderView />;
}
