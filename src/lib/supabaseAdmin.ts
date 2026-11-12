import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kjmienehbgsfqgcqblgp.supabase.co';

const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

let cachedClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return null;
  }
  if (!cachedClient) {
    cachedClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return cachedClient;
}

export interface LeadSubmissionPayload {
  company: string;
  name: string;
  email: string;
  phone: string;
  postcode: string;
  jobTitle?: string;
  numberOfSites?: string;
  currentSupplier?: string;
  approxWeeklyDeliveries?: string;
  approxWeeklySpend?: string;
  message?: string;
  marketingEmail?: boolean;
  marketingSms?: boolean;
  items?: any[];
  totalCases?: number;
  subtotalNet?: number;
  vatTotal?: number;
  grandTotal?: number;
  accountTier?: string;
  orderId?: string;
}

/**
 * Saves a new trade account application or wholesale order inquiry to Supabase `leads`
 */
export async function saveLeadToSupabase(payload: LeadSubmissionPayload) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.warn('[Supabase] Client not initialized, skipping lead insert.');
    return { success: false, error: 'Database not initialized' };
  }

  const cleanCompany = String(payload.company || 'Hospitality Venue').trim();
  const cleanName = String(payload.name || 'Chef / Buyer').trim();
  const cleanEmail = String(payload.email || '').trim().toLowerCase();
  const cleanPhone = String(payload.phone || '+447984709478').trim();
  const cleanPostcode = String(payload.postcode || 'B5 6EU').trim().toUpperCase();

  const numericSpend =
    typeof payload.subtotalNet === 'number'
      ? payload.subtotalNet
      : payload.approxWeeklySpend
      ? parseFloat(payload.approxWeeklySpend.replace(/[^0-9.]/g, '')) || null
      : null;

  const notesData = {
    orderId: payload.orderId || `RW-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    jobTitle: payload.jobTitle || 'Chef / Buyer',
    numberOfSites: payload.numberOfSites || '1',
    currentSupplier: payload.currentSupplier || null,
    approxWeeklyDeliveries: payload.approxWeeklyDeliveries || null,
    approxWeeklySpend: payload.approxWeeklySpend || null,
    message: payload.message || null,
    marketingEmail: Boolean(payload.marketingEmail),
    marketingSms: Boolean(payload.marketingSms),
    items: Array.isArray(payload.items) ? payload.items : [],
    totalCases: payload.totalCases || 0,
    subtotalNet: payload.subtotalNet,
    vatTotal: payload.vatTotal,
    grandTotal: payload.grandTotal,
    accountTier: payload.accountTier || 'Trade Standard',
    submittedAt: new Date().toISOString(),
    isApproved: false,
    approvedId: null,
    approvedPassword: null,
  };

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        company_name: cleanCompany,
        contact_name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        postcode: cleanPostcode,
        sector: 'fine_dining',
        source: 'website',
        status: 'new_lead',
        estimated_spend: numericSpend,
        notes: JSON.stringify(notesData),
      })
      .select()
      .single();

    if (error) {
      console.error('[Supabase saveLeadToSupabase Error]', error);
      return { success: false, error: error.message };
    }

    return { success: true, lead: data };
  } catch (err: any) {
    console.error('[Supabase saveLeadToSupabase Exception]', err);
    return { success: false, error: err.message };
  }
}

