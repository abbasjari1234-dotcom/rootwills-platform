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
  subcategories: string[];
}

export interface WholesaleProduct {
  id: string;
  sku: string;
  name: string;
  packSize: string;
  categorySlug: WholesaleCategorySlug;
  subcategory?: string;
  image: string;
  origin: string;
  tempZone: 'Chilled 1–4°C' | 'Butchery 0–2°C' | 'Frozen -18°C' | 'Ambient' | 'Non-Food';
  description: string;
  featuredCore?: boolean;
  popularAddon?: boolean;
}

export const WHOLESALE_CATEGORIES: WholesaleCategory[] = [
  {
    slug: 'bakery-breakfast',
    name: 'Bakery, Bread & Sweet Morning Goods',
    shortName: 'Bakery & Bread',
    tempBadge: 'Frozen Bake-Off',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    subcategories: [
      'Loaves & Bloomers',
      'Baguettes & Paninis',
      'Burger Buns & Baps',
      'Wraps, Flatbreads & Bagels',
      'Viennoiserie & Croissants',
      'Cakes & Traybakes',
      'Muffins, Cookies & Donuts',
    ],
  },
  {
    slug: 'meat-poultry',
    name: 'Prime Butchery & Poultry',
    shortName: 'Meat & Poultry',
    tempBadge: 'Butchery 0–2°C',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80',
    subcategories: ['Prime British Beef', 'Red Tractor Chicken & Poultry', 'Welsh Lamb & Mutton', 'Burgers & Minces', 'Game, Duck & Specialty', 'Cooked & Deli Meats'],
  },
  {
    slug: 'chilled-dairy',
    name: 'Chilled Dairy, Cheese & Eggs',
    shortName: 'Dairy & Eggs',
    tempBadge: 'Chilled 1–4°C',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
    subcategories: ['British & Continental Cheese', 'Butter, Fats & Spreads', 'Creams & Custards', 'Milks & Plant Drinks', 'Eggs & Egg Products', 'Yoghurts & Desserts', 'Dips, Deli & Cooked Lines'],
  },
  {
    slug: 'fresh-produce',
    name: 'Fresh Fruit, Vegetables & Salad',
    shortName: 'Fresh Produce',
    tempBadge: 'Chilled 1–4°C',
    image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=600&auto=format&fit=crop&q=80',
    subcategories: ['Potatoes, Roots & Onions', 'Market Vegetables & Brassicas', 'Salad, Tomatoes & Fresh Herbs', 'Fresh Fruit, Berries & Citrus', 'Mushrooms & Speciality Produce', 'Prepared & Prepped Vegetables'],
  },
  {
    slug: 'seafood-fish',
    name: 'Seafood & Coastal Fish',
    shortName: 'Seafood & Fish',
    tempBadge: 'Frozen / Chilled',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    subcategories: ['Salmon & White Fish', 'Prawns & Shellfish', 'Breaded & Coated Seafood'],
  },
  {
    slug: 'frozen-chips',
    name: 'Frozen Chips, Veg & Savoury',
    shortName: 'Frozen & Chips',
    tempBadge: 'Frozen -18°C',
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=600&auto=format&fit=crop&q=80',
    subcategories: ['Stealth & Gastro Fries', 'Frozen Veg & Petits Pois', 'Sweet Potato & Hash Browns'],
  },
  {
    slug: 'everyday-grocery',
    name: 'Grocery, Tinned & Flour',
    shortName: 'Everyday Grocery',
    tempBadge: 'Ambient',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    subcategories: ['Catering Flours & Sugars', 'Tinned Tomatoes & Beans', 'Baking Ingredients'],
  },
  {
    slug: 'oil-fats',
    name: 'Cooking Oils, Olive Oil & Fats',
    shortName: 'Oils & Fats',
    tempBadge: 'Ambient',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    subcategories: ['Olive Oils', 'Commercial Frying Oils', 'Specialty Dressing Oils'],
  },
  {
    slug: 'rice-pasta',
    name: 'Rice, Pasta, Grains & Pulses',
    shortName: 'Rice & Pasta',
    tempBadge: 'Ambient',
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=600&auto=format&fit=crop&q=80',
    subcategories: ['Basmati & Risotto Rice', 'Bronze-Die Italian Pasta', 'Couscous & Grains'],
  },
  {
    slug: 'spices-sauces',
    name: 'Spices, Stocks & Condiments',
    shortName: 'Spices & Sauces',
    tempBadge: 'Ambient',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    subcategories: ['Chef Spices & Seasonings', 'Stock Pastes & Jus', 'Mayonnaise & Table Sauces'],
  },
  {
    slug: 'tea-coffee',
    name: 'Coffee, Tea & Soft Drinks',
    shortName: 'Beverages',
    tempBadge: 'Ambient',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80',
    subcategories: ['Artisan Coffee & Espresso', 'Hospitality Teas & Infusions', 'Carbonated & Soft Drinks', 'Fruit Juices & Smoothies', 'Mineral Waters & Tonics', 'Hot Chocolate & Barista Syrups'],
  },
  {
    slug: 'desserts-icecream',
    name: 'Patisserie Desserts & Gelato',
    shortName: 'Desserts & Gelato',
    tempBadge: 'Frozen -18°C',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80',
    subcategories: ['Portioned Patisserie', 'Cornish Dairy Gelato', 'Cheesecakes & Tarts'],
  },
  {
    slug: 'packaging-hygiene',
    name: 'Non-Food, Disposables & Hygiene',
    shortName: 'Non-Food & Hygiene',
    tempBadge: 'Non-Food',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80',
    subcategories: ['Takeaway Kraft Packaging', 'Kitchen Foils & Films', 'Blue Roll & Chemicals'],
  },
];

