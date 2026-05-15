import Cart from "../models/cartModel.js"
import Coupon from "../models/couponModel.js"

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

    console.log(cart.products[0].qty * cart.products[0].product.price)

    if (!cart) {
        res.status(404)
        throw new Error("Cart Not Exists!")
    }


    res.send("Order Success")


}


const orderController = { createOrder }

export default orderController