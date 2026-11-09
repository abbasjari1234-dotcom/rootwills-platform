'use client';

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import {
  Search,
  X,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Percent,
  Truck,
  Clock,
  Info,
  ShoppingBag,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Phone,
  Send,
} from 'lucide-react';
import { InquiryModal } from '@/components/public/InquiryModal';

export type PandamartCategorySlug =
  | 'offers'
  | 'bulk-savers'
  | 'meat-poultry'
  | 'fruits-vegetables'
  | 'dairy-eggs'
  | 'seafood-fish'
  | 'bakery-breakfast'
  | 'frozen-chips'
  | 'everyday-grocery'
  | 'oil-ghee'
  | 'pasta-pulses'
  | 'spices-sauces'
  | 'tea-coffee'
  | 'desserts-gelato'
  | 'packaging-hygiene';

export interface PandamartCategory {
  slug: PandamartCategorySlug;
  name: string;
  shortName: string;
  image: string;
  isOffer?: boolean;
  badge?: string;
}

export interface PandamartProduct {
  id: string;
  sku: string;
  name: string;
  unitLabel: string;
  categorySlug: PandamartCategorySlug;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  image: string;
  origin: string;
  tempZone: string;
  description: string;
  isPopularAddon?: boolean;
}

export const PANDAMART_CATEGORIES: PandamartCategory[] = [
  {
    slug: 'offers',
    name: 'Offers',
    shortName: 'Offers',
    image: '/images/commercial/rootwills_fresh_crates.jpg',
    isOffer: true,
    badge: '15% OFF',
  },
  {
    slug: 'bulk-savers',
    name: 'Chef Bulk Savers',
    shortName: 'Bulk Savers',
    image: '/images/commercial/cold_depot_logistics.jpg',
  },
  {
    slug: 'meat-poultry',
    name: 'Meat & Poultry',
    shortName: 'Meat & Poultry',
    image: '/images/commercial/04_meat_poultry.jpg',
  },
  {
    slug: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    shortName: 'Fruits & Vegetables',
    image: '/images/commercial/02_fresh_produce.jpg',
  },
  {
    slug: 'dairy-eggs',
    name: 'Dairy Products & Eggs',
    shortName: 'Dairy Products',
    image: '/images/commercial/03_dairy_eggs.jpg',
  },
  {
    slug: 'seafood-fish',
    name: 'Seafood & Coastal Fish',
    shortName: 'Seafood & Fish',
    image: '/images/commercial/05_seafood.jpg',
  },
  {
    slug: 'bakery-breakfast',
    name: 'Bakery & Breakfast',
    shortName: 'Bakery & Breakfast',
    image: '/images/commercial/11_hotels.jpg',
  },
  {
    slug: 'frozen-chips',
    name: 'Frozen & Gourmet Chips',
    shortName: 'Frozen & Chips',
    image: '/images/commercial/14_pubs_bars.jpg',
  },
  {
    slug: 'everyday-grocery',
    name: 'Everyday Grocery',
    shortName: 'Everyday Grocery',
    image: '/images/commercial/dry_pantry_wholesale.jpg',
  },
  {
    slug: 'oil-ghee',
    name: 'Oil, Ghee & Cooking Fats',
    shortName: 'Oil & Ghee',
    image: '/images/commercial/06_dry_goods.jpg',
  },
  {
    slug: 'pasta-pulses',
    name: 'Rice, Noodles & Pasta',
    shortName: 'Noodles & Pasta',
    image: '/images/commercial/09_more_categories.jpg',
  },
  {
    slug: 'spices-sauces',
    name: 'Spices & Dressings',
    shortName: 'Spices & Dressings',
    image: '/images/commercial/rootwills_spices.jpg',
  },
  {
    slug: 'tea-coffee',
    name: 'Tea, Coffee & Beverages',
    shortName: 'Beverages',
    image: '/images/branded/rootwills_apples_card.jpg',
  },
  {
    slug: 'desserts-gelato',
    name: 'Desserts & Ice Cream',
    shortName: 'Desserts & Ice Cream',
    image: '/images/commercial/10_restaurant.jpg',
  },
  {
    slug: 'packaging-hygiene',
    name: 'Packaging & Hygiene',
    shortName: 'Packaging & Hygiene',
    image: '/images/commercial/08_catering_supplies.jpg',
  },
];

