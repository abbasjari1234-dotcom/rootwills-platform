import React from 'react';
import type { Metadata } from 'next';
import { RootwillsDirectPortalView } from '@/components/public/RootwillsDirectPortalView';

export const metadata: Metadata = {
  title: 'Rootwills Direct (rootwillsdirect.co.uk) | B2B Trade Ordering & Contract Pricing Portal',
  description:
    'Sign in to Rootwills Direct (rootwillsdirect.co.uk) to view your bespoke hospitality contract pricing, manage standing orders, and place pre-dawn wholesale orders.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootwillsDirectPage() {
  return <RootwillsDirectPortalView />;
}

