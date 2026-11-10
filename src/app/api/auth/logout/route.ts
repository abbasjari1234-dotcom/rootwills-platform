import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Signed out successfully' });

  // Clear authentication cookies
  response.cookies.delete('rootwills_auth');
  response.cookies.delete('rootwills_account_id');
  response.cookies.delete('rootwills_account_company');

  return response;
}

export async function GET() {
  return POST();
}

