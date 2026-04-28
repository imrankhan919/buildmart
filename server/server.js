import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import connectDB from "./config/dbConfig.js"
dotenv.config()

// Local Imports
import authRoutes from "./routes/authRoutes.js"


const PORT = process.env.PORT || 5000
const app = express()


// DB Connection
connectDB()



app.get("/", (req, res) => {
    res.status(200).json({
        message: "WELCOME TO BUILDMART API 1.0..."
    })
})


// Auth Routes
app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue.black)
})