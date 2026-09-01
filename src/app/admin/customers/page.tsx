import React from 'react';
import type { Metadata } from 'next';
import { AdminCustomersView } from '@/components/admin/AdminCustomersView';

export const metadata: Metadata = {
  title: 'Customer Accounts & Trade Credit Limits | Rootwills',
  description:
    'Configure customer trade credit limits, custom pricing overrides, and payment settlement terms across all accounts. Review your customer ledger today.',
};

export default function CustomersPricingPage() {
  return <AdminCustomersView />;
}
