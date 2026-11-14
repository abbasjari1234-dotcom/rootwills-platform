import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { PublicProductsView } from '@/components/public/PublicProductsView';

export const metadata: Metadata = {
  title: 'Wholesale Foodservice Catalog | 5,480+ Lines | Rootwills',
  description:
    'Browse 5,480+ chef-graded wholesale foodservice lines across Fresh Produce, Butchery, Artisan Dairy, Seafood, Bakery, and Ambient Store for UK kitchens.',
  keywords: [
    'wholesale food catalog',
    'hospitality food suppliers UK',
    'restaurant food supplier Birmingham',
    'commercial produce supplier West Midlands',
    'catering butchery wholesale London',
    'wholesale bakery London',
    'dairy wholesale supplier UK',
    'hotel foodservice distributor',
    'bulk chef ingredients UK',
    'multi temperature wholesale delivery',
  ],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Rootwills Wholesale Product Catalog | 5,480+ Hospitality Lines',
    description:
      'Multi-temperature wholesale foodservice catalog: 5,480+ lines across Fresh Produce, Prime Butchery, Artisan Dairy, Seafood, Bakery, and Ambient Grocery for UK chefs.',
    url: 'https://www.rootwills.co.uk/products',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wholesale Foodservice Catalog | 5,480+ Lines | Rootwills',
    description:
      'Browse 5,480+ chef-graded wholesale foodservice lines across Fresh Produce, Butchery, Artisan Dairy, Seafood, and Bakery.',
  },
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <PublicProductsView />
    </Suspense>
  );
}

