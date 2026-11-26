'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Calendar,
  Building2,
  CreditCard,
  TrendingUp,
  FileText,
  ChevronRight,
  UserCheck,
  Shield,
  Briefcase,
  Key,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Pencil,
  Trash2,
  UserPlus,
  X,
  Lock,
} from 'lucide-react';

interface CustomerAccount {
  id: string;
  slNo: number;
  name: string;
  segment: string;
  description: string;
  headChef: string;
  phone: string;
  email: string;
  assignedReps: { name: string; avatar: string }[];
  dueDate: string;
  priority: 'Urgent' | 'Normal' | 'Low';
  creditUtilized: number; // percentage
  spendMonth: string;
  paymentTerms: string;
  postcode?: string;
  deliveryNotes?: string;
  isApproved?: boolean;
  approvedId?: string;
  approvedPassword?: string;
  isWebLead?: boolean;
}

const INITIAL_ACCOUNTS: CustomerAccount[] = [
  {
    id: 'cust-1',
    slNo: 1,
    name: 'The Savoy London (Fairmont)',
    segment: 'Luxury Hotel & Fine Dining',
    description: 'Daily fresh butchery, prime Cornish seafood & patisserie deliveries.',
    headChef: 'Chef Thierry M.',
    phone: '+44 20 7836 4343',
    email: 'purchasing@savoy.london',
    assignedReps: [
      { name: 'Floyd Miles', avatar: 'FM' },
      { name: 'Sarah J.', avatar: 'SJ' },
    ],
    dueDate: 'Dec 25, 2026',
    priority: 'Normal',
    creditUtilized: 38,
    spendMonth: '£18,450',
    paymentTerms: '30 Days Net',
    isApproved: true,
    approvedId: 'RW-2026-89412',
  },
  {
    id: 'cust-2',
    slNo: 2,
    name: 'Dishoom Covent Garden',
    segment: 'High-Volume Casual Hospitality',
    description: 'Weekly bulk grains, spices, haldiram pantry, dairy & chicken thighs.',
    headChef: 'Chef Kavi Patel',
    phone: '+44 20 7420 9320',
    email: 'covent@dishoom.co.uk',
    assignedReps: [
      { name: 'Sarah J.', avatar: 'SJ' },
      { name: 'Liam Cooper', avatar: 'LC' },
    ],
    dueDate: 'Dec 25, 2026',
    priority: 'Normal',
    creditUtilized: 54,
    spendMonth: '£12,320',
    paymentTerms: '14 Days Net',
    isApproved: true,
    approvedId: 'RW-2026-44210',
  },
  {
    id: 'cust-3',
    slNo: 3,
    name: 'Hawksmoor Wood Wharf',
    segment: 'Prime Steakhouse Group',
    description: 'Dry-aged British beef primal loins, marrow bones & beef dripping.',
    headChef: 'Chef Richard Turner',
    phone: '+44 20 3988 0510',
    email: 'butchery@thehawksmoor.com',
    assignedReps: [{ name: 'Floyd Miles', avatar: 'FM' }],
    dueDate: 'Dec 25, 2026',
    priority: 'Normal',
    creditUtilized: 28,
    spendMonth: '£24,800',
    paymentTerms: '30 Days Net',
    isApproved: true,
    approvedId: 'RW-2026-31908',
  },
  {
    id: 'cust-4',
    slNo: 4,
    name: 'Gordon Ramsay Bar & Grill',
    segment: 'Fine Dining & Grill',
    description: 'Specialty poultry, duck confit, fresh truffle produce & brioche buns.',
    headChef: 'Chef Luke S.',
    phone: '+44 20 7592 1370',
    email: 'grill-orders@gordonramsay.com',
    assignedReps: [
      { name: 'Floyd Miles', avatar: 'FM' },
      { name: 'Elena Rostova', avatar: 'ER' },
    ],
    dueDate: 'Dec 25, 2026',
    priority: 'Normal',
    creditUtilized: 72,
    spendMonth: '£16,190',
    paymentTerms: '30 Days Net',
    isApproved: true,
    approvedId: 'RW-2026-66741',
  },
  {
    id: 'cust-5',
    slNo: 5,
    name: 'Soho Farmhouse Hospitality',
    segment: 'Private Members Club & Retreat',
    description: 'Full organic farm supply, artisan cheeses, cured fish & morning bake-off.',
    headChef: 'Chef Julian C.',
    phone: '+44 16 0869 1000',
    email: 'farmhouse.kitchen@sohohouse.com',
    assignedReps: [{ name: 'Liam Cooper', avatar: 'LC' }],
    dueDate: 'Dec 26, 2026',
    priority: 'Low',
    creditUtilized: 19,
    spendMonth: '£9,850',
    paymentTerms: '7 Days Net',
    isApproved: true,
  },
  {
    id: 'cust-6',
    slNo: 6,
    name: 'Nobu Hotel Portman Square',
    segment: 'High-End Japanese & Asian Cuisine',
    description: 'Premium sushi rice, tempura flours, sashimi-grade tuna & mirin glazes.',
    headChef: 'Chef Mark Edwards',
    phone: '+44 20 3988 5888',
    email: 'procurement@nobuportman.com',
    assignedReps: [
      { name: 'Sarah J.', avatar: 'SJ' },
      { name: 'Floyd Miles', avatar: 'FM' },
    ],
    dueDate: 'Dec 26, 2026',
    priority: 'Normal',
    creditUtilized: 46,
    spendMonth: '£21,400',
    paymentTerms: '30 Days Net',
    isApproved: true,
  },
  {
    id: 'cust-lds',
    slNo: 7,
    name: 'Little Dessert Shop (Franchise Network)',
    segment: 'National Dessert & Gelato Franchise',
    description: 'Fresh double creams, barista milk, butter blocks, soft berries, waffle mixes & frozen cookie dough.',
    headChef: 'Store Operations Director',
    phone: '+44 1902 904944',
    email: 'orders@littledessertshop.co.uk',
    assignedReps: [
      { name: 'Rootwills Trade Desk', avatar: 'RW' },
    ],
    dueDate: 'Active Account',
    priority: 'Urgent',
    creditUtilized: 12,
    spendMonth: '£8,500',
    paymentTerms: '14 Days Net',
    isApproved: true,
    approvedId: 'RW-2026-LDS',
    approvedPassword: 'DessertShop2026!',
  },
  {
    id: 'cust-pyaali',
    slNo: 8,
    name: 'Pyaali By Jaan (Pyaali Limited)',
    segment: 'Artisan Chai, Brunch & Specialty Café',
    description: 'Daily barista whole milk, chai spices, desi breakfast bakery, brioche, cooking oils, poultry & pre-dawn chilled drops.',
    headChef: 'General Manager / Procurement',
    phone: '+44 121 820 3610',
    email: 'orders@pyaali.co.uk',
    assignedReps: [
      { name: 'Rootwills Trade Desk', avatar: 'RW' },
    ],
    dueDate: 'Active Account',
    priority: 'Urgent',
    creditUtilized: 14,
    spendMonth: '£4,250',
    paymentTerms: '14 Days Net',
    isApproved: true,
    approvedId: 'RW-2026-PYAALI',
    approvedPassword: 'Pyaali2026!',
  },
];

