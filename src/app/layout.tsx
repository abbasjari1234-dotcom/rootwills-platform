import type { Metadata, Viewport } from 'next';
import { 
  Inter, 
  Outfit, 
  Cormorant_Garamond, 
  Playfair_Display,
  Epilogue,
  Fraunces,
  Caveat,
  Plus_Jakarta_Sans,
} from 'next/font/google';
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

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['800', '900'],
  variable: '--font-epilogue',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-fraunces',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
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
    default: 'Rootwills | UK Food Services, Fresh Produce & Hospitality Wholesale Supplier',
    template: '%s | Rootwills UK Wholesale',
  },
  description:
    'Rootwills is a premier UK commercial foodservice and wholesale supplier. Hand-graded British farm produce, artisan dairy, prime butchery, and pre-dawn kitchen delivery across Birmingham, the Midlands, and London.',
  keywords: [
    'Rootwills',
    'food wholesale UK',
    'commercial food services UK',
    'restaurant food suppliers UK',
    'wholesale fruit and veg supplier Birmingham',
    'hospitality food distributors London',
    'fresh produce wholesale UK',
    'catering butcher and dairy wholesale',
    'pre-dawn restaurant delivery UK',
    'wholesale kitchen supply Midlands',
  ],
  authors: [{ name: 'Rootwills Ltd', url: 'https://www.rootwills.co.uk' }],
  creator: 'Rootwills Ltd',
  publisher: 'Rootwills Ltd',
  category: 'Food Services & Wholesale Distribution',
  alternates: {
    canonical: '/',
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
  openGraph: {
    title: 'Rootwills | UK Food Services, Fresh Produce & Hospitality Wholesale Supplier',
    description:
      'Reliable wholesale supply solutions for restaurants, hotels, caterers, and hospitality kitchens across the UK. Hand-graded British produce & pre-dawn delivery.',
    url: 'https://www.rootwills.co.uk',
    siteName: 'Rootwills',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/images/commercial/rootwills_hero_chef_plating.jpg',
        width: 1200,
        height: 630,
        alt: 'Rootwills - UK Commercial Food Services & Wholesale Purveyors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rootwills | UK Food Services & Hospitality Wholesale Supplier',
    description:
      'Hand-graded British farm produce, artisan dairy & commercial wholesale delivered pre-dawn to UK hospitality kitchens.',
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

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': 'https://www.rootwills.co.uk/#organization',
      name: 'Rootwills',
      legalName: 'Rootwills Ltd',
      url: 'https://www.rootwills.co.uk',
      logo: 'https://www.rootwills.co.uk/images/logo.png',
      image: 'https://www.rootwills.co.uk/images/commercial/rootwills_hero_chef_plating.jpg',
      description:
        'Commercial food services, hand-graded British farm produce, artisan dairy, prime butchery, and wholesale distribution for UK restaurants, hotels, and hospitality kitchens.',
      telephone: '+44-20-1234-5678',
      email: 'info@rootwills.co.uk',
      priceRange: '££',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'The Hub, Nobel Way',
        addressLocality: 'Birmingham',
        addressRegion: 'West Midlands',
        postalCode: 'B6 7EU',
        addressCountry: 'GB',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 52.5086,
        longitude: -1.8842,
      },
      areaServed: [
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'City', name: 'Birmingham' },
        { '@type': 'City', name: 'London' },
        { '@type': 'AdministrativeArea', name: 'West Midlands' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Rootwills Commercial Food Service & Wholesale Solutions',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Food Service Supply & Class 1 Fresh Produce',
              description:
                'Hand-graded British farm produce, seasonal vegetables, and chef-specified ingredients delivered pre-dawn.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Hospitality Wholesale Distribution',
              description:
                'Artisan dairy, prime British butchery, coastal catch, and ambient larder wholesale for restaurants, hotels, and caterers.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bespoke Culinary & Multi-Site Supply Partnerships',
              description:
                'Dedicated account management, cold-chain logistics, and tailored delivery schedules for independent and group hospitality venues.',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.rootwills.co.uk/#website',
      url: 'https://www.rootwills.co.uk',
      name: 'Rootwills',
      publisher: { '@id': 'https://www.rootwills.co.uk/#organization' },
      inLanguage: 'en-GB',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${outfit.variable} ${cormorant.variable} ${playfair.variable} ${epilogue.variable} ${fraunces.variable} ${caveat.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/images/branded/rootwills_logo_seal.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
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
