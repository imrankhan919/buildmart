import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    savedPlans: []
}

const profile = createSlice({
    name: "profile",
    initialState,
    reducers: {}
});

export const { } = profile.actions

export default profile.reducer