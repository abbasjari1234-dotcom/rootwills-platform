'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/store/app-store';
import { OrderStatusBadge } from '@/components/portal/OrderStatusBadge';
import { QuickReorderModal } from '@/components/portal/QuickReorderModal';
import { INITIAL_ORDERS } from '@/lib/mock-data';
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
  Calendar,
  Thermometer,
  Radio,
  Printer,
  Download,
  AlertTriangle,
  Building2,
  Copy,
  Check,
  Camera,
  FileCheck,
  ChevronRight,
  Sparkles,
  Info,
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

  const targetId = orderId || id;
  
  // Find order or provide rich default mock order
  const storeOrder = orders.find((o) => o.id === targetId || o.orderNumber === targetId);
  const fallbackOrder = INITIAL_ORDERS[0];
  const order: Order = storeOrder || {
    ...fallbackOrder,
    orderNumber: targetId ? targetId.toUpperCase() : fallbackOrder.orderNumber,
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-cream">
      
      {/* Top Header & Breadcrumb Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-emerald-900/40">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cream/70">
            <Link 
              href="/orders" 
              className="inline-flex items-center gap-1 text-cream/80 hover:text-champagne transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Purchase Orders</span>
            </Link>
            <span>/</span>
            <span className="text-champagne font-bold">{order.orderNumber}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-cream tracking-tight">
              Purchase Order <span className="gold-gradient-text">#{order.orderNumber}</span>
            </h1>
            <OrderStatusBadge status={order.status} />
            <button
              onClick={handleCopyPO}
              className="p-1.5 rounded-lg glass-pill text-cream/60 hover:text-champagne transition-colors text-xs flex items-center gap-1"
              title="Copy PO reference to clipboard"
            >
              {copiedPO ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[10px] font-mono">{copiedPO ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-cream/75 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-champagne" />
              <span>Placed: {order.createdAt ? order.createdAt.replace('T', ' ').split('.')[0] : 'Today 22:42 GMT'}</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{order.locationName}</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5 text-champagne font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Delivery Slot: {order.deliverySlot}</span>
            </span>
          </div>
        </div>

        {/* Executive Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl glass-pill text-xs font-mono font-medium hover:text-champagne transition-all flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-champagne" />
            <span className="hidden sm:inline">Print Packing Manifest</span>
            <span className="sm:hidden">Print</span>
          </button>

          <Link
            href="/invoices"
            className="px-4 py-2.5 rounded-xl glass-pill text-xs font-mono font-medium hover:text-champagne transition-all flex items-center gap-2 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>VAT Invoice</span>
          </Link>

          <button
            onClick={() => setCreditModalOpen(true)}
            className="px-4 py-2.5 rounded-xl glass-pill text-xs font-mono font-medium text-amber-300 hover:text-amber-200 border-amber-500/30 transition-all flex items-center gap-2"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Report Item / Claim Credit</span>
            <span className="sm:hidden">Claim Credit</span>
          </button>

          <button
            onClick={() => setReorderOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-champagne via-champagne-light to-champagne text-obsidian-950 font-bold text-xs font-mono shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all shrink-0"
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Repeat This Order</span>
          </button>
        </div>
      </div>

      {/* 6-Stage Cold-Chain Telemetry & Dispatch Pipeline */}
      <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-emerald-900/40 pb-4">
          <div className="flex items-center gap-2.5 text-champagne font-mono text-xs uppercase font-bold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Live HACCP Cold-Chain & Fulfilment Telemetry</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-cream/70">
              Target Kitchen Arrival: <strong className="text-champagne font-bold">{order.deliveryDate} ({order.deliverySlot})</strong>
            </span>
            <span className="px-2.5 py-0.5 rounded-full glass-pill-gold text-[10px] text-champagne font-bold">
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
                className={`p-4 rounded-2xl transition-all duration-300 relative flex flex-col justify-between space-y-2 ${
                  isCurrent
                    ? 'glass-card border-champagne shadow-gold-glow bg-emerald-950/80 ring-1 ring-champagne/40'
                    : isCompleted
                    ? 'glass-card border-emerald-500/30 bg-obsidian-900/60'
                    : 'glass-pill opacity-50 border-emerald-950/40 bg-obsidian-950/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={isCurrent ? 'text-champagne font-bold' : isCompleted ? 'text-emerald-400 font-bold' : 'text-cream/40'}>
                      STAGE {stage.stepNum}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-cream/20" />
                    )}
                  </div>
                  <div className="font-display font-bold text-sm text-cream leading-tight">
                    {stage.label}
                  </div>
                  <div className="text-[11px] text-cream/60 font-sans mt-0.5 leading-snug">
                    {stage.desc}
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-900/40 flex items-center justify-between text-[10px] font-mono text-cream/70">
                  <Clock className="w-3 h-3 text-champagne/80" />
                  <span>{displayTime}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tracking Milestone Note */}
        {order.trackingHistory && order.trackingHistory.length > 0 && (
          <div className="p-3.5 rounded-xl glass-card text-xs flex items-center justify-between gap-4 font-mono text-cream/80">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
              <span>
                Latest Dispatch Checkpoint: <strong className="text-champagne">{order.trackingHistory[order.trackingHistory.length - 1]?.note}</strong>
              </span>
            </div>
            <span className="text-[11px] text-cream/50 shrink-0">
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
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-emerald-900/50">
              <div>
                <h2 className="font-display text-2xl font-bold text-cream">
                  Culinary Order Manifest
                </h2>
                <p className="text-xs text-cream/70 font-sans mt-0.5">
                  Inspected under Rootwills 100% Zero-Substitution Guarantee. All Class 1 Extra certified.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-emerald-300 text-xs font-mono font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Substitutions</span>
              </div>
            </div>

            {/* Product Lines List */}
            <div className="divide-y divide-emerald-950/80">
              {order.items.map((item, idx) => {
                const imgUrl = getItemImage(item);

                return (
                  <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                    <div className="flex items-center gap-4">
                      {/* Product Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden glass-pill shrink-0 border border-emerald-500/20">
                        <Image
                          src={imgUrl}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded glass-pill-gold text-champagne text-[10px] font-mono font-bold">
                            {item.sku}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded glass-pill text-emerald-300 flex items-center gap-1">
                            <Check className="w-2.5 h-2.5 text-emerald-400" />
                            <span>100% Exact Match</span>
                          </span>
                          <span className="text-[10px] font-mono text-cream/50">
                            0% VAT (Zero-Rated Food)
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-base text-cream group-hover:text-champagne transition-colors">
                          {item.name}
                        </h3>

                        <div className="text-xs text-cream/60 font-mono">
                          Specification: <strong className="text-cream/90">{item.packSize}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="text-right sm:self-center pl-20 sm:pl-0 flex sm:flex-col justify-between items-center sm:items-end">
                      <div className="text-xs font-mono text-cream/70">
                        {item.qty} &times; £{item.unitPrice.toFixed(2)}
                      </div>
                      <div className="font-display font-bold text-lg text-champagne sm:mt-0.5">
                        £{item.totalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Financial Totals Calculation Box */}
            <div className="pt-6 border-t border-emerald-900/50 space-y-3 font-mono text-xs">
              <div className="flex justify-between text-cream/70">
                <span>Produce & Dairy Subtotal (0% UK VAT Zero-Rated):</span>
                <span className="font-bold text-cream">£{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cream/70">
                <span>Standard Rated Consumables (20% VAT):</span>
                <span className="font-bold text-cream">£{(order.vatTotal * 5).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cream/70">
                <span>HMRC Value Added Tax (VAT 20%):</span>
                <span className="font-bold text-cream">£{order.vatTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cream/70">
                <span>Refrigerated Express Drop Surcharge:</span>
                <span className="text-emerald-400 font-bold">FREE (Contract Fleet SLA)</span>
              </div>

              <div className="flex justify-between items-baseline pt-4 border-t border-emerald-900/60 text-sm font-bold text-cream">
                <div className="space-y-0.5">
                  <span className="text-base font-display">Invoice Grand Total:</span>
                  <div className="text-[11px] font-sans font-normal text-cream/60">
                    Payment settled under 30-Day Revolving B2B Credit Terms
                  </div>
                </div>
                <span className="font-display text-2xl font-black text-champagne gold-gradient-text">
                  £{order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Fulfilment Audit Log */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-display text-xl font-bold text-cream flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-champagne" />
              <span>Full Dispatch & Fulfilment Audit Trail</span>
            </h3>

            <div className="space-y-3 pt-2">
              {order.trackingHistory && order.trackingHistory.map((log, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-xl glass-pill flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-cream font-bold">{log.note || `Stage updated to ${log.status}`}</span>
                  </div>
                  <span className="text-cream/50 text-[11px] pl-4 sm:pl-0">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Telemetry, Proof of Delivery, Instructions */}
        <div className="space-y-8">

          {/* HACCP Cold-Chain Temperature Compliance Card */}
          <div className="glass-panel-emerald rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-emerald-300">
                <Thermometer className="w-4 h-4 text-emerald-400" />
                <span>HACCP Cold-Chain Verification</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                100% PASS
              </span>
            </div>

            <p className="text-xs text-cream/80 leading-relaxed font-sans">
              Dual-zone calibrated cellular temperature logging maintained throughout transit without thermal break.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl glass-card space-y-1 text-left">
                <span className="text-[10px] font-mono uppercase text-cream/50 block">Chilled Chamber</span>
                <div className="font-mono text-xl font-extrabold text-emerald-300">
                  {order.pod?.vanProbeChilledTemp || '+2.4°C'}
                </div>
                <span className="text-[10px] text-cream/60 block font-mono">Range: +2.0°C to +4.0°C</span>
              </div>

              <div className="p-3.5 rounded-xl glass-card space-y-1 text-left">
                <span className="text-[10px] font-mono uppercase text-cream/50 block">Ambient Bay</span>
                <div className="font-mono text-xl font-extrabold text-champagne">
                  +14.2°C
                </div>
                <span className="text-[10px] text-cream/60 block font-mono">Dry Goods Partition</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] font-mono text-emerald-400/90 flex items-center gap-1.5 border-t border-emerald-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>SALSA & BRCGS Certified Telemetry Probe #PRB-882-UK</span>
            </div>
          </div>

          {/* Driver Proof-of-Delivery (POD) Card */}
          <div className="glass-card rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/50">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-champagne">
                <FileCheck className="w-4 h-4 text-champagne" />
                <span>Driver Proof of Delivery (POD)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Signed & Staged</span>
              </span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-emerald-950/60">
                <span className="text-cream/50">Delivering Driver:</span>
                <strong className="text-cream">{order.pod?.driverName || 'David Fletcher (Van #04)'}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950/60">
                <span className="text-cream/50">Delivery Drop Time:</span>
                <strong className="text-champagne">{order.pod?.deliveredAt || '06:48 AM GMT'}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950/60">
                <span className="text-cream/50">Signed By:</span>
                <strong className="text-cream">{order.pod?.recipientName || 'Chef Marcus Wareing'}</strong>
              </div>
            </div>

            {/* Digital Signature Canvas Simulation */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-cream/50">
                <span>Sign-on-Glass Signature</span>
                <span className="text-emerald-400 font-mono">Digital Hash Verified</span>
              </div>
              <div className="h-20 w-full rounded-xl glass-input p-3 flex flex-col justify-between relative overflow-hidden border border-emerald-500/20">
                {/* SVG Signature Curve */}
                <svg className="w-full h-10 text-champagne opacity-85" viewBox="0 0 300 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M 10,40 Q 40,5 70,35 T 130,25 T 190,45 T 260,15 T 290,30" />
                </svg>
                <div className="text-[9px] font-mono text-cream/40 flex justify-between">
                  <span>SHA256: 8f9a2e4b...c710</span>
                  <span>IP/GPS: 52.4862° N, 1.8904° W</span>
                </div>
              </div>
            </div>

            {/* Kitchen Stacking Photo Verification */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-cream/50">
                <span className="flex items-center gap-1">
                  <Camera className="w-3 h-3 text-champagne" />
                  <span>Coldroom Photographic Proof</span>
                </span>
                <span className="text-cream/40">Timestamped 06:48 AM</span>
              </div>
              <div className="relative h-32 w-full rounded-xl overflow-hidden glass-pill border border-emerald-500/20 group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80"
                  alt="Delivery Crates Stacked in Coldroom"
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-black/20" />
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] font-mono text-cream/90 bg-obsidian-950/80 px-2 py-1 rounded backdrop-blur-md">
                  <span>Walk-in Coldroom Shelf #2</span>
                  <span className="text-emerald-400 font-bold">Crates Inspected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Inwards Instructions & Keyholder Access */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="font-display text-lg font-bold text-cream flex items-center gap-2">
              <MapPin className="w-4 h-4 text-champagne" />
              <span>Inwards Delivery Access</span>
            </h3>

            <div className="space-y-2.5 text-xs text-cream/80">
              <div>
                <span className="text-[10px] uppercase font-mono text-cream/50 block">Registered Location</span>
                <strong className="text-cream text-sm">{order.locationName}</strong>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-cream/50 block">Driver Stacking Notes</span>
                <p className="glass-input p-3 rounded-xl text-[11px] text-cream/80 mt-1 font-sans leading-relaxed">
                  {order.deliveryNotes || 'Kitchen keyholder entrance on Barwick St. Code #4912. Stack dairy on lower chilled shelf and produce in middle bay.'}
                </p>
              </div>

              <div className="p-3 rounded-xl glass-pill text-[11px] font-mono space-y-1">
                <span className="text-champagne font-bold block">Need Early Morning Depot Assistance?</span>
                <span className="text-cream/70 block">Birmingham Logistics Desk: 0121 790 8800 (Ext. 1)</span>
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
        <div className="fixed inset-0 z-50 bg-obsidian-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative border border-champagne/40 animate-in fade-in zoom-in-95">
            <button
              onClick={() => {
                setCreditModalOpen(false);
                setCreditSubmitted(false);
              }}
              aria-label="Close credit claim modal"
              className="absolute top-6 right-6 text-cream/60 hover:text-cream p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-pill-gold text-champagne text-[10px] font-mono uppercase font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Quality Assurance Protocol</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-cream">
                Claim Instant Digital Credit
              </h2>
              <p className="text-xs text-cream/70 font-sans">
                If an item does not meet your head chef standard upon kitchen delivery, Rootwills guarantees immediate digital credit applied directly to your account statement.
              </p>
            </div>

            {creditSubmitted ? (
              <div className="p-6 rounded-2xl glass-card text-center space-y-3 border-emerald-500/40">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-display text-xl font-bold text-cream">Digital Credit Voucher Issued!</h3>
                <p className="text-xs text-cream/80 font-sans leading-relaxed">
                  Your £39.20 credit note has been applied to your commercial account balance and will appear on your next consolidated invoice.
                </p>
                <div className="text-[11px] font-mono text-champagne font-bold">
                  Credit Note Ref: CRD-2026-89210
                </div>
                <button
                  onClick={() => {
                    setCreditModalOpen(false);
                    setCreditSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-champagne text-obsidian-950 font-mono text-xs font-bold shadow-gold-glow mt-2"
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
                className="space-y-4 text-xs font-mono"
              >
                <div>
                  <label className="block text-cream/70 mb-1.5 uppercase text-[10px]">Select Line Item with Issue *</label>
                  <select
                    required
                    value={selectedIssueItem}
                    onChange={(e) => setSelectedIssueItem(e.target.value)}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-cream text-xs focus:outline-none"
                  >
                    <option value="" className="bg-obsidian-900 text-cream">Choose an item from PO #{order.orderNumber}...</option>
                    {order.items.map((item, i) => (
                      <option key={i} value={item.productId} className="bg-obsidian-900 text-cream">
                        {item.name} ({item.packSize}) - £{item.totalPrice.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-cream/70 mb-1.5 uppercase text-[10px]">Quality Inspection Reason *</label>
                  <select
                    value={issueReason}
                    onChange={(e) => setIssueReason(e.target.value)}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-cream text-xs focus:outline-none"
                  >
                    <option value="temperature_deviation" className="bg-obsidian-900 text-cream">Temperature / Cold-chain issue upon delivery</option>
                    <option value="bruised_transit" className="bg-obsidian-900 text-cream">Bruised / Damaged in transit crate</option>
                    <option value="sizing_discrepancy" className="bg-obsidian-900 text-cream">Sizing or ripeness does not meet menu specification</option>
                    <option value="short_delivered" className="bg-obsidian-900 text-cream">Quantity short delivered</option>
                  </select>
                </div>

                <div>
                  <label className="block text-cream/70 mb-1.5 uppercase text-[10px]">Chef Notes / Feedback</label>
                  <textarea
                    rows={2}
                    placeholder="Provide additional details for our intake grading team..."
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-cream text-xs focus:outline-none font-sans"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Issue Instant Digital Credit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCreditModalOpen(false)}
                    className="px-5 py-3 rounded-xl glass-pill text-cream/70 hover:text-cream text-xs"
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
