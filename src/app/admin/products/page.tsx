import React from 'react';
import type { Metadata } from 'next';
import { AdminProductsView } from '@/components/admin/AdminProductsView';

export const metadata: Metadata = {
  title: 'Master Product Catalog & Base Price Lists | Rootwills',
  description:
    'Manage wholesale foodservice SKUs, baseline guide pricing, case pack sizes, and origin traceability certifications. Open your product catalog desk.',
};

export default function AdminProductsEditorPage() {
  return <AdminProductsView />;
}
