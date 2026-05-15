import express from "express"
import protect from "../middleware/authMiddleware.js"
import orderController from "../controllers/orderController.js"


const router = express.Router()


router.post("/", protect.forUser, orderController.createOrder)


export default router