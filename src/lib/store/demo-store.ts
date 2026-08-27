import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CustomerProduct } from '@/types/products';
import { CustomerOrganization, UserProfile, CustomerLocation } from '@/types/customer';
import { Lead, LeadStatus } from '@/types/crm';
import { Order, Invoice, OrderStatus, OrderItem } from '@/types/orders';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORGANIZATIONS,
  INITIAL_LEADS,
  INITIAL_ORDERS,
  INITIAL_INVOICES,
} from '@/lib/mock-data';

interface DemoState {
  // Current active user / persona
  currentRole: 'customer' | 'admin' | 'sales';
  currentOrgId: string;
  currentLocationId: string;
  userProfile: UserProfile;

  // Master Data
  products: Product[];
  organizations: CustomerOrganization[];
  leads: Lead[];
  orders: Order[];
  invoices: Invoice[];
  favorites: Record<string, string[]>; // orgId -> array of productIds

  // Actions
  setPersona: (orgId: string, role?: 'customer' | 'admin' | 'sales') => void;
  switchRole: (role: 'customer' | 'admin' | 'sales') => void;
  setLocation: (locationId: string) => void;
  toggleFavorite: (productId: string) => void;
  
  // Pricing calculation helper
  getCustomerProduct: (product: Product) => CustomerProduct;
  getCustomerProducts: () => CustomerProduct[];

