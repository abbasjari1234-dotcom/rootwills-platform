'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { requireProfile, assertRole } from '@/lib/auth';
import { resolvePrice, buildTieringMap } from '@/lib/pricing';
import { revalidatePath } from 'next/cache';

const VAT_RATE = 0.2;

const placeOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        qty: z.coerce.number().int().positive(),
      })
    )
    .min(1, 'Add at least one item before checking out.'),
  isStandingOrder: z.boolean().default(false),
  recurrence: z.enum(['weekly', 'fortnightly', 'monthly']).nullable().default(null),
  deliverySlot: z.string().datetime().nullable().default(null),
  notes: z.string().max(500).optional(),
});
export type PlaceOrderInput = z.infer<typeof placeOrderSchema>;

type PlaceOrderResult =
  | { ok: true; orderId: string; total: number }
  | { ok: false; error: string };

const RECURRENCE_RRULE: Record<string, string> = {
  weekly: 'FREQ=WEEKLY',
  fortnightly: 'FREQ=WEEKLY;INTERVAL=2',
  monthly: 'FREQ=MONTHLY',
};

export async function placeOrder(rawInput: PlaceOrderInput): Promise<PlaceOrderResult> {
  const profile = await requireProfile();
  // Finance-only accounts can view but shouldn't be placing orders.
  assertRole(profile, ['admin', 'purchaser']);

  const parsed = placeOrderSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { ok: false, error: 'Your order details were invalid. Please review and try again.' };
  }
  const input = parsed.data;

  const supabase = await createClient();

  // ---------- Re-resolve every price and MOQ server-side --------------------
  // The cart's client-side prices are a UX convenience only; the source of
  // truth is always recalculated here against live product + tiering data.
  const productIds = input.items.map((i) => i.productId);
  const { data: products } = await supabase
    .from('products')
    .select('id, sku, name, moq, base_price, active')
    .in('id', productIds);

  const { data: tiering } = await supabase
    .from('tiered_pricing')
    .select('product_id, discount_percent, override_price')
    .eq('organization_id', profile.organizationId)
    .in('product_id', productIds);

  const tieringMap = buildTieringMap(tiering ?? []);
  const productMap = new Map((products ?? []).map((p) => [p.id, p]));

  const resolvedItems: { productId: string; qty: number; unitPrice: number }[] = [];

  for (const item of input.items) {
    const product = productMap.get(item.productId);
    if (!product || !product.active) {
      return { ok: false, error: `One of the items in your cart is no longer available.` };
    }
    if (item.qty < product.moq) {
      return {
        ok: false,
        error: `${product.name} requires a minimum order quantity of ${product.moq}.`,
      };
    }
    const unitPrice = resolvePrice(product, tieringMap.get(item.productId));
    resolvedItems.push({ productId: item.productId, qty: item.qty, unitPrice });
  }

  const subtotal = resolvedItems.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
  const vatTotal = Math.round(subtotal * VAT_RATE * 100) / 100;
  const total = Math.round((subtotal + vatTotal) * 100) / 100;

  // ---------- Trade credit check --------------------------------------------
  const { data: creditAccount } = await supabase
    .from('trade_credit_accounts')
    .select('credit_limit, credit_used')
    .eq('organization_id', profile.organizationId)
    .single();

  if (creditAccount) {
    const available = creditAccount.credit_limit - creditAccount.credit_used;
    if (total > available) {
      return {
        ok: false,
        error: `This order (£${total.toFixed(2)}) exceeds your available trade credit (£${available.toFixed(2)}). Contact your account manager to increase your limit.`,
      };
    }
  }

  // ---------- Fetch the organization's depot for the order ------------------
  const { data: org } = await supabase
    .from('organizations')
    .select('depot_id')
    .eq('id', profile.organizationId)
    .single();

  // ---------- Insert order + items -------------------------------------------
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      organization_id: profile.organizationId,
      placed_by: profile.id,
      depot_id: org?.depot_id ?? null,
      status: 'submitted',
      delivery_slot: input.deliverySlot,
      is_standing_order: input.isStandingOrder,
      recurrence_rule: input.isStandingOrder && input.recurrence ? RECURRENCE_RRULE[input.recurrence] : null,
      notes: input.notes || null,
      subtotal,
      vat_total: vatTotal,
      total,
    })
    .select('id')
    .single();

  if (orderError || !order) {
    console.error('Order insert failed:', orderError);
    return { ok: false, error: 'We could not place your order. Please try again.' };
  }

  const orderItemsPayload = resolvedItems.map((i) => ({
    order_id: order.id,
    product_id: i.productId,
    qty: i.qty,
    unit_price: i.unitPrice,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItemsPayload);

  if (itemsError) {
    console.error('Order items insert failed:', itemsError);
    // The order row exists but items failed — surface this distinctly so
    // it can be reconciled manually rather than silently under-billing.
    return { ok: false, error: 'Your order was started but not all items saved. Please contact us to confirm.' };
  }

  // ---------- Update credit usage ---------------------------------------------
  if (creditAccount) {
    await supabase
      .from('trade_credit_accounts')
      .update({ credit_used: creditAccount.credit_used + total, updated_at: new Date().toISOString() })
      .eq('organization_id', profile.organizationId);
  }

  revalidatePath('/orders');
  revalidatePath('/dashboard');

  return { ok: true, orderId: order.id, total };
}
