import type { Metadata, Viewport } from 'next';
import './globals.css';

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
    default: 'Rootwills | UK Food Services & Hospitality Wholesale',
    template: '%s',
  },
  description:
    'Rootwills is a premier UK commercial foodservice and wholesale supplier. Hand-graded British farm produce, artisan dairy, and pre-dawn kitchen delivery.',
  keywords: [
    'Rootwills',
    'Rootwills Ltd',
    'food wholesale UK',
    'commercial food services UK',
    'restaurant food suppliers UK',
    'wholesale fruit and veg supplier Birmingham',
    'wholesale food suppliers West Midlands',
    'hospitality food distributors London',
    'fresh produce wholesale UK',
    'hotel and catering food suppliers UK',
    'catering butcher and dairy wholesale',
    'pre-dawn restaurant delivery UK',
    'wholesale kitchen supply Midlands',
    'British farm produce wholesale',
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
      { url: '/images/logo.png?v=2', type: 'image/png' },
      { url: '/favicon-96x96.png?v=2', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-48x48.png?v=2', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.ico?v=2', sizes: 'any' },
    ],
    shortcut: ['/favicon.ico?v=2'],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'da4AvSks5_Lgzy4--BsHwVGBgU6W9kY4tbxhO0CdFew',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'WholesaleStore', 'LocalBusiness'],
      '@id': 'https://www.rootwills.co.uk/#organization',
      name: 'Rootwills',
      legalName: 'Rootwills Ltd',
      url: 'https://www.rootwills.co.uk',
      logo: 'https://www.rootwills.co.uk/images/logo.png',
      image: 'https://www.rootwills.co.uk/images/commercial/rootwills_hero_chef_plating.jpg',
      description:
        'Commercial food services, hand-graded British farm produce, artisan dairy, prime butchery, and wholesale distribution for UK restaurants, hotels, and hospitality kitchens. Over 5,480 catalog lines delivered pre-dawn.',
      telephone: '+44-16164-12803',
      email: 'sales@rootwills.co.uk',
      currenciesAccepted: 'GBP',
      paymentAccepted: 'BACS, Direct Debit, Credit Card, Trade Credit Accounts',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '02:00',
          closes: '16:00',
        },
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+44-16164-12803',
          contactType: 'sales',
          email: 'sales@rootwills.co.uk',
          areaServed: 'GB',
          availableLanguage: ['English'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+44-7984-709478',
          contactType: 'customer support',
          email: 'sales@rootwills.co.uk',
          areaServed: 'GB',
          availableLanguage: ['English'],
        },
      ],
      priceRange: '££',
      identifier: {
        '@type': 'PropertyValue',
        name: 'UK Companies House Registration Number',
        value: '17398744',
      },
      knowsAbout: [
        'Commercial Food Services UK',
        'Wholesale Fresh Produce Supplier Birmingham',
        'Hospitality Food Distribution West Midlands',
        'Pre-Dawn Restaurant Delivery London and Birmingham',
        'Class 1 British Farm Produce Wholesale',
        'Catering Butchery and Artisan Dairy Supply',
      ],
      hasMap: 'https://www.google.com/maps/search/?api=1&query=The+Hub+Nobel+Way+Birmingham+B6+7EU',
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
        { '@type': 'City', name: 'Manchester' },
        { '@type': 'City', name: 'Coventry' },
        { '@type': 'AdministrativeArea', name: 'West Midlands' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Rootwills 5,480+ Line Commercial Foodservice & Wholesale Catalog',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: 'Fresh Farm Produce & Herbs',
            description: 'Class 1 British seasonal vegetables, salad greens, and micro-herbs hand-graded at 2am.',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Prime British Butchery & Poultry',
            description: 'Dry-aged British beef, native lamb, free-range pork, and Red Tractor poultry.',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Artisan Chilled Dairy & Eggs',
            description: 'Farm fresh British milk, Somerset butter, clotted creams, and farm eggs.',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Coastal Seafood & Day-Boat Catch',
            description: 'Sustainably sourced Atlantic salmon, cod, wild seabass, and prepared shellfish.',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Artisan Bakery & Morning Goods',
            description: 'Slow-fermented sourdoughs, brioche buns, and morning pastries for catering.',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Ambient Grocery & Rice/Pasta',
            description: 'De Cecco pasta, arborio rice, tinned Italian tomatoes, pulses, and dry larder essentials.',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Cold-Pressed Oils & Cooking Fats',
            description: 'Extra virgin olive oil, British rapeseed oil, and culinary frying fats.',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Pure Culinary Spices & Seasonings',
            description: 'Whole and ground spices, seasonings, stocks, and culinary sauces.',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Desserts, Purees & Patisserie',
            description: 'Frozen artisan patisserie, fruit coulis, Belgian chocolate, and dessert bases.',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Beverages, Juices & Syrups',
            description: 'Pressed juices, premium sodas, botanical syrups, and barista ingredients.',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Frozen Foods & Coated Fries',
            description: 'Stealth fries, frozen fruits, vegetables, and prep-ready kitchen staples.',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Hygiene & Commercial Kitchen Consumables',
            description: 'Degreasers, blue rolls, food wrap, foil, and sanitising solutions.',
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.rootwills.co.uk/#website',
      url: 'https://www.rootwills.co.uk',
      name: 'Rootwills',
      alternateName: 'Rootwills Ltd',
      publisher: { '@id': 'https://www.rootwills.co.uk/#organization' },
      inLanguage: 'en-GB',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.rootwills.co.uk/products?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
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
    <html lang="en-GB" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/logo.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Epilogue:wght@800;900&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
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