export default function CustomerCRMHub() {
  const [accounts, setAccounts] = useState<CustomerAccount[]>(INITIAL_ACCOUNTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [selectedAccount, setSelectedAccount] = useState<CustomerAccount | null>(null);
  const [approvedCredentialsModal, setApprovedCredentialsModal] = useState<any | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [isLoadingLeads, setIsLoadingLeads] = useState<boolean>(true);

  // Edit Account & Add Account Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingAccount, setEditingAccount] = useState<CustomerAccount | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [newAccountForm, setNewAccountForm] = useState({
    name: '',
    headChef: '',
    email: '',
    phone: '',
    postcode: '',
    segment: 'Fine Dining & Hospitality',
    spendMonth: '£4,500',
    paymentTerms: '14 Days Net',
    priority: 'Normal' as 'Urgent' | 'Normal' | 'Low',
    password: `Trade${new Date().getFullYear()}!`,
    description: '',
    deliveryNotes: '',
  });

  const persistAccounts = (newAccounts: CustomerAccount[]) => {
    setAccounts(newAccounts);
    try {
      localStorage.setItem('rootwills_crm_accounts_v2', JSON.stringify(newAccounts));
    } catch {
      // ignore
    }
  };

  const handleOpenEditModal = (account: CustomerAccount) => {
    setEditingAccount({ ...account });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccount) return;
    setIsSaving(true);

    try {
      await fetch('/api/admin/crm/approve', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingAccount.id,
          name: editingAccount.name,
          headChef: editingAccount.headChef,
          email: editingAccount.email,
          phone: editingAccount.phone,
          postcode: editingAccount.postcode,
          segment: editingAccount.segment,
          spendMonth: editingAccount.spendMonth,
          paymentTerms: editingAccount.paymentTerms,
          priority: editingAccount.priority,
          plainPassword: editingAccount.approvedPassword,
          description: editingAccount.description,
          deliveryNotes: editingAccount.deliveryNotes,
        }),
      });

      const updated = accounts.map((a) =>
        a.id === editingAccount.id ? { ...a, ...editingAccount } : a
      );
      persistAccounts(updated);
      if (selectedAccount && selectedAccount.id === editingAccount.id) {
        setSelectedAccount({ ...selectedAccount, ...editingAccount });
      }
      setIsEditModalOpen(false);
      setEditingAccount(null);
    } catch (err: any) {
      alert(err.message || 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async (account: CustomerAccount) => {
    if (!window.confirm(`Are you sure you want to delete "${account.name}"? This will revoke their commercial trade access.`)) {
      return;
    }

    try {
      await fetch('/api/admin/crm/approve', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: account.id, email: account.email }),
      });

      const updated = accounts.filter((a) => a.id !== account.id);
      persistAccounts(updated);
      if (selectedAccount && selectedAccount.id === account.id) {
        setSelectedAccount(null);
      }
      if (isEditModalOpen && editingAccount?.id === account.id) {
        setIsEditModalOpen(false);
        setEditingAccount(null);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete account');
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountForm.name.trim() || !newAccountForm.email.trim()) {
      alert('Please provide Company Name and Email.');
      return;
    }
    setIsSaving(true);

    try {
      const res = await fetch('/api/admin/crm/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: newAccountForm.name.trim(),
          contactName: (newAccountForm.headChef || 'General Manager').trim(),
          email: newAccountForm.email.trim(),
          phone: newAccountForm.phone.trim() || '+44 121 000 0000',
          postcode: (newAccountForm.postcode || 'UK').trim(),
          tier: newAccountForm.segment.trim(),
          plainPassword: newAccountForm.password || `Trade${new Date().getFullYear()}!`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const created: CustomerAccount = {
          id: data.credentials.id || `RW-${Date.now()}`,
          slNo: accounts.length + 1,
          name: newAccountForm.name.trim(),
          segment: newAccountForm.segment.trim(),
          description: newAccountForm.description.trim() || 'Pre-dawn wholesale food supply schedule.',
          headChef: (newAccountForm.headChef || 'General Manager').trim(),
          phone: newAccountForm.phone.trim(),
          email: newAccountForm.email.trim(),
          assignedReps: [{ name: 'Rootwills Trade Desk', avatar: 'RW' }],
          dueDate: 'Active Account',
          priority: newAccountForm.priority,
          creditUtilized: 10,
          spendMonth: newAccountForm.spendMonth || '£3,500',
          paymentTerms: newAccountForm.paymentTerms || '14 Days Net',
          postcode: newAccountForm.postcode,
          deliveryNotes: newAccountForm.deliveryNotes,
          isApproved: true,
          approvedId: data.credentials.id,
          approvedPassword: data.credentials.password,
        };

        const updated = [created, ...accounts];
        persistAccounts(updated);
        setIsAddModalOpen(false);
        setNewAccountForm({
          name: '',
          headChef: '',
          email: '',
          phone: '',
          postcode: '',
          segment: 'Fine Dining & Hospitality',
          spendMonth: '£4,500',
          paymentTerms: '14 Days Net',
          priority: 'Normal',
          password: `Trade${new Date().getFullYear()}!`,
          description: '',
          deliveryNotes: '',
        });
        setApprovedCredentialsModal(data.credentials);
      } else {
        alert(data.error || 'Failed to create account');
      }
    } catch (err: any) {
      alert(err.message || 'Network error');
    } finally {
      setIsSaving(false);
    }
  };

  // Fetch live applications & leads on mount and merge with localStorage
  useEffect(() => {
    const fetchLiveLeads = async () => {
      try {
        let localSaved: CustomerAccount[] | null = null;
        try {
          const raw = localStorage.getItem('rootwills_crm_accounts_v2');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
              localSaved = parsed;
            }
          }
        } catch {
          // ignore
        }

        const res = await fetch('/api/admin/crm/approve');
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.leads) && data.leads.length > 0) {
            const base = localSaved || INITIAL_ACCOUNTS;
            const existingIds = new Set(base.map((a) => a.id));
            const newLeads = data.leads.filter((l: any) => !existingIds.has(l.id));
            const merged = [...newLeads, ...base];
            setAccounts(merged);
            return;
          }
        }
        if (localSaved) {
          setAccounts(localSaved);
        }
      } catch (err) {
        console.error('Failed to load CRM leads from database:', err);
      } finally {
        setIsLoadingLeads(false);
      }
    };

    fetchLiveLeads();
  }, []);

  const handleApproveAccount = async (account: CustomerAccount) => {
    setApprovingId(account.id);
    try {
      const res = await fetch('/api/admin/crm/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: account.isWebLead ? account.id : undefined,
          company: account.name,
          contactName: account.headChef,
          email: account.email,
          phone: account.phone,
          postcode: (account as any).postcode || 'UK',
          tier: account.segment,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAccounts((prev) =>
          prev.map((a) =>
            a.id === account.id
              ? {
                  ...a,
                  isApproved: true,
                  approvedId: data.credentials.id,
                  approvedPassword: data.credentials.password,
                  priority: 'Normal',
                }
              : a
          )
        );
        setApprovedCredentialsModal(data.credentials);
        if (selectedAccount && selectedAccount.id === account.id) {
          setSelectedAccount({
            ...selectedAccount,
            isApproved: true,
            approvedId: data.credentials.id,
            approvedPassword: data.credentials.password,
          });
        }
      } else {
        alert(data.error || 'Failed to approve account');
      }
    } catch (e: any) {
      alert(e.message || 'Network error');
    } finally {
      setApprovingId(null);
    }
  };

  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const pendingApprovalsCount = accounts.filter((acc) => !acc.isApproved).length;

  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch =
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.headChef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.segment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'All' || acc.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* ══════════════════════════════════════════════════════════════
          TOP KPI STAT CARDS (Matching Image 2 Reference)
          ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Hospitality Accounts */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">240</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Hospitality Accounts Active</div>
          </div>
          {/* Subtle background wave graph */}
          <div className="absolute right-3 bottom-2 opacity-25">
            <div className="flex items-end gap-1 h-14">
              {[30, 45, 60, 40, 80, 95, 100].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="w-2 bg-emerald-500 rounded-t-sm" />
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Files / Orders This Month */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">128</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Standing Weekly Orders</div>
          </div>
          <div className="absolute right-3 bottom-2 opacity-25">
            <div className="w-16 h-12 rounded-tl-full bg-cyan-400" />
          </div>
        </div>

        {/* Card 3: Pending Tasks & Urgent Approvals */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">{pendingApprovalsCount}</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Pending Account Approvals</div>
          </div>
          {pendingApprovalsCount > 0 ? (
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-rose-50 text-rose-600 animate-pulse">
              Requires Review
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-600">
              All Verified
            </span>
          )}
        </div>

        {/* Card 4: Health Donut Ring Gauge (from Image 2) */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="relative flex items-center justify-center">
            {/* Circular Ring */}
            <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-emerald-500 border-r-cyan-400 border-b-rose-400 relative flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs font-black text-slate-900">150</div>
                <div className="text-[8px] text-slate-400 uppercase">Total</div>
              </div>
            </div>
          </div>
          <div className="space-y-1 text-right text-[11px]">
            <div className="flex items-center justify-end gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Fulfilled (85%)</span>
            </div>
            <div className="flex items-center justify-end gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Pending (10%)</span>
            </div>
            <div className="flex items-center justify-end gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>On Hold (5%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MAIN BODY: TABLE & RIGHT-SIDE PANELS (Matching Image 2)
          ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / CENTER: Hospitality Accounts & Live Activities (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight">Recent Activities & CRM Accounts</h2>
              <p className="text-xs text-slate-500">Live B2B hospitality accounts, assigned sales reps, and scheduled drops.</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter restaurant or chef..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-100 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
              <button
                type="button"
                onClick={() => setFilterPriority((prev) => (prev === 'All' ? 'Urgent' : prev === 'Urgent' ? 'Normal' : 'All'))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>{filterPriority === 'All' ? 'Filter' : `Priority: ${filterPriority}`}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Add Account</span>
              </button>
            </div>
          </div>

          {/* CRM Accounts Table (Exact columns from Image 2) */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pl-1">Sl. No</th>
                  <th className="pb-3">Account Name</th>
                  <th className="pb-3">Description & Sector</th>
                  <th className="pb-3">Assignee</th>
                  <th className="pb-3">Due Date</th>
                  <th className="pb-3">Priority</th>
                  <th className="pb-3">Credit Utilized</th>
                  <th className="pb-3 pr-1 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredAccounts.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedAccount(item)}
                    className="hover:bg-emerald-50/40 transition-colors group cursor-pointer border-b border-slate-100"
                    title="Click row to view & manage customer account"
                  >
                    {/* Sl No */}
                    <td className="py-4 pl-1 font-mono text-[11px] text-slate-400">
                      {item.slNo}
                    </td>

                    {/* Account Name */}
                    <td className="py-4 font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span>{item.name}</span>
                        {item.isWebLead && !item.isApproved && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold tracking-tight uppercase">
                            New Lead
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        {item.headChef} {item.phone ? `(${item.phone})` : item.email ? `(${item.email})` : ''}
                      </div>
                    </td>

                    {/* Description / Sector */}
                    <td className="py-4 text-slate-500 max-w-xs pr-2">
                      <div className="font-semibold text-slate-700 text-[11px]">{item.segment}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">{item.description}</div>
                    </td>

                    {/* Assignee Avatars */}
                    <td className="py-4">
                      <div className="flex items-center -space-x-1.5">
                        {item.assignedReps.map((rep, idx) => (
                          <div
                            key={idx}
                            title={rep.name}
                            className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold text-[9px] flex items-center justify-center ring-2 ring-white shadow-sm"
                          >
                            {rep.avatar}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Due Date */}
                    <td className="py-4 font-medium text-slate-600 text-[11px] whitespace-nowrap">
                      {item.dueDate}
                    </td>

                    {/* Priority Badge */}
                    <td className="py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.priority === 'Urgent'
                            ? 'bg-rose-50 text-rose-700'
                            : item.priority === 'Normal'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.priority === 'Urgent'
                              ? 'bg-rose-500'
                              : item.priority === 'Normal'
                              ? 'bg-emerald-500'
                              : 'bg-slate-400'
                          }`}
                        />
                        {item.priority}
                      </span>
                    </td>

                    {/* Progress / Credit Bar */}
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            style={{ width: `${item.creditUtilized}%` }}
                            className={`h-full rounded-full ${
                              item.creditUtilized > 70
                                ? 'bg-rose-500'
                                : item.creditUtilized > 40
                                ? 'bg-cyan-500'
                                : 'bg-emerald-500'
                            }`}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.creditUtilized}%
                        </span>
                      </div>
                    </td>

                    {/* Action Column */}
                    <td className="py-4 pr-1 text-right">
                      <div
                        className="flex items-center justify-end gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.isApproved ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10.5px] font-bold border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Trade Active</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApproveAccount(item);
                            }}
                            disabled={approvingId === item.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10.5px] font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                            title="Issue Trade Login Credentials"
                          >
                            <Key className="w-3 h-3 text-[#F3D08A]" />
                            <span>{approvingId === item.id ? 'Issuing...' : 'Approve Login'}</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditModal(item);
                          }}
                          className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 text-slate-500 hover:text-emerald-700 flex items-center justify-center transition-colors cursor-pointer"
                          title="Edit Customer Account"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAccount(item);
                          }}
                          className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-rose-50 hover:border-rose-300 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                          title="Delete Account"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Summary Bar: Performance Over Time (from Image 2) */}
          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Performance Over Time
              </div>
              <div className="text-2xl font-black text-slate-900">85.64%</div>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500 mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400" /> Delivery Delay (5%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" /> Success Rate (91%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Order Accuracy (98%)
                </span>
              </div>
            </div>

            {/* Segmented Progress Bars */}
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                  <span>November Deliveries</span>
                  <span>92% On-Time</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 flex overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[85%]" />
                  <div className="bg-cyan-400 h-full w-[10%]" />
                  <div className="bg-rose-400 h-full w-[5%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                  <span>December Forecast</span>
                  <span>95% Expected</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 flex overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[90%]" />
                  <div className="bg-cyan-400 h-full w-[7%]" />
                  <div className="bg-rose-400 h-full w-[3%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE PANELS: Staff Greeting & Goals (4 Cols from Image 2) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Greeting Card with Activity Equalizer (Image 2 top right) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">Good Morning</h3>
                <h4 className="text-sm font-bold text-emerald-600">Floyd Miles</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Operations & Sales Director</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <MoreVertical className="w-4 h-4" />
              </div>
            </div>

            {/* Weekly Activity Bars from Image 2 */}
            <div className="mt-6 flex items-end justify-between gap-2 h-28 px-1">
              {[
                { day: 'Mon', h: 40, active: false },
                { day: 'Tue', h: 90, active: true },
                { day: 'Wed', h: 55, active: false },
                { day: 'Thu', h: 80, active: true },
                { day: 'Fri', h: 95, active: true },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    style={{ height: `${bar.h}%` }}
                    className={`w-full rounded-t-lg transition-all ${
                      bar.active
                        ? 'bg-emerald-500 shadow-sm shadow-emerald-500/30'
                        : 'bg-emerald-100'
                    }`}
                  />
                  <span className="text-[10px] font-semibold text-slate-400">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Goals Radial Dial Meter (Image 2 bottom right) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">My Goals</span>
              <span className="text-[10px] text-slate-400">Quarterly Target</span>
            </div>

            {/* Radial Speedometer Arc */}
            <div className="relative flex items-center justify-center my-4">
              <div className="w-36 h-20 border-[10px] border-b-0 border-slate-100 rounded-t-full relative overflow-hidden">
                <div
                  className="absolute inset-0 border-[10px] border-b-0 border-emerald-500 rounded-t-full"
                  style={{ clipPath: 'polygon(0 0, 80% 0, 80% 100%, 0 100%)' }}
                />
              </div>
              <div className="absolute top-8 text-center">
                <div className="text-lg font-black text-slate-900">80.49%</div>
                <div className="text-[9px] text-slate-400 font-medium">Out Of 100</div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-500">
              Customer satisfaction & SLA retention is currently in top tier.
            </p>
          </div>

          {/* Intranet Banner from Image 2 */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md relative overflow-hidden">
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
              Rootwills Foodservice OS
            </div>
            <h4 className="text-sm font-black leading-snug">
              Intranet Streamlined Insights & Hospitality Ordering
            </h4>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Empowering your team with real-time stock allocation, chef order desks, and driver logistics.
            </p>
            <button className="mt-4 w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shadow-sm">
              Launch Dispatch Desk
            </button>
          </div>
        </div>
      </div>

      {/* Account Details Drawer */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="min-w-0 pr-3">
                  <h3 className="text-lg font-black text-slate-900 truncate">{selectedAccount.name}</h3>
                  <p className="text-xs text-emerald-600 font-semibold">{selectedAccount.segment}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(selectedAccount)}
                    className="p-1.5 text-slate-600 hover:text-emerald-700 rounded-lg hover:bg-emerald-50 border border-slate-200 transition-colors cursor-pointer"
                    title="Edit Account Details"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteAccount(selectedAccount)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"
                    title="Delete Account"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAccount(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="py-6 space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-bold mb-1">Head Chef / Buyer Contact</span>
                  <div className="font-semibold text-slate-900 text-sm">{selectedAccount.headChef}</div>
                  <div className="text-slate-600 mt-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedAccount.phone || 'No phone recorded'}</span>
                  </div>
                  <div className="text-slate-600 mt-0.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedAccount.email}</span>
                  </div>
                  {selectedAccount.postcode && (
                    <div className="text-slate-600 mt-0.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Delivery Postcode: {selectedAccount.postcode}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block font-bold mb-1">Monthly Spend</span>
                    <div className="text-sm font-black text-slate-900">{selectedAccount.spendMonth}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold mb-1">Payment Terms</span>
                    <div className="text-sm font-bold text-emerald-700">{selectedAccount.paymentTerms}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-slate-400 block font-bold mb-1">Account Priority & Status</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        selectedAccount.priority === 'Urgent'
                          ? 'bg-rose-50 text-rose-700'
                          : selectedAccount.priority === 'Normal'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Priority: {selectedAccount.priority}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      ID: {selectedAccount.approvedId || selectedAccount.id}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-slate-400 block font-bold mb-1">Delivery Instructions</span>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                    {selectedAccount.deliveryNotes ||
                      'Pre-dawn delivery window: 04:00 - 07:30 AM. Chiller and dry goods intake per HACCP specifications.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(selectedAccount)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteAccount(selectedAccount)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-xs font-semibold text-rose-600 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Delete Account"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {selectedAccount.isApproved ? (
                <button
                  type="button"
                  onClick={() => {
                    setApprovedCredentialsModal({
                      id: selectedAccount.approvedId || selectedAccount.id,
                      password: selectedAccount.approvedPassword || 'Rootwills2026!',
                      portalUrl: 'https://rootwillsdirect.co.uk',
                      welcomeText: `Hello ${selectedAccount.headChef},\n\nYour Rootwills Direct commercial trade account has been activated.\n\nPortal: https://rootwillsdirect.co.uk\nAccount ID: ${selectedAccount.approvedId || selectedAccount.id}\nPassword: ${selectedAccount.approvedPassword || 'Rootwills2026!'}\n\nPre-dawn delivery window: 04:00 - 07:30 AM.`,
                    });
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5 text-[#F3D08A]" />
                  <span>View / Share Login Credentials</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleApproveAccount(selectedAccount)}
                  disabled={approvingId === selectedAccount.id}
                  className="w-full py-2.5 rounded-xl bg-[#2E060D] hover:bg-[#1a0206] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Key className="w-3.5 h-3.5 text-[#F3D08A]" />
                  <span>{approvingId === selectedAccount.id ? 'Activating...' : 'Approve & Issue Login'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          EDIT CUSTOMER ACCOUNT MODAL
          ══════════════════════════════════════════════════════════════ */}
      {isEditModalOpen && editingAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5 text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-tight">Edit Customer Account</h3>
                  <p className="text-[11px] text-slate-500">{editingAccount.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingAccount(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Company / Trading Name *</label>
                <input
                  type="text"
                  required
                  value={editingAccount.name}
                  onChange={(e) => setEditingAccount({ ...editingAccount, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Head Chef / Buyer Name</label>
                  <input
                    type="text"
                    value={editingAccount.headChef}
                    onChange={(e) => setEditingAccount({ ...editingAccount, headChef: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Direct Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={editingAccount.phone}
                    onChange={(e) => setEditingAccount({ ...editingAccount, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Order Email Address *</label>
                  <input
                    type="email"
                    required
                    value={editingAccount.email}
                    onChange={(e) => setEditingAccount({ ...editingAccount, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Delivery Postcode</label>
                  <input
                    type="text"
                    value={editingAccount.postcode || ''}
                    onChange={(e) => setEditingAccount({ ...editingAccount, postcode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900 font-mono uppercase"
                    placeholder="e.g. B6 6JR"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Sector / Tier</label>
                  <input
                    type="text"
                    value={editingAccount.segment}
                    onChange={(e) => setEditingAccount({ ...editingAccount, segment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Monthly Spend</label>
                  <input
                    type="text"
                    value={editingAccount.spendMonth}
                    onChange={(e) => setEditingAccount({ ...editingAccount, spendMonth: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Payment Terms</label>
                  <select
                    value={editingAccount.paymentTerms}
                    onChange={(e) => setEditingAccount({ ...editingAccount, paymentTerms: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900 font-medium"
                  >
                    <option value="7 Days Net">7 Days Net</option>
                    <option value="14 Days Net">14 Days Net</option>
                    <option value="30 Days Net">30 Days Net</option>
                    <option value="Direct Debit Pre-pay">Direct Debit Pre-pay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Account Priority</label>
                  <select
                    value={editingAccount.priority}
                    onChange={(e) => setEditingAccount({ ...editingAccount, priority: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900 font-medium"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Portal Login Password</label>
                <div className="relative">
                  <input
                    type="text"
                    value={editingAccount.approvedPassword || ''}
                    onChange={(e) => setEditingAccount({ ...editingAccount, approvedPassword: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900 font-mono text-xs"
                    placeholder="Set custom password..."
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Used by customer at rootwillsdirect.co.uk</span>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingAccount(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          ADD NEW CUSTOMER ACCOUNT MODAL
          ══════════════════════════════════════════════════════════════ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5 text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-tight">Register New Trade Account</h3>
                  <p className="text-[11px] text-slate-500">Adds live commercial buyer to Rootwills Direct</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAccount} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Company / Venue Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. San Carlo Restaurant"
                  value={newAccountForm.name}
                  onChange={(e) => setNewAccountForm({ ...newAccountForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Head Chef / Buyer *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chef Marco"
                    value={newAccountForm.headChef}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, headChef: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="e.g. +44 121 555 0199"
                    value={newAccountForm.phone}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Order Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="orders@restaurant.co.uk"
                    value={newAccountForm.email}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Delivery Postcode</label>
                  <input
                    type="text"
                    placeholder="e.g. B2 4XJ"
                    value={newAccountForm.postcode}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, postcode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900 font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Sector / Tier</label>
                  <input
                    type="text"
                    value={newAccountForm.segment}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, segment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Est. Monthly Spend</label>
                  <input
                    type="text"
                    value={newAccountForm.spendMonth}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, spendMonth: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Payment Terms</label>
                  <select
                    value={newAccountForm.paymentTerms}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, paymentTerms: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900 font-medium"
                  >
                    <option value="7 Days Net">7 Days Net</option>
                    <option value="14 Days Net">14 Days Net</option>
                    <option value="30 Days Net">30 Days Net</option>
                    <option value="Direct Debit Pre-pay">Direct Debit Pre-pay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Temporary Password</label>
                  <input
                    type="text"
                    value={newAccountForm.password}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Creating...' : 'Create & Activate Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          APPROVED CREDENTIALS & WHATSAPP FAST-INVITE MODAL
          ══════════════════════════════════════════════════════════════ */}
      {approvedCredentialsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-tight">Trade Account Activated</h3>
                  <p className="text-[11px] text-emerald-600 font-semibold">Ready for rootwillsdirect.co.uk</p>
                </div>
              </div>
              <button
                onClick={() => setApprovedCredentialsModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block">Account ID / Username</span>
                  <div className="font-bold text-slate-900 text-sm select-all">{approvedCredentialsModal.id}</div>
                </div>
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block">Temporary Password</span>
                  <div className="font-bold text-slate-900 text-sm select-all">{approvedCredentialsModal.password}</div>
                </div>
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block">Ordering Portal</span>
                  <a
                    href={approvedCredentialsModal.portalUrl || 'https://rootwillsdirect.co.uk'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline font-semibold flex items-center gap-1 font-sans text-xs"
                  >
                    <span>{approvedCredentialsModal.portalUrl || 'https://rootwillsdirect.co.uk'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <p className="text-[11.5px] text-slate-500 font-sans leading-relaxed">
                Credentials have been saved to the active auth store. Send the welcome notification directly to the chef via WhatsApp or copy the message.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={approvedCredentialsModal.whatsappUrl || `https://wa.me/?text=${encodeURIComponent(approvedCredentialsModal.welcomeText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </a>

              {approvedCredentialsModal.mailtoUrl && (
                <a
                  href={approvedCredentialsModal.mailtoUrl}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#F3D08A]" />
                  <span>Send via Email Client</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => copyToClipboard(approvedCredentialsModal.welcomeText)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Invitation Message'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

