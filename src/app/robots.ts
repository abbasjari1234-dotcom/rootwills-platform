import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rootwills.co.uk';

const PUBLIC_ALLOW = [
  '/',
  '/products',
  '/about',
  '/services',
  '/approach',
  '/contact',
  '/direct',
  '/terms',
  '/privacy',
  '/llms.txt',
  '/_next/',
  '/_next/image*',
  '/images/',
];

const INTERNAL_DISALLOW = [
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
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: PUBLIC_ALLOW,
        disallow: INTERNAL_DISALLOW,
      },
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: ['/', '/llms.txt'],
        disallow: ['/ops/', '/admin/', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
