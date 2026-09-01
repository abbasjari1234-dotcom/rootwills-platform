import React from 'react';
import type { Metadata } from 'next';
import { PortalCatalogView } from '@/components/portal/PortalCatalogView';

export const metadata: Metadata = {
  title: 'Chef Wholesale Ordering & Produce Catalog | Rootwills',
  description:
    'Browse and order from your personalized trade catalog with locked contract rates and next-morning delivery. Add fresh ingredients to your basket today.',
};

export default function CatalogPage() {
  return <PortalCatalogView />;
}
