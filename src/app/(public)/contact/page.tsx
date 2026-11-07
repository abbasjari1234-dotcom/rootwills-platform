import React from 'react';
import type { Metadata } from 'next';
import { ContactFormView } from '@/components/public/ContactFormView';

export const metadata: Metadata = {
  title: 'Inquire | Wholesale Food & Hospitality Supply Partnerships',
  description:
    'Get in touch with the Rootwills wholesale partnerships desk in Birmingham and London for seasonal British produce supply, bespoke trade terms, and pre-dawn restaurant delivery.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactFormView />;
}
