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

    if (!body.name || !body.email || !body.phone || !body.company || !body.postcode) {
      return NextResponse.json(
        { error: 'Name, email, phone, company, and postcode are required.' },
        { status: 400 }
      );
    }

    const orderId = body.id || `RW-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: WholesaleOrder = {
      id: orderId,
      status: 'Received',
      createdAt: new Date().toISOString(),
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone).trim(),
      jobTitle: String(body.jobTitle || 'Chef / Buyer').trim(),
      company: String(body.company).trim(),
      numberOfSites: String(body.numberOfSites || '1').trim(),
      postcode: String(body.postcode).trim().toUpperCase(),
      currentSupplier: body.currentSupplier ? String(body.currentSupplier).trim() : undefined,
      approxWeeklyDeliveries: body.approxWeeklyDeliveries ? String(body.approxWeeklyDeliveries).trim() : undefined,
      approxWeeklySpend: body.approxWeeklySpend ? String(body.approxWeeklySpend).trim() : undefined,
      message: body.message ? String(body.message).trim() : undefined,
      marketingEmail: Boolean(body.marketingEmail),
      marketingSms: Boolean(body.marketingSms),
      items: Array.isArray(body.items) ? body.items : [],
      totalCases: body.totalCases || (Array.isArray(body.items) ? body.items.reduce((acc: number, it: any) => acc + (it.qty || 0), 0) : 0),
      totalLines: Array.isArray(body.items) ? body.items.length : 0,
    };

    // Prepend to runtime store
    recentOrdersStore = [newOrder, ...recentOrdersStore.slice(0, 49)];

    // Send dispatch notification email to Rootwills night logistics desk
    try {
      const itemsListFormatted = newOrder.items.length > 0
        ? newOrder.items
            .map((it, idx) => `${idx + 1}. [${it.sku}] ${it.name} (${it.packSize}) — ${it.qty} case(s)`)
            .join('\n')
        : 'Customer registration / onboarding without pre-selected items';

      const emailPayload = {
        _subject: `New Rootwills Customer Application: ${newOrder.id} - ${newOrder.company}`,
        OrderID: newOrder.id,
        Name: newOrder.name,
        Email: newOrder.email,
        Phone: newOrder.phone,
        JobTitle: newOrder.jobTitle,
        Company: newOrder.company,
        NumberOfSites: newOrder.numberOfSites,
        Postcode: newOrder.postcode,
        CurrentSupplier: newOrder.currentSupplier || 'Not specified',
        ApproxWeeklyDeliveries: newOrder.approxWeeklyDeliveries || 'Not specified',
        ApproxWeeklySpend: newOrder.approxWeeklySpend || 'Not specified',
        Message: newOrder.message || 'None',
        MarketingEmail: newOrder.marketingEmail ? 'Yes' : 'No',
        MarketingSMS: newOrder.marketingSms ? 'Yes' : 'No',
        TotalCases: newOrder.totalCases,
        TotalLines: newOrder.totalLines,
        ItemsManifest: itemsListFormatted,
        _template: 'table',
        _captcha: 'false',
      };

      const origin = req.headers.get('origin') || 'https://www.rootwills.co.uk';
      const referer = req.headers.get('referer') || 'https://www.rootwills.co.uk/direct';

      await fetch('https://formsubmit.co/ajax/sales@rootwills.co.uk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: origin,
          Referer: referer,
        },
        body: JSON.stringify(emailPayload),
      }).catch((err) => console.error('FormSubmit delivery error:', err));
    } catch (mailErr) {
      console.error('Mail dispatch error:', mailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Wholesale customer application and order received.',
      order: newOrder,
    });
  } catch (error: any) {
    console.error('Customer submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process application. Please try again.' },
      { status: 500 }
    );
  }
}
