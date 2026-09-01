import React from 'react';
import type { Metadata } from 'next';
import { DriverPageClient } from '@/components/driver/DriverPageClient';

export const metadata: Metadata = {
  title: 'Driver Delivery Manifest & Proof of Drop | Rootwills',
  description:
    'Access mobile driver run sheets, log dual-zone chamber temperatures, and capture digital proof-of-delivery signatures. Open the driver console now.',
};

export default function DriverPage() {
  return <DriverPageClient />;
}
