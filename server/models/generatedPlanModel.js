import mongoose from "mongoose";

const bomMatchSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    vendorName: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        default: 0
    },
    unit: {
        type: String,
        default: ""
    }
}, { _id: false });

const bomItemSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        default: ""
    },
    notes: {
        type: String,
        default: ""
    },
    available: {
        type: Boolean,
        default: false
    },
    matches: {
        type: [bomMatchSchema],
        default: []
    }
}, { _id: false });

const generatedPlanSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    floorPlan: {
        type: String,
        required: true
    },
    finalDesign: {
        type: String,
        default: null
    },
    // Structured inputs captured at generation time (used for prompts + BOM).
    plotLength: {
        type: Number,
        default: null
    },
    plotWidth: {
        type: Number,
        default: null
    },
    floors: {
        type: Number,
        default: null
    },
    rooms: {
        type: String,
        default: null
    },
    layoutStyle: {
        type: String,
        default: null
    },
    notes: {
        type: String,
        default: ""
    },
    billOfMaterials: {
        generatedAt: {
            type: Date,
            default: null
        },
        assumptions: {
            type: String,
            default: ""
        },
        items: {
            type: [bomItemSchema],
            default: []
        }
    }

}, {
    timestamps: true
})

const GeneratedPlan = mongoose.model("GeneratedPlan", generatedPlanSchema)

export default GeneratedPlan
