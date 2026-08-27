import { NextResponse, type NextRequest } from 'next/server';
import { createDirectDebitMandateFlow } from '@/lib/payments/gocardless';
import { checkRateLimit, RATE_LIMIT_PRESETS, getClientIp } from '@/lib/security/rate-limit';
import { createSafeErrorResponse } from '@/lib/security/error-handler';

export async function POST(request: NextRequest) {
  // Rate Limiting Check
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`gc_mandate_${ip}`, RATE_LIMIT_PRESETS.ORDERS);
  if (!rateLimit.success) {
    return createSafeErrorResponse('Too many requests. Please wait a moment.', 429, 'Too many requests. Please wait a moment.');
  }

  try {
    const body = await request.json();
    const { organizationId, companyName, contactEmail, redirectUrl } = body;

    if (!organizationId || !companyName || !contactEmail) {
      return createSafeErrorResponse(
        'Missing required parameters: organizationId, companyName, contactEmail',
        400,
        'Missing required organization or email parameters.'
      );
    }

    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const fallbackRedirect = `${protocol}://${host}/invoices?gocardless=success`;

    const mandate = await createDirectDebitMandateFlow({
      organizationId,
      companyName,
      contactEmail,
      redirectUrl: redirectUrl || fallbackRedirect,
    });

    return NextResponse.json(mandate);
  } catch (err: any) {
    return createSafeErrorResponse(err, 500, 'Unable to set up Direct Debit mandate. Please retry shortly.');
  }
}

