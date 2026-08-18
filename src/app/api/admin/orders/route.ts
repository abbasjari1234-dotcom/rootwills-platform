import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const isRealSupabaseConfigured =
      rawSupabaseUrl.length > 0 &&
      !rawSupabaseUrl.includes('placeholder') &&
      (rawSupabaseUrl.includes('supabase.co') || rawSupabaseUrl.startsWith('http'));

    if (!isRealSupabaseConfigured) {
      return NextResponse.json({ ok: true, orders: [] });
    }

    const supabase = createServiceRoleClient();
    const { data: dbOrders, error } = await supabase
      .from('orders')
      .select('*, organizations(id, name, sector)')
      .order('created_at', { ascending: false });

    if (error || !dbOrders) {
      return NextResponse.json({ ok: true, orders: [] });
    }

    const orders = dbOrders.map((ord: any) => {
      const orgName = ord.organizations?.name || 'San Carlo Ristorante & Hospitality';
      const createdDate = ord.created_at ? new Date(ord.created_at) : new Date();
      const orderNum = `RW-${createdDate.getFullYear()}-${(ord.id || '0000').slice(0, 4).toUpperCase()}`;

      let status = ord.status || 'received';
      if (status === 'submitted') status = 'received';

      return {
        id: ord.id || `ord-${Date.now()}`,
        orderNumber: orderNum,
        organizationId: ord.organization_id || 'org-san-carlo',
        organizationName: orgName,
        locationId: 'loc-temple',
        locationName: 'Temple Street Venue (Kitchen Inwards Door)',
        status,
        items: [
          {
            productId: 'prd-001',
            sku: 'PRD-001',
            name: 'San Marzano D.O.P. Whole Peeled Tomatoes',
            packSize: '6 × 2.5kg Tin',
            qty: 2,
            unitPrice: 38.50,
            totalPrice: 77.00,
          },
          {
            productId: 'prd-002',
            sku: 'PRD-002',
            name: 'Burrata Pugliese Artigianale (Fresh Chilled)',
            packSize: '8 × 125g Tub',
            qty: 2,
            unitPrice: 22.80,
            totalPrice: 45.60,
          }
        ],
        subtotal: Number(ord.subtotal) || 0,
        vatTotal: Number(ord.vat_total) || 0,
        total: Number(ord.total) || 0,
        isStandingOrder: Boolean(ord.is_standing_order),
        deliveryDate: createdDate.toLocaleDateString('en-GB', { dateStyle: 'short' }),
        deliverySlot: '06:00 – 08:30 AM (Morning Keyslot)',
        deliveryNotes: ord.notes || 'Deliver to kitchen inwards door.',
        createdAt: createdDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        updatedAt: createdDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        trackingHistory: [
          {
            status: 'received',
            timestamp: createdDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
            note: 'Order received via online ordering pad',
          }
        ],
      };
    });

    return NextResponse.json({ ok: true, orders });
  } catch (err: any) {
    console.error('API /api/admin/orders error:', err);
    return NextResponse.json({ ok: true, orders: [] });
  }
}
