import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Award, MapPin, Phone, Mail, Clock } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-obsidian-950 border-t border-cream/10 pt-16 pb-12 text-cream/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Accreditations & Guarantees Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-cream/10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cream">6-Day Delivery SLA</div>
              <div className="text-xs text-cream/50">Early morning drops by 07:00 AM</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cream">SALSA & BRCGS Certified</div>
              <div className="text-xs text-cream/50">Full cold-chain traceability</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cream">Personalised Trade Pricing</div>
              <div className="text-xs text-cream/50">Contract rates & volume discounts</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cream">11:00 PM Order Cut-Off</div>
              <div className="text-xs text-cream/50">Late chef ordering via web portal</div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-champagne flex items-center justify-center font-display font-bold text-lg text-obsidian-950">
                R
              </div>
              <span className="font-display text-2xl font-bold text-cream tracking-tight">ROOTWILLS</span>
            </div>
            <p className="text-sm text-cream/60 leading-relaxed max-w-sm">
              Rootwills Ltd is a technology-driven B2B foodservice wholesaler delivering premium fresh produce, artisan dairy, meats, and dry goods to hospitality professionals across the UK.
            </p>
            <div className="space-y-2 pt-2 text-xs text-cream/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-champagne shrink-0" />
                <span>Central Fulfilment Hub: Digbeth Wholesale Depot, Birmingham, B5 5JR</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-champagne shrink-0" />
                <span>Commercial Desk: 0121 790 8800 (06:00 - 23:00)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-champagne shrink-0" />
                <span>orders@rootwills.co.uk | sales@rootwills.co.uk</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-champagne mb-4">Product Range</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/products?category=fresh_produce" className="hover:text-champagne transition-colors">Fresh Vegetables & Salads</Link></li>
              <li><Link href="/products?category=fresh_produce" className="hover:text-champagne transition-colors">Seasonal & Exotic Fruits</Link></li>
              <li><Link href="/products?category=fresh_produce" className="hover:text-champagne transition-colors">Living Microgreens & Herbs</Link></li>
              <li><Link href="/products?category=dairy_eggs" className="hover:text-champagne transition-colors">Artisan Dairy & British Eggs</Link></li>
              <li><Link href="/products?category=meat_poultry" className="hover:text-champagne transition-colors">Dry-Aged Beef & Poultry</Link></li>
              <li><Link href="/products?category=dry_goods" className="hover:text-champagne transition-colors">Valrhona Pastry & Truffles</Link></li>
            </ul>
          </div>

          {/* Sectors (SEO) */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-champagne mb-4">Who We Supply</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/sectors/restaurants" className="hover:text-champagne transition-colors">Fine Dining & Restaurants</Link></li>
              <li><Link href="/sectors/hotels" className="hover:text-champagne transition-colors">Boutique Hotels & Resorts</Link></li>
              <li><Link href="/sectors/care-homes" className="hover:text-champagne transition-colors">Care Homes & Healthcare</Link></li>
              <li><Link href="/sectors/caterers" className="hover:text-champagne transition-colors">Luxury Event Caterers</Link></li>
              <li><Link href="/sectors/pubs-bars" className="hover:text-champagne transition-colors">Gastropubs & Bars</Link></li>
              <li><Link href="/sectors/schools" className="hover:text-champagne transition-colors">Schools & Colleges</Link></li>
            </ul>
          </div>

          {/* Local Supply & Portals */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-champagne mb-4">Regional Supply</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/locations/birmingham" className="hover:text-champagne transition-colors">Birmingham Wholesale Supply</Link></li>
              <li><Link href="/locations/coventry" className="hover:text-champagne transition-colors">Coventry & Warwickshire</Link></li>
              <li><Link href="/locations/leicester" className="hover:text-champagne transition-colors">Leicester & East Midlands</Link></li>
              <li><Link href="/locations/london" className="hover:text-champagne transition-colors">Greater London Depots</Link></li>
              <li className="pt-3 border-t border-cream/10">
                <Link href="/login" className="font-semibold text-champagne hover:underline flex items-center gap-1">
                  Customer Portal &rarr;
                </Link>
              </li>
              <li>
                <Link href="/login?role=admin" className="text-xs text-cream/40 hover:text-champagne">
                  Staff CRM & Admin Portal &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-4 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center text-xs text-cream/40 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Rootwills Ltd. Company No. 14928102. VAT Reg: GB 412 8901 34. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cream">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cream">Terms of Trade</Link>
            <Link href="/sitemap.xml" className="hover:text-cream">Sitemap</Link>
            <Link href="/contact" className="hover:text-cream">Sales Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
