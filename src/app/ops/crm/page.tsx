'use client';

import React, { useState } from 'react';
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
  isApproved?: boolean;
  approvedId?: string;
  approvedPassword?: string;
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
    priority: 'Urgent',
    creditUtilized: 38,
    spendMonth: '£18,450',
    paymentTerms: '30 Days Net',
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
    priority: 'Urgent',
    creditUtilized: 72,
    spendMonth: '£16,190',
    paymentTerms: '30 Days Net',
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

  const handleApproveAccount = async (account: CustomerAccount) => {
    setApprovingId(account.id);
    try {
      const res = await fetch('/api/admin/crm/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: account.name,
          contactName: account.headChef,
          email: account.email,
          phone: account.phone,
          postcode: 'UK',
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

  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch =
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.headChef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.segment.toLowerCase().includes(searchTerm.toLowerCase());
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
            <div className="text-3xl font-black text-slate-900 tracking-tight">14</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Pending Credit Verifications</div>
          </div>
          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-rose-50 text-rose-600">
            Requires Review
          </span>
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
            <div className="flex items-center gap-2">
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
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                <Filter className="w-3.5 h-3.5" />
                Filter
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
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Sl No */}
                    <td className="py-4 pl-1 font-mono text-[11px] text-slate-400">
                      {item.slNo}
                    </td>

                    {/* Account Name */}
                    <td className="py-4 font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      <div>{item.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{item.headChef}</div>
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
                      <div className="flex items-center justify-end gap-1.5">
                        {item.isApproved ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10.5px] font-bold border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Trade Active</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleApproveAccount(item)}
                            disabled={approvingId === item.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10.5px] font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                            title="Issue Trade Login Credentials"
                          >
                            <Key className="w-3 h-3 text-[#F3D08A]" />
                            <span>{approvingId === item.id ? 'Issuing...' : 'Approve Login'}</span>
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedAccount(item)}
                          className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                          title="View Account Details"
                        >
                          <Plus className="w-3.5 h-3.5" />
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
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-900">{selectedAccount.name}</h3>
                  <p className="text-xs text-emerald-600 font-semibold">{selectedAccount.segment}</p>
                </div>
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="py-6 space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-bold mb-1">Head Chef / Buyer</span>
                  <div className="font-semibold text-slate-900">{selectedAccount.headChef}</div>
                  <div className="text-slate-500">{selectedAccount.phone}</div>
                  <div className="text-slate-500">{selectedAccount.email}</div>
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
                  <span className="text-slate-400 block font-bold mb-1">Delivery Instructions</span>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                    Rear loading dock access before 08:30 AM. Temperature checks mandatory upon handover.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedAccount(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              {selectedAccount.isApproved ? (
                <button
                  onClick={() => {
                    setApprovedCredentialsModal({
                      id: selectedAccount.approvedId || selectedAccount.id,
                      password: selectedAccount.approvedPassword || 'Rootwills2026!',
                      portalUrl: 'https://rootwillsdirect.co.uk',
                      welcomeText: `Hello ${selectedAccount.headChef},\n\nYour Rootwills Direct commercial trade account has been activated.\n\nPortal: https://rootwillsdirect.co.uk\nAccount ID: ${selectedAccount.approvedId || selectedAccount.id}\nPassword: ${selectedAccount.approvedPassword || 'Rootwills2026!'}\n\nPre-dawn delivery window: 04:00 - 07:30 AM.`,
                    });
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5 text-[#F3D08A]" />
                  <span>View Credentials</span>
                </button>
              ) : (
                <button
                  onClick={() => handleApproveAccount(selectedAccount)}
                  disabled={approvingId === selectedAccount.id}
                  className="flex-1 py-2.5 rounded-xl bg-[#2E060D] hover:bg-[#1a0206] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
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

