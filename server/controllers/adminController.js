import User from "../models/userModel.js"
import Vendor from "../models/vendorModel.js"

const getAllUsers = async (req, res) => {
    const users = await User.find()

    if (!users) {
        res.status(404)
        throw new Error("Users Not Found!")
    }

    res.status(200).json(users)
}

const updateUser = async (req, res) => {
    res.send("Update User")
}

const getAllVendors = async (req, res) => {

    const vendors = await Vendor.find()

    if (!vendors) {
        res.status(404)
        throw new Error("Vendors Not Found!")
    }

    res.status(200).json(vendors)

}

const updateVendor = async (req, res) => {

    const vendorId = req.params.vid
    const { status } = req.body

    if (!status) {
        res.status(409)
        throw new Error("Please Add Status!")
    }

    const vendor = await Vendor.findById(vendorId)

    if (!vendor) {
        res.status(404)
        throw new Error("Vendor Not Found!")
    }


    const updatedVendor = await Vendor.findByIdAndUpdate(vendor._id, { status }, { new: true })

    if (!updateVendor) {
        res.status(409)
        throw new Error("Vendor Not Updated")
    }

    let user = await User.findById(vendor.user)

    if (!user) {
        res.status(409)
        throw new Error("Invalid User Id")
    }

    await User.findByIdAndUpdate(user._id, { isVendor: true }, { new: true })

    res.status(200).json(vendor)

}


const getAllProducts = async (req, res) => {
    res.send("All Products")
}


const getAllOrders = async (req, res) => {
    res.send("All Orders Here")
}


const getAllRatings = async (req, res) => {
    res.send("All Ratings Here")
}


const updateProduct = async (req, res) => {
    res.send("Product Update")
}




const adminController = { getAllUsers, getAllOrders, getAllProducts, getAllRatings, getAllVendors, updateUser, updateVendor, updateProduct }

export default adminController