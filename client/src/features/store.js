import { configureStore } from '@reduxjs/toolkit'
import auth from "./auth/authSlice.js"
import admin from "./admin/adminSlice.js"

const store = configureStore({
    reducer: { auth, admin }
})


export default store