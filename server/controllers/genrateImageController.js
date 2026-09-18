import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import fetch from "node-fetch";
import path from "node:path";
import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import GeneratedPlan from "../models/generatedPlanModel.js";
import User from "../models/userModel.js"
import { GEMINI_IMAGE_MODEL_2D, GEMINI_IMAGE_MODEL_3D, GEMINI_TEXT_MODEL, CREDIT_COST_2D, CREDIT_COST_3D, CREDIT_COST_BOM } from "../config/aiModels.js";
import { roomListFor, isVastuStyle } from "../utils/planRooms.js";
import { BOM_CATEGORIES } from "../utils/bomCategories.js";
import { matchBomItem } from "../utils/bomMatcher.js";


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}


// ---- Pollinations fallback (free FluxCommunity, no key) ----
// Used only when Gemini fails (429 quota / 5xx). Same contract as the Gemini
// helpers: returns a Cloudinary secure_url string, throws on failure.
// If POLLINATIONS_API_KEY (secret sk_ key, server-side only) is set, requests
// go authenticated to the unified endpoint (no anonymous rate limits).
// Otherwise the anonymous endpoint is used.
const pollinationsConfig = () => {
    const apiKey = process.env.POLLINATIONS_API_KEY;
    if (apiKey) {
        return {
            base: "https://gen.pollinations.ai/image",
            headers: { Authorization: `Bearer ${apiKey}` },
        };
    }
    return { base: POLLINATIONS_BASE, headers: {} };
};

