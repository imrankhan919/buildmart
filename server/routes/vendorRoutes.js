import express from "express"
import protect from "../middleware/authMiddleware.js"
import vendorController from "../controllers/vendorController.js"
import upload from "../middleware/imageUploadMiddleware.js"

const router = express()

router.get("/profiles", vendorController.getVendors)
router.get("/profiles/:vid", vendorController.getVendor)

router.post("/request", protect.forUser, vendorController.becomeVendor)
router.get("/product", protect.forUser, vendorController.getMyProducts)
router.post("/product", protect.forUser, upload.single('image'), vendorController.addProduct)
router.put("/product/:pid", protect.forUser, upload.single('image'), vendorController.updateProduct)
router.post("/coupon", protect.forUser, vendorController.createCoupon)
router.put("/coupon/:cid", protect.forUser, vendorController.updateCoupon)


export default router