// 100% Pork-Free Comprehensive Wholesale Assortment across all Creed Foodservice categories
export const PANDAMART_PRODUCTS: PandamartProduct[] = [
  // ─── MEAT & POULTRY (100% PORK-FREE) ───
  {
    id: 'mp-1',
    sku: 'RW-MP-201',
    name: '28-Day Dry-Aged British Ribeye Steaks',
    unitLabel: 'Case • 10 x 284g (10oz)',
    categorySlug: 'meat-poultry',
    price: 68.5,
    originalPrice: 78.0,
    discountPercent: 12,
    image: '/images/commercial/04_meat_poultry.jpg',
    origin: 'Hereford, UK',
    tempZone: 'Chilled 0–2°C',
    description: 'Hand-trimmed, Himalayan salt-chamber aged British ribeye steaks with rich marbling.',
  },
  {
    id: 'mp-2',
    sku: 'RW-MP-202',
    name: 'Red Tractor Fresh Chicken Breast Fillets',
    unitLabel: 'Tray • 5kg Calibrated',
    categorySlug: 'meat-poultry',
    price: 29.5,
    originalPrice: 34.0,
    discountPercent: 13,
    image: '/images/commercial/exact_restaurant_pass.jpg',
    origin: 'Herefordshire, UK',
    tempZone: 'Chilled 0–2°C',
    description: 'Air-chilled, zero-added-water chicken breast fillets (200–230g each) for grill and pan service.',
    isPopularAddon: true,
  },
  {
    id: 'mp-3',
    sku: 'RW-MP-203',
    name: 'French-Trimmed Welsh Rack of Lamb',
    unitLabel: 'Case • 6 x 7-Bone Racks',
    categorySlug: 'meat-poultry',
    price: 74.0,
    originalPrice: 85.0,
    discountPercent: 13,
    image: '/images/commercial/dry_aged_beef_room.jpg',
    origin: 'Wales, UK',
    tempZone: 'Chilled 0–2°C',
    description: 'PGI grass-fed Welsh lamb racks, chined and French-trimmed to the eye for rapid searing.',
  },
  {
    id: 'mp-4',
    sku: 'RW-MP-204',
    name: 'British Beef Chuck & Brisket Smash Burgers',
    unitLabel: 'Box • 24 x 170g (6oz)',
    categorySlug: 'meat-poultry',
    price: 26.8,
    originalPrice: 31.5,
    discountPercent: 15,
    image: '/images/commercial/04_meat_poultry.jpg',
    origin: 'Yorkshire, UK',
    tempZone: 'Chilled 0–2°C',
    description: 'Coarse butcher-ground 80/20 chuck and brisket patties engineered for a caramelized crust.',
  },
  {
    id: 'mp-5',
    sku: 'RW-MP-205',
    name: 'Boneless Skinless Chicken Thighs (Oyster Cut)',
    unitLabel: 'Case • 10kg (2 x 5kg)',
    categorySlug: 'meat-poultry',
    price: 44.0,
    originalPrice: 49.5,
    discountPercent: 11,
    image: '/images/commercial/13_caterers.jpg',
    origin: 'British Poultry Farms',
    tempZone: 'Chilled 0–2°C',
    description: 'Succulent boneless chicken thighs trimmed for chargrilling, curries, and rotisserie prep.',
  },
  {
    id: 'mp-6',
    sku: 'RW-MP-206',
    name: 'Gressingham Duck Breasts (Scored Skin)',
    unitLabel: 'Case • 10 x 220g',
    categorySlug: 'meat-poultry',
    price: 38.5,
    originalPrice: 44.0,
    discountPercent: 12,
    image: '/images/commercial/rootwills_hero_chef_plating.jpg',
    origin: 'Suffolk, UK',
    tempZone: 'Chilled 0–2°C',
    description: 'Plump Gressingham duck breasts with pre-scored skin for crisp rendering on the pass.',
  },
  {
    id: 'mp-7',
    sku: 'RW-MP-207',
    name: 'Braising Hind Lamb Shanks',
    unitLabel: 'Case • 12 x 400g Shanks',
    categorySlug: 'meat-poultry',
    price: 46.0,
    image: '/images/commercial/dry_aged_beef_room.jpg',
    origin: 'West Country, UK',
    tempZone: 'Chilled 0–2°C',
    description: 'Meaty hind lamb shanks ideal for slow-braised gastro pub mains.',
  },
  {
    id: 'mp-8',
    sku: 'RW-MP-208',
    name: 'Rolled British Beef Topside Roasting Joint',
    unitLabel: 'Joint • 4.5kg Tied',
    categorySlug: 'meat-poultry',
    price: 49.5,
    originalPrice: 56.0,
    discountPercent: 12,
    image: '/images/commercial/14_pubs_bars.jpg',
    origin: 'Midlands, UK',
    tempZone: 'Chilled 0–2°C',
    description: 'Butcher-tied prime British topside joint for high-yield Sunday carvery service.',
  },

  // ─── FRUITS & VEGETABLES ───
  {
    id: 'fv-1',
    sku: 'RW-FP-101',
    name: 'Isle of Wight Heritage Vine Tomatoes',
    unitLabel: 'Tray • 5kg Mixed',
    categorySlug: 'fruits-vegetables',
    price: 14.5,
    originalPrice: 17.0,
    discountPercent: 15,
    image: '/images/commercial/rootwills_hero_concept2_heirloom.jpg',
    origin: 'Isle of Wight, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'Sweet, vine-ripened heirloom tomatoes picked at Brix 7+ for caprese and pass garnish.',
    isPopularAddon: true,
  },
  {
    id: 'fv-2',
    sku: 'RW-FP-102',
    name: 'Lincolnshire Maris Piper Chipping Potatoes',
    unitLabel: 'Sack • 25kg Brushed',
    categorySlug: 'fruits-vegetables',
    price: 12.8,
    originalPrice: 15.0,
    discountPercent: 15,
    image: '/images/commercial/02_fresh_produce.jpg',
    origin: 'Lincolnshire, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'High dry-matter (22%) chipping and roasting potatoes for golden triple-cooked chips.',
    isPopularAddon: true,
  },
  {
    id: 'fv-3',
    sku: 'RW-FP-103',
    name: 'Amalfi & Wax-Free Catering Lemons',
    unitLabel: 'Crate • 10kg (90–100s)',
    categorySlug: 'fruits-vegetables',
    price: 18.9,
    originalPrice: 22.0,
    discountPercent: 14,
    image: '/images/commercial/amalfi_citrus_crate.jpg',
    origin: 'Italy / Spain',
    tempZone: 'Chilled 1–4°C',
    description: 'Unwaxed, high-juice aromatic lemons for bar service, seafood, and pastry zest.',
  },
  {
    id: 'fv-4',
    sku: 'RW-FP-104',
    name: 'Tenderstem Broccoli & Cavolo Nero Crate',
    unitLabel: 'Crate • 5kg Trimmed',
    categorySlug: 'fruits-vegetables',
    price: 16.4,
    originalPrice: 19.0,
    discountPercent: 14,
    image: '/images/commercial/british_brassicas_crates.jpg',
    origin: 'Cornwall / Kent, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'Field-iced within 90 minutes of harvest to lock in chlorophyll and stem snap.',
  },
  {
    id: 'fv-5',
    sku: 'RW-FP-105',
    name: 'Living Microgreens & Edible Flower Tray',
    unitLabel: 'Tray • 8 Living Punnets',
    categorySlug: 'fruits-vegetables',
    price: 15.2,
    originalPrice: 17.5,
    discountPercent: 13,
    image: '/images/commercial/living_microgreens_chef.jpg',
    origin: 'Vertical Farm, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'Red amaranth, pea shoots, micro coriander, and purple shiso growing on living root mats.',
  },
  {
    id: 'fv-6',
    sku: 'RW-FP-106',
    name: 'Kentish Orchard Pink Lady Apples',
    unitLabel: 'Case • 12kg Class 1',
    categorySlug: 'fruits-vegetables',
    price: 19.5,
    image: '/images/commercial/british_apples_crates.jpg',
    origin: 'Kent, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'Crisp, calibrated orchard apples hand-graded for hotel breakfast displays.',
  },
  {
    id: 'fv-7',
    sku: 'RW-FP-107',
    name: 'Wild Forest Girolle & Oyster Mushrooms',
    unitLabel: 'Basket • 3kg Foraged',
    categorySlug: 'fruits-vegetables',
    price: 24.0,
    originalPrice: 28.0,
    discountPercent: 14,
    image: '/images/commercial/wild_mushrooms_chef.jpg',
    origin: 'UK & European Woods',
    tempZone: 'Chilled 1–4°C',
    description: 'Dry-brushed golden chanterelles, king oyster, and chestnut mushrooms for risotto.',
  },
  {
    id: 'fv-8',
    sku: 'RW-FP-108',
    name: 'Triple-Washed Wild Rocket & Bistro Salad Leaf',
    unitLabel: 'Case • 4 x 500g Bags',
    categorySlug: 'fruits-vegetables',
    price: 11.5,
    image: '/images/commercial/rootwills_chef_salad_plating.jpg',
    origin: 'Evesham Valley, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'Peppery wild rocket, baby spinach, and red chard spun dry for zero prep waste.',
  },

  // ─── DAIRY & EGGS (100% PORK-FREE DELI) ───
  {
    id: 'de-1',
    sku: 'RW-CD-301',
    name: 'British Lion Code Free-Range Large Eggs',
    unitLabel: 'Box • 15 Dozen (180 Eggs)',
    categorySlug: 'dairy-eggs',
    price: 32.5,
    originalPrice: 37.0,
    discountPercent: 12,
    image: '/images/commercial/artisan_dairy_eggs.jpg',
    origin: 'Cotswolds, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'Golden-yolk British Lion stamped free-range eggs for breakfast and pastry sections.',
    isPopularAddon: true,
  },
  {
    id: 'de-2',
    sku: 'RW-CD-302',
    name: 'West Country Culinary Double Cream',
    unitLabel: 'Case • 4 x 2L Bottles',
    categorySlug: 'dairy-eggs',
    price: 21.8,
    originalPrice: 25.0,
    discountPercent: 13,
    image: '/images/commercial/03_dairy_eggs.jpg',
    origin: 'Somerset, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'High-butterfat West Country double cream engineered for reduction stability and whipping.',
  },
  {
    id: 'de-3',
    sku: 'RW-CD-303',
    name: 'Barber’s 18-Month Vintage Mature Cheddar',
    unitLabel: 'Block • 5kg Catering',
    categorySlug: 'dairy-eggs',
    price: 36.0,
    originalPrice: 41.5,
    discountPercent: 13,
    image: '/images/branded/rootwills_dairy_card.jpg',
    origin: 'Somerset, UK',
    tempZone: 'Chilled 1–4°C',
    description: 'PDO West Country mature cheddar with crystalline crunch and clean melt.',
  },
  {
    id: 'de-4',
    sku: 'RW-CD-304',
    name: 'Unsalted West Country Pastry Block Butter (82%)',
    unitLabel: 'Case • 40 x 250g Blocks',
    categorySlug: 'dairy-eggs',
    price: 54.0,
    originalPrice: 62.0,
    discountPercent: 13,
    image: '/images/commercial/artisan_dairy_eggs.jpg',
    origin: 'Devon, UK',
    tempZone: 'Chilled 1–4°C',
    description: '82% butterfat sweet-cream block butter for lamination, sauces, and finishing.',
  },
  {
    id: 'de-5',
    sku: 'RW-CD-305',
    name: 'Barista Oat Milk & Whole Dairy Milk Bundle',
    unitLabel: 'Case • 12 x 1L Barista',
    categorySlug: 'dairy-eggs',
    price: 16.8,
    originalPrice: 19.5,
    discountPercent: 14,
    image: '/images/commercial/03_dairy_eggs.jpg',
    origin: 'UK Dairies',
    tempZone: 'Chilled 1–4°C',
    description: 'Micro-foam steamed barista oat milk alongside Red Tractor pasteurised whole milk.',
    isPopularAddon: true,
  },
  {
    id: 'de-6',
    sku: 'RW-CD-306',
    name: 'Oak-Smoked Turkey Breast & Peppered Beef Pastrami',
    unitLabel: 'Pack • 2 x 1kg Sliced',
    categorySlug: 'dairy-eggs',
    price: 22.5,
    image: '/images/commercial/11_hotels.jpg',
    origin: 'UK Charcuterie (Pork-Free)',
    tempZone: 'Chilled 1–4°C',
    description: '100% pork-free chilled deli meats: carved oak-smoked turkey and cured beef pastrami.',
  },

  // ─── SEAFOOD & COASTAL FISH ───
  {
    id: 'sf-1',
    sku: 'RW-FS-401',
    name: 'Wild Atlantic Cod Skinless Boneless Loins (IQF)',
    unitLabel: 'Case • 4.54kg (10lb)',
    categorySlug: 'seafood-fish',
    price: 48.0,
    originalPrice: 55.0,
    discountPercent: 13,
    image: '/images/commercial/05_seafood.jpg',
    origin: 'North Atlantic (MSC)',
    tempZone: 'Frozen -18°C',
    description: 'MSC certified frozen-at-sea cod loins (170–230g) with pearlescent white flakes.',
  },
  {
    id: 'sf-2',
    sku: 'RW-FS-402',
    name: 'Scottish Loch-Reared Salmon Darne Portions',
    unitLabel: 'Box • 10 x 200g Vac-Pack',
    categorySlug: 'seafood-fish',
    price: 34.5,
    originalPrice: 39.5,
    discountPercent: 13,
    image: '/images/commercial/dayboat_turbot_ice.jpg',
    origin: 'Scottish Highlands',
    tempZone: 'Chilled / Frozen',
    description: 'Pin-boned, descaled center-cut Scottish salmon suprêmes ready for pan searing.',
  },
  {
    id: 'sf-3',
    sku: 'RW-FS-403',
    name: 'Raw Peeled Black Tiger King Prawns (16/20)',
    unitLabel: 'Case • 5 x 1kg IQF Bags',
    categorySlug: 'seafood-fish',
    price: 52.0,
    originalPrice: 59.0,
    discountPercent: 12,
    image: '/images/commercial/05_seafood.jpg',
    origin: 'BAP 4-Star Certified',
    tempZone: 'Frozen -18°C',
    description: 'Tail-on deveined king prawns with firm snap and zero glaze inflation.',
  },
  {
    id: 'sf-4',
    sku: 'RW-FS-404',
    name: 'Dayboat Turbot, Sea Bass & Scored Calamari Tubes',
    unitLabel: 'Case • 3kg Coastal Pack',
    categorySlug: 'seafood-fish',
    price: 42.0,
    image: '/images/commercial/dayboat_turbot_ice.jpg',
    origin: 'Cornish & Atlantic Fleet',
    tempZone: 'Frozen -18°C',
    description: 'Fillets of sea bass and pre-scored tender squid tubes for crispy calamari.',
  },

  // ─── BAKERY & BREAKFAST ───
  {
    id: 'bb-1',
    sku: 'RW-BB-406',
    name: 'Artisan Glazed Gourmet Burger Brioche Buns',
    unitLabel: 'Case • 48 x 85g Pre-Sliced',
    categorySlug: 'bakery-breakfast',
    price: 18.5,
    originalPrice: 21.5,
    discountPercent: 14,
    image: '/images/commercial/11_hotels.jpg',
    origin: 'Craft Bakery, UK',
    tempZone: 'Frozen Bake-Off',
    description: 'Light, butter-enriched pre-sliced brioche buns that hold up to juicy smash burgers.',
  },
  {
    id: 'bb-2',
    sku: 'RW-BB-407',
    name: '36-Hour Wild Ferment Sourdough Boules & Ciabatta',
    unitLabel: 'Case • 8 x 800g Loaves',
    categorySlug: 'bakery-breakfast',
    price: 21.0,
    originalPrice: 24.0,
    discountPercent: 12,
    image: '/images/commercial/11_hotels.jpg',
    origin: 'Artisan Bakery, UK',
    tempZone: 'Frozen Bake-Off',
    description: 'Stone-baked crusted sourdough boules and olive oil ciabatta rolls for table bread.',
  },
  {
    id: 'bb-3',
    sku: 'RW-BB-408',
    name: 'All-Butter French Croissants & Pain au Chocolat',
    unitLabel: 'Case • 60 x 70g Ready-to-Bake',
    categorySlug: 'bakery-breakfast',
    price: 27.5,
    image: '/images/commercial/10_restaurant.jpg',
    origin: 'Charentes-Poitou Butter',
    tempZone: 'Frozen -18°C',
    description: '24-layer laminated all-butter viennoiserie for hotel breakfast buffets and cafes.',
  },

  // ─── FROZEN & GOURMET CHIPS ───
  {
    id: 'fc-1',
    sku: 'RW-FS-404',
    name: 'Gourmet Skin-On Stealth Bistro Fries (9x9mm)',
    unitLabel: 'Case • 4 x 2.5kg (10kg)',
    categorySlug: 'frozen-chips',
    price: 16.9,
    originalPrice: 19.8,
    discountPercent: 15,
    image: '/images/commercial/14_pubs_bars.jpg',
    origin: 'British Potatoes',
    tempZone: 'Frozen -18°C',
    description: 'Gluten-free invisible starch coating keeps fries crisp for 25+ minutes on the pass.',
    isPopularAddon: true,
  },
  {
    id: 'fc-2',
    sku: 'RW-FS-405',
    name: 'Chunky Triple-Cooked Gastro Pub Chips (18x18mm)',
    unitLabel: 'Case • 4 x 2.5kg (10kg)',
    categorySlug: 'frozen-chips',
    price: 18.2,
    originalPrice: 21.0,
    discountPercent: 13,
    image: '/images/commercial/14_pubs_bars.jpg',
    origin: 'Lincolnshire, UK',
    tempZone: 'Frozen -18°C',
    description: 'Blistered outer crunch with fluffy Maris Piper potato interior.',
  },
  {
    id: 'fc-3',
    sku: 'RW-FS-409',
    name: 'Cypriot Halloumi Fries & Crispy Herb Falafel',
    unitLabel: 'Case • 5 x 1kg Bags',
    categorySlug: 'frozen-chips',
    price: 33.0,
    originalPrice: 38.0,
    discountPercent: 13,
    image: '/images/commercial/13_caterers.jpg',
    origin: 'Cyprus & UK',
    tempZone: 'Frozen -18°C',
    description: 'Pre-cut coated halloumi fingers and chickpea herb falafel for starters and bar menus.',
  },
  {
    id: 'fc-4',
    sku: 'RW-FS-410',
    name: 'IQF Baby Petits Pois, Edamame & Leaf Spinach',
    unitLabel: 'Case • 10 x 1kg Bags',
    categorySlug: 'frozen-chips',
    price: 19.0,
    image: '/images/commercial/british_brassicas_crates.jpg',
    origin: 'British Harvest',
    tempZone: 'Frozen -18°C',
    description: 'Flash-frozen within 2 hours of picking to lock in sweetness and bright green colour.',
  },

  // ─── EVERYDAY GROCERY, OIL & GHEE, PASTA & PULSES ───
  {
    id: 'og-1',
    sku: 'RW-AG-501',
    name: 'Extended-Life Commercial Rapeseed Frying Oil',
    unitLabel: 'Drum • 20L Box-in-Bag',
    categorySlug: 'oil-ghee',
    price: 28.5,
    originalPrice: 33.5,
    discountPercent: 15,
    image: '/images/commercial/06_dry_goods.jpg',
    origin: 'British Cold-Press',
    tempZone: 'Ambient Dry Store',
    description: 'High smoke-point (230°C) anti-foaming culinary oil engineered for heavy-duty fryers.',
  },
  {
    id: 'og-2',
    sku: 'RW-AG-502',
    name: 'Cold-Pressed Mediterranean Extra Virgin Olive Oil',
    unitLabel: 'Case • 4 x 5L Catering Tins',
    categorySlug: 'oil-ghee',
    price: 64.0,
    originalPrice: 74.0,
    discountPercent: 14,
    image: '/images/commercial/dry_pantry_wholesale.jpg',
    origin: 'Spain & Italy',
    tempZone: 'Ambient Dry Store',
    description: 'Peppery first-press extra virgin olive oil for dressings, focaccia, and pass finishing.',
  },
  {
    id: 'pp-1',
    sku: 'RW-AG-503',
    name: '24-Month Aged Extra-Long Himalayan Basmati Rice',
    unitLabel: 'Sack • 20kg Catering Sack',
    categorySlug: 'pasta-pulses',
    price: 31.0,
    originalPrice: 36.0,
    discountPercent: 14,
    image: '/images/commercial/dry_pantry_wholesale.jpg',
    origin: 'Himalayan Foothills',
    tempZone: 'Ambient Dry Store',
    description: 'Aromatic, non-clumping extra-long basmati grains with high elongation yield.',
  },
  {
    id: 'pp-2',
    sku: 'RW-AG-504',
    name: 'Gragnano Bronze-Die Penne, Linguine & Carnaroli Rice',
    unitLabel: 'Case • 4 x 3kg Catering Bags',
    categorySlug: 'pasta-pulses',
    price: 22.8,
    image: '/images/commercial/09_more_categories.jpg',
    origin: 'Naples & Piedmont, Italy',
    tempZone: 'Ambient Dry Store',
    description: 'Slow-dried bronze-extruded durum wheat pasta that holds al-dente bite on the pass.',
  },
  {
    id: 'eg-1',
    sku: 'RW-AG-505',
    name: 'Italian San Marzano Peeled Plum Tomatoes (A10 Tins)',
    unitLabel: 'Case • 6 x 2.55kg Tins',
    categorySlug: 'everyday-grocery',
    price: 19.5,
    originalPrice: 23.0,
    discountPercent: 15,
    image: '/images/commercial/07_sauces_condiments.jpg',
    origin: 'Campania, Italy',
    tempZone: 'Ambient Dry Store',
    description: 'Sun-ripened whole peeled plum tomatoes in thick rich juice for pizza and Napoletana.',
  },
  {
    id: 'eg-2',
    sku: 'RW-AG-506',
    name: 'Neapolitan Tipo 00 Pizza Flour & Strong Bread Flour',
    unitLabel: 'Sack • 25kg Mill Sack',
    categorySlug: 'everyday-grocery',
    price: 21.5,
    originalPrice: 25.0,
    discountPercent: 14,
    image: '/images/commercial/06_dry_goods.jpg',
    origin: 'Italian & UK Mills',
    tempZone: 'Ambient Dry Store',
    description: 'High-protein W300–W320 flour for long-fermentation pizza doughs and artisan loaves.',
  },

  // ─── SPICES, SAUCES & DRESSINGS ───
  {
    id: 'ss-1',
    sku: 'RW-AG-507',
    name: 'Maldon Sea Salt Flakes & Tellicherry Black Peppercorns',
    unitLabel: 'Bucket • 1.5kg Salt + 600g Pepper',
    categorySlug: 'spices-sauces',
    price: 24.5,
    originalPrice: 28.0,
    discountPercent: 12,
    image: '/images/commercial/exact_spices.jpg',
    origin: 'Maldon, UK & India',
    tempZone: 'Ambient Dry Store',
    description: 'Hand-harvested pyramid sea salt crystals and aromatic whole black peppercorns.',
  },
  {
    id: 'ss-2',
    sku: 'RW-AG-508',
    name: 'Thick Free-Range Real Mayonnaise, Dijon & Chef Jus',
    unitLabel: 'Bucket • 10L Catering Tub',
    categorySlug: 'spices-sauces',
    price: 23.0,
    originalPrice: 26.5,
    discountPercent: 13,
    image: '/images/commercial/07_sauces_condiments.jpg',
    origin: 'UK Culinary Larder',
    tempZone: 'Ambient Dry Store',
    description: 'Rich free-range egg mayonnaise, gluten-free demi-glace reductions, and aged balsamic.',
  },
  {
    id: 'ss-3',
    sku: 'RW-AG-509',
    name: 'Whole & Ground World Spice Collection (Cumin, Paprika, Harissa)',
    unitLabel: 'Pack • 6 x 500g Chef Jars',
    categorySlug: 'spices-sauces',
    price: 29.0,
    image: '/images/commercial/rootwills_spices.jpg',
    origin: 'Single-Estate Origins',
    tempZone: 'Ambient Dry Store',
    description: 'Steam-sterilised smoked La Vera paprika, roasted cumin, coriander, and rose harissa.',
  },

  // ─── TEA, COFFEE & BEVERAGES ───
  {
    id: 'tc-1',
    sku: 'RW-AG-510',
    name: 'Single-Origin Colombian Espresso Coffee Beans',
    unitLabel: 'Case • 6 x 1kg Valve Bags',
    categorySlug: 'tea-coffee',
    price: 58.0,
    originalPrice: 68.0,
    discountPercent: 15,
    image: '/images/commercial/11_hotels.jpg',
    origin: 'Colombia & Brazil',
    tempZone: 'Ambient Dry Store',
    description: 'Medium-dark roast specialty Arabica espresso beans with dark chocolate and hazelnut crema.',
  },
  {
    id: 'tc-2',
    sku: 'RW-AG-511',
    name: 'Still & Sparkling Spring Water Table Glass Bottles',
    unitLabel: 'Case • 12 x 750ml Glass',
    categorySlug: 'tea-coffee',
    price: 11.8,
    originalPrice: 14.0,
    discountPercent: 16,
    image: '/images/commercial/10_restaurant.jpg',
    origin: 'British Natural Springs',
    tempZone: 'Ambient Dry Store',
    description: 'Crystal dining table bottles of still and sparkling mineral water plus cold-pressed juices.',
  },

  // ─── DESSERTS & ICE CREAM ───
  {
    id: 'dg-1',
    sku: 'RW-FS-407',
    name: 'Belgian Dark Chocolate Molten Fondants & Cheesecakes',
    unitLabel: 'Box • 16 Pre-Portioned Units',
    categorySlug: 'desserts-gelato',
    price: 24.5,
    originalPrice: 28.5,
    discountPercent: 14,
    image: '/images/commercial/10_restaurant.jpg',
    origin: 'Continental Patisserie',
    tempZone: 'Frozen -18°C',
    description: 'Warm molten-centre Belgian chocolate fondants and baked New York vanilla cheesecakes.',
  },
  {
    id: 'dg-2',
    sku: 'RW-FS-408',
    name: 'Cornish Madagascan Vanilla & Pistachio Napoli Gelato',
    unitLabel: 'Tub • 4.75L Napoli Tub',
    categorySlug: 'desserts-gelato',
    price: 19.8,
    originalPrice: 23.0,
    discountPercent: 14,
    image: '/images/commercial/03_dairy_eggs.jpg',
    origin: 'Cornwall & Italy',
    tempZone: 'Frozen -18°C',
    description: 'Slow-churned artisan dairy gelato and mango/raspberry fruit sorbets.',
  },

  // ─── PACKAGING & HYGIENE ───
  {
    id: 'ph-1',
    sku: 'RW-NF-601',
    name: 'Eco Kraft Takeaway Boxes & Bagasse Burger Clamshells',
    unitLabel: 'Case • 300 Compostable Units',
    categorySlug: 'packaging-hygiene',
    price: 34.0,
    originalPrice: 39.5,
    discountPercent: 14,
    image: '/images/commercial/08_catering_supplies.jpg',
    origin: 'FSC Sustainable UK',
    tempZone: 'Non-Food Consumables',
    description: 'Leak-proof folded kraft boxes and breathable sugarcane burger clamshells.',
  },
  {
    id: 'ph-2',
    sku: 'RW-NF-602',
    name: '450mm Heavy-Duty Catering Foil, Cling Film & Parchment',
    unitLabel: 'Pack • 3 Cutterbox Rolls',
    categorySlug: 'packaging-hygiene',
    price: 26.5,
    originalPrice: 31.0,
    discountPercent: 15,
    image: '/images/commercial/exact_restaurant_pass.jpg',
    origin: 'Professional Grade',
    tempZone: 'Non-Food Consumables',
    description: 'Tear-resistant 18-micron catering aluminium foil, slide-cutter cling film, and baking parchment.',
  },
  {
    id: 'ph-3',
    sku: 'RW-NF-603',
    name: 'Food-Safe Kitchen Sanitiser (BS EN 1276) & Blue Roll Bale',
    unitLabel: 'Bundle • 2x5L + 6 Blue Rolls',
    categorySlug: 'packaging-hygiene',
    price: 22.0,
    originalPrice: 26.0,
    discountPercent: 15,
    image: '/images/commercial/cold_depot_logistics.jpg',
    origin: 'UK Commercial Hygiene',
    tempZone: 'Non-Food Consumables',
    description: '30-second bactericidal surface sanitiser and 2-ply embossed centrefeed blue roll.',
  },
];

