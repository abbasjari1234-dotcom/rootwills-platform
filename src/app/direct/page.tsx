import React from 'react';
import type { Metadata } from 'next';
import { RootwillsDirectPortalView } from '@/components/public/RootwillsDirectPortalView';

export const metadata: Metadata = {
  title: 'Rootwills Direct | B2B Wholesale Trade Portal UK',
  description:
    'Sign in to Rootwills Direct to view bespoke hospitality contract pricing, manage standing orders, and book pre-dawn wholesale kitchen deliveries.',
  alternates: {
    canonical: '/direct',
  },
  openGraph: {
    title: 'Rootwills Direct | B2B Wholesale Trade Portal UK',
    description:
      'Access bespoke hospitality contract pricing, standing repeat order pads, and 04:00 AM pre-dawn wholesale deliveries across Birmingham and London.',
    url: 'https://www.rootwills.co.uk/direct',
    siteName: 'Rootwills',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/images/commercial/rootwills_hero_chef_plating.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rootwills Direct | B2B Wholesale Trade Portal UK',
    description:
      'Sign in to Rootwills Direct for contracted hospitality pricing, standing orders, and pre-dawn kitchen delivery.',
    images: ['/images/commercial/rootwills_hero_chef_plating.jpg'],
  },
};

export default function RootwillsDirectPage() {
  return <RootwillsDirectPortalView />;
}
