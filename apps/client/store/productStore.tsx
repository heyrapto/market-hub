import { productsApi } from "@/services/api";
import { Product } from "@market-hub/shared-types";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<Product[]>;
  fetchProductDetails: (productId: string) => Promise<Product>;
  createProduct: (data: FormData) => Promise<Product>;
  updateProduct: (productId: string, data: FormData) => Promise<Product>;
  deleteProduct: (productId: string) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useProductStore = create<ProductState>()(
  subscribeWithSelector((set) => ({
    products: [],
    product: null,
    error: null,
    loading: false,

    fetchProducts: async () => {
      set({ loading: true, error: null });
      try {
        const result = await productsApi.allProducts();
        set({ products: result.products, loading: false });
        return result.products;
      } catch (error: any) {
        const message = error.response?.data?.message || "Failed to fetch products";
        set({ error: message, loading: false });
        throw error;
      }
    },

    fetchProductDetails: async (productId: string) => {
      set({ loading: true, error: null });
      try {
        const result = await productsApi.getProductDetails(productId);
        const product = result.product[0];
        set({ product, loading: false });
        return product;
      } catch (error: any) {
        const message = error.response?.data?.message || "Failed to fetch product details";
        set({ error: message, loading: false });
        throw error;
      }
    },

    createProduct: async (data: FormData) => {
      set({ loading: true, error: null });
      try {
        const result = await productsApi.createProduct(data);
        const newProduct = result.product;
        set((state) => ({
          products: [...state.products, newProduct],
          loading: false,
        }));
        return newProduct;
      } catch (error: any) {
        const message = error.response?.data?.message || "Failed to create product";
        set({ error: message, loading: false });
        throw error;
      }
    },

    updateProduct: async (productId: string, data: FormData) => {
      set({ loading: true, error: null });
      try {
        const result = await productsApi.updateProduct(productId, data);
        const updatedProduct = result.product[0];
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? updatedProduct : p
          ),
          product: state.product?.id === productId ? updatedProduct : state.product,
          loading: false,
        }));
        return updatedProduct;
      } catch (error: any) {
        const message = error.response?.data?.message || "Failed to update product";
        set({ error: message, loading: false });
        throw error;
      }
    },

    deleteProduct: async (productId: string) => {
      set({ loading: true, error: null });
      try {
        await productsApi.deleteProduct(productId);
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
          product: state.product?.id === productId ? null : state.product,
          loading: false,
        }));
      } catch (error: any) {
        const message = error.response?.data?.message || "Failed to delete product";
        set({ error: message, loading: false });
        throw error;
      }
    },

    clearError: () => set({ error: null }),

    reset: () =>
      set({
        products: [],
        product: null,
        loading: false,
        error: null,
      }),
  })),
);
