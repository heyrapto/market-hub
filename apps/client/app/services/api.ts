import { apiClient } from "@/app/config/axios";

export const productsApi = {
  allProducts: async () => {
    try {
      const response = await apiClient.get("/product");
      return response.data;
    } catch (error) {
      console.error("An error occured:", error);
      throw error;
    }
  },
  createProduct: async (data: FormData) => {
    try {
      const response = await apiClient.post("/product/create", data);
      return response.data;
    } catch (error) {
      console.error("An error occured:", error);
      throw error;
    }
  },
  updateProduct: async (productId: string, data: FormData) => {
    try {
      const response = await apiClient.put(
        `/product/update/${productId}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error("An error occured:", error);
      throw error;
    }
  },
  getProductDetails: async (productId: string) => {
    try {
      const response = await apiClient.get(`/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error("An error occured:", error);
      throw error;
    }
  },
  deleteProduct: async (productId: string) => {
    try {
      const response = await apiClient.delete(`/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error("An error occured:", error);
      throw error;
    }
  },
};

export const reviewsApi = {
  reviewProduct: async (rating: number, content: string, productId: string) => {
    try {
      const response = await apiClient.post("/reviews", {
        rating,
        content,
        productId,
      });
      return response.data;
    } catch (error) {
      console.error("An error occured:", error);
      throw error;
    }
  },
  getProductReviews: async (productId: string, page: number, limit: number) => {
    try {
      const response = await apiClient.get(`/reviews/${productId}`, {
        params: {
          page: page,
          limit: limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error("An error occured:", error);
      throw error;
    }
  },
};

export const ordersApi = {
  placeOrder: async () => {
    try {
      const response = await apiClient.post("/orders");
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  },

  getOrderDetails: async (orderId: string) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  },

  getOrderStatus: async (orderId: string) => {
    try {
      const response = await apiClient.get(`/orders/status/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  },

  cancelOrder: async (orderId: string) => {
    try {
      const response = await apiClient.put(`/orders/cancel/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  },
};

export const cartApi = {
  getCart: async () => {
    try {
      const response = await apiClient.get("/cart");
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  },

  addToCart: async (productId: string, quantity: number) => {
    try {
      const response = await apiClient.post("/cart/add", {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  },

  updateCart: async (productId: string, quantity: number) => {
    try {
      const response = await apiClient.put("/cart/update", {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  },

  checkoutCart: async () => {
    try {
      const response = await apiClient.post("/cart/checkout");
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  },
};

export const authApi = {
  register: async (data: any) => {
    try {
      const response = await apiClient.post("/auth/register", data);
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  },
  login: async (data: any) => {
    try {
      const response = await apiClient.post("/auth/login", data);
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  },
  refresh: async () => {
    try {
      const response = await apiClient.post("/auth/refresh");
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await apiClient.post("/auth/logout");
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  },
};
