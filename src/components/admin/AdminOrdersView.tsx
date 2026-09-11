'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/app-store';
import { Order, OrderStatus } from '@/types/orders';
import { OrderStatusBadge } from '@/components/portal/OrderStatusBadge';
import { 
  ClipboardList, 
  Search, 
  Printer, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  FileText,
  RefreshCw,
  Zap,
  Sparkles,
  DollarSign,
  Package
} from 'lucide-react';
import { updateOrderStatusServerAction } from '@/actions/orders';

const STATUS_FLOW: OrderStatus[] = [
  'received',
  'confirmed',
  'picking',
  'dispatch_ready',
  'out_for_delivery',
  'delivered',
];

export function AdminOrdersView() {
  const { orders: storeOrders, updateOrderStatus } = useAppStore();
  const [liveDbOrders, setLiveDbOrders] = useState<Order[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedOrderForPicking, setSelectedOrderForPicking] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  // Fetch live orders via dedicated API on mount and every 8 seconds
  const fetchLiveOrders = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.orders)) {
          setLiveDbOrders(data.orders);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch live orders:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLiveOrders();
    const interval = setInterval(fetchLiveOrders, 8000);
    return () => clearInterval(interval);
  }, []);

  // Merge live Supabase orders with store orders (deduplicating)
  const allOrdersMap = new Map<string, Order>();
  liveDbOrders.forEach((o) => {
    if (o && o.id) allOrdersMap.set(o.id, o);
  });
  (storeOrders || []).forEach((o) => {
    if (o && o.id && !allOrdersMap.has(o.id)) {
      allOrdersMap.set(o.id, o);
    }
  });

  const combinedOrders = Array.from(allOrdersMap.values());

  const filteredOrders = combinedOrders.filter((ord) => {
    if (!ord) return false;
    const matchesStatus = filterStatus === 'all' || ord.status === filterStatus;
    const orderNum = (ord.orderNumber || '').toLowerCase();
    const orgName = (ord.organizationName || '').toLowerCase();
    const locName = (ord.locationName || '').toLowerCase();
    const q = (search || '').toLowerCase();

    const matchesSearch = !q || orderNum.includes(q) || orgName.includes(q) || locName.includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleAdvanceStatus = async (order: Order) => {
    const currentIndex = STATUS_FLOW.indexOf(order.status);
    if (currentIndex >= 0 && currentIndex < STATUS_FLOW.length - 1) {
      const nextStatus = STATUS_FLOW[currentIndex + 1];
      
      // 1. Update in local store
      updateOrderStatus(order.id, nextStatus, `Advanced by Operations Admin`);

      // 2. Update in state
      setLiveDbOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: nextStatus } : o))
      );

      // 3. Update in Supabase
      try {
        await updateOrderStatusServerAction(order.id, nextStatus);
      } catch (err) {
        console.warn('Status update notice:', err);
      }
    }
  };

  // Rollup Metrics
  const totalRevenue = combinedOrders.reduce((sum, o) => sum + (Number(o?.total) || 0), 0);
  const liveActiveCount = combinedOrders.filter((o) => o?.status !== 'delivered' && o?.status !== 'cancelled').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Warehouse Live Dispatch & Orders Hub</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Live Fulfilment & Dispatch Desk
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time orders placed on customer phones or laptops appear here instantly via live Supabase database.
          </p>
        </div>

        {/* Refresh button */}
        <button
          type="button"
          onClick={fetchLiveOrders}
          disabled={isRefreshing}
          aria-label="Sync live orders from database"
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Syncing...' : 'Sync Live Orders'}</span>
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl flex items-center justify-between border border-slate-200 shadow-sm">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500 block">Total Orders Value</span>
            <span className="font-display text-2xl font-bold text-slate-900">£{totalRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">{combinedOrders.length} Total Orders Recorded</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        <div className="bg-emerald-50/60 p-5 rounded-2xl flex items-center justify-between border border-emerald-200/80 shadow-sm">
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold block">Active In-Progress</span>
            <span className="font-display text-2xl font-bold text-emerald-900">{liveActiveCount} Orders Live</span>
            <span className="text-[11px] text-emerald-700/80 block mt-0.5">Digbeth Depot Picking Queue</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl flex items-center justify-between border border-slate-200 shadow-sm">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500 block">Fleet Target Window</span>
            <span className="font-display text-2xl font-bold text-slate-900">06:00 – 08:30 AM</span>
            <span className="text-[11px] text-emerald-700 font-mono block mt-0.5">99.8% On-Time SLA</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {['all', 'received', 'confirmed', 'picking', 'dispatch_ready', 'out_for_delivery', 'delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {st === 'all' ? `All Orders (${combinedOrders.length})` : st.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order #, customer, site..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Orders Fulfillment Stream */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-slate-200 p-10 rounded-2xl text-center text-xs text-slate-500 space-y-2 shadow-sm">
            <ClipboardList className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-bold text-slate-700 text-sm">No orders match this filter.</p>
            <p>Orders placed on any mobile device or laptop will appear here in real-time.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const currentIndex = STATUS_FLOW.indexOf(order.status);
            const nextStatus = currentIndex < STATUS_FLOW.length - 1 ? STATUS_FLOW[currentIndex + 1] : null;
            const isLiveSupabase = Boolean(order.id && typeof order.id === 'string' && order.id.includes('-') && order.id.length > 20);
            const itemsList = Array.isArray(order.items) ? order.items : [];
            const totalVal = typeof order.total === 'number' ? order.total : 0;

            return (
              <div
                key={order.id}
                className="bg-white p-5 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 hover:border-emerald-300 hover:shadow-md transition-all border border-slate-200 shadow-sm"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono font-bold text-emerald-800 text-base">{order.orderNumber || 'RW-ORDER'}</span>
                    <span className="font-bold text-slate-800 text-sm">&bull; {order.organizationName || 'San Carlo Ristorante'}</span>
                    <OrderStatusBadge status={order.status || 'received'} />
                    {isLiveSupabase && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>LIVE CLOUD DB</span>
                      </span>
                    )}
                    {order.isStandingOrder && (
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-mono text-[10px] font-semibold border border-amber-200">
                        Standing ({order.recurrence})
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-500">
                    <span>Site: <strong className="text-slate-700">{order.locationName || 'Kitchen Drop Point'}</strong></span>
                    <span className="mx-2 text-slate-300">&bull;</span>
                    <span>Target: <strong className="text-emerald-700">{order.deliveryDate || 'Next-Day'} ({order.deliverySlot || '06:00 - 08:30 AM'})</strong></span>
                  </div>

                  {itemsList.length > 0 && (
                    <div className="text-xs text-slate-600 flex flex-wrap gap-1.5 pt-1 font-mono">
                      {itemsList.map((i, idx) => (
                        <span key={idx} className="bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                          <strong>{i.qty}x</strong> {i.sku || 'PRD'} ({i.name})
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="text-right mr-2">
                    <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Order Value</div>
                    <div className="font-mono font-bold text-slate-900 text-base">£{totalVal.toFixed(2)}</div>
                  </div>

                  {/* Print Picking List Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedOrderForPicking(order)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs text-slate-700 hover:text-slate-900 font-medium flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>Print Picking Sheet</span>
                  </button>

                  {/* Advance Stage Button */}
                  {nextStatus && (
                    <button
                      type="button"
                      onClick={() => handleAdvanceStatus(order)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Advance to {nextStatus.replace(/_/g, ' ')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Warehouse Picking List Print Modal */}
      {selectedOrderForPicking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative font-sans">
            {/* Depot Picking Sheet Header */}
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                  ROOTWILLS LTD &bull; CENTRAL FULFILMENT DEPOT
                </div>
                <h2 className="text-2xl font-bold font-mono mt-0.5 text-slate-900">
                  WAREHOUSE PICKING LIST — {selectedOrderForPicking.orderNumber}
                </h2>
                <div className="text-xs text-slate-500 mt-1">
                  Target Dispatch: {selectedOrderForPicking.deliveryDate} ({selectedOrderForPicking.deliverySlot})
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrderForPicking(null)}
                className="text-slate-400 hover:text-slate-900 text-lg p-1 cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Destination info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <div>
                <strong className="block text-sm text-slate-900">{selectedOrderForPicking.organizationName}</strong>
                <div className="text-slate-600 mt-0.5">{selectedOrderForPicking.locationName}</div>
              </div>
              <div>
                <span className="font-bold text-slate-800">Driver Instructions:</span>
                <p className="text-slate-600 italic mt-0.5">
                  {selectedOrderForPicking.deliveryNotes || 'Standard keyholder early delivery.'}
                </p>
              </div>
            </div>

            {/* Picking Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700">
                  <tr className="font-mono text-[11px]">
                    <th className="py-2.5 px-3">[ ] Picked</th>
                    <th className="py-2.5 px-3">SKU</th>
                    <th className="py-2.5 px-3">Product Description</th>
                    <th className="py-2.5 px-3">Pack Spec</th>
                    <th className="py-2.5 px-3 text-right">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(Array.isArray(selectedOrderForPicking.items) ? selectedOrderForPicking.items : []).map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 px-3 font-mono text-slate-400">[  ]</td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-900">{item.sku}</td>
                      <td className="py-2 px-3 font-bold text-slate-800">{item.name}</td>
                      <td className="py-2 px-3 text-slate-500">{item.packSize}</td>
                      <td className="py-2 px-3 font-mono font-bold text-right text-sm text-emerald-800">
                        {item.qty} units
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sign-off footer */}
            <div className="pt-4 border-t-2 border-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
              <div className="text-slate-500 font-mono">
                Selector Name: _________________ &bull; Checked: _______________
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => alert('Printing warehouse picking sheet...')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Sheet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOrderForPicking(null)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
