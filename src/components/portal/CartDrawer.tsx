'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cart-store';
import { useDemoStore } from '@/lib/store/demo-store';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Calendar,
  Clock,
  Repeat,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Zap,
  CreditCard
} from 'lucide-react';
import Link from 'next/link';
import { submitPortalOrder } from '@/actions/orders';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    updateQty,
    removeItem,
    clearCart,
    isStandingOrder,
    setStandingOrder,
    recurrence,
    setRecurrence,
    recurrenceDays,
    setRecurrenceDays,
    deliverySlot,
    setDeliverySlot,
    notes,
    setNotes
  } = useCartStore();

  const {
    currentOrgId,
    organizations,
    currentLocationId,
    placeOrder
  } = useDemoStore();

  const [selectedSlot, setSelectedSlot] = useState('Early Morning 05:30 - 07:30');
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState('Tomorrow Morning');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  // 11:00 PM Cutoff Live Countdown
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number }>({ hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateCutoff = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(23, 0, 0, 0); // 11:00 PM

      if (now > cutoff) {
        cutoff.setDate(cutoff.getDate() + 1);
      }

      const diffMs = cutoff.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft({ hours, minutes });
    };

    calculateCutoff();
    const interval = setInterval(calculateCutoff, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];
  const currentLocation = currentOrg?.locations.find((l) => l.id === currentLocationId) || currentOrg?.locations[0];

  const subtotal = items.reduce((sum, item) => sum + item.customerPrice * item.qty, 0);
  const vatTotal = subtotal * 0.05; // blended VAT for fresh/processed items
  const grandTotal = subtotal + vatTotal;

  const availableCredit = Math.max(0, currentOrg.creditLimit - currentOrg.creditUsed);
  const creditUsagePercent = currentOrg.creditLimit > 0
    ? Math.min(100, Math.round(((currentOrg.creditUsed + grandTotal) / currentOrg.creditLimit) * 100))
    : 0;
  const exceedsCredit = grandTotal > availableCredit && currentOrg.creditLimit > 0;

  const toggleRecurrenceDay = (day: string) => {
    if (recurrenceDays.includes(day)) {
      if (recurrenceDays.length > 1) {
        setRecurrenceDays(recurrenceDays.filter((d) => d !== day));
      }
    } else {
      setRecurrenceDays([...recurrenceDays, day]);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0 || exceedsCredit) return;

    setIsSubmitting(true);
    try {
      // 1. Submit to Supabase database (or fallback)
      const dbResult = await submitPortalOrder({
        organizationId: currentOrg.id,
        locationId: currentLocation?.id,
        items: items.map((item) => ({
          productId: item.productId,
          sku: item.sku,
          name: item.name,
          qty: item.qty,
          unitPrice: item.customerPrice,
        })),
        subtotal: Number(subtotal.toFixed(2)),
        vatTotal: Number(vatTotal.toFixed(2)),
        total: Number(grandTotal.toFixed(2)),
        deliveryDate: selectedDeliveryDate,
        deliverySlot: selectedSlot,
        notes: notes || currentLocation?.deliveryInstructions || 'Deliver to kitchen inwards door.',
      });

      // 2. Update local state store
      const newOrder = placeOrder({
        organizationId: currentOrg.id,
        organizationName: currentOrg.name,
        locationId: currentLocation?.id,
        locationName: currentLocation ? `${currentLocation.name}` : `${currentOrg.name} Primary Site`,
        status: 'received',
        deliveryDate: selectedDeliveryDate,
        deliverySlot: selectedSlot,
        deliveryNotes: notes || currentLocation?.deliveryInstructions || 'Deliver to kitchen inwards door.',
        subtotal: Number(subtotal.toFixed(2)),
        vatTotal: Number(vatTotal.toFixed(2)),
        total: Number(grandTotal.toFixed(2)),
        isStandingOrder,
        recurrence: isStandingOrder ? recurrence : null,
        items: items.map((item) => ({
          productId: item.productId,
          sku: item.sku,
          name: item.name,
          packSize: item.packSize,
          qty: item.qty,
          unitPrice: item.customerPrice,
          totalPrice: Number((item.customerPrice * item.qty).toFixed(2)),
        })),
      });

      if (dbResult?.orderNumber) {
        newOrder.orderNumber = dbResult.orderNumber;
      }

      setIsSubmitting(false);
      setOrderSuccess(newOrder);
      clearCart();
    } catch (err) {
      console.error('Checkout error:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-900 border-l border-cream/15 text-cream flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-cream/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-champagne" />
              <h2 className="font-display text-lg font-bold text-cream">Your Order Basket</h2>
              <span className="text-xs text-cream/50">({items.length} lines)</span>
            </div>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Close order basket"
              className="p-1.5 rounded-lg text-cream/60 hover:text-cream hover:bg-obsidian-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Site Indicator & Live 11:00 PM Cutoff Banner */}
          <div className="bg-obsidian-950 border-b border-cream/10 text-xs">
            <div className="px-5 py-2 flex justify-between items-center text-cream/70 border-b border-cream/5">
              <span>Delivering to: <strong className="text-cream">{currentLocation?.name}</strong></span>
              <span className="text-champagne font-mono text-[11px]">{currentLocation?.postcode}</span>
            </div>
            {/* Cutoff countdown */}
            <div className="px-5 py-1.5 bg-emerald-500/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>11:00 PM Cutoff:</span>
              </span>
              <span className="text-emerald-300">
                Order within <strong>{timeLeft.hours}h {timeLeft.minutes}m</strong> for 06:00 AM delivery
              </span>
            </div>
          </div>

          {/* Order Success State */}
          {orderSuccess ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-cream">Order Confirmed!</h3>
              <p className="text-xs text-cream/70 max-w-xs">
                Order <strong className="text-champagne font-mono font-bold">{orderSuccess.orderNumber}</strong> has been received by our Birmingham depot.
              </p>
              <div className="p-4 rounded-xl bg-obsidian-950 border border-cream/10 text-xs text-left w-full space-y-1.5 font-mono">
                <div className="flex justify-between text-cream/70">
                  <span>Delivery Date:</span>
                  <span className="text-cream">{orderSuccess.deliveryDate}</span>
                </div>
                <div className="flex justify-between text-cream/70">
                  <span>Slot:</span>
                  <span className="text-champagne">{orderSuccess.deliverySlot}</span>
                </div>
                {orderSuccess.isStandingOrder && (
                  <div className="flex justify-between text-cream/70">
                    <span>Recurrence:</span>
                    <span className="text-champagne uppercase font-bold">{orderSuccess.recurrence || 'Weekly'}</span>
                  </div>
                )}
                <div className="flex justify-between text-cream/70">
                  <span>Total (inc. VAT):</span>
                  <span className="text-emerald-400 font-bold">£{orderSuccess.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2 w-full">
                <Link
                  href={`/orders/${orderSuccess.id}`}
                  onClick={closeCart}
                  className="w-full py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow flex items-center justify-center gap-1.5"
                >
                  <span>Track Live Delivery Progress &rarr;</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOrderSuccess(null);
                    closeCart();
                  }}
                  className="py-2 text-xs text-cream/60 hover:text-cream"
                >
                  Close Drawer
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-cream/20 mx-auto" />
                    <div className="text-sm font-medium text-cream/60">Your basket is currently empty.</div>
                    <Link
                      href="/catalog"
                      onClick={closeCart}
                      className="inline-block text-xs text-champagne font-semibold hover:underline"
                    >
                      Browse Wholesale Catalog &rarr;
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.productId}
                      className="p-3.5 rounded-xl bg-obsidian-950 border border-cream/10 flex gap-3 items-center justify-between"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-mono text-champagne/80 truncate">{item.sku}</div>
                        <div className="text-xs font-bold text-cream truncate">{item.name}</div>
                        <div className="text-[11px] text-cream/50">{item.packSize} &bull; £{item.customerPrice.toFixed(2)} / {item.unit}</div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-cream/20 rounded-lg bg-obsidian-900">
                          <button
                            type="button"
                            onClick={() => updateQty(item.productId, item.qty - 1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="p-1 text-cream/70 hover:text-cream"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-cream">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.productId, item.qty + 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="p-1 text-cream/70 hover:text-cream"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right min-w-[50px]">
                          <span className="text-xs font-bold font-mono text-cream">
                            £{(item.customerPrice * item.qty).toFixed(2)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          aria-label={`Remove ${item.name} from basket`}
                          className="p-1 text-cream/30 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {/* Delivery Slot & Standing Order Configuration */}
                {items.length > 0 && (
                  <div className="pt-4 border-t border-cream/10 space-y-4">
                    {/* Delivery Slot Picker */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-cream/70 mb-1.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-champagne" />
                        <span>Select Delivery Window</span>
                      </label>
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        className="w-full bg-obsidian-950 border border-cream/20 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                      >
                        <option>Early Morning 05:30 - 07:30 (Keyholder / Walk-in)</option>
                        <option>Standard Morning 07:30 - 09:30</option>
                        <option>Midday Top-up 11:30 - 13:00</option>
                      </select>
                    </div>

                    {/* Standing Order Toggle & Cadence Scheduler */}
                    <div className="p-3.5 bg-obsidian-950/80 rounded-xl border border-cream/15 space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-xs font-bold text-cream flex items-center gap-1.5">
                          <Repeat className="w-3.5 h-3.5 text-champagne" />
                          <span>Make this a Recurring Standing Order</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={isStandingOrder}
                          onChange={(e) => setStandingOrder(e.target.checked)}
                          className="w-4 h-4 accent-champagne cursor-pointer"
                        />
                      </label>

                      {isStandingOrder && (
                        <div className="space-y-2.5 pt-1 border-t border-cream/10">
                          <div className="grid grid-cols-4 gap-1.5">
                            {[
                              { key: 'daily', label: 'Daily' },
                              { key: 'mon_wed_fri', label: 'M/W/F' },
                              { key: 'weekly', label: 'Weekly' },
                              { key: 'fortnightly', label: 'Fortnightly' },
                            ].map((r) => (
                              <button
                                key={r.key}
                                type="button"
                                onClick={() => setRecurrence(r.key as any)}
                                className={`py-1 text-[10px] font-mono rounded capitalize border transition-colors ${
                                  recurrence === r.key
                                    ? 'bg-champagne text-obsidian-950 font-bold border-champagne'
                                    : 'bg-obsidian-900 text-cream/60 border-cream/10 hover:border-cream/30'
                                }`}
                              >
                                {r.label}
                              </button>
                            ))}
                          </div>

                          {/* Day selector checkboxes */}
                          <div>
                            <span className="text-[10px] uppercase font-mono text-cream/50 block mb-1">
                              Repeat on Days:
                            </span>
                            <div className="flex gap-1.5">
                              {DAYS_OF_WEEK.map((day) => {
                                const isSelected = recurrenceDays.includes(day);
                                return (
                                  <button
                                    key={day}
                                    type="button"
                                    onClick={() => toggleRecurrenceDay(day)}
                                    className={`flex-1 py-1 rounded text-[10px] font-mono font-bold border transition-colors ${
                                      isSelected
                                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                        : 'bg-obsidian-900 text-cream/40 border-cream/10 hover:text-cream'
                                    }`}
                                  >
                                    {day}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Driver Notes */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-cream/70 mb-1">
                        Driver Instructions / Notes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Leave crate in kitchen coldroom 1"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-obsidian-950 border border-cream/20 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Summary & Checkout Button */}
              {items.length > 0 && (
                <div className="p-5 border-t border-cream/10 bg-obsidian-950 space-y-4">
                  {/* Trade Credit Facility Progress Bar */}
                  <div className="p-3 bg-obsidian-900/90 rounded-xl border border-cream/10 space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-cream/70 flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5 text-champagne" />
                        <span>30-Day Trade Credit Facility</span>
                      </span>
                      <span className="font-mono text-champagne font-bold">
                        £{availableCredit.toFixed(2)} available
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-obsidian-950 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          exceedsCredit
                            ? 'bg-rose-500'
                            : creditUsagePercent > 75
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${creditUsagePercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-cream/50 font-mono">
                      <span>Limit: £{currentOrg.creditLimit.toLocaleString()}</span>
                      <span>Used (inc. order): £{(currentOrg.creditUsed + grandTotal).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-cream/70">
                      <span>Goods Subtotal:</span>
                      <span className="font-mono text-cream">£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-cream/70">
                      <span>Estimated VAT:</span>
                      <span className="font-mono text-cream">£{vatTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-cream pt-2 border-t border-cream/10">
                      <span>Order Total:</span>
                      <span className="font-mono text-champagne text-base">£{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Credit limit warning if exceeded */}
                  {exceedsCredit && (
                    <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-rose-300 text-[11px] flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        This order exceeds your available trade credit balance (£{availableCredit.toFixed(2)} remaining). Please contact accounts to authorize or adjust quantities.
                      </span>
                    </div>
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={isSubmitting || exceedsCredit}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-gold-glow transition-all ${
                      exceedsCredit
                        ? 'bg-obsidian-800 text-cream/40 cursor-not-allowed border border-cream/10'
                        : 'bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 hover:brightness-110'
                    }`}
                  >
                    {isSubmitting ? (
                      <span>Placing Order at Birmingham Hub...</span>
                    ) : (
                      <>
                        <span>Confirm & Place Order ({isStandingOrder ? 'Standing Schedule' : 'Morning Drop'})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
