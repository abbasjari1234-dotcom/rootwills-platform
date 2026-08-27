import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rootwills.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/products',
    '/catalog',
    '/price-list',
    '/why-choose-us',
    '/contact',
    '/onboarding',
    '/login',
    '/sectors/fine-dining',
    '/sectors/boutique-hotels',
    '/sectors/luxury-catering',
    '/sectors/private-clubs',
    '/sectors/artisan-cafes',
    '/locations/birmingham',
    '/locations/solihull',
    '/locations/coventry',
    '/locations/wolverhampton',
    '/locations/stratford-upon-avon',
    '/locations/leamington-spa',
  ];

  const now = new Date().toISOString();

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '' || route === '/products' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/sectors') || route === '/products' ? 0.9 : 0.7,
  }));
}
