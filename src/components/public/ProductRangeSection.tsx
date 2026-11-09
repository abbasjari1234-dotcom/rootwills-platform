'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sprout,
  Utensils,
  Milk,
  Snowflake,
  Package,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { DoodleFlourish } from './DoodleFlourish';

interface ProductCategoryItem {
  code: string;
  temperature: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ElementType;
  items: string[];
}

const PRODUCT_CATEGORIES: ProductCategoryItem[] = [
  {
    code: '01 // FRESH PRODUCE',
    temperature: 'CHILLED 1°C – 4°C',
    title: 'Fresh Fruit, Vegetables & Herbs',
    subtitle: 'Daily Market-Graded Field & Orchard Harvests',
    description:
      'Hand-selected every morning at 02:00 AM for peak vitality, calibration, and kitchen shelf life across British farms and specialist growers.',
    image: '/images/commercial/british_brassicas_crates.jpg',
    icon: Sprout,
    items: [
      'Seasonal British & Imported Fruits',
      'Washed & Unwashed Potatoes',
      'Root Crops, Brassicas & Greens',
      'Crisp Salad Leaves, Tomatoes & Peppers',
      'Fresh Culinary Herbs & Living Microgreens',
      'Peeled, Diced & Kitchen-Ready Prepared Veg',
    ],
  },
  {
    code: '02 // MEAT & POULTRY',
    temperature: 'CHILLED 0°C – 2°C',
    title: 'Prime Butchery & Poultry',
    subtitle: 'Full-Traceability Beef, Lamb & Fresh Poultry',
    description:
      'Specification-cut meats and farm-assured poultry prepared for commercial brigades, with full batch traceability from pasture to kitchen pass.',
    image: '/images/commercial/dry_aged_beef_room.jpg',
    icon: Utensils,
    items: [
      'Dry-Aged & Prime British Beef Steaks & Joints',
      'British Lamb & Mutton Cuts, Chops & Shoulders',
      'Fresh Chicken Breasts, Thighs, Wings & Whole Birds',
      'Gressingham Duck, Turkey & Seasonal Game',
      'Handmade Beef & Lamb Burgers, Mince & Diced Cuts',
      'Allergen-Free Pre-Marinated & Portion-Controlled Proteins',
    ],
  },
  {
    code: '03 // CHILLED & DAIRY',
    temperature: 'CHILLED 1°C – 4°C',
    title: 'Artisan Dairy, Eggs & Chilled Deli',
    subtitle: 'West Country Creameries & Daily Kitchen Staples',
    description:
      'Essential daily dairy, Lion Code stamped British eggs, and chilled delicatessen lines for breakfast service, pastry sections, and main pass.',
    image: '/images/commercial/artisan_dairy_eggs.jpg',
    icon: Milk,
    items: [
      'Whole, Semi-Skimmed & Barista Plant Milks',
      'Double, Whipping & Clotted Creams & Block Butter',
      'Block, Sliced & Grated Cheddar, Mozzarella & Brie',
      'Lion Quality Free-Range, Barn & Liquid Catering Eggs',
      'Bulk Natural & Greek-Style Catering Yoghurts',
      'Sliced Turkey, Beef Pastrami, Olives, Hummus & Dips',
    ],
  },
  {
    code: '04 // FROZEN & SEAFOOD',
    temperature: 'FROZEN -18°C',
    title: 'Frozen, Seafood, Bakery & Desserts',
    subtitle: 'Multi-Temperature Freezer & Coastal Lines',
    description:
      'High-consistency frozen essentials, coastal fish and seafood, artisan bake-off breads, and patisserie desserts engineered to eliminate kitchen waste.',
    image: '/images/commercial/dayboat_turbot_ice.jpg',
    icon: Snowflake,
    items: [
      'Cod, Haddock, Salmon Fillets, Prawns & Calamari',
      'Gourmet Skin-On Fries, Chunky Chips, Wedges & Hash Browns',
      'Frozen Peas, Sweetcorn, Spinach & Berry Smoothie Mixes',
      'Artisan Sourdough, Brioche Buns, Wraps & Morning Pastries',
      'Cakes, Cheesecakes, Gelato & Gluten-Free/Vegan Desserts',
      'Savoury Buffet Bites, Vegan Proteins & Ready Components',
    ],
  },
  {
    code: '05 // AMBIENT GROCERY',
    temperature: 'AMBIENT DRY STORE',
    title: 'Grocery, Dry Store & Beverages',
    subtitle: 'Bulk Larder Staples, Oils, Spices & Drinks',
    description:
      'Complete back-of-house store cupboard ingredients, bulk cooking oils, world spices, and front-of-house beverage lines on a single wholesale invoice.',
    image: '/images/commercial/dry_pantry_wholesale.jpg',
    icon: Package,
    items: [
      'Bulk Rapeseed, Sunflower & Extra Virgin Olive Oils',
      'Basmati Rice, Arborio, Dried Pasta, Noodles & Pulses',
      'Strong Bread Flour, Plain/Self-Raising Flour & Sugar',
      'Tinned Plum Tomatoes, Beans, Stocks, Bouillons & Gravies',
      'Mayonnaise, Ketchup, Chutneys, World Spices & Seasonings',
      'Roast Coffee, Tea, Soft Drinks, Juices & Spring Water',
    ],
  },
  {
    code: '06 // NON-FOOD & HYGIENE',
    temperature: 'CATERING CONSUMABLES',
    title: 'Packaging, Disposables & Hygiene',
    subtitle: 'Kitchen Sanitation, Takeaway & FoH Supplies',
    description:
      'Food-safe takeaway packaging, kitchen foils and wraps, paper hygiene, and commercial cleaning chemicals to keep your operation audit-ready.',
    image: '/images/commercial/cold_depot_logistics.jpg',
    icon: Sparkles,
    items: [
      'Eco Kraft Takeaway Boxes, Burger Clamshells & Salad Bowls',
      'Catering Foil, Cling Film, Baking Parchment & Vacuum Bags',
      'Front-of-House Napkins, Cutlery, Cups & Tableware',
      'Food-Safe Surface Sanitizers, Degreasers & Floor Cleaners',
      'Commercial Dishwash, Glasswash & Rinse-Aid Chemicals',
      'Blue Centre-Feed Rolls, Nitrile Gloves, Aprons & Refuse Sacks',
    ],
  },
];

