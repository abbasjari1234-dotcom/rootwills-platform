'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Search,
  X,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Truck,
  ShoppingBag,
  Phone,
  ExternalLink,
  Lock,
  Layers,
} from 'lucide-react';
import { InquiryModal } from '@/components/public/InquiryModal';

export type WholesaleCategorySlug =
  | 'fresh-produce'
  | 'meat-poultry'
  | 'chilled-dairy'
  | 'seafood-fish'
  | 'frozen-chips'
  | 'bakery-breakfast'
  | 'everyday-grocery'
  | 'oil-fats'
  | 'rice-pasta'
  | 'spices-sauces'
  | 'tea-coffee'
  | 'desserts-icecream'
  | 'packaging-hygiene';

export interface WholesaleCategory {
  slug: WholesaleCategorySlug;
  name: string;
  shortName: string;
  tempBadge: string;
  image: string;
}

export interface WholesaleProduct {
  id: string;
  sku: string;
  name: string;
  packSize: string;
  categorySlug: WholesaleCategorySlug;
  image: string;
  origin: string;
  tempZone: 'Chilled 1–4°C' | 'Butchery 0–2°C' | 'Frozen -18°C' | 'Ambient' | 'Non-Food';
  description: string;
  featuredCore?: boolean;
  popularAddon?: boolean;
}

export const WHOLESALE_CATEGORIES: WholesaleCategory[] = [
  {
    slug: 'fresh-produce',
    name: 'Fresh Fruit, Vegetables & Salad',
    shortName: 'Fresh Produce',
    tempBadge: 'Chilled 1–4°C',
    image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'meat-poultry',
    name: 'Prime Butchery & Poultry',
    shortName: 'Meat & Poultry',
    tempBadge: 'Butchery 0–2°C',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'chilled-dairy',
    name: 'Chilled Dairy, Cheese & Eggs',
    shortName: 'Chilled & Dairy',
    tempBadge: 'Chilled 1–4°C',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'seafood-fish',
    name: 'Seafood & Coastal Fish',
    shortName: 'Seafood & Fish',
    tempBadge: 'Frozen / Chilled',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'frozen-chips',
    name: 'Frozen Chips, Veg & Savoury',
    shortName: 'Frozen & Chips',
    tempBadge: 'Frozen -18°C',
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'bakery-breakfast',
    name: 'Artisan Bakery & Viennoiserie',
    shortName: 'Bakery & Bread',
    tempBadge: 'Frozen Bake-Off',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'everyday-grocery',
    name: 'Grocery, Tinned & Flour',
    shortName: 'Store Cupboard',
    tempBadge: 'Ambient',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'oil-fats',
    name: 'Cooking Oils, Olive Oil & Fats',
    shortName: 'Oils & Fats',
    tempBadge: 'Ambient',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'rice-pasta',
    name: 'Rice, Pasta, Grains & Pulses',
    shortName: 'Rice & Pasta',
    tempBadge: 'Ambient',
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'spices-sauces',
    name: 'Spices, Stocks & Condiments',
    shortName: 'Spices & Sauces',
    tempBadge: 'Ambient',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'tea-coffee',
    name: 'Coffee, Tea & Soft Drinks',
    shortName: 'Beverages',
    tempBadge: 'Ambient',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'desserts-icecream',
    name: 'Patisserie Desserts & Gelato',
    shortName: 'Desserts & Gelato',
    tempBadge: 'Frozen -18°C',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'packaging-hygiene',
    name: 'Non-Food, Disposables & Hygiene',
    shortName: 'Non-Food & Hygiene',
    tempBadge: 'Non-Food',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80',
  },
];

