import { NextRequest, NextResponse } from 'next/server';
import { registerApprovedTradeAccount, getAllTradeAccounts, TradeAccount } from '@/lib/tradeAuth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const accounts = getAllTradeAccounts();
  return NextResponse.json({ success: true, accounts });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, company, contactName, email, phone, postcode, plainPassword, tier } = body || {};

    if (!company || !email) {
      return NextResponse.json(
        { error: 'Company and Email are required to approve trade account.' },
        { status: 400 }
      );
    }

    const assignedId = id || `RW-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const assignedPassword = plainPassword || `Rootwills${new Date().getFullYear()}!`;

    const newTradeAccount: TradeAccount = {
      id: assignedId,
      company: String(company).trim(),
      contactName: String(contactName || 'Head Chef / Buyer').trim(),
      email: String(email).trim().toLowerCase(),
      tier: String(tier || 'Tier 1 Wholesale Direct').trim(),
      postcode: String(postcode || 'UK').trim().toUpperCase(),
      plainPassword: assignedPassword,
    };

    const registered = registerApprovedTradeAccount(newTradeAccount);

    // Build welcome message template
    const portalUrl = 'https://rootwillsdirect.co.uk';
    const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
    const welcomeText = `Hello ${newTradeAccount.contactName},\n\nYour commercial wholesale trade account for ${newTradeAccount.company} has been approved.\n\nDirect Ordering Portal: ${portalUrl}\nAccount ID: ${newTradeAccount.id}\nTemporary Password: ${newTradeAccount.plainPassword}\n\nYou can now sign in to view your bespoke contract pricing and place pre-dawn kitchen orders.`;

    const whatsappUrl = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(welcomeText)}`
      : `https://wa.me/?text=${encodeURIComponent(welcomeText)}`;

    return NextResponse.json({
      success: true,
      account: registered,
      credentials: {
        id: registered.id,
        password: assignedPassword,
        portalUrl,
        whatsappUrl,
        welcomeText,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to approve customer account' },
      { status: 500 }
    );
  }
}

