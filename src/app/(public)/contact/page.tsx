import React from 'react';
import type { Metadata } from 'next';
import { ContactFormView } from '@/components/public/ContactFormView';

export const metadata: Metadata = {
  title: 'Contact Rootwills | Wholesale Food Supply & Trade Desk',
  description:
    'Contact our Birmingham wholesale partnerships desk for seasonal British produce supply, bespoke hospitality pricing, and pre-dawn restaurant delivery.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Rootwills | Wholesale Food Supply & Trade Desk',
    description:
      'Get in touch with the Rootwills commercial trade desk in Birmingham and London for chef supply terms and rapid account onboarding.',
    url: 'https://www.rootwills.co.uk/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Rootwills | Wholesale Food Supply & Trade Desk',
    description:
      'Contact our Birmingham wholesale partnerships desk for seasonal British produce supply and pre-dawn deliveries.',
  },
};

export default function ContactPage() {
  return <ContactFormView />;
}
