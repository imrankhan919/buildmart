import { createSlice } from '@reduxjs/toolkit';

// Legacy client cache. Server state now lives in React Query; retained only to
// avoid breaking existing store imports.
const initialState = {
  vendors: [],
  vendorProfile: null,
  products: [],
  orders: [],
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    setVendors(state, action) {
      state.vendors = action.payload || [];
    },
    setVendorProfile(state, action) {
      state.vendorProfile = action.payload;
    },
    setVendorProducts(state, action) {
      state.products = action.payload || [];
    },
  },
});

export const { setVendors, setVendorProfile, setVendorProducts } = vendorSlice.actions;

export default vendorSlice.reducer;
