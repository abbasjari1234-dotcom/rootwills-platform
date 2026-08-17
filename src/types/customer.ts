import { Sector, CreditTier } from './onboarding';

export interface CustomerLocation {
  id: string;
  name: string;
  addressLine1: string;
  city: string;
  postcode: string;
  deliveryInstructions?: string;
  isPrimary: boolean;
}

export interface CustomerOrganization {
  id: string;
  name: string;
  companyRegNumber?: string;
  vatNumber?: string;
  sector: Sector;
  creditTier: CreditTier;
  creditLimit: number;
  creditUsed: number;
  paymentTerms: string; // e.g. "30 Days EOM", "7 Days", "Pre-payment"
  assignedSalesRep: string;
  assignedDepot: string;
  locations: CustomerLocation[];
  discountTierPercent?: number;
  priceOverrides?: Record<string, number>; // productId -> override price
  lastOrderDate?: string;
  status: 'active' | 'pending' | 'on_hold';
}

export interface UserProfile {
  id: string;
  organizationId: string;
  email: string;
  fullName: string;
  role: 'admin' | 'purchaser' | 'finance' | 'sales_rep';
  phone?: string;
}
