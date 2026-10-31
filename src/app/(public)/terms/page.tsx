import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Scale, Clock, Truck, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';
import { DoodleFlourish } from '@/components/public/DoodleFlourish';

export const metadata: Metadata = {
  title: 'Wholesale B2B Supply Terms & Conditions | Rootwills',
  description:
    'Read the official B2B wholesale supply terms, delivery cut-offs, payment conditions, and service standards for Rootwills commercial trade partners.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 pb-20 overflow-x-hidden">
      {/* ─── Editorial Header Banner (Eggshell Canvas) ─── */}
      <section className="relative pt-24 sm:pt-32 pb-14 sm:pb-18 border-b border-[#E8DEC8]/70 overflow-hidden">
        {/* Soft top gradient feathering */}
        <div 
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FCFCFA] via-[#FCFCFA]/80 to-transparent pointer-events-none z-0" 
          aria-hidden="true" 
        />

        {/* Botanical Parchment Texture Overlay */}
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.16] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#2E060D] font-semibold">
              LEGAL // WHOLESALE SUPPLY TERMS (B2B)
            </span>
          </div>

          <div className="relative">
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#131313] tracking-tight leading-[1.12]">
              Wholesale Supply Terms &amp; Conditions
            </h1>
            <div className="flex justify-center">
              <DoodleFlourish 
                variant="underline-wave" 
                color="#BA8E4E" 
                strokeWidth={3} 
                className="w-52 sm:w-64 -mt-1 mb-2 text-[#BA8E4E]" 
                delay={150}
              />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Governing the commercial supply of fresh farm produce, living micro-herbs, specialty dairy, and fine culinary ingredients by Rootwills Ltd to commercial hospitality operators across the United Kingdom.
          </p>
        </div>
      </section>

      {/* ─── Content Container ─── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-8">
        <div className="bg-[#FFFDF9] p-7 sm:p-12 rounded-2xl border border-[#E8DEC8] shadow-sm space-y-10 text-stone-700 text-xs sm:text-sm leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
              <span className="text-[#BA8E4E] text-xs">✦</span>
              1. Scope &amp; Trade Account Provisioning
            </h2>
            <p>
              These Terms and Conditions apply to all agreements for the commercial supply of goods by Rootwills Ltd (&quot;the Supplier&quot;) to registered trade buyers (&quot;the Customer&quot;). These conditions strictly govern Business-to-Business (B2B) commercial transactions and exclude consumer statutory cooling-off provisions.
            </p>
            <p>
              Trade accounts and credit facilities are provisioned upon formal commercial verification and approval by our commercial underwriting desk. Approved credit facilities and agreed billing terms are confirmed in writing.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
              <span className="text-[#BA8E4E] text-xs">✦</span>
              2. Orders, 11:00 PM Cut-off &amp; Dawn Fulfilment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-1.5">
                <div className="font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#BA8E4E]" />
                  11:00 PM Order Cut-off
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Orders submitted through authorized trade channels prior to 23:00 GMT qualify for guaranteed next-morning delivery drop across designated UK distribution routes.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-1.5">
                <div className="font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#BA8E4E]" />
                  06:00 AM Delivery Service SLA
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Morning delivery drops are fulfilled between 06:00 and 08:30 GMT to ensure kitchen brigade readiness well before morning culinary preparations.
                </p>
              </div>
            </div>
            <p className="pt-2 text-xs text-stone-600">
              <strong className="text-stone-900 font-semibold">Zero Unauthorized Substitutions:</strong> If a scheduled agricultural crop fails pre-departure quality checks at depot dispatch, our trade desk immediately alerts the executive chef or culinary manager. No substitute line will be dispatched without explicit written approval.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
              <span className="text-[#BA8E4E] text-xs">✦</span>
              3. Commercial Pricing &amp; UK VAT Regulations
            </h2>
            <p>
              Agreed commercial rate cards reflect confirmed partnership tier structures. As fresh agricultural harvest yields fluctuate with market and seasonal availability, contracted rates remain locked for agreed contract intervals.
            </p>
            <p>
              All prices are quoted in GBP (£). In accordance with UK HM Revenue &amp; Customs VAT guidelines:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              <li>Raw culinary vegetables, fruits, eggs, unadulterated dairy, and whole butchery are zero-rated (0% VAT).</li>
              <li>Specialty dry goods, branded culinary sundries, and processing packaging carry the standard UK rate (20% VAT).</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
              <span className="text-[#BA8E4E] text-xs">✦</span>
              4. Delivery Acceptance &amp; Perishables Inspection SLA
            </h2>
            <p>
              Delivery is legally completed upon physical handover at the Customer&apos;s receiving kitchen premises or secured placement within an authorized keyholder cold store dropzone.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-stone-600">
              <li>
                <strong className="text-stone-900">Proof of Delivery (POD):</strong> All consignments require electronic receiver confirmation or time-stamped geo-tagged photographic placement records.
              </li>
              <li>
                <strong className="text-stone-900">Inspection &amp; Quality Notice Window:</strong> Owing to the temperature-sensitive nature of fresh farm produce, any shortages, transit damages, or grading discrepancies must be registered with our operations desk within <strong className="text-stone-900 font-semibold">4 hours of delivery handover</strong> with photographic evidence.
              </li>
              <li>
                Approved quality discrepancy notifications receive immediate commercial credit notes issued directly against the trade account ledger.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
              <span className="text-[#BA8E4E] text-xs">✦</span>
              5. Trade Settlement &amp; Commercial Credit
            </h2>
            <p>
              Commercial clients with an active credit facility agree to remit payment within <strong className="text-stone-900">30 days net from invoice date (EOM + 30)</strong> unless alternative bespoke credit terms have been formally executed.
            </p>
            <p>
              Approved payment channels include automated BACS Direct Debit, corporate card settlement, and electronic bank transfer.
            </p>
            <p className="text-xs text-stone-500">
              Rootwills Ltd reserves statutory entitlement under the <em>Late Payment of Commercial Debts (Interest) Act 1998</em> on any overdue trade balances.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
              <span className="text-[#BA8E4E] text-xs">✦</span>
              6. Title &amp; Risk Transfer
            </h2>
            <p>
              Risk of loss in all goods transfers to the Customer upon physical arrival and handover at the agreed receiving kitchen or dock premises. Title in goods remains with Rootwills Ltd until all outstanding invoiced amounts have been discharged in full.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
              <span className="text-[#BA8E4E] text-xs">✦</span>
              7. Governing Law &amp; Commercial Contacts Desk
            </h2>
            <p>
              These Terms and Conditions and any non-contractual obligations arising from them shall be governed by and construed in accordance with the laws of <strong className="text-stone-900">England and Wales</strong>, subject to the exclusive jurisdiction of the English courts.
            </p>
            
            <div className="p-5 rounded-xl bg-[#240409] text-white border border-[#BA8E4E]/30 text-xs space-y-1.5 mt-4">
              <div className="text-[#D4A86A] font-serif font-bold text-sm">Rootwills Ltd — Commercial Contracts &amp; Trade Desk</div>
              <div className="text-[#EDE4D8]/90">Telephone: <span className="text-white font-medium">+44 (0) 20 1234 5678</span></div>
              <div className="text-[#EDE4D8]/90">Commercial Enquiries: <span className="text-[#D4A86A] font-medium">info@rootwills.co.uk</span></div>
              <div className="text-[#EDE4D8]/70">Registered Office: The Hub, Nobel Wy, Birmingham B6 7EU, United Kingdom • England &amp; Wales</div>
            </div>
          </section>

        </div>

        {/* ─── Bottom Navigation Links ─── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-serif tracking-wider uppercase pt-2">
          <Link href="/" className="text-stone-600 hover:text-[#4E0D17] flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 text-[#BA8E4E]" />
            <span>Return to Home</span>
          </Link>

          <Link href="/privacy" className="text-[#4E0D17] font-bold hover:text-[#BA8E4E] flex items-center gap-1.5 transition-colors">
            <span>Privacy &amp; Data Protection Policy</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#BA8E4E]" />
          </Link>
        </div>

      </div>
    </div>
  );
}
