import express from "express"
import protect from "../middleware/authMiddleware.js"
import couponController from "../controllers/couponController.js"


const router = express.Router()


router.get("/", protect.forUser, couponController.getCoupons)



export default router