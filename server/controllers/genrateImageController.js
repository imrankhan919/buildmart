import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

// async function main() {

//   const ai = new GoogleGenAI({});

//   const prompt =
//     "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme";

//   const response = await ai.models.generateContent({
//     model: "gemini-3.1-flash-image-preview",
//     contents: prompt,
//   });
//   for (const part of response.candidates[0].content.parts) {
//     if (part.text) {
//       console.log(part.text);
//     } else if (part.inlineData) {
//       const imageData = part.inlineData.data;
//       const buffer = Buffer.from(imageData, "base64");
//       fs.writeFileSync("gemini-native-image.png", buffer);
//       console.log("Image saved as gemini-native-image.png");
//     }
//   }
// }

// main();


const generateFloorPlan = async (req, res) => {

    const { plotSize, floors, extraInforation } = req.body


    const prompt = `Architectural 2D floor plan, top-down view, blueprint style.

Plot size: ${plotSize}
Floors: ${floors}
Rooms: ${extraInforation}

Style: Clean architectural drawing, white background, black walls (thick lines), room labels in Arial font, dimensions marked on edges, doors shown as arcs, windows as parallel lines on walls. North arrow in top-right corner. Scale bar at bottom. Each room clearly labeled with name and size in square feet.
Strictly flat 2D overhead plan. Professional blueprint aesthetic.`



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
            fs.writeFileSync("gemini-native-image.png", buffer);
            console.log("Image saved as gemini-native-image.png");
        }
    }

    res.json({
        message: "Floor Plan Generated!"
    })


}


const generateImageController = { generateFloorPlan }


export default generateImageController