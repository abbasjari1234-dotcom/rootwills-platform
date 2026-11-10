import React from 'react';
import type { Metadata } from 'next';
import { PublicProductsView } from '@/components/public/PublicProductsView';

export const metadata: Metadata = {
  title: 'Wholesale Foodservice Catalog | 5,480+ Lines Across 12 Commercial Departments',
  description:
    'Explore the Rootwills multi-temperature B2B wholesale foodservice catalog: 5,480+ chef-graded lines across Fresh Produce, Prime British Butchery, Poultry, Artisan Dairy, Day-Boat Seafood, Bakery, Ambient Dry Store, Cold-Pressed Oils, Spices, Drinks, Desserts, and Kitchen Consumables.',
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
      'Multi-temperature wholesale foodservice catalog: 5,480+ lines across Fresh Produce, Prime Butchery, Artisan Dairy, Seafood, Bakery, Frozen, and Ambient Grocery for UK chefs and caterers.',
    url: 'https://www.rootwills.co.uk/products',
  },
};

export default function ProductsPage() {
  return <PublicProductsView />;
}

