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
  UserCheck, 
  MapPin,
  Leaf,
  Sun,
  Egg,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-obsidian-950/95 backdrop-blur-2xl border-b border-emerald-900/40 shadow-[0_10px_35px_rgba(2,23,16,0.8)]">
      
      {/* Top Notification Live Status Bar */}
      <div className="bg-obsidian-900/90 border-b border-emerald-950/80 text-xs text-cream/80 py-2 px-4 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-champagne font-mono text-[11px] font-bold flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Next-Day Birmingham & UK Depot Fulfilment &bull; Order by 11:00 PM for 06:00 AM Delivery</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono">
            <Link 
              href="/delivery" 
              className="text-emerald-400 hover:text-champagne flex items-center gap-1 transition-colors font-medium"
            >
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>Digbeth Central Hub SLA</span>
            </Link>
            <span className="text-cream/40">&bull;</span>
            <a 
              href="tel:01217908800"
              className="flex items-center gap-1 text-cream/80 hover:text-champagne transition-colors"
            >
              <Phone className="w-3 h-3 text-champagne" />
              <span>0121 790 8800</span>
            </a>
            <span className="text-cream/40">&bull;</span>
            <Link 
              href="/login?role=admin" 
              className="text-cream/50 hover:text-champagne flex items-center gap-1 transition-colors"
            >
              <UserCheck className="w-3 h-3" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Refined British Monogram Brand Logo */}
          <RootwillsLogo size="md" variant="full" />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-mono text-xs uppercase tracking-wider">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                pathname === '/' 
                  ? 'text-champagne font-bold bg-emerald-950/70 border border-champagne/30 shadow-[0_0_15px_rgba(228,199,103,0.15)]' 
                  : 'text-cream/75 hover:text-cream hover:bg-emerald-950/40'
              }`}
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <Link
                href="/products"
                onClick={() => setProductsOpen(false)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-colors ${
                  pathname?.startsWith('/products')
                    ? 'text-champagne font-bold bg-emerald-950/70 border border-champagne/30'
                    : 'text-cream/75 hover:text-cream hover:bg-emerald-950/40'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 text-champagne/80 transition-transform duration-200 ${productsOpen ? 'rotate-180 text-champagne' : ''}`} />
              </Link>

              <AnimatePresence>
                {productsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 pt-2 w-88 min-w-[340px] z-[100]"
                  >
                    <div className="bg-[#031d14] border border-champagne/40 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.98),0_0_35px_rgba(228,199,103,0.18)] p-3 grid gap-1.5">
                      <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-champagne font-bold border-b border-emerald-900/60 pb-1.5 flex items-center justify-between">
                        <span>Wholesale Assortment</span>
                        <span className="text-emerald-400">1,200+ Lines</span>
                      </div>

                      <Link
                        href="/products?category=fresh_produce"
                        onClick={() => setProductsOpen(false)}
                        className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/70 border border-transparent hover:border-emerald-500/40 transition-all group flex items-start gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <Leaf className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-cream group-hover:text-champagne transition-colors">Fresh Produce & Fruit</div>
                          <div className="text-[11px] text-cream/60 font-sans mt-0.5">Heritage apples, citrus, heirloom veg & exotics</div>
                        </div>
                      </Link>

                      <Link
                        href="/products?category=dairy_eggs"
                        onClick={() => setProductsOpen(false)}
                        className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/70 border border-transparent hover:border-champagne/40 transition-all group flex items-start gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <Egg className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-cream group-hover:text-champagne transition-colors">Farmhouse Dairy & Eggs</div>
                          <div className="text-[11px] text-cream/60 font-sans mt-0.5">Cultured butter sheets, farm milk & Lion eggs</div>
                        </div>
                      </Link>

                      <Link
                        href="/products?category=living_botanicals"
                        onClick={() => setProductsOpen(false)}
                        className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/70 border border-transparent hover:border-emerald-500/40 transition-all group flex items-start gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <Sun className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-cream group-hover:text-champagne transition-colors">Living Botanicals & Herbs</div>
                          <div className="text-[11px] text-cream/60 font-sans mt-0.5">Hydroponic microgreens & edible flowers</div>
                        </div>
                      </Link>

                      <Link
                        href="/products?category=bakery_pantry"
                        onClick={() => setProductsOpen(false)}
                        className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/70 border border-transparent hover:border-champagne/40 transition-all group flex items-start gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-cream group-hover:text-champagne transition-colors">Bakery & Pantry Essentials</div>
                          <div className="text-[11px] text-cream/60 font-sans mt-0.5">Artisan flours, oils, chocolate & staples</div>
                        </div>
                      </Link>

                      <div className="pt-2 mt-1 border-t border-emerald-900/60">
                        <Link
                          href="/products"
                          onClick={() => setProductsOpen(false)}
                          className="text-xs font-mono text-champagne font-bold flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/60 hover:bg-champagne hover:text-obsidian-950 transition-all"
                        >
                          <span>View Full Product Directory</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sectors Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setSectorsOpen(true)}
              onMouseLeave={() => setSectorsOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-colors ${
                  pathname?.startsWith('/sectors')
                    ? 'text-champagne font-bold bg-emerald-950/70 border border-champagne/30'
                    : 'text-cream/75 hover:text-cream hover:bg-emerald-950/40'
                }`}
              >
                <span>Who We Supply</span>
                <ChevronDown className={`w-3.5 h-3.5 text-champagne/80 transition-transform duration-200 ${sectorsOpen ? 'rotate-180 text-champagne' : ''}`} />
              </button>

              <AnimatePresence>
                {sectorsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 pt-2 w-88 min-w-[340px] z-[100]"
                  >
                    <div className="bg-[#031d14] border border-champagne/40 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.98),0_0_35px_rgba(228,199,103,0.18)] p-3 grid gap-1.5">
                      <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-champagne font-bold border-b border-emerald-900/60 pb-1.5 flex items-center justify-between">
                        <span>Commercial Hospitality Sectors</span>
                        <span className="text-emerald-400">UK SLA</span>
                      </div>

                      <Link 
                        href="/sectors/restaurants" 
                        onClick={() => setSectorsOpen(false)}
                        className="p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/70 border border-transparent hover:border-champagne/30 transition-all group"
                      >
                        <div className="text-sm font-bold text-cream group-hover:text-champagne transition-colors">Restaurants & Fine Dining</div>
                        <div className="text-[11px] text-cream/60 font-sans">Chef-led kitchens & high-volume bistros</div>
                      </Link>

                      <Link 
                        href="/sectors/hotels" 
                        onClick={() => setSectorsOpen(false)}
                        className="p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/70 border border-transparent hover:border-champagne/30 transition-all group"
                      >
                        <div className="text-sm font-bold text-cream group-hover:text-champagne transition-colors">Hotels & Banqueting</div>
                        <div className="text-[11px] text-cream/60 font-sans">Breakfast ops, room service & large events</div>
                      </Link>

                      <Link 
                        href="/sectors/care-homes" 
                        onClick={() => setSectorsOpen(false)}
                        className="p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/70 border border-transparent hover:border-champagne/30 transition-all group"
                      >
                        <div className="text-sm font-bold text-cream group-hover:text-champagne transition-colors">Care Homes & Healthcare</div>
                        <div className="text-[11px] text-cream/60 font-sans">Strict dietary compliance & guaranteed 6am drops</div>
                      </Link>

                      <Link 
                        href="/sectors/caterers" 
                        onClick={() => setSectorsOpen(false)}
                        className="p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/70 border border-transparent hover:border-champagne/30 transition-all group"
                      >
                        <div className="text-sm font-bold text-cream group-hover:text-champagne transition-colors">Luxury Caterers & Events</div>
                        <div className="text-[11px] text-cream/60 font-sans">Flexible bulk specs & tailored event deliveries</div>
                      </Link>

                      <Link 
                        href="/sectors/pubs-bars" 
                        onClick={() => setSectorsOpen(false)}
                        className="p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/70 border border-transparent hover:border-champagne/30 transition-all group"
                      >
                        <div className="text-sm font-bold text-cream group-hover:text-champagne transition-colors">Gastropubs & Bars</div>
                        <div className="text-[11px] text-cream/60 font-sans">Consistent quality produce & kitchen staples</div>
                      </Link>

                      <Link 
                        href="/sectors/schools" 
                        onClick={() => setSectorsOpen(false)}
                        className="p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/70 border border-transparent hover:border-champagne/30 transition-all group"
                      >
                        <div className="text-sm font-bold text-cream group-hover:text-champagne transition-colors">Schools & Colleges</div>
                        <div className="text-[11px] text-cream/60 font-sans">Nutritious, cost-controlled seasonal produce</div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/delivery" className="px-3.5 py-2 rounded-xl text-cream/75 hover:text-cream hover:bg-emerald-950/40 transition-colors">
              Delivery
            </Link>
            <Link href="/why-choose-us" className="px-3.5 py-2 rounded-xl text-cream/75 hover:text-cream hover:bg-emerald-950/40 transition-colors">
              Why Us
            </Link>
            <Link href="/about" className="px-3.5 py-2 rounded-xl text-cream/75 hover:text-cream hover:bg-emerald-950/40 transition-colors">
              About
            </Link>
            <Link href="/contact" className="px-3.5 py-2 rounded-xl text-cream/75 hover:text-cream hover:bg-emerald-950/40 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2.5 text-xs font-mono font-bold text-cream/90 hover:text-champagne border border-emerald-800/60 bg-emerald-950/40 rounded-xl hover:border-champagne/60 transition-all shadow-sm"
            >
              Customer Login
            </Link>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/apply"
                className="px-5 py-2.5 text-xs font-mono font-bold text-obsidian-950 bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim rounded-xl hover:brightness-110 shadow-[0_0_20px_rgba(228,199,103,0.4)] transition-all flex items-center gap-2"
              >
                <span>Open Trade Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/login"
              className="px-3 py-1.5 text-xs font-mono font-bold text-champagne border border-champagne/40 bg-emerald-950/60 rounded-lg"
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
        <div className="lg:hidden bg-obsidian-900/98 border-b border-emerald-900/80 px-4 pt-4 pb-6 space-y-4 animate-slide-up backdrop-blur-2xl">
          <div className="grid gap-2 text-sm font-mono">
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
              Contact Sales Desk
            </Link>
          </div>

          <div className="pt-4 border-t border-emerald-900/60 grid gap-2">
            <Link
              href="/onboarding"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-3 font-mono text-xs font-bold text-obsidian-950 bg-champagne rounded-xl shadow-gold-glow"
            >
              Open a Business Account
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 font-mono text-xs font-medium text-cream border border-emerald-800/60 rounded-xl"
            >
              Customer Ordering Portal Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
