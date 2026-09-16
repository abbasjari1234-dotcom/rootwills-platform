'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/store/app-store';
import { Order } from '@/types/orders';
import { 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Thermometer, 
  Navigation, 
  PenTool, 
  FileText,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  X,
  Camera
} from 'lucide-react';
import { submitDriverPOD, getLiveOrdersServerAction } from '@/actions/orders';

type PodMode = 'signature' | 'photo';

export function DriverPageClient() {
  const { orders, updateOrderStatus } = useAppStore();
  const [liveDbOrders, setLiveDbOrders] = useState<Order[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [podMode, setPodMode] = useState<PodMode>('signature');
  const [chilledTemp, setChilledTemp] = useState('2.4');
  const [frozenTemp, setFrozenTemp] = useState('-19.2');
  const [recipientName, setRecipientName] = useState('');
  const [hasSigned, setHasSigned] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [expandedPodId, setExpandedPodId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const syncRunSheet = async () => {
    setIsSyncing(true);
    try {
      const dbOrders = await getLiveOrdersServerAction();
      if (Array.isArray(dbOrders) && dbOrders.length > 0) {
        setLiveDbOrders(dbOrders);
      }
    } catch (e) {
      console.warn('Driver sync error:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    syncRunSheet();
  }, []);

  // Merge live DB orders with local store orders
  const allOrdersMap = new Map<string, Order>();
  liveDbOrders.forEach((o) => {
    if (o && o.id) allOrdersMap.set(o.id, o);
  });
  (orders || []).forEach((o) => {
    if (o && o.id) {
      allOrdersMap.set(o.id, o);
    }
  });

  const mergedOrders = Array.from(allOrdersMap.values());
  const activeDeliveries = mergedOrders.filter((o) => o.status !== 'delivered');
  const completedDeliveries = mergedOrders.filter((o) => o.status === 'delivered');

  // Temperature compliance check
  const isChilledCompliant = parseFloat(chilledTemp) <= 4.0;
  const isFrozenCompliant = parseFloat(frozenTemp) <= -18.0;

  // Initialize canvas
  useEffect(() => {
    if (activeOrder && podMode === 'signature' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#0f172a'; // slate-900 high contrast ink
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [activeOrder, podMode]);

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

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCompleteDelivery = async (orderId: string) => {
    if (podMode === 'signature' && !recipientName.trim()) {
      alert('Please enter the receiver / head chef name.');
      return;
    }

    if (podMode === 'photo' && !photoPreview) {
      alert('Please snap a photo of the safe-drop delivery before confirming.');
      return;
    }

    setIsSubmitting(true);

    const signatureDataUrl = podMode === 'signature' && canvasRef.current
      ? canvasRef.current.toDataURL('image/png')
      : undefined;

    const deliveredAt = new Date().toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' });
    const finalRecipient = podMode === 'photo' ? 'Keyholder Drop (Photo Verified)' : recipientName.trim();

    const podData = {
      recipientName: finalRecipient,
      signatureDataUrl: signatureDataUrl || photoPreview || undefined,
      vanProbeChilledTemp: chilledTemp,
      vanProbeFrozenTemp: frozenTemp,
      deliveredAt,
      driverName: 'Dave King (Birmingham Hub Van #04)',
      dropType: podMode === 'photo' ? 'Keyholder Safe Drop' : 'Direct Handover',
    };

    // 1. Submit to Supabase Server Action
    await submitDriverPOD({
      orderId,
      recipientName: finalRecipient,
      signatureDataUrl: signatureDataUrl || photoPreview || undefined,
      vanProbeChilledTemp: chilledTemp,
      vanProbeFrozenTemp: frozenTemp,
      driverName: 'Dave King (Van #04)',
    });

    // 2. Update client demo store
    updateOrderStatus(
      orderId,
      'delivered',
      `${podMode === 'photo' ? 'Keyholder drop photo captured' : `Signed by ${recipientName.trim()}`} & delivered by Dave King. Chilled: ${chilledTemp}°C.`,
      podData
    );

    setIsSubmitting(false);
    setActiveOrder(null);
    setRecipientName('');
    setHasSigned(false);
    setPhotoPreview(null);
    setPodMode('signature');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-4 sm:p-6 max-w-lg mx-auto space-y-5">
      {/* Driver Header */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">Driver Manifest &bull; Van #04</div>
            <h1 className="text-base font-bold text-slate-900">Run Sheet & Route Drops</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={syncRunSheet}
            disabled={isSyncing}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Sync live route manifest"
          >
            <RotateCcw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          </button>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
            Route Live
          </span>
        </div>
      </div>

      {/* Temperature Compliance Check Card */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3 text-xs shadow-xs">
        <div className="flex justify-between items-center font-bold text-slate-800">
          <span className="flex items-center gap-1.5 text-xs">
            <Thermometer className="w-4 h-4 text-emerald-600" />
            <span>Dual-Temp Cold Chain Probe Check</span>
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
            isChilledCompliant && isFrozenCompliant
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}>
            {isChilledCompliant && isFrozenCompliant ? '✓ BRCGS Compliant' : '⚠ Temp Alert'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">Chilled Chamber Probe</span>
            <div className="flex items-center justify-center gap-1">
              <input
                type="number"
                step="0.1"
                value={chilledTemp}
                onChange={(e) => setChilledTemp(e.target.value)}
                className="w-16 bg-white text-center font-mono text-base font-bold text-emerald-700 rounded border border-slate-300 py-0.5 shadow-xs"
              />
              <span className="font-mono text-xs text-slate-500">°C</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">Target: &le; 4.0°C</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">Frozen Chamber Probe</span>
            <div className="flex items-center justify-center gap-1">
              <input
                type="number"
                step="0.1"
                value={frozenTemp}
                onChange={(e) => setFrozenTemp(e.target.value)}
                className="w-16 bg-white text-center font-mono text-base font-bold text-blue-700 rounded border border-slate-300 py-0.5 shadow-xs"
              />
              <span className="font-mono text-xs text-slate-500">°C</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">Target: &le; -18.0°C</span>
          </div>
        </div>
      </div>

      {/* Active Stops List */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase tracking-wider text-slate-500 font-bold flex justify-between px-1">
          <span>Stops In Progress ({activeDeliveries.length})</span>
          <span className="text-slate-700 font-semibold">Birmingham City Route</span>
        </h2>

        {activeDeliveries.length === 0 ? (
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center text-xs space-y-2 shadow-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="font-bold text-slate-900 text-sm">All scheduled drops completed for this route!</p>
            <p className="text-xs text-slate-500">Van returning to Digbeth Depot Hub for 11:00 PM evening reload.</p>
          </div>
        ) : (
          activeDeliveries.map((order, idx) => (
            <div
              key={order.id}
              className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3 hover:border-slate-300 transition-all shadow-xs"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono font-bold text-[10px] border border-slate-200">
                    Stop #{idx + 1} &bull; {order.orderNumber}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mt-1">{order.organizationName}</h3>
                  <div className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{order.locationName}</span>
                  </div>
                </div>

                <span className="font-mono text-xs font-bold text-slate-900 px-2 py-1 bg-slate-50 rounded-lg border border-slate-200">
                  {order.deliverySlot.split(' ')[0]}
                </span>
              </div>

              {/* Driver Drop Instructions */}
              <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200 italic flex items-start gap-2">
                <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>&ldquo;{order.deliveryNotes || 'Deliver to kitchen inwards door.'}&rdquo;</span>
              </div>

              {/* Items summary */}
              <div className="text-xs text-slate-500 font-mono flex justify-between pt-1 border-t border-slate-100">
                <span>{order.items.reduce((sum, i) => sum + i.qty, 0)} crates/packs</span>
                <span className="text-slate-900 font-bold">£{order.total.toFixed(2)}</span>
              </div>

              <div className="flex gap-2 pt-1">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${order.organizationName} ${order.locationName} Birmingham`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    if (order.status !== 'out_for_delivery') {
                      updateOrderStatus(order.id, 'out_for_delivery', 'Driver en route to venue with dual-temp van.');
                    }
                  }}
                  className="flex-1 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 font-semibold shadow-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>GPS Map</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActiveOrder(order)}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Complete POD</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Completed Stops with Expandable POD Receipts */}
      {completedDeliveries.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h3 className="text-xs uppercase tracking-wider text-emerald-800 font-bold flex justify-between px-1">
            <span>Delivered POD Receipts ({completedDeliveries.length})</span>
            <span className="text-[11px] text-slate-500">Audit Ready</span>
          </h3>
          <div className="space-y-2">
            {completedDeliveries.map((ord) => {
              const isExpanded = expandedPodId === ord.id;
              return (
                <div
                  key={ord.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs transition-all shadow-xs"
                >
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-label={`Toggle proof of delivery receipt for order ${ord.orderNumber}`}
                    onClick={() => setExpandedPodId(isExpanded ? null : ord.id)}
                    className="w-full p-3 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="block">
                      <span className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{ord.organizationName}</span>
                        <span className="text-[11px] font-mono text-slate-500 font-normal">({ord.orderNumber})</span>
                      </span>
                      <span className="text-[11px] text-slate-500 block">{ord.locationName}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-emerald-800 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>POD Logged</span>
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isExpanded ? 'rotate-90 text-slate-700' : ''
                        }`}
                      />
                    </span>
                  </button>

                  {/* Expanded POD Details */}
                  {isExpanded && (
                    <div className="p-3.5 bg-slate-50 border-t border-slate-200 space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-slate-600">
                        <span>Receiver Name:</span>
                        <span className="text-slate-900 font-bold">{ord.pod?.recipientName || 'Head Chef'}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Delivered Timestamp:</span>
                        <span className="text-slate-900">{ord.pod?.deliveredAt || ord.updatedAt}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Chamber Temp:</span>
                        <span className="text-emerald-700 font-bold">{ord.pod?.vanProbeChilledTemp || chilledTemp}°C</span>
                      </div>
                      {ord.pod?.signatureDataUrl && (
                        <div className="pt-2 border-t border-slate-200">
                          <span className="text-[10px] uppercase text-slate-500 block mb-1 font-sans font-semibold">
                            Captured Proof of Delivery Visual:
                          </span>
                          <div className="bg-white border border-slate-200 rounded-lg p-2 flex justify-center">
                            <img
                              src={ord.pod.signatureDataUrl}
                              alt="Captured Proof of Delivery"
                              className="max-h-32 object-contain rounded"
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

      {/* Proof of Delivery Interactive Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">Proof of Delivery (POD)</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveOrder(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-700 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div><strong className="text-slate-900">{activeOrder.organizationName}</strong> ({activeOrder.orderNumber})</div>
              <div className="text-slate-500">{activeOrder.locationName}</div>
              <div className="text-xs text-slate-900 font-mono pt-1">
                Value: £{activeOrder.total.toFixed(2)} &bull; {activeOrder.items.length} product lines
              </div>
            </div>

            {/* POD Mode Selector: Signature vs Safe Drop Photo */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setPodMode('signature')}
                className={`py-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                  podMode === 'signature'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PenTool className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chef Signature</span>
              </button>
              <button
                type="button"
                onClick={() => setPodMode('photo')}
                className={`py-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                  podMode === 'photo'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-emerald-600" />
                <span>Safe Drop Photo</span>
              </button>
            </div>

            {/* Mode 1: Sign on Glass */}
            {podMode === 'signature' && (
              <div className="space-y-3 text-xs animate-fade-in">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Recipient / Receiving Chef Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chef Marcus Wareing"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Digital Signature Canvas */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-semibold text-slate-700">
                      Sign on Glass *
                    </label>
                    {hasSigned && (
                      <button
                        type="button"
                        onClick={clearSignature}
                        className="text-[11px] text-rose-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    )}
                  </div>
                  <div className="border border-slate-300 rounded-xl overflow-hidden bg-slate-50 relative">
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
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-slate-400 italic text-xs">
                        Sign with finger or stylus here
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Mode 2: Keyholder Safe Drop Photo */}
            {podMode === 'photo' && (
              <div className="space-y-3 text-xs animate-fade-in">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoCapture}
                  className="hidden"
                />

                {photoPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-emerald-300 bg-slate-50">
                    <img
                      src={photoPreview}
                      alt="Safe drop preview"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-slate-900/80 backdrop-blur-xs rounded-lg text-[10px] font-mono text-white flex justify-between">
                      <span className="text-emerald-300">✓ Photo Verified</span>
                      <button
                        type="button"
                        onClick={() => setPhotoPreview(null)}
                        className="text-rose-300 hover:underline font-semibold"
                      >
                        Retake
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-8 rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 flex flex-col items-center justify-center gap-2 text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                  >
                    <span className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </span>
                    <span className="font-bold text-xs block text-slate-800">Snap Keyholder Drop Photo</span>
                    <span className="text-[10px] text-slate-500 block">Kitchen inwards entrance / Cold room drop</span>
                  </button>
                )}
              </div>
            )}

            {/* Temperature Probe Pill */}
            <div className="p-2.5 bg-slate-50 rounded-xl text-xs font-mono text-slate-700 flex justify-between border border-slate-200">
              <span className="flex items-center gap-1 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Van Probe Temp:</span>
              </span>
              <span className="font-bold text-emerald-700">{chilledTemp}°C (BRCGS Validated)</span>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => handleCompleteDelivery(activeOrder.id)}
                disabled={isSubmitting || (podMode === 'signature' && !recipientName.trim()) || (podMode === 'photo' && !photoPreview)}
                className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                  (podMode === 'signature' ? recipientName.trim() : photoPreview) && !isSubmitting
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Drop</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveOrder(null)}
                className="px-4 py-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
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
