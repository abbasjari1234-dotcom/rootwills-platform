import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  themeColor: '#021710',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

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
        {/* WCAG Skip to Main Content Link for Keyboard Navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-champagne focus:text-obsidian-950 focus:font-bold focus:text-xs focus:rounded-xl focus:shadow-gold-glow focus:outline-none"
        >
          Skip to Main Content &darr;
        </a>
        <div id="main-content" className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
