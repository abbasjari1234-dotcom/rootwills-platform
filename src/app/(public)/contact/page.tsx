import React from 'react';
import type { Metadata } from 'next';
import { ContactFormView } from '@/components/public/ContactFormView';

export const metadata: Metadata = {
  title: 'Contact Our Wholesale Sales & Support Team | Rootwills',
  description:
    'Get in touch with our commercial sales desk in Birmingham for custom wholesale quotes, samples, and account support. Call or message our team today.',
};

export default function ContactPage() {
  return <ContactFormView />;
}
