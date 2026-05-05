import Product from "../models/productModel.js"
import Vendor from "../models/vendorModel.js"

const becomeVendor = async (req, res) => {

    const userId = req.user._id

    // Check if already requested
    const vendorExists = await Vendor.findOne({ user: userId })

    if (vendorExists.status === "rejected") {
        res.status(409)
        throw new Error("Can't Request Your Profile Is Rejected!")
    }

    if (vendorExists.status === "active") {
        res.status(409)
        throw new Error("Already Active Profile No Need To Request Again!")
    }

    if (vendorExists.status === "pending") {
        res.status(409)
        throw new Error("Already Requested Wait For Approval!")
    }

    // Check fields
    const { name, phone, email, category, address } = req.body

    if (!name || !phone || !email || !category || !address) {
        res.status(409)
        throw new Error("Please Fill All Details!")
    }

    const vendor = await Vendor.create({ name, user: userId, email, phone, category, address })

    if (!vendor) {
        res.status(409)
        throw new Error("Vendor Not Created!")
    }

    res.status(201).json(vendor)


}


const addProduct = async (req, res) => {

    const userId = req.user._id


    // check if vendor exists
    const vendor = await Vendor.findOne({ user: userId })

    if (!vendor) {
        res.status(404)
        throw new Error("Vendor not found")
    }

    const { name, description, price, category, stock } = req.body

    if (!name || !description || !price || !category || !stock) {
        res.status(409)
        throw new Error("Please Fill All Details!")
    }

    const product = await Product.create({ name, price, description, category, stock, image: req.file.path, vendor: vendor._id })

    if (!product) {
        res.status(409)
        throw new Error("Product Not Created!")
    }

    res.status(201).json(product)


}







const vendorController = { becomeVendor, addProduct }


export default vendorController