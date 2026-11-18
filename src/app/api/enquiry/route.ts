import { NextRequest, NextResponse } from 'next/server';
import { sendGeneralEnquiryEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = (body.name || body.Name || '').trim();
    const email = (body.email || body.Email || '').trim();
    const phone = (body.phone || body.Phone || '').trim();
    const business = (body.business || body.Business || body.company || body.Company || '').trim();
    const sector = (body.sector || body.Sector || '').trim();
    const subject = (body.subject || body.Subject || body._subject || 'Wholesale Supply Enquiry').trim();
    const message = (body.message || body.Message || body.notes || body.Notes || '').trim();
    const source = (body.source || body.Source || 'Rootwills Web Portal').trim();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required.' },
        { status: 400 }
      );
    }

    // 1. Primary Delivery: High-Speed Resend API
    try {
      const resendResult = await sendGeneralEnquiryEmail({
        name,
        email,
        phone,
        business,
        sector,
        subject,
        message,
        source,
      });

      if (resendResult.success) {
        return NextResponse.json({
          success: true,
          method: 'resend',
          messageId: resendResult.messageId,
        });
      }
      console.warn('[Enquiry API] Resend returned non-success, trying FormSubmit fallback:', resendResult.reason || resendResult.error);
    } catch (resendErr: any) {
      console.error('[Enquiry API] Resend exception, falling back to FormSubmit:', resendErr?.message);
    }

    // 2. Secondary Fallback: FormSubmit
    const origin = req.headers.get('origin') || 'https://www.rootwills.co.uk';
    const referer = req.headers.get('referer') || 'https://www.rootwills.co.uk/contact';

    const fallbackResponse = await fetch('https://formsubmit.co/ajax/sales@rootwills.co.uk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: origin,
        Referer: referer,
      },
      body: JSON.stringify(body),
    });

    const data = await fallbackResponse.json().catch(() => ({ success: fallbackResponse.ok }));
    return NextResponse.json({ ...data, method: 'formsubmit' }, { status: fallbackResponse.ok ? 200 : 500 });
  } catch (error: any) {
    console.error('[Enquiry API Error]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process enquiry' },
      { status: 500 }
    );
  }
}
