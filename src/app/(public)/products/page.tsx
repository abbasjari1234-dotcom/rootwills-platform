import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { PublicProductsView } from '@/components/public/PublicProductsView';

export const metadata: Metadata = {
  title: 'Wholesale Foodservice & Fresh Produce Catalog | Rootwills',
  description:
    'Browse our chef-graded wholesale catalog across Fresh Produce, Prime Butchery, Artisan Dairy, Day-Boat Seafood, Bakery, and Ambient Grocery for UK kitchens.',
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
    title: 'Rootwills Wholesale Product Catalog | Hospitality Foodservice',
    description:
      'Multi-temperature wholesale foodservice catalog: fresh British farm produce, prime butchery, artisan dairy, seafood, and ambient dry larder for UK chefs.',
    url: 'https://www.rootwills.co.uk/products',
    siteName: 'Rootwills',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/images/commercial/rootwills_hero_chef_plating.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wholesale Foodservice & Fresh Produce Catalog | Rootwills',
    description:
      'Browse chef-graded wholesale foodservice catalog across Fresh Produce, Butchery, Artisan Dairy, Seafood, and Bakery.',
    images: ['/images/commercial/rootwills_hero_chef_plating.jpg'],
  },
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <PublicProductsView />
    </Suspense>
  );
}

