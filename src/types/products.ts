export type ProductCategory = 
  | 'fresh_produce'
  | 'foodservice'
  | 'dairy_eggs'
  | 'meat_poultry'
  | 'dry_goods'
  | 'specialty';

export type ProductSubcategory =
  | 'fruit'
  | 'vegetables'
  | 'salad'
  | 'herbs'
  | 'exotics'
  | 'potatoes_onions'
  | 'citrus'
  | 'dairy'
  | 'eggs'
  | 'beef_lamb'
  | 'poultry'
  | 'charcuterie'
  | 'oils_vinegars'
  | 'flour_grains'
  | 'chocolate_pastry'
  | 'truffles_caviar';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  categoryLabel: string;
  description: string;
  packSize: string;
  unit: string;
  basePrice: number;
  imageUrl: string;
  moq: number;
  origin?: string;
  allergens?: string[];
  dietary?: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CustomerProduct extends Product {
  customerPrice: number;
  savingsPercent?: number;
  isFavorite?: boolean;
  frequentOrderQty?: number;
}
