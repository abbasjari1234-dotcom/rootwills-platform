import React from 'react';
import Link from 'next/link';
import { Scale, FileText, Truck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Wholesale Supply Terms & Conditions | Rootwills Ltd',
  description: 'B2B Wholesale Supply Terms and Conditions for commercial kitchens, restaurants, hotels, and foodservice operators purchasing from Rootwills Ltd.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase">
          <Scale className="w-3.5 h-3.5 text-champagne" />
          <span>Business-to-Business (B2B) Commercial Terms</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-cream">
          Wholesale Supply Terms & Conditions
        </h1>
        <p className="text-sm sm:text-base text-cream/70 max-w-2xl mx-auto">
          Governing the supply of fresh produce, living herbs, dairy, and culinary ingredients by Rootwills Ltd to commercial hospitality operators in the United Kingdom.
        </p>
      </div>

      {/* Content Container */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-950/80 space-y-8 text-cream/80 text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            1. Scope & Trade Account Provisioning
          </h2>
          <p>
            These Terms and Conditions apply to all contracts for the wholesale supply of goods by Rootwills Ltd (&quot;the Supplier&quot;) to registered commercial buyers (&quot;the Customer&quot;). These terms strictly govern Business-to-Business (B2B) commercial transactions and exclude consumer statutory cooling-off rights.
          </p>
          <p>
            Trade accounts are provisioned upon completion of our digital onboarding process and credit verification. Approved credit limits and settlement terms are confirmed in writing via the customer portal.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            2. Orders, 11:00 PM Cut-off & Fulfilment
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
              <div className="font-bold text-champagne flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                11:00 PM Order Cut-off
              </div>
              <p className="text-xs text-cream/75">
                Orders submitted via the Rootwills ordering portal before 23:00 GMT qualify for guaranteed next-day morning delivery drop.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
              <div className="font-bold text-champagne flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400" />
                06:00 AM Delivery SLA
              </div>
              <p className="text-xs text-cream/75">
                Morning delivery drops are executed between 06:00 and 08:30 GMT to ensure kitchen prep readiness before morning service.
              </p>
            </div>
          </div>
          <p className="pt-2 text-xs text-cream/70">
            <strong>Zero Unauthorised Substitutions:</strong> If a harvested item fails quality inspection at depot loading, our operations desk will contact the kitchen prior to departure. No unapproved product substitutions will be dispatched.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            3. Pricing, UK VAT & Quotations
          </h2>
          <p>
            Prices displayed on the customer portal reflect agreed contract tier rates. As fresh produce is subject to daily agricultural market availability, locked contract prices remain valid for agreed pricing cycle intervals.
          </p>
          <p>
            All prices are quoted in GBP (£). In accordance with UK HMRC VAT regulations:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-cream/75">
            <li>Raw culinary vegetables, fruits, eggs, and unprepared dairy are zero-rated (0% VAT).</li>
            <li>Confectionery, cleaning supplies, or specialty packaging are charged at standard rate (20% VAT).</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            4. Delivery, Acceptance & Rejection of Perishables
          </h2>
          <p>
            Delivery takes place when produce is handed over to the Customer&apos;s kitchen premises or secured in an agreed secure keyholder lockbox.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-cream/75">
            <li><strong>Proof of Delivery (POD):</strong> Deliveries require a digital driver signature or time-stamped geo-tagged photographic proof of placement.</li>
            <li><strong>Inspection & Discrepancies:</strong> Due to the perishable nature of fresh agricultural produce, any quality concerns, shortages, or damaged crates must be reported via the customer portal within <strong>4 hours of delivery handover</strong> with photographic evidence.</li>
            <li>Approved discrepancy claims result in an instant credit note applied to the customer ledger.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            5. Payment Terms & Trade Credit
          </h2>
          <p>
            Customers with approved trade credit facilities agree to settle invoices within <strong>30 days net from invoice date</strong> unless otherwise specified in their facility agreement.
          </p>
          <p>
            Settlement methods include automated BACS Direct Debit (via GoCardless), corporate debit/credit cards (via Stripe), or direct bank transfer.
          </p>
          <p className="text-xs text-cream/70">
            Rootwills Ltd reserves the right to charge statutory late payment interest under the <em>Late Payment of Commercial Debts (Interest) Act 1998</em> on overdue balances.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            6. Title & Risk
          </h2>
          <p>
            Risk in the goods passes to the Customer upon physical handover at the delivery location. Title in the goods remains with Rootwills Ltd until all outstanding invoices due from the Customer have been settled in full.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 pt-4 border-t border-emerald-950">
          <h2 className="text-lg font-bold text-champagne flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
            7. Governing Law & Jurisdiction
          </h2>
          <p>
            These terms and any dispute arising from them shall be governed by and construed in accordance with the laws of <strong>England and Wales</strong>, subject to the exclusive jurisdiction of the English courts.
          </p>
          <div className="p-4 rounded-2xl bg-obsidian-900 border border-emerald-900/60 font-mono text-xs space-y-1 mt-3">
            <div className="text-cream font-bold">Rootwills Ltd — Commercial Contracts Desk</div>
            <div>Enquiries: <span className="text-champagne">sales@rootwills.co.uk</span></div>
            <div>Phone: <span className="text-champagne">0121 790 8800</span></div>
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-between items-center text-xs font-mono text-cream/60">
        <Link href="/privacy" className="hover:text-champagne transition-colors">
          &larr; Privacy Policy
        </Link>
        <Link href="/security" className="text-champagne hover:underline">
          Food Safety & HACCP Standards &rarr;
        </Link>
      </div>
    </div>
  );
}
