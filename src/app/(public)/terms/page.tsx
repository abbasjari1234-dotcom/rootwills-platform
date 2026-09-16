import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Scale, FileText, Truck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

export const metadata: Metadata = {
  title: 'Wholesale B2B Supply Terms & Conditions | Rootwills',
  description:
    'Read the official B2B wholesale terms, ordering cut-offs, credit rules, and delivery conditions for Rootwills customers. Review full account terms now.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 space-y-12">
      {/* Header */}
      <section className="bg-slate-950 text-white relative overflow-hidden border-b border-slate-800 pt-16 sm:pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
            <span>Business-to-Business (B2B) Commercial Terms</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Wholesale Supply Terms &amp; Conditions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Governing the supply of fresh produce, living herbs, dairy, butchery, and culinary ingredients by Rootwills Ltd to commercial hospitality operators in the United Kingdom.
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
              1. Scope &amp; Trade Account Provisioning
            </h2>
            <p>
              These Terms and Conditions apply to all contracts for the wholesale supply of goods by Rootwills Ltd (&quot;the Supplier&quot;) to registered commercial buyers (&quot;the Customer&quot;). These terms strictly govern Business-to-Business (B2B) commercial transactions and exclude consumer statutory cooling-off rights.
            </p>
            <p>
              Trade accounts are provisioned upon completion of our digital onboarding process and credit verification. Approved credit limits and settlement terms are confirmed in writing via the customer portal.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              2. Orders, 11:00 PM Cut-off &amp; Fulfilment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  11:00 PM Order Cut-off
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Orders submitted via the Rootwills ordering portal before 23:00 GMT qualify for guaranteed next-day morning delivery drop.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  06:00 AM Delivery SLA
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Morning delivery drops are executed between 06:00 and 08:30 GMT to ensure kitchen prep readiness before morning service.
                </p>
              </div>
            </div>
            <p className="pt-2 text-xs text-slate-600">
              <strong className="text-slate-900">Zero Unauthorised Substitutions:</strong> If a harvested item fails quality inspection at depot loading, our operations desk will contact the kitchen prior to departure. No unapproved product substitutions will be dispatched.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              3. Pricing, UK VAT &amp; Quotations
            </h2>
            <p>
              Prices displayed on the customer portal reflect agreed contract tier rates. As fresh produce is subject to daily agricultural market availability, locked contract prices remain valid for agreed pricing cycle intervals.
            </p>
            <p>
              All prices are quoted in GBP (£). In accordance with UK HMRC VAT regulations:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Raw culinary vegetables, fruits, eggs, and unprepared dairy are zero-rated (0% VAT).</li>
              <li>Confectionery, cleaning supplies, or specialty packaging are charged at standard rate (20% VAT).</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              4. Delivery, Acceptance &amp; Rejection of Perishables
            </h2>
            <p>
              Delivery takes place when produce is handed over to the Customer&apos;s kitchen premises or secured in an agreed secure keyholder lockbox.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li><strong className="text-slate-900">Proof of Delivery (POD):</strong> Deliveries require a digital driver signature or time-stamped geo-tagged photographic proof of placement.</li>
              <li><strong className="text-slate-900">Inspection &amp; Discrepancies:</strong> Due to the perishable nature of fresh agricultural produce, any quality concerns, shortages, or damaged crates must be reported via the customer portal within <strong className="text-slate-900">4 hours of delivery handover</strong> with photographic evidence.</li>
              <li>Approved discrepancy claims result in an instant credit note applied to the customer ledger.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-6 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              5. Payment Terms &amp; Trade Credit
            </h2>
            <p>
              Customers with approved trade credit facilities agree to settle invoices within <strong className="text-slate-900">30 days net from invoice date (EOM + 30)</strong> unless otherwise specified in their facility agreement.
            </p>
            <p>
              Settlement methods include automated BACS Direct Debit (via GoCardless), corporate debit/credit cards (via Stripe), or direct bank transfer.
            </p>
            <p className="text-xs text-slate-500">
              Rootwills Ltd reserves the right to charge statutory late payment interest under the <em>Late Payment of Commercial Debts (Interest) Act 1998</em> on overdue balances.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-6 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              6. Title &amp; Risk
            </h2>
            <p>
              Risk in the goods passes to the Customer upon physical handover at the delivery location. Title in the goods remains with Rootwills Ltd until all outstanding invoices due from the Customer have been settled in full.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-6 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              7. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These terms and any dispute arising from them shall be governed by and construed in accordance with the laws of <strong className="text-slate-900">England and Wales</strong>, subject to the exclusive jurisdiction of the English courts.
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1.5 mt-3">
              <div className="text-slate-900 font-bold">Rootwills Ltd: Commercial Contracts Desk</div>
              <div>Enquiries: <span className="text-emerald-700 font-bold">sales@rootwills.co.uk</span></div>
              <div>Phone: <span className="text-slate-900 font-bold">0121 790 8800</span></div>
            </div>
          </section>
        </div>

        {/* Bottom Links */}
        <div className="flex justify-between items-center text-xs font-mono text-slate-500 pt-2">
          <Link href="/privacy" className="hover:text-emerald-700 transition-colors">
            &larr; Privacy Policy
          </Link>
          <Link href="/security" className="text-emerald-700 font-bold hover:underline">
            Food Safety &amp; HACCP Standards &rarr;
          </Link>
        </div>
      </div>

      {/* Commercial Bottom CTA */}
      <CommercialBottomCTA />
    </div>
  );
}
