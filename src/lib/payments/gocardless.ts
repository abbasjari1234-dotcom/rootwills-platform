/**
 * GoCardless BACS Direct Debit Integration Module
 * Automates 30-Day BACS Direct Debit mandate setup and invoice collections
 */

export interface CreateMandateParams {
  organizationId: string;
  companyName: string;
  contactEmail: string;
  billingAddress: {
    line1: string;
    city: string;
    postalCode: string;
  };
  redirectUrl: string;
}

export interface DirectDebitMandate {
  mandateId: string;
  status: 'pending_submission' | 'active' | 'failed';
  scheme: 'bacs';
  bankAccountEnding: string;
  authorisationUrl: string;
}

export interface CollectPaymentParams {
  mandateId: string;
  invoiceNumber: string;
  amount: number; // in GBP (£)
  chargeDate: string; // ISO date string
  description: string;
}

export interface PaymentCollectionResult {
  paymentId: string;
  status: 'pending_submission' | 'confirmed' | 'paid_out';
  amount: number;
  currency: 'GBP';
  reference: string;
}

/**
 * Generate a GoCardless BACS Direct Debit Mandate Flow URL
 * Allows chefs & purchasing directors to securely set up 30-day automated BACS collection
 */
export async function createDirectDebitMandateFlow(params: CreateMandateParams): Promise<DirectDebitMandate> {
  // In production, this calls GoCardless API: POST /billing_request_flows
  const mockMandateId = `MD_${params.organizationId.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()}_${Date.now()}`;
  
  return {
    mandateId: mockMandateId,
    status: 'active',
    scheme: 'bacs',
    bankAccountEnding: '4192',
    authorisationUrl: `https://pay.gocardless.com/flow/${mockMandateId}?redirect_uri=${encodeURIComponent(params.redirectUrl)}`,
  };
}

/**
 * Trigger an automated BACS collection on an invoice due date
 */
export async function collectInvoiceViaDirectDebit(params: CollectPaymentParams): Promise<PaymentCollectionResult> {
  // In production, this calls GoCardless API: POST /payments
  return {
    paymentId: `PM_${Date.now()}`,
    status: 'confirmed',
    amount: params.amount,
    currency: 'GBP',
    reference: `RW-${params.invoiceNumber}`,
  };
}
