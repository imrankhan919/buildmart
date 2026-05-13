import express from "express"
import protect from "../middleware/authMiddleware.js"
import cartController from "../controllers/cartController.js"


const router = express.Router()


router.get("/", protect.forUser, cartController.getCart)
router.post("/", protect.forUser, cartController.addToCart)
router.put("/", protect.forUser, cartController.updateCart)
router.delete("/", protect.forUser, cartController.removeCart)

export default router