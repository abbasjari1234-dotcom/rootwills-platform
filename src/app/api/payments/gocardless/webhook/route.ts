import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
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
