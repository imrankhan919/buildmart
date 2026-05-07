import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import connectDB from "./config/dbConfig.js"
dotenv.config()

// Local Imports
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import vendorRoutes from "./routes/vendorRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import couponRoutes from "./routes/couponRoutes.js"
import errorHandler from "./middleware/errorHandler.js"

const PORT = process.env.PORT || 5000
const app = express()

// Body Parser
app.use(express.json())
app.use(express.urlencoded())


// DB Connection
connectDB()



app.get("/", (req, res) => {
    res.status(200).json({
        message: "WELCOME TO BUILDMART API 1.0..."
    })
})


// Auth Routes
app.use("/api/auth", authRoutes)

// Admin Routes
app.use("/api/admin", adminRoutes)


// Vendor Routes
app.use("/api/vendor", vendorRoutes)


// Product Routes
app.use("/api/products", productRoutes)

// Coupon Routes
app.use("/api/coupons", couponRoutes)


// Error Handler
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue.black)
})