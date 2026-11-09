import React from 'react';
import type { Metadata } from 'next';
import { PublicProductsView } from '@/components/public/PublicProductsView';

export const metadata: Metadata = {
  title: 'Wholesale Product Catalog | Fresh Produce, Butchery, Dairy, Frozen & Grocery',
  description:
    'Explore the Rootwills multi-temperature B2B wholesale foodservice catalog: 60+ chef-graded lines across Fresh Produce, British Beef & Lamb Butchery, Poultry, Chilled Dairy, Frozen & Seafood, Ambient Dry Store, and Kitchen Hygiene.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Rootwills Wholesale Product Catalog | Complete Hospitality Kitchen Supply',
    description:
      'Multi-temperature wholesale foodservice catalog across Fresh Produce, Prime Butchery & Poultry, Artisan Dairy, Frozen & Seafood, Ambient Grocery, and Catering Consumables.',
    url: 'https://www.rootwills.co.uk/products',
  },
};

export default function ProductsPage() {
  return <PublicProductsView />;
}
