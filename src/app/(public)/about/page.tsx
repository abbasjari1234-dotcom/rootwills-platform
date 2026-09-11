import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Leaf, 
  Sparkles,
  Truck,
  Layers,
  Activity
} from 'lucide-react';

export const metadata = {
  title: 'About Our British Farm Provenance, History & Operations | Rootwills',
  description:
    'Learn how Rootwills connects UK generational growers with commercial hospitality kitchens through single-estate fresh produce, daily 2am Digbeth market grading, and temperature-locked logistics.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-cream pb-24 space-y-20 sm:space-y-28 relative overflow-hidden">
      {/* Ambient Lighting & Luxury Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-champagne/15 via-emerald-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-champagne/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid-texture opacity-20 pointer-events-none" />

      {/* ─── ACT I: HERO HEADER ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-champagne/30 text-champagne text-[11px] font-mono uppercase tracking-[0.28em] font-semibold shadow-[0_0_25px_rgba(228,199,103,0.18)]">
            <Building2 className="w-3.5 h-3.5 text-champagne" />
            <span>Digbeth Wholesale Quarter &bull; British Farm Provenance</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-cream uppercase tracking-tight leading-[0.95]">
            From Historic Digbeth to the
            <br />
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F6E199] to-[#C59B27] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(228,199,103,0.3)]">
              UK’s Premier Kitchens
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-cream/80 leading-relaxed font-sans max-w-2xl mx-auto">
            Founded with a singular standard: connect Britain’s finest generational growers, single-herd dairies, and coastal producers directly with professional chefs — eliminating brokers, preserving margins, and guaranteeing 06:00 AM kitchen deliveries.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-obsidian-950 bg-gradient-to-r from-[#FFF4D0] via-[#E4C767] to-[#C9A227] text-xs uppercase tracking-wider shadow-[0_8px_30px_rgba(228,199,103,0.35)] hover:brightness-105 hover:scale-[1.03] transition-all"
            >
              <span>Open Trade Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-cream bg-obsidian-900/80 border border-champagne/30 hover:border-champagne hover:text-champagne text-xs font-mono uppercase tracking-wider transition-all"
            >
              <span>Explore 1,200+ Lines</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ACT II: OPERATIONAL SCALE METRICS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-2xl p-6 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-2 text-center hover:border-champagne hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(228,199,103,0.15)] transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="font-mono text-3xl sm:text-4xl font-black text-champagne">02:00 AM</div>
            <div className="text-xs font-bold text-cream uppercase font-mono tracking-wider">Daily Market Selection</div>
            <p className="text-[11px] text-cream/70 font-sans leading-relaxed">
              Senior buyers inspect and hand-select Class 1 produce at Birmingham wholesale market every morning.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-2 text-center hover:border-champagne hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(228,199,103,0.15)] transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="font-mono text-3xl sm:text-4xl font-black text-champagne">06:00 AM</div>
            <div className="text-xs font-bold text-cream uppercase font-mono tracking-wider">Kitchen Drop SLA</div>
            <p className="text-[11px] text-cream/70 font-sans leading-relaxed">
              Pre-dawn deliveries checked straight into walk-in fridges before breakfast brigade prep begins.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-2 text-center hover:border-champagne hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(228,199,103,0.15)] transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="font-mono text-3xl sm:text-4xl font-black text-champagne">1,200+</div>
            <div className="text-xs font-bold text-cream uppercase font-mono tracking-wider">Wholesale Lines</div>
            <p className="text-[11px] text-cream/70 font-sans leading-relaxed">
              Single-estate fruits, Evesham brassicas, artisan cheese rolls, dry store pantry, and living herbs.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-2 text-center hover:border-champagne hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(228,199,103,0.15)] transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="font-mono text-3xl sm:text-4xl font-black text-emerald-400">99.8%</div>
            <div className="text-xs font-bold text-cream uppercase font-mono tracking-wider">On-Time Fulfilment</div>
            <p className="text-[11px] text-cream/70 font-sans leading-relaxed">
              Dual-temperature Mercedes fleet equipped with live GPS &amp; hold temperature telemetry.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ACT III: OUR HERITAGE & SOURCING PHILOSOPHY ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-950/80 border border-champagne/30 text-champagne text-xs font-mono uppercase font-semibold">
              <Leaf className="w-3.5 h-3.5" />
              <span>Digbeth Trading Heritage</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream uppercase leading-tight">
              Rooted in Britain’s Most Famous Wholesale Hub
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-cream/80 leading-relaxed font-sans">
              <p>
                Rootwills was born in the historic wholesale trading corridors of Pershore Street, Digbeth. Where traditional suppliers relied on scribbled carbon-copy receipts and unmonitored transit vans, we saw an urgent opportunity to modernize British foodservice from the ground up.
              </p>
              <p>
                Every night while the UK sleeps, our direct farm lines arrive from Evesham, Kent, and the Lincolnshire fens into our high-hygiene temperature-zoned consolidation depot. By 02:30 AM, our QC inspectors verify brix levels, firmness, and freshness before packing orders into barcode-scanned crates.
              </p>
              <p>
                By blending this deep produce pedigree with custom digital kitchen software, we give chefs transparent fixed pricing, instant photo credit notes, and 1-click repeat orders that legacy broadliners cannot match.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-champagne">
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
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-champagne/35 bg-obsidian-900 group">
              <Image
                src="/images/branded/rootwills_digbeth_hub.jpg"
                alt="Rootwills Digbeth consolidation depot hub"
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-obsidian-950/85 backdrop-blur-md border border-champagne/30 text-xs">
                <span className="font-mono text-champagne uppercase tracking-wider font-bold block mb-1">
                  Digbeth Wholesale Consolidation Hub
                </span>
                <span className="text-cream/80 font-sans">
                  Daily 02:00 AM Class 1 grading inspection &amp; multi-temperature dual-zone loading bay.
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── ACT IV: 4 CORE PROVENANCE PILLARS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-950/80 border border-champagne/30 text-champagne text-xs font-mono uppercase font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Operational Integrity</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream uppercase">
            The Four Pillars of Rootwills Excellence
          </h2>
          <p className="text-xs sm:text-sm text-cream/75 font-sans">
            How we protect culinary kitchen standards from farm gate to service pass.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl p-6 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-4 hover:border-champagne hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(228,199,103,0.18)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              01
            </div>
            <h3 className="font-display text-lg font-bold text-cream">Grower-Direct Partnerships</h3>
            <p className="text-xs text-cream/75 leading-relaxed font-sans">
              We contract directly with generational British growers across Evesham, Kent, and Worcestershire, ensuring maximum shelf life and field freshness.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-4 hover:border-champagne hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(228,199,103,0.18)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              02
            </div>
            <h3 className="font-display text-lg font-bold text-cream">Dual-Temp Cold-Chain</h3>
            <p className="text-xs text-cream/75 leading-relaxed font-sans">
              Our fleet features dual-compartment chillers maintaining crisp salads at +4°C and frozen lines at -18°C with live temperature telemetry.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-4 hover:border-champagne hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(228,199,103,0.18)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              03
            </div>
            <h3 className="font-display text-lg font-bold text-cream">Sensory &amp; Class 1 Grading</h3>
            <p className="text-xs text-cream/75 leading-relaxed font-sans">
              Every crate is physically inspected for uniformity, aroma, color, and firmness before loading. Substandard produce is rejected at the bay.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-4 hover:border-champagne hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(228,199,103,0.18)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              04
            </div>
            <h3 className="font-display text-lg font-bold text-cream">Digital Kitchen Platform</h3>
            <p className="text-xs text-cream/75 leading-relaxed font-sans">
              Submit orders until 11:00 PM post-dinner service, manage standing orders, view locked contracts, and download VAT invoices in one click.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ACT V: REGIONAL PROVENANCE MAP ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="rounded-3xl p-8 sm:p-12 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-champagne/20 pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-champagne font-bold block mb-1">
                Regional Sourcing Map
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream uppercase">
                Where Our Fresh Produce Comes From
              </h2>
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold">
              100% Traceable Single-Estate Origins
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-sans">
            <div className="p-4 rounded-xl bg-obsidian-900 border border-champagne/15 space-y-2">
              <div className="flex items-center gap-2 text-champagne font-bold font-mono uppercase">
                <MapPin className="w-3.5 h-3.5 text-champagne" />
                <span>Vale of Evesham</span>
              </div>
              <div className="text-cream font-semibold">Worcestershire Market Gardens</div>
              <p className="text-cream/70 leading-relaxed">
                Heritage asparagus, heirloom brassicas, baby leeks, beetroot, and traditional root vegetables harvested daily.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-900 border border-champagne/15 space-y-2">
              <div className="flex items-center gap-2 text-champagne font-bold font-mono uppercase">
                <MapPin className="w-3.5 h-3.5 text-champagne" />
                <span>Kent &amp; East Anglia</span>
              </div>
              <div className="text-cream font-semibold">The Garden of England Orchards</div>
              <p className="text-cream/70 leading-relaxed">
                Heritage Cox &amp; Bramley apples, Conference pears, soft summer berries, and seasonal stone fruit direct from grower co-ops.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-900 border border-champagne/15 space-y-2">
              <div className="flex items-center gap-2 text-champagne font-bold font-mono uppercase">
                <MapPin className="w-3.5 h-3.5 text-champagne" />
                <span>Somerset &amp; Cotswolds</span>
              </div>
              <div className="text-cream font-semibold">Artisan Farmstead Dairies</div>
              <p className="text-cream/70 leading-relaxed">
                Cultured butter sheets, unpasteurised farmhouse cheeses, clotted cream, and pasture-raised British Lion egg crates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-900 border border-champagne/15 space-y-2">
              <div className="flex items-center gap-2 text-champagne font-bold font-mono uppercase">
                <MapPin className="w-3.5 h-3.5 text-champagne" />
                <span>Midlands Hydroponics</span>
              </div>
              <div className="text-cream font-semibold">Precision Indoor Urban Farms</div>
              <p className="text-cream/70 leading-relaxed">
                Living microgreens cut on order, pea shoots, edible viola flowers, and aromatic hydroponic coriander &amp; basil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACT VI: ACCREDITATIONS & CERTIFICATIONS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-10 rounded-2xl bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 shadow-xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>Commercial Quality Accreditations</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream uppercase">
            Independent UK Food Safety &amp; Quality Assurances
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-obsidian-900 border border-champagne/20 space-y-1.5">
              <div className="text-champagne font-bold text-sm">BRCGS Storage &amp; Distribution</div>
              <div className="text-cream/60">Certified Grade AA Facility</div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-900 border border-champagne/20 space-y-1.5">
              <div className="text-champagne font-bold text-sm">SALSA Assured</div>
              <div className="text-cream/60">Safe and Local Supplier Approval</div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-900 border border-champagne/20 space-y-1.5">
              <div className="text-champagne font-bold text-sm">Red Tractor Assured</div>
              <div className="text-cream/60">Full Farm-to-Fork Traceability</div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-900 border border-champagne/20 space-y-1.5">
              <div className="text-champagne font-bold text-sm">HACCP Certified</div>
              <div className="text-cream/60">Rigorous Hazard Analysis Standards</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACT VII: FINAL CONVERSION CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel-gold p-8 sm:p-14 rounded-3xl text-center space-y-6 relative overflow-hidden border border-champagne/30">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/20 border border-champagne/40 text-champagne text-xs font-mono uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Elevate Your Kitchen Supply?</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream uppercase max-w-2xl mx-auto">
            Experience British Foodservice{' '}
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F6E199] to-[#C59B27] bg-clip-text text-transparent">
              Engineered for Chefs
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-cream/80 max-w-xl mx-auto font-sans leading-relaxed">
            Join premier Michelin-starred venues, boutique hotels, and luxury catering kitchens who trust Rootwills every single morning. Apply in 3 minutes for instant trade credit.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/apply"
              className="px-8 py-4 rounded-xl font-bold text-obsidian-950 bg-gradient-to-r from-[#FFF4D0] via-[#E4C767] to-[#C9A227] shadow-[0_8px_30px_rgba(228,199,103,0.35)] hover:brightness-105 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Open Commercial Trade Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-4 rounded-xl font-semibold text-cream bg-obsidian-950/80 border border-champagne/40 hover:bg-champagne/10 hover:text-champagne text-xs font-mono uppercase tracking-wider transition-all"
            >
              <span>Speak with Birmingham Commercial Desk</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
