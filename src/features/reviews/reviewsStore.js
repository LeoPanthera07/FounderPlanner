import { create } from "zustand";
import { db } from "../../data/db/plannerDB";

const getWeekKey = () => {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now - jan1) / 86400000 + jan1.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${String(week).padStart(2, "0")}`;
};
const getMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-M${String(now.getMonth() + 1).padStart(2, "0")}`;
};
const EMPTY = { win:"", drift:"", forward:"", stop:"", start:"", continue:"", lesson:"", nextFocus:"" };

let _t = null;
const dsave = (id, data) => { clearTimeout(_t); _t = setTimeout(() => db.reviews.update(id, data), 600); };

export const useReviewsStore = create((set, get) => ({
  review: null,
  loading: false,

  loadReview: async (type = "weekly") => {
    set({ loading: true, review: null });
    const period = type === "weekly" ? getWeekKey() : getMonthKey();
    let data;
    try { data = await db.reviews.filter(r => r.type === type && r.period === period).first(); } catch(e) { data = null; }
    if (!data) {
      const nd = { ...EMPTY, type, period };
      const id = await db.reviews.add(nd);
      data = { ...nd, id };
    }
    set({ review: data, loading: false });
  },

  updateField: (field, value) => {
    const { review } = get();
    if (!review) return;
    const updated = { ...review, [field]: value };
    set({ review: updated });
    dsave(review.id, { [field]: value });
  },
}));