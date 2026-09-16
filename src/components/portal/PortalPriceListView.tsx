'use client';

import React from 'react';
import { useAppStore } from '@/store/app-store';
import { Printer, Download, FileText, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export function PortalPriceListView() {
  const { currentOrgId, organizations, getCustomerProducts } = useAppStore();
  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0] || {
    id: 'org-default',
    name: 'Commercial Client',
    paymentTerms: '30-Day EOM',
    assignedDepot: 'Digbeth Central Hub'
  };
  const products = getCustomerProducts();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:p-0 print:bg-white print:text-black">
      {/* ─── Non-print controls bar ─── */}
      <div className="bg-white border border-slate-200 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 uppercase font-bold">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official Commercial Rate Card</span>
          </div>
          <h1 className="font-sans text-2xl font-bold text-slate-900 mt-1">
            Custom Price List &amp; Contract Rates
          </h1>
          <p className="text-xs text-slate-500">
            {currentOrg.name} &bull; Current locked prices, pack sizes, origins, and allergen specifications for your account.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* ─── Official Printable Price List Document ─── */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8 shadow-xs text-slate-900 print:border-none print:p-0 print:shadow-none">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-emerald-600 pb-6 gap-4 print:border-black">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase print:text-gray-700">
              ROOTWILLS LTD &bull; B2B FOOD-SERVICE WHOLESALE
            </div>
            <h2 className="font-sans text-3xl font-bold text-slate-900 mt-1 print:text-black">
              Commercial Contract Price Schedule
            </h2>
            <div className="text-xs text-slate-500 mt-1 print:text-gray-600">
              Valid From: <strong>August 2026</strong> &bull; Assigned Hub: <strong>{currentOrg.assignedDepot || 'Digbeth Central Hub'}</strong>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 print:bg-gray-100 print:text-black">
            <div className="text-slate-900 font-bold text-sm print:text-black">{currentOrg.name}</div>
            <div className="text-slate-500 print:text-gray-600">Account ID: {currentOrg.id.toUpperCase()}</div>
            <div className="text-slate-500 print:text-gray-600">Payment Terms: {currentOrg.paymentTerms}</div>
            <div className="text-emerald-800 font-mono text-[10px] mt-1 print:text-black font-semibold">✓ Commercial Discount Tier Applied</div>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-mono text-slate-700 uppercase print:border-gray-400 print:text-black font-bold">
                <th className="py-3 pl-3">SKU</th>
                <th className="py-3">Product Description</th>
                <th className="py-3">Category</th>
                <th className="py-3">Pack Spec</th>
                <th className="py-3">MOQ</th>
                <th className="py-3 text-right">Standard Guide</th>
                <th className="py-3 text-right pr-3">Your Contract Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 print:divide-gray-300">
              {products.map((p) => {
                const isDiscounted = p.customerPrice < p.basePrice;
                const savingsPct = Math.round(((p.basePrice - p.customerPrice) / p.basePrice) * 100);

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 print:hover:bg-transparent">
                    <td className="py-3 pl-3 font-mono font-bold text-emerald-800 print:text-black">{p.sku}</td>
                    <td className="py-3">
                      <strong className="text-slate-900 block print:text-black text-sm">{p.name}</strong>
                      <div className="text-[11px] text-slate-500 print:text-gray-600">
                        {p.origin && `Origin: ${p.origin}`}
                        {p.allergens && ` • Allergens: ${p.allergens.join(', ')}`}
                      </div>
                    </td>
                    <td className="py-3 text-slate-600 print:text-black">{p.categoryLabel}</td>
                    <td className="py-3 font-mono text-slate-700 print:text-black">{p.packSize}</td>
                    <td className="py-3 font-mono text-slate-600 print:text-black">{p.moq} {p.unit}</td>
                    <td className="py-3 font-mono text-right text-slate-400 line-through print:text-gray-500">
                      £{p.basePrice.toFixed(2)}
                    </td>
                    <td className="py-3 pr-3 font-mono font-bold text-right text-base text-slate-900 print:text-black">
                      £{p.customerPrice.toFixed(2)}
                      {isDiscounted && (
                        <span className="ml-2 text-[10px] text-emerald-800 font-mono print:text-gray-800 font-semibold">
                          (-{savingsPct}%)
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer & SLA terms */}
        <div className="pt-6 border-t border-slate-200 text-xs text-slate-600 space-y-2 print:border-black print:text-black">
          <div className="font-bold text-slate-900 print:text-black">Ordering &amp; Delivery Terms:</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px]">
            <div>&bull; <strong>Late Order Cutoff:</strong> 11:00 PM (night prior to delivery)</div>
            <div>&bull; <strong>Delivery SLA:</strong> 06:00 AM - 08:30 AM (or early keyholder drop)</div>
            <div>&bull; <strong>Quality Guarantee:</strong> 100% credit for any reported quality issue within 4 hours</div>
          </div>
          <div className="text-[10px] text-slate-400 pt-4 print:text-gray-500 text-center font-mono">
            Rootwills Ltd &bull; Central Fulfilment Hub, Digbeth, Birmingham &bull; Accounts &amp; Orders: orders@rootwills.co.uk
          </div>
        </div>
      </div>
    </div>
  );
}
