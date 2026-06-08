import express from "express"
import protect from "../middleware/authMiddleware.js"
import creditController from "../controllers/creditController.js"


const router = express.Router()

router.get("/", protect.forUser, creditController.getCreditsHistory)
router.post("/", protect.forUser, creditController.requestCredits)


export default router