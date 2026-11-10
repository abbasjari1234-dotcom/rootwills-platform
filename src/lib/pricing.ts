/**
 * Rootwills Commercial B2B Tiered Pricing Engine
 * Models Bidfood Direct / Brakes contract wholesale pricing structure
 */

import type { WholesaleProduct } from '@/data/wholesaleProducts';

export interface ProductPricing {
  basePrice: number;
  contractPrice: number;
  formattedPrice: string;
  unitPrice?: string;
  vatRate: number; // 0 for zero-rated UK food, 20 for non-food
  vatAmount: number;
  tierLabel: string;
}

export interface OrderPricingSummary {
  subtotalNet: number;
  vatTotal: number;
  grandTotal: number;
  formattedSubtotal: string;
  formattedVat: string;
  formattedGrandTotal: string;
  totalLines: number;
  totalCases: number;
}

// Category base price ranges in GBP per commercial catering case
const CATEGORY_BASE_PRICE_RANGES: Record<string, { min: number; max: number; vat: number }> = {
  'bakery-breakfast': { min: 14.50, max: 28.00, vat: 0 },
  'meat-poultry': { min: 38.00, max: 88.00, vat: 0 },
  'chilled-dairy': { min: 12.50, max: 32.00, vat: 0 },
  'fresh-produce': { min: 8.50, max: 24.50, vat: 0 },
  'seafood-fish': { min: 36.00, max: 94.00, vat: 0 },
  'frozen-chips': { min: 15.00, max: 29.50, vat: 0 },
  'everyday-grocery': { min: 11.00, max: 34.00, vat: 0 },
  'oil-fats': { min: 26.00, max: 58.00, vat: 0 },
  'rice-pasta': { min: 13.50, max: 29.00, vat: 0 },
  'spices-sauces': { min: 9.50, max: 24.00, vat: 0 },
  'tea-coffee': { min: 16.50, max: 44.00, vat: 0 },
  'desserts-icecream': { min: 22.00, max: 48.00, vat: 0 },
  'packaging-hygiene': { min: 18.00, max: 42.00, vat: 20 },
};

// Tier margin discount multipliers
// Tier 1 (Luxury / Large Multi-Site): 14% contract discount
// Tier 2 (Independent Restaurants / Pubs): 8% volume discount
// Tier 3 / Baseline: Standard Trade Rate
function getTierMultiplier(tierName?: string): { multiplier: number; label: string } {
  if (!tierName) {
    return { multiplier: 1.0, label: 'Trade Baseline' };
  }

  const lower = tierName.toLowerCase();
  if (lower.includes('tier 1') || lower.includes('luxury') || lower.includes('master') || lower.includes('executive')) {
    return { multiplier: 0.86, label: 'Tier 1 Contract Direct (-14%)' };
  }
  if (lower.includes('tier 2') || lower.includes('midlands') || lower.includes('partner')) {
    return { multiplier: 0.92, label: 'Tier 2 Commercial Rate (-8%)' };
  }
  return { multiplier: 1.0, label: 'Trade Standard Rate' };
}

/**
 * Deterministically calculate base commercial benchmark price from SKU and category
 * Guarantees every single product has a consistent, realistic UK catering case price
 */
export function getProductPricing(
  product: WholesaleProduct,
  accountTier?: string
): ProductPricing {
  const range = CATEGORY_BASE_PRICE_RANGES[product.categorySlug] || { min: 14.0, max: 32.0, vat: 0 };
  
  // Extract number from SKU (e.g. RW-796010 -> 796010)
  const skuNum = parseInt(product.sku.replace(/\D/g, '') || '500000', 10);
  
  // Deterministic float within [min, max]
  const pseudoSeed = (skuNum % 1000) / 1000;
  const rawBase = range.min + pseudoSeed * (range.max - range.min);
  const basePrice = Math.round(rawBase * 20) / 20; // Round to nearest 5p

  const { multiplier, label } = getTierMultiplier(accountTier);
  const contractPrice = Math.round(basePrice * multiplier * 20) / 20;

  // Calculate unit price if pack size is format "NxY" (e.g. 15x800g, 50x140g, 20x179g)
  let unitPrice: string | undefined;
  const match = product.packSize.match(/^(\d+)\s*x/i);
  if (match && match[1]) {
    const units = parseInt(match[1], 10);
    if (units > 1) {
      const perUnit = contractPrice / units;
      unitPrice = `£${perUnit.toFixed(2)}/unit`;
    }
  }

  const vatRate = range.vat;
  const vatAmount = Math.round(((contractPrice * vatRate) / 100) * 100) / 100;

  return {
    basePrice,
    contractPrice,
    formattedPrice: `£${contractPrice.toFixed(2)}`,
    unitPrice,
    vatRate,
    vatAmount,
    tierLabel: label,
  };
}

/**
 * Calculate multi-line order totals with UK HMRC VAT rules
 */
export function calculateOrderSummary(
  lines: { product: WholesaleProduct; qty: number }[],
  accountTier?: string
): OrderPricingSummary {
  let subtotalNet = 0;
  let vatTotal = 0;
  let totalCases = 0;

  for (const line of lines) {
    if (!line.product || line.qty <= 0) continue;
    const pricing = getProductPricing(line.product, accountTier);
    const lineNet = pricing.contractPrice * line.qty;
    const lineVat = (lineNet * pricing.vatRate) / 100;

    subtotalNet += lineNet;
    vatTotal += lineVat;
    totalCases += line.qty;
  }

  subtotalNet = Math.round(subtotalNet * 100) / 100;
  vatTotal = Math.round(vatTotal * 100) / 100;
  const grandTotal = Math.round((subtotalNet + vatTotal) * 100) / 100;

  return {
    subtotalNet,
    vatTotal,
    grandTotal,
    formattedSubtotal: `£${subtotalNet.toFixed(2)}`,
    formattedVat: `£${vatTotal.toFixed(2)}`,
    formattedGrandTotal: `£${grandTotal.toFixed(2)}`,
    totalLines: lines.length,
    totalCases,
  };
}

