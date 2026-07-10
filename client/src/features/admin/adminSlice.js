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
        },
        setUserUpdate: (state, action) => {
            return {
                ...state,
                users: state.users.map(user => user._id === action.payload._id ? action.payload : user)
            }
        }
    }
});

export const { setStats, setUserUpdate } = adminSlice.actions

export default adminSlice.reducer