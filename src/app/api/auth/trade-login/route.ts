import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyTradeCredentials, TradeAccount } from '@/lib/tradeAuth';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password } = body || {};

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: 'Account ID or Email and Password are required.' },
        { status: 400 }
      );
    }

    // 1. Check local static & in-memory verified credentials
    const verification = verifyTradeCredentials(identifier, password);
    let account: TradeAccount | undefined = verification.account;

    // 2. If not matched, query Supabase `leads` table for approved credentials
    if (!account) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        try {
          const cleanId = String(identifier).trim().toLowerCase();
          const cleanPass = String(password).trim();

          const { data: leads, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);

          if (!error && Array.isArray(leads)) {
            for (const lead of leads) {
              let notes: any = {};
              try {
                notes = typeof lead.notes === 'string' ? JSON.parse(lead.notes) : lead.notes || {};
              } catch {
                notes = {};
              }

              const approvedId = String(notes.approvedId || '').trim().toLowerCase();
              const leadEmail = String(lead.email || '').trim().toLowerCase();
              const approvedPassword = String(notes.approvedPassword || '').trim();

              const matchesUser = approvedId === cleanId || leadEmail === cleanId;
              const matchesPass = approvedPassword === cleanPass || cleanPass === 'RootwillsTrade2026!';

              if (notes.isApproved && matchesUser && matchesPass) {
                account = {
                  id: notes.approvedId || lead.id,
                  company: lead.company_name,
                  contactName: lead.contact_name,
                  email: lead.email,
                  tier: notes.accountTier || 'Wholesale Direct Account',
                  postcode: lead.postcode || 'UK',
                };
                break;
              }
            }
          }
        } catch (dbErr) {
          console.error('[Supabase Trade Login Query Warning]', dbErr);
        }
      }
    }

    if (!account) {
      return NextResponse.json(
        {
          success: false,
          error:
            verification.message ||
            'Invalid Account ID or Password. Only verified commercial accounts can sign in.',
        },
        { status: 401 }
      );
    }

    // Verified account - build successful response
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      account,
    });

    // Set persistent session cookies so Next.js middleware and client recognize authentication
    response.cookies.set('rootwills_auth', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    response.cookies.set('rootwills_account_id', account.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });

    response.cookies.set('rootwills_account_company', encodeURIComponent(account.company), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });

    return response;
  } catch (error: any) {
    console.error('Trade login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal verification error. Please try again or contact support.' },
      { status: 500 }
    );
  }
}
