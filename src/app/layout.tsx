import type { Metadata, Viewport } from 'next';
import { Inter, Outfit, Cormorant_Garamond, Playfair_Display } from 'next/font/google';
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

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF7F2' },
    { media: '(prefers-color-scheme: dark)', color: '#131313' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rootwills.co.uk'),
  title: {
    default: 'Rootwills | A Trusted Partner in Food Services & Wholesale UK',
    template: '%s | Rootwills',
  },
  description:
    'Reliable supply solutions for restaurants, caterers, hospitality businesses and food professionals across the UK. Quality. Consistency. Partnership.',
  openGraph: {
    title: 'Rootwills | Food Services & Wholesale Purveyors UK',
    description:
      'Reliable supply solutions for restaurants, caterers, hospitality businesses and food professionals across the UK. Quality. Consistency. Partnership.',
    url: 'https://www.rootwills.co.uk',
    siteName: 'Rootwills',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/images/commercial/rootwills_hero_chef_plating.jpg',
        width: 1200,
        height: 630,
        alt: 'Rootwills - Food Services & Wholesale Purveyors UK',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rootwills | Food Services & Wholesale Purveyors UK',
    description:
      'Reliable supply solutions for restaurants, caterers, hospitality businesses and food professionals across the UK.',
    images: ['/images/commercial/rootwills_hero_chef_plating.jpg'],
  },
  icons: {
    icon: [
      { url: '/images/branded/rootwills_logo_seal.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/images/branded/rootwills_logo_seal.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${cormorant.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/images/branded/rootwills_logo_seal.png" type="image/png" />
      </head>
      <body className="bg-[#FAF7F2] text-slate-900 antialiased min-h-screen selection:bg-[#4E0D17] selection:text-[#FAF7F2] flex flex-col font-sans relative">

        {/* WCAG Skip to Main Content Link for Keyboard Navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#4E0D17] focus:text-[#FAF7F2] focus:font-bold focus:text-xs focus:rounded-xl focus:shadow-md focus:outline-none"
        >
          Skip to Main Content &darr;
        </a>
        <div id="main-content" className="flex-1 flex flex-col relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
