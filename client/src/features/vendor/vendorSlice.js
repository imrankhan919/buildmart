import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    vendors: null,
    vendorProfile: null,
    products: null,
    orders: null
}

const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {
        setVendors: (state, action) => {
            return {
                ...state,
                vendors: action.payload
            }
        },
        setVendorProfile: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        setVendorProducts: (state, action) => {
            return {
                ...state,
                products: action.payload
            }
        }
    }
});

export const { setVendors, setVendorProfile, setVendorProducts } = vendorSlice.actions

export default vendorSlice.reducer