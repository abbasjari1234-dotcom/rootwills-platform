'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, 
  ShoppingBag, 
  Menu, 
  X, 
  Truck, 
  ShieldCheck, 
  Phone, 
  ArrowRight,
  Sparkles,
  UserCheck
} from 'lucide-react';

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-obsidian-950/90 backdrop-blur-md border-b border-cream/10">
      {/* Top Notification Bar */}
      <div className="bg-obsidian-900 border-b border-cream/5 text-xs text-cream/70 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-champagne">
              <Truck className="w-3.5 h-3.5" />
              <span>Next-Day UK Depot Fulfilment — Order before 11:00 PM for 06:00 AM delivery</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-1 text-cream/60">
              <Phone className="w-3 h-3 text-champagne" />
              <span>Sales Desk: 0121 790 8800</span>
            </span>
            <Link 
              href="/login?role=admin" 
              className="text-cream/50 hover:text-champagne flex items-center gap-1 transition-colors"
            >
              <UserCheck className="w-3 h-3" />
              <span>Staff / Sales Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-champagne via-champagne-soft to-champagne-dim p-0.5 shadow-gold-glow">
              <div className="w-full h-full bg-obsidian-950 rounded-[7px] flex items-center justify-center font-display font-bold text-xl text-champagne group-hover:text-cream transition-colors">
                R
              </div>
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-cream group-hover:text-champagne transition-colors">
                ROOTWILLS
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-champagne font-mono uppercase -mt-1">
                Wholesale Foodservice
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                pathname === '/' ? 'text-champagne font-semibold' : 'text-cream/80 hover:text-cream'
              }`}
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <Link
                href="/products"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-cream/80 hover:text-cream transition-colors"
              >
                <span>Products</span>
                <ChevronDown className="w-4 h-4 text-champagne/70" />
              </Link>
              {productsOpen && (
                <div className="absolute top-full left-0 w-72 bg-obsidian-900 border border-cream/15 rounded-xl shadow-2xl p-3 grid gap-1 animate-fade-in">
                  <Link
                    href="/products?category=fresh_produce"
                    className="p-2.5 rounded-lg hover:bg-obsidian-800 transition-colors group"
                  >
                    <div className="text-sm font-medium text-cream group-hover:text-champagne">Fresh Produce</div>
                    <div className="text-xs text-cream/50">Vegetables, Fruit, Salads, Herbs & Exotics</div>
                  </Link>
                  <Link
                    href="/products?category=dairy_eggs"
                    className="p-2.5 rounded-lg hover:bg-obsidian-800 transition-colors group"
                  >
                    <div className="text-sm font-medium text-cream group-hover:text-champagne">Dairy & Eggs</div>
                    <div className="text-xs text-cream/50">Pasture creams, Farm butter, Free-range eggs</div>
                  </Link>
                  <Link
                    href="/products?category=meat_poultry"
                    className="p-2.5 rounded-lg hover:bg-obsidian-800 transition-colors group"
                  >
                    <div className="text-sm font-medium text-cream group-hover:text-champagne">Meat & Poultry</div>
                    <div className="text-xs text-cream/50">Dry-aged prime beef, British poultry & game</div>
                  </Link>
                  <Link
                    href="/products?category=dry_goods"
                    className="p-2.5 rounded-lg hover:bg-obsidian-800 transition-colors group"
                  >
                    <div className="text-sm font-medium text-cream group-hover:text-champagne">Dry Goods & Pastry</div>
                    <div className="text-xs text-cream/50">Valrhona chocolate, artisan flours, oils</div>
                  </Link>
                  <div className="pt-2 mt-1 border-t border-cream/10">
                    <Link
                      href="/products"
                      className="text-xs text-champagne font-semibold flex items-center justify-between p-1.5 hover:underline"
                    >
                      <span>View Full Product Directory</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sectors Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setSectorsOpen(true)}
              onMouseLeave={() => setSectorsOpen(false)}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-cream/80 hover:text-cream transition-colors"
              >
                <span>Who We Supply</span>
                <ChevronDown className="w-4 h-4 text-champagne/70" />
              </button>
              {sectorsOpen && (
                <div className="absolute top-full left-0 w-80 bg-obsidian-900 border border-cream/15 rounded-xl shadow-2xl p-3 grid gap-1 animate-fade-in">
                  <Link href="/sectors/restaurants" className="p-2.5 rounded-lg hover:bg-obsidian-800 transition-colors group">
                    <div className="text-sm font-medium text-cream group-hover:text-champagne">Restaurants & Fine Dining</div>
                    <div className="text-xs text-cream/50">Chef-led kitchens & high-volume bistros</div>
                  </Link>
                  <Link href="/sectors/hotels" className="p-2.5 rounded-lg hover:bg-obsidian-800 transition-colors group">
                    <div className="text-sm font-medium text-cream group-hover:text-champagne">Hotels & Banqueting</div>
                    <div className="text-xs text-cream/50">Breakfast ops, room service & large events</div>
                  </Link>
                  <Link href="/sectors/care-homes" className="p-2.5 rounded-lg hover:bg-obsidian-800 transition-colors group">
                    <div className="text-sm font-medium text-cream group-hover:text-champagne">Care Homes & Healthcare</div>
                    <div className="text-xs text-cream/50">Strict dietary compliance & reliable morning drops</div>
                  </Link>
                  <Link href="/sectors/caterers" className="p-2.5 rounded-lg hover:bg-obsidian-800 transition-colors group">
                    <div className="text-sm font-medium text-cream group-hover:text-champagne">Luxury Caterers & Events</div>
                    <div className="text-xs text-cream/50">Flexible bulk specs & tailored event deliveries</div>
                  </Link>
                  <Link href="/sectors/pubs-bars" className="p-2.5 rounded-lg hover:bg-obsidian-800 transition-colors group">
                    <div className="text-sm font-medium text-cream group-hover:text-champagne">Pubs & Gastro Bars</div>
                    <div className="text-xs text-cream/50">Consistent quality produce & competitive keg/kitchen items</div>
                  </Link>
                  <Link href="/sectors/schools" className="p-2.5 rounded-lg hover:bg-obsidian-800 transition-colors group">
                    <div className="text-sm font-medium text-cream group-hover:text-champagne">Schools & Institutions</div>
                    <div className="text-xs text-cream/50">Nutritious, cost-controlled bulk produce</div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/delivery" className="px-3 py-2 text-sm font-medium text-cream/80 hover:text-cream transition-colors">
              Delivery
            </Link>
            <Link href="/why-choose-us" className="px-3 py-2 text-sm font-medium text-cream/80 hover:text-cream transition-colors">
              Why Us
            </Link>
            <Link href="/about" className="px-3 py-2 text-sm font-medium text-cream/80 hover:text-cream transition-colors">
              About
            </Link>
            <Link href="/contact" className="px-3 py-2 text-sm font-medium text-cream/80 hover:text-cream transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-cream/90 hover:text-champagne border border-cream/20 rounded-lg hover:border-champagne/50 transition-all"
            >
              Customer Login
            </Link>
            <Link
              href="/onboarding"
              className="px-5 py-2.5 text-sm font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim rounded-lg hover:brightness-110 shadow-gold-glow transition-all flex items-center gap-2"
            >
              <span>Become a Customer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/login"
              className="px-3 py-1.5 text-xs font-medium text-champagne border border-champagne/30 rounded-lg"
            >
              Login
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-cream hover:text-champagne focus:outline-none"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-obsidian-900 border-b border-cream/15 px-4 pt-4 pb-6 space-y-4 animate-slide-up">
          <div className="grid gap-2 text-base">
            <Link href="/" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-cream hover:text-champagne">
              Home
            </Link>
            <Link href="/products" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-cream hover:text-champagne">
              Product Catalogue
            </Link>
            <Link href="/sectors/restaurants" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-cream hover:text-champagne">
              Who We Supply (Sectors)
            </Link>
            <Link href="/delivery" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-cream hover:text-champagne">
              Delivery & Fulfilment
            </Link>
            <Link href="/why-choose-us" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-cream hover:text-champagne">
              Why Choose Rootwills
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-cream hover:text-champagne">
              Contact Sales Team
            </Link>
          </div>

          <div className="pt-4 border-t border-cream/10 grid gap-2">
            <Link
              href="/onboarding"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-3 font-semibold text-obsidian-950 bg-champagne rounded-lg shadow-gold-glow"
            >
              Open a Business Account
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 font-medium text-cream border border-cream/20 rounded-lg"
            >
              Customer Ordering Portal Login
            </Link>
            <Link
              href="/login?role=admin"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2 text-xs text-cream/50 hover:text-champagne"
            >
              Internal Staff / Sales CRM
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
