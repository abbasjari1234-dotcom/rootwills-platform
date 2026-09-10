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

  let profile = null;
  try {
    const { data: userProfile, error } = await supabase
      .from('profiles')
      .select('id, role, full_name, organization_id, organizations(name, credit_tier)')
      .eq('id', user.id)
      .maybeSingle();

    if (!error && userProfile) {
      profile = userProfile;
    }
  } catch {
    // Database RLS or network fallback
  }

  const rawRole = (user.app_metadata?.role || user.user_metadata?.role || 'purchaser').toLowerCase();
  const defaultRole: UserRole = rawRole === 'admin' ? 'admin' : rawRole === 'finance' ? 'finance' : 'purchaser';

  if (profile) {
    const org = Array.isArray(profile.organizations) ? profile.organizations[0] : profile.organizations;
    return {
      id: profile.id,
      organizationId: profile.organization_id || 'org-rootwills-partner',
      role: (profile.role as UserRole) || defaultRole,
      fullName: profile.full_name || user.user_metadata?.full_name || null,
      organizationName: org?.name || user.user_metadata?.organization_name || 'Rootwills Trade Partner',
      creditTier: (org?.credit_tier as any) || 'standard',
    };
  }

  return {
    id: user.id,
    organizationId: user.user_metadata?.organization_id || 'org-rootwills-partner',
    role: defaultRole,
    fullName: user.user_metadata?.full_name || null,
    organizationName: user.user_metadata?.organization_name || 'Rootwills Trade Partner',
    creditTier: 'standard',
  };
}

// Call inside a page/action after requireProfile() when a route should only
// be reachable by specific roles (e.g. invoicing -> admin/finance only).
export function assertRole(profile: CurrentProfile, allowed: UserRole[]) {
  if (!allowed.includes(profile.role)) {
    redirect('/dashboard');
  }
}