const downloadAndUpload = async (imageEndpointUrl, fileName) => {
    const { headers } = pollinationsConfig();
    const response = await fetch(imageEndpointUrl, { headers, signal: AbortSignal.timeout(180000) });
    if (!response.ok) {
        throw new Error(`Pollinations request failed: ${response.status}`);
    }
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
        throw new Error("Pollinations did not return an image");
    }
    const ext = contentType.split("/")[1]?.split(";")[0] || "png";
    const filePath = path.join(UPLOADS_DIR, `${fileName}.${ext}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    try {
        const uploadResult = await uploadToCloudinary(filePath);
        return uploadResult.secure_url;
    } finally {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
};

const generatePollinations2D = async (userId, prompt) => {
    const { base } = pollinationsConfig();
    const url = `${base}/${encodeURIComponent(prompt)}?model=flux&width=1024&height=1024`;
    return downloadAndUpload(url, `poll2d_${Date.now()}_${userId}`);
};

const generatePollinations3D = async (sourceImageUrl, prompt) => {
    const { base } = pollinationsConfig();
    const url = `${base}/${encodeURIComponent(prompt)}?model=kontext&image=${encodeURIComponent(sourceImageUrl)}&width=1024&height=1024`;
    return downloadAndUpload(url, `poll3d_${Date.now()}`);
};



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
            model: GEMINI_IMAGE_MODEL_3D, // ✅ Fixed model name
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
            model: GEMINI_IMAGE_MODEL_2D,
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

    // Structured inputs (replaces the old squashed plotSize/extraInformation strings).
    const { plotLength, plotWidth, floors, rooms, layoutStyle, notes } = req.body

    if (!plotLength || !plotWidth || !floors || !rooms || !layoutStyle) {
        res.status(409)
        throw new Error("Please fill all details...")
    }


    const userId = req.user._id

    const user = await User.findById(userId)


    // Check if sufficient credits exist
    if (req.user.credits >= CREDIT_COST_2D) {

        const updatedUser = await User.findByIdAndUpdate(userId, { credits: user.credits - CREDIT_COST_2D }, { new: true })


        const roomList = roomListFor(rooms);
        const aspectRatio = (Number(plotLength) / Number(plotWidth)).toFixed(2);
        const vastuBlock = isVastuStyle(layoutStyle)
            ? `Vastu compliance (mandatory for this plan): main entrance facing east or north; kitchen in the south-east corner; master bedroom in the south-west; pooja/meditation space in the north-east; toilets in the north-west or south-east, never the north-east.`
            : `No Vastu constraints apply; optimize purely for light, ventilation, and circulation.`;
        const prompt = `Architectural 2D floor plan, strictly top-down orthographic view, professional blueprint style.
        Site:
        - Plot dimensions: ${plotLength} ft (length) x ${plotWidth} ft (width). Aspect ratio ${aspectRatio}. Respect this exact footprint and proportion in the layout.
        - Number of floors to show: ${floors}. Draw the ground-floor layout.
        - Required rooms (include every one, correctly proportioned): ${roomList.join(", ")}.
        - Layout philosophy: ${layoutStyle}.
        - Client notes: ${notes || "none"}.
        Drawing conventions (mandatory):
        - White background, thick black wall lines, thin grey partition lines.
        - Every room labeled in Arial font with name and size in square feet.
        - Doors shown as quarter-circle swing arcs, windows as parallel lines breaking the wall.
        - Dimensions marked along the outer edges, north arrow in the top-right corner, scale bar at the bottom.
        - Indian NBC standard room sizing with clear circulation paths, optimal natural light and ventilation.

        ${vastuBlock}

        Negative constraints (mandatory): flat 2D line drawing only — no furniture, no color fill, no shading gradients, no people, no watermark or logo text, no photorealistic or 3D rendering of any kind.`;

        const floorPlan = await generate2DImage(userId, prompt).catch(async (geminiError) => {
            console.error("Gemini 2D failed, trying Pollinations fallback:", geminiError?.message);
            return generatePollinations2D(userId, prompt);
        });

        // Create Floor Plan In DB
        const plan = new GeneratedPlan({
            user: userId,
            floorPlan: floorPlan,
            plotLength: Number(plotLength),
            plotWidth: Number(plotWidth),
            floors: Number(floors),
            rooms,
            layoutStyle,
            notes: notes || ""
        })

        if (!floorPlan) {
            res.status(409)
            throw new Error("Cannot Generate Floor Plan")
        }
        await plan.save()
        await plan.populate('user')
        res.status(201).json(plan)
    } else {
        res.status(409)
        throw new Error("Not Sufficient Credits")
    }

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

    const { numberOfFloors, plotSize, facingDirection, architecturalStyle, wallFinish, roofType, balcony, additionalFeatures } = req.body


    const pid = req.params.pid
    const userId = req.user._id
    const user = await User.findById(userId)

    const plan = await GeneratedPlan.findById(pid)

    if (!plan) {
        res.status(404)
        throw new Error("Plan Not Exist...")
    }


    // Check if sufficient credits exits
    if (req.user.credits >= CREDIT_COST_3D) {

        const updatedUser = await User.findByIdAndUpdate(userId, { credits: user.credits - CREDIT_COST_3D }, { new: true })


        const prompt = `Analyze this 2D floor plan and generate a photorealistic 3D exterior elevation image of this exact house. Match the footprint, floor count, and room arrangement visible in the plan.

    Building details:
    - number of floors ${numberOfFloors}
    - plot size  ${plotSize}
    - facing direction ${facingDirection}
    - architectural style ${architecturalStyle}
    - wall finish ${wallFinish}
    - roof type ${roofType}
    - balcony ${balcony}
    - additional features ${additionalFeatures}

    Camera and lighting convention (always the same): 3/4 aerial perspective view from the front-left, golden hour lighting, clear blue sky background, lush but neutral surroundings.

    Render as: photorealistic architectural visualization, 8K ultra-detailed, sharp focus, hyper-realistic materials and textures.

    Negative constraints (mandatory): no people, no animals, no vehicles, no unrelated neighboring buildings in frame, no text overlays, no watermarks, no logos.`


        let finalPlan = await generate3dImage(plan?.floorPlan, prompt)

        // generate3dImage resolves { error } instead of throwing on failure.
        if (!finalPlan || finalPlan.error) {
            console.error("Gemini 3D failed, trying Pollinations fallback:", finalPlan?.error);
            finalPlan = await generatePollinations3D(plan?.floorPlan, prompt);
        }

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
    } else {
        res.status(409)
        throw new Error("Not Sufficient Credits")
    }

}


// Generate Bill of Materials (AI quantity surveyor, text model)
const generateBOM = async (req, res) => {

    const pid = req.params.pid
    const userId = req.user._id

    const plan = await GeneratedPlan.findById(pid)

    if (!plan) {
        res.status(404)
        throw new Error("Plan Not Exist...")
    }

    if (plan.user.toString() !== userId.toString()) {
        res.status(403)
        throw new Error("Not authorised to access this plan")
    }

    const user = await User.findById(userId)

    // CREDIT_COST_BOM is the tunable constant (currently 1 credit: single text
    // completion, not image generation). Costs live in server/config/aiModels.js.
    if (req.user.credits >= CREDIT_COST_BOM) {

        const updatedUser = await User.findByIdAndUpdate(userId, { credits: user.credits - CREDIT_COST_BOM }, { new: true })

        const builtUpArea = (Number(plan.plotLength) || 0) * (Number(plan.plotWidth) || 0) * 0.9 * (Number(plan.floors) || 1)

        const prompt = `You are a quantity surveyor for residential construction in India, following Indian NBC standards.
Given the house below, produce a realistic bill of materials scaled to its size. Cover structural materials (cement, steel/TMT bars, bricks, sand, aggregate), finishing (tiles, paint, wood for doors/windows), utilities (electrical wiring, plumbing pipes), and roofing.

House:
- Plot: ${plan.plotLength} ft x ${plan.plotWidth} ft (approx ${Math.round(builtUpArea)} sq ft built-up area across ${plan.floors} floor(s))
- Configuration: ${plan.rooms}, style: ${plan.layoutStyle}
- Client notes: ${plan.notes || "none"}

Rules:
- "category" MUST be exactly one of: ${BOM_CATEGORIES.join(", ")}.
- Quantities must be realistic numbers for the built-up area above (cement in 50kg bags, steel in kg, bricks in pieces, sand/aggregate in cubic feet or brass, tiles in sq.ft, paint in litres, wiring in metres/coils, pipes in metres, wood in cubic feet, roofing sheets in pieces).
- "assumptions" is one short paragraph summarising the construction assumptions you made (e.g. load-bearing vs framed structure, finish level).`

        const response = await ai.models.generateContent({
            model: GEMINI_TEXT_MODEL,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "object",
                    properties: {
                        assumptions: { type: "string" },
                        items: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    category: { type: "string" },
                                    item: { type: "string" },
                                    quantity: { type: "number" },
                                    unit: { type: "string" },
                                    notes: { type: "string" },
                                },
                                required: ["category", "item", "quantity", "unit"],
                            },
                        },
                    },
                    required: ["assumptions", "items"],
                },
            },
        });

        // Strip code fences defensively; some SDK versions wrap JSON output.
        const rawText = String(response.text || "").replace(/```json|```/g, "").trim();
        let parsed;
        try {
            parsed = JSON.parse(rawText);
        } catch (parseError) {
            console.error("BOM JSON parse failed:", parseError?.message);
            res.status(409)
            throw new Error("Could not generate bill of materials, please retry")
        }

        const items = [];
        for (const entry of parsed.items || []) {
            const matches = await matchBomItem({ category: entry.category, item: entry.item });
            items.push({
                category: entry.category,
                item: entry.item,
                quantity: Number(entry.quantity) || 0,
                unit: entry.unit || "",
                notes: entry.notes || "",
                available: matches.length > 0,
                matches,
            });
        }

        const updatedPlan = await GeneratedPlan.findByIdAndUpdate(
            pid,
            { billOfMaterials: { generatedAt: new Date(), assumptions: parsed.assumptions || "", items } },
            { new: true }
        );

        if (!updatedPlan) {
            res.status(409)
            throw new Error("Plan Not Updated!")
        }

        res.status(200).json(updatedPlan)
    } else {
        res.status(409)
        throw new Error("Not Sufficient Credits")
    }

}


const generateImageController = { generateFloorPlan, getFloorPlans, generateFinalPlan, generateBOM }


export default generateImageController
