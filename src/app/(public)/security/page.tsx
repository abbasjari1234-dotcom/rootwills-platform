import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  FileCheck, 
  Lock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

export const metadata: Metadata = {
  title: 'Food Safety Standards, SALSA & HACCP Compliance | Rootwills',
  description:
    'Learn about our SALSA-certified food safety protocols, HACCP Level 3 compliance, continuous +2°C to +4°C cold-chain telemetry, and enterprise data security.',
};

export default function FoodSafetySecurityPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 pb-20 space-y-12 sm:space-y-16">
      {/* Hero Header */}
      <section className="bg-[#2E060D] text-white relative overflow-hidden border-b border-[#BA8E4E]/25 pt-16 sm:pt-24 pb-16 lg:pb-20">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-25 mix-blend-overlay"
          style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#380710] via-[#2E060D] to-[#1E0307] pointer-events-none z-0" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BA8E4E]/15 border border-[#BA8E4E]/40 text-[#D4A86A] text-xs font-serif uppercase tracking-[0.2em] font-semibold">
            <Award className="w-3.5 h-3.5 text-[#D4A86A]" />
            <span>SALSA Certified &bull; HACCP Level 3 Audited</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            Food Safety, HACCP &amp; <br className="hidden sm:inline" />
            <span className="text-[#D4A86A]">Digital Compliance</span>
          </h1>

          <p className="text-xs sm:text-base text-[#EDE4D8]/85 max-w-2xl mx-auto font-sans leading-relaxed">
            Rigorous quality inspection, unbroken +2°C to +4°C cold-chain telematics, farm-to-fork batch traceability, and enterprise-grade trade data protection.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:qa@rootwills.co.uk?subject=Technical%20Audit%20Pack%20Request"
              className="group inline-flex items-center justify-center gap-3 pl-7 pr-2.5 py-2.5 rounded-full bg-[#D4A86A] hover:bg-[#C59958] text-[#2D060D] text-xs sm:text-[13px] font-serif font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-xl active:scale-[0.98]"
            >
              <span>Request Full SALSA Audit Pack</span>
              <div className="w-7 h-7 rounded-full bg-[#2D060D]/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5 text-[#2D060D]" />
              </div>
            </a>
            <Link
              href="/delivery"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#1A0307]/80 hover:bg-[#2A050D] border border-[#BA8E4E]/40 text-[#EDE4D8] text-xs sm:text-[13px] font-serif font-semibold tracking-wider transition-all"
            >
              <span>View Cold-Chain Standards</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Core Accreditations Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFDF9] rounded-3xl p-8 border border-[#E8DEC8] shadow-sm space-y-3 hover:border-[#BA8E4E] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#2E060D] border border-[#BA8E4E]/30 flex items-center justify-center text-[#D4A86A] mb-4">
              <FileCheck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="text-xl font-serif font-bold text-[#2E060D]">SALSA Accredited</div>
            <div className="text-xs font-serif uppercase text-[#BA8E4E] tracking-wider font-semibold">UK Foodservice Standard</div>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Safe and Local Supplier Approval standard audited annually to ensure premier hygiene, management control, and supplier verification across all operations.
            </p>
          </div>

          <div className="bg-[#FFFDF9] rounded-3xl p-8 border border-[#E8DEC8] shadow-sm space-y-3 hover:border-[#BA8E4E] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#2E060D] border border-[#BA8E4E]/30 flex items-center justify-center text-[#D4A86A] mb-4">
              <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="text-xl font-serif font-bold text-[#2E060D]">HACCP Level 3</div>
            <div className="text-xs font-serif uppercase text-[#BA8E4E] tracking-wider font-semibold">Critical Control Points</div>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Hazard Analysis Critical Control Point system operating across all intake, calibrated temperature monitoring, picking, and fleet handover stages.
            </p>
          </div>

          <div className="bg-[#FFFDF9] rounded-3xl p-8 border border-[#E8DEC8] shadow-sm space-y-3 hover:border-[#BA8E4E] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#2E060D] border border-[#BA8E4E]/30 flex items-center justify-center text-[#D4A86A] mb-4">
              <Award className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="text-xl font-serif font-bold text-[#2E060D]">FSA 5-Star Rating</div>
            <div className="text-xs font-serif uppercase text-[#BA8E4E] tracking-wider font-semibold">Top Hygiene Grade</div>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Top commercial food hygiene rating issued by local authority Food Safety Inspectors for our central distribution hubs.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Compliance Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 border border-[#E8DEC8] shadow-sm space-y-12 text-stone-700 text-xs sm:text-sm leading-relaxed">
          {/* Section 1: Cold-Chain Architecture */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2E060D] border border-[#BA8E4E]/30 flex items-center justify-center text-[#D4A86A] font-serif font-bold text-xs">
                01
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2E060D]">
                Continuous +2.0°C to +4.0°C Cold Chain Architecture
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed font-sans">
              Thermal breaks are the single greatest cause of produce cellular breakdown and shortened service shelf life. Rootwills guarantees an unbroken, temperature-locked micro-climate from field intake through kitchen handover.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-2">
                <div className="font-serif text-xs text-[#2E060D] font-bold uppercase tracking-wider">Intake Screening</div>
                <div className="text-xs text-stone-600 font-sans">Inbound loads are probed with calibrated infrared digital thermometers. Out-of-spec loads are immediately quarantined.</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-2">
                <div className="font-serif text-xs text-[#2E060D] font-bold uppercase tracking-wider">Dual-Temp Fleet</div>
                <div className="text-xs text-stone-600 font-sans">Mercedes-Benz delivery vans partitioned with +2°C chilled and +8°C herb/orchard temperature chambers.</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-2">
                <div className="font-serif text-xs text-[#2E060D] font-bold uppercase tracking-wider">60-Sec Telematics</div>
                <div className="text-xs text-stone-600 font-sans">GPS telemetry transmitters continuously log hold temperatures every 60s, automatically printed on your digital delivery receipts.</div>
              </div>
            </div>
          </section>

          {/* Section 2: Traceability */}
          <section className="space-y-4 pt-8 border-t border-[#E8DEC8]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2E060D] border border-[#BA8E4E]/30 flex items-center justify-center text-[#D4A86A] font-serif font-bold text-xs">
                02
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2E060D]">
                Farm-to-Fork Batch Traceability
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed font-sans">
              Every single crate dispatched from our regional hubs carries a unique barcode identifier linking directly into our digital supply ledger:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-xs font-sans text-stone-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#BA8E4E] shrink-0" />
                <span>Grower estate &amp; field harvest batch lot number</span>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-xs font-sans text-stone-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#BA8E4E] shrink-0" />
                <span>Depot QA intake timestamp &amp; inspector credentials</span>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-xs font-sans text-stone-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#BA8E4E] shrink-0" />
                <span>Allergen segregation zone verification</span>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-xs font-sans text-stone-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#BA8E4E] shrink-0" />
                <span>Driver van manifest &amp; digital kitchen handover timestamp</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#BA8E4E]/30 text-xs font-medium text-[#2E060D] flex items-center gap-2 font-serif">
              <Sparkles className="w-4 h-4 text-[#BA8E4E] shrink-0" />
              <span>Rapid Recall Guarantee: In the event of an issue, our digital inventory ledger can trace, isolate, and notify all affected kitchens in under 15 minutes.</span>
            </div>
          </section>

          {/* Section 3: Allergen & Hygiene */}
          <section className="space-y-4 pt-8 border-t border-[#E8DEC8]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2E060D] border border-[#BA8E4E]/30 flex items-center justify-center text-[#D4A86A] font-serif font-bold text-xs">
                03
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2E060D]">
                Allergen Segregation &amp; Depot Hygiene
              </h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <li className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-1.5 text-xs">
                <div className="font-serif font-bold text-[#2E060D] uppercase tracking-wider">Dedicated Vaults</div>
                <div className="text-stone-600 font-sans leading-relaxed">Dairy, cheeses, and eggs are stored in isolated chilled chambers physically segregated from raw produce and microgreens.</div>
              </li>
              <li className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-1.5 text-xs">
                <div className="font-serif font-bold text-[#8C6629] uppercase tracking-wider">85°C Thermal Washing</div>
                <div className="text-stone-600 font-sans leading-relaxed">Returnable crates undergo high-pressure 85°C thermal washing and food-grade sanitisation after each delivery run.</div>
              </li>
              <li className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-1.5 text-xs">
                <div className="font-serif font-bold text-[#2E060D] uppercase tracking-wider">Certified Personnel</div>
                <div className="text-stone-600 font-sans leading-relaxed">All depot logistics operatives and drivers hold valid Level 2 or Level 3 Food Hygiene certifications.</div>
              </li>
            </ul>
          </section>

          {/* Section 4: Enterprise Digital Security */}
          <section className="space-y-4 pt-8 border-t border-[#E8DEC8]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2E060D] border border-[#BA8E4E]/30 flex items-center justify-center text-[#D4A86A] font-serif font-bold text-xs">
                04
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2E060D]">
                Digital Platform &amp; Financial Security
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed font-sans">
              Your trade accounts, custom contracted price matrices, and commercial orders are protected by enterprise cloud security architecture:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-2">
                <div className="font-serif text-xs text-[#2E060D] font-bold uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#BA8E4E]" />
                  Row-Level Security (RLS) Multi-Tenancy
                </div>
                <div className="text-xs text-stone-600 font-sans leading-relaxed">
                  Database isolation ensures your proprietary pricing tiers, invoice schedules, and purchase volumes are strictly restricted to your authorized organisation members.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-2">
                <div className="font-serif text-xs text-[#2E060D] font-bold uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#BA8E4E]" />
                  PCI-DSS Level 1 Encrypted Payments
                </div>
                <div className="text-xs text-stone-600 font-sans leading-relaxed">
                  Tokenised card processing via Stripe and automated Direct Debit via GoCardless with HMAC-SHA256 cryptographic webhook verification.
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Technical Audit & QA Contact Desk */}
          <section className="pt-8 border-t border-[#E8DEC8]">
            <div className="rounded-3xl p-8 bg-gradient-to-br from-[#2E060D] via-[#240409] to-[#1A0307] border border-[#BA8E4E]/35 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2">
                <div className="text-xs font-serif uppercase tracking-[0.25em] text-[#D4A86A] font-semibold">
                  — TECHNICAL COMPLIANCE DESK —
                </div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Request Complete SALSA Audit Pack &amp; Questionnaires
                </div>
                <p className="text-xs sm:text-sm text-[#EDE4D8]/85 max-w-lg font-sans">
                  Need supplier compliance questionnaires, BRCGS certifications, or technical specifications for your group procurement audit?
                </p>
              </div>

              <a
                href="mailto:qa@rootwills.co.uk?subject=Technical%20Audit%20Pack%20Request"
                className="group inline-flex items-center justify-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-[#D4A86A] hover:bg-[#C59958] text-[#2D060D] text-xs sm:text-[13px] font-serif font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-xl active:scale-[0.98] shrink-0"
              >
                <span>Request Audit Pack</span>
                <div className="w-7 h-7 rounded-full bg-[#2D060D]/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-[#2D060D]" />
                </div>
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
