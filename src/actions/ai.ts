'use server';

import { checkRateLimit, RATE_LIMIT_PRESETS } from '@/lib/security/rate-limit';

export interface AIQueryPayload {
  prompt: string;
  organizationId?: string;
  userId?: string;
}

export interface AIProductSuggestion {
  productId: string;
  sku: string;
  name: string;
  qty: number;
  packSize: string;
  customerPrice: number;
}

export interface AIQueryResult {
  ok: boolean;
  message: string;
  suggestions?: AIProductSuggestion[];
  actionLabel?: string;
  error?: string;
  rateLimitInfo?: {
    remainingMinute: number;
    remainingDaily: number;
  };
}

/**
 * Server-Side AI Kitchen Assistant Action
 * Enforces prompt size limits, rate limiting, kill switch, and safe response formatting.
 */
export async function queryAIAssistant(
  payload: AIQueryPayload
): Promise<AIQueryResult> {
  // 1. Emergency Kill Switch Check
  if (process.env.AI_ENABLED === 'false') {
    return {
      ok: false,
      message: 'The AI Kitchen Assistant is temporarily undergoing scheduled maintenance.',
      error: 'AI_DISABLED_BY_ADMIN',
    };
  }

  // 2. Input Validation (Prompt Length & Content)
  const cleanPrompt = (payload.prompt || '').trim();
  if (!cleanPrompt) {
    return {
      ok: false,
      message: 'Please provide a prep request or menu item description.',
      error: 'EMPTY_PROMPT',
    };
  }

  const maxInputLength = parseInt(process.env.AI_MAX_INPUT_LENGTH || '1000', 10);
  if (cleanPrompt.length > maxInputLength) {
    return {
      ok: false,
      message: `Prompt exceeds maximum allowed length of ${maxInputLength} characters.`,
      error: 'PROMPT_TOO_LONG',
    };
  }

  // 3. Multi-Tier Rate Limiting (Per-Minute & Daily Quota)
  const identifier = payload.userId || payload.organizationId || 'guest_client';

  const minuteLimit = checkRateLimit(`ai_min_${identifier}`, RATE_LIMIT_PRESETS.AI_MINUTE);
  if (!minuteLimit.success) {
    return {
      ok: false,
      message: 'You have sent too many AI requests in a short time. Please wait 1 minute before asking again.',
      error: 'RATE_LIMIT_MINUTE_EXCEEDED',
    };
  }

  const dailyLimit = checkRateLimit(`ai_day_${identifier}`, RATE_LIMIT_PRESETS.AI_DAILY);
  if (!dailyLimit.success) {
    return {
      ok: false,
      message: 'Daily AI query quota reached (50 queries/day). Please continue manually or contact your account manager.',
      error: 'DAILY_QUOTA_EXCEEDED',
    };
  }

  // 4. Server-Side Execution (Deterministic High-Performance Kitchen Engine)
  const lower = cleanPrompt.toLowerCase();

  if (lower.includes('weekend') || lower.includes('steak') || lower.includes('friday') || lower.includes('service') || lower.includes('beef')) {
    return {
      ok: true,
      message: "Here is your high-volume steak service replenishment prepared from your locked contract rates:",
      suggestions: [
        { productId: 'prod-01', sku: 'FS-BEEF-10', name: '28-Day Dry-Aged British Ribeye Steak', qty: 4, packSize: '10x 250g Steaks', customerPrice: 62.50 },
        { productId: 'prod-02', sku: 'FP-MUSH-04', name: 'Wild Foraged Forest Mushrooms Box', qty: 3, packSize: '3 kg Crate', customerPrice: 22.50 },
        { productId: 'prod-03', sku: 'FP-POT-06', name: 'Norfolk Maris Piper Potatoes (Washed)', qty: 4, packSize: '25 kg Sack', customerPrice: 16.50 },
      ],
      actionLabel: 'Add Steak Service Batch to Basket',
      rateLimitInfo: {
        remainingMinute: minuteLimit.remaining,
        remainingDaily: dailyLimit.remaining,
      },
    };
  }

  if (lower.includes('garnish') || lower.includes('dessert') || lower.includes('pastry') || lower.includes('chocolate') || lower.includes('cream')) {
    return {
      ok: true,
      message: "Here is a curated pastry, dairy, and dessert prep selection matching your fine dining standards:",
      suggestions: [
        { productId: 'prod-04', sku: 'FS-CHOC-12', name: 'Valrhona 70% Dark Couverture Callets', qty: 2, packSize: '3 kg Tub', customerPrice: 42.00 },
        { productId: 'prod-05', sku: 'FS-CRM-08', name: 'Jersey Clotted Double Cream', qty: 6, packSize: '2 Litre Jug', customerPrice: 8.90 },
        { productId: 'prod-06', sku: 'FP-LEM-05', name: 'Amalfi Unwaxed Culinary Lemons', qty: 2, packSize: '5 kg Crate', customerPrice: 18.50 },
      ],
      actionLabel: 'Add Pastry Prep Selection to Basket',
      rateLimitInfo: {
        remainingMinute: minuteLimit.remaining,
        remainingDaily: dailyLimit.remaining,
      },
    };
  }

  return {
    ok: true,
    message: "Here is your fresh morning produce and salad replenishment selection:",
    suggestions: [
      { productId: 'prod-07', sku: 'FP-TOM-01', name: 'Heritage Vine Tomatoes (Mixed Colors)', qty: 6, packSize: '6 kg Crate', customerPrice: 18.50 },
      { productId: 'prod-08', sku: 'FP-AVO-02', name: 'Ready-to-Eat Hass Avocados (Box of 18)', qty: 3, packSize: '18 Count Box', customerPrice: 21.00 },
      { productId: 'prod-09', sku: 'FP-HERB-07', name: 'Living Micro-Coriander & Herb Punnet Tray', qty: 2, packSize: '12 Trays', customerPrice: 14.50 },
    ],
    actionLabel: 'Add Fresh Produce Selection to Basket',
    rateLimitInfo: {
      remainingMinute: minuteLimit.remaining,
      remainingDaily: dailyLimit.remaining,
    },
  };
}
