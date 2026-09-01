import React from 'react';
import type { Metadata } from 'next';
import { PortalOrderDetailView } from '@/components/portal/PortalOrderDetailView';

export const metadata: Metadata = {
  title: 'Commercial Purchase Order Line Details | Rootwills',
  description:
    'View line-item breakdowns, temperature compliance logs, driver proof-of-delivery signatures, and order timelines. Review your order details today.',
};

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <PortalOrderDetailView orderId={params.id} />;
}
