export type OrderStatus =
  | 'received'
  | 'confirmed'
  | 'picking'
  | 'dispatch_ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  sku: string;
  name: string;
  packSize: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  organizationId: string;
  organizationName: string;
  locationId?: string;
  locationName: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  vatTotal: number;
  total: number;
  isStandingOrder: boolean;
  recurrence?: 'daily' | 'mon_wed_fri' | 'weekly' | 'fortnightly' | 'monthly' | null;
  recurrenceDays?: string[];
  deliveryDate: string;
  deliverySlot: string; // e.g. "Early Morning 05:00 - 08:00"
  deliveryNotes?: string;
  pod?: {
    recipientName: string;
    signatureDataUrl?: string;
    vanProbeChilledTemp: string;
    vanProbeFrozenTemp?: string;
    deliveredAt: string;
    driverName: string;
  };
  createdAt: string;
  updatedAt: string;
  trackingHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId?: string;
  orderNumber?: string;
  organizationId: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
  status: 'paid' | 'open' | 'overdue' | 'void';
  pdfUrl?: string;
}
