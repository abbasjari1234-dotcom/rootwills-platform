import React from 'react';
import type { Metadata } from 'next';
import { RootwillsDirectPortalView } from '@/components/public/RootwillsDirectPortalView';

export const metadata: Metadata = {
  title: 'Rootwills Trade Portal | B2B Wholesale Ordering & Contract Pricing',
  description:
    'Sign in to the Rootwills Trade Portal to view your bespoke hospitality contract pricing, manage standing orders, and place pre-dawn wholesale orders.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootwillsDirectPage() {
  return <RootwillsDirectPortalView />;
}

