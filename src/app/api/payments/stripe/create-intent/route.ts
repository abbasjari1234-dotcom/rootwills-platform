import { NextResponse, type NextRequest } from 'next/server';
import { createStripePaymentIntent } from '@/lib/payments/stripe';
import { checkRateLimit, RATE_LIMIT_PRESETS, getClientIp } from '@/lib/security/rate-limit';

export async function POST(request: NextRequest) {
  // 1. Rate Limiting Check
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`stripe_intent_${ip}`, RATE_LIMIT_PRESETS.ORDERS);
  if (!rateLimit.success) {
    return NextResponse.json({ error: 'Too many payment requests. Please wait a moment.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { amount, organizationId, invoiceNumber, invoiceId, customerEmail, description } = body;

    const parsedAmount = Number(amount);
    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0 || parsedAmount > 100000 || !organizationId) {
      return NextResponse.json(
        { error: 'Invalid or missing parameters: amount must be between £0.01 and £100,000.00, organizationId required.' },
        { status: 400 }
      );
    }

    const cleanEmail = (customerEmail || 'finance@establishment.co.uk').trim().slice(0, 150);
    const cleanOrgId = String(organizationId).trim().slice(0, 64);
    const cleanDesc = (description || `Rootwills Wholesale Invoice #${invoiceNumber || 'Manual'}`).trim().slice(0, 200);

    const result = await createStripePaymentIntent({
      amount: parsedAmount,
      organizationId: cleanOrgId,
      invoiceNumber: invoiceNumber ? String(invoiceNumber).slice(0, 50) : undefined,
      invoiceId: invoiceId ? String(invoiceId).slice(0, 64) : undefined,
      customerEmail: cleanEmail,
      description: cleanDesc,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Stripe intent error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}

