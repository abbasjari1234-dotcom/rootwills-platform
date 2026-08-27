/**
 * Environment Variable Validation & Production Readiness Checker
 * Ensures all required environment variables are configured with valid formats.
 */

export interface EnvValidationResult {
  valid: boolean;
  missingRequired: string[];
  warnings: string[];
}

export function validateEnvironment(): EnvValidationResult {
  const isProduction = process.env.NODE_ENV === 'production';
  const missingRequired: string[] = [];
  const warnings: string[] = [];

  // 1. Critical Supabase Cloud Credentials
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  const supabaseAnonKey = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    ''
  ).trim();
  const supabaseServiceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

  if (!supabaseUrl || supabaseUrl.includes('your-project-ref')) {
    if (isProduction) {
      missingRequired.push('NEXT_PUBLIC_SUPABASE_URL (Must be a valid https://*.supabase.co URL in production)');
    } else {
      warnings.push('NEXT_PUBLIC_SUPABASE_URL is not configured; running in local sandbox/demo mode.');
    }
  }

  if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key') {
    if (isProduction) {
      missingRequired.push('NEXT_PUBLIC_SUPABASE_ANON_KEY (Required for client-side queries)');
    } else {
      warnings.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or placeholder.');
    }
  }

  if (!supabaseServiceKey || supabaseServiceKey === 'your_supabase_service_role_key') {
    if (isProduction) {
      missingRequired.push('SUPABASE_SERVICE_ROLE_KEY (Required for privileged server actions)');
    } else {
      warnings.push('SUPABASE_SERVICE_ROLE_KEY is missing or placeholder.');
    }
  }

  // 2. Email Service (Resend)
  const resendApiKey = (process.env.RESEND_API_KEY || '').trim();
  if (!resendApiKey || resendApiKey.startsWith('re_placeholder') || resendApiKey === 're_your_resend_api_key') {
    warnings.push('RESEND_API_KEY is not configured; transactional emails will be simulated in server logs.');
  }

  // 3. Payment Gateways (Stripe & GoCardless)
  const stripeSecretKey = (process.env.STRIPE_SECRET_KEY || '').trim();
  if (!stripeSecretKey || stripeSecretKey.includes('your_stripe_secret_key')) {
    warnings.push('STRIPE_SECRET_KEY is not configured; card checkout will run in simulated demo mode.');
  }

  const gocardlessToken = (process.env.GOCARDLESS_ACCESS_TOKEN || '').trim();
  if (!gocardlessToken || gocardlessToken.includes('your_gocardless_token')) {
    warnings.push('GOCARDLESS_ACCESS_TOKEN is not configured; BACS Direct Debit will run in demo mode.');
  }

  // 4. Database Connection String (Postgres / Prisma)
  const dbUrl = (process.env.DATABASE_URL || '').trim();
  if (dbUrl && !dbUrl.includes('sslmode=') && isProduction) {
    warnings.push('DATABASE_URL does not explicitly contain ?sslmode=require for production TLS.');
  }

  const valid = missingRequired.length === 0;

  if (!valid && isProduction) {
    const errorMsg = `[CRITICAL ENVIRONMENT ERROR] Rootwills cannot start in production mode due to missing required variables:\n${missingRequired.map((v) => ` - ${v}`).join('\n')}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  return {
    valid,
    missingRequired,
    warnings,
  };
}

export const env = {
  isProduction: process.env.NODE_ENV === 'production',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rootwills.co.uk',
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  ai: {
    enabled: process.env.AI_ENABLED !== 'false',
    maxInputLength: Number(process.env.AI_MAX_INPUT_LENGTH) || 1000,
  },
};
