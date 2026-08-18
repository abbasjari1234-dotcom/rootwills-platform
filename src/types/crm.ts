import { Sector } from './onboarding';

export type LeadStatus =
  | 'new_lead'
  | 'contacted'
  | 'interested'
  | 'price_list_sent'
  | 'quote_sent'
  | 'account_opened'
  | 'lost';

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  sector: Sector;
  postcode: string;
  city: string;
  estimatedWeeklySpend: number;
  source: 'website_form' | 'quote_request' | 'google_search' | 'cold_outreach' | 'referral';
  status: LeadStatus;
  assignedSalesRep: string;
  notes?: string;
  createdAt: string;
  lastContactedAt?: string;
  requestedProducts?: string[];
  updatedAt?: string;
}
