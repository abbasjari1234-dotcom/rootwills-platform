import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rootwills.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/products',
    '/wholesale-produce-supplier-birmingham',
    '/wholesale-produce-supplier-manchester',
    '/services',
    '/approach',
    '/about',
    '/contact',
    '/direct',
    '/terms',
    '/privacy',
  ];

  const now = new Date().toISOString();

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '' || route === '/products' || route.startsWith('/wholesale-produce-supplier') ? 'weekly' : 'monthly',
    priority: 
      route === '' ? 1.0 : 
      route === '/products' || route.startsWith('/wholesale-produce-supplier') ? 0.95 : 
      route === '/services' || route === '/approach' || route === '/about' ? 0.9 : 
      0.7,
  }));
}
