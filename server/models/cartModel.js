import { mongoose } from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        index: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,

        },
        qty: {
            type: Number,
            min: [1, "Qty cannot be less than one"],
            default: 1,
            required: true
        },
        _id: false
    }]
}, {
    timestamps: true
})


const Cart = mongoose.model('Cart', cartSchema)

export default Cart