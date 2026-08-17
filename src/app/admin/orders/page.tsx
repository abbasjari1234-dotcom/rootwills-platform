'use client';

import React, { useState } from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
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
  FileText
} from 'lucide-react';

const STATUS_FLOW: OrderStatus[] = [
  'received',
  'confirmed',
  'picking',
  'dispatch_ready',
  'out_for_delivery',
  'delivered',
];

export default function AdminOrdersFulfillmentPage() {
  const { orders, updateOrderStatus } = useDemoStore();
  const [selectedOrderForPicking, setSelectedOrderForPicking] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = filterStatus === 'all' || ord.status === filterStatus;
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      ord.organizationName.toLowerCase().includes(search.toLowerCase()) ||
      ord.locationName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAdvanceStatus = (order: Order) => {
    const currentIndex = STATUS_FLOW.indexOf(order.status);
    if (currentIndex >= 0 && currentIndex < STATUS_FLOW.length - 1) {
      const nextStatus = STATUS_FLOW[currentIndex + 1];
      updateOrderStatus(order.id, nextStatus, `Advanced by Operations Admin`);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-cream/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 uppercase font-bold">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Birmingham Hub Fulfilment Queue</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            Warehouse Order Picking & Driver Dispatch
          </h1>
          <p className="text-xs text-cream/60">
            Process incoming orders, generate picking sheets for depot selectors, and update real-time driver delivery status.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {['all', 'received', 'confirmed', 'picking', 'dispatch_ready', 'out_for_delivery', 'delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                filterStatus === st
                  ? 'bg-emerald-500 text-obsidian-950 font-bold shadow-emerald-glow'
                  : 'bg-obsidian-900 text-cream/70 hover:text-cream border border-cream/10'
              }`}
            >
              {st === 'all' ? 'All Live Orders' : st.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order #, customer, site..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-obsidian-900 border border-cream/20 rounded-xl pl-10 pr-4 py-2 text-xs text-cream focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Orders Fulfillment Stream */}
      <div className="space-y-3">
        {filteredOrders.map((order) => {
          const currentIndex = STATUS_FLOW.indexOf(order.status);
          const nextStatus = currentIndex < STATUS_FLOW.length - 1 ? STATUS_FLOW[currentIndex + 1] : null;

          return (
            <div
              key={order.id}
              className="glass-panel p-5 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 hover:border-emerald-500/30 transition-all"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono font-bold text-cream text-base">{order.orderNumber}</span>
                  <span className="font-bold text-cream text-sm">&bull; {order.organizationName}</span>
                  <OrderStatusBadge status={order.status} />
                  {order.isStandingOrder && (
                    <span className="px-2 py-0.5 rounded bg-champagne/10 text-champagne font-mono text-[10px]">
                      Standing ({order.recurrence})
                    </span>
                  )}
                </div>

                <div className="text-xs text-cream/60">
                  <span>Site: <strong>{order.locationName}</strong></span>
                  <span className="mx-2 text-cream/30">&bull;</span>
                  <span>Target: <strong className="text-champagne">{order.deliveryDate} ({order.deliverySlot})</strong></span>
                </div>

                <div className="text-xs text-cream/40 flex flex-wrap gap-2 pt-1 font-mono">
                  {order.items.map((i, idx) => (
                    <span key={idx} className="bg-obsidian-950 px-2 py-0.5 rounded border border-cream/5">
                      {i.qty}x {i.sku} ({i.name})
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-cream/10">
                <div className="text-right mr-2">
                  <div className="text-[10px] uppercase font-mono text-cream/40">Order Value</div>
                  <div className="font-mono font-bold text-champagne text-sm">£{order.total.toFixed(2)}</div>
                </div>

                {/* Print Picking List Button */}
                <button
                  onClick={() => setSelectedOrderForPicking(order)}
                  className="px-3.5 py-2 rounded-lg bg-obsidian-900 border border-cream/20 hover:border-champagne text-xs text-cream font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-champagne" />
                  <span>Print Picking Sheet</span>
                </button>

                {/* Advance Stage Button */}
                {nextStatus && (
                  <button
                    onClick={() => handleAdvanceStatus(order)}
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-obsidian-950 font-bold text-xs shadow-emerald-glow hover:brightness-110 flex items-center gap-1.5"
                  >
                    <span>Advance to {nextStatus.replace('_', ' ')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Warehouse Picking List Print Modal */}
      {selectedOrderForPicking && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-black rounded-2xl max-w-2xl w-full p-8 space-y-6 shadow-2xl relative font-sans">
            {/* Depot Picking Sheet Header */}
            <div className="flex justify-between items-start border-b-2 border-black pb-4">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-600">
                  ROOTWILLS LTD &bull; CENTRAL FULFILMENT DEPOT
                </div>
                <h2 className="text-2xl font-bold font-mono mt-0.5">
                  WAREHOUSE PICKING LIST — {selectedOrderForPicking.orderNumber}
                </h2>
                <div className="text-xs text-gray-600">
                  Target Dispatch: {selectedOrderForPicking.deliveryDate} ({selectedOrderForPicking.deliverySlot})
                </div>
              </div>
              <button
                onClick={() => setSelectedOrderForPicking(null)}
                className="text-gray-500 hover:text-black text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Destination info */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-gray-100 p-4 rounded-lg">
              <div>
                <strong className="block text-sm">{selectedOrderForPicking.organizationName}</strong>
                <div>{selectedOrderForPicking.locationName}</div>
              </div>
              <div>
                <span className="font-bold">Driver Instructions:</span>
                <p className="text-gray-700 italic">
                  {selectedOrderForPicking.deliveryNotes || 'Standard keyholder early delivery.'}
                </p>
              </div>
            </div>

            {/* Picking Table */}
            <div>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 font-mono text-[11px]">
                    <th className="py-2">[ ] Picked</th>
                    <th className="py-2">SKU</th>
                    <th className="py-2">Product Description</th>
                    <th className="py-2">Pack Spec</th>
                    <th className="py-2 text-right">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedOrderForPicking.items.map((item, idx) => (
                    <tr key={idx} className="py-2">
                      <td className="py-2 font-mono">[  ]</td>
                      <td className="py-2 font-mono font-bold">{item.sku}</td>
                      <td className="py-2 font-bold">{item.name}</td>
                      <td className="py-2 text-gray-600">{item.packSize}</td>
                      <td className="py-2 font-mono font-bold text-right text-sm">
                        {item.qty} units
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sign-off footer */}
            <div className="pt-4 border-t-2 border-black flex justify-between items-center text-xs">
              <div>
                Selector Name: ____________________ &bull; Checked By: ____________________
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert('Printing warehouse picking sheet...')}
                  className="px-4 py-2 bg-black text-white font-bold rounded-lg text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Sheet</span>
                </button>
                <button
                  onClick={() => setSelectedOrderForPicking(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs"
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
