import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Email"],
    },
    phone: {
        type: String,
        required: [true, "Please Enter Phone"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
    },
    isVendor: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    credits: {
        type: Number,
        required: true,
        default: 5
    },
    isActive: {
        type: Boolean,
        default: false,
        required: true
    }

}, {
    timestamps: true
})


const User = mongoose.model('User', userSchema)

export default User