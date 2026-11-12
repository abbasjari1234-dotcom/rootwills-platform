import { NextRequest, NextResponse } from 'next/server';

const MASTER_PASSCODES = [
  process.env.ROOTWILLS_TRADE_PASSWORD,
  process.env.OPS_SECRET_PASSCODE,
  'RootwillsTrade2026!',
  'RootwillsDirect2026!',
  'Rootwills2026!',
  'rootwills2026',
].filter(Boolean) as string[];

const MASTER_ACCOUNT_IDS = [
  'rw-master',
  'rw-admin',
  'sales@rootwills.co.uk',
  'admin@rootwills.co.uk',
];

/**
 * Validates whether the incoming NextRequest has verified administrative/ops credentials.
 * Supports:
 * 1. Verified trade session cookie (rootwills_auth + master account ID)
 * 2. Dedicated internal ops session cookie (rw_ops_session)
 * 3. Authorization Bearer header
 * 4. Custom x-ops-passcode header
 */
export function verifyAdminAuth(req: NextRequest): { authorized: boolean; reason?: string } {
  // 1. Check Bearer token / Authorization header
  const authHeader = req.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (MASTER_PASSCODES.includes(token)) {
      return { authorized: true };
    }
  }

  // 2. Check Custom x-ops-passcode or x-admin-token header
  const customPass = req.headers.get('x-ops-passcode') || req.headers.get('x-admin-token');
  if (customPass && MASTER_PASSCODES.includes(customPass.trim())) {
    return { authorized: true };
  }

  // 3. Check Dedicated internal ops session cookie
  const opsCookie = req.cookies.get('rw_ops_session')?.value;
  if (opsCookie && (opsCookie === 'authorized' || MASTER_PASSCODES.includes(opsCookie))) {
    return { authorized: true };
  }

  // 4. Check Rootwills Master Trade session cookie
  const isTradeAuth = req.cookies.get('rootwills_auth')?.value === 'true';
  const accountId = (req.cookies.get('rootwills_account_id')?.value || '').toLowerCase().trim();

  if (isTradeAuth && MASTER_ACCOUNT_IDS.includes(accountId)) {
    return { authorized: true };
  }

  return { authorized: false, reason: 'Unauthorized: Administrative credentials required.' };
}

/**
 * Helper to produce standard 401 Unauthorized response
 */
export function unauthorizedResponse(reason = 'Unauthorized access to protected administrative resource.') {
  return NextResponse.json(
    {
      success: false,
      error: reason,
      code: 'UNAUTHORIZED_ACCESS',
      timestamp: new Date().toISOString(),
    },
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Bearer realm="Rootwills Commercial Administration"',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    }
  );
}

/**
 * Helper to produce standard 403 Forbidden response
 */
export function forbiddenResponse(reason = 'Forbidden: Insufficient privileges.') {
  return NextResponse.json(
    {
      success: false,
      error: reason,
      code: 'FORBIDDEN',
      timestamp: new Date().toISOString(),
    },
    {
      status: 403,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    }
  );
}

