'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Truck, 
  ShieldCheck, 
  Clock, 
  Award, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  ChevronRight, 
  ShoppingBag,
  Sparkles,
  Phone,
  ArrowUpRight,
  TrendingUp,
  Thermometer,
  Zap
} from 'lucide-react';

export default function FreshLightPreviewPage() {
  const [postcode, setPostcode] = useState('');
  const [lookupResult, setLookupResult] = useState<string | null>(null);

  const handlePostcodeLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) return;
    setLookupResult('✓ Birmingham Digbeth Hub: Next-day delivery guaranteed before 06:30 AM.');
  };

  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#1A1917] font-sans antialiased selection:bg-[#E8F3EB] selection:text-[#0B3B24]">
      {/* Concept Comparison Top Notification Banner */}
      <div className="bg-[#0B3B24] text-[#E8F3EB] py-2.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#C59B27] text-[#0B3B24] font-bold font-mono text-[10px] uppercase">
              Design Preview
            </span>
            <span className="font-medium">
              Concept 2: <strong>Farm-Fresh Organic Editorial (Light Theme)</strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[#E8F3EB] hover:text-[#C59B27] underline text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <span>&larr; Switch Back to View Luxury Dark Theme</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Fresh Clean Header */}
      <header className="sticky top-0 z-50 bg-[#FCFAF6]/90 backdrop-blur-md border-b border-[#EBE7DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#0B3B24] text-[#E8F3EB] flex items-center justify-center font-serif font-bold text-xl shadow-md group-hover:bg-[#C59B27] group-hover:text-[#0B3B24] transition-colors">
                R
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#0B3B24] block">
                  ROOTWILLS
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#C59B27] font-mono uppercase block -mt-1 font-bold">
                  Wholesale Foodservice
                </span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4A4740]">
              <Link href="/products" className="hover:text-[#0B3B24] transition-colors">Product Directory</Link>
              <Link href="/delivery" className="hover:text-[#0B3B24] transition-colors">Depot Fulfilment</Link>
              <Link href="/why-choose-us" className="hover:text-[#0B3B24] transition-colors">Quality & Traceability</Link>
              <Link href="/about" className="hover:text-[#0B3B24] transition-colors">Our Story</Link>
              <Link href="/contact" className="hover:text-[#0B3B24] transition-colors">Sales Desk</Link>
            </nav>

            {/* Header CTAs */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-bold text-[#0B3B24] hover:bg-[#E8F3EB] rounded-xl border border-[#D5CFBF] transition-all"
              >
                Customer Login
              </Link>
              <Link
                href="/onboarding"
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#0B3B24] hover:bg-[#124e31] rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Open Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section: Fresh Editorial Style */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F3EB] border border-[#BCE1C7] text-xs font-bold text-[#0B3B24]">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Next-Day UK Foodservice Supply &bull; 11:00 PM Order Cut-off</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B3B24] leading-[1.12]">
                Farm-Fresh Produce & Fine Food for <span className="text-[#C59B27] italic">Commercial Kitchens.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#5C584E] leading-relaxed max-w-2xl">
                Supplying leading restaurants, luxury hotels, gastropubs, and caterers across Birmingham and the UK. Guaranteed 06:00 AM delivery, contract pricing, and farm-to-fork batch traceability.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/onboarding"
                  className="px-7 py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#124e31] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <span>Open Commercial Trade Account</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#F3EFE6] text-[#0B3B24] font-bold text-sm border border-[#D5CFBF] shadow-sm transition-all flex items-center gap-2"
                >
                  <span>Browse 1,200+ Products</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Key Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#EBE7DF]">
                <div className="p-3 bg-white rounded-xl border border-[#EBE7DF] shadow-sm">
                  <Clock className="w-4 h-4 text-[#0B3B24] mb-1" />
                  <div className="text-xs font-bold text-[#0B3B24]">11:00 PM Cut-off</div>
                  <div className="text-[11px] text-[#787366]">Late night kitchen orders</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#EBE7DF] shadow-sm">
                  <Truck className="w-4 h-4 text-[#0B3B24] mb-1" />
                  <div className="text-xs font-bold text-[#0B3B24]">06:00 AM Drops</div>
                  <div className="text-[11px] text-[#787366]">Before breakfast prep</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#EBE7DF] shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-[#0B3B24] mb-1" />
                  <div className="text-xs font-bold text-[#0B3B24]">BRCGS & SALSA</div>
                  <div className="text-[11px] text-[#787366]">Certified food safety</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#EBE7DF] shadow-sm">
                  <Award className="w-4 h-4 text-[#0B3B24] mb-1" />
                  <div className="text-xs font-bold text-[#0B3B24]">30-Day Credit</div>
                  <div className="text-[11px] text-[#787366]">BACS Direct Debit facility</div>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 space-y-4">
              {/* Product Feature Card */}
              <div className="bg-white p-6 rounded-3xl border border-[#EBE7DF] shadow-xl space-y-4 relative overflow-hidden">
                <div className="flex justify-between items-center pb-3 border-b border-[#F0ECE1]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold font-mono uppercase text-[#0B3B24]">Digbeth Depot Active Stock</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#C59B27]">Chamber: 2.4°C</span>
                </div>

                {/* Sample Produce Rows */}
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-2xl bg-[#FCFAF6] border border-[#EBE7DF] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#0B3B24]">San Marzano D.O.P. Tomatoes</div>
                      <div className="text-[11px] text-[#787366]">Campania, Italy &bull; 6 × 2.5kg Case</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#0B3B24] font-mono text-sm">£38.50</div>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">In Stock</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FCFAF6] border border-[#EBE7DF] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#0B3B24]">Burrata Pugliese Artigianale</div>
                      <div className="text-[11px] text-[#787366]">Puglia, Italy &bull; Fresh Chilled 8 × 125g</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#0B3B24] font-mono text-sm">£22.80</div>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">In Stock</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FCFAF6] border border-[#EBE7DF] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#0B3B24]">28-Day Dry-Aged Ribeye Primal</div>
                      <div className="text-[11px] text-[#787366]">Shropshire Grass-Fed &bull; ~4.5kg Cut</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#0B3B24] font-mono text-sm">£118.00</div>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">In Stock</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Postcode Check */}
                <form onSubmit={handlePostcodeLookup} className="pt-2">
                  <label className="block text-[11px] font-bold text-[#5C584E] mb-1">
                    Check Next-Day Delivery to Your Kitchen Postcode:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. B2 5BN or CV1 1AA"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#D5CFBF] bg-white text-[#1A1917] focus:outline-none focus:border-[#0B3B24]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#0B3B24] hover:bg-[#124e31] text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Check
                    </button>
                  </div>
                  {lookupResult && (
                    <div className="mt-2 p-2 bg-[#E8F3EB] rounded-lg text-[11px] text-[#0B3B24] font-medium border border-[#BCE1C7]">
                      {lookupResult}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-16 bg-white border-t border-b border-[#EBE7DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-[#C59B27] uppercase tracking-widest">
                Our Wholesale Range
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B3B24] mt-1">
                Everything Your Head Chef Needs
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-[#0B3B24] hover:text-[#C59B27] flex items-center gap-1 group"
            >
              <span>View All 1,200+ Catalog Products</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category 1 */}
            <div className="p-6 rounded-2xl bg-[#FCFAF6] border border-[#EBE7DF] hover:border-[#0B3B24] transition-all space-y-3 group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-[#E8F3EB] text-[#0B3B24] flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                🥕
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0B3B24]">Fresh Produce & Herbs</h3>
              <p className="text-xs text-[#5C584E] leading-relaxed">
                Heritage tomatoes, microgreens, wild mushrooms, seasonal berries, and prepped vegetables.
              </p>
              <div className="pt-2 text-xs font-bold text-[#0B3B24] flex items-center gap-1 group-hover:text-[#C59B27]">
                <span>350+ Produce Lines</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Category 2 */}
            <div className="p-6 rounded-2xl bg-[#FCFAF6] border border-[#EBE7DF] hover:border-[#0B3B24] transition-all space-y-3 group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-[#E8F3EB] text-[#0B3B24] flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                🧀
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0B3B24]">Dairy, Eggs & Cheeses</h3>
              <p className="text-xs text-[#5C584E] leading-relaxed">
                British Lion free-range eggs, Cotswold salted butter, artisan European cheeses & double creams.
              </p>
              <div className="pt-2 text-xs font-bold text-[#0B3B24] flex items-center gap-1 group-hover:text-[#C59B27]">
                <span>120+ Dairy Lines</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Category 3 */}
            <div className="p-6 rounded-2xl bg-[#FCFAF6] border border-[#EBE7DF] hover:border-[#0B3B24] transition-all space-y-3 group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-[#E8F3EB] text-[#0B3B24] flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                🥩
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0B3B24]">Butchery, Steaks & Game</h3>
              <p className="text-xs text-[#5C584E] leading-relaxed">
                28-day dry-aged British prime beef, Shropshire lamb, corn-fed poultry, and bespoke culinary cuts.
              </p>
              <div className="pt-2 text-xs font-bold text-[#0B3B24] flex items-center gap-1 group-hover:text-[#C59B27]">
                <span>85+ Butchery Cuts</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Category 4 */}
            <div className="p-6 rounded-2xl bg-[#FCFAF6] border border-[#EBE7DF] hover:border-[#0B3B24] transition-all space-y-3 group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-[#E8F3EB] text-[#0B3B24] flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                🫒
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0B3B24]">Pastry, Truffles & Oils</h3>
              <p className="text-xs text-[#5C584E] leading-relaxed">
                Valrhona chocolate, Italian white truffle oils, Modena vinegars, pastry flours, and gourmet dry store.
              </p>
              <div className="pt-2 text-xs font-bold text-[#0B3B24] flex items-center gap-1 group-hover:text-[#C59B27]">
                <span>400+ Specialty Lines</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Verdict Section */}
      <section className="py-16 bg-[#F3EFE6] border-b border-[#EBE7DF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3B24] text-[#E8F3EB] text-xs font-bold font-mono uppercase">
            Design Decision
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B3B24]">
            Compare Both Styles Side-by-Side
          </h2>
          <p className="text-sm text-[#5C584E] max-w-xl mx-auto leading-relaxed">
            Which visual direction fits your vision for Rootwills? Both options are completely built and verified.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
            <div className="p-6 rounded-2xl bg-[#070706] text-[#F5EFE6] border border-[#262621] space-y-3 shadow-xl">
              <span className="px-2 py-0.5 rounded bg-[#C9A227] text-[#070706] font-bold text-[10px] font-mono uppercase">
                Option 1: Live Now
              </span>
              <h3 className="font-serif text-xl font-bold text-[#E4C767]">Midnight Luxury & Gold</h3>
              <p className="text-xs text-[#F5EFE6]/70 leading-relaxed">
                High-end Michelin aesthetic with dark obsidian canvas and glowing gold. Built for late-night kitchen ordering.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#E4C767] hover:underline pt-2"
              >
                <span>View Live Dark Homepage &rarr;</span>
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white text-[#1A1917] border-2 border-[#0B3B24] space-y-3 shadow-xl">
              <span className="px-2 py-0.5 rounded bg-[#0B3B24] text-white font-bold text-[10px] font-mono uppercase">
                Option 2: Current Preview
              </span>
              <h3 className="font-serif text-xl font-bold text-[#0B3B24]">Farm-Fresh Organic Light</h3>
              <p className="text-xs text-[#5C584E] leading-relaxed">
                Crisp British forest green on warm alabaster cream. High contrast, daytime readability, and organic produce warmth.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0B3B24] pt-2">
                ✓ Currently Viewing This Page
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#FCFAF6] text-center text-xs text-[#787366]">
        Rootwills Foodservice Ltd &bull; Digbeth Wholesale Food Hub, Birmingham B5 6DY &bull; VAT Reg: GB 412 8901 34
      </footer>
    </div>
  );
}
