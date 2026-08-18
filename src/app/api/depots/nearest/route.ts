import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { geocodePostcode, findNearestDepot } from '@/lib/depot-routing';
import { checkRateLimit } from '@/lib/security/rate-limit';

// GET /api/depots/nearest?postcode=M24+4GA
// Lightweight preview endpoint for the onboarding UI — the authoritative
// assignment happens server-side in the onboarding Server Action.
export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'anon';
  const rateLimit = checkRateLimit(`depot_${ip}`, { maxRequests: 60, windowSeconds: 60 });
  if (!rateLimit.success) {
    return NextResponse.json({ error: 'Too many requests. Please slow down.' }, { status: 429 });
  }

  const postcode = req.nextUrl.searchParams.get('postcode');
  if (!postcode || postcode.length > 20) {
    return NextResponse.json({ error: 'Valid postcode is required.' }, { status: 400 });
  }

  try {
    const origin = await geocodePostcode(postcode);
    const supabase = createServiceRoleClient();
    const { data: depots } = await supabase
      .from('depots')
      .select('id, name, latitude, longitude')
      .eq('active', true);

    const nearest = findNearestDepot(origin, depots ?? []);
    if (!nearest) {
      return NextResponse.json({ depotName: null });
    }

    return NextResponse.json({ depotName: nearest.depot.name, distanceKm: Math.round(nearest.distanceKm) });
  } catch {
    return NextResponse.json({ depotName: null });
  }
}
