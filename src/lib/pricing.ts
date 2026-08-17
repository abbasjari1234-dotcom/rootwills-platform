export interface ProductWithBasePrice {
  id: string;
  base_price: number;
}

export interface TieredPricingRow {
  product_id: string;
  discount_percent: number | null;
  override_price: number | null;
}

// Resolves the price a specific organization pays for a product: an
// override price wins if set, otherwise a percentage discount is applied to
// base_price, otherwise the base price stands. Pure function so it's easy
// to unit test and reuse between the catalog page and the order Server Action.
export function resolvePrice(product: ProductWithBasePrice, tiering?: TieredPricingRow | null): number {
  if (!tiering) return product.base_price;
  if (tiering.override_price != null) return tiering.override_price;
  if (tiering.discount_percent != null) {
    const discounted = product.base_price * (1 - tiering.discount_percent / 100);
    return Math.round(discounted * 100) / 100;
  }
  return product.base_price;
}

export function buildTieringMap(rows: TieredPricingRow[]): Map<string, TieredPricingRow> {
  const map = new Map<string, TieredPricingRow>();
  for (const row of rows) map.set(row.product_id, row);
  return map;
}
