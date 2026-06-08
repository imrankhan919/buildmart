import CreditRequest from "../models/creditRequestModel.js"

const getCreditsHistory = async (req, res) => {

    const userId = req.user._id

    const creditHistory = await CreditRequest.find({ user: userId })

    if (!creditHistory) {
        res.status(404)
        throw new Error("Credit history not found@")
    }

    res.status(200).json(creditHistory)

}


const requestCredits = async (req, res) => {
    const userId = req.user._id

    const { credits } = req.body

    if (!credits) {
        res.status(409)
        throw new Error("Credits Required! Please Enter Number Of Credits!")
    }

    const creditRequest = await CreditRequest.create({ user: userId, credits })

    if (!creditRequest) {
        res.status(409)
        throw new Error("Credit Request Not Processed!")
    }

    res.status(201).json(creditRequest)


}


const creditController = { getCreditsHistory, requestCredits }

export default creditController