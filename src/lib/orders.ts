export interface OrderItem {
  id: string;
  sku: string;
  name: string;
  packSize: string;
  tempZone?: string;
  image: string;
  qty: number;
}

export interface WholesaleOrder {
  id: string; // e.g. RW-2026-89412
  status: 'Received' | 'Picking' | 'Loaded' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
  // Exact form fields requested by user
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  numberOfSites: string;
  postcode: string;
  currentSupplier?: string;
  approxWeeklyDeliveries?: string;
  approxWeeklySpend?: string;
  message?: string;
  marketingEmail?: boolean;
  marketingSms?: boolean;
  // Order items
  items: OrderItem[];
  totalCases: number;
  totalLines: number;
}

// Initial seed orders for the Ops Order Desk
export const INITIAL_OPS_ORDERS: WholesaleOrder[] = [
  {
    id: 'RW-2026-94810',
    status: 'Picking',
    createdAt: '2026-11-10T01:15:00Z',
    name: 'Thierry M.',
    email: 'purchasing@savoy.london',
    phone: '+44 20 7836 4343',
    jobTitle: 'Executive Head Chef',
    company: 'The Savoy London (Fairmont)',
    numberOfSites: '1',
    postcode: 'WC2R 0EZ',
    currentSupplier: 'Brakes',
    approxWeeklyDeliveries: '5-6',
    approxWeeklySpend: '£8,500',
    message: 'Daily fresh bakery, prime butchery & larder line deliveries.',
    marketingEmail: true,
    marketingSms: false,
    items: [
      {
        id: 'rw-bk-796010',
        sku: '796010',
        name: 'Hobbs House Bakery Everyday Sliced Harvester Loaf',
        packSize: '15x800g',
        tempZone: 'Ambient',
        image: 'https://kjmienehbgsfqgcqblgp.supabase.co/storage/v1/object/public/products/796010.webp',
        qty: 4,
      },
      {
        id: 'rw-bk-858770',
        sku: '858770',
        name: 'Baguettes Bread Sandwich Multigrain',
        packSize: '50x140g',
        tempZone: 'Ambient',
        image: 'https://kjmienehbgsfqgcqblgp.supabase.co/storage/v1/object/public/products/858770.webp',
        qty: 6,
      },
    ],
    totalCases: 10,
    totalLines: 2,
  },
  {
    id: 'RW-2026-94809',
    status: 'Received',
    createdAt: '2026-11-10T00:45:00Z',
    name: 'Marcus Hall',
    email: 'birmingham@theivy-collection.com',
    phone: '+44 121 725 9510',
    jobTitle: 'Head Chef',
    company: 'The Ivy Birmingham',
    numberOfSites: '3-5',
    postcode: 'B2 5LS',
    currentSupplier: 'Creed Foodservice',
    approxWeeklyDeliveries: '4',
    approxWeeklySpend: '£4,200',
    message: 'Pre-dawn drop requested before 06:30 AM.',
    marketingEmail: true,
    marketingSms: true,
    items: [
      {
        id: 'rw-bk-724530',
        sku: '724530',
        name: 'Mozzarella, Pesto & Tomato Panini',
        packSize: '20x179g',
        tempZone: 'Ambient',
        image: 'https://kjmienehbgsfqgcqblgp.supabase.co/storage/v1/object/public/products/724530.webp',
        qty: 5,
      },
    ],
    totalCases: 5,
    totalLines: 1,
  },
  {
    id: 'RW-2026-94795',
    status: 'Delivered',
    createdAt: '2026-11-09T22:30:00Z',
    name: 'Matteo Rossi',
    email: 'orders@sancarlo.co.uk',
    phone: '+44 121 633 0251',
    jobTitle: 'Kitchen General Manager',
    company: 'San Carlo Italian Restaurant',
    numberOfSites: '6-10',
    postcode: 'B2 5BN',
    currentSupplier: 'Sysco / Brakes',
    approxWeeklyDeliveries: '6',
    approxWeeklySpend: '£6,000',
    message: 'Pre-dawn delivery via key drop.',
    marketingEmail: false,
    marketingSms: false,
    items: [
      {
        id: 'rw-bk-858770',
        sku: '858770',
        name: 'Baguettes Bread Sandwich Multigrain',
        packSize: '50x140g',
        tempZone: 'Ambient',
        image: 'https://kjmienehbgsfqgcqblgp.supabase.co/storage/v1/object/public/products/858770.webp',
        qty: 3,
      },
    ],
    totalCases: 3,
    totalLines: 1,
  },
];