  // Order Actions
  placeOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string, pod?: Order['pod']) => void;

  // CRM Actions
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => Lead;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  convertLeadToCustomer: (leadId: string, creditLimit: number, discountPercent: number) => CustomerOrganization;

  // Admin Pricing Actions
  updateCustomerPrice: (orgId: string, productId: string, price: number | null) => void;
  updateCustomerCredit: (orgId: string, creditLimit: number, paymentTerms: string) => void;

  // Invoice Actions
  payInvoice: (invoiceId: string) => void;
}

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      currentRole: 'customer',
      currentOrgId: 'org-rootwills-partner',
      currentLocationId: 'loc-primary-site',
      userProfile: {
        id: 'usr-partner-1',
        organizationId: 'org-rootwills-partner',
        email: 'customer@rootwills.co.uk',
        fullName: 'Trade Account Lead',
        role: 'purchaser',
        phone: '0121 285 3910',
      },

      products: INITIAL_PRODUCTS,
      organizations: INITIAL_ORGANIZATIONS,
      leads: INITIAL_LEADS,
      orders: INITIAL_ORDERS,
      invoices: INITIAL_INVOICES,
      favorites: {},

      switchRole: (role: 'customer' | 'admin' | 'sales') => {
        if (role === 'admin' || role === 'sales') {
          get().setPersona('org-rootwills-hq', role);
        } else {
          get().setPersona('org-rootwills-partner', 'customer');
        }
      },

      setPersona: (orgId, role = 'customer') => {
        const org = (get().organizations && get().organizations.find((o) => o.id === orgId)) || (get().organizations && get().organizations[0]) || INITIAL_ORGANIZATIONS[0];
        const primaryLoc = (org.locations && org.locations.find((l) => l.isPrimary)) || (org.locations && org.locations[0]);

        let profile: UserProfile;
        if (role === 'admin' || role === 'sales') {
          profile = {
            id: 'usr-admin-manager',
            organizationId: 'org-rootwills-hq',
            email: 'admin@rootwills.co.uk',
            fullName: 'Rootwills Operations Manager',
            role: 'admin',
          };
        } else {
          profile = {
            id: `usr-${org.id}`,
            organizationId: org.id,
            email: `purchasing@rootwills.co.uk`,
            fullName: `${org.name} Purchasing`,
            role: 'purchaser',
          };
        }

        set({
          currentRole: role,
          currentOrgId: org.id,
          currentLocationId: primaryLoc?.id || '',
          userProfile: profile,
        });
      },

      setLocation: (locationId) => {
        set({ currentLocationId: locationId });
      },

      toggleFavorite: (productId) => {
        const { currentOrgId, favorites } = get();
        const currentOrgFavs = favorites[currentOrgId] || [];
        const exists = currentOrgFavs.includes(productId);
        const updatedFavs = exists
          ? currentOrgFavs.filter((id) => id !== productId)
          : [...currentOrgFavs, productId];

        set({
          favorites: {
            ...favorites,
            [currentOrgId]: updatedFavs,
          },
        });
      },

      getCustomerProduct: (product: Product): CustomerProduct => {
        const { currentOrgId, organizations, favorites } = get();
        const org = organizations.find((o) => o.id === currentOrgId);
        const orgFavs = favorites[currentOrgId] || [];
        const isFavorite = orgFavs.includes(product.id);

        let finalPrice = product.basePrice;
        let savingsPercent = 0;

        if (org) {
          // 1. Direct hard price override
          if (org.priceOverrides && org.priceOverrides[product.id] !== undefined) {
            finalPrice = org.priceOverrides[product.id];
            savingsPercent = Math.round(((product.basePrice - finalPrice) / product.basePrice) * 100);
          }
          // 2. Or tier percentage discount
          else if (org.discountTierPercent && org.discountTierPercent > 0) {
            finalPrice = Number((product.basePrice * (1 - org.discountTierPercent / 100)).toFixed(2));
            savingsPercent = org.discountTierPercent;
          }
        }

        return {
          ...product,
          customerPrice: finalPrice,
          savingsPercent: savingsPercent > 0 ? savingsPercent : undefined,
          isFavorite,
        };
      },

      getCustomerProducts: () => {
        const { products } = get();
        return products.map((p) => get().getCustomerProduct(p));
      },

      placeOrder: (orderData) => {
        const { orders, organizations, currentOrgId, currentLocationId } = get();
        const orgId = orderData.organizationId || currentOrgId;
        const org = organizations.find((o) => o.id === orgId) || organizations[0];
        const locationId = orderData.locationId || currentLocationId || org.locations[0]?.id || 'loc-main';
        const loc = org.locations.find((l) => l.id === locationId) || org.locations[0];
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const orderNumber = `RW-${randomDigits}`;
        const now = new Date().toISOString();

        const defaultItems: OrderItem[] = [
          { productId: 'prod-001', sku: 'FP-TOM-01', name: 'San Marzano Vine Tomatoes (6kg)', packSize: '6kg Case', unitPrice: 7.80, qty: 4, totalPrice: 31.20 },
          { productId: 'prod-006', sku: 'FP-POT-06', name: 'Selected Maris Piper Washed Potatoes (25kg)', packSize: '25kg Sack', unitPrice: 13.14, qty: 2, totalPrice: 26.28 },
        ];

        const items = orderData.items || defaultItems;
        const subtotal = orderData.subtotal ?? items.reduce((s, i) => s + (i.totalPrice ?? (i.unitPrice * i.qty)), 0);
        const vatTotal = orderData.vatTotal ?? 0.00;
        const total = orderData.total ?? Number((subtotal + vatTotal).toFixed(2));

        const newOrder: Order = {
          id: `ord-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          orderNumber,
          organizationId: org.id,
          organizationName: org.name,
          locationId: loc?.id || 'loc-main',
          locationName: loc?.name || 'Main Kitchen',
          deliveryDate: orderData.deliveryDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
          deliverySlot: orderData.deliverySlot || '05:30 - 07:30 (Keyholder Pre-Opening)',
          deliveryNotes: orderData.deliveryNotes || '',
          status: 'received',
          items,
          subtotal,
          vatTotal,
          total,
          isStandingOrder: orderData.isStandingOrder ?? false,
          recurrence: orderData.recurrence,
          createdAt: now,
          updatedAt: now,
          trackingHistory: [
            {
              status: 'received',
              timestamp: new Date().toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' }),
              note: `Order placed online via Customer Portal`,
            },
          ],
        };

        // Update trade credit used
        const updatedOrgs = organizations.map((o) => {
          if (o.id === org.id) {
            return {
              ...o,
              creditUsed: Number((o.creditUsed + total).toFixed(2)),
              lastOrderDate: now.split('T')[0],
            };
          }
          return o;
        });

        // Create new open invoice
        const newInvoice: Invoice = {
          id: `inv-${Date.now()}`,
          invoiceNumber: `INV-${new Date().getFullYear()}-${randomDigits}`,
          orderId: newOrder.id,
          orderNumber: newOrder.orderNumber,
          organizationId: org.id,
          issueDate: now.split('T')[0],
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          subtotal,
          vatAmount: vatTotal,
          totalAmount: total,
          status: 'open',
        };

        set({
          orders: [newOrder, ...orders],
          organizations: updatedOrgs,
          invoices: [newInvoice, ...get().invoices],
        });

        return newOrder;
      },

      updateOrderStatus: (orderId, newStatus, note, pod) => {
        const { orders } = get();
        const timestamp = new Date().toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' });

        const updated = orders.map((ord) => {
          if (ord.id === orderId) {
            return {
              ...ord,
              status: newStatus,
              updatedAt: new Date().toISOString(),
              ...(pod ? { pod } : {}),
              trackingHistory: [
                ...ord.trackingHistory,
                { status: newStatus, timestamp, note: note || `Status updated to ${newStatus}` },
              ],
            };
          }
          return ord;
        });

        set({ orders: updated });
      },

      addLead: (leadData) => {
        const newLead: Lead = {
          ...leadData,
          id: `lead-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'new_lead',
        };
        set({ leads: [newLead, ...get().leads] });
        return newLead;
      },

      updateLeadStatus: (leadId, status) => {
        set({
          leads: get().leads.map((l) => (l.id === leadId ? { ...l, status } : l)),
        });
      },

      convertLeadToCustomer: (leadId, creditLimit, discountPercent) => {
        const lead = get().leads.find((l) => l.id === leadId);
        if (!lead) throw new Error('Lead not found');

        const newOrg: CustomerOrganization = {
          id: `org-${Date.now()}`,
          name: lead.companyName,
          sector: lead.sector,
          creditTier: creditLimit > 10000 ? 'premium' : 'standard',
          creditLimit,
          creditUsed: 0,
          paymentTerms: '30 Days Net',
          assignedSalesRep: lead.assignedSalesRep || 'Marcus Vance',
          assignedDepot: 'Birmingham Central Hub (B5 5JR)',
          discountTierPercent: discountPercent,
          status: 'active',
          locations: [
            {
              id: `loc-${Date.now()}`,
              name: `${lead.companyName} — Main Site`,
              addressLine1: `${lead.city} Site`,
              city: lead.city || 'Birmingham',
              postcode: lead.postcode,
              isPrimary: true,
            },
          ],
        };

        set({
          organizations: [...get().organizations, newOrg],
          leads: get().leads.map((l) => (l.id === leadId ? { ...l, status: 'account_opened' as LeadStatus } : l)),
        });

        return newOrg;
      },

      updateCustomerPrice: (orgId, productId, price) => {
        const updatedOrgs = get().organizations.map((org) => {
          if (org.id === orgId) {
            const currentOverrides = { ...(org.priceOverrides || {}) };
            if (price === null || price === undefined) {
              delete currentOverrides[productId];
            } else {
              currentOverrides[productId] = price;
            }
            return {
              ...org,
              priceOverrides: currentOverrides,
            };
          }
          return org;
        });

        set({ organizations: updatedOrgs });
      },

      updateCustomerCredit: (orgId, creditLimit, paymentTerms) => {
        const updatedOrgs = get().organizations.map((org) => {
          if (org.id === orgId) {
            return {
              ...org,
              creditLimit,
              paymentTerms,
            };
          }
          return org;
        });

        set({ organizations: updatedOrgs });
      },

      payInvoice: (invoiceId) => {
        const updatedInvoices = get().invoices.map((inv) => {
          if (inv.id === invoiceId) {
            return {
              ...inv,
              status: 'paid' as const,
            };
          }
          return inv;
        });

        set({ invoices: updatedInvoices });
      },
    }),
    {
      name: 'rootwills-b2b-storage-v4',
    }
  )
);
