'use client';

import React, { useState, useEffect } from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
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
  AlertTriangle,
  Zap,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { Sector } from '@/types/onboarding';
import { convertLeadServerAction, getLiveLeadsServerAction } from '@/actions/crm';
import { RefreshCw } from 'lucide-react';

interface ColumnConfig {
  status: LeadStatus;
  label: string;
  color: string;
  badgeBg: string;
  glow?: boolean;
}

const COLUMNS: ColumnConfig[] = [
  { status: 'new_lead', label: '1. New Enquiries', color: 'border-blue-500/40 text-blue-400', badgeBg: 'bg-blue-500/10 text-blue-400' },
  { status: 'contacted', label: '2. Contacted / Qualified', color: 'border-indigo-500/40 text-indigo-400', badgeBg: 'bg-indigo-500/10 text-indigo-400' },
  { status: 'price_list_sent', label: '3. Price List Sent', color: 'border-purple-500/40 text-purple-400', badgeBg: 'bg-purple-500/10 text-purple-400' },
  { status: 'quote_sent', label: '4. Bespoke Quote Sent', color: 'border-amber-500/40 text-amber-400', badgeBg: 'bg-amber-500/10 text-amber-400' },
  { status: 'account_opened', label: '5. Account Opened (Won)', color: 'border-emerald-500/50 text-emerald-300', badgeBg: 'bg-emerald-500/20 text-emerald-300', glow: true },
];

