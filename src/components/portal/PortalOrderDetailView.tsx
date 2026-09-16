'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/store/app-store';
import { OrderStatusBadge } from '@/components/portal/OrderStatusBadge';
import { QuickReorderModal } from '@/components/portal/QuickReorderModal';
import { INITIAL_ORDERS } from '@/lib/mock-data';
import { getLiveOrdersServerAction } from '@/actions/orders';
import { 
  ArrowLeft, 
  Repeat, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  FileText,
  Calendar,
  Thermometer,
  Radio,
  Printer,
  AlertTriangle,
  Building2,
  Copy,
  Check,
  Camera,
  FileCheck,
  X
} from 'lucide-react';
import { OrderStatus, Order, OrderItem } from '@/types/orders';

const STAGES: { key: OrderStatus; stepNum: string; label: string; desc: string; defaultTime: string }[] = [
  { key: 'received', stepNum: '01', label: 'Order Received', desc: 'Logged & inventory reserved', defaultTime: '22:42 GMT' },
  { key: 'confirmed', stepNum: '02', label: 'Night Review', desc: 'Depot night manager confirmed', defaultTime: '23:15 GMT' },
  { key: 'picking', stepNum: '03', label: 'Chilled Staging', desc: 'Picked at Digbeth (+2.2°C)', defaultTime: '02:30 GMT' },
  { key: 'dispatch_ready', stepNum: '04', label: 'Loaded on Van', desc: 'Dual-temp Sprinter Van #04', defaultTime: '04:15 GMT' },
  { key: 'out_for_delivery', stepNum: '05', label: 'En Route', desc: 'Van telemetry & GPS live', defaultTime: '05:40 GMT' },
  { key: 'delivered', stepNum: '06', label: 'Drop Complete', desc: 'Signed in kitchen coldroom', defaultTime: '06:48 GMT' },
];

