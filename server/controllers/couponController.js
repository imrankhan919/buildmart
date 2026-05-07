import Coupon from "../models/couponModel.js"

const getCoupons = async (req, res) => {

    const coupons = await Coupon.find().populate('vendor')

    if (!coupons) {
        res.status(404)
        throw new Error("Coupons Not Found!")
    }

    res.status(200).json(coupons)

}


const couponController = { getCoupons }


export default couponController