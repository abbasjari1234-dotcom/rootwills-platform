'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Leaf,
  Beef,
  Milk,
  Fish,
  Wheat,
  PackageCheck,
  Snowflake,
  Thermometer,
  Box,
  Check,
  Plus,
  ArrowUpRight,
  Sparkles,
  X,
  ClipboardList,
  Phone,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { InquiryModal } from '@/components/public/InquiryModal';

export interface WholesaleProductItem {
  id: string;
  sku: string;
  name: string;
  categorySlug: string;
  subCategory: string;
  packSize: string;
  origin: string;
  tempZone: 'Chilled 1–4°C' | 'Butchery 0–2°C' | 'Frozen -18°C' | 'Ambient' | 'Non-Food';
  assurance: string;
  description: string;
  image: string;
  featured?: boolean;
}

export interface WholesaleCategoryAisle {
  slug: string;
  index: string;
  name: string;
  shortName: string;
  tempBadge: string;
  tagline: string;
  description: string;
  heroImage: string;
  icon: React.ElementType;
  subCategories: string[];
}

export const WHOLESALE_AISLES: WholesaleCategoryAisle[] = [
  {
    slug: 'fresh-produce',
    index: '01',
    name: 'Fresh Fruit, Vegetables & Herbs',
    shortName: 'Fresh Produce',
    tempBadge: 'CHILLED 1°C – 4°C',
    tagline: 'Daily Market-Graded Field & Orchard Harvests',
    description:
      'Hand-selected every morning at 02:00 AM for peak vitality, calibration, and kitchen shelf life across British farms and specialist European growers.',
    heroImage: '/images/commercial/rootwills_fresh_crates.jpg',
    icon: Leaf,
    subCategories: [
      'Fruits & Citrus',
      'Potatoes & Roots',
      'Brassicas & Greens',
      'Salads & Tomatoes',
      'Herbs & Microgreens',
      'Prepared & Peeled Veg',
    ],
  },
  {
    slug: 'meat-poultry',
    index: '02',
    name: 'Prime Butchery & Poultry',
    shortName: 'Meat & Poultry',
    tempBadge: 'CHILLED 0°C – 2°C',
    tagline: 'Full-Traceability Beef, Lamb & Fresh Poultry',
    description:
      'Specification-cut British beef, grass-fed lamb, and farm-assured poultry prepared for commercial brigades with full batch traceability from pasture to pass.',
    heroImage: '/images/commercial/04_meat_poultry.jpg',
    icon: Beef,
    subCategories: [
      'Dry-Aged Beef Steaks',
      'Beef Roasting Joints',
      'British Lamb & Mutton',
      'Fresh Chicken Cuts',
      'Duck, Turkey & Game',
      'Burgers, Mince & Skewers',
    ],
  },
  {
    slug: 'chilled-dairy',
    index: '03',
    name: 'Artisan Dairy, Eggs & Chilled Deli',
    shortName: 'Chilled & Dairy',
    tempBadge: 'CHILLED 1°C – 4°C',
    tagline: 'West Country Creameries & Daily Kitchen Staples',
    description:
      'Essential daily dairy, Lion Code stamped British eggs, continental cheeses, and gourmet delicatessen lines for breakfast service, pastry, and main pass.',
    heroImage: '/images/commercial/artisan_dairy_eggs.jpg',
    icon: Milk,
    subCategories: [
      'Milk & Barista Plant Milks',
      'Cream & Block Butter',
      'British & Continental Cheese',
      'Lion Code Eggs',
      'Yoghurts & Crème Fraîche',
      'Chilled Deli, Olives & Dips',
    ],
  },
  {
    slug: 'frozen-seafood',
    index: '04',
    name: 'Frozen, Seafood, Bakery & Desserts',
    shortName: 'Frozen & Seafood',
    tempBadge: 'FROZEN -18°C',
    tagline: 'Coastal Fish, Gourmet Chips, Bake-Off & Patisserie',
    description:
      'High-consistency frozen essentials, coastal fish and seafood, artisan sourdough bake-off breads, and patisserie desserts engineered to eliminate kitchen waste.',
    heroImage: '/images/commercial/dayboat_turbot_ice.jpg',
    icon: Fish,
    subCategories: [
      'White Fish & Salmon',
      'Prawns & Shellfish',
      'Fries & Potato Specialties',
      'Frozen Veg & Fruit Purees',
      'Artisan Bake-Off Bakery',
      'Desserts, Gelato & Vegan',
    ],
  },
  {
    slug: 'ambient-grocery',
    index: '05',
    name: 'Grocery, Dry Store & Beverages',
    shortName: 'Ambient Grocery',
    tempBadge: 'AMBIENT DRY STORE',
    tagline: 'Bulk Larder Staples, Oils, Spices & Drinks',
    description:
      'Complete back-of-house store cupboard ingredients, bulk cooking oils, world spices, chef stocks, and front-of-house beverage lines on a single wholesale invoice.',
    heroImage: '/images/commercial/dry_pantry_wholesale.jpg',
    icon: Wheat,
    subCategories: [
      'Cooking & Finishing Oils',
      'Rice, Pasta & Pulses',
      'Flour & Baking Ingredients',
      'Tinned Goods & Tomatoes',
      'Stocks, Jus & Condiments',
      'Spices, Coffee & Soft Drinks',
    ],
  },
  {
    slug: 'non-food-hygiene',
    index: '06',
    name: 'Packaging, Disposables & Hygiene',
    shortName: 'Non-Food & Hygiene',
    tempBadge: 'CATERING CONSUMABLES',
    tagline: 'Kitchen Sanitation, Eco Takeaway & FoH Supplies',
    description:
      'Food-safe eco takeaway packaging, kitchen foils and wraps, paper hygiene, and COSHH-compliant commercial cleaning chemicals to keep your kitchen audit-ready.',
    heroImage: '/images/commercial/cold_depot_logistics.jpg',
    icon: PackageCheck,
    subCategories: [
      'Eco Kraft Takeaway Boxes',
      'Foil, Film & Vacuum Bags',
      'Napkins & Tableware',
      'Kitchen Sanitizers & Chemicals',
      'Dishwash & Glasswash',
      'Blue Roll, Gloves & PPE',
    ],
  },
];

