'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  Leaf, 
  Scale, 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  Check, 
  X, 
  Sparkles, 
  Lock,
  Building2,
  Calendar,
  ThermometerSnowflake,
  QrCode
} from 'lucide-react';

interface CredentialItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge: string;
  grade: string;
  certNumber: string;
  auditCycle: string;
  description: string;
  scope: string;
  highlights: string[];
}

const credentials: CredentialItem[] = [
  {
    id: 'brcgs',
    icon: ShieldCheck,
    title: 'BRCGS Global Standard',
    badge: 'Grade AA Certified',
    grade: 'Grade AA (Highest Pass)',
    certNumber: 'BRC-SD-89104',
    auditCycle: 'Unannounced Annual Audit',
    description:
      'The gold standard in global food safety for storage and distribution. Rigorous cold-chain hygiene, hazard control, and cross-contamination prevention.',
    scope: 'Digbeth Central Hub — Ambient, Chilled & Frozen Foodservice Logistics',
    highlights: [
      'Unannounced third-party audit pass with zero major non-conformances',
      'Dual-zone temperature telemetry with continuous cloud recording',
      'Full pest, hygiene, and allergen barrier protocols across all depots',
    ],
  },
  {
    id: 'salsa',
    icon: Award,
    title: 'SALSA Accreditation',
    badge: 'Safe & Local Approved',
    grade: 'Certified Foodservice Hub',
    certNumber: 'SAL-WM-2041',
    auditCycle: 'Audited Every 12 Months',
    description:
      'Safe and Local Supplier Approval developed for British food buyers. Ensures independent culinary integrity, local farm procurement, and full legal compliance.',
    scope: 'Single-Estate British Produce & Artisan Dairy Distribution',
    highlights: [
      'Direct grower contract vetting and fair price validation',
      'Traceable supply chain from Worcestershire & Kent harvest gates',
      'Complete recall drill verified under 30 minutes',
    ],
  },
  {
    id: 'red-tractor',
    icon: Leaf,
    title: 'Red Tractor Assured',
    badge: '100% British Farmed',
    grade: 'Assured Produce & Meat',
    certNumber: 'RT-UK-48910',
    auditCycle: 'Grower Assured Cycle',
    description:
      'Guarantees that produce, dairy, and farm goods originate from certified British farms adhering to rigorous animal welfare, environmental, and food safety standards.',
    scope: 'British Field Vegetables, Orchard Fruits & Farm-Direct Dairy',
    highlights: [
      '100% farm-gate origin verification with zero unauthorized mixing',
      'Strict pesticide residue management and water purity checks',
      'Sustainable British farming practices and soil stewardship',
    ],
  },
  {
    id: 'haccp',
    icon: Scale,
    title: 'HACCP System CL-3',
    badge: 'Critical Control Points',
    grade: 'Full Regulatory Pass',
    certNumber: 'HACCP-REV-2026',
    auditCycle: 'Daily Active Verification',
    description:
      'Hazard Analysis Critical Control Points systematically identifying biological, chemical, and physical food safety hazards across every dispatch stage.',
    scope: 'Intake Inspection, Coldroom Storage, Order Picking & Van Delivery',
    highlights: [
      'Temperature logged at 4 distinct CCP verification points',
      'Calibrated digital probes cross-verified before each morning run',
      'Automated stop-ship alerts if van chamber deviates > 4.0°C',
    ],
  },
  {
    id: 'natashas-law',
    icon: FileText,
    title: "Natasha’s Law (PPDS)",
    badge: '100% Allergen Transparency',
    grade: 'Digital Crate Manifests',
    certNumber: 'UK-FIC-1169-26',
    auditCycle: 'Live QR Traceability',
    description:
      'Comprehensive digital and physical allergen labeling on all prepacked foods. Instant QR-code ingredient transparency for every crate crossing the pass.',
    scope: 'All 14 Statutory UK Allergens with Zero-Ambiguity Labelling',
    highlights: [
      'Digital line-item allergen matrices printed on all delivery dockets',
      'QR code on every produce crate links directly to live batch specs',
      'Kitchen inwards inspection sign-off integrated into driver POD',
    ],
  },
  {
    id: 'iso-22000',
    icon: CheckCircle2,
    title: 'ISO 22000:2018',
    badge: 'FSMS Certified',
    grade: 'International Management',
    certNumber: 'ISO-FSMS-92810',
    auditCycle: 'Triennial UKAS Certified',
    description:
      'International Food Safety Management System uniting HACCP principles with ISO management standards for enterprise restaurant groups and luxury hotel chains.',
    scope: 'Multi-Site Logistics, Supplier Auditing & Customer Traceability',
    highlights: [
      'UKAS-accredited management system for end-to-end food defense',
      'Continuous improvement metrics and chef satisfaction monitoring',
      'Disaster recovery and backup cold-storage redundancy guaranteed',
    ],
  },
];

