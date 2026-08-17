import React from 'react';
import { OrderStatus } from '@/types/orders';

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  received: {
    label: 'Order Received',
    className: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  },
  picking: {
    label: 'Being Picked at Depot',
    className: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  dispatch_ready: {
    label: 'Ready for Dispatch',
    className: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 animate-pulse',
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_CONFIG[status] || {
    label: status,
    className: 'bg-cream/10 text-cream/70 border-cream/20',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${config.className}`}
    >
      {config.label}
    </span>
  );
}
