import axios from "axios";

export const getVendors = async () => {
  const response = await axios.get("/api/vendor/profiles")
  return response.data
};

export const getVendor = async (id) => {
  const response = await axios.get("/api/vendor/profiles/" + id)
  console.log(response.data)
  return response.data

};

export const getVendorData = async (token) => {

  const options = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const productsData = await axios.get("/api/vendor/product", options)
  const ordersData = await axios.get("/api/vendor/orders", options)

  const data = { products: productsData.data, orders: ordersData.data }

  console.log(data)

  return data
}