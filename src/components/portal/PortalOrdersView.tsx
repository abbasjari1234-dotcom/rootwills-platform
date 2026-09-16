'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/app-store';
import { OrderStatusBadge } from '@/components/portal/OrderStatusBadge';
import { QuickReorderModal } from '@/components/portal/QuickReorderModal';
import { 
  Repeat, 
  Search, 
  Filter, 
  Clock, 
  ChevronRight, 
  ShoppingBag,
  Calendar,
  Layers
} from 'lucide-react';
import { OrderStatus, Order } from '@/types/orders';
import { getLiveOrdersServerAction } from '@/actions/orders';

export function PortalOrdersView() {
  const { currentOrgId, organizations, orders: storeOrders } = useAppStore();
  const [liveDbOrders, setLiveDbOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [reorderOrder, setReorderOrder] = useState<any>(null);

  useEffect(() => {
    getLiveOrdersServerAction()
      .then((orders) => {
        if (orders && Array.isArray(orders)) {
          setLiveDbOrders(orders);
        }
      })
      .catch((err) => console.warn('Portal orders fetch error:', err));
  }, []);

  const currentOrg = (organizations && organizations.find((o) => o.id === currentOrgId)) || (organizations && organizations[0]) || { id: 'org-default', name: 'Commercial Venue' };
  
  // Merge live Supabase orders with store orders
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
  const orgOrders = combinedOrders.filter((o) => !o.organizationId || o.organizationId === currentOrg?.id || o.organizationId.includes('3023626e'));

  const filteredOrders = orgOrders.filter((ord) => {
    if (!ord) return false;
    const matchesStatus = selectedStatus === 'all' || ord.status === selectedStatus;
    const orderNum = (ord.orderNumber || '').toLowerCase();
    const locName = (ord.locationName || '').toLowerCase();
    const itemsList = Array.isArray(ord.items) ? ord.items : [];
    const q = (search || '').toLowerCase();

    const matchesSearch =
      !q ||
      orderNum.includes(q) ||
      locName.includes(q) ||
      itemsList.some((i) => (i?.name || '').toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 uppercase font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>Order History &amp; Dispatch Tracking</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Order History &amp; Delivery Tracking
          </h1>
          <p className="text-xs text-slate-500">
            {currentOrg.name} &bull; View live dispatch progress, delivery times, and repeat past orders in 1 click.
          </p>
        </div>

        <Link
          href="/catalog"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Place New Order</span>
        </Link>
      </div>

      {/* ─── Filter and Search Bar ─── */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center shadow-xs">
        {/* Status Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {['all', 'received', 'picking', 'out_for_delivery', 'delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                selectedStatus === st
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {st === 'all' ? 'All Orders' : st.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order #, site, or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* ─── Orders List ─── */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-slate-200 p-12 rounded-2xl text-center text-slate-500 space-y-3 shadow-xs">
            <Layers className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-sm font-medium">No orders match your filter.</div>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-200 p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-300 transition-all shadow-xs group"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                    {order.orderNumber}
                  </span>
                  <OrderStatusBadge status={order.status} />
                  {order.isStandingOrder && (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono text-[10px] border border-emerald-200 font-semibold">
                      Standing ({order.recurrence})
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600">
                  <span>Location: <strong className="text-slate-900">{order.locationName}</strong></span>
                  <span className="mx-2 text-slate-300">&bull;</span>
                  <span>Delivery Date: <strong className="text-slate-900">{order.deliveryDate}</strong></span>
                  <span className="mx-2 text-slate-300">&bull;</span>
                  <span className="text-slate-500">{order.deliverySlot}</span>
                </div>

                <div className="text-xs text-slate-500 flex flex-wrap gap-2 pt-1">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-mono text-[11px]">
                      {item.qty}x {item.name}
                    </span>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-emerald-700 font-mono text-xs font-semibold">+{order.items.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Total (inc. VAT)</div>
                  <div className="font-mono text-base font-bold text-slate-900">
                    £{order.total.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => setReorderOrder(order)}
                  className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs text-slate-700 font-semibold flex items-center gap-1 transition-colors"
                >
                  <Repeat className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Reorder</span>
                </button>

                <Link
                  href={`/orders/${order.id}`}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white transition-all flex items-center gap-1 font-mono"
                >
                  <span>Track Progress</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {reorderOrder && (
        <QuickReorderModal
          order={reorderOrder}
          isOpen={true}
          onClose={() => setReorderOrder(null)}
        />
      )}
    </div>
  );
}
