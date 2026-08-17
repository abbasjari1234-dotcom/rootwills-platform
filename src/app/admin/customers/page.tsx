'use client';

import React, { useState } from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
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

export default function CustomersPricingPage() {
  const { 
    organizations, 
    products, 
    updateCustomerPrice, 
    updateCustomerCredit 
  } = useDemoStore();

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
    <div className="p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-cream/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 uppercase font-bold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Commercial Accounts & Pricing Matrix</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            Customer Trade Terms & Custom Price Overrides
          </h1>
          <p className="text-xs text-cream/60">
            Set customer-specific contract prices, volume discount tiers, and manage commercial credit lines.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search customer, sector, or sales rep..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-obsidian-900 border border-cream/20 rounded-xl pl-10 pr-4 py-2 text-xs text-cream focus:outline-none focus:border-emerald-400"
        />
      </div>

      {/* Customers Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-cream/15">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-obsidian-950 text-cream/50 uppercase font-mono text-[10px] border-b border-cream/10">
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
            <tbody className="divide-y divide-cream/5">
              {filteredOrgs.map((org) => {
                const overrideCount = Object.keys(org.priceOverrides || {}).length;
                const availableCredit = Math.max(0, org.creditLimit - org.creditUsed);

                return (
                  <tr key={org.id} className="hover:bg-obsidian-900/60 transition-colors">
                    <td className="p-4 pl-5">
                      <div className="font-bold text-cream text-sm">{org.name}</div>
                      <div className="text-[10px] text-cream/40">
                        {org.locations.length} site(s) &bull; {org.locations[0]?.city}
                      </div>
                    </td>
                    <td className="p-4 capitalize text-cream/70 font-mono text-[11px]">
                      {org.sector.replace('_', ' ')}
                    </td>
                    <td className="p-4 font-mono font-bold text-cream">
                      £{org.creditLimit.toLocaleString()}
                    </td>
                    <td className="p-4 font-mono text-emerald-400">
                      £{org.creditUsed.toFixed(2)}
                      <span className="text-[10px] text-cream/40 block">£{availableCredit.toFixed(2)} avail</span>
                    </td>
                    <td className="p-4 font-mono text-champagne font-bold">
                      {org.paymentTerms}
                    </td>
                    <td className="p-4">
                      {overrideCount > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-champagne/10 text-champagne text-[10px] font-mono border border-champagne/30">
                          {overrideCount} SKUs Overridden
                        </span>
                      ) : (
                        <span className="text-cream/40 text-[10px]">Tier Discount Only</span>
                      )}
                    </td>
                    <td className="p-4 text-cream/70 text-[11px]">
                      {org.assignedSalesRep}
                    </td>
                    <td className="p-4 pr-5 text-right">
                      <button
                        onClick={() => handleOpenPricingModal(org)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-obsidian-950 font-bold text-xs shadow-emerald-glow hover:brightness-110 flex items-center gap-1.5 ml-auto"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Manage Pricing & Credit</span>
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
        <div className="fixed inset-0 z-50 bg-obsidian-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-900 border border-emerald-500/40 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-cream/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                  Bespoke Pricing Matrix & Terms
                </span>
                <h3 className="font-display text-2xl font-bold text-cream mt-0.5">
                  {selectedOrgForPricing.name}
                </h3>
                <p className="text-xs text-cream/50">
                  Sector: {selectedOrgForPricing.sector.replace('_', ' ')} &bull; Base Discount Tier: {selectedOrgForPricing.discountTierPercent || 0}%
                </p>
              </div>
              <button
                onClick={() => setSelectedOrgForPricing(null)}
                className="text-cream/50 hover:text-cream text-base"
              >
                ✕
              </button>
            </div>

            {/* Quick Credit & Terms Adjuster */}
            <div className="p-4 rounded-xl bg-obsidian-950 border border-cream/10 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end text-xs">
              <div>
                <label className="block text-cream/60 uppercase font-mono text-[10px] mb-1">
                  Trade Credit Limit (£)
                </label>
                <input
                  type="number"
                  step="500"
                  value={editingCreditLimit}
                  onChange={(e) => setEditingCreditLimit(Number(e.target.value))}
                  className="w-full bg-obsidian-900 border border-cream/20 rounded-lg p-2 font-mono font-bold text-cream focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-cream/60 uppercase font-mono text-[10px] mb-1">
                  Payment Terms
                </label>
                <select
                  value={editingPaymentTerms}
                  onChange={(e) => setEditingPaymentTerms(e.target.value)}
                  className="w-full bg-obsidian-900 border border-cream/20 rounded-lg p-2 font-mono text-cream focus:outline-none focus:border-emerald-400"
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
                className="py-2.5 px-4 bg-obsidian-800 hover:bg-emerald-500 hover:text-obsidian-950 border border-cream/20 text-cream font-bold rounded-lg transition-all"
              >
                Update Terms
              </button>
            </div>

            {/* SKU Specific Price Override Matrix */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              <div className="text-xs font-mono uppercase text-champagne font-bold">
                Product Specific Price Overrides (Per-SKU Contract Rates)
              </div>

              <div className="space-y-2">
                {products.map((product) => {
                  const currentOverride = selectedOrgForPricing.priceOverrides?.[product.id];
                  const hasOverride = currentOverride !== undefined;

                  return (
                    <div
                      key={product.id}
                      className="p-3 bg-obsidian-950 rounded-xl border border-cream/10 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-cream truncate">{product.name}</div>
                        <div className="text-[10px] text-cream/40">
                          {product.sku} &bull; {product.packSize} &bull; Standard Price: £{product.basePrice.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[9px] uppercase font-mono text-cream/40 block">Contract Price</span>
                          <div className="flex items-center gap-1">
                            <span className="text-cream font-mono">£</span>
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
                              className="w-20 bg-obsidian-900 border border-cream/20 rounded px-2 py-1 font-mono font-bold text-champagne focus:outline-none focus:border-champagne text-xs text-right"
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
                            className="text-cream/30 hover:text-rose-400 p-1"
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

            <div className="pt-3 border-t border-cream/10 flex justify-end">
              <button
                onClick={() => setSelectedOrgForPricing(null)}
                className="px-6 py-2.5 bg-emerald-500 text-obsidian-950 font-bold text-xs rounded-xl shadow-emerald-glow"
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
