import { NextRequest, NextResponse } from 'next/server';
import { WholesaleOrder } from '@/lib/orders';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/security/auth-guard';
import { handleApiError } from '@/lib/security/error-handler';
import { saveLeadToSupabase, getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { sendApplicationEmails } from '@/lib/email';

// In-memory runtime cache for recently placed orders
let recentOrdersStore: WholesaleOrder[] = [];

// GET: Operational order inspection (Strictly locked to authorized staff)
export async function GET(req: NextRequest) {
  const authCheck = verifyAdminAuth(req);
  if (!authCheck.authorized) {
    return unauthorizedResponse(authCheck.reason);
  }

  // Fetch persisted leads from Supabase to merge with recentOrdersStore
  const supabase = getSupabaseAdmin();
  let dbOrders: WholesaleOrder[] = [];

  if (supabase) {
    try {
      const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && Array.isArray(leads)) {
        dbOrders = leads.map((lead: any) => {
          let parsedNotes: any = {};
          try {
            parsedNotes = typeof lead.notes === 'string' ? JSON.parse(lead.notes) : lead.notes || {};
          } catch {
            parsedNotes = {};
          }

          return {
            id: parsedNotes.orderId || `RW-LEAD-${lead.id.slice(0, 8).toUpperCase()}`,
            status: lead.status === 'contacted' ? 'Approved' : 'Received',
            createdAt: lead.created_at || new Date().toISOString(),
            name: lead.contact_name || 'Chef / Buyer',
            email: lead.email || '',
            phone: lead.phone || '',
            jobTitle: parsedNotes.jobTitle || 'Chef / Buyer',
            company: lead.company_name || 'Hospitality Venue',
            numberOfSites: parsedNotes.numberOfSites || '1',
            postcode: lead.postcode || 'B5 6EU',
            currentSupplier: parsedNotes.currentSupplier,
            approxWeeklyDeliveries: parsedNotes.approxWeeklyDeliveries,
            approxWeeklySpend: parsedNotes.approxWeeklySpend || (lead.estimated_spend ? `£${lead.estimated_spend}` : undefined),
            message: parsedNotes.message,
            marketingEmail: Boolean(parsedNotes.marketingEmail),
            marketingSms: Boolean(parsedNotes.marketingSms),
            items: Array.isArray(parsedNotes.items) ? parsedNotes.items : [],
            totalCases: parsedNotes.totalCases || 0,
            totalLines: Array.isArray(parsedNotes.items) ? parsedNotes.items.length : 0,
            subtotalNet: parsedNotes.subtotalNet || (typeof lead.estimated_spend === 'number' ? lead.estimated_spend : undefined),
            vatTotal: parsedNotes.vatTotal,
            grandTotal: parsedNotes.grandTotal,
            accountTier: parsedNotes.accountTier || 'Trade Standard',
          };
        });
      }
    } catch (err) {
      console.error('[Supabase GET Orders Error]', err);
    }
  }

  // Merge unique orders
  const seenIds = new Set<string>();
  const combined: WholesaleOrder[] = [];

  for (const ord of [...recentOrdersStore, ...dbOrders]) {
    if (ord && ord.id && !seenIds.has(ord.id)) {
      seenIds.add(ord.id);
      combined.push(ord);
    }
  }

  return NextResponse.json({ orders: combined });
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
      email: String(body.email).trim().toLowerCase(),
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
      subtotalNet: typeof body.subtotalNet === 'number' ? body.subtotalNet : undefined,
      vatTotal: typeof body.vatTotal === 'number' ? body.vatTotal : undefined,
      grandTotal: typeof body.grandTotal === 'number' ? body.grandTotal : undefined,
      accountTier: body.accountTier ? String(body.accountTier) : undefined,
    };

    // 1. Immediately persist to Supabase `leads` table so it NEVER gets lost
    try {
      await saveLeadToSupabase({
        company: newOrder.company,
        name: newOrder.name,
        email: newOrder.email,
        phone: newOrder.phone,
        postcode: newOrder.postcode,
        jobTitle: newOrder.jobTitle,
        numberOfSites: newOrder.numberOfSites,
        currentSupplier: newOrder.currentSupplier,
        approxWeeklyDeliveries: newOrder.approxWeeklyDeliveries,
        approxWeeklySpend: newOrder.approxWeeklySpend,
        message: newOrder.message,
        marketingEmail: newOrder.marketingEmail,
        marketingSms: newOrder.marketingSms,
        items: newOrder.items,
        totalCases: newOrder.totalCases,
        subtotalNet: newOrder.subtotalNet,
        vatTotal: newOrder.vatTotal,
        grandTotal: newOrder.grandTotal,
        accountTier: newOrder.accountTier,
        orderId: newOrder.id,
      });
    } catch (dbErr) {
      console.error('[Supabase Persistence Warning]', dbErr);
    }

    // 2. Prepend to runtime store for fast local responses
    recentOrdersStore = [newOrder, ...recentOrdersStore.slice(0, 49)];

    // 3. Send automated transactional confirmation emails (via Resend if configured)
    sendApplicationEmails({
      applicantName: newOrder.name,
      applicantEmail: newOrder.email,
      company: newOrder.company,
      phone: newOrder.phone,
      postcode: newOrder.postcode,
      orderRef: newOrder.id,
      accountTier: newOrder.accountTier,
      approxWeeklySpend: newOrder.approxWeeklySpend,
      itemsCount: newOrder.totalCases,
    }).catch((err) => console.error('[Email Dispatch Notice]', err));

    // 4. Secondary webhook fallback to FormSubmit
    try {
      const itemsListFormatted = newOrder.items.length > 0
        ? newOrder.items
            .map((it: any, idx: number) => {
              const priceText = it.unitPrice ? ` @ £${it.unitPrice.toFixed(2)} = £${(it.linePrice || it.unitPrice * it.qty).toFixed(2)}` : '';
              return `${idx + 1}. [${it.sku}] ${it.name} (${it.packSize}) — ${it.qty} case(s)${priceText}`;
            })
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
        'Account Tier': newOrder.accountTier || 'Trade Standard',
        'Current Supplier': newOrder.currentSupplier || 'Not specified',
        'Approx Weekly Deliveries': newOrder.approxWeeklyDeliveries || 'Not specified',
        'Approx Weekly Budget / Spend': newOrder.approxWeeklySpend || 'Not specified',
        'Applicant Message': newOrder.message || 'None provided',
        'Goods Net Total': newOrder.subtotalNet ? `£${newOrder.subtotalNet.toFixed(2)}` : 'Trade Contract Quote',
        'Estimated VAT (0% Food / 20% Non-food)': newOrder.vatTotal ? `£${newOrder.vatTotal.toFixed(2)}` : '£0.00 (Zero-Rated Food)',
        'Grand Invoice Total': newOrder.grandTotal ? `£${newOrder.grandTotal.toFixed(2)}` : 'Pending Dispatch Terms',
        'Marketing Consent (Email)': newOrder.marketingEmail ? 'Yes, consented' : 'No',
        'Marketing Consent (SMS)': newOrder.marketingSms ? 'Yes, consented' : 'No',
        'Total Order Items': `${newOrder.totalCases} case(s) across ${newOrder.totalLines} line(s)`,
        'Selected Lines Manifest': itemsListFormatted,
        _template: 'table',
        _captcha: 'false',
      };

      const origin = req.headers.get('origin') || 'https://www.rootwills.co.uk';
      const referer = req.headers.get('referer') || 'https://www.rootwills.co.uk/direct';

      fetch('https://formsubmit.co/ajax/sales@rootwills.co.uk', {
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
