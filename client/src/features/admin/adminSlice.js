import { createSlice } from '@reduxjs/toolkit';

// Legacy client cache. Server state now lives in React Query (['admin-overview']);
// these reducers remain for optimistic updates only.
const initialState = {
  users: [],
  vendors: [],
  products: [],
  orders: [],
  ratings: [],
  credits: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setStats(state, action) {
      const payload = action.payload || {};
      if (Array.isArray(payload.users)) state.users = payload.users;
      if (Array.isArray(payload.vendors)) state.vendors = payload.vendors;
      if (Array.isArray(payload.products)) state.products = payload.products;
      if (Array.isArray(payload.orders)) state.orders = payload.orders;
      if (Array.isArray(payload.credits)) state.credits = payload.credits;
    },
    setUserUpdate(state, action) {
      const idx = state.users.findIndex((u) => u._id === action.payload._id);
      if (idx >= 0) state.users[idx] = action.payload;
    },
    setCreditsUpdate(state, action) {
      const updated = action.payload?.creditRequest || action.payload;
      if (!updated?._id) return;
      const idx = state.credits.findIndex((c) => c._id === updated._id);
      if (idx >= 0) state.credits[idx] = updated;
    },
  },
});

export const { setStats, setUserUpdate, setCreditsUpdate } = adminSlice.actions;

export default adminSlice.reducer;
