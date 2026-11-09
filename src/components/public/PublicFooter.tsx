'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { GetInTouchBanner } from './GetInTouchBanner';

export function PublicFooter() {
  const pathname = usePathname();

  // Do not render footer on the Enquiry / Contact or Products catalog page
  if (pathname?.startsWith('/contact') || pathname?.startsWith('/products')) {
    return null;
  }

  return <GetInTouchBanner />;
}
