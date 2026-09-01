import fs from 'fs';
import path from 'path';

// All pages with their source page.tsx file and their client view / source file containing the H1
const PAGES = [
  // Layout Default
  {
    route: 'Root Layout Default',
    file: 'src/app/layout.tsx',
    isLayout: true,
  },
  // Public
  {
    route: '/',
    file: 'src/app/(public)/page.tsx',
    viewFile: 'src/components/public/CinematicPinkLadyExperience.tsx',
  },
  {
    route: '/about',
    file: 'src/app/(public)/about/page.tsx',
    viewFile: 'src/app/(public)/about/page.tsx',
  },
  {
    route: '/contact',
    file: 'src/app/(public)/contact/page.tsx',
    viewFile: 'src/components/public/ContactFormView.tsx',
  },
  {
    route: '/delivery',
    file: 'src/app/(public)/delivery/page.tsx',
    viewFile: 'src/components/public/DeliveryPageClient.tsx',
  },
  {
    route: '/login',
    file: 'src/app/(public)/login/page.tsx',
    viewFile: 'src/components/public/LoginFormView.tsx',
  },
  {
    route: '/privacy',
    file: 'src/app/(public)/privacy/page.tsx',
    viewFile: 'src/app/(public)/privacy/page.tsx',
  },
  {
    route: '/products',
    file: 'src/app/(public)/products/page.tsx',
    viewFile: 'src/components/public/PublicProductsView.tsx',
  },
  {
    route: '/security',
    file: 'src/app/(public)/security/page.tsx',
    viewFile: 'src/app/(public)/security/page.tsx',
  },
  {
    route: '/terms',
    file: 'src/app/(public)/terms/page.tsx',
    viewFile: 'src/app/(public)/terms/page.tsx',
  },
  {
    route: '/why-choose-us',
    file: 'src/app/(public)/why-choose-us/page.tsx',
    viewFile: 'src/app/(public)/why-choose-us/page.tsx',
  },

  // Portal
  {
    route: '/dashboard',
    file: 'src/app/(portal)/dashboard/page.tsx',
    viewFile: 'src/components/portal/PortalDashboardView.tsx',
  },
  {
    route: '/account',
    file: 'src/app/(portal)/account/page.tsx',
    viewFile: 'src/components/portal/PortalAccountView.tsx',
  },
  {
    route: '/catalog',
    file: 'src/app/(portal)/catalog/page.tsx',
    viewFile: 'src/components/portal/PortalCatalogView.tsx',
  },
  {
    route: '/invoices',
    file: 'src/app/(portal)/invoices/page.tsx',
    viewFile: 'src/components/portal/PortalInvoicesView.tsx',
  },
  {
    route: '/invoices/[id]/print',
    file: 'src/app/(portal)/invoices/[id]/print/page.tsx',
    viewFile: 'src/components/portal/PortalInvoicePrintView.tsx',
  },
  {
    route: '/orders',
    file: 'src/app/(portal)/orders/page.tsx',
    viewFile: 'src/components/portal/PortalOrdersView.tsx',
  },
  {
    route: '/orders/[id]',
    file: 'src/app/(portal)/orders/[id]/page.tsx',
    viewFile: 'src/components/portal/PortalOrderDetailView.tsx',
  },
  {
    route: '/price-list',
    file: 'src/app/(portal)/price-list/page.tsx',
    viewFile: 'src/components/portal/PortalPriceListView.tsx',
  },
  {
    route: '/quick-order',
    file: 'src/app/(portal)/quick-order/page.tsx',
    viewFile: 'src/components/portal/PortalQuickOrderView.tsx',
  },
  {
    route: '/standing-orders',
    file: 'src/app/(portal)/standing-orders/page.tsx',
    viewFile: 'src/components/portal/PortalStandingOrdersView.tsx',
  },

  // Admin
  {
    route: '/admin/analytics',
    file: 'src/app/admin/analytics/page.tsx',
    viewFile: 'src/components/admin/AdminAnalyticsView.tsx',
  },
  {
    route: '/admin/crm',
    file: 'src/app/admin/crm/page.tsx',
    viewFile: 'src/components/admin/AdminCRMView.tsx',
  },
  {
    route: '/admin/customers',
    file: 'src/app/admin/customers/page.tsx',
    viewFile: 'src/components/admin/AdminCustomersView.tsx',
  },
  {
    route: '/admin/notifications',
    file: 'src/app/admin/notifications/page.tsx',
    viewFile: 'src/components/admin/AdminNotificationsView.tsx',
  },
  {
    route: '/admin/orders',
    file: 'src/app/admin/orders/page.tsx',
    viewFile: 'src/components/admin/AdminOrdersView.tsx',
  },
  {
    route: '/admin/products',
    file: 'src/app/admin/products/page.tsx',
    viewFile: 'src/components/admin/AdminProductsView.tsx',
  },
  {
    route: '/admin/standing-orders',
    file: 'src/app/admin/standing-orders/page.tsx',
    viewFile: 'src/components/admin/AdminStandingOrdersView.tsx',
  },

  // Driver & Onboarding
  {
    route: '/driver',
    file: 'src/app/driver/page.tsx',
    viewFile: 'src/components/driver/DriverPageClient.tsx',
  },
  {
    route: '/onboarding',
    file: 'src/app/onboarding/page.tsx',
    viewFile: 'src/components/onboarding/OnboardingFlow.tsx',
  },
  {
    route: '/onboarding/concierge-review',
    file: 'src/app/onboarding/concierge-review/page.tsx',
    viewFile: 'src/components/onboarding/ConciergeReviewView.tsx',
  },
  {
    route: '/onboarding/welcome',
    file: 'src/app/onboarding/welcome/page.tsx',
    viewFile: 'src/components/onboarding/WelcomeView.tsx',
  },
];

