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


export const updateVendor = async (payload) => {


    let options = {
        headers: {
            authorization: `Bearer ${payload.token}`
        }
    }



    const response = await axios.put("/api/admin/vendors/" + payload.vendor, { status: payload.status }, options)
    return response.data
}


export const updateUser = async (payload) => {


    let options = {
        headers: {
            authorization: `Bearer ${payload.token}`
        }
    }



    const response = await axios.put("/api/admin/users/" + payload.uid, {}, options)
    return response.data


}