// Creed Foodservice Equivalent Product Range — 100% Pork-Free, Clean Verified Product Photography, Zero Exposed Prices
export const WHOLESALE_PRODUCTS: WholesaleProduct[] = [
  // ─── 1. FRESH PRODUCE ───
  {
    id: 'fp-1',
    sku: 'RW-FP-101',
    name: 'San Marzano & Heritage Vine Tomatoes',
    packSize: 'Tray • 5kg Class 1',
    categorySlug: 'fresh-produce',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    origin: 'Isle of Wight / Italy',
    tempZone: 'Chilled 1–4°C',
    description: 'Vine-ripened plum and heritage tomatoes hand-graded for salads, pass garnish, and sauces.',
    featuredCore: true,
    popularAddon: true,
  },
  {
    id: 'fp-2',
    sku: 'RW-FP-102',
    name: 'Lincolnshire Maris Piper Washed Potatoes',
    packSize: 'Sack • 25kg Brushed',
    categorySlug: 'fresh-produce',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    origin: 'Lincolnshire, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'High dry-matter (22%) chipping and roasting potatoes tested for low sugar and golden fry colour.',
    featuredCore: true,
    popularAddon: true,
  },
  {
    id: 'fp-3',
    sku: 'RW-FP-103',
    name: 'Unwaxed Amalfi & Sorrento Catering Lemons',
    packSize: 'Crate • 10kg (85–100 Count)',
    categorySlug: 'fresh-produce',
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&auto=format&fit=crop&q=80',
    origin: 'Italy / Spain',
    tempZone: 'Chilled 1–4°C',
    description: 'Untreated aromatic rind and high juice yield for pastry zesting, fish dressing, and bar prep.',
    featuredCore: true,
  },
  {
    id: 'fp-4',
    sku: 'RW-FP-104',
    name: 'British Tenderstem Broccoli & Calabrese Florets',
    packSize: 'Crate • 5kg Field-Iced',
    categorySlug: 'fresh-produce',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&auto=format&fit=crop&q=80',
    origin: 'Cornwall & Kent, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'Field-chilled within 90 minutes of cutting to preserve bright green chlorophyll and crisp stem snap.',
  },
  {
    id: 'fp-5',
    sku: 'RW-FP-105',
    name: 'Ready-to-Eat Hass Avocados (Calibrated 16s)',
    packSize: 'Box • 4kg (16 Count)',
    categorySlug: 'fresh-produce',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80',
    origin: 'Peru / Mexico',
    tempZone: 'Chilled 1–4°C',
    description: 'Conditioned for immediate kitchen slicing, smashed brunch service, and cold starters.',
  },
  {
    id: 'fp-6',
    sku: 'RW-FP-106',
    name: 'Triple-Washed Baby Spinach & Wild Rocket Leaves',
    packSize: 'Case • 4 x 500g Pillow Bags',
    categorySlug: 'fresh-produce',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80',
    origin: 'Evesham Valley, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'Spun-dry young spinach and peppery wild rocket leaves ready for service with zero prep waste.',
    popularAddon: true,
  },
  {
    id: 'fp-7',
    sku: 'RW-FP-107',
    name: 'Chef’s Wild Forest & Chestnut Mushroom Basket',
    packSize: 'Basket • 3kg Dry-Brushed',
    categorySlug: 'fresh-produce',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=600&auto=format&fit=crop&q=80',
    origin: 'UK & European Growers',
    tempZone: 'Chilled 1–4°C',
    description: 'Firm king oyster, girolle, and flat portobello mushrooms for risotto, game, and grill sides.',
  },
  {
    id: 'fp-8',
    sku: 'RW-FP-108',
    name: 'Kentish Orchard Pink Lady & Braeburn Apples',
    packSize: 'Case • 12kg Calibrated (70–75mm)',
    categorySlug: 'fresh-produce',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
    origin: 'Kent, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'Red Tractor assured British dessert apples graded for hotel breakfast displays and pastry.',
  },

  // ─── 2. MEAT & POULTRY (100% PORK-FREE) ───
  {
    id: 'mp-1',
    sku: 'RW-MP-201',
    name: '28-Day Dry-Aged British Beef Ribeye Steaks',
    packSize: 'Case • 10 x 284g (10oz) Vac-Pack',
    categorySlug: 'meat-poultry',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&auto=format&fit=crop&q=80',
    origin: 'Herefordshire, UK',
    tempZone: 'Butchery 0–2°C',
    description: 'Himalayan salt-chamber aged British ribeye steaks trimmed to specification in our EEC-accredited butchery.',
    featuredCore: true,
  },
  {
    id: 'mp-2',
    sku: 'RW-MP-202',
    name: 'Fresh Red Tractor Chicken Breast Fillets',
    packSize: 'Tray • 5kg Calibrated (200–230g)',
    categorySlug: 'meat-poultry',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80',
    origin: 'Herefordshire, UK',
    tempZone: 'Butchery 0–2°C',
    description: 'Air-chilled, zero-added-water British chicken breast fillets with consistent portion sizing.',
    featuredCore: true,
    popularAddon: true,
  },
  {
    id: 'mp-3',
    sku: 'RW-MP-203',
    name: 'French-Trimmed Welsh Rack of Lamb & Cutlets',
    packSize: 'Case • 6 x 7-Bone Racks (Approx 450g)',
    categorySlug: 'meat-poultry',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80',
    origin: 'Wales, UK',
    tempZone: 'Butchery 0–2°C',
    description: 'PGI grass-fed Welsh lamb chined and French-trimmed with clean fat cap for searing and roasting.',
    featuredCore: true,
  },
  {
    id: 'mp-4',
    sku: 'RW-MP-204',
    name: 'British Chuck & Brisket Beef Burgers (80/20)',
    packSize: 'Box • 24 x 170g (6oz) Patties',
    categorySlug: 'meat-poultry',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    origin: 'Yorkshire, UK',
    tempZone: 'Butchery 0–2°C',
    description: 'Coarse butcher-ground 100% British beef chuck and brisket patties for gastro pubs and grills.',
  },
  {
    id: 'mp-5',
    sku: 'RW-MP-205',
    name: 'Boneless Skinless Chicken Thighs & Whole Birds',
    packSize: 'Case • 10kg (2 x 5kg Vacuum Packs)',
    categorySlug: 'meat-poultry',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&auto=format&fit=crop&q=80',
    origin: 'British Poultry Farms',
    tempZone: 'Butchery 0–2°C',
    description: 'Succulent oyster-cut boneless chicken thighs and farm-assured whole roasting chickens.',
  },
  {
    id: 'mp-6',
    sku: 'RW-MP-206',
    name: 'Rolled British Beef Topside & Braising Lamb Shanks',
    packSize: 'Joint • 4.5kg Tied / 12 x 400g Shanks',
    categorySlug: 'meat-poultry',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    origin: 'West Country & Midlands, UK',
    tempZone: 'Butchery 0–2°C',
    description: 'Butcher-tied Sunday carvery beef roasting joints and meaty hind lamb shanks (100% pork-free facility).',
  },

  // ─── 3. CHILLED & DAIRY (100% PORK-FREE DELI) ───
  {
    id: 'cd-1',
    sku: 'RW-CD-301',
    name: 'British Lion Code Free-Range Large Eggs',
    packSize: 'Outer • 15 Dozen (180 Eggs)',
    categorySlug: 'chilled-dairy',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80',
    origin: 'Staffordshire & Cotswolds, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'Class A large free-range eggs with rich golden yolks, stamped to British Lion Quality standards.',
    featuredCore: true,
    popularAddon: true,
  },
  {
    id: 'cd-2',
    sku: 'RW-CD-302',
    name: 'West Country Pasteurised Double & Whipping Cream',
    packSize: 'Case • 4 x 2 Litre Poly Bottles',
    categorySlug: 'chilled-dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
    origin: 'Somerset & Gloucestershire, UK',
    tempZone: 'Chilled 1–4°C',
    description: '48% butterfat culinary double cream engineered for high-heat reduction stability and pastry whipping.',
  },
  {
    id: 'cd-3',
    sku: 'RW-CD-303',
    name: 'West Country Mature Cheddar & Grated Mozzarella',
    packSize: 'Block • 5kg Catering Block / 2kg Grated',
    categorySlug: 'chilled-dairy',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&auto=format&fit=crop&q=80',
    origin: 'Somerset, UK & Italy',
    tempZone: 'Chilled 1–4°C',
    description: '18-month aged West Country cheddar blocks alongside low-moisture Fior di Latte pizza mozzarella.',
    featuredCore: true,
  },
  {
    id: 'cd-4',
    sku: 'RW-CD-304',
    name: 'Unsalted Culinary Block Butter (82% Butterfat)',
    packSize: 'Case • 40 x 250g Foil Blocks (10kg)',
    categorySlug: 'chilled-dairy',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80',
    origin: 'Devon & Cornwall, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'Sweet-cream unsalted block butter for pastry lamination, pan-basting, and sauce emulsions.',
  },
  {
    id: 'cd-5',
    sku: 'RW-CD-305',
    name: 'Fresh Whole Milk, Semi-Skimmed & Barista Oat Milk',
    packSize: 'Crate • 6 x 2L Dairy / 12 x 1L Barista Oat',
    categorySlug: 'chilled-dairy',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80',
    origin: 'British Dairies',
    tempZone: 'Chilled 1–4°C',
    description: 'Daily Red Tractor dairy milk and micro-foam Barista Oat, Soya, and Almond milks for coffee service.',
    popularAddon: true,
  },
  {
    id: 'cd-6',
    sku: 'RW-CD-306',
    name: 'Marinated Nocellara Olives, Hummus & Pork-Free Deli',
    packSize: 'Tub • 2.5kg Drained Olives / 1kg Sliced Turkey',
    categorySlug: 'chilled-dairy',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    origin: 'Mediterranean & UK',
    tempZone: 'Chilled 1–4°C',
    description: '100% pork-free chilled delicatessen range: smoked turkey breast, beef pastrami, olives, and mezze dips.',
  },

  // ─── 4. SEAFOOD & COASTAL FISH ───
  {
    id: 'sf-1',
    sku: 'RW-FS-401',
    name: 'Scottish Loch-Reared Salmon Centre-Cut Portions',
    packSize: 'Box • 10 x 200g Skin-On Pin-Boned',
    categorySlug: 'seafood-fish',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    origin: 'Scottish Highlands',
    tempZone: 'Frozen -18°C',
    description: 'Descaled, pin-boned Scottish salmon suprêmes individually vacuum-sealed for zero portion waste.',
    featuredCore: true,
  },
  {
    id: 'sf-2',
    sku: 'RW-FS-402',
    name: 'MSC Atlantic Cod & Haddock Skinless Loins (IQF)',
    packSize: 'Case • 4.54kg (10lb) Shatterpack (170–230g)',
    categorySlug: 'seafood-fish',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    origin: 'North East Atlantic (FAO 27)',
    tempZone: 'Frozen -18°C',
    description: 'Frozen-at-sea within 2 hours of catch for bright white flaky texture and zero drip loss.',
  },
  {
    id: 'sf-3',
    sku: 'RW-FS-403',
    name: 'Raw Peeled Black Tiger King Prawns (16/20) & Calamari',
    packSize: 'Case • 5 x 1kg IQF Bags',
    categorySlug: 'seafood-fish',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&auto=format&fit=crop&q=80',
    origin: 'BAP 4-Star Certified',
    tempZone: 'Frozen -18°C',
    description: 'Deveined tail-on king prawns and scored squid tubes for grilling, pasta, and starters.',
  },

  // ─── 5. FROZEN CHIPS, VEG & SAVOURY ───
  {
    id: 'fc-1',
    sku: 'RW-FZ-404',
    name: 'Gourmet Skin-On Stealth Bistro Fries (9x9mm)',
    packSize: 'Case • 4 x 2.5kg (10kg Total)',
    categorySlug: 'frozen-chips',
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=600&auto=format&fit=crop&q=80',
    origin: 'British & Belgian Growers',
    tempZone: 'Frozen -18°C',
    description: 'Gluten-free clear batter coating keeps skin-on fries crisp for 25+ minutes under the pass lamps.',
    featuredCore: true,
    popularAddon: true,
  },
  {
    id: 'fc-2',
    sku: 'RW-FZ-405',
    name: 'Chunky Triple-Cooked Gastro Pub Chips & Wedges',
    packSize: 'Case • 4 x 2.5kg (10kg Total)',
    categorySlug: 'frozen-chips',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&auto=format&fit=crop&q=80',
    origin: 'Lincolnshire Potatoes, UK',
    tempZone: 'Frozen -18°C',
    description: '18x18mm thick-cut pub chips with blistered golden exterior and fluffy potato centre.',
  },
  {
    id: 'fc-3',
    sku: 'RW-FZ-406',
    name: 'IQF Baby Petits Pois, Edamame & Sweetcorn',
    packSize: 'Case • 10 x 1kg Catering Bags',
    categorySlug: 'frozen-chips',
    image: 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?w=600&auto=format&fit=crop&q=80',
    origin: 'Yorkshire & Lincolnshire, UK',
    tempZone: 'Frozen -18°C',
    description: 'Flash-frozen within 120 minutes of harvesting to lock in natural sugar and bright colour.',
  },

  // ─── 6. ARTISAN BAKERY & VIENNOISERIE ───
  {
    id: 'bb-1',
    sku: 'RW-BK-407',
    name: 'Stone-Baked Wild Ferment Sourdough Boules & Ciabatta',
    packSize: 'Case • 8 x 800g Loaves / 40 Ciabatta Rolls',
    categorySlug: 'bakery-breakfast',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    origin: 'Craft Bakery, UK',
    tempZone: 'Frozen -18°C',
    description: '36-hour fermented artisan sourdough loaves and Italian olive oil ciabatta for bake-off service.',
  },
  {
    id: 'bb-2',
    sku: 'RW-BK-408',
    name: 'Pre-Sliced Glazed Gourmet Burger Brioche Buns',
    packSize: 'Case • 48 x 85g (4.5 Inch) Buns',
    categorySlug: 'bakery-breakfast',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&auto=format&fit=crop&q=80',
    origin: 'Artisan Bakery, UK',
    tempZone: 'Frozen -18°C',
    description: 'Soft, butter-enriched glazed brioche buns engineered to hold sauces without sogging.',
  },
  {
    id: 'bb-3',
    sku: 'RW-BK-409',
    name: 'All-Butter French Croissants & Pain au Chocolat',
    packSize: 'Case • 60 x 70g Ready-to-Bake Units',
    categorySlug: 'bakery-breakfast',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80',
    origin: 'Charentes-Poitou Butter',
    tempZone: 'Frozen -18°C',
    description: 'Laminated all-butter viennoiserie pastries for hotel breakfast buffets and coffee counters.',
  },

  // ─── 7. GROCERY, TINNED & FLOUR ───
  {
    id: 'eg-1',
    sku: 'RW-AG-501',
    name: 'Italian San Marzano Peeled Plum Tomatoes & Passata',
    packSize: 'Case • 6 x 2.55kg (A10 Catering Tins)',
    categorySlug: 'everyday-grocery',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    origin: 'Campania, Italy',
    tempZone: 'Ambient',
    description: 'Sun-ripened whole peeled plum tomatoes in thick juice alongside pre-cooked chickpeas and pulses.',
    featuredCore: true,
  },
  {
    id: 'eg-2',
    sku: 'RW-AG-502',
    name: 'Neapolitan Tipo 00 Pizza Flour, Strong Bread & Sugar',
    packSize: 'Sack • 16kg / 25kg Mill Sacks',
    categorySlug: 'everyday-grocery',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    origin: 'Italian & British Heritage Mills',
    tempZone: 'Ambient',
    description: 'Finely milled W300–W320 pizza flour, culinary plain/self-raising flours, and pure cane caster sugar.',
  },

  // ─── 8. COOKING OILS, OLIVE OIL & FATS ───
  {
    id: 'of-1',
    sku: 'RW-AG-503',
    name: 'Cold-Pressed Mediterranean Extra Virgin Olive Oil',
    packSize: 'Case • 4 x 5 Litre Tins',
    categorySlug: 'oil-fats',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    origin: 'Spain & Italy',
    tempZone: 'Ambient',
    description: 'First cold-press extra virgin olive oil for dressings, bread service, and pass finishing.',
    featuredCore: true,
  },
  {
    id: 'of-2',
    sku: 'RW-AG-504',
    name: 'Extended-Life Commercial Rapeseed & Sunflower Frying Oil',
    packSize: 'Drum • 20 Litre Box-in-Bag',
    categorySlug: 'oil-fats',
    image: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600&auto=format&fit=crop&q=80',
    origin: 'UK Cold-Press',
    tempZone: 'Ambient',
    description: 'High smoke-point (230°C) anti-foaming commercial frying oil engineered for heavy-duty fryers.',
  },

  // ─── 9. RICE, PASTA, GRAINS & PULSES ───
  {
    id: 'rp-1',
    sku: 'RW-AG-505',
    name: '24-Month Aged Extra-Long Himalayan Basmati Rice',
    packSize: 'Sack • 20kg Catering Sack',
    categorySlug: 'rice-pasta',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    origin: 'Himalayan Foothills',
    tempZone: 'Ambient',
    description: 'Aromatic extra-long basmati rice alongside Italian Carnaroli and Arborio risotto rice.',
  },
  {
    id: 'rp-2',
    sku: 'RW-AG-506',
    name: 'Gragnano Bronze-Die Durum Wheat Penne, Linguine & Rigatoni',
    packSize: 'Case • 4 x 3kg Catering Bags',
    categorySlug: 'rice-pasta',
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=600&auto=format&fit=crop&q=80',
    origin: 'Naples, Italy',
    tempZone: 'Ambient',
    description: 'Slow-dried bronze-extruded Italian pasta engineered to hold al-dente texture during service.',
  },

  // ─── 10. SPICES, STOCKS & CONDIMENTS ───
  {
    id: 'ss-1',
    sku: 'RW-AG-507',
    name: 'Whole & Ground Culinary Spices, Peppercorns & Sea Salt',
    packSize: 'Pack • 6 x 500g Chef Shakers + 1.5kg Maldon Tub',
    categorySlug: 'spices-sauces',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    origin: 'Single-Estate Origins & Maldon, UK',
    tempZone: 'Ambient',
    description: 'Steam-sterilised Tellicherry black peppercorns, smoked paprika, cumin, saffron, and sea salt flakes.',
  },

  // ─── 11. COFFEE, TEA & SOFT DRINKS ───
  {
    id: 'tc-1',
    sku: 'RW-BV-508',
    name: 'Single-Origin Roasted Arabica Espresso Beans & Hospitality Tea',
    packSize: 'Case • 6 x 1kg Valve Bags / 1,100 Tea Bags',
    categorySlug: 'tea-coffee',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80',
    origin: 'Colombia, Brazil & Assam',
    tempZone: 'Ambient',
    description: 'Medium-dark roast specialty espresso coffee beans and English breakfast pyramid teas.',
  },
  {
    id: 'tc-2',
    sku: 'RW-BV-509',
    name: 'Still & Sparkling Spring Water Dining Table Glass Bottles',
    packSize: 'Case • 12 x 750ml Glass / 24 x 330ml',
    categorySlug: 'tea-coffee',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&auto=format&fit=crop&q=80',
    origin: 'British Natural Springs',
    tempZone: 'Ambient',
    description: 'Hospitality table bottles of still and sparkling spring water, tonics, and pressed juices.',
  },

  // ─── 12. PATISSERIE DESSERTS & GELATO ───
  {
    id: 'di-1',
    sku: 'RW-DS-410',
    name: 'Belgian Dark Chocolate Fondants, Cheesecakes & Tartlets',
    packSize: 'Box • 16 Pre-Portioned Patisserie Units',
    categorySlug: 'desserts-icecream',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
    origin: 'British & Continental Patisserie',
    tempZone: 'Frozen -18°C',
    description: 'Molten-centre Belgian dark chocolate fondants, baked vanilla cheesecakes, and glazed lemon tarts.',
  },
  {
    id: 'di-2',
    sku: 'RW-DS-411',
    name: 'Cornish Madagascan Vanilla & Pistachio Dairy Napoli Gelato',
    packSize: 'Tub • 4.75 Litre Stainless-Fit Napoli Tub',
    categorySlug: 'desserts-icecream',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80',
    origin: 'Cornwall & Italy',
    tempZone: 'Frozen -18°C',
    description: 'Slow-churned real vanilla pod dairy gelato and fruit sorbets engineered for restaurant quenelles.',
  },

  // ─── 13. NON-FOOD, DISPOSABLES & HYGIENE ───
  {
    id: 'ph-1',
    sku: 'RW-NF-601',
    name: 'Eco Kraft Takeaway Boxes, Burger Clamshells & Coffee Cups',
    packSize: 'Case • 300 Compostable Units',
    categorySlug: 'packaging-hygiene',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop&q=80',
    origin: 'FSC Sustainable UK',
    tempZone: 'Non-Food',
    description: 'Grease-resistant folded kraft food boxes, breathable bagasse clamshells, and double-wall hot cups.',
  },
  {
    id: 'ph-2',
    sku: 'RW-NF-602',
    name: '450mm Catering Aluminium Foil, Cling Film, Blue Roll & Sanitiser',
    packSize: 'Case • Cutterbox Rolls / 2x5L BS EN 1276 Sanitiser',
    categorySlug: 'packaging-hygiene',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80',
    origin: 'Professional Kitchen Grade',
    tempZone: 'Non-Food',
    description: 'Heavy-duty catering foil, cling film, baking parchment, 2-ply centrefeed blue roll, and kitchen chemicals.',
  },
];

