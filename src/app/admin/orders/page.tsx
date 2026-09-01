import React from 'react';
import type { Metadata } from 'next';
import { AdminOrdersView } from '@/components/admin/AdminOrdersView';

export const metadata: Metadata = {
  title: 'Live Order Fulfilment & Warehouse Desk | Rootwills',
  description:
    'Manage wholesale warehouse picking lists, print morning van run sheets, and advance live fulfillment statuses. Access your operations console now.',
};

export default function AdminOrdersFulfillmentPage() {
  return <AdminOrdersView />;
}
