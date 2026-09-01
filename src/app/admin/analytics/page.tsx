import React from 'react';
import type { Metadata } from 'next';
import { AdminAnalyticsView } from '@/components/admin/AdminAnalyticsView';

export const metadata: Metadata = {
  title: 'Executive Analytics & Revenue Overview | Rootwills',
  description:
    'Access real-time wholesale gross margins, customer order frequency, product category performance, and credit risk analytics. Review your metrics today.',
};

export default function AnalyticsPage() {
  return <AdminAnalyticsView />;
}
