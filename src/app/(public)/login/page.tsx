import React from 'react';
import type { Metadata } from 'next';
import { LoginFormView } from '@/components/public/LoginFormView';

export const metadata: Metadata = {
  title: 'B2B Customer Portal & Chef Account Login | Rootwills',
  description:
    'Access your Rootwills trade portal to place daily orders, review live delivery manifests, and manage invoices. Sign in to your kitchen account now.',
};

export default function LoginPage() {
  return <LoginFormView />;
}
