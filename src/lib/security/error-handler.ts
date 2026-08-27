import { NextResponse } from 'next/server';

/**
 * Standardized Safe Error Handler for API Route Handlers
 * Prevents stack trace, query structure, and path disclosure to clients.
 * Generates an opaque correlation ID (requestId) for tracing.
 */
export function createSafeErrorResponse(
  error: unknown,
  status = 500,
  userFriendlyMessage?: string
): NextResponse {
  const requestId = `req_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;

  // Log full error details securely on the server with correlation ID
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;
  
  console.error(`[API Error | RequestID: ${requestId} | Status: ${status}]`, {
    message: errorMessage,
    stack: errorStack,
  });

  // Client gets only sanitized message and tracking correlation ID
  const safeMessage =
    userFriendlyMessage ||
    (status === 401
      ? 'Unauthorized: Valid credentials required.'
      : status === 403
      ? 'Forbidden: You do not have permission to access this resource.'
      : status === 404
      ? 'Resource not found.'
      : status === 429
      ? 'Too many requests. Please slow down.'
      : 'An unexpected error occurred. Please try again or contact support.');

  return NextResponse.json(
    {
      ok: false,
      error: safeMessage,
      requestId,
    },
    { status }
  );
}
