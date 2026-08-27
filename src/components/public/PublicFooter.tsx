import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Award, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';

export function PublicFooter() {
  return (
    <footer className="bg-obsidian-950 border-t border-emerald-900/40 pt-16 pb-12 text-cream/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Accreditations & Guarantees Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-emerald-950">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cream">6-Day Delivery SLA</div>
              <div className="text-xs text-cream/70">Early morning drops by 06:00 AM</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cream">SALSA & BRCGS Certified</div>
              <div className="text-xs text-cream/70">Full cold-chain traceability</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cream">Personalised Trade Pricing</div>
              <div className="text-xs text-cream/70">Locked contract rates & credit</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cream">11:00 PM Order Cut-Off</div>
              <div className="text-xs text-cream/70">Late chef ordering via web portal</div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <RootwillsLogo size="lg" variant="full" />
            <p className="text-sm text-cream/75 leading-relaxed max-w-sm">
              Rootwills Ltd is a technology-driven B2B foodservice wholesaler delivering premium fresh produce, heritage fruits, living microgreens, and artisan dairy to hospitality professionals across the UK.
            </p>
            <div className="space-y-2 pt-2 text-xs text-cream/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Central Fulfilment Hub: Digbeth Wholesale Depot, Birmingham, B5 5JR</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-champagne shrink-0" />
                <span>Commercial Desk: 0121 790 8800 (06:00 - 23:00)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-champagne shrink-0" />
                <span>corporate@rootwills.co.uk | orders@rootwills.co.uk</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-champagne mb-4 font-bold">Product Range</h2>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/products?category=fresh_produce" className="hover:text-champagne transition-colors">Fresh Vegetables & Salads</Link></li>
              <li><Link href="/products?category=fresh_produce" className="hover:text-champagne transition-colors">Seasonal & Exotic Fruits</Link></li>
              <li><Link href="/products?category=fresh_produce" className="hover:text-champagne transition-colors">Living Microgreens & Herbs</Link></li>
              <li><Link href="/products?category=dairy_eggs" className="hover:text-champagne transition-colors">Artisan Dairy & British Eggs</Link></li>
              <li><Link href="/products?category=dry_goods" className="hover:text-champagne transition-colors">Bakery & Pastry Ingredients</Link></li>
              <li><Link href="/products" className="hover:text-champagne transition-colors">Specialty Oils & Pantry</Link></li>
            </ul>
          </div>

          {/* Sectors (SEO) */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-champagne mb-4 font-bold">Who We Supply</h2>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/sectors/restaurants" className="hover:text-champagne transition-colors">Fine Dining & Restaurants</Link></li>
              <li><Link href="/sectors/hotels" className="hover:text-champagne transition-colors">Boutique Hotels & Resorts</Link></li>
              <li><Link href="/sectors/care-homes" className="hover:text-champagne transition-colors">Care Homes & Healthcare</Link></li>
              <li><Link href="/sectors/caterers" className="hover:text-champagne transition-colors">Luxury Event Caterers</Link></li>
              <li><Link href="/sectors/pubs-bars" className="hover:text-champagne transition-colors">Gastropubs & Bars</Link></li>
              <li><Link href="/sectors/schools" className="hover:text-champagne transition-colors">Schools & Colleges</Link></li>
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-champagne mb-4 font-bold">Platform & Account</h2>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/onboarding" className="hover:text-champagne transition-colors text-emerald-400 font-semibold">Open Trade Account</Link></li>
              <li><Link href="/login" className="hover:text-champagne transition-colors">Customer Portal Login</Link></li>
              <li><Link href="/delivery" className="hover:text-champagne transition-colors">Delivery Coverage & Depots</Link></li>
              <li><Link href="/why-choose-us" className="hover:text-champagne transition-colors">Why Choose Rootwills</Link></li>
              <li><Link href="/about" className="hover:text-champagne transition-colors">About Our Company</Link></li>
              <li><Link href="/contact" className="hover:text-champagne transition-colors">Contact Commercial Desk</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-950 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/50">
          <div>
            &copy; {new Date().getFullYear()} Rootwills Ltd. Company No. 14892019. Registered in England & Wales. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cream transition-colors">Wholesale Supply Terms</Link>
            <Link href="/security" className="hover:text-cream transition-colors">Food Safety & HACCP</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
