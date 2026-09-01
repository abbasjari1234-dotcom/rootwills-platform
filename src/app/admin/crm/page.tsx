import React from 'react';
import type { Metadata } from 'next';
import { AdminCRMView } from '@/components/admin/AdminCRMView';

export const metadata: Metadata = {
  title: 'Commercial CRM Pipeline & Account Leads | Rootwills',
  description:
    'Track inbound wholesale trade leads, manage commercial quote negotiations, and convert hospitality pipelines to trade accounts. Open your CRM desk now.',
};

export default function SalesCRMPage() {
  return <AdminCRMView />;
}
