import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const id = `${item.id}-${Date.now()}`;
        set((state) => ({ items: [...state.items, { ...item, cartId: id }] }));
      },

      removeItem: (cartId) =>
        set((state) => ({ items: state.items.filter((i) => i.cartId !== cartId) })),

      updateQuantity: (cartId, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.cartId === cartId ? { ...i, quantity: Math.max(1, qty) } : i
          ),
        })),

      clearCart: () => set({ items: [] }),

      get total() {
        return get().items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
      },

      get itemCount() {
        return get().items.reduce((sum, i) => sum + (i.quantity || 1), 0);
      },
    }),
    { name: 'btb-cart' }
  )
);
