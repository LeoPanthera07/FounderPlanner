import { create } from 'zustand';
import { db } from '../../data/db/plannerDB';
import { getTodayString } from '../../utils/dateUtils';

export const useReviewsStore = create((set, get) => ({
  reviews: [],
  currentReview: null,
  loading: false,

  loadReviews: async (type) => {
    set({ loading: true });
    const reviews = await db.reviews.where('type').equals(type).sortBy('period');
    set({ reviews, loading: false });
  },

  loadReview: async (type, period) => {
    let review = await db.reviews
      .where('type').equals(type).and((r) => r.period === period).first();
    if (!review) {
      review = { type, period, data: {}, createdAt: getTodayString() };
      review.id = await db.reviews.add(review);
    }
    set({ currentReview: review });
  },

  updateReviewData: async (key, value) => {
    const { currentReview } = get();
    if (!currentReview) return;
    const data = { ...currentReview.data, [key]: value };
    await db.reviews.update(currentReview.id, { data });
    set({ currentReview: { ...currentReview, data } });
  },

  deleteReview: async (id) => {
    await db.reviews.delete(id);
    const { reviews } = get();
    set({ reviews: reviews.filter((r) => r.id !== id) });
  },
}));