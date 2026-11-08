import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const origin = req.headers.get('origin') || 'https://www.rootwills.co.uk';
    const referer = req.headers.get('referer') || 'https://www.rootwills.co.uk/contact';

    const response = await fetch('https://formsubmit.co/ajax/sales@rootwills.co.uk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: origin,
        Referer: referer,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({ success: response.ok }));
    return NextResponse.json(data, { status: response.ok ? 200 : 500 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process enquiry' },
      { status: 500 }
    );
  }
}