const TRUST_METRICS = [
  { value: '5 / 5 ★', label: 'UK Food Standards Agency', sub: 'Highest Food Hygiene Rating' },
  { value: 'Grade AA', label: 'BRCGS Storage & Distribution', sub: 'Global Food Safety Standard' },
  { value: '100%', label: 'Digital Allergen Traceability', sub: "Full Natasha's Law Compliance" },
  { value: '–22° to +4°C', label: 'Continuous Telemetry', sub: '24/7 Cold-Chain Probe Logs' },
];

export function ActTrustCredentials() {
  const [selectedCred, setSelectedCred] = useState<CredentialItem | null>(null);

  return (
    <section 
      id="act-trust" 
      className="act-trust relative w-full overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 lg:pb-36 bg-[#02140e] text-cream"
    >
      {/* ─── Layered Ambient Luxury Lighting & Security Watermark ─── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial champagne glow centered up top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(228,199,103,0.09)_0%,transparent_70%)] blur-[90px]" />
        
        {/* Deep emerald corner blooms */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(5,150,105,0.08)_0%,transparent_65%)] blur-[100px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(228,199,103,0.06)_0%,transparent_60%)] blur-[90px]" />

        {/* Security watermark guilloche lines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e4c767_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Seamless blend from Act IV */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#02140e] to-transparent pointer-events-none z-[5]" />

      <div className="act-trust-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12 sm:space-y-16">
        
        {/* ─── Executive Header ─── */}
        <div className="act-trust-header text-center max-w-4xl mx-auto space-y-5">
          {/* Official Accreditation Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-950/90 via-obsidian-900/90 to-emerald-950/90 border border-champagne/30 text-champagne text-[11px] font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(228,199,103,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
            <span>UK Food Standards Agency &bull; 5/5 Highest Hygiene Rating</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-cream uppercase tracking-tight leading-[1.05]">
            Trusted by the UK’s Finest
            <br />
            <span className="gold-gradient-text">Michelin &amp; Luxury Kitchens</span>
          </h2>

          <p className="text-cream/70 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            Every crate authenticated. Every temperature logged. Zero compromises on food safety, allergen transparency, or provenance integrity.
          </p>

          {/* ─── Executive 4-Metric Trust Strip ─── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 text-left">
            {TRUST_METRICS.map((m, idx) => (
              <div 
                key={idx}
                className="p-3.5 sm:p-4 rounded-2xl bg-obsidian-900/70 border border-champagne/20 backdrop-blur-md hover:border-champagne/40 transition-colors shadow-lg"
              >
                <div className="font-display text-xl sm:text-2xl font-black text-champagne gold-gradient-text">
                  {m.value}
                </div>
                <div className="text-xs font-bold text-cream mt-0.5">{m.label}</div>
                <div className="text-[10px] text-cream/50 font-mono mt-0.5">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Credential Cards Grid (3x2) ─── */}
        <div className="act-trust-badges grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {credentials.map((cred, i) => {
            const Icon = cred.icon;
            return (
              <div
                key={cred.id}
                onClick={() => setSelectedCred(cred)}
                className={`act-trust-badge-${i} group relative rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-obsidian-900/90 via-obsidian-950/95 to-[#032015]/80 border border-champagne/25 hover:border-champagne/70 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_35px_rgba(228,199,103,0.18)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Subtle Card Ambient Glow on Hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-champagne/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Top Bar: Icon + Live Verified Pill */}
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br from-champagne/20 via-obsidian-900 to-emerald-950/60 border border-champagne/30 flex items-center justify-center text-champagne group-hover:scale-105 group-hover:border-champagne/60 group-hover:shadow-[0_0_20px_rgba(228,199,103,0.2)] transition-all">
                      <Icon className="w-6 h-6 text-champagne" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-semibold">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>{cred.badge}</span>
                    </div>
                  </div>

                  {/* Title & Standard Grade */}
                  <div>
                    <h3 className="text-xl font-display font-black text-cream group-hover:text-champagne transition-colors">
                      {cred.title}
                    </h3>
                    <div className="text-xs font-mono font-bold text-champagne/90 tracking-wide mt-1 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-champagne" />
                      <span>{cred.grade}</span>
                    </div>
                  </div>

                  {/* Editorial Description */}
                  <p className="text-xs text-cream/70 font-sans leading-relaxed">
                    {cred.description}
                  </p>

                  {/* Highlights Bullet points */}
                  <div className="space-y-1.5 pt-1">
                    {cred.highlights.slice(0, 2).map((hl, hIdx) => (
                      <div key={hIdx} className="text-[11px] text-cream/60 flex items-start gap-1.5 font-sans">
                        <span className="text-champagne mt-0.5 font-bold">&bull;</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Certificate ID & Inspection Trigger */}
                <div className="pt-5 mt-5 border-t border-champagne/15 flex items-center justify-between text-[11px] font-mono text-cream/50 relative z-10">
                  <span className="truncate pr-2">Ref: <strong className="text-cream/80">{cred.certNumber}</strong></span>
                  <span className="text-champagne font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0">
                    <span>Inspect Scope</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Executive Due Diligence Callout Strip ─── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-obsidian-900/95 via-obsidian-950 to-[#032317]/90 border border-champagne/30 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-champagne uppercase font-bold tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-champagne" />
              <span>Commercial Procurement &amp; Group Technical Due Diligence</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-cream">
              Need our Complete Technical Audit Dossier?
            </h3>
            <p className="text-xs sm:text-sm text-cream/70 max-w-xl">
              We provide executive chef teams, hotel F&amp;B directors, and food safety auditors with full certified packs including swab tests, probe calibrations, and insurance certificates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/security"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-obsidian-950 border border-champagne/40 hover:border-champagne text-cream text-xs font-mono font-bold text-center transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-champagne" />
              <span>View Safety Policies</span>
            </Link>

            <Link
              href="/contact?subject=Technical+Audit+Pack"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-champagne via-champagne-light to-champagne text-obsidian-950 text-xs font-mono font-black shadow-gold-glow hover:brightness-110 text-center transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Request Audit Pack</span>
            </Link>
          </div>
        </div>

      </div>

      {/* ─── Interactive Credential Inspection Modal ─── */}
      {selectedCred && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-obsidian-900 via-obsidian-950 to-obsidian-950 border border-champagne/40 p-6 sm:p-8 shadow-2xl space-y-6 text-cream"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedCred(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-obsidian-900 border border-champagne/20 text-cream/60 hover:text-champagne transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-champagne/20 via-obsidian-900 to-emerald-950 border border-champagne/40 flex items-center justify-center text-champagne shrink-0 shadow-gold-glow">
                <selectedCred.icon className="w-7 h-7 text-champagne" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                  <Check className="w-3 h-3" />
                  <span>{selectedCred.badge}</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-cream">
                  {selectedCred.title}
                </h3>
                <p className="text-xs font-mono text-champagne">{selectedCred.grade}</p>
              </div>
            </div>

            {/* Certificate Scope & Details */}
            <div className="p-4 rounded-2xl bg-obsidian-950 border border-champagne/15 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-cream/60">
                <span>Certificate Ref:</span>
                <strong className="text-cream">{selectedCred.certNumber}</strong>
              </div>
              <div className="flex justify-between text-cream/60">
                <span>Audit Protocol:</span>
                <strong className="text-emerald-400">{selectedCred.auditCycle}</strong>
              </div>
              <div className="flex justify-between text-cream/60">
                <span>Certified Location:</span>
                <strong className="text-cream">Digbeth Wholesale Food Hub, Birmingham</strong>
              </div>
              <div className="pt-2 border-t border-cream/10 text-cream/80 font-sans">
                <strong>Certified Scope:</strong> {selectedCred.scope}
              </div>
            </div>

            {/* Verified Audit Highlights */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-mono text-champagne uppercase font-bold tracking-wider">
                Audited Verification Standards
              </div>
              <div className="space-y-2">
                {selectedCred.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-cream/80 bg-obsidian-900/60 p-2.5 rounded-xl border border-cream/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/contact?subject=Audit+Certificate+Request+${selectedCred.id}`}
                className="flex-1 py-3 rounded-xl bg-champagne text-obsidian-950 text-xs font-mono font-bold text-center shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2"
                onClick={() => setSelectedCred(null)}
              >
                <Download className="w-4 h-4" />
                <span>Request Certificate Copy</span>
              </Link>

              <button
                onClick={() => setSelectedCred(null)}
                className="py-3 px-5 rounded-xl bg-obsidian-950 border border-cream/20 text-cream text-xs font-mono font-semibold hover:bg-obsidian-900 transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
