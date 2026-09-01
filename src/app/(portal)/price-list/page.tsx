import React from 'react';
import type { Metadata } from 'next';
import { PortalPriceListView } from '@/components/portal/PortalPriceListView';

export const metadata: Metadata = {
  title: 'Custom Contract Rates & Locked Pricing | Rootwills',
  description:
    'Review your agreed contract pricing, volume tier discounts, and locked rates across all wholesale food product categories. Download your price list.',
};

export default function PriceListPage() {
  return <PortalPriceListView />;
}
