import { cartApi } from "@/services/api";
import { Product } from "@market-hub/shared-types";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (product: Product, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        items: [],
        loading: false,
        error: null,

        fetchCart: async () => {
          set({ loading: true, error: null });
          try {
            const response = await cartApi.getCart();
            set({ items: response.data.items, loading: false });
          } catch (error: any) {
            const message = error.response?.data?.message || "Failed to fetch cart";
            set({ error: message, loading: false });
          }
        },

        addItem: async (product, quantity) => {
          set({ loading: true, error: null });
          try {
            await cartApi.addToCart(product.id, quantity);
            set((state) => {
              const existingItem = state.items.find(
                (item) => item.product.id === product.id
              );
              if (existingItem) {
                return {
                  items: state.items.map((item) =>
                    item.product.id === product.id
                      ? { ...item, quantity: item.quantity + quantity }
                      : item
                  ),
                  loading: false,
                };
              }
              return {
                items: [...state.items, { product, quantity }],
                loading: false,
              };
            });
          } catch (error: any) {
            const message = error.response?.data?.message || "Failed to add item";
            set({ error: message, loading: false });
            throw error;
          }
        },

        updateQuantity: async (productId, quantity) => {
          set({ loading: true, error: null });
          try {
            await cartApi.updateCart(productId, quantity);
            set((state) => ({
              items: state.items.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
              ),
              loading: false,
            }));
          } catch (error: any) {
            const message = error.response?.data?.message || "Failed to update quantity";
            set({ error: message, loading: false });
            throw error;
          }
        },

        removeItem: (productId) => {
          set((state) => ({
            items: state.items.filter((item) => item.product.id !== productId),
          }));
        },

        clearCart: () => set({ items: [] }),

        totalItems: () => {
          return get().items.reduce((acc, item) => acc + item.quantity, 0);
        },

        totalPrice: () => {
          return get().items.reduce(
            (acc, item) => acc + parseFloat(item.product.price) * item.quantity,
            0
          );
        },
      }),
      {
        name: "cart-storage",
      }
    )
  )
);
