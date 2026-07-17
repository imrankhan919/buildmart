// Generate Floor Plan

import axios from "axios"

export const getSavedPlans = async (token) => {

  const options = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get("/api/generate/floor-plan", options)
  return response.data


}


// Generate Floor Plan
export const generateFloorPlan = async (payload) => {

  const { token, formData } = payload

  const options = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  console.log(formData)

  const finalData = {
    plotSize: `${formData.length} x ${formData.width}`,
    floors: formData.floors,
    extraInformation: `${formData.layoutStyle} , ${formData.rooms} , ${formData.notes}`
  }




  const response = await axios.post("/api/generate/floor-plan", finalData, options)
  console.log(response)
  return response.data

}