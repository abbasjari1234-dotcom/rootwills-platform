import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { CartDrawer } from '@/components/portal/CartDrawer';

export const metadata: Metadata = {
  title: 'Rootwills Ltd — B2B Wholesale Food & Fresh Produce Supply UK',
  description: 'Premium wholesale food and fresh produce supplier for restaurants, hotels, caterers, care homes, and commercial kitchens across Birmingham and the UK.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-obsidian-950 text-cream font-sans antialiased min-h-screen">
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
