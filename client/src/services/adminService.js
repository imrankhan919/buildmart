import axios from "axios"

export const getUsers = async (token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const users = await axios.get("/api/admin/users", options)
    const vendors = await axios.get("/api/admin/vendors", options)
    const products = await axios.get("/api/admin/products", options)
    const orders = await axios.get("/api/admin/orders", options)
    const data = { users: users.data, vendors: vendors.data, products: products.data, orders: orders.data }
    return data
}


export const getProducts = async () => {
    console.log("Getting Products...")
}

export const getOrders = async () => {
    console.log("Getting Orders...")
}

export const getRatings = async () => {
    console.log("Getting Ratings...")
}


