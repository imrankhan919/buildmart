import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        role: 'buyer', // default role: buyer, vendor, admin, guest
        name: 'Ramesh Kumar',
        email: 'ramesh.kumar@buildmart.com',
        phone: '+91 98765 12345',
        location: 'Indore, Madhya Pradesh',
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
});

export const { } = authSlice.actions

export default authSlice.reducer