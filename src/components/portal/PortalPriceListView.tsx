'use client';

import React from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
import { Printer, Download, FileText, CheckCircle2, ShieldCheck, Clock, Sparkles } from 'lucide-react';

export function PortalPriceListView() {
  const { currentOrgId, organizations, getCustomerProducts } = useDemoStore();
  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];
  const products = getCustomerProducts();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:p-0 print:bg-white print:text-black">
      {/* Non-print controls bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-champagne uppercase font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>Official Commercial Rate Card</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-cream mt-1">
            Custom Price List & Contract Rates
          </h1>
          <p className="text-xs text-cream/60">
            {currentOrg.name} &bull; Current locked prices, pack sizes, origins, and allergen specifications for your account.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Official Printable Price List Document */}
      <div className="bg-obsidian-900 border border-cream/15 rounded-3xl p-8 sm:p-12 space-y-8 print:border-none print:p-0 print:bg-transparent print:text-black shadow-2xl">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-champagne/40 pb-6 gap-4 print:border-black">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-champagne uppercase print:text-gray-700">
              ROOTWILLS LTD &bull; B2B FOOD-SERVICE WHOLESALE
            </div>
            <h2 className="font-display text-3xl font-bold text-cream mt-1 print:text-black">
              Commercial Contract Price Schedule
            </h2>
            <div className="text-xs text-cream/60 mt-1 print:text-gray-600">
              Valid From: <strong>August 2026</strong> &bull; Assigned Hub: <strong>{currentOrg.assignedDepot}</strong>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs bg-obsidian-950 p-4 rounded-xl border border-cream/10 print:bg-gray-100 print:text-black">
            <div className="text-champagne font-bold text-sm print:text-black">{currentOrg.name}</div>
            <div className="text-cream/60 print:text-gray-600">Account ID: {currentOrg.id.toUpperCase()}</div>
            <div className="text-cream/60 print:text-gray-600">Payment Terms: {currentOrg.paymentTerms}</div>
            <div className="text-emerald-400 font-mono text-[10px] mt-1 print:text-black">✓ Commercial Discount Tier Applied</div>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-cream/20 text-[11px] font-mono text-cream/50 uppercase print:border-gray-400 print:text-black">
                <th className="py-3 pl-2">SKU</th>
                <th className="py-3">Product Description</th>
                <th className="py-3">Category</th>
                <th className="py-3">Pack Spec</th>
                <th className="py-3">MOQ</th>
                <th className="py-3 text-right">Standard Guide</th>
                <th className="py-3 text-right pr-2">Your Contract Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream/10 print:divide-gray-300">
              {products.map((p) => {
                const isDiscounted = p.customerPrice < p.basePrice;
                const savingsPct = Math.round(((p.basePrice - p.customerPrice) / p.basePrice) * 100);

                return (
                  <tr key={p.id} className="hover:bg-obsidian-800/40 print:hover:bg-transparent">
                    <td className="py-3 pl-2 font-mono font-bold text-champagne print:text-black">{p.sku}</td>
                    <td className="py-3">
                      <strong className="text-cream block print:text-black text-sm">{p.name}</strong>
                      <div className="text-[11px] text-cream/50 print:text-gray-600">
                        {p.origin && `Origin: ${p.origin}`}
                        {p.allergens && ` • Allergens: ${p.allergens.join(', ')}`}
                      </div>
                    </td>
                    <td className="py-3 text-cream/70 print:text-black">{p.categoryLabel}</td>
                    <td className="py-3 font-mono text-cream/80 print:text-black">{p.packSize}</td>
                    <td className="py-3 font-mono text-cream/60 print:text-black">{p.moq} {p.unit}</td>
                    <td className="py-3 font-mono text-right text-cream/40 line-through print:text-gray-500">
                      £{p.basePrice.toFixed(2)}
                    </td>
                    <td className="py-3 pr-2 font-mono font-bold text-right text-base text-cream print:text-black">
                      £{p.customerPrice.toFixed(2)}
                      {isDiscounted && (
                        <span className="ml-2 text-[10px] text-emerald-400 font-mono print:text-gray-800">
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
        <div className="pt-6 border-t border-cream/10 text-xs text-cream/60 space-y-2 print:border-black print:text-black">
          <div className="font-bold text-champagne print:text-black">Ordering & Delivery Terms:</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px]">
            <div>&bull; <strong>Late Order Cutoff:</strong> 11:00 PM (night prior to delivery)</div>
            <div>&bull; <strong>Delivery SLA:</strong> 06:00 AM - 08:30 AM (or early keyholder drop)</div>
            <div>&bull; <strong>Quality Guarantee:</strong> 100% credit for any reported quality issue within 4 hours</div>
          </div>
          <div className="text-[10px] text-cream/40 pt-4 print:text-gray-500 text-center">
            Rootwills Ltd &bull; Central Fulfilment Hub, Digbeth, Birmingham &bull; Accounts & Orders: orders@rootwills.co.uk
          </div>
        </div>
      </div>
    </div>
  );
}
