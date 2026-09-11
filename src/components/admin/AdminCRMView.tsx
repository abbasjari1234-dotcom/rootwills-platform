'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/app-store';
import { Lead, LeadStatus } from '@/types/crm';
import {
  Users,
  Plus,
  ArrowRight,
  Building2,
  Phone,
  Mail,
  Sparkles,
  CheckCircle2,
  Clock,
  X,
  Filter,
  UserPlus,
  DollarSign,
  Search,
  Copy,
  Check,
  Flame,
  TrendingUp,
  RefreshCw,
  LayoutGrid,
  ListFilter,
  MapPin,
  FileText,
  ChevronRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Sector } from '@/types/onboarding';
import { convertLeadServerAction } from '@/actions/crm';

interface ColumnConfig {
  status: LeadStatus;
  label: string;
  badgeBg: string;
  headerBg: string;
  pillColor: string;
}

const STAGES: ColumnConfig[] = [
  {
    status: 'new_lead',
    label: 'New Enquiries',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    headerBg: 'bg-blue-50/50 border-blue-200',
    pillColor: 'bg-blue-500',
  },
  {
    status: 'contacted',
    label: 'Contacted',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    headerBg: 'bg-indigo-50/50 border-indigo-200',
    pillColor: 'bg-indigo-500',
  },
  {
    status: 'price_list_sent',
    label: 'Price List Sent',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    headerBg: 'bg-purple-50/50 border-purple-200',
    pillColor: 'bg-purple-500',
  },
  {
    status: 'quote_sent',
    label: 'Quote Sent',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    headerBg: 'bg-amber-50/50 border-amber-200',
    pillColor: 'bg-amber-500',
  },
  {
    status: 'account_opened',
    label: 'Account Opened (Won)',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    headerBg: 'bg-emerald-50 border-emerald-200',
    pillColor: 'bg-emerald-600',
  },
];

const SECTOR_LABELS: Record<string, string> = {
  fine_dining: 'Fine Dining',
  hotel_hospitality: 'Hotel & Resort',
  care_home: 'Healthcare / Care',
  catering_events: 'Event Catering',
  pub_bar: 'Gastropub & Bar',
  artisan_cafe: 'Artisan Cafe',
  luxury_catering: 'Luxury Catering',
  boutique_hotel: 'Boutique Hotel',
  gastropub: 'Gastropub',
};

