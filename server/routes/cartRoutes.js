import express from "express"
import protect from "../middleware/authMiddleware.js"
import cartController from "../controllers/cartController.js"


const router = express.Router()


router.get("/", protect.forUser, cartController.getCart)
router.post("/", protect.forUser, cartController.addToCart)
router.put("/", protect.forUser, cartController.updateCart)
router.put("/:productId", protect.forUser, cartController.removeCart)
router.post("/clear", protect.forUser, cartController.clearCart)

export default router