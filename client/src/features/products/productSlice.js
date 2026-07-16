import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    product: null
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            return {
                ...state,
                products: action.payload
            }
        },
        setProduct: (state, action) => {
            return {
                ...state,
                product: action.payload
            }
        }
    }
});

export const { setProducts, setProduct } = productSlice.actions

export default productSlice.reducer