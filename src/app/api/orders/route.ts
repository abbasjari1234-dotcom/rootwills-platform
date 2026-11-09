import { NextRequest, NextResponse } from 'next/server';
import { WholesaleOrder } from '@/lib/orders';

// In-memory runtime cache for recently placed orders so Ops desk can see them immediately
let recentOrdersStore: WholesaleOrder[] = [];

export async function GET() {
  return NextResponse.json({ orders: recentOrdersStore });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one wholesale product line.' },
        { status: 400 }
      );
    }

    if (!body.venueName || !body.contactName || !body.phone) {
      return NextResponse.json(
        { error: 'Venue name, chef contact name, and telephone are required.' },
        { status: 400 }
      );
    }

    const orderId = body.id || `RW-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: WholesaleOrder = {
      id: orderId,
      status: 'Received',
      createdAt: new Date().toISOString(),
      deliveryDate: body.deliveryDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      deliveryWindow: body.deliveryWindow || '04:00 – 07:30 AM (Pre-Dawn)',
      venueName: String(body.venueName).trim(),
      contactName: String(body.contactName).trim(),
      phone: String(body.phone).trim(),
      email: String(body.email || '').trim(),
      address: String(body.address || '').trim(),
      postcode: String(body.postcode || '').trim().toUpperCase(),
      dropoffNotes: String(body.dropoffNotes || '').trim(),
      poNumber: body.poNumber ? String(body.poNumber).trim() : undefined,
      paymentMethod: body.paymentMethod || '30-Day Credit Account',
      items: body.items,
      totalCases: body.totalCases || body.items.reduce((acc: number, it: any) => acc + (it.qty || 0), 0),
      totalLines: body.items.length,
    };

    // Prepend to runtime store
    recentOrdersStore = [newOrder, ...recentOrdersStore.slice(0, 49)];

    // Send dispatch notification email to Rootwills night logistics desk
    try {
      const itemsListFormatted = newOrder.items
        .map((it, idx) => `${idx + 1}. [${it.sku}] ${it.name} (${it.packSize}) — ${it.qty} case(s)`)
        .join('\n');

      const emailPayload = {
        _subject: `New Rootwills Wholesale Order: ${newOrder.id} - ${newOrder.venueName}`,
        OrderID: newOrder.id,
        VenueName: newOrder.venueName,
        ChefContact: newOrder.contactName,
        Phone: newOrder.phone,
        Email: newOrder.email,
        DeliveryAddress: `${newOrder.address}, ${newOrder.postcode}`,
        DeliveryDate: newOrder.deliveryDate,
        DeliveryWindow: newOrder.deliveryWindow,
        KeycodeInstructions: newOrder.dropoffNotes || 'None specified',
        PONumber: newOrder.poNumber || 'None',
        PaymentTerms: newOrder.paymentMethod,
        TotalCases: newOrder.totalCases,
        TotalLines: newOrder.totalLines,
        ItemsManifest: itemsListFormatted,
        _template: 'table',
        _captcha: 'false',
      };

      await fetch('https://formsubmit.co/ajax/sales@rootwills.co.uk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(emailPayload),
      }).catch(() => null);
    } catch {
      // Non-blocking email dispatch failure
    }

    return NextResponse.json({
      success: true,
      message: 'Wholesale order submitted successfully.',
      order: newOrder,
    });
  } catch (error: any) {
    console.error('Order submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process wholesale order. Please try again.' },
      { status: 500 }
    );
  }
}
