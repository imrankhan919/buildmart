// Central source of truth for Gemini model ids.
// Verified live (Sep 2026) via ModelService.ListModels + test generations:
// - gemini-2.5-flash-image and gemini-3.1-flash-image-preview both exist and
//   support generateContent (2D uses 3.1-preview, 3D edit uses 2.5-flash-image).
//   NOTE: image generation currently 429s on this project's free tier
//   (limit 0) — the Pollinations fallback in genrateImageController.js covers it.
// - gemini-2.5-flash / gemini-2.5-flash-lite are retired for new users (404).
//   gemini-3.5-flash works for text incl. responseSchema JSON mode -> BOM.
//   gemini-flash-latest was 503 (overloaded) at verification time, avoid pinning it.

export const GEMINI_IMAGE_MODEL_2D = "gemini-3.1-flash-image-preview";
export const GEMINI_IMAGE_MODEL_3D = "gemini-2.5-flash-image";
export const GEMINI_TEXT_MODEL = "gemini-3.5-flash";

// Credit costs (tunable constants, mirrored in controller logic comments).
export const CREDIT_COST_2D = 2;
export const CREDIT_COST_3D = 3;
export const CREDIT_COST_BOM = 1;
