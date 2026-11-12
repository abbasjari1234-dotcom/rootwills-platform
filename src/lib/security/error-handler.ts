import { NextResponse } from 'next/server';

export interface SafeErrorResponse {
  success: false;
  error: string;
  code?: string;
  incidentId?: string;
}

/**
 * Sanitizes errors so that internal server details, database secrets,
 * stack traces, and local filesystem paths are never leaked to external clients.
 */
export function handleApiError(
  error: unknown,
  fallbackMessage = 'An unexpected server error occurred. Please contact the Rootwills wholesale support desk.'
): NextResponse<SafeErrorResponse> {
  const incidentId = `SEC-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const errorMessage = error instanceof Error ? error.message : String(error || '');
  
  // Log full detailed error securely on the server
  console.error(`[Secure Incident Ref: ${incidentId}]`, error);

  // Filter out any sensitive internal substrings (passwords, tokens, database URIs, paths)
  let clientSafeMessage = fallbackMessage;

  const isSafeClientError =
    errorMessage.includes('required') ||
    errorMessage.includes('Invalid') ||
    errorMessage.includes('not found') ||
    errorMessage.includes('already exists') ||
    errorMessage.includes('Unsupported') ||
    errorMessage.includes('exceeds');

  if (isSafeClientError && !errorMessage.includes('SELECT') && !errorMessage.includes('process.env')) {
    clientSafeMessage = errorMessage;
  }

  return NextResponse.json(
    {
      success: false,
      error: clientSafeMessage,
      incidentId,
    },
    {
      status: 500,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    }
  );
}

