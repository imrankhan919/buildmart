import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    vendors: [],
    products: [],
    orders: [],
    ratings: [],
    credits: []
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
        },
        setCreditsUpdate: (state, action) => {
            return {
                ...state,
                credits: state.credits.map(credit => credit._id === action.payload._id ? action.payload : credit)
            }
        }
    }
});

export const { setStats, setUserUpdate, setCreditsUpdate } = adminSlice.actions

export default adminSlice.reducer