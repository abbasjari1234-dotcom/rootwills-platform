'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { 
  Building2, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Bell, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  Landmark, 
  Trash2, 
  Download, 
  AlertTriangle,
  BadgeCheck
} from 'lucide-react';
import { deleteUserAccountServerAction, exportUserPersonalDataServerAction } from '@/actions/account';

export function PortalAccountView() {
  const { currentOrgId, organizations, userProfile } = useAppStore();
  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [notifications, setNotifications] = useState({
    smsArrival: true,
    emailInvoice: true,
    weeklyPromo: false,
    outOfStockAlert: true,
  });

  // GDPR Deletion State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportData = async () => {
    try {
      const res = await exportUserPersonalDataServerAction();
      if (res.ok && res.data) {
        const jsonBlob = new Blob([JSON.stringify(res.data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(jsonBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rootwills-gdpr-data-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch {
      alert('Could not export personal data. Please contact support.');
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmText.trim().toUpperCase() !== 'DELETE') return;
    setIsDeleting(true);
    try {
      const res = await deleteUserAccountServerAction();
      if (res.ok) {
        setDeleteStatus('Account and personal data erased. Redirecting to home...');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setDeleteStatus(res.message || 'Deletion error');
        setIsDeleting(false);
      }
    } catch (err: any) {
      setDeleteStatus(err?.message || 'Error executing account deletion');
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Commercial Account & Multi-Site Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Account Settings & Kitchen Profile
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {currentOrg.name} &bull; Manage your delivery locations, authorized kitchen staff, and automated BACS billing.
          </p>
        </div>

        {savedSuccess && (
          <span className="px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium flex items-center gap-1.5 shadow-xs animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Preferences saved successfully</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Multi-Site Locations Manager */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span>Delivery Locations & Drop Points</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Designated kitchen venues, access codes, and driver loading bay instructions
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert('New kitchen location creation form')}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs text-slate-700 font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4 text-slate-500" />
                <span>Add Site</span>
              </button>
            </div>

            <div className="space-y-3">
              {currentOrg.locations.map((loc) => (
                <div
                  key={loc.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-slate-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900 text-sm font-semibold">{loc.name}</strong>
                        {loc.isPrimary && (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                            Primary Venue
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        {loc.addressLine1}, {loc.city}, <span className="font-mono font-medium text-slate-900">{loc.postcode}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert(`Edit ${loc.name}`)}
                      className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
                      title={`Edit ${loc.name}`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-700">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Driver Drop Instructions</span>
                    <p className="text-slate-600 mt-0.5 italic">
                      &ldquo;{loc.deliveryInstructions || 'Standard keyholder morning drop.'}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Permissions & User Roles */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>Authorized Users & Roles</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Control who can build baskets, authorize PO spend, or export financial statements
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert('Invite staff member to account')}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs text-slate-700 font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4 text-slate-500" />
                <span>Invite Staff</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{userProfile.fullName}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{userProfile.email}</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-medium text-xs border border-emerald-200 capitalize">
                  {userProfile.role} (Full Ordering & Approval)
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-900 text-sm">Finance & Accounts Controller</div>
                  <div className="text-xs text-slate-500 mt-0.5">accounts@{currentOrg.name.toLowerCase().replace(/[^a-z]/g, '')}.co.uk</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200">
                  Finance (Invoices & Statements Only)
                </span>
              </div>
            </div>
          </div>

          {/* GDPR Privacy & Right to Erasure Section */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Privacy & UK GDPR Compliance</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Exercise your statutory UK GDPR rights, export machine-readable files, or request account closure.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={handleExportData}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 text-left transition-all group"
              >
                <span className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
                  <Download className="w-4 h-4" />
                  <span>Export Personal Data (JSON)</span>
                </span>
                <span className="block text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Download a complete, machine-readable export of your verified profile, addresses, and account logs.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="p-4 rounded-xl bg-rose-50/40 border border-rose-200 hover:border-rose-300 hover:bg-rose-50 text-left transition-all group"
              >
                <span className="flex items-center gap-2 text-rose-700 text-xs font-bold">
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  <span>Erase Account & Personal Data</span>
                </span>
                <span className="block text-xs text-rose-700/70 mt-1.5 leading-relaxed">
                  Permanently anonymize personal profile credentials, revoke sessions, and close commercial access.
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Banking, Trade Terms & Notifications */}
        <div className="space-y-6">
          {/* Automated BACS Direct Debit Card */}
          <div className="bg-white border border-emerald-200 rounded-xl p-6 shadow-xs space-y-4 text-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-8 -mt-8 -z-0" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">BACS Direct Debit</h3>
                    <p className="text-[11px] text-slate-500">Automated settlement</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  ACTIVE MANDATE
                </span>
              </div>

              <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Direct Debit Scheme:</span>
                  <span className="text-slate-900 font-semibold">UK BACS</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Account Ending:</span>
                  <span className="text-slate-900 font-mono font-bold">•••• 4192</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Settlement Terms:</span>
                  <span className="text-emerald-700 font-bold">{currentOrg.paymentTerms}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Protected by the UK Direct Debit Guarantee</span>
              </div>
            </div>
          </div>

          {/* Trade Terms Overview */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              <span>Commercial Terms</span>
            </h3>

            <div className="space-y-2.5 text-slate-600 divide-y divide-slate-100">
              <div className="flex justify-between pt-1">
                <span>Account Status:</span>
                <span className="text-emerald-700 font-bold uppercase">Active Approved</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>Credit Limit:</span>
                <span className="text-slate-900 font-bold font-mono">£{currentOrg.creditLimit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>Payment Terms:</span>
                <span className="text-slate-900 font-bold">{currentOrg.paymentTerms}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>Assigned Hub Depot:</span>
                <span className="text-slate-900 font-medium">{currentOrg.assignedDepot}</span>
              </div>
            </div>
          </div>

          {/* Notifications Preferences */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-600" />
              <span>Alert Preferences</span>
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <span className="text-slate-700 font-medium">Driver Arrival SMS Alerts</span>
                <input
                  type="checkbox"
                  checked={notifications.smsArrival}
                  onChange={(e) => setNotifications({ ...notifications, smsArrival: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <span className="text-slate-700 font-medium">Invoice Issued Email Alerts</span>
                <input
                  type="checkbox"
                  checked={notifications.emailInvoice}
                  onChange={(e) => setNotifications({ ...notifications, emailInvoice: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <span className="text-slate-700 font-medium">Out of Stock Substitution Alerts</span>
                <input
                  type="checkbox"
                  checked={notifications.outOfStockAlert}
                  onChange={(e) => setNotifications({ ...notifications, outOfStockAlert: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />
              </label>

              <button
                type="submit"
                className="w-full mt-3 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                Save Alert Settings
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Account Deletion Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Erase Account & Personal Data?
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Under UK GDPR (Right to Erasure), your personal profile, contact information, and authentication sessions will be permanently deleted and anonymized. Active outstanding invoices remain archived for financial compliance.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Type <span className="text-rose-600 font-bold">DELETE</span> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
              />
            </div>

            {deleteStatus && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono">
                {deleteStatus}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting || deleteConfirmText.trim().toUpperCase() !== 'DELETE'}
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-all shadow-xs disabled:opacity-40"
              >
                {isDeleting ? 'Erasing Data...' : 'Confirm Permanent Erasure'}
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                  setDeleteStatus(null);
                }}
                className="px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
