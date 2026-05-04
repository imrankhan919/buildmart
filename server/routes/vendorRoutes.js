import express from "express"
import protect from "../middleware/authMiddleware.js"
import vendorController from "../controllers/vendorController.js"

const router = express()


router.post("/request", protect.forUser, vendorController.becomeVendor)



export default router