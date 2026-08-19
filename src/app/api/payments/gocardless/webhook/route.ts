import { NextResponse, type NextRequest } from 'next/server';
import crypto from 'crypto';
import { createServiceRoleClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.GOCARDLESS_WEBHOOK_SECRET;
  const isProduction = process.env.NODE_ENV === 'production';

  try {
    const payload = await request.text();
    const signature = request.headers.get('webhook-signature');

    if (webhookSecret || isProduction) {
      if (!webhookSecret) {
        console.error('GoCardless webhook secret missing in production environment.');
        return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
      }

      if (!signature) {
        return NextResponse.json({ error: 'Missing Webhook-Signature header' }, { status: 400 });
      }

      const calculatedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(payload)
        .digest('hex');

      const expectedBuffer = Buffer.from(calculatedSignature, 'utf8');
      const receivedBuffer = Buffer.from(signature, 'utf8');

      if (
        expectedBuffer.length !== receivedBuffer.length ||
        !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
      ) {
        console.error('GoCardless webhook signature verification failed.');
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const eventData = JSON.parse(payload);
    const events = eventData?.events || [];

    for (const event of events) {
      console.log(`[GoCardless Webhook] Received ${event.resource_type}.${event.action}`);

      // Handle Confirmed Payment Collection
      if (event.resource_type === 'payments' && (event.action === 'confirmed' || event.action === 'paid_out')) {
        const paymentId = event.links?.payment;
        console.log(`[GoCardless Webhook] Payment ${paymentId} settled successfully.`);
      }

      // Handle Mandate Activation
      if (event.resource_type === 'mandates' && (event.action === 'active' || event.action === 'created')) {
        const mandateId = event.links?.mandate;
        console.log(`[GoCardless Webhook] Mandate ${mandateId} is now active.`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('GoCardless webhook error:', err);
    return NextResponse.json({ error: err?.message || 'Webhook processing failed' }, { status: 500 });
  }
}

