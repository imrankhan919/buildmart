import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import path from "node:path";
import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import GeneratedPlan from "../models/generatedPlanModel.js";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}


// Generate 2d Plan

const generate2DPlan = async (userId, prompt) => {

    let imageURL

    try {
        const ai = new GoogleGenAI({});
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-image-preview",
            contents: prompt,
        });
        for (const part of response.candidates[0].content.parts) {
            if (part.text) {
                console.log(part.text);
            } else if (part.inlineData) {
                const imageData = part.inlineData.data;
                const buffer = Buffer.from(imageData, "base64");
                // Create File Name
                const fileName = Date.now() + userId + ".png"
                // Add File Path
                const filePath = path.join(UPLOADS_DIR, fileName);
                // Save File
                fs.writeFileSync(filePath, buffer);
                // Upload To Cloudinary
                const uploadResult = await uploadToCloudinary(filePath)
                // Remove From Server
                fs.unlinkSync(filePath)
                // Return 2D Plan
                imageURL = uploadResult.secure_url
            }
        }

        return imageURL

    } catch (error) {
        throw new Error("2D Plan Generation Failed!")
    }
}


const generateFloorPlan = async (req, res) => {

    const { plotSize, floors, extraInforation } = req.body

    const userId = req.user._id


    const prompt = `Architectural 2D floor plan, top-down view, blueprint style.
    Plot size: ${plotSize}
    Floors: ${floors}
    Rooms: ${extraInforation}
    Style: Clean architectural drawing, white background, black walls (thick lines), room labels in Arial font, dimensions marked on edges, doors shown as arcs, windows as parallel lines on walls. North arrow in top-right corner. Scale bar at bottom. Each room clearly labeled with name and size in square feet.
    Strictly flat 2D overhead plan. Professional blueprint aesthetic.`



    const floorPlan = await generate2DPlan(userId, prompt)

    console.log(floorPlan)

    // Create Floor Plan In DB
    const plan = new GeneratedPlan({
        user: userId,
        floorPlan: floorPlan
    })

    if (!floorPlan) {
        res.status(409)
        throw new Error("Cannot Generate Floor Plan")
    }

    await plan.save()
    await plan.populate('user')



    res.status(201).json(plan)


}


const generateImageController = { generateFloorPlan }


export default generateImageController