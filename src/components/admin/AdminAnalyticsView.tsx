'use client';

import React from 'react';
import { useAppStore } from '@/store/app-store';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Mail, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag,
  Award
} from 'lucide-react';

export function AdminAnalyticsView() {
  const { organizations, orders } = useAppStore();

  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrdersCount = orders.length;
  const aov = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;

  // Identify inactive customers (last ordered > 7 days ago, or no recent order)
  const inactiveCustomers = organizations.filter((org) => {
    if (!org.lastOrderDate) return true;
    const daysSince = (Date.now() - new Date(org.lastOrderDate).getTime()) / (1000 * 60 * 60 * 24);
    return daysSince >= 7;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase font-bold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Commercial Analytics & Customer Retention</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Executive Analytics & Revenue Metrics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor gross revenue, average order value, category performance, and proactive retention alerts.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">Total Portal Revenue</div>
          <div className="font-display text-3xl font-bold text-slate-900">
            £{totalRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-700 font-mono font-semibold">+18.4% vs last month</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">Average Order Value (AOV)</div>
          <div className="font-display text-3xl font-bold text-emerald-800">
            £{aov.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-500">Across {totalOrdersCount} fulfilled orders</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">Active Trade Accounts</div>
          <div className="font-display text-3xl font-bold text-slate-900">
            {organizations.length} Accounts
          </div>
          <div className="text-[11px] text-emerald-700 font-mono font-semibold">100% 30-day retention</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">Retention Health Flag</div>
          <div className="font-display text-3xl font-bold text-amber-600">
            {inactiveCustomers.length} At Risk
          </div>
          <div className="text-[11px] text-amber-700 font-mono font-semibold">No order placed in 7+ days</div>
        </div>
      </div>

      {/* Inactive Customer Retention Alerts */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-800 font-mono text-xs uppercase font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Automated Customer Retention & Reorder Alerts</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">Rule: Inactive &ge; 7 Days</span>
        </div>

        <div className="space-y-3">
          {inactiveCustomers.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800 flex items-center justify-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>All regular accounts have placed orders within the last 7 days!</span>
            </div>
          ) : (
            inactiveCustomers.map((org) => (
              <div
                key={org.id}
                className="p-4 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{org.name}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-mono border border-amber-200 font-semibold">
                      Last Order: {org.lastOrderDate || 'Never'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Sector: <strong className="capitalize">{org.sector.replace('_', ' ')}</strong> &bull; Assigned Rep: <strong className="text-slate-800">{org.assignedSalesRep}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() =>
                      alert(
                        `AI Reorder Email sent to ${org.name}:\n\n"Hi there! We noticed you haven't placed your usual weekly order for potatoes and spinach. Would you like to repeat your previous order in 1 click?"`
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Reorder Email Prompt</span>
                  </button>
                  <button
                    onClick={() => alert(`Calling Account Rep ${org.assignedSalesRep}...`)}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm cursor-pointer transition-colors"
                    title="Call customer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Best Sellers & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-display text-lg font-bold text-slate-900">Top High-Velocity SKUs</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
              <div>
                <strong className="text-slate-900 block font-semibold">San Marzano Vine Tomatoes (6kg)</strong>
                <span className="text-slate-500 font-mono text-[11px]">FP-TOM-01 &bull; Fresh Produce</span>
              </div>
              <span className="font-mono text-emerald-800 font-bold">142 Cases / Wk</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
              <div>
                <strong className="text-slate-900 block font-semibold">28-Day Dry-Aged Ribeye Steaks (2.5kg)</strong>
                <span className="text-slate-500 font-mono text-[11px]">FS-BEEF-10 &bull; Meat & Poultry</span>
              </div>
              <span className="font-mono text-emerald-800 font-bold">64 Packs / Wk</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
              <div>
                <strong className="text-slate-900 block font-semibold">British Lion Free Range Eggs (15 Doz)</strong>
                <span className="text-slate-500 font-mono text-[11px]">FS-EGG-09 &bull; Dairy & Eggs</span>
              </div>
              <span className="font-mono text-emerald-800 font-bold">88 Outers / Wk</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-display text-lg font-bold text-slate-900">Sales Distribution by Sector</h3>
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-700 mb-1.5 font-medium">
                <span>Fine Dining & Michelin Kitchens</span>
                <span className="font-mono text-slate-900 font-bold">42%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[42%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1.5 font-medium">
                <span>Hotels & Banqueting Operations</span>
                <span className="font-mono text-slate-900 font-bold">31%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[31%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1.5 font-medium">
                <span>Care Homes & Healthcare Facilities</span>
                <span className="font-mono text-slate-900 font-bold">18%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full w-[18%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1.5 font-medium">
                <span>Luxury Event Caterers & Pubs</span>
                <span className="font-mono text-slate-900 font-bold">9%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[9%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
