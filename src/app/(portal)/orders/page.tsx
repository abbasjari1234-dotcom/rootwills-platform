'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemoStore } from '@/lib/store/demo-store';
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
import { OrderStatus } from '@/types/orders';

export default function OrdersHistoryPage() {
  const { currentOrgId, organizations, orders } = useDemoStore();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [reorderOrder, setReorderOrder] = useState<any>(null);

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];
  const orgOrders = orders.filter((o) => o.organizationId === currentOrg.id);

  const filteredOrders = orgOrders.filter((ord) => {
    const matchesStatus = selectedStatus === 'all' || ord.status === selectedStatus;
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      ord.locationName.toLowerCase().includes(search.toLowerCase()) ||
      ord.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-cream/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-champagne uppercase font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>Order History & Dispatch Tracking</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            Order Records &bull; {currentOrg.name}
          </h1>
          <p className="text-xs text-cream/60">
            View live dispatch progress, delivery times, and repeat past orders in 1 click.
          </p>
        </div>

        <Link
          href="/catalog"
          className="px-5 py-2.5 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Place New Order</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Status Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {['all', 'received', 'picking', 'out_for_delivery', 'delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                selectedStatus === st
                  ? 'bg-champagne text-obsidian-950 font-bold shadow-gold-glow'
                  : 'bg-obsidian-900 text-cream/70 hover:text-cream border border-cream/10'
              }`}
            >
              {st === 'all' ? 'All Orders' : st.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order #, site, or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-obsidian-900 border border-cream/20 rounded-xl pl-10 pr-4 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl text-center text-cream/60 space-y-3">
            <Layers className="w-10 h-10 text-cream/20 mx-auto" />
            <div className="text-sm font-medium">No orders match your filter.</div>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="glass-panel p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-champagne/30 transition-all group"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono font-bold text-cream text-base group-hover:text-champagne transition-colors">
                    {order.orderNumber}
                  </span>
                  <OrderStatusBadge status={order.status} />
                  {order.isStandingOrder && (
                    <span className="px-2 py-0.5 rounded bg-champagne/10 text-champagne font-mono text-[10px] border border-champagne/20">
                      Standing ({order.recurrence})
                    </span>
                  )}
                </div>

                <div className="text-xs text-cream/70">
                  <span>Location: <strong className="text-cream">{order.locationName}</strong></span>
                  <span className="mx-2 text-cream/30">&bull;</span>
                  <span>Delivery Date: <strong className="text-champagne">{order.deliveryDate}</strong></span>
                  <span className="mx-2 text-cream/30">&bull;</span>
                  <span className="text-cream/50">{order.deliverySlot}</span>
                </div>

                <div className="text-xs text-cream/50 flex flex-wrap gap-2 pt-1">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="bg-obsidian-950 px-2 py-0.5 rounded border border-cream/5">
                      {item.qty}x {item.name}
                    </span>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-champagne font-mono">+{order.items.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-cream/10">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-cream/40">Total (inc. VAT)</div>
                  <div className="font-mono text-base font-bold text-champagne">
                    £{order.total.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => setReorderOrder(order)}
                  className="px-3 py-2 rounded-lg border border-cream/20 hover:border-champagne text-xs text-cream font-medium flex items-center gap-1 transition-colors"
                >
                  <Repeat className="w-3.5 h-3.5 text-champagne" />
                  <span>Reorder</span>
                </button>

                <Link
                  href={`/orders/${order.id}`}
                  className="px-4 py-2 rounded-lg bg-obsidian-900 hover:bg-champagne hover:text-obsidian-950 text-xs font-semibold text-cream border border-cream/15 transition-all flex items-center gap-1"
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