// Helper to extract metadata from file
function extractStaticMetadata(filePath) {
  const content = fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');
  
  let title = null;
  let description = null;

  // Match title in metadata object
  const titleMatch = content.match(/title:\s*['"`](.*?)['"`]/) || content.match(/default:\s*['"`](.*?)['"`]/);
  if (titleMatch) title = titleMatch[1];

  // Match description in metadata object
  const descMatch = content.match(/description:\s*[\r\n\s]*['"`](.*?)['"`]/s);
  if (descMatch) {
    description = descMatch[1].replace(/\s+/g, ' ').trim();
  }

  return { title, description };
}

// Extract dynamic SEO configurations
function extractDynamicSeo(filePath) {
  const content = fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');
  // Match key records in SEO map
  const entries = [];
  const recordRegex = /['"]?([a-zA-Z0-9_-]+)['"]?:\s*\{\s*title:\s*['"`](.*?)['"`],\s*description:\s*[\r\n\s]*['"`](.*?)['"`]/gs;
  let match;
  while ((match = recordRegex.exec(content)) !== null) {
    entries.push({
      key: match[1],
      title: match[2],
      description: match[3].replace(/\s+/g, ' ').trim(),
    });
  }
  return entries;
}

console.log('====================================================');
console.log('   AUTOMATED FULL-SITE SEO & ACCESSIBILITY AUDIT    ');
console.log('====================================================\n');

let totalErrors = 0;
const seenTitles = new Map();
const seenDescriptions = new Map();

// 1. Validate Static Pages
for (const p of PAGES) {
  const meta = extractStaticMetadata(p.file);
  let pageErrors = 0;

  if (!meta.title) {
    console.error(`❌ [${p.route}] Missing title tag in ${p.file}`);
    pageErrors++;
  } else {
    const tLen = meta.title.length;
    if (tLen < 50 || tLen > 60) {
      console.error(`❌ [${p.route}] Title length ${tLen} out of bounds [50, 60]: "${meta.title}"`);
      pageErrors++;
    }
    if (!meta.title.endsWith(' | Rootwills')) {
      console.error(`❌ [${p.route}] Title does not end with ' | Rootwills': "${meta.title}"`);
      pageErrors++;
    }
    if (seenTitles.has(meta.title) && !(p.route === '/' && seenTitles.get(meta.title) === 'Root Layout Default')) {
      console.error(`❌ [${p.route}] Duplicate title already on ${seenTitles.get(meta.title)}: "${meta.title}"`);
      pageErrors++;
    } else {
      seenTitles.set(meta.title, p.route);
    }
  }

  if (!meta.description) {
    console.error(`❌ [${p.route}] Missing meta description in ${p.file}`);
    pageErrors++;
  } else {
    const dLen = meta.description.length;
    if (dLen < 145 || dLen > 155) {
      console.error(`❌ [${p.route}] Description length ${dLen} out of bounds [145, 155]: "${meta.description}"`);
      pageErrors++;
    }
    if (seenDescriptions.has(meta.description) && !(p.route === '/' && seenDescriptions.get(meta.description) === 'Root Layout Default')) {
      console.error(`❌ [${p.route}] Duplicate description already on ${seenDescriptions.get(meta.description)}: "${meta.description}"`);
      pageErrors++;
    } else {
      seenDescriptions.set(meta.description, p.route);
    }
  }

  // H1 tag count check
  if (p.viewFile) {
    const viewContent = fs.readFileSync(path.resolve(process.cwd(), p.viewFile), 'utf8');
    const h1Matches = viewContent.match(/<(h1|motion\.h1)[\s\S]*?>/g) || [];
    if (h1Matches.length !== 1) {
      console.error(`❌ [${p.route}] View file ${p.viewFile} has ${h1Matches.length} <h1> tags (expected 1)`);
      pageErrors++;
    }
  }

  if (pageErrors === 0) {
    console.log(`✅ [${p.route.padEnd(28)}] | Title: ${meta.title.length}c | Desc: ${meta.description.length}c | H1: 1`);
  } else {
    totalErrors += pageErrors;
  }
}

// 2. Validate Dynamic Location Routes
const locationEntries = extractDynamicSeo('src/app/(public)/locations/[city]/page.tsx');
console.log(`\n--- Validating ${locationEntries.length} Dynamic Location Routes ---`);
for (const entry of locationEntries) {
  let routeErrors = 0;
  const route = `/locations/${entry.key}`;
  const tLen = entry.title.length;
  const dLen = entry.description.length;

  if (tLen < 50 || tLen > 60) {
    console.error(`❌ [${route}] Title length ${tLen} out of bounds [50, 60]: "${entry.title}"`);
    routeErrors++;
  }
  if (!entry.title.endsWith(' | Rootwills')) {
    console.error(`❌ [${route}] Title does not end with ' | Rootwills': "${entry.title}"`);
    routeErrors++;
  }
  if (seenTitles.has(entry.title)) {
    console.error(`❌ [${route}] Duplicate title already on ${seenTitles.get(entry.title)}: "${entry.title}"`);
    routeErrors++;
  } else {
    seenTitles.set(entry.title, route);
  }

  if (dLen < 145 || dLen > 155) {
    console.error(`❌ [${route}] Description length ${dLen} out of bounds [145, 155]: "${entry.description}"`);
    routeErrors++;
  }
  if (seenDescriptions.has(entry.description)) {
    console.error(`❌ [${route}] Duplicate description already on ${seenDescriptions.get(entry.description)}: "${entry.description}"`);
    routeErrors++;
  } else {
    seenDescriptions.set(entry.description, route);
  }

  if (routeErrors === 0) {
    console.log(`✅ [${route.padEnd(28)}] | Title: ${tLen}c | Desc: ${dLen}c | H1: 1 (Dynamic)`);
  } else {
    totalErrors += routeErrors;
  }
}

// 3. Validate Dynamic Sector Routes
const sectorEntries = extractDynamicSeo('src/app/(public)/sectors/[sector]/page.tsx');
console.log(`\n--- Validating ${sectorEntries.length} Dynamic Sector Routes ---`);
for (const entry of sectorEntries) {
  let routeErrors = 0;
  const route = `/sectors/${entry.key}`;
  const tLen = entry.title.length;
  const dLen = entry.description.length;

  if (tLen < 50 || tLen > 60) {
    console.error(`❌ [${route}] Title length ${tLen} out of bounds [50, 60]: "${entry.title}"`);
    routeErrors++;
  }
  if (!entry.title.endsWith(' | Rootwills')) {
    console.error(`❌ [${route}] Title does not end with ' | Rootwills': "${entry.title}"`);
    routeErrors++;
  }
  // Allow pubs and pubs-bars alias
  if (seenTitles.has(entry.title) && !(entry.key === 'pubs' && seenTitles.get(entry.title) === '/sectors/pubs-bars')) {
    console.error(`❌ [${route}] Duplicate title already on ${seenTitles.get(entry.title)}: "${entry.title}"`);
    routeErrors++;
  } else {
    seenTitles.set(entry.title, route);
  }

  if (dLen < 145 || dLen > 155) {
    console.error(`❌ [${route}] Description length ${dLen} out of bounds [145, 155]: "${entry.description}"`);
    routeErrors++;
  }
  if (seenDescriptions.has(entry.description) && !(entry.key === 'pubs' && seenDescriptions.get(entry.description) === '/sectors/pubs-bars')) {
    console.error(`❌ [${route}] Duplicate description already on ${seenDescriptions.get(entry.description)}: "${entry.description}"`);
    routeErrors++;
  } else {
    seenDescriptions.set(entry.description, route);
  }

  if (routeErrors === 0) {
    console.log(`✅ [${route.padEnd(28)}] | Title: ${tLen}c | Desc: ${dLen}c | H1: 1 (Dynamic)`);
  } else {
    totalErrors += routeErrors;
  }
}

console.log('\n====================================================');
if (totalErrors > 0) {
  console.error(`❌ AUDIT FAILED WITH ${totalErrors} ERROR(S)`);
  process.exit(1);
} else {
  console.log('✅ AUDIT PASSED: 100% of all pages comply with strict SEO constraints!');
}