export interface DraftOrderLine {
  product: WholesaleProduct;
  qty: number;
}

export function PublicProductsView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<WholesaleProduct | null>(null);
  const [hubInfoModalOpen, setHubInfoModalOpen] = useState<boolean>(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [customInquiryNotes, setCustomInquiryNotes] = useState<string>('');
  const [mobileCartDrawerOpen, setMobileCartDrawerOpen] = useState<boolean>(false);

  // Pre-seeded with 3 core wholesale lines so the right order manifest sidebar is immediately functional
  const [orderList, setOrderList] = useState<DraftOrderLine[]>([
    { product: WHOLESALE_PRODUCTS[0], qty: 2 }, // San Marzano & Heritage Vine Tomatoes
    { product: WHOLESALE_PRODUCTS[9], qty: 1 }, // Fresh Red Tractor Chicken Breast Fillets
    { product: WHOLESALE_PRODUCTS[1], qty: 2 }, // Lincolnshire Maris Piper Washed Potatoes
  ]);

  const categoryRailRef = useRef<HTMLDivElement>(null);
  const featuredRowRef = useRef<HTMLDivElement>(null);
  const popularAddonRef = useRef<HTMLDivElement>(null);

  // Sync draft order list to localStorage so the new tab (/direct) reads the exact items selected
  useEffect(() => {
    try {
      const payload = orderList.map((item) => ({
        id: item.product.id,
        sku: item.product.sku,
        name: item.product.name,
        packSize: item.product.packSize,
        tempZone: item.product.tempZone,
        image: item.product.image,
        qty: item.qty,
      }));
      localStorage.setItem('rootwills_direct_draft_order', JSON.stringify(payload));
    } catch {
      // ignore storage errors
    }
  }, [orderList]);

  const scrollContainer = (
    ref: React.RefObject<HTMLDivElement>,
    direction: 'left' | 'right',
    distance = 320
  ) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -distance : distance,
        behavior: 'smooth',
      });
    }
  };

  const getQty = (productId: string) => {
    const found = orderList.find((c) => c.product.id === productId);
    return found ? found.qty : 0;
  };

  const updateOrderQty = (product: WholesaleProduct, delta = 1) => {
    setOrderList((prev) => {
      const existing = prev.find((c) => c.product.id === product.id);
      if (existing) {
        const nextQty = existing.qty + delta;
        if (nextQty <= 0) {
          return prev.filter((c) => c.product.id !== product.id);
        }
        return prev.map((c) => (c.product.id === product.id ? { ...c, qty: nextQty } : c));
      }
      return delta > 0 ? [...prev, { product, qty: delta }] : prev;
    });
  };

  const totalCases = useMemo(
    () => orderList.reduce((sum, item) => sum + item.qty, 0),
    [orderList]
  );

  const coreFeaturedProducts = useMemo(
    () => WHOLESALE_PRODUCTS.filter((p) => p.featuredCore),
    []
  );

  const popularAddons = useMemo(
    () => WHOLESALE_PRODUCTS.filter((p) => p.popularAddon),
    []
  );

  const filteredProducts = useMemo(() => {
    return WHOLESALE_PRODUCTS.filter((p) => {
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.packSize.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (selectedCategory === 'all') return true;
      return p.categorySlug === selectedCategory;
    });
  }, [selectedCategory, searchQuery]);

  const isBrowsingAll = selectedCategory === 'all' && searchQuery.trim() === '';

  // Clean Pandamart Product Card — Zero Prices Exposed, Authentic Food Photography
  const renderProductCard = (product: WholesaleProduct, compact = false) => {
    const qty = getQty(product.id);

    return (
      <div
        key={product.id}
        onClick={() => setQuickViewProduct(product)}
        className={`group bg-[#FFFDF9] rounded-xl border border-[#E8DEC8] hover:border-[#BA8E4E] p-2.5 transition-all duration-200 flex flex-col justify-between cursor-pointer shadow-[0_2px_10px_rgba(46,6,13,0.03)] hover:shadow-[0_10px_24px_rgba(46,6,13,0.08)] ${
          compact ? 'w-[154px] sm:w-[168px] shrink-0' : 'w-full'
        }`}
      >
        <div>
          {/* Square Product Image Container with Bottom-Right + / [ 🗑 1 + ] Stepper */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#FAF7F2] mb-2 border border-[#EFE7D6]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              sizes="200px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Top-Left Temperature Regime Tag */}
            <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#131313]/80 backdrop-blur-xs font-mono text-[8.5px] uppercase tracking-wider text-[#FAF7F2] font-medium">
              {product.tempZone}
            </span>

            {/* Floating Bottom-Right + / [ 🗑 1 + ] Stepper Pill */}
            <div
              className="absolute bottom-1.5 right-1.5 left-1.5 flex justify-end z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {qty === 0 ? (
                <button
                  type="button"
                  onClick={() => updateOrderQty(product, 1)}
                  aria-label={`Add ${product.name}`}
                  className="w-8 h-8 rounded-full bg-[#FFFDF9] hover:bg-[#2E060D] text-[#2E060D] hover:text-[#FAF7F2] border border-[#DCD2C0] shadow-[0_3px_10px_rgba(0,0,0,0.16)] flex items-center justify-center transition-all active:scale-90 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              ) : (
                <div className="w-full flex items-center justify-between bg-[#FFFDF9] border border-[#BA8E4E] rounded-full px-2 py-1 shadow-[0_4px_12px_rgba(46,6,13,0.18)]">
                  <button
                    type="button"
                    onClick={() => updateOrderQty(product, -1)}
                    aria-label="Decrease quantity"
                    className="w-6 h-6 rounded-full hover:bg-[#2E060D]/10 text-[#2E060D] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    {qty === 1 ? (
                      <Trash2 className="w-3.5 h-3.5 text-[#8B2635]" />
                    ) : (
                      <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                  </button>
                  <span className="font-mono text-xs font-bold text-[#2E060D] tabular-nums">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateOrderQty(product, 1)}
                    aria-label="Increase quantity"
                    className="w-6 h-6 rounded-full hover:bg-[#2E060D]/10 text-[#2E060D] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* SKU & Pack Specification Row (Replaces Public Price) */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="font-mono text-[9.5px] font-bold text-[#8B2635] uppercase tracking-wider">
              {product.sku}
            </span>
            <span className="font-mono text-[9px] text-stone-400 truncate">
              {product.origin}
            </span>
          </div>

          {/* Product Name */}
          <h4 className="text-[12px] font-sans font-semibold text-[#131313] group-hover:text-[#2E060D] leading-snug line-clamp-2">
            {product.name}
          </h4>
        </div>

        <div className="pt-1.5 mt-1.5 border-t border-[#EFE7D6]">
          <p className="text-[10.5px] font-mono font-semibold text-[#2E060D] truncate">
            {product.packSize}
          </p>
        </div>
      </div>
    );
  };

  // Right-Hand Wholesale Order Manifest Panel (No Public Prices — Routes to Rootwills Direct Portal in New Tab)
  const renderRightOrderPanel = () => (
    <div className="flex flex-col h-full">
      {/* Top Delivery Standard Header */}
      <div className="text-center pb-3.5 border-b border-[#E8DEC8]">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#DCD2C0] text-[#2E060D] mb-1">
          <Truck className="w-4 h-4 text-[#8B2635]" />
        </div>
        <div className="text-[11px] font-mono text-stone-600 font-medium">
          Multi-Temperature Fleet (04:00 – 07:30 AM)
        </div>
        <h3 className="text-[14px] font-serif font-bold text-[#2E060D] mt-1 leading-snug">
          Your order from Rootwills – Midlands &amp; London Hub
        </h3>
      </div>

      {/* Selected Product Lines List (No Prices Shown) */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#EFE7D6] py-2 max-h-[290px] pr-1">
        {orderList.length === 0 ? (
          <div className="py-10 text-center space-y-2">
            <ShoppingBag className="w-7 h-7 text-stone-400 mx-auto stroke-[1.5]" />
            <p className="text-xs font-serif font-bold text-[#2E060D]">
              Your order list is empty
            </p>
            <p className="text-[11px] text-stone-500 max-w-[200px] mx-auto">
              Click the + button on any product to build your order list for Rootwills Direct.
            </p>
          </div>
        ) : (
          orderList.map(({ product, qty }) => (
            <div key={product.id} className="py-2.5 flex items-center justify-between gap-2.5">
              {/* Left Thumbnail */}
              <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#E8DEC8] shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  unoptimized
                  sizes="44px"
                  className="object-cover"
                />
              </div>

              {/* Middle Name & Pack Spec */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-sans font-semibold text-[#131313] leading-snug line-clamp-2">
                  {product.name}
                </p>
                <p className="text-[10px] font-mono text-stone-500 mt-0.5 truncate">
                  {product.sku} • {product.packSize}
                </p>
              </div>

              {/* Right Quantity Stepper Pill */}
              <div className="flex flex-col items-end shrink-0">
                <span className="font-mono text-[9.5px] text-[#8B2635] font-semibold mb-1">
                  {qty} {qty === 1 ? 'case' : 'cases'}
                </span>
                <div className="flex items-center gap-2 bg-[#FFFDF9] border border-[#DCD2C0] rounded-full px-2 py-0.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => updateOrderQty(product, -1)}
                    aria-label="Decrease item"
                    className="text-stone-600 hover:text-[#8B2635] cursor-pointer"
                  >
                    {qty === 1 ? (
                      <Trash2 className="w-3 h-3 text-stone-500" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                  </button>
                  <span className="font-mono text-[11px] font-bold text-[#2E060D] tabular-nums min-w-[14px] text-center">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateOrderQty(product, 1)}
                    aria-label="Increase item"
                    className="text-stone-600 hover:text-[#2E060D] cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* "Popular with your order" Mini-Carousel (No Prices Shown) */}
      <div className="pt-3 pb-3 border-t border-[#E8DEC8]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-serif font-bold text-[#2E060D]">
            Popular with your order
          </h4>
          <button
            type="button"
            onClick={() => scrollContainer(popularAddonRef, 'right', 180)}
            aria-label="Scroll popular items"
            className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#DCD2C0] flex items-center justify-center text-[#2E060D] hover:border-[#BA8E4E] cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          ref={popularAddonRef}
          className="flex items-stretch gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1"
        >
          {popularAddons.map((addon) => {
            const addonQty = getQty(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => setQuickViewProduct(addon)}
                className="w-[106px] shrink-0 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] p-1.5 flex flex-col justify-between cursor-pointer hover:border-[#BA8E4E] transition-colors"
              >
                <div>
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white mb-1.5 border border-[#EFE7D6]">
                    <Image
                      src={addon.image}
                      alt={addon.name}
                      fill
                      unoptimized
                      sizes="96px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateOrderQty(addon, 1);
                      }}
                      aria-label={`Add ${addon.name}`}
                      className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#FFFDF9] hover:bg-[#2E060D] text-[#2E060D] hover:text-[#FAF7F2] border border-[#DCD2C0] shadow-xs flex items-center justify-center cursor-pointer"
                    >
                      {addonQty > 0 ? (
                        <span className="font-mono text-[10px] font-bold">{addonQty}</span>
                      ) : (
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                      )}
                    </button>
                  </div>

                  <div className="font-mono text-[9px] font-bold text-[#8B2635] truncate">
                    {addon.sku}
                  </div>
                </div>

                <p className="text-[10px] font-sans font-medium text-[#131313] line-clamp-2 leading-tight mt-0.5">
                  {addon.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Summary & Direct Portal Launch Button (Opens New Tab -> Rootwills Direct) */}
      <div className="pt-2.5 border-t border-[#DCD2C0] space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-serif font-bold text-[#131313]">Order Manifest</span>
            <span className="block text-[10.5px] text-stone-500 font-sans">
              Trade pricing protected via portal login
            </span>
          </div>
          <div className="text-right font-mono">
            <span className="text-sm font-bold text-[#2E060D] tabular-nums">
              {totalCases} {totalCases === 1 ? 'Case' : 'Cases'}
            </span>
            <span className="block text-[10px] text-[#8B2635]">
              {orderList.length} {orderList.length === 1 ? 'SKU' : 'SKUs'}
            </span>
          </div>
        </div>

        {/* Opens Rootwills Direct Ordering Portal in a New Tab */}
        <a
          href="/direct"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-[#2E060D] hover:bg-[#4E0D17] text-[#FAF7F2] font-sans font-bold text-xs sm:text-[13px] tracking-wide shadow-[0_8px_24px_rgba(46,6,13,0.24)] transition-all active:scale-[0.98] cursor-pointer flex items-center justify-between"
        >
          <div className="text-left">
            <span className="block leading-tight">Order on Rootwills Direct</span>
            <span className="block font-mono text-[9.5px] text-[#F3D08A] font-normal">
              rootwillsdirect.co.uk • Trade Login
            </span>
          </div>
          <ExternalLink className="w-4 h-4 text-[#F3D08A] shrink-0" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#131313] pt-[66px] sm:pt-[82px] pb-20 relative">
      {/* Subtle Botanical Parchment Texture */}
      <div
        className="fixed inset-0 z-0 bg-repeat pointer-events-none opacity-[0.14] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />

      {/* ─── FULL-WIDTH 3-COLUMN PANDAMART WHOLESALE INTERFACE ─── */}
      <div className="relative z-10 max-w-[1480px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-start gap-5 lg:gap-6">
          {/* ════════════════════════════════════════════════════════════════
              1. LEFT SIDEBAR: Depot Info & Categories
             ════════════════════════════════════════════════════════════════ */}
          <aside className="hidden lg:block w-[220px] xl:w-[245px] shrink-0 sticky top-[82px] max-h-[calc(100vh-92px)] overflow-y-auto pr-3 border-r border-[#DCD2C0] [scrollbar-width:thin]">
            {/* Depot Title & Delivery SLA Block */}
            <div className="pb-4 border-b border-[#E8DEC8] space-y-1.5">
              <h1 className="text-[15px] font-serif font-bold text-[#2E060D] leading-snug">
                Rootwills – Midlands &amp; London Hub
              </h1>
              <p className="text-[11.5px] font-sans font-semibold text-[#8B2635]">
                Multi-temperature wholesale supply
              </p>
              <p className="text-[11px] font-mono text-stone-600">
                Chilled • Butchery • Frozen • Ambient
              </p>
              <p className="text-[11px] font-mono text-stone-600">
                Pre-dawn drop: 04:00 – 07:30 AM
              </p>

              <div className="pt-1.5">
                <button
                  type="button"
                  onClick={() => setHubInfoModalOpen(true)}
                  className="w-full py-1.5 px-3 rounded-lg bg-[#FFFDF9] hover:bg-[#2E060D] text-[#131313] hover:text-[#FAF7F2] border border-[#131313]/30 hover:border-[#2E060D] text-[11.5px] font-sans font-semibold transition-colors cursor-pointer"
                >
                  Depot &amp; delivery specification
                </button>
              </div>
            </div>

            {/* Categories Navigation List */}
            <div className="pt-3.5">
              <h2 className="text-[13px] font-serif font-bold text-[#131313] mb-2">
                Categories
              </h2>

              <nav className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center justify-between py-2 px-2 rounded-lg text-[12.5px] font-sans transition-colors cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#2E060D]/10 text-[#2E060D] font-bold'
                      : 'text-stone-700 hover:bg-[#EFE7D6]/60'
                  }`}
                >
                  <span>All Product Ranges</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {WHOLESALE_CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center justify-between py-2 px-2 rounded-lg text-[12.5px] font-sans transition-colors cursor-pointer group ${
                        active
                          ? 'bg-[#2E060D]/10 text-[#2E060D] font-bold'
                          : 'text-stone-700 hover:bg-[#EFE7D6]/60'
                      }`}
                    >
                      <span className="truncate">{cat.shortName}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                          active
                            ? 'text-[#2E060D] translate-x-0.5'
                            : 'text-stone-400 group-hover:translate-x-0.5'
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ════════════════════════════════════════════════════════════════
              2. CENTER COLUMN: Search + Dual Range Banners + Category Tiles + Aisles
             ════════════════════════════════════════════════════════════════ */}
          <main className="flex-1 min-w-0 py-1">
            {/* Top Rounded Pill Search Bar */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, SKUs or pack sizes (e.g. Ribeye, Maris Piper, Cod, Extra Virgin Olive Oil)..."
                className="w-full pl-11 pr-10 py-2.5 sm:py-3 rounded-full bg-[#EFECE6] focus:bg-[#FFFDF9] border border-[#DCD2C0] focus:border-[#BA8E4E] text-xs sm:text-sm text-[#131313] placeholder:text-stone-500 font-sans outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-300 hover:bg-stone-400 text-stone-800 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* 2-Card Clean Wholesale Range Banners (Creed-Style Multi-Temperature Showcase) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-5">
              {/* Left Banner: Fresh Produce, Butchery & Chilled Dairy */}
              <div
                onClick={() => setSelectedCategory('fresh-produce')}
                className="relative rounded-2xl overflow-hidden min-h-[164px] sm:min-h-[184px] p-5 sm:p-6 flex items-center bg-[#2E060D] text-[#FAF7F2] border border-[#BA8E4E]/45 cursor-pointer group shadow-sm"
              >
                <div className="absolute right-0 inset-y-0 w-[52%] overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2E060D] via-[#2E060D]/45 to-transparent z-10" />
                  <Image
                    src="https://images.unsplash.com/photo-1518843875459-f738682238a6?w=800&auto=format&fit=crop&q=80"
                    alt="Fresh Produce & Chilled Supply"
                    fill
                    unoptimized
                    sizes="400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="relative z-20 max-w-[64%] space-y-1.5">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#F3D08A] font-semibold block">
                    CHILLED &amp; BUTCHERY (0°C – 4°C)
                  </span>
                  <h2 className="text-lg sm:text-2xl font-serif font-bold text-white leading-tight">
                    Fresh Produce, Beef, Lamb &amp; Dairy
                  </h2>
                  <p className="text-[11px] text-stone-300 font-sans leading-snug">
                    Hand-selected market harvests, 100% pork-free British butchery, and West Country creamery lines.
                  </p>
                </div>
              </div>

              {/* Right Banner: Frozen, Grocery & Rootwills Direct Portal */}
              <div
                onClick={() => setSelectedCategory('everyday-grocery')}
                className="relative rounded-2xl overflow-hidden min-h-[164px] sm:min-h-[184px] p-5 sm:p-6 flex items-center bg-[#1F3327] text-[#FAF7F2] border border-[#BA8E4E]/45 cursor-pointer group shadow-sm"
              >
                <div className="absolute right-0 inset-y-0 w-[52%] overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1F3327] via-[#1F3327]/45 to-transparent z-10" />
                  <Image
                    src="https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=800&auto=format&fit=crop&q=80"
                    alt="Ambient Grocery & Frozen Wholesale"
                    fill
                    unoptimized
                    sizes="400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="relative z-20 max-w-[65%] space-y-1.5">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#F3D08A] font-semibold block">
                    FROZEN, GROCERY &amp; HYGIENE
                  </span>
                  <h2 className="text-lg sm:text-2xl font-serif font-bold text-white leading-tight">
                    Complete Store Cupboard &amp; Coastal Catch
                  </h2>
                  <p className="text-[11px] text-stone-200 font-sans leading-snug">
                    Consolidated on a single delivery vehicle. Trade pricing available via Rootwills Direct.
                  </p>
                </div>
              </div>
            </div>

            {/* Horizontal Square Category Thumbnail Rail */}
            <div className="relative mb-6">
              <button
                type="button"
                onClick={() => scrollContainer(categoryRailRef, 'left', 280)}
                aria-label="Scroll categories left"
                className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#FFFDF9] border border-[#DCD2C0] shadow-md items-center justify-center text-[#2E060D] hover:border-[#BA8E4E] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div
                ref={categoryRailRef}
                className="flex items-stretch gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1 px-0.5"
              >
                {WHOLESALE_CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => setSelectedCategory(active ? 'all' : cat.slug)}
                      className="group w-[78px] sm:w-[86px] shrink-0 flex flex-col items-center text-center cursor-pointer transition-all"
                    >
                      <div
                        className={`relative w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] rounded-xl overflow-hidden mb-1.5 border transition-all flex items-center justify-center ${
                          active
                            ? 'bg-[#2E060D]/10 border-[#2E060D] ring-2 ring-[#2E060D]/20 shadow-xs'
                            : 'bg-[#FFFDF9] border-[#E8DEC8] hover:border-[#BA8E4E]'
                        }`}
                      >
                        <Image
                          src={cat.image}
                          alt={cat.shortName}
                          fill
                          unoptimized
                          sizes="76px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span
                        className={`text-[11px] font-sans leading-tight line-clamp-2 ${
                          active
                            ? 'font-bold text-[#2E060D]'
                            : 'font-medium text-stone-700 group-hover:text-[#2E060D]'
                        }`}
                      >
                        {cat.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollContainer(categoryRailRef, 'right', 280)}
                aria-label="Scroll categories right"
                className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#FFFDF9] border border-[#DCD2C0] shadow-md items-center justify-center text-[#2E060D] hover:border-[#BA8E4E] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* ─── MAIN PRODUCT ROWS (DEFAULT MULTI-AISLE VIEW OR FILTERED GRID) ─── */}
            {isBrowsingAll ? (
              <div className="space-y-8">
                {/* 1. Core Kitchen Staples Carousel Row */}
                <section className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base sm:text-lg font-serif font-extrabold text-[#2E060D] uppercase tracking-tight">
                      CORE KITCHEN STAPLES
                    </h2>
                    <a
                      href="/direct"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-sans font-bold text-[#8B2635] hover:text-[#2E060D] flex items-center gap-1 cursor-pointer"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Login for Live Pricing</span>
                    </a>
                  </div>

                  <div className="relative">
                    <div
                      ref={featuredRowRef}
                      className="flex items-stretch gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2"
                    >
                      {coreFeaturedProducts.map((prod) => renderProductCard(prod, true))}
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollContainer(featuredRowRef, 'right', 360)}
                      aria-label="Scroll core products right"
                      className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#FFFDF9] border border-[#DCD2C0] shadow-md items-center justify-center text-[#2E060D] hover:bg-[#2E060D] hover:text-[#FAF7F2] transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </section>

                {/* 2. All Category Aisle Sections */}
                {WHOLESALE_CATEGORIES.map((aisle) => {
                  const items = WHOLESALE_PRODUCTS.filter(
                    (p) => p.categorySlug === aisle.slug
                  );
                  if (items.length === 0) return null;

                  return (
                    <section key={aisle.slug} className="pt-3 border-t border-[#E8DEC8]">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <h2 className="text-base sm:text-lg font-serif font-bold text-[#2E060D]">
                            {aisle.name}
                          </h2>
                          <span className="hidden sm:inline-block font-mono text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#EFECE6] text-stone-600 border border-[#DCD2C0]">
                            {aisle.tempBadge}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(aisle.slug)}
                          className="text-xs font-sans font-bold text-[#2E060D] hover:text-[#8B2635] underline cursor-pointer"
                        >
                          View All ({items.length})
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {items.map((prod) => renderProductCard(prod, false))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              /* Filtered Category or Search Results Grid */
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#DCD2C0]">
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#2E060D]">
                      {WHOLESALE_CATEGORIES.find((c) => c.slug === selectedCategory)?.name ||
                        'Product Search Results'}
                    </h2>
                    <p className="text-xs text-stone-500 font-sans">
                      Showing {filteredProducts.length} wholesale lines
                      {searchQuery ? ` matching "${searchQuery}"` : ''}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#FFFDF9] border border-[#DCD2C0] hover:border-[#2E060D] text-xs font-sans font-semibold text-[#2E060D] cursor-pointer"
                  >
                    ← Back to All Ranges
                  </button>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] p-10 text-center space-y-3">
                    <p className="text-base font-serif font-bold text-[#2E060D]">
                      No products matched &ldquo;{searchQuery}&rdquo;
                    </p>
                    <p className="text-xs text-stone-600 max-w-md mx-auto">
                      Our procurement team sources 1,200+ commercial lines daily. Ask our trade desk to source this item for your kitchen.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomInquiryNotes(`Custom product sourcing enquiry: ${searchQuery}`);
                        setIsInquiryOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#2E060D] text-[#FAF7F2] text-xs font-sans font-bold cursor-pointer"
                    >
                      Ask Trade Desk to Source
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {filteredProducts.map((prod) => renderProductCard(prod, false))}
                  </div>
                )}
              </div>
            )}
          </main>

          {/* ════════════════════════════════════════════════════════════════
              3. RIGHT SIDEBAR: Live Order Manifest + Rootwills Direct Portal Link
             ════════════════════════════════════════════════════════════════ */}
          <aside className="hidden xl:block w-[310px] 2xl:w-[335px] shrink-0 sticky top-[82px]">
            <div className="rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] p-4 shadow-[0_8px_28px_rgba(46,6,13,0.05)] max-h-[calc(100vh-96px)] flex flex-col">
              {renderRightOrderPanel()}
            </div>
          </aside>
        </div>
      </div>

      {/* ─── MOBILE / TABLET FLOATING BOTTOM ORDER MANIFEST BAR (< xl) ─── */}
      {totalCases > 0 && (
        <div className="fixed bottom-4 inset-x-3.5 z-40 xl:hidden">
          <button
            type="button"
            onClick={() => setMobileCartDrawerOpen(true)}
            className="w-full py-3 px-4 rounded-2xl bg-[#2E060D] text-[#FAF7F2] shadow-[0_14px_34px_rgba(0,0,0,0.38)] border border-[#BA8E4E]/50 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#F3D08A] text-[#131313] font-mono text-xs font-extrabold flex items-center justify-center">
                {totalCases}
              </span>
              <span className="text-xs sm:text-sm font-sans font-bold">
                View Order Manifest ({orderList.length} SKUs)
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-[#F3D08A]">
              Rootwills Direct ↗
            </span>
          </button>
        </div>
      )}

      {/* ─── MOBILE / TABLET ORDER DRAWER (< xl) ─── */}
      {mobileCartDrawerOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex justify-end bg-black/65 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#FFFDF9] h-full p-4 sm:p-5 flex flex-col relative shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileCartDrawerOpen(false)}
              aria-label="Close order list"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#DCD2C0] flex items-center justify-center text-[#2E060D]"
            >
              <X className="w-4 h-4" />
            </button>
            {renderRightOrderPanel()}
          </div>
        </div>
      )}

      {/* ─── PRODUCT SPECIFICATION QUICK VIEW MODAL (NO PRICES EXPOSED) ─── */}
      {quickViewProduct && (
        <div
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full p-5 sm:p-6 border border-[#DCD2C0] shadow-2xl relative space-y-4"
          >
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close product details"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#DCD2C0] flex items-center justify-center text-[#2E060D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4 items-start">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8DEC8] shrink-0">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  unoptimized
                  sizes="128px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-1.5 pr-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#2E060D]/10 text-[#2E060D] font-bold">
                    {quickViewProduct.sku}
                  </span>
                  <span className="font-mono text-[10px] text-stone-500">
                    {quickViewProduct.tempZone}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-[#2E060D] leading-snug">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs font-mono font-semibold text-[#8B2635]">
                  {quickViewProduct.packSize}
                </p>
                <p className="text-[11px] font-mono text-stone-500">
                  Origin: {quickViewProduct.origin}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 font-sans leading-relaxed bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E8DEC8]">
              {quickViewProduct.description}
            </p>

            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#DCD2C0] flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-stone-600 font-sans">
                <Lock className="w-3.5 h-3.5 text-[#8B2635]" />
                Contract Trade Pricing
              </span>
              <a
                href="/direct"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] font-bold text-[#2E060D] underline hover:text-[#8B2635]"
              >
                Login on Rootwills Direct ↗
              </a>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  updateOrderQty(quickViewProduct, 1);
                  setQuickViewProduct(null);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#2E060D] hover:bg-[#4E0D17] text-[#FAF7F2] text-xs font-sans font-bold cursor-pointer"
              >
                + Add Case to Order List
              </button>
              <a
                href="/direct"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-[#FAF7F2] border border-[#DCD2C0] hover:border-[#2E060D] text-[#2E060D] text-xs font-sans font-semibold flex items-center gap-1.5"
              >
                <span>Rootwills Direct</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── DEPOT & DELIVERY SPECIFICATION MODAL ─── */}
      {hubInfoModalOpen && (
        <div
          onClick={() => setHubInfoModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 border border-[#DCD2C0] shadow-2xl relative space-y-4"
          >
            <button
              type="button"
              onClick={() => setHubInfoModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#DCD2C0] flex items-center justify-center text-[#2E060D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-serif font-bold text-[#2E060D]">
              Rootwills Depot &amp; Delivery Specification
            </h3>

            <div className="space-y-2.5 text-xs text-stone-700 font-sans">
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <strong className="text-[#2E060D] block mb-0.5">Central Distribution Hub</strong>
                The Hub, Nobel Way, Birmingham, B6 7EU &amp; Greater London Trunk Network.
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <strong className="text-[#2E060D] block mb-0.5">Delivery Windows &amp; Cutoff</strong>
                11:00 PM night cutoff for guaranteed 04:00 AM – 07:30 AM pre-dawn kitchen drops.
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <strong className="text-[#2E060D] block mb-0.5">100% Pork-Free Multi-Temp Fleet</strong>
                All chilled (1–4°C), prime butchery (0–2°C), frozen (-18°C), and ambient lines are stored and transported in a strictly 100% pork-free environment.
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs font-mono text-[#2E060D]">
              <a href="tel:+441616412803" className="flex items-center gap-1.5 hover:underline">
                <Phone className="w-3.5 h-3.5 text-[#BA8E4E]" /> +44 16164 12803
              </a>
              <button
                type="button"
                onClick={() => setHubInfoModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#2E060D] text-[#FAF7F2] font-sans font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Sourcing Enquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialNotes={customInquiryNotes}
      />
    </div>
  );
}
