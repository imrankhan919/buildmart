// Single source of truth for BOM material categories.
// Imported by: the BOM Gemini prompt, bomMatcher.js, and seed/products.js.
// Do not use different category strings anywhere in that flow.

export const BOM_CATEGORIES = [
    "Cement",
    "Steel",
    "Bricks",
    "Sand",
    "Aggregate",
    "Tiles",
    "Wood",
    "Paint",
    "Electrical",
    "Plumbing",
    "Roofing",
];

// Synonyms accepted when matching AI output or product catalog entries
// back to a canonical BOM_CATEGORIES value.
export const CATEGORY_SYNONYMS = {
    Cement: ["opc", "ppc", "concrete cement"],
    Steel: ["tmt", "rebar", "re-bar", "iron bars", "steel bars", "binding wire"],
    Bricks: ["brick", "blocks", "aac", "flyash", "fly ash"],
    Sand: ["river sand", "fine aggregate", "m-sand", "manufactured sand"],
    Aggregate: ["coarse aggregate", "gravel", "crushed stone", "stone chips", "metal"],
    Tiles: ["tile", "flooring", "vitrified", "ceramic", "marble", "granite"],
    Wood: ["timber", "plywood", "ply", "doors", "windows", "teak"],
    Paint: ["paints", "emulsion", "primer", "distemper", "putty"],
    Electrical: ["electric", "wiring", "wires", "cables", "switches", "mcb"],
    Plumbing: ["pipes", "pvc", "cpvc", "fittings", "taps", "sanitary"],
    Roofing: ["roof", "sheets", "rcc", "waterproofing", "shingles"],
};

export const canonicalCategory = (value) => {
    const text = String(value || "").trim().toLowerCase();
    if (!text) return null;
    const exact = BOM_CATEGORIES.find((c) => c.toLowerCase() === text);
    if (exact) return exact;
    for (const [canonical, synonyms] of Object.entries(CATEGORY_SYNONYMS)) {
        if (synonyms.some((s) => text.includes(s) || s.includes(text))) return canonical;
    }
    return null;
};
