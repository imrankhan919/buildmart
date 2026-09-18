import { createSlice } from '@reduxjs/toolkit';

// Legacy client-only slice. Server state (saved plans) now lives in React Query
// cache under ['saved-plans']; this slice is retained only to avoid breaking
// existing store imports.
const initialState = {
  savedPlans: [],
};

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearSavedPlans(state) {
      state.savedPlans = [];
    },
  },
});

export const { clearSavedPlans } = profile.actions;

export default profile.reducer;
