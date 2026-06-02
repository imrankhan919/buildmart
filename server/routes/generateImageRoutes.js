import express from "express"
import protect from "../middleware/authMiddleware.js"
import generateImageController from "../controllers/genrateImageController.js"


const router = express.Router()


router.get("/floor-plan", protect.forUser, generateImageController.getFloorPlans)
router.post("/floor-plan", protect.forUser, generateImageController.generateFloorPlan)
router.post("/final-plan/:pid", protect.forUser, generateImageController.generateFinalPlan)


export default router