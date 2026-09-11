'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { CustomerOrganization } from '@/types/customer';
import { 
  DollarSign, 
  Search, 
  Edit3, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  X,
  CreditCard,
  Building2,
  Phone,
  ArrowRight
} from 'lucide-react';

export function AdminCustomersView() {
  const { 
    organizations, 
    products, 
    updateCustomerPrice, 
    updateCustomerCredit 
  } = useAppStore();

  const [selectedOrgForPricing, setSelectedOrgForPricing] = useState<CustomerOrganization | null>(null);
  const [search, setSearch] = useState('');
  const [editingCreditLimit, setEditingCreditLimit] = useState<number>(0);
  const [editingPaymentTerms, setEditingPaymentTerms] = useState<string>('');

  const filteredOrgs = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(search.toLowerCase()) ||
      org.sector.toLowerCase().includes(search.toLowerCase()) ||
      org.assignedSalesRep.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenPricingModal = (org: CustomerOrganization) => {
    setSelectedOrgForPricing(org);
    setEditingCreditLimit(org.creditLimit);
    setEditingPaymentTerms(org.paymentTerms);
  };

  const handleSaveCreditTerms = () => {
    if (!selectedOrgForPricing) return;
    updateCustomerCredit(selectedOrgForPricing.id, editingCreditLimit, editingPaymentTerms);
    alert('Customer credit limit & payment terms updated!');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase font-bold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Commercial Accounts & Pricing Matrix</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Customer Accounts & Credit Limits
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Set customer-specific contract prices, volume discount tiers, and manage commercial credit lines.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search customer, sector, or sales rep..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm transition-all"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4 pl-5">Customer Account</th>
                <th className="p-4">Sector</th>
                <th className="p-4">Credit Limit</th>
                <th className="p-4">Credit Balance Used</th>
                <th className="p-4">Payment Terms</th>
                <th className="p-4">Custom Overrides</th>
                <th className="p-4">Assigned Sales Rep</th>
                <th className="p-4 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrgs.map((org) => {
                const overrideCount = Object.keys(org.priceOverrides || {}).length;
                const availableCredit = Math.max(0, org.creditLimit - org.creditUsed);

                return (
                  <tr key={org.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 pl-5">
                      <div className="font-bold text-slate-900 text-sm">{org.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {org.locations.length} site(s) &bull; {org.locations[0]?.city}
                      </div>
                    </td>
                    <td className="p-4 capitalize text-slate-600 font-medium">
                      {org.sector.replace('_', ' ')}
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900">
                      £{org.creditLimit.toLocaleString()}
                    </td>
                    <td className="p-4 font-mono text-emerald-700 font-semibold">
                      £{org.creditUsed.toFixed(2)}
                      <span className="text-[10px] text-slate-400 block font-normal">£{availableCredit.toFixed(2)} avail</span>
                    </td>
                    <td className="p-4 font-mono text-slate-700">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[11px] font-semibold border border-slate-200">
                        {org.paymentTerms}
                      </span>
                    </td>
                    <td className="p-4">
                      {overrideCount > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-mono border border-amber-200 font-semibold">
                          {overrideCount} SKUs Overridden
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px]">Tier Discount Only</span>
                      )}
                    </td>
                    <td className="p-4 text-slate-600 text-[11px]">
                      {org.assignedSalesRep}
                    </td>
                    <td className="p-4 pr-5 text-right">
                      <button
                        onClick={() => handleOpenPricingModal(org)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow flex items-center gap-1.5 ml-auto transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Manage Terms & Overrides</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Pricing & Credit Matrix Modal */}
      {selectedOrgForPricing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col text-slate-900">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  Bespoke Pricing Matrix & Terms
                </span>
                <h3 className="font-display text-2xl font-bold text-slate-900 mt-1.5">
                  {selectedOrgForPricing.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sector: <strong className="capitalize">{selectedOrgForPricing.sector.replace('_', ' ')}</strong> &bull; Base Tier Discount: <strong className="text-emerald-700">{selectedOrgForPricing.discountTierPercent || 0}%</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrgForPricing(null)}
                aria-label="Close pricing and credit terms editor"
                className="text-slate-400 hover:text-slate-900 text-lg p-1 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Credit & Terms Adjuster */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end text-xs">
              <div>
                <label htmlFor="customer-credit-limit" className="block text-slate-700 uppercase font-mono text-[10px] mb-1 font-bold">
                  Trade Credit Limit (£)
                </label>
                <input
                  id="customer-credit-limit"
                  type="number"
                  step="500"
                  aria-label="Trade Credit Limit in Pounds"
                  value={editingCreditLimit}
                  onChange={(e) => setEditingCreditLimit(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="customer-payment-terms" className="block text-slate-700 uppercase font-mono text-[10px] mb-1 font-bold">
                  Payment Terms
                </label>
                <select
                  id="customer-payment-terms"
                  aria-label="Payment Terms"
                  value={editingPaymentTerms}
                  onChange={(e) => setEditingPaymentTerms(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 font-mono text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="30 Days EOM">30 Days EOM</option>
                  <option value="30 Days Net">30 Days Net</option>
                  <option value="14 Days Net">14 Days Net</option>
                  <option value="7 Days Direct Debit">7 Days Direct Debit</option>
                  <option value="Pre-payment / Card">Pre-payment / Card</option>
                </select>
              </div>

              <button
                onClick={handleSaveCreditTerms}
                className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all shadow-sm cursor-pointer"
              >
                Update Terms
              </button>
            </div>

            {/* SKU Specific Price Override Matrix */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              <div className="text-xs font-mono uppercase text-slate-500 font-bold">
                Product Specific Price Overrides (Per-SKU Contract Rates)
              </div>

              <div className="space-y-2">
                {products.map((product) => {
                  const currentOverride = selectedOrgForPricing.priceOverrides?.[product.id];
                  const hasOverride = currentOverride !== undefined;

                  return (
                    <div
                      key={product.id}
                      className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 flex items-center justify-between gap-4 text-xs transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 truncate">{product.name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {product.sku} &bull; {product.packSize} &bull; Standard Guide: £{product.basePrice.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[9px] uppercase font-mono text-slate-400 block">Contract Rate</span>
                          <div className="flex items-center gap-1">
                            <span className="text-slate-500 font-mono">£</span>
                            <input
                              type="number"
                              step="0.10"
                              placeholder={product.basePrice.toFixed(2)}
                              value={currentOverride ?? ''}
                              onChange={(e) => {
                                const val = e.target.value === '' ? null : Number(e.target.value);
                                updateCustomerPrice(selectedOrgForPricing.id, product.id, val);
                                setSelectedOrgForPricing({
                                  ...selectedOrgForPricing,
                                  priceOverrides: {
                                    ...(selectedOrgForPricing.priceOverrides || {}),
                                    ...(val === null ? {} : { [product.id]: val }),
                                  },
                                });
                              }}
                              className="w-20 bg-white border border-slate-200 rounded px-2 py-1 font-mono font-bold text-emerald-800 focus:outline-none focus:border-emerald-500 text-xs text-right shadow-sm"
                            />
                          </div>
                        </div>

                        {hasOverride && (
                          <button
                            onClick={() => {
                              updateCustomerPrice(selectedOrgForPricing.id, product.id, null);
                              const copy = { ...(selectedOrgForPricing.priceOverrides || {}) };
                              delete copy[product.id];
                              setSelectedOrgForPricing({
                                ...selectedOrgForPricing,
                                priceOverrides: copy,
                              });
                            }}
                            className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                            title="Remove Override (revert to tier discount)"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedOrgForPricing(null)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
              >
                Finished & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
