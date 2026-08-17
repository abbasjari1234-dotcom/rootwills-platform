'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useDemoStore } from '@/lib/store/demo-store';
import { OrderStatusBadge } from '@/components/portal/OrderStatusBadge';
import { QuickReorderModal } from '@/components/portal/QuickReorderModal';
import { 
  ArrowLeft, 
  Repeat, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  FileText,
  Package,
  Calendar
} from 'lucide-react';
import { OrderStatus } from '@/types/orders';

const STAGES: { key: OrderStatus; label: string; desc: string }[] = [
  { key: 'received', label: '1. Order Received', desc: 'Order logged & inventory reserved' },
  { key: 'confirmed', label: '2. Confirmed', desc: 'Depot night manager confirmed' },
  { key: 'picking', label: '3. Being Picked', desc: 'Picked & graded at Birmingham Hub' },
  { key: 'dispatch_ready', label: '4. Loaded on Van', desc: 'Chilled cargo loaded' },
  { key: 'out_for_delivery', label: '5. Out for Delivery', desc: 'Driver en route to your kitchen' },
  { key: 'delivered', label: '6. Delivered', desc: 'Signed & stacked in cold room' },
];

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { orders } = useDemoStore();
  const [reorderOpen, setReorderOpen] = useState(false);

  const order = orders.find((o) => o.id === params.id || o.orderNumber === params.id);
  if (!order) return notFound();

  const currentStageIndex = STAGES.findIndex((s) => s.key === order.status);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-cream/10">
        <div className="flex items-center gap-3">
          <Link
            href="/orders"
            className="p-2 rounded-lg bg-obsidian-900 border border-cream/10 text-cream/70 hover:text-cream"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream">
                Order #{order.orderNumber}
              </h1>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="text-xs text-cream/50 mt-0.5">
              Placed on {order.createdAt.replace('T', ' ').split('.')[0]} &bull; {order.locationName}
            </div>
          </div>
        </div>

        <button
          onClick={() => setReorderOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-1.5"
        >
          <Repeat className="w-4 h-4" />
          <span>Repeat This Order</span>
        </button>
      </div>

      {/* 6-Stage Visual Delivery Tracking Pipeline */}
      <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-champagne font-mono text-xs uppercase font-bold">
            <Truck className="w-4 h-4" />
            <span>Live Dispatch & Fulfilment Pipeline</span>
          </div>
          <span className="text-xs text-cream/60 font-mono">
            Target Delivery: <strong className="text-champagne">{order.deliveryDate} ({order.deliverySlot})</strong>
          </span>
        </div>

        {/* Pipeline Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={stage.key}
                className={`p-3 rounded-xl border text-left space-y-1 transition-all ${
                  isCurrent
                    ? 'bg-champagne/20 border-champagne text-cream shadow-gold-glow'
                    : isCompleted
                    ? 'bg-obsidian-950/90 border-emerald-500/40 text-cream/90'
                    : 'bg-obsidian-950/40 border-cream/5 text-cream/30'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                  <span>Step 0{idx + 1}</span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="font-display font-bold text-xs truncate">{stage.label}</div>
                <div className="text-[10px] text-cream/50 line-clamp-2">{stage.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Tracking Logs */}
        {order.trackingHistory && order.trackingHistory.length > 0 && (
          <div className="p-4 rounded-xl bg-obsidian-950 border border-cream/10 space-y-2">
            <div className="text-[10px] uppercase font-mono text-champagne font-bold">
              Realtime Fulfilment Audit Log
            </div>
            <div className="space-y-1.5 text-xs text-cream/70 font-mono">
              {order.trackingHistory.map((log, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                  <span className="text-cream font-bold">
                    &bull; {log.note || `Stage updated to ${log.status}`}
                  </span>
                  <span className="text-cream/40">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Itemized Order Table & Inwards Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List (2 cols) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden border border-cream/15 p-6 space-y-4">
          <h2 className="font-display text-xl font-bold text-cream">Order Item Breakdown</h2>

          <div className="divide-y divide-cream/5 text-xs">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center gap-4">
                <div>
                  <div className="font-bold text-cream">{item.name}</div>
                  <div className="text-[11px] text-cream/50">
                    SKU: {item.sku} &bull; {item.packSize}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-cream/70">
                    {item.qty} &times; £{item.unitPrice.toFixed(2)}
                  </div>
                  <div className="font-mono font-bold text-champagne">
                    £{item.totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-cream/10 space-y-1.5 text-xs">
            <div className="flex justify-between text-cream/70">
              <span>Goods Subtotal:</span>
              <span className="font-mono text-cream">£{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cream/70">
              <span>VAT:</span>
              <span className="font-mono text-cream">£{order.vatTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-cream pt-2 border-t border-cream/10">
              <span>Grand Total:</span>
              <span className="font-mono text-champagne text-base">£{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Details & Invoice (1 col) */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-4 text-xs">
            <h3 className="font-display text-lg font-bold text-cream flex items-center gap-2">
              <MapPin className="w-4 h-4 text-champagne" />
              <span>Delivery Instructions</span>
            </h3>

            <div className="space-y-2 text-cream/80 leading-relaxed">
              <div>
                <span className="text-cream/50 uppercase font-mono text-[10px] block">Destination</span>
                <strong className="text-cream">{order.locationName}</strong>
              </div>
              <div>
                <span className="text-cream/50 uppercase font-mono text-[10px] block">Driver Instructions</span>
                <p className="bg-obsidian-950 p-2.5 rounded-lg border border-cream/10 text-[11px] text-cream/70 mt-1">
                  {order.deliveryNotes || 'Standard keyholder early delivery. Stack produce crates carefully.'}
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3 text-xs">
            <h3 className="font-display text-lg font-bold text-cream flex items-center gap-2">
              <FileText className="w-4 h-4 text-champagne" />
              <span>Invoicing & Accounting</span>
            </h3>
            <p className="text-cream/70 leading-relaxed">
              This order will be consolidated on your next billing run.
            </p>
            <Link
              href="/invoices"
              className="inline-block text-xs font-semibold text-champagne hover:underline"
            >
              View Invoices & Statements &rarr;
            </Link>
          </div>
        </div>
      </div>

      {reorderOpen && (
        <QuickReorderModal
          order={order}
          isOpen={true}
          onClose={() => setReorderOpen(false)}
        />
      )}
    </div>
  );
}
