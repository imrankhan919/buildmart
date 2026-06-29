import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            return {
                ...state,
                user: action.payload
            }
        }
    }
});

export const { registerUser } = authSlice.actions

export default authSlice.reducer