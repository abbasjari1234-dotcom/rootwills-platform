import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyTradeCredentials } from '@/lib/tradeAuth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password } = body || {};

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: 'Account ID or Email and Password are required.' },
        { status: 400 }
      );
    }

    const verification = verifyTradeCredentials(identifier, password);

    if (!verification.success || !verification.account) {
      return NextResponse.json(
        {
          success: false,
          error:
            verification.message ||
            'Invalid Account ID or Password. Only verified commercial accounts can sign in.',
        },
        { status: 401 }
      );
    }

    // Verified account - build successful response
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      account: verification.account,
    });

    // Set persistent session cookies so Next.js middleware and client recognize authentication
    response.cookies.set('rootwills_auth', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    response.cookies.set('rootwills_account_id', verification.account.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });

    response.cookies.set('rootwills_account_company', encodeURIComponent(verification.account.company), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });

    return response;
  } catch (error: any) {
    console.error('Trade login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal verification error. Please try again or contact support.' },
      { status: 500 }
    );
  }
}

