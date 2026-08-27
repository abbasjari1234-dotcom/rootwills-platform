import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Cormorant_Garamond, IBM_Plex_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { FullPage3DCanvas } from '@/components/3d/FullPage3DCanvas';

const CartDrawer = dynamic(
  () => import('@/components/portal/CartDrawer').then((mod) => mod.CartDrawer),
  { ssr: false }
);

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
  preload: false,
});

export const viewport: Viewport = {
  themeColor: '#070706',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rootwills.co.uk'),
  title: {
    default: 'Rootwills Ltd — B2B Wholesale Food & Fresh Produce Supply UK',
    template: '%s | Rootwills Wholesale',
  },
  description:
    'Premium wholesale food, dry-aged meats, dairy, and fresh produce supplier for fine dining restaurants, boutique hotels, and luxury caterers across the West Midlands & UK.',
  keywords: [
    'Rootwills',
    'Rootwills wholesale food',
    'wholesale food suppliers Birmingham',
    'fresh produce catering UK',
    'restaurant food supplier West Midlands',
    'chef trade food ordering',
    'B2B food delivery 6am',
  ],
  authors: [{ name: 'Rootwills Ltd' }],
  creator: 'Rootwills Commercial Foodservice',
  alternates: {
    canonical: '/',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.rootwills.co.uk',
    title: 'Rootwills Ltd — Premium B2B Wholesale Food Supply',
    description:
      'Direct farm-to-kitchen foodservice distribution with guaranteed 6:00 AM delivery and dual-temperature fleet tracking.',
    siteName: 'Rootwills Wholesale Foodservice',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rootwills Ltd — B2B Wholesale Food Supply',
    description: 'Precision wholesale food distribution for high-volume commercial kitchens.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.rootwills.co.uk/#organization',
      name: 'Rootwills Ltd',
      alternateName: ['Rootwills Wholesale Foodservice', 'Rootwills Foodservice Ltd'],
      url: 'https://www.rootwills.co.uk',
      logo: 'https://www.rootwills.co.uk/icon.svg',
      description: 'Premium wholesale food, dry-aged meats, dairy, and fresh produce supplier for fine dining restaurants, boutique hotels, and luxury caterers in Birmingham and the UK.',
      telephone: '+44 121 790 4500',
      email: 'sales@rootwills.co.uk',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Units 4–6, Digbeth Wholesale Food Hub',
        addressLocality: 'Birmingham',
        addressRegion: 'West Midlands',
        postalCode: 'B5 6DY',
        addressCountry: 'GB',
      },
      areaServed: [
        'Birmingham',
        'Solihull',
        'Coventry',
        'Wolverhampton',
        'Stratford-upon-Avon',
        'Leamington Spa',
        'West Midlands',
        'United Kingdom',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.rootwills.co.uk/#website',
      url: 'https://www.rootwills.co.uk',
      name: 'Rootwills Wholesale',
      description: 'B2B Wholesale Food & Fresh Produce Supply UK',
      publisher: {
        '@id': 'https://www.rootwills.co.uk/#organization',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${cormorant.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                localStorage.removeItem('rootwills_theme');
                document.documentElement.classList.remove('light', 'light-theme');
                if (document.body) {
                  document.body.classList.remove('light-theme');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="bg-obsidian-950 text-cream font-sans antialiased min-h-screen relative selection:bg-champagne selection:text-obsidian-950">
        <FullPage3DCanvas />
        <div className="relative z-10">
          {children}
        </div>
        <CartDrawer />
        <Analytics mode="auto" />
        <SpeedInsights />
      </body>
    </html>
  );
}
