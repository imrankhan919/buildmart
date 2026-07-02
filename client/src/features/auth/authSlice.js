import { createSlice } from '@reduxjs/toolkit'

let userExist = JSON.parse(localStorage.getItem('user'))


const initialState = {
    user: userExist || null
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
        },
        loginUser: (state, action) => {
            return {
                ...state,
                user: action.payload
            }
        },
        logoutUser: (state, action) => {
            return {
                ...state,
                user: null
            }
        }
    }
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions

export default authSlice.reducer