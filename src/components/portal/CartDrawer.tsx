'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cart-store';
import { useAppStore } from '@/store/app-store';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Clock,
  Repeat,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  RotateCcw,
  Truck
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
    notes,
    setNotes
  } = useCartStore();

  const {
    currentOrgId,
    organizations,
    currentLocationId,
    placeOrder
  } = useAppStore();

  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('Early Morning 05:30 - 07:30');
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState('Tomorrow Morning');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 11:00 PM Cutoff Countdown
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

  if (!mounted) return null;
  // Dedicated marketplace page uses its own inline cart drawer
  if (pathname === '/products') return null;

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0] || {
    id: 'org-default',
    name: 'Commercial Client',
    creditLimit: 25000,
    creditUsed: 4200,
    locations: [{ id: 'loc-1', name: 'Main Kitchen', postcode: 'B1 1AA', deliveryInstructions: '' }]
  };
  const currentLocation = currentOrg?.locations?.find((l) => l.id === currentLocationId) || currentOrg?.locations?.[0];

  const subtotal = items.reduce((sum, item) => sum + item.customerPrice * item.qty, 0);
  const vatTotal = subtotal * 0.05; // 5% blended food & packaging VAT
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
      // 1. Submit order action
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
        notes: notes || currentLocation?.deliveryInstructions || 'Deliver to kitchen inwards goods coldroom.',
      });

      // 2. Update local state store
      const newOrder = placeOrder({
        orderNumber: dbResult?.orderNumber,
        organizationId: currentOrg.id,
        organizationName: currentOrg.name,
        locationId: currentLocation?.id,
        locationName: currentLocation ? `${currentLocation.name}` : `${currentOrg.name} Primary Site`,
        status: 'received',
        deliveryDate: selectedDeliveryDate,
        deliverySlot: selectedSlot,
        deliveryNotes: notes || currentLocation?.deliveryInstructions || 'Deliver to kitchen inwards goods coldroom.',
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10 pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 flex flex-col shadow-2xl pointer-events-auto"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-sans text-lg font-bold text-slate-900 tracking-tight">Trade Order Basket</h2>
                    <span className="text-[11px] text-emerald-800 font-mono font-semibold">
                      {items.length} {items.length === 1 ? 'line item' : 'line items'} &bull; Locked Contract Rates
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      title="Clear basket"
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50 transition-colors"
                      aria-label="Clear basket"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={closeCart}
                    aria-label="Close basket"
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Delivery Site & Cutoff Info Bar */}
              <div className="bg-slate-50 border-b border-slate-200 text-xs">
                <div className="px-5 py-2.5 flex justify-between items-center text-slate-600 border-b border-slate-100">
                  <span className="truncate">Destination: <strong className="text-slate-900">{currentLocation?.name}</strong></span>
                  <span className="text-emerald-800 font-mono text-[11px] font-bold shrink-0 ml-2">{currentLocation?.postcode}</span>
                </div>
                <div className="px-5 py-2 bg-emerald-50/60 flex items-center justify-between text-[11px] font-mono text-emerald-900">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Order Cut-off:</span>
                  </span>
                  <span>
                    Order within <strong>{timeLeft.hours}h {timeLeft.minutes}m</strong> for 06:00 AM drop
                  </span>
                </div>
              </div>

              {/* Order Success State */}
              {orderSuccess ? (
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-sans text-2xl font-bold text-slate-900">Order Confirmed</h3>
                  <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                    Order <strong className="text-emerald-800 font-mono font-bold">{orderSuccess.orderNumber}</strong> has been sent to our Birmingham Central Hub picking queue.
                  </p>
                  
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left w-full space-y-2 font-mono shadow-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Scheduled Delivery:</span>
                      <span className="text-slate-900 font-bold">{orderSuccess.deliveryDate}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Window:</span>
                      <span className="text-slate-900 font-bold">{orderSuccess.deliverySlot}</span>
                    </div>
                    {orderSuccess.isStandingOrder && (
                      <div className="flex justify-between text-slate-600">
                        <span>Recurrence:</span>
                        <span className="text-emerald-800 uppercase font-bold">{orderSuccess.recurrence || 'Weekly'}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600 pt-1.5 border-t border-slate-200">
                      <span>Total (inc. VAT):</span>
                      <span className="text-emerald-800 font-bold text-sm">£{orderSuccess.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col gap-2.5 w-full">
                    <Link
                      href={`/orders/${orderSuccess.id}`}
                      onClick={closeCart}
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Truck className="w-4 h-4" />
                      <span>View Order &amp; Delivery Tracking &rarr;</span>
                    </Link>
                    <Link
                      href="/catalog"
                      onClick={() => {
                        setOrderSuccess(null);
                        closeCart();
                      }}
                      className="py-2.5 text-center text-xs text-slate-600 hover:text-slate-900 font-mono transition-colors font-medium"
                    >
                      Continue Purchasing in Catalog
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scroll">
                    {items.length === 0 ? (
                      <div className="text-center py-16 space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">Your trade basket is empty</div>
                          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                            Add fresh produce, artisan dairy, or bakery lines from your wholesale catalog.
                          </p>
                        </div>
                        <Link
                          href="/catalog"
                          onClick={closeCart}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all"
                        >
                          <span>Browse Wholesale Catalog</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    ) : (
                      items.map((item) => (
                        <div
                          key={item.productId}
                          className="p-3.5 rounded-2xl bg-white border border-slate-200 flex gap-3 items-center justify-between hover:border-slate-300 transition-all shadow-xs"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-emerald-800 truncate font-bold px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                                {item.sku}
                              </span>
                            </div>
                            <div className="text-xs font-bold text-slate-900 truncate mt-1">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <span>{item.packSize}</span>
                              <span>&bull;</span>
                              <span>£{item.customerPrice.toFixed(2)} / {item.unit}</span>
                              <span className="text-emerald-800 font-mono font-bold ml-1">
                                = £{(item.customerPrice * item.qty).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Quantity Stepper */}
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5 shadow-2xs">
                              <button
                                type="button"
                                onClick={() => updateQty(item.productId, item.qty - 1)}
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="p-1 rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-mono font-bold text-slate-900 min-w-[24px] text-center">
                                {item.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQty(item.productId, item.qty + 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                                className="p-1 rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.productId)}
                              aria-label={`Remove ${item.name} from basket`}
                              className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}

                    {/* Standing Order & Logistics Options */}
                    {items.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-slate-200 space-y-4">
                        {/* Delivery Window Selection */}
                        <div>
                          <label htmlFor="delivery-slot-select" className="block text-[11px] font-mono uppercase text-slate-700 mb-1.5 font-bold tracking-wider">
                            Morning Delivery Window
                          </label>
                          <select
                            id="delivery-slot-select"
                            aria-label="Preferred morning delivery timeslot"
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                          >
                            <option value="Early Morning 05:30 - 07:30">Early Kitchen Keyslot (05:30 – 07:30 AM)</option>
                            <option value="Standard Morning 07:30 - 09:30">Standard Morning (07:30 – 09:30 AM)</option>
                            <option value="Mid-Day Emergency 11:00 - 13:00">Mid-Day Emergency Top-Up (11:00 – 13:00)</option>
                          </select>
                        </div>

                        {/* Standing Order Schedule Toggle */}
                        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                          <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-2.5">
                              <Repeat className="w-4 h-4 text-emerald-700" />
                              <div>
                                <div className="text-xs font-bold text-slate-900">Standing Repeat Schedule</div>
                                <div className="text-[10px] text-slate-500">Auto-dispatch crates on recurring schedule</div>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={isStandingOrder}
                              onChange={(e) => setStandingOrder(e.target.checked)}
                              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                            />
                          </label>

                          {isStandingOrder && (
                            <div className="pt-2 border-t border-slate-200 space-y-2 animate-fade-in">
                              <div className="flex gap-2">
                                {['daily', 'weekly', 'biweekly'].map((rec) => (
                                  <button
                                    key={rec}
                                    type="button"
                                    onClick={() => setRecurrence(rec as any)}
                                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-colors ${
                                      recurrence === rec
                                        ? 'bg-emerald-600 text-white shadow-xs'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
                                    }`}
                                  >
                                    {rec}
                                  </button>
                                ))}
                              </div>

                              <div>
                                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">
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
                                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                            : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
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

                        {/* Driver Key Drop Instructions */}
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-slate-700 mb-1.5 font-bold tracking-wider">
                            Driver Notes &amp; Kitchen Key Drop Instructions
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Inwards goods bay door code or refrigeration instructions"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Order Summary & Direct B2B Checkout */}
                  {items.length > 0 && (
                    <div className="p-5 border-t border-slate-200 bg-white space-y-4 shadow-lg">
                      
                      {/* Trade Credit Facility Progress Bar */}
                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-700 flex items-center gap-1.5 font-sans font-medium">
                            <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Trade Credit Account</span>
                          </span>
                          <span className="font-mono text-emerald-800 font-bold">
                            £{availableCredit.toFixed(2)} available
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
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
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                          <span>Facility: £{currentOrg.creditLimit.toLocaleString()}</span>
                          <span>Committed: £{(currentOrg.creditUsed + grandTotal).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Line Breakdown */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span>Produce &amp; Goods Subtotal:</span>
                          <span className="font-mono text-slate-900 font-semibold">£{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Blended VAT (5%):</span>
                          <span className="font-mono text-slate-900 font-semibold">£{vatTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                          <span>Order Total (inc. VAT):</span>
                          <span className="font-mono text-emerald-800 text-base font-bold">£{grandTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Credit Limit Alert */}
                      {exceedsCredit && (
                        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-[11px] flex items-start gap-2">
                          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                          <span>
                            This order exceeds your trade credit balance (£{availableCredit.toFixed(2)} remaining). Contact accounts to authorize or adjust items.
                          </span>
                        </div>
                      )}

                      {/* Direct B2B Confirmation Button */}
                      <button
                        onClick={handleCheckout}
                        disabled={isSubmitting || exceedsCredit}
                        className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all ${
                          exceedsCredit
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-[0.99]'
                        }`}
                      >
                        {isSubmitting ? (
                          <span>Submitting Order to Hub Picking Queue...</span>
                        ) : (
                          <>
                            <span>Confirm &amp; Place Order ({isStandingOrder ? 'Standing Schedule' : 'Morning Drop'})</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
