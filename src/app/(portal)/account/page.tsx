import React from 'react';
import type { Metadata } from 'next';
import { PortalAccountView } from '@/components/portal/PortalAccountView';

export const metadata: Metadata = {
  title: 'Trade Account Settings & Kitchen Profile | Rootwills',
  description:
    'Manage your company delivery locations, chef contact details, invoice notifications, and security settings. Update your trade account profile online.',
};

export default function AccountPage() {
  return <PortalAccountView />;
}
