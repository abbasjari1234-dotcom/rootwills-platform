'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/app-store';
import { useCartStore } from '@/store/cart-store';
import { 
  Repeat, 
  Calendar, 
  Clock, 
  Plus, 
  CheckCircle2, 
  PauseCircle, 
  PlayCircle,
  ShoppingBag,
  Sparkles,
  MapPin,
  Edit3,
  Check,
  Truck
} from 'lucide-react';

export function PortalStandingOrdersView() {
  const { currentOrgId, organizations, getCustomerProducts } = useAppStore();
  const { openCart, setStandingOrder } = useCartStore();

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Standing schedules
  const [schedules, setSchedules] = useState([
    {
      id: 'sched-1',
      title: 'Weekly Monday Morning Service Prep',
      dayOfWeek: 'Every Monday (05:30 – 07:30 AM)',
      recurrence: 'weekly',
      status: 'active',
      location: currentOrg.locations[0]?.name || 'Main Kitchen',
      items: [
        { sku: 'RW-TOM-01', name: 'San Marzano Vine Tomatoes', packSize: '6kg Crate', qty: 6, unitPrice: 7.80 },
        { sku: 'RW-POT-02', name: 'Selected Maris Piper Washed Potatoes', packSize: '25kg Sack', qty: 4, unitPrice: 13.14 },
        { sku: 'RW-SPN-03', name: 'Washed Baby Spinach Leaves', packSize: '1kg Box', qty: 4, unitPrice: 4.50 },
      ],
    },
    {
      id: 'sched-2',
      title: 'Thursday Weekend Service Stock-up',
      dayOfWeek: 'Every Thursday (06:00 – 08:00 AM)',
      recurrence: 'weekly',
      status: 'active',
      location: currentOrg.locations[0]?.name || 'Main Kitchen',
      items: [
        { sku: 'RW-RIB-08', name: '28-Day Dry-Aged British Ribeye Steaks', packSize: '2.5kg Case', qty: 6, unitPrice: 69.50 },
        { sku: 'RW-LEM-04', name: 'Amalfi Coast PGI Lemons', packSize: '5kg Crate', qty: 3, unitPrice: 13.90 },
        { sku: 'RW-MSH-05', name: 'Chef’s Wild Forest Mushroom Mix', packSize: '1kg Basket', qty: 4, unitPrice: 20.35 },
      ],
    },
  ]);

  const toggleScheduleStatus = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === 'active' ? 'paused' : 'active';
          showToast(nextStatus === 'active' ? 'Standing order resumed for next drop.' : 'Standing order paused for holiday.');
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const showToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(null), 3000);
  };

  const handleCreateNew = () => {
    setStandingOrder(true);
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast notification */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-obsidian-900 border border-champagne/40 text-cream text-xs font-mono shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{activeToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-emerald-950/80">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-champagne uppercase font-bold tracking-wider">
            <Repeat className="w-3.5 h-3.5" />
            <span>Automated Recurring Cold-Chain Supply</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1.5 tracking-tight">
            Standing Orders & Recurring Schedules
          </h1>
          <p className="text-xs sm:text-sm text-cream/60 mt-1">
            {currentOrg.name} &bull; Set up recurring weekly deliveries so kitchen staples arrive automatically without manual ordering every evening.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateNew}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Standing Order</span>
          </button>
          <Link
            href="/catalog"
            className="px-4 py-2.5 rounded-xl border border-emerald-800/60 bg-emerald-950/40 hover:border-champagne/60 text-cream text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-champagne" />
            <span>Add from Catalog</span>
          </Link>
        </div>
      </div>

      {/* Quick summary status banner */}
      <div className="glass-panel-emerald p-5 rounded-2xl border border-emerald-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-cream font-sans">
              2 Standing Schedules Active for {currentOrg.name}
            </div>
            <div className="text-[11px] text-cream/60 font-mono mt-0.5">
              Next scheduled drop: <strong className="text-champagne">Monday 05:30 AM</strong> at {currentOrg.locations[0]?.name}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 font-bold">
            Guaranteed Keyslot Drop
          </span>
        </div>
      </div>

      {/* Schedules List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schedules.map((schedule) => {
          const scheduleTotal = schedule.items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0);

          return (
            <div
              key={schedule.id}
              className="glass-panel p-6 rounded-2xl space-y-5 border border-emerald-950/80 hover:border-champagne/30 transition-all flex flex-col justify-between shadow-lg group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono capitalize border ${
                        schedule.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {schedule.status === 'active' ? '● Live Active Schedule' : '⏸ Paused for Holiday'}
                    </span>
                    <h3 className="font-display text-xl font-bold text-cream mt-2 group-hover:text-champagne transition-colors">
                      {schedule.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleScheduleStatus(schedule.id)}
                    className="px-3 py-1.5 rounded-xl bg-obsidian-950 border border-emerald-900/60 text-xs text-cream/70 hover:text-cream hover:border-champagne/40 flex items-center gap-1.5 transition-all shrink-0"
                  >
                    {schedule.status === 'active' ? (
                      <>
                        <PauseCircle className="w-4 h-4 text-amber-400" />
                        <span className="font-mono text-[11px]">Pause Drop</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4 text-emerald-400" />
                        <span className="font-mono text-[11px]">Resume Drop</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-cream/70 font-mono">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-champagne" />
                    <span className="text-cream font-medium">{schedule.dayOfWeek}</span>
                  </div>
                  <div className="flex items-center gap-2 text-cream/50">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Delivers to: {schedule.location}</span>
                  </div>
                </div>

                {/* Items in schedule */}
                <div className="p-3.5 bg-obsidian-950 rounded-xl border border-emerald-950/80 space-y-2 text-xs">
                  <div className="text-[10px] uppercase font-mono text-champagne font-bold tracking-wider">
                    Scheduled Regular Lines:
                  </div>
                  <div className="space-y-2 text-cream/80">
                    {schedule.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-emerald-950/40 last:border-0">
                        <div className="min-w-0 pr-2">
                          <div className="font-bold text-cream truncate">{item.qty}x {item.name}</div>
                          <div className="text-[10px] text-cream/40 font-mono">{item.sku} &bull; {item.packSize}</div>
                        </div>
                        <span className="font-mono text-champagne font-semibold shrink-0">
                          £{(item.qty * item.unitPrice).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total & Action Footer */}
              <div className="pt-4 border-t border-emerald-950/80 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-cream/40 block">Estimated Weekly Recurrence</span>
                  <span className="font-mono font-bold text-champagne text-base">£{scheduleTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => showToast('Standing order line quantities updated successfully.')}
                  className="px-3.5 py-2 rounded-xl bg-obsidian-900 border border-emerald-800/60 hover:border-champagne text-cream text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-champagne" />
                  <span>Edit Schedule</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
