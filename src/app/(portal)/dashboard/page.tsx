'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDemoStore } from '@/lib/store/demo-store';
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
  Sparkles,
  Phone
} from 'lucide-react';
import { QuickReorderModal } from '@/components/portal/QuickReorderModal';
import { OrderStatusBadge } from '@/components/portal/OrderStatusBadge';

export default function CustomerDashboardPage() {
  const { 
    currentOrgId, 
    organizations, 
    currentLocationId, 
    orders, 
    invoices, 
    getCustomerProducts, 
    toggleFavorite 
  } = useDemoStore();
  const { addItem, openCart } = useCartStore();

  const [reorderModalOrder, setReorderModalOrder] = useState<any>(null);

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];
  const currentLocation = currentOrg?.locations.find((l) => l.id === currentLocationId) || currentOrg?.locations[0];

  const orgOrders = orders.filter((o) => o.organizationId === currentOrg.id);
  const lastOrder = orgOrders[0]; // most recent order

  const orgInvoices = invoices.filter((inv) => inv.organizationId === currentOrg.id);
  const openInvoices = orgInvoices.filter((inv) => inv.status === 'open');

  const products = getCustomerProducts();
  const favoriteProducts = products.filter((p) => p.isFavorite);

  const availableCredit = Math.max(0, currentOrg.creditLimit - currentOrg.creditUsed);
  const creditUsagePercent = Math.min(100, Math.round((currentOrg.creditUsed / currentOrg.creditLimit) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Welcome & Operational Status Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-cream/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-champagne/10 border border-champagne/25 text-champagne text-[11px] font-mono uppercase">
              {currentOrg.sector.replace('_', ' ')} &bull; {currentOrg.paymentTerms}
            </span>
            <span className="text-xs text-cream/40">Account #{currentOrg.id.toUpperCase()}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-cream mt-1">
            Welcome back, {currentOrg.name}
          </h1>
          <p className="text-xs sm:text-sm text-cream/60 mt-0.5">
            Delivering to: <strong>{currentLocation?.name}</strong> ({currentLocation?.postcode})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/catalog"
            className="px-5 py-2.5 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Catalog</span>
          </Link>
          <Link
            href="/quick-order"
            className="px-4 py-2.5 rounded-xl border border-cream/20 hover:border-champagne text-cream text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Clock className="w-4 h-4 text-champagne" />
            <span>Speed Order Sheet</span>
          </Link>
        </div>
      </div>

      {/* 2. Instant 1-Click Repeat Last Order Hero Banner */}
      {lastOrder && (
        <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-champagne/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-champagne font-mono text-xs uppercase font-bold">
                <Repeat className="w-4 h-4" />
                <span>One-Click Reorder System</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-cream">
                Repeat Your Previous Order in Seconds
              </h2>
              <p className="text-xs text-cream/70 leading-relaxed">
                Order #{lastOrder.orderNumber} placed on {lastOrder.createdAt.split('T')[0]} ({lastOrder.items.length} items &bull; £{lastOrder.total.toFixed(2)} inc. VAT).
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {lastOrder.items.slice(0, 4).map((item, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-obsidian-950/80 rounded text-[11px] text-cream/80 border border-cream/10">
                    {item.qty}x {item.name}
                  </span>
                ))}
                {lastOrder.items.length > 4 && (
                  <span className="px-2 py-0.5 bg-obsidian-950/80 rounded text-[11px] text-champagne">
                    +{lastOrder.items.length - 4} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-end">
              <button
                onClick={() => setReorderModalOrder(lastOrder)}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs sm:text-sm shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2"
              >
                <Repeat className="w-4 h-4" />
                <span>Repeat Last Order for Tomorrow</span>
              </button>
              <Link
                href={`/orders/${lastOrder.id}`}
                className="text-center py-2 text-xs text-cream/60 hover:text-champagne"
              >
                View Full Order Breakdown &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 3. Trade Credit & Spending Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Credit Limit */}
        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <div className="text-[11px] font-mono uppercase text-cream/50">Approved Trade Credit</div>
          <div className="font-display text-2xl font-bold text-cream">
            £{currentOrg.creditLimit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-champagne">Tier: {currentOrg.creditTier.toUpperCase()}</div>
        </div>

        {/* Available Credit */}
        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <div className="text-[11px] font-mono uppercase text-cream/50">Available Purchasing Power</div>
          <div className="font-display text-2xl font-bold text-emerald-400">
            £{availableCredit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="w-full bg-obsidian-900 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full" style={{ width: `${100 - creditUsagePercent}%` }} />
          </div>
        </div>

        {/* Outstanding Invoices */}
        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <div className="text-[11px] font-mono uppercase text-cream/50">Outstanding Invoices</div>
          <div className="font-display text-2xl font-bold text-cream">
            £{currentOrg.creditUsed.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-cream/50">{openInvoices.length} invoices awaiting statement run</div>
        </div>

        {/* Key Account Manager */}
        <div className="glass-panel p-5 rounded-2xl space-y-1.5">
          <div className="text-[11px] font-mono uppercase text-champagne">Commercial Account Rep</div>
          <div className="font-bold text-cream text-xs">{currentOrg.assignedSalesRep}</div>
          <div className="text-[10px] text-cream/50 flex items-center gap-1 mt-1">
            <Phone className="w-3 h-3 text-champagne" />
            <span>0121 790 8800 (Direct)</span>
          </div>
        </div>
      </div>

      {/* 4. Favorite Products Quick-Order Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-display text-xl font-bold text-cream">Your Favourite & Regular Lines</h2>
            <p className="text-xs text-cream/50">Directly add your menu staples to today's order with contract-locked pricing</p>
          </div>
          <Link href="/catalog" className="text-xs font-semibold text-champagne hover:underline flex items-center gap-1">
            <span>View All Wholesale Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favoriteProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-3 group hover:border-champagne/40 transition-all">
              <div className="flex gap-3 items-center">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-obsidian-900 shrink-0">
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
                  <div className="text-[10px] font-mono text-champagne truncate">{product.sku}</div>
                  <div className="text-xs font-bold text-cream truncate group-hover:text-champagne transition-colors">
                    {product.name}
                  </div>
                  <div className="text-[10px] text-cream/50">{product.packSize}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-cream/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-cream/40 uppercase font-mono block">Your Price</span>
                  <span className="font-mono font-bold text-sm text-champagne">
                    £{product.customerPrice.toFixed(2)}
                  </span>
                  {product.savingsPercent && (
                    <span className="text-[9px] text-emerald-400 font-mono ml-1">(-{product.savingsPercent}%)</span>
                  )}
                </div>

                <button
                  onClick={() => {
                    addItem(product, product.moq || 1);
                    openCart();
                  }}
                  className="p-2 rounded-lg bg-champagne text-obsidian-950 font-bold hover:brightness-110 shadow-gold-glow flex items-center gap-1 text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add ({product.moq || 1})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Recent Orders & Live Tracking */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-display text-xl font-bold text-cream">Recent Orders & Delivery Status</h2>
          <Link href="/orders" className="text-xs font-semibold text-champagne hover:underline">
            View All Order History &rarr;
          </Link>
        </div>

        <div className="space-y-3">
          {orgOrders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              className="glass-panel p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-cream/20 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-cream text-sm">{order.orderNumber}</span>
                  <OrderStatusBadge status={order.status} />
                  {order.isStandingOrder && (
                    <span className="px-2 py-0.5 rounded bg-champagne/10 text-champagne font-mono text-[10px] border border-champagne/20">
                      Standing Order ({order.recurrence})
                    </span>
                  )}
                </div>
                <div className="text-xs text-cream/60">
                  {order.locationName} &bull; Delivery: <strong>{order.deliveryDate} ({order.deliverySlot})</strong>
                </div>
                <div className="text-[11px] text-cream/40">
                  {order.items.length} lines &bull; Total: <strong className="text-cream">£{order.total.toFixed(2)}</strong> (inc. VAT)
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => setReorderModalOrder(order)}
                  className="px-3.5 py-2 rounded-lg border border-cream/20 hover:border-champagne text-xs text-cream font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Repeat className="w-3.5 h-3.5 text-champagne" />
                  <span>Reorder</span>
                </button>
                <Link
                  href={`/orders/${order.id}`}
                  className="px-4 py-2 rounded-lg bg-obsidian-900 hover:bg-champagne hover:text-obsidian-950 text-xs font-semibold text-cream border border-cream/15 transition-all"
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
