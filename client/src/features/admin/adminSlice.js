import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    vendors: [],
    products: [],
    orders: [],
    ratings: []
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setStats: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
});

export const { setStats } = adminSlice.actions

export default adminSlice.reducer