'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemoStore } from '@/lib/store/demo-store';
import { useCartStore } from '@/store/cart-store';
import { 
  Repeat, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  PauseCircle, 
  PlayCircle,
  ShoppingBag,
  Sparkles
} from 'lucide-react';

export default function StandingOrdersPage() {
  const { currentOrgId, organizations, orders, getCustomerProducts } = useDemoStore();
  const { openCart } = useCartStore();

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];
  const products = getCustomerProducts();

  // Mock active standing schedules
  const [schedules, setSchedules] = useState([
    {
      id: 'sched-1',
      title: 'Weekly Monday Morning Prep Crate',
      dayOfWeek: 'Every Monday (05:30 - 07:30 AM)',
      recurrence: 'weekly',
      status: 'active',
      location: currentOrg.locations[0]?.name || 'Main Kitchen',
      items: [
        { name: 'San Marzano Vine Tomatoes (6kg)', qty: 6, unitPrice: 7.80 },
        { name: 'Selected Maris Piper Washed Potatoes (25kg)', qty: 4, unitPrice: 13.14 },
        { name: 'Washed Baby Spinach Leaves (1kg)', qty: 4, unitPrice: 4.50 },
      ],
    },
    {
      id: 'sched-2',
      title: 'Thursday Weekend Service Stock-up',
      dayOfWeek: 'Every Thursday (06:00 - 08:00 AM)',
      recurrence: 'weekly',
      status: 'active',
      location: currentOrg.locations[0]?.name || 'Main Kitchen',
      items: [
        { name: '28-Day Dry-Aged British Ribeye Steaks (2.5kg)', qty: 6, unitPrice: 69.50 },
        { name: 'Amalfi Coast PGI Lemons (5kg)', qty: 3, unitPrice: 13.90 },
        { name: 'Chef’s Wild Forest Mushroom Mix (1kg)', qty: 4, unitPrice: 20.35 },
      ],
    },
  ]);

  const toggleScheduleStatus = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-cream/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-champagne uppercase font-bold">
            <Repeat className="w-3.5 h-3.5" />
            <span>Automated Recurring Supply</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            Standing Orders &bull; {currentOrg.name}
          </h1>
          <p className="text-xs text-cream/60">
            Set up recurring weekly deliveries so kitchen staples arrive automatically without manual ordering.
          </p>
        </div>

        <Link
          href="/catalog"
          className="px-5 py-2.5 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Standing Order</span>
        </Link>
      </div>

      {/* Schedules List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schedules.map((schedule) => {
          const scheduleTotal = schedule.items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0);

          return (
            <div
              key={schedule.id}
              className="glass-panel p-6 rounded-2xl space-y-5 border border-cream/15 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
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
                    <h3 className="font-display text-xl font-bold text-cream mt-2">
                      {schedule.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleScheduleStatus(schedule.id)}
                    className="p-1.5 rounded-lg bg-obsidian-900 border border-cream/15 text-xs text-cream/70 hover:text-cream flex items-center gap-1"
                  >
                    {schedule.status === 'active' ? (
                      <>
                        <PauseCircle className="w-4 h-4 text-amber-400" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4 text-emerald-400" />
                        <span>Resume</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-1 text-xs text-cream/70 font-mono">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-champagne" />
                    <span>{schedule.dayOfWeek}</span>
                  </div>
                  <div className="flex items-center gap-2 text-cream/50">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Delivers to: {schedule.location}</span>
                  </div>
                </div>

                {/* Items in schedule */}
                <div className="p-3 bg-obsidian-950 rounded-xl border border-cream/10 space-y-2 text-xs">
                  <div className="text-[10px] uppercase font-mono text-champagne">Scheduled Lines:</div>
                  <div className="space-y-1 text-cream/80">
                    {schedule.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.qty}x {item.name}</span>
                        <span className="font-mono text-cream/60">£{(item.qty * item.unitPrice).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total & Action Footer */}
              <div className="pt-3 border-t border-cream/10 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-cream/40 block">Estimated Recurrence Total</span>
                  <span className="font-mono font-bold text-champagne text-base">£{scheduleTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => alert('Standing order line quantities updated successfully.')}
                  className="px-3.5 py-1.5 rounded-lg border border-cream/20 hover:border-champagne text-cream text-xs font-semibold"
                >
                  Edit Quantities
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
