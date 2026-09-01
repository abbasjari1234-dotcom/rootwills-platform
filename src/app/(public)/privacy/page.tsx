import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy & UK GDPR Data Protection | Rootwills',
  description:
    'Review the Rootwills privacy policy and UK GDPR data compliance standards protecting your commercial trade account. Read our full data practices now.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
          <span>UK GDPR & Data Protection Act 2018 Compliant</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-cream">
          Privacy & Data Protection Policy
        </h1>
        <p className="text-sm sm:text-base text-cream/70 max-w-2xl mx-auto">
          Last updated: August 2026. Rootwills Ltd is committed to safeguarding the privacy and confidential trade data of our commercial foodservice partners.
        </p>
      </div>

      {/* Content Container */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-950/80 space-y-8 text-cream/80 text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            1. Introduction & Data Controller
          </h2>
          <p>
            Rootwills Ltd (Company No. 14892019, registered in England and Wales) acts as the Data Controller in respect of personal and commercial data collected through our wholesale portal, delivery logistics network, and customer onboarding channels.
          </p>
          <p>
            Registered Trading Hub: Units 4–6, Digbeth Wholesale Food Hub, Birmingham, B5 6DY, United Kingdom.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            2. Information We Collect
          </h2>
          <p>To provide commercial foodservice distribution, we collect and process the following categories of information:</p>
          <ul className="list-disc pl-5 space-y-2 text-cream/75">
            <li><strong>Commercial Entity Data:</strong> Company legal name, Companies House number, VAT number, and registered address.</li>
            <li><strong>Authorised Personnel Contacts:</strong> Executive chef, head buyer, and accounts payable contact details (name, business email, direct telephone).</li>
            <li><strong>Fulfilment & Delivery Logistics:</strong> Delivery kitchen locations, access codes, preferred delivery windows, and Proof-of-Delivery (POD) digital signatures.</li>
            <li><strong>Payment & Billing Data:</strong> Direct Debit mandates (processed securely via GoCardless) and card payment tokens (processed via PCI-DSS Level 1 certified Stripe). Rootwills never stores raw payment card numbers.</li>
            <li><strong>Platform Usage & Telemetry:</strong> Log-in session timestamps, IP addresses, browser types, and ordering patterns to optimise delivery routing.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            3. Legal Basis for Processing
          </h2>
          <p>
            We process your information under the following lawful bases established by UK GDPR Article 6:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50">
              <div className="font-bold text-cream mb-1">Contractual Necessity</div>
              <div className="text-xs text-cream/70">To fulfill produce supply contracts, process daily orders, and arrange morning delivery drops.</div>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50">
              <div className="font-bold text-cream mb-1">Legal Obligation</div>
              <div className="text-xs text-cream/70">HMRC financial record-keeping, VAT accounting, and food batch traceability compliance.</div>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50">
              <div className="font-bold text-cream mb-1">Legitimate Interests</div>
              <div className="text-xs text-cream/70">Fraud prevention, credit facility risk assessments, and safeguarding platform security.</div>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50">
              <div className="font-bold text-cream mb-1">Consent</div>
              <div className="text-xs text-cream/70">Optional market harvest bulletins and seasonal price index notifications.</div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            4. Data Security & Storage
          </h2>
          <p>
            All data transmitted to Rootwills is encrypted using TLS 1.3 encryption. Internal database records are secured with multi-tenant PostgreSQL Row Level Security (RLS), restricting account visibility strictly to authorised members of your organization.
          </p>
          <p>
            Digital invoices and delivery signatures are archived in private, cryptographically access-controlled storage buckets with UK/EU data residency.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            5. Your Rights Under UK GDPR
          </h2>
          <p>As a data subject, you hold the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-cream/75">
            <li>Request access to the personal data we hold about you.</li>
            <li>Request rectification of inaccurate or outdated trade account information.</li>
            <li>Request erasure of your personal data where statutory retention periods permit.</li>
            <li>Object to or restrict the processing of your data.</li>
            <li>Lodge a complaint with the Information Commissioner’s Office (ICO) at <span className="text-champagne">ico.org.uk</span>.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-4 border-t border-emerald-950">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            6. Contact Our Data Protection Officer
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our compliance desk:
          </p>
          <div className="p-4 rounded-2xl bg-obsidian-900 border border-emerald-900/60 font-mono text-xs space-y-1">
            <div className="text-cream font-bold">Rootwills Ltd — Legal & Data Compliance Office</div>
            <div>Email: <span className="text-champagne">compliance@rootwills.co.uk</span></div>
            <div>Telephone: <span className="text-champagne">+44 121 790 8800</span></div>
            <div>Address: Units 4–6, Digbeth Wholesale Food Hub, Birmingham, B5 6DY</div>
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-between items-center text-xs font-mono text-cream/60">
        <Link href="/" className="hover:text-champagne transition-colors">
          &larr; Return to Home
        </Link>
        <Link href="/terms" className="text-champagne hover:underline">
          View Wholesale Supply Terms &rarr;
        </Link>
      </div>
    </div>
  );
}
