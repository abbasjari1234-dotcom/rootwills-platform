import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

export const metadata: Metadata = {
  title: 'Privacy Policy & UK GDPR Data Protection | Rootwills',
  description:
    'Review the Rootwills privacy policy and UK GDPR data compliance standards protecting your commercial trade account. Read our full data practices now.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 space-y-12">
      {/* Header */}
      <section className="bg-slate-950 text-white relative overflow-hidden border-b border-slate-800 pt-16 sm:pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>UK GDPR &amp; Data Protection Act 2018 Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Privacy &amp; Data Protection Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Last updated: August 2026. Rootwills Ltd is committed to safeguarding the privacy and confidential commercial trade data of our foodservice partners.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-10 text-slate-700 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              1. Introduction &amp; Data Controller
            </h2>
            <p>
              Rootwills Ltd (Company No. 14892019, registered in England and Wales) acts as the Data Controller in respect of personal and commercial data collected through our wholesale portal, delivery logistics network, and customer onboarding channels.
            </p>
            <p className="text-xs text-slate-500">
              Registered Trading Hub: Units 4-6, Digbeth Wholesale Food Hub, Birmingham, B5 6DY, United Kingdom.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              2. Information We Collect
            </h2>
            <p>To provide commercial foodservice distribution, we collect and process the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li><strong className="text-slate-900">Commercial Entity Data:</strong> Company legal name, Companies House registration number, VAT number, and registered address.</li>
              <li><strong className="text-slate-900">Authorised Personnel Contacts:</strong> Executive chef, head buyer, and accounts payable contact details (name, business email, direct telephone).</li>
              <li><strong className="text-slate-900">Fulfilment &amp; Delivery Logistics:</strong> Delivery kitchen locations, access instructions, preferred delivery drop windows, and Proof-of-Delivery (POD) digital signatures.</li>
              <li><strong className="text-slate-900">Payment &amp; Billing Data:</strong> Direct Debit mandates (processed securely via GoCardless) and card payment tokens (processed via PCI-DSS Level 1 certified Stripe). Rootwills never stores raw payment card numbers.</li>
              <li><strong className="text-slate-900">Platform Usage &amp; Telemetry:</strong> Log-in session timestamps, IP addresses, browser types, and ordering patterns to optimise route planning.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              3. Legal Basis for Processing
            </h2>
            <p>
              We process your information under the following lawful bases established by UK GDPR Article 6:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Contractual Necessity</div>
                <div className="text-xs text-slate-600">To fulfill produce supply contracts, process daily orders, and arrange morning delivery drops.</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Legal Obligation</div>
                <div className="text-xs text-slate-600">HMRC financial record-keeping, VAT accounting, and food batch traceability compliance.</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Legitimate Interests</div>
                <div className="text-xs text-slate-600">Fraud prevention, credit facility risk assessments, and safeguarding platform security.</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Consent</div>
                <div className="text-xs text-slate-600">Optional market harvest bulletins and seasonal crop price index notifications.</div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              4. Data Security &amp; Storage
            </h2>
            <p>
              All data transmitted to Rootwills is encrypted using TLS 1.3 encryption. Internal database records are secured with multi-tenant PostgreSQL Row Level Security (RLS), restricting account visibility strictly to authorised members of your organization.
            </p>
            <p>
              Digital invoices and delivery signatures are archived in private, cryptographically access-controlled storage buckets with UK/EU data residency.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-6 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              5. Your Rights Under UK GDPR
            </h2>
            <p>As a data subject, you hold the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request rectification of inaccurate or outdated trade account information.</li>
              <li>Request erasure of your personal data where statutory retention periods permit.</li>
              <li>Object to or restrict the processing of your data.</li>
              <li>Lodge a complaint with the Information Commissioner&apos;s Office (ICO) at ico.org.uk.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-6 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              6. Contact Our Data Protection Officer
            </h2>
            <p>
              If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our compliance desk:
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1.5">
              <div className="text-slate-900 font-bold">Rootwills Ltd: Legal &amp; Data Compliance Office</div>
              <div>Email: <span className="text-emerald-700 font-bold">compliance@rootwills.co.uk</span></div>
              <div>Telephone: <span className="text-slate-900 font-bold">0121 790 8800</span></div>
              <div>Address: Units 4-6, Digbeth Wholesale Food Hub, Birmingham, B5 6DY</div>
            </div>
          </section>
        </div>

        {/* Bottom Navigation Links */}
        <div className="flex justify-between items-center text-xs font-mono text-slate-500 pt-2">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            &larr; Return to Home
          </Link>
          <Link href="/terms" className="text-emerald-700 font-bold hover:underline">
            View Wholesale Supply Terms &rarr;
          </Link>
        </div>
      </div>

      {/* Commercial Bottom CTA */}
      <CommercialBottomCTA />
    </div>
  );
}
