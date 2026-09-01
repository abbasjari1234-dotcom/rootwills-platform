import React from 'react';
import type { Metadata } from 'next';
import { PortalOrdersView } from '@/components/portal/PortalOrdersView';

export const metadata: Metadata = {
  title: 'Kitchen Order History & Delivery Status | Rootwills',
  description:
    'Track pending foodservice deliveries, inspect digital proof-of-delivery signatures, and review past orders. View your live order history online today.',
};

export default function OrdersPage() {
  return <PortalOrdersView />;
}
