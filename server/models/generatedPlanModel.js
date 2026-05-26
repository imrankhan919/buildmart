import mongoose from "mongoose";

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
    }

}, {
    timestamps: true
})

const GeneratedPlan = mongoose.model("GeneratedPlan", generatedPlanSchema)

export default GeneratedPlan