export default function SalesCRMPage() {
  const { leads: storeLeads, updateLeadStatus, convertLeadToCustomer, addLead } = useDemoStore();
  const [liveDbLeads, setLiveDbLeads] = useState<Lead[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Modals & Conversion State
  const [selectedLeadForConvert, setSelectedLeadForConvert] = useState<Lead | null>(null);
  const [creditLimitInput, setCreditLimitInput] = useState(10000);
  const [discountPercentInput, setDiscountPercentInput] = useState(7.5);
  const [newLeadModalOpen, setNewLeadModalOpen] = useState(false);
  
  // Drag and Drop state
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<LeadStatus | null>(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>('all');
  const [selectedSpendFilter, setSelectedSpendFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchLiveLeads = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/admin/leads');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.leads)) {
          setLiveDbLeads(data.leads);
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
    const interval = setInterval(fetchLiveLeads, 8000);
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

  // New Lead Form
  const [newLeadForm, setNewLeadForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    sector: 'fine_dining' as Sector,
    postcode: '',
    city: 'Birmingham',
    estimatedWeeklySpend: 3000,
    source: 'cold_outreach' as const,
    assignedSalesRep: 'Commercial Desk Lead',
    notes: '',
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeadForConvert) return;

    // 1. Submit to Supabase Server Action
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

    // 2. Update local state store
    convertLeadToCustomer(
      selectedLeadForConvert.id,
      Number(creditLimitInput),
      Number(discountPercentInput)
    );

    alert(`Successfully converted ${selectedLeadForConvert.companyName} into an active Trade Account with £${Number(creditLimitInput).toLocaleString()} credit facility!`);
    setSelectedLeadForConvert(null);
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
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
      estimatedWeeklySpend: 3000,
      source: 'cold_outreach',
      assignedSalesRep: 'Commercial Desk Lead',
      notes: '',
    });
  };

  // Drag and drop handlers
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

  // Filtered Leads (with defensive checks against null/undefined DB values)
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

    const matchesSector = selectedSectorFilter === 'all' || lead.sector === selectedSectorFilter;

    const spend = typeof lead.estimatedWeeklySpend === 'number' ? lead.estimatedWeeklySpend : 0;
    let matchesSpend = true;
    if (selectedSpendFilter === '<2k') matchesSpend = spend < 2000;
    else if (selectedSpendFilter === '2k-5k') matchesSpend = spend >= 2000 && spend <= 5000;
    else if (selectedSpendFilter === '5k+') matchesSpend = spend > 5000;

    return matchesSearch && matchesSector && matchesSpend;
  });

  // Calculate Overall Pipeline Metrics safely
  const totalPipelineValue = leads.reduce((sum, l) => sum + (typeof l?.estimatedWeeklySpend === 'number' ? l.estimatedWeeklySpend : 0), 0);
  const totalWonValue = leads.filter((l) => l?.status === 'account_opened').reduce((sum, l) => sum + (typeof l?.estimatedWeeklySpend === 'number' ? l.estimatedWeeklySpend : 0), 0);
  const totalWonCount = leads.filter((l) => l?.status === 'account_opened').length;

  return (
    <div className="p-6 sm:p-8 space-y-8 min-h-screen bg-obsidian-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-cream/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 uppercase font-bold">
            <Users className="w-3.5 h-3.5" />
            <span>Commercial Sales Pipeline & CRM</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            B2B Foodservice Lead Acquisition Board
          </h1>
          <p className="text-xs text-cream/60">
            Every website inquiry and price request automatically enters this pipeline. Drag & drop deals or use 1-click stage progression.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={fetchLiveLeads}
            disabled={isSyncing}
            className="px-3.5 py-2.5 rounded-xl bg-obsidian-900 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs hover:bg-obsidian-850 flex items-center gap-1.5 transition-all shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Live Leads'}</span>
          </button>
          <button
            onClick={() => setNewLeadModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 text-obsidian-950 font-bold text-xs shadow-emerald-glow hover:brightness-110 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Inbound Prospect</span>
          </button>
        </div>
      </div>

      {/* Top Level Pipeline Rollup Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border-cream/10">
          <div>
            <span className="text-[10px] font-mono uppercase text-cream/40 block">Total Active Pipeline</span>
            <span className="font-display text-2xl font-bold text-cream">£{totalPipelineValue.toLocaleString()}/wk</span>
            <span className="text-[10px] text-cream/60 block">Annualized: £{(totalPipelineValue * 52).toLocaleString()}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border-emerald-500/30 bg-emerald-500/5">
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">Converted Accounts (Won)</span>
            <span className="font-display text-2xl font-bold text-emerald-300">£{totalWonValue.toLocaleString()}/wk</span>
            <span className="text-[10px] text-emerald-400/80 block">{totalWonCount} Active Commercial Accounts</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-obsidian-950 flex items-center justify-center font-bold shadow-emerald-glow">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border-cream/10">
          <div>
            <span className="text-[10px] font-mono uppercase text-cream/40 block">Total Prospects</span>
            <span className="font-display text-2xl font-bold text-cream">{leads.length} Inbound Leads</span>
            <span className="text-[10px] text-champagne font-mono block">100% Inbound Capture</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col lg:flex-row gap-4 justify-between items-center border-cream/15">
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Sector Filters */}
          <span className="text-[11px] font-mono uppercase text-cream/40 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Sector:</span>
          </span>
          {[
            { key: 'all', label: 'All Sectors' },
            { key: 'fine_dining', label: 'Fine Dining' },
            { key: 'hotel_hospitality', label: 'Hotels' },
            { key: 'care_home', label: 'Care Homes' },
            { key: 'catering_events', label: 'Caterers' },
            { key: 'pub_bar', label: 'Pubs & Bars' },
          ].map((sec) => (
            <button
              key={sec.key}
              onClick={() => setSelectedSectorFilter(sec.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedSectorFilter === sec.key
                  ? 'bg-champagne text-obsidian-950 font-bold shadow-gold-glow'
                  : 'bg-obsidian-900 text-cream/70 hover:text-cream border border-cream/10'
              }`}
            >
              {sec.label}
            </button>
          ))}

          {/* Spend Filter Pills */}
          <span className="text-[11px] font-mono uppercase text-cream/40 ml-2 mr-1">Spend:</span>
          {[
            { key: 'all', label: 'All' },
            { key: '<2k', label: '<£2k' },
            { key: '2k-5k', label: '£2k-£5k' },
            { key: '5k+', label: '£5k+' },
          ].map((sp) => (
            <button
              key={sp.key}
              onClick={() => setSelectedSpendFilter(sp.key)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedSpendFilter === sp.key
                  ? 'bg-emerald-500 text-obsidian-950 font-bold shadow-emerald-glow'
                  : 'bg-obsidian-900 text-cream/70 hover:text-cream border border-cream/10'
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search business, contact, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-obsidian-900 border border-cream/20 rounded-xl pl-10 pr-4 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
          />
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4.5 overflow-x-auto pb-6">
        {COLUMNS.map((col, colIndex) => {
          const colLeads = filteredLeads.filter((l) => l.status === col.status);
          const colSpend = colLeads.reduce((sum, l) => sum + l.estimatedWeeklySpend, 0);
          const isDragOver = dragOverColumn === col.status;

          return (
            <div
              key={col.status}
              onDragOver={(e) => handleDragOver(e, col.status)}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(col.status)}
              className={`flex flex-col min-w-[280px] rounded-2xl p-3.5 space-y-3 transition-all ${
                col.glow
                  ? 'bg-emerald-950/20 border-2 border-emerald-500/40 shadow-emerald-glow'
                  : 'glass-panel border-cream/15'
              } ${isDragOver ? 'ring-2 ring-champagne bg-champagne/5' : ''}`}
            >
              {/* Column Header & Dynamic Rollup */}
              <div className="pb-2.5 border-b border-cream/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold ${col.color}`}>
                    {col.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${col.badgeBg}`}>
                    {colLeads.length}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-cream/50 flex items-center justify-between">
                  <span>Pipeline Value:</span>
                  <strong className="text-champagne font-bold">£{colSpend.toLocaleString()}/wk</strong>
                </div>
              </div>

              {/* Deals Container */}
              <div className="flex-1 space-y-3 min-h-[420px]">
                {colLeads.length === 0 ? (
                  <div className={`h-full min-h-[180px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center text-xs transition-colors ${
                    isDragOver ? 'border-champagne bg-champagne/10 text-champagne' : 'border-cream/10 text-cream/30'
                  }`}>
                    <Sparkles className="w-5 h-5 mb-1 opacity-50" />
                    <span>Drop deals here to advance</span>
                  </div>
                ) : (
                  colLeads.map((lead) => {
                    const spend = typeof lead.estimatedWeeklySpend === 'number' ? lead.estimatedWeeklySpend : 0;
                    const isHot = spend >= 4000;
                    const isFollowUpDue = col.status === 'contacted' || col.status === 'price_list_sent';
                    const isLiveSupabase = lead.id && lead.id.length > 20 && lead.id.includes('-');

                    return (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={() => handleDragStart(lead.id)}
                        className="p-4 rounded-xl bg-obsidian-900 border border-cream/10 hover:border-champagne/50 transition-all space-y-3 shadow-lg group cursor-grab active:cursor-grabbing hover:-translate-y-0.5"
                      >
                        {/* Title & Spend */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h3 className="font-bold text-cream text-sm leading-snug group-hover:text-champagne transition-colors">
                                {lead.companyName || 'Inbound Commercial Prospect'}
                              </h3>
                              {isLiveSupabase && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 mt-0.5">
                                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                                  <span>LIVE CLOUD INBOUND</span>
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-xs font-bold text-champagne shrink-0 bg-champagne/10 px-2 py-0.5 rounded border border-champagne/20">
                              £{spend.toLocaleString()}/wk
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-cream/70">
                            <Building2 className="w-3.5 h-3.5 text-champagne shrink-0" />
                            <span className="capitalize">{(lead.sector || 'fine_dining').replace(/_/g, ' ')}</span>
                            <span className="text-cream/30">&bull;</span>
                            <span>{lead.city || 'Birmingham'}</span>
                          </div>
                        </div>

                        {/* SLA / Priority Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {isHot && (
                            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 text-[10px] font-mono flex items-center gap-1 border border-rose-500/20">
                              <Flame className="w-3 h-3 text-rose-400" />
                              <span>Hot High Value</span>
                            </span>
                          )}
                          {isFollowUpDue && (
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono flex items-center gap-1 border border-amber-500/20">
                              <Clock className="w-3 h-3 text-amber-400" />
                              <span>Follow-up Due</span>
                            </span>
                          )}
                        </div>

                        {/* Contact info with 1-click actions & copy */}
                        <div className="pt-2 border-t border-cream/5 space-y-1.5 text-xs text-cream/60">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-cream/90">{lead.contactName || 'Trade Buyer'}</span>
                            <span className="text-[10px] font-mono text-cream/40 uppercase">{(lead.source || 'inbound_web').replace(/_/g, ' ')}</span>
                          </div>

                          {/* Email link with copy button */}
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <a
                              href={`mailto:${lead.email}?subject=Rootwills Wholesale Supply - Pricing Enquiry`}
                              className="text-cream/70 hover:text-champagne flex items-center gap-1.5 truncate max-w-[190px]"
                              title="Send email"
                            >
                              <Mail className="w-3 h-3 text-champagne shrink-0" />
                              <span className="truncate">{lead.email}</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => handleCopy(lead.email, `${lead.id}-email`)}
                              className="text-cream/40 hover:text-cream p-1"
                              title="Copy email to clipboard"
                            >
                              {copiedId === `${lead.id}-email` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>

                          {/* Phone link with copy button */}
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <a
                              href={`tel:${lead.phone}`}
                              className="text-cream/70 hover:text-champagne flex items-center gap-1.5"
                              title="Call phone"
                            >
                              <Phone className="w-3 h-3 text-champagne shrink-0" />
                              <span>{lead.phone}</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => handleCopy(lead.phone, `${lead.id}-phone`)}
                              className="text-cream/40 hover:text-cream p-1"
                              title="Copy phone to clipboard"
                            >
                              {copiedId === `${lead.id}-phone` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>

                        {/* Notes if available */}
                        {lead.notes && (
                          <div className="p-2 rounded bg-obsidian-950 text-[11px] text-cream/50 italic border border-cream/5">
                            "{lead.notes}"
                          </div>
                        )}

                        {/* Stage Progression Actions */}
                        <div className="pt-2 border-t border-cream/10 flex items-center justify-between gap-2">
                          {colIndex < COLUMNS.length - 1 ? (
                            <button
                              type="button"
                              onClick={() => updateLeadStatus(lead.id, COLUMNS[colIndex + 1].status)}
                              className="flex-1 py-1.5 px-2 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 border border-cream/15 text-[11px] font-medium text-cream flex items-center justify-center gap-1 transition-colors"
                            >
                              <span>Next Stage</span>
                              <ArrowRight className="w-3 h-3 text-champagne" />
                            </button>
                          ) : (
                            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Active Trade Account</span>
                            </span>
                          )}

                          {lead.status !== 'account_opened' && (
                            <button
                              type="button"
                              onClick={() => setSelectedLeadForConvert(lead)}
                              className="py-1.5 px-3 rounded-lg bg-emerald-500 hover:brightness-110 text-obsidian-950 text-[11px] font-bold shadow-emerald-glow flex items-center gap-1"
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

      {/* Convert Lead to Customer Modal */}
      {selectedLeadForConvert && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedLeadForConvert(null)}
              className="absolute top-6 right-6 text-cream/40 hover:text-cream"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 text-[11px] font-mono uppercase text-emerald-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1-Click Lead-to-Customer Conversion</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-cream">
                Open Trade Account: {selectedLeadForConvert.companyName}
              </h2>
              <p className="text-xs text-cream/60">
                Instantly provision a verified trade credit facility, assign locked discount terms, and send automated onboarding credentials.
              </p>
            </div>

            <form onSubmit={handleConvert} className="space-y-4 text-xs">
              <div className="p-3 bg-obsidian-950 rounded-xl border border-cream/10 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-cream/70">
                  <span>Contact:</span>
                  <span className="text-cream font-bold">{selectedLeadForConvert.contactName}</span>
                </div>
                <div className="flex justify-between text-cream/70">
                  <span>Estimated Spend:</span>
                  <span className="text-champagne font-bold">£{selectedLeadForConvert.estimatedWeeklySpend.toLocaleString()}/week</span>
                </div>
                <div className="flex justify-between text-cream/70">
                  <span>Location:</span>
                  <span className="text-cream">{selectedLeadForConvert.city} ({selectedLeadForConvert.postcode})</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-cream/70 mb-1">
                  Approved Trade Credit Limit (£)
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-cream/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    value={creditLimitInput}
                    onChange={(e) => setCreditLimitInput(Number(e.target.value))}
                    step="500"
                    min="1000"
                    max="50000"
                    className="w-full bg-obsidian-900 border border-cream/20 rounded-xl pl-9 pr-4 py-2.5 text-xs text-cream focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-cream/70 mb-1">
                  Assigned Baseline Contract Discount Tier (%)
                </label>
                <input
                  type="number"
                  value={discountPercentInput}
                  onChange={(e) => setDiscountPercentInput(Number(e.target.value))}
                  step="0.5"
                  min="0"
                  max="30"
                  className="w-full bg-obsidian-900 border border-cream/20 rounded-xl px-4 py-2.5 text-xs text-cream focus:outline-none focus:border-champagne"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-emerald-500 text-obsidian-950 font-bold text-xs shadow-emerald-glow hover:brightness-110 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Open Active Trade Account</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLeadForConvert(null)}
                  className="px-5 py-3 rounded-xl bg-obsidian-900 border border-cream/15 text-cream/70 hover:text-cream text-xs font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Inbound Lead Modal */}
      {newLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative border-cream/20">
            <button
              onClick={() => setNewLeadModalOpen(false)}
              className="absolute top-6 right-6 text-cream/40 hover:text-cream"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold text-cream">Add New Wholesale Lead</h2>
              <p className="text-xs text-cream/60">Manually log a phone inquiry or sales rep site visit.</p>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-cream/70 mb-1">Company / Venue Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.companyName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, companyName: e.target.value })}
                    placeholder="e.g. The Ivy Temple Row"
                    className="w-full bg-obsidian-900 border border-cream/20 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-cream/70 mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.contactName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, contactName: e.target.value })}
                    placeholder="e.g. Head Chef Alex"
                    className="w-full bg-obsidian-900 border border-cream/20 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-cream/70 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    placeholder="alex@theivy.co.uk"
                    className="w-full bg-obsidian-900 border border-cream/20 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-cream/70 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="07700 900456"
                    className="w-full bg-obsidian-900 border border-cream/20 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-cream/70 mb-1">Sector</label>
                  <select
                    value={newLeadForm.sector}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, sector: e.target.value as Sector })}
                    className="w-full bg-obsidian-900 border border-cream/20 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                  >
                    <option value="fine_dining">Fine Dining</option>
                    <option value="hotel_hospitality">Hotels</option>
                    <option value="care_home">Care Homes</option>
                    <option value="catering_events">Catering & Events</option>
                    <option value="pub_bar">Pubs & Bars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-cream/70 mb-1">City</label>
                  <input
                    type="text"
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="w-full bg-obsidian-900 border border-cream/20 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-cream/70 mb-1">Est. Spend (£/wk)</label>
                  <input
                    type="number"
                    value={newLeadForm.estimatedWeeklySpend}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, estimatedWeeklySpend: Number(e.target.value) })}
                    className="w-full bg-obsidian-900 border border-cream/20 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110"
                >
                  Create & Place on Kanban
                </button>
                <button
                  type="button"
                  onClick={() => setNewLeadModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-obsidian-900 border border-cream/15 text-cream/70 hover:text-cream text-xs"
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
