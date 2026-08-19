import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const startTime = Date.now();
  const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const isRealSupabase =
    rawSupabaseUrl.length > 0 &&
    !rawSupabaseUrl.includes('placeholder') &&
    (rawSupabaseUrl.includes('supabase.co') || rawSupabaseUrl.startsWith('http'));

  let dbStatus = isRealSupabase ? 'connected' : 'sandbox_mock';
  let dbLatencyMs: number | null = null;

  if (isRealSupabase) {
    try {
      const dbStart = Date.now();
      const supabase = createClient();
      const { error } = await supabase.from('products').select('id').limit(1);
      dbLatencyMs = Date.now() - dbStart;
      if (error) {
        dbStatus = 'degraded';
      }
    } catch {
      dbStatus = 'unreachable';
    }
  }

  const memoryUsage = process.memoryUsage ? process.memoryUsage() : null;

  return NextResponse.json(
    {
      status: dbStatus === 'unreachable' ? 'degraded' : 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production',
      services: {
        api: 'operational',
        database: dbStatus,
        dbLatencyMs,
        aiGateway: process.env.AI_ENABLED !== 'false' ? 'enabled' : 'maintenance',
      },
      system: {
        nodeVersion: process.version,
        uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
        memory: memoryUsage
          ? {
              heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
              heapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024),
              rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
            }
          : undefined,
      },
      responseTimeMs: Date.now() - startTime,
    },
    { status: dbStatus === 'unreachable' ? 503 : 200 }
  );
}
