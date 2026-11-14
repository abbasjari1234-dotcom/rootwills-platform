import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rootwills.co.uk';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/products',
          '/about',
          '/services',
          '/approach',
          '/contact',
          '/terms',
          '/privacy',
          '/_next/',
          '/_next/image*',
          '/images/',
        ],
        disallow: [
          '/ops/',
          '/ops',
          '/admin/',
          '/driver/',
          '/dashboard/',
          '/quick-order/',
          '/orders/',
          '/invoices/',
          '/standing-orders/',
          '/account/',
          '/api/',
          '/*?search=*',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
