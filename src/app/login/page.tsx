import React from 'react';
import type { Metadata } from 'next';
import { RootwillsDirectPortalView } from '@/components/public/RootwillsDirectPortalView';

export const metadata: Metadata = {
  title: 'Sign In | Rootwills Wholesale Trade Portal',
  description:
    'Sign in to your Rootwills trade account to access contract pricing, review catalog lines, and place wholesale orders.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <RootwillsDirectPortalView />;
}

