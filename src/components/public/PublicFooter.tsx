'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { GetInTouchBanner } from './GetInTouchBanner';

export function PublicFooter() {
  const pathname = usePathname();

  // Do not render footer on the Enquiry / Contact page
  if (pathname?.startsWith('/contact')) {
    return null;
  }

  return <GetInTouchBanner />;
}
