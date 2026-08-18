'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
import { Order } from '@/types/orders';
import { 
  Truck, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Thermometer, 
  Clock, 
  Navigation, 
  PenTool, 
  FileText,
  AlertCircle,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { submitDriverPOD } from '@/actions/orders';

export default function DriverMobileRunSheetPage() {
  const { orders, updateOrderStatus } = useDemoStore();
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [chilledTemp, setChilledTemp] = useState('2.4');
  const [frozenTemp, setFrozenTemp] = useState('-19.2');
  const [recipientName, setRecipientName] = useState('');
  const [hasSigned, setHasSigned] = useState(false);
  const [deliveredSuccess, setDeliveredSuccess] = useState(false);
  const [expandedPodId, setExpandedPodId] = useState<string | null>(null);

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const activeDeliveries = orders.filter((o) => o.status !== 'delivered');
  const completedDeliveries = orders.filter((o) => o.status === 'delivered');

  // Temperature compliance check
  const isChilledCompliant = parseFloat(chilledTemp) <= 4.0;
  const isFrozenCompliant = parseFloat(frozenTemp) <= -18.0;

  // Initialize canvas
  useEffect(() => {
    if (activeOrder && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#E4C767';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [activeOrder]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasSigned(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const handleCompleteDelivery = async (orderId: string) => {
    if (!recipientName.trim()) {
      alert('Please enter the receiver / head chef name.');
      return;
    }

    const signatureDataUrl = canvasRef.current ? canvasRef.current.toDataURL('image/png') : undefined;
    const deliveredAt = new Date().toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' });

    const podData = {
      recipientName: recipientName.trim(),
      signatureDataUrl,
      vanProbeChilledTemp: chilledTemp,
      vanProbeFrozenTemp: frozenTemp,
      deliveredAt,
      driverName: 'Dave King (Birmingham Hub Van #04)',
    };

    // 1. Submit to Supabase Server Action
    await submitDriverPOD({
      orderId,
      recipientName: recipientName.trim(),
      signatureDataUrl,
      vanProbeChilledTemp: chilledTemp,
      vanProbeFrozenTemp: frozenTemp,
      driverName: 'Dave King (Van #04)',
    });

    // 2. Update client demo store
    updateOrderStatus(
      orderId,
      'delivered',
      `Signed by ${recipientName.trim()} & delivered by Dave King. Chilled: ${chilledTemp}°C.`,
      podData
    );

    setDeliveredSuccess(true);
    setTimeout(() => {
      setDeliveredSuccess(false);
      setActiveOrder(null);
      setRecipientName('');
      setHasSigned(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-cream p-4 sm:p-6 max-w-lg mx-auto space-y-6">
      {/* Driver Header */}
      <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border-emerald-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-obsidian-950 flex items-center justify-center font-bold shadow-emerald-glow">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Driver Manifest &bull; Van #04</div>
            <h1 className="font-display text-lg font-bold text-cream">Dave King (Digbeth Depot)</h1>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] border border-emerald-500/20">
          Route Live
        </span>
      </div>

      {/* Temperature Compliance Check Card */}
      <div className="glass-panel p-4 rounded-2xl space-y-3 text-xs border border-cream/15">
        <div className="flex justify-between items-center text-champagne font-mono font-bold">
          <span className="flex items-center gap-1.5">
            <Thermometer className="w-4 h-4" />
            <span>Dual-Temp Cold Chain Probe Check</span>
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
            isChilledCompliant && isFrozenCompliant
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
          }`}>
            {isChilledCompliant && isFrozenCompliant ? '✓ BRCGS Compliant' : '⚠ Temp Alert'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-obsidian-900 rounded-xl border border-cream/10">
            <span className="text-[10px] text-cream/50 uppercase block mb-1">Chilled Chamber Probe</span>
            <div className="flex items-center justify-center gap-1">
              <input
                type="number"
                step="0.1"
                value={chilledTemp}
                onChange={(e) => setChilledTemp(e.target.value)}
                className="w-16 bg-obsidian-950 text-center font-mono text-base font-bold text-emerald-400 rounded border border-cream/20 py-0.5"
              />
              <span className="font-mono text-xs text-cream/60">°C</span>
            </div>
            <span className="text-[9px] text-cream/40 block mt-1">Target: &le; 4.0°C</span>
          </div>

          <div className="p-3 bg-obsidian-900 rounded-xl border border-cream/10">
            <span className="text-[10px] text-cream/50 uppercase block mb-1">Frozen Chamber Probe</span>
            <div className="flex items-center justify-center gap-1">
              <input
                type="number"
                step="0.1"
                value={frozenTemp}
                onChange={(e) => setFrozenTemp(e.target.value)}
                className="w-16 bg-obsidian-950 text-center font-mono text-base font-bold text-blue-400 rounded border border-cream/20 py-0.5"
              />
              <span className="font-mono text-xs text-cream/60">°C</span>
            </div>
            <span className="text-[9px] text-cream/40 block mt-1">Target: &le; -18.0°C</span>
          </div>
        </div>
      </div>

      {/* Active Stops List */}
      <div className="space-y-3">
        <h2 className="font-mono text-xs uppercase tracking-wider text-cream/60 font-bold flex justify-between">
          <span>Stops In Progress ({activeDeliveries.length})</span>
          <span className="text-champagne font-normal">Birmingham City Route</span>
        </h2>

        {activeDeliveries.length === 0 ? (
          <div className="glass-panel p-6 rounded-2xl text-center text-xs text-cream/50 space-y-2 border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="font-bold text-cream">All scheduled drops completed for this route!</p>
            <p className="text-[11px] text-cream/60">Van returning to Digbeth Depot Hub for 11:00 PM evening reload.</p>
          </div>
        ) : (
          activeDeliveries.map((order, idx) => (
            <div
              key={order.id}
              className="glass-panel p-4 rounded-2xl space-y-3 border border-cream/10 hover:border-champagne/40 transition-all shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 rounded bg-champagne text-obsidian-950 font-mono font-bold text-[10px]">
                    Stop #{idx + 1} &bull; {order.orderNumber}
                  </span>
                  <h3 className="font-bold text-cream text-base mt-1">{order.organizationName}</h3>
                  <div className="text-xs text-cream/70 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-champagne shrink-0" />
                    <span>{order.locationName}</span>
                  </div>
                </div>

                <span className="font-mono text-[11px] font-bold text-champagne px-2 py-1 bg-obsidian-900 rounded-lg border border-cream/10">
                  {order.deliverySlot.split(' ')[0]}
                </span>
              </div>

              {/* Driver Drop Instructions */}
              <div className="p-2.5 bg-obsidian-900/90 rounded-xl text-[11px] text-cream/80 border border-cream/5 italic flex items-start gap-2">
                <FileText className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                <span>{order.deliveryNotes || 'Deliver to kitchen inwards door.'}</span>
              </div>

              {/* Items summary */}
              <div className="text-[11px] text-cream/50 font-mono flex justify-between">
                <span>{order.items.reduce((sum, i) => sum + i.qty, 0)} crates/packs</span>
                <span className="text-cream">£{order.total.toFixed(2)}</span>
              </div>

              <div className="flex gap-2 pt-1">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${order.organizationName} ${order.locationName} Birmingham`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-obsidian-900 border border-cream/15 text-xs text-cream flex items-center justify-center gap-1.5 font-medium hover:text-champagne transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>GPS Navigate</span>
                </a>

                <button
                  onClick={() => setActiveOrder(order)}
                  className="flex-1 py-2 rounded-xl bg-emerald-500 text-obsidian-950 text-xs font-bold shadow-emerald-glow hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Sign & Complete POD</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Completed Stops with Expandable POD Receipts */}
      {completedDeliveries.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-cream/10">
          <h2 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold flex justify-between">
            <span>Delivered POD Receipts ({completedDeliveries.length})</span>
            <span className="text-[10px] text-cream/40">Audit Log Ready</span>
          </h2>
          <div className="space-y-2">
            {completedDeliveries.map((ord) => {
              const isExpanded = expandedPodId === ord.id;
              return (
                <div
                  key={ord.id}
                  className="bg-obsidian-900/80 rounded-xl border border-cream/10 overflow-hidden text-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedPodId(isExpanded ? null : ord.id)}
                    className="w-full p-3 flex justify-between items-center text-left hover:bg-obsidian-850"
                  >
                    <div>
                      <div className="font-bold text-cream flex items-center gap-2">
                        <span>{ord.organizationName}</span>
                        <span className="text-[10px] font-mono text-champagne font-normal">({ord.orderNumber})</span>
                      </div>
                      <div className="text-[10px] text-cream/40">{ord.locationName}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>POD Verified</span>
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-cream/40" /> : <ChevronDown className="w-4 h-4 text-cream/40" />}
                    </div>
                  </button>

                  {/* Expanded POD Details */}
                  {isExpanded && (
                    <div className="p-3.5 bg-obsidian-950 border-t border-cream/5 space-y-2 text-[11px] font-mono">
                      <div className="flex justify-between text-cream/70">
                        <span>Receiver Name:</span>
                        <span className="text-cream font-bold">{ord.pod?.recipientName || 'Head Chef'}</span>
                      </div>
                      <div className="flex justify-between text-cream/70">
                        <span>Delivered Timestamp:</span>
                        <span className="text-cream">{ord.pod?.deliveredAt || ord.updatedAt}</span>
                      </div>
                      <div className="flex justify-between text-cream/70">
                        <span>Chamber Temp:</span>
                        <span className="text-emerald-400 font-bold">{ord.pod?.vanProbeChilledTemp || chilledTemp}°C</span>
                      </div>
                      {ord.pod?.signatureDataUrl && (
                        <div className="pt-2 border-t border-cream/5">
                          <span className="text-[10px] uppercase text-cream/50 block mb-1">Captured Receiver Signature:</span>
                          <div className="bg-obsidian-900 border border-cream/10 rounded-lg p-2 flex justify-center">
                            <img
                              src={ord.pod.signatureDataUrl}
                              alt="Customer Signature"
                              className="h-14 object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Proof of Delivery Interactive Signature Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-gold rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center border-b border-cream/10 pb-3">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-champagne" />
                <h3 className="font-display font-bold text-lg text-cream">Proof of Delivery (POD)</h3>
              </div>
              <button
                onClick={() => setActiveOrder(null)}
                className="text-cream/40 hover:text-cream text-sm p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-cream/80 space-y-1 bg-obsidian-950/60 p-3 rounded-xl border border-cream/10">
              <div><strong className="text-cream">{activeOrder.organizationName}</strong> ({activeOrder.orderNumber})</div>
              <div className="text-cream/50">{activeOrder.locationName}</div>
              <div className="text-[11px] text-champagne font-mono pt-1">
                Value: £{activeOrder.total.toFixed(2)} &bull; {activeOrder.items.length} product lines
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-cream/60 mb-1">
                  Recipient / Receiving Chef Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chef Marco Rossi"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-obsidian-950 border border-cream/20 rounded-xl px-3 py-2 text-cream focus:outline-none focus:border-champagne"
                />
              </div>

              {/* Digital Signature Canvas */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-mono uppercase text-cream/60">
                    Sign on Glass *
                  </label>
                  {hasSigned && (
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="text-[10px] font-mono text-rose-400 hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>
                <div className="border border-cream/20 rounded-xl overflow-hidden bg-obsidian-950 relative">
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={110}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-[110px] cursor-crosshair touch-none"
                  />
                  {!hasSigned && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-cream/25 italic text-xs">
                      Sign with finger or stylus here
                    </div>
                  )}
                </div>
              </div>

              <div className="p-2.5 bg-obsidian-950 rounded-xl text-[10px] font-mono text-emerald-400 flex justify-between border border-emerald-500/20">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Van Probe Temperature:</span>
                </span>
                <span className="font-bold">{chilledTemp}°C (Chilled)</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => handleCompleteDelivery(activeOrder.id)}
                disabled={!recipientName.trim()}
                className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  recipientName.trim()
                    ? 'bg-emerald-500 text-obsidian-950 shadow-emerald-glow hover:brightness-110'
                    : 'bg-obsidian-800 text-cream/30 border border-cream/10 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Delivery</span>
              </button>
              <button
                onClick={() => setActiveOrder(null)}
                className="px-4 py-3 rounded-xl bg-obsidian-900 border border-cream/15 text-xs text-cream/60 hover:text-cream"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
