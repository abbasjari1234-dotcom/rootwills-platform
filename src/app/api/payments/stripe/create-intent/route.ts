import { NextResponse, type NextRequest } from 'next/server';
import { createStripePaymentIntent } from '@/lib/payments/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, organizationId, invoiceNumber, invoiceId, customerEmail, description } = body;

    if (!amount || !organizationId) {
      return NextResponse.json(
        { error: 'Missing required parameters: amount, organizationId' },
        { status: 400 }
      );
    }

    const result = await createStripePaymentIntent({
      amount: Number(amount),
      organizationId,
      invoiceNumber,
      invoiceId,
      customerEmail: customerEmail || 'finance@establishment.co.uk',
      description: description || `Rootwills Wholesale Invoice #${invoiceNumber || 'Manual'}`,
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
