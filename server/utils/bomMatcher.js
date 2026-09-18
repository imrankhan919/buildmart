import Product from "../models/productModel.js";
import { CATEGORY_SYNONYMS, canonicalCategory } from "./bomCategories.js";

const STOPWORDS = new Set([
    "grade", "premium", "super", "with", "from", "type", "best", "high",
    "quality", "standard", "general", "required", "approx", "about", "per",
    "inch", "feets", "feet", "meter", "brand", "local", "good", "fine",
]);

const significantWords = (text) =>
    String(text || "")
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length >= 3 && !STOPWORDS.has(w));

// Match one BOM item against the live catalog.
// Returns up to 3 matches sorted by keyword score desc, then price asc.
export const matchBomItem = async ({ category, item }) => {
    const canonical = canonicalCategory(category);
    if (!canonical) return [];

    const variants = [canonical, ...(CATEGORY_SYNONYMS[canonical] || [])];
    const categoryRegexes = variants.map((v) => new RegExp(`^${v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"));

    const candidates = await Product.find({
        isActive: true,
        stock: { $gt: 0 },
        category: { $in: categoryRegexes },
    }).populate("vendor", "name");

    const keywords = significantWords(item);
    const scored = candidates
        .map((p) => {
            const haystack = `${p.name} ${p.description || ""}`.toLowerCase();
            const score = keywords.filter((k) => haystack.includes(k)).length;
            return { p, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score || a.p.price - b.p.price)
        .slice(0, 3);

    return scored.map(({ p }) => ({
        product: p._id,
        vendorName: p.vendor?.name || "",
        price: p.price,
        unit: p.unit || "",
    }));
};

// NOTE: Product schema has no dedicated unit field; vendors encode the unit in
// the product name/description (e.g. "50kg bag"). match.unit is therefore the
// matched product's own unit string when present, else "".
