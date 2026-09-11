import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  ThermometerSnowflake, 
  CheckCircle2, 
  FileCheck, 
  Truck, 
  Lock, 
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  Building2,
  FileSpreadsheet
} from 'lucide-react';

export const metadata = {
  title: 'Food Safety Standards, SALSA & HACCP Compliance | Rootwills',
  description:
    'Learn about our SALSA-certified food safety protocols, HACCP Level 3 compliance, continuous +2°C to +4°C cold-chain telemetry, and enterprise data security.',
};

export default function FoodSafetySecurityPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-cream pb-24 relative overflow-hidden">
      {/* Ambient Lighting & Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-champagne/15 via-emerald-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-champagne/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid-texture opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 space-y-12 sm:space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-champagne/30 text-champagne text-[11px] font-mono uppercase tracking-[0.28em] font-semibold shadow-[0_0_25px_rgba(228,199,103,0.18)]">
            <Award className="w-3.5 h-3.5 text-champagne" />
            <span>SALSA Certified &bull; HACCP Level 3 Audited</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] text-cream">
            Food Safety, HACCP &amp;
            <br />
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F6E199] to-[#C59B27] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(228,199,103,0.3)]">
              Digital Compliance
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-cream/80 max-w-2xl mx-auto font-sans leading-relaxed">
            Rigorous quality inspection, unbroken +2°C to +4°C cold-chain telematics, farm-to-fork batch traceability, and enterprise digital data security.
          </p>
        </div>

        {/* 3 Core Accreditations Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="rounded-2xl p-6 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 shadow-xl relative overflow-hidden group hover:border-champagne transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-60 group-hover:opacity-100" />
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center mb-4 text-champagne">
              <FileCheck className="w-6 h-6" />
            </div>
            <div className="font-display text-xl font-bold text-cream mb-1">SALSA Accredited</div>
            <div className="text-xs font-mono uppercase text-champagne tracking-wider mb-2 font-semibold">UK Foodservice Standard</div>
            <p className="text-xs text-cream/75 leading-relaxed font-sans">
              Safe and Local Supplier Approval standard audited annually to ensure premier hygiene, management control, and supplier verification.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 shadow-xl relative overflow-hidden group hover:border-champagne transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-60 group-hover:opacity-100" />
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="font-display text-xl font-bold text-cream mb-1">HACCP Level 3</div>
            <div className="text-xs font-mono uppercase text-emerald-400 tracking-wider mb-2 font-semibold">Critical Control Points</div>
            <p className="text-xs text-cream/75 leading-relaxed font-sans">
              Hazard Analysis Critical Control Point system operating across all intake, temperature monitoring, picking, and fleet handover stages.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 shadow-xl relative overflow-hidden group hover:border-champagne transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-60 group-hover:opacity-100" />
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center mb-4 text-champagne">
              <Award className="w-6 h-6" />
            </div>
            <div className="font-display text-xl font-bold text-cream mb-1">FSA 5-Star Rating</div>
            <div className="text-xs font-mono uppercase text-champagne tracking-wider mb-2 font-semibold">Top Hygiene Grade</div>
            <p className="text-xs text-cream/75 leading-relaxed font-sans">
              Top commercial food hygiene rating issued by Birmingham City Council Food Safety Inspectors for our central Digbeth distribution hub.
            </p>
          </div>
        </div>

        {/* Detailed Compliance Sections in Obsidian Glass */}
        <div className="rounded-3xl p-6 sm:p-10 bg-obsidian-950/85 backdrop-blur-xl border border-champagne/25 shadow-2xl space-y-10 text-cream/85 text-sm leading-relaxed">
          
          {/* Section 1: Cold-Chain Architecture */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-xs">
                01
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-cream">
                Continuous +2.0°C to +4.0°C Cold Chain Architecture
              </h2>
            </div>
            <p className="text-cream/80 leading-relaxed font-sans">
              Thermal breaks are the single greatest cause of produce cellular degradation and shortened service shelf life. Rootwills guarantees an unbroken, temperature-locked micro-climate from field intake through kitchen handover.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-obsidian-900 border border-champagne/15 space-y-1.5">
                <div className="font-mono text-xs text-champagne font-bold uppercase">Intake Screening</div>
                <div className="text-xs text-cream/70 font-sans">Inbound loads are probed with calibrated infrared digital thermometers. Out-of-spec loads are immediately quarantined.</div>
              </div>
              <div className="p-4 rounded-xl bg-obsidian-900 border border-champagne/15 space-y-1.5">
                <div className="font-mono text-xs text-emerald-400 font-bold uppercase">Dual-Temp Fleet</div>
                <div className="text-xs text-cream/70 font-sans">Mercedes-Benz Sprinter delivery vans partitioned with +2°C chilled and +8°C herb/orchard temperature chambers.</div>
              </div>
              <div className="p-4 rounded-xl bg-obsidian-900 border border-champagne/15 space-y-1.5">
                <div className="font-mono text-xs text-champagne font-bold uppercase">60-Sec Telematics</div>
                <div className="text-xs text-cream/70 font-sans">GPS telemetry transmitters continuously log hold temperatures every 60s, automatically printed on your digital delivery receipts.</div>
              </div>
            </div>
          </section>

          {/* Section 2: Traceability */}
          <section className="space-y-4 pt-6 border-t border-champagne/15">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-xs">
                02
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-cream">
                Farm-to-Fork Batch Traceability
              </h2>
            </div>
            <p className="text-cream/80 leading-relaxed font-sans">
              Every single crate dispatched from our Digbeth Central Hub carries a unique barcode identifier linking directly into our digital supply ledger:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-champagne/15 font-mono text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Grower estate &amp; field harvest batch lot number</span>
              </div>
              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-champagne/15 font-mono text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Depot QA intake timestamp &amp; inspector credentials</span>
              </div>
              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-champagne/15 font-mono text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Allergen segregation zone verification</span>
              </div>
              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-champagne/15 font-mono text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Driver van manifest &amp; digital kitchen handover timestamp</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-champagne shrink-0" />
              <span>Rapid Recall Guarantee: In the event of a quality recall, our digital inventory system can trace, isolate, and notify all affected kitchens in under 15 minutes.</span>
            </div>
          </section>

          {/* Section 3: Allergen & Hygiene */}
          <section className="space-y-4 pt-6 border-t border-champagne/15">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-xs">
                03
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-cream">
                Allergen Segregation &amp; Depot Hygiene
              </h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <li className="p-4 rounded-xl bg-obsidian-900 border border-champagne/15 space-y-1 text-xs">
                <div className="font-bold text-champagne font-mono uppercase">Dedicated Vaults</div>
                <div className="text-cream/70 font-sans">Dairy, cheeses, and eggs are stored in isolated chilled chambers physically segregated from raw produce and microgreens.</div>
              </li>
              <li className="p-4 rounded-xl bg-obsidian-900 border border-champagne/15 space-y-1 text-xs">
                <div className="font-bold text-emerald-400 font-mono uppercase">85°C Thermal Washing</div>
                <div className="text-cream/70 font-sans">Returnable crates undergo high-pressure 85°C thermal washing and food-grade sanitisation after each delivery run.</div>
              </li>
              <li className="p-4 rounded-xl bg-obsidian-900 border border-champagne/15 space-y-1 text-xs">
                <div className="font-bold text-champagne font-mono uppercase">Certified Personnel</div>
                <div className="text-cream/70 font-sans">All depot logistics operatives and drivers hold valid Level 2 or Level 3 Food Hygiene certifications.</div>
              </li>
            </ul>
          </section>

          {/* Section 4: Enterprise Digital Security */}
          <section className="space-y-4 pt-6 border-t border-champagne/15">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-mono font-bold text-xs">
                04
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-cream">
                Digital Platform &amp; Financial Security
              </h2>
            </div>
            <p className="text-cream/80 leading-relaxed font-sans">
              Your trade accounts, custom contracted price matrices, and commercial orders are protected by enterprise cloud security architecture:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-obsidian-900 border border-champagne/15 space-y-1.5">
                <div className="font-mono text-xs text-champagne font-bold uppercase flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  Row-Level Security (RLS) Multi-Tenancy
                </div>
                <div className="text-xs text-cream/70 font-sans">
                  Database isolation ensures your proprietary pricing tiers, invoice schedules, and purchase volumes are strictly restricted to your authorized organisation members.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-900 border border-champagne/15 space-y-1.5">
                <div className="font-mono text-xs text-champagne font-bold uppercase flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-champagne" />
                  PCI-DSS Level 1 Encrypted Payments
                </div>
                <div className="text-xs text-cream/70 font-sans">
                  Tokenised card processing via Stripe and automated Direct Debit via GoCardless with HMAC-SHA256 cryptographic webhook verification.
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Technical Audit & QA Contact Desk */}
          <section className="pt-6 border-t border-champagne/15">
            <div className="rounded-2xl p-6 bg-gradient-to-br from-obsidian-900 to-obsidian-950 border border-champagne/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <div className="text-xs font-mono uppercase tracking-wider text-champagne font-bold">
                  Technical Compliance Desk
                </div>
                <div className="font-display text-lg sm:text-xl font-bold text-cream">
                  Request Complete SALSA Audit Pack &amp; Questionnaires
                </div>
                <p className="text-xs text-cream/70 max-w-lg font-sans">
                  Need supplier compliance questionnaires, BRCGS certifications, or technical specifications for your group procurement audit?
                </p>
              </div>

              <a
                href="mailto:qa@rootwills.co.uk?subject=Technical%20Audit%20Pack%20Request"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFF4D0] via-[#E4C767] to-[#C9A227] text-obsidian-950 font-sans font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-105 transition-all shrink-0 flex items-center gap-2"
              >
                <span>Request Audit Pack</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>

        </div>

        {/* Bottom Navigation Links */}
        <div className="flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-cream/70 pt-4">
          <Link href="/terms" className="hover:text-champagne transition-colors flex items-center gap-1">
            &larr; Wholesale Supply Terms
          </Link>
          <Link href="/apply" className="px-5 py-2.5 rounded-xl bg-obsidian-900 border border-champagne/30 text-champagne hover:text-white hover:border-champagne transition-colors font-bold uppercase tracking-wider">
            Open a Trade Account &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
