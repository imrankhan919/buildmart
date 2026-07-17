import { configureStore } from '@reduxjs/toolkit'
import auth from "./auth/authSlice.js"
import admin from "./admin/adminSlice.js"
import vendor from "./vendor/vendorSlice.js"
import product from "./products/productSlice.js"
import profile from "./profile/profile.js"

const store = configureStore({
    reducer: { auth, admin, vendor, product, profile }
})


export default store