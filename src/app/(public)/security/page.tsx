import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
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
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

export const metadata: Metadata = {
  title: 'Food Safety Standards, SALSA & HACCP Compliance | Rootwills',
  description:
    'Learn about our SALSA-certified food safety protocols, HACCP Level 3 compliance, continuous +2°C to +4°C cold-chain telemetry, and enterprise data security.',
};

export default function FoodSafetySecurityPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 space-y-16 sm:space-y-24">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white relative overflow-hidden border-b border-slate-800 pt-16 sm:pt-24 pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>SALSA Certified &bull; HACCP Level 3 Audited</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Food Safety, HACCP &amp; Digital Compliance
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Rigorous quality inspection, unbroken +2°C to +4°C cold-chain telematics, farm-to-fork batch traceability, and enterprise-grade trade data protection.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:qa@rootwills.co.uk?subject=Technical%20Audit%20Pack%20Request"
              className="px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <span>Request Full SALSA Audit Pack</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/delivery"
              className="px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>View Cold-Chain Standards</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Core Accreditations Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <div className="text-xl font-bold text-slate-900">SALSA Accredited</div>
            <div className="text-xs font-mono uppercase text-emerald-700 tracking-wider font-bold">UK Foodservice Standard</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Safe and Local Supplier Approval standard audited annually to ensure premier hygiene, management control, and supplier verification across all operations.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xl font-bold text-slate-900">HACCP Level 3</div>
            <div className="text-xs font-mono uppercase text-emerald-700 tracking-wider font-bold">Critical Control Points</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Hazard Analysis Critical Control Point system operating across all intake, calibrated temperature monitoring, picking, and fleet handover stages.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-xl font-bold text-slate-900">FSA 5-Star Rating</div>
            <div className="text-xs font-mono uppercase text-emerald-700 tracking-wider font-bold">Top Hygiene Grade</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Top commercial food hygiene rating issued by Birmingham City Council Food Safety Inspectors for our central Digbeth distribution hub.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Compliance Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-12 text-slate-700 text-sm leading-relaxed">
          {/* Section 1: Cold-Chain Architecture */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-mono font-bold text-xs">
                01
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Continuous +2.0°C to +4.0°C Cold Chain Architecture
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Thermal breaks are the single greatest cause of produce cellular breakdown and shortened service shelf life. Rootwills guarantees an unbroken, temperature-locked micro-climate from field intake through kitchen handover.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-mono text-xs text-emerald-800 font-bold uppercase">Intake Screening</div>
                <div className="text-xs text-slate-600">Inbound loads are probed with calibrated infrared digital thermometers. Out-of-spec loads are immediately quarantined.</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-mono text-xs text-emerald-800 font-bold uppercase">Dual-Temp Fleet</div>
                <div className="text-xs text-slate-600">Mercedes-Benz Sprinter delivery vans partitioned with +2°C chilled and +8°C herb/orchard temperature chambers.</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-mono text-xs text-emerald-800 font-bold uppercase">60-Sec Telematics</div>
                <div className="text-xs text-slate-600">GPS telemetry transmitters continuously log hold temperatures every 60s, automatically printed on your digital delivery receipts.</div>
              </div>
            </div>
          </section>

          {/* Section 2: Traceability */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-mono font-bold text-xs">
                02
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Farm-to-Fork Batch Traceability
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Every single crate dispatched from our Digbeth Central Hub carries a unique barcode identifier linking directly into our digital supply ledger:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Grower estate &amp; field harvest batch lot number</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Depot QA intake timestamp &amp; inspector credentials</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Allergen segregation zone verification</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Driver van manifest &amp; digital kitchen handover timestamp</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Rapid Recall Guarantee: In the event of an issue, our digital inventory ledger can trace, isolate, and notify all affected kitchens in under 15 minutes.</span>
            </div>
          </section>

          {/* Section 3: Allergen & Hygiene */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-mono font-bold text-xs">
                03
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Allergen Segregation &amp; Depot Hygiene
              </h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <li className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <div className="font-bold text-slate-900 font-mono uppercase">Dedicated Vaults</div>
                <div className="text-slate-600 leading-relaxed">Dairy, cheeses, and eggs are stored in isolated chilled chambers physically segregated from raw produce and microgreens.</div>
              </li>
              <li className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <div className="font-bold text-emerald-800 font-mono uppercase">85°C Thermal Washing</div>
                <div className="text-slate-600 leading-relaxed">Returnable crates undergo high-pressure 85°C thermal washing and food-grade sanitisation after each delivery run.</div>
              </li>
              <li className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <div className="font-bold text-slate-900 font-mono uppercase">Certified Personnel</div>
                <div className="text-slate-600 leading-relaxed">All depot logistics operatives and drivers hold valid Level 2 or Level 3 Food Hygiene certifications.</div>
              </li>
            </ul>
          </section>

          {/* Section 4: Enterprise Digital Security */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-mono font-bold text-xs">
                04
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Digital Platform &amp; Financial Security
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Your trade accounts, custom contracted price matrices, and commercial orders are protected by enterprise cloud security architecture:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-mono text-xs text-slate-900 font-bold uppercase flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  Row-Level Security (RLS) Multi-Tenancy
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Database isolation ensures your proprietary pricing tiers, invoice schedules, and purchase volumes are strictly restricted to your authorized organisation members.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-mono text-xs text-slate-900 font-bold uppercase flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  PCI-DSS Level 1 Encrypted Payments
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Tokenised card processing via Stripe and automated Direct Debit via GoCardless with HMAC-SHA256 cryptographic webhook verification.
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Technical Audit & QA Contact Desk */}
          <section className="pt-8 border-t border-slate-200">
            <div className="rounded-3xl p-8 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Technical Compliance Desk
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  Request Complete SALSA Audit Pack &amp; Questionnaires
                </div>
                <p className="text-sm text-slate-300 max-w-lg">
                  Need supplier compliance questionnaires, BRCGS certifications, or technical specifications for your group procurement audit?
                </p>
              </div>

              <a
                href="mailto:qa@rootwills.co.uk?subject=Technical%20Audit%20Pack%20Request"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 shadow-md"
              >
                <span>Request Audit Pack</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>
        </div>
      </section>

      {/* Commercial Bottom CTA */}
      <CommercialBottomCTA />
    </div>
  );
}
