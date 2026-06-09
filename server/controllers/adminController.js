import CreditRequest from "../models/creditRequestModel.js"
import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"
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
    const products = await Product.find()

    if (!products) {
        res.status(404)
        throw new Error("Product Not Found!")
    }



    res.status(200).json(products)
}


const getAllOrders = async (req, res) => {
    const orders = await Order.find()

    if (!orders) {
        res.status(404)
        throw new Error("Orders Not Found!")
    }



    res.status(200).json(orders)
}


const getAllRatings = async (req, res) => {
    res.send("All Ratings Here")
}

const updateCredits = async (req, res) => {

    const requestId = req.params.rid
    const { isGranted } = req.body

    const status = JSON.parse(isGranted)


    if (!isGranted) {
        res.status(409)
        throw new Error('Status Not Found!')
    }

    const creditRequest = await CreditRequest.findById(requestId)
    const user = await User.findById(creditRequest.user)

    if (!creditRequest) {
        res.status(404)
        throw new Error("Credit Request Not Found!")
    }

    const updatedRequest = await CreditRequest.findByIdAndUpdate(requestId, { isGranted: status })


    if (status) {
        const updatedUser = await User.findByIdAndUpdate(creditRequest.user, { credits: creditRequest.credits + user.credits }, { new: true })
        res.status(200).json({
            message: "Credits Granted",
            creditRequest: updatedRequest
        })
    } else {
        res.status(409)
        throw new Error("Credits Not Granted!")
    }


}




const adminController = { getAllUsers, getAllOrders, getAllProducts, getAllRatings, getAllVendors, updateUser, updateVendor, updateCredits }

export default adminController