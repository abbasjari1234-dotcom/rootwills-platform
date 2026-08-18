import { NextRequest, NextResponse } from 'next/server';
import { queryAIAssistant } from '@/actions/ai';
import { getClientIp, checkRateLimit, RATE_LIMIT_PRESETS } from '@/lib/security/rate-limit';

export async function POST(req: NextRequest) {
  // 1. IP Rate Limiting
  const ip = getClientIp(req);
  const ipLimit = checkRateLimit(`api_ai_${ip}`, RATE_LIMIT_PRESETS.AI_MINUTE);

  if (!ipLimit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Rate limit exceeded.', code: 'RATE_LIMIT_EXCEEDED' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const result = await queryAIAssistant({
      prompt: body.prompt || '',
      organizationId: body.organizationId,
      userId: body.userId || ip,
    });

    if (!result.ok) {
      const statusCode = result.error === 'AI_DISABLED_BY_ADMIN' ? 503 : 400;
      return NextResponse.json(result, { status: statusCode });
    }

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body format.', code: 'MALFORMED_REQUEST' },
      { status: 400 }
    );
  }
}
