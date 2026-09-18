import dns from "dns"
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import colors from "colors";
import dotenv from "dotenv"
import connectDB from "../config/dbConfig.js";
import User from "../models/userModel.js"
import Vendor from "../models/vendorModel.js"
import Product from "../models/productModel.js"
import { BOM_CATEGORIES } from "../utils/bomCategories.js";

dotenv.config()

const img = (seed) => `https://picsum.photos/seed/${seed}/400`;

const seedVendors = [
    { name: "Narmada Building Materials", email: "vendor-cement@buildmart.in", phone: "9000000001", address: "Shop 402, Loha Mandi, Indore, MP", category: "Cement & Sand", owner: "Ramesh Khandelwal" },
    { name: "Khandelwal Iron & Steel", email: "vendor-steel@buildmart.in", phone: "9000000002", address: "14, Industrial Area, Bhopal, MP", category: "Steel & TMT", owner: "Suresh Khandelwal" },
    { name: "Shri Ram Brick Kiln", email: "vendor-bricks@buildmart.in", phone: "9000000003", address: "Sanwer Road, Indore, MP", category: "Bricks & Blocks", owner: "Ramprasad Sharma" },
    { name: "Somany Tiles Plaza", email: "vendor-tiles@buildmart.in", phone: "9000000004", address: "MG Road, Mumbai, MH", category: "Tiles & Flooring", owner: "Kavita Somany" },
    { name: "Malwa Timber & Doors", email: "vendor-wood@buildmart.in", phone: "9000000005", address: "Timber Market, Pune, MH", category: "Wood & Doors", owner: "Arjun Malhotra" },
    { name: "FinishWell Traders", email: "vendor-finish@buildmart.in", phone: "9000000006", address: "Nehru Nagar, Delhi", category: "Paint & Finishing", owner: "Neelam Gupta" },
];

// [vendorIndex, category, name, price, stock, imageSeed]
const seedProducts = [
    [0, "Cement", "UltraTech OPC 53 Grade Cement — 50kg bag", 410, 500, "cement1"],
    [0, "Cement", "Ambuja Kawach Waterproof Cement — 50kg bag", 455, 300, "cement2"],
    [0, "Cement", "Birla Gold PPC Cement — 50kg bag", 365, 400, "cement3"],
    [1, "Steel", "Kamdhenu Fe-550 TMT Steel Rebars — per kg", 58, 2000, "steel1"],
    [1, "Steel", "Tata Tiscon Fe-550 TMT Bars — per kg", 62, 1500, "steel2"],
    [1, "Steel", "Binding Wire 18 Gauge — per kg coil", 72, 400, "steel3"],
    [2, "Bricks", "Premium Red Clay Bricks First Class — per piece", 8, 20000, "brick1"],
    [2, "Bricks", "Flyash Blocks 6 inch — per piece", 42, 5000, "brick2"],
    [2, "Bricks", "AAC Lightweight Blocks — per piece", 65, 3000, "brick3"],
    [0, "Sand", "Washed River Sand — per cubic foot", 52, 1000, "sand1"],
    [0, "Sand", "M-Sand Manufactured Sand — per cubic foot", 45, 1200, "sand2"],
    [0, "Aggregate", "20mm Crushed Stone Aggregate — per cubic foot", 48, 1500, "agg1"],
    [0, "Aggregate", "Stone Dust Crusher Sand — per cubic foot", 38, 900, "agg2"],
    [3, "Tiles", "Vitrified Glazed Tiles 2x2 ft Ivory — per sq.ft", 45, 4000, "tile1"],
    [3, "Tiles", "Ceramic Wall Tiles Glossy — per sq.ft", 32, 3500, "tile2"],
    [4, "Wood", "Seasoned Teak Wood — per cubic foot", 2800, 200, "wood1"],
    [4, "Wood", "Waterproof Plywood 19mm — per sq.ft", 95, 800, "wood2"],
    [5, "Paint", "Asian Paints Apex Exterior Emulsion — per litre", 320, 600, "paint1"],
    [5, "Paint", "Wall Primer Interior — per litre", 180, 500, "paint2"],
    [5, "Electrical", "Polycab Copper Wire 1.5 sqmm 90m coil", 1450, 150, "elec1"],
    [5, "Electrical", "Modular Switches 16A Pack of 8", 640, 300, "elec2"],
    [5, "Plumbing", "Supreme PVC Pipes 4 inch 6m — per piece", 240, 700, "plumb1"],
    [5, "Plumbing", "CPVC Fittings Set Bathroom — per set", 1150, 250, "plumb2"],
    [5, "Roofing", "RCC Cement Roofing Sheets — per piece", 450, 600, "roof1"],
    [5, "Roofing", "Dr Fixit Waterproofing Compound 20kg", 550, 350, "roof2"],
];

const seedProductsCatalog = async () => {
    try {
        await connectDB();
        console.log("DB connected for seeding");

        const unknown = new Set(seedProducts.map(([, c]) => c).filter((c) => !BOM_CATEGORIES.includes(c)));
        if (unknown.size > 0) throw new Error("Seed uses categories outside BOM enum: " + [...unknown].join(", "));

        const vendorIds = [];
        for (const v of seedVendors) {
            let user = await User.findOne({ email: v.email });
            if (!user) {
                const password = await bcrypt.hash("password123", 10);
                user = await User.create({
                    name: v.owner,
                    email: v.email,
                    phone: v.phone,
                    password,
                    isVendor: true,
                    isActive: true,
                    credits: 20,
                });
                console.log("Created vendor user: " + v.email);
            }
            let vendor = await Vendor.findOne({ email: v.email });
            if (!vendor) {
                vendor = await Vendor.create({
                    user: user._id,
                    name: v.name,
                    phone: v.phone,
                    email: v.email,
                    address: v.address,
                    category: v.category,
                    status: "active",
                });
                console.log("Created vendor: " + v.name);
            }
            vendorIds.push(vendor._id);
        }

        const existingNames = new Set((await Product.find({}).select("name").lean()).map((p) => p.name));
        const docs = seedProducts
            .filter(([, , name]) => !existingNames.has(name))
            .map(([vi, category, name, price, stock, seed]) => ({
                name,
                description: `${name}. Genuine quality, bulk supply available with transparent per-unit pricing.`,
                price,
                image: img(seed),
                category,
                stock,
                vendor: vendorIds[vi],
                isActive: true,
            }));

        if (docs.length === 0) {
            console.log("All seed products already present, nothing to insert.");
            process.exit(0);
        }

        await Product.insertMany(docs);
        console.log(docs.length + " Products Inserted!");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedProductsCatalog();
