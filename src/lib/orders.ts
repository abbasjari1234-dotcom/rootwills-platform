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
  deliveryDate: string; // YYYY-MM-DD
  deliveryWindow: string; // e.g. "04:00 – 07:30 AM (Pre-Dawn)"
  venueName: string;
  contactName: string;
  phone: string;
  email: string;
  address: string;
  postcode: string;
  dropoffNotes: string;
  poNumber?: string;
  paymentMethod: '30-Day Credit Account' | 'Trade BACS' | 'Card on Delivery';
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
    deliveryDate: '2026-11-11',
    deliveryWindow: '04:00 – 07:30 AM (Pre-Dawn)',
    venueName: 'The Savoy London (Fairmont)',
    contactName: 'Thierry M. (Exec Chef)',
    phone: '+44 20 7836 4343',
    email: 'purchasing@savoy.london',
    address: 'Strand, London',
    postcode: 'WC2R 0EZ',
    dropoffNotes: 'Goods entrance via Carting Lane. Keybox 5921. Stack bakery in pastry walk-in.',
    poNumber: 'PO-SAVOY-8812',
    paymentMethod: '30-Day Credit Account',
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
    deliveryDate: '2026-11-11',
    deliveryWindow: '04:00 – 07:30 AM (Pre-Dawn)',
    venueName: 'The Ivy Birmingham',
    contactName: 'Marcus Hall (Head Chef)',
    phone: '+44 121 725 9510',
    email: 'birmingham@theivy-collection.com',
    address: '67-71 Temple Row, Birmingham',
    postcode: 'B2 5LS',
    dropoffNotes: 'Back lane delivery bay. Keycode 8402. Chilled items to meat prep chiller.',
    poNumber: 'IVY-BHM-491',
    paymentMethod: '30-Day Credit Account',
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
    deliveryDate: '2026-11-10',
    deliveryWindow: '04:00 – 07:30 AM (Pre-Dawn)',
    venueName: 'San Carlo Italian Restaurant',
    contactName: 'Matteo R. (Kitchen GM)',
    phone: '+44 121 633 0251',
    email: 'orders@sancarlo.co.uk',
    address: '4 Temple St, Birmingham',
    postcode: 'B2 5BN',
    dropoffNotes: 'Delivered via driver key drop 05:15 AM. Chilled crates signed and placed in walk-in.',
    poNumber: 'SC-88194',
    paymentMethod: '30-Day Credit Account',
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
