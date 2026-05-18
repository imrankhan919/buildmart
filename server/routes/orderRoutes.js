import express from "express"
import protect from "../middleware/authMiddleware.js"
import orderController from "../controllers/orderController.js"


const router = express.Router()


router.post("/", protect.forUser, orderController.createOrder)
router.get("/", protect.forUser, orderController.getMyOrders)
router.get("/:oid", protect.forUser, orderController.getMyOrder)
router.put("/:oid", protect.forUser, orderController.cancelOrder)


export default router