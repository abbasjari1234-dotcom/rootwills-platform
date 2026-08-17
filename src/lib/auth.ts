import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export type UserRole = 'admin' | 'purchaser' | 'finance';

export interface CurrentProfile {
  id: string;
  organizationId: string;
  role: UserRole;
  fullName: string | null;
  organizationName: string;
  creditTier: 'standard' | 'premium' | 'concierge';
}

// Fetches the signed-in user's profile joined with their organization.
// Redirects to /login if there's no session — call this at the top of any
// portal Server Component that requires auth, rather than duplicating the
// check everywhere.
export async function requireProfile(): Promise<CurrentProfile> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, role, full_name, organization_id, organizations(name, credit_tier)')
    .eq('id', user.id)
    .single();

  if (error || !profile || !profile.organizations) {
    redirect('/login');
  }

  // Supabase's generated types return joined tables as arrays unless you use
  // !inner or configure the relationship explicitly — cast defensively here.
  const org = Array.isArray(profile.organizations) ? profile.organizations[0] : profile.organizations;

  return {
    id: profile.id,
    organizationId: profile.organization_id,
    role: profile.role as UserRole,
    fullName: profile.full_name,
    organizationName: org.name,
    creditTier: org.credit_tier,
  };
}

// Call inside a page/action after requireProfile() when a route should only
// be reachable by specific roles (e.g. invoicing -> admin/finance only).
export function assertRole(profile: CurrentProfile, allowed: UserRole[]) {
  if (!allowed.includes(profile.role)) {
    redirect('/dashboard');
  }
}
