import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  ShieldCheck, 
  HeartHandshake, 
  MapPin, 
  ArrowRight, 
  Award, 
  Clock, 
  Truck, 
  CheckCircle2, 
  Leaf, 
  Sun, 
  Thermometer, 
  Sparkles,
  Phone,
  FileText
} from 'lucide-react';

export const metadata = {
  title: 'About Our British Farm Provenance, History & Team | Rootwills',
  description:
    'Learn how Rootwills connects UK growers and hospitality kitchens with farm-direct fresh produce, daily 2am Digbeth market selection, and next-gen cold-chain logistics.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-cream pb-24 space-y-20 sm:space-y-28 relative overflow-hidden">
      
      {/* ─── ACT I: HERO HEADER ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase font-bold shadow-lg">
            <Building2 className="w-3.5 h-3.5 text-champagne" />
            <span>Digbeth Wholesale Quarter &bull; British Farm Provenance</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-cream uppercase tracking-tight leading-[1.05]">
            From Historic Digbeth to the <span className="gold-gradient-text">UK’s Premier Kitchens</span>
          </h1>

          <p className="text-sm sm:text-base text-cream/75 leading-relaxed font-sans max-w-2xl mx-auto font-light">
            Founded with a singular standard: connect Britain’s finest generational growers, dairies, and coastal producers directly with commercial chefs — eliminating unnecessary brokers, preserving gross profit margins, and guaranteeing 06:00 AM kitchen deliveries.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-obsidian-950 bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-xs uppercase tracking-widest shadow-gold-glow hover:brightness-110 transition-all"
            >
              <span>Open Trade Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-cream/80 border border-emerald-800/60 bg-emerald-950/40 hover:border-champagne/60 hover:text-champagne text-xs font-mono uppercase tracking-wider transition-all"
            >
              <span>Explore 1,200+ Lines</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ACT II: OPERATIONAL SCALE METRICS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-emerald-900/50 space-y-2 text-center hover:border-champagne/40 transition-colors">
            <div className="font-mono text-3xl sm:text-4xl font-black text-champagne">02:00 AM</div>
            <div className="text-xs font-bold text-cream uppercase font-mono tracking-wider">Daily Market Selection</div>
            <p className="text-[11px] text-cream/60 font-sans leading-relaxed">
              Senior buyers inspect and hand-select Class 1 produce at Birmingham wholesale market every morning.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-emerald-900/50 space-y-2 text-center hover:border-champagne/40 transition-colors">
            <div className="font-mono text-3xl sm:text-4xl font-black text-champagne">06:00 AM</div>
            <div className="text-xs font-bold text-cream uppercase font-mono tracking-wider">Kitchen Drop SLA</div>
            <p className="text-[11px] text-cream/60 font-sans leading-relaxed">
              Pre-dawn deliveries checked into walk-ins before breakfast prep begins across all commercial sectors.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-emerald-900/50 space-y-2 text-center hover:border-champagne/40 transition-colors">
            <div className="font-mono text-3xl sm:text-4xl font-black text-champagne">1,200+</div>
            <div className="text-xs font-bold text-cream uppercase font-mono tracking-wider">Wholesale Lines</div>
            <p className="text-[11px] text-cream/60 font-sans leading-relaxed">
              Single-estate vegetables, heritage fruits, farm dairy sheets, dry pantry goods, and living herbs.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-emerald-900/50 space-y-2 text-center hover:border-champagne/40 transition-colors">
            <div className="font-mono text-3xl sm:text-4xl font-black text-champagne">99.8%</div>
            <div className="text-xs font-bold text-cream uppercase font-mono tracking-wider">On-Time Fulfilment</div>
            <p className="text-[11px] text-cream/60 font-sans leading-relaxed">
              Multi-temperature Mercedes fleet equipped with live GPS &amp; temperature telemetry updated every 30s.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ACT III: OUR HERITAGE & SOURCING PHILOSOPHY ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase">
              <Leaf className="w-3.5 h-3.5" />
              <span>Digbeth Trading Heritage</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream uppercase leading-tight">
              Rooted in Britain’s Most Famous Wholesale Hub
            </h2>

            <div className="space-y-4 text-sm text-cream/75 leading-relaxed font-sans font-light">
              <p>
                Rootwills was born in the historic wholesale trading corridors of Pershore Street, Digbeth. Where traditional suppliers relied on scribbled carbon-copy receipts and unmonitored transit vans, we saw an urgent opportunity to modernize British foodservice from the ground up.
              </p>
              <p>
                Every night while the UK sleeps, our direct farm lines arrive from Evesham, Kent, and the Lincolnshire fens into our high-hygiene temperature-zoned consolidation depot. By 2:30 AM, our QC inspectors verify brix levels, firmness, and freshness before packing orders into barcode-scanned crates.
              </p>
              <p>
                By blending this deep produce pedigree with custom digital kitchen software, we give chefs transparent fixed pricing, instant photo credit notes, and 1-click repeat orders that legacy broadliners cannot match.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-champagne">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Broker Fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Single-Estate Traceability</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Locked Contract Rates</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-champagne/30 bg-obsidian-900 group">
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80"
                alt="Wholesale market fresh produce in Digbeth Birmingham"
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-obsidian-950/80 backdrop-blur-md border border-champagne/30 text-xs">
                <span className="font-mono text-champagne uppercase tracking-wider font-bold block mb-1">
                  Digbeth Wholesale Consolidation Hub
                </span>
                <span className="text-cream/80">
                  Daily 2:00 AM Class 1 grading inspection &amp; multi-temperature loading bay.
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── ACT IV: 4 CORE PROVENANCE PILLARS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Operational Integrity</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream uppercase">
            The Four Pillars of Rootwills Excellence
          </h2>
          <p className="text-xs sm:text-sm text-cream/70">
            How we protect culinary kitchen standards from farm gate to service pass.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-emerald-900/50 space-y-4 hover:border-champagne/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              01
            </div>
            <h3 className="font-display text-lg font-bold text-cream">Grower-Direct Partnerships</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              We contract directly with generational British growers across Evesham, Kent, and Worcestershire, ensuring maximum shelf life and field freshness.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-emerald-900/50 space-y-4 hover:border-champagne/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              02
            </div>
            <h3 className="font-display text-lg font-bold text-cream">Dual-Temp Cold-Chain</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              Our fleet features dual-compartment chillers maintaining crisp salads at +4°C and frozen lines at -18°C with live temperature telemetry.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-emerald-900/50 space-y-4 hover:border-champagne/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              03
            </div>
            <h3 className="font-display text-lg font-bold text-cream">Sensory &amp; Class 1 Grading</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              Every crate is physically inspected for uniformity, aroma, color, and firmness before loading. Substandard produce is rejected at the bay.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-emerald-900/50 space-y-4 hover:border-champagne/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              04
            </div>
            <h3 className="font-display text-lg font-bold text-cream">Digital Kitchen Platform</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              Submit orders until 11:00 PM post-dinner service, manage standing orders, view locked contracts, and download VAT invoices in one click.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ACT V: REGIONAL PROVENANCE MAP / ORIGIN SHOWCASE ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-900/60 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-emerald-900/60 pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-champagne font-bold block mb-1">
                Regional Sourcing Map
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream uppercase">
                Where Our Fresh Produce Comes From
              </h2>
            </div>
            <div className="text-xs font-mono text-emerald-400">
              100% Traceable Single-Estate Origins
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
              <div className="flex items-center gap-2 text-champagne font-bold font-mono uppercase">
                <MapPin className="w-3.5 h-3.5 text-champagne" />
                <span>Vale of Evesham</span>
              </div>
              <div className="text-cream font-semibold">Worcestershire Market Gardens</div>
              <p className="text-cream/65 leading-relaxed">
                Heritage asparagus, heirloom brassicas, baby leeks, beetroot, and traditional root vegetables harvested daily.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
              <div className="flex items-center gap-2 text-champagne font-bold font-mono uppercase">
                <MapPin className="w-3.5 h-3.5 text-champagne" />
                <span>Kent &amp; East Anglia</span>
              </div>
              <div className="text-cream font-semibold">The Garden of England Orchards</div>
              <p className="text-cream/65 leading-relaxed">
                Heritage Cox &amp; Bramley apples, Conference pears, soft summer berries, and seasonal stone fruit direct from grower co-ops.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
              <div className="flex items-center gap-2 text-champagne font-bold font-mono uppercase">
                <MapPin className="w-3.5 h-3.5 text-champagne" />
                <span>Somerset &amp; Cotswolds</span>
              </div>
              <div className="text-cream font-semibold">Artisan Farmstead Dairies</div>
              <p className="text-cream/65 leading-relaxed">
                Cultured butter sheets, unpasteurised farmhouse cheeses, clotted cream, and pasture-raised British Lion egg crates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
              <div className="flex items-center gap-2 text-champagne font-bold font-mono uppercase">
                <MapPin className="w-3.5 h-3.5 text-champagne" />
                <span>Midlands Hydroponics</span>
              </div>
              <div className="text-cream font-semibold">Precision Indoor Urban Farms</div>
              <p className="text-cream/65 leading-relaxed">
                Living microgreens cut on order, pea shoots, edible viola flowers, and aromatic hydroponic coriander &amp; basil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACT VI: ACCREDITATIONS & CERTIFICATIONS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-emerald-950/30 border border-champagne/30 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Commercial Quality Accreditations</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream uppercase">
            Independent UK Food Safety &amp; Quality Assurances
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-obsidian-950/60 border border-emerald-800/50 space-y-1.5">
              <div className="text-champagne font-bold text-sm">BRCGS Storage &amp; Distribution</div>
              <div className="text-cream/60">Certified Grade AA Facility</div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-950/60 border border-emerald-800/50 space-y-1.5">
              <div className="text-champagne font-bold text-sm">SALSA Assured</div>
              <div className="text-cream/60">Safe and Local Supplier Approval</div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-950/60 border border-emerald-800/50 space-y-1.5">
              <div className="text-champagne font-bold text-sm">Red Tractor Assured</div>
              <div className="text-cream/60">Full Farm-to-Fork Traceability</div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-950/60 border border-emerald-800/50 space-y-1.5">
              <div className="text-champagne font-bold text-sm">HACCP Certified</div>
              <div className="text-cream/60">Rigorous Hazard Analysis Standards</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACT VII: FINAL CONVERSION CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-gold p-8 sm:p-14 rounded-3xl text-center space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/20 border border-champagne/40 text-champagne text-xs font-mono uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Elevate Your Kitchen Supply?</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream uppercase max-w-2xl mx-auto">
            Experience British Foodservice <span className="gold-gradient-text">Engineered for Chefs</span>
          </h2>

          <p className="text-xs sm:text-sm text-cream/75 max-w-xl mx-auto font-sans leading-relaxed">
            Join premier Michelin-starred venues, boutique hotels, and luxury catering kitchens who trust Rootwills every single morning. Apply in 3 minutes for instant trade credit.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/apply"
              className="px-8 py-4 rounded-xl font-bold text-obsidian-950 bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim shadow-gold-glow hover:brightness-110 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Open Commercial Trade Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-4 rounded-xl font-semibold text-cream/90 border border-champagne/40 bg-emerald-950/60 hover:bg-champagne/10 hover:text-champagne text-xs font-mono uppercase tracking-wider transition-all"
            >
              <span>Speak with Birmingham Commercial Desk</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
