import React from 'react';
import type { Metadata } from 'next';
import { AdminStandingOrdersView } from '@/components/admin/AdminStandingOrdersView';

export const metadata: Metadata = {
  title: 'Master Standing Orders & Batch Schedule | Rootwills',
  description:
    'Execute automated daily and weekly standing order runs, inspect recurring hotel cadences, and trigger batch orders. Manage master standing orders now.',
};

export default function AdminStandingOrdersEnginePage() {
  return <AdminStandingOrdersView />;
}
