import { NextResponse, type NextRequest } from 'next/server';
import { stripe } from '@/lib/payments/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const payload = await request.text();
    let event: any;

    if (stripe && webhookSecret) {
      const signature = request.headers.get('stripe-signature');
      if (!signature) {
        return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 });
      }
      try {
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    } else {
      // Sandbox fallback parsing
      event = JSON.parse(payload);
    }

    // Handle PaymentIntent Success
    if (event.type === 'payment_intent.succeeded' || event.type === 'charge.succeeded') {
      const paymentIntent = event.data.object;
      const { invoiceId, invoiceNumber, organizationId } = paymentIntent.metadata || {};

      console.log(`[Stripe Webhook] Payment succeeded for Invoice #${invoiceNumber || invoiceId}`);

      try {
        const supabase = createClient();
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