export function ProductRangeSection() {
  return (
    <section
      id="products"
      className="py-10 sm:py-16 lg:py-24 bg-[#FAF7F2] text-[#2E060D] relative overflow-hidden scroll-mt-20 border-t border-[#DCD2C0]"
    >
      {/* Seamless Botanical Parchment Texture Overlay */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── SECTION HEADER ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-8 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
              <span className="h-[1px] w-8 bg-[#BA8E4E]" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8B2635] font-bold">
                MULTI-TEMPERATURE WHOLESALE RANGE
              </span>
            </div>

            <div className="relative inline-block">
              <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-serif font-bold tracking-[-0.022em] text-[#2E060D] leading-[1.08]">
                Everything Your Kitchen Needs,{' '}
                <span className="text-[#8B2635] italic font-normal">
                  Delivered as One
                </span>
              </h2>
              <DoodleFlourish
                variant="underline-wave"
                color="#BA8E4E"
                className="w-40 sm:w-64 mt-1 text-[#BA8E4E]"
                delay={150}
              />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-[48ch] font-sans leading-[1.65] lg:text-right">
            Consolidate your Fresh Produce, Prime Butchery, Chilled Dairy,
            Frozen, Ambient Grocery, and Non-Food Catering Supplies onto a
            single pre-dawn vehicle and single wholesale account.
          </p>
        </div>

        {/* ─── 6-CATEGORY ARCHITECTURAL HAIRLINE GRID ─── */}
        <div className="border border-[#DCD2C0] bg-[#FFFDF9] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_14px_38px_rgba(46,6,13,0.05)] divide-y divide-[#DCD2C0] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:divide-y-0">
          {PRODUCT_CATEGORIES.map((cat, idx) => {
            const IconComponent = cat.icon;
            // Hairline border logic for 2-col (md) and 3-col (lg)
            const borderClasses = [
              idx >= 1 ? 'border-t border-[#DCD2C0]' : '',
              idx < 2 ? 'md:border-t-0' : 'md:border-t md:border-[#DCD2C0]',
              idx < 3 ? 'lg:border-t-0' : 'lg:border-t lg:border-[#DCD2C0]',
              idx % 2 === 1 ? 'md:border-l md:border-[#DCD2C0]' : '',
              idx % 3 !== 0 ? 'lg:border-l lg:border-[#DCD2C0]' : 'lg:border-l-0',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={cat.code}
                className={`group flex flex-col justify-between p-4 sm:p-6 lg:p-7 bg-[#FFFDF9] hover:bg-[#FAF6EE]/60 transition-colors duration-300 ${borderClasses}`}
              >
                <div>
                  {/* Top Meta Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8B2635] font-bold">
                      {cat.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF6EE] border border-[#DCD2C0] font-mono text-[9px] uppercase tracking-[0.14em] text-[#2E060D]/80 font-semibold">
                      {cat.temperature}
                    </span>
                  </div>

                  {/* Documentary Category Image Stage */}
                  <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden mb-4 bg-[#2E060D] border border-[#E6DEC8]">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#2E060D]/[0.06] mix-blend-multiply pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#180205]/70 via-transparent to-transparent pointer-events-none" />

                    {/* Official Rootwills Seal Medallion */}
                    <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#FAF7F2]/95 ring-1 ring-[#BA8E4E]/70 shadow-md overflow-hidden pointer-events-none">
                      <Image
                        src="/images/logo.png"
                        alt="Rootwills Seal"
                        fill
                        unoptimized
                        sizes="28px"
                        className="object-contain p-0.5 rounded-full"
                      />
                    </div>

                    {/* Bottom Left Category Icon + Subtitle */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-2 text-white pointer-events-none">
                      <span className="w-6 h-6 rounded-full bg-[#180205]/80 ring-1 ring-[#F3D08A]/50 flex items-center justify-center text-[#F3D08A] shrink-0">
                        <IconComponent className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-[11px] font-sans font-medium text-[#FAF7F2]/95 truncate">
                        {cat.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Category Title & Description */}
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2E060D] group-hover:text-[#8B2635] transition-colors leading-snug mb-1.5">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                {/* Sub-ProductChecklist */}
                <div className="pt-3.5 border-t border-[#EAE0CE]">
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#BA8E4E] font-bold mb-2">
                    KEY WHOLESALE LINES SUPPLIED:
                  </span>
                  <ul className="space-y-1.5">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[11.5px] sm:text-xs font-sans text-[#2E060D]/90 leading-snug"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── BOTTOM CALLOUT BAR ─── */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#DCD2C0] bg-[#FFFDF9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="space-y-0.5">
            <p className="text-sm sm:text-base font-serif font-bold text-[#2E060D]">
              Looking for a custom product list or bespoke volume pricing for your kitchen?
            </p>
            <p className="text-xs text-stone-600 font-sans">
              Speak directly with our wholesale desk to request a full category product guide tailored to your menu.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2E060D] hover:bg-[#131313] text-[#FAF7F2] text-xs font-sans font-semibold tracking-wide transition-colors shrink-0 shadow-sm"
          >
            <span>Request Full Product Guide</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#F3D08A]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
