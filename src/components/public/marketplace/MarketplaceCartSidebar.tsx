'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Truck, 
  Clock, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Lock,
  X,
  Building2
} from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

const FREE_DELIVERY_THRESHOLD = 150.0;
const STANDARD_DELIVERY_FEE = 12.5;

export function MarketplaceCartSidebar() {
  const { items, updateQty, removeItem, clearCart, isOpen, closeCart } = useCartStore();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.customerPrice * item.qty, 0);
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;
  const vatTotal = subtotal * 0.05; // 5% blended food & packaging VAT
  const grandTotal = subtotal + deliveryFee + vatTotal;

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  const amountToFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  // Common Cart Body Content used by both Desktop Sidebar and Mobile Drawer
  const renderCartContent = (isMobile = false) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-sans font-bold text-slate-900">Your Basket</h3>
            <span className="text-[11px] text-slate-500 font-mono">
              {items.length} {items.length === 1 ? 'line item' : 'line items'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-[11px] font-sans font-semibold text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-slate-50"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
          {isMobile && (
            <button
              type="button"
              onClick={closeCart}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
              aria-label="Close basket"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Delivery Progress Threshold Meter */}
      <div className="py-3 border-b border-slate-100 space-y-2">
        <div className="bg-emerald-50/80 rounded-xl p-2.5 flex items-center gap-2 border border-emerald-100">
          <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="text-[11px] font-sans">
            <span className="font-bold text-emerald-900 block">Standard Morning Drop</span>
            <span className="text-emerald-700">05:30 - 07:30 AM Tomorrow</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-[11px] font-sans mb-1">
            <span className="text-slate-600">
              {isFreeDelivery ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> You qualified for free delivery!
                </span>
              ) : (
                <span>
                  Add <strong className="text-emerald-700 font-mono">£{amountToFree.toFixed(2)}</strong> for free delivery
                </span>
              )}
            </span>
            <span className="font-mono text-slate-400 text-[10px]">{progressPercent}%</span>
          </div>

          {/* Progress Track */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Cart Item Lines List (Scrollable Area) */}
      <div className="flex-1 overflow-y-auto py-2 space-y-2.5 my-1 custom-scroll min-h-[140px] max-h-[340px]">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
            </div>
            <p className="text-xs font-sans font-medium text-slate-600">
              Your wholesale basket is empty
            </p>
            <p className="text-[11px] text-slate-400 max-w-[180px]">
              Click + on any product line to start tomorrow&apos;s drop list.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all text-xs"
            >
              <div className="min-w-0 flex-1">
                <h4 className="font-sans font-bold text-slate-800 truncate text-xs leading-snug">
                  {item.name}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                  <span>{item.unit}</span>
                  <span>&bull;</span>
                  <span className="font-mono font-semibold text-slate-700">
                    £{(item.customerPrice * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Counter Stepper */}
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shrink-0 shadow-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (item.qty <= 1) {
                      removeItem(item.productId);
                    } else {
                      updateQty(item.productId, item.qty - 1);
                    }
                  }}
                  className="w-5 h-5 rounded flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                  aria-label="Decrease quantity"
                >
                  {item.qty <= 1 ? <Trash2 className="w-2.5 h-2.5 text-rose-500" /> : <Minus className="w-2.5 h-2.5" />}
                </button>

                <span className="font-mono text-xs font-bold text-slate-800 w-5 text-center">
                  {item.qty}
                </span>

                <button
                  type="button"
                  onClick={() => updateQty(item.productId, item.qty + 1)}
                  className="w-5 h-5 rounded flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pricing & VAT Summary Breakdown */}
      <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs font-sans">
        <div className="flex justify-between text-slate-500 text-[11px]">
          <span>Wholesale Subtotal</span>
          <span className="font-mono text-slate-800 font-semibold">£{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-slate-500 text-[11px]">
          <span>Refrigerated Delivery</span>
          <span className="font-mono">
            {isFreeDelivery ? (
              <span className="text-emerald-700 font-bold">FREE</span>
            ) : (
              <span className="text-slate-800 font-semibold">£{deliveryFee.toFixed(2)}</span>
            )}
          </span>
        </div>

        <div className="flex justify-between text-slate-500 text-[11px]">
          <span>Est. VAT (5% Food Grade)</span>
          <span className="font-mono text-slate-800 font-semibold">£{vatTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between pt-1.5 border-t border-slate-100 text-slate-900 font-bold text-sm">
          <span>Estimated Total</span>
          <span className="font-mono text-emerald-800 font-extrabold text-base">
            £{grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Dispatch & Checkout Action Button */}
      <div className="pt-3">
        {items.length === 0 ? (
          <button
            disabled
            className="w-full py-3 rounded-xl bg-slate-100 text-slate-400 font-sans font-bold text-xs cursor-not-allowed text-center"
          >
            Add items to checkout
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCheckoutModalOpen(true)}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs shadow-md transition-all flex items-center justify-between group active:scale-[0.98]"
          >
            <span>Review &amp; Dispatch Order</span>
            <div className="flex items-center gap-1.5 font-mono">
              <span>£{grandTotal.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        )}
      </div>

      {/* Security & Commercial SLA Note */}
      <div className="pt-2 text-center text-[10.5px] text-slate-400 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>HACCP Certified &bull; Invoiced On 30-Day Terms</span>
      </div>
    </div>
  );

  return (
    <>
      {/* ─── 1. Desktop Sticky Right Sidebar (>= xl) ─── */}
      <aside className="w-80 2xl:w-88 shrink-0 hidden xl:block">
        <div className="sticky top-28 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col max-h-[calc(100vh-8rem)]">
          {renderCartContent(false)}
        </div>
      </aside>

      {/* ─── 2. Mobile Responsive Slide-Over Drawer (< xl) ─── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 xl:hidden animate-fade-in">
          {/* Backdrop */}
          <div
            onClick={closeCart}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-in Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white p-5 sm:p-6 flex flex-col shadow-2xl border-l border-slate-200 animate-slide-left">
              {renderCartContent(true)}
            </div>
          </div>
        </div>
      )}

      {/* ─── 3. Checkout Transition Modal (Universal) ─── */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 relative">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Commercial Order Dispatch</span>
              </div>
              <h3 className="text-xl font-sans font-extrabold text-slate-900 tracking-tight">
                Review &amp; Dispatch Order
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Review your {items.length} wholesale line items before routing to your kitchen trade account.
              </p>
            </div>

            {/* Scrollable Mini Line Items Preview */}
            <div className="max-h-44 overflow-y-auto space-y-2 pr-1 custom-scroll border-y border-slate-100 py-3">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-9 h-9 rounded-lg object-cover bg-slate-100 border border-slate-200/80 shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-sans font-bold text-slate-900 truncate max-w-[180px] sm:max-w-[240px]">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {item.unit} &bull; £{item.customerPrice.toFixed(2)}/unit
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-slate-900">
                      {item.qty} &times; £{(item.customerPrice * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Logistics & SLA Breakdown Card */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Delivery Window:</span>
                </span>
                <span className="font-bold text-slate-900">Tomorrow 05:30 - 07:30 AM</span>
              </div>

              <div className="flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-1.5 font-medium">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Depot Network:</span>
                </span>
                <span className="font-semibold text-slate-800">Midlands &amp; London Fleet</span>
              </div>

              <div className="flex items-center justify-between text-slate-700 pt-1 border-t border-slate-200/60">
                <span className="font-medium text-slate-600">Subtotal</span>
                <span className="font-mono font-semibold text-slate-900">£{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-700">
                <span className="font-medium text-slate-600">Refrigerated Logistics</span>
                <span className="font-mono font-semibold text-slate-900">
                  {isFreeDelivery ? 'FREE (£150+ Order)' : `£${STANDARD_DELIVERY_FEE.toFixed(2)}`}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-700">
                <span className="font-medium text-slate-600">Estimated VAT (5%)</span>
                <span className="font-mono font-semibold text-slate-900">£{vatTotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/80 font-bold text-slate-900">
                <span className="text-sm">Order Total</span>
                <span className="font-mono text-base text-emerald-800">£{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Commercial Action Pathways */}
            <div className="space-y-2.5 pt-1">
              <Link
                href={`/login?checkout=true&total=${grandTotal.toFixed(2)}&items=${items.length}`}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-sans font-bold text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Existing Customer: Log In to Charge Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={`/apply?checkout=true&total=${grandTotal.toFixed(2)}&items=${items.length}`}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-emerald-500 text-slate-800 text-xs sm:text-sm font-sans font-semibold text-center transition-all flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>New Customer: Open Instant 30-Day Trade Account</span>
              </Link>
            </div>

            {/* Footer Notice */}
            <div className="text-center pt-1">
              <p className="text-[11px] text-slate-400 font-sans">
                Invoiced on 30-Day Trade Terms (EOM + 30). No upfront consumer card charges.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
