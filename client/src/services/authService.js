// authService.js
// BASE_URL = 'http://localhost:5000/api'

import axios from "axios";


export const login = async (data) => {
  const response = await axios.post("/api/auth/login", data)
  localStorage.setItem('user', JSON.stringify(response.data))
  return response.data
};


export const register = async (data) => {
  const response = await axios.post("/api/auth/register", data)
  localStorage.setItem('user', JSON.stringify(response.data))
  return response.data
};


export const getMe = async (token) => {

};
