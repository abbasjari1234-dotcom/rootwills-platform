import { NextResponse, type NextRequest } from 'next/server';
import { createDirectDebitMandateFlow } from '@/lib/payments/gocardless';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { organizationId, companyName, contactEmail, redirectUrl } = body;

    if (!organizationId || !companyName || !contactEmail) {
      return NextResponse.json(
        { error: 'Missing required parameters: organizationId, companyName, contactEmail' },
        { status: 400 }
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
    console.error('GoCardless mandate error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to create mandate flow' },
      { status: 500 }
    );
  }
}
