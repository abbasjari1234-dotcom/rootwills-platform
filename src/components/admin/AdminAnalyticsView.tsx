'use client';

import React from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
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
  const { organizations, orders } = useDemoStore();

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
    <div className="p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-cream/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 uppercase font-bold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Commercial Analytics & Customer Retention</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            Executive Analytics & Revenue Metrics
          </h1>
          <p className="text-xs text-cream/60">
            Monitor gross revenue, average order value, category performance, and proactive retention alerts.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-2xl space-y-2">
          <div className="text-[11px] font-mono uppercase text-cream/50">Total Portal Revenue</div>
          <div className="font-display text-3xl font-bold text-cream">
            £{totalRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-emerald-400 font-mono">+18.4% vs last month</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-2">
          <div className="text-[11px] font-mono uppercase text-cream/50">Average Order Value (AOV)</div>
          <div className="font-display text-3xl font-bold text-champagne">
            £{aov.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-cream/40">Across {totalOrdersCount} fulfilled orders</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-2">
          <div className="text-[11px] font-mono uppercase text-cream/50">Active Trade Accounts</div>
          <div className="font-display text-3xl font-bold text-cream">
            {organizations.length} Accounts
          </div>
          <div className="text-[10px] text-emerald-400 font-mono">100% 30-day retention</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-2">
          <div className="text-[11px] font-mono uppercase text-cream/50">Retention Health Flag</div>
          <div className="font-display text-3xl font-bold text-amber-400">
            {inactiveCustomers.length} At Risk
          </div>
          <div className="text-[10px] text-amber-300 font-mono">No order placed in 7+ days</div>
        </div>
      </div>

      {/* Inactive Customer Retention Alerts */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-amber-500/30 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>Automated Customer Retention & Reorder Alerts</span>
          </div>
          <span className="text-xs text-cream/40 font-mono">Rule: Inactive &ge; 7 Days</span>
        </div>

        <div className="space-y-3">
          {inactiveCustomers.length === 0 ? (
            <div className="p-4 rounded-xl bg-obsidian-950 text-center text-xs text-emerald-400 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>All regular accounts have placed orders within the last 7 days!</span>
            </div>
          ) : (
            inactiveCustomers.map((org) => (
              <div
                key={org.id}
                className="p-4 bg-obsidian-950 rounded-xl border border-amber-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-cream text-sm">{org.name}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono border border-amber-500/20">
                      Last Order: {org.lastOrderDate || 'Never'}
                    </span>
                  </div>
                  <div className="text-xs text-cream/60">
                    Sector: {org.sector.replace('_', ' ')} &bull; Assigned Rep: <strong>{org.assignedSalesRep}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() =>
                      alert(
                        `AI Reorder Email sent to ${org.name}:\n\n"Hi there! We noticed you haven't placed your usual weekly order for potatoes and spinach. Would you like to repeat your previous order in 1 click?"`
                      )
                    }
                    className="px-3.5 py-2 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-obsidian-950 font-bold text-xs border border-amber-500/30 flex items-center gap-1.5 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Reorder Email Prompt</span>
                  </button>
                  <button
                    onClick={() => alert(`Calling Account Rep ${org.assignedSalesRep}...`)}
                    className="p-2 rounded-lg bg-obsidian-900 border border-cream/15 text-cream/70 hover:text-cream"
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
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="font-display text-lg font-bold text-cream">Top High-Velocity SKUs</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-obsidian-950 rounded-xl flex justify-between items-center">
              <div>
                <strong className="text-cream block">San Marzano Vine Tomatoes (6kg)</strong>
                <span className="text-cream/40 font-mono">FP-TOM-01 &bull; Fresh Produce</span>
              </div>
              <span className="font-mono text-champagne font-bold">142 Cases / Wk</span>
            </div>
            <div className="p-3 bg-obsidian-950 rounded-xl flex justify-between items-center">
              <div>
                <strong className="text-cream block">28-Day Dry-Aged Ribeye Steaks (2.5kg)</strong>
                <span className="text-cream/40 font-mono">FS-BEEF-10 &bull; Meat & Poultry</span>
              </div>
              <span className="font-mono text-champagne font-bold">64 Packs / Wk</span>
            </div>
            <div className="p-3 bg-obsidian-950 rounded-xl flex justify-between items-center">
              <div>
                <strong className="text-cream block">British Lion Free Range Eggs (15 Doz)</strong>
                <span className="text-cream/40 font-mono">FS-EGG-09 &bull; Dairy & Eggs</span>
              </div>
              <span className="font-mono text-champagne font-bold">88 Outers / Wk</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="font-display text-lg font-bold text-cream">Sales Distribution by Sector</h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-cream/70 mb-1">
                <span>Fine Dining & Michelin Kitchens</span>
                <span className="font-mono text-cream font-bold">42%</span>
              </div>
              <div className="w-full bg-obsidian-950 h-2 rounded-full overflow-hidden">
                <div className="bg-champagne h-full w-[42%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-cream/70 mb-1">
                <span>Hotels & Banqueting Operations</span>
                <span className="font-mono text-cream font-bold">31%</span>
              </div>
              <div className="w-full bg-obsidian-950 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[31%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-cream/70 mb-1">
                <span>Care Homes & Healthcare Facilities</span>
                <span className="font-mono text-cream font-bold">18%</span>
              </div>
              <div className="w-full bg-obsidian-950 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-400 h-full w-[18%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-cream/70 mb-1">
                <span>Luxury Event Caterers & Pubs</span>
                <span className="font-mono text-cream font-bold">9%</span>
              </div>
              <div className="w-full bg-obsidian-950 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full w-[9%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
