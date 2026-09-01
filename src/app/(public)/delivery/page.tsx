import React from 'react';
import type { Metadata } from 'next';
import { DeliveryPageClient } from '@/components/public/DeliveryPageClient';

export const metadata: Metadata = {
  title: 'Cold-Chain Logistics & 6am Delivery SLA | Rootwills',
  description:
    'Explore our temperature-controlled 6-day morning delivery network across the Midlands and UK. Check your kitchen delivery window and postcode now.',
};

export default function DeliveryPage() {
  return <DeliveryPageClient />;
}
