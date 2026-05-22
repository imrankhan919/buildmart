import express from "express"
import protect from "../middleware/authMiddleware.js"
import generateImageController from "../controllers/genrateImageController.js"


const router = express.Router()


router.post("/floor-plan", protect.forUser, generateImageController.generateFloorPlan)


export default router