export function AdminCRMView() {
  const { leads: storeLeads, updateLeadStatus, convertLeadToCustomer, addLead } = useAppStore();
  const [liveDbLeads, setLiveDbLeads] = useState<Lead[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now');

  // View state: 'table' (default) vs 'pipeline'
  const [viewMode, setViewMode] = useState<'table' | 'pipeline'>('table');

  // Modals & Inspection State
  const [selectedLeadForConvert, setSelectedLeadForConvert] = useState<Lead | null>(null);
  const [inspectedLead, setInspectedLead] = useState<Lead | null>(null);
  const [creditLimitInput, setCreditLimitInput] = useState(10000);
  const [discountPercentInput, setDiscountPercentInput] = useState(7.5);
  const [newLeadModalOpen, setNewLeadModalOpen] = useState(false);

  // Drag & Drop State for Pipeline
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<LeadStatus | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchLiveLeads = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/admin/leads');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.leads)) {
          setLiveDbLeads(data.leads);
          setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (err) {
      console.warn('Failed to fetch live leads:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchLiveLeads();
    const interval = setInterval(fetchLiveLeads, 12000);
    return () => clearInterval(interval);
  }, []);

  // Merge live Supabase leads with store leads (deduplicating)
  const allLeadsMap = new Map<string, Lead>();
  liveDbLeads.forEach((l) => allLeadsMap.set(l.id, l));
  storeLeads.forEach((l) => {
    if (!allLeadsMap.has(l.id)) {
      allLeadsMap.set(l.id, l);
    }
  });

  const leads = Array.from(allLeadsMap.values());

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    sector: 'fine_dining' as Sector,
    postcode: '',
    city: 'Birmingham',
    estimatedWeeklySpend: 3500,
    source: 'cold_outreach' as const,
    assignedSalesRep: 'Commercial Sales Desk',
    notes: '',
  });

  const handleCopy = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeadForConvert) return;

    await convertLeadServerAction({
      leadId: selectedLeadForConvert.id,
      companyName: selectedLeadForConvert.companyName,
      contactName: selectedLeadForConvert.contactName,
      email: selectedLeadForConvert.email,
      phone: selectedLeadForConvert.phone,
      sector: selectedLeadForConvert.sector,
      city: selectedLeadForConvert.city,
      postcode: selectedLeadForConvert.postcode,
      creditLimit: Number(creditLimitInput),
      discountPercent: Number(discountPercentInput),
    });

    convertLeadToCustomer(
      selectedLeadForConvert.id,
      Number(creditLimitInput),
      Number(discountPercentInput)
    );

    alert(`Successfully converted ${selectedLeadForConvert.companyName} into an active Trade Account with £${Number(creditLimitInput).toLocaleString()} revolving credit facility!`);
    setSelectedLeadForConvert(null);
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.companyName) return;
    addLead(newLeadForm);
    setNewLeadModalOpen(false);
    setNewLeadForm({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      sector: 'fine_dining',
      postcode: '',
      city: 'Birmingham',
      estimatedWeeklySpend: 3500,
      source: 'cold_outreach',
      assignedSalesRep: 'Commercial Sales Desk',
      notes: '',
    });
  };

  // Drag & drop handlers
  const handleDragStart = (leadId: string) => {
    setDraggedLeadId(leadId);
  };

  const handleDragOver = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault();
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (status: LeadStatus) => {
    if (draggedLeadId) {
      updateLeadStatus(draggedLeadId, status);
      setDraggedLeadId(null);
      setDragOverColumn(null);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    if (!lead) return false;
    const company = (lead.companyName || '').toLowerCase();
    const contact = (lead.contactName || '').toLowerCase();
    const email = (lead.email || '').toLowerCase();
    const phone = (lead.phone || '').toLowerCase();
    const city = (lead.city || '').toLowerCase();
    const postcode = (lead.postcode || '').toLowerCase();
    const q = (searchQuery || '').toLowerCase();

    const matchesSearch =
      !q ||
      company.includes(q) ||
      contact.includes(q) ||
      email.includes(q) ||
      phone.includes(q) ||
      city.includes(q) ||
      postcode.includes(q);

    const matchesStage = selectedStageFilter === 'all' || lead.status === selectedStageFilter;
    const matchesSector = selectedSectorFilter === 'all' || lead.sector === selectedSectorFilter;

    return matchesSearch && matchesStage && matchesSector;
  });

  // Rollup Metrics
  const totalPipelineValue = leads.reduce(
    (sum, l) => sum + (typeof l?.estimatedWeeklySpend === 'number' ? l.estimatedWeeklySpend : 0),
    0
  );
  const totalWonLeads = leads.filter((l) => l?.status === 'account_opened');
  const totalWonValue = totalWonLeads.reduce(
    (sum, l) => sum + (typeof l?.estimatedWeeklySpend === 'number' ? l.estimatedWeeklySpend : 0),
    0
  );
  const newEnquiriesCount = leads.filter((l) => l?.status === 'new_lead').length;
  const inNegotiationCount = leads.filter(
    (l) => l?.status === 'contacted' || l?.status === 'price_list_sent' || l?.status === 'quote_sent'
  ).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-7 min-h-screen bg-[#F8FAFC] text-slate-900">
      
      {/* ─── Top Header Bar ─── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 uppercase tracking-wide">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Commercial Inbound Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
            Commercial Sales CRM
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage incoming hospitality enquiries, price quotes, and 1-click trade account conversions.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={fetchLiveLeads}
            disabled={isSyncing}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-mono text-xs font-semibold hover:bg-slate-50 flex items-center gap-2 shadow-xs transition-all"
            title="Refresh database records"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isSyncing ? 'animate-spin text-emerald-600' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : `Synced ${lastSyncedTime}`}</span>
          </button>

          <button
            type="button"
            onClick={() => setNewLeadModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Inbound Prospect</span>
          </button>
        </div>
      </div>

      {/* ─── Executive Rollup Metric Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Active Pipeline */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block font-medium">
              Total Weekly Pipeline
            </span>
            <span className="text-2xl font-bold text-slate-900 mt-1 block">
              £{totalPipelineValue.toLocaleString()}
              <span className="text-xs font-normal text-slate-500 font-mono"> /wk</span>
            </span>
            <span className="text-xs text-emerald-700 font-mono mt-0.5 block font-semibold">
              £{(totalPipelineValue * 52).toLocaleString()} / year volume
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2: New Inbound Enquiries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block font-medium">
              New Enquiries
            </span>
            <span className="text-2xl font-bold text-blue-700 mt-1 block">
              {newEnquiriesCount}
              <span className="text-xs font-normal text-slate-500 font-sans ml-1.5">leads waiting</span>
            </span>
            <span className="text-xs text-slate-500 font-mono mt-0.5 block">
              Requires 30-min sales response
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3: In Active Negotiation */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block font-medium">
              In Active Negotiation
            </span>
            <span className="text-2xl font-bold text-amber-700 mt-1 block">
              {inNegotiationCount}
              <span className="text-xs font-normal text-slate-500 font-sans ml-1.5">quotes live</span>
            </span>
            <span className="text-xs text-slate-500 font-mono mt-0.5 block">
              Pricing matrix dispatched
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4: Converted Won Accounts */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs bg-gradient-to-br from-white to-emerald-50/40 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 block font-semibold">
              Converted Accounts (Won)
            </span>
            <span className="text-2xl font-bold text-emerald-900 mt-1 block">
              {totalWonLeads.length}
              <span className="text-xs font-normal text-slate-600 font-mono ml-1.5">
                (£{totalWonValue.toLocaleString()}/wk)
              </span>
            </span>
            <span className="text-xs text-emerald-700 font-mono mt-0.5 block font-medium">
              Active trade credit facilities
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ─── Search, Filters & View Switcher Bar ─── */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
        
        {/* Left Side: Search & Quick Stage Filter */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Live Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search company, chef, phone, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Stage Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 overflow-x-auto text-xs font-medium">
            {[
              { id: 'all', label: `All (${leads.length})` },
              { id: 'new_lead', label: `New (${newEnquiriesCount})` },
              { id: 'contacted', label: 'Contacted' },
              { id: 'quote_sent', label: 'Quoted' },
              { id: 'account_opened', label: `Won (${totalWonLeads.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedStageFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all text-xs whitespace-nowrap ${
                  selectedStageFilter === tab.id
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sector Filter Dropdown */}
          <select
            value={selectedSectorFilter}
            onChange={(e) => setSelectedSectorFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:bg-white focus:outline-none focus:border-emerald-600 font-medium"
            aria-label="Filter by sector"
          >
            <option value="all">All Hospitality Sectors</option>
            <option value="fine_dining">Fine Dining</option>
            <option value="hotel_hospitality">Hotels & Resorts</option>
            <option value="care_home">Care Homes & Healthcare</option>
            <option value="catering_events">Event Caterers</option>
            <option value="pub_bar">Gastropubs & Bars</option>
          </select>
        </div>

        {/* Right Side: Dual-View Switcher Button (Table vs Pipeline) */}
        <div className="flex items-center gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 justify-end">
          <span className="text-xs font-mono uppercase text-slate-400 mr-1 hidden sm:inline">View Mode:</span>
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Table List</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('pipeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'pipeline'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Pipeline Cards</span>
            </button>
          </div>
        </div>

      </div>

      {/* ─── VIEW 1: Clean Actionable Table View (Default) ─── */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Mobile Swipe Hint (< sm) */}
          <div className="sm:hidden px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-[11px] text-slate-500 font-mono flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-800 font-medium">
              <span>Swipe table horizontally for actions</span>
              <ArrowRight className="w-3 h-3" />
            </span>
            <span className="text-slate-400">{filteredLeads.length} leads</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[780px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="py-3.5 px-4 sm:px-6">Business / Venue</th>
                  <th className="py-3.5 px-4">Contact Person</th>
                  <th className="py-3.5 px-4">Sector</th>
                  <th className="py-3.5 px-4">Est. Weekly Spend</th>
                  <th className="py-3.5 px-4">Current Stage</th>
                  <th className="py-3.5 px-4">Quick Contact</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                      <p className="font-semibold text-slate-700">No leads match your current filter</p>
                      <p className="text-xs text-slate-400 mt-1">Try clearing your search query or selecting "All Leads"</p>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const stageConfig = STAGES.find((s) => s.status === lead.status) || STAGES[0];
                    const spend = typeof lead.estimatedWeeklySpend === 'number' ? lead.estimatedWeeklySpend : 0;
                    const isHot = spend >= 4000;
                    const isLiveCloud = lead.id && lead.id.length > 20 && lead.id.includes('-');
                    const currentStageIdx = STAGES.findIndex((s) => s.status === lead.status);

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setInspectedLead(lead)}
                        className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
                      >
                        {/* 1. Business Name & Location */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                                {lead.companyName || 'Inbound Prospect'}
                              </span>
                              {isHot && (
                                <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-mono font-bold flex items-center gap-0.5">
                                  <Flame className="w-3 h-3 text-rose-500" />
                                  <span>Hot</span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-xs">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <span>{lead.city || 'Birmingham'} ({lead.postcode || 'Midlands'})</span>
                              </span>
                              {isLiveCloud && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  <span>Web Inbound</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* 2. Contact Person */}
                        <td className="py-4 px-4">
                          <div className="font-medium text-slate-900">
                            {lead.contactName || 'Executive Contact'}
                          </div>
                          <div className="text-[10px] font-mono uppercase text-slate-400">
                            {(lead.source || 'inbound_web').replace(/_/g, ' ')}
                          </div>
                        </td>

                        {/* 3. Sector */}
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-xs whitespace-nowrap">
                            {SECTOR_LABELS[lead.sector] || (lead.sector || 'General Hospitality').replace(/_/g, ' ')}
                          </span>
                        </td>

                        {/* 4. Est. Weekly Spend */}
                        <td className="py-4 px-4 font-mono font-bold text-slate-900">
                          <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            £{spend.toLocaleString()}/wk
                          </span>
                        </td>

                        {/* 5. Stage Badge */}
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${stageConfig.badgeBg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${stageConfig.pillColor}`} />
                            <span>{stageConfig.label}</span>
                          </span>
                        </td>

                        {/* 6. Quick Contact (Phone & Email with 1-click copy) */}
                        <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5">
                            {/* Phone */}
                            <a
                              href={`tel:${lead.phone}`}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 transition-colors"
                              title={`Call ${lead.phone}`}
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <button
                              type="button"
                              onClick={(e) => handleCopy(lead.phone, `${lead.id}-ph`, e)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors"
                              title="Copy phone number"
                            >
                              {copiedId === `${lead.id}-ph` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* Email */}
                            <a
                              href={`mailto:${lead.email}?subject=Rootwills Wholesale Supply - Pricing Proposal`}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 transition-colors ml-1"
                              title={`Email ${lead.email}`}
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                            <button
                              type="button"
                              onClick={(e) => handleCopy(lead.email, `${lead.id}-em`, e)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors"
                              title="Copy email address"
                            >
                              {copiedId === `${lead.id}-em` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>

                        {/* 7. Action Buttons */}
                        <td className="py-4 px-4 sm:px-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            {currentStageIdx < STAGES.length - 1 ? (
                              <button
                                type="button"
                                onClick={() => updateLeadStatus(lead.id, STAGES[currentStageIdx + 1].status)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 border border-slate-200 text-slate-700 hover:text-emerald-800 font-semibold text-xs flex items-center gap-1 transition-colors"
                                title="Advance to next sales stage"
                              >
                                <span>Next Stage</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            ) : (
                              <span className="text-[11px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Active Trade</span>
                              </span>
                            )}

                            {lead.status !== 'account_opened' && (
                              <button
                                type="button"
                                onClick={() => setSelectedLeadForConvert(lead)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1 shadow-xs transition-colors"
                                title="Open approved trade credit account"
                              >
                                <UserPlus className="w-3.5 h-3.5" />
                                <span>Convert</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Count */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 font-mono">
            <span>Showing {filteredLeads.length} of {leads.length} commercial prospects</span>
            <span>Click any row to view full notes &amp; quote parameters</span>
          </div>
        </div>
      )}

      {/* ─── VIEW 2: Streamlined Visual Pipeline (Kanban Cards) ─── */}
      {viewMode === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 overflow-x-auto pb-6">
          {STAGES.map((col, colIndex) => {
            const colLeads = filteredLeads.filter((l) => l.status === col.status);
            const colSpend = colLeads.reduce(
              (sum, l) => sum + (typeof l.estimatedWeeklySpend === 'number' ? l.estimatedWeeklySpend : 0),
              0
            );
            const isDragOver = dragOverColumn === col.status;

            return (
              <div
                key={col.status}
                onDragOver={(e) => handleDragOver(e, col.status)}
                onDragLeave={handleDragLeave}
                onDrop={() => handleDrop(col.status)}
                className={`flex flex-col min-w-[280px] rounded-2xl p-3.5 space-y-3 transition-all ${
                  col.status === 'account_opened'
                    ? 'bg-emerald-50/40 border-2 border-emerald-200'
                    : 'bg-slate-100/70 border border-slate-200'
                } ${isDragOver ? 'ring-2 ring-emerald-500 bg-emerald-50/60' : ''}`}
              >
                {/* Column Header */}
                <div className={`p-2.5 rounded-xl border ${col.headerBg} flex items-center justify-between shadow-2xs`}>
                  <div>
                    <span className="font-bold text-xs text-slate-800 block">
                      {col.label}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      £{colSpend.toLocaleString()}/wk
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold border ${col.badgeBg}`}>
                    {colLeads.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="flex-1 space-y-3 min-h-[380px]">
                  {colLeads.length === 0 ? (
                    <div
                      className={`h-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center text-xs transition-colors ${
                        isDragOver
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 text-slate-400'
                      }`}
                    >
                      <Sparkles className="w-5 h-5 mb-1 opacity-40 text-slate-400" />
                      <span>Drop leads here to advance</span>
                    </div>
                  ) : (
                    colLeads.map((lead) => {
                      const spend = typeof lead.estimatedWeeklySpend === 'number' ? lead.estimatedWeeklySpend : 0;
                      const isHot = spend >= 4000;
                      const isLiveCloud = lead.id && lead.id.length > 20 && lead.id.includes('-');

                      return (
                        <div
                          key={lead.id}
                          draggable
                          onDragStart={() => handleDragStart(lead.id)}
                          onClick={() => setInspectedLead(lead)}
                          className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all space-y-3 cursor-pointer group"
                        >
                          {/* Title & Spend */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors">
                                  {lead.companyName || 'Inbound Prospect'}
                                </h3>
                                {isLiveCloud && (
                                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 mt-0.5 font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span>Web Inbound</span>
                                  </span>
                                )}
                              </div>
                              <span className="font-mono text-xs font-bold text-emerald-800 shrink-0 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                £{spend.toLocaleString()}/wk
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="capitalize">
                                {SECTOR_LABELS[lead.sector] || (lead.sector || 'fine_dining').replace(/_/g, ' ')}
                              </span>
                              <span className="text-slate-300">&bull;</span>
                              <span>{lead.city || 'Birmingham'}</span>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-slate-900">{lead.contactName || 'Trade Buyer'}</span>
                              <span className="text-[10px] font-mono text-slate-400 uppercase">
                                {(lead.source || 'inbound_web').replace(/_/g, ' ')}
                              </span>
                            </div>

                            {/* Email link with copy button */}
                            <div className="flex items-center justify-between text-[11px] font-mono" onClick={(e) => e.stopPropagation()}>
                              <a
                                href={`mailto:${lead.email}`}
                                className="text-slate-600 hover:text-emerald-700 flex items-center gap-1.5 truncate max-w-[180px]"
                                title="Send email"
                              >
                                <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="truncate">{lead.email}</span>
                              </a>
                              <button
                                type="button"
                                onClick={(e) => handleCopy(lead.email, `${lead.id}-k-em`, e)}
                                className="text-slate-400 hover:text-slate-700 p-1"
                                title="Copy email"
                              >
                                {copiedId === `${lead.id}-k-em` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>

                            {/* Phone link with copy button */}
                            <div className="flex items-center justify-between text-[11px] font-mono" onClick={(e) => e.stopPropagation()}>
                              <a
                                href={`tel:${lead.phone}`}
                                className="text-slate-600 hover:text-emerald-700 flex items-center gap-1.5"
                                title="Call phone"
                              >
                                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{lead.phone}</span>
                              </a>
                              <button
                                type="button"
                                onClick={(e) => handleCopy(lead.phone, `${lead.id}-k-ph`, e)}
                                className="text-slate-400 hover:text-slate-700 p-1"
                                title="Copy phone"
                              >
                                {copiedId === `${lead.id}-k-ph` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Stage Actions */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                            {colIndex < STAGES.length - 1 ? (
                              <button
                                type="button"
                                onClick={() => updateLeadStatus(lead.id, STAGES[colIndex + 1].status)}
                                className="flex-1 py-1 px-2 rounded-lg bg-slate-100 hover:bg-emerald-50 border border-slate-200 text-[11px] font-medium text-slate-700 hover:text-emerald-800 flex items-center justify-center gap-1 transition-colors"
                              >
                                <span>Next Stage</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            ) : (
                              <span className="text-[10px] text-emerald-700 font-mono flex items-center gap-1 font-bold">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Active Trade</span>
                              </span>
                            )}

                            {lead.status !== 'account_opened' && (
                              <button
                                type="button"
                                onClick={() => setSelectedLeadForConvert(lead)}
                                className="py-1 px-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs"
                              >
                                <UserPlus className="w-3 h-3" />
                                <span>Convert</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── MODAL 1: Lead Details & Notes Drawer/Modal ─── */}
      {inspectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setInspectedLead(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-700 font-bold uppercase">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Commercial Prospect File</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {inspectedLead.companyName}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {inspectedLead.city} &bull; Sector: {SECTOR_LABELS[inspectedLead.sector] || inspectedLead.sector}
              </p>
            </div>

            {/* Core Details Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block font-mono text-[10px] uppercase">Contact Buyer</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{inspectedLead.contactName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-mono text-[10px] uppercase">Estimated Spend</span>
                <span className="font-bold text-emerald-800 text-sm mt-0.5 block">
                  £{(inspectedLead.estimatedWeeklySpend || 0).toLocaleString()} / week
                </span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200/80">
                <span className="text-slate-400 block font-mono text-[10px] uppercase">Phone &amp; Email</span>
                <div className="flex flex-wrap gap-3 mt-1 font-mono text-xs">
                  <a href={`tel:${inspectedLead.phone}`} className="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {inspectedLead.phone}
                  </a>
                  <a href={`mailto:${inspectedLead.email}`} className="text-slate-700 hover:underline flex items-center gap-1">
                    <Mail className="w-3 h-3" /> {inspectedLead.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Notes / Calculator Specs */}
            {inspectedLead.notes && (
              <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/70 text-xs text-slate-800">
                <span className="font-mono text-[10px] font-bold text-amber-800 uppercase block mb-1">
                  Inbound Pricing Calculation &amp; Notes:
                </span>
                <p className="leading-relaxed font-sans">{inspectedLead.notes}</p>
              </div>
            )}

            {/* Stage Quick Jump */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-500 mb-2 font-semibold">
                Change Pipeline Stage
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {STAGES.map((s) => (
                  <button
                    key={s.status}
                    type="button"
                    onClick={() => {
                      updateLeadStatus(inspectedLead.id, s.status);
                      setInspectedLead({ ...inspectedLead, status: s.status });
                    }}
                    className={`p-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      inspectedLead.status === s.status
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex gap-3">
              {inspectedLead.status !== 'account_opened' && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLeadForConvert(inspectedLead);
                    setInspectedLead(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Convert to Active Trade Account</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setInspectedLead(null)}
                className="px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-200"
              >
                Close File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: Convert Lead to Customer Account Modal ─── */}
      {selectedLeadForConvert && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedLeadForConvert(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-emerald-700 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>1-Click Lead-to-Customer Conversion</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Open Trade Account: {selectedLeadForConvert.companyName}
              </h2>
              <p className="text-xs text-slate-500">
                Instantly provision a verified trade credit facility, assign locked contract discount terms, and send automated onboarding credentials.
              </p>
            </div>

            <form onSubmit={handleConvert} className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 font-mono text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Contact:</span>
                  <span className="text-slate-900 font-bold">{selectedLeadForConvert.contactName}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Weekly Spend:</span>
                  <span className="text-emerald-700 font-bold">
                    £{selectedLeadForConvert.estimatedWeeklySpend?.toLocaleString()}/week
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Location:</span>
                  <span className="text-slate-900">
                    {selectedLeadForConvert.city} ({selectedLeadForConvert.postcode || 'B1 1AA'})
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">
                  Approved Trade Revolving Credit Limit (£)
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    value={creditLimitInput}
                    onChange={(e) => setCreditLimitInput(Number(e.target.value))}
                    step="500"
                    min="1000"
                    max="50000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Standard 30-day GoCardless Direct Debit or BACS terms
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">
                  Contract Discount Tier from List (%)
                </label>
                <input
                  type="number"
                  value={discountPercentInput}
                  onChange={(e) => setDiscountPercentInput(Number(e.target.value))}
                  step="0.5"
                  min="0"
                  max="30"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 font-mono"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Automatically discounts core catalogue lines for this account
                </span>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Open Active Trade Account</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLeadForConvert(null)}
                  className="px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 3: Add New Prospect Modal ─── */}
      {newLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setNewLeadModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-emerald-700 font-bold">
                <Plus className="w-3.5 h-3.5 text-emerald-600" />
                <span>Manual CRM Entry</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Add Inbound Commercial Prospect
              </h2>
              <p className="text-xs text-slate-500">
                Log a phone call, cold prospect, or email enquiry into the sales pipeline.
              </p>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-slate-700 mb-1 font-semibold">
                    Venue / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Grand Hotel Birmingham"
                    value={newLeadForm.companyName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, companyName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 mb-1 font-semibold">
                    Contact Person / Chef
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chef Mark Davies"
                    value={newLeadForm.contactName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, contactName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 mb-1 font-semibold">
                    Sector
                  </label>
                  <select
                    value={newLeadForm.sector}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, sector: e.target.value as Sector })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="fine_dining">Fine Dining</option>
                    <option value="hotel_hospitality">Hotel &amp; Resort</option>
                    <option value="care_home">Care Home</option>
                    <option value="catering_events">Event Catering</option>
                    <option value="pub_bar">Gastropub</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 mb-1 font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="chef@venue.co.uk"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 mb-1 font-semibold">
                    Direct Phone / Mobile
                  </label>
                  <input
                    type="tel"
                    placeholder="07700 900123"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 mb-1 font-semibold">
                    Estimated Weekly Spend (£)
                  </label>
                  <input
                    type="number"
                    step="250"
                    min="500"
                    value={newLeadForm.estimatedWeeklySpend}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, estimatedWeeklySpend: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 mb-1 font-semibold">
                    City / Postcode
                  </label>
                  <input
                    type="text"
                    placeholder="Birmingham, B5 5JR"
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-slate-700 mb-1 font-semibold">
                    Notes / Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Specific requirements, early delivery times, allergen requirements..."
                    value={newLeadForm.notes}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lead to Pipeline</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNewLeadModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
