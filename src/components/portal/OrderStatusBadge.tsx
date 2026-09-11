import React from 'react';
import { OrderStatus } from '@/types/orders';

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  received: {
    label: 'Order Received',
    className: 'bg-blue-50 text-blue-700 border-blue-200 font-semibold',
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold',
  },
  picking: {
    label: 'Being Picked at Depot',
    className: 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
  },
  dispatch_ready: {
    label: 'Ready for Dispatch',
    className: 'bg-purple-50 text-purple-700 border-purple-200 font-semibold',
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold animate-pulse',
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-rose-50 text-rose-700 border-rose-200 font-semibold',
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
