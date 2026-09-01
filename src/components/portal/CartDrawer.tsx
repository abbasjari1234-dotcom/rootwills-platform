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
  CreditCard,
  Lock,
  Building2,
  UserCheck
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
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Check auth session
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const hasCookie = document.cookie.includes('rootwills_role=');
      setIsLoggedIn(hasCookie);
    }
  }, [isOpen]);

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
    if (!isLoggedIn) {
      return;
    }

    if (items.length === 0 || exceedsCredit) return;

    setIsSubmitting(true);
    try {
      // 1. Submit to Supabase database (or fallback)
      const dbResult = await submitPortalOrder({
        organizationId: currentOrg.id,
        organizationName: currentOrg.name,
        locationId: currentLocation?.id,
        locationName: currentLocation ? currentLocation.name : `${currentOrg.name} Primary Venue`,
        items: items.map((item) => ({
          productId: item.productId,
          sku: item.sku,
          name: item.name,
          packSize: item.packSize,
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
        className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-md transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-950 border-l border-emerald-900/60 text-cream flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          {/* Header */}
          <div className="p-5 border-b border-emerald-950 flex items-center justify-between bg-obsidian-900/90">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-cream">Your Order Basket</h2>
                <span className="text-[11px] text-emerald-400 font-mono">({items.length} lines &bull; Locked Rates)</span>
              </div>
            </div>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Close order basket"
              className="p-2 rounded-xl text-cream/60 hover:text-cream hover:bg-emerald-950/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Site Indicator & Live 11:00 PM Cutoff Banner */}
          <div className="bg-obsidian-900/50 border-b border-emerald-950 text-xs">
            <div className="px-5 py-2.5 flex justify-between items-center text-cream/70 border-b border-emerald-950/60">
              <span>Delivering to: <strong className="text-cream">{currentLocation?.name}</strong></span>
              <span className="text-champagne font-mono text-[11px] font-bold">{currentLocation?.postcode}</span>
            </div>
            {/* Cutoff countdown */}
            <div className="px-5 py-2 bg-emerald-950/60 flex items-center justify-between text-[11px] font-mono border-b border-emerald-900/40">
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
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-emerald-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-cream">Order Confirmed!</h3>
              <p className="text-xs text-cream/70 max-w-xs">
                Order <strong className="text-champagne font-mono font-bold">{orderSuccess.orderNumber}</strong> has been received by our Digbeth Wholesale Hub.
              </p>
              <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-emerald-900/60 text-xs text-left w-full space-y-2 font-mono shadow-lg">
                <div className="flex justify-between text-cream/70">
                  <span>Delivery Date:</span>
                  <span className="text-cream font-bold">{orderSuccess.deliveryDate}</span>
                </div>
                <div className="flex justify-between text-cream/70">
                  <span>Slot:</span>
                  <span className="text-champagne font-bold">{orderSuccess.deliverySlot}</span>
                </div>
                {orderSuccess.isStandingOrder && (
                  <div className="flex justify-between text-cream/70">
                    <span>Recurrence:</span>
                    <span className="text-champagne uppercase font-bold">{orderSuccess.recurrence || 'Weekly'}</span>
                  </div>
                )}
                <div className="flex justify-between text-cream/70 pt-1 border-t border-emerald-950">
                  <span>Total (inc. VAT):</span>
                  <span className="text-emerald-400 font-bold text-sm">£{orderSuccess.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2.5 w-full">
                <Link
                  href={`/orders/${orderSuccess.id}`}
                  onClick={closeCart}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs shadow-gold-glow flex items-center justify-center gap-1.5 hover:brightness-110"
                >
                  <span>Track Live Delivery Progress &rarr;</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOrderSuccess(null);
                    closeCart();
                  }}
                  className="py-2.5 text-xs text-cream/60 hover:text-cream font-mono"
                >
                  Close Drawer
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-cream/20 mx-auto" />
                    <div className="text-sm font-medium text-cream/60">Your basket is currently empty.</div>
                    <Link
                      href="/catalog"
                      onClick={closeCart}
                      className="inline-block text-xs text-champagne font-semibold hover:underline font-mono"
                    >
                      Browse Wholesale Catalog &rarr;
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.productId}
                      className="p-3.5 rounded-2xl bg-obsidian-900/80 border border-emerald-950/80 flex gap-3 items-center justify-between hover:border-emerald-800/60 transition-all shadow-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-mono text-champagne/80 truncate font-bold">{item.sku}</div>
                        <div className="text-xs font-bold text-cream truncate">{item.name}</div>
                        <div className="text-[11px] text-cream/50">{item.packSize} &bull; £{item.customerPrice.toFixed(2)} / {item.unit}</div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-emerald-900/60 rounded-xl bg-obsidian-950 p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQty(item.productId, item.qty - 1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="p-1 rounded-lg hover:bg-emerald-950 text-cream/70 hover:text-cream transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-champagne">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.productId, item.qty + 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="p-1 rounded-lg hover:bg-emerald-950 text-cream/70 hover:text-cream transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          aria-label={`Remove ${item.name} from basket`}
                          className="p-1.5 text-cream/30 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {/* Standing Order & Logistics Options */}
                {items.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-emerald-950 space-y-4">
                    {/* Delivery Slot Selection */}
                    <div>
                      <label htmlFor="delivery-slot-select" className="block text-[11px] font-mono uppercase text-cream/80 mb-1.5 font-bold">
                        Preferred Morning Window
                      </label>
                      <select
                        id="delivery-slot-select"
                        aria-label="Preferred morning delivery timeslot"
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        className="w-full bg-obsidian-900 border border-emerald-900/60 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne cursor-pointer"
                      >
                        <option value="Early Morning 05:30 - 07:30">Early Kitchen Keyslot (05:30 – 07:30 AM)</option>
                        <option value="Standard Morning 07:30 - 09:30">Standard Morning (07:30 – 09:30 AM)</option>
                        <option value="Mid-Day Emergency 11:00 - 13:00">Mid-Day Emergency Top-Up (11:00 – 13:00)</option>
                      </select>
                    </div>

                    {/* Standing Order Checkbox */}
                    <div className="p-3.5 bg-obsidian-900/90 rounded-2xl border border-emerald-900/60 space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Repeat className="w-4 h-4 text-champagne" />
                          <div>
                            <div className="text-xs font-bold text-cream">Recurring Standing Order</div>
                            <div className="text-[10px] text-cream/50">Auto-generate and deliver on set days</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={isStandingOrder}
                          onChange={(e) => setStandingOrder(e.target.checked)}
                          className="rounded border-emerald-900 text-champagne focus:ring-champagne bg-obsidian-950"
                        />
                      </label>

                      {isStandingOrder && (
                        <div className="pt-2 border-t border-emerald-950 space-y-2 animate-fade-in">
                          <div className="flex gap-2">
                            {['daily', 'weekly', 'biweekly'].map((rec) => (
                              <button
                                key={rec}
                                type="button"
                                onClick={() => setRecurrence(rec as any)}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-colors ${
                                  recurrence === rec
                                    ? 'bg-champagne text-obsidian-950'
                                    : 'bg-obsidian-950 text-cream/60 border border-emerald-900/40'
                                }`}
                              >
                                {rec}
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
                                    className={`flex-1 py-1 rounded-lg text-[10px] font-mono font-bold border transition-colors ${
                                      isSelected
                                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                        : 'bg-obsidian-950 text-cream/40 border-emerald-950 hover:text-cream'
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
                      <label className="block text-[11px] font-mono uppercase text-cream/70 mb-1 font-bold">
                        Driver Instructions / Notes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Leave crate in kitchen coldroom 1"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-obsidian-900 border border-emerald-900/60 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Summary & Checkout / Auth Panel */}
              {items.length > 0 && (
                <div className="p-5 border-t border-emerald-950 bg-obsidian-900/90 space-y-4">
                  
                  {/* If user has an account: show credit bar and total */}
                  {isLoggedIn ? (
                    <>
                      {/* Trade Credit Facility Progress Bar */}
                      <div className="p-3.5 bg-obsidian-950 rounded-2xl border border-emerald-900/60 space-y-2">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-cream/70 flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5 text-champagne" />
                            <span>30-Day Trade Credit Facility</span>
                          </span>
                          <span className="font-mono text-champagne font-bold">
                            £{availableCredit.toFixed(2)} available
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-obsidian-900 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              exceedsCredit
                                ? 'bg-rose-500'
                                : creditUsagePercent > 75
                                ? 'bg-amber-500'
                                : 'bg-emerald-400'
                            }`}
                            style={{ width: `${creditUsagePercent}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-cream/50 font-mono">
                          <span>Limit: £{currentOrg.creditLimit.toLocaleString()}</span>
                          <span>Used: £{(currentOrg.creditUsed + grandTotal).toFixed(2)}</span>
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
                        <div className="flex justify-between text-sm font-bold text-cream pt-2 border-t border-emerald-950">
                          <span>Order Total:</span>
                          <span className="font-mono text-champagne text-base font-bold">£{grandTotal.toFixed(2)}</span>
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
                            ? 'bg-obsidian-800 text-cream/40 cursor-not-allowed border border-emerald-950'
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
                    </>
                  ) : (
                    /* Customer NOT Logged In: Enforce Account Creation */
                    <div className="space-y-3">
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between text-cream/70">
                          <span>Estimated Total:</span>
                          <span className="font-mono text-champagne text-base font-bold">£{grandTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-950/80 border border-champagne/40 space-y-3 text-center">
                        <div className="flex items-center justify-center gap-2 text-champagne text-xs font-mono font-bold uppercase">
                          <Lock className="w-4 h-4" />
                          <span>Trade Account Required to Order</span>
                        </div>
                        <p className="text-xs text-cream/80 font-sans leading-relaxed">
                          Rootwills is a dedicated B2B supplier. You must have an approved business account to confirm orders and receive 06:00 AM delivery.
                        </p>
                        
                        <div className="grid grid-cols-1 gap-2 pt-1">
                          <Link
                            href="/onboarding"
                            onClick={closeCart}
                            className="py-3 px-4 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs shadow-gold-glow flex items-center justify-center gap-1.5 hover:brightness-110 transition-all"
                          >
                            <span>Open Trade Account (Instant Application)</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          
                          <Link
                            href="/login"
                            onClick={closeCart}
                            className="py-2.5 px-4 rounded-xl bg-obsidian-900 border border-emerald-800/80 text-cream font-bold text-xs flex items-center justify-center hover:border-champagne transition-all"
                          >
                            <span>Sign In to Existing Account</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