import bakeryCatalog from './products/bakery.json';
import meatCatalog from './products/meat.json';
import dairyCatalog from './products/dairy.json';
import drinksCatalog from './products/drinks.json';
import produceCatalog from './products/produce.json';

export const WHOLESALE_PRODUCTS: WholesaleProduct[] = [
  ...(bakeryCatalog as WholesaleProduct[]),
  ...(meatCatalog as WholesaleProduct[]),
  ...(dairyCatalog as WholesaleProduct[]),
  ...(drinksCatalog as WholesaleProduct[]),
  ...(produceCatalog as WholesaleProduct[]),

  // ════════════════════════════════════════════════════════════════
  // 5. SEAFOOD & COASTAL FISH
  // ════════════════════════════════════════════════════════════════
  {
    id: 'sf-1',
    sku: 'RW-FS-401',
    name: 'Scottish Salmon Centre-Cut Portions (Skin-On)',
    packSize: '10 × 200g Vac-Pack',
    categorySlug: 'seafood-fish',
    subcategory: 'Salmon & White Fish',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    origin: 'Scottish Highlands',
    tempZone: 'Frozen -18°C',
    description: 'Descaled, pin-boned Scottish salmon suprêmes individually vacuum-sealed for zero portion waste.',
    featuredCore: true,
  },
  {
    id: 'sf-2',
    sku: 'RW-FS-402',
    name: 'MSC Atlantic Cod Skinless Loins (170–230g)',
    packSize: '4.54kg Shatterpack',
    categorySlug: 'seafood-fish',
    subcategory: 'Salmon & White Fish',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    origin: 'North East Atlantic (FAO 27)',
    tempZone: 'Frozen -18°C',
    description: 'Frozen-at-sea within 2 hours of catch for bright white flaky texture and zero drip loss.',
  },
  {
    id: 'sf-3',
    sku: 'RW-FS-403',
    name: 'Raw Peeled Black Tiger King Prawns (16/20 IQF)',
    packSize: '5 × 1kg IQF Bags',
    categorySlug: 'seafood-fish',
    subcategory: 'Prawns & Shellfish',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&auto=format&fit=crop&q=80',
    origin: 'BAP 4-Star Certified',
    tempZone: 'Frozen -18°C',
    description: 'Deveined tail-on king prawns and scored squid tubes for grilling, pasta, and starters.',
  },
  {
    id: 'sf-4',
    sku: 'RW-FS-404',
    name: 'Salt & Pepper Breaded Crispy Squid Chunks',
    packSize: '10 × 1kg IQF Case',
    categorySlug: 'seafood-fish',
    subcategory: 'Breaded & Coated Seafood',
    image: 'https://images.unsplash.com/photo-1544378730-8b5104b18790?w=600&auto=format&fit=crop&q=80',
    origin: 'Ocean Graded',
    tempZone: 'Frozen -18°C',
    description: 'Pineapple-cut tender squid bites coated in aromatic salt and Sichuan pepper seasoning.',
  },

  // ════════════════════════════════════════════════════════════════
  // 6. FROZEN CHIPS, VEG & SAVOURY
  // ════════════════════════════════════════════════════════════════
  {
    id: 'fc-1',
    sku: 'RW-FZ-404',
    name: 'Gourmet Skin-On Stealth Bistro Fries (9mm)',
    packSize: '4 × 2.5kg Case',
    categorySlug: 'frozen-chips',
    subcategory: 'Stealth & Gastro Fries',
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
    name: 'Chunky Triple-Cooked Gastro Pub Chips (18mm)',
    packSize: '4 × 2.5kg Case',
    categorySlug: 'frozen-chips',
    subcategory: 'Stealth & Gastro Fries',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&auto=format&fit=crop&q=80',
    origin: 'Lincolnshire Potatoes, UK',
    tempZone: 'Frozen -18°C',
    description: '18x18mm thick-cut pub chips with blistered golden exterior and fluffy potato centre.',
  },
  {
    id: 'fc-3',
    sku: 'RW-FZ-406',
    name: 'Crispy Coated Sweet Potato Fries (11mm)',
    packSize: '4 × 2.5kg Case',
    categorySlug: 'frozen-chips',
    subcategory: 'Sweet Potato & Hash Browns',
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=600&auto=format&fit=crop&q=80',
    origin: 'USA Grade A',
    tempZone: 'Frozen -18°C',
    description: 'Crunchy battered sweet potato fries with caramelised sweetness and superior heat retention.',
  },
  {
    id: 'fc-4',
    sku: 'RW-FZ-407',
    name: 'IQF Baby Petits Pois, Sweetcorn & Edamame',
    packSize: '10 × 1kg Case',
    categorySlug: 'frozen-chips',
    subcategory: 'Frozen Veg & Petits Pois',
    image: 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?w=600&auto=format&fit=crop&q=80',
    origin: 'Yorkshire & Lincolnshire, UK',
    tempZone: 'Frozen -18°C',
    description: 'Flash-frozen within 120 minutes of harvesting to lock in natural sugar and bright colour.',
  },

  // ════════════════════════════════════════════════════════════════
  // 7. GROCERY, TINNED & FLOUR
  // ════════════════════════════════════════════════════════════════
  {
    id: 'eg-1',
    sku: 'RW-AG-501',
    name: 'Italian San Marzano Peeled Plum Tomatoes (A10)',
    packSize: '6 × 2.55kg Case',
    categorySlug: 'everyday-grocery',
    subcategory: 'Tinned Tomatoes & Beans',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    origin: 'Campania, Italy',
    tempZone: 'Ambient',
    description: 'Sun-ripened whole peeled plum tomatoes in thick juice alongside pre-cooked chickpeas and pulses.',
    featuredCore: true,
  },
  {
    id: 'eg-2',
    sku: 'RW-AG-502',
    name: 'Neapolitan Tipo 00 Pizza & Strong Bread Flour',
    packSize: '16kg / 25kg Sack',
    categorySlug: 'everyday-grocery',
    subcategory: 'Catering Flours & Sugars',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    origin: 'Italian & British Heritage Mills',
    tempZone: 'Ambient',
    description: 'Finely milled W300–W320 pizza flour, culinary plain/self-raising flours, and pure cane caster sugar.',
  },

  // ════════════════════════════════════════════════════════════════
  // 8. COOKING OILS, OLIVE OIL & FATS
  // ════════════════════════════════════════════════════════════════
  {
    id: 'of-1',
    sku: 'RW-AG-504',
    name: 'Cold-Pressed Mediterranean Extra Virgin Olive Oil',
    packSize: '4 × 5L Tins',
    categorySlug: 'oil-fats',
    subcategory: 'Olive Oils',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    origin: 'Spain & Italy',
    tempZone: 'Ambient',
    description: 'First cold-press extra virgin olive oil for dressings, bread service, and pass finishing.',
    featuredCore: true,
  },
  {
    id: 'of-2',
    sku: 'RW-AG-505',
    name: 'Extended-Life Commercial Rapeseed Frying Oil (230°C)',
    packSize: '20L Box-in-Bag Drum',
    categorySlug: 'oil-fats',
    subcategory: 'Commercial Frying Oils',
    image: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600&auto=format&fit=crop&q=80',
    origin: 'UK Cold-Press',
    tempZone: 'Ambient',
    description: 'High smoke-point (230°C) anti-foaming commercial frying oil engineered for heavy-duty fryers.',
  },

  // ════════════════════════════════════════════════════════════════
  // 9. RICE, PASTA, GRAINS & PULSES
  // ════════════════════════════════════════════════════════════════
  {
    id: 'rp-1',
    sku: 'RW-AG-507',
    name: '24-Month Aged Extra-Long Himalayan Basmati Rice',
    packSize: '20kg Sack',
    categorySlug: 'rice-pasta',
    subcategory: 'Basmati & Risotto Rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    origin: 'Himalayan Foothills',
    tempZone: 'Ambient',
    description: 'Aromatic extra-long basmati rice alongside Italian Carnaroli and Arborio risotto rice.',
  },
  {
    id: 'rp-2',
    sku: 'RW-AG-508',
    name: 'Gragnano Bronze-Die Durum Wheat Penne & Rigatoni',
    packSize: '4 × 3kg Case',
    categorySlug: 'rice-pasta',
    subcategory: 'Bronze-Die Italian Pasta',
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=600&auto=format&fit=crop&q=80',
    origin: 'Naples, Italy',
    tempZone: 'Ambient',
    description: 'Slow-dried bronze-extruded Italian pasta engineered to hold al-dente texture during service.',
  },

  // ════════════════════════════════════════════════════════════════
  // 10. SPICES, STOCKS & CONDIMENTS
  // ════════════════════════════════════════════════════════════════
  {
    id: 'ss-1',
    sku: 'RW-AG-510',
    name: 'Chef Spices, Tellicherry Peppercorns & Maldon Salt',
    packSize: '6 × 500g Chef Pack',
    categorySlug: 'spices-sauces',
    subcategory: 'Chef Spices & Seasonings',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    origin: 'Single-Estate Origins & Maldon, UK',
    tempZone: 'Ambient',
    description: 'Steam-sterilised Tellicherry black peppercorns, smoked paprika, cumin, saffron, and sea salt flakes.',
  },
  {
    id: 'ss-2',
    sku: 'RW-AG-511',
    name: 'Gluten-Free Concentrated Beef, Chicken & Veg Stock Paste',
    packSize: '2 × 1kg Tubs',
    categorySlug: 'spices-sauces',
    subcategory: 'Stock Pastes & Jus',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    origin: 'British Professional Kitchens',
    tempZone: 'Ambient',
    description: 'MSG-free reduced meat and vegetable stock pastes that dissolve instantly for jus and braises.',
  },

  // ════════════════════════════════════════════════════════════════
  // 12. PATISSERIE DESSERTS & GELATO
  // ════════════════════════════════════════════════════════════════
  {
    id: 'di-1',
    sku: 'RW-DS-410',
    name: 'Belgian Dark Chocolate Fondants & Baked Cheesecakes',
    packSize: '16 Pre-Portioned Units',
    categorySlug: 'desserts-icecream',
    subcategory: 'Portioned Patisserie',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
    origin: 'British & Continental Patisserie',
    tempZone: 'Frozen -18°C',
    description: 'Molten-centre Belgian dark chocolate fondants, baked vanilla cheesecakes, and glazed lemon tarts.',
  },
  {
    id: 'di-2',
    sku: 'RW-DS-411',
    name: 'Cornish Madagascan Vanilla & Pistachio Dairy Gelato',
    packSize: '4.75L Napoli Tub',
    categorySlug: 'desserts-icecream',
    subcategory: 'Cornish Dairy Gelato',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80',
    origin: 'Cornwall & Italy',
    tempZone: 'Frozen -18°C',
    description: 'Slow-churned real vanilla pod dairy gelato and fruit sorbets engineered for restaurant quenelles.',
  },

  // ════════════════════════════════════════════════════════════════
  // 13. NON-FOOD, DISPOSABLES & HYGIENE
  // ════════════════════════════════════════════════════════════════
  {
    id: 'ph-1',
    sku: 'RW-NF-601',
    name: 'Eco Kraft Takeaway Boxes & Bagasse Burger Clamshells',
    packSize: '300 Units Case',
    categorySlug: 'packaging-hygiene',
    subcategory: 'Takeaway Kraft Packaging',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop&q=80',
    origin: 'FSC Sustainable UK',
    tempZone: 'Non-Food',
    description: 'Grease-resistant folded kraft food boxes, breathable bagasse clamshells, and double-wall hot cups.',
  },
  {
    id: 'ph-2',
    sku: 'RW-NF-602',
    name: '450mm Catering Aluminium Foil, Cling Film & Blue Roll',
    packSize: '6-Pack Cutterbox Case',
    categorySlug: 'packaging-hygiene',
    subcategory: 'Kitchen Foils & Films',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80',
    origin: 'Professional Kitchen Grade',
    tempZone: 'Non-Food',
    description: 'Heavy-duty catering foil, cling film, baking parchment, 2-ply centrefeed blue roll, and kitchen chemicals.',
  },
];
