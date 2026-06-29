// authService.js
// BASE_URL = 'http://localhost:5000/api'

import axios from "axios";


export const loginUser = async (email, password) => {

};


export const register = async (data) => {
  const response = await axios.post("/api/auth/register", data)
  console.log(response)
  return response.data
};


export const getMe = async (token) => {

};
