import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: false,
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: 'Premium UK Wholesale Foodservice Supplier | Rootwills',
    template: '%s',
  },
  description:
    'Source farm-fresh wholesale produce, dairy, and culinary goods with guaranteed 6am delivery across the UK. Apply for your Rootwills trade account today.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="bg-obsidian text-cream antialiased min-h-screen selection:bg-champagne selection:text-obsidian flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
