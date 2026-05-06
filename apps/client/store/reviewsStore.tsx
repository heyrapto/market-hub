import { reviewsApi } from "@/services/api";
import { Review } from "@market-hub/shared-types";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  fetchProductReviews: (
    productId: string,
    page?: number,
    limit?: number
  ) => Promise<void>;
  addReview: (
    rating: number,
    content: string,
    productId: string
  ) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useReviewsStore = create<ReviewsState>()(
  subscribeWithSelector((set) => ({
    reviews: [],
    loading: false,
    error: null,

    fetchProductReviews: async (productId, page = 1, limit = 10) => {
      set({ loading: true, error: null });
      try {
        const response = await reviewsApi.getProductReviews(productId, page, limit);
        set({ reviews: response.reviews, loading: false });
      } catch (error: any) {
        const message =
          error.response?.data?.message || "Failed to fetch reviews";
        set({ error: message, loading: false });
        throw error;
      }
    },

    addReview: async (rating, content, productId) => {
      set({ loading: true, error: null });
      try {
        const response = await reviewsApi.reviewProduct(rating, content, productId);
        const newReview = response.review;
        set((state) => ({
          reviews: [newReview, ...state.reviews],
          loading: false,
        }));
      } catch (error: any) {
        const message = error.response?.data?.message || "Failed to add review";
        set({ error: message, loading: false });
        throw error;
      }
    },

    clearError: () => set({ error: null }),

    reset: () =>
      set({
        reviews: [],
        loading: false,
        error: null,
      }),
  }))
);
