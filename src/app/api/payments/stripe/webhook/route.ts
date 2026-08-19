import { NextResponse, type NextRequest } from 'next/server';
import { stripe } from '@/lib/payments/stripe';
import { createServiceRoleClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const isProduction = process.env.NODE_ENV === 'production';

  try {
    const payload = await request.text();
    let event: any;

    if (stripe || webhookSecret || isProduction) {
      if (!webhookSecret || !stripe) {
        console.error('Stripe webhook misconfiguration: Missing STRIPE_WEBHOOK_SECRET or STRIPE_SECRET_KEY in server environment.');
        return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
      }

      const signature = request.headers.get('stripe-signature');
      if (!signature) {
        return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
      }

      try {
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    } else {
      // Local development / mock sandbox only
      console.warn('Stripe Webhook running in insecure mock mode — DO NOT USE IN PRODUCTION');
      try {
        event = JSON.parse(payload);
      } catch {
        return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
      }
    }

    // Handle PaymentIntent Success
    if (event.type === 'payment_intent.succeeded' || event.type === 'charge.succeeded') {
      const paymentIntent = event.data.object;
      const { invoiceId, invoiceNumber } = paymentIntent.metadata || {};

      console.log(`[Stripe Webhook] Payment succeeded for Invoice #${invoiceNumber || invoiceId}`);

      try {
        const supabase = createServiceRoleClient();
        if (invoiceId) {
          await supabase
            .from('invoices')
            .update({ status: 'paid' })
            .eq('id', invoiceId);
        }
      } catch (dbErr) {
        console.error('Failed to update invoice in database:', dbErr);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Stripe webhook error:', err);
    return NextResponse.json({ error: err?.message || 'Webhook processing failed' }, { status: 500 });
  }
}

