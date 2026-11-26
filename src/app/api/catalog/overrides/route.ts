import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const OVERRIDE_SYSTEM_EMAIL = 'ops-catalog-overrides@rootwills.internal';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ overrides: {}, created: [], deleted: [] });
    }

    const { data, error } = await supabase
      .from('leads')
      .select('notes')
      .eq('email', OVERRIDE_SYSTEM_EMAIL)
      .maybeSingle();

    if (error) {
      console.warn('[Catalog Overrides API] Cloud read error:', error.message);
      return NextResponse.json({ overrides: {}, created: [], deleted: [] });
    }

    if (data?.notes) {
      try {
        const parsed = JSON.parse(data.notes);
        return NextResponse.json(
          {
            overrides: parsed.overrides || {},
            created: parsed.created || [],
            deleted: parsed.deleted || [],
          },
          {
            headers: {
              'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
            },
          }
        );
      } catch (parseErr) {
        console.error('[Catalog Overrides API] Parse error:', parseErr);
      }
    }

    return NextResponse.json({ overrides: {}, created: [], deleted: [] });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch catalog overrides' }, { status: 500 });
  }
}
