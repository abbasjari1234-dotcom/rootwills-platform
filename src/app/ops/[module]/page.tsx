'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Tag,
  Warehouse,
  FileText,
  Package,
  Truck,
  BarChart3,
  ShieldCheck,
  CreditCard,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar,
  AlertTriangle,
  Download,
  Filter
} from 'lucide-react';
import { VERIFIED_TRADE_ACCOUNTS } from '@/lib/tradeAuth';

interface ModuleConfig {
  title: string;
  subtitle: string;
  icon: any;
  kpis: { label: string; value: string; sub: string; badge?: string }[];
  tableHeaders: string[];
  mockRows: any[];
}

export default function DynamicOpsModulePage() {
  const params = useParams();
  const slug = String(params?.module || 'pricing');
  const [searchTerm, setSearchTerm] = useState('');

  const MODULES: Record<string, ModuleConfig> = {
    pricing: {
      title: 'Commercial Hospitality Pricing Tiers',
      subtitle: 'Wholesale contract tiers, margin multipliers, and bespoke pricing schedules.',
      icon: Tag,
      kpis: [
        { label: 'Active Contract Tiers', value: '4 Tiers', sub: 'From Luxury to Baseline' },
        { label: 'Average Contract Margin', value: '23.8%', sub: '+2.1% vs wholesale index', badge: 'Optimal' },
        { label: 'Hospitality Venues Mapped', value: `${VERIFIED_TRADE_ACCOUNTS.length} Venues`, sub: 'Direct contracted pricing' },
        { label: 'Zero-Rated Food Share', value: '98.4%', sub: 'HMRC compliant catering food' },
      ],
      tableHeaders: ['TIER CODE', 'TIER NAME & SCOPE', 'MARGIN DISCOUNT', 'PAYMENT TERMS', 'ASSIGNED CLIENTS', 'STATUS'],
      mockRows: [
        {
          code: 'TIER-1-LUX',
          name: 'Tier 1 Luxury & Fine Dining',
          discount: '-14% Contract Direct',
          terms: '30 Days Net',
          clients: 'The Savoy London, Hawksmoor, Gordon Ramsay',
          status: 'Active',
        },
        {
          code: 'TIER-1-QSR',
          name: 'Franchise & QSR Direct',
          discount: '-12% Bulk Drop Rate',
          terms: '14 Days Net',
          clients: 'Little Dessert Shop, Jumpin Jackets',
          status: 'Active',
        },
        {
          code: 'TIER-2-COMM',
          name: 'Tier 2 Midlands Casual Dining',
          discount: '-8% Volume Commercial',
          terms: '14 Days Net',
          clients: 'The Ivy Birmingham, Dishoom, Pyaali',
          status: 'Active',
        },
        {
          code: 'TIER-BASE',
          name: 'Standard Wholesale Baseline',
          discount: 'List Wholesale Price',
          terms: '7 Days / Pre-Payment',
          clients: 'Onboarding & Single-Site Venues',
          status: 'Active',
        },
      ],
    },
    inventory: {
      title: 'Multi-Temperature Inventory & Depot Stock',
      subtitle: 'Central Birmingham depot stock bays, temperature zones, and pallet allocations.',
      icon: Warehouse,
      kpis: [
        { label: 'Total Catalog SKUs', value: '5,487', sub: '100% active culinary catalog' },
        { label: 'Chilled Storage 1–4°C', value: '1,842 lines', sub: 'Dairy, charcuterie & farm produce' },
        { label: 'Butchery 0–2°C', value: '275 lines', sub: 'Red Tractor & prime beef' },
        { label: 'Deep Freeze -18°C', value: '623 lines', sub: 'Catering fries, pastry & gelato' },
      ],
      tableHeaders: ['BAY REF', 'TEMP ZONE', 'CATEGORY ALLOCATION', 'OCCUPANCY', 'TEMPERATURE AUDIT', 'STATUS'],
      mockRows: [
        { code: 'BAY-CH-01', name: 'Chilled 1–4°C', discount: 'Dairy & Artisan Cheeses', terms: '84% Full', clients: 'Audited 02:40 AM (+2.8°C)', status: 'Compliant' },
        { code: 'BAY-BU-01', name: 'Butchery 0–2°C', discount: 'Prime British Steaks & Poultry', terms: '76% Full', clients: 'Audited 02:45 AM (+0.9°C)', status: 'Compliant' },
        { code: 'BAY-FZ-02', name: 'Deep Freeze -18°C', discount: 'Bakery Bake-Off & Frozen Sides', terms: '89% Full', clients: 'Audited 02:50 AM (-19.2°C)', status: 'Compliant' },
        { code: 'BAY-AM-04', name: 'Ambient Dry Larder', discount: 'Oils, Rice, Flours & Spices', terms: '92% Full', clients: 'Audited 02:55 AM (Ambient 16°C)', status: 'Compliant' },
      ],
    },
    procurement: {
      title: 'Procurement, Farm Orders & Inbound POs',
      subtitle: 'Direct British grower allocations, Red Tractor slaughter dates, and wholesale bulk purchase orders.',
      icon: FileText,
      kpis: [
        { label: 'Active Inbound POs', value: '18 POs', sub: 'Depot arrivals scheduled 01:00 AM' },
        { label: 'British Farm Sourcing', value: '92%', sub: 'Red Tractor & PGI certified' },
        { label: 'Pallets Expected Tonight', value: '44 Pallets', sub: 'Multi-temperature intake' },
        { label: 'Cost Price Index', value: '£42,850', sub: 'Weekly supplier fulfillment' },
      ],
      tableHeaders: ['PO NUMBER', 'SUPPLIER / GROWER', 'CATEGORY COMMODITY', 'DELIVERY DEPOT WINDOW', 'TOTAL UNITS', 'STATUS'],
      mockRows: [
        { code: 'PO-2026-891', name: 'Midlands British Growers Co-Op', discount: 'Grade A Baking Potatoes 40s/50s & Roots', terms: '01:30 AM Intake', clients: '420 Sacks', status: 'In Transit' },
        { code: 'PO-2026-892', name: 'Cotswold Butchery & Farm Abattoir', discount: 'Red Tractor Prime Beef Ribeye & Striploins', terms: '02:00 AM Intake', clients: '180 Primal Loins', status: 'Scheduled' },
        { code: 'PO-2026-893', name: 'Severn Valley Artisan Dairies', discount: 'Barista Whole Milk & Double Cream', terms: '02:30 AM Intake', clients: '650 Gallons', status: 'Received' },
        { code: 'PO-2026-894', name: 'Hobbs House Craft Bakery', discount: 'Sourdough Loaves, Brioche & Baguettes', terms: '03:15 AM Intake', clients: '840 Fresh Bake Units', status: 'Baking' },
      ],
    },
    fulfilment: {
      title: 'Pre-Dawn Fulfilment & Chef Picking Desk',
      subtitle: 'Night shift picking lanes, multi-temperature staging totes, and crate barcoding.',
      icon: Package,
      kpis: [
        { label: 'Scheduled Drops Tonight', value: '41 Orders', sub: 'Pre-dawn hospitality dispatch' },
        { label: 'Pick Accuracy Rate', value: '99.8%', sub: 'Dual chef verification' },
        { label: 'Picking Velocity', value: '142 Cases / Hr', sub: 'Night team efficiency' },
        { label: 'Cut-off Time', value: '10:00 PM', sub: 'Guaranteed 04:00 AM drop' },
      ],
      tableHeaders: ['ROUTE MANIFEST', 'VENUE VENUE', 'SCHEDULED CRATES', 'TEMP ZONES', 'DISPATCH SLA', 'STATUS'],
      mockRows: [
        { code: 'ROUTE-BHM-01', name: 'The Ivy & Pyaali By Jaan', discount: '14 Cases (Chilled + Bakery)', terms: 'Dual-Zone Tote', clients: '04:30 AM Slot', status: 'Staged' },
        { code: 'ROUTE-BHM-02', name: 'Jumpin Jackets & Selly Oak Brigade', discount: '18 Cases (Baking Potatoes + Cheeses)', terms: 'Heavy Ambient + Chill', clients: '05:00 AM Slot', status: 'Picking' },
        { code: 'ROUTE-WLV-01', name: 'Little Dessert Shop Network', discount: '24 Cases (Dairy + Bakery)', terms: 'Refrigerated Bay', clients: '05:30 AM Slot', status: 'Verified' },
        { code: 'ROUTE-LDN-01', name: 'The Savoy London & Hawksmoor', discount: '36 Cases (Butchery + Day-Boat)', terms: 'Dedicated Pre-Dawn Runner', clients: '04:00 AM Slot', status: 'Loaded' },
      ],
    },
    logistics: {
      title: 'Logistics Fleet & Pre-Dawn Route Dispatch',
      subtitle: 'Refrigerated van routes, temperature telemetry, and key-drop GPS tracking.',
      icon: Truck,
      kpis: [
        { label: 'Active Fleet Vans', value: '8 Vehicles', sub: 'Dual-evaporator Mercedes Sprinters' },
        { label: 'On-Time SLA Retention', value: '99.2%', sub: 'Pre-07:00 AM guarantee' },
        { label: 'Fleet Telemetry Temp', value: '0.8°C / -18.4°C', sub: 'Real-time chill telemetry' },
        { label: 'Midlands Coverage', value: '100%', sub: 'Birmingham, Coventry, Solihull, Wolves' },
      ],
      tableHeaders: ['VAN FLEET ID', 'ASSIGNED DRIVER', 'ROUTE RUN', 'TEMPERATURE SENSORS', 'DELIVERY WINDOW', 'STATUS'],
      mockRows: [
        { code: 'RW-VAN-01', name: 'Marcus Davies (Senior Logistics)', discount: 'Birmingham Central Luxury Hospitality', terms: '+1.2°C (OK) / -19.1°C (OK)', clients: '04:00 – 06:30 AM', status: 'En Route' },
        { code: 'RW-VAN-02', name: 'Tariq Hussain', discount: 'Selly Oak, Edgbaston & South Birmingham', terms: '+1.4°C (OK) / Ambient', clients: '04:30 – 07:00 AM', status: 'Loading' },
        { code: 'RW-VAN-03', name: 'Liam O’Connor', discount: 'Wolverhampton, Walsall & Black Country', terms: '+2.0°C (OK) / -18.8°C (OK)', clients: '05:00 – 07:30 AM', status: 'Prepped' },
        { code: 'RW-VAN-04', name: 'David Smith', discount: 'Solihull & Coventry Gastro Corridors', terms: '+1.1°C (OK) / -18.5°C (OK)', clients: '05:00 – 07:30 AM', status: 'Prepped' },
      ],
    },
    invoices: {
      title: 'Invoices, Billing Ledger & B2B Credit Limits',
      subtitle: 'Commercial statement generation, VAT food categorization, and trade credit terms.',
      icon: CreditCard,
      kpis: [
        { label: 'Total Receivables (Month)', value: '£84,200', sub: 'Commercial hospitality invoices' },
        { label: 'Average Days to Settle', value: '14.2 Days', sub: 'Direct B2B bank transfer' },
        { label: 'Disputed Lines', value: '0.0%', sub: 'Zero discrepancies' },
        { label: 'Active Direct Debits', value: '38 Venues', sub: 'Automated 14-day terms' },
      ],
      tableHeaders: ['INVOICE REF', 'CLIENT ACCOUNT', 'STATEMENT PERIOD', 'NET GOODS', 'VAT (HMRC)', 'TOTAL DUE', 'STATUS'],
      mockRows: [
        { code: 'INV-2026-104', name: 'The Savoy London (Fairmont)', discount: 'Nov 14 – Nov 21, 2026', terms: '£8,500.00', clients: '£0.00 (Zero-Rated)', status: 'Paid' },
        { code: 'INV-2026-105', name: 'Dishoom Covent Garden', discount: 'Nov 14 – Nov 21, 2026', terms: '£12,320.00', clients: '£42.50 (Non-food)', status: 'Settled' },
        { code: 'INV-2026-106', name: 'Little Dessert Shop Network', discount: 'Nov 14 – Nov 21, 2026', terms: '£4,250.00', clients: '£0.00 (Zero-Rated)', status: 'Current (7 Days)' },
        { code: 'INV-2026-107', name: 'Jumpin Jackets (Selly Oak)', discount: 'Nov 21 – Nov 28, 2026', terms: '£1,300.00', clients: '£18.00 (Packaging)', status: 'Due Dec 12' },
      ],
    },
    reports: {
      title: 'Commercial Reports & Procurement Analytics',
      subtitle: 'Gross profit margins, chef reorder frequencies, and product performance analytics.',
      icon: BarChart3,
      kpis: [
        { label: 'Monthly Gross Revenue', value: '£234,859', sub: '+14.2% vs last month' },
        { label: 'Blended Gross Margin', value: '24.6%', sub: 'Target: 22.0%' },
        { label: 'Top Category by Volume', value: 'Butchery & Produce', sub: '44% of total drops' },
        { label: 'Client SLA Satisfaction', value: '98.8%', sub: 'Pre-dawn delivery accuracy' },
      ],
      tableHeaders: ['DEPARTMENT', 'UNITS SOLD (MONTH)', 'GROSS REVENUE', 'SUPPLIER COST', 'NET MARGIN %', 'GROWTH TREND'],
      mockRows: [
        { code: 'DEP-BUTCHERY', name: 'Prime Butchery & Poultry', discount: '14,200 kg', terms: '£68,400', clients: '£51,200', status: '25.1% (+1.8%)' },
        { code: 'DEP-PRODUCE', name: 'Farm Fresh Produce & Salads', discount: '22,400 kg', terms: '£48,200', clients: '£36,100', status: '25.1% (+3.2%)' },
        { code: 'DEP-DAIRY', name: 'Chilled Dairy & Eggs', discount: '18,900 L', terms: '£38,900', clients: '£29,800', status: '23.4% (+0.8%)' },
        { code: 'DEP-FROZEN', name: 'Frozen Chips & Sides', discount: '12,500 kg', terms: '£28,400', clients: '£21,500', status: '24.3% (+2.1%)' },
      ],
    },
    staff: {
      title: 'Operations Staff, Drivers & Role Permissions',
      subtitle: 'Intranet access roles, master executive keys, and warehouse picker allocations.',
      icon: ShieldCheck,
      kpis: [
        { label: 'Active Operations Staff', value: '14 Members', sub: 'Depot, sales & night dispatch' },
        { label: 'Master Passcodes Active', value: 'Verified', sub: 'PBKDF2 encrypted keys' },
        { label: 'Night Pickers on Shift', value: '6 Pickers', sub: 'Birmingham central depot' },
        { label: 'Active Delivery Drivers', value: '8 Drivers', sub: 'Pre-dawn routes' },
      ],
      tableHeaders: ['STAFF ID', 'FULL NAME', 'OPERATIONAL ROLE', 'DIRECT CONTACT', 'SYSTEM ACCESS', 'STATUS'],
      mockRows: [
        { code: 'STF-01', name: 'Floyd Miles', discount: 'Operations & Commercial Director', terms: 'sales@rootwills.co.uk', clients: 'Master Administrative Access', status: 'Active' },
        { code: 'STF-02', name: 'Liam Cooper', discount: 'Head of Depot Logistics & Fleet', terms: 'logistics@rootwills.co.uk', clients: 'Fleet & Picking Desk Lead', status: 'On Shift' },
        { code: 'STF-03', name: 'Elena Rostova', discount: 'Trade Accounts & Client Concierge', terms: 'trade@rootwills.co.uk', clients: 'CRM & Credit Approval Lead', status: 'Active' },
        { code: 'STF-04', name: 'Marcus Davies', discount: 'Night Dispatch Fleet Captain', terms: 'dispatch@rootwills.co.uk', clients: 'Manifest Sign-Off & Routing', status: 'Pre-Dawn Active' },
      ],
    },
  };

  const current = MODULES[slug] || MODULES.pricing;
  const Icon = current.icon;

  const filteredRows = current.mockRows.filter((r) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      (r.code || '').toLowerCase().includes(q) ||
      (r.name || '').toLowerCase().includes(q) ||
      (r.discount || '').toLowerCase().includes(q) ||
      (r.terms || '').toLowerCase().includes(q) ||
      (r.clients || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60">
              <Icon className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Rootwills Operations Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {current.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {current.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {current.kpis.map((kpi, idx) => (
          <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                {kpi.label}
              </span>
              {kpi.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                  {kpi.badge}
                </span>
              )}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{kpi.value}</div>
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
              {kpi.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Search & Action Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={`Search ${current.title.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-500 font-semibold">
            Showing {filteredRows.length} active operational entries
          </span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[10.5px] font-mono uppercase text-slate-400 tracking-wider">
                {current.tableHeaders.map((h, i) => (
                  <th key={i} className={`py-3 px-4 ${i === current.tableHeaders.length - 1 ? 'text-right' : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{r.code}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{r.name}</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">{r.discount}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{r.terms}</td>
                  <td className="py-3.5 px-4 text-slate-700">{r.clients}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