export const WHOLESALE_PRODUCTS: WholesaleProductItem[] = [
  // ─── 01. FRESH PRODUCE (12 items) ───
  {
    id: 'fp-1',
    sku: 'RW-FP-101',
    name: 'Amalfi & Wax-Free Catering Lemons',
    categorySlug: 'fresh-produce',
    subCategory: 'Fruits & Citrus',
    packSize: 'Crate • 10kg (Approx 85–100s)',
    origin: 'Italy / Spain',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Class 1 Unwaxed',
    description: 'High-juice, aromatic unwaxed lemons ideal for bar service, pastry zesting, and seafood dressing.',
    image: '/images/commercial/amalfi_citrus_crate.jpg',
    featured: true,
  },
  {
    id: 'fp-2',
    sku: 'RW-FP-102',
    name: 'Kentish Orchard Pink Lady & Braeburn Apples',
    categorySlug: 'fresh-produce',
    subCategory: 'Fruits & Citrus',
    packSize: 'Case • 12kg (Calibrated 70–75mm)',
    origin: 'Kent, UK',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Red Tractor Assured',
    description: 'Crisp, pressure-tested orchard apples hand-graded for hotel breakfast displays and dessert prep.',
    image: '/images/commercial/british_apples_crates.jpg',
  },
  {
    id: 'fp-3',
    sku: 'RW-FP-103',
    name: 'Lincolnshire Maris Piper Chipping Potatoes',
    categorySlug: 'fresh-produce',
    subCategory: 'Potatoes & Roots',
    packSize: 'Sack • 25kg (Dry Brushed)',
    origin: 'Lincolnshire, UK',
    tempZone: 'Chilled 1–4°C',
    assurance: 'High Dry-Matter 22%',
    description: 'Consistent sugar-tested chipping and roasting potatoes delivering golden, blistered triple-cooked results.',
    image: '/images/commercial/02_fresh_produce.jpg',
    featured: true,
  },
  {
    id: 'fp-4',
    sku: 'RW-FP-104',
    name: 'Chantenay & Heritage Bunched Carrots',
    categorySlug: 'fresh-produce',
    subCategory: 'Potatoes & Roots',
    packSize: 'Box • 10kg (Washed & Graded)',
    origin: 'Norfolk / Lancashire, UK',
    tempZone: 'Chilled 1–4°C',
    assurance: 'British Farm Direct',
    description: 'Sweet, uniform root crops in purple, yellow, and orange cultivars for fine-dining roast garnishes.',
    image: '/images/commercial/rootwills_portrait_produce.jpg',
  },
  {
    id: 'fp-5',
    sku: 'RW-FP-105',
    name: 'Tenderstem Broccoli & Cavolo Nero Brassicas',
    categorySlug: 'fresh-produce',
    subCategory: 'Brassicas & Greens',
    packSize: 'Crate • 5kg (Trimmed Florets)',
    origin: 'Cornwall / Kent, UK',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Field Iced Harvest',
    description: 'Field-chilled within 90 minutes of cutting to preserve vibrant chlorophyll and crisp stem snap.',
    image: '/images/commercial/british_brassicas_crates.jpg',
    featured: true,
  },
  {
    id: 'fp-6',
    sku: 'RW-FP-106',
    name: 'Trimmed Fine Green Beans & Sugar Snaps',
    categorySlug: 'fresh-produce',
    subCategory: 'Brassicas & Greens',
    packSize: 'Box • 3kg (12 x 250g Packs)',
    origin: 'Selected Growers',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Hand-Tipped Grade A',
    description: 'Uniform, stringless fine beans ready for rapid blanching and butter-emulsion finishing on the pass.',
    image: '/images/commercial/chef_inspect_produce.jpg',
  },
  {
    id: 'fp-7',
    sku: 'RW-FP-107',
    name: 'Isle of Wight Heritage Vine Tomatoes',
    categorySlug: 'fresh-produce',
    subCategory: 'Salads & Tomatoes',
    packSize: 'Tray • 5kg (Mixed Heirloom)',
    origin: 'Isle of Wight, UK',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Vine Ripened Brix 7+',
    description: 'Rich, thin-skinned heirloom Coeur de Boeuf, golden plum, and tiger-striped tomatoes picked on the vine.',
    image: '/images/commercial/rootwills_hero_concept2_heirloom.jpg',
    featured: true,
  },
  {
    id: 'fp-8',
    sku: 'RW-FP-108',
    name: 'Washed Bistro Salad Leaf, Wild Rocket & Gem',
    categorySlug: 'fresh-produce',
    subCategory: 'Salads & Tomatoes',
    packSize: 'Case • 4 x 500g Pillow Bags',
    origin: 'Evesham Valley, UK',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Triple-Washed Ready',
    description: 'Peppery wild rocket, baby spinach, red chard, and crisp baby gem hearts spun dry for zero prep waste.',
    image: '/images/commercial/rootwills_chef_salad_plating.jpg',
  },
  {
    id: 'fp-9',
    sku: 'RW-FP-109',
    name: 'Living Microgreens & Edible Flower Trays',
    categorySlug: 'fresh-produce',
    subCategory: 'Herbs & Microgreens',
    packSize: 'Tray • 8 Living Punnet Cells',
    origin: 'Hydroponic Vertical Farm, UK',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Pesticide-Free Living',
    description: 'Red amaranth, purple shiso, pea shoots, and micro coriander supplied growing on root mats for maximum longevity.',
    image: '/images/commercial/living_microgreens_chef.jpg',
    featured: true,
  },
  {
    id: 'fp-10',
    sku: 'RW-FP-110',
    name: 'Fresh Cut Culinary Herbs (Basil, Thyme, Rosemary)',
    categorySlug: 'fresh-produce',
    subCategory: 'Herbs & Microgreens',
    packSize: 'Pack • 1kg Bulk Catering Bunch',
    origin: 'UK / Mediterranean',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Aromatic Essential Grade',
    description: 'Thick-stemmed rosemary, lemon thyme, flat-leaf parsley, and sweet Genovese basil bunches.',
    image: '/images/commercial/rootwills_hero_chef_herbs_produce.jpg',
  },
  {
    id: 'fp-11',
    sku: 'RW-FP-111',
    name: 'Wild Forest Girolle, Cep & Oyster Mushrooms',
    categorySlug: 'fresh-produce',
    subCategory: 'Potatoes & Roots',
    packSize: 'Basket • 3kg Mixed Foraged',
    origin: 'UK & European Woods',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Dry Brushed Grade 1',
    description: 'Meaty king oyster, golden chanterelles, and chestnut mushrooms curated for risotto and game accompaniments.',
    image: '/images/commercial/wild_mushrooms_chef.jpg',
  },
  {
    id: 'fp-12',
    sku: 'RW-FP-112',
    name: 'Peeled, Diced & Baton Kitchen-Ready Veg Range',
    categorySlug: 'fresh-produce',
    subCategory: 'Prepared & Peeled Veg',
    packSize: 'Vacuum Bag • 5kg / 10kg',
    origin: 'Prepared in BRCGS Hub, UK',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Zero Peel Waste',
    description: 'Peeled whole potatoes, diced mirepoix (onion, carrot, celery), and shredded coleslaw mix for high-volume kitchens.',
    image: '/images/commercial/exact_about_produce.jpg',
  },

  // ─── 02. MEAT & POULTRY (10 items — 100% PORK-FREE) ───
  {
    id: 'mp-1',
    sku: 'RW-MP-201',
    name: '28-Day Dry-Aged British Sirloin & Ribeye Steaks',
    categorySlug: 'meat-poultry',
    subCategory: 'Dry-Aged Beef Steaks',
    packSize: 'Case • 10 x 227g (8oz) or 284g (10oz)',
    origin: 'Hereford & Aberdeen, UK',
    tempZone: 'Butchery 0–2°C',
    assurance: 'Red Tractor & Pasture Fed',
    description: 'Hand-trimmed, Himalayan salt-chamber aged steaks with deep marbling and consistent portion weight.',
    image: '/images/commercial/04_meat_poultry.jpg',
    featured: true,
  },
  {
    id: 'mp-2',
    sku: 'RW-MP-202',
    name: 'Center-Cut British Beef Fillet Tails & Chateaubriand',
    categorySlug: 'meat-poultry',
    subCategory: 'Dry-Aged Beef Steaks',
    packSize: 'Vacuum Pack • 1.8kg – 2.2kg Whole Loin',
    origin: 'British Isles',
    tempZone: 'Butchery 0–2°C',
    assurance: 'Silver-Skin Trimmed',
    description: 'Larder-trimmed prime beef tenderloin ready for Beef Wellington, medallions, or sharing Chateaubriand.',
    image: '/images/commercial/dry_aged_beef_room.jpg',
    featured: true,
  },
  {
    id: 'mp-3',
    sku: 'RW-MP-203',
    name: 'Rolled British Topside, Silverside & Featherblade Beef',
    categorySlug: 'meat-poultry',
    subCategory: 'Beef Roasting Joints',
    packSize: 'Joint • 3.5kg – 5kg Butcher Tied',
    origin: 'Yorkshire & Midlands, UK',
    tempZone: 'Butchery 0–2°C',
    assurance: 'Full Ear-Tag Traceability',
    description: 'Braised featherblade and butcher-tied Sunday roast beef joints engineered for high-yield carvery service.',
    image: '/images/commercial/14_pubs_bars.jpg',
  },
  {
    id: 'mp-4',
    sku: 'RW-MP-204',
    name: 'French-Trimmed Welsh & West Country Rack of Lamb',
    categorySlug: 'meat-poultry',
    subCategory: 'British Lamb & Mutton',
    packSize: 'Case • 6 x 7-Bone Racks (Approx 450g each)',
    origin: 'Wales / West Country, UK',
    tempZone: 'Butchery 0–2°C',
    assurance: 'PGI Grass-Fed Lamb',
    description: 'Chined and French-trimmed to the eye with a clean fat cap for rapid searing and pink roasting.',
    image: '/images/commercial/04_meat_poultry.jpg',
    featured: true,
  },
  {
    id: 'mp-5',
    sku: 'RW-MP-205',
    name: 'Braising Hind Lamb Shanks & Diced Lamb Shoulder',
    categorySlug: 'meat-poultry',
    subCategory: 'British Lamb & Mutton',
    packSize: 'Case • 12 x 400g Shanks / 5kg Diced',
    origin: 'British Pasture Farms',
    tempZone: 'Butchery 0–2°C',
    assurance: 'Halal & Assured Options',
    description: 'Meaty hind shanks and hand-diced shoulder cubes ideal for slow-braised gastro pub dishes and tagines.',
    image: '/images/commercial/dry_aged_beef_room.jpg',
  },
  {
    id: 'mp-6',
    sku: 'RW-MP-206',
    name: 'Fresh Red Tractor Chicken Breast Fillets (Calibrated)',
    categorySlug: 'meat-poultry',
    subCategory: 'Fresh Chicken Cuts',
    packSize: 'Tray • 5kg (200g–230g Calibrated Fillets)',
    origin: 'Herefordshire, UK',
    tempZone: 'Butchery 0–2°C',
    assurance: 'Red Tractor Class A',
    description: 'Air-chilled, zero-added-water chicken breast fillets and supremes with zero shrinkage on the grill.',
    image: '/images/commercial/exact_restaurant_pass.jpg',
    featured: true,
  },
  {
    id: 'mp-7',
    sku: 'RW-MP-207',
    name: 'Boneless Skinless Chicken Thighs & Whole Roasters',
    categorySlug: 'meat-poultry',
    subCategory: 'Fresh Chicken Cuts',
    packSize: 'Case • 10kg (2 x 5kg Vacuum Packs)',
    origin: 'British Poultry Farms',
    tempZone: 'Butchery 0–2°C',
    assurance: 'Farm Assured UK',
    description: 'Succulent oyster-cut boneless thighs, 3-joint wings, and corn-fed whole roasting chickens.',
    image: '/images/commercial/13_caterers.jpg',
  },
  {
    id: 'mp-8',
    sku: 'RW-MP-208',
    name: 'Gressingham Duck Breasts, Confit Legs & Turkey Butterfly',
    categorySlug: 'meat-poultry',
    subCategory: 'Duck, Turkey & Game',
    packSize: 'Case • 10 x 220g Duck Breasts / 5kg Turkey',
    origin: 'Suffolk & Norfolk, UK',
    tempZone: 'Butchery 0–2°C',
    assurance: 'Specialty Game & Poultry',
    description: 'Plump Gressingham duck breasts with scored skin, slow-cooked confit legs, and British turkey crowns.',
    image: '/images/commercial/10_restaurant.jpg',
  },
  {
    id: 'mp-9',
    sku: 'RW-MP-209',
    name: 'Chuck & Brisket Smash Burgers & Steak Mince (80/20)',
    categorySlug: 'meat-poultry',
    subCategory: 'Burgers, Mince & Skewers',
    packSize: 'Box • 24 x 170g (6oz) Patties / 5kg Mince',
    origin: '100% British Beef & Lamb',
    tempZone: 'Butchery 0–2°C',
    assurance: 'Coarse Butcher Grind',
    description: 'Course-ground 80% lean to 20% fat ratio beef chuck & brisket patties and spiced kofta lamb mince.',
    image: '/images/commercial/04_meat_poultry.jpg',
  },
  {
    id: 'mp-10',
    sku: 'RW-MP-210',
    name: 'Allergen-Free Pre-Marinated Chicken & Lamb Skewers',
    categorySlug: 'meat-poultry',
    subCategory: 'Burgers, Mince & Skewers',
    packSize: 'Case • 40 x 120g Portion-Controlled Skewers',
    origin: 'Prepared in BRCGS Butchery',
    tempZone: 'Butchery 0–2°C',
    assurance: '100% Pork-Free Facility',
    description: 'Herb-lemon chicken souvlaki and rosemary-garlic lamb brochettes ready for direct chargrill service.',
    image: '/images/commercial/rootwills_hero_chef_plating.jpg',
  },

  // ─── 03. CHILLED & DAIRY (10 items — 100% PORK-FREE DELI) ───
  {
    id: 'cd-1',
    sku: 'RW-CD-301',
    name: 'Pasteurised British Whole, Semi-Skimmed & Barista Oat Milk',
    categorySlug: 'chilled-dairy',
    subCategory: 'Milk & Barista Plant Milks',
    packSize: 'Crate • 6 x 2L Poly / 13.6L Pergal / 12 x 1L Barista',
    origin: 'West Country Dairies, UK',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Red Tractor Dairy',
    description: 'Daily farm-fresh dairy milk alongside micro-foam Barista Oat, Almond, and Soya alternatives for coffee bars.',
    image: '/images/commercial/03_dairy_eggs.jpg',
    featured: true,
  },
  {
    id: 'cd-2',
    sku: 'RW-CD-302',
    name: 'West Country Double, Whipping Cream & Unsalted Block Butter',
    categorySlug: 'chilled-dairy',
    subCategory: 'Cream & Block Butter',
    packSize: 'Case • 4 x 2L Cream / 40 x 250g Butter Blocks',
    origin: 'Somerset & Devon, UK',
    tempZone: 'Chilled 1–4°C',
    assurance: '82% Butterfat Pastry Grade',
    description: 'High-butterfat culinary double cream, Cornish clotted cream, and laminated pastry sheet butter.',
    image: '/images/commercial/artisan_dairy_eggs.jpg',
    featured: true,
  },
  {
    id: 'cd-3',
    sku: 'RW-CD-303',
    name: 'Barber’s Vintage Mature Cheddar, Red Leicester & Stilton',
    categorySlug: 'chilled-dairy',
    subCategory: 'British & Continental Cheese',
    packSize: 'Block • 5kg Catering Block / 2kg Grated / 1kg Sliced',
    origin: 'Somerset & Leicestershire, UK',
    tempZone: 'Chilled 1–4°C',
    assurance: 'PDO Protected Heritage',
    description: '18-month matured West Country Cheddar in whole blocks, Burger-melt slices, or feather-shredded bags.',
    image: '/images/branded/rootwills_dairy_card.jpg',
    featured: true,
  },
  {
    id: 'cd-4',
    sku: 'RW-CD-304',
    name: 'Fior di Latte Mozzarella, Burrata, Halloumi & Parmigiano',
    categorySlug: 'chilled-dairy',
    subCategory: 'British & Continental Cheese',
    packSize: 'Case • 3kg Fior di Latte Julienne / 8 x 125g Burrata',
    origin: 'Italy / Cyprus / France',
    tempZone: 'Chilled 1–4°C',
    assurance: 'DOP & Artisan Creamery',
    description: 'Low-moisture pizza mozzarella, creamy Pugliese burrata, Cypriot grilling halloumi, and 24-month aged Grana.',
    image: '/images/commercial/03_dairy_eggs.jpg',
  },
  {
    id: 'cd-5',
    sku: 'RW-CD-305',
    name: 'British Lion Code Stamped Free-Range Large Eggs',
    categorySlug: 'chilled-dairy',
    subCategory: 'Lion Code Eggs',
    packSize: 'Box • 15 Dozen (180 Eggs) / 30 Dozen (360 Eggs)',
    origin: 'Shropshire & Cotswolds, UK',
    tempZone: 'Chilled 1–4°C',
    assurance: 'British Lion Quality',
    description: 'Rich golden-yolk free-range eggs and 10kg pasteurised liquid whole egg/egg white bibs for banqueting.',
    image: '/images/commercial/artisan_dairy_eggs.jpg',
    featured: true,
  },
  {
    id: 'cd-6',
    sku: 'RW-CD-306',
    name: 'Thick Greek-Style Natural Yoghurt, Crème Fraîche & Mascarpone',
    categorySlug: 'chilled-dairy',
    subCategory: 'Yoghurts & Crème Fraîche',
    packSize: 'Bucket • 5kg / 2kg Catering Tub',
    origin: 'UK & Continental Europe',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Live Culture Strained',
    description: '10%-fat authentic strained yoghurt for breakfast buffets, marinades, and rich dessert quenelles.',
    image: '/images/branded/rootwills_microgreens_dairy.jpg',
  },
  {
    id: 'cd-7',
    sku: 'RW-CD-307',
    name: 'Oak-Smoked Sliced Turkey Breast & Peppered Beef Pastrami',
    categorySlug: 'chilled-dairy',
    subCategory: 'Chilled Deli, Olives & Dips',
    packSize: 'Pack • 1kg Interleaved Catering Packs',
    origin: 'British & European Charcuterie',
    tempZone: 'Chilled 1–4°C',
    assurance: '100% Pork-Free Deli',
    description: 'Carved smoked turkey breast, peppered roast topside beef, and New York-style cured beef pastrami.',
    image: '/images/commercial/11_hotels.jpg',
  },
  {
    id: 'cd-8',
    sku: 'RW-CD-308',
    name: 'Marinated Nocellara & Kalamata Olives, Hummus & Tzatziki',
    categorySlug: 'chilled-dairy',
    subCategory: 'Chilled Deli, Olives & Dips',
    packSize: 'Tub • 2.5kg Drained Olives / 2kg Mezze Dips',
    origin: 'Sicily, Greece & UK Kitchens',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Cold-Pressed Herb Marinade',
    description: 'Plump green Nocellara del Belice olives, sun-blushed tomatoes, and chickpea tahini hummus tubs.',
    image: '/images/commercial/07_sauces_condiments.jpg',
  },
  {
    id: 'cd-9',
    sku: 'RW-CD-309',
    name: 'Fresh Genoese Basil Pesto, Chimichurri &Harissa Pastes',
    categorySlug: 'chilled-dairy',
    subCategory: 'Chilled Deli, Olives & Dips',
    packSize: 'Tub • 1.2kg Chilled Chef Paste',
    origin: 'Artisan Kitchen Prep, UK',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Cold-Blended Fresh',
    description: 'Vibrant cold-pressed herb pestos and rose harissa pastes retaining raw leaf colour and aroma.',
    image: '/images/commercial/rootwills_spices.jpg',
  },
  {
    id: 'cd-10',
    sku: 'RW-CD-310',
    name: 'Cold-Pressed Orange, Apple & Berry Breakfast Juices',
    categorySlug: 'chilled-dairy',
    subCategory: 'Milk & Barista Plant Milks',
    packSize: 'Case • 8 x 1L / 24 x 250ml Glass',
    origin: 'British Orchards & Spain',
    tempZone: 'Chilled 1–4°C',
    assurance: 'Never From Concentrate',
    description: 'Unpasteurised HPP cold-pressed juices for hotel breakfast carafes and brunch table service.',
    image: '/images/branded/rootwills_apples_card.jpg',
  },

  // ─── 04. FROZEN & SEAFOOD (10 items) ───
  {
    id: 'fs-1',
    sku: 'RW-FS-401',
    name: 'Wild Atlantic Cod & Haddock Skinless Boneless Loins (IQF)',
    categorySlug: 'frozen-seafood',
    subCategory: 'White Fish & Salmon',
    packSize: 'Case • 4.54kg (10lb) Shatterpack (170g–230g)',
    origin: 'North East Atlantic (FAO 27)',
    tempZone: 'Frozen -18°C',
    assurance: 'MSC Certified Sustainable',
    description: 'Frozen-at-sea within 2 hours of catch for flaky, pearlescent white flakes and zero drip loss.',
    image: '/images/commercial/05_seafood.jpg',
    featured: true,
  },
  {
    id: 'fs-2',
    sku: 'RW-FS-402',
    name: 'Scottish Loch-Reared Salmon Centre-Cut Darne Portions',
    categorySlug: 'frozen-seafood',
    subCategory: 'White Fish & Salmon',
    packSize: 'Box • 10 x 180g–200g Vacuum Individual Portions',
    origin: 'Scottish Highlands & Islands',
    tempZone: 'Frozen -18°C',
    assurance: 'RSPCA Assured Scottish',
    description: 'Pin-boned, descaled Scottish salmon suprêmes and wholedayboat sea bass & turbot fillets.',
    image: '/images/commercial/dayboat_turbot_ice.jpg',
    featured: true,
  },
  {
    id: 'fs-3',
    sku: 'RW-FS-403',
    name: 'Raw Peeled King & Black Tiger Prawns (16/20 & 8/12) + Calamari',
    categorySlug: 'frozen-seafood',
    subCategory: 'Prawns & Shellfish',
    packSize: 'Case • 10 x 1kg IQF Bags',
    origin: 'Warm Water & North Atlantic',
    tempZone: 'Frozen -18°C',
    assurance: 'BAP 4-Star Traceable',
    description: 'Tail-on deveined king prawns, Whole langoustines, and tender squid tubes scored for salt-and-pepper calamari.',
    image: '/images/commercial/05_seafood.jpg',
  },
  {
    id: 'fs-4',
    sku: 'RW-FS-404',
    name: 'Gourmet Skin-On Stealth Fries, Triple-Cooked Chips & Wedges',
    categorySlug: 'frozen-seafood',
    subCategory: 'Fries & Potato Specialties',
    packSize: 'Case • 4 x 2.5kg (10kg Total)',
    origin: 'British & Belgian Potato Growers',
    tempZone: 'Frozen -18°C',
    assurance: 'Gluten-Free Crispy Coat',
    description: 'Extra-hold skin-on bistro fries (9x9mm & 14x14mm), sweet potato fries, and golden breakfast hash browns.',
    image: '/images/commercial/14_pubs_bars.jpg',
    featured: true,
  },
  {
    id: 'fs-5',
    sku: 'RW-FS-405',
    name: 'IQF Petits Pois, Edamame, Spinach & Berry Smoothie Mixes',
    categorySlug: 'frozen-seafood',
    subCategory: 'Frozen Veg & Fruit Purees',
    packSize: 'Case • 10 x 1kg Catering Bags',
    origin: 'UK & European Harvest',
    tempZone: 'Frozen -18°C',
    assurance: 'Flash-Frozen Within 2 Hours',
    description: 'Sweet baby petits pois, leaf spinach pellets, shelled edamame beans, and 100% Boiron-style fruit purees.',
    image: '/images/commercial/british_brassicas_crates.jpg',
  },
  {
    id: 'fs-6',
    sku: 'RW-FS-406',
    name: 'Artisan Sourdough Boules, Glazed Brioche Buns & Ciabatta',
    categorySlug: 'frozen-seafood',
    subCategory: 'Artisan Bake-Off Bakery',
    packSize: 'Case • 48 x 85g Brioche Buns / 8 x 800g Sourdough',
    origin: 'Artisan Craft Bakery, UK',
    tempZone: 'Frozen -18°C',
    assurance: '36-Hour Wild Ferment',
    description: 'Stone-baked sourdough loaves, pre-sliced gourmet burger brioche, and all-butter French croissants.',
    image: '/images/commercial/11_hotels.jpg',
    featured: true,
  },
  {
    id: 'fs-7',
    sku: 'RW-FS-407',
    name: 'Belgian Chocolate Fondants, Cheesecakes & Fruit Tartlets',
    categorySlug: 'frozen-seafood',
    subCategory: 'Desserts, Gelato & Vegan',
    packSize: 'Box • 12–16 Pre-Portioned Patisserie Units',
    origin: 'British & Continental Patisserie',
    tempZone: 'Frozen -18°C',
    assurance: 'Chef-Finished Patisserie',
    description: 'Molten-centre dark chocolate fondants, baked New York vanilla cheesecakes, and glazed lemon tarts.',
    image: '/images/commercial/10_restaurant.jpg',
  },
  {
    id: 'fs-8',
    sku: 'RW-FS-408',
    name: 'Dairy Napoli Gelato & Fruit Sorbets (Vanilla, Pistachio, Mango)',
    categorySlug: 'frozen-seafood',
    subCategory: 'Desserts, Gelato & Vegan',
    packSize: 'Tub • 4.75L / 5L Stainless-Fit Napoli Tub',
    origin: 'Cornwall & Italy',
    tempZone: 'Frozen -18°C',
    assurance: 'Real Madagascan Vanilla Pod',
    description: 'Slow-churned artisan dairy ice creams and dairy-free fruit sorbets with high overrun stability.',
    image: '/images/commercial/03_dairy_eggs.jpg',
  },
  {
    id: 'fs-9',
    sku: 'RW-FS-409',
    name: 'Cypriot Style Halloumi Fries, Mozzarella Sticks & Falafel',
    categorySlug: 'frozen-seafood',
    subCategory: 'Desserts, Gelato & Vegan',
    packSize: 'Case • 5 x 1kg IQF Bags',
    origin: 'UK & Mediterranean',
    tempZone: 'Frozen -18°C',
    assurance: 'Vegetarian Society Approved',
    description: 'High-margin bar snack and starter staples: crispy coated halloumi fingers, herb falafel, and tempuras.',
    image: '/images/commercial/13_caterers.jpg',
  },
  {
    id: 'fs-10',
    sku: 'RW-FS-410',
    name: 'Plant-Based Gourmet Burgers, Vegan Sausages & Nuggets',
    categorySlug: 'frozen-seafood',
    subCategory: 'Desserts, Gelato & Vegan',
    packSize: 'Case • 40 x 113g (4oz) Patties',
    origin: 'UK Plant-Protein Kitchens',
    tempZone: 'Frozen -18°C',
    assurance: '100% Vegan & Soy-Free Options',
    description: 'Juicy pea-protein gourmet burgers and herb sausages that sear and caramelise on a standard flat-top.',
    image: '/images/commercial/rootwills_chef_salad_plating.jpg',
  },

  // ─── 05. AMBIENT GROCERY & DRY STORE (10 items) ───
  {
    id: 'ag-1',
    sku: 'RW-AG-501',
    name: 'Extended-Life Frying Rapeseed, Sunflower & Extra Virgin Olive Oil',
    categorySlug: 'ambient-grocery',
    subCategory: 'Cooking & Finishing Oils',
    packSize: 'Drum • 20L Box-in-Bag / 4 x 5L Tins',
    origin: 'UK Cold-Press & Mediterranean',
    tempZone: 'Ambient',
    assurance: 'High Smoke-Point 230°C',
    description: 'Anti-foaming long-life commercial frying oil plus cold-pressed Spanish & Italian extra virgin olive oils.',
    image: '/images/commercial/06_dry_goods.jpg',
    featured: true,
  },
  {
    id: 'ag-2',
    sku: 'RW-AG-502',
    name: 'Aged Himalayan Basmati Rice, Carnaroli Risotto & Bronze-Die Pasta',
    categorySlug: 'ambient-grocery',
    subCategory: 'Rice, Pasta & Pulses',
    packSize: 'Sack • 20kg Basmati / 5kg Pasta Bags',
    origin: 'India, Italy (Gragnano) & UK',
    tempZone: 'Ambient',
    assurance: '24-Month Aged Extra-Long Grain',
    description: 'Non-clumping extra-long basmati rice, creamy Italian arborio/carnaroli, and bronze-extruded penne & linguine.',
    image: '/images/commercial/dry_pantry_wholesale.jpg',
    featured: true,
  },
  {
    id: 'ag-3',
    sku: 'RW-AG-503',
    name: 'Canadian Strong Bread Flour, Tipo 00 Pizza Flour & Caster Sugar',
    categorySlug: 'ambient-grocery',
    subCategory: 'Flour & Baking Ingredients',
    packSize: 'Sack • 16kg / 25kg Mill Sacks',
    origin: 'British & Italian Heritage Mills',
    tempZone: 'Ambient',
    assurance: 'High-Protein W300–W320',
    description: 'Finely milled Neapolitan Tipo 00 pizza flour, culinary plain/self-raising flours, and pure cane sugars.',
    image: '/images/commercial/06_dry_goods.jpg',
  },
  {
    id: 'ag-4',
    sku: 'RW-AG-504',
    name: 'Italian San Marzano Plum Tomatoes, Passata, Chickpeas & Lentils',
    categorySlug: 'ambient-grocery',
    subCategory: 'Tinned Goods & Tomatoes',
    packSize: 'Case • 6 x 2.55kg (A10 Catering Tins)',
    origin: 'Campania, Italy',
    tempZone: 'Ambient',
    assurance: 'Sun-Ripened Dense Pulp',
    description: 'Sweet, low-acidity peeled plum tomatoes in rich juice alongside pre-cooked chickpeas, kidney beans, and Puy lentils.',
    image: '/images/commercial/07_sauces_condiments.jpg',
    featured: true,
  },
  {
    id: 'ag-5',
    sku: 'RW-AG-505',
    name: 'Chef Reduction Stocks, Demi-Glace, Mayonnaise & Table Condiments',
    categorySlug: 'ambient-grocery',
    subCategory: 'Stocks, Jus & Condiments',
    packSize: 'Bucket • 10L Real Mayonnaise / 1kg Stock Paste Tubs',
    origin: 'UK Culinary Larder',
    tempZone: 'Ambient',
    assurance: 'Gluten-Free Bone Reductions',
    description: 'Concentrated beef, chicken, fish, and vegetable bouillons, thick free-range egg mayonnaise, and Dijon mustards.',
    image: '/images/commercial/07_sauces_condiments.jpg',
  },
  {
    id: 'ag-6',
    sku: 'RW-AG-506',
    name: 'Whole & Ground World Spices, Cracked Black Pepper & Maldon Sea Salt',
    categorySlug: 'ambient-grocery',
    subCategory: 'Spices, Coffee & Soft Drinks',
    packSize: 'Jar • 450g–650g Chef Shaker / 1.5kg Sea Salt Bucket',
    origin: 'Single-Estate Spice Origins & Maldon, UK',
    tempZone: 'Ambient',
    assurance: 'Steam-Sterilised Pure Grade',
    description: 'Tellicherry black peppercorns, smoked paprika, cumin, saffron threads, and pyramid sea salt flakes.',
    image: '/images/commercial/exact_spices.jpg',
    featured: true,
  },
  {
    id: 'ag-7',
    sku: 'RW-AG-507',
    name: 'Aged Balsamic Vinegar of Modena IGP, Cider & Red Wine Vinegars',
    categorySlug: 'ambient-grocery',
    subCategory: 'Cooking & Finishing Oils',
    packSize: 'Case • 2 x 5L Catering Jerrycans',
    origin: 'Modena, Italy & UK',
    tempZone: 'Ambient',
    assurance: 'Oak Cask Matured IGP',
    description: 'Velvety balsamic glaze, oak-aged Modena balsamic, and crisp white wine & apple cider pickling vinegars.',
    image: '/images/commercial/dry_pantry_wholesale.jpg',
  },
  {
    id: 'ag-8',
    sku: 'RW-AG-508',
    name: 'Cashews, Flaked Almonds, Pine Nuts, Walnuts & Dried Fruits',
    categorySlug: 'ambient-grocery',
    subCategory: 'Flour & Baking Ingredients',
    packSize: 'Bag • 1kg – 3kg Nitrogen-Flushed Packs',
    origin: 'California, Mediterranean & Vietnam',
    tempZone: 'Ambient',
    assurance: 'Bakery Grade Whole Kernel',
    description: 'Blanched flaked almonds, Mediterranean pine kernels, golden sultanas, and pitted Medjool dates.',
    image: '/images/commercial/09_more_categories.jpg',
  },
  {
    id: 'ag-9',
    sku: 'RW-AG-509',
    name: 'Single-Origin Roasted Espresso Coffee Beans & English Breakfast Tea',
    categorySlug: 'ambient-grocery',
    subCategory: 'Spices, Coffee & Soft Drinks',
    packSize: 'Case • 6 x 1kg Valve Bags / 1,100 Catering Tea Bags',
    origin: 'Colombia, Brazil & Assam',
    tempZone: 'Ambient',
    assurance: 'Rainforest Alliance Certified',
    description: 'Medium-dark roast specialty espresso beans with chocolate-hazelnut notes and pyramid hospitality teas.',
    image: '/images/commercial/11_hotels.jpg',
  },
  {
    id: 'ag-10',
    sku: 'RW-AG-510',
    name: 'Still & Sparkling Glass Mineral Water, Tonics & Craft Soft Drinks',
    categorySlug: 'ambient-grocery',
    subCategory: 'Spices, Coffee & Soft Drinks',
    packSize: 'Case • 12 x 750ml Table Glass / 24 x 330ml',
    origin: 'British Natural Springs',
    tempZone: 'Ambient',
    assurance: 'Hospitality Table Glass',
    description: 'Crisp still and sparkling spring water in 750ml dining bottles alongside premium mixers and pressés.',
    image: '/images/commercial/10_restaurant.jpg',
  },

  // ─── 06. NON-FOOD, PACKAGING & HYGIENE (8 items) ───
  {
    id: 'nf-1',
    sku: 'RW-NF-601',
    name: 'Eco Kraft Takeaway Boxes, Bagasse Burger Clamshells & Salad Bowls',
    categorySlug: 'non-food-hygiene',
    subCategory: 'Eco Kraft Takeaway Boxes',
    packSize: 'Case • 300 Units (Leak-Proof PE-Free Lining)',
    origin: 'UK Sustainable Packaging',
    tempZone: 'Non-Food',
    assurance: '100% Compostable FSC',
    description: 'Grease-resistant folded kraft food boxes (No.1, No.2, No.8), breathable sugarcane clamshells, and clear rPET lids.',
    image: '/images/commercial/08_catering_supplies.jpg',
    featured: true,
  },
  {
    id: 'nf-2',
    sku: 'RW-NF-602',
    name: 'Double-Wall Kraft Hot Coffee Cups, Sip Lids & Paper Carriers',
    categorySlug: 'non-food-hygiene',
    subCategory: 'Eco Kraft Takeaway Boxes',
    packSize: 'Case • 500 Cups (8oz / 12oz) + 500 CPLA Lids',
    origin: 'UK Foodservice Disposables',
    tempZone: 'Non-Food',
    assurance: 'Recyclable & Compostable',
    description: 'Insulated ripple and smooth double-wall takeaway cups with tight-seal compostable lids and twisted-handle bags.',
    image: '/images/commercial/08_catering_supplies.jpg',
  },
  {
    id: 'nf-3',
    sku: 'RW-NF-603',
    name: 'Heavy-Duty Catering Aluminium Foil, Cling Film & Baking Parchment',
    categorySlug: 'non-food-hygiene',
    subCategory: 'Foil, Film & Vacuum Bags',
    packSize: 'Cutterbox • 450mm x 75m Foil / 450mm x 300m Film',
    origin: 'Professional Kitchen Grade',
    tempZone: 'Non-Food',
    assurance: 'Tear-Resistant 18 Micron',
    description: 'Extra-wide 450mm heavy-duty catering foil, tamper-safe slide-cutter cling film, and siliconised non-stick parchment.',
    image: '/images/commercial/exact_restaurant_pass.jpg',
    featured: true,
  },
  {
    id: 'nf-4',
    sku: 'RW-NF-604',
    name: 'Sous-Vide Embossed & Chamber Vacuum Pouches + Gastronorm Containers',
    categorySlug: 'non-food-hygiene',
    subCategory: 'Foil, Film & Vacuum Bags',
    packSize: 'Pack • 500 Pouches (200x300mm / 300x400mm)',
    origin: 'EU Food-Contact Certified',
    tempZone: 'Non-Food',
    assurance: 'BPA-Free Boil-Safe 115°C',
    description: '90-micron puncture-resistant vacuum bags for sous-vide water baths and blast-chiller portion storage.',
    image: '/images/commercial/cold_depot_logistics.jpg',
  },
  {
    id: 'nf-5',
    sku: 'RW-NF-605',
    name: 'Luxury Linen-Feel Airlaid Dinner Napkins, Birch Cutlery & Banquet Roll',
    categorySlug: 'non-food-hygiene',
    subCategory: 'Napkins & Tableware',
    packSize: 'Case • 500 x 40cm 8-Fold Napkins (Cream / Burgundy / Black)',
    origin: 'Hospitality Tableware',
    tempZone: 'Non-Food',
    assurance: 'FSC Heavyweight Airlaid',
    description: 'Plush fabric-feel disposable dining napkins, waxed birchwood cutlery kits, and non-drip table candles.',
    image: '/images/commercial/13_caterers.jpg',
  },
  {
    id: 'nf-6',
    sku: 'RW-NF-606',
    name: 'Food-Safe Surface Sanitiser (BS EN 1276) & Heavy-Duty Kitchen Degreaser',
    categorySlug: 'non-food-hygiene',
    subCategory: 'Kitchen Sanitizers & Chemicals',
    packSize: 'Case • 2 x 5L Concentrate + 6 x 750ml Trigger Sprays',
    origin: 'UK Commercial Hygiene Lab',
    tempZone: 'Non-Food',
    assurance: 'BS EN 1276 & EN 14476 Certified',
    description: 'Taint-free, fragrance-free 30-second contact bactericidal kitchen sanitiser and canopy/oven carbon degreaser.',
    image: '/images/commercial/08_catering_supplies.jpg',
    featured: true,
  },
  {
    id: 'nf-7',
    sku: 'RW-NF-607',
    name: 'Commercial Cabinet Dishwash Detergent & Streak-Free Rinse Aid',
    categorySlug: 'non-food-hygiene',
    subCategory: 'Dishwash & Glasswash',
    packSize: 'Drum • 20L Auto-Dose Drum (Hard & Soft Water)',
    origin: 'UK Chemical Engineering',
    tempZone: 'Non-Food',
    assurance: 'Pass-Through & Undercounter',
    description: 'Low-foam caustic cabinet dishwash detergent, crystal glasswash renovating fluid, and descaling solution.',
    image: '/images/commercial/cold_depot_logistics.jpg',
  },
  {
    id: 'nf-8',
    sku: 'RW-NF-608',
    name: '2-Ply Embossed Centrefeed Blue Roll, Powder-Free Nitrile Gloves & Aprons',
    categorySlug: 'non-food-hygiene',
    subCategory: 'Blue Roll, Gloves & PPE',
    packSize: 'Bale • 6 x 150m Blue Rolls / 1,000 Nitrile Gloves (M/L/XL)',
    origin: 'Food-Safe PPE Standard',
    tempZone: 'Non-Food',
    assurance: 'Food Contact EN 1186 Safe',
    description: 'High-absorbency 2-ply laminated blue roll, blue/black powder-free nitrile prep gloves, and detectable plasters.',
    image: '/images/commercial/van_dawn_delivery.jpg',
  },
];

