import { create } from 'zustand';

export interface CartItem {
  productId: string;
  sku: string;
  name: string;
  packSize: string;
  unit: string;
  customerPrice: number;
  moq: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isStandingOrder: boolean;
  recurrence: 'daily' | 'mon_wed_fri' | 'weekly' | 'fortnightly' | 'monthly' | null;
  recurrenceDays: string[];
  deliverySlot: string | null;
  notes: string;

  // Actions
  addItem: (product: any, qty?: number) => void;
  addLine: (line: any, qty?: number) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  removeLine: (productId: string) => void;
  clearCart: () => void;
  clear: () => void;
  openCart: () => void;
  open: () => void;
  closeCart: () => void;
  close: () => void;
  setStandingOrder: (isStanding: boolean) => void;
  setRecurrence: (recurrence: CartState['recurrence']) => void;
  setRecurrenceDays: (days: string[]) => void;
  setDeliverySlot: (slot: string | null) => void;
  setNotes: (notes: string) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  isStandingOrder: false,
  recurrence: null,
  recurrenceDays: ['Mon', 'Wed', 'Fri'],
  deliverySlot: null,
  notes: '',

  addItem: (product, qty = product.moq || 1) => {
    const existing = get().items.find((i) => i.productId === product.id || i.productId === product.productId);
    const productId = product.id || product.productId;
    const price = product.customerPrice ?? product.unitPrice ?? product.basePrice ?? 0;
    const packSize = product.packSize || 'Standard';
    const unit = product.unit || 'unit';

    if (existing) {
      set({
        items: get().items.map((i) =>
          i.productId === productId ? { ...i, qty: i.qty + qty } : i
        ),
      });
    } else {
      set({
        items: [
          ...get().items,
          {
            productId,
            sku: product.sku,
            name: product.name,
            packSize,
            unit,
            customerPrice: price,
            moq: product.moq || 1,
            qty,
          },
        ],
      });
    }
    set({ isOpen: true });
  },

  addLine: (line, qty) => get().addItem(line, qty),

  updateQty: (productId, qty) => {
    if (qty <= 0) {
      get().removeItem(productId);
      return;
    }
    set({
      items: get().items.map((i) => (i.productId === productId ? { ...i, qty } : i)),
    });
  },

  removeItem: (productId) =>
    set({ items: get().items.filter((i) => i.productId !== productId) }),

  removeLine: (productId) => get().removeItem(productId),

  clearCart: () =>
    set({
      items: [],
      isStandingOrder: false,
      recurrence: null,
      recurrenceDays: ['Mon', 'Wed', 'Fri'],
      deliverySlot: null,
      notes: '',
    }),

  clear: () => get().clearCart(),

  openCart: () => set({ isOpen: true }),
  open: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  close: () => set({ isOpen: false }),

  setStandingOrder: (isStandingOrder) =>
    set({ isStandingOrder, recurrence: isStandingOrder ? 'weekly' : null }),
  setRecurrence: (recurrence) => set({ recurrence }),
  setRecurrenceDays: (recurrenceDays) => set({ recurrenceDays }),
  setDeliverySlot: (deliverySlot) => set({ deliverySlot }),
  setNotes: (notes) => set({ notes }),
}));

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.customerPrice * item.qty, 0);
}
