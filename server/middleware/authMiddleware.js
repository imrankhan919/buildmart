import jwt from "jsonwebtoken"
import User from "../models/userModel.js"


const forUser = async (req, res, next) => {
    let token
    try {
        // Check if token is coming in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Seprate Token
            token = req.headers.authorization.split(" ")[1]
            // Verify Token
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Search User By Id Given In Token
            let user = await User.findById(decoded.id).select("-password")
            // Store User In Request Object
            req.user = user
            next()
        } else {
            res.status(401)
            throw new Error("Unauthorised Access!")
        }
    } catch (error) {
        res.status(401)
        throw new Error("Unauthorised Access!")
    }
}

const forAdmin = async (req, res, next) => {
    let token
    try {
        // Check if token is coming in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Seprate Token
            token = req.headers.authorization.split(" ")[1]
            // Verify Token
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Search User By Id Given In Token
            let user = await User.findById(decoded.id).select("-password")
            // Store User In Request Object
            req.user = user
            if (user.isAdmin) {
                next()
            } else {
                res.status(401)
                throw new Error("Unauthorised Access! Admin Only")
            }
        } else {
            res.status(401)
            throw new Error("Unauthorised Access!")
        }
    } catch (error) {
        res.status(401)
        throw new Error("Unauthorised Access!")
    }
}

const protect = { forUser, forAdmin }


export default protect