export function PublicProductsView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedTemp, setSelectedTemp] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quoteList, setQuoteList] = useState<WholesaleProductItem[]>([]);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [customInquiryNotes, setCustomInquiryNotes] = useState<string>('');

  // Reset sub-category when switching main aisle
  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    setSelectedSubCategory('all');
  };

  const activeAisle = useMemo(
    () => WHOLESALE_AISLES.find((a) => a.slug === selectedCategory) || null,
    [selectedCategory]
  );

  // Filtered products
  const filteredProducts = useMemo(() => {
    return WHOLESALE_PRODUCTS.filter((item) => {
      if (selectedCategory !== 'all' && item.categorySlug !== selectedCategory) {
        return false;
      }
      if (selectedSubCategory !== 'all' && item.subCategory !== selectedSubCategory) {
        return false;
      }
      if (selectedTemp !== 'all' && item.tempZone !== selectedTemp) {
        return false;
      }
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSub = item.subCategory.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesSku = item.sku.toLowerCase().includes(q);
        const matchesPack = item.packSize.toLowerCase().includes(q);
        return matchesName || matchesSub || matchesDesc || matchesSku || matchesPack;
      }
      return true;
    });
  }, [selectedCategory, selectedSubCategory, selectedTemp, searchQuery]);

  // Count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: WHOLESALE_PRODUCTS.length };
    for (const aisle of WHOLESALE_AISLES) {
      counts[aisle.slug] = WHOLESALE_PRODUCTS.filter((p) => p.categorySlug === aisle.slug).length;
    }
    return counts;
  }, []);

  const isInQuote = (id: string) => quoteList.some((item) => item.id === id);

  const toggleQuoteItem = (product: WholesaleProductItem) => {
    setQuoteList((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product]
    );
  };

  const handleOpenQuoteInquiry = (singleProduct?: WholesaleProductItem) => {
    if (singleProduct) {
      setCustomInquiryNotes(
        `Wholesale Quote Enquiry for:\n• [${singleProduct.sku}] ${singleProduct.name} (${singleProduct.packSize})\n\nPlease share trade pricing and delivery availability.`
      );
    } else if (quoteList.length > 0) {
      const lines = quoteList
        .map((item, idx) => `${idx + 1}. [${item.sku}] ${item.name} — ${item.packSize}`)
        .join('\n');
      setCustomInquiryNotes(
        `Wholesale Quote Request (${quoteList.length} selected lines):\n${lines}\n\nPlease share commercial contract pricing and pre-dawn delivery schedule.`
      );
    } else {
      setCustomInquiryNotes(
        'Please send the full Rootwills Multi-Temperature Wholesale Price List (Fresh Produce, Butchery, Chilled Dairy, Frozen & Dry Store).'
      );
    }
    setIsInquiryOpen(true);
  };

  const getTempBadgeStyle = (tempZone: WholesaleProductItem['tempZone']) => {
    switch (tempZone) {
      case 'Chilled 1–4°C':
        return 'bg-[#FAF7F2]/95 text-[#2E060D] border-[#BA8E4E]/50';
      case 'Butchery 0–2°C':
        return 'bg-[#2E060D]/95 text-[#FAF7F2] border-[#BA8E4E]/60';
      case 'Frozen -18°C':
        return 'bg-[#1D3549]/95 text-[#FAF7F2] border-[#90B4CE]/50';
      case 'Ambient':
        return 'bg-[#F6EFE2]/95 text-[#4E3619] border-[#BA8E4E]/55';
      case 'Non-Food':
        return 'bg-[#242422]/95 text-[#FAF7F2] border-stone-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#131313] relative overflow-x-clip pt-20 sm:pt-28 pb-24">
      {/* Seamless Botanical Parchment Texture */}
      <div
        className="fixed inset-0 z-0 bg-repeat pointer-events-none opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />

      <div className="relative z-10 max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* ─── 1. COMPACT EDITORIAL WHOLESALE HEADER BANNER ─── */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#260309] text-[#FAF7F2] p-5 sm:p-8 lg:p-10 mb-5 sm:mb-7 relative overflow-hidden border border-[#BA8E4E]/40 shadow-[0_16px_44px_rgba(38,3,9,0.16)]">
          <div
            className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay bg-cover bg-center"
            style={{ backgroundImage: "url('/images/textures/burgundy_damask_texture.jpg')" }}
          />
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#F3D08A]/70 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F3D08A]/15 border border-[#F3D08A]/35 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#F3D08A] font-semibold">
                  <Sparkles className="w-3 h-3 text-[#F3D08A]" />
                  Multi-Temperature B2B Wholesale Catalog
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-300">
                  6 Core Aisles • 60+ Chef-Graded Lines • 100% Pork-Free
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#FAF7F2] leading-[1.08] tracking-[-0.025em] mb-2.5">
                Complete Kitchen Supply,{' '}
                <span className="text-[#F3D08A] italic font-normal">Delivered Pre-Dawn.</span>
              </h1>

              <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed max-w-2xl">
                Browse our wholesale aisles below—from 02:00 AM market produce and dry-aged British butchery to West Country dairy, coastal seafood, dry larder staples, and kitchen hygiene. Select items to build an instant trade quote.
              </p>
            </div>

            {/* Right Trust Specs & Direct Quote CTA */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
              <div className="flex items-center gap-3 text-[11px] font-mono text-stone-300 bg-white/[0.06] border border-white/10 rounded-xl px-3.5 py-2">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#F3D08A]" /> 04:00 AM Drops
                </span>
                <span className="text-white/25">|</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F3D08A]" /> Consolidated Invoice
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleOpenQuoteInquiry()}
                className="group inline-flex items-center justify-center gap-2.5 pl-5 pr-2 py-2 rounded-full bg-[#F3D08A] hover:bg-white text-[#131313] text-xs font-sans font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-[0_6px_20px_rgba(243,208,138,0.25)]"
              >
                <span>Request Full Trade Price List</span>
                <span className="w-6 h-6 rounded-full bg-[#260309] text-[#F3D08A] flex items-center justify-center text-xs transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ─── 2. PANDAMART-STYLE STICKY SEARCH & TEMPERATURE FILTER BAR ─── */}
        <div className="sticky top-[62px] sm:top-[78px] z-30 bg-[#FAF7F2]/95 backdrop-blur-md py-3 border-y border-[#DCD2C0] mb-5 sm:mb-7 -mx-3.5 px-3.5 sm:mx-0 sm:px-4 sm:rounded-2xl sm:border shadow-[0_8px_24px_rgba(46,6,13,0.05)]">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 sm:gap-4">
            {/* Instant Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8B2635] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, cuts, pack sizes or SKUs (e.g. Ribeye, Maris Piper, Oat Milk, Cod, Kraft)..."
                className="w-full pl-10 pr-9 py-2 sm:py-2.5 rounded-xl bg-[#FFFDF9] border border-[#DCD2C0] focus:border-[#BA8E4E] focus:ring-2 focus:ring-[#BA8E4E]/20 text-xs sm:text-sm text-[#131313] placeholder:text-stone-400 font-sans outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Temperature Zone Quick Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5 md:pb-0">
              {(
                [
                  { id: 'all', label: 'All Temps' },
                  { id: 'Chilled 1–4°C', label: 'Chilled 1–4°C' },
                  { id: 'Butchery 0–2°C', label: 'Butchery 0–2°C' },
                  { id: 'Frozen -18°C', label: 'Frozen -18°C' },
                  { id: 'Ambient', label: 'Ambient Larder' },
                  { id: 'Non-Food', label: 'Non-Food' },
                ] as const
              ).map((t) => {
                const active = selectedTemp === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTemp(t.id)}
                    className={`shrink-0 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.12em] font-semibold transition-all cursor-pointer border ${
                      active
                        ? 'bg-[#2E060D] text-[#FAF7F2] border-[#2E060D] shadow-sm'
                        : 'bg-[#FFFDF9] text-stone-700 border-[#DCD2C0] hover:border-[#BA8E4E]'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Horizontal Pandamart Category Rail */}
          <div className="flex lg:hidden items-center gap-2 overflow-x-auto pt-2.5 mt-2.5 border-t border-[#E8DEC8] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => handleSelectCategory('all')}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                selectedCategory === 'all'
                  ? 'bg-[#2E060D] text-[#FAF7F2] border-[#2E060D]'
                  : 'bg-[#FFFDF9] text-[#2E060D] border-[#DCD2C0]'
              }`}
            >
              <span>All Aisles</span>
              <span className="font-mono text-[10px] opacity-75">({categoryCounts.all})</span>
            </button>
            {WHOLESALE_AISLES.map((aisle) => {
              const Icon = aisle.icon;
              const isSelected = selectedCategory === aisle.slug;
              return (
                <button
                  key={aisle.slug}
                  type="button"
                  onClick={() => handleSelectCategory(aisle.slug)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#2E060D] text-[#FAF7F2] border-[#2E060D]'
                      : 'bg-[#FFFDF9] text-[#2E060D] border-[#DCD2C0]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F3D08A]' : 'text-[#8B2635]'}`} />
                  <span>{aisle.shortName}</span>
                  <span className="font-mono text-[10px] opacity-75">
                    ({categoryCounts[aisle.slug]})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── 3. PANDAMART DUAL-PANE LAYOUT: LEFT AISLE SIDEBAR + RIGHT PRODUCT GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Desktop Sticky Aisle Navigation Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-[156px] space-y-4">
            <div className="rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] p-3.5 shadow-[0_6px_24px_rgba(46,6,13,0.04)]">
              <div className="px-2 py-1.5 border-b border-[#E8DEC8] mb-2 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B2635] font-semibold">
                  Wholesale Aisles
                </span>
                <span className="font-mono text-[10px] text-stone-400">6 Depts</span>
              </div>

              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => handleSelectCategory('all')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#2E060D] text-[#FAF7F2] shadow-sm'
                      : 'hover:bg-[#FAF7F2] text-[#2E060D]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Box
                      className={`w-4 h-4 ${
                        selectedCategory === 'all' ? 'text-[#F3D08A]' : 'text-[#8B2635]'
                      }`}
                    />
                    <span className="text-xs font-serif font-bold">All Wholesale Aisles</span>
                  </div>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                      selectedCategory === 'all'
                        ? 'bg-white/15 text-[#F3D08A]'
                        : 'bg-[#FAF7F2] text-stone-600 border border-[#E8DEC8]'
                    }`}
                  >
                    {categoryCounts.all}
                  </span>
                </button>

                {WHOLESALE_AISLES.map((aisle) => {
                  const Icon = aisle.icon;
                  const active = selectedCategory === aisle.slug;
                  return (
                    <button
                      key={aisle.slug}
                      type="button"
                      onClick={() => handleSelectCategory(aisle.slug)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer group ${
                        active
                          ? 'bg-[#2E060D] text-[#FAF7F2] shadow-sm'
                          : 'hover:bg-[#FAF7F2] text-[#2E060D]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-[#BA8E4E]/35">
                          <Image
                            src={aisle.heroImage}
                            alt={aisle.shortName}
                            fill
                            unoptimized
                            sizes="28px"
                            className="object-cover"
                          />
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-serif font-bold truncate">
                            {aisle.shortName}
                          </div>
                          <div
                            className={`font-mono text-[9px] uppercase tracking-wider truncate ${
                              active ? 'text-[#F3D08A]' : 'text-stone-400'
                            }`}
                          >
                            {aisle.tempBadge}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded-full shrink-0 ${
                          active
                            ? 'bg-white/15 text-[#F3D08A]'
                            : 'bg-[#FAF7F2] text-stone-600 border border-[#E8DEC8]'
                        }`}
                      >
                        {categoryCounts[aisle.slug]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Quote List Summary Box */}
            <div className="rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] p-4 shadow-[0_6px_24px_rgba(46,6,13,0.04)]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-[#8B2635]" />
                  <h3 className="text-sm font-serif font-bold text-[#2E060D]">
                    Your Quote List
                  </h3>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2E060D]/10 text-[#2E060D]">
                  {quoteList.length} {quoteList.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              {quoteList.length === 0 ? (
                <p className="text-[11.5px] text-stone-500 font-sans leading-relaxed mb-3">
                  Click <strong className="text-[#2E060D]">+ Add to Quote</strong> on any product card to compile a custom list for our wholesale desk.
                </p>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 mb-3 border-y border-[#E8DEC8] py-2">
                  {quoteList.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2 text-[11px] bg-[#FAF7F2] px-2.5 py-1.5 rounded-lg border border-[#E8DEC8]"
                    >
                      <span className="font-medium text-[#2E060D] truncate">{item.name}</span>
                      <button
                        type="button"
                        onClick={() => toggleQuoteItem(item)}
                        className="text-stone-400 hover:text-red-700 cursor-pointer shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => handleOpenQuoteInquiry()}
                className="w-full py-2.5 px-4 rounded-xl bg-[#2E060D] hover:bg-[#131313] text-[#FAF7F2] font-sans font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span>
                  {quoteList.length > 0
                    ? `Send ${quoteList.length} Items for Quote`
                    : 'Inquire With Sales Desk'}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F3D08A]" />
              </button>

              <a
                href="tel:+441616412803"
                className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] font-mono text-stone-600 hover:text-[#2E060D] transition-colors"
              >
                <Phone className="w-3 h-3 text-[#BA8E4E]" /> Direct Trade Desk: +44 16164 12803
              </a>
            </div>
          </aside>

          {/* RIGHT: Pandamart Product Catalog Grid (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Active Category Aisle Spotlight Banner & Sub-Category Chips */}
            {activeAisle && (
              <div className="rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] overflow-hidden shadow-[0_6px_24px_rgba(46,6,13,0.04)]">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <div className="relative h-40 md:h-auto md:col-span-4 bg-[#2E060D]">
                    <Image
                      src={activeAisle.heroImage}
                      alt={activeAisle.name}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-6 md:col-span-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B2635] font-semibold">
                          AISLE {activeAisle.index} // {activeAisle.tagline}
                        </span>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#DCD2C0] text-[#2E060D] font-semibold">
                          {activeAisle.tempBadge}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2E060D] mb-1.5">
                        {activeAisle.name}
                      </h2>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
                        {activeAisle.description}
                      </p>
                    </div>

                    {/* Sub-category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#E8DEC8]">
                      <button
                        type="button"
                        onClick={() => setSelectedSubCategory('all')}
                        className={`px-3 py-1 rounded-full text-[11px] font-sans font-semibold transition-all cursor-pointer border ${
                          selectedSubCategory === 'all'
                            ? 'bg-[#2E060D] text-[#FAF7F2] border-[#2E060D]'
                            : 'bg-[#FAF7F2] text-stone-700 border-[#DCD2C0] hover:border-[#BA8E4E]'
                        }`}
                      >
                        All {activeAisle.shortName}
                      </button>
                      {activeAisle.subCategories.map((sub) => (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => setSelectedSubCategory(sub)}
                          className={`px-3 py-1 rounded-full text-[11px] font-sans font-medium transition-all cursor-pointer border ${
                            selectedSubCategory === sub
                              ? 'bg-[#2E060D] text-[#FAF7F2] border-[#2E060D]'
                              : 'bg-[#FAF7F2] text-stone-700 border-[#DCD2C0] hover:border-[#BA8E4E]'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Counter Bar */}
            <div className="flex items-center justify-between px-1">
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                Showing{' '}
                <strong className="text-[#2E060D] font-semibold">
                  {filteredProducts.length}
                </strong>{' '}
                wholesale {filteredProducts.length === 1 ? 'line' : 'lines'}
                {activeAisle ? ` in ${activeAisle.shortName}` : ' across all 6 temperature aisles'}
                {selectedSubCategory !== 'all' ? ` • ${selectedSubCategory}` : ''}
              </p>

              {(selectedCategory !== 'all' ||
                selectedSubCategory !== 'all' ||
                selectedTemp !== 'all' ||
                searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubCategory('all');
                    setSelectedTemp('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-mono uppercase tracking-wider text-[#8B2635] hover:text-[#2E060D] font-semibold underline cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* Empty Search State */}
            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl bg-[#FFFDF9] border border-[#DCD2C0] p-10 text-center">
                <p className="text-base font-serif font-bold text-[#2E060D] mb-1">
                  No matching catalog items found
                </p>
                <p className="text-xs text-stone-600 font-sans max-w-md mx-auto mb-4">
                  We source bespoke cuts, seasonal farm varieties, and specialist dry-store SKUs daily. Ask our procurement desk to source it for your kitchen.
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenQuoteInquiry()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2E060D] text-[#FAF7F2] text-xs font-sans font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <span>Request Custom Sourcing</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F3D08A]" />
                </button>
              </div>
            ) : (
              /* Pandamart-Style Product Grid */
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
                {filteredProducts.map((product) => {
                  const added = isInQuote(product.id);
                  return (
                    <div
                      key={product.id}
                      className={`group rounded-2xl bg-[#FFFDF9] border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                        added
                          ? 'border-[#2E060D] ring-1 ring-[#2E060D]/30 shadow-[0_10px_28px_rgba(46,6,13,0.10)]'
                          : 'border-[#DCD2C0] hover:border-[#BA8E4E] shadow-[0_4px_18px_rgba(46,6,13,0.04)] hover:shadow-[0_12px_30px_rgba(46,6,13,0.08)]'
                      }`}
                    >
                      {/* Top Image & Badges */}
                      <div>
                        <div className="relative w-full h-36 sm:h-40 bg-[#2E060D] overflow-hidden border-b border-[#E8DEC8]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 25vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />

                          {/* Top Left Temperature Badge */}
                          <span
                            className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-[0.14em] font-semibold border backdrop-blur-sm ${getTempBadgeStyle(
                              product.tempZone
                            )}`}
                          >
                            {product.tempZone}
                          </span>

                          {/* Top Right Rootwills Seal */}
                          <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#FAF7F2]/95 ring-1 ring-[#BA8E4E]/65 shadow-sm overflow-hidden pointer-events-none">
                            <Image
                              src="/images/logo.png"
                              alt="Rootwills Seal"
                              fill
                              unoptimized
                              sizes="24px"
                              className="object-contain p-0.5 rounded-full"
                            />
                          </div>

                          {/* Bottom Image Strip: SKU & Assurance */}
                          <div className="absolute bottom-2 inset-x-2.5 flex items-center justify-between gap-1.5">
                            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#F3D08A] bg-[#260309]/90 px-2 py-0.5 rounded border border-[#BA8E4E]/40">
                              {product.sku}
                            </span>
                            <span className="font-mono text-[9px] text-white/95 bg-black/55 backdrop-blur-xs px-2 py-0.5 rounded truncate">
                              {product.assurance}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-3.5 sm:p-4">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#8B2635] font-semibold truncate">
                              {product.subCategory}
                            </span>
                            <span className="font-mono text-[9.5px] text-stone-400 truncate">
                              {product.origin}
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-[15.5px] font-serif font-bold text-[#2E060D] group-hover:text-[#8B2635] transition-colors leading-snug mb-1.5">
                            {product.name}
                          </h3>

                          <p className="text-[11.5px] text-stone-600 font-sans leading-relaxed line-clamp-2 mb-3">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer: Pack Specification + Pandamart Add-to-Quote Action */}
                      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-2.5 border-t border-[#E8DEC8] bg-[#FAF7F2]/50 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] font-mono text-stone-700">
                          <span className="text-stone-400 uppercase text-[9.5px] tracking-wider">
                            Pack Spec:
                          </span>
                          <span className="font-semibold text-[#2E060D] truncate max-w-[180px]">
                            {product.packSize}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleQuoteItem(product)}
                            className={`flex-1 py-2 px-3 rounded-xl font-sans text-[11.5px] font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              added
                                ? 'bg-[#2E060D] text-[#F3D08A] shadow-sm'
                                : 'bg-[#FAF7F2] hover:bg-[#2E060D] text-[#2E060D] hover:text-[#FAF7F2] border border-[#DCD2C0] hover:border-[#2E060D]'
                            }`}
                          >
                            {added ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#F3D08A]" />
                                <span>In Quote List</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add to Quote</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenQuoteInquiry(product)}
                            title="Direct wholesale inquiry for this item"
                            className="px-2.5 py-2 rounded-xl bg-[#FFFDF9] hover:bg-[#F3D08A]/25 text-[#2E060D] border border-[#DCD2C0] hover:border-[#BA8E4E] text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                          >
                            Inquire ↗
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── FLOATING PANDAMART WHOLESALE QUOTE BAR (WHEN ITEMS ARE SELECTED) ─── */}
      {quoteList.length > 0 && (
        <div className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-2xl z-40 rounded-2xl bg-[#260309] text-[#FAF7F2] p-3.5 sm:px-5 sm:py-3.5 border border-[#BA8E4E]/60 shadow-[0_20px_50px_rgba(0,0,0,0.45)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#F3D08A]/15 border border-[#F3D08A]/40 flex items-center justify-center font-mono text-xs font-bold text-[#F3D08A] shrink-0">
              {quoteList.length}
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-serif font-bold text-white truncate">
                Wholesale Quote List Ready
              </div>
              <div className="text-[11px] text-stone-300 font-sans truncate">
                {quoteList.map((i) => i.name).join(', ')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setQuoteList([])}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleOpenQuoteInquiry()}
              className="px-4 py-2 rounded-xl bg-[#F3D08A] hover:bg-white text-[#131313] font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <span>Request Trade Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Wholesale Partnership & Quote Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialNotes={customInquiryNotes}
      />
    </div>
  );
}
