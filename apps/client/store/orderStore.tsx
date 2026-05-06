import { ordersApi } from "@/services/api";
import { Order, OrderItem } from "@market-hub/shared-types";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface OrderState {
  orders: Order[];
  currentOrder: (Order & { items: OrderItem[] }) | null;
  loading: boolean;
  error: string | null;
  placeOrder: () => Promise<Order>;
  fetchOrderDetails: (orderId: string) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useOrderStore = create<OrderState>()(
  subscribeWithSelector((set) => ({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,

    placeOrder: async () => {
      set({ loading: true, error: null });
      try {
        const response = await ordersApi.placeOrder();
        const orderId = response.orderId;
        // The placeOrder API returns only orderId, we might need to fetch details separately
        // but for now let's just return a partial order or handle it in UI
        const order = { id: orderId } as Order; 
        set((state) => ({
          orders: [order, ...state.orders],
          loading: false,
        }));
        return order;
      } catch (error: any) {
        const message = error.response?.data?.message || "Failed to place order";
        set({ error: message, loading: false });
        throw error;
      }
    },

    fetchOrderDetails: async (orderId: string) => {
      set({ loading: true, error: null });
      try {
        const response = await ordersApi.getOrderDetails(orderId);
        set({ currentOrder: response, loading: false });
      } catch (error: any) {
        const message = error.response?.data?.message || "Failed to fetch order details";
        set({ error: message, loading: false });
        throw error;
      }
    },

    cancelOrder: async (orderId: string) => {
      set({ loading: true, error: null });
      try {
        const response = await ordersApi.cancelOrder(orderId);
        const updatedOrder = response.data[0];
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? updatedOrder : o)),
          currentOrder:
            state.currentOrder?.id === orderId
              ? { ...state.currentOrder, ...updatedOrder }
              : state.currentOrder,
          loading: false,
        }));
      } catch (error: any) {
        const message = error.response?.data?.message || "Failed to cancel order";
        set({ error: message, loading: false });
        throw error;
      }
    },

    clearError: () => set({ error: null }),

    reset: () =>
      set({
        orders: [],
        currentOrder: null,
        loading: false,
        error: null,
      }),
  }))
);
