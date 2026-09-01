import React from 'react';
import type { Metadata } from 'next';
import { PortalInvoicePrintView } from '@/components/portal/PortalInvoicePrintView';

export const metadata: Metadata = {
  title: 'Print Commercial VAT Tax Invoice Sheet | Rootwills',
  description:
    'View and print official B2B tax invoice documents with line-item breakdowns, VAT calculations, and credit terms. Print your commercial tax invoice.',
};

export default function InvoicePrintPage({
  params,
}: {
  params: { id: string };
}) {
  return <PortalInvoicePrintView invoiceId={params.id} />;
}
