import fs from "node:fs"
import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js"
import Product from "../models/productModel.js"
import Vendor from "../models/vendorModel.js"
import Coupon from "../models/couponModel.js"

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

    if (!name || !description || !price || !category || !stock || !req.file.path) {
        res.status(409)
        throw new Error("Please Fill All Details!")
    }

    console.log(req.file)

    // Upload Product Image To Cloudinary
    let uploadResult = await uploadToCloudinary(req.file.path)

    // Remove Image From Server
    fs.unlinkSync(req.file.path)


    const product = await Product.create({ name, price, description, category, stock, image: uploadResult.secure_url, vendor: vendor._id })

    if (!product) {
        res.status(409)
        throw new Error("Product Not Created!")
    }

    res.status(201).json(product)


}


const getMyProducts = async (req, res) => {

    const userId = req.user._id


    // check if vendor exists
    const vendor = await Vendor.findOne({ user: userId })

    if (!vendor) {
        res.status(404)
        throw new Error("Vendor not found")
    }


    const products = await Product.find({ vendor: vendor._id })

    if (!products) {
        res.status(404)
        throw new Error("Product Not Found!")
    }

    res.status(200).json(products)

}


const updateProduct = async (req, res) => {

    const userId = req.user._id


    // check if vendor exists
    const vendor = await Vendor.findOne({ user: userId })

    if (!vendor) {
        res.status(404)
        throw new Error("Vendor not found")
    }

    // Check if product exists
    const product = await Product.findById(req.params.pid)

    if (!product) {
        res.status(404)
        throw new Error("Product Not Found!")
    }

    if (product.vendor.toString() !== vendor._id.toString()) {
        res.status(401)
        throw new Error("Unable to update product")
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true })

    if (!updatedProduct) {
        res.status(404)
        throw new Error("Product not updated")
    }

    res.status(200).json(updatedProduct)

}

const getVendors = async (req, res) => {
    const vendors = await Vendor.find().populate('user')

    if (!vendors) {
        res.status(404)
        throw new Error("Vendor Not Found!")
    }

    const activeVendors = vendors.filter(vendor => vendor.status === "active")

    res.status(200).json(activeVendors)

}

const getVendor = async (req, res) => {

    const vendorId = req.params.vid

    const vendor = await Vendor.findById(vendorId).populate('user')

    if (!vendor || !vendor.status === "active") {
        res.status(404)
        throw new Error("Vendor Not Found!")
    }



    res.status(200).json(vendor)

}


const createCoupon = async (req, res) => {

    const userId = req.user._id


    // check if vendor exists
    const vendor = await Vendor.findOne({ user: userId })

    if (!vendor) {
        res.status(404)
        throw new Error("Vendor not found")
    }

    const { couponCode, couponDiscount } = req.body

    if (!couponCode || !couponDiscount) {
        res.status(409)
        throw new Error("Please Fill All Details!")
    }

    const coupon = await Coupon.create({
        couponCode, couponDiscount, vendor: vendor._id
    })

    if (!coupon) {
        res.status(409)
        throw new Error("Coupon Not Created")
    }


    res.status(201).json(coupon)
}


const updateCoupon = async (req, res) => {

    const userId = req.user._id


    // check if vendor exists
    const vendor = await Vendor.findOne({ user: userId })

    if (!vendor) {
        res.status(404)
        throw new Error("Vendor not found")
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.cid, req.body, { new: true })

    if (!updatedCoupon) {
        res.status(409)
        throw new Error("Coupon Not Updated")
    }


    res.status(201).json(updatedCoupon)


}




const vendorController = { becomeVendor, addProduct, getMyProducts, updateProduct, getVendors, getVendor, createCoupon, updateCoupon }


export default vendorController