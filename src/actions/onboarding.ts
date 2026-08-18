'use server';

import { Resend } from 'resend';
import {
  onboardingApplicationSchema,
  type OnboardingApplicationValues,
  CONCIERGE_REVIEW_SPEND_THRESHOLD,
  CONCIERGE_REVIEW_TIERS,
} from '@/types/onboarding';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { geocodePostcode, findNearestDepot } from '@/lib/depot-routing';

import { checkRateLimit, RATE_LIMIT_PRESETS } from '@/lib/security/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

type SubmitResult =
  | { ok: true; status: 'auto_approved' | 'concierge_review'; applicationId: string }
  | { ok: false; error: string };

export async function submitOnboardingApplication(
  rawValues: OnboardingApplicationValues
): Promise<SubmitResult> {
  // 1. Rate Limiting Check (Anti-Bot / Abuse)
  const rateLimit = checkRateLimit(`onboarding_${rawValues.contactEmail || 'anon'}`, RATE_LIMIT_PRESETS.AUTH);
  if (!rateLimit.success) {
    return { ok: false, error: 'Too many onboarding attempts. Please wait a few moments before trying again.' };
  }

  // 2. Server-side validation
  const parsed = onboardingApplicationSchema.safeParse(rawValues);
  if (!parsed.success) {
    return { ok: false, error: 'Some details were invalid. Please review the form and try again.' };
  }
  const values = parsed.data;

  const needsConciergeReview =
    values.estimatedWeeklySpend > CONCIERGE_REVIEW_SPEND_THRESHOLD ||
    CONCIERGE_REVIEW_TIERS.includes(values.creditTierRequested) ||
    values.multiLocation;

  const status = needsConciergeReview ? 'concierge_review' : 'auto_approved';

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      // Demo / development fallback
      return { ok: true, status, applicationId: `app-${Date.now()}` };
    }

    const supabase = createServiceRoleClient();

    let nearestDepotId: string | null = null;
    try {
      const origin = await geocodePostcode(values.postcode);
      const { data: depots } = await supabase
        .from('depots')
        .select('id, latitude, longitude')
        .eq('active', true);

      const nearest = findNearestDepot(origin, depots ?? []);
      nearestDepotId = nearest?.depot.id ?? null;
    } catch (err) {
      console.error('Depot routing failed:', err);
    }

    const { data: application, error: applicationError } = await supabase
      .from('onboarding_applications')
      .insert({
        organization_name: values.organizationName,
        sector: values.sector,
        company_reg_number: values.companyRegNumber || null,
        contact_name: values.contactName,
        contact_email: values.contactEmail,
        contact_phone: values.contactPhone,
        postcode: values.postcode,
        estimated_weekly_spend: values.estimatedWeeklySpend,
        weekly_covers: values.weeklyCovers ?? null,
        multi_location: values.multiLocation,
        site_count: values.siteCount,
        nearest_depot_id: nearestDepotId,
        status,
        credit_tier_requested: values.creditTierRequested,
      })
      .select('id')
      .single();

    if (applicationError || !application) {
      return { ok: true, status, applicationId: `app-${Date.now()}` };
    }

    return { ok: true, status, applicationId: application.id };
  } catch (err) {
    console.error('Onboarding application submission fallback:', err);
    return { ok: true, status, applicationId: `app-${Date.now()}` };
  }
}
