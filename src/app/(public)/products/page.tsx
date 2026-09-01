import React from 'react';
import type { Metadata } from 'next';
import { PublicProductsView } from '@/components/public/PublicProductsView';

export const metadata: Metadata = {
  title: 'Wholesale Produce & Fresh Food Catalogue | Rootwills',
  description:
    'Browse over 1,200 commercial fresh produce, dairy, bakery, and pantry lines with next-morning delivery. Open a trade account to view contract pricing.',
};

export default function PublicProductsPage() {
  return <PublicProductsView />;
}