interface CartLineItem {
  product: PandamartProduct;
  qty: number;
}

export function PublicProductsView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bannerSlide, setBannerSlide] = useState<number>(0);
  const [quickViewProduct, setQuickViewProduct] = useState<PandamartProduct | null>(null);
  const [hubInfoModalOpen, setHubInfoModalOpen] = useState<boolean>(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [customInquiryNotes, setCustomInquiryNotes] = useState<string>('');
  const [mobileCartDrawerOpen, setMobileCartDrawerOpen] = useState<boolean>(false);

  // Pre-seeded with 3 popular starter items so the right Pandamart sidebar looks alive immediately
  const [cart, setCart] = useState<CartLineItem[]>([
    { product: PANDAMART_PRODUCTS[8], qty: 1 }, // Isle of Wight Heritage Vine Tomatoes
    { product: PANDAMART_PRODUCTS[1], qty: 1 }, // Red Tractor Fresh Chicken Breast Fillets
    { product: PANDAMART_PRODUCTS[9], qty: 2 }, // Lincolnshire Maris Piper Potatoes
  ]);

  const categoryRailRef = useRef<HTMLDivElement>(null);
  const saleRowRef = useRef<HTMLDivElement>(null);
  const popularAddonRef = useRef<HTMLDivElement>(null);

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

  // Cart helpers
  const getQty = (productId: string) => {
    const found = cart.find((c) => c.product.id === productId);
    return found ? found.qty : 0;
  };

  const addOrIncrement = (product: PandamartProduct, delta = 1) => {
    setCart((prev) => {
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

  // Totals
  const totalUnits = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.qty, 0),
    [cart]
  );
  const originalSubtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + (item.product.originalPrice ?? item.product.price) * item.qty,
        0
      ),
    [cart]
  );

  // Popular add-ons not yet in cart (or all popular add-ons)
  const popularAddons = useMemo(
    () => PANDAMART_PRODUCTS.filter((p) => p.isPopularAddon),
    []
  );

  // Offer products (for the top SALE / OFFERS row)
  const offerProducts = useMemo(
    () => PANDAMART_PRODUCTS.filter((p) => p.discountPercent && p.discountPercent >= 12),
    []
  );

  // Filtered products when searching or filtering a category
  const filteredProducts = useMemo(() => {
    return PANDAMART_PRODUCTS.filter((p) => {
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.unitLabel.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'offers') return Boolean(p.discountPercent);
      if (selectedCategory === 'bulk-savers') return p.price >= 28;
      return p.categorySlug === selectedCategory;
    });
  }, [selectedCategory, searchQuery]);

  const isBrowsingAll = selectedCategory === 'all' && searchQuery.trim() === '';

  const handleCheckoutWithDesk = () => {
    if (cart.length > 0) {
      const lines = cart
        .map(
          (c, i) =>
            `${i + 1}. ${c.qty}x [${c.product.sku}] ${c.product.name} (${c.product.unitLabel}) — £${(
              c.product.price * c.qty
            ).toFixed(2)}`
        )
        .join('\n');
      setCustomInquiryNotes(
        `Pandamart Wholesale Order / Trade Checkout (£${subtotal.toFixed(2)} est. ex VAT):\n${lines}\n\nPlease confirm pre-dawn delivery slot and trade account invoice.`
      );
    } else {
      setCustomInquiryNotes(
        'Please open a Rootwills wholesale trade account and share the full multi-temperature price schedule.'
      );
    }
    setMobileCartDrawerOpen(false);
    setIsInquiryOpen(true);
  };

  // Reusable Pandamart Product Card (exact match to screenshot)
  const renderProductCard = (product: PandamartProduct, compact = false) => {
    const qty = getQty(product.id);

    return (
      <div
        key={product.id}
        onClick={() => setQuickViewProduct(product)}
        className={`group bg-[#FFFDF9] rounded-xl border border-[#E8DEC8] hover:border-[#BA8E4E] p-2.5 transition-all duration-200 flex flex-col justify-between cursor-pointer shadow-[0_2px_10px_rgba(46,6,13,0.03)] hover:shadow-[0_10px_24px_rgba(46,6,13,0.09)] ${
          compact ? 'w-[148px] sm:w-[162px] shrink-0' : 'w-full'
        }`}
      >
        <div>
          {/* Square Product Image Container with Bottom-Right Stepper Overlay */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#FAF7F2] mb-2 border border-[#EFE7D6]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              sizes="180px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Floating Bottom-Right + / [ 🗑 1 + ] Stepper Pill (Exact Pandamart Style) */}
            <div
              className="absolute bottom-1.5 right-1.5 left-1.5 flex justify-end z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {qty === 0 ? (
                <button
                  type="button"
                  onClick={() => addOrIncrement(product, 1)}
                  aria-label={`Add ${product.name}`}
                  className="w-8 h-8 rounded-full bg-[#FFFDF9] hover:bg-[#2E060D] text-[#2E060D] hover:text-[#FAF7F2] border border-[#DCD2C0] shadow-[0_3px_10px_rgba(0,0,0,0.16)] flex items-center justify-center transition-all active:scale-90 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              ) : (
                <div className="w-full flex items-center justify-between bg-[#FFFDF9] border border-[#BA8E4E] rounded-full px-2 py-1 shadow-[0_4px_12px_rgba(46,6,13,0.18)]">
                  <button
                    type="button"
                    onClick={() => addOrIncrement(product, -1)}
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
                    onClick={() => addOrIncrement(product, 1)}
                    aria-label="Increase quantity"
                    className="w-6 h-6 rounded-full hover:bg-[#2E060D]/10 text-[#2E060D] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Price Row (Burgundy Sale Price + Strikethrough) */}
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[13px] sm:text-[14px] font-sans font-extrabold text-[#8B2635] tabular-nums">
              £{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] font-sans text-stone-400 line-through tabular-nums">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Discount Pill (Like "12% off" in screenshot) */}
          {product.discountPercent && (
            <div className="mt-0.5 mb-1">
              <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-sans font-bold bg-[#8B2635]/12 text-[#8B2635]">
                {product.discountPercent}% off
              </span>
            </div>
          )}

          {/* Product Name & Pack Spec */}
          <h4 className="text-[12px] font-sans font-semibold text-[#131313] group-hover:text-[#2E060D] leading-snug line-clamp-2 mt-0.5">
            {product.name}
          </h4>
        </div>

        <p className="text-[10.5px] font-mono text-stone-500 truncate mt-1">
          {product.unitLabel}
        </p>
      </div>
    );
  };

  // Reusable Right Cart Panel Content (Desktop Right Column + Mobile Drawer)
  const renderRightOrderPanel = () => (
    <div className="flex flex-col h-full">
      {/* Top Delivery Standard Header (Centered icon + title like Pandamart screenshot) */}
      <div className="text-center pb-3.5 border-b border-[#E8DEC8]">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#DCD2C0] text-[#2E060D] mb-1">
          <Truck className="w-4 h-4 text-[#8B2635]" />
        </div>
        <div className="text-[11px] font-mono text-stone-600 font-medium">
          Standard Pre-Dawn (04:00 – 07:00 AM)
        </div>
        <h3 className="text-[14px] font-serif font-bold text-[#2E060D] mt-1 leading-snug">
          Your order from Rootwills – Midlands &amp; London Hub
        </h3>
      </div>

      {/* Added Line Items List (Exact Pandamart Row Format) */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#EFE7D6] py-2 max-h-[290px] pr-1">
        {cart.length === 0 ? (
          <div className="py-10 text-center space-y-2">
            <ShoppingBag className="w-7 h-7 text-stone-400 mx-auto stroke-[1.5]" />
            <p className="text-xs font-serif font-bold text-[#2E060D]">
              Your wholesale order is empty
            </p>
            <p className="text-[11px] text-stone-500 max-w-[200px] mx-auto">
              Click the + button on any product card to add items to your morning drop.
            </p>
          </div>
        ) : (
          cart.map(({ product, qty }) => (
            <div key={product.id} className="py-3 flex items-start justify-between gap-2.5">
              {/* Left Thumbnail + Offer Pill */}
              <div className="flex flex-col items-center shrink-0 w-11">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#E8DEC8]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                {product.discountPercent && (
                  <span className="mt-1 px-1.5 py-0.2 rounded text-[9px] font-sans font-bold bg-[#8B2635]/12 text-[#8B2635]">
                    Offer
                  </span>
                )}
              </div>

              {/* Middle Name & Unit */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-sans font-semibold text-[#131313] leading-snug line-clamp-2">
                  {product.name}
                </p>
                <p className="text-[10.5px] font-mono text-stone-500 mt-0.5 truncate">
                  {product.unitLabel}
                </p>
              </div>

              {/* Right Price + Quantity Pill Stepper */}
              <div className="flex flex-col items-end shrink-0">
                <span className="text-xs font-sans font-extrabold text-[#8B2635] tabular-nums">
                  £{(product.price * qty).toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-[10px] font-sans text-stone-400 line-through tabular-nums">
                    £{(product.originalPrice * qty).toFixed(2)}
                  </span>
                )}

                <div className="mt-1.5 flex items-center gap-2 bg-[#FFFDF9] border border-[#DCD2C0] rounded-full px-2 py-0.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => addOrIncrement(product, -1)}
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
                    onClick={() => addOrIncrement(product, 1)}
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

      {/* "Popular with your order" Mini-Carousel (Exact match to screenshot) */}
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
                className="w-[104px] shrink-0 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] p-1.5 flex flex-col justify-between cursor-pointer hover:border-[#BA8E4E] transition-colors"
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
                        addOrIncrement(addon, 1);
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

                  <div className="text-[11px] font-sans font-extrabold text-[#8B2635] tabular-nums">
                    £{addon.price.toFixed(2)}
                  </div>
                  {addon.originalPrice && (
                    <div className="text-[9.5px] font-sans text-stone-400 line-through tabular-nums">
                      £{addon.originalPrice.toFixed(2)}
                    </div>
                  )}
                  {addon.discountPercent && (
                    <span className="inline-block px-1 py-0.2 rounded text-[8.5px] font-bold bg-[#8B2635]/12 text-[#8B2635] mt-0.5">
                      {addon.discountPercent}% off
                    </span>
                  )}
                </div>

                <p className="text-[10px] font-sans text-stone-700 line-clamp-2 leading-tight mt-1">
                  {addon.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Total & Checkout CTA (Exact Pandamart Footer Format) */}
      <div className="pt-2.5 border-t border-[#DCD2C0] space-y-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-sans text-[#8B2635] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#BA8E4E] shrink-0" />
          <span>You&apos;ve got free pre-dawn delivery on trade orders!</span>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-sm font-serif font-bold text-[#131313]">Total</span>{' '}
            <span className="text-[10.5px] text-stone-500 font-sans">(excl. VAT)</span>
            <div>
              <button
                type="button"
                onClick={handleCheckoutWithDesk}
                className="text-[11px] font-sans text-stone-600 underline hover:text-[#2E060D] cursor-pointer"
              >
                See summary
              </button>
            </div>
          </div>

          <div className="text-right">
            <div className="text-base font-sans font-extrabold text-[#8B2635] tabular-nums">
              £{subtotal.toFixed(2)}
            </div>
            {originalSubtotal > subtotal && (
              <div className="text-[11px] font-sans text-stone-400 line-through tabular-nums">
                £{originalSubtotal.toFixed(2)}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCheckoutWithDesk}
          className="w-full py-3 px-4 rounded-xl bg-[#2E060D] hover:bg-[#4E0D17] text-[#FAF7F2] font-sans font-bold text-xs sm:text-[13px] tracking-wide shadow-[0_8px_24px_rgba(46,6,13,0.24)] transition-all active:scale-[0.98] cursor-pointer text-center"
        >
          Go to wholesale checkout
        </button>
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

      {/* ─── FULL-WIDTH 3-COLUMN PANDAMART INTERFACE ─── */}
      <div className="relative z-10 max-w-[1480px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-start gap-5 lg:gap-6">
          {/* ════════════════════════════════════════════════════════════════
              1. LEFT SIDEBAR: Store Info & Categories (Exact Pandamart Style)
             ════════════════════════════════════════════════════════════════ */}
          <aside className="hidden lg:block w-[220px] xl:w-[245px] shrink-0 sticky top-[82px] max-h-[calc(100vh-92px)] overflow-y-auto pr-3 border-r border-[#DCD2C0] [scrollbar-width:thin]">
            {/* Store Title & Delivery SLA Block */}
            <div className="pb-4 border-b border-[#E8DEC8] space-y-1.5">
              <h1 className="text-[15px] font-serif font-bold text-[#2E060D] leading-snug">
                Rootwills Mart – Midlands &amp; London Hub
              </h1>
              <p className="text-[11.5px] font-sans font-semibold text-[#8B2635]">
                Free delivery on first trade order
              </p>
              <p className="text-[11px] font-mono text-stone-600">
                £150.00 minimum
              </p>
              <p className="text-[11px] font-mono text-stone-600">
                Delivery window: 04:00 – 07:00 AM
              </p>

              <div className="pt-1.5">
                <button
                  type="button"
                  onClick={() => setHubInfoModalOpen(true)}
                  className="w-full py-1.5 px-3 rounded-lg bg-[#FFFDF9] hover:bg-[#2E060D] text-[#131313] hover:text-[#FAF7F2] border border-[#131313]/30 hover:border-[#2E060D] text-[11.5px] font-sans font-semibold transition-colors cursor-pointer"
                >
                  Shop and fee information
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
                  <span>All Wholesale Aisles</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {PANDAMART_CATEGORIES.map((cat) => {
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
                      <div className="flex items-center gap-2 min-w-0">
                        {cat.isOffer && (
                          <span className="w-4 h-4 rounded-full bg-[#8B2635] text-[#FAF7F2] flex items-center justify-center shrink-0">
                            <Percent className="w-2.5 h-2.5" />
                          </span>
                        )}
                        <span className="truncate">{cat.name}</span>
                      </div>
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
              2. CENTER COLUMN: Search + Dual Banners + Category Tiles + Aisles
             ════════════════════════════════════════════════════════════════ */}
          <main className="flex-1 min-w-0 py-1">
            {/* Top Rounded Pill Search Bar (Exact Pandamart Style) */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products"
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

            {/* 2-Card Promotional Hero Banners with Carousel Dots & Arrow (Exact Pandamart Style) */}
            <div className="relative mb-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Left Promo Card: Royal Burgundy & Gold */}
                <div
                  onClick={() => setSelectedCategory('bulk-savers')}
                  className="relative rounded-2xl overflow-hidden min-h-[168px] sm:min-h-[195px] p-5 sm:p-6 flex items-center bg-gradient-to-r from-[#2E060D] via-[#4E0D17] to-[#6E1423] text-[#FAF7F2] border border-[#BA8E4E]/45 cursor-pointer group shadow-sm"
                >
                  <div className="absolute right-0 inset-y-0 w-[52%] overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2E060D] via-[#2E060D]/40 to-transparent z-10" />
                    <Image
                      src={
                        bannerSlide === 0
                          ? '/images/commercial/04_meat_poultry.jpg'
                          : '/images/commercial/dry_pantry_wholesale.jpg'
                      }
                      alt="Rootwills Wholesale Rewards"
                      fill
                      unoptimized
                      sizes="400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="relative z-20 max-w-[64%] space-y-1.5">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                      {bannerSlide === 0
                        ? 'More orders.\nBigger rewards!'
                        : 'Locked Trade\nContract Rates!'}
                    </h2>
                    <div className="inline-flex items-center gap-1.5 bg-[#FAF7F2] text-[#2E060D] px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider">
                      <span>Order on ROOTWILLS</span>
                      <span className="bg-[#8B2635] text-white px-1 rounded text-[9px]">MART</span>
                    </div>
                    <div>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#131313]/85 text-[#F3D08A] font-mono text-[10px] font-semibold border border-[#BA8E4E]/40">
                        Pre-Dawn 04:00 AM Drop
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Promo Card: Fresh Harvest Guarantee */}
                <div
                  onClick={() => setSelectedCategory('fruits-vegetables')}
                  className="relative rounded-2xl overflow-hidden min-h-[168px] sm:min-h-[195px] p-5 sm:p-6 flex items-center bg-gradient-to-r from-[#1F3A2E] via-[#2A4D3E] to-[#13261D] text-[#FAF7F2] border border-[#BA8E4E]/45 cursor-pointer group shadow-sm"
                >
                  <div className="absolute right-0 inset-y-0 w-[55%] overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1F3A2E] via-[#1F3A2E]/35 to-transparent z-10" />
                    <Image
                      src={
                        bannerSlide === 0
                          ? '/images/commercial/rootwills_fresh_crates.jpg'
                          : '/images/commercial/artisan_dairy_eggs.jpg'
                      }
                      alt="Seasonal Fruits & Vegetables"
                      fill
                      unoptimized
                      sizes="400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Top-Right "fresh guaranteed" Stamp */}
                  <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-[#2E060D]/90 border border-[#F3D08A]/50 text-[#F3D08A] font-serif italic font-bold text-[11px] shadow-md">
                    fresh guaranteed
                  </div>

                  <div className="relative z-20 max-w-[65%] space-y-1.5">
                    <div className="inline-block bg-[#8B2635] text-white px-3 py-1 rounded-lg">
                      <span className="text-lg sm:text-xl font-serif font-bold block leading-none">
                        Up to 15% off
                      </span>
                      <span className="text-[10.5px] font-sans text-[#F3D08A] block mt-0.5">
                        Seasonal fruits, veg &amp; butchery
                      </span>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-[#131313] text-white font-sans font-bold text-[10.5px]">
                        Direct British Farm Harvest
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Floating Banner Next Button (Like Screenshot) */}
              <button
                type="button"
                onClick={() => setBannerSlide((prev) => (prev === 0 ? 1 : 0))}
                aria-label="Next banner"
                className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-[#FFFDF9] border border-[#DCD2C0] shadow-md items-center justify-center text-[#2E060D] hover:bg-[#2E060D] hover:text-[#FAF7F2] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Carousel Pagination Dots Underneath */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5">
                {[0, 1].map((dot) => (
                  <button
                    key={dot}
                    type="button"
                    onClick={() => setBannerSlide(dot)}
                    aria-label={`Banner slide ${dot + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      bannerSlide === dot ? 'w-4 bg-[#2E060D]' : 'w-1.5 bg-stone-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Horizontal Square Category Thumbnail Rail (Exact Pandamart Tile Row) */}
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
                {PANDAMART_CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(active ? 'all' : cat.slug)
                      }
                      className={`group w-[78px] sm:w-[86px] shrink-0 flex flex-col items-center text-center cursor-pointer transition-all`}
                    >
                      <div
                        className={`relative w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] rounded-xl overflow-hidden mb-1.5 border transition-all flex items-center justify-center ${
                          active
                            ? 'bg-[#2E060D]/10 border-[#2E060D] ring-2 ring-[#2E060D]/20 shadow-xs'
                            : cat.isOffer
                            ? 'bg-[#8B2635]/10 border-[#8B2635]/30 hover:border-[#8B2635]'
                            : 'bg-[#FFFDF9] border-[#E8DEC8] hover:border-[#BA8E4E]'
                        }`}
                      >
                        {cat.isOffer ? (
                          <div className="w-9 h-9 rounded-full bg-[#8B2635] text-[#FAF7F2] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                            <Percent className="w-4 h-4" />
                          </div>
                        ) : (
                          <Image
                            src={cat.image}
                            alt={cat.shortName}
                            fill
                            unoptimized
                            sizes="76px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
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
                {/* 1. Horizontal "SALE / TRADE OFFERS" Carousel Row (Exact Match to Screenshot) */}
                <section className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg sm:text-xl font-serif font-extrabold text-[#2E060D] uppercase tracking-tight">
                      SALE &amp; TRADE OFFERS
                    </h2>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('offers')}
                      className="text-xs font-sans font-bold text-[#2E060D] hover:text-[#8B2635] underline cursor-pointer"
                    >
                      View All
                    </button>
                  </div>

                  <div className="relative">
                    <div
                      ref={saleRowRef}
                      className="flex items-stretch gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2"
                    >
                      {offerProducts.map((prod) => renderProductCard(prod, true))}
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollContainer(saleRowRef, 'right', 360)}
                      aria-label="Scroll sale products right"
                      className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#FFFDF9] border border-[#DCD2C0] shadow-md items-center justify-center text-[#2E060D] hover:bg-[#2E060D] hover:text-[#FAF7F2] transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </section>

                {/* 2. All Category Aisle Sections */}
                {PANDAMART_CATEGORIES.filter(
                  (c) => c.slug !== 'offers' && c.slug !== 'bulk-savers'
                ).map((aisle) => {
                  const items = PANDAMART_PRODUCTS.filter(
                    (p) => p.categorySlug === aisle.slug
                  );
                  if (items.length === 0) return null;

                  return (
                    <section key={aisle.slug} className="pt-2 border-t border-[#E8DEC8]">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base sm:text-lg font-serif font-bold text-[#2E060D]">
                          {aisle.name}
                        </h2>
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
                      {PANDAMART_CATEGORIES.find((c) => c.slug === selectedCategory)?.name ||
                        'Wholesale Search Results'}
                    </h2>
                    <p className="text-xs text-stone-500 font-sans">
                      Showing {filteredProducts.length} wholesale items
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
                    ← Back to All Aisles
                  </button>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] p-10 text-center space-y-3">
                    <p className="text-base font-serif font-bold text-[#2E060D]">
                      No products matched &ldquo;{searchQuery}&rdquo;
                    </p>
                    <p className="text-xs text-stone-600 max-w-md mx-auto">
                      Our procurement team sources 1,200+ custom kitchen lines daily. Click below to request a custom item quote.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomInquiryNotes(`Custom product sourcing enquiry: ${searchQuery}`);
                        setIsInquiryOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#2E060D] text-[#FAF7F2] text-xs font-sans font-bold cursor-pointer"
                    >
                      Ask Desk to Source Item
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
              3. RIGHT SIDEBAR: Live Order + "Popular with your order" (Exact Pandamart Style)
             ════════════════════════════════════════════════════════════════ */}
          <aside className="hidden xl:block w-[310px] 2xl:w-[335px] shrink-0 sticky top-[82px]">
            <div className="rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] p-4 shadow-[0_8px_28px_rgba(46,6,13,0.05)] max-h-[calc(100vh-96px)] flex flex-col">
              {renderRightOrderPanel()}
            </div>
          </aside>
        </div>
      </div>

      {/* ─── MOBILE / TABLET FLOATING BOTTOM BASKET BAR (< xl) ─── */}
      {totalUnits > 0 && (
        <div className="fixed bottom-4 inset-x-3.5 z-40 xl:hidden">
          <button
            type="button"
            onClick={() => setMobileCartDrawerOpen(true)}
            className="w-full py-3 px-4 rounded-2xl bg-[#2E060D] text-[#FAF7F2] shadow-[0_14px_34px_rgba(0,0,0,0.38)] border border-[#BA8E4E]/50 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#F3D08A] text-[#131313] font-mono text-xs font-extrabold flex items-center justify-center">
                {totalUnits}
              </span>
              <span className="text-xs sm:text-sm font-sans font-bold">
                View your wholesale order
              </span>
            </div>
            <span className="font-mono text-xs sm:text-sm font-extrabold text-[#F3D08A]">
              £{subtotal.toFixed(2)} →
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
              aria-label="Close basket"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#DCD2C0] flex items-center justify-center text-[#2E060D]"
            >
              <X className="w-4 h-4" />
            </button>
            {renderRightOrderPanel()}
          </div>
        </div>
      )}

      {/* ─── PRODUCT QUICK VIEW MODAL ─── */}
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

              <div className="space-y-1 pr-6">
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
                <p className="text-xs font-mono text-stone-600">
                  {quickViewProduct.unitLabel} • Origin: {quickViewProduct.origin}
                </p>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-lg font-sans font-extrabold text-[#8B2635]">
                    £{quickViewProduct.price.toFixed(2)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-xs text-stone-400 line-through">
                      £{quickViewProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-600 font-sans leading-relaxed bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E8DEC8]">
              {quickViewProduct.description}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  addOrIncrement(quickViewProduct, 1);
                  setQuickViewProduct(null);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#2E060D] hover:bg-[#4E0D17] text-[#FAF7F2] text-xs font-sans font-bold cursor-pointer"
              >
                + Add to Wholesale Order (£{quickViewProduct.price.toFixed(2)})
              </button>
              <button
                type="button"
                onClick={() => {
                  const p = quickViewProduct;
                  setQuickViewProduct(null);
                  setCustomInquiryNotes(
                    `Wholesale quote inquiry for [${p.sku}] ${p.name} (${p.unitLabel})`
                  );
                  setIsInquiryOpen(true);
                }}
                className="py-2.5 px-4 rounded-xl bg-[#FAF7F2] border border-[#DCD2C0] hover:border-[#2E060D] text-[#2E060D] text-xs font-sans font-semibold cursor-pointer"
              >
                Ask Sales Desk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── SHOP & FEE INFORMATION MODAL ─── */}
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
              Rootwills Hub &amp; Delivery Information
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
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wholesale Checkout / Partnership Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialNotes={customInquiryNotes}
      />
    </div>
  );
}
