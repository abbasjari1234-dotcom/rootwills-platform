'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Truck, 
  Phone, 
  Mail,
  ArrowRight, 
  User, 
  MapPin,
  Leaf,
  Sparkles,
  Egg,
  Package,
  UtensilsCrossed,
  Building2,
  HeartHandshake,
  Wine,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ─── Top Emerald Announcement & Contact Strip ─── */}
      <div className="bg-[#052e16] text-[11px] sm:text-xs text-emerald-100/90 py-2 px-4 relative z-20 border-b border-emerald-900/60">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          {/* Left: Trust Claim with Leaf Icon */}
          <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
            <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-sans font-medium text-white">
              Trusted by 1,000+ food businesses across the UK
            </span>
          </div>

          {/* Right: Direct Contact & Socials */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 text-xs font-sans text-slate-200 shrink-0 whitespace-nowrap">
            <a 
              href="tel:01217908800"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Call Us: 0121 790 8800</span>
            </a>
            <span className="text-emerald-800 hidden sm:inline">&bull;</span>
            <a 
              href="mailto:orders@rootwills.com"
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>orders@rootwills.com</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-2 border-l border-emerald-800/60">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-5 h-5 flex items-center justify-center hover:text-emerald-400 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-5 h-5 flex items-center justify-center hover:text-emerald-400 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-5 h-5 flex items-center justify-center hover:text-emerald-400 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ─── Main Crisp White Navigation Bar ─── */}
      <div className="bg-white border-b border-slate-200/90 shadow-xs transition-all">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3 xl:gap-4">
            
            {/* Brand Logo in Light Mode (Current Logo) */}
            <div className="shrink-0 flex items-center">
              <RootwillsLogo size="md" variant="full" theme="light" />
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center justify-center gap-3.5 xl:gap-5 2xl:gap-6 font-sans text-[13px] xl:text-sm font-medium text-slate-700 whitespace-nowrap">
              <Link
                href="/"
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  pathname === '/' 
                    ? 'text-emerald-700 font-bold' 
                    : 'hover:text-emerald-700'
                }`}
              >
                <span>Home</span>
                {pathname === '/' && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </Link>

              <Link 
                href="/about" 
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  pathname === '/about'
                    ? 'text-emerald-700 font-bold'
                    : 'hover:text-emerald-700'
                }`}
              >
                About Us
              </Link>

              {/* Products Dropdown */}
              <div 
                className="relative group shrink-0"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <Link
                  href="/products"
                  onClick={() => setProductsOpen(false)}
                  className={`inline-flex items-center justify-center gap-1 py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                    pathname?.startsWith('/products')
                      ? 'text-emerald-700 font-bold'
                      : 'hover:text-emerald-700'
                  }`}
                >
                  <span>Products</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${productsOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                </Link>

                <AnimatePresence>
                  {productsOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-0 pt-2 w-80 min-w-[320px] z-[100]"
                    >
                      <div className="bg-white rounded-2xl p-3 shadow-2xl border border-slate-200 grid gap-1">
                        <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold border-b border-slate-100 flex items-center justify-between">
                          <span>Wholesale Assortment</span>
                          <span className="text-emerald-600">1,200+ Lines</span>
                        </div>

                        <Link
                          href="/products?category=fresh_produce"
                          onClick={() => setProductsOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Leaf className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Fresh Produce &amp; Fruit</div>
                            <div className="text-xs text-slate-500">Apples, salads, vegetables &amp; exotics</div>
                          </div>
                        </Link>

                        <Link
                          href="/products?category=dairy_eggs"
                          onClick={() => setProductsOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Egg className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Dairy &amp; Eggs</div>
                            <div className="text-xs text-slate-500">Farm milk, butters, creams &amp; Lion eggs</div>
                          </div>
                        </Link>

                        <Link
                          href="/products?category=bakery_pantry"
                          onClick={() => setProductsOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Package className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Dry Goods &amp; Pantry</div>
                            <div className="text-xs text-slate-500">Artisan flours, oils, seasonings &amp; staples</div>
                          </div>
                        </Link>

                        <div className="pt-2 mt-1 border-t border-slate-100">
                          <Link
                            href="/products"
                            onClick={() => setProductsOpen(false)}
                            className="text-xs font-sans text-emerald-700 font-bold flex items-center justify-between p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 transition-colors"
                          >
                            <span>Browse All 1,200+ Products</span>
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
                className="relative group shrink-0"
                onMouseEnter={() => setSectorsOpen(true)}
                onMouseLeave={() => setSectorsOpen(false)}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={sectorsOpen}
                  onClick={() => setSectorsOpen(!sectorsOpen)}
                  className={`inline-flex items-center justify-center gap-1 py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                    pathname?.startsWith('/sectors')
                      ? 'text-emerald-700 font-bold'
                      : 'hover:text-emerald-700'
                  }`}
                >
                  <span>Sectors</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${sectorsOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>

                <AnimatePresence>
                  {sectorsOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-0 pt-2 w-80 min-w-[320px] z-[100]"
                    >
                      <div className="bg-white rounded-2xl p-3 shadow-2xl border border-slate-200 grid gap-1">
                        <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold border-b border-slate-100 flex items-center justify-between">
                          <span>Sectors We Serve</span>
                          <span className="text-emerald-600">UK SLA</span>
                        </div>

                        <Link 
                          href="/sectors/restaurants" 
                          onClick={() => setSectorsOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <UtensilsCrossed className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Restaurants &amp; Bistros</div>
                            <div className="text-xs text-slate-500">Fine dining &amp; high-volume kitchens</div>
                          </div>
                        </Link>

                        <Link 
                          href="/sectors/hotels" 
                          onClick={() => setSectorsOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Hotels &amp; Banqueting</div>
                            <div className="text-xs text-slate-500">Breakfast ops &amp; large-scale events</div>
                          </div>
                        </Link>

                        <Link 
                          href="/sectors/care-homes" 
                          onClick={() => setSectorsOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <HeartHandshake className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Care Homes &amp; Healthcare</div>
                            <div className="text-xs text-slate-500">Dietary compliance &amp; guaranteed 6am drops</div>
                          </div>
                        </Link>

                        <Link 
                          href="/sectors/schools" 
                          onClick={() => setSectorsOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Schools &amp; Education</div>
                            <div className="text-xs text-slate-500">Healthy, cost-controlled seasonal menus</div>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                href="/delivery" 
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  pathname === '/delivery'
                    ? 'text-emerald-700 font-bold'
                    : 'hover:text-emerald-700'
                }`}
              >
                Delivery
              </Link>

              <Link 
                href="/why-choose-us" 
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  pathname === '/why-choose-us'
                    ? 'text-emerald-700 font-bold'
                    : 'hover:text-emerald-700'
                }`}
              >
                Why Choose Us
              </Link>

              {/* Resources Dropdown */}
              <div 
                className="relative group shrink-0"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={resourcesOpen}
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className={`inline-flex items-center justify-center gap-1 py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                    pathname?.startsWith('/resources')
                      ? 'text-emerald-700 font-bold'
                      : 'hover:text-emerald-700'
                  }`}
                >
                  <span>Resources</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${resourcesOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>

                <AnimatePresence>
                  {resourcesOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-0 pt-2 w-64 min-w-[240px] z-[100]"
                    >
                      <div className="bg-white rounded-2xl p-2.5 shadow-2xl border border-slate-200 grid gap-1">
                        <Link 
                          href="/resources" 
                          onClick={() => setResourcesOpen(false)}
                          className="p-2 rounded-xl hover:bg-emerald-50 text-xs font-sans font-bold text-slate-800 hover:text-emerald-700 transition-colors"
                        >
                          Wholesale Market Reports
                        </Link>
                        <Link 
                          href="/delivery" 
                          onClick={() => setResourcesOpen(false)}
                          className="p-2 rounded-xl hover:bg-emerald-50 text-xs font-sans font-medium text-slate-700 hover:text-emerald-700 transition-colors"
                        >
                          Delivery Schedules &amp; Fleet SLA
                        </Link>
                        <Link 
                          href="/security" 
                          onClick={() => setResourcesOpen(false)}
                          className="p-2 rounded-xl hover:bg-emerald-50 text-xs font-sans font-medium text-slate-700 hover:text-emerald-700 transition-colors"
                        >
                          Food Safety &amp; HACCP Specs
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                href="/contact" 
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  pathname === '/contact'
                    ? 'text-emerald-700 font-bold'
                    : 'hover:text-emerald-700'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Right CTA Buttons: Master B2B Portal Gateway */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0 ml-2 xl:ml-4">
              {/* Become a Customer Button (Green Solid Pill) */}
              <Link
                href="/apply"
                className="h-9 px-3.5 xl:px-5 text-xs font-sans font-bold text-white bg-[#22c55e] hover:bg-[#16a34a] rounded-full shadow-sm transition-all inline-flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap"
              >
                <span>Become a Customer</span>
              </Link>

              {/* Customer Login Button (White Outlined Pill with User Icon) */}
              <Link
                href="/login"
                className="h-9 px-3 xl:px-3.5 text-xs font-sans font-semibold text-slate-700 hover:text-emerald-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-full shadow-xs transition-colors inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>Customer Login</span>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 text-xs font-sans font-bold text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                Login
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-slate-700 hover:text-emerald-700 focus:outline-none"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4 shadow-xl animate-slide-up">
          <div className="grid gap-2 text-sm font-sans font-medium text-slate-800">
            <Link href="/" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">
              Home
            </Link>
            <Link href="/products" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">
              Products Catalogue
            </Link>
            <Link href="/sectors/restaurants" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">
              Who We Supply (Sectors)
            </Link>
            <Link href="/delivery" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">
              Delivery &amp; Logistics
            </Link>
            <Link href="/why-choose-us" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">
              Why Choose Rootwills
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">
              About Us
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">
              Contact Sales Desk
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 grid gap-2.5">
            <Link
              href="/apply"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-3 font-sans text-sm font-bold text-white bg-emerald-600 rounded-full shadow-md"
            >
              Become a Customer Today
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 font-sans text-sm font-semibold text-slate-700 border border-slate-200 rounded-full"
            >
              Customer Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
