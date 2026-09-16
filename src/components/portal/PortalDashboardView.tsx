'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/store/app-store';
import { useCartStore } from '@/store/cart-store';
import { 
  Repeat, 
  ShoppingBag, 
  Clock, 
  Truck, 
  TrendingUp, 
  Star, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Phone,
  ThermometerSnowflake,
  MapPin,
  Activity
} from 'lucide-react';
import { QuickReorderModal } from '@/components/portal/QuickReorderModal';
import { OrderStatusBadge } from '@/components/portal/OrderStatusBadge';

export function PortalDashboardView() {
  const { 
    currentOrgId, 
    organizations, 
    currentLocationId, 
    orders, 
    invoices, 
    getCustomerProducts, 
    toggleFavorite 
  } = useAppStore();
  const { addItem, openCart } = useCartStore();

  const [reorderModalOrder, setReorderModalOrder] = useState<any>(null);

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0] || {
    id: 'org-default',
    name: 'Commercial Client',
    sector: 'hospitality',
    paymentTerms: '30-Day EOM',
    creditLimit: 25000,
    creditUsed: 4200,
    creditTier: 'Standard',
    assignedSalesRep: 'Marcus Vance',
    locations: [{ id: 'loc-1', name: 'Main Kitchen', postcode: 'B1 1AA' }]
  };
  const currentLocation = currentOrg?.locations?.find((l) => l.id === currentLocationId) || currentOrg?.locations?.[0];

  const orgOrders = orders.filter((o) => o.organizationId === currentOrg.id);
  const lastOrder = orgOrders[0];

  const orgInvoices = invoices.filter((inv) => inv.organizationId === currentOrg.id);
  const openInvoices = orgInvoices.filter((inv) => inv.status === 'open');

  const products = getCustomerProducts();
  const favoriteProducts = products.filter((p) => p.isFavorite);

  const availableCredit = Math.max(0, currentOrg.creditLimit - currentOrg.creditUsed);
  const creditUsagePercent = Math.min(100, Math.round((currentOrg.creditUsed / currentOrg.creditLimit) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* ─── 1. Welcome & Operational Status Header ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono uppercase font-bold tracking-wider">
              {currentOrg.sector?.replace('_', ' ') || 'Commercial Trade'} &bull; {currentOrg.paymentTerms}
            </span>
            <span className="text-xs text-slate-400 font-mono">Account #{currentOrg.id.toUpperCase()}</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            Commercial Kitchen Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Welcome back, <span className="text-slate-900 font-semibold">{currentOrg.name}</span> &bull; Delivering to: <strong className="text-slate-900">{currentLocation?.name}</strong> ({currentLocation?.postcode})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/catalog"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Catalog</span>
          </Link>
          <Link
            href="/quick-order"
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <Clock className="w-4 h-4 text-emerald-700" />
            <span>Speed Order Sheet</span>
          </Link>
        </div>
      </div>

      {/* ─── 2. Live Telemetry & Active Cold-Chain Fleet Status ─── */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl relative overflow-hidden border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-8 space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>Live Fleet Telemetry: Active Morning Route</span>
            </div>
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-slate-900">
              Birmingham Central Hub &bull; Van #04 Dispatched
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              Next delivery window scheduled for <strong className="text-slate-900">tomorrow 06:00 AM – 07:30 AM</strong> at {currentLocation?.name}. Dual-temperature chamber pre-cooled and locked.
            </p>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-semibold">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chilled Chamber</span>
              </div>
              <div className="text-emerald-700 font-bold text-base mt-1">+2.2°C</div>
              <div className="text-[10px] text-emerald-800 font-semibold">✓ BRCGS Grade A</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-semibold">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>Delivery SLA</span>
              </div>
              <div className="text-slate-900 font-bold text-base mt-1">99.8%</div>
              <div className="text-[10px] text-slate-500">On-Time Matrix</div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── 3. Instant 1-Click Repeat Last Order Banner ─── */}
      {lastOrder && (
        <div className="bg-emerald-50/70 p-6 sm:p-7 rounded-2xl relative overflow-hidden border border-emerald-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-emerald-800 font-mono text-xs uppercase font-bold">
                <Repeat className="w-4 h-4" />
                <span>One-Click Reorder System</span>
              </div>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-slate-900">
                Repeat Your Previous Order in Seconds
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Order #{lastOrder.orderNumber} placed on {lastOrder.createdAt.split('T')[0]} ({lastOrder.items.length} items &bull; £{lastOrder.total.toFixed(2)} inc. VAT).
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {lastOrder.items.slice(0, 4).map((item, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-white rounded-lg text-[11px] text-slate-700 border border-slate-200 font-mono shadow-2xs">
                    {item.qty}x {item.name}
                  </span>
                ))}
                {lastOrder.items.length > 4 && (
                  <span className="px-2.5 py-1 bg-white rounded-lg text-[11px] text-emerald-800 font-mono border border-emerald-200 font-semibold shadow-2xs">
                    +{lastOrder.items.length - 4} more lines
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-end">
              <button
                onClick={() => setReorderModalOrder(lastOrder)}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <Repeat className="w-4 h-4" />
                <span>Repeat Last Order for Tomorrow</span>
              </button>
              <Link
                href={`/orders/${lastOrder.id}`}
                className="text-center py-2 text-xs text-slate-600 hover:text-emerald-800 font-mono transition-colors font-medium"
              >
                View Full Order Breakdown &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─── 4. Trade Credit & Spending Metric Tiles ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl space-y-2 h-full border border-slate-200 hover:border-slate-300 transition-all shadow-xs">
          <div className="text-[11px] font-mono uppercase text-slate-500 tracking-wider font-semibold">Approved Trade Credit</div>
          <div className="font-sans text-2xl font-bold text-slate-900">
            £{currentOrg.creditLimit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-emerald-800 font-mono font-bold">Tier: {currentOrg.creditTier?.toUpperCase() || 'STANDARD'} Facility</div>
        </div>

        <div className="bg-white p-5 rounded-2xl space-y-2 h-full border border-slate-200 hover:border-slate-300 transition-all shadow-xs">
          <div className="text-[11px] font-mono uppercase text-slate-500 tracking-wider font-semibold">Available Purchasing Power</div>
          <div className="font-sans text-2xl font-bold text-emerald-700 font-mono">
            £{availableCredit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${100 - creditUsagePercent}%` }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl space-y-2 h-full border border-slate-200 hover:border-slate-300 transition-all shadow-xs">
          <div className="text-[11px] font-mono uppercase text-slate-500 tracking-wider font-semibold">Outstanding Invoices</div>
          <div className="font-sans text-2xl font-bold text-slate-900 font-mono">
            £{currentOrg.creditUsed.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-500">{openInvoices.length} invoices awaiting statement run</div>
        </div>

        <div className="bg-white p-5 rounded-2xl space-y-1.5 h-full border border-slate-200 hover:border-slate-300 transition-all shadow-xs">
          <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-wider">Commercial Account Rep</div>
          <div className="font-bold text-slate-900 text-xs">{currentOrg.assignedSalesRep}</div>
          <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-1 font-mono">
            <Phone className="w-3 h-3 text-emerald-700" />
            <span>0121 790 8800 (Direct)</span>
          </div>
        </div>
      </div>

      {/* ─── 5. Favorite Products Quick-Order Grid ─── */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-sans text-xl font-bold text-slate-900">Your Favourite &amp; Regular Lines</h2>
            <p className="text-xs text-slate-500">Directly add your menu staples to today&apos;s order with contract-locked pricing</p>
          </div>
          <Link href="/catalog" className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1 font-mono">
            <span>View All Wholesale Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favoriteProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-2xl flex flex-col justify-between space-y-3 border border-slate-200 hover:border-emerald-300 transition-all shadow-xs">
              <div className="flex gap-3 items-center">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    quality={75}
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-emerald-700 truncate font-semibold">{product.sku}</div>
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {product.name}
                  </div>
                  <div className="text-[10px] text-slate-500">{product.packSize}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Your Price</span>
                  <span className="font-mono font-bold text-sm text-slate-900">
                    £{product.customerPrice.toFixed(2)}
                  </span>
                  {product.savingsPercent && (
                    <span className="text-[9px] text-emerald-700 font-mono ml-1 font-semibold">(-{product.savingsPercent}%)</span>
                  )}
                </div>

                <button
                  onClick={() => {
                    addItem(product, product.moq || 1);
                    openCart();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1 text-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add ({product.moq || 1})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 6. Recent Orders & Live Tracking ─── */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-sans text-xl font-bold text-slate-900">Recent Orders &amp; Delivery Status</h2>
          <Link href="/orders" className="text-xs font-semibold text-emerald-800 hover:underline font-mono">
            View All Order History &rarr;
          </Link>
        </div>

        <div className="space-y-3">
          {orgOrders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-slate-200 hover:border-slate-300 transition-all shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-900 text-sm">{order.orderNumber}</span>
                  <OrderStatusBadge status={order.status} />
                  {order.isStandingOrder && (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono text-[10px] border border-emerald-200 font-semibold">
                      Standing Order ({order.recurrence})
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-600">
                  {order.locationName} &bull; Delivery: <strong>{order.deliveryDate} ({order.deliverySlot})</strong>
                </div>
                <div className="text-[11px] text-slate-500">
                  {order.items.length} lines &bull; Total: <strong className="text-slate-900 font-mono">£{order.total.toFixed(2)}</strong> (inc. VAT)
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => setReorderModalOrder(order)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs text-slate-800 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Repeat className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Reorder</span>
                </button>
                <Link
                  href={`/orders/${order.id}`}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition-all font-mono"
                >
                  Track / Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Reorder Modal */}
      {reorderModalOrder && (
        <QuickReorderModal
          order={reorderModalOrder}
          isOpen={true}
          onClose={() => setReorderModalOrder(null)}
        />
      )}
    </div>
  );
}
