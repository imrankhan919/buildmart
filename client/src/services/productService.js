import axios from "axios"

const BASE_URL = "/api/products"


export const getAllProducts = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

export const getProduct = async (product_id) => {
  console.log(product_id)
  const response = await axios.get(BASE_URL + "/" + product_id)
  console.log(response.data)
  return response.data
}