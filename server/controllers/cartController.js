import Cart from "../models/cartModel.js"

const getCart = async (req, res) => {

    let userId = req.user.id

    const cart = await Cart.findOne({ user: userId }).populate('products.product')

    if (!cart) {
        res.status(200).json({
            products: []
        })
    }

    res.status(200).json(cart)


}


const addToCart = async (req, res) => {
    res.send("Item Added In Cart")
}


const updateCart = async (req, res) => {
    res.send("Item Updated In Cart")
}

const removeCart = async (req, res) => {
    res.send("Cart Removed")
}


const cartController = {
    getCart,
    addToCart,
    updateCart,
    removeCart
}

export default cartController