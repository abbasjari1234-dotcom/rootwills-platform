import React from 'react';
import type { Metadata } from 'next';
import { PortalDashboardView } from '@/components/portal/PortalDashboardView';

export const metadata: Metadata = {
  title: 'Kitchen Dashboard & Account Operations | Rootwills',
  description:
    'Manage live wholesale orders, monitor delivery ETAs, track monthly spend, and access quick ordering tools from your kitchen dashboard. Open your desk.',
};

export default function DashboardPage() {
  return <PortalDashboardView />;
}
