import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { LeadStatus } from '@/types/crm';
import { Sector } from '@/types/onboarding';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const isRealSupabaseConfigured =
      rawSupabaseUrl.length > 0 &&
      !rawSupabaseUrl.includes('placeholder') &&
      (rawSupabaseUrl.includes('supabase.co') || rawSupabaseUrl.startsWith('http'));

    if (!isRealSupabaseConfigured) {
      return NextResponse.json({ ok: true, leads: [] });
    }

    const supabase = createServiceRoleClient();
    const { data: applications, error } = await supabase
      .from('onboarding_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !applications) {
      return NextResponse.json({ ok: true, leads: [] });
    }

    const leads = applications.map((app: any) => {
      let status: LeadStatus = 'new_lead';
      if (app.status === 'auto_approved' || app.status === 'account_opened') {
        status = 'account_opened';
      } else if (app.status === 'contacted') {
        status = 'contacted';
      } else if (app.status === 'price_list_sent') {
        status = 'price_list_sent';
      } else if (app.status === 'quote_sent') {
        status = 'quote_sent';
      }

      return {
        id: app.id || `lead-${Date.now()}`,
        companyName: app.organization_name || 'Commercial Lead',
        contactName: app.contact_name || 'Purchasing Lead',
        email: app.contact_email || 'orders@venue.co.uk',
        phone: app.contact_phone || '+44 121 000 0000',
        sector: (app.sector as Sector) || 'fine_dining',
        postcode: app.postcode || 'B2 5BN',
        city: 'Birmingham',
        estimatedWeeklySpend: Number(app.estimated_weekly_spend) || 2500,
        status,
        source: 'inbound_web',
        assignedSalesRep: 'Marcus Vance',
        notes: `Applied online via Onboarding Wizard. Covers: ${app.weekly_covers || 'N/A'}. Credit Tier: ${app.credit_tier_requested || 'Standard'}. Multi-Site: ${app.multi_location ? 'Yes' : 'No'}`,
        createdAt: app.created_at ? new Date(app.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        updatedAt: app.created_at ? new Date(app.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      };
    });

    return NextResponse.json({ ok: true, leads });
  } catch (err: any) {
    console.error('API /api/admin/leads error:', err);
    return NextResponse.json({ ok: true, leads: [] });
  }
}