export function PortalOrderDetailView({ id, orderId }: { id?: string; orderId?: string }) {
  const { orders, products } = useAppStore();
  const [reorderOpen, setReorderOpen] = useState(false);
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [selectedIssueItem, setSelectedIssueItem] = useState<string>('');
  const [issueReason, setIssueReason] = useState<string>('temperature_deviation');
  const [creditSubmitted, setCreditSubmitted] = useState(false);
  const [copiedPO, setCopiedPO] = useState(false);
  const [remoteOrder, setRemoteOrder] = useState<Order | null>(null);

  const targetId = orderId || id;
  
  // Find order or provide rich default mock order
  const storeOrder = orders.find((o) => o.id === targetId || o.orderNumber === targetId);
  const fallbackOrder = INITIAL_ORDERS[0];
  const order: Order = storeOrder || remoteOrder || {
    ...fallbackOrder,
    orderNumber: targetId ? targetId.toUpperCase() : fallbackOrder.orderNumber,
  };

  useEffect(() => {
    if (!storeOrder && targetId) {
      getLiveOrdersServerAction()
        .then((liveOrders) => {
          const match = liveOrders.find((o) => o.id === targetId || o.orderNumber === targetId);
          if (match) {
            setRemoteOrder(match);
          }
        })
        .catch((err) => console.warn('Order detail fetch note:', err));
    }
  }, [storeOrder, targetId]);

  const currentStageIndex = STAGES.findIndex((s) => s.key === order.status);

  const handleCopyPO = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(order.orderNumber);
      setCopiedPO(true);
      setTimeout(() => setCopiedPO(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Helper to find image for an item
  const getItemImage = (item: OrderItem) => {
    const prod = products.find((p) => p.id === item.productId || p.sku === item.sku);
    if (prod?.imageUrl) return prod.imageUrl;
    if (item.name.toLowerCase().includes('tomato')) return 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80';
    if (item.name.toLowerCase().includes('avocado')) return 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&auto=format&fit=crop&q=80';
    if (item.name.toLowerCase().includes('spinach')) return 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80';
    if (item.name.toLowerCase().includes('mushroom')) return 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format&fit=crop&q=80';
    if (item.name.toLowerCase().includes('egg')) return 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&auto=format&fit=crop&q=80';
    if (item.name.toLowerCase().includes('cream')) return 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80';
    if (item.name.toLowerCase().includes('potato')) return 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80';
    if (item.name.toLowerCase().includes('beef') || item.name.toLowerCase().includes('steak')) return 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&auto=format&fit=crop&q=80';
    return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 text-slate-900">
      
      {/* Top Header & Breadcrumb Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link 
              href="/orders" 
              className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Purchase Orders</span>
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-mono font-bold">{order.orderNumber}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Purchase Order <span className="font-mono text-emerald-700">#{order.orderNumber}</span>
            </h1>
            <OrderStatusBadge status={order.status} />
            <button
              type="button"
              onClick={handleCopyPO}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors text-xs flex items-center gap-1.5 shadow-xs"
              title="Copy PO reference to clipboard"
            >
              {copiedPO ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[11px] font-mono">{copiedPO ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Placed: {order.createdAt ? order.createdAt.replace('T', ' ').split('.')[0] : 'Today 22:42 GMT'}</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-slate-800">{order.locationName}</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <Clock className="w-4 h-4" />
              <span>Slot: {order.deliverySlot}</span>
            </span>
          </div>
        </div>

        {/* Executive Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Print Manifest</span>
            <span className="sm:hidden">Print</span>
          </button>

          <Link
            href={`/invoices/${order.orderNumber || order.id}/print`}
            className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>VAT Invoice</span>
          </Link>

          <button
            type="button"
            onClick={() => setCreditModalOpen(true)}
            className="px-3.5 py-2 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-amber-900 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Report Item / Credit</span>
            <span className="sm:hidden">Report</span>
          </button>

          <button
            type="button"
            onClick={() => setReorderOpen(true)}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Repeat className="w-4 h-4" />
            <span>Repeat Order</span>
          </button>
        </div>
      </div>

      {/* 6-Stage Cold-Chain Telemetry & Dispatch Pipeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5 text-xs uppercase font-bold text-slate-800">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
            </span>
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Live HACCP Cold-Chain & Fulfilment Telemetry</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-600">
              Kitchen Arrival: <strong className="text-slate-900 font-semibold">{order.deliveryDate} ({order.deliverySlot})</strong>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
              100% On-Time SLA
            </span>
          </div>
        </div>

        {/* Stepper Pipeline Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const logEntry = order.trackingHistory?.[idx];
            const displayTime = logEntry?.timestamp || stage.defaultTime;

            return (
              <div
                key={stage.key}
                className={`p-3.5 rounded-xl transition-all duration-200 flex flex-col justify-between space-y-2 border ${
                  isCurrent
                    ? 'border-emerald-500 bg-emerald-50/70 ring-1 ring-emerald-500/20'
                    : isCompleted
                    ? 'border-slate-200 bg-slate-50/80'
                    : 'border-slate-100 bg-white opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={isCurrent ? 'text-emerald-800 font-bold' : isCompleted ? 'text-slate-700 font-bold' : 'text-slate-400'}>
                      STAGE {stage.stepNum}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                    )}
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {stage.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {stage.desc}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{displayTime}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tracking Milestone Note */}
        {order.trackingHistory && order.trackingHistory.length > 0 && (
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-4 text-slate-700">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-600 animate-pulse shrink-0" />
              <span>
                Latest Dispatch Checkpoint: <strong className="text-slate-900 font-semibold">{order.trackingHistory[order.trackingHistory.length - 1]?.note}</strong>
              </span>
            </div>
            <span className="text-[11px] text-slate-500 shrink-0 font-mono">
              Logged {order.trackingHistory[order.trackingHistory.length - 1]?.timestamp}
            </span>
          </div>
        )}
      </div>

      {/* Main Details Grid: Left 2 Cols (Manifest & Telemetry) | Right 1 Col (POD & Inwards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Order Item Manifest */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Itemized Manifest Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Culinary Order Manifest
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Inspected under Rootwills 100% Zero-Substitution Guarantee. Class 1 Extra certified.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Substitutions</span>
              </div>
            </div>

            {/* Product Lines List */}
            <div className="divide-y divide-slate-100">
              {order.items.map((item, idx) => {
                const imgUrl = getItemImage(item);

                return (
                  <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                    <div className="flex items-center gap-4">
                      {/* Product Thumbnail */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <Image
                          src={imgUrl}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-medium border border-slate-200">
                            {item.sku}
                          </span>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <Check className="w-2.5 h-2.5 text-emerald-600" />
                            <span>Exact Match</span>
                          </span>
                          <span className="text-[10px] text-slate-500">
                            0% VAT (Zero-Rated Food)
                          </span>
                        </div>

                        <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {item.name}
                        </h3>

                        <div className="text-xs text-slate-500">
                          Specification: <strong className="text-slate-700">{item.packSize}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="text-right sm:self-center pl-20 sm:pl-0 flex sm:flex-col justify-between items-center sm:items-end">
                      <div className="text-xs font-mono text-slate-500">
                        {item.qty} &times; £{item.unitPrice.toFixed(2)}
                      </div>
                      <div className="font-bold text-base text-slate-900 sm:mt-0.5">
                        £{item.totalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Financial Totals Calculation Box */}
            <div className="pt-6 border-t border-slate-100 space-y-2.5 text-xs font-medium">
              <div className="flex justify-between text-slate-600">
                <span>Produce & Dairy Subtotal (0% UK VAT Zero-Rated):</span>
                <span className="font-bold text-slate-900">£{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Standard Rated Consumables (20% VAT):</span>
                <span className="font-bold text-slate-900">£{(order.vatTotal * 5).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>HMRC Value Added Tax (VAT 20%):</span>
                <span className="font-bold text-slate-900">£{order.vatTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Refrigerated Express Drop Surcharge:</span>
                <span className="text-emerald-700 font-bold">FREE (Contract Fleet SLA)</span>
              </div>

              <div className="flex justify-between items-baseline pt-4 border-t border-slate-200 text-sm font-bold text-slate-900">
                <div>
                  <span className="text-base font-bold">Invoice Grand Total:</span>
                  <div className="text-xs font-normal text-slate-500">
                    Payment settled under 30-Day Revolving B2B Credit Terms
                  </div>
                </div>
                <span className="text-2xl font-black text-slate-900 font-mono">
                  £{order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Fulfilment Audit Log */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              <span>Fulfilment & Dispatch Audit Trail</span>
            </h3>

            <div className="space-y-2.5 pt-2">
              {order.trackingHistory && order.trackingHistory.map((log, idx) => (
                <div 
                  key={idx} 
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span className="text-slate-800 font-medium">{log.note || `Stage updated to ${log.status}`}</span>
                  </div>
                  <span className="text-slate-500 text-[11px] font-mono pl-4 sm:pl-0">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Telemetry, Proof of Delivery, Instructions */}
        <div className="space-y-6">

          {/* HACCP Cold-Chain Temperature Compliance Card */}
          <div className="bg-white border border-emerald-200 rounded-xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-800">
                <Thermometer className="w-4 h-4 text-emerald-600" />
                <span>HACCP Cold-Chain Telemetry</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                100% PASS
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Dual-zone calibrated cellular temperature logging maintained throughout transit without thermal break.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-500 block">Chilled Chamber</span>
                <div className="font-mono text-xl font-black text-emerald-700">
                  {order.pod?.vanProbeChilledTemp || '+2.4°C'}
                </div>
                <span className="text-[10px] text-slate-500 block font-mono">Range: +2.0°C - +4.0°C</span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-500 block">Ambient Bay</span>
                <div className="font-mono text-xl font-black text-slate-800">
                  +14.2°C
                </div>
                <span className="text-[10px] text-slate-500 block font-mono">Dry Goods Partition</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-600 flex items-center gap-1.5 border-t border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>SALSA & BRCGS Certified Probe #PRB-882-UK</span>
            </div>
          </div>

          {/* Driver Proof-of-Delivery (POD) Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-900">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Proof of Delivery (POD)</span>
              </div>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Signed & Staged</span>
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Delivering Driver:</span>
                <strong className="text-slate-900">{order.pod?.driverName || 'David Fletcher (Van #04)'}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Drop Timestamp:</span>
                <strong className="text-slate-900 font-mono">{order.pod?.deliveredAt || '06:48 AM GMT'}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Signed By:</span>
                <strong className="text-slate-900">{order.pod?.recipientName || 'Head Chef Marcus W.'}</strong>
              </div>
            </div>

            {/* Digital Signature Canvas Display */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                <span>Sign-on-Glass Signature</span>
                <span className="text-emerald-700 font-mono font-semibold">Cryptographic Hash Verified</span>
              </div>
              <div className="h-20 w-full rounded-lg bg-slate-50 border border-slate-200 p-2.5 flex flex-col justify-between relative overflow-hidden">
                <svg className="w-full h-10 text-slate-800" viewBox="0 0 300 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M 10,40 Q 40,5 70,35 T 130,25 T 190,45 T 260,15 T 290,30" />
                </svg>
                <div className="text-[9px] font-mono text-slate-500 flex justify-between">
                  <span>SHA256: 8f9a2e4b...c710</span>
                  <span>GPS: 52.4862° N, 1.8904° W</span>
                </div>
              </div>
            </div>

            {/* Kitchen Stacking Photo Verification */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-slate-600" />
                  <span>Coldroom Photographic Proof</span>
                </span>
                <span>06:48 AM</span>
              </div>
              <div className="relative h-32 w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-100 group">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80"
                  alt="Delivery Crates Stacked in Coldroom"
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] text-white font-medium bg-black/60 px-2 py-1 rounded backdrop-blur-xs">
                  <span>Walk-in Coldroom Shelf #2</span>
                  <span className="text-emerald-400 font-bold">Crates Inspected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Inwards Instructions */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Inwards Delivery Access</span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Registered Location</span>
                <strong className="text-slate-900 text-sm">{order.locationName}</strong>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Driver Stacking Notes</span>
                <p className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs text-slate-700 mt-1 leading-relaxed">
                  {order.deliveryNotes || 'Kitchen keyholder entrance on Barwick St. Code #4912. Stack dairy on lower chilled shelf and produce in middle bay.'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="text-slate-900 font-bold block">Need Early Morning Depot Assistance?</span>
                <span className="text-slate-600 block">Birmingham Logistics Desk: 0121 790 8800 (Ext. 1)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Quick Reorder Modal */}
      {reorderOpen && (
        <QuickReorderModal
          order={order}
          isOpen={true}
          onClose={() => setReorderOpen(false)}
        />
      )}

      {/* Claim Instant Credit Modal */}
      {creditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => {
                setCreditModalOpen(false);
                setCreditSubmitted(false);
              }}
              aria-label="Close credit claim modal"
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Quality Assurance Protocol</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Claim Instant Digital Credit
              </h2>
              <p className="text-xs text-slate-600">
                If an item does not meet your head chef standard upon kitchen delivery, Rootwills guarantees immediate digital credit applied directly to your account statement.
              </p>
            </div>

            {creditSubmitted ? (
              <div className="p-6 rounded-xl bg-slate-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Digital Credit Voucher Issued!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your £39.20 credit note has been applied to your commercial account balance and will appear on your next consolidated invoice.
                </p>
                <div className="text-xs font-mono text-emerald-700 font-bold">
                  Credit Note Ref: CRD-2026-89210
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCreditModalOpen(false);
                    setCreditSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs mt-2"
                >
                  Return to Order Details
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCreditSubmitted(true);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block text-slate-700 mb-1.5 font-semibold text-xs">Select Line Item with Issue *</label>
                  <select
                    required
                    value={selectedIssueItem}
                    onChange={(e) => setSelectedIssueItem(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Choose an item from PO #{order.orderNumber}...</option>
                    {order.items.map((item, i) => (
                      <option key={i} value={item.productId}>
                        {item.name} ({item.packSize}) - £{item.totalPrice.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1.5 font-semibold text-xs">Quality Inspection Reason *</label>
                  <select
                    value={issueReason}
                    onChange={(e) => setIssueReason(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="temperature_deviation">Temperature / Cold-chain issue upon delivery</option>
                    <option value="bruised_transit">Bruised / Damaged in transit crate</option>
                    <option value="sizing_discrepancy">Sizing or ripeness does not meet menu specification</option>
                    <option value="short_delivered">Quantity short delivered</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1.5 font-semibold text-xs">Chef Notes / Feedback</label>
                  <textarea
                    rows={2}
                    placeholder="Provide additional details for our intake grading team..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Issue Instant Credit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCreditModalOpen(false)}
                    className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
