import Cart from "../models/cartModel.js"
import Coupon from "../models/couponModel.js"
import Order from "../models/orderModel.js"

const createOrder = async (req, res) => {

    let userId = req.user.id

    let couponExists

    if (req.body.couponCode) {

        couponExists = await Coupon.findOne({ couponCode: req.body.couponCode })

        if (!couponExists || !couponExists.isActive) {
            res.status(404)
            throw new Error("Invalid Coupon Code!")
        }

    }


    // Find Cart
    const cart = await Cart.findOne({ user: userId }).populate("products.product")

    if (!cart) {
        res.status(404)
        throw new Error("Cart Not Exists!")
    }

    let billedProducts = cart.products.map((product) => {
        return {
            product: product.product._id,
            qty: product.qty,
            purchasedPrice: product.product.price
        }
    })


    let totalBill = cart.products.reduce((acc, item) => {
        return acc + item.product.price * item.qty
    }, 0)

    let discount = couponExists ? totalBill * couponExists.couponDiscount / 100 : 0

    let vendor = cart.products[0].product.vendor

    const order = new Order({
        user: userId,
        products: billedProducts,
        vendor: vendor,
        status: "placed",
        isDiscounted: couponExists ? true : false,
        coupon: couponExists ? couponExists._id : null,
        totalBillAmount: totalBill - discount
    })

    await order.populate("products.product")
    await order.save()

    if (!order) {
        res.status(409)
        throw new Error("Order Not Placed")
    }

    // Clear Cart
    await cart.deleteOne({ user: userId })

    res.status(201).json(order)


}


const getMyOrders = async (req, res) => {


    let userId = req.user.id

    const orders = await Order.find({ user: userId }).populate('products.product').populate('vendor')

    if (!orders) {
        res.status(404)
        throw new Error("Orders Not Found!")
    }

    res.status(200).json(orders)

}

const getMyOrder = async (req, res) => {

    let orderId = req.params.oid

    const order = await Order.findById(orderId).populate('products.product').populate('vendor')

    if (!order) {
        res.status(404)
        throw new Error("Order Not Found!")
    }

    res.status(200).json(order)

}


const cancelOrder = async (req, res) => {

    const order = await Order.findById(req.params.oid)

    if (order.status === "placed") {
        const cancelledOrder = await Order.findByIdAndUpdate(req.params.oid, { status: "cancelled" }, { new: true })
        res.status(200).json(cancelledOrder)
    } else {
        res.status(409)
        throw new Error("Order Cannot Be Cancelled! After Dispatched")
    }

}



const orderController = { createOrder, getMyOrders, getMyOrder, cancelOrder }

export default orderController