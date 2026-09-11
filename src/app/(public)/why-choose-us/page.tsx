import React from 'react';
import Link from 'next/link';
import { 
  Award, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Zap, 
  Truck, 
  Sparkles, 
  ThermometerSnowflake,
  DollarSign,
  Camera,
  Layers,
  Phone
} from 'lucide-react';

export const metadata = {
  title: 'Why Choose Rootwills Wholesale Foodservice | Rootwills',
  description:
    'Discover the key advantages of partnering with Rootwills, from 11pm cut-offs to 6am delivery guarantees, locked contract pricing, and 60-second photo credits.',
};

export default function WhyChooseUsPage() {
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
            <Award className="w-3.5 h-3.5 text-champagne" />
            <span>The Rootwills Operational Difference</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-cream uppercase tracking-tight leading-[0.95]">
            Engineered to Solve the
            <br />
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F6E199] to-[#C59B27] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(228,199,103,0.3)]">
              Wholesale Frustrations
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-cream/80 leading-relaxed font-sans max-w-2xl mx-auto">
            We spent months interviewing Michelin-starred head chefs, hotel F&amp;B directors, and contract caterers across the UK. Then we built the modern wholesale foodservice platform they actually asked for.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-obsidian-950 bg-gradient-to-r from-[#FFF4D0] via-[#E4C767] to-[#C9A227] text-xs uppercase tracking-wider shadow-[0_8px_30px_rgba(228,199,103,0.35)] hover:brightness-105 hover:scale-[1.03] transition-all"
            >
              <span>Open Business Trade Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/delivery"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-cream bg-obsidian-900/80 border border-champagne/30 hover:border-champagne hover:text-champagne text-xs font-mono uppercase tracking-wider transition-all"
            >
              <span>Check Delivery Coverage</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ACT II: COMPARISON MATRIX (LEGACY VS ROOTWILLS) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-6 sm:p-10 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 shadow-2xl space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-champagne font-bold">
              Direct Side-by-Side Analysis
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream uppercase">
              Traditional Food Suppliers vs. Rootwills Modern Platform
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-champagne/20 text-cream/70 font-mono uppercase tracking-wider">
                  <th className="py-3.5 px-4">Core Operational Standard</th>
                  <th className="py-3.5 px-4 text-rose-400">Legacy Broadliner</th>
                  <th className="py-3.5 px-4 text-champagne font-bold">Rootwills Direct Platform</th>
                  <th className="py-3.5 px-4 text-emerald-400">Executive Kitchen Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-champagne/10 text-cream/80 font-sans">
                <tr className="hover:bg-champagne/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-cream font-mono">Daily Order Cut-off</td>
                  <td className="py-4 px-4 text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>05:00 PM (Forces guessing dinner counts)</span>
                  </td>
                  <td className="py-4 px-4 text-champagne font-semibold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>11:00 PM Post-Service</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-emerald-300">Zero food waste; order on verified prep requirements</td>
                </tr>

                <tr className="hover:bg-champagne/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-cream font-mono">Pricing Transparency</td>
                  <td className="py-4 px-4 text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Volatile weekly market price fluctuations</span>
                  </td>
                  <td className="py-4 px-4 text-champagne font-semibold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Locked Weekly &amp; Monthly Contracts</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-emerald-300">Total cost certainty; stabilizes kitchen GP margins</td>
                </tr>

                <tr className="hover:bg-champagne/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-cream font-mono">Delivery Window</td>
                  <td className="py-4 px-4 text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Vague 08:00 AM – 02:00 PM window</span>
                  </td>
                  <td className="py-4 px-4 text-champagne font-semibold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Guaranteed 06:00 AM Drop SLA</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-emerald-300">Stock in walk-in before breakfast &amp; prep brigade clocks in</td>
                </tr>

                <tr className="hover:bg-champagne/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-cream font-mono">Reordering Workflow</td>
                  <td className="py-4 px-4 text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>15-minute phone calls &amp; clipboards</span>
                  </td>
                  <td className="py-4 px-4 text-champagne font-semibold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>45-Second 1-Click Mobile Portal</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-emerald-300">Chefs spend time on cooking, not procurement admin</td>
                </tr>

                <tr className="hover:bg-champagne/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-cream font-mono">Damaged / Rejected Crate</td>
                  <td className="py-4 px-4 text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Days chasing driver carbon credit slips</span>
                  </td>
                  <td className="py-4 px-4 text-champagne font-semibold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>60-Second Photo Credit Note</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-emerald-300">Immediate automated ledger adjustment on your VAT statement</td>
                </tr>

                <tr className="hover:bg-champagne/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-cream font-mono">Delivery Surcharges</td>
                  <td className="py-4 px-4 text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Split-drop penalties &amp; fuel levies</span>
                  </td>
                  <td className="py-4 px-4 text-champagne font-semibold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>0% Surcharges Ever</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-emerald-300">Completely transparent net contracted figures with zero surprises</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── ACT III: THE 6 OPERATIONAL PILLARS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-950/80 border border-champagne/30 text-champagne text-xs font-mono uppercase font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>6 Core Pillars</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream uppercase">
            Built for the Pressures of Real Kitchens
          </h2>
          <p className="text-xs sm:text-sm text-cream/75 font-sans">
            Every feature on our platform was engineered directly around kitchen brigade workflow realities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl p-8 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-4 hover:border-champagne hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(228,199,103,0.18)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              01
            </div>
            <h3 className="font-display text-xl font-bold text-cream">No Volatile "Market Price" Surprises</h3>
            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
              Legacy wholesalers fluctuate daily prices without warning, destroying kitchen GP targets. With Rootwills, your trade account is locked to fixed weekly or monthly contract rates, giving your finance team complete cost certainty.
            </p>
          </div>

          <div className="rounded-2xl p-8 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-4 hover:border-champagne hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(228,199,103,0.18)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              02
            </div>
            <h3 className="font-display text-xl font-bold text-cream">Late 11:00 PM Chef Order Cut-Off</h3>
            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
              Most broadliners cut off orders at 05:00 PM before dinner service even begins. Our automated picking system lets you submit your daily orders via web portal right after the last ticket leaves the pass at 11:00 PM.
            </p>
          </div>

          <div className="rounded-2xl p-8 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-4 hover:border-champagne hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(228,199,103,0.18)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              03
            </div>
            <h3 className="font-display text-xl font-bold text-cream">45-Second Quick Reorder Flow</h3>
            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
              No more scribbling lists on clipboard paper or leaving 15-minute midnight voicemails. Pull up yesterday&apos;s order on your smartphone, adjust crate quantities, and confirm in under 45 seconds with instant WhatsApp and email confirmation.
            </p>
          </div>

          <div className="rounded-2xl p-8 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-4 hover:border-champagne hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(228,199,103,0.18)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              04
            </div>
            <h3 className="font-display text-xl font-bold text-cream">Zero Split-Drop or Fuel Fees</h3>
            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
              We never charge hidden congestion levies, fuel surcharges, or split-delivery administrative penalties. The price you see in your portal contract is the exact net figure on your weekly consolidated VAT invoice.
            </p>
          </div>

          <div className="rounded-2xl p-8 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-4 hover:border-champagne hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(228,199,103,0.18)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              05
            </div>
            <h3 className="font-display text-xl font-bold text-cream">60-Second Photo Credit Guarantee</h3>
            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
              If an avocado isn&apos;t perfectly ripe or a berry crate arrived bruised, snap a photo in the customer portal. Our dispatch team issues an instant digital credit note within 60 seconds — zero arguing with drivers or paper slips.
            </p>
          </div>

          <div className="rounded-2xl p-8 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 space-y-4 hover:border-champagne hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(228,199,103,0.18)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50 group-hover:opacity-100" />
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              06
            </div>
            <h3 className="font-display text-xl font-bold text-cream">Dual-Temp Telemetry Compliance</h3>
            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
              Every delivery vehicle is equipped with dual-zone live sensors recording temperature every 30 seconds. Your HACCP and EHO compliance audit logs are automatically saved in your portal for effortless inspection verification.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ACT IV: VERIFIED CHEF TESTIMONIALS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-champagne font-bold">
              Trusted by 350+ Commercial Kitchens
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream uppercase">
              What Head Chefs Say About Partnering With Rootwills
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-sans">
            <div className="p-6 rounded-2xl bg-obsidian-900 border border-champagne/20 space-y-4">
              <p className="text-cream/85 italic leading-relaxed text-sm">
                &ldquo;The 11:00 PM cut-off was a complete game changer for our kitchen brigade. With our previous supplier, we had to guess our produce requirements before dinner service even began. Now we count our walk-in at 10:30 PM, place the order on our phone, and the crates are sitting inside at 06:15 AM.&rdquo;
              </p>
              <div className="border-t border-champagne/15 pt-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-cream">Chef Anthony Cole</div>
                  <div className="text-cream/60">Executive Head Chef, Birmingham Botanical Bistro</div>
                </div>
                <div className="text-champagne font-mono font-bold">Birmingham, B15</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-900 border border-champagne/20 space-y-4">
              <p className="text-cream/85 italic leading-relaxed text-sm">
                &ldquo;Locked monthly contract pricing has stabilized our food margins completely. No more arguing with account managers over unexplained invoice surcharges or sudden weekly price spikes on butter and cream. Rootwills is the most professional supplier we&apos;ve used in 15 years.&rdquo;
              </p>
              <div className="border-t border-champagne/15 pt-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-cream">Sarah Jenkins</div>
                  <div className="text-cream/60">Director of Food &amp; Beverage, Grand Midland Hotel Group</div>
                </div>
                <div className="text-champagne font-mono font-bold">West Midlands</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACT V: HIGH-CONVERSION CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel-gold p-8 sm:p-14 rounded-3xl text-center space-y-6 relative overflow-hidden border border-champagne/30">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/20 border border-champagne/40 text-champagne text-xs font-mono uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Upgrade Your Kitchen Supply Chain?</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream uppercase max-w-2xl mx-auto">
            Open Your Commercial Account in{' '}
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F6E199] to-[#C59B27] bg-clip-text text-transparent">
              Under 3 Minutes
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-cream/80 max-w-xl mx-auto font-sans leading-relaxed">
            Instant B2B credit approval up to £50,000, 30-day settlement terms, and locked contract rates for restaurants, hotels, and caterers across the UK.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/apply"
              className="px-8 py-4 rounded-xl font-bold text-obsidian-950 bg-gradient-to-r from-[#FFF4D0] via-[#E4C767] to-[#C9A227] shadow-[0_8px_30px_rgba(228,199,103,0.35)] hover:brightness-105 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Apply for Trade Facility</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-4 rounded-xl font-semibold text-cream bg-obsidian-950/80 border border-champagne/40 hover:bg-champagne/10 hover:text-champagne text-xs font-mono uppercase tracking-wider transition-all"
            >
              <span>Call Commercial Desk: 0121 790 8800</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
