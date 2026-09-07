import React from 'react';
import Link from 'next/link';
import { 
  Award, 
  ShieldCheck, 
  Repeat, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Zap, 
  Truck, 
  Check, 
  Sparkles, 
  Phone, 
  DollarSign, 
  Camera,
  Layers,
  ThermometerSnowflake
} from 'lucide-react';

export const metadata = {
  title: 'Why Choose Rootwills Wholesale Foodservice | Rootwills',
  description:
    'Discover the 5 key advantages of partnering with Rootwills, from 11pm cut-offs to 6am delivery guarantees and locked contract pricing. Upgrade your commercial kitchen supply.',
};

export default function WhyChooseUsPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-cream pb-24 space-y-20 sm:space-y-28 relative overflow-hidden">
      
      {/* ─── ACT I: HERO HEADER ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase font-bold shadow-lg">
            <Award className="w-3.5 h-3.5 text-champagne" />
            <span>The Rootwills Operational Difference</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-cream uppercase tracking-tight leading-[1.05]">
            Engineered to Solve the 5 Biggest <span className="gold-gradient-text">Wholesale Frustrations</span>
          </h1>

          <p className="text-sm sm:text-base text-cream/75 leading-relaxed font-sans max-w-2xl mx-auto font-light">
            We spent months interviewing Michelin-starred head chefs, hotel F&amp;B directors, and contract caterers across the UK. Then we built the modern wholesale foodservice platform they actually asked for.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-obsidian-950 bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-xs uppercase tracking-widest shadow-gold-glow hover:brightness-110 transition-all"
            >
              <span>Open Business Trade Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/delivery"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-cream/80 border border-emerald-800/60 bg-emerald-950/40 hover:border-champagne/60 hover:text-champagne text-xs font-mono uppercase tracking-wider transition-all"
            >
              <span>Check Delivery Coverage</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ACT II: COMPARISON MATRIX (LEGACY VS ROOTWILLS) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-900/60 space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-champagne font-bold">
              Direct Side-by-Side Analysis
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream uppercase">
              Traditional Food Suppliers vs. Rootwills Platform
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-emerald-900/80 text-cream/60 font-mono uppercase tracking-wider">
                  <th className="py-3 px-4">Core Feature</th>
                  <th className="py-3 px-4 text-rose-400/80">Legacy Broadliner</th>
                  <th className="py-3 px-4 text-champagne font-bold">Rootwills Modern Platform</th>
                  <th className="py-3 px-4 text-emerald-400">Kitchen Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/80 text-cream/80 font-sans">
                <tr className="hover:bg-emerald-950/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-cream font-mono">Daily Order Cut-off</td>
                  <td className="py-4 px-4 text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>5:00 PM (Misses dinner prep)</span>
                  </td>
                  <td className="py-4 px-4 text-champagne font-semibold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>11:00 PM Post-Service</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-emerald-300/80">Zero food waste; order based on real daily counts</td>
                </tr>

                <tr className="hover:bg-emerald-950/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-cream font-mono">Pricing Transparency</td>
                  <td className="py-4 px-4 text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Volatile daily market price spikes</span>
                  </td>
                  <td className="py-4 px-4 text-champagne font-semibold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Locked Weekly/Monthly Contracts</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-emerald-300/80">Protects restaurant and catering gross profit margins</td>
                </tr>

                <tr className="hover:bg-emerald-950/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-cream font-mono">Delivery Window</td>
                  <td className="py-4 px-4 text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Vague 08:00 AM – 02:00 PM slot</span>
                  </td>
                  <td className="py-4 px-4 text-champagne font-semibold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Guaranteed 06:00 AM Drop SLA</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-emerald-300/80">Produce in walk-in before breakfast &amp; prep shift arrives</td>
                </tr>

                <tr className="hover:bg-emerald-950/30 transition-colors">
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
                  <td className="py-4 px-4 text-emerald-300/80">Chefs spend time on cooking, not procurement admin</td>
                </tr>

                <tr className="hover:bg-emerald-950/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-cream font-mono">Damaged / Rejected Crate</td>
                  <td className="py-4 px-4 text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Days chasing driver credit slips</span>
                  </td>
                  <td className="py-4 px-4 text-champagne font-semibold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>60-Second Photo Credit Note</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-emerald-300/80">Immediate balance adjustment on your monthly invoice</td>
                </tr>

                <tr className="hover:bg-emerald-950/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-cream font-mono">Delivery Surcharges</td>
                  <td className="py-4 px-4 text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Split-drop fees &amp; fuel levies</span>
                  </td>
                  <td className="py-4 px-4 text-champagne font-semibold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Zero Surcharges Ever</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-emerald-300/80">Completely transparent net pricing with no surprises</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── ACT III: THE 5 OPERATIONAL PILLARS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>5 Core Pillars</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream uppercase">
            Built for the Pressures of Real Kitchens
          </h2>
          <p className="text-xs sm:text-sm text-cream/70">
            Every feature on our platform was engineered directly around kitchen workflow realities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-8 rounded-2xl space-y-4 hover:border-champagne/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-xl">
              01
            </div>
            <h3 className="font-display text-xl font-bold text-cream">No Volatile "Market Price" Surprises</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              Legacy wholesalers fluctuate daily prices without warning, destroying kitchen GP targets. With Rootwills, your trade account is locked to fixed weekly or monthly contract rates, giving your finance team complete cost certainty.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-4 hover:border-champagne/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-xl">
              02
            </div>
            <h3 className="font-display text-xl font-bold text-cream">Late 11:00 PM Chef Order Cut-Off</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              Most broadliners cut off orders at 5:00 PM before dinner service even begins. Our modern automated picking system lets you submit your daily orders via web portal right after the last ticket leaves the pass at 11:00 PM.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-4 hover:border-champagne/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-xl">
              03
            </div>
            <h3 className="font-display text-xl font-bold text-cream">45-Second "Repeat Last Order" Flow</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              No more scribbling lists on clipboard paper or leaving 15-minute midnight voicemails. Pull up yesterday's order on your smartphone, adjust crate quantities, and confirm in under 45 seconds with instant WhatsApp and email confirmation.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-4 hover:border-champagne/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-xl">
              04
            </div>
            <h3 className="font-display text-xl font-bold text-cream">Zero Split-Drop or Environmental Fees</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              We never charge hidden congestion levies, fuel surcharges, or split-delivery administrative penalties. The price you see in your portal contract is the exact net figure on your weekly consolidated VAT invoice.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-4 hover:border-champagne/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-xl">
              05
            </div>
            <h3 className="font-display text-xl font-bold text-cream">60-Second Photo Credit Guarantee</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              If an avocado isn't perfectly ripe or a berry crate arrived bruised, snap a photo in the customer portal. Our dispatch team issues an instant digital credit note within 60 seconds — zero arguing with drivers or paper slips.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-4 hover:border-champagne/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-xl">
              06
            </div>
            <h3 className="font-display text-xl font-bold text-cream">Dual-Temp Telemetry Compliance</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              Every delivery vehicle is equipped with dual-zone live sensors recording temperature every 30 seconds. Your HACCP and EHO compliance audit logs are automatically saved in your portal for effortless inspection verification.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ACT IV: VERIFIED CHEF TESTIMONIALS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-emerald-950/30 border border-champagne/30 space-y-8">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-champagne font-bold">
              Trusted by 350+ Commercial Kitchens
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream uppercase">
              What Head Chefs Say About Partnering With Rootwills
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-sans">
            <div className="p-6 rounded-2xl bg-obsidian-950/70 border border-emerald-800/40 space-y-4">
              <p className="text-cream/80 italic leading-relaxed text-sm">
                "The 11:00 PM cut-off was a complete game changer for our kitchen brigade. With our previous supplier, we had to guess our produce requirements before dinner service even began. Now we count our walk-in at 10:30 PM, place the order on our phone, and the crates are sitting inside at 06:15 AM."
              </p>
              <div className="border-t border-emerald-900/60 pt-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-cream">Chef Anthony Cole</div>
                  <div className="text-cream/60">Executive Head Chef, Birmingham Botanical Bistro</div>
                </div>
                <div className="text-champagne font-mono font-bold">Birmingham, B15</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-950/70 border border-emerald-800/40 space-y-4">
              <p className="text-cream/80 italic leading-relaxed text-sm">
                "Locked monthly contract pricing has stabilized our food margins completely. No more arguing with account managers over unexplained invoice surcharges or sudden weekly price spikes on butter and cream. Rootwills is the most professional supplier we've used in 15 years."
              </p>
              <div className="border-t border-emerald-900/60 pt-3 flex items-center justify-between">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-gold p-8 sm:p-14 rounded-3xl text-center space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/20 border border-champagne/40 text-champagne text-xs font-mono uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Upgrade Your Kitchen Supply Chain?</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream uppercase max-w-2xl mx-auto">
            Open Your Commercial Account in <span className="gold-gradient-text">Under 3 Minutes</span>
          </h2>

          <p className="text-xs sm:text-sm text-cream/75 max-w-xl mx-auto font-sans leading-relaxed">
            Instant B2B credit approval up to £50,000, 30-day settlement terms, and locked contract rates for restaurants, hotels, and caterers across the UK.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/apply"
              className="px-8 py-4 rounded-xl font-bold text-obsidian-950 bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim shadow-gold-glow hover:brightness-110 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Apply for Trade Facility</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-4 rounded-xl font-semibold text-cream/90 border border-champagne/40 bg-emerald-950/60 hover:bg-champagne/10 hover:text-champagne text-xs font-mono uppercase tracking-wider transition-all"
            >
              <span>Call Commercial Desk: 0121 790 8800</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
