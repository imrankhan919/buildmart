import express from "express"
import protect from "../middleware/authMiddleware.js"
import vendorController from "../controllers/vendorController.js"
import upload from "../middleware/imageUploadMiddleware.js"

const router = express()


router.post("/request", protect.forUser, vendorController.becomeVendor)

router.post("/product", protect.forUser, upload.single('image'), vendorController.addProduct)


export default router