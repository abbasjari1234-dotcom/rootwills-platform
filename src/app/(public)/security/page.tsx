import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, ThermometerSnowflake, CheckCircle2, FileCheck, Truck, Lock } from 'lucide-react';

export const metadata = {
  title: 'Food Safety, SALSA & HACCP Compliance | Rootwills Ltd',
  description: 'Rootwills Ltd food safety management system, SALSA accreditation, HACCP protocols, dual-temperature cold chain, and batch traceability standards.',
};

export default function FoodSafetySecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase">
          <Award className="w-3.5 h-3.5 text-champagne" />
          <span>SALSA Certified & HACCP Level 3 Audited</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-cream">
          Food Safety, HACCP & Security Compliance
        </h1>
        <p className="text-sm sm:text-base text-cream/70 max-w-2xl mx-auto">
          Rigorous quality assurance, unbroken cold-chain micro-climates, farm-to-fork batch traceability, and enterprise digital security.
        </p>
      </div>

      {/* Content Container */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-950/80 space-y-8 text-cream/80 text-sm leading-relaxed">
        
        {/* Section 1: Quality Certifications */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            1. Accreditations & Regulatory Standards
          </h2>
          <p>
            Rootwills operates under stringent UK Food Standards Agency (FSA) guidelines and holds leading industry accreditations ensuring that commercial kitchens receive safe, wholesome, and ethically sourced produce.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/50 space-y-1 text-center">
              <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                <FileCheck className="w-4 h-4" />
              </div>
              <div className="font-bold text-cream text-xs">SALSA Accredited</div>
              <div className="text-[11px] text-cream/60">Safe and Local Supplier Approval standard for UK foodservice.</div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/50 space-y-1 text-center">
              <div className="w-8 h-8 mx-auto rounded-lg bg-champagne/20 text-champagne flex items-center justify-center mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="font-bold text-cream text-xs">HACCP Level 3</div>
              <div className="text-[11px] text-cream/60">Hazard Analysis Critical Control Point system across all depot workflows.</div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/50 space-y-1 text-center">
              <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                <Award className="w-4 h-4" />
              </div>
              <div className="font-bold text-cream text-xs">FSA 5-Star Rating</div>
              <div className="text-[11px] text-cream/60">Top hygiene rating issued by Birmingham City Council Food Safety inspectors.</div>
            </div>
          </div>
        </section>

        {/* Section 2: Cold-Chain Architecture */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            2. Continuous +2.0°C to +4.0°C Cold Chain
          </h2>
          <p>
            Thermal breaks are the primary cause of cell degradation and shortened shelf life in culinary produce. Rootwills maintains an unbroken, temperature-locked micro-climate from farm intake through final kitchen handover.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-cream/75">
            <li><strong>Intake Temperature Screening:</strong> Every inbound grower delivery is probed with calibrated infrared digital thermometers. Inbound loads exceeding threshold limits are immediately rejected.</li>
            <li><strong>Dual-Temperature Refrigerated Fleet:</strong> Mercedes-Benz Sprinter delivery vans are partitioned with dual-temperature zones (+2°C chilled produce, +8°C sensitive herbs/orchard fruit).</li>
            <li><strong>Real-Time Telematics & Digital Logs:</strong> On-board GPS sensors continuously log cargo temperatures every 60 seconds. Delivery receipts include time-stamped temperature readings.</li>
          </ul>
        </section>

        {/* Section 3: Traceability */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            3. Farm-to-Fork Batch Traceability
          </h2>
          <p>
            Every crate dispatched from our Digbeth Central Hub carries a unique barcode identifier linking directly to:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-obsidian-900 border border-emerald-900/60 font-mono text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Grower estate & field harvest batch number</span>
            </div>
            <div className="p-3 rounded-xl bg-obsidian-900 border border-emerald-900/60 font-mono text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Depot QA intake timestamp and inspector ID</span>
            </div>
            <div className="p-3 rounded-xl bg-obsidian-900 border border-emerald-900/60 font-mono text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Allergen segregation zone verification</span>
            </div>
            <div className="p-3 rounded-xl bg-obsidian-900 border border-emerald-900/60 font-mono text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Driver route and handover timestamp</span>
            </div>
          </div>
          <p className="pt-2 text-xs text-cream/70">
            In the event of a quality recall, our digital inventory system can isolate, trace, and notify affected venues in under <strong>15 minutes</strong>.
          </p>
        </section>

        {/* Section 4: Allergen & Hygiene Protocols */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            4. Allergen Segregation & Warehouse Hygiene
          </h2>
          <p>
            Our depot follows strict physical segregation protocols to eliminate cross-contamination risks:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-cream/75">
            <li><strong>Dedicated Dairy & Egg Vaults:</strong> Dairy and eggs are stored in isolated chilled chambers physically separated from raw vegetables and living microgreens.</li>
            <li><strong>Sanitised Crates:</strong> Returnable plastic crates (RPCs) undergo high-pressure 85°C thermal washing and food-grade sanitisation after each delivery cycle.</li>
            <li><strong>Staff Hygiene & Training:</strong> All warehouse operatives and delivery drivers hold valid Level 2 or Level 3 Food Hygiene certifications.</li>
          </ul>
        </section>

        {/* Section 5: Digital Platform Security */}
        <section className="space-y-3 pt-4 border-t border-emerald-950">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            5. Digital Platform & Financial Data Security
          </h2>
          <p>
            In addition to physical food safety, your commercial transactions and trade accounts are protected by enterprise cloud security:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50">
              <div className="font-bold text-cream text-xs mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Row-Level Security (RLS)
              </div>
              <div className="text-[11px] text-cream/70">Multi-tenant database isolation ensures your order history, contract rates, and invoices are accessible solely by your authorised staff.</div>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50">
              <div className="font-bold text-cream text-xs mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-champagne" />
                PCI-DSS Level 1 Payments
              </div>
              <div className="text-[11px] text-cream/70">Encrypted tokenisation via Stripe & GoCardless with cryptographic HMAC-SHA256 webhook validation.</div>
            </div>
          </div>
        </section>

        {/* Section 6: Quality Assurance Contact */}
        <section className="space-y-3 pt-4 border-t border-emerald-950">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            6. Quality Assurance & Audit Desk
          </h2>
          <p>
            For SALSA audit certificates, supplier questionnaires, technical specifications, or batch traceability reports, contact our Technical Director:
          </p>
          <div className="p-4 rounded-2xl bg-obsidian-900 border border-emerald-900/60 font-mono text-xs space-y-1">
            <div className="text-cream font-bold">Rootwills Ltd — Technical & Food Safety Desk</div>
            <div>Technical Inquiries: <span className="text-champagne">qa@rootwills.co.uk</span></div>
            <div>Direct Line: <span className="text-champagne">+44 121 790 8800</span></div>
            <div>Address: Digbeth Wholesale Food Hub, Birmingham, B5 6DY</div>
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-between items-center text-xs font-mono text-cream/60">
        <Link href="/terms" className="hover:text-champagne transition-colors">
          &larr; Wholesale Supply Terms
        </Link>
        <Link href="/onboarding" className="text-champagne hover:underline">
          Open a Trade Account &rarr;
        </Link>
      </div>
    </div>
  );
}
