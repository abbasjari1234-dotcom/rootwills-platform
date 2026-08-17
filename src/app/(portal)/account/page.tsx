'use client';

import React, { useState } from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
import { 
  Building2, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Bell, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  Phone, 
  Mail,
  Sparkles
} from 'lucide-react';

export default function CustomerAccountSettingsPage() {
  const { currentOrgId, organizations, userProfile } = useDemoStore();
  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [notifications, setNotifications] = useState({
    smsArrival: true,
    emailInvoice: true,
    weeklyPromo: false,
    outOfStockAlert: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-cream/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-champagne uppercase font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Commercial Account & Multi-Site Configuration</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            {currentOrg.name} &bull; Account Management
          </h1>
          <p className="text-xs text-cream/60">
            Manage your kitchen locations, user permissions, and delivery preferences.
          </p>
        </div>

        {savedSuccess && (
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Settings Saved!</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Multi-Site Locations Manager */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-display text-xl font-bold text-cream flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-champagne" />
                  <span>Delivery Locations & Kitchen Drop Points</span>
                </h2>
                <p className="text-xs text-cream/50 mt-0.5">
                  Your kitchen venues and loading bay instructions
                </p>
              </div>
              <button
                onClick={() => alert('New kitchen location creation form')}
                className="px-3 py-1.5 rounded-lg bg-obsidian-900 border border-cream/20 hover:border-champagne text-xs text-cream font-medium flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 text-champagne" />
                <span>Add Site</span>
              </button>
            </div>

            <div className="space-y-4">
              {currentOrg.locations.map((loc) => (
                <div
                  key={loc.id}
                  className="p-4 rounded-xl bg-obsidian-950 border border-cream/10 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-cream text-sm">{loc.name}</strong>
                        {loc.isPrimary && (
                          <span className="px-2 py-0.5 rounded bg-champagne/10 text-champagne text-[10px] font-mono border border-champagne/20">
                            Primary Venue
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-cream/60 mt-0.5">
                        {loc.addressLine1}, {loc.city}, <span className="font-mono text-champagne">{loc.postcode}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Edit ${loc.name}`)}
                      className="text-xs text-cream/40 hover:text-cream"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-cream/5 text-[11px] text-cream/70">
                    <span className="font-mono text-champagne/80 uppercase text-[9px] block">Driver Drop Instructions</span>
                    <p className="italic text-cream/60 mt-0.5">
                      {loc.deliveryInstructions || 'Standard keyholder morning drop.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Permissions & User Roles */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-display text-xl font-bold text-cream flex items-center gap-2">
                  <Users className="w-5 h-5 text-champagne" />
                  <span>Authorized Users & Roles</span>
                </h2>
                <p className="text-xs text-cream/50 mt-0.5">
                  Control who in your team can place orders vs. manage invoices
                </p>
              </div>
              <button
                onClick={() => alert('Invite staff member to account')}
                className="px-3 py-1.5 rounded-lg bg-obsidian-900 border border-cream/20 hover:border-champagne text-xs text-cream font-medium flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 text-champagne" />
                <span>Invite User</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-obsidian-950 rounded-xl border border-cream/10 flex justify-between items-center">
                <div>
                  <div className="font-bold text-cream">{userProfile.fullName}</div>
                  <div className="text-[11px] text-cream/50">{userProfile.email}</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-champagne/10 text-champagne font-mono text-[10px] border border-champagne/20 capitalize">
                  {userProfile.role} (Full Ordering & Approval)
                </span>
              </div>

              <div className="p-3.5 bg-obsidian-950 rounded-xl border border-cream/10 flex justify-between items-center">
                <div>
                  <div className="font-bold text-cream">Finance & Accounts Controller</div>
                  <div className="text-[11px] text-cream/50">accounts@{currentOrg.name.toLowerCase().replace(/[^a-z]/g, '')}.co.uk</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 font-mono text-[10px] border border-purple-500/20">
                  Finance (Invoices & Statements Only)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Account Specs & Notifications */}
        <div className="space-y-6">
          {/* Trade Terms Overview */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 text-xs">
            <h3 className="font-display text-lg font-bold text-cream flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-champagne" />
              <span>Commercial Terms</span>
            </h3>

            <div className="space-y-2.5 text-cream/70 font-mono">
              <div className="flex justify-between">
                <span>Account Status:</span>
                <span className="text-emerald-400 font-bold uppercase">Active Approved</span>
              </div>
              <div className="flex justify-between">
                <span>Credit Limit:</span>
                <span className="text-cream font-bold">£{currentOrg.creditLimit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Terms:</span>
                <span className="text-champagne font-bold">{currentOrg.paymentTerms}</span>
              </div>
              <div className="flex justify-between">
                <span>Assigned Depot:</span>
                <span className="text-cream">{currentOrg.assignedDepot}</span>
              </div>
            </div>
          </div>

          {/* Notifications Preferences */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 text-xs">
            <h3 className="font-display text-lg font-bold text-cream flex items-center gap-2">
              <Bell className="w-4 h-4 text-champagne" />
              <span>Alert Preferences</span>
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span>Driver Arrival SMS Alerts</span>
                <input
                  type="checkbox"
                  checked={notifications.smsArrival}
                  onChange={(e) => setNotifications({ ...notifications, smsArrival: e.target.checked })}
                  className="w-4 h-4 accent-champagne cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>Invoice Issued Email Alerts</span>
                <input
                  type="checkbox"
                  checked={notifications.emailInvoice}
                  onChange={(e) => setNotifications({ ...notifications, emailInvoice: e.target.checked })}
                  className="w-4 h-4 accent-champagne cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>Out of Stock Substitution Prompts</span>
                <input
                  type="checkbox"
                  checked={notifications.outOfStockAlert}
                  onChange={(e) => setNotifications({ ...notifications, outOfStockAlert: e.target.checked })}
                  className="w-4 h-4 accent-champagne cursor-pointer"
                />
              </label>

              <button
                type="submit"
                className="w-full mt-3 py-2 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110"
              >
                Save Notification Settings
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
