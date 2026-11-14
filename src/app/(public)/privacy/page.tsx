import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import { DoodleFlourish } from '@/components/public/DoodleFlourish';

export const metadata: Metadata = {
  title: 'Privacy Policy & UK GDPR Compliance | Rootwills',
  description:
    'Review the Rootwills privacy policy and UK GDPR data protection standards protecting commercial trade partners and clients across the UK.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy & UK GDPR Compliance | Rootwills',
    description:
      'Review the Rootwills privacy policy and UK GDPR compliance standards protecting commercial trade partners.',
    url: 'https://www.rootwills.co.uk/privacy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy & UK GDPR Compliance | Rootwills',
    description:
      'Rootwills privacy policy and UK GDPR data protection standards for commercial clients.',
  },
};

export default function PrivacyPolicyPage() {
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
              LEGAL // UK GDPR &amp; DATA PROTECTION
            </span>
          </div>

          <div className="relative">
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#131313] tracking-tight leading-[1.12]">
              Privacy &amp; Data Protection Policy
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
            Effective: October 2026. Rootwills Ltd is committed to safeguarding the privacy and confidential trade information of our commercial foodservice clients and hospitality partners across the UK.
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
                1. Introduction &amp; Data Controller
              </h2>
              <p className="max-w-[68ch]">
                Rootwills Ltd acts as the Data Controller in respect of personal and commercial trade data collected through our wholesale communications, client consultations, trade enquiries, and delivery logistics operations across the United Kingdom.
              </p>
              <p className="text-xs text-stone-500 font-sans">
                Headquarters: The Hub, Nobel Wy, Birmingham B6 7EU, United Kingdom. Registered in England and Wales.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                <span className="text-[#BA8E4E] text-xs">✦</span>
                2. Information We Collect
              </h2>
              <p className="max-w-[68ch]">
                To provide dependable commercial foodservice supply and wholesale communication, we collect and process the following information:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-600 max-w-[68ch]">
                <li>
                  <strong className="text-stone-900">Commercial Entity Details:</strong> Trading business name, registered company address, VAT registration, and primary operating kitchen locations.
                </li>
                <li>
                  <strong className="text-stone-900">Trade Representatives:</strong> Head chefs, culinary procurement managers, and business owners (contact name, direct business telephone, and business email).
                </li>
                <li>
                  <strong className="text-stone-900">Logistics &amp; Delivery Specifications:</strong> Kitchen delivery access instructions, security drop zones, preferred delivery windows, and Proof of Delivery (POD) sign-offs.
                </li>
                <li>
                  <strong className="text-stone-900">Communications &amp; Enquiries:</strong> Inquiries submitted via our trade desk regarding produce sourcing, seasonal availability, and bespoke delivery schedules.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                <span className="text-[#BA8E4E] text-xs">✦</span>
                3. Legal Basis for Processing
              </h2>
              <p className="max-w-[68ch]">
                We process commercial client data under the established lawful bases defined by UK GDPR Article 6:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
                  <div className="font-serif font-bold text-[#4E0D17] mb-1">Contractual Performance</div>
                  <div className="text-xs text-stone-600">To coordinate wholesale supply, execute dawn delivery drops, and maintain reliable trade relationships.</div>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
                  <div className="font-serif font-bold text-[#4E0D17] mb-1">Legal Compliance</div>
                  <div className="text-xs text-stone-600">HMRC commercial record-keeping, VAT reporting, and UK food hygiene batch traceability.</div>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
                  <div className="font-serif font-bold text-[#4E0D17] mb-1">Legitimate Interests</div>
                  <div className="text-xs text-stone-600">Logistical route optimization, partnership verification, and safeguarding operations security.</div>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
                  <div className="font-serif font-bold text-[#4E0D17] mb-1">Trade Consent</div>
                  <div className="text-xs text-stone-600">Direct trade communications, seasonal harvest crop bulletins, and specialist sourcing alerts.</div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                <span className="text-[#BA8E4E] text-xs">✦</span>
                4. Data Security &amp; Confidentiality
              </h2>
              <p className="max-w-[68ch]">
                All trade communications and partnership records are protected under enterprise-grade TLS encryption and stringent access control protocols. We enforce strict data confidentiality and never sell, lease, or monetize client trade data to third-party marketing brokers.
              </p>
              <p className="max-w-[68ch]">
                Delivery documentation and commercial records are retained securely in UK data repositories in compliance with statutory commercial accounting rules.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                <span className="text-[#BA8E4E] text-xs">✦</span>
                5. Your Legal Rights
              </h2>
              <p>Under the UK Data Protection Act 2018, commercial contacts have the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-600 max-w-[68ch]">
                <li>Request a copy of the commercial contact information we hold for your business.</li>
                <li>Request prompt correction of outdated trade records or kitchen personnel contacts.</li>
                <li>Request erasure of records where statutory retention periods have lapsed.</li>
                <li>Lodge an inquiry with the Information Commissioner&apos;s Office (ICO) at ico.org.uk.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3 pt-6 border-t border-[#E8DEC8]">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4E0D17] flex items-center gap-2">
                <span className="text-[#BA8E4E] text-xs">✦</span>
                6. Legal &amp; Compliance Contact
              </h2>
              <p>
                To exercise data rights or for compliance questions regarding this policy, please contact our desk:
              </p>
              <div className="p-5 rounded-2xl bg-[#260309] text-white border border-[#F3D08A]/35 text-xs space-y-1.5">
                <div className="text-[#F3D08A] font-serif font-bold text-sm">Rootwills Ltd — Legal &amp; Governance Desk</div>
                <div className="text-[#EDE4D8]/90">Landline No: <span className="text-white font-medium tabular-nums">+44 16164 12803</span></div>
                <div className="text-[#EDE4D8]/90">WhatsApp No: <span className="text-white font-medium tabular-nums">+44 7984 709478</span></div>
                <div className="text-[#EDE4D8]/90">Email: <span className="text-[#F3D08A] font-medium">sales@rootwills.co.uk</span></div>
                <div className="text-[#EDE4D8]/70">Location: The Hub, Nobel Wy, Birmingham B6 7EU, United Kingdom</div>
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

          <Link href="/terms" className="text-[#4E0D17] font-bold hover:text-[#BA8E4E] flex items-center gap-1.5 transition-colors">
            <span>Wholesale Supply Terms &amp; Conditions</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#BA8E4E]" />
          </Link>
        </div>

      </div>
    </div>
  );
}
