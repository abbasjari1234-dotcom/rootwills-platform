import React from 'react';
import type { Metadata } from 'next';
import { PortalInvoicesView } from '@/components/portal/PortalInvoicesView';

export const metadata: Metadata = {
  title: 'Commercial Invoices & Monthly Statements | Rootwills',
  description:
    'View, filter, and download VAT invoices and monthly statements for your commercial food supply account. Download your consolidated statements today.',
};

export default function InvoicesPage() {
  return <PortalInvoicesView />;
}
