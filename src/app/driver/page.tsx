'use client';

import React, { useState } from 'react';
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
  AlertCircle
} from 'lucide-react';

export default function DriverMobileRunSheetPage() {
  const { orders, updateOrderStatus } = useDemoStore();
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [chilledTemp, setChilledTemp] = useState('2.3');
  const [frozenTemp, setFrozenTemp] = useState('-19.1');
  const [recipientName, setRecipientName] = useState('');
  const [deliveredSuccess, setDeliveredSuccess] = useState(false);

  const activeDeliveries = orders.filter((o) => o.status !== 'delivered');
  const completedDeliveries = orders.filter((o) => o.status === 'delivered');

  const handleCompleteDelivery = (orderId: string) => {
    if (!recipientName) {
      alert('Please enter the name of the receiver/chef.');
      return;
    }
    updateOrderStatus(orderId, 'delivered', `Delivered by Driver (Dave K.) — Signed by ${recipientName}. Van Temp: ${chilledTemp}°C`);
    setDeliveredSuccess(true);
    setTimeout(() => {
      setDeliveredSuccess(false);
      setActiveOrder(null);
      setRecipientName('');
    }, 1500);
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
            <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Driver Run Sheet &bull; Van #04</div>
            <h1 className="font-display text-lg font-bold text-cream">Dave King (Birmingham Hub)</h1>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] border border-emerald-500/20">
          Route Live
        </span>
      </div>

      {/* Temperature Compliance Check Card */}
      <div className="glass-panel p-4 rounded-2xl space-y-3 text-xs border border-cream/15">
        <div className="flex justify-between items-center text-champagne font-mono font-bold">
          <span className="flex items-center gap-1">
            <Thermometer className="w-4 h-4" />
            <span>Dual-Temp Van Probe Status</span>
          </span>
          <span className="text-[10px] text-emerald-400">BRCGS Compliant</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-2.5 bg-obsidian-900 rounded-xl border border-cream/10">
            <span className="text-[10px] text-cream/50 uppercase block">Chilled Chamber</span>
            <span className="font-mono text-base font-bold text-emerald-400">{chilledTemp}°C</span>
            <span className="text-[9px] text-cream/40 block">Target: &lt; 4.0°C</span>
          </div>
          <div className="p-2.5 bg-obsidian-900 rounded-xl border border-cream/10">
            <span className="text-[10px] text-cream/50 uppercase block">Frozen Chamber</span>
            <span className="font-mono text-base font-bold text-blue-400">{frozenTemp}°C</span>
            <span className="text-[9px] text-cream/40 block">Target: &lt; -18.0°C</span>
          </div>
        </div>
      </div>

      {/* Active Stops List */}
      <div className="space-y-3">
        <h2 className="font-mono text-xs uppercase tracking-wider text-cream/60 font-bold">
          Stops In Progress ({activeDeliveries.length})
        </h2>

        {activeDeliveries.length === 0 ? (
          <div className="glass-panel p-6 rounded-2xl text-center text-xs text-cream/50 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p>All scheduled deliveries for this run have been completed!</p>
          </div>
        ) : (
          activeDeliveries.map((order, idx) => (
            <div
              key={order.id}
              className="glass-panel p-4 rounded-2xl space-y-3 border border-cream/10 hover:border-champagne/40 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 rounded bg-champagne text-obsidian-950 font-mono font-bold text-[10px]">
                    Stop #{idx + 1}
                  </span>
                  <h3 className="font-bold text-cream text-base mt-1">{order.organizationName}</h3>
                  <div className="text-xs text-cream/70 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-champagne shrink-0" />
                    <span>{order.locationName}</span>
                  </div>
                </div>

                <span className="font-mono text-xs font-bold text-champagne">
                  {order.deliverySlot}
                </span>
              </div>

              {/* Driver Drop Instructions */}
              <div className="p-2.5 bg-obsidian-900 rounded-xl text-[11px] text-cream/80 border border-cream/5 italic">
                {order.deliveryNotes || 'Standard keyholder early delivery.'}
              </div>

              {/* Items summary */}
              <div className="text-[11px] text-cream/50 font-mono">
                {order.items.reduce((sum, i) => sum + i.qty, 0)} crates/packs &bull; Total £{order.total.toFixed(2)}
              </div>

              <div className="flex gap-2 pt-1">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.locationName)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-obsidian-900 border border-cream/15 text-xs text-cream flex items-center justify-center gap-1.5 font-medium hover:text-champagne"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate</span>
                </a>

                <button
                  onClick={() => setActiveOrder(order)}
                  className="flex-1 py-2 rounded-xl bg-emerald-500 text-obsidian-950 text-xs font-bold shadow-emerald-glow hover:brightness-110 flex items-center justify-center gap-1.5"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Proof of Delivery</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Completed Stops */}
      {completedDeliveries.length > 0 && (
        <div className="space-y-3 pt-4">
          <h2 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">
            Delivered ({completedDeliveries.length})
          </h2>
          <div className="space-y-2">
            {completedDeliveries.map((ord) => (
              <div
                key={ord.id}
                className="p-3 bg-obsidian-900/60 rounded-xl border border-cream/5 flex justify-between items-center text-xs opacity-75"
              >
                <div>
                  <div className="font-bold text-cream">{ord.organizationName}</div>
                  <div className="text-[10px] text-cream/40">{ord.locationName}</div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Signed & Delivered</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Proof of Delivery / Signature Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-gold rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-cream/10 pb-3">
              <h3 className="font-display font-bold text-lg text-cream">Proof of Delivery Sign-off</h3>
              <button
                onClick={() => setActiveOrder(null)}
                className="text-cream/40 hover:text-cream text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-cream/80 space-y-1">
              <div><strong>{activeOrder.organizationName}</strong> ({activeOrder.orderNumber})</div>
              <div className="text-cream/50">{activeOrder.locationName}</div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-cream/60 mb-1">
                  Recipient / Receiving Chef Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chef Marco / Sarah"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-obsidian-950 border border-cream/20 rounded-xl px-3 py-2 text-cream focus:outline-none focus:border-champagne"
                />
              </div>

              {/* Digital Signature Pad Mock */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-cream/60 mb-1">
                  Sign on Glass
                </label>
                <div className="h-24 bg-white/5 border border-cream/20 rounded-xl flex items-center justify-center text-cream/30 italic text-[11px] cursor-crosshair relative">
                  <span>Sign with finger / stylus here</span>
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-cream/30">✓ Verified GPS</div>
                </div>
              </div>

              <div className="p-2.5 bg-obsidian-950 rounded-xl text-[10px] font-mono text-emerald-400 flex justify-between">
                <span>Recorded Van Probe:</span>
                <span>{chilledTemp}°C (Chilled)</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => handleCompleteDelivery(activeOrder.id)}
                className="flex-1 py-3 rounded-xl bg-emerald-500 text-obsidian-950 font-bold text-xs shadow-emerald-glow hover:brightness-110 flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Delivery</span>
              </button>
              <button
                onClick={() => setActiveOrder(null)}
                className="px-4 py-3 rounded-xl bg-obsidian-900 border border-cream/15 text-xs text-cream/60"
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
