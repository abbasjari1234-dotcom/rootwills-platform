'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useDemoStore } from '@/lib/store/demo-store';
import { Printer, ArrowLeft, Download, ShieldCheck, Landmark, CheckCircle2 } from 'lucide-react';

interface PortalInvoicePrintViewProps {
  invoiceId?: string;
}

export function PortalInvoicePrintView({ invoiceId: propInvoiceId }: PortalInvoicePrintViewProps = {}) {
  const params = useParams();
  const router = useRouter();
  const { invoices, organizations, currentOrgId } = useDemoStore();

  const invoiceId = propInvoiceId || (params?.id as string);
  const invoice = invoices.find((i) => i.id === invoiceId || i.invoiceNumber === invoiceId) || invoices[0];
  const currentOrg = organizations.find((o) => o.id === invoice?.organizationId || o.id === currentOrgId) || organizations[0];

  const handlePrint = () => {
    window.print();
  };

  if (!invoice) {
    return (
      <div className="min-h-screen bg-obsidian-950 text-cream flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <p className="text-sm text-cream/60">Invoice not found.</p>
          <Link href="/invoices" className="text-champagne font-bold text-xs hover:underline">
            &larr; Return to Invoices
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 py-8 px-4 sm:px-6 print:bg-white print:p-0">
      {/* Top Action Bar (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Invoices</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Official A4 Invoice Sheet */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-zinc-200 print:shadow-none print:border-none print:p-0 text-xs leading-relaxed">
        {/* Header: Company Details & Invoice Title */}
        <div className="flex justify-between items-start border-b-2 border-zinc-900 pb-6">
          <div>
            <div className="text-2xl font-bold font-serif tracking-tight text-zinc-950">
              ROOTWILLS
            </div>
            <div className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold">
              Wholesale Foodservice Ltd
            </div>
            <div className="mt-2 text-[11px] text-zinc-600 space-y-0.5 font-sans">
              <div>Units 4–6, Digbeth Wholesale Food Hub</div>
              <div>Digbeth, Birmingham, B5 6DY, United Kingdom</div>
              <div>Tel: +44 (0)121 790 4500 &bull; Email: billing@rootwills.co.uk</div>
              <div className="font-mono pt-1 text-zinc-800">
                <strong>VAT Reg:</strong> GB 412 8901 34 &bull; <strong>Co. Reg:</strong> 12948192
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-block px-3 py-1 rounded bg-zinc-100 border border-zinc-300 font-mono font-bold text-xs uppercase text-zinc-800 mb-2">
              Tax Invoice
            </div>
            <h1 className="text-xl font-bold font-mono text-zinc-950">
              {invoice.invoiceNumber}
            </h1>
            <div className="text-[11px] text-zinc-600 mt-1 font-mono">
              <div><strong>Issue Date:</strong> {invoice.issueDate}</div>
              <div><strong>Tax Point:</strong> {invoice.issueDate}</div>
              <div><strong>Payment Due:</strong> {invoice.dueDate}</div>
              <div><strong>Terms:</strong> {currentOrg.paymentTerms}</div>
            </div>
          </div>
        </div>

        {/* Bill To & Delivery Address */}
        <div className="grid grid-cols-2 gap-8 py-6 border-b border-zinc-200">
          <div>
            <span className="text-[10px] uppercase font-mono text-zinc-400 font-bold block mb-1">
              Invoice To (Customer):
            </span>
            <div className="text-sm font-bold text-zinc-950">{currentOrg.name}</div>
            <div className="text-zinc-600 mt-0.5">
              <div>{currentOrg.locations[0]?.addressLine1 || '12-14 Temple Street'}</div>
              <div>{currentOrg.locations[0]?.city || 'Birmingham'}, {currentOrg.locations[0]?.postcode || 'B2 5BN'}</div>
              <div className="font-mono text-[11px] mt-1">
                <strong>Account Ref:</strong> {currentOrg.id.toUpperCase()}
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-zinc-400 font-bold block mb-1">
              Delivery Site & Order Ref:
            </span>
            <div className="text-zinc-800 font-semibold">{currentOrg.locations[0]?.name || 'Main Kitchen'}</div>
            <div className="text-zinc-600">
              <div>Order Ref: <strong className="font-mono text-zinc-900">{invoice.orderNumber || 'PO-90412'}</strong></div>
              <div>Dispatch Depot: <strong className="text-zinc-900">{currentOrg.assignedDepot}</strong></div>
              <div>Delivery Slot: <strong className="text-zinc-900">06:00 – 08:00 AM (Keyslot)</strong></div>
            </div>
          </div>
        </div>

        {/* Itemized Line Table */}
        <div className="py-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-zinc-900 text-[10px] uppercase font-mono text-zinc-600">
                <th className="py-2.5">Item / Description</th>
                <th className="py-2.5 text-center">Pack Spec</th>
                <th className="py-2.5 text-center">Qty</th>
                <th className="py-2.5 text-right">Unit Net (£)</th>
                <th className="py-2.5 text-center">VAT %</th>
                <th className="py-2.5 text-right">Total Net (£)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 font-sans">
              <tr className="text-zinc-900">
                <td className="py-3 pr-2">
                  <div className="font-bold">San Marzano D.O.P. Whole Peeled Tomatoes</div>
                  <div className="text-[10px] text-zinc-500 font-mono">SKU: PRD-001 &bull; Origin: Campania, Italy</div>
                </td>
                <td className="py-3 text-center text-zinc-600 font-mono">6 × 2.5kg Tin</td>
                <td className="py-3 text-center font-bold font-mono">12</td>
                <td className="py-3 text-right font-mono">£38.50</td>
                <td className="py-3 text-center font-mono">0% (Zero)</td>
                <td className="py-3 text-right font-bold font-mono">£462.00</td>
              </tr>
              <tr className="text-zinc-900">
                <td className="py-3 pr-2">
                  <div className="font-bold">Burrata Pugliese Artigianale (Fresh Chilled)</div>
                  <div className="text-[10px] text-zinc-500 font-mono">SKU: PRD-002 &bull; Origin: Puglia, Italy (Chamber: 2.4°C)</div>
                </td>
                <td className="py-3 text-center text-zinc-600 font-mono">8 × 125g Tub</td>
                <td className="py-3 text-center font-bold font-mono">16</td>
                <td className="py-3 text-right font-mono">£22.80</td>
                <td className="py-3 text-center font-mono">0% (Zero)</td>
                <td className="py-3 text-right font-bold font-mono">£364.80</td>
              </tr>
              <tr className="text-zinc-900">
                <td className="py-3 pr-2">
                  <div className="font-bold">Organic Extra Virgin Olive Oil D.O.P.</div>
                  <div className="text-[10px] text-zinc-500 font-mono">SKU: PRD-003 &bull; Cold Extracted Single Estate</div>
                </td>
                <td className="py-3 text-center text-zinc-600 font-mono">4 × 5L Tin</td>
                <td className="py-3 text-center font-bold font-mono">6</td>
                <td className="py-3 text-right font-mono">£68.00</td>
                <td className="py-3 text-center font-mono">0% (Zero)</td>
                <td className="py-3 text-right font-bold font-mono">£408.00</td>
              </tr>
              <tr className="text-zinc-900">
                <td className="py-3 pr-2">
                  <div className="font-bold">San Pellegrino Sparkling Mineral Water</div>
                  <div className="text-[10px] text-zinc-500 font-mono">SKU: PRD-009 &bull; Glass Bottles Standard Rated</div>
                </td>
                <td className="py-3 text-center text-zinc-600 font-mono">24 × 750ml</td>
                <td className="py-3 text-center font-bold font-mono">8</td>
                <td className="py-3 text-right font-mono">£18.50</td>
                <td className="py-3 text-center font-mono">20% (Std)</td>
                <td className="py-3 text-right font-bold font-mono">£148.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* VAT Analysis & Financial Totals */}
        <div className="grid grid-cols-2 gap-8 pt-4 border-t-2 border-zinc-900">
          <div className="space-y-3">
            <div className="text-[10px] uppercase font-mono text-zinc-500 font-bold">
              VAT Rate Analysis (UK HMRC Compliant)
            </div>
            <table className="w-full text-[11px] font-mono border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 text-[10px]">
                  <th className="pb-1">Rate</th>
                  <th className="pb-1 text-right">Net Goods</th>
                  <th className="pb-1 text-right">VAT Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                <tr>
                  <td className="py-1">Zero Rated (0%)</td>
                  <td className="py-1 text-right">£1,234.80</td>
                  <td className="py-1 text-right">£0.00</td>
                </tr>
                <tr>
                  <td className="py-1">Standard Rated (20%)</td>
                  <td className="py-1 text-right">£148.00</td>
                  <td className="py-1 text-right">£29.60</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-2 text-right">
            <div className="flex justify-between text-zinc-600 font-mono">
              <span>Total Goods (Net):</span>
              <strong className="text-zinc-950">£{invoice.subtotal.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between text-zinc-600 font-mono">
              <span>Total VAT (0% & 20%):</span>
              <strong className="text-zinc-950">£{invoice.vatAmount.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between text-base font-bold text-zinc-950 font-mono pt-2 border-t-2 border-zinc-900">
              <span>Gross Amount Due:</span>
              <span className="text-amber-800">£{invoice.totalAmount.toFixed(2)}</span>
            </div>
            <div className="text-[10px] text-zinc-500 pt-1">
              Status: <span className="uppercase font-bold font-mono text-emerald-700">{invoice.status}</span>
            </div>
          </div>
        </div>

        {/* Remittance Advice Tear-Off Slip */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-zinc-300">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold">
              Remittance Advice &bull; Payment Instructions
            </span>
            <span className="text-[10px] font-mono text-zinc-400">Please quote invoice number on all transfers</span>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] font-mono">
            <div>
              <div className="text-zinc-500 font-semibold mb-1">Method 1: BACS Faster Payments</div>
              <div>Beneficiary: <strong>Rootwills Foodservice Ltd</strong></div>
              <div>Bank: <strong>Barclays Corporate Banking</strong></div>
              <div>Sort Code: <strong className="text-zinc-950">40-11-18</strong></div>
              <div>Account No: <strong className="text-zinc-950">81923049</strong></div>
              <div>Payment Reference: <strong className="text-amber-800 font-bold">RW-{invoice.invoiceNumber}</strong></div>
            </div>

            <div>
              <div className="text-zinc-500 font-semibold mb-1">Method 2: Automated Direct Debit</div>
              <div>Scheme: <strong>UK BACS Direct Debit (GoCardless)</strong></div>
              <div>Mandate Ref: <strong>MD-{currentOrg.id.toUpperCase()}-01</strong></div>
              <div>Collection Date: <strong>{invoice.dueDate}</strong></div>
              <div className="text-[10px] text-zinc-500 mt-1">
                Protected by the official UK Direct Debit Guarantee scheme.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-200 text-center text-[10px] text-zinc-400 font-mono">
          Thank you for your business. Rootwills Foodservice Ltd &bull; Registered in England & Wales #12948192 &bull; BRCGS Food Safety Certified Storage & Distribution Hub.
        </div>
      </div>
    </div>
  );
}
