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
        _subject: `New Rootwills Customer Application: ${newOrder.company} (${newOrder.id})`,
        'Application Ref': newOrder.id,
        'Company / Venue': newOrder.company,
        'Contact Name': newOrder.name,
        'Job Title': newOrder.jobTitle,
        'Direct Phone': newOrder.phone,
        'Email Address': newOrder.email,
        'Number of Sites': newOrder.numberOfSites,
        'Delivery Postcode': newOrder.postcode,
        'Current Supplier': newOrder.currentSupplier || 'Not specified',
        'Approx Weekly Deliveries': newOrder.approxWeeklyDeliveries || 'Not specified',
        'Approx Weekly Budget / Spend': newOrder.approxWeeklySpend || 'Not specified',
        'Applicant Message': newOrder.message || 'None provided',
        'Marketing Consent (Email)': newOrder.marketingEmail ? 'Yes, consented' : 'No',
        'Marketing Consent (SMS)': newOrder.marketingSms ? 'Yes, consented' : 'No',
        'Total Order Items': `${newOrder.totalCases} case(s) across ${newOrder.totalLines} line(s)`,
        'Selected Lines Manifest': itemsListFormatted,
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
