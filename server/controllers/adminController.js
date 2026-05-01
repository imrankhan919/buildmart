import User from "../models/userModel.js"

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
    res.send("Get All Vendors")
}

const updateVendor = async (req, res) => {
    res.send("Update Vendor")
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