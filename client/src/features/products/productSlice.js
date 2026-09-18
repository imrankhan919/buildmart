import { createSlice } from '@reduxjs/toolkit';

// Legacy client cache. Server state now lives in React Query (['products'],
// ['product', id]); retained only to avoid breaking existing store imports.
const initialState = {
  products: [],
  product: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload || [];
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
  },
});

export const { setProducts, setProduct } = productSlice.actions;

export default productSlice.reducer;
