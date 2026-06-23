import axios from "axios"

const BASE_URL = "/api/products"


export const getAllProducts = async () => {
  const response = await axios.get(BASE_URL)
  console.log(response.data)
  return response.data
}