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

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0] || {
    id: 'org-default',
    name: 'Commercial Client',
    locations: [{ id: 'loc-1', name: 'Main Kitchen' }]
  };
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
      {/* ─── Toast notification ─── */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{activeToast}</span>
        </div>
      )}

      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 uppercase font-bold tracking-wider">
            <Repeat className="w-3.5 h-3.5 text-emerald-600" />
            <span>Automated Recurring Cold-Chain Supply</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-slate-900 mt-1.5 tracking-tight">
            Standing Orders &amp; Recurring Schedules
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {currentOrg.name} &bull; Set up recurring weekly deliveries so kitchen staples arrive automatically without manual ordering every evening.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateNew}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Standing Order</span>
          </button>
          <Link
            href="/catalog"
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-700" />
            <span>Add from Catalog</span>
          </Link>
        </div>
      </div>

      {/* ─── Quick summary status banner ─── */}
      <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 font-sans">
              2 Standing Schedules Active for {currentOrg.name}
            </div>
            <div className="text-[11px] text-slate-600 font-mono mt-0.5">
              Next scheduled drop: <strong className="text-emerald-800">Monday 05:30 AM</strong> at {currentOrg.locations?.[0]?.name || 'Primary Kitchen'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white border border-emerald-200 text-[10px] font-mono text-emerald-800 font-bold shadow-2xs">
            Guaranteed Keyslot Drop
          </span>
        </div>
      </div>

      {/* ─── Schedules List ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schedules.map((schedule) => {
          const scheduleTotal = schedule.items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0);

          return (
            <div
              key={schedule.id}
              className="bg-white p-6 rounded-2xl space-y-5 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between shadow-xs group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono capitalize border ${
                        schedule.status === 'active'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-bold'
                          : 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                      }`}
                    >
                      {schedule.status === 'active' ? '● Live Active Schedule' : '⏸ Paused for Holiday'}
                    </span>
                    <h3 className="font-sans text-xl font-bold text-slate-900 mt-2 group-hover:text-emerald-700 transition-colors">
                      {schedule.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleScheduleStatus(schedule.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-all shrink-0 font-medium"
                  >
                    {schedule.status === 'active' ? (
                      <>
                        <PauseCircle className="w-4 h-4 text-amber-600" />
                        <span className="font-mono text-[11px]">Pause Drop</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4 text-emerald-600" />
                        <span className="font-mono text-[11px]">Resume Drop</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 font-mono">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-slate-900 font-medium">{schedule.dayOfWeek}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Delivers to: {schedule.location}</span>
                  </div>
                </div>

                {/* Items in schedule */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="text-[10px] uppercase font-mono text-slate-500 font-bold tracking-wider">
                    Scheduled Regular Lines:
                  </div>
                  <div className="space-y-2 text-slate-800">
                    {schedule.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-200/60 last:border-0">
                        <div className="min-w-0 pr-2">
                          <div className="font-bold text-slate-900 truncate">{item.qty}x {item.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{item.sku} &bull; {item.packSize}</div>
                        </div>
                        <span className="font-mono text-slate-900 font-bold shrink-0">
                          £{(item.qty * item.unitPrice).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total & Action Footer */}
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block font-medium">Estimated Weekly Recurrence</span>
                  <span className="font-mono font-bold text-emerald-800 text-base">£{scheduleTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => showToast('Standing order line quantities updated successfully.')}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
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
