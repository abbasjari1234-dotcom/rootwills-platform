import React from 'react';
import type { Metadata } from 'next';
import { PortalStandingOrdersView } from '@/components/portal/PortalStandingOrdersView';

export const metadata: Metadata = {
  title: 'Standing Orders & Recurring Deliveries | Rootwills',
  description:
    'Set up automated recurring morning delivery schedules for your kitchen essentials. Never miss daily milk, eggs, or produce drops. Configure schedule now.',
};

export default function StandingOrdersPage() {
  return <PortalStandingOrdersView />;
}
