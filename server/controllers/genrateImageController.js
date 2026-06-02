import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import fetch from "node-fetch";
import path from "node:path";
import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import GeneratedPlan from "../models/generatedPlanModel.js";


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}



const fetchImageAsBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.buffer();
    const base64 = buffer.toString("base64");

    return { base64, mimeType: contentType.split(";")[0] };
}

const generate3dImage = async (imageURL, prompt) => {
    try {
        const { mimeType, base64 } = await fetchImageAsBase64(imageURL);
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-image", // ✅ Fixed model name
            contents: [
                {
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType,
                                data: base64,
                            },
                        },
                    ],
                },
            ],
            config: {
                responseModalities: ["IMAGE", "TEXT"],
            },
        });

        const parts = response.candidates?.[0]?.content?.parts ?? [];
        const imagePart = parts.find((p) => p.inlineData);
        const ext = imagePart.inlineData.mimeType.split("/")[1] || "png";
        const filename = `styled_${Date.now()}.${ext}`;
        const filePath = path.join(UPLOADS_DIR, filename);
        const imageBuffer = Buffer.from(imagePart.inlineData.data, "base64");
        fs.writeFileSync(filePath, imageBuffer);
        const uploadedResult = await uploadToCloudinary(filePath)
        // Remove From Server
        fs.unlinkSync(filePath)
        return uploadedResult.secure_url

    } catch (error) {
        console.error(error);
        return { error: error.message || "Image Generation Failed!" }
    }
}





// Generate 2d Plan

const generate2DImage = async (userId, prompt) => {

    let imageURL

    try {
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



    const floorPlan = await generate2DImage(userId, prompt)

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


const getFloorPlans = async (req, res) => {

    const userId = req.user._id

    const floorPlans = await GeneratedPlan.find({ user: userId })

    if (!floorPlans) {
        res.status(404)
        throw new Error("Plans Not Found!")
    }

    res.status(200).json(floorPlans)
}

const generateFinalPlan = async (req, res) => {

    const pid = req.params.pid

    const plan = await GeneratedPlan.findById(pid)

    if (!plan) {
        res.status(404)
        throw new Error("Plan Not Exist...")
    }


    const prompt = `Analyze this 2D floor plan and generate a photorealistic 3D exterior elevation image of this exact house. 

Building details:
- Double storey (G+1), 60x90 ft plot, East facing
- Modern contemporary architectural style
- Smooth stucco walls, off-white primary color, dark brown trim accents
- Flat roof with parapet wall, front balcony with glass railing
- Large entrance door, floor-to-ceiling windows, LED facade lighting
- Landscaped front garden with pathway

Render as: photorealistic architectural visualization, 3/4 perspective view, golden hour lighting, 8K ultra-detailed, sharp focus, lush surroundings, blue sky background, no people, hyper-realistic materials and textures --ar 16:9`


    const finalPlan = await generate3dImage(plan?.floorPlan, prompt)

    if (!finalPlan) {
        res.status(409)
        throw new Error("Error in creating floor plan")
    }

    const updatedPlan = await GeneratedPlan.findByIdAndUpdate(pid, { finalDesign: finalPlan }, { new: true })

    if (!updatedPlan) {
        res.status(409)
        throw new Error("Plan Not Updated!")
    }

    res.status(200).json(updatedPlan)
}


const generateImageController = { generateFloorPlan, getFloorPlans, generateFinalPlan }


export default generateImageController