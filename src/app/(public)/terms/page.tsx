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
    <div className="relative min-h-screen bg-[#FAF7F2] text-stone-900 pb-20 overflow-x-hidden">
      {/* Seamless Botanical Parchment Texture Overlay across the entire page */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />

      {/* ─── Editorial Header Banner (Eggshell Canvas) ─── */}
      <section className="relative z-10 pt-24 sm:pt-32 pb-14 sm:pb-18 border-b border-[#E8DEC8]/70 overflow-hidden">
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

      {/* ─── Content Container (Double-Bezel Folio) ─── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-8">
        <div className="p-1.5 sm:p-2 rounded-[2rem] bg-[#EFE8D8]/85 ring-1 ring-[#BA8E4E]/35 shadow-[0_16px_44px_rgba(46,6,13,0.06)]">
          <div className="bg-[#FFFDF9] p-7 sm:p-12 rounded-[calc(2rem-0.5rem)] border border-white/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.95)] space-y-10 text-stone-700 text-xs sm:text-sm leading-[1.7]">
            
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                <span className="text-[#BA8E4E] text-xs">✦</span>
                1. Scope &amp; Commercial Partnership Standards
              </h2>
              <p className="max-w-[68ch]">
                These Terms and Conditions govern all agreements for the commercial supply of goods and foodservice logistics by Rootwills Ltd (&quot;the Supplier&quot;) to hospitality and trade partners (&quot;the Client&quot;). These conditions strictly govern Business-to-Business (B2B) commercial partnerships across the United Kingdom.
              </p>
              <p className="max-w-[68ch]">
                Commercial partnerships and bespoke supply schedules are established directly with our commercial desk and confirmed in writing prior to service commencement.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                <span className="text-[#BA8E4E] text-xs">✦</span>
                2. Evening Cut-off &amp; Pre-Dawn Fulfilment SLAs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-1.5">
                  <div className="font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#BA8E4E]" />
                    Evening Kitchen Coordination
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Evening requirements confirmed with your account desk prior to 23:00 GMT qualify for guaranteed next-morning delivery across designated UK distribution routes.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-1.5">
                  <div className="font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#BA8E4E]" />
                    05:30 – 07:30 AM Delivery SLA
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Morning delivery drops are fulfilled between 05:30 and 07:30 GMT to ensure kitchen brigade readiness well before morning culinary preparations.
                  </p>
                </div>
              </div>
              <p className="pt-2 text-xs text-stone-600 max-w-[68ch]">
                <strong className="text-stone-900 font-semibold">Zero Unauthorized Substitutions:</strong> If a scheduled agricultural crop fails pre-departure quality checks at depot dispatch, our trade desk immediately alerts the executive chef or culinary manager. No substitute line is dispatched without approval.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                <span className="text-[#BA8E4E] text-xs">✦</span>
                3. Commercial Pricing &amp; UK VAT Regulations
              </h2>
              <p className="max-w-[68ch]">
                Agreed commercial rate cards reflect confirmed partnership tier structures. Contracted rates remain locked for agreed seasonal intervals to protect kitchen menu margins.
              </p>
              <p className="max-w-[68ch]">
                All rates are quoted in GBP (£). In accordance with UK HM Revenue &amp; Customs VAT guidelines:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-stone-600 max-w-[68ch]">
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
              <p className="max-w-[68ch]">
                Delivery is completed upon physical handover at the Client&apos;s receiving kitchen premises or secured placement within an authorized keyholder cold-store dropzone.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-600 max-w-[68ch]">
                <li>
                  <strong className="text-stone-900">Proof of Delivery (POD):</strong> All consignments include electronic receiver confirmation or time-stamped photographic placement records.
                </li>
                <li>
                  <strong className="text-stone-900">Inspection &amp; Quality Notice Window:</strong> Owing to the temperature-sensitive nature of fresh farm produce, any transit damages or grading discrepancies must be registered with our operations desk within <strong className="text-stone-900 font-semibold">4 hours of delivery handover</strong>.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                <span className="text-[#BA8E4E] text-xs">✦</span>
                5. Commercial Terms &amp; Settlement
              </h2>
              <p className="max-w-[68ch]">
                Commercial partners with agreed credit terms remit settlement within <strong className="text-stone-900">30 days net (EOM + 30)</strong> unless alternative bespoke terms have been formally executed.
              </p>
              <p className="text-xs text-stone-500 max-w-[68ch]">
                Rootwills Ltd reserves statutory entitlement under the <em>Late Payment of Commercial Debts (Interest) Act 1998</em> on overdue balances.
              </p>
            </section>

            {/* Section 6: Trademarks & Nominative Use */}
            <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                <span className="text-[#BA8E4E] text-xs">✦</span>
                6. Intellectual Property, Trademarks &amp; Nominative Fair Use
              </h2>
              <p className="max-w-[68ch]">
                All product trademarks, registered logos, brand names, and trade pack imagery displayed across the Rootwills wholesale platform remain the exclusive intellectual property of their respective manufacturers and brand owners.
              </p>
              <p className="max-w-[68ch]">
                Their display on this platform constitutes <strong>nominative fair use</strong> under United Kingdom intellectual property and trademark law, solely for the accurate commercial identification, description, and supply of genuine catering goods to hospitality and foodservice trade operators. Rootwills Ltd claims no ownership of third-party trademarks, nor endorsement by proprietary brand holders beyond the commercial supply of genuine products.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                <span className="text-[#BA8E4E] text-xs">✦</span>
                7. Governing Law &amp; Commercial Contacts Desk
              </h2>
              <p className="max-w-[68ch]">
                These Terms and Conditions and any non-contractual obligations arising from them shall be governed by and construed in accordance with the laws of <strong className="text-stone-900">England and Wales</strong>.
              </p>
              
              <div className="p-5 rounded-2xl bg-[#260309] text-white border border-[#F3D08A]/35 text-xs space-y-1.5 mt-4">
                <div className="text-[#F3D08A] font-serif font-bold text-sm">Rootwills Ltd — Commercial Contracts &amp; Trade Desk</div>
                <div className="text-[#EDE4D8]/90">Landline No: <span className="text-white font-medium tabular-nums">+44 16164 12803</span></div>
                <div className="text-[#EDE4D8]/90">WhatsApp No: <span className="text-white font-medium tabular-nums">+44 7984 709478</span></div>
                <div className="text-[#EDE4D8]/90">Commercial Enquiries: <span className="text-[#F3D08A] font-medium">sales@rootwills.co.uk</span></div>
                <div className="text-[#EDE4D8]/70">Registered Office: The Hub, Nobel Wy, Birmingham B6 7EU, United Kingdom • England &amp; Wales</div>
              </div>
            </section>

          </div>
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
