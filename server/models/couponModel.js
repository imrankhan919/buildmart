import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    couponCode: {
        type: String,
        required: true
    },
    couponDiscount: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
})

const Coupon = mongoose.model('Coupon', couponSchema)


export default Coupon