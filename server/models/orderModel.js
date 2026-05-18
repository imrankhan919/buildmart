import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            qty: {
                type: Number,
                min: [1, "Qty Atleast Be One"],
                required: true
            },
            purchasedPrice: {
                type: Number,
                required: true
            },
            _id: false
        }
    ],
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    status: {
        type: String,
        enum: ["placed", "dispatch", "delivered", "cancelled"],
        required: true
    },
    isDiscounted: {
        type: Boolean,
        required: true,
        default: false
    },
    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
        required: true
    },
    totalBillAmount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})


const Order = mongoose.model("Order", orderSchema)

export default Order