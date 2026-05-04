import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    name: {
        type: String,
        required: [true, "Please Fill Vendor Name!"]
    },
    phone: {
        type: String,
        required: [true, "Please Fill Vendor Phone!"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please Fill Vendor Email!"]
    },
    address: {
        type: String,
        required: [true, "Please Fill Vendor Address!"]
    },
    category: {
        type: String,
        required: [true, "Please Fill Vendor Phone!"]
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "pending", "suspended", "hold"],
        default: "pending"
    }
}, {
    timestamps: true
})

const Vendor = mongoose.model('Vendor', vendorSchema)

export default Vendor