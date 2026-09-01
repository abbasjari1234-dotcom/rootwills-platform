'use client';

import React, { useState } from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
import { 
  Repeat, 
  Calendar, 
  Play, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface StandingSchedule {
  id: string;
  orgName: string;
  name: string;
  recurrence: string;
  locationName: string;
  items: { name: string; qty: number; price: number }[];
  active: boolean;
}

const DEFAULT_SCHEDULES: StandingSchedule[] = [
  {
    id: 'so-1',
    orgName: 'San Carlo Ristorante Group',
    name: 'Weekly Monday Morning Prep Crate',
    recurrence: 'weekly',
    locationName: 'San Carlo — Temple Street, Birmingham',
    items: [
      { name: 'San Marzano Vine Tomatoes (6kg)', qty: 6, price: 7.80 },
      { name: 'Selected Maris Piper Washed Potatoes (25kg)', qty: 4, price: 13.14 },
      { name: 'Washed Baby Spinach Leaves (1kg)', qty: 4, price: 4.50 },
    ],
    active: true,
  },
  {
    id: 'so-2',
    orgName: 'The Grand Hotel Birmingham',
    name: 'Daily Breakfast Eggs & Dairy Schedule',
    recurrence: 'daily',
    locationName: 'The Grand Hotel — Church Street, Birmingham',
    items: [
      { name: 'British Lion Free Range Eggs (15 Doz)', qty: 6, price: 28.50 },
      { name: 'Cotswold Dairy Salted Butter (20x250g)', qty: 4, price: 34.20 },
      { name: 'Whole Pasteurized British Milk (2L)', qty: 12, price: 1.65 },
    ],
    active: true,
  },
  {
    id: 'so-3',
    orgName: 'Opal Care Living Group',
    name: 'Bi-Weekly Soft Produce & Dairy Box',
    recurrence: 'fortnightly',
    locationName: 'Opal Lodge — Edgbaston Park Road, Birmingham',
    items: [
      { name: 'Selected Maris Piper Washed Potatoes (25kg)', qty: 8, price: 14.20 },
      { name: 'Whole Pasteurized British Milk (2L)', qty: 24, price: 1.65 },
    ],
    active: true,
  },
];

export function AdminStandingOrdersView() {
  const { organizations, placeOrder } = useDemoStore();
  const [schedules, setSchedules] = useState<StandingSchedule[]>(DEFAULT_SCHEDULES);
  const [executedSuccess, setExecutedSuccess] = useState(false);

  const handleExecuteBatch = () => {
    // Generate an order for each active standing order
    schedules.forEach((so) => {
      if (so.active) {
        placeOrder({
          deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          deliverySlot: '05:30 - 07:30 (Keyholder Pre-Opening)',
          deliveryNotes: `Automated Standing Order Run (${so.name})`,
          isStandingOrder: true,
          recurrence: so.recurrence as any,
        });
      }
    });

    setExecutedSuccess(true);
    setTimeout(() => setExecutedSuccess(false), 3000);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-cream/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 uppercase font-bold">
            <Repeat className="w-3.5 h-3.5" />
            <span>Recurring Orders Execution Engine</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            Master Standing Orders & Cadence
          </h1>
          <p className="text-xs text-cream/60">
            Review active contract standing orders and execute the weekly morning delivery batch.
          </p>
        </div>

        <button
          onClick={handleExecuteBatch}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 text-obsidian-950 font-bold text-xs shadow-emerald-glow hover:brightness-110 flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          <span>Execute Tomorrow's Standing Run</span>
        </button>
      </div>

      {executedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4" />
          <span>Success! Standing orders batch executed and pushed to the Warehouse Picking Queue.</span>
        </div>
      )}

      {/* Active Standing Orders Matrix */}
      <div className="space-y-4">
        {schedules.map((so) => {
          const total = so.items.reduce((sum, i) => sum + i.qty * i.price, 0);

          return (
            <div
              key={so.id}
              className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-champagne/30 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cream text-base">{so.name}</span>
                  <span className="px-2 py-0.5 rounded bg-champagne/10 text-champagne text-[10px] font-mono border border-champagne/20 capitalize">
                    {so.recurrence}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                    Active
                  </span>
                </div>

                <div className="text-xs text-cream/60">
                  Customer: <strong>{so.orgName}</strong> &bull; Location: <strong>{so.locationName}</strong>
                </div>

                <div className="text-xs text-cream/40 flex flex-wrap gap-2 pt-1 font-mono">
                  {so.items.map((it, i) => (
                    <span key={i} className="bg-obsidian-950 px-2 py-0.5 rounded border border-cream/5">
                      {it.qty}x {it.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-1">
                <div className="text-[10px] font-mono uppercase text-cream/40">Scheduled Batch Total</div>
                <div className="font-mono font-bold text-champagne text-base">£{total.toFixed(2)}</div>
                <div className="text-[10px] text-cream/50">Next scheduled: Tomorrow 05:30 AM</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
