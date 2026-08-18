import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Cormorant_Garamond, IBM_Plex_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';

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
    'wholesale food suppliers Birmingham',
    'fresh produce catering UK',
    'restaurant food supplier West Midlands',
    'chef trade food ordering',
    'B2B food delivery 6am',
  ],
  authors: [{ name: 'Rootwills Ltd' }],
  creator: 'Rootwills Commercial Foodservice',
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
  },
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
      <body className="bg-obsidian-950 text-cream font-sans antialiased min-h-screen">
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
