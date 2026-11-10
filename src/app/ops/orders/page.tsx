'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ShoppingBag,
  Search,
  Filter,
  Plus,
  Phone,
  MessageCircle,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  ChevronRight,
  X,
  Building2,
  FileText,
  ShieldCheck,
  CreditCard,
  MapPin,
  Calendar,
  UserCheck
} from 'lucide-react';
import { WholesaleOrder, INITIAL_OPS_ORDERS } from '@/lib/orders';

export default function OpsOrdersPage() {
  const [orders, setOrders] = useState<WholesaleOrder[]>(INITIAL_OPS_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<WholesaleOrder | null>(null);

  // Load any live submitted orders from the API / localStorage
  useEffect(() => {
    const fetchLiveOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          if (data.orders && Array.isArray(data.orders) && data.orders.length > 0) {
            setOrders((prev) => {
              const ids = new Set(data.orders.map((o: any) => o.id));
              const remainingInitial = prev.filter((o) => !ids.has(o.id));
              return [...data.orders, ...remainingInitial];
            });
          }
        }
      } catch {
        // Fallback to client history
        try {
          const stored = localStorage.getItem('rootwills_order_history');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setOrders((prev) => {
                const ids = new Set(parsed.map((o: any) => o.id));
                const remainingInitial = prev.filter((o) => !ids.has(o.id));
                return [...parsed, ...remainingInitial];
              });
            }
          }
        } catch {
          // ignore
        }
      }
    };

    fetchLiveOrders();
  }, []);

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.postcode || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalCasesToday = orders.reduce((acc, o) => acc + o.totalCases, 0);
  const receivedCount = orders.filter((o) => o.status === 'Received').length;
  const pickingCount = orders.filter((o) => o.status === 'Picking').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;

  const updateOrderStatus = (orderId: string, newStatus: WholesaleOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const getStatusBadge = (status: WholesaleOrder['status']) => {
    switch (status) {
      case 'Received':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Picking':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Loaded':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Out for Delivery':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Wholesale Customer &amp; Order Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Incoming customer applications, trade qualification, and ordered lines manifests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/447984709478"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Night Dispatch WhatsApp</span>
          </a>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Total Cases Requested</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{totalCasesToday}</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
            <Truck className="w-3.5 h-3.5" /> Across {orders.length} accounts
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-blue-500">New Applications (Queue)</span>
          <div className="text-2xl sm:text-3xl font-black text-blue-700 mt-1">{receivedCount}</div>
          <span className="text-[11px] text-slate-400 font-mono mt-0.5">Awaiting trade approval</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-500">Active In Picking</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-700 mt-1">{pickingCount}</div>
          <span className="text-[11px] text-slate-400 font-mono mt-0.5">Warehouse staged</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600">Onboarded &amp; Delivered</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">{deliveredCount}</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5">Active trading accounts</span>
        </div>
      </div>

      {/* Search & Filter Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search ref, company, contact, or postcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-800 outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['All', 'Received', 'Picking', 'Loaded', 'Out for Delivery', 'Delivered'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-mono text-[10.5px] uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Application Ref</th>
                <th className="py-3 px-4">Company &amp; Contact</th>
                <th className="py-3 px-4">Sites</th>
                <th className="py-3 px-4">Postcode</th>
                <th className="py-3 px-4">Weekly Spend</th>
                <th className="py-3 px-4">Cases</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No customer applications match your filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {order.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{order.company}</div>
                      <div className="text-[11px] text-slate-500">
                        {order.name} ({order.jobTitle}) • {order.phone}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {order.numberOfSites} {order.numberOfSites === '1' ? 'site' : 'sites'}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">
                      {order.postcode}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {order.approxWeeklySpend || 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-bold text-slate-900">{order.totalCases} cases</span>
                      <span className="text-slate-400 text-[11px]"> ({order.totalLines} lines)</span>
                    </td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${getStatusBadge(order.status)}`}
                      >
                        <option value="Received">Received</option>
                        <option value="Picking">Picking</option>
                        <option value="Loaded">Loaded</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-all"
                      >
                        View Slip
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── DETAILED APPLICATION & MANIFEST MODAL ─── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs select-none">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl relative"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 font-mono text-xs font-bold text-slate-800">
                  {selectedOrder.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Customer Application &amp; Order Slip
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Customer Profile Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-slate-400 block mb-0.5">
                    Company &amp; Applicant
                  </span>
                  <div className="font-bold text-slate-900 text-sm">{selectedOrder.company}</div>
                  <div className="text-slate-700 mt-0.5 font-medium">
                    {selectedOrder.name} ({selectedOrder.jobTitle})
                  </div>
                  <div className="text-slate-500 font-mono mt-0.5">{selectedOrder.email}</div>
                  <div className="text-slate-500 font-mono">{selectedOrder.phone}</div>
                </div>

                <div>
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-slate-400 block mb-0.5">
                    Location &amp; Operations
                  </span>
                  <div className="font-bold text-slate-900">Postcode: {selectedOrder.postcode}</div>
                  <div className="text-slate-700">Number of Sites: {selectedOrder.numberOfSites}</div>
                  <div className="text-slate-600 mt-1">Current Supplier: {selectedOrder.currentSupplier || 'Not specified'}</div>
                  <div className="text-slate-600">Weekly Spend: {selectedOrder.approxWeeklySpend || 'Not specified'}</div>
                  <div className="text-slate-600">Weekly Deliveries: {selectedOrder.approxWeeklyDeliveries || 'Not specified'}</div>
                </div>

                {selectedOrder.message && (
                  <div className="sm:col-span-2 pt-2 border-t border-slate-200">
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-slate-400 block mb-0.5">
                      Applicant Message / Delivery Notes:
                    </span>
                    <p className="text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 font-mono text-[11px] leading-relaxed">
                      {selectedOrder.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Items Manifest List (if items attached) */}
              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
                    <span>Requested Wholesale Lines ({selectedOrder.totalLines} lines • {selectedOrder.totalCases} cases)</span>
                    <span>Quantity</span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden bg-white">
                    {selectedOrder.items.map((it) => (
                      <div key={it.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-11 h-11 rounded-lg bg-slate-50 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center p-1">
                            <Image src={it.image} alt={it.name} fill sizes="44px" className="object-contain" unoptimized />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 truncate text-[13px]">{it.name}</div>
                            <div className="text-[11px] font-mono text-slate-500">
                              {it.packSize} • SKU: {it.sku}
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono font-bold text-sm bg-slate-900 text-white px-2.5 py-1 rounded-lg">
                            {it.qty} {it.qty === 1 ? 'case' : 'cases'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-200">
                <a
                  href={`tel:${selectedOrder.phone}`}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Applicant ({selectedOrder.phone})</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#F3D08A]" />
                  <span>Print Delivery Manifest (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── PRINT-ONLY B2B DELIVERY NOTE & MANIFEST ─── */}
      {selectedOrder && (
        <div id="printable-delivery-manifest" className="hidden print:block fixed inset-0 bg-white text-black p-8 font-sans z-[99999]">
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              body * { visibility: hidden !important; }
              #printable-delivery-manifest, #printable-delivery-manifest * { visibility: visible !important; }
              #printable-delivery-manifest { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; background: white !important; color: black !important; padding: 24px !important; }
            }
          `}} />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-black">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full border border-black/30 overflow-hidden shrink-0 p-1">
                <Image
                  src="/images/logo.png"
                  alt="Rootwills Master Seal"
                  fill
                  sizes="56px"
                  className="object-contain p-0.5 rounded-full"
                  unoptimized
                />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-black">ROOTWILLS LTD</h1>
                <p className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider">
                  Commercial Food Services &amp; Pre-Dawn Hospitality Logistics
                </p>
                <p className="text-[10px] text-stone-600 font-mono">
                  Central Depot • Birmingham B5 4RB • sales@rootwills.co.uk • 016164 12803
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-stone-500">
                Official Manifest
              </div>
              <div className="text-xl font-mono font-black text-black">{selectedOrder.id}</div>
              <div className="text-xs font-bold text-stone-700">Pre-Dawn Drop (04:00 – 07:30 AM)</div>
            </div>
          </div>

          {/* Delivery Venue & Route Details */}
          <div className="grid grid-cols-2 gap-4 py-4 border-b border-black/20 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">Deliver To Venue</span>
              <div className="text-sm font-bold text-black">{selectedOrder.company}</div>
              <div>Contact: <strong>{selectedOrder.name}</strong> ({selectedOrder.jobTitle})</div>
              <div>Direct Phone: <span className="font-mono">{selectedOrder.phone}</span></div>
              <div>Account Email: <span className="font-mono">{selectedOrder.email}</span></div>
            </div>

            <div className="space-y-1 text-right">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">Logistics &amp; Key Drop</span>
              <div className="font-mono font-bold text-sm">Postcode: {selectedOrder.postcode}</div>
              <div>Total Scheduled: <strong>{selectedOrder.totalCases} Cases</strong> ({selectedOrder.totalLines} Lines)</div>
              {selectedOrder.message && (
                <div className="text-[11px] text-stone-700 italic border border-black/20 p-2 rounded mt-1 bg-stone-50 text-left">
                  <strong>Access Notes:</strong> {selectedOrder.message}
                </div>
              )}
            </div>
          </div>

          {/* Itemized Lines Manifest Table */}
          <div className="py-4">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 text-black">
              Itemized Wholesale Lines &amp; Picking Verification
            </h2>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-black text-[10.5px] uppercase font-bold text-stone-600">
                  <th className="py-1.5 w-10">#</th>
                  <th className="py-1.5 w-28">SKU</th>
                  <th className="py-1.5">Product Description</th>
                  <th className="py-1.5 w-24">Pack Size</th>
                  <th className="py-1.5 w-24">Temp Zone</th>
                  <th className="py-1.5 w-20 text-center">Cases</th>
                  <th className="py-1.5 w-20 text-center">Picked [✓]</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((it, idx) => (
                    <tr key={it.id || idx}>
                      <td className="py-2 text-stone-500 font-mono text-[11px]">{idx + 1}</td>
                      <td className="py-2 font-mono font-bold text-[11px] text-black">{it.sku}</td>
                      <td className="py-2 font-medium text-black">{it.name}</td>
                      <td className="py-2 font-mono text-stone-700">{it.packSize}</td>
                      <td className="py-2 text-stone-600 font-medium">{it.tempZone || 'Ambient'}</td>
                      <td className="py-2 text-center font-mono font-bold text-black">{it.qty}</td>
                      <td className="py-2 text-center">
                        <div className="w-4 h-4 border border-black mx-auto rounded-xs" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-3 text-stone-500 italic text-center">
                      Customer application / standing order agreement line setup
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Dual Sign-Off Handoff Verification */}
          <div className="grid grid-cols-2 gap-6 pt-6 mt-4 border-t-2 border-black text-xs">
            <div className="border border-black/30 p-3 rounded space-y-3">
              <span className="font-bold uppercase tracking-wider text-[10px] text-stone-600 block">
                1. Birmingham Depot Loading &amp; Driver Sign-Off
              </span>
              <div className="text-[11px]">Departure Temp Verified (Chilled 1–4°C / Butchery 0–2°C): [ ✓ ]</div>
              <div className="pt-6 border-b border-black/40 text-[10px] text-stone-500">
                Driver Signature &amp; Fleet Vehicle No.
              </div>
            </div>

            <div className="border border-black/30 p-3 rounded space-y-3">
              <span className="font-bold uppercase tracking-wider text-[10px] text-stone-600 block">
                2. Venue Kitchen Receiving Sign-Off
              </span>
              <div className="text-[11px]">Goods Received in Good Order &amp; Sealed: [ &nbsp;&nbsp;&nbsp;&nbsp; ]</div>
              <div className="pt-6 border-b border-black/40 text-[10px] text-stone-500">
                Head Chef / Receiving Buyer Signature &amp; Time
              </div>
            </div>
          </div>

          <div className="pt-4 text-center text-[10px] text-stone-500 font-mono">
            Rootwills Ltd • Company Registered in England &amp; Wales • Thank you for your partnership.
          </div>
        </div>
      )}
    </div>
  );
}
