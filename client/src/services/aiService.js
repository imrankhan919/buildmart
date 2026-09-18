import apiClient from './apiClient.js';

export const getSavedPlans = async () => {
  try {
    const response = await apiClient.get('/api/generate/floor-plan');
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to load saved plans.');
  }
};

export const generateFloorPlan = async (payload) => {
  try {
    const { formData } = payload;
    // Structured fields — the backend builds prompts from these discrete values.
    const finalData = {
      plotLength: Number(formData.length),
      plotWidth: Number(formData.width),
      floors: Number(formData.floors),
      rooms: formData.rooms,
      layoutStyle: formData.layoutStyle,
      notes: formData.notes || '',
    };
    const response = await apiClient.post('/api/generate/floor-plan', finalData);
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to generate floor plan.');
  }
};

export const generateFinalPlan = async ({ planId, extraFields }) => {
  try {
    const response = await apiClient.post(`/api/generate/final-plan/${planId}`, {
      numberOfFloors: extraFields?.numberOfFloors,
      plotSize: extraFields?.plotSize,
      facingDirection: extraFields?.facingDirection,
      architecturalStyle: extraFields?.architecturalStyle,
      wallFinish: extraFields?.wallFinish,
      roofType: extraFields?.roofType,
      balcony: extraFields?.balcony,
      additionalFeatures: extraFields?.additionalFeatures,
    });
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to generate 3D render.');
  }
};

export const generateBOM = async (planId) => {
  try {
    const response = await apiClient.post(`/api/generate/bom/${planId}`);
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to generate bill of materials.');
  }
};
